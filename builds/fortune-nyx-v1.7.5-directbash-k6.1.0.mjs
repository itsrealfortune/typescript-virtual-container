#!/usr/bin/env node
var _i=Object.defineProperty;var Gy=Object.getOwnPropertyDescriptor;var Hy=Object.getOwnPropertyNames;var qy=Object.prototype.hasOwnProperty;var ct=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var E=(t,e)=>()=>(t&&(e=t(t=0)),e);var Kr=(t,e)=>{for(var n in e)_i(t,n,{get:e[n],enumerable:!0})},Yy=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Hy(e))!qy.call(t,s)&&s!==n&&_i(t,s,{get:()=>e[s],enumerable:!(r=Gy(e,s))||r.enumerable});return t};var Ky=t=>Yy(_i({},"__esModule",{value:!0}),t);var wa,Ia=E(()=>{"use strict";wa={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:(a,c)=>{if(i==="new")return a.length<1?Promise.resolve({result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}):(s=a,i="retype",Promise.resolve({result:null,nextPrompt:"Retype new password: "}));if(a!==s)return Promise.resolve({result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}});c.users.addUser(r,s);let l=c.users.getGid(r);return Promise.resolve({result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (${l}) ...`,`Adding new user '${r}' (${l}) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})}},exitCode:0}}}});function Ea(t){return Array.isArray(t)?t:[t]}function Xr(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function Xy(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of n){let{matched:u}=Xr(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Xr(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function k(t,e){let n=Ea(e);for(let r of t)for(let s of n)if(Xr(r,s).matched)return!0;return!1}function pn(t,e){let n=Ea(e);for(let r=0;r<t.length;r+=1){let s=t[r];for(let i of n){let o=Xr(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function Xt(t,e,n={}){return Xy(t,n)[e]}function $e(t,e={}){let n=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:n,flagsWithValues:r,positionals:s}}var Q=E(()=>{"use strict"});var $a,Pa,ka=E(()=>{"use strict";Q();$a={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},Pa={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(k(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});var Ma,Na=E(()=>{"use strict";Zt();Ma={name:"builtin",description:"Run a shell builtin (skip shell functions and aliases)",category:"shell",params:["<builtin> [args...]"],run:({args:t,authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(t.length===0)return{stderr:"builtin: missing argument",exitCode:1};let u=t[0]?.toLowerCase()??"",d=Ve(u);return d?d.run({authUser:e,uid:n,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:t.join(" "),mode:i,args:t.slice(1),stdin:c,cwd:o,shell:a,env:l}):{stderr:`builtin: ${u}: not a shell builtin`,exitCode:1}}}});var wi,Zy,Jy,Dt,Ii=E(()=>{"use strict";wi=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Zy=new Map(wi.map(t=>[t.name.toLowerCase(),t])),Jy=wi.slice().sort((t,e)=>t.name.localeCompare(e.name)),Dt=class t{constructor(e,n){this._vfs=e;this._users=n}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=t._parseFields(r),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let n of this._installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}static _parseFields(e){let n={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}_log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+r)}_aptLog(e,n){let r=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}static findInRegistry(e){return Zy.get(e.toLowerCase())}static listAvailable(){return Jy}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=t.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}t.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:r.join(`
`),exitCode:0}}static search(e){let n=e.toLowerCase();return wi.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let n=t.findInRegistry(e);if(!n)return null;let r=this._installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}}});import*as gt from"node:path";function U(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return gt.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?gt.posix.normalize(e):gt.posix.normalize(gt.posix.join(t,e))}function eS(t){let e=t.startsWith("/")?gt.posix.normalize(t):gt.posix.normalize(`/${t}`);return Qy.some(n=>e===n||e.startsWith(`${n}/`))}function ge(t,e,n){if(t!=="root"&&eS(e))throw new Error(`${n}: permission denied: ${e}`)}function Aa(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function tS(t,e){let n=t.length,r=e.length,s=Array.from({length:n+1},()=>new Array(r+1).fill(0));for(let o=0;o<=n;o++){let a=s[o];a[0]=o}for(let o=0;o<=r;o++){let a=s[0];a[o]=o}for(let o=1;o<=n;o++){let a=s[o],c=s[o-1];for(let l=1;l<=r;l++){let u=t[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[n][r]}function Ta(t,e,n){let r=U(e,n);if(t.exists(r))return r;let s=gt.posix.dirname(r),i=gt.posix.basename(r),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return gt.posix.join(s,a[0]);let c=o.filter(l=>tS(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?gt.posix.join(s,c[0]):r}function Fn(t){return t.packageManager}function qe(t,e,n,r,s){if(n==="root"||s===0)return;ge(n,r,"access");let i=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,i,o,s)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Qy,re=E(()=>{"use strict";Qy=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Oa,Ra,Da=E(()=>{"use strict";Ii();Q();re();Oa={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=Fn(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=k(i,["-q","--quiet","-qq"]),a=k(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=Dt.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64
  ${p.shortDesc??p.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(k(i,["--installed"])){let p=r.listInstalled();return p.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${p.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${Dt.listAvailable().map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Ra={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=Fn(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),s=t[1];switch(r){case"search":return s?{stdout:Dt.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=Dt.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var Fa,La=E(()=>{"use strict";re();Fa={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let $=e[c];if($==="-F")i=e[++c]??" ",c++;else if($.startsWith("-F"))i=$.slice(2),c++;else if($==="-v"){let O=e[++c]??"",w=O.indexOf("=");w!==-1&&(o[O.slice(0,w)]=O.slice(w+1)),c++}else if($.startsWith("-v")){let O=$.slice(2),w=O.indexOf("=");w!==-1&&(o[O.slice(0,w)]=O.slice(w+1)),c++}else a.push($),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let $=U(r,u);try{ge(t,$,"awk"),d=s.vfs.readFile($)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function f($){if($===void 0||$==="")return 0;let O=Number($);return Number.isNaN(O)?0:O}function p($){return $===void 0?"":String($)}function m($,O){return O===" "?$.trim().split(/\s+/).filter(Boolean):O.length===1?$.split(O):$.split(new RegExp(O))}function h($,O,w,D,z){if($=$.trim(),$==="")return"";if($.startsWith('"')&&$.endsWith('"'))return $.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test($))return Number.parseFloat($);if($==="$0")return w.join(i===" "?" ":i)||"";if($==="$NF")return w[z-1]??"";if(/^\$\d+$/.test($))return w[Number.parseInt($.slice(1),10)-1]??"";if(/^\$/.test($)){let q=$.slice(1),Y=f(h(q,O,w,D,z));return Y===0?w.join(i===" "?" ":i)||"":w[Y-1]??""}if($==="NR")return D;if($==="NF")return z;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test($))return O[$]??"";let Z=$.match(/^length\s*\(([^)]*)\)$/);if(Z)return p(h(Z[1].trim(),O,w,D,z)).length;let J=$.match(/^substr\s*\((.+)\)$/);if(J){let q=g(J[1]),Y=p(h(q[0]?.trim()??"",O,w,D,z)),oe=f(h(q[1]?.trim()??"1",O,w,D,z))-1,ie=q[2]===void 0?void 0:f(h(q[2].trim(),O,w,D,z));return ie===void 0?Y.slice(Math.max(0,oe)):Y.slice(Math.max(0,oe),oe+ie)}let F=$.match(/^index\s*\((.+)\)$/);if(F){let q=g(F[1]),Y=p(h(q[0]?.trim()??"",O,w,D,z)),oe=p(h(q[1]?.trim()??"",O,w,D,z));return Y.indexOf(oe)+1}let j=$.match(/^tolower\s*\((.+)\)$/);if(j)return p(h(j[1].trim(),O,w,D,z)).toLowerCase();let W=$.match(/^toupper\s*\((.+)\)$/);if(W)return p(h(W[1].trim(),O,w,D,z)).toUpperCase();let V=$.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(V){let q=p(h(V[1].trim(),O,w,D,z));try{let Y=q.match(new RegExp(V[2]));if(Y)return O.RSTART=(Y.index??0)+1,O.RLENGTH=Y[0].length,(Y.index??0)+1}catch{}return O.RSTART=0,O.RLENGTH=-1,0}let L=$.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(L){let q=h(L[1].trim(),O,w,D,z);return f(q)!==0||typeof q=="string"&&q!==""?h(L[2].trim(),O,w,D,z):h(L[3].trim(),O,w,D,z)}let H=$.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(H)return p(h(H[1],O,w,D,z))+p(h(H[2],O,w,D,z));try{let q=$.replace(/\bNR\b/g,String(D)).replace(/\bNF\b/g,String(z)).replace(/\$NF\b/g,String(z>0?f(w[z-1]):0)).replace(/\$(\d+)/g,(oe,ie)=>String(f(w[Number.parseInt(ie,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(oe,ie)=>String(f(O[ie]))),Y=Function(`"use strict"; return (${q});`)();if(typeof Y=="number"||typeof Y=="boolean")return Number(Y)}catch{}return p(O[$]??$)}function g($){let O=[],w="",D=0;for(let z=0;z<$.length;z++){let Z=$.charAt(z);if(Z==="(")D++;else if(Z===")")D--;else if(Z===","&&D===0){O.push(w),w="";continue}w+=Z}return O.push(w),O}function y($,O,w,D,z,Z){if($=$.trim(),!$||$.startsWith("#"))return"ok";if($==="next")return"next";if($==="exit"||$.startsWith("exit "))return"exit";if($==="print"||$==="print $0")return Z.push(w.join(i===" "?" ":i)),"ok";if($.startsWith("printf ")){let L=$.slice(7).trim();return Z.push(S(L,O,w,D,z)),"ok"}if($.startsWith("print ")){let L=$.slice(6),H=g(L);return Z.push(H.map(q=>p(h(q.trim(),O,w,D,z))).join("	")),"ok"}if($.startsWith("delete ")){let L=$.slice(7).trim();return delete O[L],"ok"}let J=$.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(J){let L=J[1]==="gsub",H=J[2],q=$.slice(J[0].length).replace(/^\s*,\s*/,""),Y=g(q.replace(/\)\s*$/,"")),oe=p(h(Y[0]?.trim()??'""',O,w,D,z)),ie=Y[1]?.trim(),_e=w.join(i===" "?" ":i);try{let je=new RegExp(H,L?"g":"");if(ie&&/^\$\d+$/.test(ie)){let Ee=Number.parseInt(ie.slice(1),10)-1;Ee>=0&&Ee<w.length&&(w[Ee]=(w[Ee]??"").replace(je,oe))}else{let Ee=_e.replace(je,oe),De=m(Ee,i);w.splice(0,w.length,...De)}}catch{}return"ok"}let F=$.match(/^split\s*\((.+)\)$/);if(F){let L=g(F[1]),H=p(h(L[0]?.trim()??"",O,w,D,z)),q=L[1]?.trim()??"arr",Y=L[2]?p(h(L[2].trim(),O,w,D,z)):i,oe=m(H,Y);for(let ie=0;ie<oe.length;ie++)O[`${q}[${ie+1}]`]=oe[ie]??"";return O[q]=String(oe.length),"ok"}let j=$.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(j)return O[j[1]]=f(O[j[1]])+(j[2]==="++"?1:-1),"ok";let W=$.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(W){let L=f(O[W[1]]),H=f(h(W[3],O,w,D,z)),q=W[2],Y=L;return q==="+="?Y=L+H:q==="-="?Y=L-H:q==="*="?Y=L*H:q==="/="?Y=H===0?0:L/H:q==="%="&&(Y=L%H),O[W[1]]=Y,"ok"}let V=$.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return V?(O[V[1]]=h(V[2],O,w,D,z),"ok"):(h($,O,w,D,z),"ok")}function S($,O,w,D,z){let Z=g($),J=p(h(Z[0]?.trim()??'""',O,w,D,z)),F=Z.slice(1).map(W=>h(W.trim(),O,w,D,z)),j=0;return J.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(W,V,L)=>{if(L==="%")return"%";let H=F[j++],q=V?Number.parseInt(V,10):0,Y="";return L==="d"||L==="i"?Y=String(Math.trunc(f(H))):L==="f"?Y=f(H).toFixed(V?.includes(".")?Number.parseInt(V.split(".")[1]??"6",10):6):L==="s"||L==="q"?Y=p(H):L==="x"?Y=Math.trunc(f(H)).toString(16):L==="X"?Y=Math.trunc(f(H)).toString(16).toUpperCase():L==="o"?Y=Math.trunc(f(H)).toString(8):Y=p(H),q>0&&Y.length<q?Y=Y.padStart(q):q<0&&Y.length<-q&&(Y=Y.padEnd(-q)),Y})}let v=[],x=l.trim();{let $=0;for(;$<x.length;){for(;$<x.length&&/\s/.test(x.charAt($));)$++;if($>=x.length)break;let O="";for(;$<x.length&&x[$]!=="{";)O+=x[$++];if(O=O.trim(),x[$]!=="{"){O&&v.push({pattern:O,action:"print $0"});break}$++;let w="",D=1;for(;$<x.length&&D>0;){let z=x.charAt($);if(z==="{")D++;else if(z==="}"&&(D--,D===0)){$++;break}w+=z,$++}v.push({pattern:O,action:w.trim()})}}v.length===0&&v.push({pattern:"",action:x.replace(/[{}]/g,"").trim()});let A=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},_=v.filter($=>$.pattern==="BEGIN"),b=v.filter($=>$.pattern==="END"),C=v.filter($=>$.pattern!=="BEGIN"&&$.pattern!=="END");function P($,O,w,D){let z=T($);for(let Z of z){let J=y(Z,I,O,w,D,A);if(J!=="ok")return J}return"ok"}function T($){let O=[],w="",D=0,z=!1,Z="";for(let J=0;J<$.length;J++){let F=$.charAt(J);if(!z&&(F==='"'||F==="'")){z=!0,Z=F,w+=F;continue}if(z&&F===Z){z=!1,w+=F;continue}if(z){w+=F;continue}F==="("||F==="["?D++:(F===")"||F==="]")&&D--,(F===";"||F===`
`)&&D===0?(w.trim()&&O.push(w.trim()),w=""):w+=F}return w.trim()&&O.push(w.trim()),O}function R($,O,w,D,z){if(!$||$==="1")return!0;if(/^-?\d+$/.test($))return f($)!==0;if($.startsWith("/")&&$.endsWith("/"))try{return new RegExp($.slice(1,-1)).test(O)}catch{return!1}let Z=$.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let j=f(h(Z[1].trim(),I,w,D,z)),W=f(h(Z[3].trim(),I,w,D,z));switch(Z[2]){case"==":return j===W;case"!=":return j!==W;case">":return j>W;case">=":return j>=W;case"<":return j<W;case"<=":return j<=W;default:return!1}}let J=$.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(J){let j=p(h(`$${J[1]}`,I,w,D,z));try{return new RegExp(J[2]).test(j)}catch{return!1}}let F=h($,I,w,D,z);return f(F)!==0||typeof F=="string"&&F!==""}for(let $ of _)P($.action,[],0,0);let G=d.split(`
`);G[G.length-1]===""&&G.pop();let X=!1;for(let $=0;$<G.length&&!X;$++){let O=G[$];I.NR=$+1;let w=m(O,i);I.NF=w.length;let D=$+1,z=w.length;for(let Z of C){if(!R(Z.pattern,O,w,D,z))continue;let J=P(Z.action,w,D,z);if(J==="next")break;if(J==="exit"){X=!0;break}}}for(let $ of b)P($.action,[],f(I.NR),0);let te=A.join(`
`);return{stdout:te+(te&&!te.endsWith(`
`)?`
`:""),exitCode:0}}}});var Ua,Ba=E(()=>{"use strict";Q();Ua={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=k(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var za,Wa,ja=E(()=>{"use strict";za={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Wa={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function nS(t,e){let n=t[e],r=e+2,s=t.indexOf(")",r);if(s===-1)return{re:`\\${n}\\(`,end:e+1};let i=t.slice(r,s),o=Ei(i,!1);switch(n){case"?":return{re:`(?:${o})?`,end:s};case"*":return{re:`(?:${o})*`,end:s};case"+":return{re:`(?:${o})+`,end:s};case"@":return{re:`(?:${o})`,end:s};case"!":return{re:`(?:(?!${o}).)`,end:s};default:return{re:`\\${n}\\(`,end:e+1}}}function Ei(t,e){let n=e?"^":"";for(let r=0;r<t.length;r++){let s=t.charAt(r);if((s==="?"||s==="*"||s==="+"||s==="@"||s==="!")&&t[r+1]==="("){let{re:i,end:o}=nS(t,r);n+=i,r=o;continue}if(s==="*"){if(t[r+1]==="*"){n+=".*",r++,t[r+1]==="/"&&r++;continue}n+="[^/]*";continue}if(s==="?"){n+="[^/]";continue}if(s==="["){let i=t.indexOf("]",r+1);if(i===-1)n+="\\[";else{let o=t.slice(r+1,i);o.startsWith("!")&&(o=`^${o.slice(1)}`),n+=`[${o}]`,r=i}continue}n+=s.replace(/[.+^${}()|[\]\\]/g,"\\$&")}return e&&(n+="$"),n}function Jr(t,e=""){let n=`${e}:${t}`,r=Zr.get(n);if(r)return r;let s=new RegExp(Ei(t,!0),e);return Zr.set(n,s),s}function mn(t,e,n,r=!1){let s=`shell:${e}:${n?"g":"s"}:${r?"G":""}:${t}`,i=Zr.get(s);if(i)return i;let o=Ei(t,!1);n||(o=o.replace(/\\.\*/g,"[^/]*"));let a=e==="prefix"?`^${o}`:e==="suffix"?`${o}$`:o;return i=new RegExp(a,r?"g":""),Zr.set(s,i),i}var Zr,$i=E(()=>{"use strict";Zr=new Map});function rS(t,e){let n=[],r=0;for(;r<t.length;){let s=t.charAt(r);if(/\s/.test(s)){r++;continue}if(s==="+"){if(t[r+1]==="+"){r+=2;continue}n.push({type:"plus"}),r++;continue}if(s==="-"){if(t[r+1]==="-"){r+=2;continue}n.push({type:"minus"}),r++;continue}if(s==="*"){if(t[r+1]==="="){n.push({type:"assign"}),r+=2;continue}if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(s==="&"){if(t[r+1]==="&"){n.push({type:"logical_and"}),r+=2;continue}n.push({type:"bitand"}),r++;continue}if(s==="|"){if(t[r+1]==="|"){n.push({type:"logical_or"}),r+=2;continue}n.push({type:"bitor"}),r++;continue}if(s==="^"){n.push({type:"bitxor"}),r++;continue}if(s==="~"){n.push({type:"bitnot"}),r++;continue}if(s==="<"){if(t[r+1]==="<"){n.push({type:"shl"}),r+=2;continue}if(t[r+1]==="="){n.push({type:"le"}),r+=2;continue}n.push({type:"lt"}),r++;continue}if(s===">"){if(t[r+1]===">"){n.push({type:"shr"}),r+=2;continue}if(t[r+1]==="="){n.push({type:"ge"}),r+=2;continue}n.push({type:"gt"}),r++;continue}if(s==="="){if(t[r+1]==="="){n.push({type:"eq"}),r+=2;continue}n.push({type:"assign"}),r++;continue}if(s==="!"){if(t[r+1]==="="){n.push({type:"ne"}),r+=2;continue}r++;continue}if(s==="?"){n.push({type:"ternary_q"}),r++;continue}if(s===":"){n.push({type:"ternary_c"}),r++;continue}if(s===","){n.push({type:"comma"}),r++;continue}if(/[0-9]/.test(s)){if(s==="0"&&(t[r+1]==="x"||t[r+1]==="X")){let o=r+2;for(;o<t.length&&/[0-9a-fA-F]/.test(t.charAt(o));)o++;n.push({type:"number",value:Number.parseInt(t.slice(r+2,o),16)}),r=o;continue}if(s==="0"&&/[0-7]/.test(t[r+1]??"")){let o=r+1;for(;o<t.length&&/[0-7]/.test(t.charAt(o));)o++;n.push({type:"number",value:Number.parseInt(t.slice(r,o),8)}),r=o;continue}let i=r+1;for(;i<t.length&&/[0-9]/.test(t.charAt(i));)i++;n.push({type:"number",value:Number(t.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t.charAt(i));)i++;let o=t.slice(r,i);n.push({type:"ident",value:o}),r=i;continue}return[]}return n}function Va(t,e){if(t.type==="number")return t.value;if(t.type==="ident"){let n=e[t.value],r=n===void 0||n===""?0:Number(n);return Number.isFinite(r)?r:0}return Number.NaN}function pr(t,e){let n=t.trim();if(n.length===0||n.length>1024)return Number.NaN;let r=rS(n,e);if(r.length===0)return Number.NaN;let s=0,i=()=>r[s],o=()=>r[s++],a={number:()=>Va(o(),e),ident:()=>Va(o(),e),lparen:()=>{o();let d=l(0);return i()?.type!=="rparen"?Number.NaN:(o(),d)},plus:()=>(o(),l(90)),minus:()=>(o(),-l(90)),bitnot:()=>(o(),~l(90))},c={comma:{prec:1,fn:d=>(o(),l(1))},assign:{prec:2,fn:d=>(o(),l(2))},ternary_q:{prec:3,fn:d=>{o();let f=l(3);if(i()?.type!=="ternary_c")return Number.NaN;o();let p=l(3);return d?f:p}},logical_or:{prec:4,fn:d=>(o(),d||l(5))},logical_and:{prec:5,fn:d=>(o(),d&&l(6))},bitor:{prec:6,fn:d=>{o();let f=Math.trunc(l(7));return d|f}},bitxor:{prec:7,fn:d=>{o();let f=Math.trunc(l(8));return d^f}},bitand:{prec:8,fn:d=>{o();let f=Math.trunc(l(9));return d&f}},eq:{prec:9,fn:d=>(o(),d===l(10)?1:0)},ne:{prec:9,fn:d=>(o(),d===l(10)?0:1)},lt:{prec:10,fn:d=>{o();let f=l(11);return d<f?1:0}},gt:{prec:10,fn:d=>{o();let f=l(11);return d>f?1:0}},le:{prec:10,fn:d=>{o();let f=l(11);return d<=f?1:0}},ge:{prec:10,fn:d=>{o();let f=l(11);return d>=f?1:0}},shl:{prec:11,fn:d=>{o();let f=Math.trunc(l(12));return d<<f}},shr:{prec:11,fn:d=>{o();let f=Math.trunc(l(12));return d>>f}},plus:{prec:12,fn:d=>(o(),d+l(13))},minus:{prec:12,fn:d=>(o(),d-l(13))},mul:{prec:13,fn:d=>(o(),d*l(14))},div:{prec:13,fn:d=>{o();let f=l(14);return f===0?Number.NaN:Math.trunc(d/f)}},mod:{prec:13,fn:d=>{o();let f=l(14);return f===0?Number.NaN:Math.trunc(d%f)}},pow:{prec:14,fn:d=>(o(),d**l(14)),rightAsso:!0}};function l(d){let f=i();if(!f)return Number.NaN;let p=a[f.type];if(!p)return Number.NaN;let m=p();for(;;){let h=i();if(!h)break;let g=c[h.type];if(!g)break;let{prec:y,fn:S,rightAsso:v}=g;if(y<d||y===d&&v)break;m=S(m)}return m}let u=l(0);return!Number.isFinite(u)||s!==r.length?Number.NaN:Math.trunc(u)}function sS(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let s=t.indexOf("'",r);if(s===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,s)));let i=t.indexOf("'",s+1);if(i===-1){n.push(t.slice(s));break}n.push(t.slice(s,i+1)),r=i+1}return n.join("")}function es(t){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),f=s.slice(c+1),p=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(p){let y=[];if(/\d/.test(p[1])){let x=Number.parseInt(p[1],10),A=Number.parseInt(p[2],10),I=p[3]?Number.parseInt(p[3],10):1,_=x<=A?I:-I;for(let b=x;x<=A?b<=A:b>=A;b+=_)y.push(String(b))}else{let x=p[1].charCodeAt(0),A=p[2].charCodeAt(0),I=x<=A?1:-1;for(let _=x;x<=A?_<=A:_>=A;_+=I)y.push(String.fromCharCode(_))}let S=y.map(x=>`${u}${x}${f}`),v=[];for(let x of S)if(v.push(...r(x,i+1)),v.length>256)return[s];return v}let m=[],h="",g=0;for(let y of d)y==="{"?(g++,h+=y):y==="}"?(g--,h+=y):y===","&&g===0?(m.push(h),h=""):h+=y;if(m.push(h),m.length>1){let y=[];for(let S of m)if(y.push(...r(`${u}${S}${f}`,i+1)),y.length>256)return[s];return y}break}}return[s]}return r(t,0)}function iS(t,e){if(!t.includes("$(("))return t;let n="",r=0,s=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(s,r);let i=r+3,o=0;for(;i<t.length;){let a=t.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(r+3,i),l=pr(c,e);n+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(s)}function Qr(t,e,n=0,r){if(!(t.includes("$")||t.includes("~")||t.includes("'")))return t;let s=r??e.HOME??"/home/user";return sS(t,i=>{let o=i;return o=o.replace(/\$'((?:\\.|[^'\\])*)'/g,(a,c)=>c.replace(/\\(.)/g,(l,u)=>{switch(u){case"n":return`
`;case"t":return"	";case"r":return"\r";case"0":return"\0";case"a":return"\x07";case"b":return"\b";case"e":return"\x1B";case"f":return"\f";case"v":return"\v";case"\\":return"\\";case"'":return"'";case'"':return'"';default:{if(u[0]==="x"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]+$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(/^[0-7]{1,3}$/.test(u))return String.fromCodePoint(Number.parseInt(u,8));if(u[0]==="u"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]{1,4}$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(u[0]==="c"&&u[1]){let d=u[1].toUpperCase().charCodeAt(0)-64;return String.fromCodePoint(d>=0?d:0)}return u}}})),o=o.replace(/(^|[\s:])(~\+|~-|~[A-Za-z_][A-Za-z0-9_]*|~)(?=\/|$|\s|:)/g,(a,c,l)=>{let u;return l==="~+"?u=e.PWD??s:l==="~-"?u=e.OLDPWD??"":l==="~"?u=s:u=`/home/${l.slice(1)}`,u?`${c}${u}`:`${c}${l}`}),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=o.replace(/\$BASHPID\b/g,()=>String(Math.floor(Math.random()*32768)+1e3)),o=o.replace(/\$EPOCHSECONDS\b/g,()=>String(Math.floor(Date.now()/1e3))),o=o.replace(/\$EPOCHREALTIME\b/g,()=>String(Date.now()/1e3)),o=o.replace(/\$-/g,()=>{let a="";return e.__errexit==="1"&&(a+="e"),e.__nounset==="1"&&(a+="u"),e.__noclobber==="1"&&(a+="C"),e.__xtrace==="1"&&(a+="x"),e.__pipefail==="1"&&(a+="o pipefail"),a}),o=o.replace(/\$_/g,()=>e.__lastarg??""),o=o.replace(/\$PIPESTATUS\b/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[@\]\}/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[\*\]\}/g,()=>e.__pipestatus??"0"),o=iS(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\?([^}]*)\}/g,(a,c,l)=>e[c]===void 0||e[c]===""?`bash: ${c}: ${l||"parameter null or not set"}`:e[c]),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",f=Number.parseInt(l,10),p=f<0?Math.max(0,d.length+f):Math.min(f,d.length);return u===void 0?d.slice(p):d.slice(p,p+Number.parseInt(u,10))}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(mn(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(mn(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(mn(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(mn(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(mn(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(mn(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function ts(t,e,n,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return Qr(t,e,n);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,f=l+1;for(;f<t.length;){if(t[f]==="(")d++;else if(t[f]===")"&&(d--,d===0))break;f++}let p=t.slice(l+2,f).trim(),m=(await r(p)).replace(/\n$/,"");a+=m,l=f+1;continue}a+=u,l++}t=a}return Qr(t,e,n)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Pi(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function Ga(t,e,n,r){if(!(t.includes("*")||t.includes("?")))return[t];let s=t.startsWith("/"),i=s?"/":e,o=s?t.slice(1):t,a=ki(i,o.split("/"),n,r?.dotglob);return a.length===0?r?.nullglob?[]:[t]:a.sort()}function ki(t,e,n,r){if(e.length===0)return[t];let[s,...i]=e;if(!s)return[t];if(s==="**"){let u=Ha(t,n);if(i.length===0)return u;let d=[];for(let f of u)Pi(n,f)==="directory"&&d.push(...ki(f,i,n,r));return d}let o=[];try{o=n.list(t)}catch{return[]}let a=Jr(s),c=r?!0:s.startsWith("."),l=[];for(let u of o){if(!c&&u.startsWith(".")||!a.test(u))continue;let d=t==="/"?`/${u}`:`${t}/${u}`;if(i.length===0){l.push(d);continue}Pi(n,d)==="directory"&&l.push(...ki(d,i,n,r))}return l}function Ha(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let s of r){let i=t==="/"?`/${s}`:`${t}/${s}`;Pi(e,i)==="directory"&&n.push(...Ha(i,e))}return n}var mr=E(()=>{"use strict";$i()});var qa,Ya=E(()=>{"use strict";mr();qa={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=pr(o,{});if(Number.isNaN(a))return{stderr:`bc: syntax error on line: ${i}`,exitCode:1};r.push(String(a))}return{stdout:r.join(`
`),exitCode:0}}}});var $c={};Kr($c,{AsyncCompress:()=>fS,AsyncDecompress:()=>gS,AsyncDeflate:()=>mc,AsyncGunzip:()=>gc,AsyncGzip:()=>fS,AsyncInflate:()=>qi,AsyncUnzipInflate:()=>$S,AsyncUnzlib:()=>Sc,AsyncZipDeflate:()=>CS,AsyncZlib:()=>mS,Compress:()=>Ri,DecodeUTF8:()=>bS,Decompress:()=>Li,Deflate:()=>ft,EncodeUTF8:()=>xS,FlateErrorCode:()=>uS,Gunzip:()=>ls,Gzip:()=>Ri,Inflate:()=>Je,Unzip:()=>PS,UnzipInflate:()=>ES,UnzipPassThrough:()=>Ec,Unzlib:()=>us,Zip:()=>_S,ZipDeflate:()=>vS,ZipPassThrough:()=>yr,Zlib:()=>Di,compress:()=>pS,compressSync:()=>hn,decompress:()=>yS,decompressSync:()=>SS,deflate:()=>hc,deflateSync:()=>Sn,gunzip:()=>yc,gunzipSync:()=>wt,gzip:()=>pS,gzipSync:()=>hn,inflate:()=>Yi,inflateSync:()=>tn,strFromU8:()=>Xi,strToU8:()=>Qt,unzip:()=>kS,unzipSync:()=>MS,unzlib:()=>bc,unzlibSync:()=>Ut,zip:()=>wS,zipSync:()=>IS,zlib:()=>hS,zlibSync:()=>Fi});import{createRequire as oS}from"module";function yn(t,e){return typeof t=="function"&&(e=t,t={}),this.ondata=e,t}function hc(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[Yn],function(r){return en(Sn(r.data[0],r.data[1]))},0,n)}function Sn(t,e){return gn(t,e||{},0,0)}function Yi(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[qn],function(r){return en(tn(r.data[0],zi(r.data[1])))},1,n)}function tn(t,e){return br(t,{i:2},e&&e.out,e&&e.dictionary)}function pS(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[Yn,lc,function(){return[hn]}],function(r){return en(hn(r.data[0],r.data[1]))},2,n)}function hn(t,e){e||(e={});var n=Hn(),r=t.length;n.p(t);var s=gn(t,e,Vi(e),8),i=s.length;return Wi(s,e),be(s,i-8,n.d()),be(s,i-4,r),s}function yc(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[qn,uc,function(){return[wt]}],function(r){return en(wt(r.data[0],r.data[1]))},3,n)}function wt(t,e){var n=ji(t);return n+8>t.length&&ee(6,"invalid gzip data"),br(t.subarray(n,-8),{i:2},e&&e.out||new ce(pc(t)),e&&e.dictionary)}function hS(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[Yn,dc,function(){return[Fi]}],function(r){return en(Fi(r.data[0],r.data[1]))},4,n)}function Fi(t,e){e||(e={});var n=ps();n.p(t);var r=gn(t,e,e.dictionary?6:2,4);return Gi(r,e),be(r,r.length-4,n.d()),r}function bc(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),Kn(t,e,[qn,fc,function(){return[Ut]}],function(r){return en(Ut(r.data[0],zi(r.data[1])))},5,n)}function Ut(t,e){return br(t.subarray(Hi(t,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function yS(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ee(7),t[0]==31&&t[1]==139&&t[2]==8?yc(t,e,n):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?Yi(t,e,n):bc(t,e,n)}function SS(t,e){return t[0]==31&&t[1]==139&&t[2]==8?wt(t,e):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?tn(t,e):Ut(t,e)}function Qt(t,e){if(e){for(var n=new ce(t.length),r=0;r<t.length;++r)n[r]=t.charCodeAt(r);return n}if(Xa)return Xa.encode(t);for(var s=t.length,i=new ce(t.length+(t.length>>1)),o=0,a=function(u){i[o++]=u},r=0;r<s;++r){if(o+5>i.length){var c=new ce(o+8+(s-r<<1));c.set(i),i=c}var l=t.charCodeAt(r);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++r)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return dt(i,0,o)}function Xi(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(Ui)return Ui.decode(t);var s=vc(t),i=s.s,n=s.r;return n.length&&ee(8),i}}function wS(t,e,n){n||(n=e,e={}),typeof n!="function"&&ee(7);var r={};Ki(t,"",r,e);var s=Object.keys(r),i=s.length,o=0,a=0,c=i,l=new Array(i),u=[],d=function(){for(var g=0;g<u.length;++g)u[g]()},f=function(g,y){ds(function(){n(g,y)})};ds(function(){f=n});var p=function(){var g=new ce(a+22),y=o,S=a-o;a=0;for(var v=0;v<c;++v){var x=l[v];try{var A=x.c.length;Wn(g,a,x,x.f,x.u,A);var I=30+x.f.length+Jt(x.extra),_=a+I;g.set(x.c,_),Wn(g,o,x,x.f,x.u,A,a,x.m),o+=16+I+(x.m?x.m.length:0),a=_+A}catch(b){return f(b,null)}}Zi(g,o,l.length,S,y),f(null,g)};i||p();for(var m=function(g){var y=s[g],S=r[y],v=S[0],x=S[1],A=Hn(),I=v.length;A.p(v);var _=Qt(y),b=_.length,C=x.comment,P=C&&Qt(C),T=P&&P.length,R=Jt(x.extra),G=x.level==0?0:8,X=function(te,$){if(te)d(),f(te,null);else{var O=$.length;l[g]=xr(x,{size:I,crc:A.d(),c:$,f:_,m:P,u:b!=y.length||P&&C.length!=T,compression:G}),o+=30+b+R+O,a+=76+2*(b+R)+(T||0)+O,--i||p()}};if(b>65535&&X(ee(11,0,1),null),!G)X(null,v);else if(I<16e4)try{X(null,Sn(v,x))}catch(te){X(te,null)}else u.push(hc(v,x,X))},h=0;h<c;++h)m(h);return d}function IS(t,e){e||(e={});var n={},r=[];Ki(t,"",n,e);var s=0,i=0;for(var o in n){var a=n[o],c=a[0],l=a[1],u=l.level==0?0:8,d=Qt(o),f=d.length,p=l.comment,m=p&&Qt(p),h=m&&m.length,g=Jt(l.extra);f>65535&&ee(11);var y=u?Sn(c,l):c,S=y.length,v=Hn();v.p(c),r.push(xr(l,{size:c.length,crc:v.d(),c:y,f:d,m,u:f!=o.length||m&&p.length!=h,o:s,compression:u})),s+=30+f+g+S,i+=76+2*(f+g)+(h||0)+S}for(var x=new ce(i+22),A=s,I=i-s,_=0;_<r.length;++_){var d=r[_];Wn(x,d.o,d,d.f,d.u,d.c.length);var b=30+d.f.length+Jt(d.extra);x.set(d.c,d.o+b),Wn(x,s,d,d.f,d.u,d.c.length,d.o,d.m),s+=16+b+(d.m?d.m.length:0)}return Zi(x,s,r.length,I,A),x}function kS(t,e,n){n||(n=e,e={}),typeof n!="function"&&ee(7);var r=[],s=function(){for(var g=0;g<r.length;++g)r[g]()},i={},o=function(g,y){ds(function(){n(g,y)})};ds(function(){o=n});for(var a=t.length-22;Ae(t,a)!=101010256;--a)if(!a||t.length-a>65558)return o(ee(13,0,1),null),s;var c=Xe(t,a+8);if(c){var l=c,u=Ae(t,a+16),d=Ae(t,a-20)==117853008;if(d){var f=Ae(t,a-12);d=Ae(t,f)==101075792,d&&(l=c=Ae(t,f+32),u=Ae(t,f+48))}for(var p=e&&e.filter,m=function(g){var y=wc(t,u,d),S=y[0],v=y[1],x=y[2],A=y[3],I=y[4],_=y[5],b=_c(t,_);u=I;var C=function(T,R){T?(s(),o(T,null)):(R&&(i[A]=R),--c||o(null,i))};if(!p||p({name:A,size:v,originalSize:x,compression:S}))if(!S)C(null,dt(t,b,b+v));else if(S==8){var P=t.subarray(b,b+v);if(x<524288||v>.8*x)try{C(null,tn(P,{out:new ce(x)}))}catch(T){C(T,null)}else r.push(Yi(P,{size:x},C))}else C(ee(14,"unknown compression type "+S,1),null);else C(null,null)},h=0;h<l;++h)m(h)}else o(null,{});return s}function MS(t,e){for(var n={},r=t.length-22;Ae(t,r)!=101010256;--r)(!r||t.length-r>65558)&&ee(13);var s=Xe(t,r+8);if(!s)return{};var i=Ae(t,r+16),o=Ae(t,r-20)==117853008;if(o){var a=Ae(t,r-12);o=Ae(t,a)==101075792,o&&(s=Ae(t,a+32),i=Ae(t,a+48))}for(var c=e&&e.filter,l=0;l<s;++l){var u=wc(t,i,o),d=u[0],f=u[1],p=u[2],m=u[3],h=u[4],g=u[5],y=_c(t,g);i=h,(!c||c({name:m,size:f,originalSize:p,compression:d}))&&(d?d==8?n[m]=tn(t.subarray(y,y+f),{out:new ce(p)}):ee(14,"unknown compression type "+d):n[m]=dt(t,y,y+f))}return n}var aS,Bn,rs,Ni,cS,lS,ce,Ze,Sr,jn,Vn,hr,Za,Bn,Bi,as,Ja,Qa,Ai,gr,Ft,xe,ut,Lt,xe,xe,xe,xe,zn,xe,ec,tc,nc,rc,ss,lt,is,Gn,dt,uS,sc,ee,br,Ct,Ln,os,cs,Ti,Un,fs,Oi,ic,_t,oc,ac,Hn,ps,gn,xr,Ka,ns,dS,cc,qn,Yn,lc,uc,dc,fc,en,zi,Kn,pt,Xn,Xe,Ae,Mi,be,Wi,ji,pc,Vi,Gi,Hi,ft,mc,Je,qi,Ri,fS,ls,gc,Di,mS,us,Sc,Li,gS,Ki,Xa,Ui,xc,vc,bS,xS,Cc,_c,wc,Ic,Jt,Wn,Zi,yr,vS,CS,_S,Ec,ES,$S,PS,ds,bn=E(()=>{aS=oS("/"),cS=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Bn=aS("worker_threads"),rs=Bn.Worker,Ni=Bn.isMarkedAsUntransferable}catch{}lS=rs?function(t,e,n,r,s){var i=!1,o=new rs(t+cS,{eval:!0}).on("error",function(a){return s(a,null)}).on("message",function(a){return s(null,a)}).on("exit",function(a){a&&!i&&s(new Error("exited with code "+a),null)});return Ni&&(r=r.filter(function(a){return!Ni(a)})),o.postMessage(n,r),o.terminate=function(){return i=!0,rs.prototype.terminate.call(o)},o}:function(t,e,n,r,s){setImmediate(function(){return s(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var i=function(){};return{terminate:i,postMessage:i}},ce=Uint8Array,Ze=Uint16Array,Sr=Int32Array,jn=new ce([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Vn=new ce([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),hr=new ce([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Za=function(t,e){for(var n=new Ze(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new Sr(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Bn=Za(jn,2),Bi=Bn.b,as=Bn.r;Bi[28]=258,as[258]=28;Ja=Za(Vn,0),Qa=Ja.b,Ai=Ja.r,gr=new Ze(32768);for(xe=0;xe<32768;++xe)Ft=(xe&43690)>>1|(xe&21845)<<1,Ft=(Ft&52428)>>2|(Ft&13107)<<2,Ft=(Ft&61680)>>4|(Ft&3855)<<4,gr[xe]=((Ft&65280)>>8|(Ft&255)<<8)>>1;ut=(function(t,e,n){for(var r=t.length,s=0,i=new Ze(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new Ze(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new Ze(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[gr[d]>>c]=l}else for(a=new Ze(r),s=0;s<r;++s)t[s]&&(a[s]=gr[o[t[s]-1]++]>>15-t[s]);return a}),Lt=new ce(288);for(xe=0;xe<144;++xe)Lt[xe]=8;for(xe=144;xe<256;++xe)Lt[xe]=9;for(xe=256;xe<280;++xe)Lt[xe]=7;for(xe=280;xe<288;++xe)Lt[xe]=8;zn=new ce(32);for(xe=0;xe<32;++xe)zn[xe]=5;ec=ut(Lt,9,0),tc=ut(Lt,9,1),nc=ut(zn,5,0),rc=ut(zn,5,1),ss=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},lt=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},is=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Gn=function(t){return(t+7)/8|0},dt=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new ce(t.subarray(e,n))},uS={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},sc=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ee=function(t,e,n){var r=new Error(e||sc[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ee),!n)throw r;return r},br=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new ce(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new ce(s*3));var l=function(oe){var ie=n.length;if(oe>ie){var _e=new ce(Math.max(ie*2,oe));_e.set(n),n=_e}},u=e.f||0,d=e.p||0,f=e.b||0,p=e.l,m=e.d,h=e.m,g=e.n,y=s*8;do{if(!p){u=lt(t,d,1);var S=lt(t,d+1,3);if(d+=3,S)if(S==1)p=tc,m=rc,h=9,g=5;else if(S==2){var I=lt(t,d,31)+257,_=lt(t,d+10,15)+4,b=I+lt(t,d+5,31)+1;d+=14;for(var C=new ce(b),P=new ce(19),T=0;T<_;++T)P[hr[T]]=lt(t,d+T*3,7);d+=_*3;for(var R=ss(P),G=(1<<R)-1,X=ut(P,R,1),T=0;T<b;){var te=X[lt(t,d,G)];d+=te&15;var v=te>>4;if(v<16)C[T++]=v;else{var $=0,O=0;for(v==16?(O=3+lt(t,d,3),d+=2,$=C[T-1]):v==17?(O=3+lt(t,d,7),d+=3):v==18&&(O=11+lt(t,d,127),d+=7);O--;)C[T++]=$}}var w=C.subarray(0,I),D=C.subarray(I);h=ss(w),g=ss(D),p=ut(w,h,1),m=ut(D,g,1)}else ee(1);else{var v=Gn(d)+4,x=t[v-4]|t[v-3]<<8,A=v+x;if(A>s){c&&ee(0);break}a&&l(f+x),n.set(t.subarray(v,A),f),e.b=f+=x,e.p=d=A*8,e.f=u;continue}if(d>y){c&&ee(0);break}}a&&l(f+131072);for(var z=(1<<h)-1,Z=(1<<g)-1,J=d;;J=d){var $=p[is(t,d)&z],F=$>>4;if(d+=$&15,d>y){c&&ee(0);break}if($||ee(2),F<256)n[f++]=F;else if(F==256){J=d,p=null;break}else{var j=F-254;if(F>264){var T=F-257,W=jn[T];j=lt(t,d,(1<<W)-1)+Bi[T],d+=W}var V=m[is(t,d)&Z],L=V>>4;V||ee(3),d+=V&15;var D=Qa[L];if(L>3){var W=Vn[L];D+=is(t,d)&(1<<W)-1,d+=W}if(d>y){c&&ee(0);break}a&&l(f+131072);var H=f+j;if(f<D){var q=i-D,Y=Math.min(D,H);for(q+f<0&&ee(3);f<Y;++f)n[f]=r[q+f]}for(;f<H;++f)n[f]=n[f-D]}}e.l=p,e.p=J,e.b=f,e.f=u,p&&(u=1,e.m=h,e.d=m,e.n=g)}while(!u);return f!=n.length&&o?dt(n,0,f):n.subarray(0,f)},Ct=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Ln=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},os=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:_t,l:0};if(s==1){var o=new ce(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(A,I){return A.f-I.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var f=i[0].s,r=1;r<s;++r)i[r].s>f&&(f=i[r].s);var p=new Ze(f+1),m=cs(n[u-1],p,0);if(m>e){var r=0,h=0,g=m-e,y=1<<g;for(i.sort(function(I,_){return p[_.s]-p[I.s]||I.f-_.f});r<s;++r){var S=i[r].s;if(p[S]>e)h+=y-(1<<m-p[S]),p[S]=e;else break}for(h>>=g;h>0;){var v=i[r].s;p[v]<e?h-=1<<e-p[v]++-1:++r}for(;r>=0&&h;--r){var x=i[r].s;p[x]==e&&(--p[x],++h)}m=e}return{t:new ce(p),l:m}},cs=function(t,e,n){return t.s==-1?Math.max(cs(t.l,e,n+1),cs(t.r,e,n+1)):e[t.s]=n},Ti=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new Ze(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},Un=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},fs=function(t,e,n){var r=n.length,s=Gn(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},Oi=function(t,e,n,r,s,i,o,a,c,l,u){Ct(e,u++,n),++s[256];for(var d=os(s,15),f=d.t,p=d.l,m=os(i,15),h=m.t,g=m.l,y=Ti(f),S=y.c,v=y.n,x=Ti(h),A=x.c,I=x.n,_=new Ze(19),b=0;b<S.length;++b)++_[S[b]&31];for(var b=0;b<A.length;++b)++_[A[b]&31];for(var C=os(_,7),P=C.t,T=C.l,R=19;R>4&&!P[hr[R-1]];--R);var G=l+5<<3,X=Un(s,Lt)+Un(i,zn)+o,te=Un(s,f)+Un(i,h)+o+14+3*R+Un(_,P)+2*_[16]+3*_[17]+7*_[18];if(c>=0&&G<=X&&G<=te)return fs(e,u,t.subarray(c,c+l));var $,O,w,D;if(Ct(e,u,1+(te<X)),u+=2,te<X){$=ut(f,p,0),O=f,w=ut(h,g,0),D=h;var z=ut(P,T,0);Ct(e,u,v-257),Ct(e,u+5,I-1),Ct(e,u+10,R-4),u+=14;for(var b=0;b<R;++b)Ct(e,u+3*b,P[hr[b]]);u+=3*R;for(var Z=[S,A],J=0;J<2;++J)for(var F=Z[J],b=0;b<F.length;++b){var j=F[b]&31;Ct(e,u,z[j]),u+=P[j],j>15&&(Ct(e,u,F[b]>>5&127),u+=F[b]>>12)}}else $=ec,O=Lt,w=nc,D=zn;for(var b=0;b<a;++b){var W=r[b];if(W>255){var j=W>>18&31;Ln(e,u,$[j+257]),u+=O[j+257],j>7&&(Ct(e,u,W>>23&31),u+=jn[j]);var V=W&31;Ln(e,u,w[V]),u+=D[V],V>3&&(Ln(e,u,W>>5&8191),u+=Vn[V])}else Ln(e,u,$[W]),u+=O[W]}return Ln(e,u,$[256]),u+O[256]},ic=new Sr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),_t=new ce(0),oc=function(t,e,n,r,s,i){var o=i.z||t.length,a=new ce(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=ic[e-1],f=d>>13,p=d&8191,m=(1<<n)-1,h=i.p||new Ze(32768),g=i.h||new Ze(m+1),y=Math.ceil(n/3),S=2*y,v=function(je){return(t[je]^t[je+1]<<y^t[je+2]<<S)&m},x=new Sr(25e3),A=new Ze(288),I=new Ze(32),_=0,b=0,C=i.i||0,P=0,T=i.w||0,R=0;C+2<o;++C){var G=v(C),X=C&32767,te=g[G];if(h[X]=te,g[G]=X,T<=C){var $=o-C;if((_>7e3||P>24576)&&($>423||!l)){u=Oi(t,c,0,x,A,I,b,P,R,C-R,u),P=_=b=0,R=C;for(var O=0;O<286;++O)A[O]=0;for(var O=0;O<30;++O)I[O]=0}var w=2,D=0,z=p,Z=X-te&32767;if($>2&&G==v(C-Z))for(var J=Math.min(f,$)-1,F=Math.min(32767,C),j=Math.min(258,$);Z<=F&&--z&&X!=te;){if(t[C+w]==t[C+w-Z]){for(var W=0;W<j&&t[C+W]==t[C+W-Z];++W);if(W>w){if(w=W,D=Z,W>J)break;for(var V=Math.min(Z,W-2),L=0,O=0;O<V;++O){var H=C-Z+O&32767,q=h[H],Y=H-q&32767;Y>L&&(L=Y,te=H)}}}X=te,te=h[X],Z+=X-te&32767}if(D){x[P++]=268435456|as[w]<<18|Ai[D];var oe=as[w]&31,ie=Ai[D]&31;b+=jn[oe]+Vn[ie],++A[257+oe],++I[ie],T=C+w,++_}else x[P++]=t[C],++A[t[C]]}}for(C=Math.max(C,T);C<o;++C)x[P++]=t[C],++A[t[C]];u=Oi(t,c,l,x,A,I,b,P,R,C-R,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=g,i.p=h,i.i=C,i.w=T)}else{for(var C=i.w||0;C<o+l;C+=65535){var _e=C+65535;_e>=o&&(c[u/8|0]=l,_e=o),u=fs(c,u+1,t.subarray(C,_e))}i.i=o}return dt(a,0,r+Gn(u)+s)},ac=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),Hn=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=ac[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},ps=function(){var t=1,e=0;return{p:function(n){for(var r=t,s=e,i=n.length|0,o=0;o!=i;){for(var a=Math.min(o+2655,i);o<a;++o)s+=r+=n[o];r=(r&65535)+15*(r>>16),s=(s&65535)+15*(s>>16)}t=r,e=s},d:function(){return t%=65521,e%=65521,(t&255)<<24|(t&65280)<<8|(e&255)<<8|e>>8}}},gn=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new ce(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return oc(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},xr=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},Ka=function(t,e,n){for(var r=t(),s=t.toString(),i=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<r.length;++o){var a=r[o],c=i[o];if(typeof a=="function"){e+=";"+c+"=";var l=a.toString();if(a.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;e+=l.slice(u,l.indexOf("(",u))}else{e+=l;for(var d in a.prototype)e+=";"+c+".prototype."+d+"="+a.prototype[d].toString()}else e+=l}else n[c]=a}return e},ns=[],dS=function(t){var e=[];for(var n in t)t[n].buffer&&e.push((t[n]=new t[n].constructor(t[n])).buffer);return e},cc=function(t,e,n,r){if(!ns[n]){for(var s="",i={},o=t.length-1,a=0;a<o;++a)s=Ka(t[a],s,i);ns[n]={c:Ka(t[o],s,i),e:i}}var c=xr({},ns[n].e);return lS(ns[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",n,c,dS(c),r)},qn=function(){return[ce,Ze,Sr,jn,Vn,hr,Bi,Qa,tc,rc,gr,sc,ut,ss,lt,is,Gn,dt,ee,br,tn,en,zi]},Yn=function(){return[ce,Ze,Sr,jn,Vn,hr,as,Ai,ec,Lt,nc,zn,gr,ic,_t,ut,Ct,Ln,os,cs,Ti,Un,fs,Oi,Gn,dt,oc,gn,Sn,en]},lc=function(){return[Wi,Vi,be,Hn,ac]},uc=function(){return[ji,pc]},dc=function(){return[Gi,be,ps]},fc=function(){return[Hi]},en=function(t){return postMessage(t,[t.buffer])},zi=function(t){return t&&{out:t.size&&new ce(t.size),dictionary:t.dictionary}},Kn=function(t,e,n,r,s,i){var o=cc(n,r,s,function(a,c){o.terminate(),i(a,c)});return o.postMessage([t,e],e.consume?[t.buffer]:[]),function(){o.terminate()}},pt=function(t){return t.ondata=function(e,n){return postMessage([e,n],[e.buffer])},function(e){e.data[0]?(t.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):t.flush(e.data[1])}},Xn=function(t,e,n,r,s,i,o){var a,c=cc(t,r,s,function(l,u){l?(c.terminate(),e.ondata.call(e,l)):Array.isArray(u)?u.length==1?(e.queuedSize-=u[0],e.ondrain&&e.ondrain(u[0])):(u[1]&&c.terminate(),e.ondata.call(e,l,u[0],u[1])):o(u)});c.postMessage(n),e.queuedSize=0,e.push=function(l,u){e.ondata||ee(5),a&&e.ondata(ee(4,0,1),null,!!u),e.queuedSize+=l.length,c.postMessage([l,a=u],l.buffer instanceof ArrayBuffer?[l.buffer]:[])},e.terminate=function(){c.terminate()},i&&(e.flush=function(l){c.postMessage([0,l])})},Xe=function(t,e){return t[e]|t[e+1]<<8},Ae=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Mi=function(t,e){return Ae(t,e)+Ae(t,e+4)*4294967296},be=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},Wi=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&be(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},ji=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&ee(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},pc=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},Vi=function(t){return 10+(t.filename?t.filename.length+1:0)},Gi=function(t,e){var n=e.level,r=n==0?0:n<6?1:n==9?3:2;if(t[0]=120,t[1]=r<<6|(e.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,e.dictionary){var s=ps();s.p(e.dictionary),be(t,2,s.d())}},Hi=function(t,e){return((t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31)&&ee(6,"invalid zlib data"),(t[1]>>5&1)==+!e&&ee(6,"invalid zlib data: "+(t[1]&32?"need":"unexpected")+" dictionary"),(t[1]>>3&4)+2};ft=(function(){function t(e,n){if(typeof e=="function"&&(n=e,e={}),this.ondata=n,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new ce(98304),this.o.dictionary){var r=this.o.dictionary.subarray(-32768);this.b.set(r,32768-r.length),this.s.i=32768-r.length}}return t.prototype.p=function(e,n){this.ondata(gn(e,this.o,0,0,this.s),n)},t.prototype.push=function(e,n){this.ondata||ee(5),this.s.l&&ee(4);var r=e.length+this.s.z;if(r>this.b.length){if(r>2*this.b.length-32768){var s=new ce(r&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var i=this.b.length-this.s.z;this.b.set(e.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(i),32768),this.s.z=e.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2),n&&(this.s=this.o={},this.b=_t)},t.prototype.flush=function(e){if(this.ondata||ee(5),this.s.l&&ee(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var n=new ce(6);n[0]=this.s.r>>3;var r=fs(n,this.s.r,_t);this.s.r=0,this.ondata(n.subarray(0,r>>3),!1)}},t})(),mc=(function(){function t(e,n){Xn([Yn,function(){return[pt,ft]}],this,yn.call(this,e,n),function(r){var s=new ft(r.data);onmessage=pt(s)},6,1)}return t})();Je=(function(){function t(e,n){typeof e=="function"&&(n=e,e={}),this.ondata=n;var r=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:r?r.length:0},this.o=new ce(32768),this.p=new ce(0),r&&this.o.set(r)}return t.prototype.e=function(e){if(this.ondata||ee(5),this.d&&ee(4),!this.p.length)this.p=e;else if(e.length){var n=new ce(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length),this.p=n}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var n=this.s.b,r=br(this.p,this.s,this.o);this.ondata(dt(r,n,this.s.b),this.d),this.o=dt(r,this.s.b-32768),this.s.b=this.o.length,this.p=dt(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,n){this.e(e),this.c(n)},t})(),qi=(function(){function t(e,n){Xn([qn,function(){return[pt,Je]}],this,yn.call(this,e,n),function(r){var s=new Je(r.data);onmessage=pt(s)},7,0)}return t})();Ri=(function(){function t(e,n){this.c=Hn(),this.l=0,this.v=1,ft.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),this.l+=e.length,ft.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=gn(e,this.o,this.v&&Vi(this.o),n&&8,this.s);this.v&&(Wi(r,this.o),this.v=0),n&&(be(r,r.length-8,this.c.d()),be(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(e){ft.prototype.flush.call(this,e)},t})(),fS=(function(){function t(e,n){Xn([Yn,lc,function(){return[pt,ft,Ri]}],this,yn.call(this,e,n),function(r){var s=new Ri(r.data);onmessage=pt(s)},8,1)}return t})();ls=(function(){function t(e,n){this.v=1,this.r=0,Je.call(this,e,n)}return t.prototype.push=function(e,n){if(Je.prototype.e.call(this,e),this.r+=e.length,this.v){var r=this.p.subarray(this.v-1),s=r.length>3?ji(r):4;if(s>r.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-r.length);this.p=r.subarray(s),this.v=0}Je.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=Gn(this.s.p)+9,this.s={i:0},this.o=new ce(0),this.push(new ce(0),n)):n&&Je.prototype.c.call(this,n)},t})(),gc=(function(){function t(e,n){var r=this;Xn([qn,uc,function(){return[pt,Je,ls]}],this,yn.call(this,e,n),function(s){var i=new ls(s.data);i.onmember=function(o){return postMessage(o)},onmessage=pt(i)},9,0,function(s){return r.onmember&&r.onmember(s)})}return t})();Di=(function(){function t(e,n){this.c=ps(),this.v=1,ft.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),ft.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=gn(e,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(Gi(r,this.o),this.v=0),n&&be(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(e){ft.prototype.flush.call(this,e)},t})(),mS=(function(){function t(e,n){Xn([Yn,dc,function(){return[pt,ft,Di]}],this,yn.call(this,e,n),function(r){var s=new Di(r.data);onmessage=pt(s)},10,1)}return t})();us=(function(){function t(e,n){Je.call(this,e,n),this.v=e&&e.dictionary?2:1}return t.prototype.push=function(e,n){if(Je.prototype.e.call(this,e),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(Hi(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&ee(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Je.prototype.c.call(this,n)},t})(),Sc=(function(){function t(e,n){Xn([qn,fc,function(){return[pt,Je,us]}],this,yn.call(this,e,n),function(r){var s=new us(r.data);onmessage=pt(s)},11,0)}return t})();Li=(function(){function t(e,n){this.o=yn.call(this,e,n)||{},this.G=ls,this.I=Je,this.Z=us}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r){e.ondata(n,r)}},t.prototype.push=function(e,n){if(this.ondata||ee(5),this.s)this.s.push(e,n);else{if(this.p&&this.p.length){var r=new ce(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,n),this.p=null)}},t})(),gS=(function(){function t(e,n){Li.call(this,e,n),this.queuedSize=0,this.G=gc,this.I=qi,this.Z=Sc}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r,s){e.ondata(n,r,s)},this.s.ondrain=function(n){e.queuedSize-=n,e.ondrain&&e.ondrain(n)}},t.prototype.push=function(e,n){this.queuedSize+=e.length,Li.prototype.push.call(this,e,n)},t})();Ki=function(t,e,n,r){for(var s in t){var i=t[s],o=e+s,a=r;Array.isArray(i)&&(a=xr(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[o]=[i,a]:(n[o+="/"]=[new ce(0),a],Ki(i,o,n,r))}},Xa=typeof TextEncoder<"u"&&new TextEncoder,Ui=typeof TextDecoder<"u"&&new TextDecoder,xc=0;try{Ui.decode(_t,{stream:!0}),xc=1}catch{}vc=function(t){for(var e="",n=0;;){var r=t[n++],s=(r>127)+(r>223)+(r>239);if(n+s>t.length)return{s:e,r:dt(t,n-1)};s?s==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}},bS=(function(){function t(e){this.ondata=e,xc?this.t=new TextDecoder:this.p=_t}return t.prototype.push=function(e,n){if(this.ondata||ee(5),n=!!n,this.t){this.ondata(this.t.decode(e,{stream:!0}),n),n&&(this.t.decode().length&&ee(8),this.t=null);return}this.p||ee(4);var r=new ce(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length);var s=vc(r),i=s.s,o=s.r;n?(o.length&&ee(8),this.p=null):this.p=o,this.ondata(i,n)},t})(),xS=(function(){function t(e){this.ondata=e}return t.prototype.push=function(e,n){this.ondata||ee(5),this.d&&ee(4),this.ondata(Qt(e),this.d=n||!1)},t})();Cc=function(t){return t==1?3:t<6?2:t==9?1:0},_c=function(t,e){return e+30+Xe(t,e+26)+Xe(t,e+28)},wc=function(t,e,n){var r=Xe(t,e+28),s=Xe(t,e+30),i=Xi(t.subarray(e+46,e+46+r),!(Xe(t,e+8)&2048)),o=e+46+r,a=Ic(t,o,s,n,Ae(t,e+20),Ae(t,e+24),Ae(t,e+42)),c=a[0],l=a[1],u=a[2];return[Xe(t,e+10),c,l,i,o+s+Xe(t,e+32),u]},Ic=function(t,e,n,r,s,i,o){var a=s==4294967295,c=i==4294967295,l=o==4294967295,u=e+n,d=a+c+l;if(r&&d){for(;e+4<u;e+=4+Xe(t,e+2))if(Xe(t,e)==1)return[a?Mi(t,e+4+8*c):s,c?Mi(t,e+4):i,l?Mi(t,e+4+8*(c+a)):o,1];r<2&&ee(13)}return[s,i,o,0]},Jt=function(t){var e=0;if(t)for(var n in t){var r=t[n].length;r>65535&&ee(9),e+=r+4}return e},Wn=function(t,e,n,r,s,i,o,a){var c=r.length,l=n.extra,u=a&&a.length,d=Jt(l);be(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(i<0&&8),t[e++]=s&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&ee(10),be(t,e,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),e+=4,i!=-1&&(be(t,e,n.crc),be(t,e+4,i<0?-i-2:i),be(t,e+8,n.size)),be(t,e+12,c),be(t,e+14,d),e+=16,o!=null&&(be(t,e,u),be(t,e+6,n.attrs),be(t,e+10,o),e+=14),t.set(r,e),e+=c,d)for(var m in l){var h=l[m],g=h.length;be(t,e,+m),be(t,e+2,g),t.set(h,e+4),e+=4+g}return u&&(t.set(a,e),e+=u),e},Zi=function(t,e,n,r,s){be(t,e,101010256),be(t,e+8,n),be(t,e+10,n),be(t,e+12,r),be(t,e+16,s)},yr=(function(){function t(e){this.filename=e,this.c=Hn(),this.size=0,this.compression=0}return t.prototype.process=function(e,n){this.ondata(null,e,n)},t.prototype.push=function(e,n){this.ondata||ee(5),this.c.p(e),this.size+=e.length,n&&(this.crc=this.c.d()),this.process(e,n||!1)},t})(),vS=(function(){function t(e,n){var r=this;n||(n={}),yr.call(this,e),this.d=new ft(n,function(s,i){r.ondata(null,s,i)}),this.compression=8,this.flag=Cc(n.level)}return t.prototype.process=function(e,n){try{this.d.push(e,n)}catch(r){this.ondata(r,null,n)}},t.prototype.push=function(e,n){yr.prototype.push.call(this,e,n)},t})(),CS=(function(){function t(e,n){var r=this;n||(n={}),yr.call(this,e),this.d=new mc(n,function(s,i,o){r.ondata(s,i,o)}),this.compression=8,this.flag=Cc(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(e,n){this.d.push(e,n)},t.prototype.push=function(e,n){yr.prototype.push.call(this,e,n)},t})(),_S=(function(){function t(e){this.ondata=e,this.u=[],this.d=1}return t.prototype.add=function(e){var n=this;if(this.ondata||ee(5),this.d&2)this.ondata(ee(4+(this.d&1)*8,0,1),null,!1);else{var r=Qt(e.filename),s=r.length,i=e.comment,o=i&&Qt(i),a=s!=e.filename.length||o&&i.length!=o.length,c=s+Jt(e.extra)+30;s>65535&&this.ondata(ee(11,0,1),null,!1);var l=new ce(c);Wn(l,0,e,r,a,-1);var u=[l],d=function(){for(var g=0,y=u;g<y.length;g++){var S=y[g];n.ondata(null,S,!1)}u=[]},f=this.d;this.d=0;var p=this.u.length,m=xr(e,{f:r,u:a,o,t:function(){e.terminate&&e.terminate()},r:function(){if(d(),f){var g=n.u[p+1];g?g.r():n.d=1}f=1}}),h=0;e.ondata=function(g,y,S){if(g)n.ondata(g,y,S),n.terminate();else if(h+=y.length,u.push(y),S){var v=new ce(16);be(v,0,134695760),be(v,4,e.crc),be(v,8,h),be(v,12,e.size),u.push(v),m.c=h,m.b=c+h+16,m.crc=e.crc,m.size=e.size,f&&m.r(),f=1}else f&&d()},this.u.push(m)}},t.prototype.end=function(){var e=this;if(this.d&2){this.ondata(ee(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var e=0,n=0,r=0,s=0,i=this.u;s<i.length;s++){var o=i[s];r+=46+o.f.length+Jt(o.extra)+(o.o?o.o.length:0)}for(var a=new ce(r+22),c=0,l=this.u;c<l.length;c++){var o=l[c];Wn(a,e,o,o.f,o.u,-o.c-2,n,o.o),e+=46+o.f.length+Jt(o.extra)+(o.o?o.o.length:0),n+=o.b}Zi(a,e,this.u.length,r,n),this.ondata(null,a,!0),this.d=2},t.prototype.terminate=function(){for(var e=0,n=this.u;e<n.length;e++){var r=n[e];r.t()}this.d=2},t})();Ec=(function(){function t(){}return t.prototype.push=function(e,n){this.ondata(null,e,n)},t.compression=0,t})(),ES=(function(){function t(){var e=this;this.i=new Je(function(n,r){e.ondata(null,n,r)})}return t.prototype.push=function(e,n){try{this.i.push(e,n)}catch(r){this.ondata(r,null,n)}},t.compression=8,t})(),$S=(function(){function t(e,n){var r=this;n<32e4?this.i=new Je(function(s,i){r.ondata(null,s,i)}):(this.i=new qi(function(s,i,o){r.ondata(s,i,o)}),this.terminate=this.i.terminate)}return t.prototype.push=function(e,n){this.i.terminate&&(e=dt(e,0)),this.i.push(e,n)},t.compression=8,t})(),PS=(function(){function t(e){this.onfile=e,this.k=[],this.o={0:Ec},this.p=_t}return t.prototype.push=function(e,n){var r=this;if(this.onfile||ee(5),this.p||ee(4),this.c>0){var s=Math.min(this.c,e.length),i=e.subarray(0,s);if(this.c-=s,this.d?this.d.push(i,!this.c):this.k[0].push(i),e=e.subarray(s),e.length)return this.push(e,n)}else{var o=0,a=0,c=void 0,l=void 0;this.p.length?e.length?(l=new ce(this.p.length+e.length),l.set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var u=l.length,d=this.c,f=d&&this.d,p=function(){var y=Ae(l,a);if(y==67324752){o=1,c=a,m.d=null,m.c=0;var S=Xe(l,a+6),v=Xe(l,a+8),x=S&2048,A=S&8,I=Xe(l,a+26),_=Xe(l,a+28);if(u>a+30+I+_){var b=[];m.k.unshift(b),o=2;var C=Ae(l,a+18),P=Ae(l,a+22),T=Xi(l.subarray(a+30,a+=30+I),!x),R=Ic(l,a,_,2,C,P,0),G=R[0],X=R[1],te=R[3];A&&(G=-1-te),a+=_,m.c=G;var $,O={name:T,compression:v,start:function(){if(O.ondata||ee(5),!G)O.ondata(null,_t,!0);else{var w=r.o[v];w||O.ondata(ee(14,"unknown compression type "+v,1),null,!1),$=G<0?new w(T):new w(T,G,X),$.ondata=function(J,F,j){O.ondata(J,F,j)};for(var D=0,z=b;D<z.length;D++){var Z=z[D];$.push(Z,!1)}r.k[0]==b&&r.c?r.d=$:$.push(_t,!0)}},terminate:function(){$&&$.terminate&&$.terminate()}};G>=0&&(O.size=G,O.originalSize=X),m.onfile(O)}return"break"}else if(d){if(y==134695760)return c=a+=12+(d==-2&&8),o=3,m.c=0,"break";if(y==33639248)return c=a-=4,o=3,m.c=0,"break"}},m=this;a<u-4;++a){var h=p();if(h==="break")break}if(this.p=_t,d<0){var g=o?l.subarray(0,c-12-(d==-2&&8)-(Ae(l,c-16)==134695760&&4)):l.subarray(0,a);f?f.push(g,!!o):this.k[+(o==2)].push(g)}if(o&2)return this.push(l.subarray(a),n);this.p=l.subarray(a)}n&&(this.c&&ee(13),this.p=null)},t.prototype.register=function(e){this.o[e.compression]=e},t})(),ds=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()}});function NS(t){let e=Buffer.from(hn(t));return Buffer.concat([ms,e])}function Pc(t){if(!t.subarray(0,ms.length).equals(ms))return null;try{return Buffer.from(wt(t.subarray(ms.length)))}catch{return null}}var ms,kc,Mc,Nc=E(()=>{"use strict";bn();re();ms=Buffer.from("BZhVFS\0");kc={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.includes("-d")||n.includes("--decompress"),a=n.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=U(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=Pc(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let f=c.slice(0,-4);return t.vfs.writeFile(f,d,{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,NS(l),{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}},Mc={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=U(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=Pc(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},r,s),i||t.vfs.remove(a,{recursive:!1},r,s),{exitCode:0}}}});var Ac,Tc=E(()=>{"use strict";Q();re();Ac={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s,uid:i,gid:o})=>{let a=k(r,["-n","--number"]),c=k(r,["-b","--number-nonblank"]),l=r.filter(m=>!m.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let m of l){let h=Ta(e.vfs,n,m);qe(e.vfs,e.users,t,h,4),u.push(e.vfs.readFile(h,i,o))}let d=u.join("");if(!(a||c))return{stdout:d,exitCode:0};let f=1;return{stdout:d.split(`
`).map(m=>c&&m.trim()===""?m:`${String(f++).padStart(6)}	${m}`).join(`
`),exitCode:0}}}});var hs=E(()=>{"use strict";Zt();Ke()});async function gs(t,e,n,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let f=t[u];if(f.subshell){let m={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await gs(f.subshell.statements,e,n,r,l,i,m),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(f.group){if(a=await gs(f.group.statements,e,n,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(f.background&&f.pipeline){let m=new AbortController;Oc(f.pipeline,e,n,"background",l,i,o,m),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!f.pipeline){u++;continue}if(a=await Oc(f.pipeline,e,n,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let p=f.op;if(!(!p||p===";")){if(p==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(p==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l===s?void 0:l}}function Oc(t,e,n,r,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?AS(t.commands[0],e,n,r,s,i,c,a):TS(t.commands,e,n,r,s,i,c)}async function AS(t,e,n,r,s,i,o,a){let c;if(t.hereString!==void 0)c=t.hereString;else if(t.inputFile){let d=U(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await xn(t.name,t.args,e,n,r,s,i,c,o,l,a);if(t.outputFile){let d=U(s,t.outputFile),f=u.stdout||"",p=i.users.getUid(e),m=i.users.getGid(e);try{if(t.appendOutput){let h=(()=>{try{return i.vfs.readFile(d,p,m)}catch{return""}})();i.vfs.writeFile(d,h+f,{},p,m)}else i.vfs.writeFile(d,f,{},p,m);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function TS(t,e,n,r,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let p=U(s,u.inputFile);try{a=i.vfs.readFile(p)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await xn(u.name,u.args,e,n,r,s,i,a,o);c=d.exitCode??0;let f=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&f.stderr){let p=U(s,u.stderrFile),m=i.users.getUid(e),h=i.users.getGid(e);try{let g=(()=>{try{return i.vfs.readFile(p,m,h)}catch{return""}})();i.vfs.writeFile(p,u.stderrAppend?g+f.stderr:f.stderr,{},m,h)}catch{}}if(l===t.length-1&&u.outputFile){let p=U(s,u.outputFile),m=d.stdout||"",h=i.users.getUid(e),g=i.users.getGid(e);try{if(u.appendOutput){let y=(()=>{try{return i.vfs.readFile(p,h,g)}catch{return""}})();i.vfs.writeFile(p,y+m,{},h,g)}else i.vfs.writeFile(p,m,{},h,g);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=f.stdout||"";if(f.stderr&&c!==0)return{stderr:f.stderr,exitCode:c};if(f.closeSession||f.switchUser)return f}return{stdout:a,exitCode:c}}var Rc=E(()=>{"use strict";hs();re()});function Cr(t){let e=[],n="",r=!1,s="",i=0;for(;i<t.length;){let o=t.charAt(i),a=t[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(e.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){n&&e.push(n),n="",e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){n&&e.push(n),n="",e.push("2>&1"),i+=4;continue}if(c===">"){n&&e.push(n),n="",e.push("2>>"),i+=3;continue}n&&e.push(n),n="",e.push("2>"),i+=2;continue}if(o==="|"&&a==="&"){n&&e.push(n),n="",e.push("|&"),i+=2;continue}if(o==="<"&&a==="<"){let c=t[i+2];if(c==="<"){n&&e.push(n),n="",e.push("<<<"),i+=3;continue}if(c==="-"){n&&e.push(n),n="",e.push("<<-"),i+=3;continue}n&&e.push(n),n="",e.push("<<"),i+=2;continue}if(o==="<"&&a===">"){n&&e.push(n),n="",e.push("<>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}n+=o,i++}return n&&e.push(n),e}var to=E(()=>{"use strict"});function OS(t,e){let n=!1,r=!1;for(let s=0;s<e&&s<t.length;s++){let i=t[s];i==="'"&&!r?n=!n:i==='"'&&!n&&(r=!r)}return n||r}function ys(t){if(!t.includes("<<"))return t;let e=t.split(`
`),n=[],r=0;for(;r<e.length;){let s=e[r],i=s.match(/^(.*?)(?<!<)<<(?!<)(-?)\s+(\S+)(.*)$/);if(i){let o=i[1]??"",a=o.length;if(OS(s,a)){n.push(s),r++;continue}let c=(i[2]??"")==="-",l=i[3]??"",u=i[4]??"",d=[];for(r++;r<e.length;){let m=c?e[r].replace(/^\t+/,""):e[r];if(m===l)break;d.push(m),r++}let p=d.join(`
`).replace(/'/g,"'\\''");n.push(`${o}<<< '${p}'${u}`)}else n.push(s);r++}return n.join(`
`)}function Dc(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{let n=ys(e);return{statements:no(n),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function no(t){let e=RS(t),n=[];for(let r of e){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:no(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:no(o)}}else{let o=DS(s);i.pipeline=o}n.push(i)}return n}function RS(t){let e=[],n="",r=0,s=!1,i="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t.charAt(o),l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,n+=c,o++;continue}if(s&&c===i){s=!1,n+=c,o++;continue}if(s){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function DS(t){let e=FS(t);return{commands:e.map(LS),isValid:!0,pipeStderr:e.rawPipeStderr}}function FS(t){let e=[],n="",r=!1,s="",i=!1;for(let a=0;a<t.length;a++){let c=t.charAt(a);if((c==='"'||c==="'")&&!r){r=!0,s=c,n+=c;continue}if(r&&c===s){r=!1,n+=c;continue}if(r){n+=c;continue}if(c==="|"&&t[a+1]==="&"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n="",i=!0,a++;continue}if(c==="|"&&t[a+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n="";continue}n+=c}let o=n.trim();if(!o&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return o&&e.push(o),e.rawPipeStderr=i,e}function LS(t){let e=Cr(t);if(e.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,c=!1,l=!1,u,d,f,p=!1;for(;o<e.length;){let g=e[o];if(g==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(g==="<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<");f=e[o],o++}else if(g==="<<-"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<-");f=e[o],p=!0,o++}else if(g==="<<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected word after <<<");let y=e[o];d=y.startsWith("'")&&y.endsWith("'")&&y.length>=2?y.slice(1,-1):y,o++}else if(g==="<>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <>");u=e[o],o++}else if(g===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(g===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(g==="&>"||g==="&>>"){let y=g==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${g}`);s=e[o],i=y,l=!0,o++}else if(g==="2>&1")l=!0,o++;else if(g==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(g==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(g),o++}let m=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(m)?m:m.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l,readWriteFile:u,hereString:d,hereDoc:f,hereDocStripTab:p}}var ro=E(()=>{"use strict";to()});var Bc={};Kr(Bc,{applyUserSwitch:()=>Bt,makeDefaultEnv:()=>mt,runCommand:()=>ye,runCommandDirect:()=>xn,userHome:()=>pe});function pe(t){return t==="root"?"/root":`/home/${t}`}async function Bt(t,e,n,r,s){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=pe(t),r.vars.PS1=mt(t,e).vars.PS1??"";let i=`${pe(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await ye(a,t,e,"shell",n,s,void 0,r)}catch{}}}function mt(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:pe(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Lc(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}function Uc(t,e,n,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let m=Ve(f[1]);if(m){let h=c.users.getUid(s),g=c.users.getGid(s);return m.run({authUser:s,uid:h,gid:g,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${f[1]}' not found`,exitCode:127}}let p=Ve("sh");if(p){let m=c.users.getUid(s),h=c.users.getGid(s);return p.run({authUser:s,uid:m,gid:h,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}function xn(t,e,n,r,s,i,o,a,c,l=!1,u){if(zt++,zt>Ss)return zt--,{stderr:`${t}: maximum call depth (${Ss}) exceeded`,exitCode:126};let d=zt===1,f=1,p=c.vars.NICE_PRIORITY?Number.parseInt(c.vars.NICE_PRIORITY,10):0,m=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u,f,Number.isNaN(p)?0:p):-1,h=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let g=qS(t,e,n,r,s,i,o,a,c);if(u){let y=new Promise(S=>{u.signal.addEventListener("abort",()=>{S({stderr:"",exitCode:130})},{once:!0})});return Promise.race([g,y])}return g}finally{zt--,d&&m!==-1&&(o.users.addProcessCpuTime(m,Date.now()-h),l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function qS(t,e,n,r,s,i,o,a,c){let l=Fc,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let h=u.slice(0,d).map(S=>S.match(l)).filter(S=>S!==null),g=u.slice(d),y=[];for(let[,S,v]of h)S!==void 0&&v!==void 0&&(y.push([S,c.vars[S]]),c.vars[S]=v);if(g.length===0)return{exitCode:0};try{return await xn(g[0],g.slice(1),n,r,s,i,o,a,c)}finally{for(let[S,v]of y)v===void 0?delete c.vars[S]:c.vars[S]=v}}let f=c.vars[`__func_${t}`];if(f){let h=Ve("sh");if(!h)return{stderr:`${t}: sh not available`,exitCode:127};let g={};e.forEach((y,S)=>{g[String(S+1)]=c.vars[String(S+1)],c.vars[String(S+1)]=y}),g[0]=c.vars[0],c.vars[0]=t;try{let y=o.users.getUid(n),S=o.users.getGid(n);return await h.run({authUser:n,uid:y,gid:S,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:f,mode:s,args:["-c",f],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[y,S]of Object.entries(g))S===void 0?delete c.vars[y]:c.vars[y]=S}}let p=c.vars[`__alias_${t}`];if(p)return ye(`${p} ${e.join(" ")}`,n,r,s,i,o,a,c);let m=Ve(t);if(!m){let h=Lc(t,c,o,n);return h?Uc(h,t,e,[t,...e].join(" "),n,r,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let h=o.users.getUid(n),g=o.users.getGid(n);return await m.run({authUser:n,uid:h,gid:g,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(h){return{stderr:h instanceof Error?h.message:"Command failed",exitCode:1}}}async function ye(t,e,n,r,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??mt(e,n);if(zt++,zt>Ss)return zt--,{stderr:`${c.split(" ")[0]}: maximum call depth (${Ss}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let b=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(b)){let C=i.vfs.readFile(b).split(`
`).filter(Boolean),P;if(c==="!!"||c.startsWith("!! "))P=C[C.length-1];else{let T=Number.parseInt(c.slice(1),10);P=T>0?C[T-1]:C[C.length+T]}if(P){let T=c.startsWith("!! ")?c.slice(3):"";return ye(`${P}${T?` ${T}`:""}`,e,n,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=Cr(c)[0]?.toLowerCase()??"",f=l.vars[`__alias_${d}`],p=f?c.replace(d,f):c,m=US.test(p)||BS.test(p)||zS.test(p)||WS.test(p)||jS.test(p)||VS.test(p),h=GS.test(p)||HS.test(p);if(m&&d!=="sh"&&d!=="bash"||h){if(m&&d!=="sh"&&d!=="bash"){let C=Ve("sh");if(C){let P=i.users.getUid(e),T=i.users.getGid(e);return await C.run({authUser:e,uid:P,gid:T,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:p,mode:r,args:["-c",p],stdin:void 0,cwd:s,shell:i,env:l})}}let b=Dc(p);if(!b.isValid)return{stderr:b.error||"Syntax error",exitCode:1};try{return await gs(b.statements,e,n,r,s,i,l)}catch(C){return{stderr:C instanceof Error?C.message:"Execution failed",exitCode:1}}}let g=await ts(p,l.vars,l.lastExitCode,b=>ye(b,e,n,r,s,i,void 0,l).then(C=>C.stdout??"")),y=Cr(g.trim());if(y.length===0)return{exitCode:0};if(Fc.test(y[0]))return xn(y[0],y.slice(1),e,n,r,s,i,o,l);let v=y[0]?.toLowerCase()??"",x=y.slice(1),A=[],I={dotglob:l.vars.__dotglob==="1",nullglob:l.vars.__nullglob==="1",failglob:l.vars.__failglob==="1"};for(let b of x)for(let C of es(b)){let P=Ga(C,s,i.vfs,I);if(!(P.length===0&&I.nullglob)){if(P.length===1&&P[0]===C&&I.failglob&&(C.includes("*")||C.includes("?")))return{stderr:`${v}: no match: ${C}`,exitCode:1};for(let T of P)A.push(T)}}let _=Ve(v);if(!_){let b=Lc(v,l,i,e);return b?Uc(b,v,A,g,e,n,r,s,i,l,o):{stderr:`${v}: command not found`,exitCode:127}}try{let b=i.users.getUid(e),C=i.users.getGid(e);return await _.run({authUser:e,uid:b,gid:C,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:g,mode:r,args:A,stdin:o,cwd:s,shell:i,env:l})}catch(b){return{stderr:b instanceof Error?b.message:"Command failed",exitCode:1}}}finally{zt--}}var Fc,US,BS,zS,WS,jS,VS,GS,HS,Ss,zt,Ke=E(()=>{"use strict";Rc();ro();mr();to();Zt();Fc=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,US=/\bfor\s+\w+\s+in\b/,BS=/\bwhile\s+/,zS=/\bif\s+/,WS=/\w+\s*\(\s*\)\s*\{/,jS=/\bfunction\s+\w+/,VS=/\(\(\s*.+\s*\)\)/,GS=/(?<![|&])[|](?![|])/,HS=/[><;&]|\|\|/;Ss=8;zt=0});var zc,Wc=E(()=>{"use strict";re();Ke();zc={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=U(n,r[0]??"~",pe(t));return ge(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var jc,Vc=E(()=>{"use strict";jc={name:"chage",description:"Change user password expiry information",category:"users",params:["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],run:async({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`chage: permission denied
`,exitCode:1};let r,s,i,o,a,c=!1,l;for(let f=0;f<n.length;f++){let p=n[f];if(p)if(p==="-m"){let m=n[f+1];if(!m)break;if(r=Number.parseInt(m,10),Number.isNaN(r))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};f++}else if(p==="-M"){let m=n[f+1];if(!m)break;if(s=Number.parseInt(m,10),Number.isNaN(s))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};f++}else if(p==="-W"){let m=n[f+1];if(!m)break;if(i=Number.parseInt(m,10),Number.isNaN(i))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};f++}else if(p==="-I"){let m=n[f+1];if(!m)break;if(o=Number.parseInt(m,10),Number.isNaN(o))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};f++}else if(p==="-E"){let m=n[f+1];if(!m)break;if(m==="-1"||m==="99999")a=0;else if(a=Math.floor(new Date(m).getTime()/864e5),Number.isNaN(a))return{stderr:`chage: invalid date '${m}'
`,exitCode:1};f++}else p==="-l"?c=!0:l||(l=p)}if(!l)return{stderr:`Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>
`,exitCode:1};if(!e.users.listUsers().includes(l))return{stderr:`chage: user '${l}' does not exist
`,exitCode:1};if(c){let f=e.users.getPasswordAging(l);if(!f)return{stderr:`chage: user '${l}' not found
`,exitCode:1};let p=S=>S===0?"never":new Date(S*864e5).toISOString().split("T")[0],m=p(f.lastChange),h=f.maxAge===99999?"never":p(f.lastChange+f.maxAge),g=f.inactiveDays>0?p(f.lastChange+f.maxAge+f.inactiveDays):"never",y=p(f.expiryDate);return{stdout:`${[`Last password change                                    : ${m}`,`Password expires                                        : ${h}`,`Password inactive                                       : ${g}`,`Account expires                                         : ${y}`,`Minimum number of days between password change          : ${f.minAge}`,`Maximum number of days between password change          : ${f.maxAge}`,`Number of days of warning before password expires       : ${f.warnDays}`].join(`
`)}
`,exitCode:0}}let d=l;try{return await e.users.setPasswordAging(d,r,s,i,o),a!==void 0&&await e.users.setAccountExpiry(d,a),{stdout:`chage: password aging updated for '${d}'
`,exitCode:0}}catch(f){return{stderr:`${f instanceof Error?f.message:String(f)}
`,exitCode:1}}}}});function YS(t,e){let n=t.users.getGidByName(e);if(n!==null)return n;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var Gc,Hc=E(()=>{"use strict";re();Gc={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!(s&&i))return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=U(n,i);try{if(ge(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=YS(e,s);if(a===null)return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function KS(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=t;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let f of u)for(let p of l.split("")){let m=d[f]?.[p];if(m!==void 0){if(c==="+")s|=m;else if(c==="-")s&=~m;else if(c==="="){let h=Object.values(d[f]??{}).reduce((g,y)=>g|y,0);s=s&~h|m}}}}return s}var qc,Yc=E(()=>{"use strict";re();qc={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chmod: missing operand",exitCode:1};let a=U(n,o);try{if(ge(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=Number.parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=KS(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function Kc(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}function XS(t,e){let n=t.users.getGidByName(e);if(n!==null)return n;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var Xc,Zc=E(()=>{"use strict";re();Xc={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=U(n,o);try{if(ge(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=Kc(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let f=i.slice(0,u),p=i.slice(u+1);if(f&&(c=Kc(e,f),c===null))return{stderr:`chown: invalid user: ${f}`,exitCode:1};if(p&&(l=XS(e,p),l===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Jc,Qc=E(()=>{"use strict";Jc={name:"caller",description:"Print the current call stack",category:"shell",params:["[n]"],run:({args:t})=>{let e=t.length>0?Number.parseInt(t[0],10):0;return e<0?{exitCode:1}:{stdout:`${e} 0 main
`,exitCode:0}}}});var el,tl=E(()=>{"use strict";el={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var nl,rl=E(()=>{"use strict";nl={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:t,shell:e})=>{let n=e.network;if(t.includes("-L")||t.includes("--list")||t.length===0){let r=n.getConntrack();return r.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:`${n.formatConntrack()}

conntrack v1.4.6 (conntrack-tools): ${r.length} flow entries have been shown.
`,exitCode:0}}if(t.includes("-F")||t.includes("--flush"))return n.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(t.includes("-C")||t.includes("--count"))return{stdout:`${n.getConntrackCount()}
`,exitCode:0};if(t.includes("-S")||t.includes("--stats")){let r=n.getConntrackMax(),s=n.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${r} entries
`,exitCode:0}}if(t.includes("-E")||t.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(t.includes("-D")||t.includes("--delete")){let r=n.getConntrack();return r.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(n.flushConntrack(),{stdout:`${r.length} flow entries have been deleted.
`,exitCode:0})}return t.includes("-U")||t.includes("--update")?{stdout:`0 flow entries have been updated.
`,exitCode:0}:t.includes("-I")||t.includes("--create")?{stdout:`1 flow entries have been created.
`,exitCode:0}:t.includes("-G")||t.includes("--get")?{stderr:`conntrack: no entry found
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
  -G, --get       Get entry`,exitCode:1}}}});function ZS(t,e){let n=t.indexOf("-u");return n!==-1&&n+1<t.length?e!=="root"?{stderr:"crontab: only root can use -u",exitCode:1}:t[n+1]:e}function JS(t,e){return t.exists(e)?{stdout:t.readFile(e),exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function QS(t,e){return t.exists(e)?{stdout:`${t.readFile(e)}
`,exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function eb(t,e,n){return t.exists(e)?n?{stdout:"Remove crontab for this user? (y/N) ",exitCode:0}:(t.remove(e),{stdout:"",exitCode:0}):{stdout:`no crontab for this user
`,exitCode:0}}function tb(t,e,n){if(!t.exists(n))return{stderr:`crontab: ${n}: No such file`,exitCode:1};let r=t.readFile(n);return nb(r)?(rb(t,sl),t.writeFile(e,r,{mode:420}),{stdout:"",exitCode:0}):{stderr:"crontab: errors in crontab file",exitCode:1}}function nb(t){let e=t.split(`
`);for(let n of e){let r=n.trim();if(!r||r.startsWith("#"))continue;let s=r.split(/\s+/);if(s.length<6)return!1;let i=s.slice(0,5);for(let o of i)if(o!=="*"&&!/^\d+(-\d+)?(,\d+)*$/.test(o))return!1}return!0}function rb(t,e){t.exists(e)||t.mkdir(e,493)}var sl,il,ol=E(()=>{"use strict";Q();sl="/var/spool/cron/crontabs",il={name:"crontab",description:"Manage per-user crontab files",category:"system",params:["[-u user] [-e|-l|-r] [file]"],run:({shell:t,args:e,authUser:n})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: crontab [options] [file]","  -u <user>    Specify user (root only)","  -e           Edit crontab (opens editor)","  -l           List current crontab entries","  -r           Remove current crontab","  -i           Prompt before removal","  -h, --help   Show this help","","Without options, install a crontab from file (or stdin)."].join(`
`),exitCode:0};let r=t.vfs,s=ZS(e,n);if(s instanceof Object)return s;let i=`${sl}/${s}`;if(k(e,["-e"]))return JS(r,i);if(k(e,["-l"]))return QS(r,i);if(k(e,["-r"]))return eb(r,i,k(e,["-i"]));let o=e.find(a=>!a.startsWith("-"));return o?tb(r,i,o):{stderr:"crontab: no options or file specified",exitCode:1}}}});var al,cl,ll,ul,dl,fl,pl,ml,hl,gl=E(()=>{"use strict";re();al={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Ke(),Bc)),l=t.slice(1).join(" ");return c(l,e,n,r,s,i,a,o)}},cl={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e,authUser:n})=>{let r=t.includes("-d"),s=t.find(d=>!d.startsWith("-"))??"tmp.XXXXXXXXXX",i=s.replace(/X+$/,"")||"tmp.",o=Math.random().toString(36).slice(2,10),a=`${i}${o}`,c=a.startsWith("/")?a:`/tmp/${a}`,l=e.users.getUid(n),u=e.users.getGid(n);try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp",1023,0,0),r?e.vfs.mkdir(c,448,l,u):e.vfs.writeFile(c,"",{},l,u)}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${s}'`,exitCode:1}}return{stdout:c,exitCode:0}}},ll={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:t})=>{let e=t.resourceCaps?.cpuCapCores;return{stdout:`${e!==void 0&&e>0?e:4}`,exitCode:0}}},ul={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[-n] [job_id...]"],run:({args:t,shell:e,env:n})=>{let r=t.includes("-n"),s=t.filter(o=>o!=="-n"),i=e.users.listProcesses();if(r){let o=i.filter(c=>c.status==="running"||c.status==="stopped");if(o.length===0)return n&&(n.vars.__wait_exit="127"),{exitCode:127};let a=o.pop();return a&&n&&(n.vars.__wait_exit=String(a.exitCode??0)),{exitCode:a?.exitCode??0}}if(s.length>0){for(let o of s){let a=Number.parseInt(o.replace(/^%?/,""),10),c=i.find(l=>l.pid===a);c&&(c.status="done")}return{exitCode:0}}for(let o of i)o.status="done";return{exitCode:0}}},dl={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let f=Number.parseInt(d[1],10),p=Number.parseInt(d[2],10),m=[];for(let y=f;y<=p;y++)m.push(y);for(let y=m.length-1;y>0;y--){let S=Math.floor(Math.random()*(y+1));[m[y],m[S]]=[m[S],m[y]]}let h=t.indexOf("-n"),g=h===-1?m.length:Number.parseInt(t[h+1]??"0",10);return{stdout:m.slice(0,g).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=U(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=n.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c===-1?a.length:Number.parseInt(t[c+1]??"0",10);return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},fl={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=U(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},pl={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=U(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=n.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},ml={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=U(r??"/",s);if(!n.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=n.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},hl={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i===-1?/\s+/:t[i+1]??"	",a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=U(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(p=>p.split(o)),d=[];for(let p of u)p.forEach((m,h)=>{d[h]=Math.max(d[h]??0,m.length)});return{stdout:u.map(p=>p.map((m,h)=>m.padEnd(d[h]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import*as yl from"node:path";var Sl,bl=E(()=>{"use strict";Q();re();Sl={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=k(r,["-r","-R","--recursive"]),a=r.filter(f=>!f.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"cp: missing operand",exitCode:1};let u=U(n,c),d=U(n,l);try{if(qe(e.vfs,e.users,t,u,4),qe(e.vfs,e.users,t,yl.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let p=(h,g)=>{e.vfs.mkdir(g,493,s,i);for(let y of e.vfs.list(h)){let S=`${h}/${y}`,v=`${g}/${y}`;if(e.vfs.stat(S).type==="directory")p(S,v);else{let A=e.vfs.readFileRaw(S);e.vfs.writeFile(v,A,{},s,i)}}},m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;p(u,m)}else{let p=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,m=e.vfs.readFileRaw(u);e.vfs.writeFile(p,m,{},s,i)}return{exitCode:0}}catch(f){return{stderr:`cp: ${f instanceof Error?f.message:String(f)}`,exitCode:1}}}}});function ib(t){let e=t.replace(/^\[|\]$/g,"").toLowerCase();return sb.some(n=>n.test(e))}function bs(t,e){if(!e||e.mode==="allow-all"||!e.mode)return{allowed:!0,honeypot:!1};let n;try{n=new URL(t).hostname}catch{return{allowed:!0,honeypot:!1}}return e.mode==="block-private"&&ib(n)?{allowed:!1,reason:"private address",honeypot:e.honeypot??!1}:e.mode==="blocklist"&&e.blocklist&&e.blocklist.some(s=>n===s||n.endsWith(`.${s}`))?{allowed:!1,reason:"blocklisted",honeypot:e.honeypot??!1}:e.mode==="allowlist"&&e.allowlist&&!e.allowlist.some(s=>n===s||n.endsWith(`.${s}`))?{allowed:!1,reason:"not in allowlist",honeypot:e.honeypot??!1}:{allowed:!0,honeypot:!1}}function xs(t){return new Response(ob,{status:200,statusText:"OK",headers:{"content-type":"text/html",server:"nginx/1.24.0",date:new Date().toUTCString()}})}var sb,ob,so=E(()=>{"use strict";sb=[/^127\./,/^10\./,/^172\.(1[6-9]|2\d|3[01])\./,/^192\.168\./,/^0\./,/^169\.254\./,/^::1$/,/^f[cd][0-9a-f]{2}:/,/^fe80:/];ob=`<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed.</p>
</body>
</html>`});var xl,vl=E(()=>{"use strict";Q();re();so();xl={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=$e(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(k(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(_=>!_.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,f=o.get("-H")??o.get("--header")??null,p=k(n,["-s","--silent"]),m=k(n,["-I","--head"]),h=k(n,["-L","--location"]),g=k(n,["-v","--verbose"]),y={"User-Agent":"curl/7.88.1"};if(f){let _=f.indexOf(":");_!==-1&&(y[f.slice(0,_).trim()]=f.slice(_+1).trim())}let S=d&&u==="GET"?"POST":u,v={method:S,headers:y,redirect:h?"follow":"manual"};d&&(y["Content-Type"]??="application/x-www-form-urlencoded",v.body=d);let x=[];g&&(x.push(`* Trying ${c}...`,"* Connected"),x.push(`> ${S} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let A;try{let _=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,b=new URL(_),C=b.port?Number.parseInt(b.port,10):b.protocol==="https:"?443:80,P=bs(_,r.resourceCaps?.outboundRestriction);if(P.allowed){let T=r.network.checkFirewall("OUTPUT","tcp",void 0,b.hostname,C);if(T==="DROP"||T==="REJECT")return{stderr:`curl: (7) Failed to connect to ${b.hostname} port ${C}: Connection refused`,exitCode:7};A=await fetch(_,v)}else if(P.honeypot)A=xs(_);else return{stderr:`curl: (7) Failed to connect to ${b.hostname} port ${C}: ${P.reason}`,exitCode:7}}catch(_){return{stderr:`curl: (6) Could not resolve host: ${_ instanceof Error?_.message:String(_)}`,exitCode:6}}if(g&&x.push(`< HTTP/1.1 ${A.status} ${A.statusText}`),m){let _=[`HTTP/1.1 ${A.status} ${A.statusText}`];for(let[b,C]of A.headers.entries())_.push(`${b}: ${C}`);return{stdout:`${_.join(`\r
`)}\r
`,exitCode:0}}let I;try{I=await A.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let _=U(e,l);return ge(t,_,"curl"),r.vfs.writeFile(_,I,{},s,i),p||x.push(`  % Total    % Received
100 ${I.length}  100 ${I.length}`),{stderr:x.join(`
`)||void 0,exitCode:A.ok?0:22}}return{stdout:I,stderr:x.length>0?x.join(`
`):void 0,exitCode:A.ok?0:22}}}});var Cl,_l=E(()=>{"use strict";Q();Cl={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=pn(t,["-d"])??"	",s=(pn(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l===void 0?{from:(c??1)-1,to:(c??1)-1}:{from:(c??1)-1,to:l-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var wl,Il=E(()=>{"use strict";wl={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var El,$l=E(()=>{"use strict";re();El={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i={};for(let x of n){let A=x.indexOf("=");A!==-1&&(i[x.slice(0,A)]=x.slice(A+1))}let o=i.if?U(e,i.if):void 0,a=i.of?U(e,i.of):void 0;if(!(o&&a))return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=Number.parseInt(i.bs||"512",10),l=t.vfs.readFile(o,r,s),u=Number.parseInt(i.skip||"0",10),d=Number.parseInt(i.seek||"0",10),f=i.count===void 0?void 0:Number.parseInt(i.count,10),p=u*c,m=l.slice(p),h=f===void 0?m.length:Math.min(m.length,f*c),g=m.slice(0,h),y;try{y=t.vfs.readFile(a,r,s)}catch{y=""}let S=d*c;S>0?(y.length<S&&(y=y.padEnd(S,"\0")),y=y.slice(0,S)+g+y.slice(S+g.length)):y=g,t.vfs.writeFile(a,y,{},r,s);let v=Math.ceil(g.length/c);return{stdout:`${v}+0 records in
${v}+0 records out
`,exitCode:0}}}});function Pl(t,e){let n=t[vs],r=n?JSON.parse(n):[];r.push({name:e,oldValue:t[e]}),t[vs]=JSON.stringify(r)}function kl(t){let e=t[vs];if(!e)return;let n=JSON.parse(e);for(;n.length>0;){let r=n.pop();r.oldValue===void 0?delete t[r.name]:t[r.name]=r.oldValue}t[vs]="[]"}var vs,Ml,io=E(()=>{"use strict";Q();vs="__local_scope";Ml={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=k(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]=""),Pl(e.vars,i);else{let a=i.slice(0,o),c=i.slice(o+1);if(n){let l=Number.parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}Pl(e.vars,a),e.vars[a]=c}}return{exitCode:0}}}});var Nl,Al=E(()=>{"use strict";Nl={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=(o,a)=>o.trim()!==s?Promise.resolve({result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}):(a.users.deleteUser(s),Promise.resolve({result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}}));return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Tl,Ol=E(()=>{"use strict";Tl={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Rl,Dl=E(()=>{"use strict";re();Rl={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,s]=n;if(!(r&&s))return{stderr:"diff: missing operand",exitCode:1};let i=U(e,r),o=U(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let f=a[d],p=c[d];f!==p&&(f!==void 0&&l.push(`< ${f}`),p!==void 0&&l.push(`> ${p}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Fl,Ll,Ul=E(()=>{"use strict";Q();re();Fl={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=Fn(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=k(t,["-l","--list"]),i=k(t,["-s","--status"]),o=k(t,["-L","--listfiles"]),a=k(t,["-r","--remove"]),c=k(t,["-P","--purge"]),{positionals:l}=$e(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],f=u.map(p=>{let m=p.name.padEnd(14).slice(0,14),h=p.version.padEnd(15).slice(0,15),g=p.architecture.padEnd(12).slice(0,12),y=(p.description||"").slice(0,40);return`ii  ${m} ${h} ${g} ${y}`});return{stdout:[...d,...f].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(f=>f.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Ll={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=Fn(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=k(t,["-l"]),s=k(t,["-W","--show"]),{positionals:i}=$e(t,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),f=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${f} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Bl,zl=E(()=>{"use strict";Q();re();Bl={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=k(n,["-h"]),s=k(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=U(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let f=0;for(let p of t.vfs.list(u)){let m=`${u}/${p}`,h=`${d}/${p}`,g=t.vfs.stat(m);g.type==="directory"?f+=l(m,h):g.type==="device"?(f+=0,s||c.push(`0	${h}`)):(f+=g.size,s||c.push(`${a(g.size)}	${h}`))}return c.push(`${a(f)}	${d}`),f};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function ab(t,e,n,r){let{authUser:s,hostname:i,mode:o,cwd:a,shell:c,stdin:l,env:u}=r,d=c.vfs.readFile(t),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let m=Ve(f[1]);if(m)return m.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:[e,...n].join(" "),mode:o,args:n,stdin:l,cwd:a,shell:c,env:u})}let p=Ve("sh");return p?p.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:l,cwd:a,shell:c,env:u}):{stderr:`${e}: command not found`,exitCode:127}}var Wl,jl=E(()=>{"use strict";Zt();Wl={name:"command",description:"Run a command or display info about it",category:"shell",params:["[-vVp] <command> [args...]"],run:({args:t,authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(t.length===0)return{stderr:"command: missing argument",exitCode:1};let u=new Set([...t].filter(y=>y.startsWith("-")&&!y.includes("="))),d=t.filter(y=>!u.has(y)),f=u.has("-v"),p=u.has("-V"),m=u.has("-p"),h=!(f||p),g=(m?"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin":l?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");if(h&&d.length>0){let y=d[0],S=d.slice(1),v=Ve(y);if(v)return v.run({authUser:e,uid:n,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:d.join(" "),mode:i,args:S,stdin:c,cwd:o,shell:a,env:l});for(let x of g){let A=`${x}/${y}`;if(a.vfs.exists(A))return ab(A,y,S,{authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l,rawInput:d.join(" "),args:S,activeSessions:a.users.listActiveSessions()})}return{stderr:`${y}: not found`,exitCode:127}}if(f||p){let y=[],S=0;for(let v of d){let x=Ve(v),A=`__func_${v}`in l.vars;if(p)if(x)y.push(`${v} is a shell builtin`);else if(A)y.push(`${v} is a function`);else{let I=!1;for(let _ of g){let b=`${_}/${v}`;if(a.vfs.exists(b)){y.push(`${v} is ${b}`),I=!0;break}}I||(y.push(`${v}: not found`),S=1)}else if(x||A)y.push(v);else{let I=!1;for(let _ of g){let b=`${_}/${v}`;if(a.vfs.exists(b)){y.push(b),I=!0;break}}I||(S=1)}}return{stdout:y.join(`
`),exitCode:S}}return{stdout:"",exitCode:0}}}});function cb(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(Number.parseInt(n,8)))}var Vl,Gl=E(()=>{"use strict";Q();mr();Vl={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:s}=$e(t,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=Qr(a,n?.vars??{},n?.lastExitCode??0),l=o?cb(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Hl,ql=E(()=>{"use strict";Hl={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var Yl,Kl=E(()=>{"use strict";Yl={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:Number.parseInt(t[0]??"0",10)||0})}});var Xl,Zl=E(()=>{"use strict";Xl={name:"export",description:"Set shell environment variable",category:"shell",params:["[-fn] [-p] [NAME[=VALUE] ...]"],run:({args:t,env:e})=>{let n=new Set(t.filter(i=>i.startsWith("-")&&!i.includes("="))),r=t.filter(i=>!n.has(i)),s=[...n].join("").replace(/-/g,"");if(s.includes("f")){for(let i of r){let o=`__func_${i}`;o in e.vars&&s.includes("n")&&delete e.vars[o]}return{exitCode:0}}if(s.includes("p")||r.length===0){let i=Object.entries(e.vars).filter(([o])=>o&&!o.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(o)).map(([o,a])=>`declare -x ${o}="${a}"`).join(`
`);return{stdout:i?`${i}
`:"",exitCode:0}}for(let i of r){if(i.includes("=")){let o=i.indexOf("="),a=i.slice(0,o),c=i.slice(o+1);e.vars[a]=c}s.includes("n")&&delete e.vars[i]}return{exitCode:0}}}});var Jl,Ql=E(()=>{"use strict";Jl={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let s=new RegExp(r),i=n.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=Number.parseInt(t[0],10),r=t[1],s=Number.parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=n+s;break;case"-":i=n-s;break;case"*":i=n*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(n/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=n%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});var lb,eu,tu=E(()=>{"use strict";re();lb=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],eu={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of t){let o=U(e,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of lb)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var nu,ru=E(()=>{"use strict";$i();re();Ke();nu={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=Number.POSITIVE_INFINITY,d=0,f=[];function p(I,_){return m(I,_)}function m(I,_){let[b,C]=h(I,_);for(;I[C]==="-o"||I[C]==="-or";){C++;let[P,T]=h(I,C);b={type:"or",left:b,right:P},C=T}return[b,C]}function h(I,_){let[b,C]=g(I,_);for(;C<I.length&&I[C]!=="-o"&&I[C]!=="-or"&&I[C]!==")"&&((I[C]==="-a"||I[C]==="-and")&&C++,!(C>=I.length||I[C]==="-o"||I[C]===")"));){let[P,T]=g(I,C);b={type:"and",left:b,right:P},C=T}return[b,C]}function g(I,_){if(I[_]==="!"||I[_]==="-not"){let[b,C]=y(I,_+1);return[{type:"not",pred:b},C]}return y(I,_)}function y(I,_){let b=I[_];if(!b)return[{type:"true"},_];if(b==="("){let[C,P]=p(I,_+1),T=I[P]===")"?P+1:P;return[C,T]}if(b==="-name")return[{type:"name",pat:I[_+1]??"*",ignoreCase:!1},_+2];if(b==="-iname")return[{type:"name",pat:I[_+1]??"*",ignoreCase:!0},_+2];if(b==="-type")return[{type:"type",t:I[_+1]??"f"},_+2];if(b==="-maxdepth")return u=Number.parseInt(I[_+1]??"0",10),[{type:"true"},_+2];if(b==="-mindepth")return d=Number.parseInt(I[_+1]??"0",10),[{type:"true"},_+2];if(b==="-empty")return[{type:"empty"},_+1];if(b==="-print"||b==="-print0")return[{type:"print"},_+1];if(b==="-true")return[{type:"true"},_+1];if(b==="-false")return[{type:"false"},_+1];if(b==="-size"){let C=I[_+1]??"0",P=C.slice(-1);return[{type:"size",n:Number.parseInt(C,10),unit:P},_+2]}if(b==="-exec"||b==="-execdir"){let C=b==="-execdir",P=[],T=_+1;for(;T<I.length&&I[T]!==";";)P.push(I[T]),T++;return f.push({cmd:P,useDir:C}),[{type:"exec",cmd:P,useDir:C},T+1]}return[{type:"true"},_+1]}let S=l.length>0?p(l,0)[0]:{type:"true"};function v(I,_,b){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!v(I.pred,_,b);case"and":return v(I.left,_,b)&&v(I.right,_,b);case"or":return v(I.left,_,b)||v(I.right,_,b);case"name":{let C=_.split("/").pop()??"";return Jr(I.pat,I.ignoreCase?"i":"").test(C)}case"type":{try{let C=e.vfs.stat(_);if(I.t==="f")return C.type==="file";if(I.t==="d")return C.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(_).type==="directory"?e.vfs.list(_).length===0:e.vfs.readFile(_).length===0}catch{return!1}case"size":try{let P=e.vfs.readFile(_).length,T=I.unit,R=P;return T==="k"||T==="K"?R=Math.ceil(P/1024):T==="M"?R=Math.ceil(P/(1024*1024)):T==="c"&&(R=P),R===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let x=[];function A(I,_,b){if(b>u)return;try{ge(t,I,"find")}catch{return}b>=d&&v(S,I,b)&&x.push(_);let C;try{C=e.vfs.stat(I)}catch{return}if(C.type==="directory"&&b<u)for(let P of e.vfs.list(I))A(`${I}/${P}`,`${_}/${P}`,b+1)}for(let I of a){let _=U(n,I);if(!e.vfs.exists(_))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};A(_,I==="."?".":I,0)}if(f.length>0&&x.length>0){let I=[];for(let{cmd:_}of f)for(let b of x){let P=_.map(R=>R==="{}"?b:R).map(R=>R.includes(" ")?`"${R}"`:R).join(" "),T=await ye(P,t,i,o,n,e,void 0,s);T.stdout&&I.push(T.stdout.replace(/\n$/,"")),T.stderr&&I.push(T.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:x.join(`
`)+(x.length>0?`
`:""),exitCode:0}}}});import*as Cs from"node:os";var su,iu=E(()=>{"use strict";Q();su={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t,shell:e})=>{let n=k(t,["-h","--human"]),r=k(t,["-m"]),s=k(t,["-g"]),i=Cs.totalmem(),o=Cs.freemem(),a=e.resourceCaps?.ramCapBytes,c=a===void 0?i:Math.min(i,a),l=a===void 0?o:Math.floor(c*(o/i)),u=c-l,d=Math.floor(c*.02),f=Math.floor(c*.05),p=Math.floor(l*.95),m=Math.floor(c*.5),h=v=>n?v>=1024*1024*1024?`${(v/(1024*1024*1024)).toFixed(1)}G`:v>=1024*1024?`${(v/(1024*1024)).toFixed(1)}M`:`${(v/1024).toFixed(1)}K`:String(Math.floor(s?v/(1024*1024*1024):r?v/(1024*1024):v/1024)),g="               total        used        free      shared  buff/cache   available",y=`Mem:  ${h(c).padStart(12)} ${h(u).padStart(11)} ${h(l).padStart(11)} ${h(d).padStart(11)} ${h(f).padStart(11)} ${h(p).padStart(11)}`,S=`Swap: ${h(m).padStart(12)} ${h(0).padStart(11)} ${h(m).padStart(11)}`;return{stdout:[g,y,S].join(`
`),exitCode:0}}}});function lu(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),s=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var au,ou,cu,uu,du,fu,ub,pu,mu=E(()=>{"use strict";au={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:new Array(200).fill(e).join(`
`),exitCode:0}}},ou=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],cu={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*ou.length);return{stdout:ou[t]??"No fortunes today.",exitCode:0}}};uu={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:lu(n),exitCode:0}}},du={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:lu(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},fu={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},ub=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],pu={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${ub.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var hu,gu=E(()=>{"use strict";hu={name:"getent",description:"Query user/group database",category:"system",params:["passwd|group [key]"],run:({shell:t,args:e})=>{let n=e[0],r=e[1];if(!n)return{stderr:`Usage: getent passwd|group [key]
`,exitCode:1};if(n==="passwd"){let i=t.users.listUsers().filter(o=>!r||o===r).map(o=>{let a=t.users.getUid(o),c=t.users.getGid(o),l=o==="root"?"/root":`/home/${o}`;return`${o}:x:${a}:${c}::${l}:/bin/bash`});return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}if(n==="group"){let i=t.users.listGroups().filter(o=>!r||o.name===r).map(o=>`${o.name}:x:${o.gid}:${o.members.join(",")}`);return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}return{stderr:`getent: unknown database '${n}'
`,exitCode:1}}}});import*as rt from"node:path";function yt(t){return rt.posix.join(t,".git")}function Cn(t){return rt.posix.join(yt(t),"HEAD")}function ao(t,e){return rt.posix.join(yt(t),e)}function co(t,e){return rt.posix.join(yt(t),"objects",e.slice(0,2),e.slice(2))}function vn(t){return rt.posix.join(yt(t),"index")}function db(t,e,n){let r=yt(e);return t.exists(r)?{stderr:`Reinitialized existing Git repository in ${r}/
`,exitCode:0}:(t.mkdir(r,493),t.mkdir(rt.posix.join(r,"objects"),493),t.mkdir(rt.posix.join(r,"refs","heads"),493),t.mkdir(rt.posix.join(r,"refs","tags"),493),t.writeFile(Cn(e),`ref: refs/heads/master
`),t.writeFile(vn(e),""),{stdout:`Initialized empty Git repository in ${r}/
`,exitCode:0})}function fb(t,e,n){let r=yt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.filter(o=>!o.startsWith("-")&&o!=="add");if(s.length===0)return{stderr:"Nothing specified, nothing added.",exitCode:0};let i=[];for(let o of s){if(!t.exists(o))return{stderr:`fatal: pathspec '${o}' did not match any files`,exitCode:1};let a=t.readFile(o),c=oo(a),l=co(e,c),u=rt.posix.dirname(l);t.exists(u)||t.mkdir(u,493),t.exists(l)||t.writeFile(l,a),i.push(`${c} ${o}`)}return t.writeFile(vn(e),`${i.join(`
`)}
`),{stdout:"",exitCode:0}}function pb(t,e){let n=yt(e);if(!t.exists(n))return{stderr:"fatal: not a git repository",exitCode:128};let r=[];r.push(`On branch ${lo(t,e)}`),r.push("");let s=t.exists(vn(e))?t.readFile(vn(e)).trim():"",i=s?s.split(`
`).filter(Boolean).map(c=>c.split(/\s+/)[1]):[];if(i.length>0){r.push("Changes to be committed:"),r.push('  (use "git restore --staged <file>..." to unstage)'),r.push("");for(let c of i)r.push(`	new file:   ${c}`);r.push("")}let a=bu(t,e,"").filter(c=>!i.includes(c));if(a.length>0){r.push("Untracked files:"),r.push('  (use "git add <file>..." to include in what will be committed)'),r.push("");for(let c of a)c.startsWith(".git")||r.push(`	${c}`);r.push("")}return i.length===0&&a.length===0&&r.push("nothing to commit, working tree clean"),{stdout:`${r.join(`
`)}
`,exitCode:0}}function mb(t,e,n){let r=yt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.indexOf("-m"),i=s!==-1&&s+1<n.length?n[s+1]:null;if(!i)return{stderr:"error: switch `m' requires a value",exitCode:1};let o=t.exists(vn(e))?t.readFile(vn(e)).trim():"",a=o?o.split(`
`).filter(Boolean):[];if(a.length===0)return{stderr:"nothing added to commit but untracked files present",exitCode:1};let c=Su(t,e),l=oo(o),u="Virtual User <virtual@localhost>",d=Math.floor(Date.now()/1e3),f=[`tree ${l}`,c?`parent ${c}`:"",`author ${u} ${d} +0000`,`committer ${u} ${d} +0000`,"",i,""].filter(Boolean).join(`
`),p=oo(f),m=co(e,p),h=rt.posix.dirname(m);t.exists(h)||t.mkdir(h,493),t.writeFile(m,f);let g=lo(t,e),y=ao(e,`refs/heads/${g}`);t.writeFile(y,`${p}
`),t.writeFile(vn(e),"");let S=p.slice(0,7);return{stdout:`[${g} ${S}] ${i}
 ${a.length} file(s) changed
`,exitCode:0}}function hb(t,e,n){let r=yt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=k(n,["--oneline"]),i=Su(t,e);if(!i)return{stdout:`fatal: your current branch 'main' does not have any commits yet
`,exitCode:0};let o=[],a=new Set;for(;i&&!a.has(i);){a.add(i);let c=co(e,i);if(!t.exists(c))break;let l=t.readFile(c),u=l.match(/\n\n([\s\S]*)$/),d=u?u[1].trim():"",f=l.match(/^author (.+) \d+/m),p=f?f[1]:"unknown";s?o.push(`${i.slice(0,7)} ${d.split(`
`)[0]}`):(o.push(`commit ${i}`),o.push(`Author: ${p}`),o.push(`Date:   ${new Date().toUTCString()}`),o.push(""),o.push(`    ${d}`),o.push(""));let m=l.match(/^parent ([a-f0-9]+)/m);i=m?m[1]:""}return{stdout:`${o.join(`
`)}
`,exitCode:0}}function gb(t,e,n){let r=yt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=rt.posix.join(r,"refs","heads");if(!t.exists(s))return{stdout:"",exitCode:0};let i=lo(t,e);return{stdout:`${t.list(s).map(c=>c===i?`* ${c}`:`  ${c}`).join(`
`)}
`,exitCode:0}}function yb(t,e,n){let r=yt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.find(o=>!o.startsWith("-")&&o!=="checkout");if(!s)return{stderr:"git checkout: missing branch name",exitCode:1};let i=ao(e,`refs/heads/${s}`);return t.exists(i)?(t.writeFile(Cn(e),`ref: refs/heads/${s}
`),{stdout:`Switched to branch '${s}'
`,exitCode:0}):(t.writeFile(Cn(e),`ref: refs/heads/${s}
`),{stdout:`Switched to a new branch '${s}'
`,exitCode:0})}function lo(t,e){if(!t.exists(Cn(e)))return"master";let n=t.readFile(Cn(e)).trim(),r=n.match(/^ref:\s*refs\/heads\/(.+)$/);return r?r[1]:n.slice(0,7)}function Su(t,e){if(!t.exists(Cn(e)))return null;let n=t.readFile(Cn(e)).trim(),r=n.match(/^ref:\s*(.+)$/);if(r){let s=ao(e,r[1]);return t.exists(s)?t.readFile(s).trim():null}return n||null}function oo(t){let e=0;for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);e=(e<<5)-e+r,e|=0}return Math.abs(e).toString(16).padStart(40,"0")}function bu(t,e,n){let r=[],s=t.list(e);for(let i of s){if(i==="."||i===".."||i===".git")continue;let o=rt.posix.join(e,i),a=n?`${n}/${i}`:i;try{t.stat(o).mode&16384?r.push(...bu(t,o,a)):r.push(a)}catch{r.push(a)}}return r}var yu,xu=E(()=>{"use strict";Q();yu={name:"git",description:"Distributed version control (minimal)",category:"development",params:["<command> [options]"],run:({shell:t,args:e,cwd:n})=>{if(k(e,["--help","-h"])||e.length===0)return{stdout:["Usage: git <command> [options]","","Commands:","  init          Initialize a new repository","  add <file>    Stage file contents","  status        Show working tree status","  commit -m <msg>  Record changes","  log           Show commit history","  branch        List branches","  checkout <branch>  Switch branches","  -h, --help    Show this help"].join(`
`),exitCode:0};let r=t.vfs,s=e.find(i=>!i.startsWith("-"));if(!s)return{stderr:"git: missing subcommand",exitCode:1};switch(s){case"init":return db(r,n,e);case"add":return fb(r,n,e);case"status":return pb(r,n);case"commit":return mb(r,n,e);case"log":return hb(r,n,e);case"branch":return gb(r,n,e);case"checkout":return yb(r,n,e);default:return{stderr:`git: '${s}' is not a git command.`,exitCode:1}}}}});var vu,Cu=E(()=>{"use strict";vu={name:"gpasswd",description:"Administer /etc/group",category:"users",params:["[-a|-d] -G group user"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`gpasswd: permission denied
`,exitCode:1};let r,s,i;for(let a=0;a<n.length;a++)n[a]==="-a"?r="add":n[a]==="-d"?r="delete":n[a]==="-G"&&n[a+1]?(s=n[a+1],a++):i||(i=n[a]);if(!(r&&s&&i))return{stderr:`Usage: gpasswd -a|-d -G group user
`,exitCode:1};if(!e.users.listUsers().includes(i))return{stderr:`gpasswd: user '${i}' does not exist
`,exitCode:1};if(!e.users.getGroup(s))return{stderr:`gpasswd: group '${s}' does not exist
`,exitCode:1};try{return r==="add"?(e.users.addGroupMember(s,i),{stdout:`gpasswd: added '${i}' to group '${s}'
`,exitCode:0}):(e.users.removeGroupMember(s,i),{stdout:`gpasswd: removed '${i}' from group '${s}'
`,exitCode:0})}catch(a){return{stderr:`${a instanceof Error?a.message:String(a)}
`,exitCode:1}}}}});var _u,wu=E(()=>{"use strict";Q();re();_u={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=$e(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),f=i.has("-l"),p=i.has("-q")||i.has("--quiet")||i.has("--silent"),m=o[0],h=o.slice(1);if(!m)return{stderr:"grep: no pattern specified",exitCode:1};let g;try{let x=a?"mi":"m";g=new RegExp(m,x)}catch{return{stderr:`grep: invalid regex: ${m}`,exitCode:1}}let y=(x,A="")=>{let I=x.split(`
`),_=[];for(let b=0;b<I.length;b++){let C=I[b]??"",P=g.test(C);if(c?!P:P){let R=l?`${b+1}:`:"";_.push(`${A}${R}${C}`)}}return _},S=x=>{if(!e.vfs.exists(x))return[];if(e.vfs.stat(x).type==="file")return[x];if(!u)return[];let I=[],_=b=>{for(let C of e.vfs.list(b)){let P=`${b}/${C}`;e.vfs.stat(P).type==="file"?I.push(P):_(P)}};return _(x),I},v=[];if(h.length===0){if(!s)return{stdout:"",exitCode:1};let x=y(s);if(d)return{stdout:`${x.length}
`,exitCode:x.length>0?0:1};if(p)return{exitCode:x.length>0?0:1};v.push(...x)}else{let x=h.flatMap(A=>{let I=U(n,A);return S(I).map(_=>({file:A,path:_}))});for(let{file:A,path:I}of x)try{ge(t,I,"grep");let _=e.vfs.readFile(I),b=x.length>1?`${A}:`:"",C=y(_,b);d?v.push(x.length>1?`${A}:${C.length}`:String(C.length)):f?C.length>0&&v.push(A):v.push(...C)}catch{return{stderr:`grep: ${A}: No such file or directory`,exitCode:1}}}return{stdout:v.length>0?`${v.join(`
`)}
`:"",exitCode:v.length>0?0:1}}}});var Iu,Eu=E(()=>{"use strict";Iu={name:"hash",description:"Display and manage the command hash table",category:"shell",params:["[-r] [name...]"],run:({args:t,shell:e,env:n})=>{let r=t.includes("-r"),s=t.filter(i=>i!=="-r");if(r){let i=Object.keys(n.vars).filter(o=>o.startsWith("__hash_"));for(let o of i)delete n.vars[o]}if(s.length>0){let i=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let o of s){let a=!1;for(let c of i){let l=`${c}/${o}`;if(e.vfs.exists(l)){n.vars[`__hash_${o}`]=l,a=!0;break}}a||(n.vars[`__hash_${o}`]="")}return{exitCode:0}}if(!r){let i=[];for(let[o,a]of Object.entries(n.vars))o.startsWith("__hash_")&&a&&i.push(`${o.slice(7)}  ${a}`);return{stdout:i.length>0?`${i.join(`
`)}
`:"",exitCode:0}}return{exitCode:0}}}});var $u,Pu=E(()=>{"use strict";$u={name:"groupadd",description:"Create a new group",category:"users",params:["[-g GID] <group>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`groupadd: permission denied
`,exitCode:1};let r,s;for(let i=0;i<n.length;i++)if(n[i]==="-g"){let o=n[i+1];if(!o)break;if(r=Number.parseInt(o,10),Number.isNaN(r)||r<0)return{stderr:`groupadd: invalid GID '${o}'
`,exitCode:1};i++}else s||(s=n[i]);if(!s)return{stderr:`Usage: groupadd [-g GID] <group>
`,exitCode:1};try{return e.users.createGroup(s,r),{stdout:`groupadd: group '${s}' created
`,exitCode:0}}catch(i){return{stderr:`${i instanceof Error?i.message:String(i)}
`,exitCode:1}}}}});var ku,Mu=E(()=>{"use strict";ku={name:"groupdel",description:"Delete a group",category:"users",params:["<group>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`groupdel: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: groupdel <group>
`,exitCode:1};try{return e.users.deleteGroup(r),{stdout:`groupdel: group '${r}' deleted
`,exitCode:0}}catch(s){return{stderr:`${s instanceof Error?s.message:String(s)}
`,exitCode:1}}}}});var Nu,Au=E(()=>{"use strict";Nu={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t,s=e.users.getUserAllGroups(r);return s.length===0?{stdout:`${r}:`,exitCode:0}:{stdout:`${r} : ${s.join(" ")}`,exitCode:0}}}});var Tu,Ou,Ru=E(()=>{"use strict";re();Tu={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),o=n.find(f=>!f.startsWith("-"));if(!o)return{stderr:`gzip: no file specified
`,exitCode:1};let a=U(e,o),c=t.users.getUid(r),l=t.users.getGid(r);if(i){if(!o.endsWith(".gz"))return{stderr:`gzip: ${o}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};let f=t.vfs.readFile(a),p=a.slice(0,-3);return t.vfs.writeFile(p,f,{},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};if(o.endsWith(".gz"))return{stderr:`gzip: ${o}: already has .gz suffix -- unchanged
`,exitCode:1};let u=t.vfs.readFileRaw(a),d=`${a}.gz`;return t.vfs.writeFile(d,u,{compress:!0},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}},Ou={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(d=>!d.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let o=U(e,i),a=t.users.getUid(r),c=t.users.getGid(r);if(!t.vfs.exists(o))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l,{},a,c),s||t.vfs.remove(o,{recursive:!1},a,c),{exitCode:0}}}});var Du,Fu=E(()=>{"use strict";Q();re();Du={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=pn(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let f=d.split(`
`),p=f.slice(0,a);return p.join(`
`)+(d.endsWith(`
`)&&p.length===f.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let f=U(n,d);try{ge(t,f,"head"),u.push(l(e.vfs.readFile(f)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Uu(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function vb(t){let e=t.aliases?.length?` ${_r}(${t.aliases.join(", ")})${It}`:"";return`  ${Sb}${Uu(t.name,16)}${It}${e}${Uu("",(t.aliases?.length,0))} ${t.description??""}`}function Cb(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let n=[`${zu}Available commands${It}`,`${_r}Type 'help <command>' for detailed usage.${It}`,""],r=[...Lu.filter(i=>e[i]),...Object.keys(e).filter(i=>!Lu.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;n.push(`${bb}${Bu[i]??i}${It}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(vb(c));n.push("")}let s=t.length;return n.push(`${_r}${s} commands available.${It}`),n.join(`
`)}function _b(t){let e=[];if(e.push(`${zu}${t.name}${It} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${_r}Aliases: ${t.aliases.join(", ")}${It}`),e.push(""),e.push(`${xb}Usage:${It}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=Bu[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${_r}Category: ${n}${It}`),e.join(`
`)}function Wu(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let e=eo();if(t[0]){let n=t[0].toLowerCase(),r=e.find(s=>s.name===n||s.aliases?.includes(n));return r?{stdout:_b(r),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Cb(e),exitCode:0}}}}var Lu,Bu,zu,It,Sb,bb,_r,xb,ju=E(()=>{"use strict";Zt();Lu=["navigation","files","text","archive","system","package","network","shell","users","misc"],Bu={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},zu="\x1B[1m",It="\x1B[0m",Sb="\x1B[36m",bb="\x1B[33m",_r="\x1B[2m",xb="\x1B[32m"});var Vu,Gu=E(()=>{"use strict";Vu={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?Number.parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,f)=>`${String(l+f).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});import*as wr from"node:path";function Ku(t,e){t.exists(e)||t.mkdir(e,493)}function Xu(t){if(Ku(t,nn),!t.exists(nn))return{stdout:`No at jobs.
`,exitCode:0};let e=[];try{let n=t.list(nn);for(let r of n)if(!(r==="."||r===".."))try{let s=t.readFile(wr.posix.join(nn,r)),i=$b(r,s);e.push(`${i.id.padEnd(6)} ${i.time.padEnd(20)} ${i.user}`)}catch{e.push(`${r.padEnd(6)} (corrupt)`)}}catch{}return e.length===0?{stdout:`No at jobs.
`,exitCode:0}:{stdout:`${"Job".padEnd(6)} ${"Time".padEnd(20)} User
${e.join(`
`)}
`,exitCode:0}}function Zu(t,e){let n=wr.posix.join(nn,e);return t.exists(n)?(t.remove(n),{stdout:"",exitCode:0}):{stderr:`atrm: job ${e} not found`,exitCode:1}}function wb(t,e){let n=wr.posix.join(nn,e);return t.exists(n)?{stdout:`${t.readFile(n)}
`,exitCode:0}:{stderr:`at: job ${e} not found`,exitCode:1}}function Ib(t,e,n,r){Ku(t,nn);let s=new Date,i=Eb(e,s),o=String(Math.floor(s.getTime()/1e3)+Math.floor(Math.random()*1e3)),a=[`# at job ${o}`,`# scheduled at ${i.toISOString()}`,`# by ${r}`,"cd /",n.trim()].join(`
`);return t.writeFile(wr.posix.join(nn,o),a,{mode:420}),{stdout:`job ${o} at ${i.toLocaleString()}
`,exitCode:0}}function Eb(t,e){let n=t.toLowerCase().trim();if(n==="now")return new Date(e.getTime()+6e4);if(n==="noon")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),12,0);if(n==="midnight")return new Date(e.getFullYear(),e.getMonth(),e.getDate()+1,0,0);if(n==="teatime")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),16,0);let r=n.match(/^\+\s*(\d+)\s*(minute|hour|day|week)s?$/);if(r){let i=Number(r[1]),o=r[2],a=o==="minute"?6e4:o==="hour"?36e5:o==="day"?864e5:6048e5;return new Date(e.getTime()+i*a)}let s=n.match(/^(\d{1,2}):(\d{2})(?:\s+(\d{4})-(\d{2})-(\d{2}))?$/);if(s){let i=Number(s[1]),o=Number(s[2]);if(s[3])return new Date(Number(s[3]),Number(s[4])-1,Number(s[5]),i,o);let a=new Date(e.getFullYear(),e.getMonth(),e.getDate(),i,o);return a<=e?new Date(a.getTime()+864e5):a}return new Date(e.getTime()+36e5)}function $b(t,e){let n=e.split(`
`),r=n.find(i=>i.startsWith("# scheduled at ")),s=n.find(i=>i.startsWith("# by "));return{id:t,time:r?r.replace("# scheduled at ","").replace("T"," ").slice(0,16):"unknown",user:s?s.replace("# by ",""):"unknown"}}var nn,Hu,qu,Yu,Ju=E(()=>{"use strict";Q();nn="/var/spool/at",Hu={name:"at",description:"Schedule delayed execution of commands",category:"system",params:["[options] <time-spec>"],run:({shell:t,args:e,authUser:n})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: at [options] <time-spec>","  -l, --list       List pending jobs (alias: atq)","  -d, --del JOBID  Delete a job (alias: atrm)","  -c JOBID         Show job content","  -f FILE          Read job from file instead of stdin","  -h, --help       Show this help","","Time specs: now, noon, midnight, HH:MM, HH:MM YYYY-MM-DD","            +N minutes/hours/days/weeks"].join(`
`),exitCode:0};let r=t.vfs;if(k(e,["-l","--list"]))return Xu(r);let s=e.indexOf("-d")===-1?e.indexOf("--del"):e.indexOf("-d");if(s!==-1&&s+1<e.length)return Zu(r,e[s+1]);let i=e.indexOf("-c");if(i!==-1&&i+1<e.length)return wb(r,e[i+1]);let a=e.filter(u=>!u.startsWith("-"))[0];if(!a)return{stderr:"at: no time specified",exitCode:1};let c=e.indexOf("-f"),l;if(c!==-1&&c+1<e.length){let u=e[c+1];if(!r.exists(u))return{stderr:`at: ${u}: No such file`,exitCode:1};l=r.readFile(u)}else l=`echo 'at job executed'
`;return Ib(r,a,l,n)}},qu={name:"atq",description:"List pending at jobs",category:"system",params:[],run:({shell:t})=>Xu(t.vfs)},Yu={name:"atrm",description:"Delete pending at jobs",category:"system",params:["<jobid>..."],run:({shell:t,args:e})=>{let n=t.vfs,r=e.filter(s=>!s.startsWith("-"));if(r.length===0)return{stderr:"atrm: missing job ID",exitCode:1};for(let s of r){let i=Zu(n,s);if(i.exitCode!==0)return i}return{stdout:"",exitCode:0}}}});var Qu,ed=E(()=>{"use strict";Qu={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});function nd(t,e){if(!t.exists(e))return[];let n=[],r=t.list(e);for(let s of r){let i=`${e}/${s}`;if(s.endsWith(".log")||s.endsWith(".journal"))n.push(i);else try{n.push(...nd(t,i))}catch{}}return n}function Pb(t){let e,n=!1,r,s;for(let i=0;i<t.length;i++){let o=t[i];if(o==="-f"||o==="--follow")n=!0;else if(o==="-n"||o==="--lines"){let a=t[i+1];a&&!a.startsWith("-")&&(e=Number(a),i++)}else if(o.startsWith("-n")&&o.length>2)e=Number(o.slice(2));else if(o==="-p"||o==="--priority"){let a=t[i+1];a&&!a.startsWith("-")&&(r=a,i++)}else if(o==="-u"||o==="--unit"){let a=t[i+1];a&&!a.startsWith("-")&&(s=a,i++)}}return{lines:e,follow:n,priority:r,unit:s}}function kb(t){return{emerg:0,alert:1,crit:2,err:3,warning:4,notice:5,info:6,debug:7}[t.toLowerCase()]??6}var td,rd=E(()=>{"use strict";Q();td={name:"journalctl",description:"Query the systemd journal",category:"system",params:["[options] [pattern]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: journalctl [OPTIONS...] [PATTERN]","","  -n, --lines=N     Show latest N lines","  -f, --follow      Follow new log entries","  -p, --priority=P  Filter by priority (emerg,alert,crit,err,warning,info,debug)","  -u, --unit=UNIT   Show logs for a specific unit","  --no-pager        Do not pipe output into a pager","  -h, --help        Show this help","","Without arguments, show all log entries."].join(`
`),exitCode:0};let n="/var/log/journal",r=[];try{if(t.vfs.exists(n)){let a=nd(t.vfs,n);for(let c of a){let l=t.vfs.readFile(c);l&&r.push(...l.trim().split(`
`))}}}catch{}if(r.length===0)return{stdout:`${["-- Logs begin at ... --","(no entries)"].join(`
`)}
`,exitCode:0};let s=r,i=Pb(e);if(i.priority){let a=kb(i.priority);s=s.filter(c=>{let l=c.match(/<(\d+)>/);return l?(Number(l[1])&7)<=a:!0})}i.unit&&(s=s.filter(a=>a.toLowerCase().includes(i.unit.toLowerCase()))),i.lines!==void 0&&i.lines>0&&(s=s.slice(-i.lines));let o=`${s.join(`
`)}
`;return i.follow&&o?{stdout:o,exitCode:0}:{stdout:o||`(no entries)
`,exitCode:0}}}});import*as Zn from"node:os";function uo(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?ae.red:t>.5?ae.yellow:ae.green}${"\u2588".repeat(n)}${ae.dim}${"\u2591".repeat(r)}${ae.reset}`}function _n(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function Mb(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var ae,sd,id=E(()=>{"use strict";ae={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};sd={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=Zn.totalmem(),r=Zn.freemem(),s=t.resourceCaps?.ramCapBytes,i=s===void 0?n:Math.min(n,s),o=s===null?r:Math.floor(i*(r/n)),a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=Zn.cpus(),f=(t.resourceCaps?.cpuCapCores===void 0?u.length:Math.min(t.resourceCaps.cpuCapCores,u.length))||4,p=Date.now()-t.startTime,m=t.users.listActiveSessions(),h=m.length+t.users.listProcesses().length+3,g=new Date().toTimeString().slice(0,8),y=a/i,S=l/c,v=20,x=[],A=[];for(let w=0;w<f;w++)A.push(Math.random()*.3+.02);let I=Math.min(f,4);for(let w=0;w<I;w++){let D=A[w],z=(D*100).toFixed(1).padStart(5);x.push(`${ae.bold}${ae.cyan}${String(w+1).padStart(3)}${ae.reset}[${uo(D,v)}${ae.reset}] ${z}%`)}f>4&&x.push(`${ae.dim}    ... ${f-4} more CPU(s) not shown${ae.reset}`),x.push(`${ae.bold}${ae.cyan}Mem${ae.reset}[${uo(y,v)}${ae.reset}] ${_n(a)}/${_n(i)}`),x.push(`${ae.bold}${ae.cyan}Swp${ae.reset}[${uo(S,v)}${ae.reset}] ${_n(l)}/${_n(c)}`),x.push("");let _=A.slice(0,f).reduce((w,D)=>w+D,0)/f,b=(_*f).toFixed(2),C=(_*f*.9).toFixed(2),P=(_*f*.8).toFixed(2);x.push(`${ae.bold}Tasks:${ae.reset} ${ae.green}${h}${ae.reset} total  ${ae.bold}Load average:${ae.reset} ${b} ${C} ${P}  ${ae.bold}Uptime:${ae.reset} ${Mb(p)}`),x.push("");let T=`${ae.bgBlue}${ae.bold}${ae.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${ae.reset}`;x.push(T);let R=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],G=1e3,X=m.map(w=>({pid:G++,user:w.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(m.length,1)*.3})),te=t.users.listProcesses().map(w=>({pid:w.pid,user:w.username,cmd:w.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),$={pid:G++,user:e,cmd:"htop",cpu:.1,mem:.1},O=[...R,...X,...te,$];for(let w of O){let D=_n(Math.floor(Math.random()*200*1024*1024+10485760)),z=_n(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=_n(Math.floor(Math.random()*5*1024*1024+512*1024)),J=w.cpu.toFixed(1).padStart(5),F=w.mem.toFixed(1).padStart(5),j=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,W=w.user==="root"?ae.red:w.user===e?ae.green:ae.cyan,V=w.cmd==="htop"?ae.green:w.cmd==="bash"?ae.cyan:ae.reset;x.push(`${String(w.pid).padStart(5)} ${W}${w.user.padEnd(10).slice(0,10)}${ae.reset}  20   0 ${D.padStart(6)} ${z.padStart(6)} ${Z.padStart(5)} S ${J} ${F} ${j.padStart(9)}  ${V}${w.cmd}${ae.reset}`)}return x.push(""),x.push(`${ae.dim}${g} \u2014 htop snapshot (non-interactive mode)  press ${ae.reset}${ae.bold}q${ae.reset}${ae.dim} to quit in interactive mode${ae.reset}`),{stdout:x.join(`
`),exitCode:0}}}});var od,ad=E(()=>{"use strict";od={name:"id",description:"Print user identity",category:"system",params:["[-u] [-g] [-G] [-n] [user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),s=n.includes("-g"),i=n.includes("-G"),o=n.includes("-n"),a=n.find(m=>!m.startsWith("-"))??t,c=e.users.getUid(a),l=e.users.getGid(a),u=e.users.getUserAllGroups(a),d=u.map(m=>{let h=e.users.getGroup(m);return h?h.gid:0});if(r)return{stdout:String(c),exitCode:0};if(s)return o?{stdout:u.join(" "),exitCode:0}:{stdout:String(l),exitCode:0};if(i)return{stdout:d.join(" "),exitCode:0};let f=e.users.getNameByGid(l)??a,p=u.map(m=>{let h=e.users.getGroup(m);return h?`${h.gid}(${m})`:m}).join(",");return{stdout:`uid=${c}(${a}) gid=${l}(${f}) groups=${p}`,exitCode:0}}}});function cd(t){let e=t.getInterfaces(),n=[];for(let r of e)n.push(dd(r)),n.push("");return{stdout:n.join(`
`),exitCode:0}}function Nb(t){return{stdout:`${dd(t)}
`,exitCode:0}}function dd(t){let e=Ab(t),n=[];n.push(`${t.name}: flags=${e}  mtu ${t.mtu}`),t.type==="loopback"?n.push("        loop  txqueuelen 1000  (Local Loopback)"):n.push(`        ether ${t.mac}  txqueuelen 1000  (Ethernet)`),n.push(`        inet ${t.ipv4}  netmask ${Tb(t.ipv4Mask)}  broadcast ${Rb(t.ipv4,t.ipv4Mask)}`),n.push(`        inet6 ${t.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let r=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(r/64),o=Math.floor(s/64);return n.push(`        RX packets ${i}  bytes ${r} (${ld(r)})`),n.push("        RX errors 0  dropped 0  overruns 0  frame 0"),n.push(`        TX packets ${o}  bytes ${s} (${ld(s)})`),n.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),t.speed&&n.push(`        Speed: ${t.speed}Mb/s  Duplex: ${t.duplex??"full"}`),n.join(`
`)}function Ab(t){let e=4096;return t.state==="UP"&&(e|=1),t.type!=="loopback"&&(e|=4098),t.type==="loopback"&&(e|=8),e}function Tb(t){let e=t===0?0:-1<<32-t>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function Ob(t){return t.split(".").reduce((e,n)=>e+(Number.parseInt(n,10)?Number.parseInt(n,10).toString(2).split("1").length-1:0),0)}function Rb(t,e){let n=t.split(".").reduce((i,o)=>(i<<8)+Number.parseInt(o,10),0)>>>0,r=e===0?0:-1<<32-e>>>0,s=n&r|~r>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function ld(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KiB`:t<1024*1024*1024?`${(t/(1024*1024)).toFixed(1)} MiB`:`${(t/(1024*1024*1024)).toFixed(1)} GiB`}var ud,fd=E(()=>{"use strict";ud={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(s=>!(s.startsWith("-")||["up","down","inet","netmask","mtu","add","del"].includes(s)));if(t.includes("-a")||!r&&t.length===0)return cd(n);if(r){let s=n.getInterface(r);if(!s)return{stderr:`ifconfig: ${r}: error fetching interface information: Device not found
`,exitCode:1};if(t.includes("up"))return n.setInterfaceState(r,"UP"),{exitCode:0};if(t.includes("down"))return n.setInterfaceState(r,"DOWN"),{exitCode:0};let i=t.indexOf("inet");if(i!==-1){let a=t[i+1],c=t.indexOf("netmask"),l=c===-1?24:Ob(t[c+1]??"255.255.255.0");return a&&n.setInterfaceIp(r,a,l),{exitCode:0}}let o=t.indexOf("mtu");if(o!==-1){let a=Number.parseInt(t[o+1]??"1500",10);return Number.isNaN(a)||n.setInterfaceMtu(r,a),{exitCode:0}}return Nb(s)}return cd(n)}}});function Ir(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var fo=E(()=>{"use strict"});var _s,po=E(()=>{"use strict";fo();fo();_s=class t{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:Ir(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(n=>n.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let n=this._interfaces.findIndex(r=>r.name===e);return n===-1?!1:(this._interfaces.splice(n,1),this._routes=this._routes.filter(r=>r.device!==e),this.arpCache=this.arpCache.filter(r=>r.device!==e),!0)}setInterfaceType(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.type=n,!0):!1}setInterfaceMtu(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.mtu=n,!0):!1}setInterfaceSpeed(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.speed=n,!0):!1}addRoute(e,n,r,s,i){this._routes.push({destination:e,gateway:n,netmask:r,device:s,flags:n==="0.0.0.0"?"U":"UG",metric:i??0,scope:n==="0.0.0.0"?"link":"global"})}delRoute(e){let n=this._routes.findIndex(r=>r.destination===e);return n===-1?!1:(this._routes.splice(n,1),!0)}addRoutingTable(e){let n=this._nextTableId++;return this._routingTables.push({id:n,name:e,routes:[]}),n}getRoutingTable(e){return this._routingTables.find(n=>n.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,n,r,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:n,netmask:r,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let n=this._policyRules.length>0?Math.max(...this._policyRules.map(r=>r.priority))+1e3:1e3;return this._policyRules.push({...e,priority:n}),n}listPolicyRules(){return[...this._policyRules].sort((e,n)=>e.priority-n.priority)}delPolicyRule(e){let n=this._policyRules.findIndex(r=>r.priority===e);return n===-1?!1:(this._policyRules.splice(n,1),!0)}setInterfaceState(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=n,s.ipv4Mask=r,!0):!1}getInterface(e){return this._interfaces.find(n=>n.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${t._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){let e=[],n=[...this._routes].sort((r,s)=>(r.metric??0)-(s.metric??0));for(let r of n)r.destination==="default"?e.push(`default via ${r.gateway} dev ${r.device}${r.metric?` metric ${r.metric}`:""}`):e.push(`${r.destination}/${t._maskToCidr(r.netmask)} dev ${r.device}${r.metric?` metric ${r.metric}`:""}${r.scope?` scope ${r.scope}`:""}${r.proto?` proto ${r.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let n=this._routingTables.find(r=>r.id===e);return!n||n.routes.length===0?"":n.routes.map(r=>r.destination==="default"?`default via ${r.gateway} dev ${r.device}`:`${r.destination}/${t._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let n=[];for(let r of e){let s=`${r.priority}:	`;if(r.from&&(s+=`from ${r.from} `),r.to&&(s+=`to ${r.to} `),r.iif&&(s+=`iif ${r.iif} `),r.oif&&(s+=`oif ${r.oif} `),r.action==="lookup"){let i=this._routingTables.find(o=>o.id===r.table);s+=`lookup ${i?.name??r.table}`}else s+=r.action;n.push(s)}return n.push("32766:	from all lookup main"),n.push("32767:	from all lookup default"),n.join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";r.speed&&(i+=`    ${r.speed}Mb/s`),r.duplex&&(i+=` ${r.duplex}-duplex`),e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${t._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff${i}`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}static _linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}static _maskToCidr(e){return e.split(".").reduce((n,r)=>n+(Number.parseInt(r,10)?Number.parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,n){return e in this._policies?(this._policies[e]=n,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,n,r,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==n)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let n of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${n} (policy ${this._policies[n]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let r of this._firewallRules){if(r.chain!==n)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let n={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(n),n}updateConntrack(e,n,r,s,i,o){let a=this._findConntrack(e,n,r,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(n,e,r,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:r,srcIp:e,dstIp:n,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let n=e.protocol.padEnd(5),r=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${n} ${r} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,n,r,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===n&&o.protocol===r&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,n=this._conntrack[0]?.timestamp??0;for(let r=1;r<this._conntrack.length;r++)(this._conntrack[r]?.timestamp??0)<n&&(n=this._conntrack[r]?.timestamp??0,e=r);this._conntrack.splice(e,1)}resolveRoute(e){for(let r of this.listPolicyRules())if(!(r.from&&!t._ipMatchesRule(e,r.from))&&!(r.to&&!t._ipMatchesRule(e,r.to))){if(r.action==="blackhole")return{route:null,table:-1};if(r.action==="unreachable")return{route:null,table:-2};if(r.action==="prohibit")return{route:null,table:-3};if(r.action==="lookup"){let s=this._routingTables.find(i=>i.id===r.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:r.table}}}}return{route:this._routes.find(r=>this._ipMatchesDestination(e,r))??null,table:254}}static _ipMatchesRule(e,n){if(n==="all")return!0;if(n.includes("/")){let[r,s]=n.split("/"),i=Number.parseInt(s??"32",10),o=t._ipToInt(e),a=t._ipToInt(r??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===n}_ipMatchesDestination(e,n){if(n.destination==="default"||n.destination===e)return!0;if(n.destination.includes("/"))return t._ipMatchesRule(e,n.destination);let r=t._ipToInt(e),s=t._ipToInt(n.destination),i=t._ipToInt(n.netmask);return(r&i)===(s&i)}static _ipToInt(e){return e.split(".").reduce((n,r)=>(n<<8)+Number.parseInt(r,10),0)>>>0}}});var pd,md=E(()=>{"use strict";po();pd={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=Number.parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){let i=t.indexOf("table"),o=i===-1?void 0:Number.parseInt(t[i+1]??"254",10);if(s==="add"){let a=t.indexOf("via"),c=t.indexOf("dev"),l=t.indexOf("metric"),u=t[1]==="add"?t[2]:t[1],d=a===-1?"0.0.0.0":t[a+1],f=c===-1?"eth0":t[c+1],p=l===-1?void 0:Number.parseInt(t[l+1]??"0",10);return u&&u!=="add"&&(o?n.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",f??"eth0",o):n.addRoute(u,d??"0.0.0.0","255.255.255.0",f??"eth0",p)),{exitCode:0}}if(s==="del"){let a=t[1]==="del"?t[2]:t[1];return a&&a!=="del"&&n.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=t[2];t.includes("up")&&i&&n.setInterfaceState(i,"UP"),t.includes("down")&&i&&n.setInterfaceState(i,"DOWN");let o=t.indexOf("mtu");if(o!==-1&&i){let a=Number.parseInt(t[o+1]??"1500",10);Number.isNaN(a)||n.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=t.indexOf("type"),o="eth1";for(let c=2;c<t.length;c++){let l=t[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=t[c]??"eth1";break}}let a=i===-1?"ether":t[i+1]??"ether";return n.addInterface({name:o,type:a,mac:Ir(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=t[2];return i&&n.removeInterface(i),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}if(r==="neigh"||r==="n")return{stdout:`${n.formatIpNeigh()}
`,exitCode:0};if(r==="rule"||r==="ru"){if(s==="show"||s==="list")return{stdout:`${n.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=t.indexOf("from"),o=t.indexOf("to"),a=t.indexOf("table"),c=t.indexOf("iif"),l=t.indexOf("oif");return n.addPolicyRule({from:i===-1?void 0:t[i+1],to:o===-1?void 0:t[o+1],table:Number.parseInt(t[a+1]??"254",10),iif:c===-1?void 0:t[c+1],oif:l===-1?void 0:t[l+1],action:"lookup"}),{exitCode:0}}if(s==="del"){let i=Number.parseInt(t[2]??"0",10);return i&&n.delPolicyRule(i),{exitCode:0}}return{stdout:`${n.formatIpRule()}
`,exitCode:0}}if(r==="route"&&t.includes("table")){let i=t.indexOf("table"),o=Number.parseInt(t[i+1]??"254",10);return{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var hd,gd=E(()=>{"use strict";hd={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let n=e.network,r="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=t[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=Number.parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break;default:break}}switch(r){case"list":return{stdout:`${n.formatFirewall()}
`,exitCode:0};case"flush":return n.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!(s&&(t.includes("-j")||["ACCEPT","DROP"].includes(t[t.length-1]??"")))){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?n.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?n.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return s&&i.action?["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${n.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -A requires chain and -j action",exitCode:1};default:return{stderr:"iptables: no action specified (-L, -A, -F, -P)",exitCode:1}}}}});function yd(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=Number.parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var Sd,bd,xd,vd=E(()=>{"use strict";Sd={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},bd={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=yd(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},xd={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=yd(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function mo(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in Er)return e;let n=t.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(Er))if(s.name===`SIG${n}`||s.name===n)return Number(r);return null}var Er,Cd=E(()=>{"use strict";Er={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var _d,wd=E(()=>{"use strict";Cd();_d={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let n=15,r;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(Er).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=mo(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};n=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=mo(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};n=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=Number.parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(s,n)?{stdout:`Sent ${Er[n]?.name??`signal ${n}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var Id,Ed,$d=E(()=>{"use strict";Ke();Id={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,s=`${pe(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},Ed={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?Number.parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var $r,Pd,kd=E(()=>{"use strict";Q();$r=24,Pd={name:"less",description:"View file content with pagination",category:"files",params:["[-N] [file...]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: less [options] file...","  -N, --line-numbers  Show line numbers","  -h, --help          Show this help","","View file content with paginated output."].join(`
`),exitCode:0};let n=k(e,["-N","--line-numbers"]),r=e.filter(l=>!l.startsWith("-"));if(r.length===0)return{stderr:"less: missing file operand",exitCode:1};let s=[];for(let l of r){if(!t.vfs.exists(l))return{stderr:`less: ${l}: No such file`,exitCode:1};let u=t.vfs.readFile(l),d=u.split(`
`);if(n){let f=String(d.length).length,p=d.map((m,h)=>`${String(h+1).padStart(f)}  ${m}`);s.push(p.join(`
`))}else s.push(u)}let i=s.join(`

`),o=i.split(`
`).length;if(o<=$r)return{stdout:`${i}
`,exitCode:0};let a=[],c=i.split(`
`);for(let l=0;l<c.length;l+=$r){let u=c.slice(l,l+$r),d=Math.min(100,Math.round((l+$r)/o*100));a.push(u.join(`
`)),l+$r<c.length&&a.push(`
--More--(${d}%)`)}return{stdout:`${a.join(`
`)}
(END)
`,exitCode:0}}}});var Md,Nd,Ad=E(()=>{"use strict";Q();re();Md={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=k(r,["-s","--symbolic"]),a=r.filter(f=>!f.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"ln: missing operand",exitCode:1};let u=U(n,l),d=o?c:U(n,c);try{if(ge(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let f=U(n,c);if(ge(t,f,"ln"),!e.vfs.exists(f))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let p=e.vfs.readFile(f,s,i);e.vfs.writeFile(u,p,{},s,i)}return{exitCode:0}}catch(f){return{stderr:`ln: ${f instanceof Error?f.message:String(f)}`,exitCode:1}}}},Nd={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=U(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function Jn(t,e){return e?`${e}${t}${Db}`:t}function go(t,e,n){if(n)return Lb;if(e==="directory"){let r=!!(t&512),s=!!(t&2);return r&&s?Bb:r?zb:s?Wb:Fb}return e==="device"?Td:t&73?Ub:Td}function Od(t,e,n){let r;n?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function ho(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,s=String(t.getDate()).padStart(2," "),i=jb[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function ws(t,e){try{return t.readFile(e)}catch{return"?"}}function Vb(t,e,n){let r=e==="/"?"":e;return n.map(s=>{let i=`${r}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=go(a.mode,a.type,o);return Jn(s,c)}).join("  ")}function Gb(t,e,n,r){let s=n==="/"?"":n,i=r.map(u=>{let d=`${s}/${u}`,f=t.isSymlink(d),p;try{p=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:ho(new Date),label:u}}let m=f?41471:p.mode,h=Od(m,p.type,f),g=p.type==="directory"?String((p.childrenCount??0)+2):"1",y=f?ws(t,d).length:p.type==="file"?p.size??0:p.type==="device"?0:(p.childrenCount??0)*4096,S=String(y),v=ho(p.updatedAt),x=go(m,p.type,f),A=f?`${Jn(u,x)} -> ${ws(t,d)}`:Jn(u,x);return{perms:h,nlink:g,size:S,date:v,label:A}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=r.length*8,l=i.map((u,d)=>{let f=(()=>{try{return t.stat(`${s}/${r[d]}`)}catch{return null}})(),p=f&&"uid"in f?f.uid:0,m=f&&"gid"in f?f.gid:0,h=e.getUsername(p)??String(p),g=e.getGroupName(m)??String(m);return`${u.perms} ${u.nlink.padStart(o)} ${h} ${g} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var Db,Fb,Lb,Ub,Td,Bb,zb,Wb,jb,Rd,Dd=E(()=>{"use strict";Q();re();Db="\x1B[0m",Fb="\x1B[1;34m",Lb="\x1B[1;36m",Ub="\x1B[1;32m",Td="",Bb="\x1B[30;42m",zb="\x1B[37;44m",Wb="\x1B[34;42m";jb=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];Rd={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=k(r,["-l","--long","-la","-al"]),i=k(r,["-a","--all","-la","-al"]),o=Xt(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=U(n,o??n);if(qe(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let f=a.split("/").pop()??a,p=go(d?41471:u.mode,u.type,d);if(s){let m=d?41471:u.mode,h=d?ws(e.vfs,a).length:u.size??0,g=Od(m,u.type,d),y=d?`${Jn(f,p)} -> ${ws(e.vfs,a)}`:Jn(f,p),S="uid"in u?u.uid:0,v="gid"in u?u.gid:0,x=e.users.getUsername(S)??String(S),A=e.users.getGroupName(v)??String(v);return{stdout:`${g} 1 ${x} ${A} ${h} ${ho(u.updatedAt)} ${y}
`,exitCode:0}}return{stdout:`${Jn(f,p)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?Gb(e.vfs,e.users,a,c):Vb(e.vfs,a,c)}
`,exitCode:0}}}});var Fd,Ld=E(()=>{"use strict";Q();Fd={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let f of d.split(`
`))f.startsWith("PRETTY_NAME=")&&(n=f.slice(12).replace(/^"|"$/g,"").trim()),f.startsWith("VERSION_CODENAME=")&&(r=f.slice(17).trim()),f.startsWith("VERSION_ID=")&&(s=f.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=k(t,["-a","--all"]),o=k(t,["-i","--id"]),a=k(t,["-d","--description"]),c=k(t,["-r","--release"]),l=k(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var Ud,Bd=E(()=>{"use strict";Ud={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});function yo(t,e,n,r,s,i){let o=t.vfs.readFile(e),a=Hb(o);if(a.length===0)return{stdout:`make: Nothing to be done for '${n[0]??"all"}'.`,exitCode:0};let c=n.length>0?n:["all"],l=[];for(let u of c){let d=a.find(f=>f.target===u);if(!d)return{stderr:`make: *** No rule to make target '${u}'.  Stop.`,exitCode:2};for(let f of d.deps)if(!t.vfs.exists(f)){if(!a.find(m=>m.target===f))return{stderr:`make: *** No rule to make target '${f}', needed by '${u}'.  Stop.`,exitCode:2};s||l.push("make: Entering unknown directory")}for(let f of d.cmds){let p=f.startsWith("@")?f.slice(1):f;s||r?r&&l.push(p):l.push(p)}}return l.length===0&&l.push(`make: Nothing to be done for '${c.join(" ")}'.`),{stdout:`${l.join(`
`)}
`,exitCode:0}}function Hb(t){let e=[],n=t.split(`
`),r=null;for(let s of n){let i=s.trim();if(!i||i.startsWith("#"))continue;if(i.startsWith("	")||i.startsWith(" ")){let a=i.replace(/^[\t ]+/,"");r&&r.cmds.push(a);continue}let o=i.match(/^([a-zA-Z0-9_.-/]+)\s*:\s*(.*)$/);if(o){r&&e.push(r);let a=o[1],c=o[2].trim(),l=c?c.split(/\s+/):[];r={target:a,deps:l,cmds:[]}}}return r&&e.push(r),e}var zd,Wd=E(()=>{"use strict";Q();zd={name:"make",description:"Build targets from a Makefile",category:"development",params:["[options] [target...]"],run:({shell:t,args:e,cwd:n})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: make [options] [target...]","  -C <dir>       Change to directory before reading Makefile","  -f <file>      Use file as Makefile","  -n, --dry-run  Print commands without executing","  -s, --silent   Silent operation","  -h, --help     Show this help","","Build targets from Makefile in current directory."].join(`
`),exitCode:0};let r=k(e,["-n","--dry-run"]),s=k(e,["-s","--silent"]),i=e.indexOf("-f"),o=i!==-1&&i+1<e.length?e[i+1]:null,a=e.indexOf("-C"),c=a!==-1&&a+1<e.length?e[a+1]:n,l=e.filter(d=>!d.startsWith("-")&&d!==e[i+1]&&d!==e[a+1]),u=o?o.startsWith("/")?o:`${c}/${o}`:`${c}/Makefile`;if(!t.vfs.exists(u)){let d=`${c}/GNUmakefile`;if(t.vfs.exists(d))return yo(t,d,l,r,s,c);let f=`${c}/makefile`;return t.vfs.exists(f)?yo(t,f,l,r,s,c):{stderr:"make: *** No targets specified and no makefile found.  Stop.",exitCode:2}}return yo(t,u,l,r,s,c)}}});var jd,Vd=E(()=>{"use strict";jd={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       echo "scale=2; 10/3" | bc   # division with 2 decimal places`,builtin:`BUILTIN(1)               Shell Builtins              BUILTIN(1)

NAME
       builtin - run a shell builtin command

SYNOPSIS
       builtin [builtin_name [args...]]

DESCRIPTION
       Execute  the  specified  shell builtin, ignoring any shell
       function or alias with the same name.

       If builtin_name is not a shell builtin, a non-zero  exit
       status is returned.

EXIT STATUS
       Returns the exit status of the executed builtin.

       Returns 1 if builtin_name is not a shell builtin.

       Returns 1 if no builtin_name is given.

EXAMPLES
       builtin echo hello
       builtin readonly
       builtin set -o`,bzip2:`BZIP2(1)               User Commands               BZIP2(1)

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
       bzip2 -k file.txt     # compress but keep original`,caller:`CALLER(1)                User Commands                    CALLER(1)

NAME
       caller - print the current call stack frame

SYNOPSIS
       caller [n]

DESCRIPTION
       Print the current call stack frame.  With n, print the n-th
       calling frame (0 is the current function, 1 is its caller,
       etc.).  Without n, print frame 0.

       Output format: <line> <file> <function>

EXAMPLES
       caller
       caller 0
       caller 1`,cat:`CAT(1)                   User Commands                    CAT(1)

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
       three-column output of common and unique lines.`,command:`COMMAND(1)               User Commands                    COMMAND(1)

NAME
       command - run a command or display information about it

SYNOPSIS
       command [-vVp] <command> [args...]

DESCRIPTION
       Run a command or display information about how a command would
       be resolved.

       -v     Print the path or name of the command.
       -V     Print a verbose description of the command.
       -p     Use a default PATH (POSIX-standard path) instead of the
              current shell PATH.

       Without -v or -V, run the command with the given arguments,
       bypassing any shell function with the same name.

EXAMPLES
       command -v ls
       command -V ls
       command -p ls -la`,conntrack:`CONNTRACK(8)       System Administration       CONNTRACK(8)

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
       declare, local, typeset - set variable values and attributes

SYNOPSIS
       declare [OPTION]... [NAME[=VALUE]...]
       local [NAME[=VALUE]...]

OPTIONS
       -i     Variable has integer attribute (arithmetic evaluation).
       -r     Make NAMEs readonly.
       -x     Export NAMEs to environment.
       -a     Declare array variable.

DESCRIPTION
       Set variable values and attributes.  Without arguments, print
       all shell variables with their attributes.

       The local keyword is equivalent to declare inside a function
       body, and the variable's scope is limited to the function.
       Local variables are automatically restored when the function
       returns.

EXAMPLES
       declare -r PATH
       declare -i count=0
       local myvar=hello
       declare -x MY_ENV=value`,deluser:`DELUSER(8)                User Commands                DELUSER(8)

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
       export [-fn] [-p] [NAME[=VALUE] ...]

OPTIONS
       -f     Operate on shell functions (export -f funcname).
       -n     Remove the export attribute from each NAME.
       -p     Print all exported variables (default with no args).

DESCRIPTION
       Mark each NAME for automatic export to the environment of
       subsequently executed commands.  With NAME=VALUE, set the
       variable to VALUE and mark it exported.

EXAMPLES
       export PATH="$PATH:/usr/local/bin"
       export NODE_ENV=production
       export -n PATH
       export -f myfunc
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
       Compress or decompress files in place.`,hash:`HASH(1)                  User Commands                    HASH(1)

NAME
       hash - display and manage the command hash table

SYNOPSIS
       hash [-r] [name ...]

DESCRIPTION
       Display and manage the internal hash table of command locations.
       The shell caches the full path of each looked-up command to
       avoid repeated PATH searches.

       -r     Clear the entire hash table.

       With name arguments, hash the named commands and add them to
       the hash table.  Without arguments, display the current hash
       table contents.

EXAMPLES
       hash
       hash ls cat grep
       hash -r`,head:`HEAD(1)                  User Commands                    HEAD(1)

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
       read [-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] [NAME...]

OPTIONS
       -r        Do not allow backslashes to escape characters.
       -d delim  Read until DELIM instead of newline.
       -n nchars Return after reading NCHARS characters.
       -p PROMPT Output PROMPT before reading.
       -s        Silent mode (do not echo input).
       -t TIMEOUT Time out after TIMEOUT seconds.
       -a ARRAY  Store words into array ARRAY.

EXAMPLES
       read name
       read -p "Enter name: " name
       read -s password
       read -r line
       read -d: field
       read -n 5 first5
       read -a arr`,readlink:`READLINK(1)               User Commands                READLINK(1)

NAME
       readlink - print resolved symbolic links or canonical file names

SYNOPSIS
       readlink [OPTION]... FILE

OPTIONS
       -f     canonicalize by following every symlink in every component`,readonly:`READONLY(1)              User Commands                    READONLY(1)

NAME
       readonly - mark shell variables as readonly

SYNOPSIS
       readonly [-p] [NAME[=VALUE] ...]

DESCRIPTION
       Mark shell variables as readonly.  Subsequent attempts to modify
       a readonly variable will fail.

       -p     Print all readonly variables (default when no NAME given).

       With NAME, mark the named variable as readonly.  With
       NAME=VALUE, set the variable to VALUE and mark it readonly.

EXAMPLES
       readonly PATH
       readonly MYVAR=hello
       readonly -p

NOTES
       Readonly status is stored in the shell environment and persists
       until the shell session ends.`,realpath:`REALPATH(1)              User Commands              REALPATH(1)

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
       set [+-abCefhkmnuvx] [+-o option] [-- args]

OPTIONS
       -e     Exit immediately if a command exits with non-zero status.
       -u     Treat unset variables as an error.
       -x     Print commands and their arguments as they execute.
       -C     Prevent redirection from overwriting files (noclobber).

       -o option
              Enable an option by name (errexit, nounset, noclobber,
              xtrace, pipefail).

       +o option
              Disable an option by name.

       --     Mark the end of options.  Remaining arguments are
              assigned to positional parameters ($1, $2, ...).

DESCRIPTION
       Display or modify shell variables and options.  With no
       arguments, print all shell variables.

EXAMPLES
       set -e
       set -o pipefail
       set +o nounset
       set -- one two three
       set -eux`,sh:`SH(1)                    User Commands                      SH(1)

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
       Rename positional parameters by discarding the first N arguments.`,shopt:`SHOPT(1)                 User Commands                    SHOPT(1)

NAME
       shopt - manage shell options (bash extension)

SYNOPSIS
       shopt [-pqsu] [-o] [optname ...]

DESCRIPTION
       Display and manage shell option variables.  Without arguments,
       list all shell options and their current state.

       -s     Set (enable) the named options.
       -u     Unset (disable) the named options.
       -q     Quiet mode: return 0 if all named options are set, 1
              otherwise.  No output is printed.
       -p     Print option settings in a reusable format.
       -o     Use POSIX-style option names (errexit, nounset, etc.)
              instead of bash-style names.

       Shell options are stored in the environment.  Options that can
       be set via shopt include: dotglob, nullglob, failglob, extglob,
       histexpand, cdable_vars, extdebug.

EXAMPLES
       shopt
       shopt -s dotglob
       shopt -u nullglob
       shopt -q extglob`,shuf:`SHUF(1)                  User Commands                    SHUF(1)

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
       test, [ - check file types and compare values

SYNOPSIS
       test EXPRESSION
       [ EXPRESSION ]

DESCRIPTION
       Evaluate conditional expressions for scripts and shell logic.
       Returns 0 (true) if EXPRESSION evaluates to true, 1 (false)
       otherwise.

FILE TESTS
       -b FILE     True if FILE is a block device.
       -c FILE     True if FILE is a character device.
       -d FILE     True if FILE is a directory.
       -e FILE     True if FILE exists.
       -f FILE     True if FILE is a regular file.
       -g FILE     True if FILE has SGID bit set.
       -k FILE     True if FILE has sticky bit set.
       -L FILE     True if FILE is a symbolic link.
       -p FILE     True if FILE is a named pipe.
       -r FILE     True if FILE is readable.
       -S FILE     True if FILE is a socket.
       -s FILE     True if FILE exists and is non-empty.
       -t FD       True if FD is a terminal.
       -w FILE     True if FILE is writable.
       -x FILE     True if FILE is executable.
       -nt         True if FILE1 is newer than FILE2.
       -ot         True if FILE1 is older than FILE2.
       -ef         True if FILE1 and FILE2 refer to the same file.

STRING TESTS
       -n STRING   True if STRING is non-empty.
       -z STRING   True if STRING is empty.
       STRING1 = STRING2    True if equal.
       STRING1 != STRING2   True if not equal.
       STRING1 < STRING2    True if lexicographically less.
       STRING1 > STRING2    True if lexicographically greater.

NUMERIC TESTS
       -eq  -ne  -lt  -le  -gt  -ge

OTHER TESTS
       -o OPTION   True if shell option OPTION is set.
       -v VAR      True if variable VAR is set.
       -R VAR      True if VAR is a name reference.

LOGICAL OPERATORS
       ! EXPR      Negation.
       EXPR1 -a EXPR2    And.
       EXPR1 -o EXPR2    Or.

EXAMPLES
       test -f /etc/passwd
       [ -d /tmp ]
       [ "$USER" = "root" ]`,timeout:`TIMEOUT(1)               User Commands                  TIMEOUT(1)

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
       type [-afptP] NAME...

OPTIONS
       -a     Show all locations containing the command (all builtins
              and all PATH matches).
       -f     Suppress shell function lookup.
       -p     Print the disk file path of the command.
       -t     Print a single word: alias, builtin, file, function, or
              keyword.

DESCRIPTION
       Indicate how each NAME would be interpreted if used as a
       command name.  Shows whether NAME is a shell builtin, function,
       or found in PATH.

EXAMPLES
       type ls
       type -t ls
       type -p ls
       type -a ls`,uname:`UNAME(1)                 User Commands                  UNAME(1)

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
       unset [-fv] NAME...

OPTIONS
       -f     Unset a shell function (NAME refers to a function).
       -v     Unset a shell variable (default).

DESCRIPTION
       Remove one or more shell variables or functions from the
       current environment.

EXAMPLES
       unset MYVAR
       unset -v MYVAR
       unset -f myfunc`,uptime:`UPTIME(1)                User Commands                  UPTIME(1)

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
       wait [-n] [jobspec or pid ...]

OPTIONS
       -n     Wait for the next background job to complete and return
              its exit status.

DESCRIPTION
       Wait for each specified process or job and return its
       termination status.  If no arguments are given, wait for all
       currently active background jobs.

EXAMPLES
       sleep 5 &
       wait
       echo "done"
       sleep 3 &
       wait -n`,wc:`WC(1)                    User Commands                      WC(1)

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
       zip -d archive.zip file.txt   # remove from archive`}});var qb,Gd,Hd=E(()=>{"use strict";Vd();qb={gunzip:"gzip","[":"test","[[":"test"},Gd={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=qb[s]??s,o=jd[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import{createHash as qd}from"node:crypto";import*as Yd from"node:path";var Kd,Xd,Zd,Jd,Qd,ef,tf,nf=E(()=>{"use strict";Q();re();Kd={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=U(e,r);if(!t.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${Yd.posix.normalize(i)}
`,exitCode:0}}},Xd={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=U(e,r);if(!t.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${qd("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Zd={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=U(e,r);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${qd("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Jd={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=U(e,r);if(!t.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Qd={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=$e(n,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=U(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let f=[];for(let p=0;p<d.length;p+=o)f.push(d.slice(p,p+o));return f.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},ef={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=$e(n,{flagsWithValue:["-t","--tabs"]}),o=Number.parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=U(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},tf={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=$e(n,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let f=U(e,a);if(!t.vfs.exists(f))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(f)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let f of l)d.length+f.length+(d?1:0)>o?(d&&u.push(d),d=f):d=d?`${d} ${f}`:f;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});function Xb(t){return t?Kb:Yb}var Yb,Kb,rf,sf=E(()=>{"use strict";Yb={dotglob:"__dotglob",nullglob:"__nullglob",failglob:"__failglob",extglob:"__extglob",histexpand:"__histexpand",cdable_vars:"__cdable_vars",extdebug:"__extdebug"},Kb={errexit:"__errexit",nounset:"__nounset",noclobber:"__noclobber",xtrace:"__xtrace",pipefail:"__pipefail"};rf={name:"shopt",description:"Manage shell options",category:"shell",params:["[-pqsu] [-o] [optname ...]"],run:({args:t,env:e})=>{let n=t.includes("-s"),r=t.includes("-u"),s=t.includes("-q"),i=t.includes("-o"),o=t.filter(l=>!["-s","-u","-q","-o"].includes(l)),a=Xb(i);if(o.length===0){let l=[];for(let[u,d]of Object.entries(a)){let f=e.vars[d]==="1";l.push(`${f?"on":"off"}	${u}`)}return{stdout:`${l.join(`
`)}
`,exitCode:0}}if(n){for(let l of o){let u=a[l];u&&(e.vars[u]="1")}return{exitCode:0}}if(r){for(let l of o){let u=a[l];u&&delete e.vars[u]}return{exitCode:0}}if(s){for(let l of o){let u=a[l];if(!u||e.vars[u]!=="1")return{exitCode:1}}return{exitCode:0}}let c=[];for(let l of o){let u=a[l],d=u?e.vars[u]==="1":!1;c.push(`${d?"on":"off"}	${l}`)}return{stdout:`${c.join(`
`)}
`,exitCode:0}}}});import*as of from"node:path";var af,cf=E(()=>{"use strict";Q();re();af={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=Xt(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=U(n,a);qe(e.vfs,e.users,t,of.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var lf,uf,df,ff=E(()=>{"use strict";lf=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],uf={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let n="null",r="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!lf.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${lf.join(", ")}`,exitCode:1};n=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(r,n),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},df={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e,authUser:n})=>{let r=e.find(o=>!o.startsWith("-"));if(!r)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};let s=t.users.getUid(n),i=t.users.getGid(n);try{return t.vfs.writeFile(r,"",{mode:420},s,i),{exitCode:0}}catch(o){return{stderr:`mkfifo: ${o instanceof Error?o.message:String(o)}`,exitCode:1}}}}});var Pr,pf,mf=E(()=>{"use strict";Q();Pr=24,pf={name:"more",description:"View file content page by page",category:"files",params:["[options] [file...]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: more [options] file...","  -d               Show prompts with [Press space to continue]","  -h, --help       Show this help","","View file content one screen at a time."].join(`
`),exitCode:0};let n=e.filter(a=>!a.startsWith("-"));if(n.length===0){if(!process.stdin.isTTY){let a="",c=process.stdin.read();return c&&(a=c.toString()),{stdout:`${a}
`,exitCode:0}}return{stderr:"more: missing file operand",exitCode:1}}let r=[];for(let a of n){if(!t.vfs.exists(a))return{stderr:`more: ${a}: No such file`,exitCode:1};let c=t.vfs.readFile(a);r.push(c)}let s=r.join(`

`),i=s.split(`
`);if(i.length<=Pr)return{stdout:`${s}
`,exitCode:0};let o=[];for(let a=0;a<i.length;a+=Pr){let c=i.slice(a,a+Pr),l=Math.min(100,Math.round((a+Pr)/i.length*100));o.push(c.join(`
`)),a+Pr<i.length&&o.push(`
--More--(${l}%)`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var hf,gf=E(()=>{"use strict";hf={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});import*as yf from"node:path";var Sf,bf=E(()=>{"use strict";re();Sf={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r.filter(d=>!d.startsWith("-")),[i,o]=s;if(!(i&&o))return{stderr:"mv: missing operand",exitCode:1};let a=U(n,i),c=U(n,o),l=e.users.getUid(t),u=e.users.getGid(t);try{if(qe(e.vfs,e.users,t,a,2),qe(e.vfs,e.users,t,yf.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,d,l,u),{exitCode:0}}catch(d){return{stderr:`mv: ${d instanceof Error?d.message:String(d)}`,exitCode:1}}}}});import*as xf from"node:path";var vf,Cf=E(()=>{"use strict";re();vf={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=U(n,s);ge(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=xf.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as kf,readdirSync as Zb,readFileSync as So}from"node:fs";import*as Ge from"node:os";import*as Mf from"node:path";function Jb(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function _f(t){return`\x1B[${t}m   \x1B[0m`}function Qb(){let t=[40,41,42,43,44,45,46,47].map(_f).join(""),e=[100,101,102,103,104,105,106,107].map(_f).join("");return[t,e]}function wf(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:e/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function e1(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?If(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return If(n)+r}function If(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return i}function Ef(t){return Math.max(0,Math.round(t/(1024*1024)))}function $f(){try{let t=So("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{}}function Pf(t){try{let e=So(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{}}function t1(t){let e=Pf("/sys/devices/virtual/dmi/id/sys_vendor"),n=Pf("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function n1(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(kf(e))try{return So(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function r1(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(kf(e))try{return Zb(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function s1(){let t=n1(),e=r1();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function i1(t){let e=Ge.cpus(),n=t.cpuCapCores,r=n!==void 0&&n>0?e.slice(0,n):e;if(r.length===0)return"unknown";let s=r[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${r.length}) @ ${i}GHz`}function o1(t){return!t||t.trim().length===0?"unknown":Mf.posix.basename(t.trim())}function a1(t){let e=Ge.totalmem(),n=Ge.freemem(),r=t.ramCapBytes,s=r!==void 0&&r>0?Math.min(e,r):e,i=r!==void 0&&r>0?Math.floor(s*(n/e)):n,o=Math.max(0,s-i),a=t.shellProps,c=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(c)),{user:t.user,host:t.host,osName:a?.os??t.osName??`${$f()??Ge.type()} ${Ge.arch()}`,kernel:a?.kernel??t.kernel??Ge.release(),uptimeSeconds:t.uptimeSeconds??Ge.uptime(),packages:t.packages??s1(),shell:o1(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Ge.release(),os:t.osName??`${$f()??Ge.type()} ${Ge.arch()}`,arch:Ge.arch()},resolution:t.resolution??a?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??i1(t),gpu:t.gpu??a?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??Ef(o),memoryTotalMiB:t.memoryTotalMiB??Ef(s),cpuCapCores:t.cpuCapCores??0,ramCapBytes:t.ramCapBytes??0}}function Nf(t){let e=a1(t),n=Jb(e.uptimeSeconds),r=Qb(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${t1(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=wf(l.padEnd(31," "),c,s.length),f=e1(u);a.push(`${d}  ${f}`);continue}a.push(wf(l,c,s.length))}return a.join(`
`)}var Af=E(()=>{"use strict"});var Tf,Of=E(()=>{"use strict";Af();Q();Tf={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?k(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:k(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:Nf({user:e,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:r.resourceCaps?.cpuCapCores,ramCapBytes:r.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});var Rf,Df=E(()=>{"use strict";Rf={name:"nc",aliases:["netcat"],description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?Number.parseInt(t[s+1],10):void 0,o=t.includes("-v");if(r&&i)return new Promise(u=>{let d=n.createServer(f=>{let p="";f.on("data",m=>{p+=m.toString()}),f.on("end",()=>{d.close(),u({stdout:p,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?Number.parseInt(a[1],10):Number.NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var Ff,Lf=E(()=>{"use strict";Ff={name:"newgrp",description:"Switch primary group for current session",category:"users",params:["[group]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0];if(!r){let i=e.users.getGid(t);return{stdout:`newgrp: switched to default group '${e.users.getNameByGid(i)??t}' (${i})
`,exitCode:0}}let s=e.users.getGroup(r);return s?e.users.isMemberOf(t,r)?{stdout:`newgrp: switched to group '${r}' (${s.gid})
`,exitCode:0}:{stderr:`newgrp: user '${t}' is not a member of '${r}'
`,exitCode:1}:{stderr:`newgrp: group '${r}' does not exist
`,exitCode:1}}}});var Uf,Bf=E(()=>{"use strict";Q();Ke();Uf={name:"nice",description:"Run command with adjusted scheduling priority",category:"system",params:["[-n priority] [-p pid] [command [args...]]"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{flagsWithValues:c,positionals:l}=$e(a,{flagsWithValue:["-n","-p"]}),u=c.get("-n"),d=c.get("-p");if(d){let h=Number.parseInt(d,10);if(Number.isNaN(h))return{stderr:`nice: invalid PID: ${d}
`,exitCode:1};let g=u===void 0?0:Number.parseInt(u,10);if(Number.isNaN(g)||g<-20||g>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let y=s.users.getProcess(h);if(!y)return{stderr:`nice: no such process: ${h}
`,exitCode:1};if(y.username!==t&&t!=="root")return{stderr:`nice: permission denied
`,exitCode:1};let S=y.nice;return s.users.setProcessNice(h,g)?{stdout:`pid ${h}: nice ${S} \u2192 ${g} (${y.priority})
`,exitCode:0}:{stderr:`nice: failed to set priority
`,exitCode:1}}let f=u===void 0?10:Number.parseInt(u,10);if(Number.isNaN(f)||f<-20||f>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let p=l.join(" ");if(!p)return{stdout:`0
`,exitCode:0};let m={...o,NICE_PRIORITY:String(f)};return ye(p,t,e,n,r,s,i,m)}}});import zf from"node:vm";function c1(t,e){let n={version:Is,versions:Wf,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new Es(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>t.push(i.map(Et).join(" ")),error:(...i)=>e.push(i.map(Et).join(" ")),warn:(...i)=>e.push(i.map(Et).join(" ")),info:(...i)=>t.push(i.map(Et).join(" ")),dir:i=>t.push(Et(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Et).join(" "),inspect:o=>Et(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},zf.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Et(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Et).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${Et(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function $s(t){let e=[],n=[],r=c1(e,n),s=0;try{let i=zf.runInContext(t,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Et(i))}catch(i){i instanceof Es?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function l1(t){let e=t.trim();return e.includes(`
`)||e.startsWith("const ")||e.startsWith("let ")||e.startsWith("var ")||e.startsWith("function ")||e.startsWith("class ")||e.startsWith("if ")||e.startsWith("for ")||e.startsWith("while ")||e.startsWith("import ")||e.startsWith("//")?$s(`(async () => { ${t} })()`):$s(e)}var Is,Wf,Es,jf,Vf=E(()=>{"use strict";Q();re();Is="v18.19.0",Wf={node:Is,npm:"9.2.0",v8:"10.2.154.26-node.22"};Es=class{constructor(e){this.code=e}code};jf={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(k(t,["--version","-v"]))return{stdout:`${Is}
`,exitCode:0};if(k(t,["--versions"]))return{stdout:`${JSON.stringify(Wf,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=$s(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=$s(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=U(n,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=l1(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${Is}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var Gf,Hf=E(()=>{"use strict";Ke();Gf={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?ye(c,t,e,n,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Ps,u1,qf,Yf,Kf=E(()=>{"use strict";Q();Ps="9.2.0",u1="18.19.0",qf={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(k(t,["--version","-v"]))return{stdout:`${Ps}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Ps}', node: '${u1}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Ps}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},Yf={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?k(t,["--version"])?{stdout:`${Ps}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Xf,Zf=E(()=>{"use strict";Xf={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Jf,Qf=E(()=>{"use strict";Jf={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var ep,tp=E(()=>{"use strict";ep={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n===-1?void 0:t[n+1],s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let f=c[d],p=r.replace(/\$_/g,JSON.stringify(f)).replace(/\$\./g,String(d+1)),m=p.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(m){let g=m[4]??"";try{let y=new RegExp(m[2],g.includes("i")?g.includes("g")?"gi":"i":g.includes("g")?"g":"");f=f.replace(y,m[3])}catch{}s&&l.push(f);continue}let h=p.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let g=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?g:g.replace(/\n$/,"")),s&&l.push(f);continue}s&&l.push(f)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let f=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(f)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});async function f1(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var d1,np,rp=E(()=>{"use strict";Q();d1=typeof process>"u"||typeof process.versions?.node>"u";np={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=$e(t,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=n.get("-c"),o=i?Math.max(1,Number.parseInt(i,10)||4):4;if(!d1){let f=await f1(o,s);if(f)return{...f,exitCode:"stdout"in f?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let f=0;f<o;f++){c++;let p=e.network.ping(s);p<0?a.push(`From ${s} icmp_seq=${f} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${f} ttl=64 time=${p.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function p1(t,e){let n=0,r="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+Number.parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+Number.parseInt(t[i],10),i++;let u=t[i],d=e[n++]??"",f=(p,m=" ")=>{if(c<=0||p.length>=c)return p;let h=m.repeat(c-p.length);return o?p+h:h+p};switch(u){case"s":{let p=String(d);l>=0&&(p=p.slice(0,l)),r+=f(p);break}case"d":case"i":r+=f(String(Number.parseInt(d,10)||0),a?"0":" ");break;case"f":{let p=l>=0?l:6;r+=f((Number.parseFloat(d)||0).toFixed(p));break}case"o":r+=f((Number.parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=f((Number.parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=f((Number.parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[s],s++;continue}s=i+1;continue}r+=t[s],s++}return r}var sp,ip=E(()=>{"use strict";sp={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:p1(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var op,ap,cp=E(()=>{"use strict";op={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<t.length;o++){let a=t[o];if(a===void 0)continue;let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},ap={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),s=n.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var lp,up=E(()=>{"use strict";Q();lp={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=k(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=k(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,f)=>[d.id,1e3+f])),c=1e3+r.length;if(i){let f=["USER       PID  NI PRI %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let p of r){let m=p.username.padEnd(10).slice(0,10),h=(Math.random()*.5).toFixed(1),g=Math.floor(Math.random()*2e4+5e3),y=Math.floor(Math.random()*5e3+1e3);f.push(`${m} ${String(a.get(p.id)).padStart(6)}   0  20  0.0  ${h.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let p of s){if(!o&&p.username!==t)continue;let m=p.username.padEnd(10).slice(0,10),h=(Math.random()*1.5).toFixed(1),g=Math.floor(Math.random()*5e4+1e4),y=Math.floor(Math.random()*1e4+2e3),S=p.nice??0,v=20-S;f.push(`${m} ${String(p.pid).padStart(6)} ${String(S).padStart(3)} ${String(v).padStart(3)}  0.1  ${h.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${p.tty.padEnd(8)} S    00:00   0:00 ${p.command}`)}return f.push(`root       ${String(c).padStart(6)}   0  20  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:f.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var dp,fp=E(()=>{"use strict";dp={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function Ne(t=[]){return{__pytype__:"dict",data:new Map(t)}}function bo(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Pe(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function er(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function $t(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function xo(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function kr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function Wt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Be(t){return t===null||Wt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Be).join(", ")}]`:Pe(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Be(n)}`).join(", ")}}`:er(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:$t(t)?`<function ${t.name} at 0x...>`:xo(t)?`<class '${t.name}'>`:kr(t)?`<${t.cls.name} object at 0x...>`:String(t)}function ne(t){return t===null||Wt(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Be).join(", ")}]`:Pe(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${Be(n)}`).join(", ")}}`:er(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:Be(t)}function st(t){return t===null||Wt(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Pe(t)?t.data.size>0:er(t)?mp(t)>0:!0}function mp(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function h1(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function Ue(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(er(t))return h1(t);if(Pe(t))return[...t.data.keys()];throw new Me("TypeError",`'${wn(t)}' object is not iterable`)}function wn(t){return t===null||Wt(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Pe(t)?"dict":er(t)?"range":$t(t)?"function":xo(t)?"type":kr(t)?t.cls.name:"object"}function g1(t){let e=new Map,n=Ne([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??B:B,path:Ne([["join",B],["exists",B],["dirname",B],["basename",B]]),listdir:()=>[]},e.set("__builtins__",B),e.set("__name__","__main__"),e.set("__cwd__",t),e}function y1(t){let e=Ne([["sep","/"],["curdir","."]]),n=Ne([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function S1(){return Ne([["version",ks],["version_info",Ne([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function b1(){return Ne([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",Number.POSITIVE_INFINITY],["nan",Number.NaN],["sqrt",B],["floor",B],["ceil",B],["log",B],["pow",B],["sin",B],["cos",B],["tan",B],["fabs",B],["factorial",B]])}function x1(){return Ne([["dumps",B],["loads",B]])}function v1(){return Ne([["match",B],["search",B],["findall",B],["sub",B],["split",B],["compile",B]])}var m1,ks,B,Me,Qn,Mr,Nr,Ar,pp,Ms,hp,gp=E(()=>{"use strict";Q();re();m1="Python 3.11.2",ks="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",B={__pytype__:"none"};Me=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},Qn=class{constructor(e){this.value=e}value},Mr=class{},Nr=class{},Ar=class{constructor(e){this.code=e}code};pp={os:y1,sys:()=>S1(),math:()=>b1(),json:()=>x1(),re:()=>v1(),random:()=>Ne([["random",B],["randint",B],["choice",B],["shuffle",B]]),time:()=>Ne([["time",B],["sleep",B],["ctime",B]]),datetime:()=>Ne([["datetime",B],["date",B],["timedelta",B]]),collections:()=>Ne([["Counter",B],["defaultdict",B],["OrderedDict",B]]),itertools:()=>Ne([["chain",B],["product",B],["combinations",B],["permutations",B]]),functools:()=>Ne([["reduce",B],["partial",B],["lru_cache",B]]),string:()=>Ne([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},Ms=class t{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}static _splitArgs(e){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(n.push(s.trim()),s=""):s+=c}return s.trim()&&n.push(s.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return B;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return B;if(/^-?\d+$/.test(e))return Number.parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return Number.parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return Number.parseInt(e,16);if(/^0o[0-7]+$/.test(e))return Number.parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return ne(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,f,p,m]=u,h=Ue(this.pyEval(p.trim(),n)),g=[];for(let y of h){let S=new Map(n);S.set(f,y),!(m&&!st(this.pyEval(m,S)))&&g.push(this.pyEval(d.trim(),S))}return g}return t._splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=t._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return Ne();let u=Ne();for(let d of t._splitArgs(l)){let f=d.indexOf(":");if(f===-1)continue;let p=ne(this.pyEval(d.slice(0,f).trim(),n)),m=this.pyEval(d.slice(f+1).trim(),n);u.data.set(p,m)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!st(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=t._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this._subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?t._splitArgs(u):[]).map(f=>this.pyEval(f,n));return this._callBuiltin(l,d,n)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,f=this.pyEval(l,n);if(d!==void 0){let p=d.slice(1,-1),m=p.trim()?t._splitArgs(p).map(h=>this.pyEval(h,n)):[];return this._callMethod(f,u,m)}return t._getAttr(f,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new Me("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new Me("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=t._getAttr(u,d,n);return u}return B}static _findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===n&&(s--,s===0))return i;return-1}_findDotAccess(e){let n=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,n,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let p=e.slice(0,a).trim(),m=e.slice(a+l.length).trim();if(!(p&&m))continue;return this._applyBinaryOp(l,p,m,r)}}}}_applyBinaryOp(e,n,r,s){if(e==="and"){let a=this.pyEval(n,s);return st(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(n,s);return st(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new Me("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new Me("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return t._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new Me("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Be(i)===Be(o)||i===o;case"!=":return Be(i)!==Be(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return t._pyIn(o,i);case"not in":return!t._pyIn(o,i);case"is":return i===o||Wt(i)&&Wt(o);case"is not":return!(i===o||Wt(i)&&Wt(o));default:return B}}static _pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>Be(r)===Be(n)):Pe(e)?e.data.has(ne(n)):!1}_subscript(e,n,r){if(n.includes(":")){let i=n.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):B}let s=this.pyEval(n,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??B}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??B}if(Pe(e))return e.data.get(ne(s))??B;throw new Me("TypeError",`'${wn(e)}' is not subscriptable`)}static _getAttr(e,n,r){return Pe(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:B:kr(e)?e.attrs.get(n)??B:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??B:B}_callMethod(e,n,r){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Ue(r[0]??[]).map(ne).join(e);case"replace":return e.replaceAll(ne(r[0]??""),ne(r[1]??""));case"startswith":return e.startsWith(ne(r[0]??""));case"endswith":return e.endsWith(ne(r[0]??""));case"find":return e.indexOf(ne(r[0]??""));case"index":{let s=e.indexOf(ne(r[0]??""));if(s===-1)throw new Me("ValueError","substring not found");return s}case"count":return e.split(ne(r[0]??"")).length-1;case"format":return t._pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,i=ne(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(r[0]??0,ne(r[1]??" "));case"rjust":return e.padStart(r[0]??0,ne(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("");default:break}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??B),B;case"extend":for(let s of Ue(r[0]??[]))e.push(s);return B;case"insert":return e.splice(r[0]??0,0,r[1]??B),B;case"pop":{let s=r[0]===void 0?-1:r[0],i=s<0?e.length+s:s;return e.splice(i,1)[0]??B}case"remove":{let s=e.findIndex(i=>Be(i)===Be(r[0]??B));return s!==-1&&e.splice(s,1),B}case"index":{let s=e.findIndex(i=>Be(i)===Be(r[0]??B));if(s===-1)throw new Me("ValueError","is not in list");return s}case"count":return e.filter(s=>Be(s)===Be(r[0]??B)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:ne(s).localeCompare(ne(i))),B;case"reverse":return e.reverse(),B;case"copy":return[...e];case"clear":return e.splice(0),B;default:break}if(Pe(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(ne(r[0]??""))??r[1]??B;case"update":{if(Pe(r[0]??B))for(let[s,i]of r[0].data)e.data.set(s,i);return B}case"pop":{let s=ne(r[0]??""),i=e.data.get(s)??r[1]??B;return e.data.delete(s),i}case"clear":return e.data.clear(),B;case"copy":return Ne([...e.data.entries()]);case"setdefault":{let s=ne(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??B),e.data.get(s)??B}default:break}if(Pe(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??B:B;case"listdir":return[];case"path":return e;default:break}if(Pe(e))switch(n){case"join":return r.map(ne).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return ne(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return ne(r[0]??"").split("/").pop()??"";case"abspath":return ne(r[0]??"");case"splitext":{let s=ne(r[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1;default:break}if(Pe(e)&&e.data.has("version")&&e.data.get("version")===ks&&n==="exit")throw new Ar(r[0]??0);if(Pe(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let i=s[n];return i(...r.map(o=>o))}if(n==="factorial"){let i=r[0]??0,o=1;for(;i>1;)o*=i--;return o}if(n==="gcd"){let i=Math.abs(r[0]??0),o=Math.abs(r[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(Pe(e)){if(n==="dumps"){let s=Pe(r[1]??B)?r[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(r[0]??B),null,i)}if(n==="loads")return this._jsToPy(JSON.parse(ne(r[0]??"")))}if(kr(e)){let s=e.attrs.get(n)??e.cls.methods.get(n)??B;if($t(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,r[a]??B)),this._execBlock(s.body,i)}}throw new Me("AttributeError",`'${wn(e)}' object has no attribute '${n}'`)}static _pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return ne(o??B);case"r":return Be(o??B);default:return String(o)}})}_pyToJs(e){return Wt(e)?null:Pe(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this._pyToJs(r)])):Array.isArray(e)?e.map(n=>this._pyToJs(n)):e}_jsToPy(e){return e==null?B:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this._jsToPy(n)):typeof e=="object"?Ne(Object.entries(e).map(([n,r])=>[n,this._jsToPy(r)])):B}_callBuiltin(e,n,r){if(r.has(e)){let s=r.get(e)??B;return $t(s)?this._callFunc(s,n,r):xo(s)?this._instantiate(s,n):s}switch(e){case"print":return this._output.push(n.map(ne).join(" ")+`
`.replace(/\\n/g,"")),B;case"input":return this._output.push(ne(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=Number.parseInt(ne(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new Me("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=Number.parseFloat(ne(n[0]??0));return Number.isNaN(s)?(()=>{throw new Me("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":ne(n[0]??B);case"bool":return n.length===0?!1:st(n[0]??B);case"list":return n.length===0?[]:Ue(n[0]??[]);case"tuple":return n.length===0?[]:Ue(n[0]??[]);case"set":return n.length===0?[]:[...new Set(Ue(n[0]??[]).map(Be))].map(s=>Ue(n[0]??[]).find(o=>Be(o)===s)??B);case"dict":return n.length===0?Ne():Pe(n[0]??B)?n[0]:Ne();case"bytes":return typeof n[0]=="string"?n[0]:ne(n[0]??"");case"bytearray":return n.length===0?"":ne(n[0]??"");case"type":return n.length===1?`<class '${wn(n[0]??B)}'>`:B;case"isinstance":return wn(n[0]??B)===ne(n[1]??"");case"issubclass":return!1;case"callable":return $t(n[0]??B);case"hasattr":return Pe(n[0]??B)?n[0].data.has(ne(n[1]??"")):!1;case"getattr":return Pe(n[0]??B)?n[0].data.get(ne(n[1]??""))??n[2]??B:n[2]??B;case"setattr":return Pe(n[0]??B)&&n[0].data.set(ne(n[1]??""),n[2]??B),B;case"len":{let s=n[0]??B;if(typeof s=="string"||Array.isArray(s))return s.length;if(Pe(s))return s.data.size;if(er(s))return mp(s);throw new Me("TypeError",`object of type '${wn(s)}' has no len()`)}case"range":return n.length===1?bo(0,n[0]):n.length===2?bo(n[0],n[1]):bo(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return Ue(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map(Ue),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??B))}case"map":{let s=n[0]??B;return Ue(n[1]??[]).map(i=>$t(s)?this._callFunc(s,[i],r):B)}case"filter":{let s=n[0]??B;return Ue(n[1]??[]).filter(i=>$t(s)?st(this._callFunc(s,[i],r)):st(i))}case"reduce":{let s=n[0]??B,i=Ue(n[1]??[]);if(i.length===0)return n[2]??B;let o=n[2]===void 0?i[0]:n[2];for(let a of n[2]===void 0?i.slice(1):i)o=$t(s)?this._callFunc(s,[o,a],r):B;return o}case"sorted":{let s=[...Ue(n[0]??[])],i=n[1]??B,o=Pe(i)?i.data.get("key")??B:i;return s.sort((a,c)=>{let l=$t(o)?this._callFunc(o,[a],r):a,u=$t(o)?this._callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:ne(l).localeCompare(ne(u))}),s}case"reversed":return[...Ue(n[0]??[])].reverse();case"any":return Ue(n[0]??[]).some(st);case"all":return Ue(n[0]??[]).every(st);case"sum":return Ue(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?Ue(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?Ue(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]===void 0?Math.round(n[0]??0):Number.parseFloat(n[0].toFixed(n[1]));case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return ne(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:ne(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new Me("PermissionError","open() not available in virtual runtime");case"repr":return Be(n[0]??B);case"iter":return n[0]??B;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new Me("StopIteration","")})();case"vars":return Ne([...r.entries()].map(([s,i])=>[s,i]));case"globals":return Ne([...r.entries()].map(([s,i])=>[s,i]));case"locals":return Ne([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??B;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Pe(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new Me(e,ne(n[0]??""));case"exec":return this.execScript(ne(n[0]??""),r),B;case"eval":return this.pyEval(ne(n[0]??""),r);default:throw new Me("NameError",`name '${e}' is not defined`)}}_callFunc(e,n,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??B)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof Qn)return i.value;throw i}}_instantiate(e,n){let r={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(r,"__init__",n),r}execScript(e,n){let r=e.split(`
`);this._execLines(r,0,n)}_execLines(e,n,r){let s=n;for(;s<e.length;){let i=e[s];if(i===void 0||!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,r)}return s}_execBlock(e,n){try{this._execLines(e,0,n)}catch(r){if(r instanceof Qn)return r.value;throw r}return B}static _getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}_collectBlock(e,n,r){let s=[];for(let i=n;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(t._getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}_execStatement(e,n,r){let s=e[n];if(s===void 0)return n+1;let i=s.trim(),o=t._getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new Mr;if(i==="continue")throw new Nr;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new Qn(a[1]?this.pyEval(a[1],r):B);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let _=this.pyEval(c[1],r);throw new Me(typeof _=="string"?_:wn(_),ne(_))}throw new Me("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!st(this.pyEval(l[1],r)))throw new Me("AssertionError",l[2]?ne(this.pyEval(l[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,_,b]=d,C=pp[_];if(C){let P=C(this.cwd);this._modules.set(_,P),r.set(b??_,P)}return n+1}let f=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(f){let[,_,b]=f,C=pp[_];if(C){let P=C(this.cwd);if(b?.trim()==="*")for(let[T,R]of P.data)r.set(T,R);else for(let T of b.split(",").map(R=>R.trim()))r.set(T,P.data.get(T)??B)}return n+1}let p=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(p){let[,_,b]=p,C=b.split(",").map(R=>R.trim()).filter(Boolean),P=this._collectBlock(e,n+1,o),T={__pytype__:"func",name:_,params:C,body:P,closure:new Map(r)};return r.set(_,T),n+1+P.length}let m=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(m){let[,_,b]=m,C=b?b.split(",").map(G=>G.trim()):[],P=this._collectBlock(e,n+1,o),T={__pytype__:"class",name:_,methods:new Map,bases:C},R=0;for(;R<P.length;){let X=P[R].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(X){let[,te,$]=X,O=$.split(",").map(D=>D.trim()).filter(Boolean),w=this._collectBlock(P,R+1,0);T.methods.set(te,{__pytype__:"func",name:te,params:O,body:w,closure:new Map(r)}),R+=1+w.length}else R++}return r.set(_,T),n+1+P.length}if(i.startsWith("if ")&&i.endsWith(":")){let _=i.slice(3,-1).trim(),b=this._collectBlock(e,n+1,o);if(st(this.pyEval(_,r))){this._execBlock(b,new Map(r).also?.(T=>{for(let[R,G]of r)T.set(R,G)})??r),this._runBlockInScope(b,r);let P=n+1+b.length;for(;P<e.length;){let T=e[P].trim();if(t._getIndent(e[P])<o||!(T.startsWith("elif")||T.startsWith("else")))break;let R=this._collectBlock(e,P+1,o);P+=1+R.length}return P}let C=n+1+b.length;for(;C<e.length;){let P=e[C],T=P.trim();if(t._getIndent(P)!==o)break;let R=T.match(/^elif\s+(.+):$/);if(R){let G=this._collectBlock(e,C+1,o);if(st(this.pyEval(R[1],r))){for(this._runBlockInScope(G,r),C+=1+G.length;C<e.length;){let X=e[C].trim();if(t._getIndent(e[C])!==o||!(X.startsWith("elif")||X.startsWith("else")))break;let te=this._collectBlock(e,C+1,o);C+=1+te.length}return C}C+=1+G.length;continue}if(T==="else:"){let G=this._collectBlock(e,C+1,o);return this._runBlockInScope(G,r),C+1+G.length}break}return C}let h=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,_,b]=h,C=Ue(this.pyEval(b.trim(),r)),P=this._collectBlock(e,n+1,o),T=[],R=n+1+P.length;R<e.length&&e[R]?.trim()==="else:"&&(T=this._collectBlock(e,R+1,o),R+=1+T.length);let G=!1;for(let X of C){if(_.includes(",")){let te=_.split(",").map(O=>O.trim()),$=Array.isArray(X)?X:[X];te.forEach((O,w)=>r.set(O,$[w]??B))}else r.set(_.trim(),X);try{this._runBlockInScope(P,r)}catch(te){if(te instanceof Mr){G=!0;break}if(te instanceof Nr)continue;throw te}}return!G&&T.length&&this._runBlockInScope(T,r),R}let g=i.match(/^while\s+(.+?)\s*:$/);if(g){let _=g[1],b=this._collectBlock(e,n+1,o),C=0;for(;st(this.pyEval(_,r))&&C++<1e5;)try{this._runBlockInScope(b,r)}catch(P){if(P instanceof Mr)break;if(P instanceof Nr)continue;throw P}return n+1+b.length}if(i==="try:"){let _=this._collectBlock(e,n+1,o),b=n+1+_.length,C=[],P=[],T=[];for(;b<e.length;){let R=e[b],G=R.trim();if(t._getIndent(R)!==o)break;if(G.startsWith("except")){let X=G.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),te=X?.[1]??null,$=X?.[2],O=this._collectBlock(e,b+1,o);C.push({exc:te,body:O}),$&&r.set($,""),b+=1+O.length}else if(G==="else:")T=this._collectBlock(e,b+1,o),b+=1+T.length;else if(G==="finally:")P=this._collectBlock(e,b+1,o),b+=1+P.length;else break}try{this._runBlockInScope(_,r),T.length&&this._runBlockInScope(T,r)}catch(R){if(R instanceof Me){let G=!1;for(let X of C)if(X.exc===null||X.exc===R.type||X.exc==="Exception"){this._runBlockInScope(X.body,r),G=!0;break}if(!G)throw R}else throw R}finally{P.length&&this._runBlockInScope(P,r)}return b}let y=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(y){let _=this._collectBlock(e,n+1,o);return r.set(y[2],B),this._runBlockInScope(_,r),n+1+_.length}let S=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(S){let[,_,b,C]=S,P=r.get(_)??0,T=this.pyEval(C,r),R;switch(b){case"+=":R=typeof P=="string"?P+ne(T):P+T;break;case"-=":R=P-T;break;case"*=":R=P*T;break;case"/=":R=P/T;break;case"//=":R=Math.floor(P/T);break;case"%=":R=P%T;break;case"**=":R=P**T;break;default:R=T}return r.set(_,R),n+1}let v=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(v){let[,_,b,C]=v,P=r.get(_)??B,T=this.pyEval(C,r)??B,R=this.pyEval(b,r)??B;return Array.isArray(P)?P[R]=T:Pe(P)&&P.data.set(ne(R),T),n+1}let x=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(x){let _=x[1].lastIndexOf(".");if(_!==-1){let b=x[1].slice(0,_),C=x[1].slice(_+1),P=this.pyEval(x[2],r),T=this.pyEval(b,r);return Pe(T)?T.data.set(C,P):kr(T)&&T.attrs.set(C,P),n+1}}let A=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(A){let _=this.pyEval(A[3],r),b=i.split("=")[0].split(",").map(P=>P.trim()),C=Ue(_);return b.forEach((P,T)=>r.set(P,C[T]??B)),n+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,_,b]=I;return r.set(_,this.pyEval(b,r)),n+1}try{this.pyEval(i,r)}catch(_){if(_ instanceof Me||_ instanceof Ar)throw _}return n+1}_runBlockInScope(e,n){this._execLines(e,0,n)}run(e){let n=g1(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof Ar?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof Me?(this._stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof Qn?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},hp={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(k(t,["--version","-V"]))return{stdout:`${m1}
`,exitCode:0};if(k(t,["--version-full"]))return{stdout:`${ks}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let i=t[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new Ms(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=U(n,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new Ms(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${ks}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});function C1(t,e){return t.includes(e)}function vo(t,e){let n=t.indexOf(e);if(n!==-1&&n+1<t.length)return t[n+1]}var yp,Sp=E(()=>{"use strict";yp={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((u,d)=>u!=="-r"&&u!=="-s"&&u!=="-d"&&u!=="-n"&&u!=="-p"&&u!=="-t"&&u!=="-a"&&t[d-1]!=="-p"&&t[d-1]!=="-d"&&t[d-1]!=="-n"&&t[d-1]!=="-t"),s=e??"",i=vo(t,"-d")??`
`,o=vo(t,"-n"),a=o?Number.parseInt(o,10):void 0,c=vo(t,"-a"),l;if(a!==void 0&&!Number.isNaN(a))l=s.slice(0,a);else if(i===`
`)l=s.split(`
`)[0]??"";else{let u=s.indexOf(i);l=u===-1?s:s.slice(0,u)}if(C1(t,"-r")||(l=l.replace(/\\(?:\r?\n|.)/g,u=>u[1]===`
`||u[1]==="\r"?"":u[1])),!n)return{exitCode:0};if(c){let u=l.split(/\s+/).filter(Boolean);n.vars[`${c}[0]`]=u.join(" ");for(let d=0;d<u.length;d++)n.vars[`${c}[${d}]`]=u[d];return n.vars[`#${c}[@]`]=String(u.length),{exitCode:0}}if(r.length===0)n.vars.REPLY=l;else if(r.length===1)n.vars[r[0]]=l;else{let u=l.split(/\s+/);for(let d=0;d<r.length;d++)n.vars[r[d]]=d<r.length-1?u[d]??"":u.slice(d).join(" ")}return{exitCode:0}}}});function _1(t){let e=t[bp];if(!e)return new Set;try{return new Set(JSON.parse(e))}catch{return new Set}}function w1(t,e){t[bp]=JSON.stringify([...e])}var bp,xp,vp=E(()=>{"use strict";bp="__readonly";xp={name:"readonly",description:"Mark shell variables as readonly",category:"shell",params:["[-p] [NAME[=VALUE] ...]"],run:({args:t,env:e})=>{let n=_1(e.vars);if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([s])=>s&&!s.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)&&n.has(s)).map(([s,i])=>`readonly ${s}="${i}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t)if(r!=="-p")if(r.includes("=")){let s=r.indexOf("="),i=r.slice(0,s),o=r.slice(s+1);e.vars[i]=o,n.add(i)}else n.add(r);return w1(e.vars,n),{exitCode:0}}}});import*as wp from"node:path";var Cp,_p,Ip,Ep=E(()=>{"use strict";Q();re();Cp=["-r","-R","-rf","-fr","-rF","-Fr"],_p=["-f","-rf","-fr","-rF","-Fr","--force"],Ip={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=k(r,Cp),a=k(r,_p),c=[...Cp,..._p,"--force"],l=[];for(let m=0;;m+=1){let h=Xt(r,m,{flags:c});if(!h)break;l.push(h)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(m=>U(n,m));for(let m of u)qe(e.vfs,e.users,t,wp.posix.dirname(m),2);for(let m of u)if(!e.vfs.exists(m)){if(a)continue;return{stderr:`rm: cannot remove '${m}': No such file or directory`,exitCode:1}}let d=m=>{for(let h of u)m.vfs.exists(h)&&m.vfs.remove(h,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let f=l.length===1?`'${l[0]}'`:`${l.length} items`,p=o?`rm: remove ${f} recursively? [y/N] `:`rm: remove ${f}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:p,mode:"confirm",onPassword:(m,h)=>{let g=m.trim().toLowerCase();return g!=="y"&&g!=="yes"?Promise.resolve({result:{stdout:`rm: cancelled
`,exitCode:1}}):Promise.resolve({result:d(h)})}},exitCode:0}}}});var $p,Pp=E(()=>{"use strict";Q();re();$p={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=k(n,["-i"]),a=k(n,["-n"]),c=[],l,u=0;for(;u<n.length;){let b=n[u];b==="-e"||b==="--expression"?(u++,n[u]&&c.push(n[u]),u++):b==="-n"||b==="-i"?u++:b.startsWith("-e")?(c.push(b.slice(2)),u++):(b.startsWith("-")||(c.length===0?c.push(b):l=b),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let b=!1,C=0;for(;C<n.length;){let P=n[C];P==="-e"||P==="--expression"?(b=!0,C+=2):(P.startsWith("-e")&&(b=!0),C++)}b||(l=n.filter(P=>!P.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let b=U(e,l);try{d=t.vfs.readFile(b)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function f(b){if(!b)return[void 0,b];if(b[0]==="$")return[{type:"last"},b.slice(1)];if(/^\d/.test(b)){let C=b.match(/^(\d+)(.*)/s);if(C)return[{type:"line",n:Number.parseInt(C[1],10)},C[2]]}if(b[0]==="/"){let C=b.indexOf("/",1);if(C!==-1)try{return[{type:"regex",re:new RegExp(b.slice(1,C))},b.slice(C+1)]}catch{}}return[void 0,b]}function p(b){let C=[],P=b.split(/\n|(?<=^|[^\\]);/);for(let T of P){let R=T.trim();if(!R||R.startsWith("#"))continue;let G=R,[X,te]=f(G);G=te.trim();let $;if(G[0]===","){G=G.slice(1).trim();let[w,D]=f(G);$=w,G=D.trim()}let O=G[0];if(O)if(O==="s"){let w=G[1]??"/",D=new RegExp(`^s${m(w)}((?:[^${m(w)}\\\\]|\\\\.)*)${m(w)}((?:[^${m(w)}\\\\]|\\\\.)*)${m(w)}([gGiIp]*)$`),z=G.match(D);if(!z){C.push({op:"d",addr1:X,addr2:$});continue}let Z=z[3]??"",J;try{J=new RegExp(z[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}C.push({op:"s",addr1:X,addr2:$,from:J,to:z[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else O==="d"?C.push({op:"d",addr1:X,addr2:$}):O==="p"?C.push({op:"p",addr1:X,addr2:$}):O==="q"?C.push({op:"q",addr1:X}):O==="="&&C.push({op:"=",addr1:X,addr2:$})}return C}function m(b){return b.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let h=c.flatMap(p),g=d.split(`
`);g[g.length-1]===""&&g.pop();let y=g.length;function S(b,C,P){return b?b.type==="line"?C===b.n:b.type==="last"?C===y:b.re.test(P):!0}function v(b,C,P,T){let{addr1:R,addr2:G}=b;if(!R)return!0;if(!G)return S(R,C,P);let X=T.get(b)??!1;return!X&&S(R,C,P)&&(X=!0,T.set(b,!0)),X&&S(G,C,P)?(T.set(b,!1),!0):!!X}let x=[],A=new Map,I=!1;for(let b=0;b<g.length&&!I;b++){let C=g[b],P=b+1,T=!1;for(let R of h)if(v(R,P,C,A)){if(R.op==="d"){T=!0;break}if(R.op==="p"&&x.push(C),R.op==="="&&x.push(String(P)),R.op==="q"&&(I=!0),R.op==="s"){let G=R.global?C.replace(new RegExp(R.from.source,R.from.flags.includes("i")?"gi":"g"),R.to):C.replace(R.from,R.to);G!==C&&(C=G,R.print&&a&&x.push(C))}}T||a||x.push(C)}let _=x.join(`
`)+(x.length>0?`
`:"");if(o&&l){let b=U(e,l);return t.vfs.writeFile(b,_,{},s,i),{exitCode:0}}return{stdout:_,exitCode:0}}}});var kp,Mp=E(()=>{"use strict";kp={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d===-1?`
`:t[d+1]??`
`})(),r=(()=>{let d=t.indexOf("-f");return d===-1?null:t[d+1]??"%g"})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let f;if(r?f=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):f=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let p=String(Math.trunc(a)).length;f=f.padStart(p,"0")}c.push(f)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});function Co(t,e,n){let r=I1[t];r&&(e?n[r]="1":delete n[r])}var I1,Np,Ap,Tp=E(()=>{"use strict";I1={e:"__errexit",u:"__nounset",C:"__noclobber",x:"__xtrace"},Np={errexit:"e",nounset:"u",noclobber:"C",xtrace:"x",pipefail:"__pipefail"};Ap={name:"set",description:"Display or set shell variables",category:"shell",params:["[+-abCefhkmnuvx] [+-o option] [-- args]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([i])=>!i.startsWith("__")).map(([i,o])=>`${i}=${o}`).join(`
`),exitCode:0};let n=!1,r=[];for(let s=0;s<t.length;s++){let i=t[s];if(n){r.push(i);continue}if(i==="--"){n=!0;continue}if(i==="-o"&&s+1<t.length){let a=t[s+1],c=Np[a];c&&(c.startsWith("__")?e.vars[c]="1":Co(c,!0,e.vars)),s++;continue}if(i==="+o"&&s+1<t.length){let a=t[s+1],c=Np[a];c&&(c.startsWith("__")?delete e.vars[c]:Co(c,!1,e.vars)),s++;continue}let o=i.match(/^([+-])([a-zA-Z]+)$/);if(o){let a=o[1]==="-";for(let c of o[2])Co(c,a,e.vars);continue}if(i.includes("=")){let a=i.indexOf("=");e.vars[i.slice(0,a)]=i.slice(a+1);continue}r.push(i)}if(r.length>0)for(let s=0;s<r.length;s++)e.vars[String(s+1)]=r[s];return{exitCode:0}}}});function As(t,e,n,r){return ts(t,e,n,s=>ye(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function Pt(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(E1),i=s??(r.match($1)||r.match(P1));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",f="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let p=t[n].trim();p.startsWith("elif ")?(d="elif",f=p.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:f,body:[]})):p==="else"?d="else":p!=="then"&&(d==="then"?c.push(p):d==="elif"&&l.length>0?l[l.length-1]?.body.push(p):u.push(p)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),f=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&f.push(u[2].trim()),n++;n<t.length;){let p=t[n].trim();if(p===";;"||p==="esac")break;p&&f.push(p),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:f})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function Ns(t,e){let n=await As(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=U(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,f=Number(l),p=Number(d);if(u==="-eq")return f===p;if(u==="-ne")return f!==p;if(u==="-lt")return f<p;if(u==="-le")return f<=p;if(u==="-gt")return f>p;if(u==="-ge")return f>=p}}return((await ye(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function kt(t,e){let n={exitCode:0},r="",s="";for(let o of t)if(o.type==="cmd"){let a=await As(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(f=>c.test(f))){for(let f of l){let[,p,m]=f.match(c)??[];p!==void 0&&m!==void 0&&(e.env.vars[p]=m)}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",f=e.env.vars[`__func_${d}`];if(f){let p=a.trim().split(/\s+/).slice(1);p.forEach((g,y)=>{e.env.vars[String(y+1)]=g}),e.env.vars[0]=d;let m=f.split(`
`),h=await kt(Pt(m),e);kl(e.env.vars);for(let g=1;g<=p.length;g++)delete e.env.vars[String(g)];return h}return ye(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await Ns(o.cond,e)){let c=await kt(Pt(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await Ns(c.cond,e)){let l=await kt(Pt(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await kt(Pt(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=Number.parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=Number.parseInt(e.env.vars[l[1]]??"0",10),d=Number.parseInt(l[3],10),f={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(f[l[2]]??u)}else{let u=pr(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await As(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(es);for(let l of c){e.env.vars[o.var]=l;let u=await kt(Pt(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await Ns(o.cond,e);){let c=await kt(Pt(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await Ns(o.cond,e);){let c=await kt(Pt(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await As(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await kt(Pt(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function Op(t){let e=[],n="",r=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(s||i)s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);else{if(c==="'"){s=!0,n+=c,o++;continue}if(c==='"'){i=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var _o,E1,$1,P1,Rp,Dp=E(()=>{"use strict";mr();Q();re();io();Ke();ro();_o="[^\\s(){}]+",E1=new RegExp(`^(?:function\\s+)?(${_o})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),$1=new RegExp(`^(?:function\\s+)?(${_o})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),P1=new RegExp(`^function\\s+(${_o})\\s*\\{?\\s*$`);Rp={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:t=>{let{args:e,shell:n,cwd:r}=t;if(k(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=ys(i),a=Op(o),c=Pt(a);return kt(c,t)}let s=e[0];if(s){let i=U(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=ys(o),c=Op(a),l=Pt(c);return kt(l,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var Fp,Lp,Up,Bp=E(()=>{"use strict";Fp={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=Number.parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},Lp={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.includes("-p")||t.length===0){let s=[];for(let[i,o]of Object.entries(e.vars))if(i.startsWith("__trap_")&&o){let a=i.slice(7);s.push(`trap -- '${o}' ${a}`)}return{stdout:s.length>0?`${s.join(`
`)}
`:"",exitCode:0}}if(t[0]==="-"){let s=t.slice(1);for(let i of s)delete e.vars[`__trap_${i.toUpperCase()}`];return{exitCode:0}}let n=t[0]??"",r=t.slice(1);if(r.length===0){let s=[];for(let i of r){let o=e.vars[`__trap_${i.toUpperCase()}`];o&&s.push(`trap -- '${o}' ${i}`)}return s.length>0?{stdout:`${s.join(`
`)}
`,exitCode:0}:{exitCode:0}}for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},Up={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=Number.parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var zp,Wp=E(()=>{"use strict";zp={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=Number.parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var jp,Vp=E(()=>{"use strict";Q();re();jp={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=k(r,["-r"]),o=k(r,["-n"]),a=k(r,["-u"]),c=r.filter(m=>!m.startsWith("-")),d=[...(c.length>0?c.map(m=>{try{return ge(t,U(n,m),"sort"),e.vfs.readFile(U(n,m))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((m,h)=>o?Number(m)-Number(h):m.localeCompare(h)),f=i?d.reverse():d;return{stdout:(a?[...new Set(f)]:f).join(`
`),exitCode:0}}}});var Gp,Hp=E(()=>{"use strict";re();Ke();Gp={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=U(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let f=await ye(d,e,n,"shell",r,s,void 0,i);if(l=f.exitCode??0,f.closeSession||f.switchUser)return f}return{exitCode:l}}}});function k1(t,e){let n=t==="ed25519"?"ssh-ed25519":t==="ecdsa"?"ecdsa-sha2-nistp256":"ssh-rsa",r=Buffer.from(Array.from({length:100},()=>Math.floor(Math.random()*256))).toString("base64"),s=`${n} ${r} ${e}`;return{privateKey:`${["-----BEGIN OPENSSH PRIVATE KEY-----","b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn","NhAAAAAwEAAQAAAQEA6NF1x1kXUq3q/MQw3q6J0i0mO6kK4K4mZ3vhXy3nVwL0z8P9","VxRZ2gW0w==","-----END OPENSSH PRIVATE KEY-----"].join(`
`)}
`,publicKey:s}}function M1(t,e){if(!t.exists(e))return{stderr:`${e}: No such file`,exitCode:1};let n=`${e}.pub`;return t.exists(n)?{stdout:`${t.readFile(n)}
`,exitCode:0}:{stderr:`${n} not found`,exitCode:1}}function N1(t){let e=Buffer.from(t),n=0;for(let r=0;r<e.length;r++)n=(n<<5)-n+e[r]|0;return Buffer.from(String(Math.abs(n))).toString("base64").slice(0,16).replace(/=+$/,"")}var qp,Yp=E(()=>{"use strict";Q();qp={name:"ssh-keygen",description:"Generate SSH key pairs",category:"system",params:["[options]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: ssh-keygen [options]","  -t rsa|ed25519|ecdsa    Key type (default: rsa)","  -b bits                 Key size in bits","  -f file                 Output key file path","  -N phrase               Passphrase (default: none)","  -C comment              Key comment","  -q                      Quiet mode","  -y                      Read private key and output public key","  -h, --help              Show this help","","Generates a key pair: <file> (private) and <file>.pub (public)."].join(`
`),exitCode:0};let n=t.vfs,r=u=>{let d=e.indexOf(u);if(d!==-1&&d+1<e.length)return e[d+1]},s=r("-t")??"rsa",i=r("-f")??`${process.env.HOME??"/root"}/.ssh/id_${s}`,o=r("-C")??`virtual@${t.hostname}`;if(k(e,["-y"]))return M1(n,i);let a=i.substring(0,i.lastIndexOf("/"));if(!n.exists(a))return{stderr:`ssh-keygen: ${a}: No such file or directory`,exitCode:1};if(n.exists(i))return{stderr:`${i} already exists.
Overwrite (y/n)? `,exitCode:1};let{privateKey:c,publicKey:l}=k1(s,o);return n.writeFile(i,c,{mode:384}),n.writeFile(`${i}.pub`,l,{mode:420}),{stdout:`${[`Generating public/private ${s} key pair.`,`Your identification has been saved in ${i}`,`Your public key has been saved in ${i}.pub`,`Key fingerprint: SHA256:${N1(l)}`,"The key's randomart image is:","+---[RSA 2048]----+","|       .+.. .o.  |","|       .o.. ..   |","|      . ..o..    |","|       o +o..   |","|      . So..     |","|     . o=... .   |","|      o.+..o.    |","|       .+...=E   |","|        oo+*+.   |","+----[SHA256]-----+"].join(`
`)}
`,exitCode:0}}}});function Kp(t,e){let n=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return t==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:n}function A1(t){let e=t.getConntrackCount(),n=t.getConntrackMax(),r=t.getInterfaces(),s=t.getRoutes();return{stdout:`${[`Total: ${wo()}`,`TCP:   ${wo("tcp")} (estab ${Xp("ESTAB")}, closed ${Xp("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${wo("udp")}`,"",`Interfaces: ${r.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${n}`].join(`
`)}
`,exitCode:0}}function T1(t){let e=t.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:`${[`ipv4     conntrack v0.1.0 (${e.length} entries)`,t.formatConntrack(),"",`entries: ${e.length}  max: ${t.getConntrackMax()}`].join(`
`)}
`,exitCode:0}}function wo(t){return t==="udp"?2:t==="tcp"?5:7}function Xp(t){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[t]??0}var Zp,Jp=E(()=>{"use strict";Zp={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:t,shell:e})=>{let n=e.network,r=t.includes("-t")||t.includes("--tcp")||t.length===0,s=t.includes("-u")||t.includes("--udp")||t.length===0,i=t.includes("-l")||t.includes("--listening"),o=t.includes("-a")||t.includes("--all"),a=t.includes("-n")||t.includes("--numeric"),c=t.includes("-p")||t.includes("--processes"),l=t.includes("-s")||t.includes("--summary"),u=t.includes("-c")||t.includes("--conntrack"),d=t.includes("-e")||t.includes("--extended");if(l)return A1(n);if(u)return T1(n);let f=[];if(r||o){f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let p=Kp("tcp",a);for(let m of p){if(i&&m.state!=="LISTEN")continue;let h=d?m.state.padEnd(12):m.state.padEnd(11),g=`${m.localIp}:${m.localPort}`.padEnd(35),y=`${m.peerIp}:${m.peerPort}`,S=`${h} 0      0      ${g} ${y}`;c&&(S+=` users:(("simulated",pid=${m.pid},fd=${m.fd}))`),f.push(S)}}if(s||o){f.length>0&&f.push(""),f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let p=Kp("udp",a);for(let m of p){let h="UNCONN".padEnd(11),g=`${m.localIp}:${m.localPort}`.padEnd(35),y=`${m.peerIp}:${m.peerPort}`;f.push(`${h} 0      0      ${g} ${y}`)}}return f.length===0&&f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:`${f.join(`
`)}
`,exitCode:0}}}});var Qp,em=E(()=>{"use strict";Qp={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var tm,nm=E(()=>{"use strict";re();tm={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(S=>S==="-c"||S==="--format"),s=r===-1?void 0:n[r+1],i=n.find(S=>!S.startsWith("-")&&S!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=U(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=S=>{let v=[256,128,64,32,16,8,4,2,1],x=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+v.map((A,I)=>S&A?x[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),f=u(a.mode),p="size"in a?a.size:0,m=S=>S.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(p)).replace("%a",d.slice(1)).replace("%A",f).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",m(a.updatedAt)).replace("%z",m(a.updatedAt))}
`,exitCode:0};let h="uid"in a?a.uid:0,g="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${p}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${f})  Uid: (${String(h).padStart(5)}/    root)   Gid: (${String(g).padStart(5)}/    root)`,`Modify: ${m(a.updatedAt)}`,`Change: ${m(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var rm,sm=E(()=>{"use strict";rm={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});var im,om=E(()=>{"use strict";Ke();im={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:({authUser:t,shell:e,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a===-1?void 0:n[a+1],u=n.filter((d,f)=>f!==a&&f!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?ye(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function O1(t){let{flags:e,flagsWithValues:n,positionals:r}=$e(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var am,cm=E(()=>{"use strict";Q();Ke();am={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=O1(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?ye(c,l,e,n,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var lm,um=E(()=>{"use strict";lm={name:"swap",description:"View and manage swap file usage",category:"system",params:["[-s|--stats] [-c|--clear]"],run:({shell:t,args:e})=>{let n=e.includes("-c")||e.includes("--clear");if(!t.vfs.isSwapEnabled())return{stderr:`swap: swap is not enabled
`,exitCode:1};if(n)return t.vfs.clearSwap(),{stdout:`swap: swap files cleared
`,exitCode:0};let r=t.vfs.getSwapStats();if(!r)return{stderr:`swap: unable to retrieve swap stats
`,exitCode:1};let s=o=>{if(o===0)return"0 B";let a=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(1024));return`${(o/1024**c).toFixed(1)} ${a[c]}`};return{stdout:`${["Swap usage:",`  Files swapped out : ${r.filesSwapped}`,`  Swap disk usage   : ${s(r.diskUsage)}`,`  Original size     : ${s(r.originalSize)}`,`  Swap-in ops       : ${r.swapIns}`,`  Swap-out ops      : ${r.swapOuts}`].join(`
`)}
`,exitCode:0}}}});import*as In from"node:path";function pm(t){let e=[];for(let n of dm)if(t.exists(n))try{let r=t.list(n);for(let s of r)s.endsWith(".service")&&e.push(In.posix.join(n,s))}catch{}return e.sort()}function mm(t,e){try{let r=t.readFile(e).match(/^Description=(.+)$/m);return r?r[1]:"(unknown)"}catch{return"(unknown)"}}function Tr(t,e){return t.exists(In.posix.join(Ts,e))}function Io(t,e){let n=pm(t),r=["UNIT                      LOAD   ACTIVE SUB     DESCRIPTION","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let s of n){let i=In.posix.basename(s);if(e&&!i.includes(e))continue;let o=mm(t,s),a=Tr(t,i),c=a?"active":"inactive",l=a?"running":"dead";r.push(`${i.padEnd(25)} loaded ${c.padEnd(7)} ${l.padEnd(7)} ${o}`)}return n.length===0&&r.push("(no unit files found)"),r.push("",`${n.length} units listed.`),{stdout:`${r.join(`
`)}
`,exitCode:0}}function R1(t){let e=pm(t),n=["UNIT FILE                  STATE","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let r of e){let s=In.posix.basename(r),i=Tr(t,s)?"enabled":"disabled";n.push(`${s.padEnd(27)} ${i}`)}return e.length===0&&n.push("(no unit files found)"),n.push("",`${e.length} unit files listed.`),{stdout:`${n.join(`
`)}
`,exitCode:0}}function D1(t,e,n){let r=[];for(let s of n){let i=s.endsWith(".service")?s:`${s}.service`,o=Eo(i,t);if(!o){r.push(`Failed to ${e} unit: Unit file ${i} does not exist.`);continue}let a=In.posix.join(Ts,i);if(e==="enable"){if(!t.exists(Ts)){r.push(`Cannot enable ${i}: ${Ts} does not exist.`);continue}t.exists(a)?r.push(`Unit ${i} is already enabled.`):(t.symlink(o,a),r.push(`Created symlink ${a} -> ${o}.`))}else t.exists(a)?(t.remove(a),r.push(`Removed symlink ${a}.`)):r.push(`Unit ${i} is not enabled.`)}return{stdout:`${r.join(`
`)}
`,exitCode:0}}function Eo(t,e){for(let n of dm){let r=In.posix.join(n,t);if(e.exists(r))return r}}function F1(t,e){let n=e.endsWith(".service")?e:`${e}.service`,r=Eo(n,t);if(!r)return{stderr:`Unit ${n} could not be found.`,exitCode:3};let s=mm(t,r),i=Tr(t,n),o=i?"active":"inactive",a=i?"running":"dead",c=i?"enabled":"disabled";return{stdout:`${[`* ${n} - ${s}`,`     Loaded: loaded (${r}; ${c})`,`     Active: ${o} (${a}) since ...`,"   Main PID: ..."].join(`
`)}
`,exitCode:0}}function L1(t,e){let n=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`;if(Eo(i,t)){let a=Tr(t,i);n.push(`${i} ${a?"active":"inactive"}`)}else n.push(`${i} unknown`)}let r=n.every(s=>s.endsWith("active"))?0:3;return{stdout:`${n.join(`
`)}
`,exitCode:r}}function U1(t,e){let n=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`,o=Tr(t,i);n.push(`${i} ${o?"enabled":"disabled"}`)}let r=n.every(s=>s.endsWith("enabled"))?0:1;return{stdout:`${n.join(`
`)}
`,exitCode:r}}var dm,Ts,fm,hm=E(()=>{"use strict";Q();dm=["/etc/systemd/system","/lib/systemd/system"],Ts="/etc/systemd/system/multi-user.target.wants",fm={name:"systemctl",description:"Control the systemd system and service manager",category:"system",params:["[options] <subcommand> [name...]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: systemctl [OPTIONS...] COMMAND [NAME...]","","Commands:","  list-units [pattern]   List loaded units","  status [pattern]       Show unit status","  start NAME...          Start (activate) units","  stop NAME...           Stop (deactivate) units","  enable NAME...         Enable units","  disable NAME...        Disable units","  is-active NAME...      Check if units are active","  is-enabled NAME...     Check if units are enabled","  daemon-reload          Reload systemd manager config","  list-unit-files        List installed unit files","","Options:","  -h, --help        Show this help"].join(`
`),exitCode:0};let n=t.vfs,r=e.filter(o=>!o.startsWith("-"));if(r.length===0)return Io(n);let s=r[0],i=r.slice(1);switch(s){case"list-units":return Io(n,i[0]);case"list-unit-files":return R1(n);case"daemon-reload":return{stdout:"",exitCode:0};case"start":case"stop":case"restart":case"reload":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:{stdout:"",exitCode:0};case"enable":case"disable":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:D1(n,s,i);case"status":return i.length===0?Io(n):F1(n,i[0]);case"is-active":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:L1(n,i);case"is-enabled":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:U1(n,i);default:return{stderr:`systemctl: unknown command '${s}'`,exitCode:1}}}}});var gm,ym=E(()=>{"use strict";Q();gm={name:"umount",aliases:["unmount"],description:"Unmount a mounted filesystem",category:"system",params:["[-f] <target>"],run:({shell:t,cwd:e,args:n})=>{if(k(n,["--help","-h"]))return{stdout:["Usage: umount [-f] <target>","  -f, --force    Force unmount","  -h, --help     Show this help","","Unmount a mounted filesystem by mount point path."].join(`
`),exitCode:0};let r=k(n,["-f","--force"]),s=n.filter(i=>!i.startsWith("-"));if(s.length===0)return{stderr:`umount: missing operand
Try 'umount --help' for more information.`,exitCode:1};for(let i of s){let o=i.startsWith("/")?i:`${e}/${i}`;if(!t.vfs.getMounts().find(l=>l.vPath===o)){if(r)continue;return{stderr:`umount: ${o}: not mounted`,exitCode:32}}try{t.vfs.unmount(o)}catch(l){if(r)continue;return{stderr:`umount: ${l instanceof Error?l.message:String(l)}`,exitCode:32}}}return{exitCode:0}}}});function Sm(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function tr(t,e){let n=e.replace("/proc/sys/","").split("/"),r=(s,i)=>{if(!(i in s))return null;let o=s,a=o[i];return{value:typeof a=="number"?a:String(a),set:l=>{let u=Number(l);o[i]=Number.isNaN(u)?l:u}}};switch(n[0]){case"kernel":{let s=n[1];if(!s)break;return r(t.kernel,s)}case"net":{let s=n[1];if(s==="ipv4"){let i=n[2];if(!i)break;return r(t.net.ipv4,i)}if(s==="ipv6"){let i=n[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&n[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=n[2];if(!i)break;return r(t.net.core,i)}break}case"vm":{let s=n[1];if(!s)break;return r(t.vm,s)}case"fs":{if(n[1]==="inotify"){let o=n[2];if(!o)break;return r(t.fs.inotify,o)}let s=t.fs,i=n[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}};break}default:break}return null}var $o=E(()=>{"use strict"});var bm,xm=E(()=>{"use strict";$o();bm={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let n=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(n.length>0){let o=[];for(let a of n){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,f=tr(t.sysctl,d);if(!f)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};f.set(u.trim());let p=f.value;if(o.push(`${c} = ${p}`),c==="vm.ram_cap_bytes"){let m=Number(u);t.resourceCaps.ramCapBytes=m>0?m:void 0,t.vfs.setRamCap(t.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let m=Number(u);t.resourceCaps.cpuCapCores=m>0?m:void 0,t.users.setCpuCapCores(t.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=tr(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});function No(t){return t.length>=4&&t.readUInt32LE(0)===B1}function W1(t){let e=t.readUInt32LE(12),n=Math.round(Math.log2(e));return{blockSize:e,blockLog:n,compression:t.readUInt16LE(20),flags:t.readUInt16LE(24),inodeCount:t.readUInt32LE(4),modTime:t.readUInt32LE(8),rootInode:t.readBigUInt64LE(32),idCount:t.readUInt16LE(26),idTableStart:Number(t.readBigUInt64LE(48)),inodeTableStart:Number(t.readBigUInt64LE(64)),directoryTableStart:Number(t.readBigUInt64LE(72)),fragmentTableStart:Number(t.readBigUInt64LE(80))}}function j1(t){return!(t&Or)}function V1(t){let e=t&~Or;return e===0?Or:e}function Po(t,e,n){let r=[],s=[],i=e,o=n??t.length;for(;i+2<=o;){let a=t.readUInt16LE(i),c=j1(a),l=V1(a);if(l===0||i+2+l>o&&(l=o-i-2,l<=0))break;s.push({fileOffset:i,blockSize:l,compressed:c});let u=t.slice(i+2,i+2+l);if(c)try{r.push(Buffer.from(Ut(u)))}catch{r.push(u)}else r.push(u);i+=2+l}return{data:Buffer.concat(r),blocks:s}}function G1(t,e,n){let r=n+(Number(e)>>16),s=Number(e)&65535,i=0;for(let o of t){if(o.fileOffset===r)return i+s;i+=o.compressed?8192:o.blockSize}return-1}function H1(t,e,n){let{data:r}=Po(t,e),s=[];for(let i=0;i<n&&i*4+4<=r.length;i++)s.push(r.readUInt32LE(i*4));return s}function q1(t,e,n){let r=Math.ceil(n*12/8192),s=[];for(let i=0;i<r;i++){let o=Number(t.readBigUInt64LE(e+i*8));if(o===0)break;let{data:a}=Y1(t,o);if(a.length===0)break;s.push(...K1(a))}return s}function Y1(t,e){let n=t.readUInt16LE(e),r=!(n&Or),s=n&~Or;if(s===0)return{data:Buffer.alloc(0),compressedSize:0,compressed:!1};if(e+2+s>t.length&&(s=t.length-e-2,s<=0))return{data:Buffer.alloc(0),compressedSize:0,compressed:!1};let i=t.slice(e+2,e+2+s),o;if(r)try{o=Buffer.from(Ut(i))}catch{o=i}else o=i;return{data:o,compressedSize:2+s,compressed:r}}function K1(t){let e=[];for(let n=0;n+12<=t.length;n+=12){let r=Number(t.readBigUInt64LE(n)),s=t.readUInt32LE(n+8);if(r===0&&s===0)break;e.push({startBlock:r,size:s})}return e}function Em(t,e){let n=t.readUInt16LE(e),r=t.readUInt16LE(e+2),s=t.readUInt16LE(e+4),i=t.readUInt16LE(e+6),o=t.readUInt32LE(e+8),a=t.readUInt32LE(e+12),c={inodeType:n,mode:r,uid:s,gid:i,mtime:o,inodeNumber:a};switch(n){case ko:{c.dirStartBlock=t.readUInt32LE(e+16),c.dirSize=t.readUInt16LE(e+24),c.dirOffset=t.readUInt16LE(e+26);break}case Mo:{c.dirSize=t.readUInt32LE(e+20),c.dirStartBlock=t.readUInt32LE(e+24),c.dirOffset=t.readUInt16LE(e+34);break}case Rs:{let l=t.readUInt32LE(e+16),u=t.readUInt32LE(e+20),d=t.readUInt32LE(e+24),f=t.readUInt32LE(e+28),m=u!==4294967295?Math.floor(f/4096):Math.ceil(f/4096),h=[];for(let g=0;g<m;g++)h.push(t.readUInt32LE(e+32+g*4));c.fileSize=f,c.fileStartBlock=l,c.fragmentIndex=u,c.fragmentOffset=d,c.blockSizes=h;break}case Fs:{let l=Number(t.readBigUInt64LE(e+16)),u=Number(t.readBigUInt64LE(e+24)),d=t.readUInt32LE(e+44),f=t.readUInt32LE(e+48),m=d!==4294967295?Math.floor(u/4096):Math.ceil(u/4096),h=[];for(let g=0;g<m;g++)h.push(t.readUInt32LE(e+56+g*4));c.fileSize=u,c.fileStartBlock=l,c.fragmentIndex=d,c.fragmentOffset=f,c.blockSizes=h;break}case Ds:case Ls:{let l=t.readUInt32LE(e+20);c.symlinkTarget=t.slice(e+24,e+24+l).toString("utf8");break}case Cm:case _m:break;case wm:case Im:break;default:break}return c}function X1(t){switch(t){case ko:return 32;case Mo:return 40;case Rs:return 32;case Fs:return 56;case Ds:case Ls:return 24;case Cm:case _m:return 28;case wm:case Im:return 24;default:return 32}}function Z1(t,e){let n=t.readUInt16LE(e),r=X1(n);if(n===Ds||n===Ls)return r+t.readUInt32LE(e+20);if(n===Rs){let s=t.readUInt32LE(e+20),i=t.readUInt32LE(e+28),a=s!==4294967295?Math.floor(i/4096):Math.ceil(i/4096);return r+a*4}if(n===Fs){let s=Number(t.readBigUInt64LE(e+24)),a=t.readUInt32LE(e+44)!==4294967295?Math.floor(s/4096):Math.ceil(s/4096);return r+a*4}return r}function J1(t){let e=new Map,n=0;for(;n+16<=t.length&&t.readUInt16LE(n)!==0;){let s=Em(t,n);e.set(s.inodeNumber,s),n+=Z1(t,n)}return e}function Q1(t,e,n){let r=[],s=e;for(let i of n){if(i===0)continue;let o=!(i&Os),a=i&~Os;if(a===0)continue;let c;if(o)try{c=Buffer.from(Ut(t.slice(s,s+a)))}catch{c=t.slice(s,s+a)}else c=t.slice(s,s+a);r.push(c),s+=a}return Buffer.concat(r)}function ex(t,e,n){let r=[],s=e+n,i=e;for(;i+12<=t.length&&i<s;){let o=t.readUInt32LE(i),a=t.readUInt32LE(i+4),c=t.readUInt32LE(i+8);if(o===0&&a===0&&c===0){i+=12;continue}i+=12;let l=o+1;for(let u=0;u<l&&!(i+8>t.length||i>=s);u++){let d=t.readInt16LE(i+2),f=t.readUInt16LE(i+4),p=t.readUInt16LE(i+6);i+=8;let m=p+1,h=t.slice(i,i+m).toString("utf8");i+=m,r.push({inodeNumber:c+d,type:f,name:h})}}return r}function Us(t){if(!No(t))throw new Error("decodeSquashfs: not a squashfs image");let e=W1(t);if(e.compression!==z1)throw new Error(`decodeSquashfs: unsupported compression ${e.compression} (only gzip=1)`);let n=H1(t,e.idTableStart,e.idCount),r=t.readUInt32LE(16),s=e.fragmentTableStart>0&&r>0?q1(t,e.fragmentTableStart,r):[],{data:i,blocks:o}=Po(t,e.inodeTableStart,e.directoryTableStart),a=G1(o,e.rootInode,e.inodeTableStart);if(a<0||a>=i.length)throw new Error(`decodeSquashfs: root inode not found at offset ${a}`);let c=Em(i,a),l=J1(i),{data:u}=Po(t,e.directoryTableStart),d=$m("",c.mode||493,0,0,c.mtime*1e3);return c.dirStartBlock!==void 0&&Pm(t,c,u,l,n,s,d,"",e),d}function $m(t,e,n,r,s){return{type:"directory",name:t,mode:e,uid:n,gid:r,createdAt:s,updatedAt:s,children:Object.create(null),_childCount:0,_sortedKeys:null}}function vm(t,e,n,r,s,i){return{type:"file",name:t,content:e,mode:n,uid:r,gid:s,compressed:!1,createdAt:i,updatedAt:i}}function tx(t,e,n){let r=e.dirStartBlock??0,s=e.dirOffset??0,i=n+r,o=0,a=n;for(;a<i&&o<t.length;){let c=a+2;if(c>=i)break;o+=8192,a=c}return o+s}function Pm(t,e,n,r,s,i,o,a,c){if(e.dirStartBlock===void 0||e.dirOffset===void 0)return;let l=tx(n,e,c.directoryTableStart),u=e.dirSize===void 0?0:Math.max(0,e.dirSize-3),d=ex(n,l,u);for(let f of d){let p=r.get(f.inodeNumber);if(!p)continue;let m=p.uid<s.length?s[p.uid]??0:0,h=p.gid<s.length?s[p.gid]??0:0,g=p.mtime*1e3;if(p.inodeType===ko||p.inodeType===Mo){let y=$m(f.name,p.mode===0?493:p.mode,m,h,g);o.children[f.name]=y,o._childCount++,o._sortedKeys=null,p.dirStartBlock!==void 0&&p.dirOffset!==void 0&&Pm(t,p,n,r,s,i,y,a?`${a}/${f.name}`:`/${f.name}`,c)}else if(p.inodeType===Ds||p.inodeType===Ls){let y=p.symlinkTarget??"";o.children[f.name]=vm(f.name,Buffer.from(y,"utf8"),41471,m,h,g),o._childCount++,o._sortedKeys=null}else if(p.inodeType===Rs||p.inodeType===Fs){let y=Buffer.alloc(0),S=p.fileSize??0;if(p.blockSizes&&p.blockSizes.length>0&&p.fileStartBlock)try{y=Q1(t,p.fileStartBlock,p.blockSizes)}catch{y=Buffer.alloc(0)}if(y.length===0&&p.fragmentIndex!==void 0&&p.fragmentIndex!==4294967295&&S>0)try{let v=i[p.fragmentIndex];if(v){let x=!(v.size&Os),A=v.size&~Os,I=t.slice(v.startBlock,v.startBlock+A),_;if(x)try{_=Buffer.from(Ut(I))}catch{_=I}else _=I;let b=p.fragmentOffset??0;y=_.slice(b,b+S)}}catch{y=Buffer.alloc(0)}o.children[f.name]=vm(f.name,y,p.mode||420,m,h,g),o._childCount++,o._sortedKeys=null}}}var B1,z1,ko,Rs,Ds,Cm,_m,wm,Im,Mo,Fs,Ls,Or,Os,Ao=E(()=>{"use strict";bn();B1=1936814952,z1=1,ko=1,Rs=2,Ds=3,Cm=4,_m=5,wm=6,Im=7,Mo=8,Fs=9,Ls=10,Or=32768,Os=1<<24});import*as Bs from"node:path";import*as km from"node:fs";function nx(t,e,n){t.mkdir(e,n.mode),Mm(t,e,n)}function Mm(t,e,n){for(let[r,s]of Object.entries(n.children)){let i=Bs.posix.join(e,r);if(s.type==="directory")t.mkdir(i,s.mode),Mm(t,i,s);else if(s.type==="file"||s.type==="stub"){let o=s,a=o.type==="stub"&&o.stubContent?Buffer.from(o.stubContent,"utf8"):o.content??Buffer.alloc(0);t.writeFile(i,a,{mode:s.mode})}}}function To(t,e){return e.startsWith("/")?Bs.posix.normalize(e):Bs.posix.join(t,e)}var Nm,Am=E(()=>{"use strict";Q();Ao();Nm={name:"mount",description:"Mount a filesystem or list active mounts",category:"system",params:["[-o <options>] [-t <fstype>] [source] [target]"],run:({shell:t,cwd:e,args:n})=>{if(k(n,["--help","-h"]))return{stdout:["Usage: mount [options] [source] [target]","  -o, --options <opts>   Mount options (ro, rw, remount)","  -t, --type <fstype>    Filesystem type (host, squashfs)","  -h, --help             Show this help","","Without arguments, list active mounts."].join(`
`),exitCode:0};let{flagsWithValues:r,positionals:s}=$e(n,{flagsWithValue:["-o","--options","-t","--type"]});if(s.length===0){let l=t.vfs.getMounts();return l.length===0?{stdout:"",exitCode:0}:{stdout:`${l.map(d=>{let f=d.readOnly?"ro":"rw";return`${d.hostPath} on ${d.vPath} type host (${f})`}).join(`
`)}
`,exitCode:0}}let i=r.get("-o")??r.get("--options")??"",o=i.includes("ro")&&!i.includes("rw"),a=i.includes("remount"),c=r.get("-t")??r.get("--type")??"";if(s.length>=2){let l=To(e,s[0]),u=To(e,s[1]);if(c==="squashfs"||c==="squash4")try{let d=km.readFileSync(l),f=Us(d);return nx(t.vfs,u,f),{exitCode:0}}catch(d){return{stderr:`mount: ${d instanceof Error?d.message:String(d)}`,exitCode:32}}if(a){let f=t.vfs.getMounts().find(p=>p.vPath===u);return f?(t.vfs.unmount(u),t.vfs.mount(u,f.hostPath,{readOnly:o}),{exitCode:0}):{stderr:`mount: ${u}: not mounted`,exitCode:32}}try{return t.vfs.mount(u,l,{readOnly:o}),{exitCode:0}}catch(d){return{stderr:`mount: ${d instanceof Error?d.message:String(d)}`,exitCode:32}}}if(s.length===1){let l=To(e,s[0]),d=t.vfs.getMounts().find(m=>m.vPath===l);if(!d)return{stderr:`mount: ${l}: not mounted`,exitCode:32};let f=d.readOnly?"ro":"rw";return{stdout:`${`${d.hostPath} on ${d.vPath} type host (${f})`}
`,exitCode:0}}return{stderr:`mount: invalid argument(s)
Try 'mount --help' for more information.`,exitCode:1}}}});import*as nr from"node:os";var Tm,Om,Rm,Dm=E(()=>{"use strict";Tm={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:t})=>{let e=nr.cpus(),n=t.resourceCaps?.cpuCapCores,r=n!==void 0&&n>0?e.slice(0,n):e,s=nr.arch(),i=nr.endianness(),o=r.length,a=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Om={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Rm={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});var Fm,Lm=E(()=>{"use strict";Q();re();Fm={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=pn(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let f=d.split(`
`),p=d.endsWith(`
`),m=p?f.slice(0,-1):f;return m.slice(Math.max(0,m.length-a)).join(`
`)+(p?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let f=U(n,d);try{ge(t,f,"tail"),u.push(l(e.vfs.readFile(f)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function rx(t,e,n){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(n?`${t}/`:t,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function sx(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function ix(t){let e=[];for(let{name:n,content:r,isDir:s}of t)e.push(rx(n,s?0:r.length,s)),s||(e.push(r),e.push(sx(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function ox(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=Number.parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:s,content:c})}n+=Math.ceil(o/512)*512}return e}var Um,Bm=E(()=>{"use strict";bn();re();Um={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=[],o=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let y of g.slice(1))i.push(`-${y}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){o=!0;for(let y of g)i.push(`-${y}`)}else i.push(g);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),f=i.indexOf("-f"),p=f===-1?i.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2")):i[f+1];if(!(a||c||l))return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let m=U(e,p),h=u||p.endsWith(".gz")||p.endsWith(".tgz");if(a){let g=new Set;f!==-1&&i[f+1]&&g.add(i[f+1]);let y=i.filter(I=>!(I.startsWith("-")||g.has(I))),S=[],v=[];for(let I of y){let _=U(e,I);if(!t.vfs.exists(_))return{stderr:`tar: ${I}: No such file or directory`,exitCode:1};if(t.vfs.stat(_).type==="file"){let C=t.vfs.readFileRaw(_);S.push({name:I,content:C,isDir:!1}),d&&v.push(I)}else{S.push({name:I,content:Buffer.alloc(0),isDir:!0}),d&&v.push(`${I}/`);let C=(P,T)=>{for(let R of t.vfs.list(P)){let G=`${P}/${R}`,X=`${T}/${R}`;if(t.vfs.stat(G).type==="directory")S.push({name:X,content:Buffer.alloc(0),isDir:!0}),d&&v.push(`${X}/`),C(G,X);else{let $=t.vfs.readFileRaw(G);S.push({name:X,content:$,isDir:!1}),d&&v.push(X)}}};C(_,I)}}let x=ix(S),A=h?Buffer.from(hn(x)):x;return t.vfs.writeFile(m,A,{},r,s),{stdout:d?v.join(`
`):void 0,exitCode:0}}if(l||c){let g=t.vfs.readFileRaw(m),y;if(h)try{y=Buffer.from(wt(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else y=g;let S=ox(y);if(l)return{stdout:S.map(A=>d?`-rw-r--r-- 0/0 ${A.content.length.toString().padStart(8)} 1970-01-01 00:00 ${A.name}`:A.name).join(`
`),exitCode:0};let v=[];for(let{name:x,content:A}of S){let I=U(e,x);t.vfs.writeFile(I,A,{},r,s),d&&v.push(x)}return{stdout:d?v.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});function ax(t,e){for(let n=1;n<t.length;n++){let r=t[n];if(r==="delay"||r==="latency"){let s=t[n+1];return Oo(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(r))return Oo(r)}return 0}function cx(t,e){let n=t.indexOf("jitter");if(n===-1)return 0;let r=t[n+1];return Oo(r??"0")}function lx(t,e){let n=t.indexOf("loss");if(n===-1)return 0;for(let r=n+1;r<t.length;r++){let s=t[r];if(/^\d+(\.\d+)?%$/.test(s))return Number.parseFloat(s)}return 0}function ux(t,e){let n=t.indexOf("reorder");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function dx(t,e){let n=t.indexOf("duplicate");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function fx(t,e){let n=t.indexOf("corrupt");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function zm(t,e){let n=t.indexOf("rate");return n===-1?"0":t[n+1]??"0"}function px(t,e){let n=t.indexOf("burst");return n===-1?"0":t[n+1]??"0"}function mx(t,e){let n=t.indexOf("limit");return n===-1?"0":t[n+1]??"0"}function Oo(t){return t.endsWith("ms")?Number.parseFloat(t):t.endsWith("us")?Number.parseFloat(t)/1e3:t.endsWith("s")?Number.parseFloat(t)*1e3:Number.parseFloat(t)}var Wm,jm=E(()=>{"use strict";Wm={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase();if(!r)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(r==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=t.indexOf("dev"),o=i===-1?void 0:t[i+1],a=n.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:`${c.join(`
`)}
`,exitCode:0}}if(s==="add"){let i=t.indexOf("dev"),o=i===-1?"eth0":t[i+1],a=t.indexOf("netem"),c=t.indexOf("tbf"),l=t.indexOf("htb");if(a!==-1){let u=ax(t,a),d=cx(t,a),f=lx(t,a),p=ux(t,a),m=dx(t,a),h=fx(t,a),g=n.getInterface(o);return n.setInterfaceMtu(o,g?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${f}% reorder=${p}% duplicate=${m}% corrupt=${h}%
`,exitCode:0}}if(c!==-1){let u=zm(t,c),d=px(t,c),f=mx(t,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${f}
`,exitCode:0}}if(l!==-1){let u=zm(t,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=t.indexOf("dev");return{stdout:`Deleted qdisc from ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=t.indexOf("dev");return{stdout:`Changed qdisc on ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}}return r==="class"||r==="filter"||r==="action"?{exitCode:0}:{stderr:`tc: Object "${r}" is unknown, try "tc help".`,exitCode:1}}}});var Vm,Gm=E(()=>{"use strict";Q();re();Vm={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=k(n,["-a"]),a=n.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=U(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,s,i)}catch{return""}})();t.vfs.writeFile(u,d+c,{},s,i)}else t.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function En(t,e,n,r){if(t.length===0)return!1;if(t[0]==="!")return!En(t.slice(1),e,n,r);if(t.includes("-a")||t.includes("-o")){let s=t.indexOf("-a");if(s!==-1)return En(t.slice(0,s),e,n,r)&&En(t.slice(s+1),e,n,r);let i=t.indexOf("-o");if(i!==-1)return En(t.slice(0,i),e,n,r)||En(t.slice(i+1),e,n,r)}if(t.length===2){let[s,i=""]=t,o=U(n,i);switch(s){case"-e":return e.vfs.exists(o);case"-f":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file";case"-d":return e.vfs.exists(o)&&e.vfs.stat(o).type==="directory";case"-b":return!1;case"-c":return!1;case"-p":return!1;case"-S":return!1;case"-g":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&1024);case"-k":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&512);case"-r":return e.vfs.exists(o);case"-w":return e.vfs.exists(o);case"-x":return e.vfs.exists(o)&&!!(e.vfs.stat(o).mode&73);case"-s":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file"&&e.vfs.stat(o).size>0;case"-z":return i.length===0;case"-n":return i.length>0;case"-L":return e.vfs.isSymlink(o);case"-t":{let a=Number.parseInt(i,10);return a===0||a===1||a===2}case"-o":{if(!r)return!1;let a=`__${i}`;return r[a]==="1"}case"-v":return r?i in r:!1;case"-R":return r?r[i]!==void 0:!1;default:break}}if(t.length===3){let[s="",i,o=""]=t,a=Number(s),c=Number(o);switch(i){case"=":case"==":return s===o;case"!=":return s!==o;case"<":return s<o;case">":return s>o;case"-eq":return a===c;case"-ne":return a!==c;case"-lt":return a<c;case"-le":return a<=c;case"-gt":return a>c;case"-ge":return a>=c;case"-nt":{let l=U(n,s),u=U(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.updatedAt>f.updatedAt}case"-ot":{let l=U(n,s),u=U(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.updatedAt<f.updatedAt}case"-ef":{let l=U(n,s),u=U(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.path===f.path}case"=~":try{return new RegExp(o).test(s)}catch{return!1}default:break}}return t.length===1?(t[0]??"").length>0:!1}var Hm,qm,Ym=E(()=>{"use strict";re();Hm={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{let r=[...t];return r[r.length-1]==="]"&&r.length--,r[0]==="["&&r.shift(),{exitCode:En(r,e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}},qm={name:"[[",aliases:["[["],description:"Evaluate conditional expression (extended)",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n,env:r})=>{try{let s=[...t];for(;s[s.length-1]==="]]";)s.length--;for(;s[0]==="[[";)s.shift();let i=s.map(a=>a==="&&"?"-a":a==="||"?"-o":a);return{exitCode:En(i,e,n,r.vars)?0:1}}catch{return{stderr:"[[ : malformed expression",exitCode:2}}}}});function Km(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}var Xm,Zm,Jm,Qm,eh=E(()=>{"use strict";Q();re();Xm={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:s}=$e(n,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!(o&&a))return{stderr:`join: missing operand
`,exitCode:1};let c=U(e,o),l=U(e,a);if(!(t.vfs.exists(c)&&t.vfs.exists(l)))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),f=i===" 	"?/\s+/:new RegExp(i),p=new Map;for(let h of u){let g=h.split(f)[0]||h;p.set(g,h)}let m=[];for(let h of d){let g=h.split(f)[0]||h,y=p.get(g);y&&m.push(`${y} ${h}`)}return{stdout:`${m.join(`
`)}
`,exitCode:0}}},Zm={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(y=>!y.startsWith("-")),[s,i]=r;if(!(s&&i))return{stderr:`comm: missing operand
`,exitCode:1};let o=U(e,s),a=U(e,i);if(!(t.vfs.exists(o)&&t.vfs.exists(a)))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),f=[],p=[],m=[];for(let y of c)d.has(y)?m.push(y):f.push(y);for(let y of l)u.has(y)||p.push(y);let h=Math.max(f.length,p.length,m.length),g=[];for(let y=0;y<h;y++){let S=y<f.length?f[y]:"",v=y<p.length?p[y]:"",x=y<m.length?m[y]:"";g.push(`${S}	${v}	${x}`)}return{stdout:`${g.join(`
`)}
`,exitCode:0}}},Jm={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let{flagsWithValues:i,positionals:o}=$e(n,{flagsWithValue:["-l","-b"]}),a=Number.parseInt(i.get("-l")||"1000",10),c=i.has("-b")?Number.parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=U(e,l);if(!t.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let f=t.vfs.readFile(d,r,s);if(c!==void 0){let h=0;for(let g=0;g<f.length;g+=c){let y=f.slice(g,g+c),S=U(e,`${u}${Km(h)}`);t.vfs.writeFile(S,y,{},r,s),h++}return{exitCode:0}}let p=f.split(`
`),m=0;for(let h=0;h<p.length;h+=a){let g=p.slice(h,h+a).join(`
`),y=U(e,`${u}${Km(m)}`);t.vfs.writeFile(y,g,{},r,s),m++}return{exitCode:0}}},Qm={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as rr from"node:os";var th,nh=E(()=>{"use strict";th={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),s=rr.totalmem(),i=rr.freemem(),o=t.resourceCaps?.ramCapBytes,a=o===void 0?s:Math.min(s,o),c=o===null?i:Math.floor(a*(i/s)),l=a-c,u=rr.loadavg(),d=[],f=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${f},  ${n.length} user(s), load average: ${u.map(v=>v.toFixed(2)).join(", ")}`),d.push(`Tasks: ${n.length+r.length} total,   ${r.filter(v=>v.status==="running").length||1} running`);let p=(a/1024/1024).toFixed(0),m=(l/1024/1024).toFixed(0),h=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${p.padStart(8)} total, ${h.padStart(8)} free, ${m.padStart(8)} used`);let g=Math.floor(a*.5),y=Math.floor(g*.05),S=g-y;return d.push(`MiB Swap: ${String(g).padStart(8)} total, ${String(S).padStart(8)} free, ${String(y).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((v,x)=>{let A=1e3+x,I=Math.floor(Math.random()*2e5+5e4),_=Math.floor(Math.random()*1e4+2e3),b=Math.floor(_*.6),C=(Math.random()*5).toFixed(1),P=(_/(a/1024)*100).toFixed(1);d.push(`${String(A).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(I).padStart(7)} ${String(_).padStart(6)} ${String(b).padStart(6)} S  ${C.padStart(4)} ${P.padStart(5)}   0:00.00 bash`)}),r.forEach(v=>{let x=Math.floor(Math.random()*5e4+1e4),A=Math.floor(Math.random()*5e3+500),I=Math.floor(A*.5),_=(Math.random()*10).toFixed(1),b=(A/(a/1024)*100).toFixed(1),C=v.status==="running"?"R":"S";d.push(`${String(v.pid).padStart(5)} ${v.username.padEnd(8).slice(0,8)}  20   0 ${String(x).padStart(7)} ${String(A).padStart(6)} ${String(I).padStart(6)} ${C} ${_.padStart(4)} ${b.padStart(5)}   0:00.00 ${v.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});import*as rh from"node:path";var sh,ih=E(()=>{"use strict";re();sh={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=U(n,o);e.vfs.exists(a)?qe(e.vfs,e.users,t,a,2):(qe(e.vfs,e.users,t,rh.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var hx,oh,ah,ch,lh=E(()=>{"use strict";hx={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},oh=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],ah={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=Number.parseInt(t[1],10);return{stdout:`\x1B[${oh[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=Number.parseInt(t[1],10);return{stdout:`\x1B[${oh[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${Number.parseInt(t[1],10)+1};${Number.parseInt(t[2],10)+1}H`,exitCode:0};let n=hx[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},ch={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function gx(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function uh(t){let e=[],n=gx(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var dh,fh=E(()=>{"use strict";Q();dh={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=k(t,["-d"]),r=k(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=uh(s[0]??""),o=uh(s[1]??""),a=e??"";if(n){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});function yx(t,e){let n=hh(t),r=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;r.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return r.push({ip:n,hostname:t,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),r}function Sx(t,e){return t==="localhost"||t==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(t)?t:hh(t)}function hh(t){let e=bx(t);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function bx(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return Math.abs(e)}function ph(t,e,n){let r=t.indexOf(e);if(r===-1)return n;let s=t[r+1],i=Number.parseInt(s??"0",10);return Number.isNaN(i)?n:i}var mh,gh=E(()=>{"use strict";mh={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(c=>!c.startsWith("-"));if(!r)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=ph(t,"-m",30),i=ph(t,"-q",3),o=[];o.push(`traceroute to ${r} (${Sx(r,e)}), ${s} hops max, 60 byte packets`);let a=yx(r,n);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let f=l.baseLatency+Math.random()*l.jitter;u.push(`${f.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var yh,Sh=E(()=>{"use strict";Q();re();yh={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=U(n,Xt(r,0)??n);return ge(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var bh,xh,vh=E(()=>{"use strict";bh={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},xh={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});function Ch(t){return`__func_${t}`}function xx(t,e,n,r){if(Ch(t)in e)return{kind:"function"};if(Ve(t))return{kind:"builtin"};for(let s of n){let i=`${s}/${t}`;if(r.vfs.exists(i))return{kind:"file",path:i}}return{kind:"not found"}}var _h,wh=E(()=>{"use strict";Zt();_h={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["[-afptP] <command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=new Set([...t].filter(d=>d.startsWith("-")&&!d.includes("="))),s=t.filter(d=>!r.has(d)),i=r.has("-t"),o=r.has("-p"),a=r.has("-a"),c=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),l=[],u=0;for(let d of s){let{kind:f,path:p}=xx(d,n.vars,c,e);if(i){l.push(f==="not found"?"":f),f==="not found"&&(u=1);continue}if(o){l.push(f==="file"&&p?p:""),f==="not found"&&(u=1);continue}if(f==="not found"){l.push(`type: ${d}: not found`),u=1;continue}if(f==="builtin"?l.push(`${d} is a shell builtin`):f==="function"?l.push(`${d} is a function`):f==="file"&&p&&l.push(`${d} is ${p}`),a){Ve(d)&&l.push(`${d} is a shell builtin`),Ch(d)in n.vars&&l.push(`${d} is a function`);for(let m of c){let h=`${m}/${d}`;e.vfs.exists(h)&&l.push(`${d} is ${h}`)}}}return{stdout:l.join(`
`),exitCode:u}}}});var Ih,Eh=E(()=>{"use strict";Q();Ih={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=k(e,["-a"]),r="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:k(e,["-r"])?{stdout:s,exitCode:0}:k(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var $h,Ph=E(()=>{"use strict";Q();$h={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=k(t,["-c"]),r=k(t,["-d"]),s=k(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var kh,Mh=E(()=>{"use strict";kh={name:"unset",description:"Remove shell variable or function",category:"shell",params:["[-fv] <NAME>..."],run:({args:t,env:e})=>{let n=!1,r=!0,s=[];for(let i of t){if(i==="-f"){n=!0,r=!1;continue}if(i==="-v"){r=!0,n=!1;continue}s.push(i)}for(let i of s)r&&delete e.vars[i],n&&delete e.vars[`__func_${i}`];return{exitCode:0}}}});var Nh,Ah=E(()=>{"use strict";Q();Nh={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=k(t,["-p"]),r=k(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let f=[];return i>0&&f.push(`${i} day${i>1?"s":""}`),o>0&&f.push(`${o} hour${o>1?"s":""}`),f.push(`${a} minute${a===1?"":"s"}`),{stdout:`up ${f.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u===1?"":"s"},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Th,Oh=E(()=>{"use strict";Th={name:"usermod",description:"Modify a user account",category:"users",params:["[-g group|-G groups|-aG group|-L|-U] <user>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`usermod: permission denied
`,exitCode:1};let r,s,i=!1,o=!1,a=!1,c;for(let u=0;u<n.length;u++){let d=n[u];if(d)if(d==="-g"){let f=n[u+1];if(!f)break;r=f,u++}else if(d==="-G"){let f=n[u+1];if(!f)break;s=f.split(","),u++}else if(d==="-aG"){let f=n[u+1];if(!f)break;i=!0,s=f.split(","),u++}else d==="-L"?o=!0:d==="-U"?a=!0:c||(c=d)}if(!c)return{stderr:`Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>
`,exitCode:1};if(!e.users.listUsers().includes(c))return{stderr:`usermod: user '${c}' does not exist
`,exitCode:1};if(r){if(e.users.getGidByName(r)===null)return{stderr:`usermod: group '${r}' does not exist
`,exitCode:1};e.users.addGroupMember(r,c)}if(s){if(!i){let u=e.users.getUserSupplementaryGroups(c);for(let d of u)e.users.removeGroupMember(d,c)}for(let u of s){let d=u.trim();if(d){if(!e.users.getGroup(d))return{stderr:`usermod: group '${d}' does not exist
`,exitCode:1};e.users.addGroupMember(d,c)}}}if(o){let u=e.users.getPasswordHash(c);if(u&&!u.startsWith("!"))return{stdout:`usermod: lock requested for '${c}' (password lock not yet implemented)
`,exitCode:0}}return a?{stdout:`usermod: unlock requested for '${c}'
`,exitCode:0}:{stdout:`usermod: user '${c}' modified
`,exitCode:0}}}});import*as Rh from"node:path";var Dh,Fh=E(()=>{"use strict";re();Dh={name:"vi",aliases:["vim"],description:"Modal text editor (vi compatible)",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.includes("--help")||r.includes("-h"))return{stdout:["Usage: vi [file]","  -h, --help    Show this help","","Modal text editor. Use :q to quit, :w to save."].join(`
`),exitCode:0};let s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:"vi: missing file operand",exitCode:1};let i=U(n,s);ge(t,i,"vi");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=Rh.posix.basename(i)||"buffer",c=`/tmp/sshmimic-vi-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});var Lh,Uh=E(()=>{"use strict";Ke();Lh={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${pe(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let m=JSON.parse(t.vfs.readFile(c));l=new Date(m.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",p=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,p].join(`
`),exitCode:0}}}});var Bh,zh=E(()=>{"use strict";Q();re();Bh={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=k(r,["-l"]),o=k(r,["-w"]),a=k(r,["-c"]),c=!(i||o||a),l=r.filter(f=>!f.startsWith("-")),u=(f,p)=>{let m=f.length===0?0:f.trim().split(`
`).length,h=f.trim().split(/\s+/).filter(Boolean).length,g=Buffer.byteLength(f,"utf8"),y=[];return(c||i)&&y.push(String(m).padStart(7)),(c||o)&&y.push(String(h).padStart(7)),(c||a)&&y.push(String(g).padStart(7)),p&&y.push(` ${p}`),y.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let f of l){let p=U(n,f);try{ge(t,p,"wc");let m=e.vfs.readFile(p);d.push(u(m,f))}catch{return{stderr:`wc: ${f}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Wh,jh=E(()=>{"use strict";Q();re();so();Wh={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=$e(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(k(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(k(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,f=k(n,["-q","--quiet"]),p=u==="-"?null:u??Aa(l),m=p?U(e,d?`${d}/${p}`:p):null;m&&ge(t,m,"wget");let h=[];f||(h.push(`--${new Date().toISOString()}--  ${l}`),h.push(`Resolving ${new URL(l).host}...`),h.push(`Connecting to ${new URL(l).host}...`));let g;try{let S=new URL(l),v=S.port?Number.parseInt(S.port,10):S.protocol==="https:"?443:80,x=bs(l,r.resourceCaps?.outboundRestriction);if(x.allowed){let A=r.network.checkFirewall("OUTPUT","tcp",void 0,S.hostname,v);if(A==="DROP"||A==="REJECT")return{stderr:`wget: unable to connect to ${S.hostname}:${v}: Connection refused
`,exitCode:4};g=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}else if(x.honeypot)g=xs(l);else return{stderr:`wget: unable to connect to ${S.hostname}:${v}: Connection refused
`,exitCode:4}}catch(S){let v=S instanceof Error?S.message:String(S);return h.push(`wget: unable to resolve host: ${v}`),{stderr:h.join(`
`),exitCode:4}}if(!g.ok)return h.push(`ERROR ${g.status}: ${g.statusText}`),{stderr:h.join(`
`),exitCode:8};let y;try{y=await g.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!f){let S=g.headers.get("content-type")??"application/octet-stream";h.push(`HTTP request sent, awaiting response... ${g.status} ${g.statusText}`),h.push(`Length: ${y.length} [${S}]`)}return u==="-"?{stdout:y,stderr:h.join(`
`)||void 0,exitCode:0}:m?(r.vfs.writeFile(m,y,{},s,i),f||h.push(`Saving to: '${m}'
${m}            100%[==================>]  ${y.length} B`),{stderr:h.join(`
`)||void 0,exitCode:0}):{stdout:y,exitCode:0}}}});var Vh,Gh=E(()=>{"use strict";Vh={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function zs(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${s}:${i}:${o} ${a}`}var Ro=E(()=>{"use strict"});var Hh,qh=E(()=>{"use strict";Ro();Hh={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:zs(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Yh,Kh=E(()=>{"use strict";Yh={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var Xh,Zh=E(()=>{"use strict";Ke();Xh={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:({authUser:t,hostname:e,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return ye(d,t,e,n,r,o,void 0,a)}}});var Jh,Qh=E(()=>{"use strict";Jh={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});function Cx(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(vx[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function _x(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function wx(t){let e=[],n=[],r=0,[s,i]=_x();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(Sn(l,{level:6})),f=d.length<l.length,p=f?d:l,m=Cx(l),h=f?8:0,g=Buffer.alloc(30+u.length);g.writeUInt32LE(67324752,0),g.writeUInt16LE(20,4),g.writeUInt16LE(2048,6),g.writeUInt16LE(h,8),g.writeUInt16LE(s,10),g.writeUInt16LE(i,12),g.writeUInt32LE(m,14),g.writeUInt32LE(p.length,18),g.writeUInt32LE(l.length,22),g.writeUInt16LE(u.length,26),g.writeUInt16LE(0,28),u.copy(g,30);let y=Buffer.alloc(46+u.length);y.writeUInt32LE(33639248,0),y.writeUInt16LE(20,4),y.writeUInt16LE(20,6),y.writeUInt16LE(2048,8),y.writeUInt16LE(h,10),y.writeUInt16LE(s,12),y.writeUInt16LE(i,14),y.writeUInt32LE(m,16),y.writeUInt32LE(p.length,20),y.writeUInt32LE(l.length,24),y.writeUInt16LE(u.length,28),y.writeUInt16LE(0,30),y.writeUInt16LE(0,32),y.writeUInt16LE(0,34),y.writeUInt16LE(0,36),y.writeUInt32LE(2175008768,38),y.writeUInt32LE(r,42),u.copy(y,46),e.push(g,p),n.push(y),r+=g.length+p.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function Ix(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=t.readUInt16LE(n+8),i=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+i),f;if(s===8)try{f=Buffer.from(tn(d))}catch{f=d}else f=d;l&&!l.endsWith("/")&&(f.length===o||s!==0?e.push({name:l,content:f}):e.push({name:l,content:f})),n=u+i}return e}var vx,eg,tg,ng=E(()=>{"use strict";bn();re();vx=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();eg={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-r")||n.includes("-R"),i=n.filter(m=>!m.startsWith("-")),o=i[0],a=i.slice(1);if(!o)return{stderr:"zip: no archive specified",exitCode:1};if(a.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let c=U(e,o.endsWith(".zip")?o:`${o}.zip`),l=[],u=[],d=t.users.getUid(r),f=t.users.getGid(r);for(let m of a){let h=U(e,m);if(!t.vfs.exists(h))return{stderr:`zip warning: name not matched: ${m}`,exitCode:12};let g=t.vfs.stat(h),y=m.startsWith("/")?m.slice(1):m;if(g.type==="file"){let S=t.vfs.readFileRaw(h);l.push({name:y,content:S}),u.push(`  adding: ${m} (deflated)`)}else if(s){let S=(v,x)=>{for(let A of t.vfs.list(v)){let I=`${v}/${A}`,_=`${x}/${A}`;if(t.vfs.stat(I).type==="directory")S(I,_);else{let C=t.vfs.readFileRaw(I);l.push({name:_.startsWith("/")?_.slice(1):_,content:C}),u.push(`  adding: ${_} (deflated)`)}}};S(h,y)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let p=wx(l);return t.vfs.writeFile(c,p,{},d,f),{stdout:u.join(`
`),exitCode:0}}},tg={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-l"),i=n.indexOf("-d"),o=i===-1?void 0:n[i+1],a=n.find(h=>!h.startsWith("-")&&h!==o);if(!a)return{stderr:"unzip: missing archive operand",exitCode:1};let c=U(e,a);if(!t.vfs.exists(c))return{stderr:`unzip: cannot find or open ${a}`,exitCode:9};let l=t.vfs.readFileRaw(c),u;try{u=Ix(l)}catch(h){return{stderr:`unzip: ${a}: not a valid ZIP file: ${h instanceof Error?h.message:String(h)}`,exitCode:1}}let d=o?U(e,o):e,f=t.users.getUid(r),p=t.users.getGid(r);if(s){let h=`Archive:  ${a}
  Length      Date    Time    Name
---------  ---------- -----   ----`,g=u.map(v=>`  ${String(v.content.length).padStart(8)}  2024-01-01 00:00   ${v.name}`),y=u.reduce((v,x)=>v+x.content.length,0),S=`---------                     -------
  ${String(y).padStart(8)}                     ${u.length} file${u.length===1?"":"s"}`;return{stdout:`${h}
${g.join(`
`)}
${S}`,exitCode:0}}let m=[`Archive:  ${a}`];for(let{name:h,content:g}of u){let y=h.startsWith("/")?h.slice(1):h,S=U(d,y);t.vfs.writeFile(S,g,{},f,p),m.push(`  inflating: ${S}`)}return{stdout:m.join(`
`),exitCode:0}}}});var rg,sg=E(()=>{"use strict";Q();rg={name:"arp",description:"Display or modify the ARP cache",category:"network",params:["[-n] [-d <host>] [-s <host> <mac>]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: arp [-n] [-d <host>] [-s <host> <mac>]","  -n          Show numerical addresses","  -d <host>   Delete ARP entry","  -s <host> <mac>  Add ARP entry","  -h, --help  Show this help","","Display or modify ARP cache entries."].join(`
`),exitCode:0};let n=t.network,r=e.indexOf("-d");if(r!==-1&&r+1<e.length){let a=e[r+1];return n.arpCache=n.arpCache.filter(c=>c.ip!==a),{stdout:"",exitCode:0}}let s=e.indexOf("-s");if(s!==-1&&s+2<e.length){let a=e[s+1],c=e[s+2];return n.arpCache.push({ip:a,mac:c,device:"eth0",state:"REACHABLE"}),{stdout:"",exitCode:0}}let i=n.getArpCache(),o=["Address                  HWtype  HWaddress           Flags Mask    Iface"];for(let a of i)o.push(`${a.ip.padEnd(24)} ether   ${a.mac.padEnd(19)} ${"C".padEnd(12)} ${a.device}`);return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var ig,og=E(()=>{"use strict";Q();ig={name:"cmp",description:"Compare two files byte by byte",category:"files",params:["<file1> <file2>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: cmp [-l] [-s] <file1> <file2>
  -l  Print byte offsets
  -s  Silent (exit code only)
  -h, --help  Show this help
`,exitCode:0};let n=e.filter(c=>!c.startsWith("-"));if(n.length<2)return{stderr:"cmp: missing file operand",exitCode:2};let r=k(e,["-l"]),s=k(e,["-s"]);if(!t.vfs.exists(n[0]))return{stderr:`cmp: ${n[0]}: No such file`,exitCode:2};if(!t.vfs.exists(n[1]))return{stderr:`cmp: ${n[1]}: No such file`,exitCode:2};let i=t.vfs.readFile(n[0]),o=t.vfs.readFile(n[1]);if(i===o)return{stdout:"",exitCode:0};if(s)return{stdout:"",exitCode:1};let a=Math.min(i.length,o.length);for(let c=0;c<a;c++)if(i[c]!==o[c]){let l=u=>u.length>0?u.charCodeAt(0):0;return r?{stdout:`${c+1} ${l(i[c]).toString(8)} ${l(o[c]).toString(8)}
`,exitCode:1}:{stdout:`cmp: ${n[0]} ${n[1]} differ: byte ${c+1}
`,exitCode:1}}return i.length!==o.length?{stdout:`cmp: EOF on ${i.length<o.length?n[0]:n[1]}
`,exitCode:1}:{stdout:"",exitCode:0}}}});function Ex(t,e){try{if(t.exists("/etc/hosts")){let n=t.readFile("/etc/hosts");for(let r of n.split(`
`)){let s=r.trim();if(!s||s.startsWith("#"))continue;let i=s.split(/\s+/);if(i.length>=2){let o=i[0],a=i.slice(1);if(a.includes(e)||a.includes(e.split(".")[0]))return o}}}}catch{}return null}function $x(t,e,n){let r=[];try{if(t.exists("/etc/hosts")){let s=t.readFile("/etc/hosts");for(let i of s.split(`
`)){let o=i.trim();if(!o||o.startsWith("#"))continue;let a=o.split(/\s+/);if(a.length>=2){let c=a[0],l=a.slice(1);(l.includes(e)||l.includes(e.split(".")[0]))&&(n==="A"&&!c.includes(":")&&r.push(c),n==="AAAA"&&c.includes(":")&&r.push(c))}}}}catch{}return r.length===0&&n==="A"&&r.push("127.0.0.1"),r}var ag,cg=E(()=>{"use strict";Q();ag={name:"dig",description:"DNS lookup utility",category:"network",params:["[@server] <name> [type]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: dig [@server] <name> [type]","  -h, --help    Show this help","","Types: A, AAAA, MX, TXT, CNAME, NS, SOA","","Query DNS for name resolution."].join(`
`),exitCode:0};let n="1.1.1.1",r,s="A";for(let c of e)c.startsWith("@")?n=c.slice(1):c===e[0]&&!r?r=c:r&&!s&&(s=c.toUpperCase());if(!r)return{stderr:"dig: missing hostname",exitCode:1};let i=Ex(t.vfs,r),o=new Date().toISOString().replace("T"," ").slice(0,19),a=[`; <<>> DiG 9.18.28 <<>> ${r}`,";; global options: +cmd",";; Got answer:",`;; ->>HEADER<<- opcode: QUERY, status: ${i?"NOERROR":"NXDOMAIN"}, id: ${Math.floor(Math.random()*65535)}`,`;; flags: qr rd ra; QUERY: 1, ANSWER: ${i?1:0}, AUTHORITY: 0, ADDITIONAL: 1`,"",";; OPT PSEUDOSECTION:","; EDNS: version: 0, flags:; udp: 1232",";; QUESTION SECTION:",`;${r}.			IN	${s}`,""];if(i){if(a.push(";; ANSWER SECTION:"),s==="A"||s==="AAAA"){let c=$x(t.vfs,r,s);for(let l of c)a.push(`${r}.		300	IN	${s}	${l}`)}else s==="MX"?a.push(`${r}.		300	IN	MX	10 mail.${r}.`):s==="TXT"?a.push(`${r}.		300	IN	TXT	"v=spf1 mx ~all"`):s==="CNAME"?a.push(`${r}.		300	IN	CNAME	${r}.`):a.push(`${r}.		300	IN	A	${i}`);a.push("")}return a.push(`;; Query time: ${Math.floor(Math.random()*50+10)} msec`),a.push(`;; SERVER: ${n}#53(${n}) (UDP)`),a.push(`;; WHEN: ${o}`),a.push(`;; MSG SIZE  rcvd: ${Math.floor(Math.random()*200+50)}`),a.push(""),{stdout:a.join(`
`),exitCode:0}}}});var lg,ug=E(()=>{"use strict";Q();lg={name:"ethtool",description:"Display or modify network interface parameters",category:"network",params:["<interface>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: ethtool <interface>","  -h, --help    Show this help","","Display network interface configuration."].join(`
`),exitCode:0};let n=e.find(i=>!i.startsWith("-"));if(!n)return{stderr:"ethtool: missing interface name",exitCode:1};let s=t.network.getInterface(n);return s?{stdout:`${[`Settings for ${n}:`,"	Supported ports: [ TP MII ]","	Supported link modes:   10baseT/Half 10baseT/Full","	                        100baseT/Half 100baseT/Full","	                        1000baseT/Full","	Supported pause frame use: Symmetric","	Supports auto-negotiation: Yes","	Advertised link modes:  1000baseT/Full","	Advertised pause frame use: Symmetric","	Advertised auto-negotiation: Yes",`	Speed: ${s.speed??1e3}Mb/s`,`	Duplex: ${s.duplex??"Full"}`,"	Port: Twisted Pair","	PHYAD: 0","	Transceiver: internal","	Auto-negotiation: on","	Supports Wake-on: pumbg","	Wake-on: d",`	Link detected: ${s.state==="UP"?"yes":"no"}`].join(`
`)}
`,exitCode:0}:{stderr:`ethtool: ${n}: No such device`,exitCode:1}}}});function gg(t){let e=t.toUpperCase().split("").map(n=>n===" "?"   ":` ${n}  `);return`${" ".repeat(t.length+2)}
${e.join("")}
${" ".repeat(t.length+2)}
`}function Px(t){if(t<2)return[t];let e=[],n=2;for(;t>1;){for(;t%n===0;)e.push(n),t/=n;if(n++,n*n>t){t>1&&e.push(t);break}}return e}var dg,fg,pg,mg,hg,yg=E(()=>{"use strict";Q();dg={name:"figlet",description:"Display large characters in ASCII art",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: figlet [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:gg(n),exitCode:0}}},fg={name:"banner",description:"Print large banners",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: banner [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(s=>!s.startsWith("-")).join(" ")||e||"Hello",r="#".repeat(n.length+6);return{stdout:`${r}
## ${n} ##
${r}
`,exitCode:0}}},pg={name:"toilet",description:"Display large colored banners",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: toilet [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:gg(n),exitCode:0}}},mg={name:"factor",description:"Factor integers into prime factors",category:"fun",params:["<number>..."],run:({args:t,stdin:e})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: factor <number>...
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(s=>!s.startsWith("-")).map(Number);if(n.length===0){let s=e||"";n.push(...s.trim().split(/\s+/).map(Number))}return{stdout:`${n.map(s=>`${s}: ${Px(s).join(" ")}`).join(`
`)}
`,exitCode:0}}},hg={name:"rs",description:"Reshape data matrix",category:"fun",params:["[options]"],run:({args:t,stdin:e})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: rs [options]
  -h, --help  Show this help
`,exitCode:0};let r=(t.filter(a=>!a.startsWith("-")).join(" ")||e||"").split(/\s+/).filter(Boolean),s=3,i=Math.ceil(r.length/s),o=[];for(let a=0;a<i;a++){let c=[];for(let l=0;l<s;l++){let u=l*i+a;c.push(r[u]??"")}o.push(c.join("	"))}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});function kx(t,e){let n=`${e}/pubring.kbx`;return t.exists(n)?{stdout:`pub   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}:{stdout:`gpg: directory '/root/.gnupg' created
gpg: no public keys
`,exitCode:0}}function Mx(){return{stdout:`sec   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}}function Nx(){return{stdout:`gpg: key generation not supported in virtual environment
`,exitCode:1}}var Sg,bg=E(()=>{"use strict";Q();Sg={name:"gpg",description:"GNU Privacy Guard \u2014 encryption and signing",category:"system",params:["[options] [file...]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: gpg [options] [file...]","  --list-keys       List public keys","  --list-secret-keys List secret keys","  --gen-key         Generate a new key pair","  -e, --encrypt     Encrypt data","  -d, --decrypt     Decrypt data","  -s, --sign        Sign data","  -k, --list-key    List keys (short)","  -h, --help        Show this help"].join(`
`),exitCode:0};let n=`${process.env.HOME??"/root"}/.gnupg`;if(k(e,["--list-keys","-k","--list-public-keys"]))return kx(t.vfs,n);if(k(e,["--list-secret-keys"]))return Mx();if(k(e,["--gen-key","--full-generate-key"]))return Nx();if(k(e,["-e","--encrypt"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: encrypted output written to ${r}.gpg
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}if(k(e,["-d","--decrypt"]))return e.find(s=>!s.startsWith("-"))?{stdout:`gpg: decryption not supported in virtual environment
`,exitCode:1}:{stderr:"gpg: missing file",exitCode:1};if(k(e,["-s","--sign"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: signed output written to ${r}.sig
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}return{stderr:`gpg: no command specified
Try 'gpg --help' for more information.`,exitCode:2}}}});var xg,vg=E(()=>{"use strict";Q();xg={name:"hexdump",description:"Display file contents in hexadecimal",category:"files",params:["[-C] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: hexdump [-C] [file...]
  -C  Canonical hex+ASCII display
  -h, --help  Show this help
`,exitCode:0};let r=k(e,["-C"]),s=e.filter(l=>!l.startsWith("-")),i="";if(s.length>0){if(!t.vfs.exists(s[0]))return{stderr:`hexdump: ${s[0]}: No such file`,exitCode:1};i=t.vfs.readFile(s[0])}else if(n)i=n;else return{stderr:"hexdump: missing operand",exitCode:1};let o=Buffer.from(i),a=[],c=16;for(let l=0;l<o.length;l+=c){let u=o.slice(l,l+c),d=Array.from(u).map(f=>f.toString(16).padStart(2,"0")).join(" ");if(r){let f=Array.from(u).map(m=>m>=32&&m<=126?String.fromCharCode(m):".").join(""),p=l.toString(8).padStart(8,"0");a.push(`${p}  ${d.padEnd(47)}  |${f}|`)}else a.push(d)}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var Do,Cg,_g=E(()=>{"use strict";Q();Do={"utf-8":"utf8",utf8:"utf8",ascii:"ascii",latin1:"latin1","latin-1":"latin1","iso-8859-1":"latin1",ucs2:"ucs2","ucs-2":"ucs2",utf16le:"ucs2","utf-16le":"ucs2",base64:"base64",hex:"hex"},Cg={name:"iconv",description:"Convert text from one character encoding to another",category:"files",params:["-f <from> -t <to> [file]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: iconv -f <from> -t <to> [file]
  -f <encoding>  Input encoding
  -t <encoding>  Output encoding
  -l             List known encodings
  -h, --help     Show this help
`,exitCode:0};if(k(e,["-l"]))return{stdout:`${Object.keys(Do).sort().join(`
`)}
`,exitCode:0};let r=e.indexOf("-f"),s=e.indexOf("-t"),i=r!==-1&&r+1<e.length?e[r+1]:"utf-8",o=s!==-1&&s+1<e.length?e[s+1]:"utf-8",a=e.find(d=>!d.startsWith("-")&&d!==e[r+1]&&d!==e[s+1]),c="";if(a){if(!t.vfs.exists(a))return{stderr:`iconv: ${a}: No such file`,exitCode:1};c=t.vfs.readFile(a)}else if(n)c=n;else return{stderr:"iconv: missing operand",exitCode:1};let l=Do[i.toLowerCase()]??"utf8",u=Do[o.toLowerCase()]??"utf8";try{return{stdout:Buffer.from(c,l).toString(u),exitCode:0}}catch{return{stderr:`iconv: conversion from ${i} to ${o} not supported`,exitCode:1}}}}});var wg,Ig=E(()=>{"use strict";Q();wg={name:"logger",description:"Send message to syslog",category:"network",params:["[-p priority] [-t tag] [message...]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: logger [options] [message...]","  -p, --priority <prio>  Priority (facility.severity)","  -t, --tag <tag>        Mark lines with tag","  -h, --help             Show this help","","Write message to system syslog."].join(`
`),exitCode:0};let n=process.env.USER??"root",r=[];for(let a=0;a<e.length;a++){let c=e[a];if(c==="-p"||c==="--priority")a++;else if(c==="-t"||c==="--tag"){let l=e[++a];l&&(n=l)}else c.startsWith("-")||r.push(c)}let s=r.join(" ")||"(none)",o=`${new Date().toISOString()} ${n}: ${s}`;try{let a="/var/log";t.vfs.exists(a)||t.vfs.mkdir(a,493);let c="";t.vfs.exists("/var/log/syslog")&&(c=t.vfs.readFile("/var/log/syslog")),t.vfs.writeFile("/var/log/syslog",`${c+o}
`)}catch{return{stderr:"logger: could not write to syslog",exitCode:1}}return{stdout:"",exitCode:0}}}});var Eg,$g=E(()=>{"use strict";Q();Eg={name:"nslookup",description:"Query DNS for hostname or IP",category:"network",params:["<hostname> [dns-server]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: nslookup <hostname> [dns-server]","  -h, --help    Show this help","","Query DNS for hostname resolution."].join(`
`),exitCode:0};let n=e.filter(o=>!o.startsWith("-")),r=n[0];if(!r)return{stderr:"nslookup: missing hostname",exitCode:1};let s=n[1]??"1.1.1.1",i=null;try{if(t.vfs.exists("/etc/hosts")){let o=t.vfs.readFile("/etc/hosts");for(let a of o.split(`
`)){let c=a.trim();if(!c||c.startsWith("#"))continue;let l=c.split(/\s+/);if(l.length>=2){let u=l[0],d=l.slice(1);(d.includes(r)||d.includes(r.split(".")[0]))&&(i=u)}}}}catch{}return i||(i="127.0.0.1"),{stdout:[`Server:		${s}`,`Address:	${s}#53`,"",`Name:	${r}`,`Address:	${i}`,""].join(`
`),exitCode:0}}}});var Pg,kg=E(()=>{"use strict";Q();Pg={name:"od",description:"Dump files in octal and other formats",category:"files",params:["[-t type] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: od [-t type] [file...]
  -t a    Named characters
  -t c    ASCII characters
  -t o    Octal (default)
  -t x    Hex
  -t u    Unsigned decimal
  -h, --help  Show this help
`,exitCode:0};let r=e.filter(u=>!u.startsWith("-")&&u!=="-t"),s=e.indexOf("-t"),i=s!==-1&&s+1<e.length?e[s+1]:"o",o="";if(r.length>0){if(!t.vfs.exists(r[0]))return{stderr:`od: ${r[0]}: No such file`,exitCode:1};o=t.vfs.readFile(r[0])}else if(n)o=n;else return{stderr:"od: missing operand",exitCode:1};let a=[],c=Buffer.from(o),l=16;for(let u=0;u<c.length;u+=l){let d=u.toString(7).padStart(7,"0"),f=c.slice(u,u+l),p=[];if(i==="a"){for(let m of f)p.push(m>=32&&m<=126?String.fromCharCode(m):".");a.push(`${d} ${p.join(" ")}`)}else if(i==="c"){for(let m of f){let h=m>=32&&m<=126?String.fromCharCode(m):`\\${m.toString(8)}`;p.push(h)}a.push(`${d} ${p.join(" ")}`)}else if(i==="x"){for(let m of f)p.push(m.toString(16).padStart(2,"0"));a.push(`${d} ${p.join(" ")}`)}else if(i==="u"){for(let m of f)p.push(String(m).padStart(3));a.push(`${d} ${p.join(" ")}`)}else{for(let m of f)p.push(m.toString(8).padStart(3,"0"));a.push(`${d} ${p.join(" ")}`)}}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var Mg,Ng=E(()=>{"use strict";Q();Mg={name:"openssl",description:"OpenSSL cryptographic utility",category:"system",params:["<command> [options]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"])||e.length===0)return{stdout:["Usage: openssl <command> [options]","","Commands:","  version           Print OpenSSL version","  genrsa <bits>     Generate RSA private key","  rsa <infile>      Process RSA key","  x509              Generate self-signed certificate","  md5 <file>        Compute MD5 hash","  sha256 <file>     Compute SHA256 hash","  enc -e/-d         Encrypt/decrypt with cipher","  rand <n>          Generate random bytes","  -h, --help        Show this help"].join(`
`),exitCode:0};let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:"openssl: missing command",exitCode:1};if(n==="version")return{stdout:`OpenSSL 3.0.13 30 Jan 2024 (Library: OpenSSL 3.0.13 30 Jan 2024)
`,exitCode:0};if(n==="genrsa"){let r=e.indexOf("genrsa"),s=r!==-1&&r+1<e.length?e[r+1]:"2048",i=e.indexOf("-out"),o=i!==-1&&i+1<e.length?e[i+1]:null,a=["-----BEGIN RSA PRIVATE KEY-----",`MIIEpAIBAAKCAQEA${Buffer.from(String(Math.random())).toString("base64").slice(0,40)}`,"-----END RSA PRIVATE KEY-----",""].join(`
`);return o?(t.vfs.writeFile(o,a,{mode:384}),{stdout:`Generating RSA private key, ${s} bit long modulus (2 primes)
.......+++++
....................+++++
write to '${o}'
`,exitCode:0}):{stdout:a,exitCode:0}}if(n==="rand"){let r=e.indexOf("rand"),s=r!==-1&&r+1<e.length?Number(e[r+1]):16;return{stdout:`${Array.from({length:s},()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0")).join("")}
`,exitCode:0}}if(n==="md5"){let r=e[e.indexOf("md5")+1];if(!(r&&t.vfs.exists(r)))return{stderr:"openssl: file not found",exitCode:1};let s=t.vfs.readFile(r),i=0;for(let a=0;a<s.length;a++)i=(i<<5)-i+s.charCodeAt(a)|0;let o=Math.abs(i).toString(16).padStart(32,"0");return{stdout:`MD5(${r})= ${o}
`,exitCode:0}}if(n==="sha256"){let r=e[e.indexOf("sha256")+1];if(!(r&&t.vfs.exists(r)))return{stderr:"openssl: file not found",exitCode:1};let s=t.vfs.readFile(r),i=0;for(let a=0;a<s.length;a++)i=(i<<7)-i+s.charCodeAt(a)|0;let o=Math.abs(i).toString(16).padStart(64,"0");return{stdout:`SHA256(${r})= ${o}
`,exitCode:0}}if(n==="x509"){let r=e.indexOf("-out"),s=r!==-1&&r+1<e.length?e[r+1]:null,i=["-----BEGIN CERTIFICATE-----","MIIDazCCAlMCFAjxRgAQBMBhHwWFBYJwUQIEBAQBAjANBgkqhkiG9w0BAQsFADB6","-----END CERTIFICATE-----",""].join(`
`);return s&&t.vfs.writeFile(s,i),{stdout:`Generating a self-signed certificate...
Certificate written to ${s??"stdout"}
`,exitCode:0}}return{stderr:`openssl: unknown command '${n}'`,exitCode:1}}}});function Ax(t,e,n){let r=e.split(`
`),s=0,i="",o=[],a=[],c=!1,l=0;for(let u of r){let d=u.match(/^---\s+(.+)/);if(d){i=d[1].replace(/\t.*$/,"").replace(/^[ab]\//,"");continue}if(u.match(/^\+\+\+\s+(.+)/))continue;let p=u.match(/^@@ -(\d+),\d+ \+\d+,\d+ @@/);if(p){c&&o.length>0&&i&&Ag(t,i,o,a,l,n)&&s++,l=Number(p[1]),o=[],a=[],c=!0;continue}c&&(u.startsWith("-")?o.push(u.slice(1)):u.startsWith("+")?a.push(u.slice(1)):(o.push(u),a.push(u)))}return c&&o.length>0&&i&&Ag(t,i,o,a,l,n)&&s++,{count:s}}function Ag(t,e,n,r,s,i){if(!t.vfs.exists(e))return!1;let a=t.vfs.readFile(e).split(`
`),c=i?r:n,l=i?n:r;for(let u=0;u<=a.length-c.length;u++){let d=!0;for(let f=0;f<c.length;f++)if(a[u+f]!==c[f]){d=!1;break}if(d)return a.splice(u,c.length,...l),t.vfs.writeFile(e,a.join(`
`)),!0}return!1}var Tg,Og=E(()=>{"use strict";Q();Tg={name:"patch",description:"Apply a diff file to an original",category:"files",params:["[options] [file]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: patch [options] [file]
  -p<N>  Strip N leading path components
  -i <file>  Read patch from file
  -R     Reverse patch
  -h, --help  Show this help
`,exitCode:0};let n="",r=e.indexOf("-i");if(r!==-1&&r+1<e.length){let o=e[r+1];if(!t.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};n=t.vfs.readFile(o)}else{let o=e.find(a=>!a.startsWith("-")&&a!==e[r+1]);if(o){if(!t.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};n=t.vfs.readFile(o)}else return{stderr:"patch: missing patch file",exitCode:1}}let s=k(e,["-R"]),i=Ax(t,n,s);return i.count===0?{stdout:`patch: no changes applied
`,exitCode:0}:{stdout:`patch: ${i.count} hunk(s) applied
`,exitCode:0}}}});var Rg,Dg=E(()=>{"use strict";Q();Rg={name:"pr",description:"Paginate or columnate files for printing",category:"files",params:["[options] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: pr [options] [file...]
  -l <lines>  Page length (default: 66)
  -h, --help  Show this help
`,exitCode:0};let r=e.indexOf("-l"),s=r!==-1&&r+1<e.length?Number(e[r+1]):66,i=e.filter(u=>!u.startsWith("-")&&u!==e[r+1]),o="";if(i.length>0)for(let u of i){if(!t.vfs.exists(u))return{stderr:`pr: ${u}: No such file`,exitCode:1};o+=`${t.vfs.readFile(u)}
`}else if(n)o=n;else return{stderr:"pr: missing file operand",exitCode:1};let a=o.split(`
`),c=[],l=`${new Date().toUTCString()}  Page 1`;for(let u=0;u<a.length;u+=s-3){c.push(`

${l}

`);let d=a.slice(u,u+s-3);c.push(d.join(`
`))}return{stdout:`${c.join("")}
`,exitCode:0}}}});var Fg,Lg=E(()=>{"use strict";Q();Fg={name:"recode",description:"Convert character encoding of files",category:"files",params:["<charset1>..<charset2> [file]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: recode <charset1>..<charset2> [file]
  -h, --help  Show this help
  -l          List known charsets
`,exitCode:0};if(k(e,["-l"]))return{stdout:`UTF-8 ASCII ISO-8859-1 CP1252 KOI8-R
`,exitCode:0};if(!e.find(o=>o.includes("..")))return{stderr:"recode: missing charset specification",exitCode:1};let s=e.find(o=>!(o.startsWith("-")||o.includes(".."))),i="";if(s){if(!t.vfs.exists(s))return{stderr:`recode: ${s}: No such file`,exitCode:1};i=t.vfs.readFile(s)}else if(n)i=n;else return{stderr:"recode: missing file operand",exitCode:1};return{stdout:i,exitCode:0}}}});var Ug,Bg=E(()=>{"use strict";Q();Ug={name:"route",description:"Display or modify the routing table",category:"network",params:["[-n] [add|del]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: route [-n] [add|del <target> gw <gateway>]","  -n     Show numerical addresses (no DNS resolution)","  -h, --help  Show this help","","Display or modify the IP routing table."].join(`
`),exitCode:0};let n=t.network,r=e.filter(i=>!i.startsWith("-"));if(r.length===0){let i=n.getRoutes(),o=["Kernel IP routing table","Destination     Gateway         Genmask         Flags Metric Ref    Use Iface"];for(let a of i){let c=a.destination??"0.0.0.0",l=a.gateway??"0.0.0.0",u=a.netmask??"255.255.255.0",d=c==="0.0.0.0"?"UG":"U",f=a.metric??"0",p=a.device??"eth0";o.push(`${c.padEnd(15)} ${l.padEnd(15)} ${u.padEnd(15)} ${d.padEnd(5)} ${String(f).padEnd(4)} 0       ${p}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=r[0];if(s==="add"||s==="del"){let i=r[1],o=r.indexOf("gw"),a=o!==-1&&o+1<r.length?r[o+1]:"0.0.0.0",c="0.0.0.0",l="eth0";return i?s==="add"?(n.addRoute(i,a,c,l),{stdout:"",exitCode:0}):(n.delRoute(i),{stdout:"",exitCode:0}):{stderr:"route: missing target",exitCode:1}}return{stderr:`route: unknown command '${s}'`,exitCode:1}}}});function Wg(t,e,n){let r=t.stat(e);if(r.type==="directory"){t.exists(n)||t.mkdir(n,r.mode);let s=t.list(e);for(let i of s)i==="."||i===".."||Wg(t,`${e}/${i}`,`${n}/${i}`)}else{let s=t.readFile(e);t.writeFile(n,s)}}var zg,jg=E(()=>{"use strict";Q();zg={name:"rsync",description:"Fast file synchronization tool",category:"system",params:["[options] <source> <dest>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: rsync [options] <source> <dest>
  -a, --archive   Archive mode
  -v, --verbose   Verbose
  -z, --compress  Compress
  -r, --recursive Recurse into directories
  -h, --help      Show this help
`,exitCode:0};let n=e.filter(o=>!o.startsWith("-"));if(n.length<2)return{stderr:"rsync: missing source or destination",exitCode:1};let r=n[0],s=n[1],i=k(e,["-v","--verbose"]);if(!t.vfs.exists(r))return{stderr:`rsync: ${r}: No such file or directory`,exitCode:23};try{return Wg(t.vfs,r,s),{stdout:i?`sending incremental file list

sent ${Math.floor(Math.random()*1e3+100)} bytes  received ${Math.floor(Math.random()*100+10)} bytes  ${(Math.random()*1e4+1e3).toFixed(2)} bytes/sec
total size is ${Math.floor(Math.random()*1e4)}  speedup is ${(Math.random()*10+1).toFixed(2)}
`:"",exitCode:0}}catch(o){return{stderr:`rsync: error: ${o instanceof Error?o.message:String(o)}`,exitCode:23}}}}});var Vg,Gg,Hg,qg,Yg=E(()=>{"use strict";Q();Vg={name:"screen",description:"Terminal multiplexer",category:"system",params:["[-S <name>] [command]"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: screen [-S <name>] [command]
  -S <name>  Set session name
  -ls        List sessions
  -r <name>  Reattach to session
  -h, --help Show this help
`,exitCode:0};if(k(e,["-ls","--list"])){let n="/var/run/screen";try{if(t.vfs.exists(n)){let r=t.vfs.list(n);if(r.length>0)return{stdout:`There ${r.length===1?"is":"are"} ${r.length} screen(s) on this system.
${r.map(s=>`	${s}`).join(`
`)}
`,exitCode:0}}}catch{}return{stdout:`No Sockets found in /var/run/screen.
`,exitCode:1}}return{stdout:`[screen: session created on pts/${Math.floor(Math.random()*256)}]
`,exitCode:0}}},Gg={name:"tmux",description:"Terminal multiplexer",category:"system",params:["[command]"],aliases:["tmux"],run:({args:t})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: tmux [command]
  new-session, ls, attach, kill-session
  -h, --help  Show this help
`,exitCode:0};let e=t.find(n=>!n.startsWith("-"));return e==="ls"||e==="list-sessions"?{stdout:`0: 1 windows (created ...) (attached)
`,exitCode:0}:e==="new-session"||e==="new"?{stdout:"",exitCode:0}:e==="attach"||e==="attach-session"?{stdout:"",exitCode:0}:{stdout:`[tmux: virtual session started]
`,exitCode:0}}},Hg={name:"watch",description:"Execute a program periodically",category:"system",params:["[-n <seconds>] <command>"],run:({args:t})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: watch [-n <seconds>] <command>
  -n <seconds>  Interval (default: 2)
  -h, --help    Show this help
`,exitCode:0};let e=t.indexOf("-n"),n=e!==-1&&e+1<t.length?t[e+1]:"2",r=t.filter(i=>!i.startsWith("-")&&i!==t[e+1]).join(" "),s=new Date().toUTCString();return{stdout:`Every ${n}s: ${r}

${s}

[watch: virtual execution]
`,exitCode:0}}},qg={name:"time",description:"Measure command execution time",category:"system",params:["<command> [args...]"],run:({args:t})=>{if(k(t,["--help","-h"]))return{stdout:`Usage: time <command> [args...]
  -h, --help  Show this help
`,exitCode:0};t.filter(s=>!s.startsWith("-")).join(" ");let e=(Math.random()*.5+.01).toFixed(3),n=(Math.random()*.3+.01).toFixed(3),r=(Math.random()*.2+.01).toFixed(3);return{stdout:`real	0m${e}s
user	0m${n}s
sys	0m${r}s
`,exitCode:0}}}});function Ox(t,e){return t.vfs.exists(`/var/run/${e}.pid`)}function Rx(t,e){t.vfs.writeFile(`/var/run/${e}.pid`,String(process.pid))}function Dx(t,e){try{t.vfs.remove(`/var/run/${e}.pid`)}catch{}}var Tx,Kg,Xg=E(()=>{"use strict";Q();Tx="/etc/init.d",Kg={name:"service",description:"Run System V init script",category:"network",params:["<service> <command>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:["Usage: service <service> <command>","  -h, --help    Show this help","","Commands: start, stop, restart, status, reload","","Run a System V init script."].join(`
`),exitCode:0};let n=e.filter(a=>!a.startsWith("-"));if(n.length<2)return{stderr:"service: missing service name or command",exitCode:1};let r=n[0],s=n[1],i=`${Tx}/${r}`;return t.vfs.exists(i)?["start","stop","restart","status","reload"].includes(s)?s==="status"?Ox(t,r)?{stdout:` * ${r} is running
`,exitCode:0}:{stdout:` * ${r} is not running
`,exitCode:3}:(s==="start"?Rx(t,r):s==="stop"&&Dx(t,r),{stdout:` * ${s}ing ${r}
`,exitCode:0}):{stderr:`service: unknown command '${s}'`,exitCode:1}:{stderr:`${r}: unrecognized service`,exitCode:1}}}});var Zg,Jg,Qg,e0=E(()=>{"use strict";Q();Zg={name:"useradd",description:"Create a new user (POSIX semantics)",category:"system",params:["[-m] [-s <shell>] <username>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: useradd [-m] [-s <shell>] [-g <group>] [-G <groups>] <username>
  -m           Create home directory
  -s <shell>   Login shell
  -g <group>   Primary group
  -G <groups>  Supplementary groups
  -h, --help   Show this help
`,exitCode:0};let n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:"useradd: missing username",exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`useradd: user '${n}' already exists`,exitCode:9};t.users.addUser(n,"");let r=`/home/${n}`;return k(e,["-m"])&&!t.vfs.exists(r)&&t.vfs.mkdir(r,493),{stdout:"",exitCode:0}}},Jg={name:"userdel",description:"Delete a user account (POSIX semantics)",category:"system",params:["[-r] <username>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: userdel [-r] <username>
  -r           Remove home directory
  -h, --help   Show this help
`,exitCode:0};let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:"userdel: missing username",exitCode:1};if(!t.users.listUsers().includes(n))return{stderr:`userdel: user '${n}' does not exist`,exitCode:6};if(k(e,["-r"])){let r=`/home/${n}`;try{t.vfs.remove(r,{recursive:!0})}catch{}}return t.users.deleteUser(n),{stdout:"",exitCode:0}}},Qg={name:"groupmod",description:"Modify a group",category:"system",params:["[-n <new-name>] [-g <gid>] <group>"],run:({shell:t,args:e})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: groupmod [-n <new-name>] [-g <gid>] <group>
  -n <name>  Change group name
  -g <gid>   Change group ID
  -h, --help Show this help
`,exitCode:0};let n=e.find(i=>!i.startsWith("-"));if(!n)return{stderr:"groupmod: missing group name",exitCode:1};let r=e.indexOf("-n"),s=r!==-1&&r+1<e.length?e[r+1]:null;return t.users.listGroups().some(i=>i.name===n)?s?{stdout:`groupmod: renamed '${n}' to '${s}'
`,exitCode:0}:{stdout:"",exitCode:0}:{stderr:`groupmod: group '${n}' does not exist`,exitCode:6}}}});function Fx(t){let e=Buffer.from(t),n=[];for(let r=0;r<e.length;r+=16){let s=r.toString(16).padStart(8,"0"),i=e.slice(r,r+16),o=Array.from(i).map(c=>c.toString(16).padStart(2,"0")).join(" "),a=Array.from(i).map(c=>c>=32&&c<=126?String.fromCharCode(c):".").join("");n.push(`${s}: ${o.padEnd(47)} ${a}`)}return{stdout:`${n.join(`
`)}
`,exitCode:0}}function Lx(t){let e=[];for(let n of t.split(`
`)){let r=n.replace(/^[0-9a-fA-F]+:\s*/,"").split(/\s+/);for(let s of r)s.length===2&&/^[0-9a-fA-F]{2}$/.test(s)&&e.push(Number.parseInt(s,16))}return{stdout:Buffer.from(e).toString("utf-8"),exitCode:0}}var t0,n0=E(()=>{"use strict";Q();t0={name:"xxd",description:"Make a hexdump or reverse a hexdump",category:"files",params:["[-r] [file]"],run:({shell:t,args:e,stdin:n})=>{if(k(e,["--help","-h"]))return{stdout:`Usage: xxd [-r] [file]
  -r  Reverse (hexdump back to binary)
  -h, --help  Show this help
`,exitCode:0};let r=k(e,["-r"]),s=e.find(o=>!o.startsWith("-")),i;if(s){if(!t.vfs.exists(s))return{stderr:`xxd: ${s}: No such file`,exitCode:1};i=t.vfs.readFile(s)}else if(n)i=n;else return{stderr:"xxd: missing operand",exitCode:1};return r?Lx(i):Fx(i)}}});function s0(){$n.clear();for(let t of i0()){$n.set(t.name,t);for(let e of t.aliases??[])$n.set(e,t)}Rr=Array.from($n.keys()).sort()}function i0(){return[...Ux,...r0,Bx]}function Ji(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");r0.push(e),$n.set(e.name,e);for(let r of e.aliases??[])$n.set(r,e);Rr=null}function Qi(t,e,n){return{name:t,params:e,run:n}}function vr(){return Rr||s0(),Rr}function eo(){return i0()}function Ve(t){return Rr||s0(),$n.get(t.toLowerCase())}var Ux,r0,$n,Rr,Bx,Zt=E(()=>{"use strict";Ia();ka();Na();Da();La();Ba();ja();Ya();Nc();Tc();Wc();Vc();Hc();Yc();Zc();Qc();tl();rl();ol();gl();bl();vl();_l();Il();$l();io();Al();Ol();Dl();Ul();zl();jl();Gl();ql();Kl();Zl();Ql();tu();ru();iu();mu();gu();xu();Cu();wu();Eu();Pu();Mu();Au();Ru();Fu();ju();Gu();Ju();ed();rd();id();ad();fd();md();gd();vd();wd();$d();kd();Ad();Dd();Ld();Bd();Wd();Hd();nf();sf();cf();ff();mf();gf();bf();Cf();Of();Df();Lf();Bf();Vf();Hf();Kf();Zf();Qf();tp();rp();ip();cp();up();fp();gp();Sp();vp();Ep();Pp();Mp();Tp();Dp();Bp();Wp();Vp();Hp();Yp();Jp();em();nm();sm();om();cm();um();hm();ym();xm();Am();Dm();Lm();Bm();jm();Gm();Ym();eh();nh();ih();lh();fh();gh();Sh();vh();wh();Eh();Ph();Mh();Ah();Oh();Fh();Uh();zh();jh();Gh();qh();Kh();Zh();Qh();ng();sg();og();cg();ug();yg();bg();vg();_g();Ig();$g();kg();Ng();Og();Dg();Lg();Bg();jg();Yg();Xg();e0();n0();Ux=[dp,zc,Rd,yh,Ac,sh,Ip,af,uf,df,Sl,Sf,Md,Nd,qc,Xc,Gc,kp,tm,nu,El,Kd,_u,$p,Fa,jp,$h,Bh,Du,Fm,Cl,dh,Vm,Xh,Rl,Qd,ef,tf,Xd,Zd,Jd,Xm,Zm,Jm,Qm,ig,Pg,t0,xg,Tg,Cg,Fg,Rg,Um,Tu,Ou,eg,tg,kc,Mc,Ua,Yh,Hh,Qu,od,Nu,hu,Ih,lp,_d,Tl,Bl,wl,zp,np,Tm,Om,Rm,op,ap,th,Uf,Gf,Vl,Hl,Xl,xp,Iu,Jc,Ap,kh,Rp,el,Yl,vf,Dh,Pd,pf,Lh,za,Wa,eu,ah,ch,Id,Ed,pd,au,cu,uu,du,fu,pu,dg,fg,pg,mg,hg,Xf,sd,zd,yu,xl,Wh,Rf,hd,Wm,Zp,mh,nl,ud,ag,Eg,Ug,rg,lg,Kg,wg,zg,wa,Jf,Nl,Zg,Jg,Qg,am,bm,im,$u,ku,vu,Th,jc,Ff,Tf,Oa,Ra,Fl,Ll,Sd,bd,xd,qa,Vh,_h,Ma,Wl,rf,Gd,$a,Pa,Hm,qm,Gp,Vu,sp,yp,Ml,Fp,Lp,Up,bh,xh,qf,Yf,jf,hp,Jl,Qp,Jh,hf,Sg,Mg,Vg,Gg,Hg,qg,Nm,gm,fm,td,qp,il,Hu,qu,Yu,Nh,su,Fd,Ud,rm,lm,ep,al,cl,ll,ul,dl,fl,pl,ml,hl],r0=[],$n=new Map,Rr=null,Bx=Wu()});var Ks,Ur,Xs,uv,Zo,kn,Mn,dv,Zs,Jo,Qo,fv,pv,mv,hv,Br=E(()=>{Ks="rXDT",Ur=Buffer.from("ROX1"),Xs=Buffer.from("PXL1"),uv=Buffer.from("BLK2"),Zo=0,kn=1,Mn=2,dv=Buffer.from([0]),Zs=Buffer.from([137,80,78,71,13,10,26,10]),Jo=Zs.toString("hex"),Qo=[{r:255,g:0,b:0},{r:0,g:255,b:0},{r:0,g:0,b:255}],fv=Qo,pv=[...Qo].reverse(),mv={zstd:[{r:0,g:255,b:0}],"bwt-ans":[{r:0,g:128,b:255}]},hv={png:{r:0,g:255,b:255},webp:{r:255,g:0,b:255},jxl:{r:255,g:255,b:0}}});var N0={};Kr(N0,{adler32:()=>M0,crc32:()=>k0});function k0(t,e=0){let n=e^4294967295;for(let r=0;r<t.length;r++)n=P0[(n^t[r])&255]^n>>>8;return(n^4294967295)>>>0}function M0(t,e=1){let n=e&65535,r=e>>>16&65535;for(let s=0;s<t.length;s++)n=(n+t[s])%65521,r=(r+n)%65521;return(r<<16|n)>>>0}var P0,ea=E(()=>{P0=[];for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e&1?e=3988292384^e>>>1:e=e>>>1;P0[t]=e}});import{copyFileSync as gv,existsSync as Js}from"fs";import{createRequire as yv}from"module";import{arch as A0,platform as T0}from"os";import{dirname as Sv,resolve as He}from"path";import{fileURLToPath as bv}from"url";function xv(){let t=T0(),e=A0(),r={linux:{x64:["x86_64-unknown-linux-gnu"],ia32:["i686-unknown-linux-gnu"],arm64:["aarch64-unknown-linux-gnu"],arm:["armv7-unknown-linux-gnueabihf"]},win32:{x64:["x86_64-pc-windows-msvc","x86_64-pc-windows-gnu"],ia32:["i686-pc-windows-msvc","i686-pc-windows-gnu"],arm64:["aarch64-pc-windows-msvc"]},darwin:{x64:["x86_64-apple-darwin"],arm64:["aarch64-apple-darwin"]}}[t];if(!r)throw new Error(`Unsupported OS: ${t}`);let s=r[e];if(!s)throw new Error(`Unsupported architecture: ${t}-${e}`);return s}function vv(){let t,e,n=bv(import.meta.url),r=Sv(n);if(typeof __dirname<"u")t=__dirname,e=ct;else{t=r;try{e=ct}catch{e=yv(n)}}function s(){let i=xv(),o=t&&t!=="."?t:process.cwd();for(;o.length>1&&!Js(He(o,"package.json"))&&!Js(He(o,"Cargo.toml"));){let u=He(o,"..");if(u===o)break;o=u}let a=[];for(let u of i){let d=`roxify_native-${u}.node`,f=`libroxify_native-${u}.node`;a.push(He(t,"..",d),He(t,"..",f),He(o,d),He(o,f),He(o,"node_modules","roxify",d),He(o,"node_modules","roxify",f),He(t,"..","..",d),He(t,"..","..",f))}for(let u of i){for(let d of["release","fastdev"])a.push(He(o,"target",u,d,"libroxify_native.so")),a.push(He(o,"target",u,d,"libroxify_native.dylib")),a.push(He(o,"target",u,d,"roxify_native.dll"));for(let d of["release","fastdev"])a.push(He(o,"target",d,"libroxify_native.so")),a.push(He(o,"target",d,"libroxify_native.dylib")),a.push(He(o,"target",d,"roxify_native.dll")),a.push(He(o,"target",d,"roxify_native.node"))}let c=new Set,l=[];for(let u of a)c.has(u)||(c.add(u),l.push(u));for(let u of l)try{if(!Js(u))continue;if(u.endsWith(".so")||u.endsWith(".dylib")||u.endsWith(".dll")){let d=u.replace(/\.(so|dylib|dll)$/,".node");try{return Js(d)||gv(u,d),d}catch{return u}}return u}catch{}throw new Error(`Native module not found for ${T0()}-${A0()} (triples: ${i.join(", ")}). Searched ${l.length} paths:
${l.join(`
`)}`)}return e(s())}var le,Vt=E(()=>{le=vv()});import{readFileSync as Cv,readdirSync as _v,statSync as O0}from"fs";import{extname as jA,join as wv,relative as Iv,resolve as R0,sep as Ev}from"path";function*D0(t){for(let e of t){let n=R0(e),r=O0(n);if(r.isFile())yield n;else if(r.isDirectory()){let i=_v(n).map(o=>wv(n,o));yield*D0(i)}}}function ta(t,e,n){let r=[];for(let d of D0(t))r.push(d);let s=e?R0(e):process.cwd(),i=[],o=[],a=0,c=r.map(d=>{let f=O0(d);return a+=f.size,f.size}),l=0;for(let d=0;d<r.length;d++){let f=r[d],p=Iv(s,f).split(Ev).join("/"),m=Cv(f),h=Buffer.from(p,"utf8"),g=Buffer.alloc(2);g.writeUInt16BE(h.length,0);let y=Buffer.alloc(8);y.writeBigUInt64BE(BigInt(m.length),0),i.push(g,h,y,m),o.push(p),l+=c[d],n&&n(l,a,p)}let u=Buffer.alloc(8);return u.writeUInt32BE(1380931664,0),u.writeUInt32BE(r.length,4),i.unshift(u),{parts:i,list:o}}function F0(t,e,n){let{parts:r,list:s}=ta(t,e,n);return{buf:Buffer.concat(r),list:s}}function Qs(t,e){if(t.length<8)return null;if($v(t))return Pv(t,e);let n=t.readUInt32BE(0);if(n===1380931657){let a=t.readUInt32BE(4),c=t.slice(8,8+a),l=JSON.parse(c.toString("utf8")),u=8+a,d=[],f=e?l.filter(p=>e.includes(p.path)):l;for(let p of f){let h=u+p.offset;if(h+2>t.length)continue;let g=t.readUInt16BE(h);if(h+=2,h+=g,h+=8,h+p.size>t.length)continue;let y=t.slice(h,h+p.size);d.push({path:p.path,buf:y})}return{files:d}}if(n!==1380931664)return null;let s=t.slice(0,8).readUInt32BE(4),i=8,o=[];for(let a=0;a<s;a++){if(i+2>t.length)return null;let c=t.readUInt16BE(i);if(i+=2,i+c>t.length)return null;let l=t.slice(i,i+c).toString("utf8");if(i+=c,i+8>t.length)return null;let u=t.readBigUInt64BE(i);if(i+=8,i+Number(u)>t.length)return null;let d=t.slice(i,i+Number(u));i+=Number(u),o.push({path:l,buf:d})}return e?{files:o.filter(c=>e.includes(c.path))}:{files:o}}function $v(t){return t.length<263?!1:t.slice(257,262).toString("ascii")==="ustar"}function Pv(t,e){let n=[],r=0;for(;r+512<=t.length;){let s=t.slice(r,r+512),i=!0;for(let h=0;h<512;h++)if(s[h]!==0){i=!1;break}if(i)break;let a=s.slice(0,100).toString("ascii").replace(/\0+$/,""),c=s.slice(124,136).toString("ascii").replace(/\0+$/,"").trim(),l=parseInt(c,8)||0,u=s[156],d=s.slice(345,500).toString("ascii").replace(/\0+$/,""),p=(d?`${d}/${a}`:a).split("/").filter(h=>h&&h!=="."&&h!=="..").join("/");if(r+=512,u===0||u===48){if(r+l>t.length)break;let h=t.slice(r,r+l);(!e||e.includes(p))&&n.push({path:p,buf:Buffer.from(h)})}let m=Math.ceil(l/512);r+=m*512}return n.length>0?{files:n}:null}var na=E(()=>{});var ur,dr,ra,sa=E(()=>{ur=class extends Error{constructor(e="Passphrase required"){super(e),this.name="PassphraseRequiredError"}},dr=class extends Error{constructor(e="Incorrect passphrase"){super(e),this.name="IncorrectPassphraseError"}},ra=class extends Error{constructor(e="Data format error"){super(e),this.name="DataFormatError"}}});import{createDecipheriv as kv,pbkdf2Sync as Mv}from"crypto";function Nv(t){let e=Buffer.alloc(t.length*3);for(let n=0;n<t.length;n++)e[n*3]=t[n].r,e[n*3+1]=t[n].g,e[n*3+2]=t[n].b;return e}function Av(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let n=1;n<t.length;n++)e[n]=t[n]-t[n-1]+256&255;return e}function Tv(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let n=1;n<t.length;n++)e[n]=e[n-1]+t[n]&255;return e}function Ov(t){if(aa&&ia)try{return Buffer.from(ia(t))}catch(e){console.warn("Native deltaEncode failed, falling back to TS:",e)}return Av(t)}function Rv(t){if(aa&&oa)try{return Buffer.from(oa(t))}catch(e){console.warn("Native deltaDecode failed, falling back to TS:",e)}return Tv(t)}function L0(t,e){let n=Buffer.from(e,"utf8"),r=Buffer.alloc(t.length);for(let s=0;s<t.length;s++)r[s]=t[s]^n[s%n.length];return r}function ca(t,e){if(!t||t.length===0)return t;let n=t[0];if(n===kn){if(t.length<46)throw new dr;if(!e)throw new ur;let s=t.slice(1,17),i=t.slice(17,29),o=t.slice(29,45),a=t.slice(45),l=Mv(e,s,6e5,32,"sha256"),u=kv("aes-256-gcm",l,i);u.setAuthTag(o);try{return Buffer.concat([u.update(a),u.final()])}catch{throw new dr}}if(n===Mn){if(!e)throw new ur;return L0(t.slice(1),e)}return n===Zo?t.slice(1):t}function Dv(){let t=Buffer.alloc(768);for(let e=0;e<256;e++)t[e*3]=e,t[e*3+1]=e*127&255,t[e*3+2]=255-e;return t}function Fv(t){let e=t.length,n=e,r=Math.ceil(Math.sqrt(n)),s=Math.ceil(n/r),i=r*2,o=s*2,a=Buffer.alloc(i*o);for(let c=0;c<e;c++){let l=c%r*2,u=Math.floor(c/r)*2,d=t[c];a[u*i+l]=d,a[u*i+l+1]=d,a[(u+1)*i+l]=d,a[(u+1)*i+l+1]=d}return{buffer:a,width:i,height:o}}function Lv(t,e,n){let r=e/2,s=n/2,i=r*s,o=Buffer.alloc(i);for(let a=0;a<i;a++){let c=a%r*2,l=Math.floor(a/r)*2;o[a]=t[l*e+c]}return o}var ia,oa,aa,la=E(()=>{Br();sa();Vt();ia=null,oa=null,aa=!1;try{le?.nativeDeltaEncode&&le?.nativeDeltaDecode&&(ia=le.nativeDeltaEncode,oa=le.nativeDeltaDecode,aa=!0)}catch{}});import{readFileSync as Uv}from"fs";function Bv(t){for(let e=0;e<=t.length-4;e++)if(t[e]===80&&t[e+1]===88&&t[e+2]===76&&t[e+3]===49)return e;return-1}function zv(t){let e=Bv(t);if(e<0)throw new Error("PXL1 magic not found in pixels");let n=e+4;if(n>=t.length)throw new Error("Truncated header: missing version");let r=t[n];if(n+=1,n>=t.length)throw new Error("Truncated header: missing name length");let s=t[n];n+=1;let i;if(s>0){if(n+s>t.length)throw new Error("Truncated header: name exceeds buffer");i=t.subarray(n,n+s).toString("utf8"),n+=s}if(r===1){if(n+4>t.length)throw new Error("Truncated header: missing payload length (V1)");let o=t.readUInt32BE(n);if(n+=4,n+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(n,n+o),name:i}}else if(r===2){if(n+8>t.length)throw new Error("Truncated header: missing payload length (V2)");let o=Number(t.readBigUInt64BE(n));if(n+=8,n+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(n,n+o),name:i}}else throw new Error(`Unsupported header version: ${r}`)}async function Wv(t,e={}){let n;Buffer.isBuffer(t)?n=t:n=Uv(t);let r=Buffer.from(le.extractPayloadFromPng(n)),s;try{let c=le.extractNameFromPng?.(n);typeof c=="string"&&c.length>0&&(s=c)}catch{}if(!s)try{let c=le.pngToRgb(n),l=Buffer.from(c.pixels);({name:s}=zv(l))}catch{}if(r.length===0)throw new Error("Empty payload extracted");let i;if(r[0]===3)throw new Error("AES-CTR streaming payload requires the native decoder");i=ca(r,e.passphrase);let a;try{a=Buffer.from(le.nativeZstdDecompress(i))}catch{a=i}a.length>=4&&a.subarray(0,4).toString()==="ROX1"&&(a=a.subarray(4));try{let c=Qs(a);if(c&&c.files&&c.files.length>0)return{files:c.files,meta:{name:s}}}catch{}return{buf:a,meta:{name:s}}}function jv(t,e,n){if(!Buffer.isBuffer(t)||t.length!==e*n*3)return null;try{let r=!0;for(let S=0;S<t.length;S+=3)if(!(t[S]===255&&t[S+1]===255&&t[S+2]===255)){r=!1;break}if(r)return null;let s=e,i=n,o=-1,a=-1;for(let S=0;S<n;S++)for(let v=0;v<e;v++){let x=(S*e+v)*3;t[x]===255&&t[x+1]===255&&t[x+2]===255||(v<s&&(s=v),S<i&&(i=S),v>o&&(o=v),S>a&&(a=S))}if(o<0)return null;let c=o-s+1,l=a-i+1,u=[];for(let S=0;S<c;S++){let v=[];for(let x=0;x<l;x++){let A=((i+x)*e+(s+S))*3;v.push(t[A],t[A+1],t[A+2])}u.push(v.join(","))}let d=[];for(let S=0;S<u.length;S++)S===0||u[S]!==u[S-1]?d.push({start:S,len:1}):d[d.length-1].len++;let f=[];for(let S=0;S<l;S++){let v=[];for(let x=0;x<c;x++){let A=((i+S)*e+(s+x))*3;v.push(t[A],t[A+1],t[A+2])}f.push(v.join(","))}let p=[];for(let S=0;S<f.length;S++)S===0||f[S]!==f[S-1]?p.push({start:S,len:1}):p[p.length-1].len++;let m=d.length,h=p.length;if(!(d.some(S=>S.len>1)||p.some(S=>S.len>1)))return null;let y=Buffer.alloc(m*h*3);for(let S=0;S<h;S++)for(let v=0;v<m;v++){let x=s+d[v].start,A=i+p[S].start,I=(A*e+x)*3,_=t[I],b=t[I+1],C=t[I+2];for(let T=0;T<p[S].len;T++)for(let R=0;R<d[v].len;R++){let G=((A+T)*e+(x+R))*3;if(t[G]!==_||t[G+1]!==b||t[G+2]!==C)return null}let P=(S*m+v)*3;y[P]=_,y[P+1]=b,y[P+2]=C}return{width:m,height:h,data:y}}catch{return null}}var U0=E(()=>{Vt();na();la()});function Nt(t,e){return t===0||e===0?0:bt[Nn[t]+Nn[e]]}function ei(t,e){if(e===0)throw new Error("GF(256): division by zero");return t===0?0:bt[(Nn[t]+255-Nn[e])%255]}function B0(t,e){return t===0?e===0?1:0:bt[Nn[t]*e%255]}function z0(t,e){let n=t[0];for(let r=1;r<t.length;r++)n=Nt(n,e)^t[r];return n}function Vv(t,e){let n=new Array(t.length+e.length-1).fill(0);for(let r=0;r<e.length;r++)for(let s=0;s<t.length;s++)n[s+r]^=Nt(t[s],e[r]);return n}function Gv(t){if(ua.has(t))return ua.get(t);let e=[1];for(let n=0;n<t;n++)e=Vv(e,[1,bt[n]]);return ua.set(t,e),e}function W0(t,e){let n=t.length;if(n+e>255)throw new Error(`RS block too large: ${n}+${e} > 255`);let r=Gv(e),s=new Array(n+e).fill(0);for(let o=0;o<n;o++)s[o]=t[o];for(let o=0;o<n;o++){let a=s[o];if(a!==0)for(let c=1;c<r.length;c++)s[o+c]^=Nt(r[c],a)}let i=new Uint8Array(n+e);i.set(t);for(let o=0;o<e;o++)i[n+o]=s[n+o];return i}function da(t,e){let n=new Array(e),r=Array.from(t);for(let s=0;s<e;s++)n[s]=z0(r,bt[s]);return n}function Hv(t,e){let n=[1],r=[1],s=0,i=1,o=1;for(let a=0;a<e;a++){let c=t[a];for(let l=1;l<=s;l++)l<n.length&&(c^=Nt(n[l],t[a-l]));if(c===0)i++;else if(2*s<=a){let l=[...n],u=ei(c,o),d=new Array(i).fill(0);for(let f=0;f<r.length;f++)d.push(Nt(r[f],u));for(;n.length<d.length;)n.push(0);for(let f=0;f<d.length;f++)n[f]^=d[f];s=a+1-s,r=l,o=c,i=1}else{let l=ei(c,o),u=new Array(i).fill(0);for(let d=0;d<r.length;d++)u.push(Nt(r[d],l));for(;n.length<u.length;)n.push(0);for(let d=0;d<u.length;d++)n[d]^=u[d];i++}}return n}function qv(t,e){if(t.length===0)return 0;let n=t[t.length-1];for(let r=t.length-2;r>=0;r--)n=Nt(n,e)^t[r];return n}function Yv(t,e){let n=[],r=t.length-1;for(let s=0;s<255;s++)if(qv(t,bt[s])===0){let o=(e+s-1)%255;o>=0&&o<e&&n.push(o)}if(n.length!==r)throw new Error(`RS Chien search: found ${n.length} roots but expected ${r}. Data may be too corrupted.`);return n}function Kv(t,e){let n=t.length;if(n===0)return[];let r=[];for(let s=0;s<n;s++){let i=new Array(n+1);for(let o=0;o<n;o++)i[o]=B0(t[o],s);i[n]=e[s],r.push(i)}for(let s=0;s<n;s++){let i=-1;for(let a=s;a<n;a++)if(r[a][s]!==0){i=a;break}if(i===-1)throw new Error("RS: singular Vandermonde matrix");i!==s&&([r[s],r[i]]=[r[i],r[s]]);let o=ei(1,r[s][s]);for(let a=s;a<=n;a++)r[s][a]=Nt(r[s][a],o);for(let a=0;a<n;a++)if(a!==s&&r[a][s]!==0){let c=r[a][s];for(let l=s;l<=n;l++)r[a][l]^=Nt(c,r[s][l])}}return r.map(s=>s[n])}function j0(t,e){let n=t.length;if(n>255)throw new Error(`RS block too large: ${n} > 255`);let r=da(t,e);if(r.every(d=>d===0))return{data:new Uint8Array(t.subarray(0,n-e)),corrected:0};let s=Hv(r,e),i=s.length-1;if(i===0)throw new Error("RS: non-zero syndromes but BM found zero errors");let o=Yv(s,n),a=o.map(d=>bt[(n-1-d)%255]),c=Kv(a,r),l=new Uint8Array(t);for(let d=0;d<o.length;d++)l[o[d]]^=c[d];if(!da(l,e).every(d=>d===0))throw new Error("RS: correction failed, residual syndromes non-zero");return{data:new Uint8Array(l.subarray(0,n-e)),corrected:i}}function Zv(t){return 255-t}function Jv(t){if(t.length===0)return new Uint8Array(0);let e=Math.max(...t.map(r=>r.length)),n=[];for(let r=0;r<e;r++)for(let s=0;s<t.length;s++)n.push(r<t[s].length?t[s][r]:0);return new Uint8Array(n)}function Qv(t,e,n){let r=[];for(let i=0;i<e;i++)r.push(new Uint8Array(n));let s=0;for(let i=0;i<n;i++)for(let o=0;o<e;o++)s<t.length&&(r[o][i]=t[s++]);return r}function zr(t,e="medium"){let n=Xv[e],r=Zv(n),s=Math.ceil(t.length/r),i=[];for(let c=0;c<s;c++){let l=c*r,u=Math.min(l+r,t.length),d=new Uint8Array(r);d.set(t.subarray(l,u)),i.push(W0(d,n))}let o=Jv(i),a=Buffer.alloc(12);return V0.copy(a,0),a[4]=G0,a[5]=n,a.writeUInt32BE(t.length,6),a.writeUInt16BE(s,10),Buffer.concat([a,Buffer.from(o)])}function Wr(t){if(t.length<12)throw new Error("ECC data too short for header");if(!t.subarray(0,4).equals(V0))throw new Error('Invalid ECC magic (expected "ECC1")');let e=t[4];if(e!==G0)throw new Error(`Unsupported ECC version: ${e}`);let n=t[5],r=t.readUInt32BE(6),s=t.readUInt16BE(10),i=255,o=t.subarray(12),a=Qv(o,s,i),c=0,l=[];for(let d=0;d<s;d++){let{data:f,corrected:p}=j0(a[d],n);c+=p,l.push(Buffer.from(f))}return{data:Buffer.concat(l).subarray(0,r),totalCorrected:c}}var bt,Nn,ua,Xv,V0,G0,ti=E(()=>{bt=new Uint8Array(512),Nn=new Uint8Array(256);{let t=1;for(let e=0;e<255;e++)bt[e]=t,Nn[t]=e,t=(t<<1^(t&128?29:0))&255;for(let e=255;e<512;e++)bt[e]=bt[e-255]}ua=new Map;Xv={low:20,medium:40,quartile:64,high:128},V0=Buffer.from("ECC1"),G0=1});async function eC(t,e={}){let n=Array.isArray(t)?Buffer.concat(t):t,r=e.compressionLevel??3,s=e.name||void 0,i=e.includeFileList&&e.fileList?tC(e.fileList):void 0;if(e.passphrase){let o=e.encrypt&&e.encrypt!=="auto"?e.encrypt:"aes",a=le.nativeEncodePngWithEncryptionNameAndFilelist(n,r,e.passphrase,o,s,i);return Buffer.from(a)}else{let o=le.nativeEncodePngWithNameAndFilelist(n,r,s,i);return Buffer.from(o)}}function tC(t){return JSON.stringify(t)}var H0=E(()=>{Vt()});import*as fa from"zlib";function ni(t){return t.length>0&&typeof t[0]=="object"&&(t[0].name||t[0].path)?t.map(e=>({name:e.name??e.path,size:typeof e.size=="number"?e.size:0})).sort((e,n)=>e.name.localeCompare(n.name)):t.sort()}function nC(t){let e=t.find(r=>r.name==="rXFL");if(e)return ni(JSON.parse(Buffer.from(e.data).toString("utf8")));let n=t.find(r=>r.name===Ks);if(n){let r=Buffer.from(n.data),s=r.indexOf(Buffer.from("rXFL"));if(s!==-1&&s+8<=r.length){let i=r.readUInt32BE(s+4),o=s+8+i;if(o<=r.length)return ni(JSON.parse(r.slice(s+8,o).toString("utf8")))}}return null}async function rC(t,e={}){try{let n=le.extractPngChunks(t),r=nC(n);if(r)return r;let s=n.find(o=>o.name==="IHDR"),i=n.filter(o=>o.name==="IDAT");if(s&&i.length>0){let c=1+Buffer.from(s.data).readUInt32BE(0)*3,l=await new Promise(u=>{let d=fa.createInflate(),f=Buffer.alloc(0),p=!1;d.on("data",m=>{if(p)return;f=Buffer.concat([f,m]);let h=Buffer.alloc(f.length),g=0,y=0;for(;y<f.length;){let A=y%c;if(A===0)y++;else{let I=c-A,_=f.length-y,b=Math.min(I,_);f.copy(h,g,y,y+b),g+=b,y+=b}}let S=h.slice(0,g);if(S.length<12)return;if(!S.slice(8,12).equals(Xs)){p=!0,d.destroy(),u(null);return}let v=12;if(S.length<v+2)return;v++;let x=S[v++];if(!(S.length<v+x+4)&&(v+=x,v+=4,!(S.length<v+4)))if(S.slice(v,v+4).toString("utf8")==="rXFL"){if(v+=4,S.length<v+4)return;let A=S.readUInt32BE(v);if(v+=4,S.length<v+A)return;try{p=!0,d.destroy(),u(ni(JSON.parse(S.slice(v,v+A).toString("utf8"))))}catch{u(null)}}else p=!0,d.destroy(),u(null)}),d.on("error",()=>{p||u(null)}),d.on("end",()=>{p||u(null)});for(let m of i){if(p)break;d.write(Buffer.from(m.data))}d.end()});if(l)return l}}catch{}try{let n=le.extractFileListFromPixels(t);if(n)return ni(JSON.parse(n))}catch{}return null}async function sC(t){try{if(t.slice(0,Ur.length).equals(Ur)){let i=Ur.length;if(i>=t.length)return!1;let o=t.readUInt8(i);if(i+=1+o,i>=t.length)return!1;let a=t[i];return a===kn||a===Mn}let e=le.extractPngChunks(t),n=e.find(i=>i.name===Ks);if(n){let i=Buffer.isBuffer(n.data)?n.data:Buffer.from(n.data);if(i.length>=1){let a=1+i.readUInt8(0);if(a<i.length)return i[a]===kn||i[a]===Mn}}let r=e.find(i=>i.name==="IHDR"),s=e.filter(i=>i.name==="IDAT");if(r&&s.length>0){let a=1+Buffer.from(r.data).readUInt32BE(0)*3;return await new Promise(c=>{let l=fa.createInflate(),u=Buffer.alloc(0),d=!1;l.on("data",f=>{if(d)return;u=Buffer.concat([u,f]);let p=Buffer.alloc(u.length),m=0,h=0;for(;h<u.length;){let x=h%a;if(x===0)h++;else{let A=a-x,I=u.length-h,_=Math.min(A,I);u.copy(p,m,h,h+_),m+=_,h+=_}}let g=p.slice(0,m);if(g.length<12)return;if(!g.slice(8,12).equals(Xs)){d=!0,l.destroy(),c(!1);return}let y=12;if(g.length<y+2)return;y++;let S=g[y++];if(g.length<y+S+4||(y+=S,g.length<y+4+1)||(g.readUInt32BE(y),y+=4,g.length<y+1))return;let v=g[y];d=!0,l.destroy(),c(v===kn||v===Mn)}),l.on("error",()=>{d||c(!1)}),l.on("end",()=>{d||c(!1)});for(let f of s){if(d)break;l.write(Buffer.from(f.data))}l.end()})}}catch{}return!1}var q0=E(()=>{Br();Vt()});import{spawn as iC,spawnSync as Y0}from"child_process";import{existsSync as ri,readFileSync as si,unlinkSync as ln,writeFileSync as ii}from"fs";import{tmpdir as oi}from"os";import{join as ai}from"path";import*as Ye from"zlib";async function oC(t,e=!1){if(t.length>52428800||e)return t;let r=(s,i,o=12e4)=>new Promise(a=>{try{let c=iC(s,i,{windowsHide:!0,stdio:"ignore"}),l=!1,u=setTimeout(()=>{l=!0;try{c.kill("SIGTERM")}catch{}},o);c.on("close",d=>{clearTimeout(u),a(l?{error:new Error("timeout")}:{code:d??0})}),c.on("error",d=>{clearTimeout(u),a({error:d})})}catch(c){a({error:c})}});try{let s=ai(oi(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),i=s+".out.png";if(ii(s,t),!(await r("zopflipng",["-y",`--iterations=${e?15:40}`,"--filters=01234mepb",s,i],12e4)).error&&ri(i)){let l=si(i);try{ln(s),ln(i)}catch{}return l.length<t.length?l:t}if(e)return t}catch{}try{let S=function(w,D,z){let Z=w+D-z,J=Math.abs(Z-w),F=Math.abs(Z-D),j=Math.abs(Z-z);return J<=F&&J<=j?w:F<=j?D:z},P=function(w){return w.slice(0,8).toString("hex")===Jo?w:Buffer.concat([Zs,w])},i=ct("../../libroxify_native.node").extractPngChunks(t),o=i.find(w=>w.name==="IHDR");if(!o)return t;let a=Buffer.from(o.data),c=a.readUInt32BE(0),l=a.readUInt32BE(4),u=a[8],d=a[9];if(u!==8||d!==2)return t;let f=i.filter(w=>w.name==="IDAT"),p=Buffer.concat(f.map(w=>Buffer.from(w.data))),m;try{m=Ye.inflateSync(p)}catch{return t}let h=3,g=c*h,y=g+1;if(m.length!==y*l)return t;let v=[],x=null;for(let w=0;w<l;w++){let D=w*y+1,z=m.slice(D,D+g),Z=1/0,J=null,F=0;for(let W=0;W<=4;W++){let V=Buffer.alloc(g),L=0;for(let H=0;H<g;H++){let q=z[H],Y=0,oe=H-h>=0?z[H-h]:0,ie=x?x[H]:0,_e=x&&H-h>=0?x[H-h]:0;if(W===0)Y=q;else if(W===1)Y=q-oe+256&255;else if(W===2)Y=q-ie+256&255;else if(W===3){let Ee=Math.floor((oe+ie)/2);Y=q-Ee+256&255}else{let Ee=S(oe,ie,_e);Y=q-Ee+256&255}V[H]=Y;let je=Y>127?Y-256:Y;L+=Math.abs(je)}L<Z&&(Z=L,J=V,F=W)}let j=Buffer.alloc(1+g);j[0]=F,J.copy(j,1),v.push(j),x=z}let A=Buffer.concat(v),I=Ye.deflateSync(A,{level:9,memLevel:9,strategy:Ye.constants.Z_DEFAULT_STRATEGY}),_=[];for(let w of i)w.name!=="IDAT"&&_.push({name:w.name,data:Buffer.isBuffer(w.data)?w.data:Buffer.from(w.data)});let b=_.findIndex(w=>w.name==="IEND"),C=b>=0?b:_.length;_.splice(C,0,{name:"IDAT",data:I});let T=ct("../../libroxify_native.node"),R=P(Buffer.from(T.encodePngChunks(_))),G=R.length<t.length?R:t,X=[Ye.constants.Z_DEFAULT_STRATEGY,Ye.constants.Z_FILTERED,Ye.constants.Z_RLE,...Ye.constants.Z_HUFFMAN_ONLY?[Ye.constants.Z_HUFFMAN_ONLY]:[],...Ye.constants.Z_FIXED?[Ye.constants.Z_FIXED]:[]];for(let w of X)try{let D=Ye.deflateSync(m,{level:9,memLevel:9,strategy:w}),z=_.map(j=>({name:j.name,data:j.data})),Z=z.findIndex(j=>j.name==="IDAT");Z!==-1&&(z[Z]={name:"IDAT",data:D});let J=ct("../../libroxify_native.node"),F=P(Buffer.from(J.encodePngChunks(z)));F.length<G.length&&(G=F)}catch{}try{let D=(await Promise.resolve().then(()=>(bn(),$c))).deflateSync;try{let z=D(A),Z=_.map(W=>({name:W.name,data:W.data})),J=Z.findIndex(W=>W.name==="IDAT");J!==-1&&(Z[J]={name:"IDAT",data:Buffer.from(z)});let F=ct("../../libroxify_native.node"),j=P(Buffer.from(F.encodePngChunks(Z)));j.length<G.length&&(G=j)}catch{}}catch{}let te=[15,12,9],$=[9,8];for(let w=0;w<=4;w++)try{let D=[],z=null;for(let J=0;J<l;J++){let F=m.slice(J*y+1,J*y+1+g),j=Buffer.alloc(g);for(let V=0;V<g;V++){let L=F[V],H=V-h>=0?F[V-h]:0,q=z?z[V]:0,Y=z&&V-h>=0?z[V-h]:0;w===0?j[V]=L:w===1?j[V]=L-H+256&255:w===2?j[V]=L-q+256&255:w===3?j[V]=L-Math.floor((H+q)/2)+256&255:j[V]=L-S(H,q,Y)+256&255}let W=Buffer.alloc(1+g);W[0]=w,j.copy(W,1),D.push(W),z=F}let Z=Buffer.concat(D);for(let J of X)for(let F of te)for(let j of $)try{let W=Ye.deflateSync(Z,{level:9,memLevel:j,strategy:J,windowBits:F}),V=_.map(Y=>({name:Y.name,data:Y.data})),L=V.findIndex(Y=>Y.name==="IDAT");L!==-1&&(V[L]={name:"IDAT",data:W});let H=ct("../../libroxify_native.node"),q=P(Buffer.from(H.encodePngChunks(V)));q.length<G.length&&(G=q)}catch{}}catch{}try{let w=[1e3,2e3];w.push(5e3,1e4,2e4);for(let D of w)try{let z=ai(oi(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),Z=z+".out.png";ii(z,G);let J=["-y",`--iterations=${D}`,"--filters=01234mepb",z,Z];try{if(!(await r("zopflipng",J,24e4)).error&&ri(Z)){let j=si(Z);try{ln(z),ln(Z)}catch{}j.length<G.length&&(G=j)}}catch{}}catch{}}catch{}try{let w=ai(oi(),`rox_adv_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`);if(ii(w,G),!Y0("advdef",["-z4","-i10",w],{windowsHide:!0,stdio:"ignore",timeout:12e4}).error&&ri(w)){let z=si(w);try{ln(w)}catch{}z.length<G.length&&(G=z)}}catch{}for(let w of X)try{let D=Ye.deflateSync(A,{level:9,memLevel:9,strategy:w}),z=_.map(j=>({name:j.name,data:j.data})),Z=z.findIndex(j=>j.name==="IDAT");Z!==-1&&(z[Z]={name:"IDAT",data:D});let J=ct("../../libroxify_native.node"),F=P(Buffer.from(J.encodePngChunks(z)));F.length<G.length&&(G=F)}catch{}try{let w=Buffer.alloc(c*l*3),D=null;for(let J=0;J<l;J++){let F=m[J*y],j=m.slice(J*y+1,J*y+1+g),W=Buffer.alloc(g);for(let V=0;V<g;V++){let L=V-3>=0?W[V-3]:0,H=D?D[V]:0,q=D&&V-3>=0?D[V-3]:0,Y=j[V];F===0||(F===1?Y=Y+L&255:F===2?Y=Y+H&255:F===3?Y=Y+Math.floor((L+H)/2)&255:Y=Y+S(L,H,q)&255),W[V]=Y}W.copy(w,J*g),D=W}let z=new Map,Z=[];for(let J=0;J<w.length;J+=3){let F=`${w[J]},${w[J+1]},${w[J+2]}`;if(!z.has(F)&&(z.set(F,z.size),Z.push(w[J],w[J+1],w[J+2]),z.size>256))break}if(z.size<=256){let J=1+c*1,F=[];for(let L=0;L<l;L++){let H=Buffer.alloc(c);for(let _e=0;_e<c;_e++){let je=(L*c+_e)*3,Ee=`${w[je]},${w[je+1]},${w[je+2]}`;H[_e]=z.get(Ee)}let q=0,Y=1/0,oe=null;for(let _e=0;_e<=4;_e++){let je=Buffer.alloc(c),Ee=0;for(let De=0;De<c;De++){let vt=H[De],Qe=0,Fe=De-1>=0?H[De-1]:0,fe=L>0?F[L-1][De]:0,ke=L>0&&De-1>=0?F[L-1][De-1]:0;_e===0?Qe=vt:_e===1?Qe=vt-Fe+256&255:_e===2?Qe=vt-fe+256&255:_e===3?Qe=vt-Math.floor((Fe+fe)/2)+256&255:Qe=vt-S(Fe,fe,ke)+256&255,je[De]=Qe;let et=Qe>127?Qe-256:Qe;Ee+=Math.abs(et)}Ee<Y&&(Y=Ee,q=_e,oe=je)}let ie=Buffer.alloc(J);ie[0]=q,oe.copy(ie,1),F.push(ie)}let j=new Map;for(let L=0;L<w.length;L+=3){let H=`${w[L]},${w[L+1]},${w[L+2]}`;j.set(H,(j.get(H)||0)+1)}let W=[];W.push({paletteArr:Z.slice(),map:new Map(z)});let V=Array.from(j.entries()).sort((L,H)=>H[1]-L[1]);if(V.length>0){let L=[],H=new Map,q=0;for(let[Y]of V){let oe=Y.split(",").map(ie=>Number(ie));if(L.push(oe[0],oe[1],oe[2]),H.set(Y,q++),q>=256)break}H.size<=256&&W.push({paletteArr:L,map:H})}for(let L of W){let oe=function(Fe,fe){if(fe===8)return Fe;let ke=c*fe,et=Math.ceil(ke/8),ot=Buffer.alloc(et),Ot=0;for(let nt=0;nt<c;nt++){let Dn=Fe[nt]&(1<<fe)-1;for(let Rt=0;Rt<fe;Rt++){let we=Dn>>fe-1-Rt&1,at=Math.floor(Ot/8),fn=7-Ot%8;ot[at]|=we<<fn,Ot++}}return ot},H=L.map.size,q=H<=2?1:H<=4?2:H<=16?4:8,Y=[];for(let Fe=0;Fe<l;Fe++){let fe=Buffer.alloc(c);for(let ke=0;ke<c;ke++){let et=(Fe*c+ke)*3,ot=`${w[et]},${w[et+1]},${w[et+2]}`;fe[ke]=L.map.get(ot)}Y.push(fe)}let ie=[];for(let Fe=0;Fe<l;Fe++){let fe=oe(Y[Fe],q),ke=0,et=1/0,ot=null;for(let nt=0;nt<=4;nt++){let Dn=Buffer.alloc(fe.length),Rt=0;for(let we=0;we<fe.length;we++){let at=fe[we],fn=we-1>=0?fe[we-1]:0,fr=Fe>0?ie[Fe-1][we]:0,Ci=Fe>0&&we-1>=0?ie[Fe-1][we-1]:0,ht=0;nt===0?ht=at:nt===1?ht=at-fn+256&255:nt===2?ht=at-fr+256&255:nt===3?ht=at-Math.floor((fn+fr)/2)+256&255:ht=at-S(fn,fr,Ci)+256&255,Dn[we]=ht;let Vy=ht>127?ht-256:ht;Rt+=Math.abs(Vy)}Rt<et&&(et=Rt,ke=nt,ot=Dn)}let Ot=Buffer.alloc(1+fe.length);Ot[0]=ke,ot.copy(Ot,1),ie.push(Ot)}let _e=Buffer.concat(ie),je=Buffer.from(L.paletteArr),Ee=[],De=Buffer.alloc(13);De.writeUInt32BE(c,0),De.writeUInt32BE(l,4),De[8]=q,De[9]=3,De[10]=0,De[11]=0,De[12]=0,Ee.push({name:"IHDR",data:De}),Ee.push({name:"PLTE",data:je}),Ee.push({name:"IDAT",data:Ye.deflateSync(_e,{level:9})}),Ee.push({name:"IEND",data:Buffer.alloc(0)});let vt=ct("../../libroxify_native.node"),Qe=P(Buffer.from(vt.encodePngChunks(Ee)));Qe.length<G.length&&(G=Qe)}}}catch{}let O=[{cmd:"oxipng",args:["-o","6","--strip","all"]},{cmd:"optipng",args:["-o7"]},{cmd:"pngcrush",args:["-brute","-reduce"]},{cmd:"pngout",args:[]}];for(let w of O)try{let D=ai(oi(),`rox_ext_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),z=D+".out.png";ii(D,G);let Z=w.args.concat([D,z]);if(!Y0(w.cmd,Z,{windowsHide:!0,stdio:"ignore",timeout:24e4}).error&&ri(z)){let F=si(z);try{ln(D),ln(z)}catch{}F.length<G.length&&(G=F)}else try{ln(D)}catch{}}catch{}return G}catch{return t}}var K0=E(()=>{Br()});import{writeFileSync as pa}from"fs";import{join as ma}from"path";async function aC(t,e){let n=Buffer.from(le.cropAndReconstitute(t));if(e){try{let r=le.sharpMetadata(t),s=le.sharpResizeImage(t,r.width*2,r.height*2,"nearest");console.log("DEBUG: writing doubled.png to",e),pa(ma(e,"doubled.png"),Buffer.from(s))}catch(r){console.log("DEBUG: failed to write doubled.png",r?.message??r)}try{console.log("DEBUG: writing reconstructed.png and reconstructed-pixels.bin to",e),pa(ma(e,"reconstructed.png"),n);let r=le.sharpToRaw(n);pa(ma(e,"reconstructed-pixels.bin"),Buffer.from(r.pixels))}catch(r){console.log("DEBUG: failed to write reconstructed artifacts",r?.message??r)}}return n}var X0=E(()=>{Vt()});function dC(t,e){let n=un*ga*(ha/8),r=ga*(ha/8),s=0;t.write("RIFF",s,"ascii"),s+=4,t.writeUInt32LE(Vr-8+e,s),s+=4,t.write("WAVE",s,"ascii"),s+=4,t.write("fmt ",s,"ascii"),s+=4,t.writeUInt32LE(16,s),s+=4,t.writeUInt16LE(1,s),s+=2,t.writeUInt16LE(ga,s),s+=2,t.writeUInt32LE(un,s),s+=4,t.writeUInt32LE(n,s),s+=4,t.writeUInt16LE(r,s),s+=2,t.writeUInt16LE(ha,s),s+=2,t.write("data",s,"ascii"),s+=4,t.writeUInt32LE(e,s)}function hC(t,e,n){let r=t.length,s=Math.round(e*r/n),i=2*Math.PI*s/r,o=2*Math.cos(i),a=0,c=0;for(let u=0;u<r;u++){let d=t[u]+o*a-c;c=a,a=d}return(a*a+c*c-o*a*c)/(r*r)}function gC(t){let e=new Float64Array(Gt);for(let n=0;n<8;n++)if(t&1<<n){let r=fC[n];for(let s=0;s<xt;s++)e[s]+=r[s]}return e}function Z0(t){let e=t.subarray(0,xt),n=xt,r=n*n,s=0;for(let i=0;i<8;i++){let{coeff:o}=mC[i],a=0,c=0;for(let u=0;u<n;u++){let d=e[u]+o*a-c;c=a,a=d}(a*a+c*c-o*a*c)/r>Q0&&(s|=1<<i)}return s}function yC(){let t=new Float64Array(An);for(let e=0;e<jr.length;e++){let n=pC[e],r=e*Ht;t.set(n,r)}return t}function SC(t){let e=Math.floor(Ht/4),n=Math.min(t.length-An,un*2);for(let r=0;r<n;r+=e){let s=!0;for(let i=0;i<jr.length;i++){let o=r+i*Ht,a=t.subarray(o,o+Ht);if(a.length<Ht){s=!1;break}if(hC(a,jr[i],un)<Q0*.5){s=!1;break}}if(s)return r+An}return-1}function bC(t,e={}){let n=e.eccLevel??"medium",r=zr(t,n),s=r.length,i=Buffer.alloc(4);i.writeUInt32BE(s,0);let o=Buffer.concat([i,r]),a=yC(),c=o.length,l=Math.floor(un*uC/1e3),d=(An+c*Gt+l)*2,f=Buffer.alloc(Vr+d);dC(f,d);let p=Vr;for(let m=0;m<An;m++){let h=Math.max(-1,Math.min(1,a[m]));f.writeInt16LE(Math.round(h*32767),p),p+=2}for(let m=0;m<c;m++){let h=gC(o[m]);for(let g=0;g<Gt;g++){let y=Math.max(-1,Math.min(1,h[g]));f.writeInt16LE(Math.round(y*32767),p),p+=2}}return f}function xC(t){if(t.length<Vr)throw new Error("WAV too short");if(t.toString("ascii",0,4)!=="RIFF")throw new Error("Not a RIFF file");if(t.toString("ascii",8,12)!=="WAVE")throw new Error("Not a WAVE file");let e=12,n=0,r=0,s=16;for(;e+8<=t.length;){let g=t.toString("ascii",e,e+4),y=t.readUInt32LE(e+4);if(g==="fmt ")s=t.readUInt16LE(e+22);else if(g==="data"){n=e+8,r=y;break}e+=8+y,y%2!==0&&e++}if(n===0)throw new Error("No data chunk in WAV");let i=s/8,o=Math.floor(r/i),a=new Float64Array(o);for(let g=0;g<o;g++){let y=n+g*i;if(s===16)a[g]=t.readInt16LE(y)/32768;else if(s===8)a[g]=(t[y]-128)/128;else throw new Error(`Unsupported bits per sample: ${s}`)}let c=SC(a);c<0&&(c=An);let l=c,u=[];for(let g=0;g<4;g++){if(l+Gt>a.length)throw new Error("Audio too short: cannot read length prefix");let y=a.subarray(l,l+Gt);u.push(Z0(y)),l+=Gt}let d=u[0]<<24|u[1]<<16|u[2]<<8|u[3];if(d<=0||d>1e7)throw new Error(`Invalid payload length: ${d}`);let f=[];for(let g=0;g<d&&!(l+Gt>a.length);g++){let y=a.subarray(l,l+Gt);f.push(Z0(y)),l+=Gt}if(f.length===0)throw new Error("No data symbols detected in audio");let p=Buffer.from(f),{data:m,totalCorrected:h}=Wr(p);return{data:m,correctedErrors:h}}function vC(t){if(t.length<Vr+An*2||t.toString("ascii",0,4)!=="RIFF"||t.toString("ascii",8,12)!=="WAVE")return!1;let e=12;for(;e+8<=t.length;){let n=t.toString("ascii",e,e+4),r=t.readUInt32LE(e+4);if(n==="fmt ")return t.readUInt16LE(e+22)===16;e+=8+r,r%2!==0&&e++}return!1}var un,ha,ga,J0,xt,cC,Gt,lC,jr,Ht,An,Q0,uC,Vr,ey,fC,pC,mC,ty=E(()=>{ti();un=44100,ha=16,ga=1,J0=[600,900,1200,1500,1800,2100,2400,2700],xt=2048,cC=512,Gt=xt+cC,lC=.35,jr=[3200,2400,1600,800],Ht=1024,An=jr.length*Ht,Q0=5e-4,uC=200,Vr=44;ey=new Float64Array(xt);{let t=2*Math.PI/(xt-1);for(let e=0;e<xt;e++)ey[e]=.5*(1-Math.cos(t*e))}fC=J0.map(t=>{let e=new Float64Array(xt),n=2*Math.PI*t/un;for(let r=0;r<xt;r++)e[r]=lC*ey[r]*Math.sin(n*r);return e}),pC=jr.map(t=>{let e=new Float64Array(Ht),n=2*Math.PI*t/un,r=2*Math.PI/(Ht-1);for(let s=0;s<Ht;s++){let i=.5*(1-Math.cos(r*s));e[s]=.3*i*Math.sin(n*s)}return e}),mC=J0.map(t=>{let e=Math.round(t*xt/un),n=2*Math.PI*e/xt;return{k:e,coeff:2*Math.cos(n)}})});function cy(){let t=[];for(let e=0;e<tt;e++){let n=[];for(let r=0;r<tt;r++){let s=e===0||e===6||r===0||r===6,i=e>=2&&e<=4&&r>=2&&r<=4;n.push(s||i)}t.push(n)}return t}function ny(t){let e=tt+oy,n=Math.ceil(Math.sqrt(t+4*e*e));n=Math.max(n,e*2+4);let r=n,s=n,i=new Uint8Array(r*s);for(let a=0;a<e;a++)for(let c=0;c<e;c++)i[a*r+c]=1;for(let a=0;a<e;a++)for(let c=r-e;c<r;c++)i[a*r+c]=1;for(let a=s-e;a<s;a++)for(let c=0;c<e;c++)i[a*r+c]=1;for(let a=s-e;a<s;a++)for(let c=r-e;c<r;c++)i[a*r+c]=1;let o=[];for(let a=0;a<s;a++){let c=a*r;for(let l=0;l<r;l++)i[c+l]||o.push([l,a])}return{gridW:r,gridH:s,dataPositions:o}}function CC(t,e,n,r){let s=e*r,i=n*r,o=Buffer.alloc(s*i*3),a=s*3;for(let c=0;c<n;c++){let l=t[c],u=c*r*a;for(let f=0;f<e;f++){let p=l[f],m=u+f*r*3;for(let h=0;h<r;h++){let g=m+h*3;o[g]=p,o[g+1]=p,o[g+2]=p}}let d=u;for(let f=1;f<r;f++)o.copy(o,u+f*a,d,d+a)}return{rgb:o,width:s,height:i}}function ci(t,e,n){let r=cy();for(let s=0;s<tt;s++)for(let i=0;i<tt;i++)t[n+s][e+i]=r[s][i]?0:255}function _C(t,e,n,r,s,i){let o=[];for(let a=0;a<i;a++){let c=new Uint8Array(s);for(let l=0;l<s;l++){let u=0,d=0;for(let f=0;f<r;f++)for(let p=0;p<r;p++){let m=a*r+f,h=l*r+p;if(m<n&&h<e){let g=(m*e+h)*3;u+=(t[g]+t[g+1]+t[g+2])/3,d++}}c[l]=d>0&&u/d>128?255:0}o.push(c)}return o}function ly(t,e,n){for(let r=2;r<=8;r++){let s=Math.floor(e/r),i=Math.floor(n/r);if(s<tt*2+4||i<tt*2+4)continue;let o=cy(),a=0,c=0;for(let l=0;l<tt;l++)for(let u=0;u<tt;u++){let d=o[l][u]?0:255,f=l*r+Math.floor(r/2),p=u*r+Math.floor(r/2);if(f>=n||p>=e)continue;let m=(f*e+p)*3,g=(t[m]+t[m+1]+t[m+2])/3>128?255:0;c++,g===d&&a++}if(c>0&&a/c>=.8)return{blockSize:r,gridW:s,gridH:i}}return null}function ry(t,e,n,r,s){let i=Buffer.alloc(14);return ay.copy(i,0),i[4]=t,i[5]=e,i.writeUInt32BE(n,6),i.writeUInt16BE(r,10),i.writeUInt16BE(s,12),new Uint8Array(i)}function wC(t){if(t.length<14)return null;let e=Buffer.from(t);return e.subarray(0,4).equals(ay)?{blockSize:e[4],eccLevel:e[5],dataLen:e.readUInt32BE(6),gridW:e.readUInt16BE(10),gridH:e.readUInt16BE(12)}:null}function sy(t){let e=new Uint8Array(t.length*8);for(let n=0;n<t.length;n++)for(let r=7;r>=0;r--)e[n*8+(7-r)]=t[n]>>r&1;return e}function IC(t){let e=Math.ceil(t.length/8),n=new Uint8Array(e);for(let r=0;r<e;r++){let s=0;for(let i=0;i<8;i++){let o=r*8+i;o<t.length&&t[o]&&(s|=1<<7-i)}n[r]=s}return n}function EC(t,e={}){let n=e.blockSize??4,r=e.eccLevel??"medium";if(n<2||n>8)throw new Error(`Block size must be 2\u20138, got ${n}`);let s=zr(t,r),i=ry(n,iy[r],t.length,0,0),o=Buffer.concat([Buffer.from(i),s]),a=sy(new Uint8Array(o)),c=ny(a.length),l=ry(n,iy[r],t.length,c.gridW,c.gridH),u=Buffer.concat([Buffer.from(l),s]),d=sy(new Uint8Array(u)),f=ny(d.length);if(f.dataPositions.length<d.length)throw new Error(`Data too large for image: need ${d.length} blocks, have ${f.dataPositions.length}`);let{gridW:p,gridH:m,dataPositions:h}=f,g=[];for(let x=0;x<m;x++)g.push(new Uint8Array(p).fill(255));ci(g,0,0),ci(g,p-tt,0),ci(g,0,m-tt),ci(g,p-tt,m-tt);for(let x=0;x<d.length&&x<h.length;x++){let[A,I]=h[x];g[I][A]=d[x]?0:255}let{rgb:y,width:S,height:v}=CC(g,p,m,n);return le?.rgbToPng?Buffer.from(le.rgbToPng(y,S,v)):kC(y,S,v)}function $C(t){let e,n,r;if(le?.sharpMetadata&&le?.sharpToRaw){let S=le.sharpMetadata(t);e=S.width,n=S.height;let v=le.sharpToRaw(t);r=Buffer.from(v.pixels)}else throw new Error("Robust image decoding requires the native module (sharpMetadata + sharpToRaw)");let s=ly(r,e,n);if(!s)throw new Error("Could not detect finder patterns \u2014 image may be too corrupted");let{blockSize:i,gridW:o,gridH:a}=s,c=_C(r,e,n,i,o,a),l=tt+oy,u=new Uint8Array(o*a);for(let S=0;S<l;S++)for(let v=0;v<l;v++)u[S*o+v]=1;for(let S=0;S<l;S++)for(let v=o-l;v<o;v++)u[S*o+v]=1;for(let S=a-l;S<a;S++)for(let v=0;v<l;v++)u[S*o+v]=1;for(let S=a-l;S<a;S++)for(let v=o-l;v<o;v++)u[S*o+v]=1;let d=[];for(let S=0;S<a;S++){let v=S*o;for(let x=0;x<o;x++)u[v+x]||d.push([x,S])}let f=new Uint8Array(d.length);for(let S=0;S<d.length;S++){let[v,x]=d[S];x<c.length&&v<c[x].length&&(f[S]=c[x][v]===0?1:0)}let p=IC(f),m=wC(p);if(!m)throw new Error("Invalid robust image header \u2014 data may be corrupted");let h=Buffer.from(p.subarray(14)),{data:g,totalCorrected:y}=Wr(h);return{data:g.subarray(0,m.dataLen),correctedErrors:y}}function PC(t){try{if(!le?.sharpMetadata||!le?.sharpToRaw)return!1;let e=le.sharpMetadata(t),n=le.sharpToRaw(t),r=Buffer.from(n.pixels);return ly(r,e.width,e.height)!==null}catch{return!1}}function kC(t,e,n){let r=ct("zlib"),s=e*3,i=Buffer.alloc(n*(1+s));for(let u=0;u<n;u++)i[u*(1+s)]=0,t.copy(i,u*(1+s)+1,u*s,(u+1)*s);let o=r.deflateSync(i,{level:0}),a=Buffer.from([137,80,78,71,13,10,26,10]),c=Buffer.alloc(13);c.writeUInt32BE(e,0),c.writeUInt32BE(n,4),c[8]=8,c[9]=2,c[10]=0,c[11]=0,c[12]=0;function l(u,d){let f=Buffer.from(u,"ascii"),p=Buffer.alloc(4);p.writeUInt32BE(d.length,0);let m=Buffer.concat([f,d]),{crc32:h}=(ea(),Ky(N0)),g=h(d,h(f)),y=Buffer.alloc(4);return y.writeUInt32BE(g>>>0,0),Buffer.concat([p,m,y])}return Buffer.concat([a,l("IHDR",c),l("IDAT",o),l("IEND",Buffer.alloc(0))])}var tt,oy,ay,iy,uy=E(()=>{ti();Vt();tt=7,oy=1,ay=Buffer.from("RBI1");iy={low:0,medium:1,quartile:2,high:3}});import{execSync as dy,spawn as MC}from"child_process";import{accessSync as NC,constants as AC,existsSync as TC}from"fs";import{dirname as py,join as Re}from"path";import{fileURLToPath as OC}from"url";import{chmodSync as RC,mkdtempSync as DC,readFileSync as FC,unlinkSync as LC,writeFileSync as UC}from"fs";import{tmpdir as BC}from"os";function qt(t){if(!TC(t))return!1;if(process.platform==="win32")return!0;try{return NC(t,AC.X_OK),!0}catch{return!1}}function ya(){let t={win32:["roxify_native.exe","roxify-cli.exe","roxify_cli.exe"],darwin:["rox-macos-universal","roxify_native-macos-arm64","roxify_native-macos-x64","roxify_native","roxify-cli","roxify_cli"],linux:["roxify_native","roxify-cli","roxify_cli"]},e=t[process.platform]||t.linux,n=li;for(let s of e){let i=Re(n,s);if(qt(i))return i;let o=Re(n,"..",s);if(qt(o))return o;let a=Re(n,"..","dist",s);if(qt(a))return a}if(process.pkg){let s=[Re(n,"..","..","target","release"),Re(n,"..","target","release"),Re(n,"target","release")];for(let i of s)for(let o of e){let a=Re(i,o);if(qt(a))return a}try{let i=ct("path").dirname(process.execPath||"");if(i){let o=[Re(i,"tools","roxify","dist"),Re(i,"tools","roxify"),Re(i,"..","tools","roxify","dist"),Re(i,"..","tools","roxify")];for(let a of o)for(let c of e){let l=Re(a,c);if(qt(l))return l}}}catch{}}try{let s=[];if(process.platform==="win32")try{let i=dy("where rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=i.split(/\r?\n/).map(o=>o.trim()).filter(Boolean))}catch{}else try{let i=dy("which rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=[i.trim()])}catch{}for(let i of s)try{let o=py(i),a=[o,Re(o,"dist"),Re(o,"..","dist"),Re(o,".."),Re(o,"node_modules","roxify","dist")];for(let c of a)for(let l of e){let u=Re(c,l);if(qt(u))return u}}catch{}}catch{}for(let s of e){let i=Re(n,"..","..",s);if(qt(i))return i;let o=Re(n,"..","..","..","..",s);if(qt(o))return o}let r=Re(n,"..","..","target","release");for(let s of e){let i=Re(r,s);if(qt(i))return i}return null}function my(){return ya()!==null}function fy(t){let e=FC(t),n=DC(Re(BC(),"roxify-")),r=Re(n,t.replace(/.*[\\/]/,""));UC(r,e);try{RC(r,493)}catch{}return r}function ui(t,e){let n=ya();if(!n)throw new Error("Rust CLI binary not found");return new Promise((r,s)=>{let i=!1,o,a="",c=32,l=[],u=f=>{l.push(f),l.length>c&&l.shift()},d=f=>{let p,m=e?.collectStdout?["pipe","pipe","pipe"]:["pipe","inherit","pipe"];try{p=MC(f,t,{stdio:m})}catch(h){if(!i){i=!0;try{o=fy(n)}catch(g){return s(g)}return d(o)}return s(h)}if(e?.collectStdout&&p.stdout&&p.stdout.on("data",h=>{a+=h.toString()}),p.stderr){let h=!!e?.onProgress,g="";p.stderr.on("data",y=>{g+=y.toString();let S=g.split(`
`);g=S.pop()||"";for(let v of S){let x=h?v.match(/^PROGRESS:(\d+):(\d+):(.+)$/):null;x?e.onProgress(Number(x[1]),Number(x[2]),x[3]):v.trim()&&(u(v),process.stderr.write(v+`
`))}})}p.on("error",h=>{if(!i){i=!0;try{o=fy(n)}catch(g){return s(g)}return d(o)}s(h)}),p.on("close",(h,g)=>{if(o)try{LC(o)}catch{}if(h===0||h===null&&g===null)r(a);else{let y=l.length>0?`
  stderr tail:
    ${l.join(`
    `)}`:"";s(new Error(`Rust CLI exited with status ${h??g}${y}`))}})};d(n)})}async function hy(t,e,n=3,r,s="aes",i,o,a){if(!ya())throw new Error("Rust CLI binary not found");let l=["encode","--level",String(n)];i&&l.push("--name",i),r&&(l.push("--passphrase",r),l.push("--encrypt",s)),typeof o=="number"&&Number.isFinite(o)&&l.push("--ram-budget-mb",String(Math.max(1,Math.floor(o)))),l.push(t,e),await ui(l,{onProgress:a})}async function gy(t,e,n,r,s,i,o){let a=["decompress",t,e];n&&a.push("--passphrase",n),r&&r.length>0&&a.push("--files",JSON.stringify(r)),s&&a.push("--dict",s),typeof i=="number"&&Number.isFinite(i)&&a.push("--ram-budget-mb",String(Math.max(1,Math.floor(i)))),await ui(a,{onProgress:o})}async function yy(t){return ui(["list",t],{collectStdout:!0})}async function Sy(t){return ui(["havepassphrase",t],{collectStdout:!0})}var li,by=E(()=>{if(typeof __dirname<"u")li=__dirname;else try{li=py(OC(import.meta.url))}catch{li=process.cwd()}});var xy=E(()=>{});async function zC(t,e=19,n,r){let s=[],i=0;for await(let l of t){if(!On&&!At)throw new Error("Native zstd compression not available");let u=Buffer.from(At&&r?At(l,e,r):On(l,e));s.push(u),i++,n&&n(i,0)}let o=Buffer.alloc(s.length*4),a=8+o.length;for(let l=0;l<s.length;l++)o.writeUInt32BE(s[l].length,l*4),a+=s[l].length;let c=Buffer.alloc(8);return c.writeUInt32BE(1515410500,0),c.writeUInt32BE(s.length,4),{chunks:[c,o,...s],totalLength:a}}async function WC(t,e=19,n,r){let i=null;if(Array.isArray(t)?t.reduce((f,p)=>f+p.length,0)<=33554432&&(i=Buffer.concat(t)):i=t,i&&i.length<=33554432){if(n&&n(0,1),!On&&!At)throw new Error("Native zstd compression not available");let d=Buffer.from(At&&r?At(i,e,r):On(i,e));return n&&n(1,1),[d]}let o=[];if(Array.isArray(t))for(let d of t)if(d.length<=33554432)o.push(d);else for(let f=0;f<d.length;f+=33554432)o.push(d.subarray(f,Math.min(f+33554432,d.length)));else for(let d=0;d<t.length;d+=33554432)o.push(t.subarray(d,Math.min(d+33554432,t.length)));let a=o.length,c=[];if(!On&&!At)throw new Error("Native zstd compression not available");for(let d=0;d<a;d++){let f=Buffer.from(At&&r?At(o[d],e,r):On(o[d],e));c.push(f),n&&n(d+1,a)}let l=Buffer.alloc(c.length*4);for(let d=0;d<c.length;d++)l.writeUInt32BE(c[d].length,d*4);let u=Buffer.alloc(8);return u.writeUInt32BE(1515410500,0),u.writeUInt32BE(c.length,4),[u,l,...c]}async function vy(t,e){if(t.length<8){if(e?.({phase:"decompress_start",total:1}),!Tn)throw new Error("Native zstd decompression not available");let a=Buffer.from(Tn(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}if(t.readUInt32BE(0)!==1515410500){if(process.env.ROX_DEBUG&&console.log("tryZstdDecompress: invalid magic"),e?.({phase:"decompress_start",total:1}),!Tn)throw new Error("Native zstd decompression not available");let a=Buffer.from(Tn(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}let r=t.readUInt32BE(4),s=[],i=8;for(let a=0;a<r;a++)s.push(t.readUInt32BE(i)),i+=4;e?.({phase:"decompress_start",total:r});let o=[];for(let a=0;a<r;a++){let c=s[a],l=t.subarray(i,i+c);if(i+=c,!Tn)throw new Error("Native zstd decompression not available");let u=Buffer.from(Tn(l));o.push(u),e?.({phase:"decompress_progress",loaded:a+1,total:r})}return e?.({phase:"decompress_done",loaded:r,total:r}),Buffer.concat(o)}async function jC(t,e){return await vy(t,e)}var On,At,Tn,Cy=E(()=>{Vt();On=null,At=null,Tn=null;try{le?.nativeZstdCompress&&(On=le.nativeZstdCompress),le?.nativeZstdCompressWithDict&&(At=le.nativeZstdCompressWithDict),le?.nativeZstdDecompress&&(Tn=le.nativeZstdDecompress)}catch{}});var Sa={};Kr(Sa,{CHUNK_TYPE:()=>Ks,COMPRESSION_MARKERS:()=>mv,DataFormatError:()=>ra,ENC_AES:()=>kn,ENC_NONE:()=>Zo,ENC_XOR:()=>Mn,FILTER_ZERO:()=>dv,FORMAT_MARKERS:()=>hv,GF_EXP:()=>bt,GF_LOG:()=>Nn,IncorrectPassphraseError:()=>dr,MAGIC:()=>Ur,MARKER_COLORS:()=>Qo,MARKER_END:()=>pv,MARKER_START:()=>fv,PIXEL_MAGIC:()=>Xs,PIXEL_MAGIC_BLOCK:()=>uv,PNG_HEADER:()=>Zs,PNG_HEADER_HEX:()=>Jo,PassphraseRequiredError:()=>ur,adler32:()=>M0,applyXor:()=>L0,calcSyndromes:()=>da,colorsToBytes:()=>Nv,compressStream:()=>zC,crc32:()=>k0,cropAndReconstitute:()=>aC,decodeBlocksToData:()=>Lv,decodePngToBinary:()=>Wv,decodeRobustAudio:()=>xC,decodeRobustImage:()=>$C,decodeWithRustCLI:()=>gy,deltaDecode:()=>Rv,deltaEncode:()=>Ov,eccDecode:()=>Wr,eccEncode:()=>zr,encodeBinaryToPng:()=>eC,encodeDataToBlocks2x2:()=>Fv,encodeRobustAudio:()=>bC,encodeRobustImage:()=>EC,encodeWithRustCLI:()=>hy,generatePalette256:()=>Dv,gfDiv:()=>ei,gfMul:()=>Nt,gfPow:()=>B0,hasPassphraseInPng:()=>sC,havepassphraseWithRustCLI:()=>Sy,isRobustAudioWav:()=>vC,isRobustImage:()=>PC,isRustBinaryAvailable:()=>my,listFilesInPng:()=>rC,listWithRustCLI:()=>yy,native:()=>le,optimizePngBuffer:()=>oC,packPaths:()=>F0,packPathsToParts:()=>ta,parallelZstdCompress:()=>WC,parallelZstdDecompress:()=>vy,polyEval:()=>z0,rsDecode:()=>j0,rsEncode:()=>W0,tryDecryptIfNeeded:()=>ca,tryZstdDecompress:()=>jC,unpackBuffer:()=>Qs,unstretchImage:()=>jv});var ba=E(()=>{Br();ea();U0();ti();H0();sa();la();q0();Vt();K0();X0();ty();uy();by();xy();Cy();na()});Zt();Ke();import*as jy from"node:path";import{basename as b_}from"node:path";import{stdin as Ce,stdout as ve}from"node:process";import{createInterface as x_}from"node:readline";function zx(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t.charAt(n)<"@"||t.charAt(n)>"~");)n++;n++}else e+=t[n],n++;return e}var ue={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},sr=class t{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let s=this._consumeSequence(n,r);r+=s}}_consumeSequence(e,n){let r=e.charAt(n);if(r==="\x1B"){if(e[n+1]==="["){let s=n+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(n,s+1);return this._handleEscape(i),s-n+1}if(e[n+1]==="O"){let s=e.slice(n,n+3);return this._handleEscape(s),3}return n+1<e.length?(this._handleAlt(e.charAt(n+1)),2):1}return this._handleChar(r),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break;default:break}}_handleAlt(e){let n=e.toLowerCase();if(n==="u"){this._doUndo();return}if(n==="e"){this._doRedo();return}if(n==="g"){this._enterGotoLine();return}if(n==="r"){this._doSearchReplace();return}if(n==="a"){this._toggleMark();return}n==="^"&&this._doUndo()}_handleChar(e){let n=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(n<32||n===127){this._handleControl(n);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break;default:break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break;default:break}}_handlePromptChar(e){let n=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(r==="n"){this._onExit("aborted",this._getCurrentContent());return}if(n===3||n===7||r==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(n===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e);let r=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${r}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(n===13){let r=this._inputBuffer.trim();r&&(this._searchState={query:r,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(n===13){let r=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this._cursorRow=Math.min(r-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let n=this._scrollTop;this._clampScroll(),this._scrollTop===n?this._renderCursor():this._renderEditArea()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop===e?this._renderCursor():this._renderEditArea()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let n=this._scrollTop;this._clampScroll(),this._scrollTop===n?this._renderCursor():this._renderEditArea()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let n=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*n)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),n=this._cursorCol;for(;n<e.length&&/\w/.test(e.charAt(n));)n++;for(;n<e.length&&!/\w/.test(e.charAt(n));)n++;this._cursorCol=n,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),n=this._cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e.charAt(n));)n--;for(;n>0&&/\w/.test(e.charAt(n-1));)n--;this._cursorCol=n,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let n=this._currentLine();this._lines[this._cursorRow]=n.slice(0,this._cursorCol)+e+n.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),n=e.slice(0,this._cursorCol),r=e.slice(this._cursorCol);this._lines[this._cursorRow]=n,this._lines.splice(this._cursorRow+1,0,r),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],n=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+n,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let n=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+n,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let n=this._undoStack.pop();n!==void 0&&(this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let n=this._redoStack.pop();n!==void 0&&(this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:n}=this._searchState,r=n?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(n?this._lines[a]:this._lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,n=this._cursorCol+1,r=this._lines.length,s=Math.round(e/r*100);this._renderStatusLine(`line ${e}/${r} (${s}%), col ${n}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}static _pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(ue.cursorHide()),e.push(ue.ed()),e.push(ue.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(ue.cursorHide()),e.push(ue.cup(1,1)),this._buildTitleBar(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(ue.cursorHide()),this._buildEditArea(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let n=e-this._scrollTop+this._editAreaStart();if(n<this._editAreaStart()||n>=this._editAreaStart()+this._editAreaRows())return;let r=[];r.push(ue.cursorHide()),r.push(ue.cup(n,1)),r.push(ue.el());let s=this._lines[e]??"";r.push(this._renderLineText(s)),r.push(ue.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let n=[];n.push(ue.cursorHide()),n.push(ue.cup(this.rows-1,1)),n.push(ue.el()),n.push(ue.reverse(t._pad(e,this.cols))),n.push(ue.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderStatusBar(e){let n=[];n.push(ue.cursorHide()),n.push(ue.cup(this.rows,1)),n.push(ue.el()),n.push(e.slice(0,this.cols)),n.push(ue.cursorShow()),n.push(ue.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(n.join(""))}_buildTitleBar(e){let n=this._modified?"Modified":"",r=` GNU nano  ${this._filename||"New Buffer"}`,s=n,i=t._pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=t._pad(i+s,this.cols);e.push(ue.cup(1,1)),e.push(ue.reverse(o))}_buildEditArea(e){let n=this._editAreaRows();for(let r=0;r<n;r++){let s=this._scrollTop+r,i=this._editAreaStart()+r;e.push(ue.cup(i,1)),e.push(ue.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let n="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[s],r++;return n}_buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ue.cup(this.rows-1,1)),e.push(ue.el()),e.push(this._buildShortcutRow(n)),e.push(ue.cup(this.rows,1)),e.push(ue.el()),e.push(this._buildShortcutRow(r))}_buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ue.reverse(i)} ${o.padEnd(n-5)}${ue.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,zx(r).length>=this.cols)break}return r}_buildCursorPosition(){let e=this._currentLine(),n=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?n+=8-n%8:n++;let r=this._cursorRow-this._scrollTop+this._editAreaStart();return ue.cup(r,n+1)}_renderHelp(){let e=[];e.push(ue.cursorHide()),e.push(ue.ed()),e.push(ue.cup(1,1)),e.push(ue.reverse(t._pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(ue.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(ue.cursorShow()),this._stream.write(e.join(""))}};var Fo=(t,e)=>`\x1B[${t};${e}H`,o0="\x1B[?25l",Wx="\x1B[?25h",Lo="\x1B[2J\x1B[H";var me={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},Bo=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Dr=Bo.length,Te=36,zo=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function jx(t){let e=[];for(let n=0;n<t.length;n++){let r=[],s=t[n];for(let i=0;i<Te;i++){let o=s[i]??" ";zo.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++){let r=e[n];if(r)for(let s=15;s<=20;s++)r[s]==="empty"&&(r[s]="ghost-house")}return e}var rn=[0,1,0,-1],Pn=[1,0,-1,0],a0=[2,3,0,1],Vx=[0,1,2,3],Gx=[3,2,1,0];function Uo(t){return a0[t]}var ir=class{_stream;_onExit;_grid;_visualGrid;_gridRow(e){let n=this._grid[e];if(n===void 0)throw new Error(`PacmanGame: row ${e} out of range`);return n}_ghost(e){let n=this._ghosts[e];if(n===void 0)throw new Error(`PacmanGame: ghost ${e} not found`);return n}_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=jx(Bo),this._visualGrid=Bo.map(n=>Array.from(n)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let n of e)(n==="dot"||n==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:me.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:me.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:me.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:me.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(o0+Lo),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(Wx+Lo+me.r)}handleInput(e){let n=this._escBuf+e.toString("utf8");this._escBuf="";let r=0;for(;r<n.length;){let s=n[r];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(r+2>=n.length){this._escBuf=n.slice(r);break}if(n[r+1]==="["){let i=n[r+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),r++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Uo(s.dir))}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),n=this._pacR,r=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,n,r),this._renderDiff()}_isWalkable(e,n,r=!1){if(e<0||e>=Dr)return!1;let s=(n%Te+Te)%Te,i=this._grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+rn[this._pacNextDir],n=((this._pacC+Pn[this._pacNextDir])%Te+Te)%Te;this._isWalkable(e,n)&&(this._pacDir=this._pacNextDir);let r=this._pacR+rn[this._pacDir],s=((this._pacC+Pn[this._pacDir])%Te+Te)%Te;this._isWalkable(r,s)&&(this._pacR=r,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Uo(e.dir)))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let n=this._pacR+rn[this._pacDir]*4,r=this._pacC+Pn[this._pacDir]*4;return this._pacDir===3&&(r=this._pacC-4),[n,r]}case"Inky":{let n=this._ghost(0),r=this._pacR+rn[this._pacDir]*2,s=this._pacC+Pn[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[r*2-n.r,s*2-n.c]}case"Clyde":{let n=e.r-this._pacR,r=e.c-this._pacC;return n*n+r*r>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+rn[e.dir];l<15||l>17?e.dir=Uo(e.dir):e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[...Vx].filter(a=>a!==a0[e.dir]).filter(a=>{let c=e.r+rn[a],l=((e.c+Pn[a])%Te+Te)%Te;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of Gx){if(!r.includes(u))continue;let d=e.r+rn[u],f=((e.c+Pn[u])%Te+Te)%Te,p=d-a,m=f-c,h=p*p+m*m;h<l&&(l=h,s=u)}}e.dir=s;let i=e.r+rn[e.dir],o=((e.c+Pn[e.dir])%Te+Te)%Te;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,n,r){for(let s=0;s<this._ghosts.length;s++){let i=this._ghost(s);if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s];if(a===void 0)continue;let c=a.r===this._pacR&&a.c===this._pacC&&i.r===n&&i.c===r;if(o||c)if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],n=String(this._score).padStart(6," "),r=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${me.white}  1UP   HIGH SCORE${me.r}`),e.push(`  ${me.yellow}${n}${me.r}   ${me.white}${r}${me.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Dr;o++){let a=s[o];for(let c=0;c<Te;c++){let l=this._grid[o]?.[c],u=a[c]??" ";zo.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Dr||o.c<0||o.c>=Te)continue;let a;if(o.mode==="eaten")a=`${me.white}\xF6${me.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${me.white}\u15E3${me.r}`:`${me.blue}\u15E3${me.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${me.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${me.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${me.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${me.yellow}${this._pacMouthOpen?a:"\u25EF"}${me.r}`}this._pacR>=0&&this._pacR<Dr&&this._pacC>=0&&this._pacC<Te&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Dr;o++){let a="";for(let c=0;c<Te;c++){let l=s[o][c];l.includes("\x1B")?a+=l:zo.has(l)?a+=`${me.blue}${l}${me.r}`:l==="\xB7"?a+=`${me.dim}\xB7${me.r}`:l==="\u25A0"?a+=`${me.white}\u25A0${me.r}`:a+=l}e.push(a)}let i=`${me.yellow}\u15E7${me.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${me.yellow}${this._level}${me.r}`),e.push(`  ${me.dim}WASD/arrows  Q=quit${me.r}`),this._msg&&(e[18]=`        ${me.yellow}${me.blink}${this._msg}${me.r}`),e}_renderFull(){let e=this._buildLines(),n=o0+Lo;for(let r=0;r<e.length;r++)n+=Fo(r+1,1)+(e[r]??"")+"\x1B[K";this._stream.write(n),this._prevLines=e}_renderDiff(){let e=this._buildLines(),n="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this._prevLines[r]&&(n+=Fo(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this._prevLines.length;r++)n+=Fo(r+1,1)+"\x1B[K";n&&this._stream.write(n),this._prevLines=e}};Ro();function Ws(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:zs(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function Hx(t,e,n,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/",c=t.replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\");return s?c=c.replace(/\\\[/g,"").replace(/\\\]/g,""):c=c.replace(/\\\[/g,"").replace(/\\\]/g,""),c}function or(t,e,n,r,s,i=!1){if(r)return Hx(r,t,e,s??n,i);let o=t==="root",a=p=>i?`${p}`:p,c=a("\x1B[37m"),l=a(o?"\x1B[1;31m":"\x1B[1;35m"),u=a("\x1B[1;34m"),d=o?a("\x1B[1;31m"):"";return`${c}[${l}${t}${c}@${u}${e}${c} ${n}]${d}${o?"#":"$"}\x1B[0m `}hs();import{EventEmitter as h_}from"node:events";function c0(t){return t==="1"||t==="true"}function l0(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function qx(){return c0(process.env.DEV_MODE)||c0(process.env.RENDER_PERF)}function js(t){let e=qx();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=l0(),r=i=>{let o=l0()-n;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}import*as Tt from"node:os";import*as wy from"node:crypto";import{EventEmitter as VC}from"node:events";import*as de from"node:fs";import*as Le from"node:path";import{gunzipSync as di,gzipSync as _y}from"node:zlib";var Go=Buffer.from([86,70,83,33]),Yx=3,Wo=1,d0=2,f0=3,p0={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},m0={};for(let[t,e]of Object.entries(p0))m0[e]=t;var jo=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this._chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this._chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this._chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this._chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this._chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function h0(t,e){if(e.type==="file"){let n=e;t.writeUint8(Wo),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(Wo),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else if(e.type==="device"){let n=e;t.writeUint8(f0),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(p0[n.deviceKind]??0),t.writeUint8(n.major),t.writeUint8(n.minor)}else{let n=e;t.writeUint8(d0),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let s of r)h0(t,s)}}function Ho(t){let e=new jo;return e.write(Go),e.writeUint8(Yx),h0(e,t),e.toBuffer()}var Vo=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,n}remaining(){return this.buf.length-this._pos}};function g0(t,e){let n=t.readUint8(),r=Kx(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===Wo){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===f0){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),f=m0[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:f,major:u,minor:d}}if(n===d0){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let f=g0(t,e);u[f.name]=f}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var Fr=new Map,u0=500;function Kx(t){let e=Fr.get(t);if(e!==void 0)return e;if(Fr.size>=u0){let n=Math.floor(u0/4),r=[...Fr.keys()];for(let s=0;s<n;s++)Fr.delete(r[s])}return Fr.set(t,t),t}function sn(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(Go))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new Vo(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let s=n.readUint8()>=2,i=g0(n,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function y0(t){return t.length>=4&&t.slice(0,4).equals(Go)}var Vs={readLatencyMs:5,writeLatencyMs:10,sequentialReadThroughput:500,sequentialWriteThroughput:300};var Gs=class{_cache=new Map;_maxEntries;_maxMemoryBytes;_policy;_diskIo;_simulateDiskIo;_hits=0;_misses=0;_evictions=0;_totalMemoryUsage=0;constructor(e={}){this._maxEntries=e.maxEntries??1e3,this._maxMemoryBytes=e.maxMemoryBytes??64*1024*1024,this._policy=e.policy??"lru",this._simulateDiskIo=e.simulateDiskIo??!0;let n=e.diskIo??{};this._diskIo={readLatencyMs:n.readLatencyMs??Vs.readLatencyMs,writeLatencyMs:n.writeLatencyMs??Vs.writeLatencyMs,sequentialReadThroughput:n.sequentialReadThroughput??Vs.sequentialReadThroughput,sequentialWriteThroughput:n.sequentialWriteThroughput??Vs.sequentialWriteThroughput}}async get(e,n){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);if(this._misses++,this._simulateDiskIo){let i=await n(),o=i.length/this._diskIo.sequentialReadThroughput,a=this._diskIo.readLatencyMs+o;return await this._delay(a),this._set(e,i),i}let s=await n();return this._set(e,s),s}getSync(e,n){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);this._misses++;let s=n();if(this._simulateDiskIo){let i=s.length/this._diskIo.sequentialReadThroughput,o=this._diskIo.readLatencyMs+i;this._syncDelay(o)}return this._set(e,s),s}async set(e,n,r){if(this._simulateDiskIo&&r){let s=n.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;await r(n),await this._delay(i)}else r&&await r(n);this._set(e,n)}setSync(e,n,r){if(this._simulateDiskIo&&r){r(n);let s=n.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;this._syncDelay(i)}else r&&r(n);this._set(e,n)}has(e){return this._cache.has(e)}delete(e){let n=this._cache.get(e);return n?(this._totalMemoryUsage-=n.size,this._cache.delete(e),!0):!1}clear(){this._cache.clear(),this._totalMemoryUsage=0}getStats(){let e=this._hits+this._misses;return{hits:this._hits,misses:this._misses,evictions:this._evictions,entries:this._cache.size,memoryUsage:this._totalMemoryUsage,hitRate:e>0?this._hits/e*100:0}}resetStats(){this._hits=0,this._misses=0,this._evictions=0}getPolicy(){return this._policy}getDiskIoParams(){return{...this._diskIo}}updateDiskIoParams(e){e.readLatencyMs!==void 0&&(this._diskIo.readLatencyMs=e.readLatencyMs),e.writeLatencyMs!==void 0&&(this._diskIo.writeLatencyMs=e.writeLatencyMs),e.sequentialReadThroughput!==void 0&&(this._diskIo.sequentialReadThroughput=e.sequentialReadThroughput),e.sequentialWriteThroughput!==void 0&&(this._diskIo.sequentialWriteThroughput=e.sequentialWriteThroughput)}_set(e,n){let r=this._cache.get(e);r&&(this._totalMemoryUsage-=r.size);let s=n.length;for(;(this._cache.size>=this._maxEntries||this._totalMemoryUsage+s>this._maxMemoryBytes)&&this._evictOne(););let i={content:Buffer.from(n),insertedAt:Date.now(),lastAccessedAt:Date.now(),accessCount:1,size:s};this._cache.set(e,i),this._totalMemoryUsage+=s}_evictOne(){if(this._cache.size===0)return!1;let e=null;switch(this._policy){case"lru":e=this._findLru();break;case"lfu":e=this._findLfu();break;case"fifo":e=this._findFifo();break;default:throw new Error(`Unknown eviction policy: ${this._policy}`)}if(e){let n=this._cache.get(e);return this._totalMemoryUsage-=n.size,this._cache.delete(e),this._evictions++,!0}return!1}_findLru(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.lastAccessedAt<e&&(e=s.lastAccessedAt,n=r);return n}_findLfu(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.accessCount<e&&(e=s.accessCount,n=r);return n}_findFifo(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.insertedAt<e&&(e=s.insertedAt,n=r);return n}_delay(e){return new Promise(n=>setTimeout(n,e))}_syncDelay(e){if(e<=0)return;let n=Date.now();for(;Date.now()-n<e;);}};import*as Oe from"node:fs";import{dirname as Xx}from"node:path";var Se={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Lr="utf8";function Zx(t,e,n){let r=Buffer.from(n,Lr);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function Jx(t){let e=Buffer.from(t.path,Lr),n=0;t.op===Se.WRITE?n=4+(t.content?.length??0)+4:t.op===Se.MKDIR?n=4:t.op===Se.REMOVE?n=0:t.op===Se.CHMOD?n=4:(t.op===Se.MOVE||t.op===Se.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Lr));let r=3+e.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===Se.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===Se.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===Se.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===Se.MOVE||t.op===Se.SYMLINK)&&(i+=Zx(s,i,t.dest??""));return s}function Qx(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),s=t.readUInt16LE(n);if(n+=2,n+s>t.length)break;let i=t.subarray(n,n+s).toString(Lr);if(n+=s,r===Se.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===Se.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===Se.REMOVE)e.push({op:r,path:i});else if(r===Se.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===Se.MOVE||r===Se.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Lr);n+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function S0(t,e){let n=Jx(e);if(Oe.existsSync(t)){let r=Oe.openSync(t,Oe.constants.O_WRONLY|Oe.constants.O_CREAT|Oe.constants.O_APPEND);try{Oe.writeSync(r,n)}finally{Oe.closeSync(r)}}else{let r=Xx(t);Oe.existsSync(r)||Oe.mkdirSync(r,{recursive:!0}),Oe.writeFileSync(t,n)}}function qo(t){if(!Oe.existsSync(t))return[];let e=Oe.readFileSync(t);return e.length===0?[]:Qx(e)}function b0(t){Oe.existsSync(t)&&Oe.unlinkSync(t)}import*as Hs from"node:path";function se(t){if(!t||t.trim()==="")return"/";let e=Hs.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function ev(t,e){let n=se(e);return Ie(t,n)}function Ie(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function on(t,e,n,r){let s=se(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=Hs.posix.dirname(s),o=Hs.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(i);let a=ev(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Yo=4,an=2,jt=1;function St(t,e,n,r,s){let i=se(e),o=Ie(t,i);if(n===0){if(s&jt&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(n===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function ar(t,e,n,r){let s=se(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{St(t,o,n,r,jt)}catch(c){if(c instanceof Error&&c.message.includes("does not exist"))return;throw new Error(`EACCES: permission denied: '${o}'`)}}}function x0(t,e,n,r,s){let i=se(e),o=Ie(t,i);if(St(t,i,r,s,an|jt),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[n];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${n}' (sticky bit)`)}}function v0(t){if(t!==0)throw new Error("EPERM: operation not permitted: chown")}function C0(t,e,n){let r=se(e),s=Ie(t,r);if(n!==0&&n!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}Ao();import*as We from"node:fs";import*as cr from"node:path";import{createHash as tv}from"node:crypto";var qs=class t{_swapDir;_entries=new Map;_swapIns=0;_swapOuts=0;constructor(e){this._swapDir=e}initialize(){We.existsSync(this._swapDir)||We.mkdirSync(this._swapDir,{recursive:!0}),this._loadExistingEntries()}swapOut(e,n,r){let s=t._hashPath(e),i=cr.join(this._swapDir,`${s}.swap`),o=Buffer.alloc(5);o.writeUInt32LE(n.length,0),o.writeUInt8(r?1:0,4);let a=`${i}.tmp`;We.writeFileSync(a,Buffer.concat([o,n])),We.renameSync(a,i),this._entries.set(e,{vfsPath:e,size:n.length,compressed:r,lastAccess:Date.now()}),this._swapOuts++}swapIn(e){let n=this._entries.get(e);if(!n)return null;let r=t._hashPath(e),s=cr.join(this._swapDir,`${r}.swap`);try{if(!We.existsSync(s))return this._entries.delete(e),null;let i=We.readFileSync(s);if(i.length<5)return this._entries.delete(e),null;let o=i.readUInt32LE(0),a=i.subarray(5);if(a.length!==o)return this._entries.delete(e),null;n.lastAccess=Date.now(),this._swapIns++;try{We.unlinkSync(s)}catch{}return this._entries.delete(e),a}catch{return this._entries.delete(e),null}}hasSwapped(e){if(!this._entries.get(e))return!1;let r=t._hashPath(e),s=cr.join(this._swapDir,`${r}.swap`);return We.existsSync(s)}deleteSwap(e){let n=t._hashPath(e),r=cr.join(this._swapDir,`${n}.swap`);try{We.unlinkSync(r)}catch{}this._entries.delete(e)}getEntry(e){return this._entries.get(e)}getLruEntries(){return Array.from(this._entries.values()).filter(e=>this.hasSwapped(e.vfsPath)).sort((e,n)=>e.lastAccess-n.lastAccess)}getStats(){let e=0,n=0,r=0;for(let s of this._entries.values())this.hasSwapped(s.vfsPath)&&(r++,n+=s.size,e+=s.size+5);return{filesSwapped:r,diskUsage:e,originalSize:n,swapIns:this._swapIns,swapOuts:this._swapOuts}}clear(){for(let e of this._entries.values())this.deleteSwap(e.vfsPath);this._entries.clear(),this._swapIns=0,this._swapOuts=0}getSwapCount(){return this._entries.size}static _hashPath(e){return tv("sha256").update(e).digest("hex").slice(0,16)}_loadExistingEntries(){try{let e=We.readdirSync(this._swapDir);for(let n of e){if(!n.endsWith(".swap"))continue;let r=cr.join(this._swapDir,n);try{let s=We.statSync(r);if(s.size<5)continue;let i=We.readFileSync(r),o=i.readUInt32LE(0),a=i.readUInt8(4)===1,c=n.replace(".swap","");this._entries.set(`__hash:${c}`,{vfsPath:`__hash:${c}`,size:o,compressed:a,lastAccess:s.mtimeMs})}catch{}}}catch{}}};bn();var Mt=512,nv=Buffer.alloc(1024),Ys=257,w0="ustar\0";function I0(t){return t.slice(Ys,Ys+6).toString("ascii")===w0}function cn(t,e){return`${t.toString(8).padStart(e-1,"0")}\0`}function rv(t,e,n,r){let s=Buffer.alloc(Mt),i=(l,u,d)=>{let f=Buffer.from(l,"ascii");f.copy(s,u,0,Math.min(f.length,d))},o=n&&!t.endsWith("/")?`${t}/`:t,a=r.typeflag??(n?53:48);sv(o,s),i(cn(r.mode,8),100,8),i(cn(r.uid,8),108,8),i(cn(r.gid,8),116,8),i(cn(e,12),124,12),i(cn(Math.floor(r.mtime/1e3),12),136,12),s[156]=a,r.linkname&&i(r.linkname,157,100),i(w0,257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32),r.devmajor!==void 0&&i(cn(r.devmajor,8),329,8),r.devminor!==void 0&&i(cn(r.devminor,8),337,8);for(let l=148;l<156;l++)s[l]=32;let c=0;for(let l=0;l<Mt;l++)c+=s[l];return Buffer.from(`${cn(c,7)} `).copy(s,148),s}function sv(t,e){let n=(r,s,i)=>{let o=Buffer.from(r,"ascii");o.copy(e,s,0,Math.min(o.length,i))};if(Buffer.byteLength(t,"ascii")<=100)n(t,0,100);else{let r=t.lastIndexOf("/",t.length-101);if(r>0&&r<=155){let s=t.slice(0,r),i=t.slice(r+1);n(s,345,155),n(i,0,100)}else n(t,0,100)}}function iv(t){let e=t%Mt;return e===0?Buffer.alloc(0):Buffer.alloc(Mt-e)}function ov(t){let e=[];for(let n of t){let r=rv(n.name,n.isDir?0:n.content.length,n.isDir,n);e.push(r),!n.isDir&&n.content.length>0&&(e.push(n.content),e.push(iv(n.content.length)))}return e.push(nv),Buffer.concat(e)}function E0(t,e,n){for(let r of Object.values(t.children)){let s=e?`${e}/${r.name}`:`/${r.name}`;if(r.type==="directory")n.push({name:s,content:Buffer.alloc(0),isDir:!0,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt}),E0(r,s,n);else if(r.type==="file"){let i=r.mode===41471;n.push({name:s,content:i?Buffer.alloc(0):r.content,isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt,linkname:i?r.content.toString("utf8"):void 0,typeflag:i?50:48})}else r.type==="stub"?n.push({name:s,content:Buffer.from(r.stubContent,"utf8"),isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt}):r.type==="device"&&n.push({name:s,content:Buffer.alloc(0),isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt,typeflag:51,devmajor:r.major,devminor:r.minor})}}function $0(t){if(t.name!=="")throw new Error("encodeTar: root must be unnamed (name === '')");let e=[{name:"/",content:Buffer.alloc(0),isDir:!0,mode:t.mode,uid:t.uid,gid:t.gid,mtime:t.updatedAt}];return E0(t,"",e),ov(e)}function lr(t){let e=t.replace(/\0/g,"").trim();return e&&Number.parseInt(e,8)||0}function av(t){let e=[],n=0;for(;n+Mt<=t.length;){let r=t.slice(n,n+Mt);if(r.every(v=>v===0))break;let s=r.slice(Ys,Ys+6).toString("ascii");if(s!=="ustar\0"&&s!=="ustar "){n+=Mt;continue}let i=r.slice(345,500).toString("ascii").replace(/\0.*/,"").trim(),o=r.slice(0,100).toString("ascii").replace(/\0.*/,"").trim(),a=i?`${i}/${o}`:o,c=lr(r.slice(124,135).toString("ascii")),l=r[156]??0,u=lr(r.slice(100,107).toString("ascii")),d=lr(r.slice(108,115).toString("ascii")),f=lr(r.slice(116,123).toString("ascii")),p=r.slice(136,147).toString("ascii").replace(/\0.*/,"").trim(),m=p?Number.parseInt(p,8)*1e3:Date.now(),h=r.slice(157,257).toString("ascii").replace(/\0.*/,"").trim(),g=lr(r.slice(329,336).toString("ascii")),y=lr(r.slice(337,344).toString("ascii"));n+=Mt;let S=t.slice(n,n+c);n+=Math.ceil(c/Mt)*Mt,!(l===103||l===120)&&e.push({name:a,content:S,mode:u,uid:d,gid:f,mtime:m,typeflag:l,linkname:h,devmajor:g,devminor:y})}return e}function Ko(t,e,n,r,s){return{type:"directory",name:t,mode:e,uid:n,gid:r,createdAt:s,updatedAt:s,children:Object.create(null),_childCount:0,_sortedKeys:null}}function _0(t,e,n,r,s,i){return{type:"file",name:t,content:e,mode:n,uid:r,gid:s,compressed:!1,createdAt:i,updatedAt:i}}function cv(t,e,n,r,s,i,o,a){return{type:"device",name:t,deviceKind:e,mode:n,uid:r,gid:s,major:i,minor:o,createdAt:a,updatedAt:a}}function lv(t){return t!==51&&t!==52?null:"null"}function Xo(t){let e=t;if(e.length>2&&e[0]===31&&e[1]===139)try{e=Buffer.from(wt(e))}catch{throw new Error("decodeTar: gzip decompression failed")}let n=av(e),r=Ko("",493,0,0,Date.now());for(let s of n){let o=s.name.replace(/\/$/,"").split("/").filter(Boolean);if(o.length===0)continue;let a=r;for(let l=0;l<o.length-1;l++){let u=o[l],d=a.children[u];if(d||(d=Ko(u,493,s.uid,s.gid,s.mtime),a.children[u]=d,a._childCount++,a._sortedKeys=null),d.type!=="directory")break;a=d}let c=o[o.length-1];if(s.typeflag===53){a.children[c]||(a.children[c]=Ko(c,s.mode||493,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null);continue}if(s.typeflag===50&&s.linkname){a.children[c]||(a.children[c]=_0(c,Buffer.from(s.linkname,"utf8"),41471,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null);continue}if(s.typeflag===51){let l=lv(s.typeflag)??"null";a.children[c]||(a.children[c]=cv(c,l,s.mode||438,s.uid,s.gid,s.devmajor,s.devminor,s.mtime),a._childCount++,a._sortedKeys=null);continue}(s.typeflag===48||s.typeflag===0||s.typeflag===0)&&!a.children[c]&&(a.children[c]=_0(c,s.content,s.mode||420,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null)}return r}var xa=class t extends VC{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;_swapStore=null;_swapEnabled;_fileCache=null;_cacheEnabled;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_roxifyCompression;_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');if(this._snapshotFile=Le.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Le.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500,this._swapEnabled=e.swapEnabled??!1,this._roxifyCompression=e.roxifyCompression??!1,this._swapEnabled){let r=e.swapDir??Le.resolve(e.snapshotPath,"swap");this._swapStore=new qs(r),this._swapStore.initialize()}let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0,this._swapEnabled=!1,this._roxifyCompression=!1;if(this._cacheEnabled=e.cache?.enabled??!1,this._cacheEnabled){let n={maxEntries:e.cache?.maxEntries,maxMemoryBytes:e.cache?.maxMemoryBytes,policy:e.cache?.policy,diskIo:e.cache?.diskIo,simulateDiskIo:e.cache?.simulateDiskIo};this._fileCache=new Gs(n)}this._root=t._makeDir("",493)}static _makeDir(e,n,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}static _makeFile(e,n,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}static _makeStub(e,n,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}static _makeDeviceNode(e,n,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:n,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,n,r=420){let s=se(e),{parent:i,name:o}=on(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=t._makeStub(o,n,r))}mknod(e,n,r=438,s=1,i=0){let o=se(e),{parent:a,name:c}=on(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=t._makeDeviceNode(c,n,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:n}),this._journal({op:Se.MKDIR,path:o,mode:r})}fdOpen(e,n=0){let r=se(e),s=this.exists(r);if(!(s||n&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&n&64&&this.writeFile(r,"",{mode:420}),n&512&&this.writeFile(r,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:r,flags:n,refCount:1}),i}fdClose(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);n.refCount--,n.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this._nextFd++;return this._fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdDup2(e,n){if(e===n)return n;let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(n);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(n)),this._fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdPath(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.path}fdFlags(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.flags}getOpenFds(){let e=new Map;for(let[n,r]of this._fdTable)e.set(n,r.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,n,r,s){let i=se(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=t._makeDir(l,n),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:n}),this._journal({op:Se.MKDIR,path:c,mode:n});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(this._mode!=="fs"||!this._snapshotFile)return;let e=this._roxifyCompression?this._snapshotFile.replaceAll(".vfsb",".rvfsb"):this._snapshotFile;if(!de.existsSync(e)){if(this._journalFile){let n=qo(this._journalFile);n.length>0&&this._replayJournal(n)}return}try{let n=Buffer.alloc(0);if(this._roxifyCompression){let r=null;try{r=await Promise.resolve().then(()=>(ba(),Sa))}catch{console.warn(`
						[VirtualFileSystem] Roxify decompression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`)}let s=this._snapshotFile.replaceAll(".vfsb",".rvfsb");if(de.existsSync(s)){let i=de.readFileSync(s);n=(await r?.decodePngToBinary(i)).buf}else n=de.readFileSync(this._snapshotFile)}else n=de.readFileSync(this._snapshotFile);if(y0(n))this._root=sn(n);else if(No(n))this._root=Us(n),console.info("[VirtualFileSystem] Loaded snapshot from squashfs format; will migrate to VFSB on next flush.");else if(I0(n)||n.length>2&&n[0]===31&&n[1]===139)this._root=Xo(n),console.info("[VirtualFileSystem] Loaded snapshot from tar format; will migrate to VFSB on next flush.");else{let r=JSON.parse(n.toString("utf8"));this._root=this._deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let r=qo(this._journalFile);r.length>0&&this._replayJournal(r)}}catch(n){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,n instanceof Error?n.message:String(n))}}flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Le.dirname(this._snapshotFile);de.mkdirSync(e,{recursive:!0});let n=this._root,r=Ho(n);this._roxifyCompression?new Promise(async(s,i)=>{let o=null;try{o=await Promise.resolve().then(()=>(ba(),Sa))}catch{i()}try{let a=await o.encodeBinaryToPng(r);de.writeFileSync(this._snapshotFile.replaceAll(".vfsb",".rvfsb"),a),s(void 0)}catch{console.warn(`
						[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`),i()}}).catch(s=>{console.warn("[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot:",s instanceof Error?s.message:String(s)),de.writeFileSync(this._snapshotFile,r)}):de.writeFileSync(this._snapshotFile,r),this._journalFile&&b0(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}_autoFlush(){this._dirty&&this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,s]of Object.entries(n.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Ho(this._root)}exportTar(){return $0(this._root)}importTar(e){this._root=Xo(e),this.emit("snapshot:import")}releaseTree(){this._root=t._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(S0(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===Se.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===Se.MKDIR?this.mkdir(n.path,n.mode):n.op===Se.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===Se.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===Se.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===Se.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||de.existsSync(this._snapshotFile)&&(this._evictDir(this._root),this._cachedUsageBytes=null)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;if(r>this._evictionThreshold){if(this._swapEnabled&&this._swapStore&&n.content.length>0){let s=this._getNodePath(this._root,n);s&&this._swapStore.swapOut(s,n.content,n.compressed)}n.size=r,n.content=Buffer.alloc(0),n.evicted=!0}}}getOpenPaths(){let e=new Set;for(let n of this._fdTable.values())e.add(n.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,n,r){let s=0;for(let[i,o]of Object.entries(e.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,n,a);else if(o.type==="file"&&!o.evicted&&!n.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(this._swapEnabled&&this._swapStore&&o.content.length>0&&this._swapStore.swapOut(a,o.content,o.compressed),o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}swapOutFile(e){if(!(this._swapEnabled&&this._swapStore))return!1;let n;try{n=Ie(this._root,e)}catch{return!1}if(n.type!=="file"||n.evicted||n.content.length===0)return!1;let r=n.content,s=n.compressed;return this._swapStore.swapOut(e,r,s),n.size=r.length,n.content=Buffer.alloc(0),n.evicted=!0,!0}swapOutLru(e){if(!(this._swapEnabled&&this._swapStore))return 0;let n=this.getOpenPaths(),r=0,s=0,i=[];this._collectEvictableFiles(this._root,"",n,i),i.sort((o,a)=>a.size-o.size);for(let o of i){if(r>=e)break;this.swapOutFile(o.path)&&(r+=o.size,s++)}return s}getSwapStats(){return this._swapStore?.getStats()??null}isSwapEnabled(){return this._swapEnabled}clearSwap(){this._swapStore?.clear()}getCacheStats(){return this._fileCache?.getStats()??null}isCacheEnabled(){return this._cacheEnabled}clearCache(){this._fileCache?.clear(),this._fileCache?.resetStats()}invalidateCache(e){let n=se(e);this._fileCache?.delete(n)}preloadCache(e){if(!(this._cacheEnabled&&this._fileCache))return 0;let n=0;for(let r of e)try{let s=se(r),i=Ie(this._root,s);if(i.type==="file"){i.evicted&&this._reloadEvicted(i,s);let o=i.compressed?di(i.content):i.content;this._fileCache.setSync(s,o),n++}}catch{}return n}_getNodePath(e,n){return this._findNodePath(e,n,"")}_findNodePath(e,n,r){for(let[s,i]of Object.entries(e.children)){if(i===n)return r?`${r}/${s}`:`/${s}`;if(i.type==="directory"){let o=r?`${r}/${s}`:`/${s}`,a=this._findNodePath(i,n,o);if(a)return a}}return null}_collectEvictableFiles(e,n,r,s){for(let[i,o]of Object.entries(e.children)){let a=n?`${n}/${i}`:`/${i}`;if(o.type==="directory")this._collectEvictableFiles(o,a,r,s);else if(o.type==="file"&&!o.evicted&&!r.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>0&&s.push({path:a,size:c})}}}onBeforeWrite(e,n){let r=se(e);this._writeHooks.set(r,n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let n=se(e);this._writeHooks.delete(n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(e,n){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(r==="/"?"/":`${r}/`)){let s=this._writeHooks.get(r);if(s){s(e,n);return}}}}registerContentResolver(e,n){let r=se(e);this._contentResolvers.set(r,n),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let n of this._sortedContentResolvers)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let r=this._contentResolvers.get(n);if(r)return r(e)}return null}_reloadEvicted(e,n){if(e.evicted){if(this._swapStore){let r=this._swapStore.swapIn(n);if(r){e.content=r,e.evicted=void 0;return}}if(this._snapshotFile&&de.existsSync(this._snapshotFile))try{let r=de.readFileSync(this._snapshotFile),s=sn(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}}mount(e,n,{readOnly:r=!0}={}){if(t._isBrowser)return;let s=se(e),i=Le.resolve(n);if(!de.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!de.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let n=se(e);this._mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this._mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=se(e);this._readHooks.set(r,n),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let n=se(e);this._readHooks.delete(n),this._sortedReadHooks=[...this._readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let r=this._readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let n=se(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Le.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,n=493,r,s){let i=se(e),o=(()=>{try{return Ie(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);if(r!==void 0&&s!==void 0&&!o){let a=Le.posix.dirname(i);if(a!==i)try{St(this._root,a,r,s,an|jt)}catch(c){if(!(c instanceof Error&&c.message.includes("does not exist")))throw c}}this._mkdirRecursive(i,n,r,s)}writeFile(e,n,r={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let h=Le.dirname(o.fullHostPath);de.existsSync(h)||de.mkdirSync(h,{recursive:!0}),de.writeFileSync(o.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let a=se(e),c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8");if(this._triggerWriteHook(a,c),s!==void 0&&i!==void 0){ar(this._root,a,s,i);let h=Le.posix.dirname(a);if(h!==a)try{St(this._root,h,s,i,an|jt)}catch(g){if(!(g instanceof Error&&g.message.includes("does not exist")))throw g}}let{parent:l,name:u}=on(this._root,a,!0,h=>this._mkdirRecursive(h,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){t._writeDeviceNode(d,a),d.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&St(this._root,a,s,i,an);let f=r.compress??!1,p=f?_y(c):c,m=r.mode??420;if(this._ramCapBytes!==null){let h=this._getCachedUsage(),g=d?.type==="file"?d.content.length:0,y=h-g+p.length;if(y>this._ramCapBytes){let S=y-this._ramCapBytes,v=this.swapOutLru(S),A=this._getCachedUsage()-g+p.length;if(A>this._ramCapBytes&&v===0)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${A}/${this._ramCapBytes} bytes)`)}}d&&d.type==="file"?(d.content=p,d.compressed=f,d.mode=m,s!==void 0&&(d.uid=s),i!==void 0&&(d.gid=i),d.updatedAt=Date.now()):(d||(l._childCount++,l._sortedKeys=null),l.children[u]=t._makeFile(u,p,m,f,s,i)),this.emit("file:write",{path:a,size:p.length}),this._journal({op:Se.WRITE,path:a,content:c,mode:m}),this._cachedUsageBytes=null,this._cacheEnabled&&this._fileCache&&this._fileCache.delete(a)}readFile(e,n,r){let s=this._resolveMount(e);if(s){if(!de.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return de.readFileSync(s.fullHostPath,"utf8")}let i=se(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;if(this._cacheEnabled&&this._fileCache?.has(i)){let l=this._fileCache.getSync(i,()=>Buffer.alloc(0));return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}n!==void 0&&r!==void 0&&ar(this._root,i,n,r);let a=Ie(this._root,i);if(a.type==="stub")return n!==void 0&&r!==void 0&&St(this._root,i,n,r,Yo),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let l=t._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:l.length}),l}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);n!==void 0&&r!==void 0&&St(this._root,i,n,r,Yo),a.evicted&&this._reloadEvicted(a,i);let c=a.compressed?di(a.content):a.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(i,c),this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(e){let n=this._resolveMount(e);if(n){if(!de.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return de.readFileSync(n.fullHostPath)}let r=se(e);if(this._triggerReadHook(r),this._cacheEnabled&&this._fileCache?.has(r)){let o=this._fileCache.getSync(r,()=>Buffer.alloc(0));return this.emit("file:read",{path:r,size:o.length}),o}let s=Ie(this._root,r);if(s.type==="stub"){let o=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:o.length}),o}if(s.type==="device"){let o=t._readDeviceNode(s,r),a=Buffer.from(o,"binary");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);s.evicted&&this._reloadEvicted(s,r);let i=s.compressed?di(s.content):s.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(r,i),this.emit("file:read",{path:r,size:i.length}),i}exists(e){let n=this._resolveMount(e);if(n)return de.existsSync(n.fullHostPath);let r=se(e);try{return Ie(this._root,r),!0}catch{return!1}}chmod(e,n,r){let s=se(e);r!==void 0&&C0(this._root,s,r),Ie(this._root,s).mode=n,this._journal({op:Se.CHMOD,path:s,mode:n})}chown(e,n,r,s){let i=se(e);s!==void 0&&v0(s);let o=Ie(this._root,i);o.uid=n,o.gid=r,this._journal({op:Se.CHMOD,path:i,mode:o.mode})}getOwner(e){let n=Ie(this._root,se(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,s){try{let i=Ie(this._root,se(e)),o=i.mode;if(n===0)return s&1?(o&73)!==0:!0;let a=0;return n===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let n=this._resolveMount(e);if(n){if(!de.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=de.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:se(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:de.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:se(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=se(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=this._resolveContent(r);if(s!==null)return{type:"file",name:r==="/"?"":Le.posix.basename(r),path:r,mode:292,uid:0,gid:0,createdAt:new Date,updatedAt:new Date,compressed:!1,size:s.length};let i=Ie(this._root,r),o=r==="/"?"":Le.posix.basename(r);return i.type==="stub"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:!1,size:i.stubContent.length}:i.type==="file"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:i.compressed,size:i.evicted?i.size??0:i.content.length}:i.type==="device"?{type:"device",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}:{type:"directory",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),childrenCount:i._childCount}}static _readDeviceNode(e,n){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${n}'`);case"random":case"urandom":return wy.randomBytes(64).toString("binary");default:return""}}static _writeDeviceNode(e,n){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${n}'`)}statType(e){try{let n=this._resolveMount(e);if(n){let s=de.statSync(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=Ie(this._root,se(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let n=this._resolveMount(e);if(n){if(!de.existsSync(n.fullHostPath))return[];try{return de.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=se(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Ie(this._root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let n=se(e),r=Ie(this._root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Le.posix.basename(n);return this._renderTreeLines(r,s)}_renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i];if(o===void 0)continue;let a=e.children[o];if(a===void 0)continue;let c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(f=>`${u}${f}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(Ie(this._root,se(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let n=0;for(let r of Object.values(e.children))n+=this._computeUsage(r);return n}setRamCap(e){this._ramCapBytes=e!==null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let n=Ie(this._root,se(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);n.compressed||(n.content=_y(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(e){let n=Ie(this._root,se(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);n.compressed&&(n.content=di(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(e,n,r,s){let i=se(n),o=e.startsWith("/")?se(e):e;if(r!==void 0&&s!==void 0){let u=Le.posix.dirname(i);if(u!==i)try{St(this._root,u,r,s,an|jt)}catch(d){if(!(d instanceof Error&&d.message.includes("does not exist")))throw d}}let{parent:a,name:c}=on(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:Se.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let n=Ie(this._root,se(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=se(e);for(let s=0;s<n;s++){try{let i=Ie(this._root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:se(Le.posix.join(Le.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={},r,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!de.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);de.statSync(i.fullHostPath).isDirectory()?de.rmSync(i.fullHostPath,{recursive:n.recursive??!1}):de.unlinkSync(i.fullHostPath);return}let o=se(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){ar(this._root,o,r,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";x0(this._root,u,d,r,s)}let a=Ie(this._root,o);if(a.type==="directory"&&!n.recursive&&a._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`);let{parent:c,name:l}=on(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:Se.REMOVE,path:o})}move(e,n,r,s){let i=se(e),o=se(n);if(i==="/"||o==="/")throw new Error("Cannot move root directory.");if(r!==void 0&&s!==void 0){ar(this._root,i,r,s),ar(this._root,o,r,s);let f=Le.posix.dirname(i),p=Le.posix.dirname(o);if(f!==i&&St(this._root,f,r,s,an|jt),p!==o)try{St(this._root,p,r,s,an|jt)}catch(m){if(!(m instanceof Error&&m.message.includes("does not exist")))throw m}}let a=Ie(this._root,i);if(this.exists(o))throw new Error(`Destination '${o}' already exists.`);this._mkdirRecursive(Le.posix.dirname(o),493);let{parent:c,name:l}=on(this._root,o,!1,()=>{}),{parent:u,name:d}=on(this._root,i,!1,()=>{});delete u.children[d],u._childCount--,u._sortedKeys=null,a.name=l,c.children[l]=a,c._childCount++,c._sortedKeys=null,this._journal({op:Se.MOVE,path:i,dest:o})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let n=[];for(let r of Object.values(e.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(t._serializeFile(r)):r.type==="device"?n.push({type:"device",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),deviceKind:r.deviceKind,major:r.major,minor:r.minor}):n.push(this._serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}static _serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n._root=n._deserializeDir(e.root,""),n}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file")r.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")};else if(s.type==="device")r.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor};else{let i=this._deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},fi=xa;function M(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function N(t,e,n,r=420){t.writeStub(e,n,r)}function K(t,e,n){t.writeFile(e,n)}function GC(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function HC(t,e,n){M(t,"/etc"),N(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),N(t,"/etc/fortune_version",`nyx/stable
`),N(t,"/etc/hostname",`${e}
`),N(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),N(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),N(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),N(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),N(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),N(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),M(t,"/etc/apt"),M(t,"/etc/apt/sources.list.d"),M(t,"/etc/apt/trusted.gpg.d"),M(t,"/etc/apt/keyrings"),N(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),N(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),M(t,"/etc/network"),N(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),M(t,"/etc/netplan"),N(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),N(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),N(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),N(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),M(t,"/etc/cron.d"),M(t,"/etc/cron.daily"),M(t,"/etc/cron.hourly"),M(t,"/etc/cron.weekly"),M(t,"/etc/cron.monthly"),M(t,"/etc/init.d"),M(t,"/etc/systemd"),M(t,"/etc/systemd/system"),M(t,"/etc/systemd/system/multi-user.target.wants"),M(t,"/etc/systemd/network"),N(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),N(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),N(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),M(t,"/etc/security"),N(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),N(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),M(t,"/etc/pam.d"),N(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),N(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),N(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),N(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),N(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),N(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),N(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),M(t,"/etc/sudoers.d"),N(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),N(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),N(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),M(t,"/etc/ld.so.conf.d"),N(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),N(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),N(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),N(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),N(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),N(t,"/etc/timezone",`UTC
`),N(t,"/etc/localtime",`UTC
`),N(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),N(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),M(t,"/etc/skel"),N(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),N(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),N(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),M(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)N(t,`/etc/alternatives/${s}`,i);M(t,"/etc/java-21-openjdk"),M(t,"/etc/java-21-openjdk/security"),N(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),N(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),N(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),N(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),N(t,"/etc/magic",`# magic
`),N(t,"/etc/magic.mime",`# magic.mime
`),N(t,"/etc/papersize",`a4
`),N(t,"/etc/ucf.conf",`# ucf.conf
`),N(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),N(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),N(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),M(t,"/etc/profile.d"),N(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),N(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function va(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let a of n){if(a==="root")continue;let c=e.getUid(a),l=e.getGid(a),u=c>0?c:s,d=l>0?l:s;r.push(`${a}:x:${u}:${d}::/home/${a}:/bin/bash`),c===0&&s++}t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=e.generateGroupFile();i.length>0?t.writeFile("/etc/group",`${i}
`):t.writeFile("/etc/group",`root:x:0:
nobody:x:65534:
`);let o=e.generateShadowFile();t.writeFile("/etc/shadow",`${o}
`,{mode:416})}function Iy(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?Number.parseInt(e[1],10):0)}function Ey(t,e,n,r,s,i){let o=`/proc/${e}`;M(t,o),M(t,`${o}/fd`),M(t,`${o}/fdinfo`),M(t,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=r.split(/\s+/)[0]??"bash";K(t,`${o}/cmdline`,`${r.replace(/\s+/g,"\0")}\0`),K(t,`${o}/comm`,c),K(t,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),K(t,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),K(t,`${o}/statm`,`4096 1024 768 231 0 512 0
`),K(t,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),K(t,`${o}/cwd`,`/home/${n}\0`),K(t,`${o}/exe`,"/bin/bash\0"),K(t,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),K(t,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),K(t,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),K(t,`${o}/oom_score`,`0
`),K(t,`${o}/oom_score_adj`,`0
`),K(t,`${o}/loginuid`,`0
`),K(t,`${o}/wchan`,`poll_schedule_timeout
`),K(t,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])N(t,`${o}/fd/${l}`,""),N(t,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function qC(t,e){M(t,"/proc/boot"),N(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),N(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Gr(t,e,n,r,s=[],i,o){M(t,"/proc");let a=Math.floor((Date.now()-r)/1e3),c=Math.floor(a*.9);K(t,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Tt.totalmem()/1024),u=Math.floor(Tt.freemem()/1024),d=o?.ramCapBytes===void 0?null:Math.floor(o.ramCapBytes/1024),f=d===null?l:Math.min(l,d),p=d===null?u:Math.floor(f*(u/l)),m=Math.floor(p*.95),h=Math.floor(f*.03),g=Math.floor(f*.08),y=Math.floor(f*.005),S=Math.floor(f*.02),v=Math.floor(f*.001);K(t,"/proc/meminfo",`${[`MemTotal:       ${String(f).padStart(10)} kB`,`MemFree:        ${String(p).padStart(10)} kB`,`MemAvailable:   ${String(m).padStart(10)} kB`,`Buffers:        ${String(h).padStart(10)} kB`,`Cached:         ${String(g).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((h+g)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(g*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(f*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(f*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(g*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(g*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(f*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(g*.4)).padStart(10)} kB`,`Shmem:          ${String(y).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(S*.6)).padStart(10)} kB`,`Slab:           ${String(S).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(S*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(S*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(f*5e-4)).padStart(10)} kB`,`PageTables:     ${String(v).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(f*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(f*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(f*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(f*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(f*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(f*.98)).padStart(10)} kB`].join(`
`)}
`);let x=Tt.cpus(),A=o?.cpuCapCores===void 0?x.length:Math.min(o.cpuCapCores,x.length),I=x.slice(0,A),_=[];for(let fe=0;fe<I.length;fe++){let ke=I[fe];ke&&_.push(`processor	: ${fe}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${ke.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${ke.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${I.length}`,`core id		: ${fe}`,`cpu cores	: ${I.length}`,`apicid		: ${fe}`,`initial apicid	: ${fe}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(ke.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}K(t,"/proc/cpuinfo",`${_.join(`
`)}
`),K(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),K(t,"/proc/hostname",`${n}
`);let b=(Math.random()*.3).toFixed(2),C=1+s.length;K(t,"/proc/loadavg",`${b} ${b} ${b} ${C}/${C} 1
`);let P=I.length,T=Math.floor(a*100),R=Math.floor(a*2),G=Math.floor(a*30),X=Math.floor(a*800),te=Math.floor(a*5),$=Math.floor(Number(a)),O=Math.floor(a*2),w=Math.floor(a*0),D=T+R+G+X+te+$+O+w,z=`cpu  ${T} ${R} ${G} ${X} ${te} ${$} ${O} ${w} 0 0
`,Z=Array.from({length:P},(fe,ke)=>`cpu${ke} ${Math.floor(T/P)} ${Math.floor(R/P)} ${Math.floor(G/P)} ${Math.floor(X/P)} ${Math.floor(te/P)} ${Math.floor($/P)} ${Math.floor(O/P)} ${Math.floor(w/P)} 0 0`).join(`
`);K(t,"/proc/stat",`${z}${Z}
intr ${Math.floor(D*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(D*50)}
btime ${Math.floor(r/1e3)}
processes ${C+10}
procs_running 1
procs_blocked 0
`);let J=Math.floor(D*.5),F=Math.floor(D*.3),j=0,W=0,V=Math.floor(D*2),L=V+Math.floor(D*.5),H=Math.floor(D*.01);K(t,"/proc/vmstat",`nr_free_pages ${Math.floor(p/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(g/4)}
nr_zone_active_file ${Math.floor(h/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${v}
nr_kernel_stack ${Math.floor(f*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(D*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(D*3)}
numa_other 0
nr_inactive_anon 0
nr_active_anon 0
nr_inactive_file ${Math.floor(g/4)}
nr_active_file ${Math.floor(h/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor(S*.6)}
nr_slab_unreclaimable ${Math.floor(S*.4)}
nr_isolated_anon 0
nr_isolated_file 0
workingset_nodes 0
workingset_refault 0
workingset_activate 0
workingset_restore 0
workingset_nodereclaim 0
nr_anon_pages ${Math.floor(f*.001)}
nr_mapped ${Math.floor(g*.4)}
nr_file_pages ${Math.floor(g*.8)}
nr_dirty ${Math.floor(f*.001)}
nr_writeback 0
nr_writeback_temp 0
nr_shmem ${Math.floor(f*.005)}
nr_shmem_hugepages 0
nr_shmem_pmdmapped 0
nr_file_hugepages 0
nr_file_pmdmapped 0
nr_anon_transparent_hugepages 0
nr_vmscan_write 0
nr_vmscan_immediate_reclaim 0
nr_dirtied ${Math.floor(D*2)}
nr_written ${Math.floor(D*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(h/4)}
pgpgin ${J}
pgpgout ${F}
pswpin ${j}
pswpout ${W}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(V*.3)}
pgalloc_normal ${Math.floor(V*.7)}
pgalloc_movable 0
pgfree ${V}
pgactivate ${Math.floor(D*.5)}
pgdeactivate 0
pgfault ${L}
pgmajfault ${H}
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

`),M(t,"/proc/pressure");let q=(Math.random()*.3).toFixed(2),Y=(Math.random()*.2+.1).toFixed(2),oe=(Math.random()*.1+.05).toFixed(2),ie=Math.floor(D*10);K(t,"/proc/pressure/cpu",`some avg10=${q} avg60=${Y} avg300=${oe} total=${ie}
`),K(t,"/proc/pressure/memory",`some avg10=${(Number(q)*.5).toFixed(2)} avg60=${(Number(Y)*.3).toFixed(2)} avg300=${(Number(oe)*.2).toFixed(2)} total=${Math.floor(ie*.3)}
`),K(t,"/proc/pressure/io",`some avg10=${(Number(q)*.7).toFixed(2)} avg60=${(Number(Y)*.5).toFixed(2)} avg300=${(Number(oe)*.3).toFixed(2)} total=${Math.floor(ie*.5)}
`),K(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),K(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),K(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let _e=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(K(t,"/proc/mounts",_e),M(t,"/proc/self"),K(t,"/proc/self/mounts",_e),M(t,"/proc/net"),i){let fe=i.getInterfaces(),ke=i.getRoutes(),et=i.getArpCache(),ot=we=>we.split(".").reverse().map(at=>Number.parseInt(at,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Ot=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,nt=fe.map(we=>{let at=we.name.padStart(4);if(we.name==="lo")return`${at}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let fn=Math.floor(Math.random()*2e5),fr=Math.floor(Math.random()*2e3),Ci=Math.floor(Math.random()*5e7),ht=Math.floor(Math.random()*3e3);return`${at}: ${String(fn).padStart(8)} ${String(fr).padStart(7)}    0    0    0     0          0         0 ${String(Ci).padStart(9)} ${String(ht).padStart(7)}    0    0    0     0       0          0`});K(t,"/proc/net/dev",`${Ot}
${nt.join(`
`)}
`);let Dn=ke.map(we=>[we.device,ot(we.destination==="default"?"0.0.0.0":we.destination),ot(we.gateway),we.flags==="UG"?"0003":we.flags==="U"?"0001":"0000","0","0","100",ot(we.netmask),"0","0","0"].join("	"));K(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${Dn.join(`
`)}
`);let Rt=et.map(we=>`${we.ip.padEnd(15)} 0x1         0x2         ${we.mac.padEnd(17)}     *        ${we.device}`);K(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Rt.join(`
`)}
`)}else K(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),K(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),K(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);K(t,"/proc/net/if_inet6","");let je=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);K(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${je}
`),K(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),K(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),K(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),K(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),K(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),K(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),K(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),K(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),K(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),M(t,"/proc/sys"),M(t,"/proc/sys/kernel"),M(t,"/proc/sys/net"),M(t,"/proc/sys/net/ipv4"),M(t,"/proc/sys/net/ipv6"),M(t,"/proc/sys/net/core"),M(t,"/proc/sys/vm"),M(t,"/proc/sys/fs"),M(t,"/proc/sys/fs/inotify"),K(t,"/proc/sys/kernel/hostname",`${n}
`),K(t,"/proc/sys/kernel/ostype",`Linux
`),K(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),K(t,"/proc/sys/kernel/pid_max",`32768
`),K(t,"/proc/sys/kernel/threads-max",`31968
`),K(t,"/proc/sys/kernel/randomize_va_space",`2
`),K(t,"/proc/sys/kernel/dmesg_restrict",`0
`),K(t,"/proc/sys/kernel/kptr_restrict",`0
`),K(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),K(t,"/proc/sys/kernel/printk",`4	4	1	7
`),K(t,"/proc/sys/kernel/sysrq",`176
`),K(t,"/proc/sys/kernel/panic",`1
`),K(t,"/proc/sys/kernel/panic_on_oops",`1
`),K(t,"/proc/sys/kernel/core_pattern",`core
`),K(t,"/proc/sys/kernel/core_uses_pid",`0
`),K(t,"/proc/sys/kernel/ngroups_max",`65536
`),K(t,"/proc/sys/kernel/cap_last_cap",`40
`),K(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),K(t,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),K(t,"/proc/sys/net/ipv4/ip_forward",`0
`),K(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),K(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),K(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),K(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),K(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),K(t,"/proc/sys/net/core/somaxconn",`4096
`),K(t,"/proc/sys/net/core/rmem_max",`212992
`),K(t,"/proc/sys/net/core/wmem_max",`212992
`),K(t,"/proc/sys/vm/swappiness",`60
`),K(t,"/proc/sys/vm/overcommit_memory",`0
`),K(t,"/proc/sys/vm/overcommit_ratio",`50
`),K(t,"/proc/sys/vm/dirty_ratio",`20
`),K(t,"/proc/sys/vm/dirty_background_ratio",`10
`),K(t,"/proc/sys/vm/min_free_kbytes",`65536
`),K(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),K(t,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),K(t,"/proc/sys/fs/file-max",`1048576
`),K(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),K(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),K(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let Ee=o?.ramCapBytes??Tt.totalmem(),De=o?.cpuCapCores===void 0?-1:o.cpuCapCores*1e5;M(t,"/sys/fs/cgroup/memory"),K(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Ee}
`),K(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Ee-Tt.freemem()}
`),K(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Ee}
`),M(t,"/sys/fs/cgroup/cpu"),K(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),K(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${De}
`),K(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),K(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),Ey(t,1,"root","/sbin/init",new Date(r).toISOString(),{});for(let fe of s){let ke=Iy(fe.tty);Ey(t,ke,fe.username,"bash",fe.startedAt,{USER:fe.username,HOME:`/home/${fe.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:fe.username})}let vt=s[s.length-1],Qe=vt===void 0?1:Iy(vt.tty);try{t.remove("/proc/self")}catch{}let Fe=`/proc/${Qe}`;if(M(t,"/proc/self"),M(t,"/proc/self/fd"),M(t,"/proc/self/fdinfo"),M(t,"/proc/self/net"),t.exists(Fe))for(let fe of t.list(Fe)){let ke=`${Fe}/${fe}`,et=`/proc/self/${fe}`;try{t.stat(ke).type==="file"&&K(t,et,t.readFile(ke))}catch{}}else K(t,"/proc/self/cmdline","bash\0"),K(t,"/proc/self/comm","bash"),K(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),K(t,"/proc/self/environ",""),K(t,"/proc/self/cwd","/root\0"),K(t,"/proc/self/exe","/bin/bash\0")}function YC(t,e,n,r){M(t,"/sys"),M(t,"/sys/devices"),M(t,"/sys/devices/virtual"),M(t,"/sys/devices/system"),M(t,"/sys/devices/system/cpu"),M(t,"/sys/devices/system/cpu/cpu0"),N(t,"/sys/devices/system/cpu/cpu0/online",`1
`),N(t,"/sys/devices/system/cpu/online",`0
`),N(t,"/sys/devices/system/cpu/possible",`0
`),N(t,"/sys/devices/system/cpu/present",`0
`),M(t,"/sys/devices/system/node"),M(t,"/sys/devices/system/node/node0"),N(t,"/sys/devices/system/node/node0/cpumap",`1
`),M(t,"/sys/class"),M(t,"/sys/class/net"),M(t,"/sys/class/net/eth0"),N(t,"/sys/class/net/eth0/operstate",`up
`),N(t,"/sys/class/net/eth0/carrier",`1
`),N(t,"/sys/class/net/eth0/mtu",`1500
`),N(t,"/sys/class/net/eth0/speed",`10000
`),N(t,"/sys/class/net/eth0/duplex",`full
`),N(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),N(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=GC(e),i=s.toString(16).padStart(8,"0");N(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),M(t,"/sys/class/net/lo"),N(t,"/sys/class/net/lo/operstate",`unknown
`),N(t,"/sys/class/net/lo/carrier",`1
`),N(t,"/sys/class/net/lo/mtu",`65536
`),N(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),M(t,"/sys/class/block"),M(t,"/sys/class/block/vda"),N(t,"/sys/class/block/vda/size",`536870912
`),N(t,"/sys/class/block/vda/ro",`0
`),N(t,"/sys/class/block/vda/removable",`0
`),M(t,"/sys/fs"),M(t,"/sys/fs/cgroup");for(let u of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])M(t,`/sys/fs/cgroup/${u}`),u!=="unified"&&(N(t,`/sys/fs/cgroup/${u}/tasks`,`1
`),N(t,`/sys/fs/cgroup/${u}/notify_on_release`,`0
`),N(t,`/sys/fs/cgroup/${u}/release_agent`,""));let o=r?.ramCapBytes??Tt.totalmem();N(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),N(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-Tt.freemem()}
`),N(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),N(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),N(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",r?.cpuCapCores===void 0?`-1
`:`${r.cpuCapCores*1e5}
`),N(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),N(t,"/sys/fs/cgroup/unified/cgroup.procs",`1
`),N(t,"/sys/fs/cgroup/unified/cgroup.controllers",`cpu memory io pids
`);let a=r?.cpuCapCores===void 0?"max":`${r.cpuCapCores*1e5} 100000`;N(t,"/sys/fs/cgroup/unified/cpu.max",`${a}
`),N(t,"/sys/fs/cgroup/unified/cpu.weight",`100
`),N(t,"/sys/fs/cgroup/unified/memory.max",`${o}
`),N(t,"/sys/fs/cgroup/unified/memory.current",`0
`),N(t,"/sys/fs/cgroup/unified/pids.max",`max
`),N(t,"/sys/fs/cgroup/unified/pids.current",`1
`),M(t,"/sys/kernel"),N(t,"/sys/kernel/hostname",`${e}
`),N(t,"/sys/kernel/osrelease",`${n.kernel}
`),N(t,"/sys/kernel/ostype",`Linux
`),M(t,"/sys/kernel/security"),M(t,"/sys/devices/virtual"),M(t,"/sys/devices/virtual/dmi"),M(t,"/sys/devices/virtual/dmi/id");let c=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,l={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:c,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${c}`};for(let[u,d]of Object.entries(l))N(t,`/sys/devices/virtual/dmi/id/${u}`,`${d}
`);M(t,"/sys/class"),M(t,"/sys/class/net"),M(t,"/sys/kernel"),N(t,"/sys/kernel/hostname",`${e}
`),N(t,"/sys/kernel/osrelease",`${n.kernel}
`),N(t,"/sys/kernel/ostype",`Linux
`)}function KC(t){M(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),N(t,"/dev/mem","",416),N(t,"/dev/port","",416),N(t,"/dev/kmsg","",432),N(t,"/dev/hwrng","",432),N(t,"/dev/fuse","",432),N(t,"/dev/autofs","",432),N(t,"/dev/userfaultfd","",432),N(t,"/dev/cpu_dma_latency","",432),N(t,"/dev/ptp0","",432),N(t,"/dev/snapshot","",432),N(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)N(t,`/dev/tty${e}`,"",400);N(t,"/dev/vcs","",400),N(t,"/dev/vcs1","",400),N(t,"/dev/vcsa","",400),N(t,"/dev/vcsa1","",400),N(t,"/dev/vcsu","",400),N(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)N(t,`/dev/loop${e}`,"",432);M(t,"/dev/loop-control"),N(t,"/dev/vda","",432),N(t,"/dev/vdb","",432),N(t,"/dev/vdc","",432),N(t,"/dev/vdd","",432),M(t,"/dev/net"),N(t,"/dev/net/tun","",432),M(t,"/dev/pts"),M(t,"/dev/shm"),M(t,"/dev/cpu"),M(t,"/dev/fd"),N(t,"/dev/vga_arbiter","",432),N(t,"/dev/vsock","",432)}function XC(t){M(t,"/usr"),M(t,"/usr/bin"),M(t,"/usr/sbin"),M(t,"/usr/local"),M(t,"/usr/local/bin"),M(t,"/usr/local/lib"),M(t,"/usr/local/share"),M(t,"/usr/local/include"),M(t,"/usr/local/sbin"),M(t,"/usr/share"),M(t,"/usr/share/doc"),M(t,"/usr/share/man"),M(t,"/usr/share/man/man1"),M(t,"/usr/share/man/man5"),M(t,"/usr/share/man/man8"),M(t,"/usr/share/common-licenses"),M(t,"/usr/share/ca-certificates"),M(t,"/usr/share/zoneinfo"),M(t,"/usr/lib"),M(t,"/usr/lib/x86_64-linux-gnu"),M(t,"/usr/lib/python3"),M(t,"/usr/lib/python3/dist-packages"),M(t,"/usr/lib/python3.12"),M(t,"/usr/lib/jvm"),M(t,"/usr/lib/jvm/java-21-openjdk-amd64"),M(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),M(t,"/usr/lib/node_modules"),M(t,"/usr/lib/node_modules/npm"),M(t,"/usr/include"),M(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)N(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)N(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);N(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),N(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),N(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),N(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),N(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),N(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),N(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),N(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),N(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),N(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),N(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),N(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var ZC=`Package: bash
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

`;function JC(t){M(t,"/var"),M(t,"/var/log"),M(t,"/var/log/apt"),M(t,"/var/log/journal"),M(t,"/var/log/private"),M(t,"/var/tmp"),M(t,"/var/cache"),M(t,"/var/cache/apt"),M(t,"/var/cache/apt/archives"),M(t,"/var/cache/apt/archives/partial"),M(t,"/var/cache/debconf"),M(t,"/var/cache/ldconfig"),M(t,"/var/cache/fontconfig"),M(t,"/var/cache/PackageKit"),M(t,"/var/lib"),M(t,"/var/lib/apt"),M(t,"/var/lib/apt/lists"),M(t,"/var/lib/apt/lists/partial"),M(t,"/var/lib/dpkg"),M(t,"/var/lib/dpkg/info"),M(t,"/var/lib/dpkg/updates"),M(t,"/var/lib/dpkg/alternatives"),M(t,"/var/lib/misc"),M(t,"/var/lib/systemd"),M(t,"/var/lib/systemd/coredump"),M(t,"/var/lib/pam"),M(t,"/var/lib/git"),M(t,"/var/lib/PackageKit"),M(t,"/var/lib/python"),M(t,"/var/spool"),M(t,"/var/spool/cron"),M(t,"/var/spool/mail"),M(t,"/var/mail"),M(t,"/var/backups"),M(t,"/var/www"),N(t,"/var/lib/dpkg/status",ZC),N(t,"/var/lib/dpkg/available",""),N(t,"/var/lib/dpkg/lock",""),N(t,"/var/lib/dpkg/lock-frontend",""),N(t,"/var/lib/apt/lists/lock",""),N(t,"/var/cache/apt/pkgcache.bin",""),N(t,"/var/cache/apt/srcpkgcache.bin",""),N(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),N(t,"/var/log/auth.log",""),N(t,"/var/log/kern.log",""),N(t,"/var/log/dpkg.log",""),N(t,"/var/log/apt/history.log",""),N(t,"/var/log/apt/term.log",""),N(t,"/var/log/faillog",""),N(t,"/var/log/lastlog",""),N(t,"/var/log/wtmp",""),N(t,"/var/log/btmp",""),N(t,"/var/log/alternatives.log",""),M(t,"/run"),M(t,"/run/lock"),M(t,"/run/lock/subsys"),M(t,"/run/systemd"),M(t,"/run/systemd/ask-password"),M(t,"/run/systemd/sessions"),M(t,"/run/systemd/users"),M(t,"/run/user"),M(t,"/run/dbus"),M(t,"/run/adduser"),N(t,"/run/utmp",""),N(t,"/run/dbus/system_bus_socket","")}function QC(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),M(t,"/lib"),M(t,"/lib64"),M(t,"/lib/x86_64-linux-gnu"),M(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||N(t,"/lib64/ld-linux-x86-64.so.2","",493)}function e_(t){M(t,"/tmp",1023),M(t,"/tmp/node-compile-cache",1023)}function t_(t){M(t,"/root",448),M(t,"/root/.ssh",448),M(t,"/root/.config",493),M(t,"/root/.config/pip",493),M(t,"/root/.local",493),M(t,"/root/.local/share",493),N(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\W\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),N(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),N(t,"/root/.bash_logout",`# ~/.bash_logout
`),N(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function n_(t,e){M(t,"/opt"),M(t,"/opt/rclone"),M(t,"/srv"),M(t,"/mnt"),M(t,"/media"),M(t,"/boot"),M(t,"/boot/grub"),N(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel,r=`# Fortune GNU/Linux kernel ${n}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");N(t,`/boot/vmlinuz-${n}`,r,420),N(t,`/boot/initrd.img-${n}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${n}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),N(t,`/boot/System.map-${n}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),N(t,`/boot/config-${n}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),M(t,"/lost+found",448),M(t,"/home")}var $y=new Map;function r_(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function s_(t,e){let n=r_(t,e),r=$y.get(n);if(r)return r;let s=new fi({mode:"memory"});HC(s,t,e),YC(s,t,e),KC(s),XC(s),JC(s),QC(s),e_(s),n_(s,e),qC(s,e);let i=s.encodeBinary();return $y.set(n,i),i}function Py(t,e,n,r,s,i=[],o,a){let c=s_(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(sn(c)):t.importRootTree(sn(c)),t_(t),Gr(t,r,n,s,i,o,a),va(t,e)}$o();po();Ii();import{createHash as My,randomBytes as i_,randomUUID as o_,scryptSync as a_,timingSafeEqual as c_}from"node:crypto";import{EventEmitter as l_}from"node:events";import*as Ay from"node:path";var pi=class t{constructor(e){this._vfs=e}_vfs;_groupsPath="/etc/group";_groups=new Map;_nextGid=2e3;initialize(){this._loadFromVfs(),this._ensureSystemGroups()}createGroup(e,n){if(t._validateGroupName(e),this._groups.has(e))throw new Error(`groupadd: group '${e}' already exists`);let r=n??this._nextGid++;n!==void 0&&n>=this._nextGid&&(this._nextGid=n+1);let s={name:e,gid:r,members:[]};return this._groups.set(e,s),this._persist(),s}deleteGroup(e){if(!this._groups.has(e))throw new Error(`groupdel: group '${e}' does not exist`);this._groups.delete(e),this._persist()}addMember(e,n){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members.includes(n)||(r.members.push(n),this._persist())}removeMember(e,n){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members=r.members.filter(s=>s!==n),this._persist()}getGroup(e){return this._groups.get(e)}getGroupByGid(e){for(let n of this._groups.values())if(n.gid===e)return n}getGidByName(e){return this._groups.get(e)?.gid??null}getNameByGid(e){for(let n of this._groups.values())if(n.gid===e)return n.name;return null}getMembers(e){return this._groups.get(e)?.members??[]}getUserSupplementaryGroups(e){let n=[];for(let r of this._groups.values())r.members.includes(e)&&n.push(r.name);return n}getUserAllGroups(e,n){let r=new Set,s=this.getGroupByGid(n);s&&r.add(s.name);for(let i of this._groups.values())i.members.includes(e)&&r.add(i.name);return Array.from(r).sort()}isMemberOf(e,n,r){let s=this._groups.get(n);return s?s.gid===r?!0:s.members.includes(e):!1}listGroups(){return Array.from(this._groups.values()).sort((e,n)=>e.name.localeCompare(n.name))}generateGroupFile(){return this.listGroups().map(e=>`${e.name}:x:${e.gid}:${e.members.join(",")}`).join(`
`)}_persist(){let e=this.generateGroupFile();this._vfs.writeFile(this._groupsPath,e.length>0?`${e}
`:"",{mode:420})}_loadFromVfs(){if(this._groups.clear(),!this._vfs.exists(this._groupsPath))return;let e=this._vfs.readFile(this._groupsPath);for(let n of e.split(`
`)){let r=n.trim();if(r.length===0||r.startsWith("#"))continue;let s=r.split(":");if(s.length<4)continue;let[i,o,a,c]=s;if(!(i&&a))continue;let l=Number.parseInt(a,10);if(!Number.isFinite(l)||l<0)continue;let u=c?c.split(",").filter(d=>d.length>0):[];this._groups.set(i,{name:i,gid:l,members:u}),l>=this._nextGid&&(this._nextGid=l+1)}}_ensureSystemGroups(){let e=[{name:"root",gid:0},{name:"daemon",gid:1},{name:"bin",gid:2},{name:"sys",gid:3},{name:"adm",gid:4},{name:"tty",gid:5},{name:"disk",gid:6},{name:"lp",gid:7},{name:"mail",gid:8},{name:"news",gid:9},{name:"uucp",gid:10},{name:"man",gid:12},{name:"proxy",gid:13},{name:"kmem",gid:15},{name:"dialout",gid:20},{name:"fax",gid:21},{name:"voice",gid:22},{name:"cdrom",gid:24},{name:"floppy",gid:25},{name:"tape",gid:26},{name:"sudo",gid:27},{name:"audio",gid:29},{name:"dip",gid:30},{name:"www-data",gid:33},{name:"backup",gid:34},{name:"operator",gid:37},{name:"list",gid:38},{name:"irc",gid:39},{name:"src",gid:40},{name:"shadow",gid:42},{name:"utmp",gid:43},{name:"video",gid:44},{name:"sasl",gid:45},{name:"plugdev",gid:46},{name:"staff",gid:50},{name:"games",gid:60},{name:"users",gid:100},{name:"nogroup",gid:65534}];for(let{name:n,gid:r}of e)this._groups.has(n)||(this._groups.set(n,{name:n,gid:r,members:[]}),r>=this._nextGid&&(this._nextGid=r+1))}static _validateGroupName(e){if(!e||e.trim()==="")throw new Error("invalid group name");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error(`invalid group name '${e}'`)}};var ky={"-20":88761,"-19":71755,"-18":56483,"-17":46273,"-16":36291,"-15":29154,"-14":23254,"-13":18705,"-12":14949,"-11":11916,"-10":9548,"-9":7620,"-8":6100,"-7":4904,"-6":3906,"-5":3121,"-4":2501,"-3":1991,"-2":1586,"-1":1277,0:1024,1:820,2:655,3:526,4:423,5:335,6:272,7:215,8:172,9:137,10:110,11:87,12:70,13:56,14:45,15:36,16:29,17:23,18:18,19:15},Ca={idle:19,very_low:15,low:10,normal:0,high:-10,very_high:-15,realtime:-20},Yt=class t{_baseTimesliceMs;_maxTimesliceMs;_minTimesliceMs;_enforceFairShare;_accountingWindowMs;_scheduleCount=0;_totalCpuTimeMs=0;_throttleCount=0;_preemptCount=0;_windowStart=Date.now();_processCpuTime=new Map;constructor(e={}){this._baseTimesliceMs=e.baseTimesliceMs??100,this._maxTimesliceMs=e.maxTimesliceMs??500,this._minTimesliceMs=e.minTimesliceMs??10,this._enforceFairShare=e.enforceFairShare??!0,this._accountingWindowMs=e.accountingWindowMs??1e3}calculateTimeslice(e){let s=(ky[e]??1024)/1024,i=this._baseTimesliceMs*s;return Math.max(this._minTimesliceMs,Math.min(this._maxTimesliceMs,i))}static getNiceWeight(e){return ky[e]??1024}static priorityToNice(e){return Ca[e]}static niceToPriority(e){for(let[s,i]of Object.entries(Ca))if(i===e)return s;let n="normal",r=Math.abs(e);for(let[s,i]of Object.entries(Ca)){let o=Math.abs(e-i);o<r&&(r=o,n=s)}return n}static isValidNice(e){return e>=-20&&e<=19&&Number.isInteger(e)}recordCpuTime(e,n){let r=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,r+n),this._totalCpuTimeMs+=n}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}shouldThrottle(e,n,r){if(!this._enforceFairShare||r<=1)return!1;let s=Date.now(),i=s-this._windowStart;if(i>=this._accountingWindowMs)return this._windowStart=s,this._processCpuTime.clear(),!1;let o=this._processCpuTime.get(e)??0,a=t.getNiceWeight(n),l=r*1024,u=a/l*i;return o>u*2}schedule(e,n){let r=e.nice??0,s=this.calculateTimeslice(r);return this.shouldThrottle(e.pid,r,n)?(this._throttleCount++,{action:"throttle",reason:"exceeded fair share"}):(this._scheduleCount++,{action:"run",timesliceMs:s,reason:`timeslice ${s}ms (nice ${r})`})}recordPreemption(){this._preemptCount++}getStats(){return{scheduleCount:this._scheduleCount,totalCpuTimeMs:this._totalCpuTimeMs,runQueueLength:this._processCpuTime.size,throttleCount:this._throttleCount,preemptCount:this._preemptCount,avgTimesliceMs:this._scheduleCount>0?this._totalCpuTimeMs/this._scheduleCount:0,windowStart:this._windowStart,processCpuTime:new Map(this._processCpuTime)}}resetStats(){this._scheduleCount=0,this._totalCpuTimeMs=0,this._throttleCount=0,this._preemptCount=0}resetWindow(){this._windowStart=Date.now(),this._processCpuTime.clear()}removeProcess(e){this._processCpuTime.delete(e)}};function u_(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var ze=js("VirtualUserManager"),mi=class t extends l_{constructor(n,r=!1){super();this._vfs=n;this._autoSudoForNewUsers=r;ze.mark("constructor"),this._groups=new pi(n),this._scheduler=new Yt}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _maxRecordCacheSize=100;static _fastPasswordHash=u_();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_sessionCpuTime=new Map;_cpuWatcher=null;_groups;_sudoTimestamps=new Map;_loginFailures=new Map;_maxLoginFailures=5;_sudoTimestampWindowMs=300*1e3;_loginFailureTtlMs=3600*1e3;_scheduler;_schedulerEnabled=!1;initialize(){ze.mark("initialize"),this._groups.initialize(),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let n=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),n=!0),this._sudoers.add("root");let r="/root";this._vfs.exists(r)||(this._vfs.mkdir(r,493),this._vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&this.persist(),this.emit("initialized")}setQuotaBytes(n,r){if(ze.mark("setQuotaBytes"),t._validateUsername(n),!this._users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(n,Math.floor(r)),this.persist()}clearQuota(n){ze.mark("clearQuota"),t._validateUsername(n),this._quotas.delete(n),this.persist()}getQuotaBytes(n){return ze.mark("getQuotaBytes"),this._quotas.get(n)??null}getUsageBytes(n){ze.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this._vfs.exists(r)?this._vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){ze.mark("assertWriteWithinQuota");let i=this._quotas.get(n);if(i===void 0)return;let o=Ny(r),a=Ny(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this._vfs.exists(o)){let p=this._vfs.stat(o);p.type==="file"&&(u=p.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),f=l-u+d;if(f>i)throw new Error(`quota exceeded for '${n}': ${f}/${i} bytes`)}verifyPassword(n,r){ze.mark("verifyPassword");let s=this._users.get(n);if(!s)return t.hashPassword(r,""),!1;let i=t.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:c_(a,c)}catch{return i===o}}addUser(n,r){if(ze.mark("addUser"),t._validateUsername(n),t._validatePassword(r),this._users.has(n))return;let s=this._createRecord(n,r);this._users.set(n,s),this._autoSudoForNewUsers&&this._sudoers.add(n);let i=n;if(!this._groups.getGroup(i))try{this._groups.createGroup(i,s.gid),this._groups.addMember(i,n)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",n)}catch{}let o=s.uid,a=s.gid,c=n==="root"?"/root":`/home/${n}`;this._vfs.exists(c)||(n!=="root"&&!this._vfs.exists("/home")&&this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(c,448,0,0),this._vfs.chown(c,o,a,0),this._vfs.writeFile(`${c}/README.txt`,`Welcome to the virtual environment, ${n}`,{},o,a)),this.persist(),this.emit("user:add",{username:n})}ensureUser(n){if(this._users.has(n))return;if(n==="root"){this._users.set("root",this._createRecord("root",""));return}let r=this._createRecord(n,"");this._users.set(n,r),this._autoSudoForNewUsers&&this._sudoers.add(n);let s=n;if(!this._groups.getGroup(s))try{this._groups.createGroup(s,r.gid),this._groups.addMember(s,n)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",n)}catch{}let i=r.uid,o=r.gid,a=`/home/${n}`;if(this._vfs.exists(a))try{this._vfs.chown(a,i,o,0)}catch{}else this._vfs.exists("/home")||this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(a,448,0,0),this._vfs.chown(a,i,o,0);this._vfs.exists(`${a}/README.txt`)||this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${n}`,{},i,o),this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){ze.mark("getPasswordHash");let r=this._users.get(n);return r?r.passwordHash:null}setPassword(n,r){if(ze.mark("setPassword"),t._validateUsername(n),t._validatePassword(r),!this._users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this._users.set(n,this._createRecord(n,r)),this.persist()}deleteUser(n){if(ze.mark("deleteUser"),t._validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this._sudoers.delete(n);try{this._groups.removeMember("sudo",n)}catch{}let r=this._groups.getGroup(n);if(r&&r.members.length<=1)try{this._groups.deleteGroup(n)}catch{}else if(r)try{this._groups.removeMember(n,n)}catch{}this.emit("user:delete",{username:n}),this.persist()}isSudoer(n){return ze.mark("isSudoer"),this._sudoers.has(n)}addSudoer(n){if(ze.mark("addSudoer"),t._validateUsername(n),!this._users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this._sudoers.add(n);try{this._groups.addMember("sudo",n)}catch{}this.persist()}removeSudoer(n){if(ze.mark("removeSudoer"),t._validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(n);try{this._groups.removeMember("sudo",n)}catch{}this.persist()}registerSession(n,r){ze.mark("registerSession");let s={id:o_(),username:n,tty:`pts/${this._nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if(ze.mark("unregisterSession"),!n)return;let r=this._activeSessions.get(n);this._activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username,tty:r.tty})}updateSession(n,r,s){if(ze.mark("updateSession"),!n)return;let i=this._activeSessions.get(n);i&&this._activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return ze.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(n){return this._users.get(n)?.uid??0}getGid(n){return this._users.get(n)?.gid??0}getUsername(n){for(let[r,s]of this._users)if(s.uid===n)return r;return null}getGroupName(n){for(let[r,s]of this._users)if(s.gid===n)return r;return null}registerProcess(n,r,s,i,o,a=1,c=0){let l=this._nextPid++,u=Yt.niceToPriority(c);return this._activeProcesses.set(l,{pid:l,ppid:a,username:n,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0,nice:c,priority:u}),l}unregisterProcess(n){this._processCpuTime.delete(n),this._scheduler.removeProcess(n);let r=this._activeProcesses.get(n);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,n)),this._activeProcesses.delete(n)}markProcessDone(n){let r=this._activeProcesses.get(n);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,n),setTimeout(()=>this.unregisterProcess(n),5e3).unref?.())}listProcesses(){return Array.from(this._activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n,r=15){let s=this._activeProcesses.get(n);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,n),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,n),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,n),!0)}killAllUserProcesses(n,r=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===n&&this.killProcess(i,r)&&s++;return s}killProcessesByTty(n,r=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===n&&this.killProcess(i,r)&&s++;return s}getProcess(n){return this._activeProcesses.get(n)}setCpuCapCores(n){this._cpuCapCores=n,this._cpuBudgetMs=n>0?n*this._cpuWindowMs:0,n>0&&!this._cpuWatcher?this._startCpuWatcher():n===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(n){return this._processCpuTime.get(n)??0}addProcessCpuTime(n,r){let s=this._processCpuTime.get(n)??0;this._processCpuTime.set(n,s+r);let i=this._activeProcesses.get(n);if(i){let o=i.tty||"?",a=this._sessionCpuTime.get(o)??0;this._sessionCpuTime.set(o,a+r)}}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let n=Date.now(),r=n-this._cpuWindowStart;if(r>=this._cpuWindowMs){this._cpuWindowStart=n,this._processCpuTime.clear(),this._sessionCpuTime.clear();return}let s=new Set;for(let[,c]of this._activeProcesses)c.status==="running"&&c.tty&&s.add(c.tty);let i=Math.max(s.size,1),o=Math.ceil(this._cpuBudgetMs/i),a=new Map;for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=this._processCpuTime.get(c)??0,d=new Date(l.startedAt).getTime(),f=Math.min(n-d,r),p=Math.max(u,f),m=l.tty||"?";a.set(m,(a.get(m)??0)+p)}for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=l.tty||"?",d=a.get(u)??0;d>o&&(this.killProcess(c,9),this.emit("process:killed:cpu",{pid:c,command:l.command,cpuTime:d}))}}enableScheduler(n={}){this._scheduler=new Yt(n),this._schedulerEnabled=!0}disableScheduler(){this._schedulerEnabled=!1}isSchedulerEnabled(){return this._schedulerEnabled}getSchedulerStats(){return this._schedulerEnabled?this._scheduler.getStats():null}resetSchedulerStats(){this._scheduler.resetStats()}setProcessNice(n,r){if(!Yt.isValidNice(r))return!1;let s=this._activeProcesses.get(n);return s?(s.nice=r,s.priority=Yt.niceToPriority(r),this.emit("process:nice",{pid:n,nice:r,priority:s.priority}),!0):!1}getProcessNice(n){return this._activeProcesses.get(n)?.nice??0}getProcessPriority(n){return this._activeProcesses.get(n)?.priority??"normal"}getProcessTimeslice(n){let r=this._activeProcesses.get(n)?.nice??0;return this._scheduler.calculateTimeslice(r)}recordAndCheckThrottle(n,r){if(!this._schedulerEnabled)return!1;this._scheduler.recordCpuTime(n,r);let s=this._activeProcesses.get(n);if(!s||s.status!=="running")return!1;let i=this.listProcesses().filter(o=>o.status==="running").length;return this._scheduler.shouldThrottle(n,s.nice,i)}getSchedulerCpuTime(n){return this._scheduler.getProcessCpuTime(n)}removeProcessFromScheduler(n){this._scheduler.removeProcess(n)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let n=this._vfs.readFile(this._usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=11){let[o,a,c,l,u,d,f,p,m,h,g]=i;if(!(o&&l&&u))continue;let y=Number.parseInt(a??"1001",10),S=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:y,gid:S,salt:l,passwordHash:u,lastPasswordChange:Number.parseInt(d??"0",10),minPasswordAge:Number.parseInt(f??"0",10),maxPasswordAge:Number.parseInt(p??"99999",10),passwordWarnDays:Number.parseInt(m??"7",10),passwordInactiveDays:Number.parseInt(h??"0",10),accountExpiryDate:Number.parseInt(g??"0",10)})}else if(i.length>=5){let[o,a,c,l,u]=i;if(!(o&&l&&u))continue;let d=Number.parseInt(a??"1001",10),f=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:f,salt:l,passwordHash:u,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}else{let[o,a,c]=i;if(!(o&&a&&c))continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let n=this._vfs.readFile(this._sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let n=this._vfs.readFile(this._quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!(i&&Number.isFinite(a))||a<0||this._quotas.set(i,a)}}persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let n=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash,o.lastPasswordChange,o.minPasswordAge,o.maxPasswordAge,o.passwordWarnDays,o.passwordInactiveDays,o.accountExpiryDate].join(":")).join(`
`),r=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&this._vfs.flushMirror()}_writeIfChanged(n,r,s){return this._vfs.exists(n)&&this._vfs.readFile(n)===r?(this._vfs.chmod(n,s),!1):(this._vfs.writeFile(n,r,{mode:s}),!0)}_createRecord(n,r,s,i){let o=s??(n==="root"?0:this._nextUid++),a=i??(n==="root"?0:this._nextGid++),c=My("sha256").update(n).update(":").update(r).digest("hex"),l=t._recordCache.get(c);if(l)return{...l,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};let u=i_(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:t.hashPassword(r,u),lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};if(t._recordCache.set(c,d),t._recordCache.size>t._maxRecordCacheSize){let f=t._recordCache.keys().next().value;f&&t._recordCache.delete(f)}return d}hasPassword(n){ze.mark("hasPassword");let r=this._users.get(n);if(!r)return!1;let s=t.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}static hashPassword(n,r=""){return t._fastPasswordHash?My("sha256").update(r).update(n).digest("hex"):a_(n,r||"",32).toString("hex")}static _validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}static _validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(n,r,s){ze.mark("addAuthorizedKey");let i=this._authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this._authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this._authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this._authorizedKeys.get(n)??[]}createGroup(n,r){return this._groups.createGroup(n,r)}deleteGroup(n){this._groups.deleteGroup(n)}addGroupMember(n,r){this._groups.addMember(n,r)}removeGroupMember(n,r){this._groups.removeMember(n,r)}getGroup(n){return this._groups.getGroup(n)}getGroupByGid(n){return this._groups.getGroupByGid(n)}getGidByName(n){return this._groups.getGidByName(n)}getNameByGid(n){return this._groups.getNameByGid(n)}getUserSupplementaryGroups(n){return this._groups.getUserSupplementaryGroups(n)}getUserAllGroups(n){let r=this.getGid(n);return this._groups.getUserAllGroups(n,r)}isMemberOf(n,r){let s=this.getGid(n);return this._groups.isMemberOf(n,r,s)}listGroups(){return this._groups.listGroups()}generateGroupFile(){return this._groups.generateGroupFile()}setPasswordAging(n,r,s,i,o){let a=this._users.get(n);if(!a)throw new Error(`chage: user '${n}' does not exist`);r!==void 0&&(a.minPasswordAge=r),s!==void 0&&(a.maxPasswordAge=s),i!==void 0&&(a.passwordWarnDays=i),o!==void 0&&(a.passwordInactiveDays=o),this.persist()}getPasswordAging(n){let r=this._users.get(n);return r?{lastChange:r.lastPasswordChange,minAge:r.minPasswordAge,maxAge:r.maxPasswordAge,warnDays:r.passwordWarnDays,inactiveDays:r.passwordInactiveDays,expiryDate:r.accountExpiryDate}:null}setAccountExpiry(n,r){let s=this._users.get(n);if(!s)throw new Error(`chage: user '${n}' does not exist`);s.accountExpiryDate=r,this.persist()}forcePasswordChange(n){let r=this._users.get(n);if(!r)throw new Error(`chage: user '${n}' does not exist`);r.lastPasswordChange=0,this.persist()}isPasswordExpired(n){let r=this._users.get(n);return!r||r.maxPasswordAge===99999?!1:Math.floor(Date.now()/864e5)-r.lastPasswordChange>r.maxPasswordAge}lockAccount(n){let r=this._users.get(n);if(!r)throw new Error(`usermod: user '${n}' does not exist`);r.passwordHash.startsWith("!")||(r.passwordHash=`!${r.passwordHash}`,this.persist())}unlockAccount(n){let r=this._users.get(n);if(!r)throw new Error(`usermod: user '${n}' does not exist`);r.passwordHash.startsWith("!")&&(r.passwordHash=r.passwordHash.slice(1),this.persist())}isAccountLocked(n){return this._users.get(n)?.passwordHash.startsWith("!")??!1}generateShadowFile(){let r=[{name:"root",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"daemon",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"nobody",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"messagebus",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"_apt",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-network",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-resolve",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"polkitd",hash:"!",lastChange:19e3,min:0,max:99999,warn:7}].map(s=>`${s.name}:${s.hash}:${s.lastChange}:${s.min}:${s.max}:${s.warn}:::`);for(let s of this._users.values()){if(s.username==="root")continue;let i=s.passwordHash.startsWith("!")?"!":s.passwordHash;r.push(`${s.username}:${i}:${s.lastPasswordChange}:${s.minPasswordAge}:${s.maxPasswordAge}:${s.passwordWarnDays}:${s.passwordInactiveDays}:${s.accountExpiryDate}:`)}return r.join(`
`)}grantSudoTimestamp(n){this._sudoTimestamps.set(n,Date.now())}hasValidSudoTimestamp(n){if(n==="root")return!0;let r=this._sudoTimestamps.get(n);return r?Date.now()-r>=this._sudoTimestampWindowMs?(this._sudoTimestamps.delete(n),!1):!0:!1}clearSudoTimestamp(n){this._sudoTimestamps.delete(n)}recordLoginFailure(n,r){let s=Date.now();for(let[o,a]of this._loginFailures)s-a.lastTime>this._loginFailureTtlMs&&this._loginFailures.delete(o);let i=this._loginFailures.get(n);i?(i.count++,i.lastTime=s,i.sourceIp=r):this._loginFailures.set(n,{count:1,lastTime:s,sourceIp:r})}recordLoginSuccess(n){this._loginFailures.delete(n)}getLoginFailures(n){return this._loginFailures.get(n)?.count??0}resetLoginFailures(n){this._loginFailures.delete(n)}isAccountLockedByFailures(n){let r=this._loginFailures.get(n);return r?r.count>=this._maxLoginFailures:!1}getLastFailureTime(n){return this._loginFailures.get(n)?.lastTime??0}};function Ny(t){let e=Ay.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as d_}from"node:events";var hi=class t extends d_{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,n={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=n.idleThresholdMs??6e4,this._checkIntervalMs=n.checkIntervalMs??15e3,this._gcIntervalMs=n.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}_freeze(){this._state!=="frozen"&&(this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=sn(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=t._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=0;for(let s of n)s.status==="done"&&(e.unregisterProcess(s.pid),r++);return r}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=new Set(n.map(o=>o.pid)),s=0,i=t._getAllTrackedPids(e);for(let o of i)!r.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}static _getAllTrackedPids(e){return e.listProcesses().map(r=>r.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}static _forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};hs();import Uy from"node:path";re();Ke();import*as Ty from"node:path";function gi(t,e){let n=`${pe(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function yi(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${pe(e)}/.bash_history`,r)}function Si(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{let r=JSON.parse(t.readFile(n));if(typeof r!="object"||r===null)return null;let s=r;return typeof s.from!="string"||typeof s.timestamp!="number"?null:{from:s.from,at:new Date(s.timestamp).toISOString()}}catch{return null}}function bi(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function xi(t,e,n){let r=n.lastIndexOf("/"),s=r>=0?n.slice(0,r+1):"",i=r>=0?n.slice(r+1):n,o=U(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=Ty.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as p_}from"node:child_process";import{readFile as f_}from"node:fs/promises";function Oy(t){return`'${t.replace(/'/g,"'\\''")}'`}function Rn(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Ry(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function Dy(t){try{let n=(await f_(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>Dy(s)));return[...n,...r.flat()]}catch{return[]}}async function Fy(t=process.pid){let e=await Dy(t),n=Array.from(new Set(e)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function m_(t,e,n){let r=Ry(t,e),s=p_("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function Ly(t,e,n){return m_(`htop -p ${Oy(t)}`,e,n)}function By(t,e,n,r,s,i,o,a){let c="",l=0,u=gi(a.vfs,n),d=null,f="",p=pe(n),m=null,h=mt(n,r);if(s){let F=a.users.listActiveSessions().find(j=>j.id===s);F&&(h.vars.__TTY=F.tty)}let g=[],y=null,S=null,v=()=>{if(h.vars.PS1)return or(n,r,"",h.vars.PS1,p);let F=pe(n),j=p===F?"~":Uy.posix.basename(p)||"/";return or(n,r,j)},x=Array.from(new Set(vr())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`);let A=!1,I=async(F,j=!1)=>{if(a.vfs.exists(F))try{let W=a.vfs.readFile(F);for(let V of W.split(`
`)){let L=V.trim();if(!(!L||L.startsWith("#")))if(j){let H=L.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);H&&(h.vars[H[1]]=H[2])}else{let H=await ye(L,n,r,"shell",p,a,void 0,h);H.stdout&&e.write(H.stdout.replace(/\n/g,`\r
`))}}}catch{}},_=(async()=>{await I("/etc/environment",!0),await I(`${pe(n)}/.profile`),await I(`${pe(n)}/.bashrc`),A=!0})();function b(){let F=v();e.write(`\r\x1B[0m${F}${c}\x1B[K`);let j=c.length-l;j>0&&e.write(`\x1B[${j}D`)}function C(){e.write("\r\x1B[K")}function P(F){S={...F,buffer:""},C(),e.write(F.prompt)}async function T(F){if(!S)return;let j=S;if(S=null,!F){e.write(`\r
Sorry, try again.\r
`),b();return}if(!j.commandLine){n=j.targetUser,j.loginShell&&(p=pe(n)),a.users.updateSession(s,n,i),await Bt(n,r,p,h,a),e.write(`\r
`),b();return}let W=j.loginShell?pe(j.targetUser):p,V=await ye(j.commandLine,j.targetUser,r,"shell",W,a);if(e.write(`\r
`),V.openEditor){X(V.openEditor.targetPath,V.openEditor.initialContent);return}if(V.openHtop){await te();return}if(V.openPacman){$();return}V.clearScreen&&e.write("\x1B[2J\x1B[H"),V.stdout&&e.write(`${Rn(V.stdout)}\r
`),V.stderr&&e.write(`${Rn(V.stderr)}\r
`),V.switchUser?(g.push({authUser:n,cwd:p}),n=V.switchUser,p=V.nextCwd??pe(n),a.users.updateSession(s,n,i),await Bt(n,r,p,h,a)):V.nextCwd&&(p=V.nextCwd),b()}let R=-1;function G(F,j){if(F!==void 0&&j){let W=a.users.getUid(n),V=a.users.getGid(n);a.vfs.writeFile(j,F,{},W,V)}R!==-1&&(a.users.unregisterProcess(R),R=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),b()}function X(F,j){R=a.users.registerProcess(n,"nano",["nano",F],h.vars.__TTY??"?");let W=new sr({stream:e,terminalSize:o,content:j,filename:Uy.posix.basename(F),onExit:(V,L)=>{V==="saved"?G(L,F):G()}});y={kind:"nano",targetPath:F,editor:W},W.start()}async function te(){let F=await Fy();if(!F){e.write(`htop: no child_process processes to display\r
`);return}R=a.users.registerProcess(n,"htop",["htop"],h.vars.__TTY??"?");let j=Ly(F,o,e);j.on("error",W=>{e.write(`htop: ${W.message}\r
`),G()}),j.on("close",()=>{G()}),y={kind:"htop",process:j}}function $(){R=a.users.registerProcess(n,"pacman",["pacman"],h.vars.__TTY??"?");let F=new ir({stream:e,terminalSize:o,onExit:()=>{R!==-1&&(a.users.unregisterProcess(R),R=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),b()}});y={kind:"pacman",game:F},F.start()}function O(F){c=F,l=c.length,b()}function w(F){c=`${c.slice(0,l)}${F}${c.slice(l)}`,l+=F.length,b()}function D(F,j){let W=j;for(;W>0&&!/\s/.test(F.charAt(W-1));)W-=1;let V=j;for(;V<F.length&&!/\s/.test(F.charAt(V));)V+=1;return{start:W,end:V}}function z(){let{start:F,end:j}=D(c,l),W=c.slice(F,l);if(W.length===0)return;let L=c.slice(0,F).trim().length===0?x.filter(Y=>Y.startsWith(W)):[],H=xi(a.vfs,p,W),q=Array.from(new Set([...L,...H])).sort();if(q.length!==0){if(q.length===1){let Y=q[0],oe=Y.endsWith("/")?"":" ";c=`${c.slice(0,F)}${Y}${oe}${c.slice(j)}`,l=F+Y.length+oe.length,b();return}e.write(`\r
`),e.write(`${q.join("  ")}\r
`),b()}}function Z(F){F.length!==0&&(u.push(F),u.length>500&&(u=u.slice(u.length-500)),yi(a.vfs,n,u))}function J(){let F=Si(a.vfs,n);e.write(Ws(r,t,F)),bi(a.vfs,n,i)}J(),_.then(()=>b()),e.on("data",F=>{(async()=>{if(!A)return;if(y){y.kind==="nano"?y.editor.handleInput(F):y.kind==="pacman"?y.game.handleInput(F):y.process.stdin.write(F);return}if(m){let W=m,V=F.toString("utf8");for(let L=0;L<V.length;L++){let H=V.charAt(L);if(H===""){m=null,e.write(`^C\r
`),b();return}if(H==="\x7F"||H==="\b"){c=c.slice(0,-1),b();continue}if(H==="\r"||H===`
`){let q=c;if(c="",l=0,e.write(`\r
`),q===W.delimiter){let Y=W.lines.join(`
`),oe=W.cmdBefore;m=null,Z(`${oe} << ${W.delimiter}`);let ie=await ye(oe,n,r,"shell",p,a,Y,h);ie.stdout&&e.write(`${Rn(ie.stdout)}\r
`),ie.stderr&&e.write(`${Rn(ie.stderr)}\r
`),ie.nextCwd&&(p=ie.nextCwd),b();return}W.lines.push(q),e.write("> ");continue}(H>=" "||H==="	")&&(c+=H,e.write(H))}return}if(S){let W=F.toString("utf8");for(let V=0;V<W.length;V+=1){let L=W.charAt(V);if(L===""){S=null,e.write(`^C\r
`),b();return}if(L==="\x7F"||L==="\b"){S.buffer=S.buffer.slice(0,-1);continue}if(L==="\r"||L===`
`){let H=S.buffer;if(S.buffer="",S.onPassword){let{result:Y,nextPrompt:oe}=await S.onPassword(H,a);e.write(`\r
`),Y===null?(oe&&(S.prompt=oe),e.write(S.prompt)):(S=null,Y.stdout&&e.write(Y.stdout.replace(/\n/g,`\r
`)),Y.stderr&&e.write(Y.stderr.replace(/\n/g,`\r
`)),b());return}let q=a.users.verifyPassword(S.username,H);await T(q);return}L>=" "&&(S.buffer+=L)}return}let j=F.toString("utf8");for(let W=0;W<j.length;W+=1){let V=j.charAt(W);if(V===""){if(c="",l=0,d=null,f="",e.write(`logout\r
`),g.length>0){let L=g.pop();n=L.authUser,p=L.cwd,a.users.updateSession(s,n,i),h.vars.PS1=mt(n,r).vars.PS1??"",b()}else{e.exit(0),e.end();return}continue}if(V==="	"){z();continue}if(V==="\x1B"){let L=j[W+1],H=j[W+2],q=j[W+3];if(L==="["&&H){if(H==="A"){W+=2,u.length>0&&(d===null?(f=c,d=u.length-1):d>0&&(d-=1),O(u[d]??""));continue}if(H==="B"){W+=2,d!==null&&(d<u.length-1?(d+=1,O(u[d]??"")):(d=null,O(f)));continue}if(H==="C"){W+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(H==="D"){W+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(H==="3"&&q==="~"){W+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,b());continue}if(H==="1"&&q==="~"){W+=3,l=0,b();continue}if(H==="H"){W+=2,l=0,b();continue}if(H==="4"&&q==="~"){W+=3,l=c.length,b();continue}if(H==="F"){W+=2,l=c.length,b();continue}}if(L==="O"&&H){if(H==="H"){W+=2,l=0,b();continue}if(H==="F"){W+=2,l=c.length,b();continue}}}if(V===""){c="",l=0,d=null,f="",e.write(`^C\r
`),b();continue}if(V===""){l=0,b();continue}if(V===""){l=c.length,b();continue}if(V==="\v"){c=c.slice(0,l),b();continue}if(V===""){c=c.slice(l),l=0,b();continue}if(V===""){let L=l;for(;L>0&&c[L-1]===" ";)L--;for(;L>0&&c[L-1]!==" ";)L--;c=c.slice(0,L)+c.slice(l),l=L,b();continue}if(V==="\r"||V===`
`){let L=c.trim();if(c="",l=0,d=null,f="",e.write(`\r
`),L==="!!"||L.startsWith("!! ")||/\s!!$/.test(L)||/ !! /.test(L)){let q=u.length>0?u[u.length-1]:"";L=L==="!!"?q:L.replace(/!!/g,q)}else if(/(?:^|\s)!!/.test(L)){let q=u.length>0?u[u.length-1]:"";L=L.replace(/!!/g,q)}let H=L.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(H&&L.length>0){m={delimiter:H[2],lines:[],cmdBefore:H[1].trim()||"cat"},e.write("> ");continue}if(L.length>0){let q=await ye(L,n,r,"shell",p,a,void 0,h);if(Z(L),q.openEditor){X(q.openEditor.targetPath,q.openEditor.initialContent);return}if(q.openHtop){await te();return}if(q.openPacman){$();return}if(q.sudoChallenge){P(q.sudoChallenge);return}if(q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${Rn(q.stdout)}\r
`),q.stderr&&e.write(`${Rn(q.stderr)}\r
`),q.closeSession)if(e.write(`logout\r
`),g.length>0){let Y=g.pop();n=Y.authUser,p=Y.cwd,a.users.updateSession(s,n,i),h.vars.PS1=mt(n,r).vars.PS1??""}else{e.exit(q.exitCode??0),e.end();return}q.nextCwd&&!q.closeSession&&(p=q.nextCwd),q.switchUser&&(g.push({authUser:n,cwd:p}),n=q.switchUser,p=q.nextCwd??pe(n),h.vars.PWD=p,a.users.updateSession(s,n,i),await Bt(n,r,p,h,a),c="",l=0)}b();continue}if(V==="\x7F"||V==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,b());continue}w(V)}})().catch(j=>{console.error("shell data handler error:",j)})}),e.on("close",()=>{y&&(y.kind==="htop"?y.process.kill("SIGTERM"):y.kind==="pacman"&&y.game.stop(),y=null)})}function g_(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&zy(t.vfsInstance)}function zy(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var y_={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Hr=js("VirtualShell");function S_(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var vi=class extends h_{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,n,r,s){super(),Hr.mark("constructor"),this.hostname=e,this.properties=n||y_,this.startTime=Date.now(),this.sysctl=Sm(e,this.properties.kernel),this.resourceCaps=s??{},zy(r)?this.vfs=r:g_(r)?this.vfs=r.vfsInstance:this.vfs=new fi(r??{}),this.users=new mi(this.vfs,S_()),this.packageManager=new Dt(this.vfs,this.users),this.network=new _s;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,f=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),o.initialize(),Py(i,o,c,a,l,[],u,f),i.onBeforeRead("/proc",()=>{Gr(i,a,c,l,o.listActiveSessions(),u,f)}),i.registerContentResolver("/proc/sys",p=>{let m=tr(d,p);if(m){let h=m.value;return typeof h=="number"?`${h}
`:h.endsWith(`
`)?h:`${h}
`}return null}),i.onBeforeWrite("/proc/sys",(p,m)=>{let h=tr(d,p);if(h&&h.set(typeof m=="string"?m.trim():String(m)),p.includes("vm/ram_cap_bytes")){let g=Number(m);f.ramCapBytes=g>0?g:void 0,i.setRamCap(f.ramCapBytes??null)}if(p.includes("kernel/cpu_cap_cores")){let g=Number(m);f.cpuCapCores=g>0?g:void 0,o.setCpuCapCores(f.cpuCapCores??0)}}),f.ramCapBytes&&i.setRamCap(f.ramCapBytes),f.cpuCapCores&&o.setCpuCapCores(f.cpuCapCores),this.emit("initialized")})()}ensureInitialized(){return Hr.mark("ensureInitialized"),this._initialized}addCommand(e,n,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");Ji(Qi(s,n,r))}executeCommand(e,n,r){Hr.mark("executeCommand"),this._idle?.ping();let s=ye(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),s}startInteractiveSession(e,n,r,s,i){Hr.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),By(this.properties,e,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){Gr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Gr(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){va(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Hr.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new hi(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",n=>this.emit("gc:run",n)),this._idle.start())}disableIdleManagement(){this._idle&&(this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function qr(t,e){return t.includes(e)}function _a(t,e,n){let r=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(r))return i.slice(r.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:n}}return n}var Kt=process.argv.slice(2);(qr(Kt,"--version")||qr(Kt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(qr(Kt,"--help")||qr(Kt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function v_(){for(let t=0;t<Kt.length;t+=1){let e=Kt[t];if(e==="--user"){let n=Kt[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var it=_a(Kt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),C_=_a(Kt,"--snapshot",".vfs"),__=v_();console.clear();var he=new vi(it,void 0,{mode:"fs",snapshotPath:C_});function dn(){he.vfs.stopAutoFlush()}function w_(t){let e=Array.from(new Set(vr())).sort();return(n,r)=>{let{cwd:s}=t(),i=n.split(/\s+/).at(-1)??"",a=n.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=xi(he.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();r(null,[l,i])}}function Yr(t,e){return new Promise(n=>{if(!(Ce.isTTY&&ve.isTTY)){t.question(e,n);return}let r=!!Ce.isRaw,s="",i=()=>{Ce.off("data",a),r||Ce.setRawMode(!1)},o=c=>{i(),ve.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ve.write(e),r||Ce.setRawMode(!0),Ce.resume(),Ce.on("data",a)})}function I_(t,e,n,r){let s=t,i=e;return n.switchUser?(s=n.switchUser,i=n.nextCwd??pe(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=pe(s),r.vars.PWD=i):n.nextCwd&&(i=n.nextCwd,r.vars.PWD=i),{authUser:s,cwd:i}}he.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function E_(){await he.ensureInitialized();let t=__.trim()||"root";he.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":pe(t);he.vfs.exists(e)||he.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;he.vfs.exists(n)||(he.vfs.writeFile(n,`Welcome to ${it}
`),he.vfs.stopAutoFlush());let r=mt(t,it),s=t,i=pe(s);r.vars.PWD=i;let o=[],a="localhost",c={cols:ve.columns??80,rows:ve.rows??24};process.on("SIGWINCH",()=>{c.cols=ve.columns??c.cols,c.rows=ve.rows??c.rows});let l=gi(he.vfs,s),u=x_({input:Ce,output:ve,terminal:!0,completer:w_(()=>({cwd:i}))}),d=u;"history"in d&&(d.history=[...l].reverse());{let x=u,A=x._ttyWrite;if(A===void 0)return;let I=A.bind(u);x._ttyWrite=(_,b)=>{let C=x.line;if(b?.ctrl&&b?.name==="d"&&C===""&&o.length>0){ve.write(`^D
`);let P=o.pop();if(P===void 0)return;s=P.authUser,i=P.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=pe(s),r.vars.PWD=i,r.vars.PS1=mt(s,it).vars.PS1??"",ve.write(`logout
`),dn(),S();return}I(_,b)}}function f(x,A){return new Promise(I=>{let _={write:$=>{ve.write($)},exit:()=>{},end:()=>{},on:()=>{}},b={cols:ve.columns??80,rows:ve.rows??24},C=Ce.listeners("data");for(let $ of C)Ce.off("data",$);let P=Ce.listeners("keypress");for(let $ of P)Ce.off("keypress",$);function T(){process.off("SIGWINCH",X),process.off("SIGINT",R),Ce.off("data",te);for(let $ of C)Ce.on("data",$);for(let $ of P)Ce.on("keypress",$);ve.write("\x1B[?25h\x1B[0m"),u.resume()}let R=()=>{},G=new sr({stream:_,terminalSize:b,content:A,filename:jy.posix.basename(x),onSave:$=>{let O=he.users.getUid(s),w=he.users.getGid(s);he.vfs.writeFile(x,$,{},O,w),dn()},onExit:($,O)=>{if(T(),$==="saved"){let w=he.users.getUid(s),D=he.users.getGid(s);he.vfs.writeFile(x,O,{},w,D),dn()}I()}}),X=()=>{G.resize({cols:ve.columns??b.cols,rows:ve.rows??b.rows})},te=$=>{G.handleInput($)};Ce.setRawMode(!0),Ce.resume(),Ce.on("data",te),process.on("SIGWINCH",X),process.on("SIGINT",R),G.start()})}function p(){return new Promise(x=>{let A={write:X=>{ve.write(X)},exit:()=>{},end:()=>{},on:()=>{}},I={cols:ve.columns??80,rows:ve.rows??24},_=Ce.listeners("data");for(let X of _)Ce.off("data",X);let b=Ce.listeners("keypress");for(let X of b)Ce.off("keypress",X);function C(){process.off("SIGWINCH",R),process.off("SIGINT",G),Ce.off("data",T);for(let X of _)Ce.on("data",X);for(let X of b)Ce.on("keypress",X);ve.write("\x1B[?25h\x1B[0m"),u.resume(),x()}Ce.isTTY&&Ce.setRawMode(!0),Ce.resume();let P=new ir({stream:A,terminalSize:I,onExit:C});function T(X){P.handleInput(X)}function R(){}function G(){P.stop(),C()}Ce.on("data",T),process.on("SIGWINCH",R),process.on("SIGINT",G),P.start()})}async function m(x){if(x.onPassword){let b=x.prompt;for(;;){let C=await Yr(u,b),P=await x.onPassword(C,he);if(P.result===null){b=P.nextPrompt??b;continue}await g(P.result);return}}let A=await Yr(u,x.prompt);if(!he.users.verifyPassword(x.username,A)){process.stderr.write(`Sorry, try again.
`);return}if(!x.commandLine){o.push({authUser:s,cwd:i}),s=x.targetUser,i=pe(s),r.vars.PWD=i,await Bt(s,it,i,r,he);return}let I=x.loginShell?pe(x.targetUser):i,_=await ye(x.commandLine,x.targetUser,it,"shell",I,he,void 0,r);await g(_)}async function h(x){let A=await Yr(u,x.prompt);if(x.confirmPrompt&&await Yr(u,x.confirmPrompt)!==A){process.stderr.write(`passwords do not match
`);return}switch(x.action){case"passwd":he.users.setPassword(x.targetUsername,A),ve.write(`passwd: password updated successfully
`);break;case"adduser":if(!x.newUsername){process.stderr.write(`adduser: missing username
`);return}he.users.addUser(x.newUsername,A),ve.write(`adduser: user '${x.newUsername}' created
`);break;case"deluser":he.users.deleteUser(x.targetUsername),ve.write(`Removing user '${x.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=x.targetUsername,i=pe(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=pe(s),r.vars.PWD=i;break;default:break}}async function g(x){if(x.openEditor){await f(x.openEditor.targetPath,x.openEditor.initialContent),S();return}if(x.openPacman){await p(),S();return}if(x.sudoChallenge){await m(x.sudoChallenge);return}if(x.passwordChallenge){await h(x.passwordChallenge);return}x.clearScreen&&(ve.write("\x1B[2J\x1B[H"),console.clear()),x.stdout&&ve.write(x.stdout.endsWith(`
`)?x.stdout:`${x.stdout}
`),x.stderr&&process.stderr.write(x.stderr.endsWith(`
`)?x.stderr:`${x.stderr}
`),x.switchUser&&o.push({authUser:s,cwd:i});let A=I_(s,i,x,r);if(s=A.authUser,i=A.cwd,x.switchUser&&await Bt(s,it,i,r,he),x.closeSession){dn();let I=o.pop();I===void 0?(u.close(),process.exit(x.exitCode??0)):(s=I.authUser,i=I.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=pe(s),r.vars.PWD=i,r.vars.PS1=mt(s,it).vars.PS1??"",ve.write(`logout
`))}}let y=()=>{if(r.vars.PS1)return or(s,it,"",r.vars.PS1,i,!0);let x=i===pe(s)?"~":b_(i)||"/";return or(s,it,x,void 0,void 0,!0)},S=()=>{u.setPrompt(y()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&he.users.hasPassword(s)){let x=await Yr(u,`Password for ${s}: `);he.users.verifyPassword(s,x)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ve.write(Ws(it,he.properties,Si(he.vfs,s))),bi(he.vfs,s,a);for(let x of["/etc/environment",`${pe(s)}/.profile`,`${pe(s)}/.bashrc`])if(he.vfs.exists(x))for(let A of he.vfs.readFile(x).split(`
`)){let I=A.trim();if(!(!I||I.startsWith("#")))try{let _=await ye(I,s,it,"shell",i,he,void 0,r);_.stdout&&ve.write(_.stdout)}catch{}}dn();let v=!1;u.on("line",async x=>{if(v)return;v=!0,u.pause(),x.trim().length>0&&(l.at(-1)!==x&&(l.push(x),l.length>500&&(l=l.slice(l.length-500)),yi(he.vfs,s,l)),d.history=[...l].reverse());let I=await ye(x,s,it,"shell",i,he,void 0,r);await g(I),dn(),v=!1,u.resume(),S()}),u.on("SIGINT",()=>{ve.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),S()}),u.on("close",()=>{let x=o.pop();x===void 0?(dn(),console.log(""),process.exit(0)):(s=x.authUser,dn(),ve.write(`logout
`),process.exit(0))}),S()}E_().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Wy=!1;function $_(t){if(!Wy){Wy=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{he.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{$_("SIGTERM")});process.on("beforeExit",()=>{he.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
