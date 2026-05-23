#!/usr/bin/env node
var np=Object.defineProperty;var E=(r,e)=>()=>(r&&(e=r(r=0)),e);var sp=(r,e)=>{for(var t in e)np(r,t,{get:e[t],enumerable:!0})};var rs,ns=E(()=>{"use strict";rs={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=t[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:(a,c)=>{if(i==="new")return a.length<1?Promise.resolve({result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}):(s=a,i="retype",Promise.resolve({result:null,nextPrompt:"Retype new password: "}));if(a!==s)return Promise.resolve({result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}});c.users.addUser(n,s);let l=c.users.getGid(n);return Promise.resolve({result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (${l}) ...`,`Adding new user '${n}' (${l}) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})}},exitCode:0}}}});function ss(r){return Array.isArray(r)?r:[r]}function pr(r,e){if(r===e)return{matched:!0,inlineValue:null};let t=`${e}=`;return r.startsWith(t)?{matched:!0,inlineValue:r.slice(t.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&r.startsWith(e)&&r.length>e.length?{matched:!0,inlineValue:r.slice(e.length)}:{matched:!1,inlineValue:null}}function ip(r,e={}){let t=new Set(e.flags??[]),n=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<r.length;o+=1){let a=r[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of t){let{matched:u}=pr(a,l);if(u){c=!0;break}}if(!c){for(let l of n){let u=pr(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<r.length&&(o+=1);break}}c||s.push(a)}}return s}function U(r,e){let t=ss(e);for(let n of r)for(let s of t)if(pr(n,s).matched)return!0;return!1}function St(r,e){let t=ss(e);for(let n=0;n<r.length;n+=1){let s=r[n];for(let i of t){let o=pr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=r[n+1];return a!==void 0&&a!=="--"?a:!0}}}function dt(r,e,t={}){return ip(r,t)[e]}function Ce(r,e={}){let t=new Set,n=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<r.length;c+=1){let l=r[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){t.add(l);continue}if(o.has(l)){let d=r[c+1];d&&!d.startsWith("-")?(n.set(l,d),c+=1):n.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){n.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:t,flagsWithValues:n,positionals:s}}var ne=E(()=>{"use strict"});var is,os,as=E(()=>{"use strict";ne();is={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:r,env:e})=>{if(!e)return{exitCode:0};if(r.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let t=[];for(let n of r){let s=n.indexOf("=");if(s===-1){let i=e.vars[`__alias_${n}`];if(i)t.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:t.join(`
`)||void 0,exitCode:0}}},os={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:r,env:e})=>{if(!e)return{exitCode:0};if(U(r,["-a"])){for(let t of Object.keys(e.vars))t.startsWith("__alias_")&&delete e.vars[t];return{exitCode:0}}for(let t of r)delete e.vars[`__alias_${t}`];return{exitCode:0}}}});var sn,op,ap,tt,on=E(()=>{"use strict";sn=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]},{name:"ca-certificates",version:"20230311",section:"misc",description:"Common CA certificates",shortDesc:"common CA certificates",installedSizeKb:388,files:[{path:"/etc/ssl/certs/.keep",content:""},{path:"/etc/ssl/private/.keep",content:""},{path:"/usr/share/ca-certificates/.keep",content:""}],onInstall:r=>{r.exists("/etc/ssl")||r.mkdir("/etc/ssl",493),r.exists("/etc/ssl/certs")||r.mkdir("/etc/ssl/certs",493)}},{name:"locales",version:"2.36-9+deb12u3",section:"localization",description:"GNU C Library: National Language (locale) data",shortDesc:"locale data",installedSizeKb:16484,files:[{path:"/etc/locale.gen",content:`en_US.UTF-8 UTF-8
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
`,mode:493}]}],op=new Map(sn.map(r=>[r.name.toLowerCase(),r])),ap=sn.slice().sort((r,e)=>r.name.localeCompare(e.name)),tt=class r{constructor(e,t){this._vfs=e;this._users=t}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let t=e.split(/\n\n+/);for(let n of t){if(!n.trim())continue;let s=r._parseFields(n),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let t of this._installed.values())e.push([`Package: ${t.name}`,"Status: install ok installed","Priority: optional",`Section: ${t.section}`,`Installed-Size: ${t.installedSizeKb}`,`Maintainer: ${t.maintainer}`,`Architecture: ${t.architecture}`,`Version: ${t.version}`,`Description: ${t.description}`,`X-Installed-At: ${t.installedAt}`,`X-Files: ${t.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}static _parseFields(e){let t={};for(let n of e.split(`
`)){let s=n.indexOf(": ");s!==-1&&(t[n.slice(0,s)]=n.slice(s+2))}return t}_log(e){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+n)}_aptLog(e,t){let n=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${e} ${t.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${t.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}static findInRegistry(e){return op.get(e.toLowerCase())}static listAvailable(){return ap}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,t)=>e.name.localeCompare(t.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,t={}){this._ensureLoaded();let n=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=r.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);t.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){t.quiet||(n.push(`Selecting previously unselected package ${c.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),n.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),t.quiet||n.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),t.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(e,t={}){this._ensureLoaded();let n=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};t.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){t.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!t.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}r.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:n.join(`
`),exitCode:0}}static search(e){let t=e.toLowerCase();return sn.filter(n=>n.name.includes(t)||n.description.toLowerCase().includes(t)||(n.shortDesc??"").toLowerCase().includes(t)).sort((n,s)=>n.name.localeCompare(s.name))}show(e){this._ensureLoaded();let t=r.findInRegistry(e);if(!t)return null;let n=this._installed.get(e);return[`Package: ${t.name}`,`Version: ${t.version}`,`Architecture: ${t.architecture??"amd64"}`,`Maintainer: ${t.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${t.installedSizeKb??0}`,`Depends: ${(t.depends??[]).join(", ")||"(none)"}`,`Section: ${t.section??"misc"}`,"Priority: optional",`Description: ${t.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}}});import*as Ve from"node:path";function O(r,e,t){if(!e||e.trim()==="")return r;if(e.startsWith("~")){let n=t??"/root";return Ve.posix.normalize(`${n}${e.slice(1)}`)}return e.startsWith("/")?Ve.posix.normalize(e):Ve.posix.normalize(Ve.posix.join(r,e))}function lp(r){let e=r.startsWith("/")?Ve.posix.normalize(r):Ve.posix.normalize(`/${r}`);return cp.some(t=>e===t||e.startsWith(`${t}/`))}function de(r,e,t){if(r!=="root"&&lp(e))throw new Error(`${t}: permission denied: ${e}`)}function cs(r){let t=(r.split("?")[0]?.split("#")[0]??r).split("/").filter(Boolean).pop();return t&&t.length>0?t:"index.html"}function up(r,e){let t=r.length,n=e.length,s=Array.from({length:t+1},()=>new Array(n+1).fill(0));for(let o=0;o<=t;o++){let a=s[o];a[0]=o}for(let o=0;o<=n;o++){let a=s[0];a[o]=o}for(let o=1;o<=t;o++){let a=s[o],c=s[o-1];for(let l=1;l<=n;l++){let u=r[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[t][n]}function ls(r,e,t){let n=O(e,t);if(r.exists(n))return n;let s=Ve.posix.dirname(n),i=Ve.posix.basename(n),o=r.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Ve.posix.join(s,a[0]);let c=o.filter(l=>up(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Ve.posix.join(s,c[0]):n}function Pt(r){return r.packageManager}function Ae(r,e,t,n,s){if(t==="root"||s===0)return;de(t,n,"access");let i=e.getUid(t),o=e.getGid(t);if(!r.checkAccess(n,i,o,s)){let a=r.stat(n).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var cp,ee=E(()=>{"use strict";cp=["/.virtual-env-js/.auth","/etc/htpasswd"]});var us,ds,ps=E(()=>{"use strict";on();ne();ee();us={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:r,shell:e,authUser:t})=>{let n=Pt(e);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=r[0]?.toLowerCase(),i=r.slice(1),o=U(i,["-q","--quiet","-qq"]),a=U(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&t!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=tt.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64
  ${m.shortDesc??m.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(U(i,["--installed"])){let m=n.listInstalled();return m.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${m.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${tt.listAvailable().map(m=>`${m.name}/${m.section??"misc"} ${m.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},ds={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:r,shell:e})=>{let t=Pt(e);if(!t)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=r[0]?.toLowerCase(),s=r[1];switch(n){case"search":return s?{stdout:tt.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=t.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=tt.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=t.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var ms,fs=E(()=>{"use strict";ee();ms={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:r,args:e,stdin:t,cwd:n,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let C=e[c];if(C==="-F")i=e[++c]??" ",c++;else if(C.startsWith("-F"))i=C.slice(2),c++;else if(C==="-v"){let k=e[++c]??"",N=k.indexOf("=");N!==-1&&(o[k.slice(0,N)]=k.slice(N+1)),c++}else if(C.startsWith("-v")){let k=C.slice(2),N=k.indexOf("=");N!==-1&&(o[k.slice(0,N)]=k.slice(N+1)),c++}else a.push(C),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=t??"";if(u){let C=O(n,u);try{de(r,C,"awk"),d=s.vfs.readFile(C)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(C){if(C===void 0||C==="")return 0;let k=Number(C);return Number.isNaN(k)?0:k}function m(C){return C===void 0?"":String(C)}function f(C,k){return k===" "?C.trim().split(/\s+/).filter(Boolean):k.length===1?C.split(k):C.split(new RegExp(k))}function h(C,k,N,L,q){if(C=C.trim(),C==="")return"";if(C.startsWith('"')&&C.endsWith('"'))return C.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(C))return Number.parseFloat(C);if(C==="$0")return N.join(i===" "?" ":i)||"";if(C==="$NF")return N[q-1]??"";if(/^\$\d+$/.test(C))return N[Number.parseInt(C.slice(1),10)-1]??"";if(/^\$/.test(C)){let G=C.slice(1),X=p(h(G,k,N,L,q));return X===0?N.join(i===" "?" ":i)||"":N[X-1]??""}if(C==="NR")return L;if(C==="NF")return q;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(C))return k[C]??"";let Z=C.match(/^length\s*\(([^)]*)\)$/);if(Z)return m(h(Z[1].trim(),k,N,L,q)).length;let se=C.match(/^substr\s*\((.+)\)$/);if(se){let G=y(se[1]),X=m(h(G[0]?.trim()??"",k,N,L,q)),pe=p(h(G[1]?.trim()??"1",k,N,L,q))-1,me=G[2]===void 0?void 0:p(h(G[2].trim(),k,N,L,q));return me===void 0?X.slice(Math.max(0,pe)):X.slice(Math.max(0,pe),pe+me)}let B=C.match(/^index\s*\((.+)\)$/);if(B){let G=y(B[1]),X=m(h(G[0]?.trim()??"",k,N,L,q)),pe=m(h(G[1]?.trim()??"",k,N,L,q));return X.indexOf(pe)+1}let Y=C.match(/^tolower\s*\((.+)\)$/);if(Y)return m(h(Y[1].trim(),k,N,L,q)).toLowerCase();let V=C.match(/^toupper\s*\((.+)\)$/);if(V)return m(h(V[1].trim(),k,N,L,q)).toUpperCase();let W=C.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(W){let G=m(h(W[1].trim(),k,N,L,q));try{let X=G.match(new RegExp(W[2]));if(X)return k.RSTART=(X.index??0)+1,k.RLENGTH=X[0].length,(X.index??0)+1}catch{}return k.RSTART=0,k.RLENGTH=-1,0}let z=C.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(z){let G=h(z[1].trim(),k,N,L,q);return p(G)!==0||typeof G=="string"&&G!==""?h(z[2].trim(),k,N,L,q):h(z[3].trim(),k,N,L,q)}let K=C.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(K)return m(h(K[1],k,N,L,q))+m(h(K[2],k,N,L,q));try{let G=C.replace(/\bNR\b/g,String(L)).replace(/\bNF\b/g,String(q)).replace(/\$NF\b/g,String(q>0?p(N[q-1]):0)).replace(/\$(\d+)/g,(pe,me)=>String(p(N[Number.parseInt(me,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(pe,me)=>String(p(k[me]))),X=Function(`"use strict"; return (${G});`)();if(typeof X=="number"||typeof X=="boolean")return Number(X)}catch{}return m(k[C]??C)}function y(C){let k=[],N="",L=0;for(let q=0;q<C.length;q++){let Z=C.charAt(q);if(Z==="(")L++;else if(Z===")")L--;else if(Z===","&&L===0){k.push(N),N="";continue}N+=Z}return k.push(N),k}function S(C,k,N,L,q,Z){if(C=C.trim(),!C||C.startsWith("#"))return"ok";if(C==="next")return"next";if(C==="exit"||C.startsWith("exit "))return"exit";if(C==="print"||C==="print $0")return Z.push(N.join(i===" "?" ":i)),"ok";if(C.startsWith("printf ")){let z=C.slice(7).trim();return Z.push(w(z,k,N,L,q)),"ok"}if(C.startsWith("print ")){let z=C.slice(6),K=y(z);return Z.push(K.map(G=>m(h(G.trim(),k,N,L,q))).join("	")),"ok"}if(C.startsWith("delete ")){let z=C.slice(7).trim();return delete k[z],"ok"}let se=C.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(se){let z=se[1]==="gsub",K=se[2],G=C.slice(se[0].length).replace(/^\s*,\s*/,""),X=y(G.replace(/\)\s*$/,"")),pe=m(h(X[0]?.trim()??'""',k,N,L,q)),me=X[1]?.trim(),ze=N.join(i===" "?" ":i);try{let ut=new RegExp(K,z?"g":"");if(me&&/^\$\d+$/.test(me)){let He=Number.parseInt(me.slice(1),10)-1;He>=0&&He<N.length&&(N[He]=(N[He]??"").replace(ut,pe))}else{let He=ze.replace(ut,pe),tn=f(He,i);N.splice(0,N.length,...tn)}}catch{}return"ok"}let B=C.match(/^split\s*\((.+)\)$/);if(B){let z=y(B[1]),K=m(h(z[0]?.trim()??"",k,N,L,q)),G=z[1]?.trim()??"arr",X=z[2]?m(h(z[2].trim(),k,N,L,q)):i,pe=f(K,X);for(let me=0;me<pe.length;me++)k[`${G}[${me+1}]`]=pe[me]??"";return k[G]=String(pe.length),"ok"}let Y=C.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(Y)return k[Y[1]]=p(k[Y[1]])+(Y[2]==="++"?1:-1),"ok";let V=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(V){let z=p(k[V[1]]),K=p(h(V[3],k,N,L,q)),G=V[2],X=z;return G==="+="?X=z+K:G==="-="?X=z-K:G==="*="?X=z*K:G==="/="?X=K===0?0:z/K:G==="%="&&(X=z%K),k[V[1]]=X,"ok"}let W=C.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return W?(k[W[1]]=h(W[2],k,N,L,q),"ok"):(h(C,k,N,L,q),"ok")}function w(C,k,N,L,q){let Z=y(C),se=m(h(Z[0]?.trim()??'""',k,N,L,q)),B=Z.slice(1).map(V=>h(V.trim(),k,N,L,q)),Y=0;return se.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(V,W,z)=>{if(z==="%")return"%";let K=B[Y++],G=W?Number.parseInt(W,10):0,X="";return z==="d"||z==="i"?X=String(Math.trunc(p(K))):z==="f"?X=p(K).toFixed(W?.includes(".")?Number.parseInt(W.split(".")[1]??"6",10):6):z==="s"||z==="q"?X=m(K):z==="x"?X=Math.trunc(p(K)).toString(16):z==="X"?X=Math.trunc(p(K)).toString(16).toUpperCase():z==="o"?X=Math.trunc(p(K)).toString(8):X=m(K),G>0&&X.length<G?X=X.padStart(G):G<0&&X.length<-G&&(X=X.padEnd(-G)),X})}let M=[],v=l.trim();{let C=0;for(;C<v.length;){for(;C<v.length&&/\s/.test(v.charAt(C));)C++;if(C>=v.length)break;let k="";for(;C<v.length&&v[C]!=="{";)k+=v[C++];if(k=k.trim(),v[C]!=="{"){k&&M.push({pattern:k,action:"print $0"});break}C++;let N="",L=1;for(;C<v.length&&L>0;){let q=v.charAt(C);if(q==="{")L++;else if(q==="}"&&(L--,L===0)){C++;break}N+=q,C++}M.push({pattern:k,action:N.trim()})}}M.length===0&&M.push({pattern:"",action:v.replace(/[{}]/g,"").trim()});let R=[],P={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},b=M.filter(C=>C.pattern==="BEGIN"),g=M.filter(C=>C.pattern==="END"),_=M.filter(C=>C.pattern!=="BEGIN"&&C.pattern!=="END");function I(C,k,N,L){let q=D(C);for(let Z of q){let se=S(Z,P,k,N,L,R);if(se!=="ok")return se}return"ok"}function D(C){let k=[],N="",L=0,q=!1,Z="";for(let se=0;se<C.length;se++){let B=C.charAt(se);if(!q&&(B==='"'||B==="'")){q=!0,Z=B,N+=B;continue}if(q&&B===Z){q=!1,N+=B;continue}if(q){N+=B;continue}B==="("||B==="["?L++:(B===")"||B==="]")&&L--,(B===";"||B===`
`)&&L===0?(N.trim()&&k.push(N.trim()),N=""):N+=B}return N.trim()&&k.push(N.trim()),k}function T(C,k,N,L,q){if(!C||C==="1")return!0;if(/^-?\d+$/.test(C))return p(C)!==0;if(C.startsWith("/")&&C.endsWith("/"))try{return new RegExp(C.slice(1,-1)).test(k)}catch{return!1}let Z=C.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let Y=p(h(Z[1].trim(),P,N,L,q)),V=p(h(Z[3].trim(),P,N,L,q));switch(Z[2]){case"==":return Y===V;case"!=":return Y!==V;case">":return Y>V;case">=":return Y>=V;case"<":return Y<V;case"<=":return Y<=V;default:return!1}}let se=C.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(se){let Y=m(h(`$${se[1]}`,P,N,L,q));try{return new RegExp(se[2]).test(Y)}catch{return!1}}let B=h(C,P,N,L,q);return p(B)!==0||typeof B=="string"&&B!==""}for(let C of b)I(C.action,[],0,0);let j=d.split(`
`);j[j.length-1]===""&&j.pop();let H=!1;for(let C=0;C<j.length&&!H;C++){let k=j[C];P.NR=C+1;let N=f(k,i);P.NF=N.length;let L=C+1,q=N.length;for(let Z of _){if(!T(Z.pattern,k,N,L,q))continue;let se=I(Z.action,N,L,q);if(se==="next")break;if(se==="exit"){H=!0;break}}}for(let C of g)I(C.action,[],p(P.NR),0);let te=R.join(`
`);return{stdout:te+(te&&!te.endsWith(`
`)?`
`:""),exitCode:0}}}});var hs,gs=E(()=>{"use strict";ne();hs={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:r,stdin:e})=>{let t=U(r,["-d","--decode"]),n=e??"";if(t)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var ys,Ss,bs=E(()=>{"use strict";ys={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:r})=>{if(!r[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],t=r[0]==="-a"?r.slice(1):[r[0]],n=r[0]==="-a"?void 0:r[1];for(let s of t){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Ss={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:r})=>{if(!r[0])return{stderr:"dirname: missing operand",exitCode:1};let e=r[0].replace(/\/+$/,""),t=e.lastIndexOf("/");return{stdout:t<=0?t===0?"/":".":e.slice(0,t),exitCode:0}}}});function mr(r,e=""){let t=`${e}:${r}`,n=_s.get(t);if(n)return n;let s="^";for(let o=0;o<r.length;o++){let a=r.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=r.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${r.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return _s.set(t,i),i}var _s,an=E(()=>{"use strict";_s=new Map});function It(r,e,t,n=!1){let s=`${e}:${t?"g":"s"}:${n?"G":""}:${r}`,i=vs.get(s);if(i)return i;let o=r.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=t?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,n?"g":""),vs.set(s,i),i}function dp(r,e){let t=[],n=0;for(;n<r.length;){let s=r.charAt(n);if(/\s/.test(s)){n++;continue}if(s==="+"){t.push({type:"plus"}),n++;continue}if(s==="-"){t.push({type:"minus"}),n++;continue}if(s==="*"){if(r[n+1]==="*"){t.push({type:"pow"}),n+=2;continue}t.push({type:"mul"}),n++;continue}if(s==="/"){t.push({type:"div"}),n++;continue}if(s==="%"){t.push({type:"mod"}),n++;continue}if(s==="("){t.push({type:"lparen"}),n++;continue}if(s===")"){t.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<r.length&&/\d/.test(r.charAt(i));)i++;t.push({type:"number",value:Number(r.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<r.length&&/[A-Za-z0-9_]/.test(r.charAt(i));)i++;let o=r.slice(n,i),a=e[o],c=a===void 0||a===""?0:Number(a);t.push({type:"number",value:Number.isFinite(c)?c:0}),n=i;continue}return[]}return t}function Vt(r,e){let t=r.trim();if(t.length===0||t.length>1024)return Number.NaN;let n=dp(t,e);if(n.length===0)return Number.NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let m=o();if(!m)return Number.NaN;if(m.type==="number")return m.value;if(m.type==="lparen"){let f=d();return n[s]?.type!=="rparen"?Number.NaN:(s++,f)}return Number.NaN},c=()=>{let m=i();return m?.type==="plus"?(o(),c()):m?.type==="minus"?(o(),-c()):a()},l=()=>{let m=c();for(;i()?.type==="pow";){o();let f=c();m**=f}return m},u=()=>{let m=l();for(;;){let f=i();if(f?.type==="mul"){o(),m*=l();continue}if(f?.type==="div"){o();let h=l();m=h===0?Number.NaN:m/h;continue}if(f?.type==="mod"){o();let h=l();m=h===0?Number.NaN:m%h;continue}return m}},d=()=>{let m=u();for(;;){let f=i();if(f?.type==="plus"){o(),m+=u();continue}if(f?.type==="minus"){o(),m-=u();continue}return m}},p=d();return!Number.isFinite(p)||s!==n.length?Number.NaN:Math.trunc(p)}function pp(r,e){if(!r.includes("'"))return e(r);let t=[],n=0;for(;n<r.length;){let s=r.indexOf("'",n);if(s===-1){t.push(e(r.slice(n)));break}t.push(e(r.slice(n,s)));let i=r.indexOf("'",s+1);if(i===-1){t.push(r.slice(s));break}t.push(r.slice(s,i+1)),n=i+1}return t.join("")}function hr(r){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),m=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(m){let S=[];if(/\d/.test(m[1])){let v=Number.parseInt(m[1],10),R=Number.parseInt(m[2],10),P=m[3]?Number.parseInt(m[3],10):1,b=v<=R?P:-P;for(let g=v;v<=R?g<=R:g>=R;g+=b)S.push(String(g))}else{let v=m[1].charCodeAt(0),R=m[2].charCodeAt(0),P=v<=R?1:-1;for(let b=v;v<=R?b<=R:b>=R;b+=P)S.push(String.fromCharCode(b))}let w=S.map(v=>`${u}${v}${p}`),M=[];for(let v of w)if(M.push(...n(v,i+1)),M.length>256)return[s];return M}let f=[],h="",y=0;for(let S of d)S==="{"?(y++,h+=S):S==="}"?(y--,h+=S):S===","&&y===0?(f.push(h),h=""):h+=S;if(f.push(h),f.length>1){let S=[];for(let w of f)if(S.push(...n(`${u}${w}${p}`,i+1)),S.length>256)return[s];return S}break}}return[s]}return n(r,0)}function mp(r,e){if(!r.includes("$(("))return r;let t="",n=0,s=0;for(;n<r.length;){if(r[n]==="$"&&r[n+1]==="("&&r[n+2]==="("){t+=r.slice(s,n);let i=n+3,o=0;for(;i<r.length;){let a=r.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(r[i+1]===")"){let c=r.slice(n+3,i),l=Vt(c,e);t+=Number.isNaN(l)?"0":String(l),n=i+2,s=n;break}}i++}if(i>=r.length)return t+=r.slice(n),t;continue}n++}return t+r.slice(s)}function fr(r,e,t=0,n){if(!(r.includes("$")||r.includes("~")||r.includes("'")))return r;let s=n??e.HOME??"/home/user";return pp(r,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(t)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=mp(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=Number.parseInt(l,10),m=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u===void 0?d.slice(m):d.slice(m,m+Number.parseInt(u,10))}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(It(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(It(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(It(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(It(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(It(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(It(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function gr(r,e,t,n){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return fr(r,e,t);e[s]=String(o+1);try{if(r.includes("$(")){let a="",c=!1,l=0;for(;l<r.length;){let u=r.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&r[l+1]==="("){if(r[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<r.length;){if(r[p]==="(")d++;else if(r[p]===")"&&(d--,d===0))break;p++}let m=r.slice(l+2,p).trim(),f=(await n(m)).replace(/\n$/,"");a+=f,l=p+1;continue}a+=u,l++}r=a}return fr(r,e,t)}finally{o<=0?delete e[s]:e[s]=String(o)}}function cn(r,e){if(r.statType)return r.statType(e);try{return r.stat(e).type}catch{return null}}function Cs(r,e,t){if(!(r.includes("*")||r.includes("?")))return[r];let n=r.startsWith("/"),s=n?"/":e,i=n?r.slice(1):r,o=ln(s,i.split("/"),t);return o.length===0?[r]:o.sort()}function ln(r,e,t){if(e.length===0)return[r];let[n,...s]=e;if(!n)return[r];if(n==="**"){let l=ws(r,t);if(s.length===0)return l;let u=[];for(let d of l)cn(t,d)==="directory"&&u.push(...ln(d,s,t));return u}let i=[];try{i=t.list(r)}catch{return[]}let o=mr(n),a=n.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=r==="/"?`/${l}`:`${r}/${l}`;if(s.length===0){c.push(u);continue}cn(t,u)==="directory"&&c.push(...ln(u,s,t))}return c}function ws(r,e){let t=[r],n=[];try{n=e.list(r)}catch{return t}for(let s of n){let i=r==="/"?`/${s}`:`${r}/${s}`;cn(e,i)==="directory"&&t.push(...ws(i,e))}return t}var vs,Gt=E(()=>{"use strict";an();vs=new Map});var xs,Ps=E(()=>{"use strict";Gt();xs={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:r,stdin:e})=>{let t=(e??r.join(" ")).trim();if(!t)return{stdout:"",exitCode:0};let n=[];for(let s of t.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Vt(o,{});if(Number.isNaN(a))return{stderr:`bc: syntax error on line: ${i}`,exitCode:1};n.push(String(a))}return{stdout:n.join(`
`),exitCode:0}}}});import{createRequire as fp}from"module";function Fs(r,e){return Ds(r,e||{},0,0)}function Ls(r,e){return Ts(r,{i:2},e&&e.out,e&&e.dictionary)}function br(r,e){e||(e={});var t=$p(),n=r.length;t.p(r);var s=Ds(r,e,kp(e),8),i=s.length;return Ep(s,e),yn(s,i-8,t.d()),yn(s,i-4,n),s}function _r(r,e){var t=Np(r);return t+8>r.length&&We(6,"invalid gzip data"),Ts(r.subarray(t,-8),{i:2},e&&e.out||new Te(Mp(r)),e&&e.dictionary)}var hp,$t,gp,yp,Te,Fe,Sn,yr,Sr,mn,Ns,$t,Ms,fn,ks,Sp,Is,hn,rt,he,qe,pt,he,he,he,he,Ht,he,bp,_p,vp,Cp,un,Ge,dn,bn,As,wp,We,Ts,nt,Wt,pn,gn,$s,jt,Os,Es,xp,Rs,Pp,Ip,$p,Ds,yn,Ep,Np,Mp,kp,Ap,Tp,vr=E(()=>{hp=fp("/");try{$t=hp("worker_threads"),gp=$t.Worker,yp=$t.isMarkedAsUntransferable}catch{}Te=Uint8Array,Fe=Uint16Array,Sn=Int32Array,yr=new Te([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Sr=new Te([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),mn=new Te([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ns=function(r,e){for(var t=new Fe(31),n=0;n<31;++n)t[n]=e+=1<<r[n-1];for(var s=new Sn(t[30]),n=1;n<30;++n)for(var i=t[n];i<t[n+1];++i)s[i]=i-t[n]<<5|n;return{b:t,r:s}},$t=Ns(yr,2),Ms=$t.b,fn=$t.r;Ms[28]=258,fn[258]=28;ks=Ns(Sr,0),Sp=ks.b,Is=ks.r,hn=new Fe(32768);for(he=0;he<32768;++he)rt=(he&43690)>>1|(he&21845)<<1,rt=(rt&52428)>>2|(rt&13107)<<2,rt=(rt&61680)>>4|(rt&3855)<<4,hn[he]=((rt&65280)>>8|(rt&255)<<8)>>1;qe=(function(r,e,t){for(var n=r.length,s=0,i=new Fe(e);s<n;++s)r[s]&&++i[r[s]-1];var o=new Fe(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(t){a=new Fe(1<<e);var c=15-e;for(s=0;s<n;++s)if(r[s])for(var l=s<<4|r[s],u=e-r[s],d=o[r[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[hn[d]>>c]=l}else for(a=new Fe(n),s=0;s<n;++s)r[s]&&(a[s]=hn[o[r[s]-1]++]>>15-r[s]);return a}),pt=new Te(288);for(he=0;he<144;++he)pt[he]=8;for(he=144;he<256;++he)pt[he]=9;for(he=256;he<280;++he)pt[he]=7;for(he=280;he<288;++he)pt[he]=8;Ht=new Te(32);for(he=0;he<32;++he)Ht[he]=5;bp=qe(pt,9,0),_p=qe(pt,9,1),vp=qe(Ht,5,0),Cp=qe(Ht,5,1),un=function(r){for(var e=r[0],t=1;t<r.length;++t)r[t]>e&&(e=r[t]);return e},Ge=function(r,e,t){var n=e/8|0;return(r[n]|r[n+1]<<8)>>(e&7)&t},dn=function(r,e){var t=e/8|0;return(r[t]|r[t+1]<<8|r[t+2]<<16)>>(e&7)},bn=function(r){return(r+7)/8|0},As=function(r,e,t){return(e==null||e<0)&&(e=0),(t==null||t>r.length)&&(t=r.length),new Te(r.subarray(e,t))},wp=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],We=function(r,e,t){var n=new Error(e||wp[r]);if(n.code=r,Error.captureStackTrace&&Error.captureStackTrace(n,We),!t)throw n;return n},Ts=function(r,e,t,n){var s=r.length,i=n?n.length:0;if(!s||e.f&&!e.l)return t||new Te(0);var o=!t,a=o||e.i!=2,c=e.i;o&&(t=new Te(s*3));var l=function(pe){var me=t.length;if(pe>me){var ze=new Te(Math.max(me*2,pe));ze.set(t),t=ze}},u=e.f||0,d=e.p||0,p=e.b||0,m=e.l,f=e.d,h=e.m,y=e.n,S=s*8;do{if(!m){u=Ge(r,d,1);var w=Ge(r,d+1,3);if(d+=3,w)if(w==1)m=_p,f=Cp,h=9,y=5;else if(w==2){var P=Ge(r,d,31)+257,b=Ge(r,d+10,15)+4,g=P+Ge(r,d+5,31)+1;d+=14;for(var _=new Te(g),I=new Te(19),D=0;D<b;++D)I[mn[D]]=Ge(r,d+D*3,7);d+=b*3;for(var T=un(I),j=(1<<T)-1,H=qe(I,T,1),D=0;D<g;){var te=H[Ge(r,d,j)];d+=te&15;var M=te>>4;if(M<16)_[D++]=M;else{var C=0,k=0;for(M==16?(k=3+Ge(r,d,3),d+=2,C=_[D-1]):M==17?(k=3+Ge(r,d,7),d+=3):M==18&&(k=11+Ge(r,d,127),d+=7);k--;)_[D++]=C}}var N=_.subarray(0,P),L=_.subarray(P);h=un(N),y=un(L),m=qe(N,h,1),f=qe(L,y,1)}else We(1);else{var M=bn(d)+4,v=r[M-4]|r[M-3]<<8,R=M+v;if(R>s){c&&We(0);break}a&&l(p+v),t.set(r.subarray(M,R),p),e.b=p+=v,e.p=d=R*8,e.f=u;continue}if(d>S){c&&We(0);break}}a&&l(p+131072);for(var q=(1<<h)-1,Z=(1<<y)-1,se=d;;se=d){var C=m[dn(r,d)&q],B=C>>4;if(d+=C&15,d>S){c&&We(0);break}if(C||We(2),B<256)t[p++]=B;else if(B==256){se=d,m=null;break}else{var Y=B-254;if(B>264){var D=B-257,V=yr[D];Y=Ge(r,d,(1<<V)-1)+Ms[D],d+=V}var W=f[dn(r,d)&Z],z=W>>4;W||We(3),d+=W&15;var L=Sp[z];if(z>3){var V=Sr[z];L+=dn(r,d)&(1<<V)-1,d+=V}if(d>S){c&&We(0);break}a&&l(p+131072);var K=p+Y;if(p<L){var G=i-L,X=Math.min(L,K);for(G+p<0&&We(3);p<X;++p)t[p]=n[G+p]}for(;p<K;++p)t[p]=t[p-L]}}e.l=m,e.p=se,e.b=p,e.f=u,m&&(u=1,e.m=h,e.d=f,e.n=y)}while(!u);return p!=t.length&&o?As(t,0,p):t.subarray(0,p)},nt=function(r,e,t){t<<=e&7;var n=e/8|0;r[n]|=t,r[n+1]|=t>>8},Wt=function(r,e,t){t<<=e&7;var n=e/8|0;r[n]|=t,r[n+1]|=t>>8,r[n+2]|=t>>16},pn=function(r,e){for(var t=[],n=0;n<r.length;++n)r[n]&&t.push({s:n,f:r[n]});var s=t.length,i=t.slice();if(!s)return{t:Rs,l:0};if(s==1){var o=new Te(t[0].s+1);return o[t[0].s]=1,{t:o,l:1}}t.sort(function(R,P){return R.f-P.f}),t.push({s:-1,f:25001});var a=t[0],c=t[1],l=0,u=1,d=2;for(t[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=t[t[l].f<t[d].f?l++:d++],c=t[l!=u&&t[l].f<t[d].f?l++:d++],t[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var m=new Fe(p+1),f=gn(t[u-1],m,0);if(f>e){var n=0,h=0,y=f-e,S=1<<y;for(i.sort(function(P,b){return m[b.s]-m[P.s]||P.f-b.f});n<s;++n){var w=i[n].s;if(m[w]>e)h+=S-(1<<f-m[w]),m[w]=e;else break}for(h>>=y;h>0;){var M=i[n].s;m[M]<e?h-=1<<e-m[M]++-1:++n}for(;n>=0&&h;--n){var v=i[n].s;m[v]==e&&(--m[v],++h)}f=e}return{t:new Te(m),l:f}},gn=function(r,e,t){return r.s==-1?Math.max(gn(r.l,e,t+1),gn(r.r,e,t+1)):e[r.s]=t},$s=function(r){for(var e=r.length;e&&!r[--e];);for(var t=new Fe(++e),n=0,s=r[0],i=1,o=function(c){t[n++]=c},a=1;a<=e;++a)if(r[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=r[a]}return{c:t.subarray(0,n),n:e}},jt=function(r,e){for(var t=0,n=0;n<e.length;++n)t+=r[n]*e[n];return t},Os=function(r,e,t){var n=t.length,s=bn(e+2);r[s]=n&255,r[s+1]=n>>8,r[s+2]=r[s]^255,r[s+3]=r[s+1]^255;for(var i=0;i<n;++i)r[s+i+4]=t[i];return(s+4+n)*8},Es=function(r,e,t,n,s,i,o,a,c,l,u){nt(e,u++,t),++s[256];for(var d=pn(s,15),p=d.t,m=d.l,f=pn(i,15),h=f.t,y=f.l,S=$s(p),w=S.c,M=S.n,v=$s(h),R=v.c,P=v.n,b=new Fe(19),g=0;g<w.length;++g)++b[w[g]&31];for(var g=0;g<R.length;++g)++b[R[g]&31];for(var _=pn(b,7),I=_.t,D=_.l,T=19;T>4&&!I[mn[T-1]];--T);var j=l+5<<3,H=jt(s,pt)+jt(i,Ht)+o,te=jt(s,p)+jt(i,h)+o+14+3*T+jt(b,I)+2*b[16]+3*b[17]+7*b[18];if(c>=0&&j<=H&&j<=te)return Os(e,u,r.subarray(c,c+l));var C,k,N,L;if(nt(e,u,1+(te<H)),u+=2,te<H){C=qe(p,m,0),k=p,N=qe(h,y,0),L=h;var q=qe(I,D,0);nt(e,u,M-257),nt(e,u+5,P-1),nt(e,u+10,T-4),u+=14;for(var g=0;g<T;++g)nt(e,u+3*g,I[mn[g]]);u+=3*T;for(var Z=[w,R],se=0;se<2;++se)for(var B=Z[se],g=0;g<B.length;++g){var Y=B[g]&31;nt(e,u,q[Y]),u+=I[Y],Y>15&&(nt(e,u,B[g]>>5&127),u+=B[g]>>12)}}else C=bp,k=pt,N=vp,L=Ht;for(var g=0;g<a;++g){var V=n[g];if(V>255){var Y=V>>18&31;Wt(e,u,C[Y+257]),u+=k[Y+257],Y>7&&(nt(e,u,V>>23&31),u+=yr[Y]);var W=V&31;Wt(e,u,N[W]),u+=L[W],W>3&&(Wt(e,u,V>>5&8191),u+=Sr[W])}else Wt(e,u,C[V]),u+=k[V]}return Wt(e,u,C[256]),u+k[256]},xp=new Sn([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Rs=new Te(0),Pp=function(r,e,t,n,s,i){var o=i.z||r.length,a=new Te(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=xp[e-1],p=d>>13,m=d&8191,f=(1<<t)-1,h=i.p||new Fe(32768),y=i.h||new Fe(f+1),S=Math.ceil(t/3),w=2*S,M=function(ut){return(r[ut]^r[ut+1]<<S^r[ut+2]<<w)&f},v=new Sn(25e3),R=new Fe(288),P=new Fe(32),b=0,g=0,_=i.i||0,I=0,D=i.w||0,T=0;_+2<o;++_){var j=M(_),H=_&32767,te=y[j];if(h[H]=te,y[j]=H,D<=_){var C=o-_;if((b>7e3||I>24576)&&(C>423||!l)){u=Es(r,c,0,v,R,P,g,I,T,_-T,u),I=b=g=0,T=_;for(var k=0;k<286;++k)R[k]=0;for(var k=0;k<30;++k)P[k]=0}var N=2,L=0,q=m,Z=H-te&32767;if(C>2&&j==M(_-Z))for(var se=Math.min(p,C)-1,B=Math.min(32767,_),Y=Math.min(258,C);Z<=B&&--q&&H!=te;){if(r[_+N]==r[_+N-Z]){for(var V=0;V<Y&&r[_+V]==r[_+V-Z];++V);if(V>N){if(N=V,L=Z,V>se)break;for(var W=Math.min(Z,V-2),z=0,k=0;k<W;++k){var K=_-Z+k&32767,G=h[K],X=K-G&32767;X>z&&(z=X,te=K)}}}H=te,te=h[H],Z+=H-te&32767}if(L){v[I++]=268435456|fn[N]<<18|Is[L];var pe=fn[N]&31,me=Is[L]&31;g+=yr[pe]+Sr[me],++R[257+pe],++P[me],D=_+N,++b}else v[I++]=r[_],++R[r[_]]}}for(_=Math.max(_,D);_<o;++_)v[I++]=r[_],++R[r[_]];u=Es(r,c,l,v,R,P,g,I,T,_-T,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=y,i.p=h,i.i=_,i.w=D)}else{for(var _=i.w||0;_<o+l;_+=65535){var ze=_+65535;ze>=o&&(c[u/8|0]=l,ze=o),u=Os(c,u+1,r.subarray(_,ze))}i.i=o}return As(a,0,n+bn(u)+s)},Ip=(function(){for(var r=new Int32Array(256),e=0;e<256;++e){for(var t=e,n=9;--n;)t=(t&1&&-306674912)^t>>>1;r[e]=t}return r})(),$p=function(){var r=-1;return{p:function(e){for(var t=r,n=0;n<e.length;++n)t=Ip[t&255^e[n]]^t>>>8;r=t},d:function(){return~r}}},Ds=function(r,e,t,n,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new Te(i.length+r.length);o.set(i),o.set(r,i.length),r=o,s.w=i.length}return Pp(r,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(r.length)))*1.5):20:12+e.mem,t,n,s)},yn=function(r,e,t){for(;t;++e)r[e]=t,t>>>=8},Ep=function(r,e){var t=e.filename;if(r[0]=31,r[1]=139,r[2]=8,r[8]=e.level<2?4:e.level==9?2:0,r[9]=3,e.mtime!=0&&yn(r,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),t){r[3]=8;for(var n=0;n<=t.length;++n)r[n+10]=t.charCodeAt(n)}},Np=function(r){(r[0]!=31||r[1]!=139||r[2]!=8)&&We(6,"invalid gzip data");var e=r[3],t=10;e&4&&(t+=(r[10]|r[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!r[t++]);return t+(e&2)},Mp=function(r){var e=r.length;return(r[e-4]|r[e-3]<<8|r[e-2]<<16|r[e-1]<<24)>>>0},kp=function(r){return 10+(r.filename?r.filename.length+1:0)};Ap=typeof TextDecoder<"u"&&new TextDecoder,Tp=0;try{Ap.decode(Rs,{stream:!0}),Tp=1}catch{}});function Op(r){let e=Buffer.from(br(r));return Buffer.concat([Cr,e])}function Us(r){if(!r.subarray(0,Cr.length).equals(Cr))return null;try{return Buffer.from(_r(r.subarray(Cr.length)))}catch{return null}}var Cr,Bs,zs,Vs=E(()=>{"use strict";vr();ee();Cr=Buffer.from("BZhVFS\0");Bs={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:r,cwd:e,args:t,uid:n,gid:s})=>{let i=t.includes("-k")||t.includes("--keep"),o=t.includes("-d")||t.includes("--decompress"),a=t.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=O(e,a);if(!r.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=r.vfs.readFileRaw(c),d=Us(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return r.vfs.writeFile(p,d,{},n,s),i||r.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=r.vfs.readFileRaw(c);return r.vfs.writeFile(`${c}.bz2`,Op(l),{},n,s),i||r.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}},zs={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:r,cwd:e,args:t,uid:n,gid:s})=>{let i=t.includes("-k")||t.includes("--keep"),o=t.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=O(e,o);if(!r.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=r.vfs.readFileRaw(a),l=Us(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return r.vfs.writeFile(u,l,{},n,s),i||r.vfs.remove(a,{recursive:!1},n,s),{exitCode:0}}}});var Gs,Ws=E(()=>{"use strict";ne();ee();Gs={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s,uid:i,gid:o})=>{let a=U(n,["-n","--number"]),c=U(n,["-b","--number-nonblank"]),l=n.filter(f=>!f.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let f of l){let h=ls(e.vfs,t,f);Ae(e.vfs,e.users,r,h,4),u.push(e.vfs.readFile(h,i,o))}let d=u.join("");if(!(a||c))return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(f=>c&&f.trim()===""?f:`${String(p++).padStart(6)}	${f}`).join(`
`),exitCode:0}}}});var wr=E(()=>{"use strict";Et();Re()});async function xr(r,e,t,n,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<r.length;){let p=r[u];if(p.subshell){let f={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await xr(p.subshell.statements,e,t,n,l,i,f),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await xr(p.group.statements,e,t,n,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let f=new AbortController;js(p.pipeline,e,t,"background",l,i,o,f),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await js(p.pipeline,e,t,n,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let m=p.op;if(!(!m||m===";")){if(m==="&&"){if((a.exitCode??0)!==0)for(;u<r.length&&r[u]?.op==="&&";)u++}else if(m==="||"&&(a.exitCode??0)===0)for(;u<r.length&&r[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l===s?void 0:l}}function js(r,e,t,n,s,i,o,a){if(!r.isValid)return{stderr:r.error||"Syntax error",exitCode:1};if(r.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return r.commands.length===1?Rp(r.commands[0],e,t,n,s,i,c,a):Dp(r.commands,e,t,n,s,i,c)}async function Rp(r,e,t,n,s,i,o,a){let c;if(r.inputFile){let d=O(s,r.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${r.inputFile}: No such file or directory`,exitCode:1}}}let l=n==="background",u=await bt(r.name,r.args,e,t,n,s,i,c,o,l,a);if(r.outputFile){let d=O(s,r.outputFile),p=u.stdout||"",m=i.users.getUid(e),f=i.users.getGid(e);try{if(r.appendOutput){let h=(()=>{try{return i.vfs.readFile(d,m,f)}catch{return""}})();i.vfs.writeFile(d,h+p,{},m,f)}else i.vfs.writeFile(d,p,{},m,f);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${r.outputFile}`,exitCode:1}}}return u}async function Dp(r,e,t,n,s,i,o){let a="",c=0;for(let l=0;l<r.length;l++){let u=r[l];if(l===0&&u.inputFile){let m=O(s,u.inputFile);try{a=i.vfs.readFile(m)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await bt(u.name,u.args,e,t,n,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let m=O(s,u.stderrFile),f=i.users.getUid(e),h=i.users.getGid(e);try{let y=(()=>{try{return i.vfs.readFile(m,f,h)}catch{return""}})();i.vfs.writeFile(m,u.stderrAppend?y+p.stderr:p.stderr,{},f,h)}catch{}}if(l===r.length-1&&u.outputFile){let m=O(s,u.outputFile),f=d.stdout||"",h=i.users.getUid(e),y=i.users.getGid(e);try{if(u.appendOutput){let S=(()=>{try{return i.vfs.readFile(m,h,y)}catch{return""}})();i.vfs.writeFile(m,S+f,{},h,y)}else i.vfs.writeFile(m,f,{},h,y);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var Hs=E(()=>{"use strict";wr();ee()});function Yt(r){let e=[],t="",n=!1,s="",i=0;for(;i<r.length;){let o=r.charAt(i),a=r[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){t+=o,i++;continue}if(o===" "){t&&(e.push(t),t=""),i++;continue}if(!n&&o==="2"&&a===">"){let c=r[i+2],l=r[i+3],u=r[i+4];if(c===">"&&l==="&"&&u==="1"){t&&(e.push(t),t=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){t&&(e.push(t),t=""),e.push("2>&1"),i+=4;continue}if(c===">"){t&&(e.push(t),t=""),e.push("2>>"),i+=3;continue}t&&(e.push(t),t=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){t&&(e.push(t),t=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}t+=o,i++}return t&&e.push(t),e}var wn=E(()=>{"use strict"});function qs(r){let e=r.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:xn(e),isValid:!0}}catch(t){return{statements:[],isValid:!1,error:t.message}}}function xn(r){let e=Fp(r),t=[];for(let n of e){let s=n.text.trim(),i={};if(n.op&&(i.op=n.op),n.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:xn(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:xn(o)}}else{let o=Lp(s);i.pipeline={commands:o,isValid:!0}}t.push(i)}return t}function Fp(r){let e=[],t="",n=0,s=!1,i="",o=0,a=(c,l)=>{t.trim()&&e.push({text:t,op:c,background:l}),t=""};for(;o<r.length;){let c=r.charAt(o),l=r.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,t+=c,o++;continue}if(s&&c===i){s=!1,t+=c,o++;continue}if(s){t+=c,o++;continue}if(c==="("){n++,t+=c,o++;continue}if(c===")"){n--,t+=c,o++;continue}if(n>0){t+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&r[o+1]!=="&"){if(r[o+1]===">"){t+=c,o++;continue}let u=t.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){t+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}t+=c,o++}return a(),e}function Lp(r){return Up(r).map(Bp)}function Up(r){let e=[],t="",n=!1,s="";for(let o=0;o<r.length;o++){let a=r.charAt(o);if((a==='"'||a==="'")&&!n){n=!0,s=a,t+=a;continue}if(n&&a===s){n=!1,t+=a;continue}if(n){t+=a;continue}if(a==="|"&&r[o+1]!=="|"){if(!t.trim())throw new Error("Syntax error near unexpected token '|'");e.push(t.trim()),t=""}else t+=a}let i=t.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function Bp(r){let e=Yt(r);if(e.length===0)return{name:"",args:[]};let t=[],n,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");n=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let m=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=m,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else t.push(p),o++}let u=t[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:t.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Ys=E(()=>{"use strict";wn()});var Js={};sp(Js,{applyUserSwitch:()=>st,makeDefaultEnv:()=>Be,runCommand:()=>le,runCommandDirect:()=>bt,userHome:()=>oe});function oe(r){return r==="root"?"/root":`/home/${r}`}async function st(r,e,t,n,s){n.vars.USER=r,n.vars.LOGNAME=r,n.vars.HOME=oe(r),n.vars.PS1=Be(r,e).vars.PS1??"";let i=`${oe(r)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await le(a,r,e,"shell",t,s,void 0,n)}catch{}}}function Be(r,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:oe(r),USER:r,LOGNAME:r,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:r==="root"?"\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Xs(r,e,t,n){if(r.startsWith("/")){if(!t.vfs.exists(r))return null;try{let o=t.vfs.stat(r);return o.type!=="file"||!(o.mode&73)||(r.startsWith("/sbin/")||r.startsWith("/usr/sbin/"))&&n!=="root"?null:r}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${r}`;if(t.vfs.exists(a))try{let c=t.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}function Zs(r,e,t,n,s,i,o,a,c,l,u){let d=c.vfs.readFile(r),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let f=Ye(p[1]);if(f){let h=c.users.getUid(s),y=c.users.getGid(s);return f.run({authUser:s,uid:h,gid:y,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:n,mode:o,args:t,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let m=Ye("sh");if(m){let f=c.users.getUid(s),h=c.users.getGid(s);return m.run({authUser:s,uid:f,gid:h,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...t],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}function bt(r,e,t,n,s,i,o,a,c,l=!1,u){if(it++,it>Pr)return it--,{stderr:`${r}: maximum call depth (${Pr}) exceeded`,exitCode:126};let d=it===1,p=1,m=c.vars.NICE_PRIORITY?Number.parseInt(c.vars.NICE_PRIORITY,10):0,f=d?o.users.registerProcess(t,r,[r,...e],c.vars.__TTY??"?",u,p,Number.isNaN(m)?0:m):-1,h=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let y=Kp(r,e,t,n,s,i,o,a,c);if(u){let S=new Promise(w=>{u.signal.addEventListener("abort",()=>{w({stderr:"",exitCode:130})},{once:!0})});return Promise.race([y,S])}return y}finally{it--,d&&f!==-1&&(o.users.addProcessCpuTime(f,Date.now()-h),l?o.users.markProcessDone(f):o.users.unregisterProcess(f))}}async function Kp(r,e,t,n,s,i,o,a,c){let l=Ks,u=[r,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let h=u.slice(0,d).map(w=>w.match(l)).filter(w=>w!==null),y=u.slice(d),S=[];for(let[,w,M]of h)w!==void 0&&M!==void 0&&(S.push([w,c.vars[w]]),c.vars[w]=M);if(y.length===0)return{exitCode:0};try{return await bt(y[0],y.slice(1),t,n,s,i,o,a,c)}finally{for(let[w,M]of S)M===void 0?delete c.vars[w]:c.vars[w]=M}}let p=c.vars[`__func_${r}`];if(p){let h=Ye("sh");if(!h)return{stderr:`${r}: sh not available`,exitCode:127};let y={};e.forEach((S,w)=>{y[String(w+1)]=c.vars[String(w+1)],c.vars[String(w+1)]=S}),y[0]=c.vars[0],c.vars[0]=r;try{let S=o.users.getUid(t),w=o.users.getGid(t);return await h.run({authUser:t,uid:S,gid:w,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[S,w]of Object.entries(y))w===void 0?delete c.vars[S]:c.vars[S]=w}}let m=c.vars[`__alias_${r}`];if(m)return le(`${m} ${e.join(" ")}`,t,n,s,i,o,a,c);let f=Ye(r);if(!f){let h=Xs(r,c,o,t);return h?Zs(h,r,e,[r,...e].join(" "),t,n,s,i,o,c,a):{stderr:`${r}: command not found`,exitCode:127}}try{let h=o.users.getUid(t),y=o.users.getGid(t);return await f.run({authUser:t,uid:h,gid:y,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[r,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(h){return{stderr:h instanceof Error?h.message:"Command failed",exitCode:1}}}async function le(r,e,t,n,s,i,o,a){let c=r.trim();if(c.length===0)return{exitCode:0};let l=a??Be(e,t);if(it++,it>Pr)return it--,{stderr:`${c.split(" ")[0]}: maximum call depth (${Pr}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let b=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(b)){let g=i.vfs.readFile(b).split(`
`).filter(Boolean),_;if(c==="!!"||c.startsWith("!! "))_=g[g.length-1];else{let I=Number.parseInt(c.slice(1),10);_=I>0?g[I-1]:g[g.length+I]}if(_){let I=c.startsWith("!! ")?c.slice(3):"";return le(`${_}${I?` ${I}`:""}`,e,t,n,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Yt(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],m=p?c.replace(d,p):c,f=zp.test(m)||Vp.test(m)||Gp.test(m)||Wp.test(m)||jp.test(m)||Hp.test(m),h=qp.test(m)||Yp.test(m);if(f&&d!=="sh"&&d!=="bash"||h){if(f&&d!=="sh"&&d!=="bash"){let g=Ye("sh");if(g){let _=i.users.getUid(e),I=i.users.getGid(e);return await g.run({authUser:e,uid:_,gid:I,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:m,mode:n,args:["-c",m],stdin:void 0,cwd:s,shell:i,env:l})}}let b=qs(m);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await xr(b.statements,e,t,n,s,i,l)}catch(g){return{stderr:g instanceof Error?g.message:"Execution failed",exitCode:1}}}let y=await gr(m,l.vars,l.lastExitCode,b=>le(b,e,t,n,s,i,void 0,l).then(g=>g.stdout??"")),S=Yt(y.trim());if(S.length===0)return{exitCode:0};if(Ks.test(S[0]))return bt(S[0],S.slice(1),e,t,n,s,i,o,l);let M=S[0]?.toLowerCase()??"",v=S.slice(1),R=[];for(let b of v)for(let g of hr(b))for(let _ of Cs(g,s,i.vfs))R.push(_);let P=Ye(M);if(!P){let b=Xs(M,l,i,e);return b?Zs(b,M,R,y,e,t,n,s,i,l,o):{stderr:`${M}: command not found`,exitCode:127}}try{let b=i.users.getUid(e),g=i.users.getGid(e);return await P.run({authUser:e,uid:b,gid:g,hostname:t,activeSessions:i.users.listActiveSessions(),rawInput:y,mode:n,args:R,stdin:o,cwd:s,shell:i,env:l})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{it--}}var Ks,zp,Vp,Gp,Wp,jp,Hp,qp,Yp,Pr,it,Re=E(()=>{"use strict";Hs();Ys();Gt();wn();Et();Ks=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,zp=/\bfor\s+\w+\s+in\b/,Vp=/\bwhile\s+/,Gp=/\bif\s+/,Wp=/\w+\s*\(\s*\)\s*\{/,jp=/\bfunction\s+\w+/,Hp=/\(\(\s*.+\s*\)\)/,qp=/(?<![|&])[|](?![|])/,Yp=/[><;&]|\|\|/;Pr=8;it=0});var Qs,ei=E(()=>{"use strict";ee();Re();Qs={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let s=O(t,n[0]??"~",oe(r));return de(r,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var ti,ri=E(()=>{"use strict";ti={name:"chage",description:"Change user password expiry information",category:"users",params:["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],run:async({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`chage: permission denied
`,exitCode:1};let n,s,i,o,a,c=!1,l;for(let p=0;p<t.length;p++){let m=t[p];if(m)if(m==="-m"){let f=t[p+1];if(!f)break;if(n=Number.parseInt(f,10),Number.isNaN(n))return{stderr:`chage: invalid number '${f}'
`,exitCode:1};p++}else if(m==="-M"){let f=t[p+1];if(!f)break;if(s=Number.parseInt(f,10),Number.isNaN(s))return{stderr:`chage: invalid number '${f}'
`,exitCode:1};p++}else if(m==="-W"){let f=t[p+1];if(!f)break;if(i=Number.parseInt(f,10),Number.isNaN(i))return{stderr:`chage: invalid number '${f}'
`,exitCode:1};p++}else if(m==="-I"){let f=t[p+1];if(!f)break;if(o=Number.parseInt(f,10),Number.isNaN(o))return{stderr:`chage: invalid number '${f}'
`,exitCode:1};p++}else if(m==="-E"){let f=t[p+1];if(!f)break;if(f==="-1"||f==="99999")a=0;else if(a=Math.floor(new Date(f).getTime()/864e5),Number.isNaN(a))return{stderr:`chage: invalid date '${f}'
`,exitCode:1};p++}else m==="-l"?c=!0:l||(l=m)}if(!l)return{stderr:`Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>
`,exitCode:1};if(!e.users.listUsers().includes(l))return{stderr:`chage: user '${l}' does not exist
`,exitCode:1};if(c){let p=e.users.getPasswordAging(l);if(!p)return{stderr:`chage: user '${l}' not found
`,exitCode:1};let m=w=>w===0?"never":new Date(w*864e5).toISOString().split("T")[0],f=m(p.lastChange),h=p.maxAge===99999?"never":m(p.lastChange+p.maxAge),y=p.inactiveDays>0?m(p.lastChange+p.maxAge+p.inactiveDays):"never",S=m(p.expiryDate);return{stdout:`${[`Last password change                                    : ${f}`,`Password expires                                        : ${h}`,`Password inactive                                       : ${y}`,`Account expires                                         : ${S}`,`Minimum number of days between password change          : ${p.minAge}`,`Maximum number of days between password change          : ${p.maxAge}`,`Number of days of warning before password expires       : ${p.warnDays}`].join(`
`)}
`,exitCode:0}}let d=l;try{return await e.users.setPasswordAging(d,n,s,i,o),a!==void 0&&await e.users.setAccountExpiry(d,a),{stdout:`chage: password aging updated for '${d}'
`,exitCode:0}}catch(p){return{stderr:`${p instanceof Error?p.message:String(p)}
`,exitCode:1}}}}});function Xp(r,e){let t=r.users.getGidByName(e);if(t!==null)return t;let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}var ni,si=E(()=>{"use strict";ee();ni={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let[s,i]=n;if(!(s&&i))return{stderr:"chgrp: missing operand",exitCode:1};if(r!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=O(t,i);try{if(de(r,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=Xp(e,s);if(a===null)return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function Zp(r,e){let t=/^([ugoa]*)([+\-=])([rwx]*)$/,n=e.split(","),s=r;for(let i of n){let o=i.trim().match(t);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let m of l.split("")){let f=d[p]?.[m];if(f!==void 0){if(c==="+")s|=f;else if(c==="-")s&=~f;else if(c==="="){let h=Object.values(d[p]??{}).reduce((y,S)=>y|S,0);s=s&~h|f}}}}return s}var ii,oi=E(()=>{"use strict";ee();ii={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s})=>{let[i,o]=n;if(!(i&&o))return{stderr:"chmod: missing operand",exitCode:1};let a=O(t,o);try{if(de(r,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=Number.parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=Zp(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function ai(r,e){if(r.users.listUsers().includes(e))return r.users.getUid(e);let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}function Jp(r,e){let t=r.users.getGidByName(e);if(t!==null)return t;let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}var ci,li=E(()=>{"use strict";ee();ci={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s})=>{let[i,o]=n;if(!(i&&o))return{stderr:"chown: missing operand",exitCode:1};if(r!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=O(t,o);try{if(de(r,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=ai(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),m=i.slice(u+1);if(p&&(c=ai(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(m&&(l=Jp(e,m),l===null))return{stderr:`chown: invalid group: ${m}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var ui,di=E(()=>{"use strict";ui={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var pi,mi=E(()=>{"use strict";pi={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:r,shell:e})=>{let t=e.network;if(r.includes("-L")||r.includes("--list")||r.length===0){let n=t.getConntrack();return n.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:`${t.formatConntrack()}

conntrack v1.4.6 (conntrack-tools): ${n.length} flow entries have been shown.
`,exitCode:0}}if(r.includes("-F")||r.includes("--flush"))return t.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(r.includes("-C")||r.includes("--count"))return{stdout:`${t.getConntrackCount()}
`,exitCode:0};if(r.includes("-S")||r.includes("--stats")){let n=t.getConntrackMax(),s=t.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${n} entries
`,exitCode:0}}if(r.includes("-E")||r.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(r.includes("-D")||r.includes("--delete")){let n=t.getConntrack();return n.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(t.flushConntrack(),{stdout:`${n.length} flow entries have been deleted.
`,exitCode:0})}return r.includes("-U")||r.includes("--update")?{stdout:`0 flow entries have been updated.
`,exitCode:0}:r.includes("-I")||r.includes("--create")?{stdout:`1 flow entries have been created.
`,exitCode:0}:r.includes("-G")||r.includes("--get")?{stderr:`conntrack: no entry found
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
  -G, --get       Get entry`,exitCode:1}}}});var fi,hi,gi,yi,Si,bi,_i,vi,Ci,wi=E(()=>{"use strict";ee();fi={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:r,authUser:e,hostname:t,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(r.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Re(),Js)),l=r.slice(1).join(" ");return c(l,e,t,n,s,i,a,o)}},hi={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:r,shell:e,authUser:t})=>{let n=r.includes("-d"),s=r.find(d=>!d.startsWith("-"))??"tmp.XXXXXXXXXX",i=s.replace(/X+$/,"")||"tmp.",o=Math.random().toString(36).slice(2,10),a=`${i}${o}`,c=a.startsWith("/")?a:`/tmp/${a}`,l=e.users.getUid(t),u=e.users.getGid(t);try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp",1023,0,0),n?e.vfs.mkdir(c,448,l,u):e.vfs.writeFile(c,"",{},l,u)}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${s}'`,exitCode:1}}return{stdout:c,exitCode:0}}},gi={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:r})=>{let e=r.resourceCaps?.cpuCapCores;return{stdout:`${e!==void 0&&e>0?e:4}`,exitCode:0}}},yi={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},Si={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:r,stdin:e,shell:t,cwd:n})=>{let s=r.indexOf("-i");if(s!==-1){let d=(r[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=Number.parseInt(d[1],10),m=Number.parseInt(d[2],10),f=[];for(let S=p;S<=m;S++)f.push(S);for(let S=f.length-1;S>0;S--){let w=Math.floor(Math.random()*(S+1));[f[S],f[w]]=[f[w],f[S]]}let h=r.indexOf("-n"),y=h===-1?f.length:Number.parseInt(r[h+1]??"0",10);return{stdout:f.slice(0,y).join(`
`),exitCode:0}}let i=e??"",o=r.find(u=>!u.startsWith("-"));if(o){let u=O(n??"/",o);if(!t.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=t.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=r.indexOf("-n"),l=c===-1?a.length:Number.parseInt(r[c+1]??"0",10);return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},bi={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:r,stdin:e,shell:t,cwd:n})=>{let s="	",i=[],o=0;for(;o<r.length;)r[o]==="-d"&&r[o+1]?(s=r[o+1],o+=2):(i.push(r[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=O(n??"/",u);return t.vfs.exists(d)?t.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},_i={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:r,stdin:e,shell:t,cwd:n})=>{let s="";if(r.length===0||r.length===1&&r[0]==="-")s=e??"";else for(let o of r){let a=O(n??"/",o);if(!t.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=t.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},vi={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:r,stdin:e,shell:t,cwd:n})=>{let s=r.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=O(n??"/",s);if(!t.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=t.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Ci={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:r,stdin:e,shell:t,cwd:n})=>{let s=r.includes("-t"),i=r.indexOf("-s"),o=i===-1?/\s+/:r[i+1]??"	",a=r.find(u=>!u.startsWith("-")&&u!==r[i+1]),c=e??"";if(a){let u=O(n??"/",a);if(!t.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=t.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(m=>m.split(o)),d=[];for(let m of u)m.forEach((f,h)=>{d[h]=Math.max(d[h]??0,f.length)});return{stdout:u.map(m=>m.map((f,h)=>f.padEnd(d[h]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import*as xi from"node:path";var Pi,Ii=E(()=>{"use strict";ne();ee();Pi={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s,gid:i})=>{let o=U(n,["-r","-R","--recursive"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"cp: missing operand",exitCode:1};let u=O(t,c),d=O(t,l);try{if(Ae(e.vfs,e.users,r,u,4),Ae(e.vfs,e.users,r,xi.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let m=(h,y)=>{e.vfs.mkdir(y,493,s,i);for(let S of e.vfs.list(h)){let w=`${h}/${S}`,M=`${y}/${S}`;if(e.vfs.stat(w).type==="directory")m(w,M);else{let R=e.vfs.readFileRaw(w);e.vfs.writeFile(M,R,{},s,i)}}},f=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;m(u,f)}else{let m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,f=e.vfs.readFileRaw(u);e.vfs.writeFile(m,f,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var $i,Ei=E(()=>{"use strict";ne();ee();$i={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:r,cwd:e,args:t,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(t,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(U(t,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(b=>!b.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,m=U(t,["-s","--silent"]),f=U(t,["-I","--head"]),h=U(t,["-L","--location"]),y=U(t,["-v","--verbose"]),S={"User-Agent":"curl/7.88.1"};if(p){let b=p.indexOf(":");b!==-1&&(S[p.slice(0,b).trim()]=p.slice(b+1).trim())}let w=d&&u==="GET"?"POST":u,M={method:w,headers:S,redirect:h?"follow":"manual"};d&&(S["Content-Type"]??="application/x-www-form-urlencoded",M.body=d);let v=[];y&&(v.push(`* Trying ${c}...`,"* Connected"),v.push(`> ${w} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let R;try{let b=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,g=new URL(b),_=g.port?Number.parseInt(g.port,10):g.protocol==="https:"?443:80,I=n.network.checkFirewall("OUTPUT","tcp",void 0,g.hostname,_);if(I==="DROP"||I==="REJECT")return{stderr:`curl: (7) Failed to connect to ${g.hostname} port ${_}: Connection refused`,exitCode:7};R=await fetch(b,M)}catch(b){return{stderr:`curl: (6) Could not resolve host: ${b instanceof Error?b.message:String(b)}`,exitCode:6}}if(y&&v.push(`< HTTP/1.1 ${R.status} ${R.statusText}`),f){let b=[`HTTP/1.1 ${R.status} ${R.statusText}`];for(let[g,_]of R.headers.entries())b.push(`${g}: ${_}`);return{stdout:`${b.join(`\r
`)}\r
`,exitCode:0}}let P;try{P=await R.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let b=O(e,l);return de(r,b,"curl"),n.vfs.writeFile(b,P,{},s,i),m||v.push(`  % Total    % Received
100 ${P.length}  100 ${P.length}`),{stderr:v.join(`
`)||void 0,exitCode:R.ok?0:22}}return{stdout:P,stderr:v.length>0?v.join(`
`):void 0,exitCode:R.ok?0:22}}}});var Ni,Mi=E(()=>{"use strict";ne();Ni={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:r,stdin:e})=>{let t=St(r,["-d"])??"	",s=(St(r,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l===void 0?{from:(c??1)-1,to:(c??1)-1}:{from:(c??1)-1,to:l-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(t),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(t)}).join(`
`),exitCode:0}}}});var ki,Ai=E(()=>{"use strict";ki={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:r})=>{let e=new Date,t=r[0];return t?.startsWith("+")?{stdout:t.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var Ti,Oi=E(()=>{"use strict";ee();Ti={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:r,cwd:e,args:t,uid:n,gid:s})=>{let i={};for(let v of t){let R=v.indexOf("=");R!==-1&&(i[v.slice(0,R)]=v.slice(R+1))}let o=i.if?O(e,i.if):void 0,a=i.of?O(e,i.of):void 0;if(!(o&&a))return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!r.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=Number.parseInt(i.bs||"512",10),l=r.vfs.readFile(o,n,s),u=Number.parseInt(i.skip||"0",10),d=Number.parseInt(i.seek||"0",10),p=i.count===void 0?void 0:Number.parseInt(i.count,10),m=u*c,f=l.slice(m),h=p===void 0?f.length:Math.min(f.length,p*c),y=f.slice(0,h),S;try{S=r.vfs.readFile(a,n,s)}catch{S=""}let w=d*c;w>0?(S.length<w&&(S=S.padEnd(w,"\0")),S=S.slice(0,w)+y+S.slice(w+y.length)):S=y,r.vfs.writeFile(a,S,{},n,s);let M=Math.ceil(y.length/c);return{stdout:`${M}+0 records in
${M}+0 records out
`,exitCode:0}}}});var Ri,Di=E(()=>{"use strict";ne();Ri={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:r,env:e})=>{if(!e)return{exitCode:0};let t=U(r,["-i"]);if(r.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=r.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(t){let l=Number.parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var Fi,Li=E(()=>{"use strict";Fi={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:({authUser:r,args:e,shell:t})=>{if(r!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return t.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=(o,a)=>o.trim()!==s?Promise.resolve({result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}):(a.users.deleteUser(s),Promise.resolve({result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}}));return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Ui,Bi=E(()=>{"use strict";Ui={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:r})=>{let t=(r.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(t)),i=Math.round(Number(t)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${t.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var zi,Vi=E(()=>{"use strict";ee();zi={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:r,cwd:e,args:t})=>{let[n,s]=t;if(!(n&&s))return{stderr:"diff: missing operand",exitCode:1};let i=O(e,n),o=O(e,s),a,c;try{a=r.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{c=r.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],m=c[d];p!==m&&(p!==void 0&&l.push(`< ${p}`),m!==void 0&&l.push(`> ${m}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Gi,Wi,ji=E(()=>{"use strict";ne();ee();Gi={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:r,authUser:e,shell:t})=>{let n=Pt(t);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=U(r,["-l","--list"]),i=U(r,["-s","--status"]),o=U(r,["-L","--listfiles"]),a=U(r,["-r","--remove"]),c=U(r,["-P","--purge"]),{positionals:l}=Ce(r,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(m=>{let f=m.name.padEnd(14).slice(0,14),h=m.version.padEnd(15).slice(0,15),y=m.architecture.padEnd(12).slice(0,12),S=(m.description||"").slice(0,40);return`ii  ${f} ${h} ${y} ${S}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Wi={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:r,shell:e})=>{let t=Pt(e);if(!t)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=U(r,["-l"]),s=U(r,["-W","--show"]),{positionals:i}=Ce(r,{flags:["-l","-W","--show"]});if(n||s){let o=t.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Hi,qi=E(()=>{"use strict";ne();ee();Hi={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:r,cwd:e,args:t})=>{let n=U(t,["-h"]),s=U(t,["-s"]),i=t.find(u=>!u.startsWith("-"))??".",o=O(e,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!r.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||r.vfs.stat(o).type==="file")return{stdout:`${a(r.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let m of r.vfs.list(u)){let f=`${u}/${m}`,h=`${d}/${m}`,y=r.vfs.stat(f);y.type==="directory"?p+=l(f,h):y.type==="device"?(p+=0,s||c.push(`0	${h}`)):(p+=y.size,s||c.push(`${a(y.size)}	${h}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function Qp(r){return r.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,t)=>String.fromCharCode(Number.parseInt(t,8)))}var Yi,Ki=E(()=>{"use strict";ne();Gt();Yi={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:r,stdin:e,env:t})=>{let{flags:n,positionals:s}=Ce(r,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):e??"",c=fr(a,t?.vars??{},t?.lastExitCode??0),l=o?Qp(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Xi,Zi=E(()=>{"use strict";Xi={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:r,authUser:e})=>{let t={...r.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(t).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var Ji,Qi=E(()=>{"use strict";Ji={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:r})=>({closeSession:!0,exitCode:Number.parseInt(r[0]??"0",10)||0})}});var eo,to=E(()=>{"use strict";eo={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:r,env:e})=>{if(r.length===0||r.length===1&&r[0]==="-p"){let t=Object.entries(e.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:t?`${t}
`:"",exitCode:0}}for(let t of r.filter(n=>n!=="-p"))if(t.includes("=")){let n=t.indexOf("="),s=t.slice(0,n),i=t.slice(n+1);e.vars[s]=i}return{exitCode:0}}}});var ro,no=E(()=>{"use strict";ro={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:r})=>{let e=r.indexOf(":");if(e>0&&e<=r.length-2){let t=r[e-1],n=r[e+1];try{let s=new RegExp(n),i=t.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(r.length>=3){let t=Number.parseInt(r[0],10),n=r[1],s=Number.parseInt(r[2],10);if(Number.isNaN(t)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(n){case"+":i=t+s;break;case"-":i=t-s;break;case"*":i=t*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(t/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=t%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});var em,so,io=E(()=>{"use strict";ee();em=[[r=>r.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[r=>r.trimStart().startsWith("{")||r.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],so={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:r,cwd:e,shell:t})=>{if(!r.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of r){let o=O(e,i);if(!t.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(t.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let c=t.vfs.readFile(o),l="data";for(let[u,d]of em)if(typeof u=="function"?u(c):u.test(c)){l=d;break}n.push(`${i}: ${l}`)}return{stdout:n.join(`
`),exitCode:s}}}});var oo,ao=E(()=>{"use strict";an();ee();Re();oo={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:r,shell:e,cwd:t,args:n,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<n.length&&!n[c].startsWith("-")&&n[c]!=="!"&&n[c]!=="(";)a.push(n[c]),c++;a.length===0&&a.push(".");let l=n.slice(c),u=Number.POSITIVE_INFINITY,d=0,p=[];function m(P,b){return f(P,b)}function f(P,b){let[g,_]=h(P,b);for(;P[_]==="-o"||P[_]==="-or";){_++;let[I,D]=h(P,_);g={type:"or",left:g,right:I},_=D}return[g,_]}function h(P,b){let[g,_]=y(P,b);for(;_<P.length&&P[_]!=="-o"&&P[_]!=="-or"&&P[_]!==")"&&((P[_]==="-a"||P[_]==="-and")&&_++,!(_>=P.length||P[_]==="-o"||P[_]===")"));){let[I,D]=y(P,_);g={type:"and",left:g,right:I},_=D}return[g,_]}function y(P,b){if(P[b]==="!"||P[b]==="-not"){let[g,_]=S(P,b+1);return[{type:"not",pred:g},_]}return S(P,b)}function S(P,b){let g=P[b];if(!g)return[{type:"true"},b];if(g==="("){let[_,I]=m(P,b+1),D=P[I]===")"?I+1:I;return[_,D]}if(g==="-name")return[{type:"name",pat:P[b+1]??"*",ignoreCase:!1},b+2];if(g==="-iname")return[{type:"name",pat:P[b+1]??"*",ignoreCase:!0},b+2];if(g==="-type")return[{type:"type",t:P[b+1]??"f"},b+2];if(g==="-maxdepth")return u=Number.parseInt(P[b+1]??"0",10),[{type:"true"},b+2];if(g==="-mindepth")return d=Number.parseInt(P[b+1]??"0",10),[{type:"true"},b+2];if(g==="-empty")return[{type:"empty"},b+1];if(g==="-print"||g==="-print0")return[{type:"print"},b+1];if(g==="-true")return[{type:"true"},b+1];if(g==="-false")return[{type:"false"},b+1];if(g==="-size"){let _=P[b+1]??"0",I=_.slice(-1);return[{type:"size",n:Number.parseInt(_,10),unit:I},b+2]}if(g==="-exec"||g==="-execdir"){let _=g==="-execdir",I=[],D=b+1;for(;D<P.length&&P[D]!==";";)I.push(P[D]),D++;return p.push({cmd:I,useDir:_}),[{type:"exec",cmd:I,useDir:_},D+1]}return[{type:"true"},b+1]}let w=l.length>0?m(l,0)[0]:{type:"true"};function M(P,b,g){switch(P.type){case"true":return!0;case"false":return!1;case"not":return!M(P.pred,b,g);case"and":return M(P.left,b,g)&&M(P.right,b,g);case"or":return M(P.left,b,g)||M(P.right,b,g);case"name":{let _=b.split("/").pop()??"";return mr(P.pat,P.ignoreCase?"i":"").test(_)}case"type":{try{let _=e.vfs.stat(b);if(P.t==="f")return _.type==="file";if(P.t==="d")return _.type==="directory";if(P.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(b).type==="directory"?e.vfs.list(b).length===0:e.vfs.readFile(b).length===0}catch{return!1}case"size":try{let I=e.vfs.readFile(b).length,D=P.unit,T=I;return D==="k"||D==="K"?T=Math.ceil(I/1024):D==="M"?T=Math.ceil(I/(1024*1024)):D==="c"&&(T=I),T===P.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let v=[];function R(P,b,g){if(g>u)return;try{de(r,P,"find")}catch{return}g>=d&&M(w,P,g)&&v.push(b);let _;try{_=e.vfs.stat(P)}catch{return}if(_.type==="directory"&&g<u)for(let I of e.vfs.list(P))R(`${P}/${I}`,`${b}/${I}`,g+1)}for(let P of a){let b=O(t,P);if(!e.vfs.exists(b))return{stderr:`find: '${P}': No such file or directory`,exitCode:1};R(b,P==="."?".":P,0)}if(p.length>0&&v.length>0){let P=[];for(let{cmd:b}of p)for(let g of v){let I=b.map(T=>T==="{}"?g:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),D=await le(I,r,i,o,t,e,void 0,s);D.stdout&&P.push(D.stdout.replace(/\n$/,"")),D.stderr&&P.push(D.stderr.replace(/\n$/,""))}return P.length>0?{stdout:`${P.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:v.join(`
`)+(v.length>0?`
`:""),exitCode:0}}}});import*as Ir from"node:os";var co,lo=E(()=>{"use strict";ne();co={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:r,shell:e})=>{let t=U(r,["-h","--human"]),n=U(r,["-m"]),s=U(r,["-g"]),i=Ir.totalmem(),o=Ir.freemem(),a=e.resourceCaps?.ramCapBytes,c=a===void 0?i:Math.min(i,a),l=a===void 0?o:Math.floor(c*(o/i)),u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),m=Math.floor(l*.95),f=Math.floor(c*.5),h=M=>t?M>=1024*1024*1024?`${(M/(1024*1024*1024)).toFixed(1)}G`:M>=1024*1024?`${(M/(1024*1024)).toFixed(1)}M`:`${(M/1024).toFixed(1)}K`:String(Math.floor(s?M/(1024*1024*1024):n?M/(1024*1024):M/1024)),y="               total        used        free      shared  buff/cache   available",S=`Mem:  ${h(c).padStart(12)} ${h(u).padStart(11)} ${h(l).padStart(11)} ${h(d).padStart(11)} ${h(p).padStart(11)} ${h(m).padStart(11)}`,w=`Swap: ${h(f).padStart(12)} ${h(0).padStart(11)} ${h(f).padStart(11)}`;return{stdout:[y,S,w].join(`
`),exitCode:0}}}});function fo(r,e=!1){let t=r.split(`
`),n=Math.max(...t.map(o=>o.length)),s=t.length===1?`< ${t[0]} >`:t.map((o,a)=>{let c=" ".repeat(n-o.length);return a===0?`/ ${o}${c} \\`:a===t.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${s} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var po,uo,mo,ho,go,yo,tm,So,bo=E(()=>{"use strict";po={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:r})=>{let e=r.length?r.join(" "):"y";return{stdout:new Array(200).fill(e).join(`
`),exitCode:0}}},uo=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],mo={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let r=Math.floor(Math.random()*uo.length);return{stdout:uo[r]??"No fortunes today.",exitCode:0}}};ho={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:r,stdin:e})=>{let t=r.length?r.join(" "):e?.trim()??"Moo.";return{stdout:fo(t),exitCode:0}}},go={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:r,stdin:e})=>{let t=r.length?r.join(" "):e?.trim()??"Hmm...";return{stdout:fo(t).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},yo={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let t="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=t[Math.floor(Math.random()*t.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=n+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},tm=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],So={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${tm.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var _o,vo=E(()=>{"use strict";_o={name:"getent",description:"Query user/group database",category:"system",params:["passwd|group [key]"],run:({shell:r,args:e})=>{let t=e[0],n=e[1];if(!t)return{stderr:`Usage: getent passwd|group [key]
`,exitCode:1};if(t==="passwd"){let i=r.users.listUsers().filter(o=>!n||o===n).map(o=>{let a=r.users.getUid(o),c=r.users.getGid(o),l=o==="root"?"/root":`/home/${o}`;return`${o}:x:${a}:${c}::${l}:/bin/bash`});return n&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}if(t==="group"){let i=r.users.listGroups().filter(o=>!n||o.name===n).map(o=>`${o.name}:x:${o.gid}:${o.members.join(",")}`);return n&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}return{stderr:`getent: unknown database '${t}'
`,exitCode:1}}}});var Co,wo=E(()=>{"use strict";Co={name:"gpasswd",description:"Administer /etc/group",category:"users",params:["[-a|-d] -G group user"],run:({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`gpasswd: permission denied
`,exitCode:1};let n,s,i;for(let a=0;a<t.length;a++)t[a]==="-a"?n="add":t[a]==="-d"?n="delete":t[a]==="-G"&&t[a+1]?(s=t[a+1],a++):i||(i=t[a]);if(!(n&&s&&i))return{stderr:`Usage: gpasswd -a|-d -G group user
`,exitCode:1};if(!e.users.listUsers().includes(i))return{stderr:`gpasswd: user '${i}' does not exist
`,exitCode:1};if(!e.users.getGroup(s))return{stderr:`gpasswd: group '${s}' does not exist
`,exitCode:1};try{return n==="add"?(e.users.addGroupMember(s,i),{stdout:`gpasswd: added '${i}' to group '${s}'
`,exitCode:0}):(e.users.removeGroupMember(s,i),{stdout:`gpasswd: removed '${i}' from group '${s}'
`,exitCode:0})}catch(a){return{stderr:`${a instanceof Error?a.message:String(a)}
`,exitCode:1}}}}});var xo,Po=E(()=>{"use strict";ne();ee();xo={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s})=>{let{flags:i,positionals:o}=Ce(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),m=i.has("-q")||i.has("--quiet")||i.has("--silent"),f=o[0],h=o.slice(1);if(!f)return{stderr:"grep: no pattern specified",exitCode:1};let y;try{let v=a?"mi":"m";y=new RegExp(f,v)}catch{return{stderr:`grep: invalid regex: ${f}`,exitCode:1}}let S=(v,R="")=>{let P=v.split(`
`),b=[];for(let g=0;g<P.length;g++){let _=P[g]??"",I=y.test(_);if(c?!I:I){let T=l?`${g+1}:`:"";b.push(`${R}${T}${_}`)}}return b},w=v=>{if(!e.vfs.exists(v))return[];if(e.vfs.stat(v).type==="file")return[v];if(!u)return[];let P=[],b=g=>{for(let _ of e.vfs.list(g)){let I=`${g}/${_}`;e.vfs.stat(I).type==="file"?P.push(I):b(I)}};return b(v),P},M=[];if(h.length===0){if(!s)return{stdout:"",exitCode:1};let v=S(s);if(d)return{stdout:`${v.length}
`,exitCode:v.length>0?0:1};if(m)return{exitCode:v.length>0?0:1};M.push(...v)}else{let v=h.flatMap(R=>{let P=O(t,R);return w(P).map(b=>({file:R,path:b}))});for(let{file:R,path:P}of v)try{de(r,P,"grep");let b=e.vfs.readFile(P),g=v.length>1?`${R}:`:"",_=S(b,g);d?M.push(v.length>1?`${R}:${_.length}`:String(_.length)):p?_.length>0&&M.push(R):M.push(..._)}catch{return{stderr:`grep: ${R}: No such file or directory`,exitCode:1}}}return{stdout:M.length>0?`${M.join(`
`)}
`:"",exitCode:M.length>0?0:1}}}});var Io,$o=E(()=>{"use strict";Io={name:"groupadd",description:"Create a new group",category:"users",params:["[-g GID] <group>"],run:({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`groupadd: permission denied
`,exitCode:1};let n,s;for(let i=0;i<t.length;i++)if(t[i]==="-g"){let o=t[i+1];if(!o)break;if(n=Number.parseInt(o,10),Number.isNaN(n)||n<0)return{stderr:`groupadd: invalid GID '${o}'
`,exitCode:1};i++}else s||(s=t[i]);if(!s)return{stderr:`Usage: groupadd [-g GID] <group>
`,exitCode:1};try{return e.users.createGroup(s,n),{stdout:`groupadd: group '${s}' created
`,exitCode:0}}catch(i){return{stderr:`${i instanceof Error?i.message:String(i)}
`,exitCode:1}}}}});var Eo,No=E(()=>{"use strict";Eo={name:"groupdel",description:"Delete a group",category:"users",params:["<group>"],run:({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`groupdel: permission denied
`,exitCode:1};let n=t[0];if(!n)return{stderr:`Usage: groupdel <group>
`,exitCode:1};try{return e.users.deleteGroup(n),{stdout:`groupdel: group '${n}' deleted
`,exitCode:0}}catch(s){return{stderr:`${s instanceof Error?s.message:String(s)}
`,exitCode:1}}}}});var Mo,ko=E(()=>{"use strict";Mo={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:r,shell:e,args:t})=>{let n=t[0]??r,s=e.users.getUserAllGroups(n);return s.length===0?{stdout:`${n}:`,exitCode:0}:{stdout:`${n} : ${s.join(" ")}`,exitCode:0}}}});var Ao,To,Oo=E(()=>{"use strict";ee();Ao={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:r,cwd:e,args:t,authUser:n})=>{if(!r.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let s=t.includes("-k")||t.includes("--keep"),i=t.includes("-d"),o=t.find(p=>!p.startsWith("-"));if(!o)return{stderr:`gzip: no file specified
`,exitCode:1};let a=O(e,o),c=r.users.getUid(n),l=r.users.getGid(n);if(i){if(!o.endsWith(".gz"))return{stderr:`gzip: ${o}: unknown suffix -- ignored
`,exitCode:1};if(!r.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};let p=r.vfs.readFile(a),m=a.slice(0,-3);return r.vfs.writeFile(m,p,{},c,l),s||r.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}if(!r.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};if(o.endsWith(".gz"))return{stderr:`gzip: ${o}: already has .gz suffix -- unchanged
`,exitCode:1};let u=r.vfs.readFileRaw(a),d=`${a}.gz`;return r.vfs.writeFile(d,u,{compress:!0},c,l),s||r.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}},To={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:r,cwd:e,args:t,authUser:n})=>{let s=t.includes("-k")||t.includes("--keep"),i=t.find(d=>!d.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let o=O(e,i),a=r.users.getUid(n),c=r.users.getGid(n);if(!r.vfs.exists(o))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let l=r.vfs.readFile(o),u=o.slice(0,-3);return r.vfs.writeFile(u,l,{},a,c),s||r.vfs.remove(o,{recursive:!1},a,c),{exitCode:0}}}});var Ro,Do=E(()=>{"use strict";ne();ee();Ro={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s})=>{let i=St(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=p.slice(0,a);return m.join(`
`)+(d.endsWith(`
`)&&m.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(t,d);try{de(r,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Lo(r,e){return r.length>=e?r:r+" ".repeat(e-r.length)}function im(r){let e=r.aliases?.length?` ${Kt}(${r.aliases.join(", ")})${Ke}`:"";return`  ${rm}${Lo(r.name,16)}${Ke}${e}${Lo("",(r.aliases?.length,0))} ${r.description??""}`}function om(r){let e={};for(let i of r){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let t=[`${Bo}Available commands${Ke}`,`${Kt}Type 'help <command>' for detailed usage.${Ke}`,""],n=[...Fo.filter(i=>e[i]),...Object.keys(e).filter(i=>!Fo.includes(i)).sort()];for(let i of n){let o=e[i];if(!o?.length)continue;t.push(`${nm}${Uo[i]??i}${Ke}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)t.push(im(c));t.push("")}let s=r.length;return t.push(`${Kt}${s} commands available.${Ke}`),t.join(`
`)}function am(r){let e=[];if(e.push(`${Bo}${r.name}${Ke} \u2014 ${r.description??"no description"}`),r.aliases?.length&&e.push(`${Kt}Aliases: ${r.aliases.join(", ")}${Ke}`),e.push(""),e.push(`${sm}Usage:${Ke}`),r.params.length)for(let n of r.params)e.push(`  ${r.name} ${n}`);else e.push(`  ${r.name}`);let t=Uo[r.category??"misc"]??r.category??"misc";return e.push(""),e.push(`${Kt}Category: ${t}${Ke}`),e.join(`
`)}function zo(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:r})=>{let e=Cn();if(r[0]){let t=r[0].toLowerCase(),n=e.find(s=>s.name===t||s.aliases?.includes(t));return n?{stdout:am(n),exitCode:0}:{stderr:`help: no help entry for '${r[0]}'`,exitCode:1}}return{stdout:om(e),exitCode:0}}}}var Fo,Uo,Bo,Ke,rm,nm,Kt,sm,Vo=E(()=>{"use strict";Et();Fo=["navigation","files","text","archive","system","package","network","shell","users","misc"],Uo={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Bo="\x1B[1m",Ke="\x1B[0m",rm="\x1B[36m",nm="\x1B[33m",Kt="\x1B[2m",sm="\x1B[32m"});var Go,Wo=E(()=>{"use strict";Go={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:r,shell:e,authUser:t})=>{let n=`/home/${t}/.bash_history`;if(!e.vfs.exists(n))return{stdout:"",exitCode:0};let i=e.vfs.readFile(n).split(`
`).filter(Boolean),o=r[0],a=o?Number.parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var jo,Ho=E(()=>{"use strict";jo={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:r})=>({stdout:r,exitCode:0})}});import*as Nt from"node:os";function Pn(r,e){let t=Math.round(r*e),n=e-t;return`${r>.8?re.red:r>.5?re.yellow:re.green}${"\u2588".repeat(t)}${re.dim}${"\u2591".repeat(n)}${re.reset}`}function _t(r){return r>=1024**3?`${(r/1024**3).toFixed(1)}G`:r>=1024**2?`${(r/1024**2).toFixed(1)}M`:r>=1024?`${(r/1024).toFixed(1)}K`:`${r}B`}function cm(r){let e=Math.floor(r/1e3),t=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return t>0?`${t}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var re,qo,Yo=E(()=>{"use strict";re={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};qo={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:r,authUser:e})=>{let t=Nt.totalmem(),n=Nt.freemem(),s=r.resourceCaps?.ramCapBytes,i=s===void 0?t:Math.min(t,s),o=s===null?n:Math.floor(i*(n/t)),a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=Nt.cpus(),p=(r.resourceCaps?.cpuCapCores===void 0?u.length:Math.min(r.resourceCaps.cpuCapCores,u.length))||4,m=Date.now()-r.startTime,f=r.users.listActiveSessions(),h=f.length+r.users.listProcesses().length+3,y=new Date().toTimeString().slice(0,8),S=a/i,w=l/c,M=20,v=[],R=[];for(let N=0;N<p;N++)R.push(Math.random()*.3+.02);let P=Math.min(p,4);for(let N=0;N<P;N++){let L=R[N],q=(L*100).toFixed(1).padStart(5);v.push(`${re.bold}${re.cyan}${String(N+1).padStart(3)}${re.reset}[${Pn(L,M)}${re.reset}] ${q}%`)}p>4&&v.push(`${re.dim}    ... ${p-4} more CPU(s) not shown${re.reset}`),v.push(`${re.bold}${re.cyan}Mem${re.reset}[${Pn(S,M)}${re.reset}] ${_t(a)}/${_t(i)}`),v.push(`${re.bold}${re.cyan}Swp${re.reset}[${Pn(w,M)}${re.reset}] ${_t(l)}/${_t(c)}`),v.push("");let b=R.slice(0,p).reduce((N,L)=>N+L,0)/p,g=(b*p).toFixed(2),_=(b*p*.9).toFixed(2),I=(b*p*.8).toFixed(2);v.push(`${re.bold}Tasks:${re.reset} ${re.green}${h}${re.reset} total  ${re.bold}Load average:${re.reset} ${g} ${_} ${I}  ${re.bold}Uptime:${re.reset} ${cm(m)}`),v.push("");let D=`${re.bgBlue}${re.bold}${re.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${re.reset}`;v.push(D);let T=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],j=1e3,H=f.map(N=>({pid:j++,user:N.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(f.length,1)*.3})),te=r.users.listProcesses().map(N=>({pid:N.pid,user:N.username,cmd:N.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),C={pid:j++,user:e,cmd:"htop",cpu:.1,mem:.1},k=[...T,...H,...te,C];for(let N of k){let L=_t(Math.floor(Math.random()*200*1024*1024+10485760)),q=_t(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=_t(Math.floor(Math.random()*5*1024*1024+512*1024)),se=N.cpu.toFixed(1).padStart(5),B=N.mem.toFixed(1).padStart(5),Y=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,V=N.user==="root"?re.red:N.user===e?re.green:re.cyan,W=N.cmd==="htop"?re.green:N.cmd==="bash"?re.cyan:re.reset;v.push(`${String(N.pid).padStart(5)} ${V}${N.user.padEnd(10).slice(0,10)}${re.reset}  20   0 ${L.padStart(6)} ${q.padStart(6)} ${Z.padStart(5)} S ${se} ${B} ${Y.padStart(9)}  ${W}${N.cmd}${re.reset}`)}return v.push(""),v.push(`${re.dim}${y} \u2014 htop snapshot (non-interactive mode)  press ${re.reset}${re.bold}q${re.reset}${re.dim} to quit in interactive mode${re.reset}`),{stdout:v.join(`
`),exitCode:0}}}});var Ko,Xo=E(()=>{"use strict";Ko={name:"id",description:"Print user identity",category:"system",params:["[-u] [-g] [-G] [-n] [user]"],run:({authUser:r,shell:e,args:t})=>{let n=t.includes("-u"),s=t.includes("-g"),i=t.includes("-G"),o=t.includes("-n"),a=t.find(f=>!f.startsWith("-"))??r,c=e.users.getUid(a),l=e.users.getGid(a),u=e.users.getUserAllGroups(a),d=u.map(f=>{let h=e.users.getGroup(f);return h?h.gid:0});if(n)return{stdout:String(c),exitCode:0};if(s)return o?{stdout:u.join(" "),exitCode:0}:{stdout:String(l),exitCode:0};if(i)return{stdout:d.join(" "),exitCode:0};let p=e.users.getNameByGid(l)??a,m=u.map(f=>{let h=e.users.getGroup(f);return h?`${h.gid}(${f})`:f}).join(",");return{stdout:`uid=${c}(${a}) gid=${l}(${p}) groups=${m}`,exitCode:0}}}});function Zo(r){let e=r.getInterfaces(),t=[];for(let n of e)t.push(ea(n)),t.push("");return{stdout:t.join(`
`),exitCode:0}}function lm(r){return{stdout:`${ea(r)}
`,exitCode:0}}function ea(r){let e=um(r),t=[];t.push(`${r.name}: flags=${e}  mtu ${r.mtu}`),r.type==="loopback"?t.push("        loop  txqueuelen 1000  (Local Loopback)"):t.push(`        ether ${r.mac}  txqueuelen 1000  (Ethernet)`),t.push(`        inet ${r.ipv4}  netmask ${dm(r.ipv4Mask)}  broadcast ${mm(r.ipv4,r.ipv4Mask)}`),t.push(`        inet6 ${r.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let n=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(n/64),o=Math.floor(s/64);return t.push(`        RX packets ${i}  bytes ${n} (${Jo(n)})`),t.push("        RX errors 0  dropped 0  overruns 0  frame 0"),t.push(`        TX packets ${o}  bytes ${s} (${Jo(s)})`),t.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),r.speed&&t.push(`        Speed: ${r.speed}Mb/s  Duplex: ${r.duplex??"full"}`),t.join(`
`)}function um(r){let e=4096;return r.state==="UP"&&(e|=1),r.type!=="loopback"&&(e|=4098),r.type==="loopback"&&(e|=8),e}function dm(r){let e=r===0?0:-1<<32-r>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function pm(r){return r.split(".").reduce((e,t)=>e+(Number.parseInt(t,10)?Number.parseInt(t,10).toString(2).split("1").length-1:0),0)}function mm(r,e){let t=r.split(".").reduce((i,o)=>(i<<8)+Number.parseInt(o,10),0)>>>0,n=e===0?0:-1<<32-e>>>0,s=t&n|~n>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function Jo(r){return r<1024?`${r} B`:r<1024*1024?`${(r/1024).toFixed(1)} KiB`:r<1024*1024*1024?`${(r/(1024*1024)).toFixed(1)} MiB`:`${(r/(1024*1024*1024)).toFixed(1)} GiB`}var Qo,ta=E(()=>{"use strict";Qo={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:r,shell:e})=>{let t=e.network,n=r.find(s=>!(s.startsWith("-")||["up","down","inet","netmask","mtu","add","del"].includes(s)));if(r.includes("-a")||!n&&r.length===0)return Zo(t);if(n){let s=t.getInterface(n);if(!s)return{stderr:`ifconfig: ${n}: error fetching interface information: Device not found
`,exitCode:1};if(r.includes("up"))return t.setInterfaceState(n,"UP"),{exitCode:0};if(r.includes("down"))return t.setInterfaceState(n,"DOWN"),{exitCode:0};let i=r.indexOf("inet");if(i!==-1){let a=r[i+1],c=r.indexOf("netmask"),l=c===-1?24:pm(r[c+1]??"255.255.255.0");return a&&t.setInterfaceIp(n,a,l),{exitCode:0}}let o=r.indexOf("mtu");if(o!==-1){let a=Number.parseInt(r[o+1]??"1500",10);return Number.isNaN(a)||t.setInterfaceMtu(n,a),{exitCode:0}}return lm(s)}return Zo(t)}}});function Xt(){let r=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${r()}:${r()}:${r()}:${r()}`}var In=E(()=>{"use strict"});var $r,$n=E(()=>{"use strict";In();In();$r=class r{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Xt(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(t=>t.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let t=this._interfaces.findIndex(n=>n.name===e);return t===-1?!1:(this._interfaces.splice(t,1),this._routes=this._routes.filter(n=>n.device!==e),this.arpCache=this.arpCache.filter(n=>n.device!==e),!0)}setInterfaceType(e,t){let n=this._interfaces.find(s=>s.name===e);return n?(n.type=t,!0):!1}setInterfaceMtu(e,t){let n=this._interfaces.find(s=>s.name===e);return n?(n.mtu=t,!0):!1}setInterfaceSpeed(e,t){let n=this._interfaces.find(s=>s.name===e);return n?(n.speed=t,!0):!1}addRoute(e,t,n,s,i){this._routes.push({destination:e,gateway:t,netmask:n,device:s,flags:t==="0.0.0.0"?"U":"UG",metric:i??0,scope:t==="0.0.0.0"?"link":"global"})}delRoute(e){let t=this._routes.findIndex(n=>n.destination===e);return t===-1?!1:(this._routes.splice(t,1),!0)}addRoutingTable(e){let t=this._nextTableId++;return this._routingTables.push({id:t,name:e,routes:[]}),t}getRoutingTable(e){return this._routingTables.find(t=>t.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,t,n,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:t,netmask:n,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let t=this._policyRules.length>0?Math.max(...this._policyRules.map(n=>n.priority))+1e3:1e3;return this._policyRules.push({...e,priority:t}),t}listPolicyRules(){return[...this._policyRules].sort((e,t)=>e.priority-t.priority)}delPolicyRule(e){let t=this._policyRules.findIndex(n=>n.priority===e);return t===-1?!1:(this._policyRules.splice(t,1),!0)}setInterfaceState(e,t){let n=this._interfaces.find(s=>s.name===e);return n?(n.state=t,!0):!1}setInterfaceIp(e,t,n){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=t,s.ipv4Mask=n,!0):!1}getInterface(e){return this._interfaces.find(t=>t.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let t=this.arpCache.find(n=>n.ip===e);return t&&t.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],t=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${t}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${r._linkType(n.type)} ${n.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${n.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),t++}return e.join(`
`)}formatIpRoute(){let e=[],t=[...this._routes].sort((n,s)=>(n.metric??0)-(s.metric??0));for(let n of t)n.destination==="default"?e.push(`default via ${n.gateway} dev ${n.device}${n.metric?` metric ${n.metric}`:""}`):e.push(`${n.destination}/${r._maskToCidr(n.netmask)} dev ${n.device}${n.metric?` metric ${n.metric}`:""}${n.scope?` scope ${n.scope}`:""}${n.proto?` proto ${n.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let t=this._routingTables.find(n=>n.id===e);return!t||t.routes.length===0?"":t.routes.map(n=>n.destination==="default"?`default via ${n.gateway} dev ${n.device}`:`${n.destination}/${r._maskToCidr(n.netmask)} dev ${n.device} proto kernel scope link src ${this._ipForDevice(n.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let t=[];for(let n of e){let s=`${n.priority}:	`;if(n.from&&(s+=`from ${n.from} `),n.to&&(s+=`to ${n.to} `),n.iif&&(s+=`iif ${n.iif} `),n.oif&&(s+=`oif ${n.oif} `),n.action==="lookup"){let i=this._routingTables.find(o=>o.id===n.table);s+=`lookup ${i?.name??n.table}`}else s+=n.action;t.push(s)}return t.push("32766:	from all lookup main"),t.push("32767:	from all lookup default"),t.join(`
`)}formatIpLink(){let e=[],t=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";n.speed&&(i+=`    ${n.speed}Mb/s`),n.duplex&&(i+=` ${n.duplex}-duplex`),e.push(`${t}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${r._linkType(n.type)} ${n.mac} brd ff:ff:ff:ff:ff:ff${i}`),t++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}static _linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}static _maskToCidr(e){return e.split(".").reduce((t,n)=>t+(Number.parseInt(n,10)?Number.parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(t=>t.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,t){return e in this._policies?(this._policies[e]=t,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,t,n,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==t)&&!(o.source&&n&&o.source!==n)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let t of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${t} (policy ${this._policies[t]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let n of this._firewallRules){if(n.chain!==t)continue;let s=n.action.padEnd(10),i=n.protocol.padEnd(6),o=(n.source??"0.0.0.0/0").padEnd(20),a=(n.destination??"0.0.0.0/0").padEnd(20),c=n.destPort?`dpt:${n.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let t={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(t),t}updateConntrack(e,t,n,s,i,o){let a=this._findConntrack(e,t,n,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(t,e,n,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:n,srcIp:e,dstIp:t,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let t=e.protocol.padEnd(5),n=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${t} ${n} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,t,n,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===t&&o.protocol===n&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,t=this._conntrack[0]?.timestamp??0;for(let n=1;n<this._conntrack.length;n++)(this._conntrack[n]?.timestamp??0)<t&&(t=this._conntrack[n]?.timestamp??0,e=n);this._conntrack.splice(e,1)}resolveRoute(e){for(let n of this.listPolicyRules())if(!(n.from&&!r._ipMatchesRule(e,n.from))&&!(n.to&&!r._ipMatchesRule(e,n.to))){if(n.action==="blackhole")return{route:null,table:-1};if(n.action==="unreachable")return{route:null,table:-2};if(n.action==="prohibit")return{route:null,table:-3};if(n.action==="lookup"){let s=this._routingTables.find(i=>i.id===n.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:n.table}}}}return{route:this._routes.find(n=>this._ipMatchesDestination(e,n))??null,table:254}}static _ipMatchesRule(e,t){if(t==="all")return!0;if(t.includes("/")){let[n,s]=t.split("/"),i=Number.parseInt(s??"32",10),o=r._ipToInt(e),a=r._ipToInt(n??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===t}_ipMatchesDestination(e,t){if(t.destination==="default"||t.destination===e)return!0;if(t.destination.includes("/"))return r._ipMatchesRule(e,t.destination);let n=r._ipToInt(e),s=r._ipToInt(t.destination),i=r._ipToInt(t.netmask);return(n&i)===(s&i)}static _ipToInt(e){return e.split(".").reduce((t,n)=>(t<<8)+Number.parseInt(n,10),0)>>>0}}});var ra,na=E(()=>{"use strict";$n();ra={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:r,shell:e})=>{let t=e.network,n=r[0]?.toLowerCase(),s=r[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=r.find(c=>c.includes("/")),o=r.indexOf("dev"),a=o!==-1&&o+1<r.length?r[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=Number.parseInt(l??"24",10);t.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=r.indexOf("dev"),o=i!==-1&&i+1<r.length?r[i+1]:void 0;return o&&t.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${t.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){let i=r.indexOf("table"),o=i===-1?void 0:Number.parseInt(r[i+1]??"254",10);if(s==="add"){let a=r.indexOf("via"),c=r.indexOf("dev"),l=r.indexOf("metric"),u=r[1]==="add"?r[2]:r[1],d=a===-1?"0.0.0.0":r[a+1],p=c===-1?"eth0":r[c+1],m=l===-1?void 0:Number.parseInt(r[l+1]??"0",10);return u&&u!=="add"&&(o?t.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",p??"eth0",o):t.addRoute(u,d??"0.0.0.0","255.255.255.0",p??"eth0",m)),{exitCode:0}}if(s==="del"){let a=r[1]==="del"?r[2]:r[1];return a&&a!=="del"&&t.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${t.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${t.formatIpRoute()}
`,exitCode:0}:{stdout:`${t.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=r[2];r.includes("up")&&i&&t.setInterfaceState(i,"UP"),r.includes("down")&&i&&t.setInterfaceState(i,"DOWN");let o=r.indexOf("mtu");if(o!==-1&&i){let a=Number.parseInt(r[o+1]??"1500",10);Number.isNaN(a)||t.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=r.indexOf("type"),o="eth1";for(let c=2;c<r.length;c++){let l=r[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=r[c]??"eth1";break}}let a=i===-1?"ether":r[i+1]??"ether";return t.addInterface({name:o,type:a,mac:Xt(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=r[2];return i&&t.removeInterface(i),{exitCode:0}}return{stdout:`${t.formatIpLink()}
`,exitCode:0}}if(n==="neigh"||n==="n")return{stdout:`${t.formatIpNeigh()}
`,exitCode:0};if(n==="rule"||n==="ru"){if(s==="show"||s==="list")return{stdout:`${t.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=r.indexOf("from"),o=r.indexOf("to"),a=r.indexOf("table"),c=r.indexOf("iif"),l=r.indexOf("oif");return t.addPolicyRule({from:i===-1?void 0:r[i+1],to:o===-1?void 0:r[o+1],table:Number.parseInt(r[a+1]??"254",10),iif:c===-1?void 0:r[c+1],oif:l===-1?void 0:r[l+1],action:"lookup"}),{exitCode:0}}if(s==="del"){let i=Number.parseInt(r[2]??"0",10);return i&&t.delPolicyRule(i),{exitCode:0}}return{stdout:`${t.formatIpRule()}
`,exitCode:0}}if(n==="route"&&r.includes("table")){let i=r.indexOf("table"),o=Number.parseInt(r[i+1]??"254",10);return{stdout:`${t.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});var sa,ia=E(()=>{"use strict";sa={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:r,shell:e})=>{let t=e.network,n="list",s="",i={};for(let o=0;o<r.length;o++){let a=r[o];if(a)switch(a){case"-L":case"--list":n="list";break;case"-A":case"--append":n="append",s=r[++o]??"";break;case"-F":case"--flush":n="flush";break;case"-P":case"--policy":n="policy",s=r[++o]??"";break;case"-p":case"--protocol":i.protocol=r[++o]??"all";break;case"-s":case"--source":i.source=r[++o];break;case"-d":case"--destination":i.destination=r[++o];break;case"--dport":i.destPort=Number.parseInt(r[++o]??"0",10);break;case"-j":case"--jump":i.action=r[++o]??"ACCEPT";break;default:break}}switch(n){case"list":return{stdout:`${t.formatFirewall()}
`,exitCode:0};case"flush":return t.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!(s&&(r.includes("-j")||["ACCEPT","DROP"].includes(r[r.length-1]??"")))){let a=r.find(c=>c==="ACCEPT"||c==="DROP");return a?t.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=r.find(a=>a==="ACCEPT"||a==="DROP");return o?t.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return s&&i.action?["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${t.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -A requires chain and -j action",exitCode:1};default:return{stderr:"iptables: no action specified (-L, -A, -F, -P)",exitCode:1}}}}});function oa(r,e){if(!r)return e.filter(n=>n.status!=="stopped").pop();let t=Number.parseInt(r.replace(/^%/,""),10);return e.find(n=>n.pid===t)}var aa,ca,la,ua=E(()=>{"use strict";aa={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:r})=>{let e=r.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},ca={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:r,shell:e})=>{let t=e.users.listProcesses(),n=oa(r[0],t);return n?n.status==="done"?{stderr:`bg: ${r[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${t.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${r[0]??"%1"}: no such job`,exitCode:1}}},la={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:r,shell:e})=>{let t=e.users.listProcesses(),n=oa(r[0],t);return n?n.status==="done"?{stderr:`fg: ${r[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${r[0]??"%1"}: no such job`,exitCode:1}}}});function En(r){let e=Number(r);if(!Number.isNaN(e)&&e>0&&e in Zt)return e;let t=r.toUpperCase().replace(/^SIG/,"");for(let[n,s]of Object.entries(Zt))if(s.name===`SIG${t}`||s.name===t)return Number(n);return null}var Zt,da=E(()=>{"use strict";Zt={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var pa,ma=E(()=>{"use strict";da();pa={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:r,shell:e})=>{let t=15,n;for(let a=0;a<r.length;a++){let c=r[a];if(c){if(c==="-l")return{stdout:`${Object.entries(Zt).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<r.length){let l=En(r[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${r[a]}'`,exitCode:1};t=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=En(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};t=u}}else c.startsWith("-")||(n=c)}}if(!n)return{stderr:"kill: no pid specified",exitCode:1};let s=Number.parseInt(n,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${n}`,exitCode:1}:e.users.killProcess(s,t)?{stdout:`Sent ${Zt[t]?.name??`signal ${t}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var fa,ha,ga=E(()=>{"use strict";Re();fa={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:r,shell:e,authUser:t})=>{let n=r[0]??t,s=`${oe(n)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},ha={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:r})=>{let e=r.includes("-n")?Number.parseInt(r[r.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var ya,Sa,ba=E(()=>{"use strict";ne();ee();ya={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s,gid:i})=>{let o=U(n,["-s","--symbolic"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"ln: missing operand",exitCode:1};let u=O(t,l),d=o?c:O(t,c);try{if(de(r,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=O(t,c);if(de(r,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let m=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},Sa={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:r,cwd:e,args:t})=>{let n=t.includes("-f")||t.includes("-e"),s=t.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=O(e,s);return r.vfs.exists(i)?r.vfs.isSymlink(i)?{stdout:`${r.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function Mt(r,e){return e?`${e}${r}${fm}`:r}function Mn(r,e,t){if(t)return gm;if(e==="directory"){let n=!!(r&512),s=!!(r&2);return n&&s?Sm:n?bm:s?_m:hm}return e==="device"?_a:r&73?ym:_a}function va(r,e,t){let n;t?n="l":e==="directory"?n="d":e==="device"?n="c":n="-";let s=l=>r&l?"r":"-",i=l=>r&l?"w":"-",o=(()=>{let l=!!(r&64);return r&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(r&8);return r&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(r&1);return e==="directory"&&r&512?l?"t":"T":l?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function Nn(r){let e=new Date,t=4320*3600*1e3,n=Math.abs(e.getTime()-r.getTime())<t,s=String(r.getDate()).padStart(2," "),i=vm[r.getMonth()]??"";if(n){let o=String(r.getHours()).padStart(2,"0"),a=String(r.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${r.getFullYear()}`}function Er(r,e){try{return r.readFile(e)}catch{return"?"}}function Cm(r,e,t){let n=e==="/"?"":e;return t.map(s=>{let i=`${n}/${s}`,o=r.isSymlink(i),a;try{a=r.stat(i)}catch{return s}let c=Mn(a.mode,a.type,o);return Mt(s,c)}).join("  ")}function wm(r,e,t,n){let s=t==="/"?"":t,i=n.map(u=>{let d=`${s}/${u}`,p=r.isSymlink(d),m;try{m=r.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:Nn(new Date),label:u}}let f=p?41471:m.mode,h=va(f,m.type,p),y=m.type==="directory"?String((m.childrenCount??0)+2):"1",S=p?Er(r,d).length:m.type==="file"?m.size??0:m.type==="device"?0:(m.childrenCount??0)*4096,w=String(S),M=Nn(m.updatedAt),v=Mn(f,m.type,p),R=p?`${Mt(u,v)} -> ${Er(r,d)}`:Mt(u,v);return{perms:h,nlink:y,size:w,date:M,label:R}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=n.length*8,l=i.map((u,d)=>{let p=(()=>{try{return r.stat(`${s}/${n[d]}`)}catch{return null}})(),m=p&&"uid"in p?p.uid:0,f=p&&"gid"in p?p.gid:0,h=e.getUsername(m)??String(m),y=e.getGroupName(f)??String(f);return`${u.perms} ${u.nlink.padStart(o)} ${h} ${y} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var fm,hm,gm,ym,_a,Sm,bm,_m,vm,Ca,wa=E(()=>{"use strict";ne();ee();fm="\x1B[0m",hm="\x1B[1;34m",gm="\x1B[1;36m",ym="\x1B[1;32m",_a="",Sm="\x1B[30;42m",bm="\x1B[37;44m",_m="\x1B[34;42m";vm=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Ca={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let s=U(n,["-l","--long","-la","-al"]),i=U(n,["-a","--all","-la","-al"]),o=dt(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=O(t,o??t);if(Ae(e.vfs,e.users,r,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,m=Mn(d?41471:u.mode,u.type,d);if(s){let f=d?41471:u.mode,h=d?Er(e.vfs,a).length:u.size??0,y=va(f,u.type,d),S=d?`${Mt(p,m)} -> ${Er(e.vfs,a)}`:Mt(p,m),w="uid"in u?u.uid:0,M="gid"in u?u.gid:0,v=e.users.getUsername(w)??String(w),R=e.users.getGroupName(M)??String(M);return{stdout:`${y} 1 ${v} ${R} ${h} ${Nn(u.updatedAt)} ${S}
`,exitCode:0}}return{stdout:`${Mt(p,m)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?wm(e.vfs,e.users,a,c):Cm(e.vfs,a,c)}
`,exitCode:0}}}});var xa,Pa=E(()=>{"use strict";ne();xa={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:r,shell:e})=>{let t=e.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(t=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=U(r,["-a","--all"]),o=U(r,["-i","--id"]),a=U(r,["-d","--description"]),c=U(r,["-r","--release"]),l=U(r,["-c","--codename"]);if(i||r.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${t}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${t}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var Ia,$a=E(()=>{"use strict";Ia={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:r,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${r}  cwd    DIR    8,1     4096    2 /home/${r}`,`bash      1001 ${r}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${r}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${r}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${r}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var Ea,Na=E(()=>{"use strict";Ea={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       cd ~`,chage:`CHAGE(1)               User Commands               CHAGE(1)

NAME
       chage - change user password expiry information

SYNOPSIS
       chage [options] user

OPTIONS
       -m days   minimum days between password changes
       -M days   maximum days password is valid
       -W days   days of warning before password expires
       -I days   days of inactivity before account lock
       -E date   account expiration date (YYYY-MM-DD or -1)
       -l        show aging information

DESCRIPTION
       chage changes the number of days between password
       changes and the date of the last password change.

EXAMPLES
       chage -M 90 alice           # password expires in 90 days
       chage -W 7 alice            # warn 7 days before expiry
       chage -E 2025-12-31 alice   # account expires end of 2025
       chage -l alice              # show alice's aging info`,chgrp:`CHGRP(1)               User Commands               CHGRP(1)

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
       fun cowsay     # ASCII cow says your message`,getent:`GETENT(1)               User Commands               GETENT(1)

NAME
       getent - get entries from administrative database

SYNOPSIS
       getent passwd [key]
       getent group [key]

DESCRIPTION
       getent retrieves entries from the Name Service Switch
       libraries. In this environment, it supports passwd
       and group databases.

EXAMPLES
       getent passwd              # list all users
       getent passwd root         # show root user entry
       getent group               # list all groups
       getent group sudo          # show sudo group entry`,gpasswd:`GPASSWD(8)       System Administration       GPASSWD(8)

NAME
       gpasswd - administer /etc/group

SYNOPSIS
       gpasswd [-a|-d] -G group user

OPTIONS
       -a    add user to group
       -d    delete user from group
       -G    specify target group

DESCRIPTION
       gpasswd is used to administer the /etc/group file,
       allowing users to be added or removed from groups.

EXAMPLES
       gpasswd -a -G developers alice   # add alice to developers
       gpasswd -d -G developers bob     # remove bob from developers`,grep:`GREP(1)                  User Commands                    GREP(1)

NAME
       grep, egrep, fgrep - print lines that match patterns

SYNOPSIS
       grep [OPTION]... PATTERNS [FILE]...

OPTIONS
       -i, --ignore-case     ignore case distinctions in patterns and data
       -v, --invert-match    select non-matching lines
       -n, --line-number     print line number with output lines
       -r, --recursive       read all files under each directory, recursively`,groupadd:`GROUPADD(8)       System Administration       GROUPADD(8)

NAME
       groupadd - create a new group

SYNOPSIS
       groupadd [options] group

OPTIONS
       -g GID   specify group ID

DESCRIPTION
       groupadd creates a new group account using the values
       specified on the command line plus the default values
       from the system.

EXAMPLES
       groupadd developers        # create group with auto GID
       groupadd -g 2000 staff     # create group with GID 2000`,groupdel:`GROUPDEL(8)       System Administration       GROUPDEL(8)

NAME
       groupdel - delete a group

SYNOPSIS
       groupdel group

DESCRIPTION
       groupdel deletes a group account. It does not remove
       any files owned by the group.

EXAMPLES
       groupadd developers       # delete the developers group`,groups:`GROUPS(1)                User Commands                  GROUPS(1)

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
       nc -u host 53        # UDP connection`,newgrp:`NEWGRP(1)               User Commands               NEWGRP(1)

NAME
       newgrp - log in to a new group

SYNOPSIS
       newgrp [group]

DESCRIPTION
       newgrp changes the user's primary group to the specified
       group for the current session. If no group is specified,
       the user's default primary group is restored.

       The user must be a member of the target group.

EXAMPLES
       newgrp developers    # switch to developers group
       newgrp              # return to default group`,nice:`NICE(1)                  User Commands                  NICE(1)

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
       -u USER     run command as USER`,swap:`SWAP(1)               User Commands               SWAP(1)

NAME
       swap - view and manage swap file usage

SYNOPSIS
       swap [options]

OPTIONS
       -s, --stats   show swap statistics
       -c, --clear   clear all swap files

DESCRIPTION
       swap displays information about the swap file store,
       which holds evicted file contents on disk for O(1)
       reload. Swap is only available in "fs" persistence mode
       with swapEnabled=true.

EXAMPLES
       swap -s              # show swap statistics
       swap --stats         # same as above
       swap -c              # clear all swap files
       swap --clear         # same as above`,sysctl:`SYSCTL(8)       System Administration       SYSCTL(8)

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
       -s     show system up since time`,usermod:`USERMOD(8)       System Administration       USERMOD(8)

NAME
       usermod - modify a user account

SYNOPSIS
       usermod [options] user

OPTIONS
       -g group    change primary group
       -G groups   set supplementary groups
       -aG group   append user to group
       -L          lock account
       -U          unlock account

DESCRIPTION
       usermod modifies the system account files to reflect
       the changes specified on the command line.

EXAMPLES
       usermod -aG developers alice   # add alice to developers
       usermod -g staff bob           # change bob's primary group
       usermod -L charlie             # lock charlie's account`,w:`W(1)                     User Commands                       W(1)

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
       zip -d archive.zip file.txt   # remove from archive`}});var xm,Ma,ka=E(()=>{"use strict";Na();xm={gunzip:"gzip"},Ma={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:({args:r,shell:e})=>{let t=r[0];if(!t)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${t}.1`;if(e.vfs.exists(n))return{stdout:e.vfs.readFile(n),exitCode:0};let s=t.toLowerCase(),i=xm[s]??s,o=Ea[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${t}`,exitCode:16}}}});import{createHash as Aa}from"node:crypto";import*as Ta from"node:path";var Oa,Ra,Da,Fa,La,Ua,Ba,za=E(()=>{"use strict";ne();ee();Oa={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:r,cwd:e,args:t})=>{let n=t.find(o=>!o.startsWith("-"));if(!n)return{stderr:`realpath: missing operand
`,exitCode:1};let s=O(e,n);if(!r.vfs.exists(s))return{stderr:`realpath: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.isSymlink(s)?r.vfs.resolveSymlink(s):s;return{stdout:`${Ta.posix.normalize(i)}
`,exitCode:0}}},Ra={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:r,cwd:e,args:t})=>{let n=t.find(a=>!a.startsWith("-"));if(!n)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=O(e,n);if(!r.vfs.exists(s))return{stderr:`md5sum: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFile(s);return{stdout:`${Aa("md5").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Da={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:r,cwd:e,args:t})=>{let n=t.find(a=>!a.startsWith("-"));if(!n)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=O(e,n);if(!r.vfs.exists(s))return{stderr:`sha256sum: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFile(s);return{stdout:`${Aa("sha256").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Fa={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:r,cwd:e,args:t})=>{let n=t.find(c=>!c.startsWith("-"));if(!n)return{stderr:`strings: missing file operand
`,exitCode:1};let s=O(e,n);if(!r.vfs.exists(s))return{stderr:`strings: ${n}: No such file or directory
`,exitCode:1};let i=r.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},La={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:r,cwd:e,args:t,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(t,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=O(e,a);if(!r.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=r.vfs.readFile(d)}else c=n;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let m=0;m<d.length;m+=o)p.push(d.slice(m,m+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Ua={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:r,cwd:e,args:t,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(t,{flagsWithValue:["-t","--tabs"]}),o=Number.parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=O(e,a);if(!r.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=r.vfs.readFile(u)}else c=n;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Ba={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:r,cwd:e,args:t,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ce(t,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=O(e,a);if(!r.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=r.vfs.readFile(p)}else c=n;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});import*as Va from"node:path";var Ga,Wa=E(()=>{"use strict";ne();ee();Ga={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<n.length;o++){let a=dt(n,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=O(t,a);Ae(e.vfs,e.users,r,Va.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var ja,Ha,qa,Ya=E(()=>{"use strict";ja=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],Ha={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:r,args:e})=>{let t="null",n="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!ja.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${ja.join(", ")}`,exitCode:1};t=o}else i&&!i.startsWith("-")&&(n=i)}if(!n)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return r.vfs.mknod(n,t),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},qa={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:r,args:e,authUser:t})=>{let n=e.find(o=>!o.startsWith("-"));if(!n)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};let s=r.users.getUid(t),i=r.users.getGid(t);try{return r.vfs.writeFile(n,"",{mode:420},s,i),{exitCode:0}}catch(o){return{stderr:`mkfifo: ${o instanceof Error?o.message:String(o)}`,exitCode:1}}}}});var Ka,Xa=E(()=>{"use strict";Ka={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(r){let e=r.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let t=r.args[0]?r.args[0].startsWith("/")?r.args[0]:`${r.cwd}/${r.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(t),{exitCode:0}}}});import*as Za from"node:path";var Ja,Qa=E(()=>{"use strict";ee();Ja={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let s=n.filter(d=>!d.startsWith("-")),[i,o]=s;if(!(i&&o))return{stderr:"mv: missing operand",exitCode:1};let a=O(t,i),c=O(t,o),l=e.users.getUid(r),u=e.users.getGid(r);try{if(Ae(e.vfs,e.users,r,a,2),Ae(e.vfs,e.users,r,Za.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,d,l,u),{exitCode:0}}catch(d){return{stderr:`mv: ${d instanceof Error?d.message:String(d)}`,exitCode:1}}}}});import*as ec from"node:path";var tc,rc=E(()=>{"use strict";ee();tc={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=O(t,s);de(r,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=ec.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as lc,readdirSync as Pm,readFileSync as kn}from"node:fs";import*as ke from"node:os";import*as uc from"node:path";function Im(r){let e=Math.max(1,Math.floor(r/60)),t=Math.floor(e/1440),n=Math.floor(e%1440/60),s=e%60,i=[];return t>0&&i.push(`${t} day${t>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function nc(r){return`\x1B[${r}m   \x1B[0m`}function $m(){let r=[40,41,42,43,44,45,46,47].map(nc).join(""),e=[100,101,102,103,104,105,106,107].map(nc).join("");return[r,e]}function sc(r,e,t){if(r.trim().length===0)return r;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=t<=1?0:e/(t-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),c=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${c}m${r}\x1B[0m`}function Em(r){if(r.trim().length===0)return r;let e=r.indexOf(":");if(e===-1)return r.includes("@")?ic(r):r;let t=r.substring(0,e+1),n=r.substring(e+1);return ic(t)+n}function ic(r){let e=new RegExp("\x1B\\[[\\d;]*m","g"),t=r.replace(e,"");if(t.trim().length===0)return r;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<t.length;o+=1){let a=t.length<=1?0:o/(t.length-1),c=Math.round(n.r+(s.r-n.r)*a),l=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${t[o]}\x1B[0m`}return i}function oc(r){return Math.max(0,Math.round(r/(1024*1024)))}function ac(){try{let r=kn("/etc/os-release","utf8");for(let e of r.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{}}function cc(r){try{let e=kn(r,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{}}function Nm(r){let e=cc("/sys/devices/virtual/dmi/id/sys_vendor"),t=cc("/sys/devices/virtual/dmi/id/product_name");return e&&t?`${e} ${t}`:t||r}function Mm(){let r=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of r)if(lc(e))try{return kn(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function km(){let r=["/snap","/var/lib/snapd/snaps"];for(let e of r)if(lc(e))try{return Pm(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function Am(){let r=Mm(),e=km();return r!==void 0&&e!==void 0?`${r} (dpkg), ${e} (snap)`:r!==void 0?`${r} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function Tm(r){let e=ke.cpus(),t=r.cpuCapCores,n=t!==void 0&&t>0?e.slice(0,t):e;if(n.length===0)return"unknown";let s=n[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${n.length}) @ ${i}GHz`}function Om(r){return!r||r.trim().length===0?"unknown":uc.posix.basename(r.trim())}function Rm(r){let e=ke.totalmem(),t=ke.freemem(),n=r.ramCapBytes,s=n!==void 0&&n>0?Math.min(e,n):e,i=n!==void 0&&n>0?Math.floor(s*(t/e)):t,o=Math.max(0,s-i),a=r.shellProps,c=process.uptime();return r.uptimeSeconds===void 0&&(r.uptimeSeconds=Math.round(c)),{user:r.user,host:r.host,osName:a?.os??r.osName??`${ac()??ke.type()} ${ke.arch()}`,kernel:a?.kernel??r.kernel??ke.release(),uptimeSeconds:r.uptimeSeconds??ke.uptime(),packages:r.packages??Am(),shell:Om(r.shell),shellProps:r.shellProps??{kernel:r.kernel??ke.release(),os:r.osName??`${ac()??ke.type()} ${ke.arch()}`,arch:ke.arch()},resolution:r.resolution??a?.resolution??"n/a (ssh)",terminal:r.terminal??"unknown",cpu:r.cpu??Tm(r),gpu:r.gpu??a?.gpu??"n/a",memoryUsedMiB:r.memoryUsedMiB??oc(o),memoryTotalMiB:r.memoryTotalMiB??oc(s),cpuCapCores:r.cpuCapCores??0,ramCapBytes:r.ramCapBytes??0}}function dc(r){let e=Rm(r),t=Im(e.uptimeSeconds),n=$m(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${Nm(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${t}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=sc(l.padEnd(31," "),c,s.length),p=Em(u);a.push(`${d}  ${p}`);continue}a.push(sc(l,c,s.length))}return a.join(`
`)}var pc=E(()=>{"use strict"});var mc,fc=E(()=>{"use strict";pc();ne();mc={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:r,authUser:e,hostname:t,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?U(r,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:U(r,"--off")?{stdout:`${e}@${t}`,exitCode:0}:{stdout:dc({user:e,host:t,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:n.resourceCaps?.cpuCapCores,ramCapBytes:n.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});var hc,gc=E(()=>{"use strict";hc={name:"nc",aliases:["netcat"],description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:r})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let t=e,n=r.includes("-l"),s=r.indexOf("-p"),i=s!==-1&&r[s+1]?Number.parseInt(r[s+1],10):void 0,o=r.includes("-v");if(n&&i)return new Promise(u=>{let d=t.createServer(p=>{let m="";p.on("data",f=>{m+=f.toString()}),p.on("end",()=>{d.close(),u({stdout:m,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=r.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?Number.parseInt(a[1],10):Number.NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=t.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var yc,Sc=E(()=>{"use strict";yc={name:"newgrp",description:"Switch primary group for current session",category:"users",params:["[group]"],run:({authUser:r,shell:e,args:t})=>{let n=t[0];if(!n){let i=e.users.getGid(r);return{stdout:`newgrp: switched to default group '${e.users.getNameByGid(i)??r}' (${i})
`,exitCode:0}}let s=e.users.getGroup(n);return s?e.users.isMemberOf(r,n)?{stdout:`newgrp: switched to group '${n}' (${s.gid})
`,exitCode:0}:{stderr:`newgrp: user '${r}' is not a member of '${n}'
`,exitCode:1}:{stderr:`newgrp: group '${n}' does not exist
`,exitCode:1}}}});var bc,_c=E(()=>{"use strict";ne();Re();bc={name:"nice",description:"Run command with adjusted scheduling priority",category:"system",params:["[-n priority] [-p pid] [command [args...]]"],run:({authUser:r,hostname:e,mode:t,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let{flagsWithValues:c,positionals:l}=Ce(a,{flagsWithValue:["-n","-p"]}),u=c.get("-n"),d=c.get("-p");if(d){let h=Number.parseInt(d,10);if(Number.isNaN(h))return{stderr:`nice: invalid PID: ${d}
`,exitCode:1};let y=u===void 0?0:Number.parseInt(u,10);if(Number.isNaN(y)||y<-20||y>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let S=s.users.getProcess(h);if(!S)return{stderr:`nice: no such process: ${h}
`,exitCode:1};if(S.username!==r&&r!=="root")return{stderr:`nice: permission denied
`,exitCode:1};let w=S.nice;return s.users.setProcessNice(h,y)?{stdout:`pid ${h}: nice ${w} \u2192 ${y} (${S.priority})
`,exitCode:0}:{stderr:`nice: failed to set priority
`,exitCode:1}}let p=u===void 0?10:Number.parseInt(u,10);if(Number.isNaN(p)||p<-20||p>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let m=l.join(" ");if(!m)return{stdout:`0
`,exitCode:0};let f={...o,NICE_PRIORITY:String(p)};return le(m,r,e,t,n,s,i,f)}}});import vc from"node:vm";function Dm(r,e){let t={version:Nr,versions:Cc,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(r.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Mr(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>r.push(i.map(Xe).join(" ")),error:(...i)=>e.push(i.map(Xe).join(" ")),warn:(...i)=>e.push(i.map(Xe).join(" ")),info:(...i)=>r.push(i.map(Xe).join(" ")),dir:i=>r.push(Xe(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Xe).join(" "),inspect:o=>Xe(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},vc.createContext({console:n,process:t,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Xe(r){if(r===null)return"null";if(r===void 0)return"undefined";if(typeof r=="string")return r;if(typeof r=="function")return`[Function: ${r.name||"(anonymous)"}]`;if(Array.isArray(r))return`[ ${r.map(Xe).join(", ")} ]`;if(r instanceof Error)return`${r.name}: ${r.message}`;if(typeof r=="object")try{return`{ ${Object.entries(r).map(([t,n])=>`${t}: ${Xe(n)}`).join(", ")} }`}catch{return"[Object]"}return String(r)}function kr(r){let e=[],t=[],n=Dm(e,t),s=0;try{let i=vc.runInContext(r,n,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Xe(i))}catch(i){i instanceof Mr?s=i.code:i instanceof Error?(t.push(`${i.name}: ${i.message}`),s=1):(t.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:t.length?`${t.join(`
`)}
`:"",exitCode:s}}function Fm(r){let e=r.trim();return e.includes(`
`)||e.startsWith("const ")||e.startsWith("let ")||e.startsWith("var ")||e.startsWith("function ")||e.startsWith("class ")||e.startsWith("if ")||e.startsWith("for ")||e.startsWith("while ")||e.startsWith("import ")||e.startsWith("//")?kr(`(async () => { ${r} })()`):kr(e)}var Nr,Cc,Mr,wc,xc=E(()=>{"use strict";ne();ee();Nr="v18.19.0",Cc={node:Nr,npm:"9.2.0",v8:"10.2.154.26-node.22"};Mr=class{constructor(e){this.code=e}code};wc={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:r,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(U(r,["--version","-v"]))return{stdout:`${Nr}
`,exitCode:0};if(U(r,["--versions"]))return{stdout:`${JSON.stringify(Cc,null,2)}
`,exitCode:0};let n=r.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=r[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=kr(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=r.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=r[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=kr(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=r.find(o=>!o.startsWith("-"));if(i){let o=O(t,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Fm(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Nr}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Pc,Ic=E(()=>{"use strict";Re();Pc={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:({authUser:r,hostname:e,mode:t,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?le(c,r,e,t,n,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Ar,Lm,$c,Ec,Nc=E(()=>{"use strict";ne();Ar="9.2.0",Lm="18.19.0",$c={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:r,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(U(r,["--version","-v"]))return{stdout:`${Ar}
`,exitCode:0};let t=r[0]?.toLowerCase();switch(t){case"version":case"-version":return{stdout:`{ npm: '${Ar}', node: '${Lm}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${t==="ls"||t==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ar}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${t}
`,exitCode:1}}}},Ec={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:r,shell:e})=>e.packageManager.isInstalled("npm")?U(r,["--version"])?{stdout:`${Ar}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Mc,kc=E(()=>{"use strict";Mc={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Ac,Tc=E(()=>{"use strict";Ac={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:r,args:e,shell:t,stdin:n})=>{let s=e[0]??r;if(r!=="root"&&r!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!t.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await t.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Oc,Rc=E(()=>{"use strict";Oc={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:r,stdin:e})=>{let t=r.indexOf("-e"),n=t===-1?void 0:r[t+1],s=r.includes("-p"),i=r.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],m=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),f=m.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(f){let y=f[4]??"";try{let S=new RegExp(f[2],y.includes("i")?y.includes("g")?"gi":"i":y.includes("g")?"g":"");p=p.replace(S,f[3])}catch{}s&&l.push(p);continue}let h=m.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let y=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(n.startsWith("say")?y:y.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});async function Bm(r,e){try{let{execSync:t}=await import("node:child_process");return{stdout:t(`ping -c ${r} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(t){let n=t instanceof Error?t.stderr:"";return n?{stderr:n}:null}}var Um,Dc,Fc=E(()=>{"use strict";ne();Um=typeof process>"u"||typeof process.versions?.node>"u";Dc={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:r,shell:e})=>{let{flagsWithValues:t,positionals:n}=Ce(r,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=t.get("-c"),o=i?Math.max(1,Number.parseInt(i,10)||4):4;if(!Um){let p=await Bm(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let m=e.network.ping(s);m<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${m.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function zm(r,e){let t=0,n="",s=0;for(;s<r.length;){if(r[s]==="\\"&&s+1<r.length)switch(r[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=r[s],s++;continue}if(r[s]==="%"&&s+1<r.length){let i=s+1,o=!1;r[i]==="-"&&(o=!0,i++);let a=!1;r[i]==="0"&&(a=!0,i++);let c=0;for(;i<r.length&&/\d/.test(r[i]);)c=c*10+Number.parseInt(r[i],10),i++;let l=-1;if(r[i]===".")for(i++,l=0;i<r.length&&/\d/.test(r[i]);)l=l*10+Number.parseInt(r[i],10),i++;let u=r[i],d=e[t++]??"",p=(m,f=" ")=>{if(c<=0||m.length>=c)return m;let h=f.repeat(c-m.length);return o?m+h:h+m};switch(u){case"s":{let m=String(d);l>=0&&(m=m.slice(0,l)),n+=p(m);break}case"d":case"i":n+=p(String(Number.parseInt(d,10)||0),a?"0":" ");break;case"f":{let m=l>=0?l:6;n+=p((Number.parseFloat(d)||0).toFixed(m));break}case"o":n+=p((Number.parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((Number.parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((Number.parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",t--;break;default:n+=r[s],s++;continue}s=i+1;continue}n+=r[s],s++}return n}var Lc,Uc=E(()=>{"use strict";Lc={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:r})=>{let e=r[0];return e?{stdout:zm(e,r.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Bc,zc,Vc=E(()=>{"use strict";Bc={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:r,args:e})=>{let t=e.includes("-f"),n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(n),i=[];for(let o=0;o<r.length;o++){let a=r[o];if(a===void 0)continue;let c=t?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},zc={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:r,shell:e,args:t})=>{let n=t.includes("-f"),s=t.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of r){let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var Gc,Wc=E(()=>{"use strict";ne();Gc={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:r,shell:e,args:t})=>{let n=e.users.listActiveSessions(),s=e.users.listProcesses(),i=U(t,["-u"])||t.includes("u")||t.includes("aux")||t.includes("au"),o=U(t,["-a","-x"])||t.includes("a")||t.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),c=1e3+n.length;if(i){let p=["USER       PID  NI PRI %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let m of n){let f=m.username.padEnd(10).slice(0,10),h=(Math.random()*.5).toFixed(1),y=Math.floor(Math.random()*2e4+5e3),S=Math.floor(Math.random()*5e3+1e3);p.push(`${f} ${String(a.get(m.id)).padStart(6)}   0  20  0.0  ${h.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let m of s){if(!o&&m.username!==r)continue;let f=m.username.padEnd(10).slice(0,10),h=(Math.random()*1.5).toFixed(1),y=Math.floor(Math.random()*5e4+1e4),S=Math.floor(Math.random()*1e4+2e3),w=m.nice??0,M=20-w;p.push(`${f} ${String(m.pid).padStart(6)} ${String(w).padStart(3)} ${String(M).padStart(3)}  0.1  ${h.padStart(4)} ${String(y).padStart(6)} ${String(S).padStart(5)} ${m.tty.padEnd(8)} S    00:00   0:00 ${m.command}`)}return p.push(`root       ${String(c).padStart(6)}   0  20  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==r||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===r?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==r||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var jc,Hc=E(()=>{"use strict";jc={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:r})=>({stdout:r,exitCode:0})}});function ve(r=[]){return{__pytype__:"dict",data:new Map(r)}}function An(r,e,t=1){return{__pytype__:"range",start:r,stop:e,step:t}}function be(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="dict"}function At(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="range"}function Ze(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="func"}function Tn(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="class"}function Jt(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="instance"}function ot(r){return!!r&&typeof r=="object"&&!Array.isArray(r)&&r.__pytype__==="none"}function $e(r){return r===null||ot(r)?"None":r===!0?"True":r===!1?"False":typeof r=="number"?Number.isInteger(r)?String(r):r.toPrecision(12).replace(/\.?0+$/,""):typeof r=="string"?`'${r.replace(/'/g,"\\'")}'`:Array.isArray(r)?`[${r.map($e).join(", ")}]`:be(r)?`{${[...r.data.entries()].map(([e,t])=>`'${e}': ${$e(t)}`).join(", ")}}`:At(r)?`range(${r.start}, ${r.stop}${r.step===1?"":`, ${r.step}`})`:Ze(r)?`<function ${r.name} at 0x...>`:Tn(r)?`<class '${r.name}'>`:Jt(r)?`<${r.cls.name} object at 0x...>`:String(r)}function J(r){return r===null||ot(r)?"None":r===!0?"True":r===!1?"False":typeof r=="number"?Number.isInteger(r)?String(r):r.toPrecision(12).replace(/\.?0+$/,""):typeof r=="string"?r:Array.isArray(r)?`[${r.map($e).join(", ")}]`:be(r)?`{${[...r.data.entries()].map(([e,t])=>`'${e}': ${$e(t)}`).join(", ")}}`:At(r)?`range(${r.start}, ${r.stop}${r.step===1?"":`, ${r.step}`})`:$e(r)}function Le(r){return r===null||ot(r)?!1:typeof r=="boolean"?r:typeof r=="number"?r!==0:typeof r=="string"||Array.isArray(r)?r.length>0:be(r)?r.data.size>0:At(r)?Yc(r)>0:!0}function Yc(r){if(r.step===0)return 0;let e=Math.ceil((r.stop-r.start)/r.step);return Math.max(0,e)}function Gm(r){let e=[];for(let t=r.start;(r.step>0?t<r.stop:t>r.stop)&&(e.push(t),!(e.length>1e4));t+=r.step);return e}function Ie(r){if(Array.isArray(r))return r;if(typeof r=="string")return[...r];if(At(r))return Gm(r);if(be(r))return[...r.data.keys()];throw new _e("TypeError",`'${vt(r)}' object is not iterable`)}function vt(r){return r===null||ot(r)?"NoneType":typeof r=="boolean"?"bool":typeof r=="number"?Number.isInteger(r)?"int":"float":typeof r=="string"?"str":Array.isArray(r)?"list":be(r)?"dict":At(r)?"range":Ze(r)?"function":Tn(r)?"type":Jt(r)?r.cls.name:"object"}function Wm(r){let e=new Map,t=ve([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return t.__methods__={getcwd:()=>r,getenv:n=>typeof n=="string"?process.env[n]??A:A,path:ve([["join",A],["exists",A],["dirname",A],["basename",A]]),listdir:()=>[]},e.set("__builtins__",A),e.set("__name__","__main__"),e.set("__cwd__",r),e}function jm(r){let e=ve([["sep","/"],["curdir","."]]),t=ve([["sep","/"],["linesep",`
`],["name","posix"]]);return t._cwd=r,e._cwd=r,t.path=e,t}function Hm(){return ve([["version",Tr],["version_info",ve([["major",3],["minor",11],["micro",2]].map(([r,e])=>[r,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function qm(){return ve([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",Number.POSITIVE_INFINITY],["nan",Number.NaN],["sqrt",A],["floor",A],["ceil",A],["log",A],["pow",A],["sin",A],["cos",A],["tan",A],["fabs",A],["factorial",A]])}function Ym(){return ve([["dumps",A],["loads",A]])}function Km(){return ve([["match",A],["search",A],["findall",A],["sub",A],["split",A],["compile",A]])}var Vm,Tr,A,_e,kt,Qt,er,tr,qc,Or,Kc,Xc=E(()=>{"use strict";ne();ee();Vm="Python 3.11.2",Tr="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",A={__pytype__:"none"};_e=class{constructor(e,t){this.type=e;this.message=t}type;message;toString(){return`${this.type}: ${this.message}`}},kt=class{constructor(e){this.value=e}value},Qt=class{},er=class{},tr=class{constructor(e){this.code=e}code};qc={os:jm,sys:()=>Hm(),math:()=>qm(),json:()=>Ym(),re:()=>Km(),random:()=>ve([["random",A],["randint",A],["choice",A],["shuffle",A]]),time:()=>ve([["time",A],["sleep",A],["ctime",A]]),datetime:()=>ve([["datetime",A],["date",A],["timedelta",A]]),collections:()=>ve([["Counter",A],["defaultdict",A],["OrderedDict",A]]),itertools:()=>ve([["chain",A],["product",A],["combinations",A],["permutations",A]]),functools:()=>ve([["reduce",A],["partial",A],["lru_cache",A]]),string:()=>ve([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Or=class r{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}static _splitArgs(e){let t=[],n=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(n++,s+=c):")]}".includes(c)?(n--,s+=c):c===","&&n===0?(t.push(s.trim()),s=""):s+=c}return s.trim()&&t.push(s.trim()),t}pyEval(e,t){if(e=e.trim(),!e||e==="None")return A;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return A;if(/^-?\d+$/.test(e))return Number.parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return Number.parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return Number.parseInt(e,16);if(/^0o[0-7]+$/.test(e))return Number.parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=e.match(/^f(['"])([\s\S]*)\1$/);if(n){let l=n[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return J(this.pyEval(d.trim(),t))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,m,f]=u,h=Ie(this.pyEval(m.trim(),t)),y=[];for(let S of h){let w=new Map(t);w.set(p,S),!(f&&!Le(this.pyEval(f,w)))&&y.push(this.pyEval(d.trim(),w))}return y}return r._splitArgs(l).map(d=>this.pyEval(d,t))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=r._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],t):u.map(d=>this.pyEval(d,t))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return ve();let u=ve();for(let d of r._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let m=J(this.pyEval(d.slice(0,p).trim(),t)),f=this.pyEval(d.slice(p+1).trim(),t);u.data.set(m,f)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!Le(this.pyEval(i[1],t));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,t);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),t);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=r._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),t),d=e.slice(l+1,-1);return this._subscript(u,d,t)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?r._splitArgs(u):[]).map(p=>this.pyEval(p,t));return this._callBuiltin(l,d,t)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,t);if(d!==void 0){let m=d.slice(1,-1),f=m.trim()?r._splitArgs(m).map(h=>this.pyEval(h,t)):[];return this._callMethod(p,u,f)}return r._getAttr(p,u,t)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(t.has(e))return t.get(e);throw new _e("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=t.get(l[0])??(()=>{throw new _e("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=r._getAttr(u,d,t);return u}return A}static _findMatchingBracket(e,t){let n=t==="["?"]":t==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===n&&s++,e[i]===t&&(s--,s===0))return i;return-1}_findDotAccess(e){let t=0,n=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(n){o===s&&e[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){t++;continue}if("([{".includes(o)){t--;continue}if(t!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,t,n){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of t)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let m=e.slice(0,a).trim(),f=e.slice(a+l.length).trim();if(!(m&&f))continue;return this._applyBinaryOp(l,m,f,n)}}}}_applyBinaryOp(e,t,n,s){if(e==="and"){let a=this.pyEval(t,s);return Le(a)?this.pyEval(n,s):a}if(e==="or"){let a=this.pyEval(t,s);return Le(a)?a:this.pyEval(n,s)}let i=this.pyEval(t,s),o=this.pyEval(n,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new _e("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new _e("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return r._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new _e("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return $e(i)===$e(o)||i===o;case"!=":return $e(i)!==$e(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return r._pyIn(o,i);case"not in":return!r._pyIn(o,i);case"is":return i===o||ot(i)&&ot(o);case"is not":return!(i===o||ot(i)&&ot(o));default:return A}}static _pyIn(e,t){return typeof e=="string"?typeof t=="string"&&e.includes(t):Array.isArray(e)?e.some(n=>$e(n)===$e(t)):be(e)?e.data.has(J(t)):!1}_subscript(e,t,n){if(t.includes(":")){let i=t.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):A}let s=this.pyEval(t,n);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??A}if(be(e))return e.data.get(J(s))??A;throw new _e("TypeError",`'${vt(e)}' is not subscriptable`)}static _getAttr(e,t,n){return be(e)?e.data.has(t)?e.data.get(t):t==="path"&&e.path?e.path:A:Jt(e)?e.attrs.get(t)??A:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[t]??A:A}_callMethod(e,t,n){if(typeof e=="string")switch(t){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(n[0]?e.replace(new RegExp(`[${n[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof n[0]=="string"?n[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Ie(n[0]??[]).map(J).join(e);case"replace":return e.replaceAll(J(n[0]??""),J(n[1]??""));case"startswith":return e.startsWith(J(n[0]??""));case"endswith":return e.endsWith(J(n[0]??""));case"find":return e.indexOf(J(n[0]??""));case"index":{let s=e.indexOf(J(n[0]??""));if(s===-1)throw new _e("ValueError","substring not found");return s}case"count":return e.split(J(n[0]??"")).length-1;case"format":return r._pyStringFormat(e,n);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=n[0]??0,i=J(n[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(n[0]??0,J(n[1]??" "));case"rjust":return e.padStart(n[0]??0,J(n[1]??" "));case"zfill":return e.padStart(n[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("");default:break}if(Array.isArray(e))switch(t){case"append":return e.push(n[0]??A),A;case"extend":for(let s of Ie(n[0]??[]))e.push(s);return A;case"insert":return e.splice(n[0]??0,0,n[1]??A),A;case"pop":{let s=n[0]===void 0?-1:n[0],i=s<0?e.length+s:s;return e.splice(i,1)[0]??A}case"remove":{let s=e.findIndex(i=>$e(i)===$e(n[0]??A));return s!==-1&&e.splice(s,1),A}case"index":{let s=e.findIndex(i=>$e(i)===$e(n[0]??A));if(s===-1)throw new _e("ValueError","is not in list");return s}case"count":return e.filter(s=>$e(s)===$e(n[0]??A)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:J(s).localeCompare(J(i))),A;case"reverse":return e.reverse(),A;case"copy":return[...e];case"clear":return e.splice(0),A;default:break}if(be(e))switch(t){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(J(n[0]??""))??n[1]??A;case"update":{if(be(n[0]??A))for(let[s,i]of n[0].data)e.data.set(s,i);return A}case"pop":{let s=J(n[0]??""),i=e.data.get(s)??n[1]??A;return e.data.delete(s),i}case"clear":return e.data.clear(),A;case"copy":return ve([...e.data.entries()]);case"setdefault":{let s=J(n[0]??"");return e.data.has(s)||e.data.set(s,n[1]??A),e.data.get(s)??A}default:break}if(be(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(t){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??A:A;case"listdir":return[];case"path":return e;default:break}if(be(e))switch(t){case"join":return n.map(J).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return J(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return J(n[0]??"").split("/").pop()??"";case"abspath":return J(n[0]??"");case"splitext":{let s=J(n[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1;default:break}if(be(e)&&e.data.has("version")&&e.data.get("version")===Tr&&t==="exit")throw new tr(n[0]??0);if(be(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(t in s){let i=s[t];return i(...n.map(o=>o))}if(t==="factorial"){let i=n[0]??0,o=1;for(;i>1;)o*=i--;return o}if(t==="gcd"){let i=Math.abs(n[0]??0),o=Math.abs(n[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(be(e)){if(t==="dumps"){let s=be(n[1]??A)?n[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(n[0]??A),null,i)}if(t==="loads")return this._jsToPy(JSON.parse(J(n[0]??"")))}if(Jt(e)){let s=e.attrs.get(t)??e.cls.methods.get(t)??A;if(Ze(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,n[a]??A)),this._execBlock(s.body,i)}}throw new _e("AttributeError",`'${vt(e)}' object has no attribute '${t}'`)}static _pyStringFormat(e,t){let n=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=t[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return J(o??A);case"r":return $e(o??A);default:return String(o)}})}_pyToJs(e){return ot(e)?null:be(e)?Object.fromEntries([...e.data.entries()].map(([t,n])=>[t,this._pyToJs(n)])):Array.isArray(e)?e.map(t=>this._pyToJs(t)):e}_jsToPy(e){return e==null?A:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(t=>this._jsToPy(t)):typeof e=="object"?ve(Object.entries(e).map(([t,n])=>[t,this._jsToPy(n)])):A}_callBuiltin(e,t,n){if(n.has(e)){let s=n.get(e)??A;return Ze(s)?this._callFunc(s,t,n):Tn(s)?this._instantiate(s,t):s}switch(e){case"print":return this._output.push(t.map(J).join(" ")+`
`.replace(/\\n/g,"")),A;case"input":return this._output.push(J(t[0]??"")),"";case"int":{if(t.length===0)return 0;let s=t[1]??10,i=Number.parseInt(J(t[0]??0),s);return Number.isNaN(i)?(()=>{throw new _e("ValueError","invalid literal for int()")})():i}case"float":{if(t.length===0)return 0;let s=Number.parseFloat(J(t[0]??0));return Number.isNaN(s)?(()=>{throw new _e("ValueError","could not convert to float")})():s}case"str":return t.length===0?"":J(t[0]??A);case"bool":return t.length===0?!1:Le(t[0]??A);case"list":return t.length===0?[]:Ie(t[0]??[]);case"tuple":return t.length===0?[]:Ie(t[0]??[]);case"set":return t.length===0?[]:[...new Set(Ie(t[0]??[]).map($e))].map(s=>Ie(t[0]??[]).find(o=>$e(o)===s)??A);case"dict":return t.length===0?ve():be(t[0]??A)?t[0]:ve();case"bytes":return typeof t[0]=="string"?t[0]:J(t[0]??"");case"bytearray":return t.length===0?"":J(t[0]??"");case"type":return t.length===1?`<class '${vt(t[0]??A)}'>`:A;case"isinstance":return vt(t[0]??A)===J(t[1]??"");case"issubclass":return!1;case"callable":return Ze(t[0]??A);case"hasattr":return be(t[0]??A)?t[0].data.has(J(t[1]??"")):!1;case"getattr":return be(t[0]??A)?t[0].data.get(J(t[1]??""))??t[2]??A:t[2]??A;case"setattr":return be(t[0]??A)&&t[0].data.set(J(t[1]??""),t[2]??A),A;case"len":{let s=t[0]??A;if(typeof s=="string"||Array.isArray(s))return s.length;if(be(s))return s.data.size;if(At(s))return Yc(s);throw new _e("TypeError",`object of type '${vt(s)}' has no len()`)}case"range":return t.length===1?An(0,t[0]):t.length===2?An(t[0],t[1]):An(t[0],t[1],t[2]);case"enumerate":{let s=t[1]??0;return Ie(t[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=t.map(Ie),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??A))}case"map":{let s=t[0]??A;return Ie(t[1]??[]).map(i=>Ze(s)?this._callFunc(s,[i],n):A)}case"filter":{let s=t[0]??A;return Ie(t[1]??[]).filter(i=>Ze(s)?Le(this._callFunc(s,[i],n)):Le(i))}case"reduce":{let s=t[0]??A,i=Ie(t[1]??[]);if(i.length===0)return t[2]??A;let o=t[2]===void 0?i[0]:t[2];for(let a of t[2]===void 0?i.slice(1):i)o=Ze(s)?this._callFunc(s,[o,a],n):A;return o}case"sorted":{let s=[...Ie(t[0]??[])],i=t[1]??A,o=be(i)?i.data.get("key")??A:i;return s.sort((a,c)=>{let l=Ze(o)?this._callFunc(o,[a],n):a,u=Ze(o)?this._callFunc(o,[c],n):c;return typeof l=="number"&&typeof u=="number"?l-u:J(l).localeCompare(J(u))}),s}case"reversed":return[...Ie(t[0]??[])].reverse();case"any":return Ie(t[0]??[]).some(Le);case"all":return Ie(t[0]??[]).every(Le);case"sum":return Ie(t[0]??[]).reduce((s,i)=>s+i,t[1]??0);case"max":return(t.length===1?Ie(t[0]??[]):t).reduce((i,o)=>i>=o?i:o);case"min":return(t.length===1?Ie(t[0]??[]):t).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(t[0]??0);case"round":return t[1]===void 0?Math.round(t[0]??0):Number.parseFloat(t[0].toFixed(t[1]));case"divmod":{let s=t[0],i=t[1];return[Math.floor(s/i),s%i]}case"pow":return t[0]**t[1];case"hex":return`0x${t[0].toString(16)}`;case"oct":return`0o${t[0].toString(8)}`;case"bin":return`0b${t[0].toString(2)}`;case"ord":return J(t[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(t[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof t[0]=="number"?t[0]:J(t[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new _e("PermissionError","open() not available in virtual runtime");case"repr":return $e(t[0]??A);case"iter":return t[0]??A;case"next":return Array.isArray(t[0])&&t[0].length>0?t[0].shift():t[1]??(()=>{throw new _e("StopIteration","")})();case"vars":return ve([...n.entries()].map(([s,i])=>[s,i]));case"globals":return ve([...n.entries()].map(([s,i])=>[s,i]));case"locals":return ve([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(t.length===0)return[...n.keys()];let s=t[0]??A;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:be(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new _e(e,J(t[0]??""));case"exec":return this.execScript(J(t[0]??""),n),A;case"eval":return this.pyEval(J(t[0]??""),n);default:throw new _e("NameError",`name '${e}' is not defined`)}}_callFunc(e,t,n){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),t.slice(o));return}s.set(i,t[o]??A)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof kt)return i.value;throw i}}_instantiate(e,t){let n={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(n,"__init__",t),n}execScript(e,t){let n=e.split(`
`);this._execLines(n,0,t)}_execLines(e,t,n){let s=t;for(;s<e.length;){let i=e[s];if(i===void 0||!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,n)}return s}_execBlock(e,t){try{this._execLines(e,0,t)}catch(n){if(n instanceof kt)return n.value;throw n}return A}static _getIndent(e){let t=0;for(let n of e)if(n===" ")t++;else if(n==="	")t+=4;else break;return t}_collectBlock(e,t,n){let s=[];for(let i=t;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(r._getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}_execStatement(e,t,n){let s=e[t];if(s===void 0)return t+1;let i=s.trim(),o=r._getIndent(s);if(i==="pass")return t+1;if(i==="break")throw new Qt;if(i==="continue")throw new er;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new kt(a[1]?this.pyEval(a[1],n):A);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let b=this.pyEval(c[1],n);throw new _e(typeof b=="string"?b:vt(b),J(b))}throw new _e("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!Le(this.pyEval(l[1],n)))throw new _e("AssertionError",l[2]?J(this.pyEval(l[2],n)):"");return t+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),t+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,b,g]=d,_=qc[b];if(_){let I=_(this.cwd);this._modules.set(b,I),n.set(g??b,I)}return t+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,b,g]=p,_=qc[b];if(_){let I=_(this.cwd);if(g?.trim()==="*")for(let[D,T]of I.data)n.set(D,T);else for(let D of g.split(",").map(T=>T.trim()))n.set(D,I.data.get(D)??A)}return t+1}let m=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(m){let[,b,g]=m,_=g.split(",").map(T=>T.trim()).filter(Boolean),I=this._collectBlock(e,t+1,o),D={__pytype__:"func",name:b,params:_,body:I,closure:new Map(n)};return n.set(b,D),t+1+I.length}let f=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(f){let[,b,g]=f,_=g?g.split(",").map(j=>j.trim()):[],I=this._collectBlock(e,t+1,o),D={__pytype__:"class",name:b,methods:new Map,bases:_},T=0;for(;T<I.length;){let H=I[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(H){let[,te,C]=H,k=C.split(",").map(L=>L.trim()).filter(Boolean),N=this._collectBlock(I,T+1,0);D.methods.set(te,{__pytype__:"func",name:te,params:k,body:N,closure:new Map(n)}),T+=1+N.length}else T++}return n.set(b,D),t+1+I.length}if(i.startsWith("if ")&&i.endsWith(":")){let b=i.slice(3,-1).trim(),g=this._collectBlock(e,t+1,o);if(Le(this.pyEval(b,n))){this._execBlock(g,new Map(n).also?.(D=>{for(let[T,j]of n)D.set(T,j)})??n),this._runBlockInScope(g,n);let I=t+1+g.length;for(;I<e.length;){let D=e[I].trim();if(r._getIndent(e[I])<o||!(D.startsWith("elif")||D.startsWith("else")))break;let T=this._collectBlock(e,I+1,o);I+=1+T.length}return I}let _=t+1+g.length;for(;_<e.length;){let I=e[_],D=I.trim();if(r._getIndent(I)!==o)break;let T=D.match(/^elif\s+(.+):$/);if(T){let j=this._collectBlock(e,_+1,o);if(Le(this.pyEval(T[1],n))){for(this._runBlockInScope(j,n),_+=1+j.length;_<e.length;){let H=e[_].trim();if(r._getIndent(e[_])!==o||!(H.startsWith("elif")||H.startsWith("else")))break;let te=this._collectBlock(e,_+1,o);_+=1+te.length}return _}_+=1+j.length;continue}if(D==="else:"){let j=this._collectBlock(e,_+1,o);return this._runBlockInScope(j,n),_+1+j.length}break}return _}let h=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,b,g]=h,_=Ie(this.pyEval(g.trim(),n)),I=this._collectBlock(e,t+1,o),D=[],T=t+1+I.length;T<e.length&&e[T]?.trim()==="else:"&&(D=this._collectBlock(e,T+1,o),T+=1+D.length);let j=!1;for(let H of _){if(b.includes(",")){let te=b.split(",").map(k=>k.trim()),C=Array.isArray(H)?H:[H];te.forEach((k,N)=>n.set(k,C[N]??A))}else n.set(b.trim(),H);try{this._runBlockInScope(I,n)}catch(te){if(te instanceof Qt){j=!0;break}if(te instanceof er)continue;throw te}}return!j&&D.length&&this._runBlockInScope(D,n),T}let y=i.match(/^while\s+(.+?)\s*:$/);if(y){let b=y[1],g=this._collectBlock(e,t+1,o),_=0;for(;Le(this.pyEval(b,n))&&_++<1e5;)try{this._runBlockInScope(g,n)}catch(I){if(I instanceof Qt)break;if(I instanceof er)continue;throw I}return t+1+g.length}if(i==="try:"){let b=this._collectBlock(e,t+1,o),g=t+1+b.length,_=[],I=[],D=[];for(;g<e.length;){let T=e[g],j=T.trim();if(r._getIndent(T)!==o)break;if(j.startsWith("except")){let H=j.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),te=H?.[1]??null,C=H?.[2],k=this._collectBlock(e,g+1,o);_.push({exc:te,body:k}),C&&n.set(C,""),g+=1+k.length}else if(j==="else:")D=this._collectBlock(e,g+1,o),g+=1+D.length;else if(j==="finally:")I=this._collectBlock(e,g+1,o),g+=1+I.length;else break}try{this._runBlockInScope(b,n),D.length&&this._runBlockInScope(D,n)}catch(T){if(T instanceof _e){let j=!1;for(let H of _)if(H.exc===null||H.exc===T.type||H.exc==="Exception"){this._runBlockInScope(H.body,n),j=!0;break}if(!j)throw T}else throw T}finally{I.length&&this._runBlockInScope(I,n)}return g}let S=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(S){let b=this._collectBlock(e,t+1,o);return n.set(S[2],A),this._runBlockInScope(b,n),t+1+b.length}let w=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(w){let[,b,g,_]=w,I=n.get(b)??0,D=this.pyEval(_,n),T;switch(g){case"+=":T=typeof I=="string"?I+J(D):I+D;break;case"-=":T=I-D;break;case"*=":T=I*D;break;case"/=":T=I/D;break;case"//=":T=Math.floor(I/D);break;case"%=":T=I%D;break;case"**=":T=I**D;break;default:T=D}return n.set(b,T),t+1}let M=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(M){let[,b,g,_]=M,I=n.get(b)??A,D=this.pyEval(_,n)??A,T=this.pyEval(g,n)??A;return Array.isArray(I)?I[T]=D:be(I)&&I.data.set(J(T),D),t+1}let v=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(v){let b=v[1].lastIndexOf(".");if(b!==-1){let g=v[1].slice(0,b),_=v[1].slice(b+1),I=this.pyEval(v[2],n),D=this.pyEval(g,n);return be(D)?D.data.set(_,I):Jt(D)&&D.attrs.set(_,I),t+1}}let R=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(R){let b=this.pyEval(R[3],n),g=i.split("=")[0].split(",").map(I=>I.trim()),_=Ie(b);return g.forEach((I,D)=>n.set(I,_[D]??A)),t+1}let P=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(P){let[,b,g]=P;return n.set(b,this.pyEval(g,n)),t+1}try{this.pyEval(i,n)}catch(b){if(b instanceof _e||b instanceof tr)throw b}return t+1}_runBlockInScope(e,t){this._execLines(e,0,t)}run(e){let t=Wm(this.cwd);try{this.execScript(e,t)}catch(n){return n instanceof tr?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof _e?(this._stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof kt?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Kc={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:r,shell:e,cwd:t})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(U(r,["--version","-V"]))return{stdout:`${Vm}
`,exitCode:0};if(U(r,["--version-full"]))return{stdout:`${Tr}
`,exitCode:0};let n=r.indexOf("-c");if(n!==-1){let i=r[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Or(t),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=r.find(i=>!i.startsWith("-"));if(s){let i=O(t,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Or(t),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${Tr}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Zc,Jc=E(()=>{"use strict";ne();Zc={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:r,stdin:e,env:t})=>{let n=r.filter((o,a)=>o!=="-r"&&o!=="-p"&&r[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=U(r,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!t)return{exitCode:0};if(n.length===0)t.vars.REPLY=i;else if(n.length===1)t.vars[n[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<n.length;a++)t.vars[n[a]]=a<n.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as tl from"node:path";var Qc,el,rl,nl=E(()=>{"use strict";ne();ee();Qc=["-r","-R","-rf","-fr","-rF","-Fr"],el=["-f","-rf","-fr","-rF","-Fr","--force"],rl={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=U(n,Qc),a=U(n,el),c=[...Qc,...el,"--force"],l=[];for(let f=0;;f+=1){let h=dt(n,f,{flags:c});if(!h)break;l.push(h)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(f=>O(t,f));for(let f of u)Ae(e.vfs,e.users,r,tl.posix.dirname(f),2);for(let f of u)if(!e.vfs.exists(f)){if(a)continue;return{stderr:`rm: cannot remove '${f}': No such file or directory`,exitCode:1}}let d=f=>{for(let h of u)f.vfs.exists(h)&&f.vfs.remove(h,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,m=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:m,mode:"confirm",onPassword:(f,h)=>{let y=f.trim().toLowerCase();return y!=="y"&&y!=="yes"?Promise.resolve({result:{stdout:`rm: cancelled
`,exitCode:1}}):Promise.resolve({result:d(h)})}},exitCode:0}}}});var sl,il=E(()=>{"use strict";ne();ee();sl={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:r,cwd:e,args:t,stdin:n,uid:s,gid:i})=>{let o=U(t,["-i"]),a=U(t,["-n"]),c=[],l,u=0;for(;u<t.length;){let g=t[u];g==="-e"||g==="--expression"?(u++,t[u]&&c.push(t[u]),u++):g==="-n"||g==="-i"?u++:g.startsWith("-e")?(c.push(g.slice(2)),u++):(g.startsWith("-")||(c.length===0?c.push(g):l=g),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let g=!1,_=0;for(;_<t.length;){let I=t[_];I==="-e"||I==="--expression"?(g=!0,_+=2):(I.startsWith("-e")&&(g=!0),_++)}g||(l=t.filter(I=>!I.startsWith("-")).slice(1)[0])}let d=n??"";if(l){let g=O(e,l);try{d=r.vfs.readFile(g)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(g){if(!g)return[void 0,g];if(g[0]==="$")return[{type:"last"},g.slice(1)];if(/^\d/.test(g)){let _=g.match(/^(\d+)(.*)/s);if(_)return[{type:"line",n:Number.parseInt(_[1],10)},_[2]]}if(g[0]==="/"){let _=g.indexOf("/",1);if(_!==-1)try{return[{type:"regex",re:new RegExp(g.slice(1,_))},g.slice(_+1)]}catch{}}return[void 0,g]}function m(g){let _=[],I=g.split(/\n|(?<=^|[^\\]);/);for(let D of I){let T=D.trim();if(!T||T.startsWith("#"))continue;let j=T,[H,te]=p(j);j=te.trim();let C;if(j[0]===","){j=j.slice(1).trim();let[N,L]=p(j);C=N,j=L.trim()}let k=j[0];if(k)if(k==="s"){let N=j[1]??"/",L=new RegExp(`^s${f(N)}((?:[^${f(N)}\\\\]|\\\\.)*)${f(N)}((?:[^${f(N)}\\\\]|\\\\.)*)${f(N)}([gGiIp]*)$`),q=j.match(L);if(!q){_.push({op:"d",addr1:H,addr2:C});continue}let Z=q[3]??"",se;try{se=new RegExp(q[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}_.push({op:"s",addr1:H,addr2:C,from:se,to:q[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else k==="d"?_.push({op:"d",addr1:H,addr2:C}):k==="p"?_.push({op:"p",addr1:H,addr2:C}):k==="q"?_.push({op:"q",addr1:H}):k==="="&&_.push({op:"=",addr1:H,addr2:C})}return _}function f(g){return g.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let h=c.flatMap(m),y=d.split(`
`);y[y.length-1]===""&&y.pop();let S=y.length;function w(g,_,I){return g?g.type==="line"?_===g.n:g.type==="last"?_===S:g.re.test(I):!0}function M(g,_,I,D){let{addr1:T,addr2:j}=g;if(!T)return!0;if(!j)return w(T,_,I);let H=D.get(g)??!1;return!H&&w(T,_,I)&&(H=!0,D.set(g,!0)),H&&w(j,_,I)?(D.set(g,!1),!0):!!H}let v=[],R=new Map,P=!1;for(let g=0;g<y.length&&!P;g++){let _=y[g],I=g+1,D=!1;for(let T of h)if(M(T,I,_,R)){if(T.op==="d"){D=!0;break}if(T.op==="p"&&v.push(_),T.op==="="&&v.push(String(I)),T.op==="q"&&(P=!0),T.op==="s"){let j=T.global?_.replace(new RegExp(T.from.source,T.from.flags.includes("i")?"gi":"g"),T.to):_.replace(T.from,T.to);j!==_&&(_=j,T.print&&a&&v.push(_))}}D||a||v.push(_)}let b=v.join(`
`)+(v.length>0?`
`:"");if(o&&l){let g=O(e,l);return r.vfs.writeFile(g,b,{},s,i),{exitCode:0}}return{stdout:b,exitCode:0}}}});var ol,al=E(()=>{"use strict";ol={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:r})=>{let e=r.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),t=(()=>{let d=r.indexOf("-s");return d===-1?`
`:r[d+1]??`
`})(),n=(()=>{let d=r.indexOf("-f");return d===-1?null:r[d+1]??"%g"})(),s=r.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let m=String(Math.trunc(a)).length;p=p.padStart(m,"0")}c.push(p)}return{stdout:`${c.join(t)}
`,exitCode:0}}}});var cl,ll=E(()=>{"use strict";cl={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:r,env:e})=>{if(r.length===0)return{stdout:Object.entries(e.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let t of r){let n=t.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(t.includes("=")){let s=t.indexOf("=");e.vars[t.slice(0,s)]=t.slice(s+1)}}return{exitCode:0}}}});function Dr(r,e,t,n){return gr(r,e,t,s=>le(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function Je(r){let e=[],t=0;for(;t<r.length;){let n=r[t].trim();if(!n||n.startsWith("#")){t++;continue}let s=n.match(Xm),i=s??(n.match(Zm)||n.match(Jm));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),t++;continue}for(t++;t<r.length&&r[t]?.trim()!=="}"&&t<r.length+1;){let l=r[t].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),t++}t++,e.push({type:"func",name:a,body:c});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),t++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(t++;t<r.length&&r[t]?.trim()!=="fi";){let m=r[t].trim();m.startsWith("elif ")?(d="elif",p=m.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):m==="else"?d="else":m!=="then"&&(d==="then"?c.push(m):d==="elif"&&l.length>0?l[l.length-1]?.body.push(m):u.push(m)),t++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(t++;t<r.length&&r[t]?.trim()!=="done";){let l=r[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(t++;t<r.length&&r[t]?.trim()!=="done";){let l=r[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"while",cond:a,body:c})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(t++;t<r.length&&r[t]?.trim()!=="done";){let l=r[t].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),t++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(t++;t<r.length&&r[t]?.trim()!=="esac";){let l=r[t].trim();if(!l||l==="esac"){t++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),t++;t<r.length;){let m=r[t].trim();if(m===";;"||m==="esac")break;m&&p.push(m),t++}r[t]?.trim()===";;"&&t++,c.push({pattern:d,body:p})}else t++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:n});t++}return e}async function Rr(r,e){let t=await Dr(r,e.env.vars,e.env.lastExitCode,e),n=t.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=O(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),m=Number(d);if(u==="-eq")return p===m;if(u==="-ne")return p!==m;if(u==="-lt")return p<m;if(u==="-le")return p<=m;if(u==="-gt")return p>m;if(u==="-ge")return p>=m}}return((await le(t,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Qe(r,e){let t={exitCode:0},n="",s="";for(let o of r)if(o.type==="cmd"){let a=await Dr(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let[,m,f]=p.match(c)??[];m!==void 0&&f!==void 0&&(e.env.vars[m]=f)}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let m=a.trim().split(/\s+/).slice(1),f={...e.env.vars};m.forEach((S,w)=>{e.env.vars[String(w+1)]=S}),e.env.vars[0]=d;let h=p.split(`
`),y=await Qe(Je(h),e);for(let S=1;S<=m.length;S++)delete e.env.vars[String(S)];return Object.assign(e.env.vars,{...f,...e.env.vars}),y}return le(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};t=u}else if(o.type==="if"){let a=!1;if(await Rr(o.cond,e)){let c=await Qe(Je(o.then_),e);c.stdout&&(n+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await Rr(c.cond,e)){let l=await Qe(Je(c.body),e);l.stdout&&(n+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Qe(Je(o.else_),e);c.stdout&&(n+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=Number.parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=Number.parseInt(e.env.vars[l[1]]??"0",10),d=Number.parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=Vt(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Dr(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(hr);for(let l of c){e.env.vars[o.var]=l;let u=await Qe(Je(o.body),e);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Rr(o.cond,e);){let c=await Qe(Je(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Rr(o.cond,e);){let c=await Qe(Je(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Dr(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Qe(Je(c.body),e);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||t.stdout;if(s){let o=(t.stderr?`${t.stderr}
`:"")+s.trim();return{...t,stdout:i,stderr:o||t.stderr}}return{...t,stdout:i}}function ul(r){let e=[],t="",n=0,s=!1,i=!1,o=0;for(;o<r.length;){let c=r[o];if(s||i)s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);else{if(c==="'"){s=!0,t+=c,o++;continue}if(c==='"'){i=!0,t+=c,o++;continue}if(c==="{"){n++,t+=c,o++;continue}if(c==="}"){if(n--,t+=c,o++,n===0){let l=t.trim();for(l&&e.push(l),t="";o<r.length&&(r[o]===";"||r[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<r.length&&r[o+1]===`
`){o+=2;continue}if(n===0&&(c===";"||c===`
`)){let l=t.trim();l&&!l.startsWith("#")&&e.push(l),t="",o++;continue}}t+=c,o++}let a=t.trim();return a&&!a.startsWith("#")&&e.push(a),e}var On,Xm,Zm,Jm,dl,pl=E(()=>{"use strict";Gt();ne();ee();Re();On="[^\\s(){}]+",Xm=new RegExp(`^(?:function\\s+)?(${On})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Zm=new RegExp(`^(?:function\\s+)?(${On})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Jm=new RegExp(`^function\\s+(${On})\\s*\\{?\\s*$`);dl={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:r=>{let{args:e,shell:t,cwd:n}=r;if(U(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=ul(i),a=Je(o);return Qe(a,r)}let s=e[0];if(s){let i=O(n,s);if(!t.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=t.vfs.readFile(i),a=ul(o),c=Je(a);return Qe(c,r)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var ml,fl,hl,gl=E(()=>{"use strict";ml={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:r,env:e})=>{if(!e)return{exitCode:0};let t=Number.parseInt(r[0]??"1",10)||1,n=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=n.slice(t).join("\0");let s=n.slice(t);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},fl={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:r,env:e})=>{if(!e||r.length===0)return{exitCode:0};let t=r[0]??"",n=r.slice(1);for(let s of n)e.vars[`__trap_${s.toUpperCase()}`]=t;return{exitCode:0}}},hl={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:r,env:e})=>{let t=Number.parseInt(r[0]??"0",10);return e&&(e.lastExitCode=t),{exitCode:t}}}});var yl,Sl=E(()=>{"use strict";yl={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:r})=>{let e=Number.parseFloat(r[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(t=>setTimeout(t,e*1e3)),{exitCode:0})}}});var bl,_l=E(()=>{"use strict";ne();ee();bl={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s})=>{let i=U(n,["-r"]),o=U(n,["-n"]),a=U(n,["-u"]),c=n.filter(f=>!f.startsWith("-")),d=[...(c.length>0?c.map(f=>{try{return de(r,O(t,f),"sort"),e.vfs.readFile(O(t,f))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((f,h)=>o?Number(f)-Number(h):f.localeCompare(h)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var vl,Cl=E(()=>{"use strict";ee();Re();vl={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:r,authUser:e,hostname:t,cwd:n,shell:s,env:i})=>{let o=r[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=O(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await le(d,e,t,"shell",n,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});function wl(r,e){let t=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return r==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:t}function Qm(r){let e=r.getConntrackCount(),t=r.getConntrackMax(),n=r.getInterfaces(),s=r.getRoutes();return{stdout:`${[`Total: ${Rn()}`,`TCP:   ${Rn("tcp")} (estab ${xl("ESTAB")}, closed ${xl("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${Rn("udp")}`,"",`Interfaces: ${n.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${t}`].join(`
`)}
`,exitCode:0}}function ef(r){let e=r.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:`${[`ipv4     conntrack v0.1.0 (${e.length} entries)`,r.formatConntrack(),"",`entries: ${e.length}  max: ${r.getConntrackMax()}`].join(`
`)}
`,exitCode:0}}function Rn(r){return r==="udp"?2:r==="tcp"?5:7}function xl(r){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[r]??0}var Pl,Il=E(()=>{"use strict";Pl={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:r,shell:e})=>{let t=e.network,n=r.includes("-t")||r.includes("--tcp")||r.length===0,s=r.includes("-u")||r.includes("--udp")||r.length===0,i=r.includes("-l")||r.includes("--listening"),o=r.includes("-a")||r.includes("--all"),a=r.includes("-n")||r.includes("--numeric"),c=r.includes("-p")||r.includes("--processes"),l=r.includes("-s")||r.includes("--summary"),u=r.includes("-c")||r.includes("--conntrack"),d=r.includes("-e")||r.includes("--extended");if(l)return Qm(t);if(u)return ef(t);let p=[];if(n||o){p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=wl("tcp",a);for(let f of m){if(i&&f.state!=="LISTEN")continue;let h=d?f.state.padEnd(12):f.state.padEnd(11),y=`${f.localIp}:${f.localPort}`.padEnd(35),S=`${f.peerIp}:${f.peerPort}`,w=`${h} 0      0      ${y} ${S}`;c&&(w+=` users:(("simulated",pid=${f.pid},fd=${f.fd}))`),p.push(w)}}if(s||o){p.length>0&&p.push(""),p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let m=wl("udp",a);for(let f of m){let h="UNCONN".padEnd(11),y=`${f.localIp}:${f.localPort}`.padEnd(35),S=`${f.peerIp}:${f.peerPort}`;p.push(`${h} 0      0      ${y} ${S}`)}}return p.length===0&&p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:`${p.join(`
`)}
`,exitCode:0}}}});var $l,El=E(()=>{"use strict";$l={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(r){let e=r.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Nl,Ml=E(()=>{"use strict";ee();Nl={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:r,cwd:e,args:t})=>{let n=t.findIndex(w=>w==="-c"||w==="--format"),s=n===-1?void 0:t[n+1],i=t.find(w=>!w.startsWith("-")&&w!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=O(e,i);if(!r.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=r.vfs.stat(o),c=a.type==="directory",l=r.vfs.isSymlink(o),u=w=>{let M=[256,128,64,32,16,8,4,2,1],v=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+M.map((R,P)=>w&R?v[P]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),m="size"in a?a.size:0,f=w=>w.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(m)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",f(a.updatedAt)).replace("%z",f(a.updatedAt))}
`,exitCode:0};let h="uid"in a?a.uid:0,y="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${r.vfs.resolveSymlink(o)}`:""}`,`  Size: ${m}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(h).padStart(5)}/    root)   Gid: (${String(y).padStart(5)}/    root)`,`Modify: ${f(a.updatedAt)}`,`Change: ${f(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var kl,Al=E(()=>{"use strict";kl={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:r})=>{let e=r.find(n=>!n.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${r.slice(1).map(n=>`, "${n}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});var Tl,Ol=E(()=>{"use strict";Re();Tl={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:({authUser:r,shell:e,args:t,hostname:n,mode:s,cwd:i})=>{let o=t.includes("-")||t.includes("-l")||t.includes("--login"),a=t.indexOf("-c"),c=a===-1?void 0:t[a+1],u=t.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(r==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return r==="root"?c?le(c,u,n,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(r)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function tf(r){let{flags:e,flagsWithValues:t,positionals:n}=Ce(r,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=t.get("-u")||t.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Rl,Dl=E(()=>{"use strict";ne();Re();Rl={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:({authUser:r,hostname:e,mode:t,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=tf(i);if(r!=="root"&&!s.users.isSudoer(r))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${r}: `;return r==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?le(c,l,e,t,a?`/home/${l}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:r,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var Fl,Ll=E(()=>{"use strict";Fl={name:"swap",description:"View and manage swap file usage",category:"system",params:["[-s|--stats] [-c|--clear]"],run:({shell:r,args:e})=>{let t=e.includes("-c")||e.includes("--clear");if(!r.vfs.isSwapEnabled())return{stderr:`swap: swap is not enabled
`,exitCode:1};if(t)return r.vfs.clearSwap(),{stdout:`swap: swap files cleared
`,exitCode:0};let n=r.vfs.getSwapStats();if(!n)return{stderr:`swap: unable to retrieve swap stats
`,exitCode:1};let s=o=>{if(o===0)return"0 B";let a=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(1024));return`${(o/1024**c).toFixed(1)} ${a[c]}`};return{stdout:`${["Swap usage:",`  Files swapped out : ${n.filesSwapped}`,`  Swap disk usage   : ${s(n.diskUsage)}`,`  Original size     : ${s(n.originalSize)}`,`  Swap-in ops       : ${n.swapIns}`,`  Swap-out ops      : ${n.swapOuts}`].join(`
`)}
`,exitCode:0}}}});function Ul(r,e){return{kernel:{hostname:r,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function Tt(r,e){let t=e.replace("/proc/sys/","").split("/"),n=(s,i)=>{if(!(i in s))return null;let o=s,a=o[i];return{value:typeof a=="number"?a:String(a),set:l=>{let u=Number(l);o[i]=Number.isNaN(u)?l:u}}};switch(t[0]){case"kernel":{let s=t[1];if(!s)break;return n(r.kernel,s)}case"net":{let s=t[1];if(s==="ipv4"){let i=t[2];if(!i)break;return n(r.net.ipv4,i)}if(s==="ipv6"){let i=t[2];if(i==="disable_ipv6")return{value:r.net.ipv6.disable_ipv6,set:o=>{r.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&t[4]==="disable_ipv6")return{value:r.net.ipv6.disable_ipv6,set:o=>{r.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=t[2];if(!i)break;return n(r.net.core,i)}break}case"vm":{let s=t[1];if(!s)break;return n(r.vm,s)}case"fs":{if(t[1]==="inotify"){let o=t[2];if(!o)break;return n(r.fs.inotify,o)}let s=r.fs,i=t[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}};break}default:break}return null}var Dn=E(()=>{"use strict"});var Bl,zl=E(()=>{"use strict";Dn();Bl={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:r,args:e})=>{let t=e.filter(o=>o!=="-w"&&o.includes("=")),n=e.filter(o=>o!=="-w"&&!o.includes("="));if(t.length>0){let o=[];for(let a of t){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=Tt(r.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let m=p.value;if(o.push(`${c} = ${m}`),c==="vm.ram_cap_bytes"){let f=Number(u);r.resourceCaps.ramCapBytes=f>0?f:void 0,r.vfs.setRamCap(r.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let f=Number(u);r.resourceCaps.cpuCapCores=f>0?f:void 0,r.users.setCpuCapCores(r.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(n.length>0){let o=[];for(let a of n){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=Tt(r.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(r.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});import*as Ot from"node:os";var Vl,Gl,Wl,jl=E(()=>{"use strict";Vl={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:r})=>{let e=Ot.cpus(),t=r.resourceCaps?.cpuCapCores,n=t!==void 0&&t>0?e.slice(0,t):e,s=Ot.arch(),i=Ot.endianness(),o=n.length,a=n.length>0?n[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Gl={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Wl={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});var Hl,ql=E(()=>{"use strict";ne();ee();Hl={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s})=>{let i=St(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),m=d.endsWith(`
`),f=m?p.slice(0,-1):p;return f.slice(Math.max(0,f.length-a)).join(`
`)+(m?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=O(t,d);try{de(r,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function rf(r,e,t){let n=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(n,a,0,Math.min(l.length,c))};s(t?`${r}/`:r,0,100),s(t?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=t?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function nf(r){let e=r%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function sf(r){let e=[];for(let{name:t,content:n,isDir:s}of r)e.push(rf(t,s?0:n.length,s)),s||(e.push(n),e.push(nf(n.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function of(r){let e=[],t=0;for(;t+512<=r.length;){let n=r.slice(t,t+512);if(n.every(c=>c===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=Number.parseInt(i,8)||0,a=n[156];if(t+=512,s&&a!==53&&a!==53){let c=r.slice(t,t+o);e.push({name:s,content:c})}t+=Math.ceil(o/512)*512}return e}var Yl,Kl=E(()=>{"use strict";vr();ee();Yl={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:r,cwd:e,args:t,uid:n,gid:s})=>{let i=[],o=!1;for(let y of t)if(/^-[a-zA-Z]{2,}$/.test(y))for(let S of y.slice(1))i.push(`-${S}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(y)&&!y.includes("/")&&!y.startsWith("-")){o=!0;for(let S of y)i.push(`-${S}`)}else i.push(y);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),m=p===-1?i.find(y=>y.endsWith(".tar")||y.endsWith(".tar.gz")||y.endsWith(".tgz")||y.endsWith(".tar.bz2")):i[p+1];if(!(a||c||l))return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!m)return{stderr:"tar: no archive specified",exitCode:1};let f=O(e,m),h=u||m.endsWith(".gz")||m.endsWith(".tgz");if(a){let y=new Set;p!==-1&&i[p+1]&&y.add(i[p+1]);let S=i.filter(P=>!(P.startsWith("-")||y.has(P))),w=[],M=[];for(let P of S){let b=O(e,P);if(!r.vfs.exists(b))return{stderr:`tar: ${P}: No such file or directory`,exitCode:1};if(r.vfs.stat(b).type==="file"){let _=r.vfs.readFileRaw(b);w.push({name:P,content:_,isDir:!1}),d&&M.push(P)}else{w.push({name:P,content:Buffer.alloc(0),isDir:!0}),d&&M.push(`${P}/`);let _=(I,D)=>{for(let T of r.vfs.list(I)){let j=`${I}/${T}`,H=`${D}/${T}`;if(r.vfs.stat(j).type==="directory")w.push({name:H,content:Buffer.alloc(0),isDir:!0}),d&&M.push(`${H}/`),_(j,H);else{let C=r.vfs.readFileRaw(j);w.push({name:H,content:C,isDir:!1}),d&&M.push(H)}}};_(b,P)}}let v=sf(w),R=h?Buffer.from(br(v)):v;return r.vfs.writeFile(f,R,{},n,s),{stdout:d?M.join(`
`):void 0,exitCode:0}}if(l||c){let y=r.vfs.readFileRaw(f),S;if(h)try{S=Buffer.from(_r(y))}catch{return{stderr:`tar: ${m}: not a gzip file`,exitCode:1}}else S=y;let w=of(S);if(l)return{stdout:w.map(R=>d?`-rw-r--r-- 0/0 ${R.content.length.toString().padStart(8)} 1970-01-01 00:00 ${R.name}`:R.name).join(`
`),exitCode:0};let M=[];for(let{name:v,content:R}of w){let P=O(e,v);r.vfs.writeFile(P,R,{},n,s),d&&M.push(v)}return{stdout:d?M.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});function af(r,e){for(let t=1;t<r.length;t++){let n=r[t];if(n==="delay"||n==="latency"){let s=r[t+1];return Fn(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(n))return Fn(n)}return 0}function cf(r,e){let t=r.indexOf("jitter");if(t===-1)return 0;let n=r[t+1];return Fn(n??"0")}function lf(r,e){let t=r.indexOf("loss");if(t===-1)return 0;for(let n=t+1;n<r.length;n++){let s=r[n];if(/^\d+(\.\d+)?%$/.test(s))return Number.parseFloat(s)}return 0}function uf(r,e){let t=r.indexOf("reorder");if(t===-1)return 0;let n=r[t+1];return n?Number.parseFloat(n):0}function df(r,e){let t=r.indexOf("duplicate");if(t===-1)return 0;let n=r[t+1];return n?Number.parseFloat(n):0}function pf(r,e){let t=r.indexOf("corrupt");if(t===-1)return 0;let n=r[t+1];return n?Number.parseFloat(n):0}function Xl(r,e){let t=r.indexOf("rate");return t===-1?"0":r[t+1]??"0"}function mf(r,e){let t=r.indexOf("burst");return t===-1?"0":r[t+1]??"0"}function ff(r,e){let t=r.indexOf("limit");return t===-1?"0":r[t+1]??"0"}function Fn(r){return r.endsWith("ms")?Number.parseFloat(r):r.endsWith("us")?Number.parseFloat(r)/1e3:r.endsWith("s")?Number.parseFloat(r)*1e3:Number.parseFloat(r)}var Zl,Jl=E(()=>{"use strict";Zl={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:r,shell:e})=>{let t=e.network,n=r[0]?.toLowerCase(),s=r[1]?.toLowerCase();if(!n)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(n==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=r.indexOf("dev"),o=i===-1?void 0:r[i+1],a=t.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:`${c.join(`
`)}
`,exitCode:0}}if(s==="add"){let i=r.indexOf("dev"),o=i===-1?"eth0":r[i+1],a=r.indexOf("netem"),c=r.indexOf("tbf"),l=r.indexOf("htb");if(a!==-1){let u=af(r,a),d=cf(r,a),p=lf(r,a),m=uf(r,a),f=df(r,a),h=pf(r,a),y=t.getInterface(o);return t.setInterfaceMtu(o,y?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${p}% reorder=${m}% duplicate=${f}% corrupt=${h}%
`,exitCode:0}}if(c!==-1){let u=Xl(r,c),d=mf(r,c),p=ff(r,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${p}
`,exitCode:0}}if(l!==-1){let u=Xl(r,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=r.indexOf("dev");return{stdout:`Deleted qdisc from ${i===-1?"eth0":r[i+1]}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=r.indexOf("dev");return{stdout:`Changed qdisc on ${i===-1?"eth0":r[i+1]}
`,exitCode:0}}}return n==="class"||n==="filter"||n==="action"?{exitCode:0}:{stderr:`tc: Object "${n}" is unknown, try "tc help".`,exitCode:1}}}});var Ql,eu=E(()=>{"use strict";ne();ee();Ql={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:r,cwd:e,args:t,stdin:n,uid:s,gid:i})=>{let o=U(t,["-a"]),a=t.filter(l=>!l.startsWith("-")),c=n??"";for(let l of a){let u=O(e,l);if(o){let d=(()=>{try{return r.vfs.readFile(u,s,i)}catch{return""}})();r.vfs.writeFile(u,d+c,{},s,i)}else r.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Rt(r,e,t){if(r[r.length-1]==="]"&&(r=r.slice(0,-1)),r[0]==="["&&(r=r.slice(1)),r.length===0)return!1;if(r[0]==="!")return!Rt(r.slice(1),e,t);let n=r.indexOf("-a");if(n!==-1)return Rt(r.slice(0,n),e,t)&&Rt(r.slice(n+1),e,t);let s=r.indexOf("-o");if(s!==-1)return Rt(r.slice(0,s),e,t)||Rt(r.slice(s+1),e,t);if(r.length===2){let[i,o=""]=r,a=O(t,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a);default:break}}if(r.length===3){let[i="",o,a=""]=r,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l;default:break}}return r.length===1?(r[0]??"").length>0:!1}var tu,ru=E(()=>{"use strict";ee();tu={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:r,shell:e,cwd:t})=>{try{return{exitCode:Rt([...r],e,t)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});function nu(r){let e="",t=r;do e=String.fromCharCode(97+t%26)+e,t=Math.floor(t/26)-1;while(t>=0);return e}var su,iu,ou,au,cu=E(()=>{"use strict";ne();ee();su={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:r,cwd:e,args:t})=>{let{flagsWithValues:n,positionals:s}=Ce(t,{flagsWithValue:["-t"]}),i=n.get("-t")||" 	",[o,a]=s;if(!(o&&a))return{stderr:`join: missing operand
`,exitCode:1};let c=O(e,o),l=O(e,a);if(!(r.vfs.exists(c)&&r.vfs.exists(l)))return{stderr:`join: No such file
`,exitCode:1};let u=r.vfs.readFile(c).split(`
`).filter(Boolean),d=r.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),m=new Map;for(let h of u){let y=h.split(p)[0]||h;m.set(y,h)}let f=[];for(let h of d){let y=h.split(p)[0]||h,S=m.get(y);S&&f.push(`${S} ${h}`)}return{stdout:`${f.join(`
`)}
`,exitCode:0}}},iu={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:r,cwd:e,args:t})=>{let n=t.filter(S=>!S.startsWith("-")),[s,i]=n;if(!(s&&i))return{stderr:`comm: missing operand
`,exitCode:1};let o=O(e,s),a=O(e,i);if(!(r.vfs.exists(o)&&r.vfs.exists(a)))return{stderr:`comm: No such file
`,exitCode:1};let c=r.vfs.readFile(o).split(`
`),l=r.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],m=[],f=[];for(let S of c)d.has(S)?f.push(S):p.push(S);for(let S of l)u.has(S)||m.push(S);let h=Math.max(p.length,m.length,f.length),y=[];for(let S=0;S<h;S++){let w=S<p.length?p[S]:"",M=S<m.length?m[S]:"",v=S<f.length?f[S]:"";y.push(`${w}	${M}	${v}`)}return{stdout:`${y.join(`
`)}
`,exitCode:0}}},ou={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:r,cwd:e,args:t,uid:n,gid:s})=>{let{flagsWithValues:i,positionals:o}=Ce(t,{flagsWithValue:["-l","-b"]}),a=Number.parseInt(i.get("-l")||"1000",10),c=i.has("-b")?Number.parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=O(e,l);if(!r.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=r.vfs.readFile(d,n,s);if(c!==void 0){let h=0;for(let y=0;y<p.length;y+=c){let S=p.slice(y,y+c),w=O(e,`${u}${nu(h)}`);r.vfs.writeFile(w,S,{},n,s),h++}return{exitCode:0}}let m=p.split(`
`),f=0;for(let h=0;h<m.length;h+=a){let y=m.slice(h,h+a).join(`
`),S=O(e,`${u}${nu(f)}`);r.vfs.writeFile(S,y,{},n,s),f++}return{exitCode:0}}},au={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as Dt from"node:os";var lu,uu=E(()=>{"use strict";lu={name:"top",description:"Display processes",category:"system",params:[],run:({shell:r})=>{let e=Math.floor((Date.now()-r.startTime)/1e3),t=r.users.listActiveSessions(),n=r.users.listProcesses(),s=Dt.totalmem(),i=Dt.freemem(),o=r.resourceCaps?.ramCapBytes,a=o===void 0?s:Math.min(s,o),c=o===null?i:Math.floor(a*(i/s)),l=a-c,u=Dt.loadavg(),d=[],p=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${t.length} user(s), load average: ${u.map(M=>M.toFixed(2)).join(", ")}`),d.push(`Tasks: ${t.length+n.length} total,   ${n.filter(M=>M.status==="running").length||1} running`);let m=(a/1024/1024).toFixed(0),f=(l/1024/1024).toFixed(0),h=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${m.padStart(8)} total, ${h.padStart(8)} free, ${f.padStart(8)} used`);let y=Math.floor(a*.5),S=Math.floor(y*.05),w=y-S;return d.push(`MiB Swap: ${String(y).padStart(8)} total, ${String(w).padStart(8)} free, ${String(S).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),t.forEach((M,v)=>{let R=1e3+v,P=Math.floor(Math.random()*2e5+5e4),b=Math.floor(Math.random()*1e4+2e3),g=Math.floor(b*.6),_=(Math.random()*5).toFixed(1),I=(b/(a/1024)*100).toFixed(1);d.push(`${String(R).padStart(5)} ${M.username.padEnd(8).slice(0,8)}  20   0 ${String(P).padStart(7)} ${String(b).padStart(6)} ${String(g).padStart(6)} S  ${_.padStart(4)} ${I.padStart(5)}   0:00.00 bash`)}),n.forEach(M=>{let v=Math.floor(Math.random()*5e4+1e4),R=Math.floor(Math.random()*5e3+500),P=Math.floor(R*.5),b=(Math.random()*10).toFixed(1),g=(R/(a/1024)*100).toFixed(1),_=M.status==="running"?"R":"S";d.push(`${String(M.pid).padStart(5)} ${M.username.padEnd(8).slice(0,8)}  20   0 ${String(v).padStart(7)} ${String(R).padStart(6)} ${String(P).padStart(6)} ${_} ${b.padStart(4)} ${g.padStart(5)}   0:00.00 ${M.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});import*as du from"node:path";var pu,mu=E(()=>{"use strict";ee();pu={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:r,shell:e,cwd:t,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of n){let a=O(t,o);e.vfs.exists(a)?Ae(e.vfs,e.users,r,a,2):(Ae(e.vfs,e.users,r,du.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var hf,fu,hu,gu,yu=E(()=>{"use strict";hf={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},fu=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],hu={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:r})=>{let e=r[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&r[1]!==void 0){let n=Number.parseInt(r[1],10);return{stdout:`\x1B[${fu[n]??"39"}m`,exitCode:0}}if(e==="setab"&&r[1]!==void 0){let n=Number.parseInt(r[1],10);return{stdout:`\x1B[${fu[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&r[1]!==void 0&&r[2]!==void 0)return{stdout:`\x1B[${Number.parseInt(r[1],10)+1};${Number.parseInt(r[2],10)+1}H`,exitCode:0};let t=hf[e];return t===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(t),exitCode:0}}},gu={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:r})=>r.includes("-a")||r.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:r.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function gf(r){return r.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Su(r){let e=[],t=gf(r),n=0;for(;n<t.length;){if(n+2<t.length&&t[n+1]==="-"){let s=t.charCodeAt(n),i=t.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));n+=3;continue}}e.push(t[n]),n++}return e}var bu,_u=E(()=>{"use strict";ne();bu={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:r,stdin:e})=>{let t=U(r,["-d"]),n=U(r,["-s"]),s=r.filter(c=>!c.startsWith("-")),i=Su(s[0]??""),o=Su(s[1]??""),a=e??"";if(t){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(n&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});function yf(r,e){let t=wu(r),n=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;n.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return n.push({ip:t,hostname:r,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),n}function Sf(r,e){return r==="localhost"||r==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(r)?r:wu(r)}function wu(r){let e=bf(r);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function bf(r){let e=0;for(let t=0;t<r.length;t++)e=(e<<5)-e+r.charCodeAt(t),e|=0;return Math.abs(e)}function vu(r,e,t){let n=r.indexOf(e);if(n===-1)return t;let s=r[n+1],i=Number.parseInt(s??"0",10);return Number.isNaN(i)?t:i}var Cu,xu=E(()=>{"use strict";Cu={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:r,shell:e})=>{let t=e.network,n=r.find(c=>!c.startsWith("-"));if(!n)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=vu(r,"-m",30),i=vu(r,"-q",3),o=[];o.push(`traceroute to ${n} (${Sf(n,e)}), ${s} hops max, 60 byte packets`);let a=yf(n,t);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let p=l.baseLatency+Math.random()*l.jitter;u.push(`${p.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Pu,Iu=E(()=>{"use strict";ne();ee();Pu={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:r,shell:e,cwd:t,args:n})=>{let s=O(t,dt(n,0)??t);return de(r,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var $u,Eu,Nu=E(()=>{"use strict";$u={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Eu={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var Mu,ku=E(()=>{"use strict";Et();Mu={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:r,shell:e,env:t})=>{if(r.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of r){if(Ye(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Au,Tu=E(()=>{"use strict";ne();Au={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:r,args:e})=>{let t=U(e,["-a"]),n="Linux",s=r.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=r.properties?.arch??"x86_64",o=r.hostname;return t?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:U(e,["-r"])?{stdout:s,exitCode:0}:U(e,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var Ou,Ru=E(()=>{"use strict";ne();Ou={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:r,stdin:e})=>{let t=U(r,["-c"]),n=U(r,["-d"]),s=U(r,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(n&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(t?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var Du,Fu=E(()=>{"use strict";Du={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:r,env:e})=>{for(let t of r)delete e.vars[t];return{exitCode:0}}}});var Lu,Uu=E(()=>{"use strict";ne();Lu={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:r,shell:e})=>{let t=U(r,["-p"]),n=U(r,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(t){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a===1?"":"s"}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u===1?"":"s"},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Bu,zu=E(()=>{"use strict";Bu={name:"usermod",description:"Modify a user account",category:"users",params:["[-g group|-G groups|-aG group|-L|-U] <user>"],run:({authUser:r,shell:e,args:t})=>{if(r!=="root")return{stderr:`usermod: permission denied
`,exitCode:1};let n,s,i=!1,o=!1,a=!1,c;for(let u=0;u<t.length;u++){let d=t[u];if(d)if(d==="-g"){let p=t[u+1];if(!p)break;n=p,u++}else if(d==="-G"){let p=t[u+1];if(!p)break;s=p.split(","),u++}else if(d==="-aG"){let p=t[u+1];if(!p)break;i=!0,s=p.split(","),u++}else d==="-L"?o=!0:d==="-U"?a=!0:c||(c=d)}if(!c)return{stderr:`Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>
`,exitCode:1};if(!e.users.listUsers().includes(c))return{stderr:`usermod: user '${c}' does not exist
`,exitCode:1};if(n){if(e.users.getGidByName(n)===null)return{stderr:`usermod: group '${n}' does not exist
`,exitCode:1};e.users.addGroupMember(n,c)}if(s){if(!i){let u=e.users.getUserSupplementaryGroups(c);for(let d of u)e.users.removeGroupMember(d,c)}for(let u of s){let d=u.trim();if(d){if(!e.users.getGroup(d))return{stderr:`usermod: group '${d}' does not exist
`,exitCode:1};e.users.addGroupMember(d,c)}}}if(o){let u=e.users.getPasswordHash(c);if(u&&!u.startsWith("!"))return{stdout:`usermod: lock requested for '${c}' (password lock not yet implemented)
`,exitCode:0}}return a?{stdout:`usermod: unlock requested for '${c}'
`,exitCode:0}:{stdout:`usermod: user '${c}' modified
`,exitCode:0}}}});var Vu,Gu=E(()=>{"use strict";Re();Vu={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:r,authUser:e})=>{let t=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=t.toTimeString().slice(0,5);r.users.listActiveSessions?.();let c=`${oe(e)}/.lastlog`,l=a;if(r.vfs.exists(c))try{let f=JSON.parse(r.vfs.readFile(c));l=new Date(f.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",m=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,m].join(`
`),exitCode:0}}}});var Wu,ju=E(()=>{"use strict";ne();ee();Wu={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:r,shell:e,cwd:t,args:n,stdin:s})=>{let i=U(n,["-l"]),o=U(n,["-w"]),a=U(n,["-c"]),c=!(i||o||a),l=n.filter(p=>!p.startsWith("-")),u=(p,m)=>{let f=p.length===0?0:p.trim().split(`
`).length,h=p.trim().split(/\s+/).filter(Boolean).length,y=Buffer.byteLength(p,"utf8"),S=[];return(c||i)&&S.push(String(f).padStart(7)),(c||o)&&S.push(String(h).padStart(7)),(c||a)&&S.push(String(y).padStart(7)),m&&S.push(` ${m}`),S.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let m=O(t,p);try{de(r,m,"wc");let f=e.vfs.readFile(m);d.push(u(f,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Hu,qu=E(()=>{"use strict";ne();ee();Hu={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:r,cwd:e,args:t,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ce(t,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(U(t,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(U(t,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=U(t,["-q","--quiet"]),m=u==="-"?null:u??cs(l),f=m?O(e,d?`${d}/${m}`:m):null;f&&de(r,f,"wget");let h=[];p||(h.push(`--${new Date().toISOString()}--  ${l}`),h.push(`Resolving ${new URL(l).host}...`),h.push(`Connecting to ${new URL(l).host}...`));let y;try{let w=new URL(l),M=w.port?Number.parseInt(w.port,10):w.protocol==="https:"?443:80,v=n.network.checkFirewall("OUTPUT","tcp",void 0,w.hostname,M);if(v==="DROP"||v==="REJECT")return{stderr:`wget: unable to connect to ${w.hostname}:${M}: Connection refused
`,exitCode:4};y=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(w){let M=w instanceof Error?w.message:String(w);return h.push(`wget: unable to resolve host: ${M}`),{stderr:h.join(`
`),exitCode:4}}if(!y.ok)return h.push(`ERROR ${y.status}: ${y.statusText}`),{stderr:h.join(`
`),exitCode:8};let S;try{S=await y.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let w=y.headers.get("content-type")??"application/octet-stream";h.push(`HTTP request sent, awaiting response... ${y.status} ${y.statusText}`),h.push(`Length: ${S.length} [${w}]`)}return u==="-"?{stdout:S,stderr:h.join(`
`)||void 0,exitCode:0}:f?(n.vfs.writeFile(f,S,{},s,i),p||h.push(`Saving to: '${f}'
${f}            100%[==================>]  ${S.length} B`),{stderr:h.join(`
`)||void 0,exitCode:0}):{stdout:S,exitCode:0}}}});var Yu,Ku=E(()=>{"use strict";Yu={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:r,shell:e,env:t})=>{if(r.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(t?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of r){let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Fr(r){let e=r.toLocaleString("en-US",{weekday:"short"}),t=r.toLocaleString("en-US",{month:"short"}),n=r.getDate().toString().padStart(2,"0"),s=r.getHours().toString().padStart(2,"0"),i=r.getMinutes().toString().padStart(2,"0"),o=r.getSeconds().toString().padStart(2,"0"),a=r.getFullYear();return`${e} ${t} ${n} ${s}:${i}:${o} ${a}`}var Ln=E(()=>{"use strict"});var Xu,Zu=E(()=>{"use strict";Ln();Xu={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:r})=>({stdout:r.users.listActiveSessions().map(t=>{let n=new Date(t.startedAt),s=Number.isNaN(n.getTime())?t.startedAt:Fr(n);return`${t.username} ${t.tty} ${s} (${t.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Ju,Qu=E(()=>{"use strict";Ju={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:r})=>({stdout:r,exitCode:0})}});var ed,td=E(()=>{"use strict";Re();ed={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:({authUser:r,hostname:e,mode:t,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return le(d,r,e,t,n,o,void 0,a)}}});var rd,nd=E(()=>{"use strict";rd={name:"thunar",params:[],run(r){let e=r.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let t=r.args[0]||r.env.vars.HOME||"/root";return e.createThunarWindow(t),{exitCode:0}}}});function vf(r){let e=4294967295;for(let t=0;t<r.length;t++)e=(_f[(e^r[t])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function Cf(){let r=new Date,e=r.getFullYear()-1980<<9|r.getMonth()+1<<5|r.getDate();return[r.getHours()<<11|r.getMinutes()<<5|Math.floor(r.getSeconds()/2),e]}function wf(r){let e=[],t=[],n=0,[s,i]=Cf();for(let{name:c,content:l}of r){let u=Buffer.from(c,"utf8"),d=Buffer.from(Fs(l,{level:6})),p=d.length<l.length,m=p?d:l,f=vf(l),h=p?8:0,y=Buffer.alloc(30+u.length);y.writeUInt32LE(67324752,0),y.writeUInt16LE(20,4),y.writeUInt16LE(2048,6),y.writeUInt16LE(h,8),y.writeUInt16LE(s,10),y.writeUInt16LE(i,12),y.writeUInt32LE(f,14),y.writeUInt32LE(m.length,18),y.writeUInt32LE(l.length,22),y.writeUInt16LE(u.length,26),y.writeUInt16LE(0,28),u.copy(y,30);let S=Buffer.alloc(46+u.length);S.writeUInt32LE(33639248,0),S.writeUInt16LE(20,4),S.writeUInt16LE(20,6),S.writeUInt16LE(2048,8),S.writeUInt16LE(h,10),S.writeUInt16LE(s,12),S.writeUInt16LE(i,14),S.writeUInt32LE(f,16),S.writeUInt32LE(m.length,20),S.writeUInt32LE(l.length,24),S.writeUInt16LE(u.length,28),S.writeUInt16LE(0,30),S.writeUInt16LE(0,32),S.writeUInt16LE(0,34),S.writeUInt16LE(0,36),S.writeUInt32LE(2175008768,38),S.writeUInt32LE(n,42),u.copy(S,46),e.push(y,m),t.push(S),n+=y.length+m.length}let o=Buffer.concat(t),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(r.length,8),a.writeUInt16LE(r.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function xf(r){let e=[],t=0;for(;t+4<=r.length;){let n=r.readUInt32LE(t);if(n===33639248||n===101010256)break;if(n!==67324752){t++;continue}let s=r.readUInt16LE(t+8),i=r.readUInt32LE(t+18),o=r.readUInt32LE(t+22),a=r.readUInt16LE(t+26),c=r.readUInt16LE(t+28),l=r.subarray(t+30,t+30+a).toString("utf8"),u=t+30+a+c,d=r.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Ls(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),t=u+i}return e}var _f,sd,id,od=E(()=>{"use strict";vr();ee();_f=(()=>{let r=new Uint32Array(256);for(let e=0;e<256;e++){let t=e;for(let n=0;n<8;n++)t=t&1?3988292384^t>>>1:t>>>1;r[e]=t}return r})();sd={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:r,cwd:e,args:t,authUser:n})=>{let s=t.includes("-r")||t.includes("-R"),i=t.filter(f=>!f.startsWith("-")),o=i[0],a=i.slice(1);if(!o)return{stderr:"zip: no archive specified",exitCode:1};if(a.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let c=O(e,o.endsWith(".zip")?o:`${o}.zip`),l=[],u=[],d=r.users.getUid(n),p=r.users.getGid(n);for(let f of a){let h=O(e,f);if(!r.vfs.exists(h))return{stderr:`zip warning: name not matched: ${f}`,exitCode:12};let y=r.vfs.stat(h),S=f.startsWith("/")?f.slice(1):f;if(y.type==="file"){let w=r.vfs.readFileRaw(h);l.push({name:S,content:w}),u.push(`  adding: ${f} (deflated)`)}else if(s){let w=(M,v)=>{for(let R of r.vfs.list(M)){let P=`${M}/${R}`,b=`${v}/${R}`;if(r.vfs.stat(P).type==="directory")w(P,b);else{let _=r.vfs.readFileRaw(P);l.push({name:b.startsWith("/")?b.slice(1):b,content:_}),u.push(`  adding: ${b} (deflated)`)}}};w(h,S)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let m=wf(l);return r.vfs.writeFile(c,m,{},d,p),{stdout:u.join(`
`),exitCode:0}}},id={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:r,cwd:e,args:t,authUser:n})=>{let s=t.includes("-l"),i=t.indexOf("-d"),o=i===-1?void 0:t[i+1],a=t.find(h=>!h.startsWith("-")&&h!==o);if(!a)return{stderr:"unzip: missing archive operand",exitCode:1};let c=O(e,a);if(!r.vfs.exists(c))return{stderr:`unzip: cannot find or open ${a}`,exitCode:9};let l=r.vfs.readFileRaw(c),u;try{u=xf(l)}catch(h){return{stderr:`unzip: ${a}: not a valid ZIP file: ${h instanceof Error?h.message:String(h)}`,exitCode:1}}let d=o?O(e,o):e,p=r.users.getUid(n),m=r.users.getGid(n);if(s){let h=`Archive:  ${a}
  Length      Date    Time    Name
---------  ---------- -----   ----`,y=u.map(M=>`  ${String(M.content.length).padStart(8)}  2024-01-01 00:00   ${M.name}`),S=u.reduce((M,v)=>M+v.content.length,0),w=`---------                     -------
  ${String(S).padStart(8)}                     ${u.length} file${u.length===1?"":"s"}`;return{stdout:`${h}
${y.join(`
`)}
${w}`,exitCode:0}}let f=[`Archive:  ${a}`];for(let{name:h,content:y}of u){let S=h.startsWith("/")?h.slice(1):h,w=O(d,S);r.vfs.writeFile(w,y,{},p,m),f.push(`  inflating: ${w}`)}return{stdout:f.join(`
`),exitCode:0}}}});function cd(){Ct.clear();for(let r of ld()){Ct.set(r.name,r);for(let e of r.aliases??[])Ct.set(e,r)}rr=Array.from(Ct.keys()).sort()}function ld(){return[...Pf,...ad,If]}function _n(r){let e={...r,name:r.name.trim().toLowerCase(),aliases:r.aliases?.map(n=>n.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");ad.push(e),Ct.set(e.name,e);for(let n of e.aliases??[])Ct.set(n,e);rr=null}function vn(r,e,t){return{name:r,params:e,run:t}}function qt(){return rr||cd(),rr}function Cn(){return ld()}function Ye(r){return rr||cd(),Ct.get(r.toLowerCase())}var Pf,ad,Ct,rr,If,Et=E(()=>{"use strict";ns();as();ps();fs();gs();bs();Ps();Vs();Ws();ei();ri();si();oi();li();di();mi();wi();Ii();Ei();Mi();Ai();Oi();Di();Li();Bi();Vi();ji();qi();Ki();Zi();Qi();to();no();io();ao();lo();bo();vo();wo();Po();$o();No();ko();Oo();Do();Vo();Wo();Ho();Yo();Xo();ta();na();ia();ua();ma();ga();ba();wa();Pa();$a();ka();za();Wa();Ya();Xa();Qa();rc();fc();gc();Sc();_c();xc();Ic();Nc();kc();Tc();Rc();Fc();Uc();Vc();Wc();Hc();Xc();Jc();nl();il();al();ll();pl();gl();Sl();_l();Cl();Il();El();Ml();Al();Ol();Dl();Ll();zl();jl();ql();Kl();Jl();eu();ru();cu();uu();mu();yu();_u();xu();Iu();Nu();ku();Tu();Ru();Fu();Uu();zu();Gu();ju();qu();Ku();Zu();Qu();td();nd();od();Pf=[jc,Qs,Ca,Pu,Gs,pu,rl,Ga,Ha,qa,Pi,Ja,ya,Sa,ii,ci,ni,ol,Nl,oo,Ti,Oa,xo,sl,ms,bl,Ou,Wu,Ro,Hl,Ni,bu,Ql,ed,zi,La,Ua,Ba,Ra,Da,Fa,su,iu,ou,au,Yl,Ao,To,sd,id,Bs,zs,hs,Ju,Xu,jo,Ko,Mo,_o,Au,Gc,pa,Ui,Hi,ki,yl,Dc,Vl,Gl,Wl,Bc,zc,lu,bc,Pc,Yi,Xi,eo,cl,Du,dl,ui,Ji,tc,Vu,ys,Ss,so,hu,gu,fa,ha,ra,po,mo,ho,go,yo,So,Mc,qo,$i,Hu,hc,sa,Zl,Pl,Cu,pi,Qo,rs,Ac,Fi,Rl,Bl,Tl,Io,Eo,Co,Bu,ti,yc,mc,us,ds,Gi,Wi,aa,ca,la,xs,Yu,Mu,Ma,is,os,tu,vl,Go,Lc,Zc,Ri,ml,fl,hl,$u,Eu,$c,Ec,wc,Kc,ro,$l,rd,Ka,Lu,co,xa,Ia,kl,Fl,Oc,fi,hi,gi,yi,Si,bi,_i,vi,Ci],ad=[],Ct=new Map,rr=null,If=zo()});Et();Re();import*as qd from"node:path";import{basename as gh}from"node:path";import{stdin as ye,stdout as ge}from"node:process";import{createInterface as yh}from"node:readline";function $f(r){let e="",t=0;for(;t<r.length;)if(r[t]==="\x1B"&&r[t+1]==="["){for(t+=2;t<r.length&&(r.charAt(t)<"@"||r.charAt(t)>"~");)t++;t++}else e+=r[t],t++;return e}var ie={cup:(r,e)=>`\x1B[${r};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:r=>`\x1B[1m${r}\x1B[0m`,reverse:r=>`\x1B[7m${r}\x1B[0m`,color:(r,e)=>`\x1B[${r}m${e}\x1B[0m`},Ft=class r{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let t=e.toString("utf8");for(let n=0;n<t.length;){let s=this._consumeSequence(t,n);n+=s}}_consumeSequence(e,t){let n=e.charAt(t);if(n==="\x1B"){if(e[t+1]==="["){let s=t+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(t,s+1);return this._handleEscape(i),s-t+1}if(e[t+1]==="O"){let s=e.slice(t,t+3);return this._handleEscape(s),3}return t+1<e.length?(this._handleAlt(e.charAt(t+1)),2):1}return this._handleChar(n),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break;default:break}}_handleAlt(e){let t=e.toLowerCase();if(t==="u"){this._doUndo();return}if(t==="e"){this._doRedo();return}if(t==="g"){this._enterGotoLine();return}if(t==="r"){this._doSearchReplace();return}if(t==="a"){this._toggleMark();return}t==="^"&&this._doUndo()}_handleChar(e){let t=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(t<32||t===127){this._handleControl(t);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break;default:break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break;default:break}}_handlePromptChar(e){let t=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let n=e.toLowerCase();if(n==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(n==="n"){this._onExit("aborted",this._getCurrentContent());return}if(t===3||t===7||n==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(t===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>=32&&(this._inputBuffer+=e);let n=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${n}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(t===13){let n=this._inputBuffer.trim();n&&(this._searchState={query:n,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):t>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(t===13){let n=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this._cursorRow=Math.min(n-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(t===7||t===3){this._mode="normal",this.fullRedraw();return}t===127||t===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let t=this._scrollTop;this._clampScroll(),this._scrollTop===t?this._renderCursor():this._renderEditArea()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop===e?this._renderCursor():this._renderEditArea()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let t=this._scrollTop;this._clampScroll(),this._scrollTop===t?this._renderCursor():this._renderEditArea()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let t=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*t)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),t=this._cursorCol;for(;t<e.length&&/\w/.test(e.charAt(t));)t++;for(;t<e.length&&!/\w/.test(e.charAt(t));)t++;this._cursorCol=t,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),t=this._cursorCol;for(t>0&&t--;t>0&&!/\w/.test(e.charAt(t));)t--;for(;t>0&&/\w/.test(e.charAt(t-1));)t--;this._cursorCol=t,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let t=this._currentLine();this._lines[this._cursorRow]=t.slice(0,this._cursorCol)+e+t.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),t=e.slice(0,this._cursorCol),n=e.slice(this._cursorCol);this._lines[this._cursorRow]=t,this._lines.splice(this._cursorRow+1,0,n),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],t=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+t,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let t=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+t,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let t=this._undoStack.pop();t!==void 0&&(this._lines=t.lines,this._cursorRow=t.cursorRow,this._cursorCol=t.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let t=this._redoStack.pop();t!==void 0&&(this._lines=t.lines,this._cursorRow=t.cursorRow,this._cursorCol=t.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:t}=this._searchState,n=t?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(t?this._lines[a]:this._lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,t=this._cursorCol+1,n=this._lines.length,s=Math.round(e/n*100);this._renderStatusLine(`line ${e}/${n} (${s}%), col ${t}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}static _pad(e,t){return e.length>=t?e.slice(0,t):e+" ".repeat(t-e.length)}fullRedraw(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(ie.cursorHide()),e.push(ie.cup(1,1)),this._buildTitleBar(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(ie.cursorHide()),this._buildEditArea(e),e.push(ie.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let t=e-this._scrollTop+this._editAreaStart();if(t<this._editAreaStart()||t>=this._editAreaStart()+this._editAreaRows())return;let n=[];n.push(ie.cursorHide()),n.push(ie.cup(t,1)),n.push(ie.el());let s=this._lines[e]??"";n.push(this._renderLineText(s)),n.push(ie.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let t=[];t.push(ie.cursorHide()),t.push(ie.cup(this.rows-1,1)),t.push(ie.el()),t.push(ie.reverse(r._pad(e,this.cols))),t.push(ie.cursorShow()),t.push(this._buildCursorPosition()),this._stream.write(t.join(""))}_renderStatusBar(e){let t=[];t.push(ie.cursorHide()),t.push(ie.cup(this.rows,1)),t.push(ie.el()),t.push(e.slice(0,this.cols)),t.push(ie.cursorShow()),t.push(ie.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(t.join(""))}_buildTitleBar(e){let t=this._modified?"Modified":"",n=` GNU nano  ${this._filename||"New Buffer"}`,s=t,i=r._pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=r._pad(i+s,this.cols);e.push(ie.cup(1,1)),e.push(ie.reverse(o))}_buildEditArea(e){let t=this._editAreaRows();for(let n=0;n<t;n++){let s=this._scrollTop+n,i=this._editAreaStart()+n;e.push(ie.cup(i,1)),e.push(ie.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let t="",n=0;for(let s=0;s<e.length&&n<this.cols;s++)if(e[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);t+=" ".repeat(o),n+=o}else t+=e[s],n++;return t}_buildHelpBar(e){let t=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ie.cup(this.rows-1,1)),e.push(ie.el()),e.push(this._buildShortcutRow(t)),e.push(ie.cup(this.rows,1)),e.push(ie.el()),e.push(this._buildShortcutRow(n))}_buildShortcutRow(e){let t=Math.floor(this.cols/(e.length/2)),n="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ie.reverse(i)} ${o.padEnd(t-5)}${ie.reverse(a)} ${c.padEnd(t-5)}`;if(n+=l,$f(n).length>=this.cols)break}return n}_buildCursorPosition(){let e=this._currentLine(),t=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?t+=8-t%8:t++;let n=this._cursorRow-this._scrollTop+this._editAreaStart();return ie.cup(n,t+1)}_renderHelp(){let e=[];e.push(ie.cursorHide()),e.push(ie.ed()),e.push(ie.cup(1,1)),e.push(ie.reverse(r._pad(" GNU nano \u2014 Help",this.cols)));let t=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<t.length&&n+2<=this.rows-2;n++)e.push(ie.cup(n+2,1)),e.push(t[n].slice(0,this.cols));e.push(ie.cursorShow()),this._stream.write(e.join(""))}};var Un=(r,e)=>`\x1B[${r};${e}H`,ud="\x1B[?25l",Ef="\x1B[?25h",Bn="\x1B[2J\x1B[H";var ae={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Vn=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],nr=Vn.length,we=36,Gn=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Nf(r){let e=[];for(let t=0;t<r.length;t++){let n=[],s=r[t];for(let i=0;i<we;i++){let o=s[i]??" ";Gn.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}e.push(n)}for(let t=15;t<=17;t++){let n=e[t];if(n)for(let s=15;s<=20;s++)n[s]==="empty"&&(n[s]="ghost-house")}return e}var mt=[0,1,0,-1],wt=[1,0,-1,0],dd=[2,3,0,1],Mf=[0,1,2,3],kf=[3,2,1,0];function zn(r){return dd[r]}var Lt=class{_stream;_onExit;_grid;_visualGrid;_gridRow(e){let t=this._grid[e];if(t===void 0)throw new Error(`PacmanGame: row ${e} out of range`);return t}_ghost(e){let t=this._ghosts[e];if(t===void 0)throw new Error(`PacmanGame: ghost ${e} not found`);return t}_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=Nf(Vn),this._visualGrid=Vn.map(t=>Array.from(t)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let t of e)(t==="dot"||t==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:ae.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ae.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ae.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ae.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(ud+Bn),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(Ef+Bn+ae.r)}handleInput(e){let t=this._escBuf+e.toString("utf8");this._escBuf="";let n=0;for(;n<t.length;){let s=t[n];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(n+2>=t.length){this._escBuf=t.slice(n);break}if(t[n+1]==="["){let i=t[n+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),n++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=zn(s.dir))}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),t=this._pacR,n=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,t,n),this._renderDiff()}_isWalkable(e,t,n=!1){if(e<0||e>=nr)return!1;let s=(t%we+we)%we,i=this._grid[e]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+mt[this._pacNextDir],t=((this._pacC+wt[this._pacNextDir])%we+we)%we;this._isWalkable(e,t)&&(this._pacDir=this._pacNextDir);let n=this._pacR+mt[this._pacDir],s=((this._pacC+wt[this._pacDir])%we+we)%we;this._isWalkable(n,s)&&(this._pacR=n,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=zn(e.dir)))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let t=this._pacR+mt[this._pacDir]*4,n=this._pacC+wt[this._pacDir]*4;return this._pacDir===3&&(n=this._pacC-4),[t,n]}case"Inky":{let t=this._ghost(0),n=this._pacR+mt[this._pacDir]*2,s=this._pacC+wt[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[n*2-t.r,s*2-t.c]}case"Clyde":{let t=e.r-this._pacR,n=e.c-this._pacC;return t*t+n*n>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+mt[e.dir];l<15||l>17?e.dir=zn(e.dir):e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let n=[...Mf].filter(a=>a!==dd[e.dir]).filter(a=>{let c=e.r+mt[a],l=((e.c+wt[a])%we+we)%we;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of kf){if(!n.includes(u))continue;let d=e.r+mt[u],p=((e.c+wt[u])%we+we)%we,m=d-a,f=p-c,h=m*m+f*f;h<l&&(l=h,s=u)}}e.dir=s;let i=e.r+mt[e.dir],o=((e.c+wt[e.dir])%we+we)%we;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,t,n){for(let s=0;s<this._ghosts.length;s++){let i=this._ghost(s);if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s];if(a===void 0)continue;let c=a.r===this._pacR&&a.c===this._pacC&&i.r===t&&i.c===n;if(o||c)if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],t=String(this._score).padStart(6," "),n=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${ae.white}  1UP   HIGH SCORE${ae.r}`),e.push(`  ${ae.yellow}${t}${ae.r}   ${ae.white}${n}${ae.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<nr;o++){let a=s[o];for(let c=0;c<we;c++){let l=this._grid[o]?.[c],u=a[c]??" ";Gn.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=nr||o.c<0||o.c>=we)continue;let a;if(o.mode==="eaten")a=`${ae.white}\xF6${ae.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${ae.white}\u15E3${ae.r}`:`${ae.blue}\u15E3${ae.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ae.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ae.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${ae.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${ae.yellow}${this._pacMouthOpen?a:"\u25EF"}${ae.r}`}this._pacR>=0&&this._pacR<nr&&this._pacC>=0&&this._pacC<we&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<nr;o++){let a="";for(let c=0;c<we;c++){let l=s[o][c];l.includes("\x1B")?a+=l:Gn.has(l)?a+=`${ae.blue}${l}${ae.r}`:l==="\xB7"?a+=`${ae.dim}\xB7${ae.r}`:l==="\u25A0"?a+=`${ae.white}\u25A0${ae.r}`:a+=l}e.push(a)}let i=`${ae.yellow}\u15E7${ae.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${ae.yellow}${this._level}${ae.r}`),e.push(`  ${ae.dim}WASD/arrows  Q=quit${ae.r}`),this._msg&&(e[18]=`        ${ae.yellow}${ae.blink}${this._msg}${ae.r}`),e}_renderFull(){let e=this._buildLines(),t=ud+Bn;for(let n=0;n<e.length;n++)t+=Un(n+1,1)+(e[n]??"")+"\x1B[K";this._stream.write(t),this._prevLines=e}_renderDiff(){let e=this._buildLines(),t="";for(let n=0;n<e.length;n++){let s=e[n]??"";s!==this._prevLines[n]&&(t+=Un(n+1,1)+s+"\x1B[K")}for(let n=e.length;n<this._prevLines.length;n++)t+=Un(n+1,1)+"\x1B[K";t&&this._stream.write(t),this._prevLines=e}};Ln();function Lr(r,e,t){let n=[`Linux ${r} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(t){let s=new Date(t.at),i=Number.isNaN(s.getTime())?t.at:Fr(s);n.push(`Last login: ${i} from ${t.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function Af(r,e,t,n,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/",c=r.replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,t.split(".")[0]??t).replace(/\\H/g,t).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\");return s?c=c.replace(/\\\[/g,"").replace(/\\\]/g,""):c=c.replace(/\\\[/g,"").replace(/\\\]/g,""),c}function Ut(r,e,t,n,s,i=!1){if(n)return Af(n,r,e,s??t,i);let o=r==="root",a=m=>i?`${m}`:m,c=a("\x1B[37m"),l=a(o?"\x1B[1;31m":"\x1B[1;35m"),u=a("\x1B[1;34m"),d=o?a("\x1B[1;31m"):"";return`${c}[${l}${r}${c}@${u}${e}${c} ${t}]${d}${o?"#":"$"}\x1B[0m `}wr();import{EventEmitter as ph}from"node:events";function pd(r){return r==="1"||r==="true"}function md(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function Tf(){return pd(process.env.DEV_MODE)||pd(process.env.RENDER_PERF)}function Ur(r){let e=Tf();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let t=md(),n=i=>{let o=md()-t;console.log(`[perf][${r}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:n,done:(i="done")=>{n(i)}}}import*as et from"node:os";import*as Ed from"node:crypto";import{EventEmitter as zf}from"node:events";import*as ue from"node:fs";import*as Pe from"node:path";import{gunzipSync as Wr,gzipSync as $d}from"node:zlib";var qn=Buffer.from([86,70,83,33]),Of=3,Wn=1,hd=2,gd=3,yd={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},Sd={};for(let[r,e]of Object.entries(yd))Sd[e]=r;var jn=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let t=Buffer.allocUnsafe(1);t.writeUInt8(e,0),this._chunks.push(t)}writeUint16(e){let t=Buffer.allocUnsafe(2);t.writeUInt16LE(e,0),this._chunks.push(t)}writeUint32(e){let t=Buffer.allocUnsafe(4);t.writeUInt32LE(e,0),this._chunks.push(t)}writeFloat64(e){let t=Buffer.allocUnsafe(8);t.writeDoubleBE(e,0),this._chunks.push(t)}writeString(e){let t=Buffer.from(e,"utf8");this.writeUint16(t.length),this._chunks.push(t)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function bd(r,e){if(e.type==="file"){let t=e;r.writeUint8(Wn),r.writeString(t.name),r.writeUint32(t.mode),r.writeUint32(t.uid),r.writeUint32(t.gid),r.writeFloat64(t.createdAt),r.writeFloat64(t.updatedAt),r.writeUint8(t.compressed?1:0),r.writeBytes(t.content)}else if(e.type==="stub"){let t=e;r.writeUint8(Wn),r.writeString(t.name),r.writeUint32(t.mode),r.writeUint32(t.uid),r.writeUint32(t.gid),r.writeFloat64(t.createdAt),r.writeFloat64(t.updatedAt),r.writeUint8(0),r.writeBytes(Buffer.from(t.stubContent,"utf8"))}else if(e.type==="device"){let t=e;r.writeUint8(gd),r.writeString(t.name),r.writeUint32(t.mode),r.writeUint32(t.uid),r.writeUint32(t.gid),r.writeFloat64(t.createdAt),r.writeFloat64(t.updatedAt),r.writeUint8(yd[t.deviceKind]??0),r.writeUint8(t.major),r.writeUint8(t.minor)}else{let t=e;r.writeUint8(hd),r.writeString(t.name),r.writeUint32(t.mode),r.writeUint32(t.uid),r.writeUint32(t.gid),r.writeFloat64(t.createdAt),r.writeFloat64(t.updatedAt);let n=Object.values(t.children);r.writeUint32(n.length);for(let s of n)bd(r,s)}}function Yn(r){let e=new jn;return e.write(qn),e.writeUint8(Of),bd(e,r),e.toBuffer()}var Hn=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),t=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,t}readBytes(){let e=this.readUint32(),t=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,t}remaining(){return this.buf.length-this._pos}};function _d(r,e){let t=r.readUint8(),n=Rf(r.readString()),s=r.readUint32(),i=e?r.readUint32():0,o=e?r.readUint32():0,a=r.readFloat64(),c=r.readFloat64();if(t===Wn){let l=r.readUint8()===1,u=r.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(t===gd){let l=r.readUint8(),u=r.readUint8(),d=r.readUint8(),p=Sd[l]??"null";return{type:"device",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(t===hd){let l=r.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=_d(r,e);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${t.toString(16)}`)}var sr=new Map,fd=500;function Rf(r){let e=sr.get(r);if(e!==void 0)return e;if(sr.size>=fd){let t=Math.floor(fd/4),n=[...sr.keys()];for(let s=0;s<t;s++)sr.delete(n[s])}return sr.set(r,r),r}function ft(r){if(r.length<5)throw new Error("[VFS binary] Buffer too short");if(!r.slice(0,4).equals(qn))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let t=new Hn(r);t.readUint8(),t.readUint8(),t.readUint8(),t.readUint8();let s=t.readUint8()>=2,i=_d(t,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function vd(r){return r.length>=4&&r.slice(0,4).equals(qn)}var Br={readLatencyMs:5,writeLatencyMs:10,sequentialReadThroughput:500,sequentialWriteThroughput:300};var zr=class{_cache=new Map;_maxEntries;_maxMemoryBytes;_policy;_diskIo;_simulateDiskIo;_hits=0;_misses=0;_evictions=0;_totalMemoryUsage=0;constructor(e={}){this._maxEntries=e.maxEntries??1e3,this._maxMemoryBytes=e.maxMemoryBytes??64*1024*1024,this._policy=e.policy??"lru",this._simulateDiskIo=e.simulateDiskIo??!0;let t=e.diskIo??{};this._diskIo={readLatencyMs:t.readLatencyMs??Br.readLatencyMs,writeLatencyMs:t.writeLatencyMs??Br.writeLatencyMs,sequentialReadThroughput:t.sequentialReadThroughput??Br.sequentialReadThroughput,sequentialWriteThroughput:t.sequentialWriteThroughput??Br.sequentialWriteThroughput}}async get(e,t){let n=this._cache.get(e);if(n)return this._hits++,n.lastAccessedAt=Date.now(),n.accessCount++,Buffer.from(n.content);if(this._misses++,this._simulateDiskIo){let i=await t(),o=i.length/this._diskIo.sequentialReadThroughput,a=this._diskIo.readLatencyMs+o;return await this._delay(a),this._set(e,i),i}let s=await t();return this._set(e,s),s}getSync(e,t){let n=this._cache.get(e);if(n)return this._hits++,n.lastAccessedAt=Date.now(),n.accessCount++,Buffer.from(n.content);this._misses++;let s=t();if(this._simulateDiskIo){let i=s.length/this._diskIo.sequentialReadThroughput,o=this._diskIo.readLatencyMs+i;this._syncDelay(o)}return this._set(e,s),s}async set(e,t,n){if(this._simulateDiskIo&&n){let s=t.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;await n(t),await this._delay(i)}else n&&await n(t);this._set(e,t)}setSync(e,t,n){if(this._simulateDiskIo&&n){n(t);let s=t.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;this._syncDelay(i)}else n&&n(t);this._set(e,t)}has(e){return this._cache.has(e)}delete(e){let t=this._cache.get(e);return t?(this._totalMemoryUsage-=t.size,this._cache.delete(e),!0):!1}clear(){this._cache.clear(),this._totalMemoryUsage=0}getStats(){let e=this._hits+this._misses;return{hits:this._hits,misses:this._misses,evictions:this._evictions,entries:this._cache.size,memoryUsage:this._totalMemoryUsage,hitRate:e>0?this._hits/e*100:0}}resetStats(){this._hits=0,this._misses=0,this._evictions=0}getPolicy(){return this._policy}getDiskIoParams(){return{...this._diskIo}}updateDiskIoParams(e){e.readLatencyMs!==void 0&&(this._diskIo.readLatencyMs=e.readLatencyMs),e.writeLatencyMs!==void 0&&(this._diskIo.writeLatencyMs=e.writeLatencyMs),e.sequentialReadThroughput!==void 0&&(this._diskIo.sequentialReadThroughput=e.sequentialReadThroughput),e.sequentialWriteThroughput!==void 0&&(this._diskIo.sequentialWriteThroughput=e.sequentialWriteThroughput)}_set(e,t){let n=this._cache.get(e);n&&(this._totalMemoryUsage-=n.size);let s=t.length;for(;(this._cache.size>=this._maxEntries||this._totalMemoryUsage+s>this._maxMemoryBytes)&&this._evictOne(););let i={content:Buffer.from(t),insertedAt:Date.now(),lastAccessedAt:Date.now(),accessCount:1,size:s};this._cache.set(e,i),this._totalMemoryUsage+=s}_evictOne(){if(this._cache.size===0)return!1;let e=null;switch(this._policy){case"lru":e=this._findLru();break;case"lfu":e=this._findLfu();break;case"fifo":e=this._findFifo();break;default:throw new Error(`Unknown eviction policy: ${this._policy}`)}if(e){let t=this._cache.get(e);return this._totalMemoryUsage-=t.size,this._cache.delete(e),this._evictions++,!0}return!1}_findLru(){let e=Number.POSITIVE_INFINITY,t=null;for(let[n,s]of this._cache)s.lastAccessedAt<e&&(e=s.lastAccessedAt,t=n);return t}_findLfu(){let e=Number.POSITIVE_INFINITY,t=null;for(let[n,s]of this._cache)s.accessCount<e&&(e=s.accessCount,t=n);return t}_findFifo(){let e=Number.POSITIVE_INFINITY,t=null;for(let[n,s]of this._cache)s.insertedAt<e&&(e=s.insertedAt,t=n);return t}_delay(e){return new Promise(t=>setTimeout(t,e))}_syncDelay(e){if(e<=0)return;let t=Date.now();for(;Date.now()-t<e;);}};import*as xe from"node:fs";var fe={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},ir="utf8";function Df(r,e,t){let n=Buffer.from(t,ir);return r.writeUInt16LE(n.length,e),n.copy(r,e+2),2+n.length}function Ff(r){let e=Buffer.from(r.path,ir),t=0;r.op===fe.WRITE?t=4+(r.content?.length??0)+4:r.op===fe.MKDIR?t=4:r.op===fe.REMOVE?t=0:r.op===fe.CHMOD?t=4:(r.op===fe.MOVE||r.op===fe.SYMLINK)&&(t=2+Buffer.byteLength(r.dest??"",ir));let n=3+e.length+t,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(r.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,r.op===fe.WRITE){let o=r.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(r.mode??420,i),i+=4}else r.op===fe.MKDIR?(s.writeUInt32LE(r.mode??493,i),i+=4):r.op===fe.CHMOD?(s.writeUInt32LE(r.mode??420,i),i+=4):(r.op===fe.MOVE||r.op===fe.SYMLINK)&&(i+=Df(s,i,r.dest??""));return s}function Lf(r){let e=[],t=0;try{for(;t<r.length&&!(t+3>r.length);){let n=r.readUInt8(t++),s=r.readUInt16LE(t);if(t+=2,t+s>r.length)break;let i=r.subarray(t,t+s).toString(ir);if(t+=s,n===fe.WRITE){if(t+4>r.length)break;let o=r.readUInt32LE(t);if(t+=4,t+o+4>r.length)break;let a=Buffer.from(r.subarray(t,t+o));t+=o;let c=r.readUInt32LE(t);t+=4,e.push({op:n,path:i,content:a,mode:c})}else if(n===fe.MKDIR){if(t+4>r.length)break;let o=r.readUInt32LE(t);t+=4,e.push({op:n,path:i,mode:o})}else if(n===fe.REMOVE)e.push({op:n,path:i});else if(n===fe.CHMOD){if(t+4>r.length)break;let o=r.readUInt32LE(t);t+=4,e.push({op:n,path:i,mode:o})}else if(n===fe.MOVE||n===fe.SYMLINK){if(t+2>r.length)break;let o=r.readUInt16LE(t);if(t+=2,t+o>r.length)break;let a=r.subarray(t,t+o).toString(ir);t+=o,e.push({op:n,path:i,dest:a})}else break}}catch{}return e}function Cd(r,e){let t=Ff(e);if(xe.existsSync(r)){let n=xe.openSync(r,xe.constants.O_WRONLY|xe.constants.O_CREAT|xe.constants.O_APPEND);try{xe.writeSync(n,t)}finally{xe.closeSync(n)}}else xe.existsSync(".vfs")||xe.mkdirSync(".vfs"),xe.writeFileSync(r,t)}function Kn(r){if(!xe.existsSync(r))return[];let e=xe.readFileSync(r);return e.length===0?[]:Lf(e)}function wd(r){xe.existsSync(r)&&xe.unlinkSync(r)}import*as Vr from"node:path";function Q(r){if(!r||r.trim()==="")return"/";let e=Vr.posix.normalize(r.startsWith("/")?r:`/${r}`);return e===""?"/":e}function Uf(r,e){let t=Q(e);return Se(r,t)}function Se(r,e){if(e==="/")return r;let t=r,n=1;for(;n<=e.length;){let s=e.indexOf("/",n),i=s===-1?e.length:s,o=e.slice(n,i);if(o){if(t.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=t.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);t=a}if(s===-1)break;n=s+1}return t}function ht(r,e,t,n){let s=Q(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=Vr.posix.dirname(s),o=Vr.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);t&&n(i);let a=Uf(r,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Xn=4,gt=2,at=1;function je(r,e,t,n,s){let i=Q(e),o=Se(r,i);if(t===0){if(s&at&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(t===o.uid?a=o.mode>>6&7:n===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function Bt(r,e,t,n){let s=Q(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{je(r,o,t,n,at)}catch(c){if(c instanceof Error&&c.message.includes("does not exist"))return;throw new Error(`EACCES: permission denied: '${o}'`)}}}function xd(r,e,t,n,s){let i=Q(e),o=Se(r,i);if(je(r,i,n,s,gt|at),o.mode&512&&n!==0&&n!==o.uid){let a=o.children[t];if(a&&a.uid!==n)throw new Error(`EACCES: permission denied: cannot delete '${t}' (sticky bit)`)}}function Pd(r){if(r!==0)throw new Error("EPERM: operation not permitted: chown")}function Id(r,e,t){let n=Q(e),s=Se(r,n);if(t!==0&&t!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${n}'`)}import*as Me from"node:fs";import*as zt from"node:path";import{createHash as Bf}from"node:crypto";var Gr=class r{_swapDir;_entries=new Map;_swapIns=0;_swapOuts=0;constructor(e){this._swapDir=e}initialize(){Me.existsSync(this._swapDir)||Me.mkdirSync(this._swapDir,{recursive:!0}),this._loadExistingEntries()}swapOut(e,t,n){let s=r._hashPath(e),i=zt.join(this._swapDir,`${s}.swap`),o=Buffer.alloc(5);o.writeUInt32LE(t.length,0),o.writeUInt8(n?1:0,4);let a=`${i}.tmp`;Me.writeFileSync(a,Buffer.concat([o,t])),Me.renameSync(a,i),this._entries.set(e,{vfsPath:e,size:t.length,compressed:n,lastAccess:Date.now()}),this._swapOuts++}swapIn(e){let t=this._entries.get(e);if(!t)return null;let n=r._hashPath(e),s=zt.join(this._swapDir,`${n}.swap`);try{if(!Me.existsSync(s))return this._entries.delete(e),null;let i=Me.readFileSync(s);if(i.length<5)return this._entries.delete(e),null;let o=i.readUInt32LE(0),a=i.subarray(5);if(a.length!==o)return this._entries.delete(e),null;t.lastAccess=Date.now(),this._swapIns++;try{Me.unlinkSync(s)}catch{}return this._entries.delete(e),a}catch{return this._entries.delete(e),null}}hasSwapped(e){if(!this._entries.get(e))return!1;let n=r._hashPath(e),s=zt.join(this._swapDir,`${n}.swap`);return Me.existsSync(s)}deleteSwap(e){let t=r._hashPath(e),n=zt.join(this._swapDir,`${t}.swap`);try{Me.unlinkSync(n)}catch{}this._entries.delete(e)}getEntry(e){return this._entries.get(e)}getLruEntries(){return Array.from(this._entries.values()).filter(e=>this.hasSwapped(e.vfsPath)).sort((e,t)=>e.lastAccess-t.lastAccess)}getStats(){let e=0,t=0,n=0;for(let s of this._entries.values())this.hasSwapped(s.vfsPath)&&(n++,t+=s.size,e+=s.size+5);return{filesSwapped:n,diskUsage:e,originalSize:t,swapIns:this._swapIns,swapOuts:this._swapOuts}}clear(){for(let e of this._entries.values())this.deleteSwap(e.vfsPath);this._entries.clear(),this._swapIns=0,this._swapOuts=0}getSwapCount(){return this._entries.size}static _hashPath(e){return Bf("sha256").update(e).digest("hex").slice(0,16)}_loadExistingEntries(){try{let e=Me.readdirSync(this._swapDir);for(let t of e){if(!t.endsWith(".swap"))continue;let n=zt.join(this._swapDir,t);try{let s=Me.statSync(n);if(s.size<5)continue;let i=Me.readFileSync(n),o=i.readUInt32LE(0),a=i.readUInt8(4)===1,c=t.replace(".swap","");this._entries.set(`__hash:${c}`,{vfsPath:`__hash:${c}`,size:o,compressed:a,lastAccess:s.mtimeMs})}catch{}}}catch{}}};var Zn=class r extends zf{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;_swapStore=null;_swapEnabled;_fileCache=null;_cacheEnabled;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');if(this._snapshotFile=Pe.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Pe.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500,this._swapEnabled=e.swapEnabled??!1,this._swapEnabled){let n=e.swapDir??Pe.resolve(e.snapshotPath,"swap");this._swapStore=new Gr(n),this._swapStore.initialize()}let t=e.flushIntervalMs??1e3;t>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},t),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0,this._swapEnabled=!1;if(this._cacheEnabled=e.cache?.enabled??!1,this._cacheEnabled){let t={maxEntries:e.cache?.maxEntries,maxMemoryBytes:e.cache?.maxMemoryBytes,policy:e.cache?.policy,diskIo:e.cache?.diskIo,simulateDiskIo:e.cache?.simulateDiskIo};this._fileCache=new zr(t)}this._root=r._makeDir("",493)}static _makeDir(e,t,n=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:t,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}static _makeFile(e,t,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:t,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}static _makeStub(e,t,n,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:t,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}static _makeDeviceNode(e,t,n,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:t,mode:n,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,t,n=420){let s=Q(e),{parent:i,name:o}=ht(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=r._makeStub(o,t,n))}mknod(e,t,n=438,s=1,i=0){let o=Q(e),{parent:a,name:c}=ht(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=r._makeDeviceNode(c,t,n,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:t}),this._journal({op:fe.MKDIR,path:o,mode:n})}fdOpen(e,t=0){let n=Q(e),s=this.exists(n);if(!(s||t&64))throw new Error(`ENOENT: no such file or directory, open '${n}'`);!s&&t&64&&this.writeFile(n,"",{mode:420}),t&512&&this.writeFile(n,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:n,flags:t,refCount:1}),i}fdClose(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);t.refCount--,t.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);let n=this._nextFd++;return this._fdTable.set(n,{path:t.path,flags:t.flags,refCount:1}),n}fdDup2(e,t){if(e===t)return t;let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(t);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(t)),this._fdTable.set(t,{path:n.path,flags:n.flags,refCount:1}),t}fdPath(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);return t.path}fdFlags(e){let t=this._fdTable.get(e);if(!t)throw new Error(`EBADF: bad file descriptor: ${e}`);return t.flags}getOpenFds(){let e=new Map;for(let[t,n]of this._fdTable)e.set(t,n.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,t,n,s){let i=Q(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=r._makeDir(l,t),n!==void 0&&(u.uid=n),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:t}),this._journal({op:fe.MKDIR,path:c,mode:t});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}restoreMirror(){if(!(this._mode!=="fs"||!this._snapshotFile)){if(!ue.existsSync(this._snapshotFile)){if(this._journalFile){let e=Kn(this._journalFile);e.length>0&&this._replayJournal(e)}return}try{let e=ue.readFileSync(this._snapshotFile);if(vd(e))this._root=ft(e);else{let t=JSON.parse(e.toString("utf8"));this._root=this._deserializeDir(t.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let t=Kn(this._journalFile);t.length>0&&this._replayJournal(t)}}catch(e){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,e instanceof Error?e.message:String(e))}}}flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Pe.dirname(this._snapshotFile);ue.mkdirSync(e,{recursive:!0});let t=this._root,n=Yn(t);ue.writeFileSync(this._snapshotFile,n),this._journalFile&&wd(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}_autoFlush(){this._dirty&&this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&this.flushMirror()}importRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=t}}mergeRootTree(e){let t=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=t}}_mergeDir(e,t){for(let[n,s]of Object.entries(t.children)){let i=e.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[n]=s,e._childCount++,e._sortedKeys=null):i||(e.children[n]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Yn(this._root)}releaseTree(){this._root=r._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(Cd(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let t of e)try{t.op===fe.WRITE?this.writeFile(t.path,t.content??Buffer.alloc(0),{mode:t.mode}):t.op===fe.MKDIR?this.mkdir(t.path,t.mode):t.op===fe.REMOVE?this.exists(t.path)&&this.remove(t.path,{recursive:!0}):t.op===fe.CHMOD?this.exists(t.path)&&this.chmod(t.path,t.mode??420):t.op===fe.MOVE?this.exists(t.path)&&t.dest&&this.move(t.path,t.dest):t.op===fe.SYMLINK&&t.dest&&this.symlink(t.dest,t.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||ue.existsSync(this._snapshotFile)&&(this._evictDir(this._root),this._cachedUsageBytes=null)}_evictDir(e){for(let t of Object.values(e.children))if(t.type==="directory")this._evictDir(t);else if(t.type==="file"&&!t.evicted){let n=t.compressed?t.size??t.content.length*2:t.content.length;if(n>this._evictionThreshold){if(this._swapEnabled&&this._swapStore&&t.content.length>0){let s=this._getNodePath(this._root,t);s&&this._swapStore.swapOut(s,t.content,t.compressed)}t.size=n,t.content=Buffer.alloc(0),t.evicted=!0}}}getOpenPaths(){let e=new Set;for(let t of this._fdTable.values())e.add(t.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,t,n){let s=0;for(let[i,o]of Object.entries(e.children)){let a=n?`${n}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,t,a);else if(o.type==="file"&&!o.evicted&&!t.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(this._swapEnabled&&this._swapStore&&o.content.length>0&&this._swapStore.swapOut(a,o.content,o.compressed),o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}swapOutFile(e){if(!(this._swapEnabled&&this._swapStore))return!1;let t;try{t=Se(this._root,e)}catch{return!1}if(t.type!=="file"||t.evicted||t.content.length===0)return!1;let n=t.content,s=t.compressed;return this._swapStore.swapOut(e,n,s),t.size=n.length,t.content=Buffer.alloc(0),t.evicted=!0,!0}swapOutLru(e){if(!(this._swapEnabled&&this._swapStore))return 0;let t=this.getOpenPaths(),n=0,s=0,i=[];this._collectEvictableFiles(this._root,"",t,i),i.sort((o,a)=>a.size-o.size);for(let o of i){if(n>=e)break;this.swapOutFile(o.path)&&(n+=o.size,s++)}return s}getSwapStats(){return this._swapStore?.getStats()??null}isSwapEnabled(){return this._swapEnabled}clearSwap(){this._swapStore?.clear()}getCacheStats(){return this._fileCache?.getStats()??null}isCacheEnabled(){return this._cacheEnabled}clearCache(){this._fileCache?.clear(),this._fileCache?.resetStats()}invalidateCache(e){let t=Q(e);this._fileCache?.delete(t)}preloadCache(e){if(!(this._cacheEnabled&&this._fileCache))return 0;let t=0;for(let n of e)try{let s=Q(n),i=Se(this._root,s);if(i.type==="file"){i.evicted&&this._reloadEvicted(i,s);let o=i.compressed?Wr(i.content):i.content;this._fileCache.setSync(s,o),t++}}catch{}return t}_getNodePath(e,t){return this._findNodePath(e,t,"")}_findNodePath(e,t,n){for(let[s,i]of Object.entries(e.children)){if(i===t)return n?`${n}/${s}`:`/${s}`;if(i.type==="directory"){let o=n?`${n}/${s}`:`/${s}`,a=this._findNodePath(i,t,o);if(a)return a}}return null}_collectEvictableFiles(e,t,n,s){for(let[i,o]of Object.entries(e.children)){let a=t?`${t}/${i}`:`/${i}`;if(o.type==="directory")this._collectEvictableFiles(o,a,n,s);else if(o.type==="file"&&!o.evicted&&!n.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>0&&s.push({path:a,size:c})}}}onBeforeWrite(e,t){let n=Q(e);this._writeHooks.set(n,t),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let t=Q(e);this._writeHooks.delete(t),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerWriteHook(e,t){if(this._sortedWriteHooks){for(let n of this._sortedWriteHooks)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let s=this._writeHooks.get(n);if(s){s(e,t);return}}}}registerContentResolver(e,t){let n=Q(e);this._contentResolvers.set(n,t),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let t of this._sortedContentResolvers)if(e===t||e.startsWith(t==="/"?"/":`${t}/`)){let n=this._contentResolvers.get(t);if(n)return n(e)}return null}_reloadEvicted(e,t){if(e.evicted){if(this._swapStore){let n=this._swapStore.swapIn(t);if(n){e.content=n,e.evicted=void 0;return}}if(this._snapshotFile&&ue.existsSync(this._snapshotFile))try{let n=ue.readFileSync(this._snapshotFile),s=ft(n),i=t.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}}mount(e,t,{readOnly:n=!0}={}){if(r._isBrowser)return;let s=Q(e),i=Pe.resolve(t);if(!ue.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!ue.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(e){let t=Q(e);this._mounts.delete(t)&&(this._sortedMounts=null,this.emit("unmount",{vPath:t}))}getMounts(){return[...this._mounts.entries()].map(([e,t])=>({vPath:e,...t}))}onBeforeRead(e,t){let n=Q(e);this._readHooks.set(n,t),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let t=Q(e);this._readHooks.delete(t),this._sortedReadHooks=[...this._readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let t of this._sortedReadHooks)if(e===t||e.startsWith(t==="/"?"/":`${t}/`)){let n=this._readHooks.get(t);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let t=Q(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(t===n||t.startsWith(`${n}/`)){let i=t.slice(n.length).replace(/^\//,""),o=i?Pe.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,t=493,n,s){let i=Q(e),o=(()=>{try{return Se(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);if(n!==void 0&&s!==void 0&&!o){let a=Pe.posix.dirname(i);if(a!==i)try{je(this._root,a,n,s,gt|at)}catch(c){if(!(c instanceof Error&&c.message.includes("does not exist")))throw c}}this._mkdirRecursive(i,t,n,s)}writeFile(e,t,n={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let h=Pe.dirname(o.fullHostPath);ue.existsSync(h)||ue.mkdirSync(h,{recursive:!0}),ue.writeFileSync(o.fullHostPath,Buffer.isBuffer(t)?t:Buffer.from(t,"utf8"));return}let a=Q(e),c=Buffer.isBuffer(t)?t:Buffer.from(t,"utf8");if(this._triggerWriteHook(a,c),s!==void 0&&i!==void 0){Bt(this._root,a,s,i);let h=Pe.posix.dirname(a);if(h!==a)try{je(this._root,h,s,i,gt|at)}catch(y){if(!(y instanceof Error&&y.message.includes("does not exist")))throw y}}let{parent:l,name:u}=ht(this._root,a,!0,h=>this._mkdirRecursive(h,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){r._writeDeviceNode(d,a),d.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&je(this._root,a,s,i,gt);let p=n.compress??!1,m=p?$d(c):c,f=n.mode??420;if(this._ramCapBytes!==null){let h=this._getCachedUsage(),y=d?.type==="file"?d.content.length:0,S=h-y+m.length;if(S>this._ramCapBytes){let w=S-this._ramCapBytes,M=this.swapOutLru(w),R=this._getCachedUsage()-y+m.length;if(R>this._ramCapBytes&&M===0)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${R}/${this._ramCapBytes} bytes)`)}}d&&d.type==="file"?(d.content=m,d.compressed=p,d.mode=f,s!==void 0&&(d.uid=s),i!==void 0&&(d.gid=i),d.updatedAt=Date.now()):(d||(l._childCount++,l._sortedKeys=null),l.children[u]=r._makeFile(u,m,f,p,s,i)),this.emit("file:write",{path:a,size:m.length}),this._journal({op:fe.WRITE,path:a,content:c,mode:f}),this._cachedUsageBytes=null,this._cacheEnabled&&this._fileCache&&this._fileCache.delete(a)}readFile(e,t,n){let s=this._resolveMount(e);if(s){if(!ue.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return ue.readFileSync(s.fullHostPath,"utf8")}let i=Q(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;if(this._cacheEnabled&&this._fileCache?.has(i)){let l=this._fileCache.getSync(i,()=>Buffer.alloc(0));return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}t!==void 0&&n!==void 0&&Bt(this._root,i,t,n);let a=Se(this._root,i);if(a.type==="stub")return t!==void 0&&n!==void 0&&je(this._root,i,t,n,Xn),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let l=r._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:l.length}),l}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);t!==void 0&&n!==void 0&&je(this._root,i,t,n,Xn),a.evicted&&this._reloadEvicted(a,i);let c=a.compressed?Wr(a.content):a.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(i,c),this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(e){let t=this._resolveMount(e);if(t){if(!ue.existsSync(t.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${t.fullHostPath}'`);return ue.readFileSync(t.fullHostPath)}let n=Q(e);if(this._triggerReadHook(n),this._cacheEnabled&&this._fileCache?.has(n)){let o=this._fileCache.getSync(n,()=>Buffer.alloc(0));return this.emit("file:read",{path:n,size:o.length}),o}let s=Se(this._root,n);if(s.type==="stub"){let o=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:o.length}),o}if(s.type==="device"){let o=r._readDeviceNode(s,n),a=Buffer.from(o,"binary");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);s.evicted&&this._reloadEvicted(s,n);let i=s.compressed?Wr(s.content):s.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(n,i),this.emit("file:read",{path:n,size:i.length}),i}exists(e){let t=this._resolveMount(e);if(t)return ue.existsSync(t.fullHostPath);let n=Q(e);try{return Se(this._root,n),!0}catch{return!1}}chmod(e,t,n){let s=Q(e);n!==void 0&&Id(this._root,s,n),Se(this._root,s).mode=t,this._journal({op:fe.CHMOD,path:s,mode:t})}chown(e,t,n,s){let i=Q(e);s!==void 0&&Pd(s);let o=Se(this._root,i);o.uid=t,o.gid=n,this._journal({op:fe.CHMOD,path:i,mode:o.mode})}getOwner(e){let t=Se(this._root,Q(e));return{uid:t.uid,gid:t.gid}}checkAccess(e,t,n,s){try{let i=Se(this._root,Q(e)),o=i.mode;if(t===0)return s&1?(o&73)!==0:!0;let a=0;return t===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let t=this._resolveMount(e);if(t){if(!ue.existsSync(t.fullHostPath))throw new Error(`ENOENT: stat '${t.fullHostPath}'`);let a=ue.statSync(t.fullHostPath),c=t.relPath.split("/").pop()??t.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:Q(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:ue.readdirSync(t.fullHostPath).length}:{type:"file",name:c,path:Q(e),mode:t.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let n=Q(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=this._resolveContent(n);if(s!==null)return{type:"file",name:n==="/"?"":Pe.posix.basename(n),path:n,mode:292,uid:0,gid:0,createdAt:new Date,updatedAt:new Date,compressed:!1,size:s.length};let i=Se(this._root,n),o=n==="/"?"":Pe.posix.basename(n);return i.type==="stub"?{type:"file",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:!1,size:i.stubContent.length}:i.type==="file"?{type:"file",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:i.compressed,size:i.evicted?i.size??0:i.content.length}:i.type==="device"?{type:"device",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}:{type:"directory",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),childrenCount:i._childCount}}static _readDeviceNode(e,t){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${t}'`);case"random":case"urandom":return Ed.randomBytes(64).toString("binary");default:return""}}static _writeDeviceNode(e,t){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${t}'`)}statType(e){try{let t=this._resolveMount(e);if(t){let s=ue.statSync(t.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let n=Se(this._root,Q(e));return n.type==="directory"?"directory":n.type==="device"?"device":"file"}catch{return null}}list(e="/"){let t=this._resolveMount(e);if(t){if(!ue.existsSync(t.fullHostPath))return[];try{return ue.readdirSync(t.fullHostPath).sort()}catch{return[]}}let n=Q(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Se(this._root,n);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let t=Q(e),n=Se(this._root,t);if(n.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Pe.posix.basename(t);return this._renderTreeLines(n,s)}_renderTreeLines(e,t){let n=[t];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i];if(o===void 0)continue;let a=e.children[o];if(a===void 0)continue;let c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(n.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(Se(this._root,Q(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let t=0;for(let n of Object.values(e.children))t+=this._computeUsage(n);return t}setRamCap(e){this._ramCapBytes=e!==null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let t=Se(this._root,Q(e));if(t.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);t.compressed||(t.content=$d(t.content),t.compressed=!0,t.updatedAt=Date.now())}decompressFile(e){let t=Se(this._root,Q(e));if(t.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);t.compressed&&(t.content=Wr(t.content),t.compressed=!1,t.updatedAt=Date.now())}symlink(e,t,n,s){let i=Q(t),o=e.startsWith("/")?Q(e):e;if(n!==void 0&&s!==void 0){let u=Pe.posix.dirname(i);if(u!==i)try{je(this._root,u,n,s,gt|at)}catch(d){if(!(d instanceof Error&&d.message.includes("does not exist")))throw d}}let{parent:a,name:c}=ht(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:n??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:fe.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let t=Se(this._root,Q(e));return t.type==="file"&&t.mode===41471}catch{return!1}}resolveSymlink(e,t=8){let n=Q(e);for(let s=0;s<t;s++){try{let i=Se(this._root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:Q(Pe.posix.join(Pe.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,t={},n,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!ue.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);ue.statSync(i.fullHostPath).isDirectory()?ue.rmSync(i.fullHostPath,{recursive:t.recursive??!1}):ue.unlinkSync(i.fullHostPath);return}let o=Q(e);if(o==="/")throw new Error("Cannot remove root directory.");if(n!==void 0&&s!==void 0){Bt(this._root,o,n,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";xd(this._root,u,d,n,s)}let a=Se(this._root,o);if(a.type==="directory"&&!t.recursive&&a._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`);let{parent:c,name:l}=ht(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:fe.REMOVE,path:o})}move(e,t,n,s){let i=Q(e),o=Q(t);if(i==="/"||o==="/")throw new Error("Cannot move root directory.");if(n!==void 0&&s!==void 0){Bt(this._root,i,n,s),Bt(this._root,o,n,s);let p=Pe.posix.dirname(i),m=Pe.posix.dirname(o);if(p!==i&&je(this._root,p,n,s,gt|at),m!==o)try{je(this._root,m,n,s,gt|at)}catch(f){if(!(f instanceof Error&&f.message.includes("does not exist")))throw f}}let a=Se(this._root,i);if(this.exists(o))throw new Error(`Destination '${o}' already exists.`);this._mkdirRecursive(Pe.posix.dirname(o),493);let{parent:c,name:l}=ht(this._root,o,!1,()=>{}),{parent:u,name:d}=ht(this._root,i,!1,()=>{});delete u.children[d],u._childCount--,u._sortedKeys=null,a.name=l,c.children[l]=a,c._childCount++,c._sortedKeys=null,this._journal({op:fe.MOVE,path:i,dest:o})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let t=[];for(let n of Object.values(e.children))n.type==="stub"?t.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?t.push(r._serializeFile(n)):n.type==="device"?t.push({type:"device",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),deviceKind:n.deviceKind,major:n.major,minor:n.minor}):t.push(this._serializeDir(n));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:t}}static _serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let t=new r;return t._root=t._deserializeDir(e.root,""),t}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,t){let n={type:"directory",name:t,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file")n.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")};else if(s.type==="device")n.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor};else{let i=this._deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},jr=Zn;function x(r,e,t=493){r.exists(e)||r.mkdir(e,t)}function $(r,e,t,n=420){r.writeStub(e,t,n)}function F(r,e,t){r.writeFile(e,t)}function Vf(r){let e=2166136261;for(let t=0;t<r.length;t++)e^=r.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function Gf(r,e,t){x(r,"/etc"),$(r,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${t.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),$(r,"/etc/fortune_version",`nyx/stable
`),$(r,"/etc/hostname",`${e}
`),$(r,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),$(r,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),$(r,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),$(r,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),$(r,"/etc/motd",["",`Welcome to ${t.os}`,`Kernel: ${t.kernel}`,""].join(`
`)),$(r,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${t.os}"`].join(`
`)}
`),x(r,"/etc/apt"),x(r,"/etc/apt/sources.list.d"),x(r,"/etc/apt/trusted.gpg.d"),x(r,"/etc/apt/keyrings"),$(r,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),$(r,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),x(r,"/etc/network"),$(r,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),x(r,"/etc/netplan"),$(r,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),$(r,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),$(r,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),$(r,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),x(r,"/etc/cron.d"),x(r,"/etc/cron.daily"),x(r,"/etc/cron.hourly"),x(r,"/etc/cron.weekly"),x(r,"/etc/cron.monthly"),x(r,"/etc/init.d"),x(r,"/etc/systemd"),x(r,"/etc/systemd/system"),x(r,"/etc/systemd/system/multi-user.target.wants"),x(r,"/etc/systemd/network"),$(r,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),$(r,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),$(r,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),x(r,"/etc/security"),$(r,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),$(r,"/etc/security/access.conf",`# /etc/security/access.conf
`),x(r,"/etc/pam.d"),$(r,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),$(r,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),$(r,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),$(r,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),$(r,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),$(r,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),$(r,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),x(r,"/etc/sudoers.d"),$(r,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),$(r,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),$(r,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),x(r,"/etc/ld.so.conf.d"),$(r,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),$(r,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),$(r,"/etc/locale.conf",`LANG=en_US.UTF-8
`),$(r,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),$(r,"/etc/default/locale",`LANG=en_US.UTF-8
`),$(r,"/etc/timezone",`UTC
`),$(r,"/etc/localtime",`UTC
`),$(r,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),$(r,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),x(r,"/etc/skel"),$(r,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),$(r,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),$(r,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),x(r,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)$(r,`/etc/alternatives/${s}`,i);x(r,"/etc/java-21-openjdk"),x(r,"/etc/java-21-openjdk/security"),$(r,"/etc/java-21-openjdk/security/java.security",`# java.security
`),$(r,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),$(r,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),$(r,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),$(r,"/etc/magic",`# magic
`),$(r,"/etc/magic.mime",`# magic.mime
`),$(r,"/etc/papersize",`a4
`),$(r,"/etc/ucf.conf",`# ucf.conf
`),$(r,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),$(r,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),$(r,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),x(r,"/etc/profile.d"),$(r,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),$(r,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Jn(r,e){let t=e.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let a of t){if(a==="root")continue;let c=e.getUid(a),l=e.getGid(a),u=c>0?c:s,d=l>0?l:s;n.push(`${a}:x:${u}:${d}::/home/${a}:/bin/bash`),c===0&&s++}r.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=e.generateGroupFile();i.length>0?r.writeFile("/etc/group",`${i}
`):r.writeFile("/etc/group",`root:x:0:
nobody:x:65534:
`);let o=e.generateShadowFile();r.writeFile("/etc/shadow",`${o}
`,{mode:416})}function Nd(r){let e=r.match(/(\d+)$/);return 1e3+(e?.[1]?Number.parseInt(e[1],10):0)}function Md(r,e,t,n,s,i){let o=`/proc/${e}`;x(r,o),x(r,`${o}/fd`),x(r,`${o}/fdinfo`),x(r,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=n.split(/\s+/)[0]??"bash";F(r,`${o}/cmdline`,`${n.replace(/\s+/g,"\0")}\0`),F(r,`${o}/comm`,c),F(r,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),F(r,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),F(r,`${o}/statm`,`4096 1024 768 231 0 512 0
`),F(r,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),F(r,`${o}/cwd`,`/home/${t}\0`),F(r,`${o}/exe`,"/bin/bash\0"),F(r,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),F(r,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),F(r,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),F(r,`${o}/oom_score`,`0
`),F(r,`${o}/oom_score_adj`,`0
`),F(r,`${o}/loginuid`,`0
`),F(r,`${o}/wchan`,`poll_schedule_timeout
`),F(r,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])$(r,`${o}/fd/${l}`,""),$(r,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function Wf(r,e){x(r,"/proc/boot"),$(r,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),$(r,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function or(r,e,t,n,s=[],i,o){x(r,"/proc");let a=Math.floor((Date.now()-n)/1e3),c=Math.floor(a*.9);F(r,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(et.totalmem()/1024),u=Math.floor(et.freemem()/1024),d=o?.ramCapBytes===void 0?null:Math.floor(o.ramCapBytes/1024),p=d===null?l:Math.min(l,d),m=d===null?u:Math.floor(p*(u/l)),f=Math.floor(m*.95),h=Math.floor(p*.03),y=Math.floor(p*.08),S=Math.floor(p*.005),w=Math.floor(p*.02),M=Math.floor(p*.001);F(r,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(m).padStart(10)} kB`,`MemAvailable:   ${String(f).padStart(10)} kB`,`Buffers:        ${String(h).padStart(10)} kB`,`Cached:         ${String(y).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((h+y)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(y*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(y*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(y*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(y*.4)).padStart(10)} kB`,`Shmem:          ${String(S).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(w*.6)).padStart(10)} kB`,`Slab:           ${String(w).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(w*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(w*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(M).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let v=et.cpus(),R=o?.cpuCapCores===void 0?v.length:Math.min(o.cpuCapCores,v.length),P=v.slice(0,R),b=[];for(let Ne=0;Ne<P.length;Ne++){let De=P[Ne];De&&b.push(`processor	: ${Ne}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${De.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${De.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${P.length}`,`core id		: ${Ne}`,`cpu cores	: ${P.length}`,`apicid		: ${Ne}`,`initial apicid	: ${Ne}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(De.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}F(r,"/proc/cpuinfo",`${b.join(`
`)}
`),F(r,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),F(r,"/proc/hostname",`${t}
`);let g=(Math.random()*.3).toFixed(2),_=1+s.length;F(r,"/proc/loadavg",`${g} ${g} ${g} ${_}/${_} 1
`);let I=P.length,D=Math.floor(a*100),T=Math.floor(a*2),j=Math.floor(a*30),H=Math.floor(a*800),te=Math.floor(a*5),C=Math.floor(Number(a)),k=Math.floor(a*2),N=Math.floor(a*0),L=D+T+j+H+te+C+k+N,q=`cpu  ${D} ${T} ${j} ${H} ${te} ${C} ${k} ${N} 0 0
`,Z=Array.from({length:I},(Ne,De)=>`cpu${De} ${Math.floor(D/I)} ${Math.floor(T/I)} ${Math.floor(j/I)} ${Math.floor(H/I)} ${Math.floor(te/I)} ${Math.floor(C/I)} ${Math.floor(k/I)} ${Math.floor(N/I)} 0 0`).join(`
`);F(r,"/proc/stat",`${q}${Z}
intr ${Math.floor(L*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(L*50)}
btime ${Math.floor(n/1e3)}
processes ${_+10}
procs_running 1
procs_blocked 0
`);let se=Math.floor(L*.5),B=Math.floor(L*.3),Y=0,V=0,W=Math.floor(L*2),z=W+Math.floor(L*.5),K=Math.floor(L*.01);F(r,"/proc/vmstat",`nr_free_pages ${Math.floor(m/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(y/4)}
nr_zone_active_file ${Math.floor(h/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${M}
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
nr_active_file ${Math.floor(h/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor(w*.6)}
nr_slab_unreclaimable ${Math.floor(w*.4)}
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
nr_zone_active_file ${Math.floor(h/4)}
pgpgin ${se}
pgpgout ${B}
pswpin ${Y}
pswpout ${V}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(W*.3)}
pgalloc_normal ${Math.floor(W*.7)}
pgalloc_movable 0
pgfree ${W}
pgactivate ${Math.floor(L*.5)}
pgdeactivate 0
pgfault ${z}
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

`),x(r,"/proc/pressure");let G=(Math.random()*.3).toFixed(2),X=(Math.random()*.2+.1).toFixed(2),pe=(Math.random()*.1+.05).toFixed(2),me=Math.floor(L*10);F(r,"/proc/pressure/cpu",`some avg10=${G} avg60=${X} avg300=${pe} total=${me}
`),F(r,"/proc/pressure/memory",`some avg10=${(Number(G)*.5).toFixed(2)} avg60=${(Number(X)*.3).toFixed(2)} avg300=${(Number(pe)*.2).toFixed(2)} total=${Math.floor(me*.3)}
`),F(r,"/proc/pressure/io",`some avg10=${(Number(G)*.7).toFixed(2)} avg60=${(Number(X)*.5).toFixed(2)} avg300=${(Number(pe)*.3).toFixed(2)} total=${Math.floor(me*.5)}
`),F(r,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),F(r,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),F(r,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let ze=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(F(r,"/proc/mounts",ze),x(r,"/proc/self"),F(r,"/proc/self/mounts",ze),x(r,"/proc/net"),i){let Ne=i.getInterfaces(),De=i.getRoutes(),nn=i.getArpCache(),ur=Oe=>Oe.split(".").reverse().map(dr=>Number.parseInt(dr,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Kd=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,Xd=Ne.map(Oe=>{let dr=Oe.name.padStart(4);if(Oe.name==="lo")return`${dr}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let Qd=Math.floor(Math.random()*2e5),ep=Math.floor(Math.random()*2e3),tp=Math.floor(Math.random()*5e7),rp=Math.floor(Math.random()*3e3);return`${dr}: ${String(Qd).padStart(8)} ${String(ep).padStart(7)}    0    0    0     0          0         0 ${String(tp).padStart(9)} ${String(rp).padStart(7)}    0    0    0     0       0          0`});F(r,"/proc/net/dev",`${Kd}
${Xd.join(`
`)}
`);let Zd=De.map(Oe=>[Oe.device,ur(Oe.destination==="default"?"0.0.0.0":Oe.destination),ur(Oe.gateway),Oe.flags==="UG"?"0003":Oe.flags==="U"?"0001":"0000","0","0","100",ur(Oe.netmask),"0","0","0"].join("	"));F(r,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Zd.join(`
`)}
`);let Jd=nn.map(Oe=>`${Oe.ip.padEnd(15)} 0x1         0x2         ${Oe.mac.padEnd(17)}     *        ${Oe.device}`);F(r,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Jd.join(`
`)}
`)}else F(r,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),F(r,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),F(r,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);F(r,"/proc/net/if_inet6","");let ut=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);F(r,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${ut}
`),F(r,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),F(r,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),F(r,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),F(r,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),F(r,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),F(r,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),F(r,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),F(r,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),F(r,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),x(r,"/proc/sys"),x(r,"/proc/sys/kernel"),x(r,"/proc/sys/net"),x(r,"/proc/sys/net/ipv4"),x(r,"/proc/sys/net/ipv6"),x(r,"/proc/sys/net/core"),x(r,"/proc/sys/vm"),x(r,"/proc/sys/fs"),x(r,"/proc/sys/fs/inotify"),F(r,"/proc/sys/kernel/hostname",`${t}
`),F(r,"/proc/sys/kernel/ostype",`Linux
`),F(r,"/proc/sys/kernel/osrelease",`${e.kernel}
`),F(r,"/proc/sys/kernel/pid_max",`32768
`),F(r,"/proc/sys/kernel/threads-max",`31968
`),F(r,"/proc/sys/kernel/randomize_va_space",`2
`),F(r,"/proc/sys/kernel/dmesg_restrict",`0
`),F(r,"/proc/sys/kernel/kptr_restrict",`0
`),F(r,"/proc/sys/kernel/perf_event_paranoid",`2
`),F(r,"/proc/sys/kernel/printk",`4	4	1	7
`),F(r,"/proc/sys/kernel/sysrq",`176
`),F(r,"/proc/sys/kernel/panic",`1
`),F(r,"/proc/sys/kernel/panic_on_oops",`1
`),F(r,"/proc/sys/kernel/core_pattern",`core
`),F(r,"/proc/sys/kernel/core_uses_pid",`0
`),F(r,"/proc/sys/kernel/ngroups_max",`65536
`),F(r,"/proc/sys/kernel/cap_last_cap",`40
`),F(r,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),F(r,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),F(r,"/proc/sys/net/ipv4/ip_forward",`0
`),F(r,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),F(r,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),F(r,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),F(r,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),F(r,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),F(r,"/proc/sys/net/core/somaxconn",`4096
`),F(r,"/proc/sys/net/core/rmem_max",`212992
`),F(r,"/proc/sys/net/core/wmem_max",`212992
`),F(r,"/proc/sys/vm/swappiness",`60
`),F(r,"/proc/sys/vm/overcommit_memory",`0
`),F(r,"/proc/sys/vm/overcommit_ratio",`50
`),F(r,"/proc/sys/vm/dirty_ratio",`20
`),F(r,"/proc/sys/vm/dirty_background_ratio",`10
`),F(r,"/proc/sys/vm/min_free_kbytes",`65536
`),F(r,"/proc/sys/vm/vfs_cache_pressure",`100
`),F(r,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),F(r,"/proc/sys/fs/file-max",`1048576
`),F(r,"/proc/sys/fs/inotify/max_user_watches",`524288
`),F(r,"/proc/sys/fs/inotify/max_user_instances",`512
`),F(r,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let He=o?.ramCapBytes??et.totalmem(),tn=o?.cpuCapCores===void 0?-1:o.cpuCapCores*1e5;x(r,"/sys/fs/cgroup/memory"),F(r,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${He}
`),F(r,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${He-et.freemem()}
`),F(r,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${He}
`),x(r,"/sys/fs/cgroup/cpu"),F(r,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),F(r,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${tn}
`),F(r,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),F(r,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Md(r,1,"root","/sbin/init",new Date(n).toISOString(),{});for(let Ne of s){let De=Nd(Ne.tty);Md(r,De,Ne.username,"bash",Ne.startedAt,{USER:Ne.username,HOME:`/home/${Ne.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:Ne.username})}let ts=s[s.length-1],Yd=ts===void 0?1:Nd(ts.tty);try{r.remove("/proc/self")}catch{}let rn=`/proc/${Yd}`;if(x(r,"/proc/self"),x(r,"/proc/self/fd"),x(r,"/proc/self/fdinfo"),x(r,"/proc/self/net"),r.exists(rn))for(let Ne of r.list(rn)){let De=`${rn}/${Ne}`,nn=`/proc/self/${Ne}`;try{r.stat(De).type==="file"&&F(r,nn,r.readFile(De))}catch{}}else F(r,"/proc/self/cmdline","bash\0"),F(r,"/proc/self/comm","bash"),F(r,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),F(r,"/proc/self/environ",""),F(r,"/proc/self/cwd","/root\0"),F(r,"/proc/self/exe","/bin/bash\0")}function jf(r,e,t,n){x(r,"/sys"),x(r,"/sys/devices"),x(r,"/sys/devices/virtual"),x(r,"/sys/devices/system"),x(r,"/sys/devices/system/cpu"),x(r,"/sys/devices/system/cpu/cpu0"),$(r,"/sys/devices/system/cpu/cpu0/online",`1
`),$(r,"/sys/devices/system/cpu/online",`0
`),$(r,"/sys/devices/system/cpu/possible",`0
`),$(r,"/sys/devices/system/cpu/present",`0
`),x(r,"/sys/devices/system/node"),x(r,"/sys/devices/system/node/node0"),$(r,"/sys/devices/system/node/node0/cpumap",`1
`),x(r,"/sys/class"),x(r,"/sys/class/net"),x(r,"/sys/class/net/eth0"),$(r,"/sys/class/net/eth0/operstate",`up
`),$(r,"/sys/class/net/eth0/carrier",`1
`),$(r,"/sys/class/net/eth0/mtu",`1500
`),$(r,"/sys/class/net/eth0/speed",`10000
`),$(r,"/sys/class/net/eth0/duplex",`full
`),$(r,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),$(r,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=Vf(e),i=s.toString(16).padStart(8,"0");$(r,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),x(r,"/sys/class/net/lo"),$(r,"/sys/class/net/lo/operstate",`unknown
`),$(r,"/sys/class/net/lo/carrier",`1
`),$(r,"/sys/class/net/lo/mtu",`65536
`),$(r,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),x(r,"/sys/class/block"),x(r,"/sys/class/block/vda"),$(r,"/sys/class/block/vda/size",`536870912
`),$(r,"/sys/class/block/vda/ro",`0
`),$(r,"/sys/class/block/vda/removable",`0
`),x(r,"/sys/fs"),x(r,"/sys/fs/cgroup");for(let l of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])x(r,`/sys/fs/cgroup/${l}`),l!=="unified"&&($(r,`/sys/fs/cgroup/${l}/tasks`,`1
`),$(r,`/sys/fs/cgroup/${l}/notify_on_release`,`0
`),$(r,`/sys/fs/cgroup/${l}/release_agent`,""));let o=n?.ramCapBytes??et.totalmem();$(r,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),$(r,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-et.freemem()}
`),$(r,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),$(r,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),$(r,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",n?.cpuCapCores===void 0?`-1
`:`${n.cpuCapCores*1e5}
`),$(r,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),x(r,"/sys/kernel"),$(r,"/sys/kernel/hostname",`${e}
`),$(r,"/sys/kernel/osrelease",`${t.kernel}
`),$(r,"/sys/kernel/ostype",`Linux
`),x(r,"/sys/kernel/security"),x(r,"/sys/devices/virtual"),x(r,"/sys/devices/virtual/dmi"),x(r,"/sys/devices/virtual/dmi/id");let a=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,c={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:a,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${a}`};for(let[l,u]of Object.entries(c))$(r,`/sys/devices/virtual/dmi/id/${l}`,`${u}
`);x(r,"/sys/class"),x(r,"/sys/class/net"),x(r,"/sys/kernel"),$(r,"/sys/kernel/hostname",`${e}
`),$(r,"/sys/kernel/osrelease",`${t.kernel}
`),$(r,"/sys/kernel/ostype",`Linux
`)}function Hf(r){x(r,"/dev"),r.mknod("/dev/null","null",438,1,3),r.mknod("/dev/zero","zero",438,1,5),r.mknod("/dev/full","full",438,1,7),r.mknod("/dev/random","random",292,1,8),r.mknod("/dev/urandom","urandom",292,1,9),r.mknod("/dev/tty","tty",438,5,0),r.mknod("/dev/console","console",384,5,1),r.mknod("/dev/ptmx","ptmx",438,5,2),r.mknod("/dev/stdin","stdin",438,0,0),r.mknod("/dev/stdout","stdout",438,1,0),r.mknod("/dev/stderr","stderr",438,2,0),$(r,"/dev/mem","",416),$(r,"/dev/port","",416),$(r,"/dev/kmsg","",432),$(r,"/dev/hwrng","",432),$(r,"/dev/fuse","",432),$(r,"/dev/autofs","",432),$(r,"/dev/userfaultfd","",432),$(r,"/dev/cpu_dma_latency","",432),$(r,"/dev/ptp0","",432),$(r,"/dev/snapshot","",432),$(r,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)$(r,`/dev/tty${e}`,"",400);$(r,"/dev/vcs","",400),$(r,"/dev/vcs1","",400),$(r,"/dev/vcsa","",400),$(r,"/dev/vcsa1","",400),$(r,"/dev/vcsu","",400),$(r,"/dev/vcsu1","",400);for(let e=0;e<8;e++)$(r,`/dev/loop${e}`,"",432);x(r,"/dev/loop-control"),$(r,"/dev/vda","",432),$(r,"/dev/vdb","",432),$(r,"/dev/vdc","",432),$(r,"/dev/vdd","",432),x(r,"/dev/net"),$(r,"/dev/net/tun","",432),x(r,"/dev/pts"),x(r,"/dev/shm"),x(r,"/dev/cpu"),x(r,"/dev/fd"),$(r,"/dev/vga_arbiter","",432),$(r,"/dev/vsock","",432)}function qf(r){x(r,"/usr"),x(r,"/usr/bin"),x(r,"/usr/sbin"),x(r,"/usr/local"),x(r,"/usr/local/bin"),x(r,"/usr/local/lib"),x(r,"/usr/local/share"),x(r,"/usr/local/include"),x(r,"/usr/local/sbin"),x(r,"/usr/share"),x(r,"/usr/share/doc"),x(r,"/usr/share/man"),x(r,"/usr/share/man/man1"),x(r,"/usr/share/man/man5"),x(r,"/usr/share/man/man8"),x(r,"/usr/share/common-licenses"),x(r,"/usr/share/ca-certificates"),x(r,"/usr/share/zoneinfo"),x(r,"/usr/lib"),x(r,"/usr/lib/x86_64-linux-gnu"),x(r,"/usr/lib/python3"),x(r,"/usr/lib/python3/dist-packages"),x(r,"/usr/lib/python3.12"),x(r,"/usr/lib/jvm"),x(r,"/usr/lib/jvm/java-21-openjdk-amd64"),x(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),x(r,"/usr/lib/node_modules"),x(r,"/usr/lib/node_modules/npm"),x(r,"/usr/include"),x(r,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of e)$(r,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let t=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of t)$(r,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);$(r,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),$(r,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),$(r,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),$(r,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),$(r,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),$(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),$(r,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),$(r,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),$(r,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),$(r,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),$(r,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),$(r,"/usr/share/common-licenses/MIT",`MIT License
`)}var Yf=`Package: bash
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

`;function Kf(r){x(r,"/var"),x(r,"/var/log"),x(r,"/var/log/apt"),x(r,"/var/log/journal"),x(r,"/var/log/private"),x(r,"/var/tmp"),x(r,"/var/cache"),x(r,"/var/cache/apt"),x(r,"/var/cache/apt/archives"),x(r,"/var/cache/apt/archives/partial"),x(r,"/var/cache/debconf"),x(r,"/var/cache/ldconfig"),x(r,"/var/cache/fontconfig"),x(r,"/var/cache/PackageKit"),x(r,"/var/lib"),x(r,"/var/lib/apt"),x(r,"/var/lib/apt/lists"),x(r,"/var/lib/apt/lists/partial"),x(r,"/var/lib/dpkg"),x(r,"/var/lib/dpkg/info"),x(r,"/var/lib/dpkg/updates"),x(r,"/var/lib/dpkg/alternatives"),x(r,"/var/lib/misc"),x(r,"/var/lib/systemd"),x(r,"/var/lib/systemd/coredump"),x(r,"/var/lib/pam"),x(r,"/var/lib/git"),x(r,"/var/lib/PackageKit"),x(r,"/var/lib/python"),x(r,"/var/spool"),x(r,"/var/spool/cron"),x(r,"/var/spool/mail"),x(r,"/var/mail"),x(r,"/var/backups"),x(r,"/var/www"),$(r,"/var/lib/dpkg/status",Yf),$(r,"/var/lib/dpkg/available",""),$(r,"/var/lib/dpkg/lock",""),$(r,"/var/lib/dpkg/lock-frontend",""),$(r,"/var/lib/apt/lists/lock",""),$(r,"/var/cache/apt/pkgcache.bin",""),$(r,"/var/cache/apt/srcpkgcache.bin",""),$(r,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),$(r,"/var/log/auth.log",""),$(r,"/var/log/kern.log",""),$(r,"/var/log/dpkg.log",""),$(r,"/var/log/apt/history.log",""),$(r,"/var/log/apt/term.log",""),$(r,"/var/log/faillog",""),$(r,"/var/log/lastlog",""),$(r,"/var/log/wtmp",""),$(r,"/var/log/btmp",""),$(r,"/var/log/alternatives.log",""),x(r,"/run"),x(r,"/run/lock"),x(r,"/run/lock/subsys"),x(r,"/run/systemd"),x(r,"/run/systemd/ask-password"),x(r,"/run/systemd/sessions"),x(r,"/run/systemd/users"),x(r,"/run/user"),x(r,"/run/dbus"),x(r,"/run/adduser"),$(r,"/run/utmp",""),$(r,"/run/dbus/system_bus_socket","")}function Xf(r){r.exists("/bin")||r.symlink("/usr/bin","/bin"),r.exists("/sbin")||r.symlink("/usr/sbin","/sbin"),r.exists("/var/run")||r.symlink("/run","/var/run"),x(r,"/lib"),x(r,"/lib64"),x(r,"/lib/x86_64-linux-gnu"),x(r,"/lib/modules"),r.exists("/lib64/ld-linux-x86-64.so.2")||$(r,"/lib64/ld-linux-x86-64.so.2","",493)}function Zf(r){x(r,"/tmp",1023),x(r,"/tmp/node-compile-cache",1023)}function Jf(r){x(r,"/root",448),x(r,"/root/.ssh",448),x(r,"/root/.config",493),x(r,"/root/.config/pip",493),x(r,"/root/.local",493),x(r,"/root/.local/share",493),$(r,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\W\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),$(r,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),$(r,"/root/.bash_logout",`# ~/.bash_logout
`),$(r,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function Qf(r,e){x(r,"/opt"),x(r,"/opt/rclone"),x(r,"/srv"),x(r,"/mnt"),x(r,"/media"),x(r,"/boot"),x(r,"/boot/grub"),$(r,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let t=e.kernel,n=`# Fortune GNU/Linux kernel ${t}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");$(r,`/boot/vmlinuz-${t}`,n,420),$(r,`/boot/initrd.img-${t}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${t}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),$(r,`/boot/System.map-${t}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),$(r,`/boot/config-${t}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";r.exists("/vmlinuz")||r.symlink(`/boot/vmlinuz-${t}`,"/vmlinuz"),r.exists("/vmlinuz.old")||r.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),r.exists("/initrd.img")||r.symlink(`/boot/initrd.img-${t}`,"/initrd.img"),r.exists("/initrd.img.old")||r.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),x(r,"/lost+found",448),x(r,"/home")}var kd=new Map;function eh(r,e){return`${r}|${e.kernel}|${e.os}|${e.arch}`}function th(r,e){let t=eh(r,e),n=kd.get(t);if(n)return n;let s=new jr({mode:"memory"});Gf(s,r,e),jf(s,r,e),Hf(s),qf(s),Kf(s),Xf(s),Zf(s),Qf(s,e),Wf(s,e);let i=s.encodeBinary();return kd.set(t,i),i}function Ad(r,e,t,n,s,i=[],o,a){let c=th(t,n);r.getMode()==="fs"&&r.exists("/home")?r.mergeRootTree(ft(c)):r.importRootTree(ft(c)),Jf(r),or(r,n,t,s,i,o,a),Jn(r,e)}Dn();$n();on();import{createHash as Od,randomBytes as rh,randomUUID as nh,scryptSync as sh,timingSafeEqual as ih}from"node:crypto";import{EventEmitter as oh}from"node:events";import*as Dd from"node:path";var Hr=class r{constructor(e){this._vfs=e}_vfs;_groupsPath="/etc/group";_groups=new Map;_nextGid=2e3;initialize(){this._loadFromVfs(),this._ensureSystemGroups()}createGroup(e,t){if(r._validateGroupName(e),this._groups.has(e))throw new Error(`groupadd: group '${e}' already exists`);let n=t??this._nextGid++;t!==void 0&&t>=this._nextGid&&(this._nextGid=t+1);let s={name:e,gid:n,members:[]};return this._groups.set(e,s),this._persist(),s}deleteGroup(e){if(!this._groups.has(e))throw new Error(`groupdel: group '${e}' does not exist`);this._groups.delete(e),this._persist()}addMember(e,t){let n=this._groups.get(e);if(!n)throw new Error(`gpasswd: group '${e}' does not exist`);n.members.includes(t)||(n.members.push(t),this._persist())}removeMember(e,t){let n=this._groups.get(e);if(!n)throw new Error(`gpasswd: group '${e}' does not exist`);n.members=n.members.filter(s=>s!==t),this._persist()}getGroup(e){return this._groups.get(e)}getGroupByGid(e){for(let t of this._groups.values())if(t.gid===e)return t}getGidByName(e){return this._groups.get(e)?.gid??null}getNameByGid(e){for(let t of this._groups.values())if(t.gid===e)return t.name;return null}getMembers(e){return this._groups.get(e)?.members??[]}getUserSupplementaryGroups(e){let t=[];for(let n of this._groups.values())n.members.includes(e)&&t.push(n.name);return t}getUserAllGroups(e,t){let n=new Set,s=this.getGroupByGid(t);s&&n.add(s.name);for(let i of this._groups.values())i.members.includes(e)&&n.add(i.name);return Array.from(n).sort()}isMemberOf(e,t,n){let s=this._groups.get(t);return s?s.gid===n?!0:s.members.includes(e):!1}listGroups(){return Array.from(this._groups.values()).sort((e,t)=>e.name.localeCompare(t.name))}generateGroupFile(){return this.listGroups().map(e=>`${e.name}:x:${e.gid}:${e.members.join(",")}`).join(`
`)}_persist(){let e=this.generateGroupFile();this._vfs.writeFile(this._groupsPath,e.length>0?`${e}
`:"",{mode:420})}_loadFromVfs(){if(this._groups.clear(),!this._vfs.exists(this._groupsPath))return;let e=this._vfs.readFile(this._groupsPath);for(let t of e.split(`
`)){let n=t.trim();if(n.length===0||n.startsWith("#"))continue;let s=n.split(":");if(s.length<4)continue;let[i,o,a,c]=s;if(!(i&&a))continue;let l=Number.parseInt(a,10);if(!Number.isFinite(l)||l<0)continue;let u=c?c.split(",").filter(d=>d.length>0):[];this._groups.set(i,{name:i,gid:l,members:u}),l>=this._nextGid&&(this._nextGid=l+1)}}_ensureSystemGroups(){let e=[{name:"root",gid:0},{name:"daemon",gid:1},{name:"bin",gid:2},{name:"sys",gid:3},{name:"adm",gid:4},{name:"tty",gid:5},{name:"disk",gid:6},{name:"lp",gid:7},{name:"mail",gid:8},{name:"news",gid:9},{name:"uucp",gid:10},{name:"man",gid:12},{name:"proxy",gid:13},{name:"kmem",gid:15},{name:"dialout",gid:20},{name:"fax",gid:21},{name:"voice",gid:22},{name:"cdrom",gid:24},{name:"floppy",gid:25},{name:"tape",gid:26},{name:"sudo",gid:27},{name:"audio",gid:29},{name:"dip",gid:30},{name:"www-data",gid:33},{name:"backup",gid:34},{name:"operator",gid:37},{name:"list",gid:38},{name:"irc",gid:39},{name:"src",gid:40},{name:"shadow",gid:42},{name:"utmp",gid:43},{name:"video",gid:44},{name:"sasl",gid:45},{name:"plugdev",gid:46},{name:"staff",gid:50},{name:"games",gid:60},{name:"users",gid:100},{name:"nogroup",gid:65534}];for(let{name:t,gid:n}of e)this._groups.has(t)||(this._groups.set(t,{name:t,gid:n,members:[]}),n>=this._nextGid&&(this._nextGid=n+1))}static _validateGroupName(e){if(!e||e.trim()==="")throw new Error("invalid group name");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error(`invalid group name '${e}'`)}};var Td={"-20":88761,"-19":71755,"-18":56483,"-17":46273,"-16":36291,"-15":29154,"-14":23254,"-13":18705,"-12":14949,"-11":11916,"-10":9548,"-9":7620,"-8":6100,"-7":4904,"-6":3906,"-5":3121,"-4":2501,"-3":1991,"-2":1586,"-1":1277,0:1024,1:820,2:655,3:526,4:423,5:335,6:272,7:215,8:172,9:137,10:110,11:87,12:70,13:56,14:45,15:36,16:29,17:23,18:18,19:15},Qn={idle:19,very_low:15,low:10,normal:0,high:-10,very_high:-15,realtime:-20},ct=class r{_baseTimesliceMs;_maxTimesliceMs;_minTimesliceMs;_enforceFairShare;_accountingWindowMs;_scheduleCount=0;_totalCpuTimeMs=0;_throttleCount=0;_preemptCount=0;_windowStart=Date.now();_processCpuTime=new Map;constructor(e={}){this._baseTimesliceMs=e.baseTimesliceMs??100,this._maxTimesliceMs=e.maxTimesliceMs??500,this._minTimesliceMs=e.minTimesliceMs??10,this._enforceFairShare=e.enforceFairShare??!0,this._accountingWindowMs=e.accountingWindowMs??1e3}calculateTimeslice(e){let s=(Td[e]??1024)/1024,i=this._baseTimesliceMs*s;return Math.max(this._minTimesliceMs,Math.min(this._maxTimesliceMs,i))}static getNiceWeight(e){return Td[e]??1024}static priorityToNice(e){return Qn[e]}static niceToPriority(e){for(let[s,i]of Object.entries(Qn))if(i===e)return s;let t="normal",n=Math.abs(e);for(let[s,i]of Object.entries(Qn)){let o=Math.abs(e-i);o<n&&(n=o,t=s)}return t}static isValidNice(e){return e>=-20&&e<=19&&Number.isInteger(e)}recordCpuTime(e,t){let n=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,n+t),this._totalCpuTimeMs+=t}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}shouldThrottle(e,t,n){if(!this._enforceFairShare||n<=1)return!1;let s=Date.now(),i=s-this._windowStart;if(i>=this._accountingWindowMs)return this._windowStart=s,this._processCpuTime.clear(),!1;let o=this._processCpuTime.get(e)??0,a=r.getNiceWeight(t),l=n*1024,u=a/l*i;return o>u*2}schedule(e,t){let n=e.nice??0,s=this.calculateTimeslice(n);return this.shouldThrottle(e.pid,n,t)?(this._throttleCount++,{action:"throttle",reason:"exceeded fair share"}):(this._scheduleCount++,{action:"run",timesliceMs:s,reason:`timeslice ${s}ms (nice ${n})`})}recordPreemption(){this._preemptCount++}getStats(){return{scheduleCount:this._scheduleCount,totalCpuTimeMs:this._totalCpuTimeMs,runQueueLength:this._processCpuTime.size,throttleCount:this._throttleCount,preemptCount:this._preemptCount,avgTimesliceMs:this._scheduleCount>0?this._totalCpuTimeMs/this._scheduleCount:0,windowStart:this._windowStart,processCpuTime:new Map(this._processCpuTime)}}resetStats(){this._scheduleCount=0,this._totalCpuTimeMs=0,this._throttleCount=0,this._preemptCount=0}resetWindow(){this._windowStart=Date.now(),this._processCpuTime.clear()}removeProcess(e){this._processCpuTime.delete(e)}};function ah(){let r=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!r&&!["0","false","no","off"].includes(r.toLowerCase())}var Ee=Ur("VirtualUserManager"),qr=class r extends oh{constructor(t,n=!1){super();this._vfs=t;this._autoSudoForNewUsers=n;Ee.mark("constructor"),this._groups=new Hr(t),this._scheduler=new ct}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _maxRecordCacheSize=100;static _fastPasswordHash=ah();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_cpuWatcher=null;_groups;_sudoTimestamps=new Map;_loginFailures=new Map;_maxLoginFailures=5;_sudoTimestampWindowMs=300*1e3;_loginFailureTtlMs=3600*1e3;_scheduler;_schedulerEnabled=!1;initialize(){Ee.mark("initialize"),this._groups.initialize(),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let t=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),t=!0),this._sudoers.add("root");let n="/root";this._vfs.exists(n)||(this._vfs.mkdir(n,493),this._vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),t&&this.persist(),this.emit("initialized")}setQuotaBytes(t,n){if(Ee.mark("setQuotaBytes"),r._validateUsername(t),!this._users.has(t))throw new Error(`quota: user '${t}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(t,Math.floor(n)),this.persist()}clearQuota(t){Ee.mark("clearQuota"),r._validateUsername(t),this._quotas.delete(t),this.persist()}getQuotaBytes(t){return Ee.mark("getQuotaBytes"),this._quotas.get(t)??null}getUsageBytes(t){Ee.mark("getUsageBytes");let n=t==="root"?"/root":`/home/${t}`;return this._vfs.exists(n)?this._vfs.getUsageBytes(n):0}assertWriteWithinQuota(t,n,s){Ee.mark("assertWriteWithinQuota");let i=this._quotas.get(t);if(i===void 0)return;let o=Rd(n),a=Rd(t==="root"?"/root":`/home/${t}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(t),u=0;if(this._vfs.exists(o)){let m=this._vfs.stat(o);m.type==="file"&&(u=m.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${t}': ${p}/${i} bytes`)}verifyPassword(t,n){Ee.mark("verifyPassword");let s=this._users.get(t);if(!s)return r.hashPassword(n,""),!1;let i=r.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:ih(a,c)}catch{return i===o}}addUser(t,n){if(Ee.mark("addUser"),r._validateUsername(t),r._validatePassword(n),this._users.has(t))return;let s=this._createRecord(t,n);this._users.set(t,s),this._autoSudoForNewUsers&&this._sudoers.add(t);let i=t;if(!this._groups.getGroup(i))try{this._groups.createGroup(i,s.gid),this._groups.addMember(i,t)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",t)}catch{}let o=s.uid,a=s.gid,c=t==="root"?"/root":`/home/${t}`;this._vfs.exists(c)||(t!=="root"&&!this._vfs.exists("/home")&&this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(c,448,0,0),this._vfs.chown(c,o,a,0),this._vfs.writeFile(`${c}/README.txt`,`Welcome to the virtual environment, ${t}`,{},o,a)),this.persist(),this.emit("user:add",{username:t})}ensureUser(t){if(this._users.has(t))return;if(t==="root"){this._users.set("root",this._createRecord("root",""));return}let n=this._createRecord(t,"");this._users.set(t,n),this._autoSudoForNewUsers&&this._sudoers.add(t);let s=t;if(!this._groups.getGroup(s))try{this._groups.createGroup(s,n.gid),this._groups.addMember(s,t)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",t)}catch{}let i=n.uid,o=n.gid,a=`/home/${t}`;if(this._vfs.exists(a))try{this._vfs.chown(a,i,o,0)}catch{}else this._vfs.exists("/home")||this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(a,448,0,0),this._vfs.chown(a,i,o,0);this._vfs.exists(`${a}/README.txt`)||this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${t}`,{},i,o),this.persist(),this.emit("user:add",{username:t})}getPasswordHash(t){Ee.mark("getPasswordHash");let n=this._users.get(t);return n?n.passwordHash:null}setPassword(t,n){if(Ee.mark("setPassword"),r._validateUsername(t),r._validatePassword(n),!this._users.has(t))throw new Error(`passwd: user '${t}' does not exist`);this._users.set(t,this._createRecord(t,n)),this.persist()}deleteUser(t){if(Ee.mark("deleteUser"),r._validateUsername(t),t==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(t))throw new Error(`deluser: user '${t}' does not exist`);this._sudoers.delete(t);try{this._groups.removeMember("sudo",t)}catch{}let n=this._groups.getGroup(t);if(n&&n.members.length<=1)try{this._groups.deleteGroup(t)}catch{}else if(n)try{this._groups.removeMember(t,t)}catch{}this.emit("user:delete",{username:t}),this.persist()}isSudoer(t){return Ee.mark("isSudoer"),this._sudoers.has(t)}addSudoer(t){if(Ee.mark("addSudoer"),r._validateUsername(t),!this._users.has(t))throw new Error(`sudoers: user '${t}' does not exist`);this._sudoers.add(t);try{this._groups.addMember("sudo",t)}catch{}this.persist()}removeSudoer(t){if(Ee.mark("removeSudoer"),r._validateUsername(t),t==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(t);try{this._groups.removeMember("sudo",t)}catch{}this.persist()}registerSession(t,n){Ee.mark("registerSession");let s={id:nh(),username:t,tty:`pts/${this._nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:t,remoteAddress:n}),s}unregisterSession(t){if(Ee.mark("unregisterSession"),!t)return;let n=this._activeSessions.get(t);this._activeSessions.delete(t),n&&this.emit("session:unregister",{sessionId:t,username:n.username,tty:n.tty})}updateSession(t,n,s){if(Ee.mark("updateSession"),!t)return;let i=this._activeSessions.get(t);i&&this._activeSessions.set(t,{...i,username:n,remoteAddress:s})}listActiveSessions(){return Ee.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((t,n)=>t.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(t){return this._users.get(t)?.uid??0}getGid(t){return this._users.get(t)?.gid??0}getUsername(t){for(let[n,s]of this._users)if(s.uid===t)return n;return null}getGroupName(t){for(let[n,s]of this._users)if(s.gid===t)return n;return null}registerProcess(t,n,s,i,o,a=1,c=0){let l=this._nextPid++,u=ct.niceToPriority(c);return this._activeProcesses.set(l,{pid:l,ppid:a,username:t,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0,nice:c,priority:u}),l}unregisterProcess(t){this._processCpuTime.delete(t),this._scheduler.removeProcess(t);let n=this._activeProcesses.get(t);n&&(n.status="done",n.signalHandlers.clear(),n.abortController=void 0,this.emit("SIGCHLD",n.ppid,t)),this._activeProcesses.delete(t)}markProcessDone(t){let n=this._activeProcesses.get(t);n&&(n.status="done",n.signalHandlers.clear(),n.abortController=void 0,this.emit("SIGCHLD",n.ppid,t),setTimeout(()=>this.unregisterProcess(t),5e3).unref?.())}listProcesses(){return Array.from(this._activeProcesses.values()).sort((t,n)=>t.pid-n.pid)}killProcess(t,n=15){let s=this._activeProcesses.get(t);if(!s)return!1;if(n===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,t),!0;if(n===19)return s.status="stopped",!0;if(n===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(n);return i?(i(n,t),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=n,s.exitCode=128+n,this.emit("SIGCHLD",s.ppid,t),!0)}killAllUserProcesses(t,n=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===t&&this.killProcess(i,n)&&s++;return s}killProcessesByTty(t,n=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===t&&this.killProcess(i,n)&&s++;return s}getProcess(t){return this._activeProcesses.get(t)}setCpuCapCores(t){this._cpuCapCores=t,this._cpuBudgetMs=t>0?t*this._cpuWindowMs:0,t>0&&!this._cpuWatcher?this._startCpuWatcher():t===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(t){return this._processCpuTime.get(t)??0}addProcessCpuTime(t,n){let s=this._processCpuTime.get(t)??0;this._processCpuTime.set(t,s+n)}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let t=Date.now(),n=t-this._cpuWindowStart;if(n>=this._cpuWindowMs){this._cpuWindowStart=t,this._processCpuTime.clear();return}for(let[s,i]of this._activeProcesses){if(i.status!=="running")continue;let o=this._processCpuTime.get(s)??0,a=new Date(i.startedAt).getTime(),c=Math.min(t-a,n),l=Math.max(o,c);l>this._cpuBudgetMs&&(this.killProcess(s,9),this.emit("process:killed:cpu",{pid:s,command:i.command,cpuTime:l}))}}enableScheduler(t={}){this._scheduler=new ct(t),this._schedulerEnabled=!0}disableScheduler(){this._schedulerEnabled=!1}isSchedulerEnabled(){return this._schedulerEnabled}getSchedulerStats(){return this._schedulerEnabled?this._scheduler.getStats():null}resetSchedulerStats(){this._scheduler.resetStats()}setProcessNice(t,n){if(!ct.isValidNice(n))return!1;let s=this._activeProcesses.get(t);return s?(s.nice=n,s.priority=ct.niceToPriority(n),this.emit("process:nice",{pid:t,nice:n,priority:s.priority}),!0):!1}getProcessNice(t){return this._activeProcesses.get(t)?.nice??0}getProcessPriority(t){return this._activeProcesses.get(t)?.priority??"normal"}getProcessTimeslice(t){let n=this._activeProcesses.get(t)?.nice??0;return this._scheduler.calculateTimeslice(n)}recordAndCheckThrottle(t,n){if(!this._schedulerEnabled)return!1;this._scheduler.recordCpuTime(t,n);let s=this._activeProcesses.get(t);if(!s||s.status!=="running")return!1;let i=this.listProcesses().filter(o=>o.status==="running").length;return this._scheduler.shouldThrottle(t,s.nice,i)}getSchedulerCpuTime(t){return this._scheduler.getProcessCpuTime(t)}removeProcessFromScheduler(t){this._scheduler.removeProcess(t)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let t=this._vfs.readFile(this._usersPath);for(let n of t.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=11){let[o,a,c,l,u,d,p,m,f,h,y]=i;if(!(o&&l&&u))continue;let S=Number.parseInt(a??"1001",10),w=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:S,gid:w,salt:l,passwordHash:u,lastPasswordChange:Number.parseInt(d??"0",10),minPasswordAge:Number.parseInt(p??"0",10),maxPasswordAge:Number.parseInt(m??"99999",10),passwordWarnDays:Number.parseInt(f??"7",10),passwordInactiveDays:Number.parseInt(h??"0",10),accountExpiryDate:Number.parseInt(y??"0",10)})}else if(i.length>=5){let[o,a,c,l,u]=i;if(!(o&&l&&u))continue;let d=Number.parseInt(a??"1001",10),p=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}else{let[o,a,c]=i;if(!(o&&a&&c))continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let t=this._vfs.readFile(this._sudoersPath);for(let n of t.split(`
`)){let s=n.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let t=this._vfs.readFile(this._quotasPath);for(let n of t.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!(i&&Number.isFinite(a))||a<0||this._quotas.set(i,a)}}persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let t=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash,o.lastPasswordChange,o.minPasswordAge,o.maxPasswordAge,o.passwordWarnDays,o.passwordInactiveDays,o.accountExpiryDate].join(":")).join(`
`),n=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,t.length>0?`${t}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&this._vfs.flushMirror()}_writeIfChanged(t,n,s){return this._vfs.exists(t)&&this._vfs.readFile(t)===n?(this._vfs.chmod(t,s),!1):(this._vfs.writeFile(t,n,{mode:s}),!0)}_createRecord(t,n,s,i){let o=s??(t==="root"?0:this._nextUid++),a=i??(t==="root"?0:this._nextGid++),c=Od("sha256").update(t).update(":").update(n).digest("hex"),l=r._recordCache.get(c);if(l)return{...l,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};let u=rh(16).toString("hex"),d={username:t,uid:o,gid:a,salt:u,passwordHash:r.hashPassword(n,u),lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};if(r._recordCache.set(c,d),r._recordCache.size>r._maxRecordCacheSize){let p=r._recordCache.keys().next().value;p&&r._recordCache.delete(p)}return d}hasPassword(t){Ee.mark("hasPassword");let n=this._users.get(t);if(!n)return!1;let s=r.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}static hashPassword(t,n=""){return r._fastPasswordHash?Od("sha256").update(n).update(t).digest("hex"):sh(t,n||"",32).toString("hex")}static _validateUsername(t){if(!t||t.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(t))throw new Error("invalid username")}static _validatePassword(t){if(!t||t.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(t,n,s){Ee.mark("addAuthorizedKey");let i=this._authorizedKeys.get(t)??[];i.push({algo:n,data:s}),this._authorizedKeys.set(t,i),this.emit("key:add",{username:t,algo:n})}removeAuthorizedKeys(t){this._authorizedKeys.delete(t),this.emit("key:remove",{username:t})}getAuthorizedKeys(t){return this._authorizedKeys.get(t)??[]}createGroup(t,n){return this._groups.createGroup(t,n)}deleteGroup(t){this._groups.deleteGroup(t)}addGroupMember(t,n){this._groups.addMember(t,n)}removeGroupMember(t,n){this._groups.removeMember(t,n)}getGroup(t){return this._groups.getGroup(t)}getGroupByGid(t){return this._groups.getGroupByGid(t)}getGidByName(t){return this._groups.getGidByName(t)}getNameByGid(t){return this._groups.getNameByGid(t)}getUserSupplementaryGroups(t){return this._groups.getUserSupplementaryGroups(t)}getUserAllGroups(t){let n=this.getGid(t);return this._groups.getUserAllGroups(t,n)}isMemberOf(t,n){let s=this.getGid(t);return this._groups.isMemberOf(t,n,s)}listGroups(){return this._groups.listGroups()}generateGroupFile(){return this._groups.generateGroupFile()}setPasswordAging(t,n,s,i,o){let a=this._users.get(t);if(!a)throw new Error(`chage: user '${t}' does not exist`);n!==void 0&&(a.minPasswordAge=n),s!==void 0&&(a.maxPasswordAge=s),i!==void 0&&(a.passwordWarnDays=i),o!==void 0&&(a.passwordInactiveDays=o),this.persist()}getPasswordAging(t){let n=this._users.get(t);return n?{lastChange:n.lastPasswordChange,minAge:n.minPasswordAge,maxAge:n.maxPasswordAge,warnDays:n.passwordWarnDays,inactiveDays:n.passwordInactiveDays,expiryDate:n.accountExpiryDate}:null}setAccountExpiry(t,n){let s=this._users.get(t);if(!s)throw new Error(`chage: user '${t}' does not exist`);s.accountExpiryDate=n,this.persist()}forcePasswordChange(t){let n=this._users.get(t);if(!n)throw new Error(`chage: user '${t}' does not exist`);n.lastPasswordChange=0,this.persist()}isPasswordExpired(t){let n=this._users.get(t);return!n||n.maxPasswordAge===99999?!1:Math.floor(Date.now()/864e5)-n.lastPasswordChange>n.maxPasswordAge}lockAccount(t){let n=this._users.get(t);if(!n)throw new Error(`usermod: user '${t}' does not exist`);n.passwordHash.startsWith("!")||(n.passwordHash=`!${n.passwordHash}`,this.persist())}unlockAccount(t){let n=this._users.get(t);if(!n)throw new Error(`usermod: user '${t}' does not exist`);n.passwordHash.startsWith("!")&&(n.passwordHash=n.passwordHash.slice(1),this.persist())}isAccountLocked(t){return this._users.get(t)?.passwordHash.startsWith("!")??!1}generateShadowFile(){let n=[{name:"root",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"daemon",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"nobody",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"messagebus",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"_apt",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-network",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-resolve",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"polkitd",hash:"!",lastChange:19e3,min:0,max:99999,warn:7}].map(s=>`${s.name}:${s.hash}:${s.lastChange}:${s.min}:${s.max}:${s.warn}:::`);for(let s of this._users.values()){if(s.username==="root")continue;let i=s.passwordHash.startsWith("!")?"!":s.passwordHash;n.push(`${s.username}:${i}:${s.lastPasswordChange}:${s.minPasswordAge}:${s.maxPasswordAge}:${s.passwordWarnDays}:${s.passwordInactiveDays}:${s.accountExpiryDate}:`)}return n.join(`
`)}grantSudoTimestamp(t){this._sudoTimestamps.set(t,Date.now())}hasValidSudoTimestamp(t){if(t==="root")return!0;let n=this._sudoTimestamps.get(t);return n?Date.now()-n>=this._sudoTimestampWindowMs?(this._sudoTimestamps.delete(t),!1):!0:!1}clearSudoTimestamp(t){this._sudoTimestamps.delete(t)}recordLoginFailure(t,n){let s=Date.now();for(let[o,a]of this._loginFailures)s-a.lastTime>this._loginFailureTtlMs&&this._loginFailures.delete(o);let i=this._loginFailures.get(t);i?(i.count++,i.lastTime=s,i.sourceIp=n):this._loginFailures.set(t,{count:1,lastTime:s,sourceIp:n})}recordLoginSuccess(t){this._loginFailures.delete(t)}getLoginFailures(t){return this._loginFailures.get(t)?.count??0}resetLoginFailures(t){this._loginFailures.delete(t)}isAccountLockedByFailures(t){let n=this._loginFailures.get(t);return n?n.count>=this._maxLoginFailures:!1}getLastFailureTime(t){return this._loginFailures.get(t)?.lastTime??0}};function Rd(r){let e=Dd.posix.normalize(r);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as ch}from"node:events";var Yr=class r extends ch{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,t={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=t.idleThresholdMs??6e4,this._checkIntervalMs=t.checkIntervalMs??15e3,this._gcIntervalMs=t.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}_freeze(){this._state!=="frozen"&&(this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=ft(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=r._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let t=e.listProcesses(),n=0;for(let s of t)s.status==="done"&&(e.unregisterProcess(s.pid),n++);return n}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let t=e.listProcesses(),n=new Set(t.map(o=>o.pid)),s=0,i=r._getAllTrackedPids(e);for(let o of i)!n.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}static _getAllTrackedPids(e){return e.listProcesses().map(n=>n.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}static _forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};wr();import Gd from"node:path";ee();Re();import*as Fd from"node:path";function Kr(r,e){let t=`${oe(e)}/.bash_history`;return r.exists(t)?r.readFile(t).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(r.writeFile(t,""),[])}function Xr(r,e,t){let n=t.length>0?`${t.join(`
`)}
`:"";r.writeFile(`${oe(e)}/.bash_history`,n)}function Zr(r,e){let t=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!r.exists(t))return null;try{let n=JSON.parse(r.readFile(t));if(typeof n!="object"||n===null)return null;let s=n;return typeof s.from!="string"||typeof s.timestamp!="number"?null:{from:s.from,at:new Date(s.timestamp).toISOString()}}catch{return null}}function Jr(r,e,t){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;r.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:t}))}function Qr(r,e,t){let n=t.lastIndexOf("/"),s=n>=0?t.slice(0,n+1):"",i=n>=0?t.slice(n+1):t,o=O(e,s||".");try{return r.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=Fd.posix.join(o,a),l=r.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as uh}from"node:child_process";import{readFile as lh}from"node:fs/promises";function Ld(r){return`'${r.replace(/'/g,"'\\''")}'`}function xt(r){return r.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Ud(r,e){let t=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,n=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${t} rows ${n} 2>/dev/null; ${r}`}async function Bd(r){try{let t=(await lh(`/proc/${r}/task/${r}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(t.map(s=>Bd(s)));return[...t,...n.flat()]}catch{return[]}}async function zd(r=process.pid){let e=await Bd(r),t=Array.from(new Set(e)).sort((n,s)=>n-s);return t.length===0?null:t.join(",")}function dh(r,e,t){let n=Ud(r,e),s=uh("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{t.write(i.toString("utf8"))}),s.stderr.on("data",i=>{t.write(i.toString("utf8"))}),s}function Vd(r,e,t){return dh(`htop -p ${Ld(r)}`,e,t)}function Wd(r,e,t,n,s,i,o,a){let c="",l=0,u=Kr(a.vfs,t),d=null,p="",m=oe(t),f=null,h=Be(t,n);if(s){let B=a.users.listActiveSessions().find(Y=>Y.id===s);B&&(h.vars.__TTY=B.tty)}let y=[],S=null,w=null,M=()=>{if(h.vars.PS1)return Ut(t,n,"",h.vars.PS1,m);let B=oe(t),Y=m===B?"~":Gd.posix.basename(m)||"/";return Ut(t,n,Y)},v=Array.from(new Set(qt())).sort();console.log(`[${s}] Shell started for user '${t}' at ${i}`);let R=!1,P=async(B,Y=!1)=>{if(a.vfs.exists(B))try{let V=a.vfs.readFile(B);for(let W of V.split(`
`)){let z=W.trim();if(!(!z||z.startsWith("#")))if(Y){let K=z.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);K&&(h.vars[K[1]]=K[2])}else{let K=await le(z,t,n,"shell",m,a,void 0,h);K.stdout&&e.write(K.stdout.replace(/\n/g,`\r
`))}}}catch{}},b=(async()=>{await P("/etc/environment",!0),await P(`${oe(t)}/.profile`),await P(`${oe(t)}/.bashrc`),R=!0})();function g(){let B=M();e.write(`\r\x1B[0m${B}${c}\x1B[K`);let Y=c.length-l;Y>0&&e.write(`\x1B[${Y}D`)}function _(){e.write("\r\x1B[K")}function I(B){w={...B,buffer:""},_(),e.write(B.prompt)}async function D(B){if(!w)return;let Y=w;if(w=null,!B){e.write(`\r
Sorry, try again.\r
`),g();return}if(!Y.commandLine){t=Y.targetUser,Y.loginShell&&(m=oe(t)),a.users.updateSession(s,t,i),await st(t,n,m,h,a),e.write(`\r
`),g();return}let V=Y.loginShell?oe(Y.targetUser):m,W=await le(Y.commandLine,Y.targetUser,n,"shell",V,a);if(e.write(`\r
`),W.openEditor){H(W.openEditor.targetPath,W.openEditor.initialContent);return}if(W.openHtop){await te();return}if(W.openPacman){C();return}W.clearScreen&&e.write("\x1B[2J\x1B[H"),W.stdout&&e.write(`${xt(W.stdout)}\r
`),W.stderr&&e.write(`${xt(W.stderr)}\r
`),W.switchUser?(y.push({authUser:t,cwd:m}),t=W.switchUser,m=W.nextCwd??oe(t),a.users.updateSession(s,t,i),await st(t,n,m,h,a)):W.nextCwd&&(m=W.nextCwd),g()}let T=-1;function j(B,Y){if(B!==void 0&&Y){let V=a.users.getUid(t),W=a.users.getGid(t);a.vfs.writeFile(Y,B,{},V,W)}T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}function H(B,Y){T=a.users.registerProcess(t,"nano",["nano",B],h.vars.__TTY??"?");let V=new Ft({stream:e,terminalSize:o,content:Y,filename:Gd.posix.basename(B),onExit:(W,z)=>{W==="saved"?j(z,B):j()}});S={kind:"nano",targetPath:B,editor:V},V.start()}async function te(){let B=await zd();if(!B){e.write(`htop: no child_process processes to display\r
`);return}T=a.users.registerProcess(t,"htop",["htop"],h.vars.__TTY??"?");let Y=Vd(B,o,e);Y.on("error",V=>{e.write(`htop: ${V.message}\r
`),j()}),Y.on("close",()=>{j()}),S={kind:"htop",process:Y}}function C(){T=a.users.registerProcess(t,"pacman",["pacman"],h.vars.__TTY??"?");let B=new Lt({stream:e,terminalSize:o,onExit:()=>{T!==-1&&(a.users.unregisterProcess(T),T=-1),S=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),g()}});S={kind:"pacman",game:B},B.start()}function k(B){c=B,l=c.length,g()}function N(B){c=`${c.slice(0,l)}${B}${c.slice(l)}`,l+=B.length,g()}function L(B,Y){let V=Y;for(;V>0&&!/\s/.test(B.charAt(V-1));)V-=1;let W=Y;for(;W<B.length&&!/\s/.test(B.charAt(W));)W+=1;return{start:V,end:W}}function q(){let{start:B,end:Y}=L(c,l),V=c.slice(B,l);if(V.length===0)return;let z=c.slice(0,B).trim().length===0?v.filter(X=>X.startsWith(V)):[],K=Qr(a.vfs,m,V),G=Array.from(new Set([...z,...K])).sort();if(G.length!==0){if(G.length===1){let X=G[0],pe=X.endsWith("/")?"":" ";c=`${c.slice(0,B)}${X}${pe}${c.slice(Y)}`,l=B+X.length+pe.length,g();return}e.write(`\r
`),e.write(`${G.join("  ")}\r
`),g()}}function Z(B){B.length!==0&&(u.push(B),u.length>500&&(u=u.slice(u.length-500)),Xr(a.vfs,t,u))}function se(){let B=Zr(a.vfs,t);e.write(Lr(n,r,B)),Jr(a.vfs,t,i)}se(),b.then(()=>g()),e.on("data",B=>{(async()=>{if(!R)return;if(S){S.kind==="nano"?S.editor.handleInput(B):S.kind==="pacman"?S.game.handleInput(B):S.process.stdin.write(B);return}if(f){let V=f,W=B.toString("utf8");for(let z=0;z<W.length;z++){let K=W.charAt(z);if(K===""){f=null,e.write(`^C\r
`),g();return}if(K==="\x7F"||K==="\b"){c=c.slice(0,-1),g();continue}if(K==="\r"||K===`
`){let G=c;if(c="",l=0,e.write(`\r
`),G===V.delimiter){let X=V.lines.join(`
`),pe=V.cmdBefore;f=null,Z(`${pe} << ${V.delimiter}`);let me=await le(pe,t,n,"shell",m,a,X,h);me.stdout&&e.write(`${xt(me.stdout)}\r
`),me.stderr&&e.write(`${xt(me.stderr)}\r
`),me.nextCwd&&(m=me.nextCwd),g();return}V.lines.push(G),e.write("> ");continue}(K>=" "||K==="	")&&(c+=K,e.write(K))}return}if(w){let V=B.toString("utf8");for(let W=0;W<V.length;W+=1){let z=V.charAt(W);if(z===""){w=null,e.write(`^C\r
`),g();return}if(z==="\x7F"||z==="\b"){w.buffer=w.buffer.slice(0,-1);continue}if(z==="\r"||z===`
`){let K=w.buffer;if(w.buffer="",w.onPassword){let{result:X,nextPrompt:pe}=await w.onPassword(K,a);e.write(`\r
`),X===null?(pe&&(w.prompt=pe),e.write(w.prompt)):(w=null,X.stdout&&e.write(X.stdout.replace(/\n/g,`\r
`)),X.stderr&&e.write(X.stderr.replace(/\n/g,`\r
`)),g());return}let G=a.users.verifyPassword(w.username,K);await D(G);return}z>=" "&&(w.buffer+=z)}return}let Y=B.toString("utf8");for(let V=0;V<Y.length;V+=1){let W=Y.charAt(V);if(W===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),y.length>0){let z=y.pop();t=z.authUser,m=z.cwd,a.users.updateSession(s,t,i),h.vars.PS1=Be(t,n).vars.PS1??"",g()}else{e.exit(0),e.end();return}continue}if(W==="	"){q();continue}if(W==="\x1B"){let z=Y[V+1],K=Y[V+2],G=Y[V+3];if(z==="["&&K){if(K==="A"){V+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),k(u[d]??""));continue}if(K==="B"){V+=2,d!==null&&(d<u.length-1?(d+=1,k(u[d]??"")):(d=null,k(p)));continue}if(K==="C"){V+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(K==="D"){V+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(K==="3"&&G==="~"){V+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,g());continue}if(K==="1"&&G==="~"){V+=3,l=0,g();continue}if(K==="H"){V+=2,l=0,g();continue}if(K==="4"&&G==="~"){V+=3,l=c.length,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}if(z==="O"&&K){if(K==="H"){V+=2,l=0,g();continue}if(K==="F"){V+=2,l=c.length,g();continue}}}if(W===""){c="",l=0,d=null,p="",e.write(`^C\r
`),g();continue}if(W===""){l=0,g();continue}if(W===""){l=c.length,g();continue}if(W==="\v"){c=c.slice(0,l),g();continue}if(W===""){c=c.slice(l),l=0,g();continue}if(W===""){let z=l;for(;z>0&&c[z-1]===" ";)z--;for(;z>0&&c[z-1]!==" ";)z--;c=c.slice(0,z)+c.slice(l),l=z,g();continue}if(W==="\r"||W===`
`){let z=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),z==="!!"||z.startsWith("!! ")||/\s!!$/.test(z)||/ !! /.test(z)){let G=u.length>0?u[u.length-1]:"";z=z==="!!"?G:z.replace(/!!/g,G)}else if(/(?:^|\s)!!/.test(z)){let G=u.length>0?u[u.length-1]:"";z=z.replace(/!!/g,G)}let K=z.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(K&&z.length>0){f={delimiter:K[2],lines:[],cmdBefore:K[1].trim()||"cat"},e.write("> ");continue}if(z.length>0){let G=await le(z,t,n,"shell",m,a,void 0,h);if(Z(z),G.openEditor){H(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await te();return}if(G.openPacman){C();return}if(G.sudoChallenge){I(G.sudoChallenge);return}if(G.clearScreen&&e.write("\x1B[2J\x1B[H"),G.stdout&&e.write(`${xt(G.stdout)}\r
`),G.stderr&&e.write(`${xt(G.stderr)}\r
`),G.closeSession)if(e.write(`logout\r
`),y.length>0){let X=y.pop();t=X.authUser,m=X.cwd,a.users.updateSession(s,t,i),h.vars.PS1=Be(t,n).vars.PS1??""}else{e.exit(G.exitCode??0),e.end();return}G.nextCwd&&!G.closeSession&&(m=G.nextCwd),G.switchUser&&(y.push({authUser:t,cwd:m}),t=G.switchUser,m=G.nextCwd??oe(t),h.vars.PWD=m,a.users.updateSession(s,t,i),await st(t,n,m,h,a),c="",l=0)}g();continue}if(W==="\x7F"||W==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,g());continue}N(W)}})().catch(Y=>{console.error("shell data handler error:",Y)})}),e.on("close",()=>{S&&(S.kind==="htop"?S.process.kill("SIGTERM"):S.kind==="pacman"&&S.game.stop(),S=null)})}function mh(r){return typeof r=="object"&&r!==null&&"vfsInstance"in r&&jd(r.vfsInstance)}function jd(r){if(typeof r!="object"||r===null)return!1;let e=r;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var fh={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},ar=Ur("VirtualShell");function hh(){let r=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return r?!["0","false","no","off"].includes(r.toLowerCase()):!1}var en=class extends ph{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,t,n,s){super(),ar.mark("constructor"),this.hostname=e,this.properties=t||fh,this.startTime=Date.now(),this.sysctl=Ul(e,this.properties.kernel),this.resourceCaps=s??{},jd(n)?this.vfs=n:mh(n)?this.vfs=n.vfsInstance:this.vfs=new jr(n??{}),this.users=new qr(this.vfs,hh()),this.packageManager=new tt(this.vfs,this.users),this.network=new $r;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=void(i.restoreMirror(),o.initialize(),Ad(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{or(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",m=>{let f=Tt(d,m);if(f){let h=f.value;return typeof h=="number"?`${h}
`:h.endsWith(`
`)?h:`${h}
`}return null}),i.onBeforeWrite("/proc/sys",(m,f)=>{let h=Tt(d,m);if(h&&h.set(typeof f=="string"?f.trim():String(f)),m.includes("vm/ram_cap_bytes")){let y=Number(f);p.ramCapBytes=y>0?y:void 0,i.setRamCap(p.ramCapBytes??null)}if(m.includes("kernel/cpu_cap_cores")){let y=Number(f);p.cpuCapCores=y>0?y:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized"))}ensureInitialized(){ar.mark("ensureInitialized"),this._initialized}addCommand(e,t,n){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");_n(vn(s,t,n))}executeCommand(e,t,n){ar.mark("executeCommand"),this._idle?.ping();let s=le(e,t,this.hostname,"shell",n,this);return this.emit("command",{command:e,user:t,cwd:n}),s}startInteractiveSession(e,t,n,s,i){ar.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:t,sessionId:n,remoteAddress:s}),Wd(this.properties,e,t,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){or(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,t,n={}){this.vfs.mount(e,t,n)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){or(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){Jn(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,t,n){ar.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,t,n),this.vfs.writeFile(t,n)}enableIdleManagement(e){this._idle||(this._idle=new Yr(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",t=>this.emit("gc:run",t)),this._idle.start())}disableIdleManagement(){this._idle&&(this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function cr(r,e){return r.includes(e)}function es(r,e,t){let n=`${e}=`;for(let s=0;s<r.length;s++){let i=r[s];if(i.startsWith(n))return i.slice(n.length);if(i===e){let o=r[s+1];return o&&!o.startsWith("--")?o:t}}return t}var lt=process.argv.slice(2);(cr(lt,"--version")||cr(lt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(cr(lt,"--help")||cr(lt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function Sh(){for(let r=0;r<lt.length;r+=1){let e=lt[r];if(e==="--user"){let t=lt[r+1];if(!t||t.startsWith("--"))throw new Error("self-standalone: --user requires a value");return t}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var Ue=es(lt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),bh=es(lt,"--snapshot",".vfs"),_h=Sh();console.clear();var ce=new en(Ue,void 0,{mode:"fs",snapshotPath:bh});function yt(){ce.vfs.stopAutoFlush()}function vh(r){let e=Array.from(new Set(qt())).sort();return(t,n)=>{let{cwd:s}=r(),i=t.split(/\s+/).at(-1)??"",a=t.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=Qr(ce.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();n(null,[l,i])}}function lr(r,e){return new Promise(t=>{if(!(ye.isTTY&&ge.isTTY)){r.question(e,t);return}let n=!!ye.isRaw,s="",i=()=>{ye.off("data",a),n||ye.setRawMode(!1)},o=c=>{i(),ge.write(`
`),t(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};r.pause(),ge.write(e),n||ye.setRawMode(!0),ye.resume(),ye.on("data",a)})}function Ch(r,e,t,n){let s=r,i=e;return t.switchUser?(s=t.switchUser,i=t.nextCwd??oe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i):t.nextCwd&&(i=t.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}ce.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function wh(){ce.ensureInitialized();let r=_h.trim()||"root";ce.users.getPasswordHash(r)===null&&(process.stderr.write(`self-standalone: user '${r}' does not exist
`),process.exit(1));let e=r==="root"?"/root":oe(r);ce.vfs.exists(e)||ce.vfs.mkdir(e,r==="root"?448:493);let t=`${e}/README.txt`;ce.vfs.exists(t)||(ce.vfs.writeFile(t,`Welcome to ${Ue}
`),ce.vfs.stopAutoFlush());let n=Be(r,Ue),s=r,i=oe(s);n.vars.PWD=i;let o=[],a="localhost",c={cols:ge.columns??80,rows:ge.rows??24};process.on("SIGWINCH",()=>{c.cols=ge.columns??c.cols,c.rows=ge.rows??c.rows});let l=Kr(ce.vfs,s),u=yh({input:ye,output:ge,terminal:!0,completer:vh(()=>({cwd:i}))}),d=u;"history"in d&&(d.history=[...l].reverse());{let v=u,R=v._ttyWrite;if(R===void 0)return;let P=R.bind(u);v._ttyWrite=(b,g)=>{let _=v.line;if(g?.ctrl&&g?.name==="d"&&_===""&&o.length>0){ge.write(`^D
`);let I=o.pop();if(I===void 0)return;s=I.authUser,i=I.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i,n.vars.PS1=Be(s,Ue).vars.PS1??"",ge.write(`logout
`),yt(),w();return}P(b,g)}}function p(v,R){return new Promise(P=>{let b={write:C=>{ge.write(C)},exit:()=>{},end:()=>{},on:()=>{}},g={cols:ge.columns??80,rows:ge.rows??24},_=ye.listeners("data");for(let C of _)ye.off("data",C);let I=ye.listeners("keypress");for(let C of I)ye.off("keypress",C);function D(){process.off("SIGWINCH",H),process.off("SIGINT",T),ye.off("data",te);for(let C of _)ye.on("data",C);for(let C of I)ye.on("keypress",C);ge.write("\x1B[?25h\x1B[0m"),u.resume()}let T=()=>{},j=new Ft({stream:b,terminalSize:g,content:R,filename:qd.posix.basename(v),onSave:C=>{let k=ce.users.getUid(s),N=ce.users.getGid(s);ce.vfs.writeFile(v,C,{},k,N),yt()},onExit:(C,k)=>{if(D(),C==="saved"){let N=ce.users.getUid(s),L=ce.users.getGid(s);ce.vfs.writeFile(v,k,{},N,L),yt()}P()}}),H=()=>{j.resize({cols:ge.columns??g.cols,rows:ge.rows??g.rows})},te=C=>{j.handleInput(C)};ye.setRawMode(!0),ye.resume(),ye.on("data",te),process.on("SIGWINCH",H),process.on("SIGINT",T),j.start()})}function m(){return new Promise(v=>{let R={write:H=>{ge.write(H)},exit:()=>{},end:()=>{},on:()=>{}},P={cols:ge.columns??80,rows:ge.rows??24},b=ye.listeners("data");for(let H of b)ye.off("data",H);let g=ye.listeners("keypress");for(let H of g)ye.off("keypress",H);function _(){process.off("SIGWINCH",T),process.off("SIGINT",j),ye.off("data",D);for(let H of b)ye.on("data",H);for(let H of g)ye.on("keypress",H);ge.write("\x1B[?25h\x1B[0m"),u.resume(),v()}ye.isTTY&&ye.setRawMode(!0),ye.resume();let I=new Lt({stream:R,terminalSize:P,onExit:_});function D(H){I.handleInput(H)}function T(){}function j(){I.stop(),_()}ye.on("data",D),process.on("SIGWINCH",T),process.on("SIGINT",j),I.start()})}async function f(v){if(v.onPassword){let g=v.prompt;for(;;){let _=await lr(u,g),I=await v.onPassword(_,ce);if(I.result===null){g=I.nextPrompt??g;continue}await y(I.result);return}}let R=await lr(u,v.prompt);if(!ce.users.verifyPassword(v.username,R)){process.stderr.write(`Sorry, try again.
`);return}if(!v.commandLine){o.push({authUser:s,cwd:i}),s=v.targetUser,i=oe(s),n.vars.PWD=i,await st(s,Ue,i,n,ce);return}let P=v.loginShell?oe(v.targetUser):i,b=await le(v.commandLine,v.targetUser,Ue,"shell",P,ce,void 0,n);await y(b)}async function h(v){let R=await lr(u,v.prompt);if(v.confirmPrompt&&await lr(u,v.confirmPrompt)!==R){process.stderr.write(`passwords do not match
`);return}switch(v.action){case"passwd":ce.users.setPassword(v.targetUsername,R),ge.write(`passwd: password updated successfully
`);break;case"adduser":if(!v.newUsername){process.stderr.write(`adduser: missing username
`);return}ce.users.addUser(v.newUsername,R),ge.write(`adduser: user '${v.newUsername}' created
`);break;case"deluser":ce.users.deleteUser(v.targetUsername),ge.write(`Removing user '${v.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=v.targetUsername,i=oe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i;break;default:break}}async function y(v){if(v.openEditor){await p(v.openEditor.targetPath,v.openEditor.initialContent),w();return}if(v.openPacman){await m(),w();return}if(v.sudoChallenge){await f(v.sudoChallenge);return}if(v.passwordChallenge){await h(v.passwordChallenge);return}v.clearScreen&&(ge.write("\x1B[2J\x1B[H"),console.clear()),v.stdout&&ge.write(v.stdout.endsWith(`
`)?v.stdout:`${v.stdout}
`),v.stderr&&process.stderr.write(v.stderr.endsWith(`
`)?v.stderr:`${v.stderr}
`),v.switchUser&&o.push({authUser:s,cwd:i});let R=Ch(s,i,v,n);if(s=R.authUser,i=R.cwd,v.switchUser&&await st(s,Ue,i,n,ce),v.closeSession){yt();let P=o.pop();P===void 0?(u.close(),process.exit(v.exitCode??0)):(s=P.authUser,i=P.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=oe(s),n.vars.PWD=i,n.vars.PS1=Be(s,Ue).vars.PS1??"",ge.write(`logout
`))}}let S=()=>{if(n.vars.PS1)return Ut(s,Ue,"",n.vars.PS1,i,!0);let v=i===oe(s)?"~":gh(i)||"/";return Ut(s,Ue,v,void 0,void 0,!0)},w=()=>{u.setPrompt(S()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&ce.users.hasPassword(s)){let v=await lr(u,`Password for ${s}: `);ce.users.verifyPassword(s,v)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ge.write(Lr(Ue,ce.properties,Zr(ce.vfs,s))),Jr(ce.vfs,s,a);for(let v of["/etc/environment",`${oe(s)}/.profile`,`${oe(s)}/.bashrc`])if(ce.vfs.exists(v))for(let R of ce.vfs.readFile(v).split(`
`)){let P=R.trim();if(!(!P||P.startsWith("#")))try{let b=await le(P,s,Ue,"shell",i,ce,void 0,n);b.stdout&&ge.write(b.stdout)}catch{}}yt();let M=!1;u.on("line",async v=>{if(M)return;M=!0,u.pause(),v.trim().length>0&&(l.at(-1)!==v&&(l.push(v),l.length>500&&(l=l.slice(l.length-500)),Xr(ce.vfs,s,l)),d.history=[...l].reverse());let P=await le(v,s,Ue,"shell",i,ce,void 0,n);await y(P),yt(),M=!1,u.resume(),w()}),u.on("SIGINT",()=>{ge.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),w()}),u.on("close",()=>{let v=o.pop();v===void 0?(yt(),console.log(""),process.exit(0)):(s=v.authUser,yt(),ge.write(`logout
`),process.exit(0))}),w()}wh().catch(r=>{console.error("Failed to start readline SSH emulation:",r),process.exit(1)});var Hd=!1;function xh(r){if(!Hd){Hd=!0,process.stdout.write(`
[${r}] Saving VFS...
`);try{ce.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{xh("SIGTERM")});process.on("beforeExit",()=>{ce.vfs.stopAutoFlush()});process.on("uncaughtException",r=>{console.error("Uncaught exception:",r)});process.on("unhandledRejection",(r,e)=>{console.error("Unhandled rejection at:",e,"error:",r)});
