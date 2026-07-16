#!/usr/bin/env node
var Ao=Object.defineProperty;var ib=Object.getOwnPropertyDescriptor;var ob=Object.getOwnPropertyNames;var ab=Object.prototype.hasOwnProperty;var ft=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,n)=>(typeof require<"u"?require:e)[n]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var k=(t,e,n)=>()=>{if(n)throw n[0];try{return t&&(e=t(t=0)),e}catch(r){throw n=[r],r}};var cb=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(n){throw e=0,n}},Us=(t,e)=>{for(var n in e)Ao(t,n,{get:e[n],enumerable:!0})},lb=(t,e,n,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of ob(e))!ab.call(t,s)&&s!==n&&Ao(t,s,{get:()=>e[s],enumerable:!(r=ib(e,s))||r.enumerable});return t};var ub=t=>lb(Ao({},"__esModule",{value:!0}),t);var el,tl=k(()=>{"use strict";el={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(r))return{stderr:`adduser: user '${r}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:r,targetUser:r,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:(a,c)=>{if(i==="new")return a.length<1?Promise.resolve({result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}):(s=a,i="retype",Promise.resolve({result:null,nextPrompt:"Retype new password: "}));if(a!==s)return Promise.resolve({result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}});c.users.addUser(r,s);let l=c.users.getGid(r);return Promise.resolve({result:{stdout:`${[`Adding user '${r}' ...`,`Adding new group '${r}' (${l}) ...`,`Adding new user '${r}' (${l}) with group '${r}' ...`,`Creating home directory '/home/${r}' ...`,`passwd: password set for '${r}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})}},exitCode:0}}}});function nl(t){return Array.isArray(t)?t:[t]}function Bs(t,e){if(t===e)return{matched:!0,inlineValue:null};let n=`${e}=`;return t.startsWith(n)?{matched:!0,inlineValue:t.slice(n.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function db(t,e={}){let n=new Set(e.flags??[]),r=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of n){let{matched:u}=Bs(a,l);if(u){c=!0;break}}if(!c){for(let l of r){let u=Bs(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function M(t,e){let n=nl(e);for(let r of t)for(let s of n)if(Bs(r,s).matched)return!0;return!1}function Tn(t,e){let n=nl(e);for(let r=0;r<t.length;r+=1){let s=t[r];for(let i of n){let o=Bs(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[r+1];return a!==void 0&&a!=="--"?a:!0}}}function hn(t,e,n={}){return db(t,n)[e]}function Me(t,e={}){let n=new Set,r=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){n.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(r.set(l,d),c+=1):r.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){r.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:n,flagsWithValues:r,positionals:s}}var ee=k(()=>{"use strict"});var rl,sl,il=k(()=>{"use strict";ee();rl={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let n=[];for(let r of t){let s=r.indexOf("=");if(s===-1){let i=e.vars[`__alias_${r}`];if(i)n.push(`alias ${r}='${i}'`);else return{stderr:`alias: ${r}: not found`,exitCode:1}}else{let i=r.slice(0,s),o=r.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:n.join(`
`)||void 0,exitCode:0}}},sl={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(M(t,["-a"])){for(let n of Object.keys(e.vars))n.startsWith("__alias_")&&delete e.vars[n];return{exitCode:0}}for(let n of t)delete e.vars[`__alias_${n}`];return{exitCode:0}}}});var ol,al=k(()=>{"use strict";gn();ol={name:"builtin",description:"Run a shell builtin (skip shell functions and aliases)",category:"shell",params:["<builtin> [args...]"],run:({args:t,authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(t.length===0)return{stderr:"builtin: missing argument",exitCode:1};let u=t[0]?.toLowerCase()??"",d=Xe(u);return d?d.run({authUser:e,uid:n,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:t.join(" "),mode:i,args:t.slice(1),stdin:c,cwd:o,shell:a,env:l}):{stderr:`builtin: ${u}: not a shell builtin`,exitCode:1}}}});var To,fb,pb,Jt,Oo=k(()=>{"use strict";To=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],fb=new Map(To.map(t=>[t.name.toLowerCase(),t])),pb=To.slice().sort((t,e)=>t.name.localeCompare(e.name)),Jt=class t{constructor(e,n){this._vfs=e;this._users=n}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let n=e.split(/\n\n+/);for(let r of n){if(!r.trim())continue;let s=t._parseFields(r),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let n of this._installed.values())e.push([`Package: ${n.name}`,"Status: install ok installed","Priority: optional",`Section: ${n.section}`,`Installed-Size: ${n.installedSizeKb}`,`Maintainer: ${n.maintainer}`,`Architecture: ${n.architecture}`,`Version: ${n.version}`,`Description: ${n.description}`,`X-Installed-At: ${n.installedAt}`,`X-Files: ${n.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}static _parseFields(e){let n={};for(let r of e.split(`
`)){let s=r.indexOf(": ");s!==-1&&(n[r.slice(0,s)]=r.slice(s+2))}return n}_log(e){let r=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+r)}_aptLog(e,n){let r=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${r}`,`Commandline: apt-get ${e} ${n.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${n.join(", ")}`,`End-Date: ${r}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}static findInRegistry(e){return fb.get(e.toLowerCase())}static listAvailable(){return pb}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,n)=>e.name.localeCompare(n.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,n={}){this._ensureLoaded();let r=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=t.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){n.quiet||(r.push(`Selecting previously unselected package ${c.name}.`),r.push("(Reading database ... 12345 files and directories currently installed.)"),r.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),r.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),n.quiet||r.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),n.quiet||r.push("Processing triggers for man-db (2.11.2-2) ..."),{output:r.join(`
`),exitCode:0}}remove(e,n={}){this._ensureLoaded();let r=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):r.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:r.join(`
`)||"Nothing to remove.",exitCode:0};n.quiet||r.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){n.quiet||r.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!n.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}t.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:r.join(`
`),exitCode:0}}static search(e){let n=e.toLowerCase();return To.filter(r=>r.name.includes(n)||r.description.toLowerCase().includes(n)||(r.shortDesc??"").toLowerCase().includes(n)).sort((r,s)=>r.name.localeCompare(s.name))}show(e){this._ensureLoaded();let n=t.findInRegistry(e);if(!n)return null;let r=this._installed.get(e);return[`Package: ${n.name}`,`Version: ${n.version}`,`Architecture: ${n.architecture??"amd64"}`,`Maintainer: ${n.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${n.installedSizeKb??0}`,`Depends: ${(n.depends??[]).join(", ")||"(none)"}`,`Section: ${n.section??"misc"}`,"Priority: optional",`Description: ${n.description}`,`Status: ${r?"install ok installed":"install ok not-installed"}`].join(`
`)}}});import*as Mt from"node:path";function B(t,e,n){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let r=n??"/root";return Mt.posix.normalize(`${r}${e.slice(1)}`)}return e.startsWith("/")?Mt.posix.normalize(e):Mt.posix.normalize(Mt.posix.join(t,e))}function hb(t){let e=t.startsWith("/")?Mt.posix.normalize(t):Mt.posix.normalize(`/${t}`);return mb.some(n=>e===n||e.startsWith(`${n}/`))}function be(t,e,n){if(t!=="root"&&hb(e))throw new Error(`${n}: permission denied: ${e}`)}function cl(t){let n=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return n&&n.length>0?n:"index.html"}function gb(t,e){let n=t.length,r=e.length,s=Array.from({length:n+1},()=>new Array(r+1).fill(0));for(let o=0;o<=n;o++){let a=s[o];a[0]=o}for(let o=0;o<=r;o++){let a=s[0];a[o]=o}for(let o=1;o<=n;o++){let a=s[o],c=s[o-1];for(let l=1;l<=r;l++){let u=t[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[n][r]}function ll(t,e,n){let r=B(e,n);if(t.exists(r))return r;let s=Mt.posix.dirname(r),i=Mt.posix.basename(r),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return Mt.posix.join(s,a[0]);let c=o.filter(l=>gb(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?Mt.posix.join(s,c[0]):r}function rr(t){return t.packageManager}function Qe(t,e,n,r,s){if(n==="root"||s===0)return;be(n,r,"access");let i=e.getUid(n),o=e.getGid(n);if(!t.checkAccess(r,i,o,s)){let a=t.stat(r).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var mb,ae=k(()=>{"use strict";mb=["/.virtual-env-js/.auth","/etc/htpasswd"]});var ul,dl,fl=k(()=>{"use strict";Oo();ee();ae();ul={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:n})=>{let r=rr(e);if(!r)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=M(i,["-q","--quiet","-qq"]),a=M(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&n!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=r.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=Jt.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64
  ${p.shortDesc??p.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(M(i,["--installed"])){let p=r.listInstalled();return p.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${p.map(m=>`${m.name}/${m.section} ${m.version} ${m.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${Jt.listAvailable().map(p=>`${p.name}/${p.section??"misc"} ${p.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},dl={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let n=rr(e);if(!n)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let r=t[0]?.toLowerCase(),s=t[1];switch(r){case"search":return s?{stdout:Jt.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=n.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=Jt.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=n.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${r??""}'`,exitCode:1}}}}});var pl,ml=k(()=>{"use strict";ae();pl={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:n,cwd:r,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let E=e[c];if(E==="-F")i=e[++c]??" ",c++;else if(E.startsWith("-F"))i=E.slice(2),c++;else if(E==="-v"){let A=e[++c]??"",I=A.indexOf("=");I!==-1&&(o[A.slice(0,I)]=A.slice(I+1)),c++}else if(E.startsWith("-v")){let A=E.slice(2),I=A.indexOf("=");I!==-1&&(o[A.slice(0,I)]=A.slice(I+1)),c++}else a.push(E),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=n??"";if(u){let E=B(r,u);try{be(t,E,"awk"),d=s.vfs.readFile(E)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function f(E){if(E===void 0||E==="")return 0;let A=Number(E);return Number.isNaN(A)?0:A}function p(E){return E===void 0?"":String(E)}function h(E,A){return A===" "?E.trim().split(/\s+/).filter(Boolean):A.length===1?E.split(A):E.split(new RegExp(A))}function m(E,A,I,D,z){if(E=E.trim(),E==="")return"";if(E.startsWith('"')&&E.endsWith('"'))return E.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(E))return Number.parseFloat(E);if(E==="$0")return I.join(i===" "?" ":i)||"";if(E==="$NF")return I[z-1]??"";if(/^\$\d+$/.test(E))return I[Number.parseInt(E.slice(1),10)-1]??"";if(/^\$/.test(E)){let q=E.slice(1),K=f(m(q,A,I,D,z));return K===0?I.join(i===" "?" ":i)||"":I[K-1]??""}if(E==="NR")return D;if(E==="NF")return z;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(E))return A[E]??"";let Z=E.match(/^length\s*\(([^)]*)\)$/);if(Z)return p(m(Z[1].trim(),A,I,D,z)).length;let J=E.match(/^substr\s*\((.+)\)$/);if(J){let q=g(J[1]),K=p(m(q[0]?.trim()??"",A,I,D,z)),se=f(m(q[1]?.trim()??"1",A,I,D,z))-1,re=q[2]===void 0?void 0:f(m(q[2].trim(),A,I,D,z));return re===void 0?K.slice(Math.max(0,se)):K.slice(Math.max(0,se),se+re)}let F=E.match(/^index\s*\((.+)\)$/);if(F){let q=g(F[1]),K=p(m(q[0]?.trim()??"",A,I,D,z)),se=p(m(q[1]?.trim()??"",A,I,D,z));return K.indexOf(se)+1}let j=E.match(/^tolower\s*\((.+)\)$/);if(j)return p(m(j[1].trim(),A,I,D,z)).toLowerCase();let L=E.match(/^toupper\s*\((.+)\)$/);if(L)return p(m(L[1].trim(),A,I,D,z)).toUpperCase();let G=E.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(G){let q=p(m(G[1].trim(),A,I,D,z));try{let K=q.match(new RegExp(G[2]));if(K)return A.RSTART=(K.index??0)+1,A.RLENGTH=K[0].length,(K.index??0)+1}catch{}return A.RSTART=0,A.RLENGTH=-1,0}let U=E.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(U){let q=m(U[1].trim(),A,I,D,z);return f(q)!==0||typeof q=="string"&&q!==""?m(U[2].trim(),A,I,D,z):m(U[3].trim(),A,I,D,z)}let H=E.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(H)return p(m(H[1],A,I,D,z))+p(m(H[2],A,I,D,z));try{let q=E.replace(/\bNR\b/g,String(D)).replace(/\bNF\b/g,String(z)).replace(/\$NF\b/g,String(z>0?f(I[z-1]):0)).replace(/\$(\d+)/g,(se,re)=>String(f(I[Number.parseInt(re,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(se,re)=>String(f(A[re]))),K=Function(`"use strict"; return (${q});`)();if(typeof K=="number"||typeof K=="boolean")return Number(K)}catch{}return p(A[E]??E)}function g(E){let A=[],I="",D=0;for(let z=0;z<E.length;z++){let Z=E.charAt(z);if(Z==="(")D++;else if(Z===")")D--;else if(Z===","&&D===0){A.push(I),I="";continue}I+=Z}return A.push(I),A}function y(E,A,I,D,z,Z){if(E=E.trim(),!E||E.startsWith("#"))return"ok";if(E==="next")return"next";if(E==="exit"||E.startsWith("exit "))return"exit";if(E==="print"||E==="print $0")return Z.push(I.join(i===" "?" ":i)),"ok";if(E.startsWith("printf ")){let U=E.slice(7).trim();return Z.push(v(U,A,I,D,z)),"ok"}if(E.startsWith("print ")){let U=E.slice(6),H=g(U);return Z.push(H.map(q=>p(m(q.trim(),A,I,D,z))).join("	")),"ok"}if(E.startsWith("delete ")){let U=E.slice(7).trim();return delete A[U],"ok"}let J=E.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(J){let U=J[1]==="gsub",H=J[2],q=E.slice(J[0].length).replace(/^\s*,\s*/,""),K=g(q.replace(/\)\s*$/,"")),se=p(m(K[0]?.trim()??'""',A,I,D,z)),re=K[1]?.trim(),ve=I.join(i===" "?" ":i);try{let Fe=new RegExp(H,U?"g":"");if(re&&/^\$\d+$/.test(re)){let Ae=Number.parseInt(re.slice(1),10)-1;Ae>=0&&Ae<I.length&&(I[Ae]=(I[Ae]??"").replace(Fe,se))}else{let Ae=ve.replace(Fe,se),je=h(Ae,i);I.splice(0,I.length,...je)}}catch{}return"ok"}let F=E.match(/^split\s*\((.+)\)$/);if(F){let U=g(F[1]),H=p(m(U[0]?.trim()??"",A,I,D,z)),q=U[1]?.trim()??"arr",K=U[2]?p(m(U[2].trim(),A,I,D,z)):i,se=h(H,K);for(let re=0;re<se.length;re++)A[`${q}[${re+1}]`]=se[re]??"";return A[q]=String(se.length),"ok"}let j=E.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(j)return A[j[1]]=f(A[j[1]])+(j[2]==="++"?1:-1),"ok";let L=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(L){let U=f(A[L[1]]),H=f(m(L[3],A,I,D,z)),q=L[2],K=U;return q==="+="?K=U+H:q==="-="?K=U-H:q==="*="?K=U*H:q==="/="?K=H===0?0:U/H:q==="%="&&(K=U%H),A[L[1]]=K,"ok"}let G=E.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return G?(A[G[1]]=m(G[2],A,I,D,z),"ok"):(m(E,A,I,D,z),"ok")}function v(E,A,I,D,z){let Z=g(E),J=p(m(Z[0]?.trim()??'""',A,I,D,z)),F=Z.slice(1).map(L=>m(L.trim(),A,I,D,z)),j=0;return J.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(L,G,U)=>{if(U==="%")return"%";let H=F[j++],q=G?Number.parseInt(G,10):0,K="";return U==="d"||U==="i"?K=String(Math.trunc(f(H))):U==="f"?K=f(H).toFixed(G?.includes(".")?Number.parseInt(G.split(".")[1]??"6",10):6):U==="s"||U==="q"?K=p(H):U==="x"?K=Math.trunc(f(H)).toString(16):U==="X"?K=Math.trunc(f(H)).toString(16).toUpperCase():U==="o"?K=Math.trunc(f(H)).toString(8):K=p(H),q>0&&K.length<q?K=K.padStart(q):q<0&&K.length<-q&&(K=K.padEnd(-q)),K})}let x=[],b=l.trim();{let E=0;for(;E<b.length;){for(;E<b.length&&/\s/.test(b.charAt(E));)E++;if(E>=b.length)break;let A="";for(;E<b.length&&b[E]!=="{";)A+=b[E++];if(A=A.trim(),b[E]!=="{"){A&&x.push({pattern:A,action:"print $0"});break}E++;let I="",D=1;for(;E<b.length&&D>0;){let z=b.charAt(E);if(z==="{")D++;else if(z==="}"&&(D--,D===0)){E++;break}I+=z,E++}x.push({pattern:A,action:I.trim()})}}x.length===0&&x.push({pattern:"",action:b.replace(/[{}]/g,"").trim()});let P=[],_={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},w=x.filter(E=>E.pattern==="BEGIN"),S=x.filter(E=>E.pattern==="END"),C=x.filter(E=>E.pattern!=="BEGIN"&&E.pattern!=="END");function $(E,A,I,D){let z=N(E);for(let Z of z){let J=y(Z,_,A,I,D,P);if(J!=="ok")return J}return"ok"}function N(E){let A=[],I="",D=0,z=!1,Z="";for(let J=0;J<E.length;J++){let F=E.charAt(J);if(!z&&(F==='"'||F==="'")){z=!0,Z=F,I+=F;continue}if(z&&F===Z){z=!1,I+=F;continue}if(z){I+=F;continue}F==="("||F==="["?D++:(F===")"||F==="]")&&D--,(F===";"||F===`
`)&&D===0?(I.trim()&&A.push(I.trim()),I=""):I+=F}return I.trim()&&A.push(I.trim()),A}function R(E,A,I,D,z){if(!E||E==="1")return!0;if(/^-?\d+$/.test(E))return f(E)!==0;if(E.startsWith("/")&&E.endsWith("/"))try{return new RegExp(E.slice(1,-1)).test(A)}catch{return!1}let Z=E.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let j=f(m(Z[1].trim(),_,I,D,z)),L=f(m(Z[3].trim(),_,I,D,z));switch(Z[2]){case"==":return j===L;case"!=":return j!==L;case">":return j>L;case">=":return j>=L;case"<":return j<L;case"<=":return j<=L;default:return!1}}let J=E.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(J){let j=p(m(`$${J[1]}`,_,I,D,z));try{return new RegExp(J[2]).test(j)}catch{return!1}}let F=m(E,_,I,D,z);return f(F)!==0||typeof F=="string"&&F!==""}for(let E of w)$(E.action,[],0,0);let W=d.split(`
`);W[W.length-1]===""&&W.pop();let Y=!1;for(let E=0;E<W.length&&!Y;E++){let A=W[E];_.NR=E+1;let I=h(A,i);_.NF=I.length;let D=E+1,z=I.length;for(let Z of C){if(!R(Z.pattern,A,I,D,z))continue;let J=$(Z.action,I,D,z);if(J==="next")break;if(J==="exit"){Y=!0;break}}}for(let E of S)$(E.action,[],f(_.NR),0);let Q=P.join(`
`);return{stdout:Q+(Q&&!Q.endsWith(`
`)?`
`:""),exitCode:0}}}});var hl,gl=k(()=>{"use strict";ee();hl={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let n=M(t,["-d","--decode"]),r=e??"";if(n)try{return{stdout:Buffer.from(r.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(r).toString("base64"),exitCode:0}}}});var yl,Sl,bl=k(()=>{"use strict";yl={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],n=t[0]==="-a"?t.slice(1):[t[0]],r=t[0]==="-a"?void 0:t[1];for(let s of n){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;r&&i.endsWith(r)&&(i=i.slice(0,-r.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Sl={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),n=e.lastIndexOf("/");return{stdout:n<=0?n===0?"/":".":e.slice(0,n),exitCode:0}}}});function yb(t,e){let n=t[e],r=e+2,s=t.indexOf(")",r);if(s===-1)return{re:`\\${n}\\(`,end:e+1};let i=t.slice(r,s),o=Ro(i,!1);switch(n){case"?":return{re:`(?:${o})?`,end:s};case"*":return{re:`(?:${o})*`,end:s};case"+":return{re:`(?:${o})+`,end:s};case"@":return{re:`(?:${o})`,end:s};case"!":return{re:`(?:(?!${o}).)`,end:s};default:return{re:`\\${n}\\(`,end:e+1}}}function Ro(t,e){let n=e?"^":"";for(let r=0;r<t.length;r++){let s=t.charAt(r);if((s==="?"||s==="*"||s==="+"||s==="@"||s==="!")&&t[r+1]==="("){let{re:i,end:o}=yb(t,r);n+=i,r=o;continue}if(s==="*"){if(t[r+1]==="*"){n+=".*",r++,t[r+1]==="/"&&r++;continue}n+="[^/]*";continue}if(s==="?"){n+="[^/]";continue}if(s==="["){let i=t.indexOf("]",r+1);if(i===-1)n+="\\[";else{let o=t.slice(r+1,i);o.startsWith("!")&&(o=`^${o.slice(1)}`),n+=`[${o}]`,r=i}continue}n+=s.replace(/[.+^${}()|[\]\\]/g,"\\$&")}return e&&(n+="$"),n}function Ws(t,e=""){let n=`${e}:${t}`,r=zs.get(n);if(r)return r;let s=new RegExp(Ro(t,!0),e);return zs.set(n,s),s}function On(t,e,n,r=!1){let s=`shell:${e}:${n?"g":"s"}:${r?"G":""}:${t}`,i=zs.get(s);if(i)return i;let o=Ro(t,!1);n||(o=o.replace(/\\.\*/g,"[^/]*"));let a=e==="prefix"?`^${o}`:e==="suffix"?`${o}$`:o;return i=new RegExp(a,r?"g":""),zs.set(s,i),i}var zs,Do=k(()=>{"use strict";zs=new Map});function Sb(t,e){let n=[],r=0;for(;r<t.length;){let s=t.charAt(r);if(/\s/.test(s)){r++;continue}if(s==="+"){if(t[r+1]==="+"){r+=2;continue}n.push({type:"plus"}),r++;continue}if(s==="-"){if(t[r+1]==="-"){r+=2;continue}n.push({type:"minus"}),r++;continue}if(s==="*"){if(t[r+1]==="="){n.push({type:"assign"}),r+=2;continue}if(t[r+1]==="*"){n.push({type:"pow"}),r+=2;continue}n.push({type:"mul"}),r++;continue}if(s==="/"){n.push({type:"div"}),r++;continue}if(s==="%"){n.push({type:"mod"}),r++;continue}if(s==="("){n.push({type:"lparen"}),r++;continue}if(s===")"){n.push({type:"rparen"}),r++;continue}if(s==="&"){if(t[r+1]==="&"){n.push({type:"logical_and"}),r+=2;continue}n.push({type:"bitand"}),r++;continue}if(s==="|"){if(t[r+1]==="|"){n.push({type:"logical_or"}),r+=2;continue}n.push({type:"bitor"}),r++;continue}if(s==="^"){n.push({type:"bitxor"}),r++;continue}if(s==="~"){n.push({type:"bitnot"}),r++;continue}if(s==="<"){if(t[r+1]==="<"){n.push({type:"shl"}),r+=2;continue}if(t[r+1]==="="){n.push({type:"le"}),r+=2;continue}n.push({type:"lt"}),r++;continue}if(s===">"){if(t[r+1]===">"){n.push({type:"shr"}),r+=2;continue}if(t[r+1]==="="){n.push({type:"ge"}),r+=2;continue}n.push({type:"gt"}),r++;continue}if(s==="="){if(t[r+1]==="="){n.push({type:"eq"}),r+=2;continue}n.push({type:"assign"}),r++;continue}if(s==="!"){if(t[r+1]==="="){n.push({type:"ne"}),r+=2;continue}r++;continue}if(s==="?"){n.push({type:"ternary_q"}),r++;continue}if(s===":"){n.push({type:"ternary_c"}),r++;continue}if(s===","){n.push({type:"comma"}),r++;continue}if(/[0-9]/.test(s)){if(s==="0"&&(t[r+1]==="x"||t[r+1]==="X")){let o=r+2;for(;o<t.length&&/[0-9a-fA-F]/.test(t.charAt(o));)o++;n.push({type:"number",value:Number.parseInt(t.slice(r+2,o),16)}),r=o;continue}if(s==="0"&&/[0-7]/.test(t[r+1]??"")){let o=r+1;for(;o<t.length&&/[0-7]/.test(t.charAt(o));)o++;n.push({type:"number",value:Number.parseInt(t.slice(r,o),8)}),r=o;continue}let i=r+1;for(;i<t.length&&/[0-9]/.test(t.charAt(i));)i++;n.push({type:"number",value:Number(t.slice(r,i))}),r=i;continue}if(/[A-Za-z_]/.test(s)){let i=r+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t.charAt(i));)i++;let o=t.slice(r,i);n.push({type:"ident",value:o}),r=i;continue}return[]}return n}function vl(t,e){if(t.type==="number")return t.value;if(t.type==="ident"){let n=e[t.value],r=n===void 0||n===""?0:Number(n);return Number.isFinite(r)?r:0}return Number.NaN}function Kr(t,e){let n=t.trim();if(n.length===0||n.length>1024)return Number.NaN;let r=Sb(n,e);if(r.length===0)return Number.NaN;let s=0,i=()=>r[s],o=()=>r[s++],a={number:()=>vl(o(),e),ident:()=>vl(o(),e),lparen:()=>{o();let d=l(0);return i()?.type!=="rparen"?Number.NaN:(o(),d)},plus:()=>(o(),l(90)),minus:()=>(o(),-l(90)),bitnot:()=>(o(),~l(90))},c={comma:{prec:1,fn:d=>(o(),l(1))},assign:{prec:2,fn:d=>(o(),l(2))},ternary_q:{prec:3,fn:d=>{o();let f=l(3);if(i()?.type!=="ternary_c")return Number.NaN;o();let p=l(3);return d?f:p}},logical_or:{prec:4,fn:d=>(o(),d||l(5))},logical_and:{prec:5,fn:d=>(o(),d&&l(6))},bitor:{prec:6,fn:d=>{o();let f=Math.trunc(l(7));return d|f}},bitxor:{prec:7,fn:d=>{o();let f=Math.trunc(l(8));return d^f}},bitand:{prec:8,fn:d=>{o();let f=Math.trunc(l(9));return d&f}},eq:{prec:9,fn:d=>(o(),d===l(10)?1:0)},ne:{prec:9,fn:d=>(o(),d===l(10)?0:1)},lt:{prec:10,fn:d=>{o();let f=l(11);return d<f?1:0}},gt:{prec:10,fn:d=>{o();let f=l(11);return d>f?1:0}},le:{prec:10,fn:d=>{o();let f=l(11);return d<=f?1:0}},ge:{prec:10,fn:d=>{o();let f=l(11);return d>=f?1:0}},shl:{prec:11,fn:d=>{o();let f=Math.trunc(l(12));return d<<f}},shr:{prec:11,fn:d=>{o();let f=Math.trunc(l(12));return d>>f}},plus:{prec:12,fn:d=>(o(),d+l(13))},minus:{prec:12,fn:d=>(o(),d-l(13))},mul:{prec:13,fn:d=>(o(),d*l(14))},div:{prec:13,fn:d=>{o();let f=l(14);return f===0?Number.NaN:Math.trunc(d/f)}},mod:{prec:13,fn:d=>{o();let f=l(14);return f===0?Number.NaN:Math.trunc(d%f)}},pow:{prec:14,fn:d=>(o(),d**l(14)),rightAsso:!0}};function l(d){let f=i();if(!f)return Number.NaN;let p=a[f.type];if(!p)return Number.NaN;let h=p();for(;;){let m=i();if(!m)break;let g=c[m.type];if(!g)break;let{prec:y,fn:v,rightAsso:x}=g;if(y<d||y===d&&x)break;h=v(h)}return h}let u=l(0);return!Number.isFinite(u)||s!==r.length?Number.NaN:Math.trunc(u)}function bb(t,e){if(!t.includes("'"))return e(t);let n=[],r=0;for(;r<t.length;){let s=t.indexOf("'",r);if(s===-1){n.push(e(t.slice(r)));break}n.push(e(t.slice(r,s)));let i=t.indexOf("'",s+1);if(i===-1){n.push(t.slice(s));break}n.push(t.slice(s,i+1)),r=i+1}return n.join("")}function Vs(t){function r(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),f=s.slice(c+1),p=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(p){let y=[];if(/\d/.test(p[1])){let b=Number.parseInt(p[1],10),P=Number.parseInt(p[2],10),_=p[3]?Number.parseInt(p[3],10):1,w=b<=P?_:-_;for(let S=b;b<=P?S<=P:S>=P;S+=w)y.push(String(S))}else{let b=p[1].charCodeAt(0),P=p[2].charCodeAt(0),_=b<=P?1:-1;for(let w=b;b<=P?w<=P:w>=P;w+=_)y.push(String.fromCharCode(w))}let v=y.map(b=>`${u}${b}${f}`),x=[];for(let b of v)if(x.push(...r(b,i+1)),x.length>256)return[s];return x}let h=[],m="",g=0;for(let y of d)y==="{"?(g++,m+=y):y==="}"?(g--,m+=y):y===","&&g===0?(h.push(m),m=""):m+=y;if(h.push(m),h.length>1){let y=[];for(let v of h)if(y.push(...r(`${u}${v}${f}`,i+1)),y.length>256)return[s];return y}break}}return[s]}return r(t,0)}function vb(t,e){if(!t.includes("$(("))return t;let n="",r=0,s=0;for(;r<t.length;){if(t[r]==="$"&&t[r+1]==="("&&t[r+2]==="("){n+=t.slice(s,r);let i=r+3,o=0;for(;i<t.length;){let a=t.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(r+3,i),l=Kr(c,e);n+=Number.isNaN(l)?"0":String(l),r=i+2,s=r;break}}i++}if(i>=t.length)return n+=t.slice(r),n;continue}r++}return n+t.slice(s)}function js(t,e,n=0,r){if(!(t.includes("$")||t.includes("~")||t.includes("'")))return t;let s=r??e.HOME??"/home/user";return bb(t,i=>{let o=i;return o=o.replace(/\$'((?:\\.|[^'\\])*)'/g,(a,c)=>c.replace(/\\(.)/g,(l,u)=>{switch(u){case"n":return`
`;case"t":return"	";case"r":return"\r";case"0":return"\0";case"a":return"\x07";case"b":return"\b";case"e":return"\x1B";case"f":return"\f";case"v":return"\v";case"\\":return"\\";case"'":return"'";case'"':return'"';default:{if(u[0]==="x"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]+$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(/^[0-7]{1,3}$/.test(u))return String.fromCodePoint(Number.parseInt(u,8));if(u[0]==="u"&&u.length>1){let d=u.slice(1);if(/^[0-9a-fA-F]{1,4}$/.test(d))return String.fromCodePoint(Number.parseInt(d,16))}if(u[0]==="c"&&u[1]){let d=u[1].toUpperCase().charCodeAt(0)-64;return String.fromCodePoint(d>=0?d:0)}return u}}})),o=o.replace(/(^|[\s:])(~\+|~-|~[A-Za-z_][A-Za-z0-9_]*|~)(?=\/|$|\s|:)/g,(a,c,l)=>{let u;return l==="~+"?u=e.PWD??s:l==="~-"?u=e.OLDPWD??"":l==="~"?u=s:u=`/home/${l.slice(1)}`,u?`${c}${u}`:`${c}${l}`}),o=o.replace(/\$\?/g,String(n)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=o.replace(/\$BASHPID\b/g,()=>String(Math.floor(Math.random()*32768)+1e3)),o=o.replace(/\$EPOCHSECONDS\b/g,()=>String(Math.floor(Date.now()/1e3))),o=o.replace(/\$EPOCHREALTIME\b/g,()=>String(Date.now()/1e3)),o=o.replace(/\$-/g,()=>{let a="";return e.__errexit==="1"&&(a+="e"),e.__nounset==="1"&&(a+="u"),e.__noclobber==="1"&&(a+="C"),e.__xtrace==="1"&&(a+="x"),e.__pipefail==="1"&&(a+="o pipefail"),a}),o=o.replace(/\$_/g,()=>e.__lastarg??""),o=o.replace(/\$PIPESTATUS\b/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[@\]\}/g,()=>e.__pipestatus??"0"),o=o.replace(/\$\{PIPESTATUS\[\*\]\}/g,()=>e.__pipestatus??"0"),o=vb(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\?([^}]*)\}/g,(a,c,l)=>e[c]===void 0||e[c]===""?`bash: ${c}: ${l||"parameter null or not set"}`:e[c]),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",f=Number.parseInt(l,10),p=f<0?Math.max(0,d.length+f):Math.min(f,d.length);return u===void 0?d.slice(p):d.slice(p,p+Number.parseInt(u,10))}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(On(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(On(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(On(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(On(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(On(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(On(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function Gs(t,e,n,r){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return js(t,e,n);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,f=l+1;for(;f<t.length;){if(t[f]==="(")d++;else if(t[f]===")"&&(d--,d===0))break;f++}let p=t.slice(l+2,f).trim(),h=(await r(p)).replace(/\n$/,"");a+=h,l=f+1;continue}a+=u,l++}t=a}return js(t,e,n)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Fo(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function xl(t,e,n,r){if(!(t.includes("*")||t.includes("?")))return[t];let s=t.startsWith("/"),i=s?"/":e,o=s?t.slice(1):t,a=Lo(i,o.split("/"),n,r?.dotglob);return a.length===0?r?.nullglob?[]:[t]:a.sort()}function Lo(t,e,n,r){if(e.length===0)return[t];let[s,...i]=e;if(!s)return[t];if(s==="**"){let u=Cl(t,n);if(i.length===0)return u;let d=[];for(let f of u)Fo(n,f)==="directory"&&d.push(...Lo(f,i,n,r));return d}let o=[];try{o=n.list(t)}catch{return[]}let a=Ws(s),c=r?!0:s.startsWith("."),l=[];for(let u of o){if(!c&&u.startsWith(".")||!a.test(u))continue;let d=t==="/"?`/${u}`:`${t}/${u}`;if(i.length===0){l.push(d);continue}Fo(n,d)==="directory"&&l.push(...Lo(d,i,n,r))}return l}function Cl(t,e){let n=[t],r=[];try{r=e.list(t)}catch{return n}for(let s of r){let i=t==="/"?`/${s}`:`${t}/${s}`;Fo(e,i)==="directory"&&n.push(...Cl(i,e))}return n}var Xr=k(()=>{"use strict";Do()});var wl,_l=k(()=>{"use strict";Xr();wl={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let n=(e??t.join(" ")).trim();if(!n)return{stdout:"",exitCode:0};let r=[];for(let s of n.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=Kr(o,{});if(Number.isNaN(a))return{stderr:`bc: syntax error on line: ${i}`,exitCode:1};r.push(String(a))}return{stdout:r.join(`
`),exitCode:0}}}});var ru={};Us(ru,{AsyncCompress:()=>$b,AsyncDecompress:()=>Nb,AsyncDeflate:()=>Vl,AsyncGunzip:()=>Hl,AsyncGzip:()=>$b,AsyncInflate:()=>na,AsyncUnzipInflate:()=>Wb,AsyncUnzlib:()=>Yl,AsyncZipDeflate:()=>Fb,AsyncZlib:()=>kb,Compress:()=>Vo,DecodeUTF8:()=>Ob,Decompress:()=>qo,Deflate:()=>xt,EncodeUTF8:()=>Rb,FlateErrorCode:()=>Ib,Gunzip:()=>Qs,Gzip:()=>Vo,Inflate:()=>st,Unzip:()=>jb,UnzipInflate:()=>zb,UnzipPassThrough:()=>nu,Unzlib:()=>ei,Zip:()=>Lb,ZipDeflate:()=>Db,ZipPassThrough:()=>Qr,Zlib:()=>Go,compress:()=>Pb,compressSync:()=>Rn,decompress:()=>Ab,decompressSync:()=>Tb,deflate:()=>Gl,deflateSync:()=>rs,gunzip:()=>ql,gunzipSync:()=>Lt,gzip:()=>Pb,gzipSync:()=>Rn,inflate:()=>ra,inflateSync:()=>yr,strFromU8:()=>ia,strToU8:()=>Sn,unzip:()=>Vb,unzipSync:()=>Gb,unzlib:()=>Kl,unzlibSync:()=>tn,zip:()=>Ub,zipSync:()=>Bb,zlib:()=>Mb,zlibSync:()=>Ho});import{createRequire as xb}from"module";function Fn(t,e){return typeof t=="function"&&(e=t,t={}),this.ondata=e,t}function Gl(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[mr],function(r){return bn(rs(r.data[0],r.data[1]))},0,n)}function rs(t,e){return Dn(t,e||{},0,0)}function ra(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[pr],function(r){return bn(yr(r.data[0],Xo(r.data[1])))},1,n)}function yr(t,e){return ts(t,{i:2},e&&e.out,e&&e.dictionary)}function Pb(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[mr,Ul,function(){return[Rn]}],function(r){return bn(Rn(r.data[0],r.data[1]))},2,n)}function Rn(t,e){e||(e={});var n=fr(),r=t.length;n.p(t);var s=Dn(t,e,Qo(e),8),i=s.length;return Zo(s,e),we(s,i-8,n.d()),we(s,i-4,r),s}function ql(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[pr,Bl,function(){return[Lt]}],function(r){return bn(Lt(r.data[0],r.data[1]))},3,n)}function Lt(t,e){var n=Jo(t);return n+8>t.length&&te(6,"invalid gzip data"),ts(t.subarray(n,-8),{i:2},e&&e.out||new ue(jl(t)),e&&e.dictionary)}function Mb(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[mr,zl,function(){return[Ho]}],function(r){return bn(Ho(r.data[0],r.data[1]))},4,n)}function Ho(t,e){e||(e={});var n=ri();n.p(t);var r=Dn(t,e,e.dictionary?6:2,4);return ea(r,e),we(r,r.length-4,n.d()),r}function Kl(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),hr(t,e,[pr,Wl,function(){return[tn]}],function(r){return bn(tn(r.data[0],Xo(r.data[1])))},5,n)}function tn(t,e){return ts(t.subarray(ta(t,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function Ab(t,e,n){return n||(n=e,e={}),typeof n!="function"&&te(7),t[0]==31&&t[1]==139&&t[2]==8?ql(t,e,n):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?ra(t,e,n):Kl(t,e,n)}function Tb(t,e){return t[0]==31&&t[1]==139&&t[2]==8?Lt(t,e):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?yr(t,e):tn(t,e)}function Sn(t,e){if(e){for(var n=new ue(t.length),r=0;r<t.length;++r)n[r]=t.charCodeAt(r);return n}if(El)return El.encode(t);for(var s=t.length,i=new ue(t.length+(t.length>>1)),o=0,a=function(u){i[o++]=u},r=0;r<s;++r){if(o+5>i.length){var c=new ue(o+8+(s-r<<1));c.set(i),i=c}var l=t.charCodeAt(r);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++r)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return vt(i,0,o)}function ia(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(Yo)return Yo.decode(t);var s=Zl(t),i=s.s,n=s.r;return n.length&&te(8),i}}function Ub(t,e,n){n||(n=e,e={}),typeof n!="function"&&te(7);var r={};sa(t,"",r,e);var s=Object.keys(r),i=s.length,o=0,a=0,c=i,l=new Array(i),u=[],d=function(){for(var g=0;g<u.length;++g)u[g]()},f=function(g,y){ti(function(){n(g,y)})};ti(function(){f=n});var p=function(){var g=new ue(a+22),y=o,v=a-o;a=0;for(var x=0;x<c;++x){var b=l[x];try{var P=b.c.length;cr(g,a,b,b.f,b.u,P);var _=30+b.f.length+yn(b.extra),w=a+_;g.set(b.c,w),cr(g,o,b,b.f,b.u,P,a,b.m),o+=16+_+(b.m?b.m.length:0),a=w+P}catch(S){return f(S,null)}}oa(g,o,l.length,v,y),f(null,g)};i||p();for(var h=function(g){var y=s[g],v=r[y],x=v[0],b=v[1],P=fr(),_=x.length;P.p(x);var w=Sn(y),S=w.length,C=b.comment,$=C&&Sn(C),N=$&&$.length,R=yn(b.extra),W=b.level==0?0:8,Y=function(Q,E){if(Q)d(),f(Q,null);else{var A=E.length;l[g]=ns(b,{size:_,crc:P.d(),c:E,f:w,m:$,u:S!=y.length||$&&C.length!=N,compression:W}),o+=30+S+R+A,a+=76+2*(S+R)+(N||0)+A,--i||p()}};if(S>65535&&Y(te(11,0,1),null),!W)Y(null,x);else if(_<16e4)try{Y(null,rs(x,b))}catch(Q){Y(Q,null)}else u.push(Gl(x,b,Y))},m=0;m<c;++m)h(m);return d}function Bb(t,e){e||(e={});var n={},r=[];sa(t,"",n,e);var s=0,i=0;for(var o in n){var a=n[o],c=a[0],l=a[1],u=l.level==0?0:8,d=Sn(o),f=d.length,p=l.comment,h=p&&Sn(p),m=h&&h.length,g=yn(l.extra);f>65535&&te(11);var y=u?rs(c,l):c,v=y.length,x=fr();x.p(c),r.push(ns(l,{size:c.length,crc:x.d(),c:y,f:d,m:h,u:f!=o.length||h&&p.length!=m,o:s,compression:u})),s+=30+f+g+v,i+=76+2*(f+g)+(m||0)+v}for(var b=new ue(i+22),P=s,_=i-s,w=0;w<r.length;++w){var d=r[w];cr(b,d.o,d,d.f,d.u,d.c.length);var S=30+d.f.length+yn(d.extra);b.set(d.c,d.o+S),cr(b,s,d,d.f,d.u,d.c.length,d.o,d.m),s+=16+S+(d.m?d.m.length:0)}return oa(b,s,r.length,_,P),b}function Vb(t,e,n){n||(n=e,e={}),typeof n!="function"&&te(7);var r=[],s=function(){for(var g=0;g<r.length;++g)r[g]()},i={},o=function(g,y){ti(function(){n(g,y)})};ti(function(){o=n});for(var a=t.length-22;Le(t,a)!=101010256;--a)if(!a||t.length-a>65558)return o(te(13,0,1),null),s;var c=nt(t,a+8);if(c){var l=c,u=Le(t,a+16),d=Le(t,a-20)==117853008;if(d){var f=Le(t,a-12);d=Le(t,f)==101075792,d&&(l=c=Le(t,f+32),u=Le(t,f+48))}for(var p=e&&e.filter,h=function(g){var y=eu(t,u,d),v=y[0],x=y[1],b=y[2],P=y[3],_=y[4],w=y[5],S=Ql(t,w);u=_;var C=function(N,R){N?(s(),o(N,null)):(R&&(i[P]=R),--c||o(null,i))};if(!p||p({name:P,size:x,originalSize:b,compression:v}))if(!v)C(null,vt(t,S,S+x));else if(v==8){var $=t.subarray(S,S+x);if(b<524288||x>.8*b)try{C(null,yr($,{out:new ue(b)}))}catch(N){C(N,null)}else r.push(ra($,{size:b},C))}else C(te(14,"unknown compression type "+v,1),null);else C(null,null)},m=0;m<l;++m)h(m)}else o(null,{});return s}function Gb(t,e){for(var n={},r=t.length-22;Le(t,r)!=101010256;--r)(!r||t.length-r>65558)&&te(13);var s=nt(t,r+8);if(!s)return{};var i=Le(t,r+16),o=Le(t,r-20)==117853008;if(o){var a=Le(t,r-12);o=Le(t,a)==101075792,o&&(s=Le(t,a+32),i=Le(t,a+48))}for(var c=e&&e.filter,l=0;l<s;++l){var u=eu(t,i,o),d=u[0],f=u[1],p=u[2],h=u[3],m=u[4],g=u[5],y=Ql(t,g);i=m,(!c||c({name:h,size:f,originalSize:p,compression:d}))&&(d?d==8?n[h]=yr(t.subarray(y,y+f),{out:new ue(p)}):te(14,"unknown compression type "+d):n[h]=vt(t,y,y+f))}return n}var Cb,or,qs,Bo,wb,_b,ue,rt,es,lr,ur,Zr,$l,or,Ko,Zs,Pl,kl,zo,Jr,Qt,_e,bt,en,_e,_e,_e,_e,ar,_e,Ml,Nl,Al,Tl,Ys,St,Ks,dr,vt,Ib,Ol,te,ts,Dt,sr,Xs,Js,Wo,ir,ni,jo,Rl,Ft,Dl,Fl,fr,ri,Dn,ns,Il,Hs,Eb,Ll,pr,mr,Ul,Bl,zl,Wl,bn,Xo,hr,Ct,gr,nt,Le,Uo,we,Zo,Jo,jl,Qo,ea,ta,xt,Vl,st,na,Vo,$b,Qs,Hl,Go,kb,ei,Yl,qo,Nb,sa,El,Yo,Xl,Zl,Ob,Rb,Jl,Ql,eu,tu,yn,cr,oa,Qr,Db,Fb,Lb,nu,zb,Wb,jb,ti,Sr=k(()=>{Cb=xb("/"),wb=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{or=Cb("worker_threads"),qs=or.Worker,Bo=or.isMarkedAsUntransferable}catch{}_b=qs?function(t,e,n,r,s){var i=!1,o=new qs(t+wb,{eval:!0}).on("error",function(a){return s(a,null)}).on("message",function(a){return s(null,a)}).on("exit",function(a){a&&!i&&s(new Error("exited with code "+a),null)});return Bo&&(r=r.filter(function(a){return!Bo(a)})),o.postMessage(n,r),o.terminate=function(){return i=!0,qs.prototype.terminate.call(o)},o}:function(t,e,n,r,s){setImmediate(function(){return s(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var i=function(){};return{terminate:i,postMessage:i}},ue=Uint8Array,rt=Uint16Array,es=Int32Array,lr=new ue([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),ur=new ue([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Zr=new ue([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),$l=function(t,e){for(var n=new rt(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new es(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},or=$l(lr,2),Ko=or.b,Zs=or.r;Ko[28]=258,Zs[258]=28;Pl=$l(ur,0),kl=Pl.b,zo=Pl.r,Jr=new rt(32768);for(_e=0;_e<32768;++_e)Qt=(_e&43690)>>1|(_e&21845)<<1,Qt=(Qt&52428)>>2|(Qt&13107)<<2,Qt=(Qt&61680)>>4|(Qt&3855)<<4,Jr[_e]=((Qt&65280)>>8|(Qt&255)<<8)>>1;bt=(function(t,e,n){for(var r=t.length,s=0,i=new rt(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new rt(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new rt(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[Jr[d]>>c]=l}else for(a=new rt(r),s=0;s<r;++s)t[s]&&(a[s]=Jr[o[t[s]-1]++]>>15-t[s]);return a}),en=new ue(288);for(_e=0;_e<144;++_e)en[_e]=8;for(_e=144;_e<256;++_e)en[_e]=9;for(_e=256;_e<280;++_e)en[_e]=7;for(_e=280;_e<288;++_e)en[_e]=8;ar=new ue(32);for(_e=0;_e<32;++_e)ar[_e]=5;Ml=bt(en,9,0),Nl=bt(en,9,1),Al=bt(ar,5,0),Tl=bt(ar,5,1),Ys=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},St=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},Ks=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},dr=function(t){return(t+7)/8|0},vt=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new ue(t.subarray(e,n))},Ib={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},Ol=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],te=function(t,e,n){var r=new Error(e||Ol[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,te),!n)throw r;return r},ts=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new ue(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new ue(s*3));var l=function(se){var re=n.length;if(se>re){var ve=new ue(Math.max(re*2,se));ve.set(n),n=ve}},u=e.f||0,d=e.p||0,f=e.b||0,p=e.l,h=e.d,m=e.m,g=e.n,y=s*8;do{if(!p){u=St(t,d,1);var v=St(t,d+1,3);if(d+=3,v)if(v==1)p=Nl,h=Tl,m=9,g=5;else if(v==2){var _=St(t,d,31)+257,w=St(t,d+10,15)+4,S=_+St(t,d+5,31)+1;d+=14;for(var C=new ue(S),$=new ue(19),N=0;N<w;++N)$[Zr[N]]=St(t,d+N*3,7);d+=w*3;for(var R=Ys($),W=(1<<R)-1,Y=bt($,R,1),N=0;N<S;){var Q=Y[St(t,d,W)];d+=Q&15;var x=Q>>4;if(x<16)C[N++]=x;else{var E=0,A=0;for(x==16?(A=3+St(t,d,3),d+=2,E=C[N-1]):x==17?(A=3+St(t,d,7),d+=3):x==18&&(A=11+St(t,d,127),d+=7);A--;)C[N++]=E}}var I=C.subarray(0,_),D=C.subarray(_);m=Ys(I),g=Ys(D),p=bt(I,m,1),h=bt(D,g,1)}else te(1);else{var x=dr(d)+4,b=t[x-4]|t[x-3]<<8,P=x+b;if(P>s){c&&te(0);break}a&&l(f+b),n.set(t.subarray(x,P),f),e.b=f+=b,e.p=d=P*8,e.f=u;continue}if(d>y){c&&te(0);break}}a&&l(f+131072);for(var z=(1<<m)-1,Z=(1<<g)-1,J=d;;J=d){var E=p[Ks(t,d)&z],F=E>>4;if(d+=E&15,d>y){c&&te(0);break}if(E||te(2),F<256)n[f++]=F;else if(F==256){J=d,p=null;break}else{var j=F-254;if(F>264){var N=F-257,L=lr[N];j=St(t,d,(1<<L)-1)+Ko[N],d+=L}var G=h[Ks(t,d)&Z],U=G>>4;G||te(3),d+=G&15;var D=kl[U];if(U>3){var L=ur[U];D+=Ks(t,d)&(1<<L)-1,d+=L}if(d>y){c&&te(0);break}a&&l(f+131072);var H=f+j;if(f<D){var q=i-D,K=Math.min(D,H);for(q+f<0&&te(3);f<K;++f)n[f]=r[q+f]}for(;f<H;++f)n[f]=n[f-D]}}e.l=p,e.p=J,e.b=f,e.f=u,p&&(u=1,e.m=m,e.d=h,e.n=g)}while(!u);return f!=n.length&&o?vt(n,0,f):n.subarray(0,f)},Dt=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},sr=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Xs=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:Ft,l:0};if(s==1){var o=new ue(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(P,_){return P.f-_.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var f=i[0].s,r=1;r<s;++r)i[r].s>f&&(f=i[r].s);var p=new rt(f+1),h=Js(n[u-1],p,0);if(h>e){var r=0,m=0,g=h-e,y=1<<g;for(i.sort(function(_,w){return p[w.s]-p[_.s]||_.f-w.f});r<s;++r){var v=i[r].s;if(p[v]>e)m+=y-(1<<h-p[v]),p[v]=e;else break}for(m>>=g;m>0;){var x=i[r].s;p[x]<e?m-=1<<e-p[x]++-1:++r}for(;r>=0&&m;--r){var b=i[r].s;p[b]==e&&(--p[b],++m)}h=e}return{t:new ue(p),l:h}},Js=function(t,e,n){return t.s==-1?Math.max(Js(t.l,e,n+1),Js(t.r,e,n+1)):e[t.s]=n},Wo=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new rt(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},ir=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},ni=function(t,e,n){var r=n.length,s=dr(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},jo=function(t,e,n,r,s,i,o,a,c,l,u){Dt(e,u++,n),++s[256];for(var d=Xs(s,15),f=d.t,p=d.l,h=Xs(i,15),m=h.t,g=h.l,y=Wo(f),v=y.c,x=y.n,b=Wo(m),P=b.c,_=b.n,w=new rt(19),S=0;S<v.length;++S)++w[v[S]&31];for(var S=0;S<P.length;++S)++w[P[S]&31];for(var C=Xs(w,7),$=C.t,N=C.l,R=19;R>4&&!$[Zr[R-1]];--R);var W=l+5<<3,Y=ir(s,en)+ir(i,ar)+o,Q=ir(s,f)+ir(i,m)+o+14+3*R+ir(w,$)+2*w[16]+3*w[17]+7*w[18];if(c>=0&&W<=Y&&W<=Q)return ni(e,u,t.subarray(c,c+l));var E,A,I,D;if(Dt(e,u,1+(Q<Y)),u+=2,Q<Y){E=bt(f,p,0),A=f,I=bt(m,g,0),D=m;var z=bt($,N,0);Dt(e,u,x-257),Dt(e,u+5,_-1),Dt(e,u+10,R-4),u+=14;for(var S=0;S<R;++S)Dt(e,u+3*S,$[Zr[S]]);u+=3*R;for(var Z=[v,P],J=0;J<2;++J)for(var F=Z[J],S=0;S<F.length;++S){var j=F[S]&31;Dt(e,u,z[j]),u+=$[j],j>15&&(Dt(e,u,F[S]>>5&127),u+=F[S]>>12)}}else E=Ml,A=en,I=Al,D=ar;for(var S=0;S<a;++S){var L=r[S];if(L>255){var j=L>>18&31;sr(e,u,E[j+257]),u+=A[j+257],j>7&&(Dt(e,u,L>>23&31),u+=lr[j]);var G=L&31;sr(e,u,I[G]),u+=D[G],G>3&&(sr(e,u,L>>5&8191),u+=ur[G])}else sr(e,u,E[L]),u+=A[L]}return sr(e,u,E[256]),u+A[256]},Rl=new es([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Ft=new ue(0),Dl=function(t,e,n,r,s,i){var o=i.z||t.length,a=new ue(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=Rl[e-1],f=d>>13,p=d&8191,h=(1<<n)-1,m=i.p||new rt(32768),g=i.h||new rt(h+1),y=Math.ceil(n/3),v=2*y,x=function(Fe){return(t[Fe]^t[Fe+1]<<y^t[Fe+2]<<v)&h},b=new es(25e3),P=new rt(288),_=new rt(32),w=0,S=0,C=i.i||0,$=0,N=i.w||0,R=0;C+2<o;++C){var W=x(C),Y=C&32767,Q=g[W];if(m[Y]=Q,g[W]=Y,N<=C){var E=o-C;if((w>7e3||$>24576)&&(E>423||!l)){u=jo(t,c,0,b,P,_,S,$,R,C-R,u),$=w=S=0,R=C;for(var A=0;A<286;++A)P[A]=0;for(var A=0;A<30;++A)_[A]=0}var I=2,D=0,z=p,Z=Y-Q&32767;if(E>2&&W==x(C-Z))for(var J=Math.min(f,E)-1,F=Math.min(32767,C),j=Math.min(258,E);Z<=F&&--z&&Y!=Q;){if(t[C+I]==t[C+I-Z]){for(var L=0;L<j&&t[C+L]==t[C+L-Z];++L);if(L>I){if(I=L,D=Z,L>J)break;for(var G=Math.min(Z,L-2),U=0,A=0;A<G;++A){var H=C-Z+A&32767,q=m[H],K=H-q&32767;K>U&&(U=K,Q=H)}}}Y=Q,Q=m[Y],Z+=Y-Q&32767}if(D){b[$++]=268435456|Zs[I]<<18|zo[D];var se=Zs[I]&31,re=zo[D]&31;S+=lr[se]+ur[re],++P[257+se],++_[re],N=C+I,++w}else b[$++]=t[C],++P[t[C]]}}for(C=Math.max(C,N);C<o;++C)b[$++]=t[C],++P[t[C]];u=jo(t,c,l,b,P,_,S,$,R,C-R,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=g,i.p=m,i.i=C,i.w=N)}else{for(var C=i.w||0;C<o+l;C+=65535){var ve=C+65535;ve>=o&&(c[u/8|0]=l,ve=o),u=ni(c,u+1,t.subarray(C,ve))}i.i=o}return vt(a,0,r+dr(u)+s)},Fl=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),fr=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=Fl[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},ri=function(){var t=1,e=0;return{p:function(n){for(var r=t,s=e,i=n.length|0,o=0;o!=i;){for(var a=Math.min(o+2655,i);o<a;++o)s+=r+=n[o];r=(r&65535)+15*(r>>16),s=(s&65535)+15*(s>>16)}t=r,e=s},d:function(){return t%=65521,e%=65521,(t&255)<<24|(t&65280)<<8|(e&255)<<8|e>>8}}},Dn=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new ue(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return Dl(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},ns=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},Il=function(t,e,n){for(var r=t(),s=t.toString(),i=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<r.length;++o){var a=r[o],c=i[o];if(typeof a=="function"){e+=";"+c+"=";var l=a.toString();if(a.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;e+=l.slice(u,l.indexOf("(",u))}else{e+=l;for(var d in a.prototype)e+=";"+c+".prototype."+d+"="+a.prototype[d].toString()}else e+=l}else n[c]=a}return e},Hs=[],Eb=function(t){var e=[];for(var n in t)t[n].buffer&&e.push((t[n]=new t[n].constructor(t[n])).buffer);return e},Ll=function(t,e,n,r){if(!Hs[n]){for(var s="",i={},o=t.length-1,a=0;a<o;++a)s=Il(t[a],s,i);Hs[n]={c:Il(t[o],s,i),e:i}}var c=ns({},Hs[n].e);return _b(Hs[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",n,c,Eb(c),r)},pr=function(){return[ue,rt,es,lr,ur,Zr,Ko,kl,Nl,Tl,Jr,Ol,bt,Ys,St,Ks,dr,vt,te,ts,yr,bn,Xo]},mr=function(){return[ue,rt,es,lr,ur,Zr,Zs,zo,Ml,en,Al,ar,Jr,Rl,Ft,bt,Dt,sr,Xs,Js,Wo,ir,ni,jo,dr,vt,Dl,Dn,rs,bn]},Ul=function(){return[Zo,Qo,we,fr,Fl]},Bl=function(){return[Jo,jl]},zl=function(){return[ea,we,ri]},Wl=function(){return[ta]},bn=function(t){return postMessage(t,[t.buffer])},Xo=function(t){return t&&{out:t.size&&new ue(t.size),dictionary:t.dictionary}},hr=function(t,e,n,r,s,i){var o=Ll(n,r,s,function(a,c){o.terminate(),i(a,c)});return o.postMessage([t,e],e.consume?[t.buffer]:[]),function(){o.terminate()}},Ct=function(t){return t.ondata=function(e,n){return postMessage([e,n],[e.buffer])},function(e){e.data[0]?(t.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):t.flush(e.data[1])}},gr=function(t,e,n,r,s,i,o){var a,c=Ll(t,r,s,function(l,u){l?(c.terminate(),e.ondata.call(e,l)):Array.isArray(u)?u.length==1?(e.queuedSize-=u[0],e.ondrain&&e.ondrain(u[0])):(u[1]&&c.terminate(),e.ondata.call(e,l,u[0],u[1])):o(u)});c.postMessage(n),e.queuedSize=0,e.push=function(l,u){e.ondata||te(5),a&&e.ondata(te(4,0,1),null,!!u),e.queuedSize+=l.length,c.postMessage([l,a=u],l.buffer instanceof ArrayBuffer?[l.buffer]:[])},e.terminate=function(){c.terminate()},i&&(e.flush=function(l){c.postMessage([0,l])})},nt=function(t,e){return t[e]|t[e+1]<<8},Le=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Uo=function(t,e){return Le(t,e)+Le(t,e+4)*4294967296},we=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},Zo=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&we(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},Jo=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&te(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},jl=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},Qo=function(t){return 10+(t.filename?t.filename.length+1:0)},ea=function(t,e){var n=e.level,r=n==0?0:n<6?1:n==9?3:2;if(t[0]=120,t[1]=r<<6|(e.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,e.dictionary){var s=ri();s.p(e.dictionary),we(t,2,s.d())}},ta=function(t,e){return((t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31)&&te(6,"invalid zlib data"),(t[1]>>5&1)==+!e&&te(6,"invalid zlib data: "+(t[1]&32?"need":"unexpected")+" dictionary"),(t[1]>>3&4)+2};xt=(function(){function t(e,n){if(typeof e=="function"&&(n=e,e={}),this.ondata=n,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new ue(98304),this.o.dictionary){var r=this.o.dictionary.subarray(-32768);this.b.set(r,32768-r.length),this.s.i=32768-r.length}}return t.prototype.p=function(e,n){this.ondata(Dn(e,this.o,0,0,this.s),n)},t.prototype.push=function(e,n){this.ondata||te(5),this.s.l&&te(4);var r=e.length+this.s.z;if(r>this.b.length){if(r>2*this.b.length-32768){var s=new ue(r&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var i=this.b.length-this.s.z;this.b.set(e.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(i),32768),this.s.z=e.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2),n&&(this.s=this.o={},this.b=Ft)},t.prototype.flush=function(e){if(this.ondata||te(5),this.s.l&&te(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var n=new ue(6);n[0]=this.s.r>>3;var r=ni(n,this.s.r,Ft);this.s.r=0,this.ondata(n.subarray(0,r>>3),!1)}},t})(),Vl=(function(){function t(e,n){gr([mr,function(){return[Ct,xt]}],this,Fn.call(this,e,n),function(r){var s=new xt(r.data);onmessage=Ct(s)},6,1)}return t})();st=(function(){function t(e,n){typeof e=="function"&&(n=e,e={}),this.ondata=n;var r=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:r?r.length:0},this.o=new ue(32768),this.p=new ue(0),r&&this.o.set(r)}return t.prototype.e=function(e){if(this.ondata||te(5),this.d&&te(4),!this.p.length)this.p=e;else if(e.length){var n=new ue(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length),this.p=n}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var n=this.s.b,r=ts(this.p,this.s,this.o);this.ondata(vt(r,n,this.s.b),this.d),this.o=vt(r,this.s.b-32768),this.s.b=this.o.length,this.p=vt(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,n){this.e(e),this.c(n)},t})(),na=(function(){function t(e,n){gr([pr,function(){return[Ct,st]}],this,Fn.call(this,e,n),function(r){var s=new st(r.data);onmessage=Ct(s)},7,0)}return t})();Vo=(function(){function t(e,n){this.c=fr(),this.l=0,this.v=1,xt.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),this.l+=e.length,xt.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=Dn(e,this.o,this.v&&Qo(this.o),n&&8,this.s);this.v&&(Zo(r,this.o),this.v=0),n&&(we(r,r.length-8,this.c.d()),we(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(e){xt.prototype.flush.call(this,e)},t})(),$b=(function(){function t(e,n){gr([mr,Ul,function(){return[Ct,xt,Vo]}],this,Fn.call(this,e,n),function(r){var s=new Vo(r.data);onmessage=Ct(s)},8,1)}return t})();Qs=(function(){function t(e,n){this.v=1,this.r=0,st.call(this,e,n)}return t.prototype.push=function(e,n){if(st.prototype.e.call(this,e),this.r+=e.length,this.v){var r=this.p.subarray(this.v-1),s=r.length>3?Jo(r):4;if(s>r.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-r.length);this.p=r.subarray(s),this.v=0}st.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=dr(this.s.p)+9,this.s={i:0},this.o=new ue(0),this.push(new ue(0),n)):n&&st.prototype.c.call(this,n)},t})(),Hl=(function(){function t(e,n){var r=this;gr([pr,Bl,function(){return[Ct,st,Qs]}],this,Fn.call(this,e,n),function(s){var i=new Qs(s.data);i.onmember=function(o){return postMessage(o)},onmessage=Ct(i)},9,0,function(s){return r.onmember&&r.onmember(s)})}return t})();Go=(function(){function t(e,n){this.c=ri(),this.v=1,xt.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),xt.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=Dn(e,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(ea(r,this.o),this.v=0),n&&we(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(e){xt.prototype.flush.call(this,e)},t})(),kb=(function(){function t(e,n){gr([mr,zl,function(){return[Ct,xt,Go]}],this,Fn.call(this,e,n),function(r){var s=new Go(r.data);onmessage=Ct(s)},10,1)}return t})();ei=(function(){function t(e,n){st.call(this,e,n),this.v=e&&e.dictionary?2:1}return t.prototype.push=function(e,n){if(st.prototype.e.call(this,e),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(ta(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&te(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),st.prototype.c.call(this,n)},t})(),Yl=(function(){function t(e,n){gr([pr,Wl,function(){return[Ct,st,ei]}],this,Fn.call(this,e,n),function(r){var s=new ei(r.data);onmessage=Ct(s)},11,0)}return t})();qo=(function(){function t(e,n){this.o=Fn.call(this,e,n)||{},this.G=Qs,this.I=st,this.Z=ei}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r){e.ondata(n,r)}},t.prototype.push=function(e,n){if(this.ondata||te(5),this.s)this.s.push(e,n);else{if(this.p&&this.p.length){var r=new ue(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,n),this.p=null)}},t})(),Nb=(function(){function t(e,n){qo.call(this,e,n),this.queuedSize=0,this.G=Hl,this.I=na,this.Z=Yl}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r,s){e.ondata(n,r,s)},this.s.ondrain=function(n){e.queuedSize-=n,e.ondrain&&e.ondrain(n)}},t.prototype.push=function(e,n){this.queuedSize+=e.length,qo.prototype.push.call(this,e,n)},t})();sa=function(t,e,n,r){for(var s in t){var i=t[s],o=e+s,a=r;Array.isArray(i)&&(a=ns(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[o]=[i,a]:(n[o+="/"]=[new ue(0),a],sa(i,o,n,r))}},El=typeof TextEncoder<"u"&&new TextEncoder,Yo=typeof TextDecoder<"u"&&new TextDecoder,Xl=0;try{Yo.decode(Ft,{stream:!0}),Xl=1}catch{}Zl=function(t){for(var e="",n=0;;){var r=t[n++],s=(r>127)+(r>223)+(r>239);if(n+s>t.length)return{s:e,r:vt(t,n-1)};s?s==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}},Ob=(function(){function t(e){this.ondata=e,Xl?this.t=new TextDecoder:this.p=Ft}return t.prototype.push=function(e,n){if(this.ondata||te(5),n=!!n,this.t){this.ondata(this.t.decode(e,{stream:!0}),n),n&&(this.t.decode().length&&te(8),this.t=null);return}this.p||te(4);var r=new ue(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length);var s=Zl(r),i=s.s,o=s.r;n?(o.length&&te(8),this.p=null):this.p=o,this.ondata(i,n)},t})(),Rb=(function(){function t(e){this.ondata=e}return t.prototype.push=function(e,n){this.ondata||te(5),this.d&&te(4),this.ondata(Sn(e),this.d=n||!1)},t})();Jl=function(t){return t==1?3:t<6?2:t==9?1:0},Ql=function(t,e){return e+30+nt(t,e+26)+nt(t,e+28)},eu=function(t,e,n){var r=nt(t,e+28),s=nt(t,e+30),i=ia(t.subarray(e+46,e+46+r),!(nt(t,e+8)&2048)),o=e+46+r,a=tu(t,o,s,n,Le(t,e+20),Le(t,e+24),Le(t,e+42)),c=a[0],l=a[1],u=a[2];return[nt(t,e+10),c,l,i,o+s+nt(t,e+32),u]},tu=function(t,e,n,r,s,i,o){var a=s==4294967295,c=i==4294967295,l=o==4294967295,u=e+n,d=a+c+l;if(r&&d){for(;e+4<u;e+=4+nt(t,e+2))if(nt(t,e)==1)return[a?Uo(t,e+4+8*c):s,c?Uo(t,e+4):i,l?Uo(t,e+4+8*(c+a)):o,1];r<2&&te(13)}return[s,i,o,0]},yn=function(t){var e=0;if(t)for(var n in t){var r=t[n].length;r>65535&&te(9),e+=r+4}return e},cr=function(t,e,n,r,s,i,o,a){var c=r.length,l=n.extra,u=a&&a.length,d=yn(l);we(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(i<0&&8),t[e++]=s&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&te(10),we(t,e,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),e+=4,i!=-1&&(we(t,e,n.crc),we(t,e+4,i<0?-i-2:i),we(t,e+8,n.size)),we(t,e+12,c),we(t,e+14,d),e+=16,o!=null&&(we(t,e,u),we(t,e+6,n.attrs),we(t,e+10,o),e+=14),t.set(r,e),e+=c,d)for(var h in l){var m=l[h],g=m.length;we(t,e,+h),we(t,e+2,g),t.set(m,e+4),e+=4+g}return u&&(t.set(a,e),e+=u),e},oa=function(t,e,n,r,s){we(t,e,101010256),we(t,e+8,n),we(t,e+10,n),we(t,e+12,r),we(t,e+16,s)},Qr=(function(){function t(e){this.filename=e,this.c=fr(),this.size=0,this.compression=0}return t.prototype.process=function(e,n){this.ondata(null,e,n)},t.prototype.push=function(e,n){this.ondata||te(5),this.c.p(e),this.size+=e.length,n&&(this.crc=this.c.d()),this.process(e,n||!1)},t})(),Db=(function(){function t(e,n){var r=this;n||(n={}),Qr.call(this,e),this.d=new xt(n,function(s,i){r.ondata(null,s,i)}),this.compression=8,this.flag=Jl(n.level)}return t.prototype.process=function(e,n){try{this.d.push(e,n)}catch(r){this.ondata(r,null,n)}},t.prototype.push=function(e,n){Qr.prototype.push.call(this,e,n)},t})(),Fb=(function(){function t(e,n){var r=this;n||(n={}),Qr.call(this,e),this.d=new Vl(n,function(s,i,o){r.ondata(s,i,o)}),this.compression=8,this.flag=Jl(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(e,n){this.d.push(e,n)},t.prototype.push=function(e,n){Qr.prototype.push.call(this,e,n)},t})(),Lb=(function(){function t(e){this.ondata=e,this.u=[],this.d=1}return t.prototype.add=function(e){var n=this;if(this.ondata||te(5),this.d&2)this.ondata(te(4+(this.d&1)*8,0,1),null,!1);else{var r=Sn(e.filename),s=r.length,i=e.comment,o=i&&Sn(i),a=s!=e.filename.length||o&&i.length!=o.length,c=s+yn(e.extra)+30;s>65535&&this.ondata(te(11,0,1),null,!1);var l=new ue(c);cr(l,0,e,r,a,-1);var u=[l],d=function(){for(var g=0,y=u;g<y.length;g++){var v=y[g];n.ondata(null,v,!1)}u=[]},f=this.d;this.d=0;var p=this.u.length,h=ns(e,{f:r,u:a,o,t:function(){e.terminate&&e.terminate()},r:function(){if(d(),f){var g=n.u[p+1];g?g.r():n.d=1}f=1}}),m=0;e.ondata=function(g,y,v){if(g)n.ondata(g,y,v),n.terminate();else if(m+=y.length,u.push(y),v){var x=new ue(16);we(x,0,134695760),we(x,4,e.crc),we(x,8,m),we(x,12,e.size),u.push(x),h.c=m,h.b=c+m+16,h.crc=e.crc,h.size=e.size,f&&h.r(),f=1}else f&&d()},this.u.push(h)}},t.prototype.end=function(){var e=this;if(this.d&2){this.ondata(te(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var e=0,n=0,r=0,s=0,i=this.u;s<i.length;s++){var o=i[s];r+=46+o.f.length+yn(o.extra)+(o.o?o.o.length:0)}for(var a=new ue(r+22),c=0,l=this.u;c<l.length;c++){var o=l[c];cr(a,e,o,o.f,o.u,-o.c-2,n,o.o),e+=46+o.f.length+yn(o.extra)+(o.o?o.o.length:0),n+=o.b}oa(a,e,this.u.length,r,n),this.ondata(null,a,!0),this.d=2},t.prototype.terminate=function(){for(var e=0,n=this.u;e<n.length;e++){var r=n[e];r.t()}this.d=2},t})();nu=(function(){function t(){}return t.prototype.push=function(e,n){this.ondata(null,e,n)},t.compression=0,t})(),zb=(function(){function t(){var e=this;this.i=new st(function(n,r){e.ondata(null,n,r)})}return t.prototype.push=function(e,n){try{this.i.push(e,n)}catch(r){this.ondata(r,null,n)}},t.compression=8,t})(),Wb=(function(){function t(e,n){var r=this;n<32e4?this.i=new st(function(s,i){r.ondata(null,s,i)}):(this.i=new na(function(s,i,o){r.ondata(s,i,o)}),this.terminate=this.i.terminate)}return t.prototype.push=function(e,n){this.i.terminate&&(e=vt(e,0)),this.i.push(e,n)},t.compression=8,t})(),jb=(function(){function t(e){this.onfile=e,this.k=[],this.o={0:nu},this.p=Ft}return t.prototype.push=function(e,n){var r=this;if(this.onfile||te(5),this.p||te(4),this.c>0){var s=Math.min(this.c,e.length),i=e.subarray(0,s);if(this.c-=s,this.d?this.d.push(i,!this.c):this.k[0].push(i),e=e.subarray(s),e.length)return this.push(e,n)}else{var o=0,a=0,c=void 0,l=void 0;this.p.length?e.length?(l=new ue(this.p.length+e.length),l.set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var u=l.length,d=this.c,f=d&&this.d,p=function(){var y=Le(l,a);if(y==67324752){o=1,c=a,h.d=null,h.c=0;var v=nt(l,a+6),x=nt(l,a+8),b=v&2048,P=v&8,_=nt(l,a+26),w=nt(l,a+28);if(u>a+30+_+w){var S=[];h.k.unshift(S),o=2;var C=Le(l,a+18),$=Le(l,a+22),N=ia(l.subarray(a+30,a+=30+_),!b),R=tu(l,a,w,2,C,$,0),W=R[0],Y=R[1],Q=R[3];P&&(W=-1-Q),a+=w,h.c=W;var E,A={name:N,compression:x,start:function(){if(A.ondata||te(5),!W)A.ondata(null,Ft,!0);else{var I=r.o[x];I||A.ondata(te(14,"unknown compression type "+x,1),null,!1),E=W<0?new I(N):new I(N,W,Y),E.ondata=function(J,F,j){A.ondata(J,F,j)};for(var D=0,z=S;D<z.length;D++){var Z=z[D];E.push(Z,!1)}r.k[0]==S&&r.c?r.d=E:E.push(Ft,!0)}},terminate:function(){E&&E.terminate&&E.terminate()}};W>=0&&(A.size=W,A.originalSize=Y),h.onfile(A)}return"break"}else if(d){if(y==134695760)return c=a+=12+(d==-2&&8),o=3,h.c=0,"break";if(y==33639248)return c=a-=4,o=3,h.c=0,"break"}},h=this;a<u-4;++a){var m=p();if(m==="break")break}if(this.p=Ft,d<0){var g=o?l.subarray(0,c-12-(d==-2&&8)-(Le(l,c-16)==134695760&&4)):l.subarray(0,a);f?f.push(g,!!o):this.k[+(o==2)].push(g)}if(o&2)return this.push(l.subarray(a),n);this.p=l.subarray(a)}n&&(this.c&&te(13),this.p=null)},t.prototype.register=function(e){this.o[e.compression]=e},t})(),ti=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()}});function Hb(t){let e=Buffer.from(Rn(t));return Buffer.concat([si,e])}function su(t){if(!t.subarray(0,si.length).equals(si))return null;try{return Buffer.from(Lt(t.subarray(si.length)))}catch{return null}}var si,iu,ou,au=k(()=>{"use strict";Sr();ae();si=Buffer.from("BZhVFS\0");iu={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.includes("-d")||n.includes("--decompress"),a=n.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=B(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=su(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let f=c.slice(0,-4);return t.vfs.writeFile(f,d,{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,Hb(l),{},r,s),i||t.vfs.remove(c,{recursive:!1},r,s),{exitCode:0}}},ou={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=n.includes("-k")||n.includes("--keep"),o=n.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=B(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=su(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},r,s),i||t.vfs.remove(a,{recursive:!1},r,s),{exitCode:0}}}});var cu,lu=k(()=>{"use strict";ee();ae();cu={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s,uid:i,gid:o})=>{let a=M(r,["-n","--number"]),c=M(r,["-b","--number-nonblank"]),l=r.filter(h=>!h.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let h of l){let m=ll(e.vfs,n,h);Qe(e.vfs,e.users,t,m,4),u.push(e.vfs.readFile(m,i,o))}let d=u.join("");if(!(a||c))return{stdout:d,exitCode:0};let f=1;return{stdout:d.split(`
`).map(h=>c&&h.trim()===""?h:`${String(f++).padStart(6)}	${h}`).join(`
`),exitCode:0}}}});var ii=k(()=>{"use strict";gn();tt()});async function oi(t,e,n,r,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let f=t[u];if(f.subshell){let h={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await oi(f.subshell.statements,e,n,r,l,i,h),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(f.group){if(a=await oi(f.group.statements,e,n,r,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(f.background&&f.pipeline){let h=new AbortController;uu(f.pipeline,e,n,"background",l,i,o,h),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!f.pipeline){u++;continue}if(a=await uu(f.pipeline,e,n,r,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let p=f.op;if(!(!p||p===";")){if(p==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(p==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l===s?void 0:l}}function uu(t,e,n,r,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?qb(t.commands[0],e,n,r,s,i,c,a):Yb(t.commands,e,n,r,s,i,c)}async function qb(t,e,n,r,s,i,o,a){let c;if(t.hereString!==void 0)c=t.hereString;else if(t.inputFile){let d=B(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=r==="background",u=await Ln(t.name,t.args,e,n,r,s,i,c,o,l,a);if(t.outputFile){let d=B(s,t.outputFile),f=u.stdout||"",p=i.users.getUid(e),h=i.users.getGid(e);try{if(t.appendOutput){let m=(()=>{try{return i.vfs.readFile(d,p,h)}catch{return""}})();i.vfs.writeFile(d,m+f,{},p,h)}else i.vfs.writeFile(d,f,{},p,h);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function Yb(t,e,n,r,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let p=B(s,u.inputFile);try{a=i.vfs.readFile(p)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await Ln(u.name,u.args,e,n,r,s,i,a,o);c=d.exitCode??0;let f=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&f.stderr){let p=B(s,u.stderrFile),h=i.users.getUid(e),m=i.users.getGid(e);try{let g=(()=>{try{return i.vfs.readFile(p,h,m)}catch{return""}})();i.vfs.writeFile(p,u.stderrAppend?g+f.stderr:f.stderr,{},h,m)}catch{}}if(l===t.length-1&&u.outputFile){let p=B(s,u.outputFile),h=d.stdout||"",m=i.users.getUid(e),g=i.users.getGid(e);try{if(u.appendOutput){let y=(()=>{try{return i.vfs.readFile(p,m,g)}catch{return""}})();i.vfs.writeFile(p,y+h,{},m,g)}else i.vfs.writeFile(p,h,{},m,g);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=f.stdout||"";if(f.stderr&&c!==0)return{stderr:f.stderr,exitCode:c};if(f.closeSession||f.switchUser)return f}return{stdout:a,exitCode:c}}var du=k(()=>{"use strict";ii();ae()});function is(t){let e=[],n="",r=!1,s="",i=0;for(;i<t.length;){let o=t.charAt(i),a=t[i+1];if((o==='"'||o==="'")&&!r){r=!0,s=o,i++;continue}if(r&&o===s){r=!1,s="",i++;continue}if(r){n+=o,i++;continue}if(o===" "){n&&(e.push(n),n=""),i++;continue}if(!r&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){n&&e.push(n),n="",e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){n&&e.push(n),n="",e.push("2>&1"),i+=4;continue}if(c===">"){n&&e.push(n),n="",e.push("2>>"),i+=3;continue}n&&e.push(n),n="",e.push("2>"),i+=2;continue}if(o==="|"&&a==="&"){n&&e.push(n),n="",e.push("|&"),i+=2;continue}if(o==="<"&&a==="<"){let c=t[i+2];if(c==="<"){n&&e.push(n),n="",e.push("<<<"),i+=3;continue}if(c==="-"){n&&e.push(n),n="",e.push("<<-"),i+=3;continue}n&&e.push(n),n="",e.push("<<"),i+=2;continue}if(o==="<"&&a===">"){n&&e.push(n),n="",e.push("<>"),i+=2;continue}if((o===">"||o==="<")&&!r){n&&(e.push(n),n=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}n+=o,i++}return n&&e.push(n),e}var ua=k(()=>{"use strict"});function Kb(t,e){let n=!1,r=!1;for(let s=0;s<e&&s<t.length;s++){let i=t[s];i==="'"&&!r?n=!n:i==='"'&&!n&&(r=!r)}return n||r}function ai(t){if(!t.includes("<<"))return t;let e=t.split(`
`),n=[],r=0;for(;r<e.length;){let s=e[r],i=s.match(/^(.*?)(?<!<)<<(?!<)(-?)\s+(\S+)(.*)$/);if(i){let o=i[1]??"",a=o.length;if(Kb(s,a)){n.push(s),r++;continue}let c=(i[2]??"")==="-",l=i[3]??"",u=i[4]??"",d=[];for(r++;r<e.length;){let h=c?e[r].replace(/^\t+/,""):e[r];if(h===l)break;d.push(h),r++}let p=d.join(`
`).replace(/'/g,"'\\''");n.push(`${o}<<< '${p}'${u}`)}else n.push(s);r++}return n.join(`
`)}function fu(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{let n=ai(e);return{statements:da(n),isValid:!0}}catch(n){return{statements:[],isValid:!1,error:n.message}}}function da(t){let e=Xb(t),n=[];for(let r of e){let s=r.text.trim(),i={};if(r.op&&(i.op=r.op),r.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:da(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:da(o)}}else{let o=Zb(s);i.pipeline=o}n.push(i)}return n}function Xb(t){let e=[],n="",r=0,s=!1,i="",o=0,a=(c,l)=>{n.trim()&&e.push({text:n,op:c,background:l}),n=""};for(;o<t.length;){let c=t.charAt(o),l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,n+=c,o++;continue}if(s&&c===i){s=!1,n+=c,o++;continue}if(s){n+=c,o++;continue}if(c==="("){r++,n+=c,o++;continue}if(c===")"){r--,n+=c,o++;continue}if(r>0){n+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){n+=c,o++;continue}let u=n.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){n+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}n+=c,o++}return a(),e}function Zb(t){let e=Jb(t);return{commands:e.map(Qb),isValid:!0,pipeStderr:e.rawPipeStderr}}function Jb(t){let e=[],n="",r=!1,s="",i=!1;for(let a=0;a<t.length;a++){let c=t.charAt(a);if((c==='"'||c==="'")&&!r){r=!0,s=c,n+=c;continue}if(r&&c===s){r=!1,n+=c;continue}if(r){n+=c;continue}if(c==="|"&&t[a+1]==="&"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n="",i=!0,a++;continue}if(c==="|"&&t[a+1]!=="|"){if(!n.trim())throw new Error("Syntax error near unexpected token '|'");e.push(n.trim()),n="";continue}n+=c}let o=n.trim();if(!o&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return o&&e.push(o),e.rawPipeStderr=i,e}function Qb(t){let e=is(t);if(e.length===0)return{name:"",args:[]};let n=[],r,s,i=!1,o=0,a,c=!1,l=!1,u,d,f,p=!1;for(;o<e.length;){let g=e[o];if(g==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");r=e[o],o++}else if(g==="<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<");f=e[o],o++}else if(g==="<<-"){if(o++,o>=e.length)throw new Error("Syntax error: expected delimiter after <<-");f=e[o],p=!0,o++}else if(g==="<<<"){if(o++,o>=e.length)throw new Error("Syntax error: expected word after <<<");let y=e[o];d=y.startsWith("'")&&y.endsWith("'")&&y.length>=2?y.slice(1,-1):y,o++}else if(g==="<>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <>");u=e[o],o++}else if(g===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(g===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(g==="&>"||g==="&>>"){let y=g==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${g}`);s=e[o],i=y,l=!0,o++}else if(g==="2>&1")l=!0,o++;else if(g==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(g==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else n.push(g),o++}let h=n[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(h)?h:h.toLowerCase(),args:n.slice(1),inputFile:r,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l,readWriteFile:u,hereString:d,hereDoc:f,hereDocStripTab:p}}var fa=k(()=>{"use strict";ua()});var gu={};Us(gu,{applyUserSwitch:()=>nn,makeDefaultEnv:()=>wt,runCommand:()=>xe,runCommandDirect:()=>Ln,userHome:()=>ge});function ge(t){return t==="root"?"/root":`/home/${t}`}async function nn(t,e,n,r,s){r.vars.USER=t,r.vars.LOGNAME=t,r.vars.HOME=ge(t),r.vars.PS1=wt(t,e).vars.PS1??"";let i=`${ge(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await xe(a,t,e,"shell",n,s,void 0,r)}catch{}}}function wt(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:ge(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function mu(t,e,n,r){if(t.startsWith("/")){if(!n.vfs.exists(t))return null;try{let o=n.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&r!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&r!=="root")continue;let a=`${o}/${t}`;if(n.vfs.exists(a))try{let c=n.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}function hu(t,e,n,r,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let h=Xe(f[1]);if(h){let m=c.users.getUid(s),g=c.users.getGid(s);return h.run({authUser:s,uid:m,gid:g,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:r,mode:o,args:n,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${f[1]}' not found`,exitCode:127}}let p=Xe("sh");if(p){let h=c.users.getUid(s),m=c.users.getGid(s);return p.run({authUser:s,uid:h,gid:m,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}function Ln(t,e,n,r,s,i,o,a,c,l=!1,u){if(rn++,rn>ci)return rn--,{stderr:`${t}: maximum call depth (${ci}) exceeded`,exitCode:126};let d=rn===1,f=1,p=c.vars.NICE_PRIORITY?Number.parseInt(c.vars.NICE_PRIORITY,10):0,h=d?o.users.registerProcess(n,t,[t,...e],c.vars.__TTY??"?",u,f,Number.isNaN(p)?0:p):-1,m=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let g=cv(t,e,n,r,s,i,o,a,c);if(u){let y=new Promise(v=>{u.signal.addEventListener("abort",()=>{v({stderr:"",exitCode:130})},{once:!0})});return Promise.race([g,y])}return g}finally{rn--,d&&h!==-1&&(o.users.addProcessCpuTime(h,Date.now()-m),l?o.users.markProcessDone(h):o.users.unregisterProcess(h))}}async function cv(t,e,n,r,s,i,o,a,c){let l=pu,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let m=u.slice(0,d).map(v=>v.match(l)).filter(v=>v!==null),g=u.slice(d),y=[];for(let[,v,x]of m)v!==void 0&&x!==void 0&&(y.push([v,c.vars[v]]),c.vars[v]=x);if(g.length===0)return{exitCode:0};try{return await Ln(g[0],g.slice(1),n,r,s,i,o,a,c)}finally{for(let[v,x]of y)x===void 0?delete c.vars[v]:c.vars[v]=x}}let f=c.vars[`__func_${t}`];if(f){let m=Xe("sh");if(!m)return{stderr:`${t}: sh not available`,exitCode:127};let g={};e.forEach((y,v)=>{g[String(v+1)]=c.vars[String(v+1)],c.vars[String(v+1)]=y}),g[0]=c.vars[0],c.vars[0]=t;try{let y=o.users.getUid(n),v=o.users.getGid(n);return await m.run({authUser:n,uid:y,gid:v,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:f,mode:s,args:["-c",f],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[y,v]of Object.entries(g))v===void 0?delete c.vars[y]:c.vars[y]=v}}let p=c.vars[`__alias_${t}`];if(p)return xe(`${p} ${e.join(" ")}`,n,r,s,i,o,a,c);let h=Xe(t);if(!h){let m=mu(t,c,o,n);return m?hu(m,t,e,[t,...e].join(" "),n,r,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let m=o.users.getUid(n),g=o.users.getGid(n);return await h.run({authUser:n,uid:m,gid:g,hostname:r,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(m){return{stderr:m instanceof Error?m.message:"Command failed",exitCode:1}}}async function xe(t,e,n,r,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??wt(e,n);if(rn++,rn>ci)return rn--,{stderr:`${c.split(" ")[0]}: maximum call depth (${ci}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let S=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(S)){let C=i.vfs.readFile(S).split(`
`).filter(Boolean),$;if(c==="!!"||c.startsWith("!! "))$=C[C.length-1];else{let N=Number.parseInt(c.slice(1),10);$=N>0?C[N-1]:C[C.length+N]}if($){let N=c.startsWith("!! ")?c.slice(3):"";return xe(`${$}${N?` ${N}`:""}`,e,n,r,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=is(c)[0]?.toLowerCase()??"",f=l.vars[`__alias_${d}`],p=f?c.replace(d,f):c,h=ev.test(p)||tv.test(p)||nv.test(p)||rv.test(p)||sv.test(p)||iv.test(p),m=ov.test(p)||av.test(p);if(h&&d!=="sh"&&d!=="bash"||m){if(h&&d!=="sh"&&d!=="bash"){let C=Xe("sh");if(C){let $=i.users.getUid(e),N=i.users.getGid(e);return await C.run({authUser:e,uid:$,gid:N,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:p,mode:r,args:["-c",p],stdin:void 0,cwd:s,shell:i,env:l})}}let S=fu(p);if(!S.isValid)return{stderr:S.error||"Syntax error",exitCode:1};try{return await oi(S.statements,e,n,r,s,i,l)}catch(C){return{stderr:C instanceof Error?C.message:"Execution failed",exitCode:1}}}let g=await Gs(p,l.vars,l.lastExitCode,S=>xe(S,e,n,r,s,i,void 0,l).then(C=>C.stdout??"")),y=is(g.trim());if(y.length===0)return{exitCode:0};if(pu.test(y[0]))return Ln(y[0],y.slice(1),e,n,r,s,i,o,l);let x=y[0]?.toLowerCase()??"",b=y.slice(1),P=[],_={dotglob:l.vars.__dotglob==="1",nullglob:l.vars.__nullglob==="1",failglob:l.vars.__failglob==="1"};for(let S of b)for(let C of Vs(S)){let $=xl(C,s,i.vfs,_);if(!($.length===0&&_.nullglob)){if($.length===1&&$[0]===C&&_.failglob&&(C.includes("*")||C.includes("?")))return{stderr:`${x}: no match: ${C}`,exitCode:1};for(let N of $)P.push(N)}}let w=Xe(x);if(!w){let S=mu(x,l,i,e);return S?hu(S,x,P,g,e,n,r,s,i,l,o):{stderr:`${x}: command not found`,exitCode:127}}try{let S=i.users.getUid(e),C=i.users.getGid(e);return await w.run({authUser:e,uid:S,gid:C,hostname:n,activeSessions:i.users.listActiveSessions(),rawInput:g,mode:r,args:P,stdin:o,cwd:s,shell:i,env:l})}catch(S){return{stderr:S instanceof Error?S.message:"Command failed",exitCode:1}}}finally{rn--}}var pu,ev,tv,nv,rv,sv,iv,ov,av,ci,rn,tt=k(()=>{"use strict";du();fa();Xr();ua();gn();pu=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,ev=/\bfor\s+\w+\s+in\b/,tv=/\bwhile\s+/,nv=/\bif\s+/,rv=/\w+\s*\(\s*\)\s*\{/,sv=/\bfunction\s+\w+/,iv=/\(\(\s*.+\s*\)\)/,ov=/(?<![|&])[|](?![|])/,av=/[><;&]|\|\|/;ci=8;rn=0});var yu,Su=k(()=>{"use strict";ae();tt();yu={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=B(n,r[0]??"~",ge(t));return be(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var bu,vu=k(()=>{"use strict";bu={name:"chage",description:"Change user password expiry information",category:"users",params:["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],run:async({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`chage: permission denied
`,exitCode:1};let r,s,i,o,a,c=!1,l;for(let f=0;f<n.length;f++){let p=n[f];if(p)if(p==="-m"){let h=n[f+1];if(!h)break;if(r=Number.parseInt(h,10),Number.isNaN(r))return{stderr:`chage: invalid number '${h}'
`,exitCode:1};f++}else if(p==="-M"){let h=n[f+1];if(!h)break;if(s=Number.parseInt(h,10),Number.isNaN(s))return{stderr:`chage: invalid number '${h}'
`,exitCode:1};f++}else if(p==="-W"){let h=n[f+1];if(!h)break;if(i=Number.parseInt(h,10),Number.isNaN(i))return{stderr:`chage: invalid number '${h}'
`,exitCode:1};f++}else if(p==="-I"){let h=n[f+1];if(!h)break;if(o=Number.parseInt(h,10),Number.isNaN(o))return{stderr:`chage: invalid number '${h}'
`,exitCode:1};f++}else if(p==="-E"){let h=n[f+1];if(!h)break;if(h==="-1"||h==="99999")a=0;else if(a=Math.floor(new Date(h).getTime()/864e5),Number.isNaN(a))return{stderr:`chage: invalid date '${h}'
`,exitCode:1};f++}else p==="-l"?c=!0:l||(l=p)}if(!l)return{stderr:`Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>
`,exitCode:1};if(!e.users.listUsers().includes(l))return{stderr:`chage: user '${l}' does not exist
`,exitCode:1};if(c){let f=e.users.getPasswordAging(l);if(!f)return{stderr:`chage: user '${l}' not found
`,exitCode:1};let p=v=>v===0?"never":new Date(v*864e5).toISOString().split("T")[0],h=p(f.lastChange),m=f.maxAge===99999?"never":p(f.lastChange+f.maxAge),g=f.inactiveDays>0?p(f.lastChange+f.maxAge+f.inactiveDays):"never",y=p(f.expiryDate);return{stdout:`${[`Last password change                                    : ${h}`,`Password expires                                        : ${m}`,`Password inactive                                       : ${g}`,`Account expires                                         : ${y}`,`Minimum number of days between password change          : ${f.minAge}`,`Maximum number of days between password change          : ${f.maxAge}`,`Number of days of warning before password expires       : ${f.warnDays}`].join(`
`)}
`,exitCode:0}}let d=l;try{return await e.users.setPasswordAging(d,r,s,i,o),a!==void 0&&await e.users.setAccountExpiry(d,a),{stdout:`chage: password aging updated for '${d}'
`,exitCode:0}}catch(f){return{stderr:`${f instanceof Error?f.message:String(f)}
`,exitCode:1}}}}});function lv(t,e){let n=t.users.getGidByName(e);if(n!==null)return n;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var xu,Cu=k(()=>{"use strict";ae();xu={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let[s,i]=r;if(!(s&&i))return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=B(n,i);try{if(be(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=lv(e,s);if(a===null)return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function uv(t,e){let n=/^([ugoa]*)([+\-=])([rwx]*)$/,r=e.split(","),s=t;for(let i of r){let o=i.trim().match(n);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let f of u)for(let p of l.split("")){let h=d[f]?.[p];if(h!==void 0){if(c==="+")s|=h;else if(c==="-")s&=~h;else if(c==="="){let m=Object.values(d[f]??{}).reduce((g,y)=>g|y,0);s=s&~m|h}}}}return s}var wu,_u=k(()=>{"use strict";ae();wu={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chmod: missing operand",exitCode:1};let a=B(n,o);try{if(be(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=Number.parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=uv(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function Iu(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}function dv(t,e){let n=t.users.getGidByName(e);if(n!==null)return n;let r=Number.parseInt(e,10);return Number.isNaN(r)?null:r}var Eu,$u=k(()=>{"use strict";ae();Eu={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s})=>{let[i,o]=r;if(!(i&&o))return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=B(n,o);try{if(be(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=Iu(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let f=i.slice(0,u),p=i.slice(u+1);if(f&&(c=Iu(e,f),c===null))return{stderr:`chown: invalid user: ${f}`,exitCode:1};if(p&&(l=dv(e,p),l===null))return{stderr:`chown: invalid group: ${p}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var Pu,ku=k(()=>{"use strict";Pu={name:"caller",description:"Print the current call stack",category:"shell",params:["[n]"],run:({args:t})=>{let e=t.length>0?Number.parseInt(t[0],10):0;return e<0?{exitCode:1}:{stdout:`${e} 0 main
`,exitCode:0}}}});var Mu,Nu=k(()=>{"use strict";Mu={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var Au,Tu=k(()=>{"use strict";Au={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:t,shell:e})=>{let n=e.network;if(t.includes("-L")||t.includes("--list")||t.length===0){let r=n.getConntrack();return r.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
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
  -G, --get       Get entry`,exitCode:1}}}});function fv(t,e){let n=t.indexOf("-u");return n!==-1&&n+1<t.length?e!=="root"?{stderr:"crontab: only root can use -u",exitCode:1}:t[n+1]:e}function pv(t,e){return t.exists(e)?{stdout:t.readFile(e),exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function mv(t,e){return t.exists(e)?{stdout:`${t.readFile(e)}
`,exitCode:0}:{stdout:`no crontab for this user
`,exitCode:0}}function hv(t,e,n){return t.exists(e)?n?{stdout:"Remove crontab for this user? (y/N) ",exitCode:0}:(t.remove(e),{stdout:"",exitCode:0}):{stdout:`no crontab for this user
`,exitCode:0}}function gv(t,e,n){if(!t.exists(n))return{stderr:`crontab: ${n}: No such file`,exitCode:1};let r=t.readFile(n);return yv(r)?(Sv(t,Ou),t.writeFile(e,r,{mode:420}),{stdout:"",exitCode:0}):{stderr:"crontab: errors in crontab file",exitCode:1}}function yv(t){let e=t.split(`
`);for(let n of e){let r=n.trim();if(!r||r.startsWith("#"))continue;let s=r.split(/\s+/);if(s.length<6)return!1;let i=s.slice(0,5);for(let o of i)if(o!=="*"&&!/^\d+(-\d+)?(,\d+)*$/.test(o))return!1}return!0}function Sv(t,e){t.exists(e)||t.mkdir(e,493)}var Ou,Ru,Du=k(()=>{"use strict";ee();Ou="/var/spool/cron/crontabs",Ru={name:"crontab",description:"Manage per-user crontab files",category:"system",params:["[-u user] [-e|-l|-r] [file]"],run:({shell:t,args:e,authUser:n})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: crontab [options] [file]","  -u <user>    Specify user (root only)","  -e           Edit crontab (opens editor)","  -l           List current crontab entries","  -r           Remove current crontab","  -i           Prompt before removal","  -h, --help   Show this help","","Without options, install a crontab from file (or stdin)."].join(`
`),exitCode:0};let r=t.vfs,s=fv(e,n);if(s instanceof Object)return s;let i=`${Ou}/${s}`;if(M(e,["-e"]))return pv(r,i);if(M(e,["-l"]))return mv(r,i);if(M(e,["-r"]))return hv(r,i,M(e,["-i"]));let o=e.find(a=>!a.startsWith("-"));return o?gv(r,i,o):{stderr:"crontab: no options or file specified",exitCode:1}}}});var Fu,Lu,Uu,Bu,zu,Wu,ju,Vu,Gu,Hu=k(()=>{"use strict";ae();Fu={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:n,mode:r,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(tt(),gu)),l=t.slice(1).join(" ");return c(l,e,n,r,s,i,a,o)}},Lu={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e,authUser:n})=>{let r=t.includes("-d"),s=t.find(d=>!d.startsWith("-"))??"tmp.XXXXXXXXXX",i=s.replace(/X+$/,"")||"tmp.",o=Math.random().toString(36).slice(2,10),a=`${i}${o}`,c=a.startsWith("/")?a:`/tmp/${a}`,l=e.users.getUid(n),u=e.users.getGid(n);try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp",1023,0,0),r?e.vfs.mkdir(c,448,l,u):e.vfs.writeFile(c,"",{},l,u)}catch{return{stderr:`mktemp: failed to create ${r?"directory":"file"} via template '${s}'`,exitCode:1}}return{stdout:c,exitCode:0}}},Uu={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:t})=>{let e=t.resourceCaps?.cpuCapCores;return{stdout:`${e!==void 0&&e>0?e:4}`,exitCode:0}}},Bu={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[-n] [job_id...]"],run:({args:t,shell:e,env:n})=>{let r=t.includes("-n"),s=t.filter(o=>o!=="-n"),i=e.users.listProcesses();if(r){let o=i.filter(c=>c.status==="running"||c.status==="stopped");if(o.length===0)return n&&(n.vars.__wait_exit="127"),{exitCode:127};let a=o.pop();return a&&n&&(n.vars.__wait_exit=String(a.exitCode??0)),{exitCode:a?.exitCode??0}}if(s.length>0){for(let o of s){let a=Number.parseInt(o.replace(/^%?/,""),10),c=i.find(l=>l.pid===a);c&&(c.status="done")}return{exitCode:0}}for(let o of i)o.status="done";return{exitCode:0}}},zu={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let f=Number.parseInt(d[1],10),p=Number.parseInt(d[2],10),h=[];for(let y=f;y<=p;y++)h.push(y);for(let y=h.length-1;y>0;y--){let v=Math.floor(Math.random()*(y+1));[h[y],h[v]]=[h[v],h[y]]}let m=t.indexOf("-n"),g=m===-1?h.length:Number.parseInt(t[m+1]??"0",10);return{stdout:h.slice(0,g).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=B(r??"/",o);if(!n.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=n.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c===-1?a.length:Number.parseInt(t[c+1]??"0",10);return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},Wu={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=B(r??"/",u);return n.vfs.exists(d)?n.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},ju={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=B(r??"/",o);if(!n.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=n.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},Vu={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=B(r??"/",s);if(!n.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=n.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},Gu={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:n,cwd:r})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i===-1?/\s+/:t[i+1]??"	",a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=B(r??"/",a);if(!n.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=n.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(p=>p.split(o)),d=[];for(let p of u)p.forEach((h,m)=>{d[m]=Math.max(d[m]??0,h.length)});return{stdout:u.map(p=>p.map((h,m)=>h.padEnd(d[m]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import*as qu from"node:path";var Yu,Ku=k(()=>{"use strict";ee();ae();Yu={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] [-i] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=M(r,["-r","-R","--recursive"]),a=M(r,["-i"]),c=r.filter(p=>!p.startsWith("-")),[l,u]=c;if(!(l&&u))return{stderr:"cp: missing operand",exitCode:1};let d=B(n,l),f=B(n,u);try{if(Qe(e.vfs,e.users,t,d,4),Qe(e.vfs,e.users,t,qu.posix.dirname(f),2),!e.vfs.exists(d))return{stderr:`cp: ${l}: No such file or directory`,exitCode:1};let p=e.vfs.stat(d),h=m=>{if(p.type==="directory"){if(!o)return{stderr:`cp: ${l}: is a directory (use -r)`,exitCode:1};let g=(v,x)=>{m.vfs.mkdir(x,493,s,i);for(let b of m.vfs.list(v)){let P=`${v}/${b}`,_=`${x}/${b}`;if(m.vfs.stat(P).type==="directory")g(P,_);else{let S=m.vfs.readFileRaw(P);m.vfs.writeFile(_,S,{},s,i)}}},y=m.vfs.exists(f)&&m.vfs.stat(f).type==="directory"?`${f}/${l.split("/").pop()}`:f;g(d,y)}else{let g=m.vfs.exists(f)&&m.vfs.stat(f).type==="directory"?`${f}/${l.split("/").pop()}`:f,y=m.vfs.readFileRaw(d);m.vfs.writeFile(g,y,{},s,i)}return{exitCode:0}};if(a&&e.vfs.exists(f)&&e.vfs.stat(f).type==="file"){let m=p.type==="directory"?l:u;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:`cp: overwrite '${m}'? [y/N] `,mode:"confirm",onPassword:(g,y)=>{let v=g.trim().toLowerCase();return v!=="y"&&v!=="yes"?Promise.resolve({result:{stdout:`cp: cancelled
`,exitCode:1}}):Promise.resolve({result:h(y)})}},exitCode:0}}return h(e)}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});function vv(t){let e=t.replace(/^\[|\]$/g,"").toLowerCase();return bv.some(n=>n.test(e))}function li(t,e){if(!e||e.mode==="allow-all"||!e.mode)return{allowed:!0,honeypot:!1};let n;try{n=new URL(t).hostname}catch{return{allowed:!0,honeypot:!1}}return e.mode==="block-private"&&vv(n)?{allowed:!1,reason:"private address",honeypot:e.honeypot??!1}:e.mode==="blocklist"&&e.blocklist&&e.blocklist.some(s=>n===s||n.endsWith(`.${s}`))?{allowed:!1,reason:"blocklisted",honeypot:e.honeypot??!1}:e.mode==="allowlist"&&e.allowlist&&!e.allowlist.some(s=>n===s||n.endsWith(`.${s}`))?{allowed:!1,reason:"not in allowlist",honeypot:e.honeypot??!1}:{allowed:!0,honeypot:!1}}function ui(t){return new Response(xv,{status:200,statusText:"OK",headers:{"content-type":"text/html",server:"nginx/1.24.0",date:new Date().toUTCString()}})}var bv,xv,pa=k(()=>{"use strict";bv=[/^127\./,/^10\./,/^172\.(1[6-9]|2\d|3[01])\./,/^192\.168\./,/^0\./,/^169\.254\./,/^::1$/,/^f[cd][0-9a-f]{2}:/,/^fe80:/];xv=`<!DOCTYPE html>
<html>
<head><title>Welcome to nginx!</title></head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed.</p>
</body>
</html>`});var Xu,Zu=k(()=>{"use strict";ee();ae();pa();Xu={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Me(n,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(M(n,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(w=>!w.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,f=o.get("-H")??o.get("--header")??null,p=M(n,["-s","--silent"]),h=M(n,["-I","--head"]),m=M(n,["-L","--location"]),g=M(n,["-v","--verbose"]),y={"User-Agent":"curl/7.88.1"};if(f){let w=f.indexOf(":");w!==-1&&(y[f.slice(0,w).trim()]=f.slice(w+1).trim())}let v=d&&u==="GET"?"POST":u,x={method:v,headers:y,redirect:m?"follow":"manual"};d&&(y["Content-Type"]??="application/x-www-form-urlencoded",x.body=d);let b=[];g&&(b.push(`* Trying ${c}...`,"* Connected"),b.push(`> ${v} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let P;try{let w=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,S=new URL(w),C=S.port?Number.parseInt(S.port,10):S.protocol==="https:"?443:80,$=li(w,r.resourceCaps?.outboundRestriction);if($.allowed){let N=r.network.checkFirewall("OUTPUT","tcp",void 0,S.hostname,C);if(N==="DROP"||N==="REJECT")return{stderr:`curl: (7) Failed to connect to ${S.hostname} port ${C}: Connection refused`,exitCode:7};P=await fetch(w,x)}else if($.honeypot)P=ui(w);else return{stderr:`curl: (7) Failed to connect to ${S.hostname} port ${C}: ${$.reason}`,exitCode:7}}catch(w){return{stderr:`curl: (6) Could not resolve host: ${w instanceof Error?w.message:String(w)}`,exitCode:6}}if(g&&b.push(`< HTTP/1.1 ${P.status} ${P.statusText}`),h){let w=[`HTTP/1.1 ${P.status} ${P.statusText}`];for(let[S,C]of P.headers.entries())w.push(`${S}: ${C}`);return{stdout:`${w.join(`\r
`)}\r
`,exitCode:0}}let _;try{_=await P.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let w=B(e,l);return be(t,w,"curl"),r.vfs.writeFile(w,_,{},s,i),p||b.push(`  % Total    % Received
100 ${_.length}  100 ${_.length}`),{stderr:b.join(`
`)||void 0,exitCode:P.ok?0:22}}return{stdout:_,stderr:b.length>0?b.join(`
`):void 0,exitCode:P.ok?0:22}}}});var Ju,Qu=k(()=>{"use strict";ee();Ju={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let n=Tn(t,["-d"])??"	",s=(Tn(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l===void 0?{from:(c??1)-1,to:(c??1)-1}:{from:(c??1)-1,to:l-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(n),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(n)}).join(`
`),exitCode:0}}}});var ed,td=k(()=>{"use strict";ed={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,n=t[0];return n?.startsWith("+")?{stdout:n.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var nd,rd=k(()=>{"use strict";ae();nd={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i={};for(let b of n){let P=b.indexOf("=");P!==-1&&(i[b.slice(0,P)]=b.slice(P+1))}let o=i.if?B(e,i.if):void 0,a=i.of?B(e,i.of):void 0;if(!(o&&a))return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=Number.parseInt(i.bs||"512",10),l=t.vfs.readFile(o,r,s),u=Number.parseInt(i.skip||"0",10),d=Number.parseInt(i.seek||"0",10),f=i.count===void 0?void 0:Number.parseInt(i.count,10),p=u*c,h=l.slice(p),m=f===void 0?h.length:Math.min(h.length,f*c),g=h.slice(0,m),y;try{y=t.vfs.readFile(a,r,s)}catch{y=""}let v=d*c;v>0?(y.length<v&&(y=y.padEnd(v,"\0")),y=y.slice(0,v)+g+y.slice(v+g.length)):y=g,t.vfs.writeFile(a,y,{},r,s);let x=Math.ceil(g.length/c);return{stdout:`${x}+0 records in
${x}+0 records out
`,exitCode:0}}}});function sd(t,e){let n=t[di],r=n?JSON.parse(n):[];r.push({name:e,oldValue:t[e]}),t[di]=JSON.stringify(r)}function id(t){let e=t[di];if(!e)return;let n=JSON.parse(e);for(;n.length>0;){let r=n.pop();r.oldValue===void 0?delete t[r.name]:t[r.name]=r.oldValue}t[di]="[]"}var di,od,ma=k(()=>{"use strict";ee();di="__local_scope";od={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=M(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]=""),sd(e.vars,i);else{let a=i.slice(0,o),c=i.slice(o+1);if(n){let l=Number.parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}sd(e.vars,a),e.vars[a]=c}}return{exitCode:0}}}});var ad,cd=k(()=>{"use strict";ad={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:({authUser:t,args:e,shell:n})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let r=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(r)return n.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=(o,a)=>o.trim()!==s?Promise.resolve({result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}):(a.users.deleteUser(s),Promise.resolve({result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}}));return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var ld,ud=k(()=>{"use strict";ld={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let n=(t.vfs.getUsageBytes()/1024).toFixed(0),r="1048576",s=String(Number(r)-Number(n)),i=Math.round(Number(n)/Number(r)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${r.padStart(9)} ${n.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var dd,fd=k(()=>{"use strict";ae();dd={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let[r,s]=n;if(!(r&&s))return{stderr:"diff: missing operand",exitCode:1};let i=B(e,r),o=B(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${r}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let f=a[d],p=c[d];f!==p&&(f!==void 0&&l.push(`< ${f}`),p!==void 0&&l.push(`> ${p}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var pd,md,hd=k(()=>{"use strict";ee();ae();pd={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:n})=>{let r=rr(n);if(!r)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=M(t,["-l","--list"]),i=M(t,["-s","--status"]),o=M(t,["-L","--listfiles"]),a=M(t,["-r","--remove"]),c=M(t,["-P","--purge"]),{positionals:l}=Me(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=r.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],f=u.map(p=>{let h=p.name.padEnd(14).slice(0,14),m=p.version.padEnd(15).slice(0,15),g=p.architecture.padEnd(12).slice(0,12),y=(p.description||"").slice(0,40);return`ii  ${h} ${m} ${g} ${y}`});return{stdout:[...d,...f].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=r.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=r.listInstalled().find(f=>f.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=r.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},md={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let n=rr(e);if(!n)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let r=M(t,["-l"]),s=M(t,["-W","--show"]),{positionals:i}=Me(t,{flags:["-l","-W","--show"]});if(r||s){let o=n.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),f=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${f} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var gd,yd=k(()=>{"use strict";ee();ae();gd={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:n})=>{let r=M(n,["-h"]),s=M(n,["-s"]),i=n.find(u=>!u.startsWith("-"))??".",o=B(e,i),a=u=>r?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let f=0;for(let p of t.vfs.list(u)){let h=`${u}/${p}`,m=`${d}/${p}`,g=t.vfs.stat(h);g.type==="directory"?f+=l(h,m):g.type==="device"?(f+=0,s||c.push(`0	${m}`)):(f+=g.size,s||c.push(`${a(g.size)}	${m}`))}return c.push(`${a(f)}	${d}`),f};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function Cv(t,e,n,r){let{authUser:s,hostname:i,mode:o,cwd:a,shell:c,stdin:l,env:u}=r,d=c.vfs.readFile(t),f=d.match(/exec\s+builtin\s+(\S+)/);if(f){let h=Xe(f[1]);if(h)return h.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:[e,...n].join(" "),mode:o,args:n,stdin:l,cwd:a,shell:c,env:u})}let p=Xe("sh");return p?p.run({authUser:s,uid:c.users.getUid(s),gid:c.users.getGid(s),hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...n],stdin:l,cwd:a,shell:c,env:u}):{stderr:`${e}: command not found`,exitCode:127}}var Sd,bd=k(()=>{"use strict";gn();Sd={name:"command",description:"Run a command or display info about it",category:"shell",params:["[-vVp] <command> [args...]"],run:({args:t,authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l})=>{if(t.length===0)return{stderr:"command: missing argument",exitCode:1};let u=new Set([...t].filter(y=>y.startsWith("-")&&!y.includes("="))),d=t.filter(y=>!u.has(y)),f=u.has("-v"),p=u.has("-V"),h=u.has("-p"),m=!(f||p),g=(h?"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin":l?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");if(m&&d.length>0){let y=d[0],v=d.slice(1),x=Xe(y);if(x)return x.run({authUser:e,uid:n,gid:r,hostname:s,activeSessions:a.users.listActiveSessions(),rawInput:d.join(" "),mode:i,args:v,stdin:c,cwd:o,shell:a,env:l});for(let b of g){let P=`${b}/${y}`;if(a.vfs.exists(P))return Cv(P,y,v,{authUser:e,uid:n,gid:r,hostname:s,mode:i,cwd:o,shell:a,stdin:c,env:l,rawInput:d.join(" "),args:v,activeSessions:a.users.listActiveSessions()})}return{stderr:`${y}: not found`,exitCode:127}}if(f||p){let y=[],v=0;for(let x of d){let b=Xe(x),P=`__func_${x}`in l.vars;if(p)if(b)y.push(`${x} is a shell builtin`);else if(P)y.push(`${x} is a function`);else{let _=!1;for(let w of g){let S=`${w}/${x}`;if(a.vfs.exists(S)){y.push(`${x} is ${S}`),_=!0;break}}_||(y.push(`${x}: not found`),v=1)}else if(b||P)y.push(x);else{let _=!1;for(let w of g){let S=`${w}/${x}`;if(a.vfs.exists(S)){y.push(S),_=!0;break}}_||(v=1)}}return{stdout:y.join(`
`),exitCode:v}}return{stdout:"",exitCode:0}}}});function wv(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,n)=>String.fromCharCode(Number.parseInt(n,8)))}var vd,xd=k(()=>{"use strict";ee();Xr();vd={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:n})=>{let{flags:r,positionals:s}=Me(t,{flags:["-n","-e","-E"]}),i=r.has("-n"),o=r.has("-e"),a=s.length>0?s.join(" "):e??"",c=js(a,n?.vars??{},n?.lastExitCode??0),l=o?wv(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Cd,wd=k(()=>{"use strict";Cd={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let n={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(n).map(([r,s])=>`${r}=${s}`).join(`
`),exitCode:0}}}});var _d,Id=k(()=>{"use strict";_d={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:Number.parseInt(t[0]??"0",10)||0})}});var Ed,$d=k(()=>{"use strict";Ed={name:"export",description:"Set shell environment variable",category:"shell",params:["[-fn] [-p] [NAME[=VALUE] ...]"],run:({args:t,env:e})=>{let n=new Set(t.filter(i=>i.startsWith("-")&&!i.includes("="))),r=t.filter(i=>!n.has(i)),s=[...n].join("").replace(/-/g,"");if(s.includes("f")){for(let i of r){let o=`__func_${i}`;o in e.vars&&s.includes("n")&&delete e.vars[o]}return{exitCode:0}}if(s.includes("p")||r.length===0){let i=Object.entries(e.vars).filter(([o])=>o&&!o.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(o)).map(([o,a])=>`declare -x ${o}="${a}"`).join(`
`);return{stdout:i?`${i}
`:"",exitCode:0}}for(let i of r){if(i.includes("=")){let o=i.indexOf("="),a=i.slice(0,o),c=i.slice(o+1);e.vars[a]=c}s.includes("n")&&delete e.vars[i]}return{exitCode:0}}}});var Pd,kd=k(()=>{"use strict";Pd={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let n=t[e-1],r=t[e+1];try{let s=new RegExp(r),i=n.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let n=Number.parseInt(t[0],10),r=t[1],s=Number.parseInt(t[2],10);if(Number.isNaN(n)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(r){case"+":i=n+s;break;case"-":i=n-s;break;case"*":i=n*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(n/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=n%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});var _v,Md,Nd=k(()=>{"use strict";ae();_v=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Md={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:n})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let r=[],s=0;for(let i of t){let o=B(e,i);if(!n.vfs.exists(o)){r.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(n.vfs.stat(o).type==="directory"){r.push(`${i}: directory`);continue}let c=n.vfs.readFile(o),l="data";for(let[u,d]of _v)if(typeof u=="function"?u(c):u.test(c)){l=d;break}r.push(`${i}: ${l}`)}return{stdout:r.join(`
`),exitCode:s}}}});var Ad,Td=k(()=>{"use strict";Do();ae();tt();Ad={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:n,args:r,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<r.length&&!r[c].startsWith("-")&&r[c]!=="!"&&r[c]!=="(";)a.push(r[c]),c++;a.length===0&&a.push(".");let l=r.slice(c),u=Number.POSITIVE_INFINITY,d=0,f=[];function p(_,w){return h(_,w)}function h(_,w){let[S,C]=m(_,w);for(;_[C]==="-o"||_[C]==="-or";){C++;let[$,N]=m(_,C);S={type:"or",left:S,right:$},C=N}return[S,C]}function m(_,w){let[S,C]=g(_,w);for(;C<_.length&&_[C]!=="-o"&&_[C]!=="-or"&&_[C]!==")"&&((_[C]==="-a"||_[C]==="-and")&&C++,!(C>=_.length||_[C]==="-o"||_[C]===")"));){let[$,N]=g(_,C);S={type:"and",left:S,right:$},C=N}return[S,C]}function g(_,w){if(_[w]==="!"||_[w]==="-not"){let[S,C]=y(_,w+1);return[{type:"not",pred:S},C]}return y(_,w)}function y(_,w){let S=_[w];if(!S)return[{type:"true"},w];if(S==="("){let[C,$]=p(_,w+1),N=_[$]===")"?$+1:$;return[C,N]}if(S==="-name")return[{type:"name",pat:_[w+1]??"*",ignoreCase:!1},w+2];if(S==="-iname")return[{type:"name",pat:_[w+1]??"*",ignoreCase:!0},w+2];if(S==="-type")return[{type:"type",t:_[w+1]??"f"},w+2];if(S==="-maxdepth")return u=Number.parseInt(_[w+1]??"0",10),[{type:"true"},w+2];if(S==="-mindepth")return d=Number.parseInt(_[w+1]??"0",10),[{type:"true"},w+2];if(S==="-empty")return[{type:"empty"},w+1];if(S==="-print"||S==="-print0")return[{type:"print"},w+1];if(S==="-true")return[{type:"true"},w+1];if(S==="-false")return[{type:"false"},w+1];if(S==="-size"){let C=_[w+1]??"0",$=C.slice(-1);return[{type:"size",n:Number.parseInt(C,10),unit:$},w+2]}if(S==="-exec"||S==="-execdir"){let C=S==="-execdir",$=[],N=w+1;for(;N<_.length&&_[N]!==";";)$.push(_[N]),N++;return f.push({cmd:$,useDir:C}),[{type:"exec",cmd:$,useDir:C},N+1]}return[{type:"true"},w+1]}let v=l.length>0?p(l,0)[0]:{type:"true"};function x(_,w,S){switch(_.type){case"true":return!0;case"false":return!1;case"not":return!x(_.pred,w,S);case"and":return x(_.left,w,S)&&x(_.right,w,S);case"or":return x(_.left,w,S)||x(_.right,w,S);case"name":{let C=w.split("/").pop()??"";return Ws(_.pat,_.ignoreCase?"i":"").test(C)}case"type":{try{let C=e.vfs.stat(w);if(_.t==="f")return C.type==="file";if(_.t==="d")return C.type==="directory";if(_.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(w).type==="directory"?e.vfs.list(w).length===0:e.vfs.readFile(w).length===0}catch{return!1}case"size":try{let $=e.vfs.readFile(w).length,N=_.unit,R=$;return N==="k"||N==="K"?R=Math.ceil($/1024):N==="M"?R=Math.ceil($/(1024*1024)):N==="c"&&(R=$),R===_.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let b=[];function P(_,w,S){if(S>u)return;try{be(t,_,"find")}catch{return}S>=d&&x(v,_,S)&&b.push(w);let C;try{C=e.vfs.stat(_)}catch{return}if(C.type==="directory"&&S<u)for(let $ of e.vfs.list(_))P(`${_}/${$}`,`${w}/${$}`,S+1)}for(let _ of a){let w=B(n,_);if(!e.vfs.exists(w))return{stderr:`find: '${_}': No such file or directory`,exitCode:1};P(w,_==="."?".":_,0)}if(f.length>0&&b.length>0){let _=[];for(let{cmd:w}of f)for(let S of b){let $=w.map(R=>R==="{}"?S:R).map(R=>R.includes(" ")?`"${R}"`:R).join(" "),N=await xe($,t,i,o,n,e,void 0,s);N.stdout&&_.push(N.stdout.replace(/\n$/,"")),N.stderr&&_.push(N.stderr.replace(/\n$/,""))}return _.length>0?{stdout:`${_.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:b.join(`
`)+(b.length>0?`
`:""),exitCode:0}}}});import*as fi from"node:os";var Od,Rd=k(()=>{"use strict";ee();Od={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t,shell:e})=>{let n=M(t,["-h","--human"]),r=M(t,["-m"]),s=M(t,["-g"]),i=fi.totalmem(),o=fi.freemem(),a=e.resourceCaps?.ramCapBytes,c=a===void 0?i:Math.min(i,a),l=a===void 0?o:Math.floor(c*(o/i)),u=c-l,d=Math.floor(c*.02),f=Math.floor(c*.05),p=Math.floor(l*.95),h=Math.floor(c*.5),m=x=>n?x>=1024*1024*1024?`${(x/(1024*1024*1024)).toFixed(1)}G`:x>=1024*1024?`${(x/(1024*1024)).toFixed(1)}M`:`${(x/1024).toFixed(1)}K`:String(Math.floor(s?x/(1024*1024*1024):r?x/(1024*1024):x/1024)),g="               total        used        free      shared  buff/cache   available",y=`Mem:  ${m(c).padStart(12)} ${m(u).padStart(11)} ${m(l).padStart(11)} ${m(d).padStart(11)} ${m(f).padStart(11)} ${m(p).padStart(11)}`,v=`Swap: ${m(h).padStart(12)} ${m(0).padStart(11)} ${m(h).padStart(11)}`;return{stdout:[g,y,v].join(`
`),exitCode:0}}}});function Ud(t,e=!1){let n=t.split(`
`),r=Math.max(...n.map(o=>o.length)),s=n.length===1?`< ${n[0]} >`:n.map((o,a)=>{let c=" ".repeat(r-o.length);return a===0?`/ ${o}${c} \\`:a===n.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(r+2)}`,`( ${s} )`,` ${"\u203E".repeat(r+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var Fd,Dd,Ld,Bd,zd,Wd,Iv,jd,Vd=k(()=>{"use strict";Fd={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:new Array(200).fill(e).join(`
`),exitCode:0}}},Dd=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],Ld={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*Dd.length);return{stdout:Dd[t]??"No fortunes today.",exitCode:0}}};Bd={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:Ud(n),exitCode:0}}},zd={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let n=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:Ud(n).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},Wd={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let n="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",r="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=n[Math.floor(Math.random()*n.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=r+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},Iv=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],jd={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${Iv.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var Gd,Hd=k(()=>{"use strict";Gd={name:"getent",description:"Query user/group database",category:"system",params:["passwd|group [key]"],run:({shell:t,args:e})=>{let n=e[0],r=e[1];if(!n)return{stderr:`Usage: getent passwd|group [key]
`,exitCode:1};if(n==="passwd"){let i=t.users.listUsers().filter(o=>!r||o===r).map(o=>{let a=t.users.getUid(o),c=t.users.getGid(o),l=o==="root"?"/root":`/home/${o}`;return`${o}:x:${a}:${c}::${l}:/bin/bash`});return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}if(n==="group"){let i=t.users.listGroups().filter(o=>!r||o.name===r).map(o=>`${o.name}:x:${o.gid}:${o.members.join(",")}`);return r&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}return{stderr:`getent: unknown database '${n}'
`,exitCode:1}}}});import*as pt from"node:path";function Nt(t){return pt.posix.join(t,".git")}function Bn(t){return pt.posix.join(Nt(t),"HEAD")}function ga(t,e){return pt.posix.join(Nt(t),e)}function ya(t,e){return pt.posix.join(Nt(t),"objects",e.slice(0,2),e.slice(2))}function Un(t){return pt.posix.join(Nt(t),"index")}function Ev(t,e,n){let r=Nt(e);return t.exists(r)?{stderr:`Reinitialized existing Git repository in ${r}/
`,exitCode:0}:(t.mkdir(r,493),t.mkdir(pt.posix.join(r,"objects"),493),t.mkdir(pt.posix.join(r,"refs","heads"),493),t.mkdir(pt.posix.join(r,"refs","tags"),493),t.writeFile(Bn(e),`ref: refs/heads/master
`),t.writeFile(Un(e),""),{stdout:`Initialized empty Git repository in ${r}/
`,exitCode:0})}function $v(t,e,n){let r=Nt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.filter(o=>!o.startsWith("-")&&o!=="add");if(s.length===0)return{stderr:"Nothing specified, nothing added.",exitCode:0};let i=[];for(let o of s){if(!t.exists(o))return{stderr:`fatal: pathspec '${o}' did not match any files`,exitCode:1};let a=t.readFile(o),c=ha(a),l=ya(e,c),u=pt.posix.dirname(l);t.exists(u)||t.mkdir(u,493),t.exists(l)||t.writeFile(l,a),i.push(`${c} ${o}`)}return t.writeFile(Un(e),`${i.join(`
`)}
`),{stdout:"",exitCode:0}}function Pv(t,e){let n=Nt(e);if(!t.exists(n))return{stderr:"fatal: not a git repository",exitCode:128};let r=[];r.push(`On branch ${Sa(t,e)}`),r.push("");let s=t.exists(Un(e))?t.readFile(Un(e)).trim():"",i=s?s.split(`
`).filter(Boolean).map(c=>c.split(/\s+/)[1]):[];if(i.length>0){r.push("Changes to be committed:"),r.push('  (use "git restore --staged <file>..." to unstage)'),r.push("");for(let c of i)r.push(`	new file:   ${c}`);r.push("")}let a=Kd(t,e,"").filter(c=>!i.includes(c));if(a.length>0){r.push("Untracked files:"),r.push('  (use "git add <file>..." to include in what will be committed)'),r.push("");for(let c of a)c.startsWith(".git")||r.push(`	${c}`);r.push("")}return i.length===0&&a.length===0&&r.push("nothing to commit, working tree clean"),{stdout:`${r.join(`
`)}
`,exitCode:0}}function kv(t,e,n){let r=Nt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.indexOf("-m"),i=s!==-1&&s+1<n.length?n[s+1]:null;if(!i)return{stderr:"error: switch `m' requires a value",exitCode:1};let o=t.exists(Un(e))?t.readFile(Un(e)).trim():"",a=o?o.split(`
`).filter(Boolean):[];if(a.length===0)return{stderr:"nothing added to commit but untracked files present",exitCode:1};let c=Yd(t,e),l=ha(o),u="Virtual User <virtual@localhost>",d=Math.floor(Date.now()/1e3),f=[`tree ${l}`,c?`parent ${c}`:"",`author ${u} ${d} +0000`,`committer ${u} ${d} +0000`,"",i,""].filter(Boolean).join(`
`),p=ha(f),h=ya(e,p),m=pt.posix.dirname(h);t.exists(m)||t.mkdir(m,493),t.writeFile(h,f);let g=Sa(t,e),y=ga(e,`refs/heads/${g}`);t.writeFile(y,`${p}
`),t.writeFile(Un(e),"");let v=p.slice(0,7);return{stdout:`[${g} ${v}] ${i}
 ${a.length} file(s) changed
`,exitCode:0}}function Mv(t,e,n){let r=Nt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=M(n,["--oneline"]),i=Yd(t,e);if(!i)return{stdout:`fatal: your current branch 'main' does not have any commits yet
`,exitCode:0};let o=[],a=new Set;for(;i&&!a.has(i);){a.add(i);let c=ya(e,i);if(!t.exists(c))break;let l=t.readFile(c),u=l.match(/\n\n([\s\S]*)$/),d=u?u[1].trim():"",f=l.match(/^author (.+) \d+/m),p=f?f[1]:"unknown";s?o.push(`${i.slice(0,7)} ${d.split(`
`)[0]}`):(o.push(`commit ${i}`),o.push(`Author: ${p}`),o.push(`Date:   ${new Date().toUTCString()}`),o.push(""),o.push(`    ${d}`),o.push(""));let h=l.match(/^parent ([a-f0-9]+)/m);i=h?h[1]:""}return{stdout:`${o.join(`
`)}
`,exitCode:0}}function Nv(t,e,n){let r=Nt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=pt.posix.join(r,"refs","heads");if(!t.exists(s))return{stdout:"",exitCode:0};let i=Sa(t,e);return{stdout:`${t.list(s).map(c=>c===i?`* ${c}`:`  ${c}`).join(`
`)}
`,exitCode:0}}function Av(t,e,n){let r=Nt(e);if(!t.exists(r))return{stderr:"fatal: not a git repository",exitCode:128};let s=n.find(o=>!o.startsWith("-")&&o!=="checkout");if(!s)return{stderr:"git checkout: missing branch name",exitCode:1};let i=ga(e,`refs/heads/${s}`);return t.exists(i)?(t.writeFile(Bn(e),`ref: refs/heads/${s}
`),{stdout:`Switched to branch '${s}'
`,exitCode:0}):(t.writeFile(Bn(e),`ref: refs/heads/${s}
`),{stdout:`Switched to a new branch '${s}'
`,exitCode:0})}function Sa(t,e){if(!t.exists(Bn(e)))return"master";let n=t.readFile(Bn(e)).trim(),r=n.match(/^ref:\s*refs\/heads\/(.+)$/);return r?r[1]:n.slice(0,7)}function Yd(t,e){if(!t.exists(Bn(e)))return null;let n=t.readFile(Bn(e)).trim(),r=n.match(/^ref:\s*(.+)$/);if(r){let s=ga(e,r[1]);return t.exists(s)?t.readFile(s).trim():null}return n||null}function ha(t){let e=0;for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);e=(e<<5)-e+r,e|=0}return Math.abs(e).toString(16).padStart(40,"0")}function Kd(t,e,n){let r=[],s=t.list(e);for(let i of s){if(i==="."||i===".."||i===".git")continue;let o=pt.posix.join(e,i),a=n?`${n}/${i}`:i;try{t.stat(o).mode&16384?r.push(...Kd(t,o,a)):r.push(a)}catch{r.push(a)}}return r}var qd,Xd=k(()=>{"use strict";ee();qd={name:"git",description:"Distributed version control (minimal)",category:"development",params:["<command> [options]"],run:({shell:t,args:e,cwd:n})=>{if(M(e,["--help","-h"])||e.length===0)return{stdout:["Usage: git <command> [options]","","Commands:","  init          Initialize a new repository","  add <file>    Stage file contents","  status        Show working tree status","  commit -m <msg>  Record changes","  log           Show commit history","  branch        List branches","  checkout <branch>  Switch branches","  -h, --help    Show this help"].join(`
`),exitCode:0};let r=t.vfs,s=e.find(i=>!i.startsWith("-"));if(!s)return{stderr:"git: missing subcommand",exitCode:1};switch(s){case"init":return Ev(r,n,e);case"add":return $v(r,n,e);case"status":return Pv(r,n);case"commit":return kv(r,n,e);case"log":return Mv(r,n,e);case"branch":return Nv(r,n,e);case"checkout":return Av(r,n,e);default:return{stderr:`git: '${s}' is not a git command.`,exitCode:1}}}}});var Zd,Jd=k(()=>{"use strict";Zd={name:"gpasswd",description:"Administer /etc/group",category:"users",params:["[-a|-d] -G group user"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`gpasswd: permission denied
`,exitCode:1};let r,s,i;for(let a=0;a<n.length;a++)n[a]==="-a"?r="add":n[a]==="-d"?r="delete":n[a]==="-G"&&n[a+1]?(s=n[a+1],a++):i||(i=n[a]);if(!(r&&s&&i))return{stderr:`Usage: gpasswd -a|-d -G group user
`,exitCode:1};if(!e.users.listUsers().includes(i))return{stderr:`gpasswd: user '${i}' does not exist
`,exitCode:1};if(!e.users.getGroup(s))return{stderr:`gpasswd: group '${s}' does not exist
`,exitCode:1};try{return r==="add"?(e.users.addGroupMember(s,i),{stdout:`gpasswd: added '${i}' to group '${s}'
`,exitCode:0}):(e.users.removeGroupMember(s,i),{stdout:`gpasswd: removed '${i}' from group '${s}'
`,exitCode:0})}catch(a){return{stderr:`${a instanceof Error?a.message:String(a)}
`,exitCode:1}}}}});var Qd,ef=k(()=>{"use strict";ee();ae();Qd={name:"grep",aliases:["egrep","fgrep"],description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let{flags:i,positionals:o}=Me(r,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),f=i.has("-l"),p=i.has("-q")||i.has("--quiet")||i.has("--silent"),h=o[0],m=o.slice(1);if(!h)return{stderr:"grep: no pattern specified",exitCode:1};let g;try{let b=a?"mi":"m";g=new RegExp(h,b)}catch{return{stderr:`grep: invalid regex: ${h}`,exitCode:1}}let y=(b,P="")=>{let _=b.split(`
`),w=[];for(let S=0;S<_.length;S++){let C=_[S]??"",$=g.test(C);if(c?!$:$){let R=l?`${S+1}:`:"";w.push(`${P}${R}${C}`)}}return w},v=b=>{if(!e.vfs.exists(b))return[];if(e.vfs.stat(b).type==="file")return[b];if(!u)return[];let _=[],w=S=>{for(let C of e.vfs.list(S)){let $=`${S}/${C}`;e.vfs.stat($).type==="file"?_.push($):w($)}};return w(b),_},x=[];if(m.length===0){if(!s)return{stdout:"",exitCode:1};let b=y(s);if(d)return{stdout:`${b.length}
`,exitCode:b.length>0?0:1};if(p)return{exitCode:b.length>0?0:1};x.push(...b)}else{let b=m.flatMap(P=>{let _=B(n,P);return v(_).map(w=>({file:P,path:w}))});for(let{file:P,path:_}of b)try{be(t,_,"grep");let w=e.vfs.readFile(_),S=b.length>1?`${P}:`:"",C=y(w,S);d?x.push(b.length>1?`${P}:${C.length}`:String(C.length)):f?C.length>0&&x.push(P):x.push(...C)}catch{return{stderr:`grep: ${P}: No such file or directory`,exitCode:1}}}return{stdout:x.length>0?`${x.join(`
`)}
`:"",exitCode:x.length>0?0:1}}}});var tf,nf=k(()=>{"use strict";tf={name:"hash",description:"Display and manage the command hash table",category:"shell",params:["[-r] [name...]"],run:({args:t,shell:e,env:n})=>{let r=t.includes("-r"),s=t.filter(i=>i!=="-r");if(r){let i=Object.keys(n.vars).filter(o=>o.startsWith("__hash_"));for(let o of i)delete n.vars[o]}if(s.length>0){let i=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":");for(let o of s){let a=!1;for(let c of i){let l=`${c}/${o}`;if(e.vfs.exists(l)){n.vars[`__hash_${o}`]=l,a=!0;break}}a||(n.vars[`__hash_${o}`]="")}return{exitCode:0}}if(!r){let i=[];for(let[o,a]of Object.entries(n.vars))o.startsWith("__hash_")&&a&&i.push(`${o.slice(7)}  ${a}`);return{stdout:i.length>0?`${i.join(`
`)}
`:"",exitCode:0}}return{exitCode:0}}}});var rf,sf=k(()=>{"use strict";rf={name:"groupadd",description:"Create a new group",category:"users",params:["[-g GID] <group>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`groupadd: permission denied
`,exitCode:1};let r,s;for(let i=0;i<n.length;i++)if(n[i]==="-g"){let o=n[i+1];if(!o)break;if(r=Number.parseInt(o,10),Number.isNaN(r)||r<0)return{stderr:`groupadd: invalid GID '${o}'
`,exitCode:1};i++}else s||(s=n[i]);if(!s)return{stderr:`Usage: groupadd [-g GID] <group>
`,exitCode:1};try{return e.users.createGroup(s,r),{stdout:`groupadd: group '${s}' created
`,exitCode:0}}catch(i){return{stderr:`${i instanceof Error?i.message:String(i)}
`,exitCode:1}}}}});var of,af=k(()=>{"use strict";of={name:"groupdel",description:"Delete a group",category:"users",params:["<group>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`groupdel: permission denied
`,exitCode:1};let r=n[0];if(!r)return{stderr:`Usage: groupdel <group>
`,exitCode:1};try{return e.users.deleteGroup(r),{stdout:`groupdel: group '${r}' deleted
`,exitCode:0}}catch(s){return{stderr:`${s instanceof Error?s.message:String(s)}
`,exitCode:1}}}}});var cf,lf=k(()=>{"use strict";cf={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0]??t,s=e.users.getUserAllGroups(r);return s.length===0?{stdout:`${r}:`,exitCode:0}:{stdout:`${r} : ${s.join(" ")}`,exitCode:0}}}});var uf,df,ff=k(()=>{"use strict";ae();uf={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let s=n.includes("-k")||n.includes("--keep"),i=n.includes("-d"),o=n.find(f=>!f.startsWith("-"));if(!o)return{stderr:`gzip: no file specified
`,exitCode:1};let a=B(e,o),c=t.users.getUid(r),l=t.users.getGid(r);if(i){if(!o.endsWith(".gz"))return{stderr:`gzip: ${o}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};let f=t.vfs.readFile(a),p=a.slice(0,-3);return t.vfs.writeFile(p,f,{},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};if(o.endsWith(".gz"))return{stderr:`gzip: ${o}: already has .gz suffix -- unchanged
`,exitCode:1};let u=t.vfs.readFileRaw(a),d=`${a}.gz`;return t.vfs.writeFile(d,u,{compress:!0},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}},df={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-k")||n.includes("--keep"),i=n.find(d=>!d.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let o=B(e,i),a=t.users.getUid(r),c=t.users.getGid(r);if(!t.vfs.exists(o))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l,{},a,c),s||t.vfs.remove(o,{recursive:!1},a,c),{exitCode:0}}}});var pf,mf=k(()=>{"use strict";ee();ae();pf={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=Tn(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let f=d.split(`
`),p=f.slice(0,a);return p.join(`
`)+(d.endsWith(`
`)&&p.length===f.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let f=B(n,d);try{be(t,f,"head"),u.push(l(e.vfs.readFile(f)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function gf(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function Dv(t){let e=t.aliases?.length?` ${os}(${t.aliases.join(", ")})${Ut}`:"";return`  ${Tv}${gf(t.name,16)}${Ut}${e}${gf("",(t.aliases?.length,0))} ${t.description??""}`}function Fv(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let n=[`${Sf}Available commands${Ut}`,`${os}Type 'help <command>' for detailed usage.${Ut}`,""],r=[...hf.filter(i=>e[i]),...Object.keys(e).filter(i=>!hf.includes(i)).sort()];for(let i of r){let o=e[i];if(!o?.length)continue;n.push(`${Ov}${yf[i]??i}${Ut}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)n.push(Dv(c));n.push("")}let s=t.length;return n.push(`${os}${s} commands available.${Ut}`),n.join(`
`)}function Lv(t){let e=[];if(e.push(`${Sf}${t.name}${Ut} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${os}Aliases: ${t.aliases.join(", ")}${Ut}`),e.push(""),e.push(`${Rv}Usage:${Ut}`),t.params.length)for(let r of t.params)e.push(`  ${t.name} ${r}`);else e.push(`  ${t.name}`);let n=yf[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${os}Category: ${n}${Ut}`),e.join(`
`)}function bf(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let e=la();if(t[0]){let n=t[0].toLowerCase(),r=e.find(s=>s.name===n||s.aliases?.includes(n));return r?{stdout:Lv(r),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:Fv(e),exitCode:0}}}}var hf,yf,Sf,Ut,Tv,Ov,os,Rv,vf=k(()=>{"use strict";gn();hf=["navigation","files","text","archive","system","package","network","shell","users","misc"],yf={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Sf="\x1B[1m",Ut="\x1B[0m",Tv="\x1B[36m",Ov="\x1B[33m",os="\x1B[2m",Rv="\x1B[32m"});var xf,Cf=k(()=>{"use strict";xf={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:n})=>{let r=`/home/${n}/.bash_history`;if(!e.vfs.exists(r))return{stdout:"",exitCode:0};let i=e.vfs.readFile(r).split(`
`).filter(Boolean),o=t[0],a=o?Number.parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,f)=>`${String(l+f).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});import*as as from"node:path";function Ef(t,e){t.exists(e)||t.mkdir(e,493)}function $f(t){if(Ef(t,vn),!t.exists(vn))return{stdout:`No at jobs.
`,exitCode:0};let e=[];try{let n=t.list(vn);for(let r of n)if(!(r==="."||r===".."))try{let s=t.readFile(as.posix.join(vn,r)),i=Wv(r,s);e.push(`${i.id.padEnd(6)} ${i.time.padEnd(20)} ${i.user}`)}catch{e.push(`${r.padEnd(6)} (corrupt)`)}}catch{}return e.length===0?{stdout:`No at jobs.
`,exitCode:0}:{stdout:`${"Job".padEnd(6)} ${"Time".padEnd(20)} User
${e.join(`
`)}
`,exitCode:0}}function Pf(t,e){let n=as.posix.join(vn,e);return t.exists(n)?(t.remove(n),{stdout:"",exitCode:0}):{stderr:`atrm: job ${e} not found`,exitCode:1}}function Uv(t,e){let n=as.posix.join(vn,e);return t.exists(n)?{stdout:`${t.readFile(n)}
`,exitCode:0}:{stderr:`at: job ${e} not found`,exitCode:1}}function Bv(t,e,n,r){Ef(t,vn);let s=new Date,i=zv(e,s),o=String(Math.floor(s.getTime()/1e3)+Math.floor(Math.random()*1e3)),a=[`# at job ${o}`,`# scheduled at ${i.toISOString()}`,`# by ${r}`,"cd /",n.trim()].join(`
`);return t.writeFile(as.posix.join(vn,o),a,{mode:420}),{stdout:`job ${o} at ${i.toLocaleString()}
`,exitCode:0}}function zv(t,e){let n=t.toLowerCase().trim();if(n==="now")return new Date(e.getTime()+6e4);if(n==="noon")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),12,0);if(n==="midnight")return new Date(e.getFullYear(),e.getMonth(),e.getDate()+1,0,0);if(n==="teatime")return new Date(e.getFullYear(),e.getMonth(),e.getDate(),16,0);let r=n.match(/^\+\s*(\d+)\s*(minute|hour|day|week)s?$/);if(r){let i=Number(r[1]),o=r[2],a=o==="minute"?6e4:o==="hour"?36e5:o==="day"?864e5:6048e5;return new Date(e.getTime()+i*a)}let s=n.match(/^(\d{1,2}):(\d{2})(?:\s+(\d{4})-(\d{2})-(\d{2}))?$/);if(s){let i=Number(s[1]),o=Number(s[2]);if(s[3])return new Date(Number(s[3]),Number(s[4])-1,Number(s[5]),i,o);let a=new Date(e.getFullYear(),e.getMonth(),e.getDate(),i,o);return a<=e?new Date(a.getTime()+864e5):a}return new Date(e.getTime()+36e5)}function Wv(t,e){let n=e.split(`
`),r=n.find(i=>i.startsWith("# scheduled at ")),s=n.find(i=>i.startsWith("# by "));return{id:t,time:r?r.replace("# scheduled at ","").replace("T"," ").slice(0,16):"unknown",user:s?s.replace("# by ",""):"unknown"}}var vn,wf,_f,If,kf=k(()=>{"use strict";ee();vn="/var/spool/at",wf={name:"at",description:"Schedule delayed execution of commands",category:"system",params:["[options] <time-spec>"],run:({shell:t,args:e,authUser:n})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: at [options] <time-spec>","  -l, --list       List pending jobs (alias: atq)","  -d, --del JOBID  Delete a job (alias: atrm)","  -c JOBID         Show job content","  -f FILE          Read job from file instead of stdin","  -h, --help       Show this help","","Time specs: now, noon, midnight, HH:MM, HH:MM YYYY-MM-DD","            +N minutes/hours/days/weeks"].join(`
`),exitCode:0};let r=t.vfs;if(M(e,["-l","--list"]))return $f(r);let s=e.indexOf("-d")===-1?e.indexOf("--del"):e.indexOf("-d");if(s!==-1&&s+1<e.length)return Pf(r,e[s+1]);let i=e.indexOf("-c");if(i!==-1&&i+1<e.length)return Uv(r,e[i+1]);let a=e.filter(u=>!u.startsWith("-"))[0];if(!a)return{stderr:"at: no time specified",exitCode:1};let c=e.indexOf("-f"),l;if(c!==-1&&c+1<e.length){let u=e[c+1];if(!r.exists(u))return{stderr:`at: ${u}: No such file`,exitCode:1};l=r.readFile(u)}else l=`echo 'at job executed'
`;return Bv(r,a,l,n)}},_f={name:"atq",description:"List pending at jobs",category:"system",params:[],run:({shell:t})=>$f(t.vfs)},If={name:"atrm",description:"Delete pending at jobs",category:"system",params:["<jobid>..."],run:({shell:t,args:e})=>{let n=t.vfs,r=e.filter(s=>!s.startsWith("-"));if(r.length===0)return{stderr:"atrm: missing job ID",exitCode:1};for(let s of r){let i=Pf(n,s);if(i.exitCode!==0)return i}return{stdout:"",exitCode:0}}}});var Mf,Nf=k(()=>{"use strict";Mf={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});function Tf(t,e){if(!t.exists(e))return[];let n=[],r=t.list(e);for(let s of r){let i=`${e}/${s}`;if(s.endsWith(".log")||s.endsWith(".journal"))n.push(i);else try{n.push(...Tf(t,i))}catch{}}return n}function jv(t){let e,n=!1,r,s;for(let i=0;i<t.length;i++){let o=t[i];if(o==="-f"||o==="--follow")n=!0;else if(o==="-n"||o==="--lines"){let a=t[i+1];a&&!a.startsWith("-")&&(e=Number(a),i++)}else if(o.startsWith("-n")&&o.length>2)e=Number(o.slice(2));else if(o==="-p"||o==="--priority"){let a=t[i+1];a&&!a.startsWith("-")&&(r=a,i++)}else if(o==="-u"||o==="--unit"){let a=t[i+1];a&&!a.startsWith("-")&&(s=a,i++)}}return{lines:e,follow:n,priority:r,unit:s}}function Vv(t){return{emerg:0,alert:1,crit:2,err:3,warning:4,notice:5,info:6,debug:7}[t.toLowerCase()]??6}var Af,Of=k(()=>{"use strict";ee();Af={name:"journalctl",description:"Query the systemd journal",category:"system",params:["[options] [pattern]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: journalctl [OPTIONS...] [PATTERN]","","  -n, --lines=N     Show latest N lines","  -f, --follow      Follow new log entries","  -p, --priority=P  Filter by priority (emerg,alert,crit,err,warning,info,debug)","  -u, --unit=UNIT   Show logs for a specific unit","  --no-pager        Do not pipe output into a pager","  -h, --help        Show this help","","Without arguments, show all log entries."].join(`
`),exitCode:0};let n="/var/log/journal",r=[];try{if(t.vfs.exists(n)){let a=Tf(t.vfs,n);for(let c of a){let l=t.vfs.readFile(c);l&&r.push(...l.trim().split(`
`))}}}catch{}if(r.length===0)return{stdout:`${["-- Logs begin at ... --","(no entries)"].join(`
`)}
`,exitCode:0};let s=r,i=jv(e);if(i.priority){let a=Vv(i.priority);s=s.filter(c=>{let l=c.match(/<(\d+)>/);return l?(Number(l[1])&7)<=a:!0})}i.unit&&(s=s.filter(a=>a.toLowerCase().includes(i.unit.toLowerCase()))),i.lines!==void 0&&i.lines>0&&(s=s.slice(-i.lines));let o=`${s.join(`
`)}
`;return i.follow&&o?{stdout:o,exitCode:0}:{stdout:o||`(no entries)
`,exitCode:0}}}});import*as br from"node:os";function ba(t,e){let n=Math.round(t*e),r=e-n;return`${t>.8?le.red:t>.5?le.yellow:le.green}${"\u2588".repeat(n)}${le.dim}${"\u2591".repeat(r)}${le.reset}`}function zn(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function Gv(t){let e=Math.floor(t/1e3),n=Math.floor(e/86400),r=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return n>0?`${n}d ${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(r).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var le,Rf,Df=k(()=>{"use strict";le={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Rf={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let n=br.totalmem(),r=br.freemem(),s=t.resourceCaps?.ramCapBytes,i=s===void 0?n:Math.min(n,s),o=s===null?r:Math.floor(i*(r/n)),a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=br.cpus(),f=(t.resourceCaps?.cpuCapCores===void 0?u.length:Math.min(t.resourceCaps.cpuCapCores,u.length))||4,p=Date.now()-t.startTime,h=t.users.listActiveSessions(),m=h.length+t.users.listProcesses().length+3,g=new Date().toTimeString().slice(0,8),y=a/i,v=l/c,x=20,b=[],P=[];for(let I=0;I<f;I++)P.push(Math.random()*.3+.02);let _=Math.min(f,4);for(let I=0;I<_;I++){let D=P[I],z=(D*100).toFixed(1).padStart(5);b.push(`${le.bold}${le.cyan}${String(I+1).padStart(3)}${le.reset}[${ba(D,x)}${le.reset}] ${z}%`)}f>4&&b.push(`${le.dim}    ... ${f-4} more CPU(s) not shown${le.reset}`),b.push(`${le.bold}${le.cyan}Mem${le.reset}[${ba(y,x)}${le.reset}] ${zn(a)}/${zn(i)}`),b.push(`${le.bold}${le.cyan}Swp${le.reset}[${ba(v,x)}${le.reset}] ${zn(l)}/${zn(c)}`),b.push("");let w=P.slice(0,f).reduce((I,D)=>I+D,0)/f,S=(w*f).toFixed(2),C=(w*f*.9).toFixed(2),$=(w*f*.8).toFixed(2);b.push(`${le.bold}Tasks:${le.reset} ${le.green}${m}${le.reset} total  ${le.bold}Load average:${le.reset} ${S} ${C} ${$}  ${le.bold}Uptime:${le.reset} ${Gv(p)}`),b.push("");let N=`${le.bgBlue}${le.bold}${le.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${le.reset}`;b.push(N);let R=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],W=1e3,Y=h.map(I=>({pid:W++,user:I.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(h.length,1)*.3})),Q=t.users.listProcesses().map(I=>({pid:I.pid,user:I.username,cmd:I.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),E={pid:W++,user:e,cmd:"htop",cpu:.1,mem:.1},A=[...R,...Y,...Q,E];for(let I of A){let D=zn(Math.floor(Math.random()*200*1024*1024+10485760)),z=zn(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=zn(Math.floor(Math.random()*5*1024*1024+512*1024)),J=I.cpu.toFixed(1).padStart(5),F=I.mem.toFixed(1).padStart(5),j=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,L=I.user==="root"?le.red:I.user===e?le.green:le.cyan,G=I.cmd==="htop"?le.green:I.cmd==="bash"?le.cyan:le.reset;b.push(`${String(I.pid).padStart(5)} ${L}${I.user.padEnd(10).slice(0,10)}${le.reset}  20   0 ${D.padStart(6)} ${z.padStart(6)} ${Z.padStart(5)} S ${J} ${F} ${j.padStart(9)}  ${G}${I.cmd}${le.reset}`)}return b.push(""),b.push(`${le.dim}${g} \u2014 htop snapshot (non-interactive mode)  press ${le.reset}${le.bold}q${le.reset}${le.dim} to quit in interactive mode${le.reset}`),{stdout:b.join(`
`),exitCode:0}}}});var Ff,Lf=k(()=>{"use strict";Ff={name:"id",description:"Print user identity",category:"system",params:["[-u] [-g] [-G] [-n] [user]"],run:({authUser:t,shell:e,args:n})=>{let r=n.includes("-u"),s=n.includes("-g"),i=n.includes("-G"),o=n.includes("-n"),a=n.find(h=>!h.startsWith("-"))??t,c=e.users.getUid(a),l=e.users.getGid(a),u=e.users.getUserAllGroups(a),d=u.map(h=>{let m=e.users.getGroup(h);return m?m.gid:0});if(r)return{stdout:String(c),exitCode:0};if(s)return o?{stdout:u.join(" "),exitCode:0}:{stdout:String(l),exitCode:0};if(i)return{stdout:d.join(" "),exitCode:0};let f=e.users.getNameByGid(l)??a,p=u.map(h=>{let m=e.users.getGroup(h);return m?`${m.gid}(${h})`:h}).join(",");return{stdout:`uid=${c}(${a}) gid=${l}(${f}) groups=${p}`,exitCode:0}}}});function Uf(t){let e=t.getInterfaces(),n=[];for(let r of e)n.push(Wf(r)),n.push("");return{stdout:n.join(`
`),exitCode:0}}function Hv(t){return{stdout:`${Wf(t)}
`,exitCode:0}}function Wf(t){let e=qv(t),n=[];n.push(`${t.name}: flags=${e}  mtu ${t.mtu}`),t.type==="loopback"?n.push("        loop  txqueuelen 1000  (Local Loopback)"):n.push(`        ether ${t.mac}  txqueuelen 1000  (Ethernet)`),n.push(`        inet ${t.ipv4}  netmask ${Yv(t.ipv4Mask)}  broadcast ${Xv(t.ipv4,t.ipv4Mask)}`),n.push(`        inet6 ${t.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let r=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(r/64),o=Math.floor(s/64);return n.push(`        RX packets ${i}  bytes ${r} (${Bf(r)})`),n.push("        RX errors 0  dropped 0  overruns 0  frame 0"),n.push(`        TX packets ${o}  bytes ${s} (${Bf(s)})`),n.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),t.speed&&n.push(`        Speed: ${t.speed}Mb/s  Duplex: ${t.duplex??"full"}`),n.join(`
`)}function qv(t){let e=4096;return t.state==="UP"&&(e|=1),t.type!=="loopback"&&(e|=4098),t.type==="loopback"&&(e|=8),e}function Yv(t){let e=t===0?0:-1<<32-t>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function Kv(t){return t.split(".").reduce((e,n)=>e+(Number.parseInt(n,10)?Number.parseInt(n,10).toString(2).split("1").length-1:0),0)}function Xv(t,e){let n=t.split(".").reduce((i,o)=>(i<<8)+Number.parseInt(o,10),0)>>>0,r=e===0?0:-1<<32-e>>>0,s=n&r|~r>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function Bf(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KiB`:t<1024*1024*1024?`${(t/(1024*1024)).toFixed(1)} MiB`:`${(t/(1024*1024*1024)).toFixed(1)} GiB`}var zf,jf=k(()=>{"use strict";zf={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(s=>!(s.startsWith("-")||["up","down","inet","netmask","mtu","add","del"].includes(s)));if(t.includes("-a")||!r&&t.length===0)return Uf(n);if(r){let s=n.getInterface(r);if(!s)return{stderr:`ifconfig: ${r}: error fetching interface information: Device not found
`,exitCode:1};if(t.includes("up"))return n.setInterfaceState(r,"UP"),{exitCode:0};if(t.includes("down"))return n.setInterfaceState(r,"DOWN"),{exitCode:0};let i=t.indexOf("inet");if(i!==-1){let a=t[i+1],c=t.indexOf("netmask"),l=c===-1?24:Kv(t[c+1]??"255.255.255.0");return a&&n.setInterfaceIp(r,a,l),{exitCode:0}}let o=t.indexOf("mtu");if(o!==-1){let a=Number.parseInt(t[o+1]??"1500",10);return Number.isNaN(a)||n.setInterfaceMtu(r,a),{exitCode:0}}return Hv(s)}return Uf(n)}}});function cs(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var va=k(()=>{"use strict"});var pi,xa=k(()=>{"use strict";va();va();pi=class t{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:cs(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(n=>n.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let n=this._interfaces.findIndex(r=>r.name===e);return n===-1?!1:(this._interfaces.splice(n,1),this._routes=this._routes.filter(r=>r.device!==e),this.arpCache=this.arpCache.filter(r=>r.device!==e),!0)}setInterfaceType(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.type=n,!0):!1}setInterfaceMtu(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.mtu=n,!0):!1}setInterfaceSpeed(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.speed=n,!0):!1}addRoute(e,n,r,s,i){this._routes.push({destination:e,gateway:n,netmask:r,device:s,flags:n==="0.0.0.0"?"U":"UG",metric:i??0,scope:n==="0.0.0.0"?"link":"global"})}delRoute(e){let n=this._routes.findIndex(r=>r.destination===e);return n===-1?!1:(this._routes.splice(n,1),!0)}addRoutingTable(e){let n=this._nextTableId++;return this._routingTables.push({id:n,name:e,routes:[]}),n}getRoutingTable(e){return this._routingTables.find(n=>n.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,n,r,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:n,netmask:r,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let n=this._policyRules.length>0?Math.max(...this._policyRules.map(r=>r.priority))+1e3:1e3;return this._policyRules.push({...e,priority:n}),n}listPolicyRules(){return[...this._policyRules].sort((e,n)=>e.priority-n.priority)}delPolicyRule(e){let n=this._policyRules.findIndex(r=>r.priority===e);return n===-1?!1:(this._policyRules.splice(n,1),!0)}setInterfaceState(e,n){let r=this._interfaces.find(s=>s.name===e);return r?(r.state=n,!0):!1}setInterfaceIp(e,n,r){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=n,s.ipv4Mask=r,!0):!1}getInterface(e){return this._interfaces.find(n=>n.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let n=this.arpCache.find(r=>r.ip===e);return n&&n.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${t._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${r.ipv4}/${r.ipv4Mask} scope global ${r.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${r.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),n++}return e.join(`
`)}formatIpRoute(){let e=[],n=[...this._routes].sort((r,s)=>(r.metric??0)-(s.metric??0));for(let r of n)r.destination==="default"?e.push(`default via ${r.gateway} dev ${r.device}${r.metric?` metric ${r.metric}`:""}`):e.push(`${r.destination}/${t._maskToCidr(r.netmask)} dev ${r.device}${r.metric?` metric ${r.metric}`:""}${r.scope?` scope ${r.scope}`:""}${r.proto?` proto ${r.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let n=this._routingTables.find(r=>r.id===e);return!n||n.routes.length===0?"":n.routes.map(r=>r.destination==="default"?`default via ${r.gateway} dev ${r.device}`:`${r.destination}/${t._maskToCidr(r.netmask)} dev ${r.device} proto kernel scope link src ${this._ipForDevice(r.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let n=[];for(let r of e){let s=`${r.priority}:	`;if(r.from&&(s+=`from ${r.from} `),r.to&&(s+=`to ${r.to} `),r.iif&&(s+=`iif ${r.iif} `),r.oif&&(s+=`oif ${r.oif} `),r.action==="lookup"){let i=this._routingTables.find(o=>o.id===r.table);s+=`lookup ${i?.name??r.table}`}else s+=r.action;n.push(s)}return n.push("32766:	from all lookup main"),n.push("32767:	from all lookup default"),n.join(`
`)}formatIpLink(){let e=[],n=1;for(let r of this._interfaces){let s=r.state==="UP"?r.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";r.speed&&(i+=`    ${r.speed}Mb/s`),r.duplex&&(i+=` ${r.duplex}-duplex`),e.push(`${n}: ${r.name}: <${s}> mtu ${r.mtu} qdisc mq state ${r.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${t._linkType(r.type)} ${r.mac} brd ff:ff:ff:ff:ff:ff${i}`),n++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}static _linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}static _maskToCidr(e){return e.split(".").reduce((n,r)=>n+(Number.parseInt(r,10)?Number.parseInt(r,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(n=>n.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,n){return e in this._policies?(this._policies[e]=n,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,n,r,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==n)&&!(o.source&&r&&o.source!==r)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let n of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${n} (policy ${this._policies[n]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let r of this._firewallRules){if(r.chain!==n)continue;let s=r.action.padEnd(10),i=r.protocol.padEnd(6),o=(r.source??"0.0.0.0/0").padEnd(20),a=(r.destination??"0.0.0.0/0").padEnd(20),c=r.destPort?`dpt:${r.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let n={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(n),n}updateConntrack(e,n,r,s,i,o){let a=this._findConntrack(e,n,r,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(n,e,r,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:r,srcIp:e,dstIp:n,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let n=e.protocol.padEnd(5),r=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${n} ${r} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,n,r,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===n&&o.protocol===r&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,n=this._conntrack[0]?.timestamp??0;for(let r=1;r<this._conntrack.length;r++)(this._conntrack[r]?.timestamp??0)<n&&(n=this._conntrack[r]?.timestamp??0,e=r);this._conntrack.splice(e,1)}resolveRoute(e){for(let r of this.listPolicyRules())if(!(r.from&&!t._ipMatchesRule(e,r.from))&&!(r.to&&!t._ipMatchesRule(e,r.to))){if(r.action==="blackhole")return{route:null,table:-1};if(r.action==="unreachable")return{route:null,table:-2};if(r.action==="prohibit")return{route:null,table:-3};if(r.action==="lookup"){let s=this._routingTables.find(i=>i.id===r.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:r.table}}}}return{route:this._routes.find(r=>this._ipMatchesDestination(e,r))??null,table:254}}static _ipMatchesRule(e,n){if(n==="all")return!0;if(n.includes("/")){let[r,s]=n.split("/"),i=Number.parseInt(s??"32",10),o=t._ipToInt(e),a=t._ipToInt(r??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===n}_ipMatchesDestination(e,n){if(n.destination==="default"||n.destination===e)return!0;if(n.destination.includes("/"))return t._ipMatchesRule(e,n.destination);let r=t._ipToInt(e),s=t._ipToInt(n.destination),i=t._ipToInt(n.netmask);return(r&i)===(s&i)}static _ipToInt(e){return e.split(".").reduce((n,r)=>(n<<8)+Number.parseInt(r,10),0)>>>0}}});var Vf,Gf=k(()=>{"use strict";xa();Vf={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!r)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(r==="addr"||r==="address"||r==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=Number.parseInt(l??"24",10);n.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&n.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${n.formatIpAddr()}
`,exitCode:0}}if(r==="route"||r==="r"||r==="ro"){let i=t.indexOf("table"),o=i===-1?void 0:Number.parseInt(t[i+1]??"254",10);if(s==="add"){let a=t.indexOf("via"),c=t.indexOf("dev"),l=t.indexOf("metric"),u=t[1]==="add"?t[2]:t[1],d=a===-1?"0.0.0.0":t[a+1],f=c===-1?"eth0":t[c+1],p=l===-1?void 0:Number.parseInt(t[l+1]??"0",10);return u&&u!=="add"&&(o?n.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",f??"eth0",o):n.addRoute(u,d??"0.0.0.0","255.255.255.0",f??"eth0",p)),{exitCode:0}}if(s==="del"){let a=t[1]==="del"?t[2]:t[1];return a&&a!=="del"&&n.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}:{stdout:`${n.formatIpRoute()}
`,exitCode:0}}if(r==="link"||r==="l"){if(s==="set"){let i=t[2];t.includes("up")&&i&&n.setInterfaceState(i,"UP"),t.includes("down")&&i&&n.setInterfaceState(i,"DOWN");let o=t.indexOf("mtu");if(o!==-1&&i){let a=Number.parseInt(t[o+1]??"1500",10);Number.isNaN(a)||n.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=t.indexOf("type"),o="eth1";for(let c=2;c<t.length;c++){let l=t[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=t[c]??"eth1";break}}let a=i===-1?"ether":t[i+1]??"ether";return n.addInterface({name:o,type:a,mac:cs(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=t[2];return i&&n.removeInterface(i),{exitCode:0}}return{stdout:`${n.formatIpLink()}
`,exitCode:0}}if(r==="neigh"||r==="n")return{stdout:`${n.formatIpNeigh()}
`,exitCode:0};if(r==="rule"||r==="ru"){if(s==="show"||s==="list")return{stdout:`${n.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=t.indexOf("from"),o=t.indexOf("to"),a=t.indexOf("table"),c=t.indexOf("iif"),l=t.indexOf("oif");return n.addPolicyRule({from:i===-1?void 0:t[i+1],to:o===-1?void 0:t[o+1],table:Number.parseInt(t[a+1]??"254",10),iif:c===-1?void 0:t[c+1],oif:l===-1?void 0:t[l+1],action:"lookup"}),{exitCode:0}}if(s==="del"){let i=Number.parseInt(t[2]??"0",10);return i&&n.delPolicyRule(i),{exitCode:0}}return{stdout:`${n.formatIpRule()}
`,exitCode:0}}if(r==="route"&&t.includes("table")){let i=t.indexOf("table"),o=Number.parseInt(t[i+1]??"254",10);return{stdout:`${n.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${r}" is unknown, try "ip help".`,exitCode:1}}}});var Hf,qf=k(()=>{"use strict";Hf={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let n=e.network,r="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":r="list";break;case"-A":case"--append":r="append",s=t[++o]??"";break;case"-F":case"--flush":r="flush";break;case"-P":case"--policy":r="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=Number.parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break;default:break}}switch(r){case"list":return{stdout:`${n.formatFirewall()}
`,exitCode:0};case"flush":return n.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!(s&&(t.includes("-j")||["ACCEPT","DROP"].includes(t[t.length-1]??"")))){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?n.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?n.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return s&&i.action?["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${n.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -A requires chain and -j action",exitCode:1};default:return{stderr:"iptables: no action specified (-L, -A, -F, -P)",exitCode:1}}}}});function Yf(t,e){if(!t)return e.filter(r=>r.status!=="stopped").pop();let n=Number.parseInt(t.replace(/^%/,""),10);return e.find(r=>r.pid===n)}var Kf,Xf,Zf,Jf=k(()=>{"use strict";Kf={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((r,s)=>{let i=`[${s+1}]`,o=r.status==="running"?"running":r.status==="done"?"done":"stopped";return`${i}  ${String(r.pid).padStart(5)} ${o.padEnd(8)} ${r.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Xf={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=Yf(t[0],n);return r?r.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`[${n.indexOf(r)+1}]  ${r.pid}  ${r.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},Zf={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let n=e.users.listProcesses(),r=Yf(t[0],n);return r?r.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(r.status="running",{stdout:`${r.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function Ca(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in ls)return e;let n=t.toUpperCase().replace(/^SIG/,"");for(let[r,s]of Object.entries(ls))if(s.name===`SIG${n}`||s.name===n)return Number(r);return null}var ls,Qf=k(()=>{"use strict";ls={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var ep,tp=k(()=>{"use strict";Qf();ep={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let n=15,r;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(ls).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=Ca(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};n=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=Ca(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};n=u}}else c.startsWith("-")||(r=c)}}if(!r)return{stderr:"kill: no pid specified",exitCode:1};let s=Number.parseInt(r,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${r}`,exitCode:1}:e.users.killProcess(s,n)?{stdout:`Sent ${ls[n]?.name??`signal ${n}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var np,rp,sp=k(()=>{"use strict";tt();np={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:n})=>{let r=t[0]??n,s=`${ge(r)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${r.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},rp={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?Number.parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var us,ip,op=k(()=>{"use strict";ee();us=24,ip={name:"less",description:"View file content with pagination",category:"files",params:["[-N] [file...]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: less [options] file...","  -N, --line-numbers  Show line numbers","  -h, --help          Show this help","","View file content with paginated output."].join(`
`),exitCode:0};let n=M(e,["-N","--line-numbers"]),r=e.filter(l=>!l.startsWith("-"));if(r.length===0)return{stderr:"less: missing file operand",exitCode:1};let s=[];for(let l of r){if(!t.vfs.exists(l))return{stderr:`less: ${l}: No such file`,exitCode:1};let u=t.vfs.readFile(l),d=u.split(`
`);if(n){let f=String(d.length).length,p=d.map((h,m)=>`${String(m+1).padStart(f)}  ${h}`);s.push(p.join(`
`))}else s.push(u)}let i=s.join(`

`),o=i.split(`
`).length;if(o<=us)return{stdout:`${i}
`,exitCode:0};let a=[],c=i.split(`
`);for(let l=0;l<c.length;l+=us){let u=c.slice(l,l+us),d=Math.min(100,Math.round((l+us)/o*100));a.push(u.join(`
`)),l+us<c.length&&a.push(`
--More--(${d}%)`)}return{stdout:`${a.join(`
`)}
(END)
`,exitCode:0}}}});var ap,cp,lp=k(()=>{"use strict";ee();ae();ap={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{let o=M(r,["-s","--symbolic"]),a=r.filter(f=>!f.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"ln: missing operand",exitCode:1};let u=B(n,l),d=o?c:B(n,c);try{if(be(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let f=B(n,c);if(be(t,f,"ln"),!e.vfs.exists(f))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let p=e.vfs.readFile(f,s,i);e.vfs.writeFile(u,p,{},s,i)}return{exitCode:0}}catch(f){return{stderr:`ln: ${f instanceof Error?f.message:String(f)}`,exitCode:1}}}},cp={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.includes("-f")||n.includes("-e"),s=n.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=B(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function vr(t,e){return e?`${e}${t}${Zv}`:t}function _a(t,e,n){if(n)return Qv;if(e==="directory"){let r=!!(t&512),s=!!(t&2);return r&&s?tx:r?nx:s?rx:Jv}return e==="device"?up:t&73?ex:up}function dp(t,e,n){let r;n?r="l":e==="directory"?r="d":e==="device"?r="c":r="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${r}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function wa(t){let e=new Date,n=4320*3600*1e3,r=Math.abs(e.getTime()-t.getTime())<n,s=String(t.getDate()).padStart(2," "),i=sx[t.getMonth()]??"";if(r){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function mi(t,e){try{return t.readFile(e)}catch{return"?"}}function ix(t,e,n){let r=e==="/"?"":e;return n.map(s=>{let i=`${r}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=_a(a.mode,a.type,o);return vr(s,c)}).join("  ")}function ox(t,e,n,r){let s=n==="/"?"":n,i=r.map(u=>{let d=`${s}/${u}`,f=t.isSymlink(d),p;try{p=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:wa(new Date),label:u}}let h=f?41471:p.mode,m=dp(h,p.type,f),g=p.type==="directory"?String((p.childrenCount??0)+2):"1",y=f?mi(t,d).length:p.type==="file"?p.size??0:p.type==="device"?0:(p.childrenCount??0)*4096,v=String(y),x=wa(p.updatedAt),b=_a(h,p.type,f),P=f?`${vr(u,b)} -> ${mi(t,d)}`:vr(u,b);return{perms:m,nlink:g,size:v,date:x,label:P}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=r.length*8,l=i.map((u,d)=>{let f=(()=>{try{return t.stat(`${s}/${r[d]}`)}catch{return null}})(),p=f&&"uid"in f?f.uid:0,h=f&&"gid"in f?f.gid:0,m=e.getUsername(p)??String(p),g=e.getGroupName(h)??String(h);return`${u.perms} ${u.nlink.padStart(o)} ${m} ${g} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var Zv,Jv,Qv,ex,up,tx,nx,rx,sx,fp,pp=k(()=>{"use strict";ee();ae();Zv="\x1B[0m",Jv="\x1B[1;34m",Qv="\x1B[1;36m",ex="\x1B[1;32m",up="",tx="\x1B[30;42m",nx="\x1B[37;44m",rx="\x1B[34;42m";sx=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];fp={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=M(r,["-l","--long","-la","-al"]),i=M(r,["-a","--all","-la","-al"]),o=hn(r,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=B(n,o??n);if(Qe(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let f=a.split("/").pop()??a,p=_a(d?41471:u.mode,u.type,d);if(s){let h=d?41471:u.mode,m=d?mi(e.vfs,a).length:u.size??0,g=dp(h,u.type,d),y=d?`${vr(f,p)} -> ${mi(e.vfs,a)}`:vr(f,p),v="uid"in u?u.uid:0,x="gid"in u?u.gid:0,b=e.users.getUsername(v)??String(v),P=e.users.getGroupName(x)??String(x);return{stdout:`${g} 1 ${b} ${P} ${m} ${wa(u.updatedAt)} ${y}
`,exitCode:0}}return{stdout:`${vr(f,p)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?ox(e.vfs,e.users,a,c):ix(e.vfs,a,c)}
`,exitCode:0}}}});var mp,hp=k(()=>{"use strict";ee();mp={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let n=e.properties?.os??"Fortune GNU/Linux x64",r="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let f of d.split(`
`))f.startsWith("PRETTY_NAME=")&&(n=f.slice(12).replace(/^"|"$/g,"").trim()),f.startsWith("VERSION_CODENAME=")&&(r=f.slice(17).trim()),f.startsWith("VERSION_ID=")&&(s=f.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=M(t,["-a","--all"]),o=M(t,["-i","--id"]),a=M(t,["-d","--description"]),c=M(t,["-r","--release"]),l=M(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${n}`,`Release:	${s}`,`Codename:	${r}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${n}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${r}`),{stdout:u.join(`
`),exitCode:0}}}});var gp,yp=k(()=>{"use strict";gp={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let r="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${r}
${s.join(`
`)}`,exitCode:0}}}});function Ia(t,e,n,r,s,i){let o=t.vfs.readFile(e),a=ax(o);if(a.length===0)return{stdout:`make: Nothing to be done for '${n[0]??"all"}'.`,exitCode:0};let c=n.length>0?n:["all"],l=[];for(let u of c){let d=a.find(f=>f.target===u);if(!d)return{stderr:`make: *** No rule to make target '${u}'.  Stop.`,exitCode:2};for(let f of d.deps)if(!t.vfs.exists(f)){if(!a.find(h=>h.target===f))return{stderr:`make: *** No rule to make target '${f}', needed by '${u}'.  Stop.`,exitCode:2};s||l.push("make: Entering unknown directory")}for(let f of d.cmds){let p=f.startsWith("@")?f.slice(1):f;s||r?r&&l.push(p):l.push(p)}}return l.length===0&&l.push(`make: Nothing to be done for '${c.join(" ")}'.`),{stdout:`${l.join(`
`)}
`,exitCode:0}}function ax(t){let e=[],n=t.split(`
`),r=null;for(let s of n){let i=s.trim();if(!i||i.startsWith("#"))continue;if(i.startsWith("	")||i.startsWith(" ")){let a=i.replace(/^[\t ]+/,"");r&&r.cmds.push(a);continue}let o=i.match(/^([a-zA-Z0-9_.-/]+)\s*:\s*(.*)$/);if(o){r&&e.push(r);let a=o[1],c=o[2].trim(),l=c?c.split(/\s+/):[];r={target:a,deps:l,cmds:[]}}}return r&&e.push(r),e}var Sp,bp=k(()=>{"use strict";ee();Sp={name:"make",description:"Build targets from a Makefile",category:"development",params:["[options] [target...]"],run:({shell:t,args:e,cwd:n})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: make [options] [target...]","  -C <dir>       Change to directory before reading Makefile","  -f <file>      Use file as Makefile","  -n, --dry-run  Print commands without executing","  -s, --silent   Silent operation","  -h, --help     Show this help","","Build targets from Makefile in current directory."].join(`
`),exitCode:0};let r=M(e,["-n","--dry-run"]),s=M(e,["-s","--silent"]),i=e.indexOf("-f"),o=i!==-1&&i+1<e.length?e[i+1]:null,a=e.indexOf("-C"),c=a!==-1&&a+1<e.length?e[a+1]:n,l=e.filter(d=>!d.startsWith("-")&&d!==e[i+1]&&d!==e[a+1]),u=o?o.startsWith("/")?o:`${c}/${o}`:`${c}/Makefile`;if(!t.vfs.exists(u)){let d=`${c}/GNUmakefile`;if(t.vfs.exists(d))return Ia(t,d,l,r,s,c);let f=`${c}/makefile`;return t.vfs.exists(f)?Ia(t,f,l,r,s,c):{stderr:"make: *** No targets specified and no makefile found.  Stop.",exitCode:2}}return Ia(t,u,l,r,s,c)}}});var vp,xp=k(()=>{"use strict";vp={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       zip -d archive.zip file.txt   # remove from archive`}});var cx,Cp,wp=k(()=>{"use strict";xp();cx={gunzip:"gzip","[":"test","[[":"test"},Cp={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:({args:t,shell:e})=>{let n=t[0];if(!n)return{stderr:"What manual page do you want?",exitCode:1};let r=`/usr/share/man/man1/${n}.1`;if(e.vfs.exists(r))return{stdout:e.vfs.readFile(r),exitCode:0};let s=n.toLowerCase(),i=cx[s]??s,o=vp[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${n}`,exitCode:16}}}});import{createHash as _p}from"node:crypto";import*as Ip from"node:path";var Ep,$p,Pp,kp,Mp,Np,Ap,Tp=k(()=>{"use strict";ee();ae();Ep={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(o=>!o.startsWith("-"));if(!r)return{stderr:`realpath: missing operand
`,exitCode:1};let s=B(e,r);if(!t.vfs.exists(s))return{stderr:`realpath: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${Ip.posix.normalize(i)}
`,exitCode:0}}},$p={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=B(e,r);if(!t.vfs.exists(s))return{stderr:`md5sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${_p("md5").update(i).digest("hex")}  ${r}
`,exitCode:0}}},Pp={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(a=>!a.startsWith("-"));if(!r)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=B(e,r);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${_p("sha256").update(i).digest("hex")}  ${r}
`,exitCode:0}}},kp={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.find(c=>!c.startsWith("-"));if(!r)return{stderr:`strings: missing file operand
`,exitCode:1};let s=B(e,r);if(!t.vfs.exists(s))return{stderr:`strings: ${r}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Mp={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Me(n,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=B(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=r;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let f=[];for(let p=0;p<d.length;p+=o)f.push(d.slice(p,p+o));return f.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},Np={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Me(n,{flagsWithValue:["-t","--tabs"]}),o=Number.parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=B(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=r;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Ap={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:n,stdin:r})=>{let{flagsWithValues:s,positionals:i}=Me(n,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let f=B(e,a);if(!t.vfs.exists(f))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(f)}else c=r;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let f of l)d.length+f.length+(d?1:0)>o?(d&&u.push(d),d=f):d=d?`${d} ${f}`:f;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});function dx(t){return t?ux:lx}var lx,ux,Op,Rp=k(()=>{"use strict";lx={dotglob:"__dotglob",nullglob:"__nullglob",failglob:"__failglob",extglob:"__extglob",histexpand:"__histexpand",cdable_vars:"__cdable_vars",extdebug:"__extdebug"},ux={errexit:"__errexit",nounset:"__nounset",noclobber:"__noclobber",xtrace:"__xtrace",pipefail:"__pipefail"};Op={name:"shopt",description:"Manage shell options",category:"shell",params:["[-pqsu] [-o] [optname ...]"],run:({args:t,env:e})=>{let n=t.includes("-s"),r=t.includes("-u"),s=t.includes("-q"),i=t.includes("-o"),o=t.filter(l=>!["-s","-u","-q","-o"].includes(l)),a=dx(i);if(o.length===0){let l=[];for(let[u,d]of Object.entries(a)){let f=e.vars[d]==="1";l.push(`${f?"on":"off"}	${u}`)}return{stdout:`${l.join(`
`)}
`,exitCode:0}}if(n){for(let l of o){let u=a[l];u&&(e.vars[u]="1")}return{exitCode:0}}if(r){for(let l of o){let u=a[l];u&&delete e.vars[u]}return{exitCode:0}}if(s){for(let l of o){let u=a[l];if(!u||e.vars[u]!=="1")return{exitCode:1}}return{exitCode:0}}let c=[];for(let l of o){let u=a[l],d=u?e.vars[u]==="1":!1;c.push(`${d?"on":"off"}	${l}`)}return{stdout:`${c.join(`
`)}
`,exitCode:0}}}});import*as Dp from"node:path";var Fp,Lp=k(()=>{"use strict";ee();ae();Fp={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<r.length;o++){let a=hn(r,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=B(n,a);Qe(e.vfs,e.users,t,Dp.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var Up,Bp,zp,Wp=k(()=>{"use strict";Up=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],Bp={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let n="null",r="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!Up.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${Up.join(", ")}`,exitCode:1};n=o}else i&&!i.startsWith("-")&&(r=i)}if(!r)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(r,n),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},zp={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e,authUser:n})=>{let r=e.find(o=>!o.startsWith("-"));if(!r)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};let s=t.users.getUid(n),i=t.users.getGid(n);try{return t.vfs.writeFile(r,"",{mode:420},s,i),{exitCode:0}}catch(o){return{stderr:`mkfifo: ${o instanceof Error?o.message:String(o)}`,exitCode:1}}}}});var ds,jp,Vp=k(()=>{"use strict";ee();ds=24,jp={name:"more",description:"View file content page by page",category:"files",params:["[options] [file...]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: more [options] file...","  -d               Show prompts with [Press space to continue]","  -h, --help       Show this help","","View file content one screen at a time."].join(`
`),exitCode:0};let n=e.filter(a=>!a.startsWith("-"));if(n.length===0){if(!process.stdin.isTTY){let a="",c=process.stdin.read();return c&&(a=c.toString()),{stdout:`${a}
`,exitCode:0}}return{stderr:"more: missing file operand",exitCode:1}}let r=[];for(let a of n){if(!t.vfs.exists(a))return{stderr:`more: ${a}: No such file`,exitCode:1};let c=t.vfs.readFile(a);r.push(c)}let s=r.join(`

`),i=s.split(`
`);if(i.length<=ds)return{stdout:`${s}
`,exitCode:0};let o=[];for(let a=0;a<i.length;a+=ds){let c=i.slice(a,a+ds),l=Math.min(100,Math.round((a+ds)/i.length*100));o.push(c.join(`
`)),a+ds<i.length&&o.push(`
--More--(${l}%)`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Gp,Hp=k(()=>{"use strict";Gp={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let n=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(n),{exitCode:0}}}});import*as qp from"node:path";var Yp,Kp=k(()=>{"use strict";ee();ae();Yp={name:"mv",description:"Move or rename files",category:"files",params:["[-i] <source> <dest>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=M(r,["-i"]),i=r.filter(f=>!f.startsWith("-")),[o,a]=i;if(!(o&&a))return{stderr:"mv: missing operand",exitCode:1};let c=B(n,o),l=B(n,a),u=e.users.getUid(t),d=e.users.getGid(t);try{if(Qe(e.vfs,e.users,t,c,2),Qe(e.vfs,e.users,t,qp.posix.dirname(l),2),!e.vfs.exists(c))return{stderr:`mv: ${o}: No such file or directory`,exitCode:1};let f=e.vfs.exists(l)&&e.vfs.stat(l).type==="directory"?`${l}/${o.split("/").pop()}`:l,p=h=>(h.vfs.move(c,f,u,d),{exitCode:0});return s&&e.vfs.exists(f)&&e.vfs.stat(f).type==="file"?{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:`mv: overwrite '${a}'? [y/N] `,mode:"confirm",onPassword:(h,m)=>{let g=h.trim().toLowerCase();return g!=="y"&&g!=="yes"?Promise.resolve({result:{stdout:`mv: cancelled
`,exitCode:1}}):Promise.resolve({result:p(m)})}},exitCode:0}:p(e)}catch(f){return{stderr:`mv: ${f instanceof Error?f.message:String(f)}`,exitCode:1}}}}});import*as Xp from"node:path";var Zp,Jp=k(()=>{"use strict";ae();Zp={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=r[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=B(n,s);be(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=Xp.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as im,readdirSync as fx,readFileSync as Ea}from"node:fs";import*as Ze from"node:os";import*as om from"node:path";function px(t){let e=Math.max(1,Math.floor(t/60)),n=Math.floor(e/1440),r=Math.floor(e%1440/60),s=e%60,i=[];return n>0&&i.push(`${n} day${n>1?"s":""}`),r>0&&i.push(`${r} hour${r>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Qp(t){return`\x1B[${t}m   \x1B[0m`}function mx(){let t=[40,41,42,43,44,45,46,47].map(Qp).join(""),e=[100,101,102,103,104,105,106,107].map(Qp).join("");return[t,e]}function em(t,e,n){if(t.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i=n<=1?0:e/(n-1),o=Math.round(r.r+(s.r-r.r)*i),a=Math.round(r.g+(s.g-r.g)*i),c=Math.round(r.b+(s.b-r.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function hx(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?tm(t):t;let n=t.substring(0,e+1),r=t.substring(e+1);return tm(n)+r}function tm(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),n=t.replace(e,"");if(n.trim().length===0)return t;let r={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<n.length;o+=1){let a=n.length<=1?0:o/(n.length-1),c=Math.round(r.r+(s.r-r.r)*a),l=Math.round(r.g+(s.g-r.g)*a),u=Math.round(r.b+(s.b-r.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${n[o]}\x1B[0m`}return i}function nm(t){return Math.max(0,Math.round(t/(1024*1024)))}function rm(){try{let t=Ea("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{}}function sm(t){try{let e=Ea(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{}}function gx(t){let e=sm("/sys/devices/virtual/dmi/id/sys_vendor"),n=sm("/sys/devices/virtual/dmi/id/product_name");return e&&n?`${e} ${n}`:n||t}function yx(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(im(e))try{return Ea(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Sx(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(im(e))try{return fx(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function bx(){let t=yx(),e=Sx();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function vx(t){let e=Ze.cpus(),n=t.cpuCapCores,r=n!==void 0&&n>0?e.slice(0,n):e;if(r.length===0)return"unknown";let s=r[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${r.length}) @ ${i}GHz`}function xx(t){return!t||t.trim().length===0?"unknown":om.posix.basename(t.trim())}function Cx(t){let e=Ze.totalmem(),n=Ze.freemem(),r=t.ramCapBytes,s=r!==void 0&&r>0?Math.min(e,r):e,i=r!==void 0&&r>0?Math.floor(s*(n/e)):n,o=Math.max(0,s-i),a=t.shellProps,c=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(c)),{user:t.user,host:t.host,osName:a?.os??t.osName??`${rm()??Ze.type()} ${Ze.arch()}`,kernel:a?.kernel??t.kernel??Ze.release(),uptimeSeconds:t.uptimeSeconds??Ze.uptime(),packages:t.packages??bx(),shell:xx(t.shell),shellProps:t.shellProps??{kernel:t.kernel??Ze.release(),os:t.osName??`${rm()??Ze.type()} ${Ze.arch()}`,arch:Ze.arch()},resolution:t.resolution??a?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??vx(t),gpu:t.gpu??a?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??nm(o),memoryTotalMiB:t.memoryTotalMiB??nm(s),cpuCapCores:t.cpuCapCores??0,ramCapBytes:t.ramCapBytes??0}}function am(t){let e=Cx(t),n=px(e.uptimeSeconds),r=mx(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${gx(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${n}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",r[0],r[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=em(l.padEnd(31," "),c,s.length),f=hx(u);a.push(`${d}  ${f}`);continue}a.push(em(l,c,s.length))}return a.join(`
`)}var cm=k(()=>{"use strict"});var lm,um=k(()=>{"use strict";cm();ee();lm={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:n,shell:r,env:s})=>r.packageManager.isInstalled("neofetch")?M(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:M(t,"--off")?{stdout:`${e}@${n}`,exitCode:0}:{stdout:am({user:e,host:n,shell:s.vars.SHELL,shellProps:r.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-r.startTime)/1e3),packages:`${r.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:r.resourceCaps?.cpuCapCores,ramCapBytes:r.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});var dm,fm=k(()=>{"use strict";dm={name:"nc",aliases:["netcat"],description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let n=e,r=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?Number.parseInt(t[s+1],10):void 0,o=t.includes("-v");if(r&&i)return new Promise(u=>{let d=n.createServer(f=>{let p="";f.on("data",h=>{p+=h.toString()}),f.on("end",()=>{d.close(),u({stdout:p,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?Number.parseInt(a[1],10):Number.NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=n.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var pm,mm=k(()=>{"use strict";pm={name:"newgrp",description:"Switch primary group for current session",category:"users",params:["[group]"],run:({authUser:t,shell:e,args:n})=>{let r=n[0];if(!r){let i=e.users.getGid(t);return{stdout:`newgrp: switched to default group '${e.users.getNameByGid(i)??t}' (${i})
`,exitCode:0}}let s=e.users.getGroup(r);return s?e.users.isMemberOf(t,r)?{stdout:`newgrp: switched to group '${r}' (${s.gid})
`,exitCode:0}:{stderr:`newgrp: user '${t}' is not a member of '${r}'
`,exitCode:1}:{stderr:`newgrp: group '${r}' does not exist
`,exitCode:1}}}});var hm,gm=k(()=>{"use strict";ee();tt();hm={name:"nice",description:"Run command with adjusted scheduling priority",category:"system",params:["[-n priority] [-p pid] [command [args...]]"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let{flagsWithValues:c,positionals:l}=Me(a,{flagsWithValue:["-n","-p"]}),u=c.get("-n"),d=c.get("-p");if(d){let m=Number.parseInt(d,10);if(Number.isNaN(m))return{stderr:`nice: invalid PID: ${d}
`,exitCode:1};let g=u===void 0?0:Number.parseInt(u,10);if(Number.isNaN(g)||g<-20||g>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let y=s.users.getProcess(m);if(!y)return{stderr:`nice: no such process: ${m}
`,exitCode:1};if(y.username!==t&&t!=="root")return{stderr:`nice: permission denied
`,exitCode:1};let v=y.nice;return s.users.setProcessNice(m,g)?{stdout:`pid ${m}: nice ${v} \u2192 ${g} (${y.priority})
`,exitCode:0}:{stderr:`nice: failed to set priority
`,exitCode:1}}let f=u===void 0?10:Number.parseInt(u,10);if(Number.isNaN(f)||f<-20||f>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let p=l.join(" ");if(!p)return{stdout:`0
`,exitCode:0};let h={...o,NICE_PRIORITY:String(f)};return xe(p,t,e,n,r,s,i,h)}}});import ym from"node:vm";function wx(t,e){let n={version:hi,versions:Sm,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new gi(i)},cwd:()=>"/root",hrtime:()=>[0,0]},r={log:(...i)=>t.push(i.map(Bt).join(" ")),error:(...i)=>e.push(i.map(Bt).join(" ")),warn:(...i)=>e.push(i.map(Bt).join(" ")),info:(...i)=>t.push(i.map(Bt).join(" ")),dir:i=>t.push(Bt(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(Bt).join(" "),inspect:o=>Bt(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},ym.createContext({console:r,process:n,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function Bt(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(Bt).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([n,r])=>`${n}: ${Bt(r)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function yi(t){let e=[],n=[],r=wx(e,n),s=0;try{let i=ym.runInContext(t,r,{timeout:5e3});i!==void 0&&e.length===0&&e.push(Bt(i))}catch(i){i instanceof gi?s=i.code:i instanceof Error?(n.push(`${i.name}: ${i.message}`),s=1):(n.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:n.length?`${n.join(`
`)}
`:"",exitCode:s}}function _x(t){let e=t.trim();return e.includes(`
`)||e.startsWith("const ")||e.startsWith("let ")||e.startsWith("var ")||e.startsWith("function ")||e.startsWith("class ")||e.startsWith("if ")||e.startsWith("for ")||e.startsWith("while ")||e.startsWith("import ")||e.startsWith("//")?yi(`(async () => { ${t} })()`):yi(e)}var hi,Sm,gi,bm,vm=k(()=>{"use strict";ee();ae();hi="v18.19.0",Sm={node:hi,npm:"9.2.0",v8:"10.2.154.26-node.22"};gi=class{constructor(e){this.code=e}code};bm={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(M(t,["--version","-v"]))return{stdout:`${hi}
`,exitCode:0};if(M(t,["--versions"]))return{stdout:`${JSON.stringify(Sm,null,2)}
`,exitCode:0};let r=t.findIndex(o=>o==="-e"||o==="--eval");if(r!==-1){let o=t[r+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yi(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=yi(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=B(n,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=_x(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${hi}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var xm,Cm=k(()=>{"use strict";tt();xm={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?xe(c,t,e,n,r,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var Si,Ix,wm,_m,Im=k(()=>{"use strict";ee();Si="9.2.0",Ix="18.19.0",wm={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(M(t,["--version","-v"]))return{stdout:`${Si}
`,exitCode:0};let n=t[0]?.toLowerCase();switch(n){case"version":case"-version":return{stdout:`{ npm: '${Si}', node: '${Ix}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${n==="ls"||n==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${Si}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${n}
`,exitCode:1}}}},_m={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?M(t,["--version"])?{stdout:`${Si}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var Em,$m=k(()=>{"use strict";Em={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var Pm,km=k(()=>{"use strict";Pm={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:n,stdin:r})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!n.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(r!==void 0&&r.trim().length>0){let i=r.trim().split(`
`)[0];return await n.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Mm,Nm=k(()=>{"use strict";Mm={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let n=t.indexOf("-e"),r=n===-1?void 0:t[n+1],s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!r)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let f=c[d],p=r.replace(/\$_/g,JSON.stringify(f)).replace(/\$\./g,String(d+1)),h=p.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(h){let g=h[4]??"";try{let y=new RegExp(h[2],g.includes("i")?g.includes("g")?"gi":"i":g.includes("g")?"g":"");f=f.replace(y,h[3])}catch{}s&&l.push(f);continue}let m=p.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(m){let g=(m[1]??m[2]??m[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(r.startsWith("say")?g:g.replace(/\n$/,"")),s&&l.push(f);continue}s&&l.push(f)}else{let d=r.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let f=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(f)}else(r.trim()==="print $]"||r.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});async function $x(t,e){try{let{execSync:n}=await import("node:child_process");return{stdout:n(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(n){let r=n instanceof Error?n.stderr:"";return r?{stderr:r}:null}}var Ex,Am,Tm=k(()=>{"use strict";ee();Ex=typeof process>"u"||typeof process.versions?.node>"u";Am={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:n,positionals:r}=Me(t,{flagsWithValue:["-c","-i","-W"]}),s=r[0]??"localhost",i=n.get("-c"),o=i?Math.max(1,Number.parseInt(i,10)||4):4;if(!Ex){let f=await $x(o,s);if(f)return{...f,exitCode:"stdout"in f?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let f=0;f<o;f++){c++;let p=e.network.ping(s);p<0?a.push(`From ${s} icmp_seq=${f} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${f} ttl=64 time=${p.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function Px(t,e){let n=0,r="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":r+=`
`,s+=2;continue;case"t":r+="	",s+=2;continue;case"r":r+="\r",s+=2;continue;case"\\":r+="\\",s+=2;continue;case"a":r+="\x07",s+=2;continue;case"b":r+="\b",s+=2;continue;case"f":r+="\f",s+=2;continue;case"v":r+="\v",s+=2;continue;default:r+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+Number.parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+Number.parseInt(t[i],10),i++;let u=t[i],d=e[n++]??"",f=(p,h=" ")=>{if(c<=0||p.length>=c)return p;let m=h.repeat(c-p.length);return o?p+m:m+p};switch(u){case"s":{let p=String(d);l>=0&&(p=p.slice(0,l)),r+=f(p);break}case"d":case"i":r+=f(String(Number.parseInt(d,10)||0),a?"0":" ");break;case"f":{let p=l>=0?l:6;r+=f((Number.parseFloat(d)||0).toFixed(p));break}case"o":r+=f((Number.parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":r+=f((Number.parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":r+=f((Number.parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":r+="%",n--;break;default:r+=t[s],s++;continue}s=i+1;continue}r+=t[s],s++}return r}var Om,Rm=k(()=>{"use strict";Om={name:"printf",description:"Format and print data",category:"shell",params:["[-v var] <format> [args...]"],run:({args:t,env:e})=>{let n,r=0;t[0]==="-v"&&t[1]&&(n=t[1],r=2);let s=t[r];if(!s)return{stderr:"printf: missing format string",exitCode:1};let i=Px(s,t.slice(r+1));return n?(e&&(e.vars[n]=i),{exitCode:0}):{stdout:i,exitCode:0}}}});var Dm,Fm,Lm=k(()=>{"use strict";Dm={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let n=e.includes("-f"),r=e.find(s=>!s.startsWith("-"));if(!r)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(r),i=[];for(let o=0;o<t.length;o++){let a=t[o];if(a===void 0)continue;let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Fm={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:n})=>{let r=n.includes("-f"),s=n.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var Um,Bm=k(()=>{"use strict";ee();Um={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:n})=>{let r=e.users.listActiveSessions(),s=e.users.listProcesses(),i=M(n,["-u"])||n.includes("u")||n.includes("aux")||n.includes("au"),o=M(n,["-a","-x"])||n.includes("a")||n.includes("aux"),a=new Map(r.map((d,f)=>[d.id,1e3+f])),c=1e3+r.length;if(i){let f=["USER       PID  NI PRI %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let p of r){let h=p.username.padEnd(10).slice(0,10),m=(Math.random()*.5).toFixed(1),g=Math.floor(Math.random()*2e4+5e3),y=Math.floor(Math.random()*5e3+1e3);f.push(`${h} ${String(a.get(p.id)).padStart(6)}   0  20  0.0  ${m.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${p.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let p of s){if(!o&&p.username!==t)continue;let h=p.username.padEnd(10).slice(0,10),m=(Math.random()*1.5).toFixed(1),g=Math.floor(Math.random()*5e4+1e4),y=Math.floor(Math.random()*1e4+2e3),v=p.nice??0,x=20-v;f.push(`${h} ${String(p.pid).padStart(6)} ${String(v).padStart(3)} ${String(x).padStart(3)}  0.1  ${m.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${p.tty.padEnd(8)} S    00:00   0:00 ${p.command}`)}return f.push(`root       ${String(c).padStart(6)}   0  20  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:f.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of r)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var zm,Wm=k(()=>{"use strict";zm={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function De(t=[]){return{__pytype__:"dict",data:new Map(t)}}function $a(t,e,n=1){return{__pytype__:"range",start:t,stop:e,step:n}}function Te(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Cr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function zt(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function Pa(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function fs(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function sn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function qe(t){return t===null||sn(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(qe).join(", ")}]`:Te(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${qe(n)}`).join(", ")}}`:Cr(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:zt(t)?`<function ${t.name} at 0x...>`:Pa(t)?`<class '${t.name}'>`:fs(t)?`<${t.cls.name} object at 0x...>`:String(t)}function oe(t){return t===null||sn(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(qe).join(", ")}]`:Te(t)?`{${[...t.data.entries()].map(([e,n])=>`'${e}': ${qe(n)}`).join(", ")}}`:Cr(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:qe(t)}function mt(t){return t===null||sn(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Te(t)?t.data.size>0:Cr(t)?Vm(t)>0:!0}function Vm(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function Mx(t){let e=[];for(let n=t.start;(t.step>0?n<t.stop:n>t.stop)&&(e.push(n),!(e.length>1e4));n+=t.step);return e}function He(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Cr(t))return Mx(t);if(Te(t))return[...t.data.keys()];throw new Re("TypeError",`'${Wn(t)}' object is not iterable`)}function Wn(t){return t===null||sn(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Te(t)?"dict":Cr(t)?"range":zt(t)?"function":Pa(t)?"type":fs(t)?t.cls.name:"object"}function Nx(t){let e=new Map,n=De([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return n.__methods__={getcwd:()=>t,getenv:r=>typeof r=="string"?process.env[r]??V:V,path:De([["join",V],["exists",V],["dirname",V],["basename",V]]),listdir:()=>[]},e.set("__builtins__",V),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Ax(t){let e=De([["sep","/"],["curdir","."]]),n=De([["sep","/"],["linesep",`
`],["name","posix"]]);return n._cwd=t,e._cwd=t,n.path=e,n}function Tx(){return De([["version",bi],["version_info",De([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Ox(){return De([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",Number.POSITIVE_INFINITY],["nan",Number.NaN],["sqrt",V],["floor",V],["ceil",V],["log",V],["pow",V],["sin",V],["cos",V],["tan",V],["fabs",V],["factorial",V]])}function Rx(){return De([["dumps",V],["loads",V]])}function Dx(){return De([["match",V],["search",V],["findall",V],["sub",V],["split",V],["compile",V]])}var kx,bi,V,Re,xr,ps,ms,hs,jm,vi,Gm,Hm=k(()=>{"use strict";ee();ae();kx="Python 3.11.2",bi="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",V={__pytype__:"none"};Re=class{constructor(e,n){this.type=e;this.message=n}type;message;toString(){return`${this.type}: ${this.message}`}},xr=class{constructor(e){this.value=e}value},ps=class{},ms=class{},hs=class{constructor(e){this.code=e}code};jm={os:Ax,sys:()=>Tx(),math:()=>Ox(),json:()=>Rx(),re:()=>Dx(),random:()=>De([["random",V],["randint",V],["choice",V],["shuffle",V]]),time:()=>De([["time",V],["sleep",V],["ctime",V]]),datetime:()=>De([["datetime",V],["date",V],["timedelta",V]]),collections:()=>De([["Counter",V],["defaultdict",V],["OrderedDict",V]]),itertools:()=>De([["chain",V],["product",V],["combinations",V],["permutations",V]]),functools:()=>De([["reduce",V],["partial",V],["lru_cache",V]]),string:()=>De([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},vi=class t{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}static _splitArgs(e){let n=[],r=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(r++,s+=c):")]}".includes(c)?(r--,s+=c):c===","&&r===0?(n.push(s.trim()),s=""):s+=c}return s.trim()&&n.push(s.trim()),n}pyEval(e,n){if(e=e.trim(),!e||e==="None")return V;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return V;if(/^-?\d+$/.test(e))return Number.parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return Number.parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return Number.parseInt(e,16);if(/^0o[0-7]+$/.test(e))return Number.parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let r=e.match(/^f(['"])([\s\S]*)\1$/);if(r){let l=r[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return oe(this.pyEval(d.trim(),n))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,f,p,h]=u,m=He(this.pyEval(p.trim(),n)),g=[];for(let y of m){let v=new Map(n);v.set(f,y),!(h&&!mt(this.pyEval(h,v)))&&g.push(this.pyEval(d.trim(),v))}return g}return t._splitArgs(l).map(d=>this.pyEval(d,n))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=t._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],n):u.map(d=>this.pyEval(d,n))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return De();let u=De();for(let d of t._splitArgs(l)){let f=d.indexOf(":");if(f===-1)continue;let p=oe(this.pyEval(d.slice(0,f).trim(),n)),h=this.pyEval(d.slice(f+1).trim(),n);u.data.set(p,h)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!mt(this.pyEval(i[1],n));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,n);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),n);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=t._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),n),d=e.slice(l+1,-1);return this._subscript(u,d,n)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?t._splitArgs(u):[]).map(f=>this.pyEval(f,n));return this._callBuiltin(l,d,n)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,f=this.pyEval(l,n);if(d!==void 0){let p=d.slice(1,-1),h=p.trim()?t._splitArgs(p).map(m=>this.pyEval(m,n)):[];return this._callMethod(f,u,h)}return t._getAttr(f,u,n)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(n.has(e))return n.get(e);throw new Re("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=n.get(l[0])??(()=>{throw new Re("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=t._getAttr(u,d,n);return u}return V}static _findMatchingBracket(e,n){let r=n==="["?"]":n==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===r&&s++,e[i]===n&&(s--,s===0))return i;return-1}_findDotAccess(e){let n=0,r=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(r){o===s&&e[i-1]!=="\\"&&(r=!1);continue}if(o==='"'||o==="'"){r=!0,s=o;continue}if(")]}".includes(o)){n++;continue}if("([{".includes(o)){n--;continue}if(n!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,n,r){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of n)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let p=e.slice(0,a).trim(),h=e.slice(a+l.length).trim();if(!(p&&h))continue;return this._applyBinaryOp(l,p,h,r)}}}}_applyBinaryOp(e,n,r,s){if(e==="and"){let a=this.pyEval(n,s);return mt(a)?this.pyEval(r,s):a}if(e==="or"){let a=this.pyEval(n,s);return mt(a)?a:this.pyEval(r,s)}let i=this.pyEval(n,s),o=this.pyEval(r,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new Re("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new Re("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return t._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new Re("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return qe(i)===qe(o)||i===o;case"!=":return qe(i)!==qe(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return t._pyIn(o,i);case"not in":return!t._pyIn(o,i);case"is":return i===o||sn(i)&&sn(o);case"is not":return!(i===o||sn(i)&&sn(o));default:return V}}static _pyIn(e,n){return typeof e=="string"?typeof n=="string"&&e.includes(n):Array.isArray(e)?e.some(r=>qe(r)===qe(n)):Te(e)?e.data.has(oe(n)):!1}_subscript(e,n,r){if(n.includes(":")){let i=n.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],r):void 0,a=i[1]?this.pyEval(i[1],r):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):V}let s=this.pyEval(n,r);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??V}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??V}if(Te(e))return e.data.get(oe(s))??V;throw new Re("TypeError",`'${Wn(e)}' is not subscriptable`)}static _getAttr(e,n,r){return Te(e)?e.data.has(n)?e.data.get(n):n==="path"&&e.path?e.path:V:fs(e)?e.attrs.get(n)??V:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[n]??V:V}_callMethod(e,n,r){if(typeof e=="string")switch(n){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(r[0]?e.replace(new RegExp(`[${r[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof r[0]=="string"?r[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return He(r[0]??[]).map(oe).join(e);case"replace":return e.replaceAll(oe(r[0]??""),oe(r[1]??""));case"startswith":return e.startsWith(oe(r[0]??""));case"endswith":return e.endsWith(oe(r[0]??""));case"find":return e.indexOf(oe(r[0]??""));case"index":{let s=e.indexOf(oe(r[0]??""));if(s===-1)throw new Re("ValueError","substring not found");return s}case"count":return e.split(oe(r[0]??"")).length-1;case"format":return t._pyStringFormat(e,r);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=r[0]??0,i=oe(r[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(r[0]??0,oe(r[1]??" "));case"rjust":return e.padStart(r[0]??0,oe(r[1]??" "));case"zfill":return e.padStart(r[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("");default:break}if(Array.isArray(e))switch(n){case"append":return e.push(r[0]??V),V;case"extend":for(let s of He(r[0]??[]))e.push(s);return V;case"insert":return e.splice(r[0]??0,0,r[1]??V),V;case"pop":{let s=r[0]===void 0?-1:r[0],i=s<0?e.length+s:s;return e.splice(i,1)[0]??V}case"remove":{let s=e.findIndex(i=>qe(i)===qe(r[0]??V));return s!==-1&&e.splice(s,1),V}case"index":{let s=e.findIndex(i=>qe(i)===qe(r[0]??V));if(s===-1)throw new Re("ValueError","is not in list");return s}case"count":return e.filter(s=>qe(s)===qe(r[0]??V)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:oe(s).localeCompare(oe(i))),V;case"reverse":return e.reverse(),V;case"copy":return[...e];case"clear":return e.splice(0),V;default:break}if(Te(e))switch(n){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(oe(r[0]??""))??r[1]??V;case"update":{if(Te(r[0]??V))for(let[s,i]of r[0].data)e.data.set(s,i);return V}case"pop":{let s=oe(r[0]??""),i=e.data.get(s)??r[1]??V;return e.data.delete(s),i}case"clear":return e.data.clear(),V;case"copy":return De([...e.data.entries()]);case"setdefault":{let s=oe(r[0]??"");return e.data.has(s)||e.data.set(s,r[1]??V),e.data.get(s)??V}default:break}if(Te(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(n){case"getcwd":return this.cwd;case"getenv":return typeof r[0]=="string"?process.env[r[0]]??r[1]??V:V;case"listdir":return[];case"path":return e;default:break}if(Te(e))switch(n){case"join":return r.map(oe).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return oe(r[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return oe(r[0]??"").split("/").pop()??"";case"abspath":return oe(r[0]??"");case"splitext":{let s=oe(r[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1;default:break}if(Te(e)&&e.data.has("version")&&e.data.get("version")===bi&&n==="exit")throw new hs(r[0]??0);if(Te(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(n in s){let i=s[n];return i(...r.map(o=>o))}if(n==="factorial"){let i=r[0]??0,o=1;for(;i>1;)o*=i--;return o}if(n==="gcd"){let i=Math.abs(r[0]??0),o=Math.abs(r[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(Te(e)){if(n==="dumps"){let s=Te(r[1]??V)?r[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(r[0]??V),null,i)}if(n==="loads")return this._jsToPy(JSON.parse(oe(r[0]??"")))}if(fs(e)){let s=e.attrs.get(n)??e.cls.methods.get(n)??V;if(zt(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,r[a]??V)),this._execBlock(s.body,i)}}throw new Re("AttributeError",`'${Wn(e)}' object has no attribute '${n}'`)}static _pyStringFormat(e,n){let r=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=n[r++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return oe(o??V);case"r":return qe(o??V);default:return String(o)}})}_pyToJs(e){return sn(e)?null:Te(e)?Object.fromEntries([...e.data.entries()].map(([n,r])=>[n,this._pyToJs(r)])):Array.isArray(e)?e.map(n=>this._pyToJs(n)):e}_jsToPy(e){return e==null?V:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(n=>this._jsToPy(n)):typeof e=="object"?De(Object.entries(e).map(([n,r])=>[n,this._jsToPy(r)])):V}_callBuiltin(e,n,r){if(r.has(e)){let s=r.get(e)??V;return zt(s)?this._callFunc(s,n,r):Pa(s)?this._instantiate(s,n):s}switch(e){case"print":return this._output.push(n.map(oe).join(" ")+`
`.replace(/\\n/g,"")),V;case"input":return this._output.push(oe(n[0]??"")),"";case"int":{if(n.length===0)return 0;let s=n[1]??10,i=Number.parseInt(oe(n[0]??0),s);return Number.isNaN(i)?(()=>{throw new Re("ValueError","invalid literal for int()")})():i}case"float":{if(n.length===0)return 0;let s=Number.parseFloat(oe(n[0]??0));return Number.isNaN(s)?(()=>{throw new Re("ValueError","could not convert to float")})():s}case"str":return n.length===0?"":oe(n[0]??V);case"bool":return n.length===0?!1:mt(n[0]??V);case"list":return n.length===0?[]:He(n[0]??[]);case"tuple":return n.length===0?[]:He(n[0]??[]);case"set":return n.length===0?[]:[...new Set(He(n[0]??[]).map(qe))].map(s=>He(n[0]??[]).find(o=>qe(o)===s)??V);case"dict":return n.length===0?De():Te(n[0]??V)?n[0]:De();case"bytes":return typeof n[0]=="string"?n[0]:oe(n[0]??"");case"bytearray":return n.length===0?"":oe(n[0]??"");case"type":return n.length===1?`<class '${Wn(n[0]??V)}'>`:V;case"isinstance":return Wn(n[0]??V)===oe(n[1]??"");case"issubclass":return!1;case"callable":return zt(n[0]??V);case"hasattr":return Te(n[0]??V)?n[0].data.has(oe(n[1]??"")):!1;case"getattr":return Te(n[0]??V)?n[0].data.get(oe(n[1]??""))??n[2]??V:n[2]??V;case"setattr":return Te(n[0]??V)&&n[0].data.set(oe(n[1]??""),n[2]??V),V;case"len":{let s=n[0]??V;if(typeof s=="string"||Array.isArray(s))return s.length;if(Te(s))return s.data.size;if(Cr(s))return Vm(s);throw new Re("TypeError",`object of type '${Wn(s)}' has no len()`)}case"range":return n.length===1?$a(0,n[0]):n.length===2?$a(n[0],n[1]):$a(n[0],n[1],n[2]);case"enumerate":{let s=n[1]??0;return He(n[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=n.map(He),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??V))}case"map":{let s=n[0]??V;return He(n[1]??[]).map(i=>zt(s)?this._callFunc(s,[i],r):V)}case"filter":{let s=n[0]??V;return He(n[1]??[]).filter(i=>zt(s)?mt(this._callFunc(s,[i],r)):mt(i))}case"reduce":{let s=n[0]??V,i=He(n[1]??[]);if(i.length===0)return n[2]??V;let o=n[2]===void 0?i[0]:n[2];for(let a of n[2]===void 0?i.slice(1):i)o=zt(s)?this._callFunc(s,[o,a],r):V;return o}case"sorted":{let s=[...He(n[0]??[])],i=n[1]??V,o=Te(i)?i.data.get("key")??V:i;return s.sort((a,c)=>{let l=zt(o)?this._callFunc(o,[a],r):a,u=zt(o)?this._callFunc(o,[c],r):c;return typeof l=="number"&&typeof u=="number"?l-u:oe(l).localeCompare(oe(u))}),s}case"reversed":return[...He(n[0]??[])].reverse();case"any":return He(n[0]??[]).some(mt);case"all":return He(n[0]??[]).every(mt);case"sum":return He(n[0]??[]).reduce((s,i)=>s+i,n[1]??0);case"max":return(n.length===1?He(n[0]??[]):n).reduce((i,o)=>i>=o?i:o);case"min":return(n.length===1?He(n[0]??[]):n).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(n[0]??0);case"round":return n[1]===void 0?Math.round(n[0]??0):Number.parseFloat(n[0].toFixed(n[1]));case"divmod":{let s=n[0],i=n[1];return[Math.floor(s/i),s%i]}case"pow":return n[0]**n[1];case"hex":return`0x${n[0].toString(16)}`;case"oct":return`0o${n[0].toString(8)}`;case"bin":return`0b${n[0].toString(2)}`;case"ord":return oe(n[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(n[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof n[0]=="number"?n[0]:oe(n[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new Re("PermissionError","open() not available in virtual runtime");case"repr":return qe(n[0]??V);case"iter":return n[0]??V;case"next":return Array.isArray(n[0])&&n[0].length>0?n[0].shift():n[1]??(()=>{throw new Re("StopIteration","")})();case"vars":return De([...r.entries()].map(([s,i])=>[s,i]));case"globals":return De([...r.entries()].map(([s,i])=>[s,i]));case"locals":return De([...r.entries()].map(([s,i])=>[s,i]));case"dir":{if(n.length===0)return[...r.keys()];let s=n[0]??V;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Te(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new Re(e,oe(n[0]??""));case"exec":return this.execScript(oe(n[0]??""),r),V;case"eval":return this.pyEval(oe(n[0]??""),r);default:throw new Re("NameError",`name '${e}' is not defined`)}}_callFunc(e,n,r){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),n.slice(o));return}s.set(i,n[o]??V)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof xr)return i.value;throw i}}_instantiate(e,n){let r={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(r,"__init__",n),r}execScript(e,n){let r=e.split(`
`);this._execLines(r,0,n)}_execLines(e,n,r){let s=n;for(;s<e.length;){let i=e[s];if(i===void 0||!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,r)}return s}_execBlock(e,n){try{this._execLines(e,0,n)}catch(r){if(r instanceof xr)return r.value;throw r}return V}static _getIndent(e){let n=0;for(let r of e)if(r===" ")n++;else if(r==="	")n+=4;else break;return n}_collectBlock(e,n,r){let s=[];for(let i=n;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(t._getIndent(o)<=r)break;s.push(o.slice(r+4))}return s}_execStatement(e,n,r){let s=e[n];if(s===void 0)return n+1;let i=s.trim(),o=t._getIndent(s);if(i==="pass")return n+1;if(i==="break")throw new ps;if(i==="continue")throw new ms;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new xr(a[1]?this.pyEval(a[1],r):V);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let w=this.pyEval(c[1],r);throw new Re(typeof w=="string"?w:Wn(w),oe(w))}throw new Re("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!mt(this.pyEval(l[1],r)))throw new Re("AssertionError",l[2]?oe(this.pyEval(l[2],r)):"");return n+1}let u=i.match(/^del\s+(.+)$/);if(u)return r.delete(u[1].trim()),n+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,w,S]=d,C=jm[w];if(C){let $=C(this.cwd);this._modules.set(w,$),r.set(S??w,$)}return n+1}let f=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(f){let[,w,S]=f,C=jm[w];if(C){let $=C(this.cwd);if(S?.trim()==="*")for(let[N,R]of $.data)r.set(N,R);else for(let N of S.split(",").map(R=>R.trim()))r.set(N,$.data.get(N)??V)}return n+1}let p=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(p){let[,w,S]=p,C=S.split(",").map(R=>R.trim()).filter(Boolean),$=this._collectBlock(e,n+1,o),N={__pytype__:"func",name:w,params:C,body:$,closure:new Map(r)};return r.set(w,N),n+1+$.length}let h=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(h){let[,w,S]=h,C=S?S.split(",").map(W=>W.trim()):[],$=this._collectBlock(e,n+1,o),N={__pytype__:"class",name:w,methods:new Map,bases:C},R=0;for(;R<$.length;){let Y=$[R].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(Y){let[,Q,E]=Y,A=E.split(",").map(D=>D.trim()).filter(Boolean),I=this._collectBlock($,R+1,0);N.methods.set(Q,{__pytype__:"func",name:Q,params:A,body:I,closure:new Map(r)}),R+=1+I.length}else R++}return r.set(w,N),n+1+$.length}if(i.startsWith("if ")&&i.endsWith(":")){let w=i.slice(3,-1).trim(),S=this._collectBlock(e,n+1,o);if(mt(this.pyEval(w,r))){this._execBlock(S,new Map(r).also?.(N=>{for(let[R,W]of r)N.set(R,W)})??r),this._runBlockInScope(S,r);let $=n+1+S.length;for(;$<e.length;){let N=e[$].trim();if(t._getIndent(e[$])<o||!(N.startsWith("elif")||N.startsWith("else")))break;let R=this._collectBlock(e,$+1,o);$+=1+R.length}return $}let C=n+1+S.length;for(;C<e.length;){let $=e[C],N=$.trim();if(t._getIndent($)!==o)break;let R=N.match(/^elif\s+(.+):$/);if(R){let W=this._collectBlock(e,C+1,o);if(mt(this.pyEval(R[1],r))){for(this._runBlockInScope(W,r),C+=1+W.length;C<e.length;){let Y=e[C].trim();if(t._getIndent(e[C])!==o||!(Y.startsWith("elif")||Y.startsWith("else")))break;let Q=this._collectBlock(e,C+1,o);C+=1+Q.length}return C}C+=1+W.length;continue}if(N==="else:"){let W=this._collectBlock(e,C+1,o);return this._runBlockInScope(W,r),C+1+W.length}break}return C}let m=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(m){let[,w,S]=m,C=He(this.pyEval(S.trim(),r)),$=this._collectBlock(e,n+1,o),N=[],R=n+1+$.length;R<e.length&&e[R]?.trim()==="else:"&&(N=this._collectBlock(e,R+1,o),R+=1+N.length);let W=!1;for(let Y of C){if(w.includes(",")){let Q=w.split(",").map(A=>A.trim()),E=Array.isArray(Y)?Y:[Y];Q.forEach((A,I)=>r.set(A,E[I]??V))}else r.set(w.trim(),Y);try{this._runBlockInScope($,r)}catch(Q){if(Q instanceof ps){W=!0;break}if(Q instanceof ms)continue;throw Q}}return!W&&N.length&&this._runBlockInScope(N,r),R}let g=i.match(/^while\s+(.+?)\s*:$/);if(g){let w=g[1],S=this._collectBlock(e,n+1,o),C=0;for(;mt(this.pyEval(w,r))&&C++<1e5;)try{this._runBlockInScope(S,r)}catch($){if($ instanceof ps)break;if($ instanceof ms)continue;throw $}return n+1+S.length}if(i==="try:"){let w=this._collectBlock(e,n+1,o),S=n+1+w.length,C=[],$=[],N=[];for(;S<e.length;){let R=e[S],W=R.trim();if(t._getIndent(R)!==o)break;if(W.startsWith("except")){let Y=W.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),Q=Y?.[1]??null,E=Y?.[2],A=this._collectBlock(e,S+1,o);C.push({exc:Q,body:A}),E&&r.set(E,""),S+=1+A.length}else if(W==="else:")N=this._collectBlock(e,S+1,o),S+=1+N.length;else if(W==="finally:")$=this._collectBlock(e,S+1,o),S+=1+$.length;else break}try{this._runBlockInScope(w,r),N.length&&this._runBlockInScope(N,r)}catch(R){if(R instanceof Re){let W=!1;for(let Y of C)if(Y.exc===null||Y.exc===R.type||Y.exc==="Exception"){this._runBlockInScope(Y.body,r),W=!0;break}if(!W)throw R}else throw R}finally{$.length&&this._runBlockInScope($,r)}return S}let y=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(y){let w=this._collectBlock(e,n+1,o);return r.set(y[2],V),this._runBlockInScope(w,r),n+1+w.length}let v=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(v){let[,w,S,C]=v,$=r.get(w)??0,N=this.pyEval(C,r),R;switch(S){case"+=":R=typeof $=="string"?$+oe(N):$+N;break;case"-=":R=$-N;break;case"*=":R=$*N;break;case"/=":R=$/N;break;case"//=":R=Math.floor($/N);break;case"%=":R=$%N;break;case"**=":R=$**N;break;default:R=N}return r.set(w,R),n+1}let x=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(x){let[,w,S,C]=x,$=r.get(w)??V,N=this.pyEval(C,r)??V,R=this.pyEval(S,r)??V;return Array.isArray($)?$[R]=N:Te($)&&$.data.set(oe(R),N),n+1}let b=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(b){let w=b[1].lastIndexOf(".");if(w!==-1){let S=b[1].slice(0,w),C=b[1].slice(w+1),$=this.pyEval(b[2],r),N=this.pyEval(S,r);return Te(N)?N.data.set(C,$):fs(N)&&N.attrs.set(C,$),n+1}}let P=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(P){let w=this.pyEval(P[3],r),S=i.split("=")[0].split(",").map($=>$.trim()),C=He(w);return S.forEach(($,N)=>r.set($,C[N]??V)),n+1}let _=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(_){let[,w,S]=_;return r.set(w,this.pyEval(S,r)),n+1}try{this.pyEval(i,r)}catch(w){if(w instanceof Re||w instanceof hs)throw w}return n+1}_runBlockInScope(e,n){this._execLines(e,0,n)}run(e){let n=Nx(this.cwd);try{this.execScript(e,n)}catch(r){return r instanceof hs?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:r.code}:r instanceof Re?(this._stderr.push(r.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):r instanceof xr?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${r}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Gm={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:n})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(M(t,["--version","-V"]))return{stdout:`${kx}
`,exitCode:0};if(M(t,["--version-full"]))return{stdout:`${bi}
`,exitCode:0};let r=t.indexOf("-c");if(r!==-1){let i=t[r+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new vi(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=B(n,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new vi(n),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${bi}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});function Fx(t,e){return t.includes(e)}function ka(t,e){let n=t.indexOf(e);if(n!==-1&&n+1<t.length)return t[n+1]}var qm,Ym=k(()=>{"use strict";qm={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-rs] [-d delim] [-n nchars] [-p prompt] [-t timeout] [-a array] <var...>"],run:({args:t,stdin:e,env:n})=>{let r=t.filter((u,d)=>u!=="-r"&&u!=="-s"&&u!=="-d"&&u!=="-n"&&u!=="-p"&&u!=="-t"&&u!=="-a"&&t[d-1]!=="-p"&&t[d-1]!=="-d"&&t[d-1]!=="-n"&&t[d-1]!=="-t"),s=e??"",i=ka(t,"-d")??`
`,o=ka(t,"-n"),a=o?Number.parseInt(o,10):void 0,c=ka(t,"-a"),l;if(a!==void 0&&!Number.isNaN(a))l=s.slice(0,a);else if(i===`
`)l=s.split(`
`)[0]??"";else{let u=s.indexOf(i);l=u===-1?s:s.slice(0,u)}if(Fx(t,"-r")||(l=l.replace(/\\(?:\r?\n|.)/g,u=>u[1]===`
`||u[1]==="\r"?"":u[1])),!n)return{exitCode:0};if(c){let u=l.split(/\s+/).filter(Boolean);n.vars[`${c}[0]`]=u.join(" ");for(let d=1;d<u.length;d++)n.vars[`${c}[${d}]`]=u[d];return n.vars[`#${c}[@]`]=String(u.length),{exitCode:0}}if(r.length===0)n.vars.REPLY=l;else if(r.length===1)n.vars[r[0]]=l;else{let u=l.split(/\s+/);for(let d=0;d<r.length;d++)n.vars[r[d]]=d<r.length-1?u[d]??"":u.slice(d).join(" ")}return{exitCode:0}}}});function Lx(t){let e=t[Km];if(!e)return new Set;try{return new Set(JSON.parse(e))}catch{return new Set}}function Ux(t,e){t[Km]=JSON.stringify([...e])}var Km,Xm,Zm=k(()=>{"use strict";Km="__readonly";Xm={name:"readonly",description:"Mark shell variables as readonly",category:"shell",params:["[-p] [NAME[=VALUE] ...]"],run:({args:t,env:e})=>{let n=Lx(e.vars);if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([s])=>s&&!s.startsWith("__")&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(s)&&n.has(s)).map(([s,i])=>`readonly ${s}="${i}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t)if(r!=="-p")if(r.includes("=")){let s=r.indexOf("="),i=r.slice(0,s),o=r.slice(s+1);e.vars[i]=o,n.add(i)}else n.add(r);return Ux(e.vars,n),{exitCode:0}}}});import*as eh from"node:path";var Jm,Qm,th,nh=k(()=>{"use strict";ee();ae();Jm=["-r","-R","-rf","-fr","-rF","-Fr"],Qm=["-f","-rf","-fr","-rF","-Fr","--force"],th={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f|-I] <path>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=M(r,Jm),a=M(r,Qm),c=M(r,["-I"]),l=[...Jm,...Qm,"--force","-I"],u=[];for(let m=0;;m+=1){let g=hn(r,m,{flags:l});if(!g)break;u.push(g)}if(u.length===0)return{stderr:"rm: missing operand",exitCode:1};let d=u.map(m=>B(n,m));for(let m of d)Qe(e.vfs,e.users,t,eh.posix.dirname(m),2);for(let m of d)if(!e.vfs.exists(m)){if(a)continue;return{stderr:`rm: cannot remove '${m}': No such file or directory`,exitCode:1}}let f=m=>{for(let g of d)m.vfs.exists(g)&&m.vfs.remove(g,{recursive:o},s,i);return{exitCode:0}};if(a||c&&!(u.length>3||o))return f(e);let p=u.length===1?`'${u[0]}'`:`${u.length} items`,h=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:h,mode:"confirm",onPassword:(m,g)=>{let y=m.trim().toLowerCase();return y!=="y"&&y!=="yes"?Promise.resolve({result:{stdout:`rm: cancelled
`,exitCode:1}}):Promise.resolve({result:f(g)})}},exitCode:0}}}});var rh,sh=k(()=>{"use strict";ee();ae();rh={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=M(n,["-i"]),a=M(n,["-n"]),c=[],l,u=0;for(;u<n.length;){let S=n[u];S==="-e"||S==="--expression"?(u++,n[u]&&c.push(n[u]),u++):S==="-n"||S==="-i"?u++:S.startsWith("-e")?(c.push(S.slice(2)),u++):(S.startsWith("-")||(c.length===0?c.push(S):l=S),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let S=!1,C=0;for(;C<n.length;){let $=n[C];$==="-e"||$==="--expression"?(S=!0,C+=2):($.startsWith("-e")&&(S=!0),C++)}S||(l=n.filter($=>!$.startsWith("-")).slice(1)[0])}let d=r??"";if(l){let S=B(e,l);try{d=t.vfs.readFile(S)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function f(S){if(!S)return[void 0,S];if(S[0]==="$")return[{type:"last"},S.slice(1)];if(/^\d/.test(S)){let C=S.match(/^(\d+)(.*)/s);if(C)return[{type:"line",n:Number.parseInt(C[1],10)},C[2]]}if(S[0]==="/"){let C=S.indexOf("/",1);if(C!==-1)try{return[{type:"regex",re:new RegExp(S.slice(1,C))},S.slice(C+1)]}catch{}}return[void 0,S]}function p(S){let C=[],$=S.split(/\n|(?<=^|[^\\]);/);for(let N of $){let R=N.trim();if(!R||R.startsWith("#"))continue;let W=R,[Y,Q]=f(W);W=Q.trim();let E;if(W[0]===","){W=W.slice(1).trim();let[I,D]=f(W);E=I,W=D.trim()}let A=W[0];if(A)if(A==="s"){let I=W[1]??"/",D=new RegExp(`^s${h(I)}((?:[^${h(I)}\\\\]|\\\\.)*)${h(I)}((?:[^${h(I)}\\\\]|\\\\.)*)${h(I)}([gGiIp]*)$`),z=W.match(D);if(!z){C.push({op:"d",addr1:Y,addr2:E});continue}let Z=z[3]??"",J;try{J=new RegExp(z[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}C.push({op:"s",addr1:Y,addr2:E,from:J,to:z[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else A==="d"?C.push({op:"d",addr1:Y,addr2:E}):A==="p"?C.push({op:"p",addr1:Y,addr2:E}):A==="q"?C.push({op:"q",addr1:Y}):A==="="&&C.push({op:"=",addr1:Y,addr2:E})}return C}function h(S){return S.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let m=c.flatMap(p),g=d.split(`
`);g[g.length-1]===""&&g.pop();let y=g.length;function v(S,C,$){return S?S.type==="line"?C===S.n:S.type==="last"?C===y:S.re.test($):!0}function x(S,C,$,N){let{addr1:R,addr2:W}=S;if(!R)return!0;if(!W)return v(R,C,$);let Y=N.get(S)??!1;return!Y&&v(R,C,$)&&(Y=!0,N.set(S,!0)),Y&&v(W,C,$)?(N.set(S,!1),!0):!!Y}let b=[],P=new Map,_=!1;for(let S=0;S<g.length&&!_;S++){let C=g[S],$=S+1,N=!1;for(let R of m)if(x(R,$,C,P)){if(R.op==="d"){N=!0;break}if(R.op==="p"&&b.push(C),R.op==="="&&b.push(String($)),R.op==="q"&&(_=!0),R.op==="s"){let W=R.global?C.replace(new RegExp(R.from.source,R.from.flags.includes("i")?"gi":"g"),R.to):C.replace(R.from,R.to);W!==C&&(C=W,R.print&&a&&b.push(C))}}N||a||b.push(C)}let w=b.join(`
`)+(b.length>0?`
`:"");if(o&&l){let S=B(e,l);return t.vfs.writeFile(S,w,{},s,i),{exitCode:0}}return{stdout:w,exitCode:0}}}});var ih,oh=k(()=>{"use strict";ih={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),n=(()=>{let d=t.indexOf("-s");return d===-1?`
`:t[d+1]??`
`})(),r=(()=>{let d=t.indexOf("-f");return d===-1?null:t[d+1]??"%g"})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let f;if(r?f=r.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):f=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let p=String(Math.trunc(a)).length;f=f.padStart(p,"0")}c.push(f)}return{stdout:`${c.join(n)}
`,exitCode:0}}}});function Ma(t,e,n){let r=Bx[t];r&&(e?n[r]="1":delete n[r])}var Bx,ah,ch,lh=k(()=>{"use strict";Bx={e:"__errexit",u:"__nounset",C:"__noclobber",x:"__xtrace"},ah={errexit:"e",nounset:"u",noclobber:"C",xtrace:"x",pipefail:"__pipefail"};ch={name:"set",description:"Display or set shell variables",category:"shell",params:["[+-abCefhkmnuvx] [+-o option] [-- args]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([i])=>!i.startsWith("__")).map(([i,o])=>`${i}=${o}`).join(`
`),exitCode:0};let n=!1,r=[];for(let s=0;s<t.length;s++){let i=t[s];if(n){r.push(i);continue}if(i==="--"){n=!0;continue}if(i==="-o"&&s+1<t.length){let a=t[s+1],c=ah[a];c&&(c.startsWith("__")?e.vars[c]="1":Ma(c,!0,e.vars)),s++;continue}if(i==="+o"&&s+1<t.length){let a=t[s+1],c=ah[a];c&&(c.startsWith("__")?delete e.vars[c]:Ma(c,!1,e.vars)),s++;continue}let o=i.match(/^([+-])([a-zA-Z]+)$/);if(o){let a=o[1]==="-";for(let c of o[2])Ma(c,a,e.vars);continue}if(i.includes("=")){let a=i.indexOf("=");e.vars[i.slice(0,a)]=i.slice(a+1);continue}r.push(i)}if(r.length>0)for(let s=0;s<r.length;s++)e.vars[String(s+1)]=r[s];return{exitCode:0}}}});function Ci(t,e,n,r){return Gs(t,e,n,s=>xe(s,r.authUser,r.hostname,r.mode,r.cwd,r.shell,void 0,r.env).then(i=>i.stdout??""))}function Wt(t){let e=[],n=0;for(;n<t.length;){let r=t[n].trim();if(!r||r.startsWith("#")){n++;continue}let s=r.match(zx),i=s??(r.match(Wx)||r.match(jx));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),n++;continue}for(n++;n<t.length&&t[n]?.trim()!=="}"&&n<t.length+1;){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),n++}n++,e.push({type:"func",name:a,body:c});continue}let o=r.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),n++;continue}if(r.startsWith("if ")||r==="if"){let a=r.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",f="";for(n++;n<t.length&&t[n]?.trim()!=="fi";){let p=t[n].trim();p.startsWith("elif ")?(d="elif",f=p.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:f,body:[]})):p==="else"?d="else":p!=="then"&&(d==="then"?c.push(p):d==="elif"&&l.length>0?l[l.length-1]?.body.push(p):u.push(p)),n++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(r.startsWith("for ")){let a=r.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("while ")){let a=r.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"while",cond:a,body:c})}else if(r.startsWith("until ")){let a=r.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="done";){let l=t[n].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),n++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(r)){let a=r.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:r})}else if(r.startsWith("case ")&&r.endsWith(" in")||r.match(/^case\s+.+\s+in$/)){let a=r.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(n++;n<t.length&&t[n]?.trim()!=="esac";){let l=t[n].trim();if(!l||l==="esac"){n++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),f=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&f.push(u[2].trim()),n++;n<t.length;){let p=t[n].trim();if(p===";;"||p==="esac")break;p&&f.push(p),n++}t[n]?.trim()===";;"&&n++,c.push({pattern:d,body:f})}else n++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:r});n++}return e}async function xi(t,e){let n=await Ci(t,e.env.vars,e.env.lastExitCode,e),r=n.match(/^\[?\s*(.+?)\s*\]?$/);if(r){let i=r[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=B(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,f=Number(l),p=Number(d);if(u==="-eq")return f===p;if(u==="-ne")return f!==p;if(u==="-lt")return f<p;if(u==="-le")return f<=p;if(u==="-gt")return f>p;if(u==="-ge")return f>=p}}return((await xe(n,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function jt(t,e){let n={exitCode:0},r="",s="";for(let o of t)if(o.type==="cmd"){let a=await Ci(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(f=>c.test(f))){for(let f of l){let[,p,h]=f.match(c)??[];p!==void 0&&h!==void 0&&(e.env.vars[p]=h)}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",f=e.env.vars[`__func_${d}`];if(f){let p=a.trim().split(/\s+/).slice(1);p.forEach((g,y)=>{e.env.vars[String(y+1)]=g}),e.env.vars[0]=d;let h=f.split(`
`),m=await jt(Wt(h),e);id(e.env.vars);for(let g=1;g<=p.length;g++)delete e.env.vars[String(g)];return m}return xe(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(r+=`${u.stdout}
`),u.stderr)return{...await u,stdout:r.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...await u,stdout:r.trim()};n=u}else if(o.type==="if"){let a=!1;if(await xi(o.cond,e)){let c=await jt(Wt(o.then_),e);c.stdout&&(r+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await xi(c.cond,e)){let l=await jt(Wt(c.body),e);l.stdout&&(r+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await jt(Wt(o.else_),e);c.stdout&&(r+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=Number.parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=Number.parseInt(e.env.vars[l[1]]??"0",10),d=Number.parseInt(l[3],10),f={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(f[l[2]]??u)}else{let u=Kr(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await Ci(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(Vs);for(let l of c){e.env.vars[o.var]=l;let u=await jt(Wt(o.body),e);if(u.stdout&&(r+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await xi(o.cond,e);){let c=await jt(Wt(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await xi(o.cond,e);){let c=await jt(Wt(o.body),e);if(c.stdout&&(r+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await Ci(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await jt(Wt(c.body),e);d.stdout&&(r+=`${d.stdout}
`);break}}let i=r.trim()||n.stdout;if(s){let o=(n.stderr?`${n.stderr}
`:"")+s.trim();return{...n,stdout:i,stderr:o||n.stderr}}return{...n,stdout:i}}function uh(t){let e=[],n="",r=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(s||i)s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);else{if(c==="'"){s=!0,n+=c,o++;continue}if(c==='"'){i=!0,n+=c,o++;continue}if(c==="{"){r++,n+=c,o++;continue}if(c==="}"){if(r--,n+=c,o++,r===0){let l=n.trim();for(l&&e.push(l),n="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(r===0&&(c===";"||c===`
`)){let l=n.trim();l&&!l.startsWith("#")&&e.push(l),n="",o++;continue}}n+=c,o++}let a=n.trim();return a&&!a.startsWith("#")&&e.push(a),e}var Na,zx,Wx,jx,dh,fh=k(()=>{"use strict";Xr();ee();ae();ma();tt();fa();Na="[^\\s(){}]+",zx=new RegExp(`^(?:function\\s+)?(${Na})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Wx=new RegExp(`^(?:function\\s+)?(${Na})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),jx=new RegExp(`^function\\s+(${Na})\\s*\\{?\\s*$`);dh={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:t=>{let{args:e,shell:n,cwd:r}=t;if(M(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=ai(i),a=uh(o),c=Wt(a);return jt(c,t)}let s=e[0];if(s){let i=B(r,s);if(!n.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=n.vfs.readFile(i),a=ai(o),c=uh(a),l=Wt(c);return jt(l,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var ph,mh,hh,gh=k(()=>{"use strict";ph={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let n=Number.parseInt(t[0]??"1",10)||1,r=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=r.slice(n).join("\0");let s=r.slice(n);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},mh={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.includes("-p")||t.length===0){let s=[];for(let[i,o]of Object.entries(e.vars))if(i.startsWith("__trap_")&&o){let a=i.slice(7);s.push(`trap -- '${o}' ${a}`)}return{stdout:s.length>0?`${s.join(`
`)}
`:"",exitCode:0}}if(t[0]==="-"){let s=t.slice(1);for(let i of s)delete e.vars[`__trap_${i.toUpperCase()}`];return{exitCode:0}}let n=t[0]??"",r=t.slice(1);if(r.length===0){let s=[];for(let i of r){let o=e.vars[`__trap_${i.toUpperCase()}`];o&&s.push(`trap -- '${o}' ${i}`)}return s.length>0?{stdout:`${s.join(`
`)}
`,exitCode:0}:{exitCode:0}}for(let s of r)e.vars[`__trap_${s.toUpperCase()}`]=n;return{exitCode:0}}},hh={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let n=Number.parseInt(t[0]??"0",10);return e&&(e.lastExitCode=n),{exitCode:n}}}});var yh,Sh=k(()=>{"use strict";yh={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=Number.parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(n=>setTimeout(n,e*1e3)),{exitCode:0})}}});var bh,vh=k(()=>{"use strict";ee();ae();bh={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=M(r,["-r"]),o=M(r,["-n"]),a=M(r,["-u"]),c=r.filter(h=>!h.startsWith("-")),d=[...(c.length>0?c.map(h=>{try{return be(t,B(n,h),"sort"),e.vfs.readFile(B(n,h))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((h,m)=>o?Number(h)-Number(m):h.localeCompare(m)),f=i?d.reverse():d;return{stdout:(a?[...new Set(f)]:f).join(`
`),exitCode:0}}}});var xh,Ch=k(()=>{"use strict";ae();tt();xh={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:n,cwd:r,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=B(r,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let f=await xe(d,e,n,"shell",r,s,void 0,i);if(l=f.exitCode??0,f.closeSession||f.switchUser)return f}return{exitCode:l}}}});function Vx(t,e){let n=t==="ed25519"?"ssh-ed25519":t==="ecdsa"?"ecdsa-sha2-nistp256":"ssh-rsa",r=Buffer.from(Array.from({length:100},()=>Math.floor(Math.random()*256))).toString("base64"),s=`${n} ${r} ${e}`;return{privateKey:`${["-----BEGIN OPENSSH PRIVATE KEY-----","b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABFwAAAAdzc2gtcn","NhAAAAAwEAAQAAAQEA6NF1x1kXUq3q/MQw3q6J0i0mO6kK4K4mZ3vhXy3nVwL0z8P9","VxRZ2gW0w==","-----END OPENSSH PRIVATE KEY-----"].join(`
`)}
`,publicKey:s}}function Gx(t,e){if(!t.exists(e))return{stderr:`${e}: No such file`,exitCode:1};let n=`${e}.pub`;return t.exists(n)?{stdout:`${t.readFile(n)}
`,exitCode:0}:{stderr:`${n} not found`,exitCode:1}}function Hx(t){let e=Buffer.from(t),n=0;for(let r=0;r<e.length;r++)n=(n<<5)-n+e[r]|0;return Buffer.from(String(Math.abs(n))).toString("base64").slice(0,16).replace(/=+$/,"")}var wh,_h=k(()=>{"use strict";ee();wh={name:"ssh-keygen",description:"Generate SSH key pairs",category:"system",params:["[options]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: ssh-keygen [options]","  -t rsa|ed25519|ecdsa    Key type (default: rsa)","  -b bits                 Key size in bits","  -f file                 Output key file path","  -N phrase               Passphrase (default: none)","  -C comment              Key comment","  -q                      Quiet mode","  -y                      Read private key and output public key","  -h, --help              Show this help","","Generates a key pair: <file> (private) and <file>.pub (public)."].join(`
`),exitCode:0};let n=t.vfs,r=u=>{let d=e.indexOf(u);if(d!==-1&&d+1<e.length)return e[d+1]},s=r("-t")??"rsa",i=r("-f")??`${process.env.HOME??"/root"}/.ssh/id_${s}`,o=r("-C")??`virtual@${t.hostname}`;if(M(e,["-y"]))return Gx(n,i);let a=i.substring(0,i.lastIndexOf("/"));if(!n.exists(a))return{stderr:`ssh-keygen: ${a}: No such file or directory`,exitCode:1};if(n.exists(i))return{stderr:`${i} already exists.
Overwrite (y/n)? `,exitCode:1};let{privateKey:c,publicKey:l}=Vx(s,o);return n.writeFile(i,c,{mode:384}),n.writeFile(`${i}.pub`,l,{mode:420}),{stdout:`${[`Generating public/private ${s} key pair.`,`Your identification has been saved in ${i}`,`Your public key has been saved in ${i}.pub`,`Key fingerprint: SHA256:${Hx(l)}`,"The key's randomart image is:","+---[RSA 2048]----+","|       .+.. .o.  |","|       .o.. ..   |","|      . ..o..    |","|       o +o..   |","|      . So..     |","|     . o=... .   |","|      o.+..o.    |","|       .+...=E   |","|        oo+*+.   |","+----[SHA256]-----+"].join(`
`)}
`,exitCode:0}}}});function Ih(t,e){let n=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return t==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:n}function qx(t){let e=t.getConntrackCount(),n=t.getConntrackMax(),r=t.getInterfaces(),s=t.getRoutes();return{stdout:`${[`Total: ${Aa()}`,`TCP:   ${Aa("tcp")} (estab ${Eh("ESTAB")}, closed ${Eh("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${Aa("udp")}`,"",`Interfaces: ${r.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${n}`].join(`
`)}
`,exitCode:0}}function Yx(t){let e=t.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:`${[`ipv4     conntrack v0.1.0 (${e.length} entries)`,t.formatConntrack(),"",`entries: ${e.length}  max: ${t.getConntrackMax()}`].join(`
`)}
`,exitCode:0}}function Aa(t){return t==="udp"?2:t==="tcp"?5:7}function Eh(t){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[t]??0}var $h,Ph=k(()=>{"use strict";$h={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:t,shell:e})=>{let n=e.network,r=t.includes("-t")||t.includes("--tcp")||t.length===0,s=t.includes("-u")||t.includes("--udp")||t.length===0,i=t.includes("-l")||t.includes("--listening"),o=t.includes("-a")||t.includes("--all"),a=t.includes("-n")||t.includes("--numeric"),c=t.includes("-p")||t.includes("--processes"),l=t.includes("-s")||t.includes("--summary"),u=t.includes("-c")||t.includes("--conntrack"),d=t.includes("-e")||t.includes("--extended");if(l)return qx(n);if(u)return Yx(n);let f=[];if(r||o){f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let p=Ih("tcp",a);for(let h of p){if(i&&h.state!=="LISTEN")continue;let m=d?h.state.padEnd(12):h.state.padEnd(11),g=`${h.localIp}:${h.localPort}`.padEnd(35),y=`${h.peerIp}:${h.peerPort}`,v=`${m} 0      0      ${g} ${y}`;c&&(v+=` users:(("simulated",pid=${h.pid},fd=${h.fd}))`),f.push(v)}}if(s||o){f.length>0&&f.push(""),f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let p=Ih("udp",a);for(let h of p){let m="UNCONN".padEnd(11),g=`${h.localIp}:${h.localPort}`.padEnd(35),y=`${h.peerIp}:${h.peerPort}`;f.push(`${m} 0      0      ${g} ${y}`)}}return f.length===0&&f.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:`${f.join(`
`)}
`,exitCode:0}}}});var kh,Mh=k(()=>{"use strict";kh={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var Nh,Ah=k(()=>{"use strict";ae();Nh={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:n})=>{let r=n.findIndex(v=>v==="-c"||v==="--format"),s=r===-1?void 0:n[r+1],i=n.find(v=>!v.startsWith("-")&&v!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=B(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=v=>{let x=[256,128,64,32,16,8,4,2,1],b=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+x.map((P,_)=>v&P?b[_]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),f=u(a.mode),p="size"in a?a.size:0,h=v=>v.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(p)).replace("%a",d.slice(1)).replace("%A",f).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",h(a.updatedAt)).replace("%z",h(a.updatedAt))}
`,exitCode:0};let m="uid"in a?a.uid:0,g="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${p}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${f})  Uid: (${String(m).padStart(5)}/    root)   Gid: (${String(g).padStart(5)}/    root)`,`Modify: ${h(a.updatedAt)}`,`Change: ${h(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var Th,Oh=k(()=>{"use strict";Th={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(r=>!r.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(r=>`, "${r}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});var Rh,Dh=k(()=>{"use strict";tt();Rh={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:({authUser:t,shell:e,args:n,hostname:r,mode:s,cwd:i})=>{let o=n.includes("-")||n.includes("-l")||n.includes("--login"),a=n.indexOf("-c"),c=a===-1?void 0:n[a+1],u=n.filter((d,f)=>f!==a&&f!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?xe(c,u,r,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function Kx(t){let{flags:e,flagsWithValues:n,positionals:r}=Me(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=n.get("-u")||n.get("--user")||"root",o=r.length>0?r.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Fh,Lh=k(()=>{"use strict";ee();tt();Fh={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:({authUser:t,hostname:e,mode:n,cwd:r,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=Kx(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?xe(c,l,e,n,a?`/home/${l}`:r,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var Uh,Bh=k(()=>{"use strict";Uh={name:"swap",description:"View and manage swap file usage",category:"system",params:["[-s|--stats] [-c|--clear]"],run:({shell:t,args:e})=>{let n=e.includes("-c")||e.includes("--clear");if(!t.vfs.isSwapEnabled())return{stderr:`swap: swap is not enabled
`,exitCode:1};if(n)return t.vfs.clearSwap(),{stdout:`swap: swap files cleared
`,exitCode:0};let r=t.vfs.getSwapStats();if(!r)return{stderr:`swap: unable to retrieve swap stats
`,exitCode:1};let s=o=>{if(o===0)return"0 B";let a=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(1024));return`${(o/1024**c).toFixed(1)} ${a[c]}`};return{stdout:`${["Swap usage:",`  Files swapped out : ${r.filesSwapped}`,`  Swap disk usage   : ${s(r.diskUsage)}`,`  Original size     : ${s(r.originalSize)}`,`  Swap-in ops       : ${r.swapIns}`,`  Swap-out ops      : ${r.swapOuts}`].join(`
`)}
`,exitCode:0}}}});import*as jn from"node:path";function jh(t){let e=[];for(let n of zh)if(t.exists(n))try{let r=t.list(n);for(let s of r)s.endsWith(".service")&&e.push(jn.posix.join(n,s))}catch{}return e.sort()}function Vh(t,e){try{let r=t.readFile(e).match(/^Description=(.+)$/m);return r?r[1]:"(unknown)"}catch{return"(unknown)"}}function gs(t,e){return t.exists(jn.posix.join(wi,e))}function Ta(t,e){let n=jh(t),r=["UNIT                      LOAD   ACTIVE SUB     DESCRIPTION","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let s of n){let i=jn.posix.basename(s);if(e&&!i.includes(e))continue;let o=Vh(t,s),a=gs(t,i),c=a?"active":"inactive",l=a?"running":"dead";r.push(`${i.padEnd(25)} loaded ${c.padEnd(7)} ${l.padEnd(7)} ${o}`)}return n.length===0&&r.push("(no unit files found)"),r.push("",`${n.length} units listed.`),{stdout:`${r.join(`
`)}
`,exitCode:0}}function Xx(t){let e=jh(t),n=["UNIT FILE                  STATE","\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501"];for(let r of e){let s=jn.posix.basename(r),i=gs(t,s)?"enabled":"disabled";n.push(`${s.padEnd(27)} ${i}`)}return e.length===0&&n.push("(no unit files found)"),n.push("",`${e.length} unit files listed.`),{stdout:`${n.join(`
`)}
`,exitCode:0}}function Zx(t,e,n){let r=[];for(let s of n){let i=s.endsWith(".service")?s:`${s}.service`,o=Oa(i,t);if(!o){r.push(`Failed to ${e} unit: Unit file ${i} does not exist.`);continue}let a=jn.posix.join(wi,i);if(e==="enable"){if(!t.exists(wi)){r.push(`Cannot enable ${i}: ${wi} does not exist.`);continue}t.exists(a)?r.push(`Unit ${i} is already enabled.`):(t.symlink(o,a),r.push(`Created symlink ${a} -> ${o}.`))}else t.exists(a)?(t.remove(a),r.push(`Removed symlink ${a}.`)):r.push(`Unit ${i} is not enabled.`)}return{stdout:`${r.join(`
`)}
`,exitCode:0}}function Oa(t,e){for(let n of zh){let r=jn.posix.join(n,t);if(e.exists(r))return r}}function Jx(t,e){let n=e.endsWith(".service")?e:`${e}.service`,r=Oa(n,t);if(!r)return{stderr:`Unit ${n} could not be found.`,exitCode:3};let s=Vh(t,r),i=gs(t,n),o=i?"active":"inactive",a=i?"running":"dead",c=i?"enabled":"disabled";return{stdout:`${[`* ${n} - ${s}`,`     Loaded: loaded (${r}; ${c})`,`     Active: ${o} (${a}) since ...`,"   Main PID: ..."].join(`
`)}
`,exitCode:0}}function Qx(t,e){let n=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`;if(Oa(i,t)){let a=gs(t,i);n.push(`${i} ${a?"active":"inactive"}`)}else n.push(`${i} unknown`)}let r=n.every(s=>s.endsWith("active"))?0:3;return{stdout:`${n.join(`
`)}
`,exitCode:r}}function eC(t,e){let n=[];for(let s of e){let i=s.endsWith(".service")?s:`${s}.service`,o=gs(t,i);n.push(`${i} ${o?"enabled":"disabled"}`)}let r=n.every(s=>s.endsWith("enabled"))?0:1;return{stdout:`${n.join(`
`)}
`,exitCode:r}}var zh,wi,Wh,Gh=k(()=>{"use strict";ee();zh=["/etc/systemd/system","/lib/systemd/system"],wi="/etc/systemd/system/multi-user.target.wants",Wh={name:"systemctl",description:"Control the systemd system and service manager",category:"system",params:["[options] <subcommand> [name...]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: systemctl [OPTIONS...] COMMAND [NAME...]","","Commands:","  list-units [pattern]   List loaded units","  status [pattern]       Show unit status","  start NAME...          Start (activate) units","  stop NAME...           Stop (deactivate) units","  enable NAME...         Enable units","  disable NAME...        Disable units","  is-active NAME...      Check if units are active","  is-enabled NAME...     Check if units are enabled","  daemon-reload          Reload systemd manager config","  list-unit-files        List installed unit files","","Options:","  -h, --help        Show this help"].join(`
`),exitCode:0};let n=t.vfs,r=e.filter(o=>!o.startsWith("-"));if(r.length===0)return Ta(n);let s=r[0],i=r.slice(1);switch(s){case"list-units":return Ta(n,i[0]);case"list-unit-files":return Xx(n);case"daemon-reload":return{stdout:"",exitCode:0};case"start":case"stop":case"restart":case"reload":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:{stdout:"",exitCode:0};case"enable":case"disable":return i.length===0?{stderr:`systemctl: missing unit name for '${s}'`,exitCode:1}:Zx(n,s,i);case"status":return i.length===0?Ta(n):Jx(n,i[0]);case"is-active":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:Qx(n,i);case"is-enabled":return i.length===0?{stderr:"systemctl: missing unit name",exitCode:1}:eC(n,i);default:return{stderr:`systemctl: unknown command '${s}'`,exitCode:1}}}}});var Hh,qh=k(()=>{"use strict";ee();Hh={name:"umount",aliases:["unmount"],description:"Unmount a mounted filesystem",category:"system",params:["[-f] <target>"],run:({shell:t,cwd:e,args:n})=>{if(M(n,["--help","-h"]))return{stdout:["Usage: umount [-f] <target>","  -f, --force    Force unmount","  -h, --help     Show this help","","Unmount a mounted filesystem by mount point path."].join(`
`),exitCode:0};let r=M(n,["-f","--force"]),s=n.filter(i=>!i.startsWith("-"));if(s.length===0)return{stderr:`umount: missing operand
Try 'umount --help' for more information.`,exitCode:1};for(let i of s){let o=i.startsWith("/")?i:`${e}/${i}`;if(!t.vfs.getMounts().find(l=>l.vPath===o)){if(r)continue;return{stderr:`umount: ${o}: not mounted`,exitCode:32}}try{t.vfs.unmount(o)}catch(l){if(r)continue;return{stderr:`umount: ${l instanceof Error?l.message:String(l)}`,exitCode:32}}}return{exitCode:0}}}});function Yh(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function wr(t,e){let n=e.replace("/proc/sys/","").split("/"),r=(s,i)=>{if(!(i in s))return null;let o=s,a=o[i];return{value:typeof a=="number"?a:String(a),set:l=>{let u=Number(l);o[i]=Number.isNaN(u)?l:u}}};switch(n[0]){case"kernel":{let s=n[1];if(!s)break;return r(t.kernel,s)}case"net":{let s=n[1];if(s==="ipv4"){let i=n[2];if(!i)break;return r(t.net.ipv4,i)}if(s==="ipv6"){let i=n[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&n[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=n[2];if(!i)break;return r(t.net.core,i)}break}case"vm":{let s=n[1];if(!s)break;return r(t.vm,s)}case"fs":{if(n[1]==="inotify"){let o=n[2];if(!o)break;return r(t.fs.inotify,o)}let s=t.fs,i=n[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}};break}default:break}return null}var Ra=k(()=>{"use strict"});var Kh,Xh=k(()=>{"use strict";Ra();Kh={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let n=e.filter(o=>o!=="-w"&&o.includes("=")),r=e.filter(o=>o!=="-w"&&!o.includes("="));if(n.length>0){let o=[];for(let a of n){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,f=wr(t.sysctl,d);if(!f)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};f.set(u.trim());let p=f.value;if(o.push(`${c} = ${p}`),c==="vm.ram_cap_bytes"){let h=Number(u);t.resourceCaps.ramCapBytes=h>0?h:void 0,t.vfs.setRamCap(t.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let h=Number(u);t.resourceCaps.cpuCapCores=h>0?h:void 0,t.users.setCpuCapCores(t.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(r.length>0){let o=[];for(let a of r){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=wr(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});function Ua(t){return t.length>=4&&t.readUInt32LE(0)===tC}function rC(t){let e=t.readUInt32LE(12),n=Math.round(Math.log2(e));return{blockSize:e,blockLog:n,compression:t.readUInt16LE(20),flags:t.readUInt16LE(24),inodeCount:t.readUInt32LE(4),modTime:t.readUInt32LE(8),rootInode:t.readBigUInt64LE(32),idCount:t.readUInt16LE(26),idTableStart:Number(t.readBigUInt64LE(48)),inodeTableStart:Number(t.readBigUInt64LE(64)),directoryTableStart:Number(t.readBigUInt64LE(72)),fragmentTableStart:Number(t.readBigUInt64LE(80))}}function sC(t){return!(t&ys)}function iC(t){let e=t&~ys;return e===0?ys:e}function Da(t,e,n){let r=[],s=[],i=e,o=n??t.length;for(;i+2<=o;){let a=t.readUInt16LE(i),c=sC(a),l=iC(a);if(l===0||i+2+l>o&&(l=o-i-2,l<=0))break;s.push({fileOffset:i,blockSize:l,compressed:c});let u=t.slice(i+2,i+2+l);if(c)try{r.push(Buffer.from(tn(u)))}catch{r.push(u)}else r.push(u);i+=2+l}return{data:Buffer.concat(r),blocks:s}}function oC(t,e,n){let r=n+(Number(e)>>16),s=Number(e)&65535,i=0;for(let o of t){if(o.fileOffset===r)return i+s;i+=o.compressed?8192:o.blockSize}return-1}function aC(t,e,n){let{data:r}=Da(t,e),s=[];for(let i=0;i<n&&i*4+4<=r.length;i++)s.push(r.readUInt32LE(i*4));return s}function cC(t,e,n){let r=Math.ceil(n*12/8192),s=[];for(let i=0;i<r;i++){let o=Number(t.readBigUInt64LE(e+i*8));if(o===0)break;let{data:a}=lC(t,o);if(a.length===0)break;s.push(...uC(a))}return s}function lC(t,e){let n=t.readUInt16LE(e),r=!(n&ys),s=n&~ys;if(s===0)return{data:Buffer.alloc(0),compressedSize:0,compressed:!1};if(e+2+s>t.length&&(s=t.length-e-2,s<=0))return{data:Buffer.alloc(0),compressedSize:0,compressed:!1};let i=t.slice(e+2,e+2+s),o;if(r)try{o=Buffer.from(tn(i))}catch{o=i}else o=i;return{data:o,compressedSize:2+s,compressed:r}}function uC(t){let e=[];for(let n=0;n+12<=t.length;n+=12){let r=Number(t.readBigUInt64LE(n)),s=t.readUInt32LE(n+8);if(r===0&&s===0)break;e.push({startBlock:r,size:s})}return e}function ng(t,e){let n=t.readUInt16LE(e),r=t.readUInt16LE(e+2),s=t.readUInt16LE(e+4),i=t.readUInt16LE(e+6),o=t.readUInt32LE(e+8),a=t.readUInt32LE(e+12),c={inodeType:n,mode:r,uid:s,gid:i,mtime:o,inodeNumber:a};switch(n){case Fa:{c.dirStartBlock=t.readUInt32LE(e+16),c.dirSize=t.readUInt16LE(e+24),c.dirOffset=t.readUInt16LE(e+26);break}case La:{c.dirSize=t.readUInt32LE(e+20),c.dirStartBlock=t.readUInt32LE(e+24),c.dirOffset=t.readUInt16LE(e+34);break}case Ii:{let l=t.readUInt32LE(e+16),u=t.readUInt32LE(e+20),d=t.readUInt32LE(e+24),f=t.readUInt32LE(e+28),h=u!==4294967295?Math.floor(f/4096):Math.ceil(f/4096),m=[];for(let g=0;g<h;g++)m.push(t.readUInt32LE(e+32+g*4));c.fileSize=f,c.fileStartBlock=l,c.fragmentIndex=u,c.fragmentOffset=d,c.blockSizes=m;break}case $i:{let l=Number(t.readBigUInt64LE(e+16)),u=Number(t.readBigUInt64LE(e+24)),d=t.readUInt32LE(e+44),f=t.readUInt32LE(e+48),h=d!==4294967295?Math.floor(u/4096):Math.ceil(u/4096),m=[];for(let g=0;g<h;g++)m.push(t.readUInt32LE(e+56+g*4));c.fileSize=u,c.fileStartBlock=l,c.fragmentIndex=d,c.fragmentOffset=f,c.blockSizes=m;break}case Ei:case Pi:{let l=t.readUInt32LE(e+20);c.symlinkTarget=t.slice(e+24,e+24+l).toString("utf8");break}case Jh:case Qh:break;case eg:case tg:break;default:break}return c}function dC(t){switch(t){case Fa:return 32;case La:return 40;case Ii:return 32;case $i:return 56;case Ei:case Pi:return 24;case Jh:case Qh:return 28;case eg:case tg:return 24;default:return 32}}function fC(t,e){let n=t.readUInt16LE(e),r=dC(n);if(n===Ei||n===Pi)return r+t.readUInt32LE(e+20);if(n===Ii){let s=t.readUInt32LE(e+20),i=t.readUInt32LE(e+28),a=s!==4294967295?Math.floor(i/4096):Math.ceil(i/4096);return r+a*4}if(n===$i){let s=Number(t.readBigUInt64LE(e+24)),a=t.readUInt32LE(e+44)!==4294967295?Math.floor(s/4096):Math.ceil(s/4096);return r+a*4}return r}function pC(t){let e=new Map,n=0;for(;n+16<=t.length&&t.readUInt16LE(n)!==0;){let s=ng(t,n);e.set(s.inodeNumber,s),n+=fC(t,n)}return e}function mC(t,e,n){let r=[],s=e;for(let i of n){if(i===0)continue;let o=!(i&_i),a=i&~_i;if(a===0)continue;let c;if(o)try{c=Buffer.from(tn(t.slice(s,s+a)))}catch{c=t.slice(s,s+a)}else c=t.slice(s,s+a);r.push(c),s+=a}return Buffer.concat(r)}function hC(t,e,n){let r=[],s=e+n,i=e;for(;i+12<=t.length&&i<s;){let o=t.readUInt32LE(i),a=t.readUInt32LE(i+4),c=t.readUInt32LE(i+8);if(o===0&&a===0&&c===0){i+=12;continue}i+=12;let l=o+1;for(let u=0;u<l&&!(i+8>t.length||i>=s);u++){let d=t.readInt16LE(i+2),f=t.readUInt16LE(i+4),p=t.readUInt16LE(i+6);i+=8;let h=p+1,m=t.slice(i,i+h).toString("utf8");i+=h,r.push({inodeNumber:c+d,type:f,name:m})}}return r}function ki(t){if(!Ua(t))throw new Error("decodeSquashfs: not a squashfs image");let e=rC(t);if(e.compression!==nC)throw new Error(`decodeSquashfs: unsupported compression ${e.compression} (only gzip=1)`);let n=aC(t,e.idTableStart,e.idCount),r=t.readUInt32LE(16),s=e.fragmentTableStart>0&&r>0?cC(t,e.fragmentTableStart,r):[],{data:i,blocks:o}=Da(t,e.inodeTableStart,e.directoryTableStart),a=oC(o,e.rootInode,e.inodeTableStart);if(a<0||a>=i.length)throw new Error(`decodeSquashfs: root inode not found at offset ${a}`);let c=ng(i,a),l=pC(i),{data:u}=Da(t,e.directoryTableStart),d=rg("",c.mode||493,0,0,c.mtime*1e3);return c.dirStartBlock!==void 0&&sg(t,c,u,l,n,s,d,"",e),d}function rg(t,e,n,r,s){return{type:"directory",name:t,mode:e,uid:n,gid:r,createdAt:s,updatedAt:s,children:Object.create(null),_childCount:0,_sortedKeys:null}}function Zh(t,e,n,r,s,i){return{type:"file",name:t,content:e,mode:n,uid:r,gid:s,compressed:!1,createdAt:i,updatedAt:i}}function gC(t,e,n){let r=e.dirStartBlock??0,s=e.dirOffset??0,i=n+r,o=0,a=n;for(;a<i&&o<t.length;){let c=a+2;if(c>=i)break;o+=8192,a=c}return o+s}function sg(t,e,n,r,s,i,o,a,c){if(e.dirStartBlock===void 0||e.dirOffset===void 0)return;let l=gC(n,e,c.directoryTableStart),u=e.dirSize===void 0?0:Math.max(0,e.dirSize-3),d=hC(n,l,u);for(let f of d){let p=r.get(f.inodeNumber);if(!p)continue;let h=p.uid<s.length?s[p.uid]??0:0,m=p.gid<s.length?s[p.gid]??0:0,g=p.mtime*1e3;if(p.inodeType===Fa||p.inodeType===La){let y=rg(f.name,p.mode===0?493:p.mode,h,m,g);o.children[f.name]=y,o._childCount++,o._sortedKeys=null,p.dirStartBlock!==void 0&&p.dirOffset!==void 0&&sg(t,p,n,r,s,i,y,a?`${a}/${f.name}`:`/${f.name}`,c)}else if(p.inodeType===Ei||p.inodeType===Pi){let y=p.symlinkTarget??"";o.children[f.name]=Zh(f.name,Buffer.from(y,"utf8"),41471,h,m,g),o._childCount++,o._sortedKeys=null}else if(p.inodeType===Ii||p.inodeType===$i){let y=Buffer.alloc(0),v=p.fileSize??0;if(p.blockSizes&&p.blockSizes.length>0&&p.fileStartBlock)try{y=mC(t,p.fileStartBlock,p.blockSizes)}catch{y=Buffer.alloc(0)}if(y.length===0&&p.fragmentIndex!==void 0&&p.fragmentIndex!==4294967295&&v>0)try{let x=i[p.fragmentIndex];if(x){let b=!(x.size&_i),P=x.size&~_i,_=t.slice(x.startBlock,x.startBlock+P),w;if(b)try{w=Buffer.from(tn(_))}catch{w=_}else w=_;let S=p.fragmentOffset??0;y=w.slice(S,S+v)}}catch{y=Buffer.alloc(0)}o.children[f.name]=Zh(f.name,y,p.mode||420,h,m,g),o._childCount++,o._sortedKeys=null}}}var tC,nC,Fa,Ii,Ei,Jh,Qh,eg,tg,La,$i,Pi,ys,_i,Ba=k(()=>{"use strict";Sr();tC=1936814952,nC=1,Fa=1,Ii=2,Ei=3,Jh=4,Qh=5,eg=6,tg=7,La=8,$i=9,Pi=10,ys=32768,_i=1<<24});import*as Mi from"node:path";import*as ig from"node:fs";function yC(t,e,n){t.mkdir(e,n.mode),og(t,e,n)}function og(t,e,n){for(let[r,s]of Object.entries(n.children)){let i=Mi.posix.join(e,r);if(s.type==="directory")t.mkdir(i,s.mode),og(t,i,s);else if(s.type==="file"||s.type==="stub"){let o=s,a=o.type==="stub"&&o.stubContent?Buffer.from(o.stubContent,"utf8"):o.content??Buffer.alloc(0);t.writeFile(i,a,{mode:s.mode})}}}function za(t,e){return e.startsWith("/")?Mi.posix.normalize(e):Mi.posix.join(t,e)}var ag,cg=k(()=>{"use strict";ee();Ba();ag={name:"mount",description:"Mount a filesystem or list active mounts",category:"system",params:["[-o <options>] [-t <fstype>] [source] [target]"],run:({shell:t,cwd:e,args:n})=>{if(M(n,["--help","-h"]))return{stdout:["Usage: mount [options] [source] [target]","  -o, --options <opts>   Mount options (ro, rw, remount)","  -t, --type <fstype>    Filesystem type (host, squashfs)","  -h, --help             Show this help","","Without arguments, list active mounts."].join(`
`),exitCode:0};let{flagsWithValues:r,positionals:s}=Me(n,{flagsWithValue:["-o","--options","-t","--type"]});if(s.length===0){let l=t.vfs.getMounts();return l.length===0?{stdout:"",exitCode:0}:{stdout:`${l.map(d=>{let f=d.readOnly?"ro":"rw";return`${d.hostPath} on ${d.vPath} type host (${f})`}).join(`
`)}
`,exitCode:0}}let i=r.get("-o")??r.get("--options")??"",o=i.includes("ro")&&!i.includes("rw"),a=i.includes("remount"),c=r.get("-t")??r.get("--type")??"";if(s.length>=2){let l=za(e,s[0]),u=za(e,s[1]);if(c==="squashfs"||c==="squash4")try{let d=ig.readFileSync(l),f=ki(d);return yC(t.vfs,u,f),{exitCode:0}}catch(d){return{stderr:`mount: ${d instanceof Error?d.message:String(d)}`,exitCode:32}}if(a){let f=t.vfs.getMounts().find(p=>p.vPath===u);return f?(t.vfs.unmount(u),t.vfs.mount(u,f.hostPath,{readOnly:o}),{exitCode:0}):{stderr:`mount: ${u}: not mounted`,exitCode:32}}try{return t.vfs.mount(u,l,{readOnly:o}),{exitCode:0}}catch(d){return{stderr:`mount: ${d instanceof Error?d.message:String(d)}`,exitCode:32}}}if(s.length===1){let l=za(e,s[0]),d=t.vfs.getMounts().find(h=>h.vPath===l);if(!d)return{stderr:`mount: ${l}: not mounted`,exitCode:32};let f=d.readOnly?"ro":"rw";return{stdout:`${`${d.hostPath} on ${d.vPath} type host (${f})`}
`,exitCode:0}}return{stderr:`mount: invalid argument(s)
Try 'mount --help' for more information.`,exitCode:1}}}});import*as _r from"node:os";var lg,ug,dg,fg=k(()=>{"use strict";lg={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:t})=>{let e=_r.cpus(),n=t.resourceCaps?.cpuCapCores,r=n!==void 0&&n>0?e.slice(0,n):e,s=_r.arch(),i=_r.endianness(),o=r.length,a=r.length>0?r[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},ug={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},dg={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});var pg,mg=k(()=>{"use strict";ee();ae();pg={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=Tn(r,["-n"]),o=r.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=r.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let f=d.split(`
`),p=d.endsWith(`
`),h=p?f.slice(0,-1):f;return h.slice(Math.max(0,h.length-a)).join(`
`)+(p?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let f=B(n,d);try{be(t,f,"tail"),u.push(l(e.vfs.readFile(f)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function SC(t,e,n){let r=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(r,a,0,Math.min(l.length,c))};s(n?`${t}/`:t,0,100),s(n?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),r[156]=n?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)r[o]=32;let i=0;for(let o=0;o<512;o++)i+=r[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(r,148),r}function bC(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function vC(t){let e=[];for(let{name:n,content:r,isDir:s}of t)e.push(SC(n,s?0:r.length,s)),s||(e.push(r),e.push(bC(r.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function xC(t){let e=[],n=0;for(;n+512<=t.length;){let r=t.slice(n,n+512);if(r.every(c=>c===0))break;let s=r.slice(0,100).toString("ascii").replace(/\0.*/,""),i=r.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=Number.parseInt(i,8)||0,a=r[156];if(n+=512,s&&a!==53&&a!==53){let c=t.slice(n,n+o);e.push({name:s,content:c})}n+=Math.ceil(o/512)*512}return e}var hg,gg=k(()=>{"use strict";Sr();ae();hg={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let i=[],o=!1;for(let g of n)if(/^-[a-zA-Z]{2,}$/.test(g))for(let y of g.slice(1))i.push(`-${y}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){o=!0;for(let y of g)i.push(`-${y}`)}else i.push(g);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),f=i.indexOf("-f"),p=f===-1?i.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2")):i[f+1];if(!(a||c||l))return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!p)return{stderr:"tar: no archive specified",exitCode:1};let h=B(e,p),m=u||p.endsWith(".gz")||p.endsWith(".tgz");if(a){let g=new Set;f!==-1&&i[f+1]&&g.add(i[f+1]);let y=i.filter(_=>!(_.startsWith("-")||g.has(_))),v=[],x=[];for(let _ of y){let w=B(e,_);if(!t.vfs.exists(w))return{stderr:`tar: ${_}: No such file or directory`,exitCode:1};if(t.vfs.stat(w).type==="file"){let C=t.vfs.readFileRaw(w);v.push({name:_,content:C,isDir:!1}),d&&x.push(_)}else{v.push({name:_,content:Buffer.alloc(0),isDir:!0}),d&&x.push(`${_}/`);let C=($,N)=>{for(let R of t.vfs.list($)){let W=`${$}/${R}`,Y=`${N}/${R}`;if(t.vfs.stat(W).type==="directory")v.push({name:Y,content:Buffer.alloc(0),isDir:!0}),d&&x.push(`${Y}/`),C(W,Y);else{let E=t.vfs.readFileRaw(W);v.push({name:Y,content:E,isDir:!1}),d&&x.push(Y)}}};C(w,_)}}let b=vC(v),P=m?Buffer.from(Rn(b)):b;return t.vfs.writeFile(h,P,{},r,s),{stdout:d?x.join(`
`):void 0,exitCode:0}}if(l||c){let g=t.vfs.readFileRaw(h),y;if(m)try{y=Buffer.from(Lt(g))}catch{return{stderr:`tar: ${p}: not a gzip file`,exitCode:1}}else y=g;let v=xC(y);if(l)return{stdout:v.map(P=>d?`-rw-r--r-- 0/0 ${P.content.length.toString().padStart(8)} 1970-01-01 00:00 ${P.name}`:P.name).join(`
`),exitCode:0};let x=[];for(let{name:b,content:P}of v){let _=B(e,b);t.vfs.writeFile(_,P,{},r,s),d&&x.push(b)}return{stdout:d?x.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});function CC(t,e){for(let n=1;n<t.length;n++){let r=t[n];if(r==="delay"||r==="latency"){let s=t[n+1];return Wa(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(r))return Wa(r)}return 0}function wC(t,e){let n=t.indexOf("jitter");if(n===-1)return 0;let r=t[n+1];return Wa(r??"0")}function _C(t,e){let n=t.indexOf("loss");if(n===-1)return 0;for(let r=n+1;r<t.length;r++){let s=t[r];if(/^\d+(\.\d+)?%$/.test(s))return Number.parseFloat(s)}return 0}function IC(t,e){let n=t.indexOf("reorder");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function EC(t,e){let n=t.indexOf("duplicate");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function $C(t,e){let n=t.indexOf("corrupt");if(n===-1)return 0;let r=t[n+1];return r?Number.parseFloat(r):0}function yg(t,e){let n=t.indexOf("rate");return n===-1?"0":t[n+1]??"0"}function PC(t,e){let n=t.indexOf("burst");return n===-1?"0":t[n+1]??"0"}function kC(t,e){let n=t.indexOf("limit");return n===-1?"0":t[n+1]??"0"}function Wa(t){return t.endsWith("ms")?Number.parseFloat(t):t.endsWith("us")?Number.parseFloat(t)/1e3:t.endsWith("s")?Number.parseFloat(t)*1e3:Number.parseFloat(t)}var Sg,bg=k(()=>{"use strict";Sg={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:t,shell:e})=>{let n=e.network,r=t[0]?.toLowerCase(),s=t[1]?.toLowerCase();if(!r)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(r==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=t.indexOf("dev"),o=i===-1?void 0:t[i+1],a=n.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:`${c.join(`
`)}
`,exitCode:0}}if(s==="add"){let i=t.indexOf("dev"),o=i===-1?"eth0":t[i+1],a=t.indexOf("netem"),c=t.indexOf("tbf"),l=t.indexOf("htb");if(a!==-1){let u=CC(t,a),d=wC(t,a),f=_C(t,a),p=IC(t,a),h=EC(t,a),m=$C(t,a),g=n.getInterface(o);return n.setInterfaceMtu(o,g?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${f}% reorder=${p}% duplicate=${h}% corrupt=${m}%
`,exitCode:0}}if(c!==-1){let u=yg(t,c),d=PC(t,c),f=kC(t,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${f}
`,exitCode:0}}if(l!==-1){let u=yg(t,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=t.indexOf("dev");return{stdout:`Deleted qdisc from ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=t.indexOf("dev");return{stdout:`Changed qdisc on ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}}return r==="class"||r==="filter"||r==="action"?{exitCode:0}:{stderr:`tc: Object "${r}" is unknown, try "tc help".`,exitCode:1}}}});var vg,xg=k(()=>{"use strict";ee();ae();vg={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:n,stdin:r,uid:s,gid:i})=>{let o=M(n,["-a"]),a=n.filter(l=>!l.startsWith("-")),c=r??"";for(let l of a){let u=B(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,s,i)}catch{return""}})();t.vfs.writeFile(u,d+c,{},s,i)}else t.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function Vn(t,e,n,r){if(t.length===0)return!1;if(t[0]==="!")return!Vn(t.slice(1),e,n,r);if(t.includes("-a")||t.includes("-o")){let s=t.indexOf("-a");if(s!==-1)return Vn(t.slice(0,s),e,n,r)&&Vn(t.slice(s+1),e,n,r);let i=t.indexOf("-o");if(i!==-1)return Vn(t.slice(0,i),e,n,r)||Vn(t.slice(i+1),e,n,r)}if(t.length===2){let[s,i=""]=t,o=B(n,i);switch(s){case"-e":return e.vfs.exists(o);case"-f":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file";case"-d":return e.vfs.exists(o)&&e.vfs.stat(o).type==="directory";case"-b":return!1;case"-c":return!1;case"-p":return!1;case"-S":return!1;case"-g":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&1024);case"-k":return!!(e.vfs.exists(o)&&e.vfs.stat(o).mode&512);case"-r":return e.vfs.exists(o);case"-w":return e.vfs.exists(o);case"-x":return e.vfs.exists(o)&&!!(e.vfs.stat(o).mode&73);case"-s":return e.vfs.exists(o)&&e.vfs.stat(o).type==="file"&&e.vfs.stat(o).size>0;case"-z":return i.length===0;case"-n":return i.length>0;case"-L":return e.vfs.isSymlink(o);case"-t":{let a=Number.parseInt(i,10);return a===0||a===1||a===2}case"-o":{if(!r)return!1;let a=`__${i}`;return r[a]==="1"}case"-v":return r?i in r:!1;case"-R":return r?r[i]!==void 0:!1;default:break}}if(t.length===3){let[s="",i,o=""]=t,a=Number(s),c=Number(o);switch(i){case"=":case"==":return s===o;case"!=":return s!==o;case"<":return s<o;case">":return s>o;case"-eq":return a===c;case"-ne":return a!==c;case"-lt":return a<c;case"-le":return a<=c;case"-gt":return a>c;case"-ge":return a>=c;case"-nt":{let l=B(n,s),u=B(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.updatedAt>f.updatedAt}case"-ot":{let l=B(n,s),u=B(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.updatedAt<f.updatedAt}case"-ef":{let l=B(n,s),u=B(n,o);if(!(e.vfs.exists(l)&&e.vfs.exists(u)))return!1;let d=e.vfs.stat(l),f=e.vfs.stat(u);return d.path===f.path}case"=~":try{return new RegExp(o).test(s)}catch{return!1}default:break}}return t.length===1?(t[0]??"").length>0:!1}var Cg,wg,_g=k(()=>{"use strict";ae();Cg={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n})=>{try{let r=[...t];return r[r.length-1]==="]"&&r.length--,r[0]==="["&&r.shift(),{exitCode:Vn(r,e,n)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}},wg={name:"[[",aliases:["[["],description:"Evaluate conditional expression (extended)",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:n,env:r})=>{try{let s=[...t];for(;s[s.length-1]==="]]";)s.length--;for(;s[0]==="[[";)s.shift();let i=s.map(a=>a==="&&"?"-a":a==="||"?"-o":a);return{exitCode:Vn(i,e,n,r.vars)?0:1}}catch{return{stderr:"[[ : malformed expression",exitCode:2}}}}});function MC(t){let e="",n=t;do e=String.fromCharCode(97+n%26)+e,n=Math.floor(n/26)-1;while(n>=0);return e}function ja(t,e){return String(t).padStart(e,"0")}var Ig,Eg,$g,Pg,kg=k(()=>{"use strict";ee();ae();Ig={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let{flagsWithValues:r,positionals:s}=Me(n,{flagsWithValue:["-t"]}),i=r.get("-t")||" 	",[o,a]=s;if(!(o&&a))return{stderr:`join: missing operand
`,exitCode:1};let c=B(e,o),l=B(e,a);if(!(t.vfs.exists(c)&&t.vfs.exists(l)))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),f=i===" 	"?/\s+/:new RegExp(i),p=new Map;for(let m of u){let g=m.split(f)[0]||m;p.set(g,m)}let h=[];for(let m of d){let g=m.split(f)[0]||m,y=p.get(g);y&&h.push(`${y} ${m}`)}return{stdout:`${h.join(`
`)}
`,exitCode:0}}},Eg={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:n})=>{let r=n.filter(y=>!y.startsWith("-")),[s,i]=r;if(!(s&&i))return{stderr:`comm: missing operand
`,exitCode:1};let o=B(e,s),a=B(e,i);if(!(t.vfs.exists(o)&&t.vfs.exists(a)))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),f=[],p=[],h=[];for(let y of c)d.has(y)?h.push(y):f.push(y);for(let y of l)u.has(y)||p.push(y);let m=Math.max(f.length,p.length,h.length),g=[];for(let y=0;y<m;y++){let v=y<f.length?f[y]:"",x=y<p.length?p[y]:"",b=y<h.length?h[y]:"";g.push(`${v}	${x}	${b}`)}return{stdout:`${g.join(`
`)}
`,exitCode:0}}},$g={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] [-d] [--additional-suffix suffix] <file> [prefix]"],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let{flags:i,flagsWithValues:o,positionals:a}=Me(n,{flags:["-d"],flagsWithValue:["-l","-b","--additional-suffix"]}),c=Number.parseInt(o.get("-l")||"1000",10),l=o.has("-b")?Number.parseInt(o.get("-b"),10):void 0,u=i.has("-d"),d=o.get("--additional-suffix")??"",f=a[0],p=a[1]||"x";if(!f)return{stderr:`split: missing file operand
`,exitCode:1};let h=B(e,f);if(!t.vfs.exists(h))return{stderr:`split: ${f}: No such file or directory
`,exitCode:1};let m=t.vfs.readFile(h,r,s),g=u?x=>ja(x,2):MC;if(l!==void 0){let x=0;for(let b=0;b<m.length;b+=l){let P=m.slice(b,b+l),_=B(e,`${p}${g(x)}${d}`);t.vfs.writeFile(_,P,{},r,s),x++}return{exitCode:0}}let y=m.split(`
`),v=0;for(let x=0;x<y.length;x+=c){let b=y.slice(x,x+c).join(`
`),P=B(e,`${p}${g(v)}${d}`);t.vfs.writeFile(P,b,{},r,s),v++}return{exitCode:0}}},Pg={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["[-f prefix] [-n digits] [-s] [-k] <file> <pattern>..."],run:({shell:t,cwd:e,args:n,uid:r,gid:s})=>{let{flags:i,flagsWithValues:o,positionals:a}=Me(n,{flags:["-s","-k"],flagsWithValue:["-f","-n"]}),c=i.has("-s"),l=o.get("-f")??"xx",u=Number.parseInt(o.get("-n")??"2",10),d=a[0],f=a.slice(1);if(!d)return{stderr:`csplit: missing file operand
`,exitCode:1};if(f.length===0)return{stderr:`csplit: missing pattern
`,exitCode:1};let p=B(e,d);if(!t.vfs.exists(p))return{stderr:`csplit: ${d}: No such file or directory
`,exitCode:1};let m=t.vfs.readFile(p,r,s).split(`
`);m.length>0&&m[m.length-1]===""&&m.pop();let g=[];for(let _ of f)if(/^\d+$/.test(_))g.push({kind:"lineno",lineno:Number.parseInt(_,10)});else if(_.startsWith("/")&&_.endsWith("/")){let w=_.slice(1,-1);try{g.push({kind:"regex",regex:new RegExp(w),repeat:1})}catch{return{stderr:`csplit: invalid regex: ${_}
`,exitCode:1}}}else if(_.startsWith("%")&&_.endsWith("%")){let w=_.slice(1,-1);try{new RegExp(w)}catch{return{stderr:`csplit: invalid regex: ${_}
`,exitCode:1}}g.push({kind:"regex",regex:/$^/,repeat:0})}else if(_.startsWith("/")&&_.includes("{")){let w=_.indexOf("{"),S=_.slice(1,w-1),C=_.slice(w+1,_.indexOf("}",w)),$=Number.parseInt(C,10)||1;try{g.push({kind:"regex",regex:new RegExp(S),repeat:$})}catch{return{stderr:`csplit: invalid regex: ${_}
`,exitCode:1}}}else return{stderr:`csplit: invalid pattern: ${_}
`,exitCode:1};let y=new Set;for(let _ of g)if(_.kind==="lineno")_.lineno>0&&_.lineno<=m.length&&y.add(_.lineno-1);else if(_.kind==="regex"&&_.repeat>0){let w=0;for(let S=0;S<m.length&&!(_.regex.test(m[S]??"")&&(y.add(S),w++,w>=_.repeat));S++);}let v=[...y].sort((_,w)=>_-w),x=[],b=0,P=0;for(let _ of v){if(_<=b)continue;let w=m.slice(b,_).join(`
`),S=`${l}${ja(P,u)}`,C=B(e,S);t.vfs.writeFile(C,w,{},r,s),x.push(S),b=_,P++}if(b<m.length){let _=m.slice(b).join(`
`),w=`${l}${ja(P,u)}`,S=B(e,w);t.vfs.writeFile(S,_,{},r,s),x.push(w)}return c?{exitCode:0}:{stdout:`${x.map(w=>{let S=B(e,w);try{let C=t.vfs.stat(S);return String(C.type==="file"?C.size:0)}catch{return"0"}}).join(`
`)}
`,exitCode:0}}}});import*as Ir from"node:os";var Mg,Ng=k(()=>{"use strict";Mg={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),n=t.users.listActiveSessions(),r=t.users.listProcesses(),s=Ir.totalmem(),i=Ir.freemem(),o=t.resourceCaps?.ramCapBytes,a=o===void 0?s:Math.min(s,o),c=o===null?i:Math.floor(a*(i/s)),l=a-c,u=Ir.loadavg(),d=[],f=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${f},  ${n.length} user(s), load average: ${u.map(x=>x.toFixed(2)).join(", ")}`),d.push(`Tasks: ${n.length+r.length} total,   ${r.filter(x=>x.status==="running").length||1} running`);let p=(a/1024/1024).toFixed(0),h=(l/1024/1024).toFixed(0),m=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${p.padStart(8)} total, ${m.padStart(8)} free, ${h.padStart(8)} used`);let g=Math.floor(a*.5),y=Math.floor(g*.05),v=g-y;return d.push(`MiB Swap: ${String(g).padStart(8)} total, ${String(v).padStart(8)} free, ${String(y).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),n.forEach((x,b)=>{let P=1e3+b,_=Math.floor(Math.random()*2e5+5e4),w=Math.floor(Math.random()*1e4+2e3),S=Math.floor(w*.6),C=(Math.random()*5).toFixed(1),$=(w/(a/1024)*100).toFixed(1);d.push(`${String(P).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(_).padStart(7)} ${String(w).padStart(6)} ${String(S).padStart(6)} S  ${C.padStart(4)} ${$.padStart(5)}   0:00.00 bash`)}),r.forEach(x=>{let b=Math.floor(Math.random()*5e4+1e4),P=Math.floor(Math.random()*5e3+500),_=Math.floor(P*.5),w=(Math.random()*10).toFixed(1),S=(P/(a/1024)*100).toFixed(1),C=x.status==="running"?"R":"S";d.push(`${String(x.pid).padStart(5)} ${x.username.padEnd(8).slice(0,8)}  20   0 ${String(b).padStart(7)} ${String(P).padStart(6)} ${String(_).padStart(6)} ${C} ${w.padStart(4)} ${S.padStart(5)}   0:00.00 ${x.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});import*as Ag from"node:path";var Tg,Og=k(()=>{"use strict";ae();Tg={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r,uid:s,gid:i})=>{if(r.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of r){let a=B(n,o);e.vfs.exists(a)?Qe(e.vfs,e.users,t,a,2):(Qe(e.vfs,e.users,t,Ag.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var NC,Rg,Dg,Fg,Lg=k(()=>{"use strict";NC={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},Rg=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],Dg={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let r=Number.parseInt(t[1],10);return{stdout:`\x1B[${Rg[r]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let r=Number.parseInt(t[1],10);return{stdout:`\x1B[${Rg[r]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${Number.parseInt(t[1],10)+1};${Number.parseInt(t[2],10)+1}H`,exitCode:0};let n=NC[e];return n===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(n),exitCode:0}}},Fg={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function AC(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function Ug(t){let e=[],n=AC(t),r=0;for(;r<n.length;){if(r+2<n.length&&n[r+1]==="-"){let s=n.charCodeAt(r),i=n.charCodeAt(r+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));r+=3;continue}}e.push(n[r]),r++}return e}var Bg,zg=k(()=>{"use strict";ee();Bg={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let n=M(t,["-d"]),r=M(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=Ug(s[0]??""),o=Ug(s[1]??""),a=e??"";if(n){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(r&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});function TC(t,e){let n=Vg(t),r=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;r.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return r.push({ip:n,hostname:t,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),r}function OC(t,e){return t==="localhost"||t==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(t)?t:Vg(t)}function Vg(t){let e=RC(t);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function RC(t){let e=0;for(let n=0;n<t.length;n++)e=(e<<5)-e+t.charCodeAt(n),e|=0;return Math.abs(e)}function Wg(t,e,n){let r=t.indexOf(e);if(r===-1)return n;let s=t[r+1],i=Number.parseInt(s??"0",10);return Number.isNaN(i)?n:i}var jg,Gg=k(()=>{"use strict";jg={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:t,shell:e})=>{let n=e.network,r=t.find(c=>!c.startsWith("-"));if(!r)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=Wg(t,"-m",30),i=Wg(t,"-q",3),o=[];o.push(`traceroute to ${r} (${OC(r,e)}), ${s} hops max, 60 byte packets`);let a=TC(r,n);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let f=l.baseLatency+Math.random()*l.jitter;u.push(`${f.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Hg,qg=k(()=>{"use strict";ee();ae();Hg={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:n,args:r})=>{let s=B(n,hn(r,0)??n);return be(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var Yg,Kg,Xg=k(()=>{"use strict";Yg={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},Kg={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});function Zg(t){return`__func_${t}`}function DC(t,e,n,r){if(Zg(t)in e)return{kind:"function"};if(Xe(t))return{kind:"builtin"};for(let s of n){let i=`${s}/${t}`;if(r.vfs.exists(i))return{kind:"file",path:i}}return{kind:"not found"}}var Jg,Qg=k(()=>{"use strict";gn();Jg={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["[-afptP] <command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let r=new Set([...t].filter(d=>d.startsWith("-")&&!d.includes("="))),s=t.filter(d=>!r.has(d)),i=r.has("-t"),o=r.has("-p"),a=r.has("-a"),c=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),l=[],u=0;for(let d of s){let{kind:f,path:p}=DC(d,n.vars,c,e);if(i){l.push(f==="not found"?"":f),f==="not found"&&(u=1);continue}if(o){l.push(f==="file"&&p?p:""),f==="not found"&&(u=1);continue}if(f==="not found"){l.push(`type: ${d}: not found`),u=1;continue}if(f==="builtin"?l.push(`${d} is a shell builtin`):f==="function"?l.push(`${d} is a function`):f==="file"&&p&&l.push(`${d} is ${p}`),a){Xe(d)&&l.push(`${d} is a shell builtin`),Zg(d)in n.vars&&l.push(`${d} is a function`);for(let h of c){let m=`${h}/${d}`;e.vfs.exists(m)&&l.push(`${d} is ${m}`)}}}return{stdout:l.join(`
`),exitCode:u}}}});var e0,t0=k(()=>{"use strict";ee();e0={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let n=M(e,["-a"]),r="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return n?{stdout:`${r} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:M(e,["-r"])?{stdout:s,exitCode:0}:M(e,["-m"])?{stdout:i,exitCode:0}:{stdout:r,exitCode:0}}}});var n0,r0=k(()=>{"use strict";ee();n0={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let n=M(t,["-c"]),r=M(t,["-d"]),s=M(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(r&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(n?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var s0,i0=k(()=>{"use strict";s0={name:"unset",description:"Remove shell variable or function",category:"shell",params:["[-fv] <NAME>..."],run:({args:t,env:e})=>{let n=!1,r=!0,s=[];for(let i of t){if(i==="-f"){n=!0,r=!1;continue}if(i==="-v"){r=!0,n=!1;continue}s.push(i)}for(let i of s)r&&delete e.vars[i],n&&delete e.vars[`__func_${i}`];return{exitCode:0}}}});var o0,a0=k(()=>{"use strict";ee();o0={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let n=M(t,["-p"]),r=M(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(r)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(n){let f=[];return i>0&&f.push(`${i} day${i>1?"s":""}`),o>0&&f.push(`${o} hour${o>1?"s":""}`),f.push(`${a} minute${a===1?"":"s"}`),{stdout:`up ${f.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u===1?"":"s"},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var c0,l0=k(()=>{"use strict";c0={name:"usermod",description:"Modify a user account",category:"users",params:["[-g group|-G groups|-aG group|-L|-U] <user>"],run:({authUser:t,shell:e,args:n})=>{if(t!=="root")return{stderr:`usermod: permission denied
`,exitCode:1};let r,s,i=!1,o=!1,a=!1,c;for(let u=0;u<n.length;u++){let d=n[u];if(d)if(d==="-g"){let f=n[u+1];if(!f)break;r=f,u++}else if(d==="-G"){let f=n[u+1];if(!f)break;s=f.split(","),u++}else if(d==="-aG"){let f=n[u+1];if(!f)break;i=!0,s=f.split(","),u++}else d==="-L"?o=!0:d==="-U"?a=!0:c||(c=d)}if(!c)return{stderr:`Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>
`,exitCode:1};if(!e.users.listUsers().includes(c))return{stderr:`usermod: user '${c}' does not exist
`,exitCode:1};if(r){if(e.users.getGidByName(r)===null)return{stderr:`usermod: group '${r}' does not exist
`,exitCode:1};e.users.addGroupMember(r,c)}if(s){if(!i){let u=e.users.getUserSupplementaryGroups(c);for(let d of u)e.users.removeGroupMember(d,c)}for(let u of s){let d=u.trim();if(d){if(!e.users.getGroup(d))return{stderr:`usermod: group '${d}' does not exist
`,exitCode:1};e.users.addGroupMember(d,c)}}}if(o){let u=e.users.getPasswordHash(c);if(u&&!u.startsWith("!"))return{stdout:`usermod: lock requested for '${c}' (password lock not yet implemented)
`,exitCode:0}}return a?{stdout:`usermod: unlock requested for '${c}'
`,exitCode:0}:{stdout:`usermod: user '${c}' modified
`,exitCode:0}}}});import*as u0 from"node:path";var d0,f0=k(()=>{"use strict";ae();d0={name:"vi",aliases:["vim"],description:"Modal text editor (vi compatible)",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:n,args:r})=>{if(r.includes("--help")||r.includes("-h"))return{stdout:["Usage: vi [file]","  -h, --help    Show this help","","Modal text editor. Use :q to quit, :w to save."].join(`
`),exitCode:0};let s=r.find(l=>!l.startsWith("-"));if(!s)return{stderr:"vi: missing file operand",exitCode:1};let i=B(n,s);be(t,i,"vi");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=u0.posix.basename(i)||"buffer",c=`/tmp/sshmimic-vi-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});var p0,m0=k(()=>{"use strict";tt();p0={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let n=new Date,r=Math.floor(performance.now()/1e3),s=Math.floor(r/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=n.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${ge(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let h=JSON.parse(t.vfs.readFile(c));l=new Date(h.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",p=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,p].join(`
`),exitCode:0}}}});var h0,g0=k(()=>{"use strict";ee();ae();h0={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:n,args:r,stdin:s})=>{let i=M(r,["-l"]),o=M(r,["-w"]),a=M(r,["-c"]),c=!(i||o||a),l=r.filter(f=>!f.startsWith("-")),u=(f,p)=>{let h=f.length===0?0:f.trim().split(`
`).length,m=f.trim().split(/\s+/).filter(Boolean).length,g=Buffer.byteLength(f,"utf8"),y=[];return(c||i)&&y.push(String(h).padStart(7)),(c||o)&&y.push(String(m).padStart(7)),(c||a)&&y.push(String(g).padStart(7)),p&&y.push(` ${p}`),y.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let f of l){let p=B(n,f);try{be(t,p,"wc");let h=e.vfs.readFile(p);d.push(u(h,f))}catch{return{stderr:`wc: ${f}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var y0,S0=k(()=>{"use strict";ee();ae();pa();y0={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:n,shell:r,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Me(n,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(M(n,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(M(n,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,f=M(n,["-q","--quiet"]),p=u==="-"?null:u??cl(l),h=p?B(e,d?`${d}/${p}`:p):null;h&&be(t,h,"wget");let m=[];f||(m.push(`--${new Date().toISOString()}--  ${l}`),m.push(`Resolving ${new URL(l).host}...`),m.push(`Connecting to ${new URL(l).host}...`));let g;try{let v=new URL(l),x=v.port?Number.parseInt(v.port,10):v.protocol==="https:"?443:80,b=li(l,r.resourceCaps?.outboundRestriction);if(b.allowed){let P=r.network.checkFirewall("OUTPUT","tcp",void 0,v.hostname,x);if(P==="DROP"||P==="REJECT")return{stderr:`wget: unable to connect to ${v.hostname}:${x}: Connection refused
`,exitCode:4};g=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}else if(b.honeypot)g=ui(l);else return{stderr:`wget: unable to connect to ${v.hostname}:${x}: Connection refused
`,exitCode:4}}catch(v){let x=v instanceof Error?v.message:String(v);return m.push(`wget: unable to resolve host: ${x}`),{stderr:m.join(`
`),exitCode:4}}if(!g.ok)return m.push(`ERROR ${g.status}: ${g.statusText}`),{stderr:m.join(`
`),exitCode:8};let y;try{y=await g.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!f){let v=g.headers.get("content-type")??"application/octet-stream";m.push(`HTTP request sent, awaiting response... ${g.status} ${g.statusText}`),m.push(`Length: ${y.length} [${v}]`)}return u==="-"?{stdout:y,stderr:m.join(`
`)||void 0,exitCode:0}:h?(r.vfs.writeFile(h,y,{},s,i),f||m.push(`Saving to: '${h}'
${h}            100%[==================>]  ${y.length} B`),{stderr:m.join(`
`)||void 0,exitCode:0}):{stdout:y,exitCode:0}}}});var b0,v0=k(()=>{"use strict";b0={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:n})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let r=(n?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of r){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function Ni(t){let e=t.toLocaleString("en-US",{weekday:"short"}),n=t.toLocaleString("en-US",{month:"short"}),r=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${n} ${r} ${s}:${i}:${o} ${a}`}var Va=k(()=>{"use strict"});var x0,C0=k(()=>{"use strict";Va();x0={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(n=>{let r=new Date(n.startedAt),s=Number.isNaN(r.getTime())?n.startedAt:Ni(r);return`${n.username} ${n.tty} ${s} (${n.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var w0,_0=k(()=>{"use strict";w0={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var I0,E0=k(()=>{"use strict";tt();I0={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:({authUser:t,hostname:e,mode:n,cwd:r,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return xe(d,t,e,n,r,o,void 0,a)}}});var $0,P0=k(()=>{"use strict";$0={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let n=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(n),{exitCode:0}}}});var ly=cb(ie=>{"use strict";ie.deflate=X0;ie.deflateSync=_s;ie.inflate=cc;ie.inflateSync=Ur;ie.gzip=Yi;ie.compress=Yi;ie.gzipSync=Bi;ie.compressSync=Bi;ie.gunzip=Q0;ie.gunzipSync=Wi;ie.zlib=BC;ie.zlibSync=Za;ie.unzlib=ty;ie.unzlibSync=Vi;ie.gzip=Yi;ie.compress=Yi;ie.decompress=WC;ie.decompressSync=jC;ie.strToU8=Cn;ie.strFromU8=uc;ie.zip=KC;ie.zipSync=XC;ie.unzip=ew;ie.unzipSync=tw;var Pr,Ti,Ha,FC=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Pr=ft("worker_threads"),Ti=Pr.Worker,Ha=Pr.isMarkedAsUntransferable}catch{}var N0={};N0.default=Ti?function(t,e,n,r,s){var i=!1,o=new Ti(t+FC,{eval:!0}).on("error",function(a){return s(a,null)}).on("message",function(a){return s(null,a)}).on("exit",function(a){a&&!i&&s(new Error("exited with code "+a),null)});return Ha&&(r=r.filter(function(a){return!Ha(a)})),o.postMessage(n,r),o.terminate=function(){return i=!0,Ti.prototype.terminate.call(o)},o}:function(t,e,n,r,s){setImmediate(function(){return s(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var i=function(){};return{terminate:i,postMessage:i}};var de=Uint8Array,ot=Uint16Array,xs=Int32Array,Nr=new de([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ar=new de([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ss=new de([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),A0=function(t,e){for(var n=new ot(31),r=0;r<31;++r)n[r]=e+=1<<t[r-1];for(var s=new xs(n[30]),r=1;r<30;++r)for(var i=n[r];i<n[r+1];++i)s[i]=i-n[r]<<5|r;return{b:n,r:s}},Pr=A0(Nr,2),ec=Pr.b,Fi=Pr.r;ec[28]=258,Fi[258]=28;var T0=A0(Ar,0),O0=T0.b,qa=T0.r,bs=new ot(32768);for(Ee=0;Ee<32768;++Ee)on=(Ee&43690)>>1|(Ee&21845)<<1,on=(on&52428)>>2|(on&13107)<<2,on=(on&61680)>>4|(on&3855)<<4,bs[Ee]=((on&65280)>>8|(on&255)<<8)>>1;var on,Ee,It=(function(t,e,n){for(var r=t.length,s=0,i=new ot(e);s<r;++s)t[s]&&++i[t[s]-1];var o=new ot(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(n){a=new ot(1<<e);var c=15-e;for(s=0;s<r;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,f=d|(1<<u)-1;d<=f;++d)a[bs[d]>>c]=l}else for(a=new ot(r),s=0;s<r;++s)t[s]&&(a[s]=bs[o[t[s]-1]++]>>15-t[s]);return a}),an=new de(288);for(Ee=0;Ee<144;++Ee)an[Ee]=8;var Ee;for(Ee=144;Ee<256;++Ee)an[Ee]=9;var Ee;for(Ee=256;Ee<280;++Ee)an[Ee]=7;var Ee;for(Ee=280;Ee<288;++Ee)an[Ee]=8;var Ee,kr=new de(32);for(Ee=0;Ee<32;++Ee)kr[Ee]=5;var Ee,R0=It(an,9,0),D0=It(an,9,1),F0=It(kr,5,0),L0=It(kr,5,1),Oi=function(t){for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},_t=function(t,e,n){var r=e/8|0;return(t[r]|t[r+1]<<8)>>(e&7)&n},Ri=function(t,e){var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(e&7)},Tr=function(t){return(t+7)/8|0},Et=function(t,e,n){return(e==null||e<0)&&(e=0),(n==null||n>t.length)&&(n=t.length),new de(t.subarray(e,n))};ie.FlateErrorCode={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14};var U0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ne=function(t,e,n){var r=new Error(e||U0[t]);if(r.code=t,Error.captureStackTrace&&Error.captureStackTrace(r,ne),!n)throw r;return r},Cs=function(t,e,n,r){var s=t.length,i=r?r.length:0;if(!s||e.f&&!e.l)return n||new de(0);var o=!n,a=o||e.i!=2,c=e.i;o&&(n=new de(s*3));var l=function(se){var re=n.length;if(se>re){var ve=new de(Math.max(re*2,se));ve.set(n),n=ve}},u=e.f||0,d=e.p||0,f=e.b||0,p=e.l,h=e.d,m=e.m,g=e.n,y=s*8;do{if(!p){u=_t(t,d,1);var v=_t(t,d+1,3);if(d+=3,v)if(v==1)p=D0,h=L0,m=9,g=5;else if(v==2){var _=_t(t,d,31)+257,w=_t(t,d+10,15)+4,S=_+_t(t,d+5,31)+1;d+=14;for(var C=new de(S),$=new de(19),N=0;N<w;++N)$[Ss[N]]=_t(t,d+N*3,7);d+=w*3;for(var R=Oi($),W=(1<<R)-1,Y=It($,R,1),N=0;N<S;){var Q=Y[_t(t,d,W)];d+=Q&15;var x=Q>>4;if(x<16)C[N++]=x;else{var E=0,A=0;for(x==16?(A=3+_t(t,d,3),d+=2,E=C[N-1]):x==17?(A=3+_t(t,d,7),d+=3):x==18&&(A=11+_t(t,d,127),d+=7);A--;)C[N++]=E}}var I=C.subarray(0,_),D=C.subarray(_);m=Oi(I),g=Oi(D),p=It(I,m,1),h=It(D,g,1)}else ne(1);else{var x=Tr(d)+4,b=t[x-4]|t[x-3]<<8,P=x+b;if(P>s){c&&ne(0);break}a&&l(f+b),n.set(t.subarray(x,P),f),e.b=f+=b,e.p=d=P*8,e.f=u;continue}if(d>y){c&&ne(0);break}}a&&l(f+131072);for(var z=(1<<m)-1,Z=(1<<g)-1,J=d;;J=d){var E=p[Ri(t,d)&z],F=E>>4;if(d+=E&15,d>y){c&&ne(0);break}if(E||ne(2),F<256)n[f++]=F;else if(F==256){J=d,p=null;break}else{var j=F-254;if(F>264){var N=F-257,L=Nr[N];j=_t(t,d,(1<<L)-1)+ec[N],d+=L}var G=h[Ri(t,d)&Z],U=G>>4;G||ne(3),d+=G&15;var D=O0[U];if(U>3){var L=Ar[U];D+=Ri(t,d)&(1<<L)-1,d+=L}if(d>y){c&&ne(0);break}a&&l(f+131072);var H=f+j;if(f<D){var q=i-D,K=Math.min(D,H);for(q+f<0&&ne(3);f<K;++f)n[f]=r[q+f]}for(;f<H;++f)n[f]=n[f-D]}}e.l=p,e.p=J,e.b=f,e.f=u,p&&(u=1,e.m=m,e.d=h,e.n=g)}while(!u);return f!=n.length&&o?Et(n,0,f):n.subarray(0,f)},Vt=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8},Er=function(t,e,n){n<<=e&7;var r=e/8|0;t[r]|=n,t[r+1]|=n>>8,t[r+2]|=n>>16},Di=function(t,e){for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,i=n.slice();if(!s)return{t:Gt,l:0};if(s==1){var o=new de(n[0].s+1);return o[n[0].s]=1,{t:o,l:1}}n.sort(function(P,_){return P.f-_.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,d=2;for(n[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=n[n[l].f<n[d].f?l++:d++],c=n[l!=u&&n[l].f<n[d].f?l++:d++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var f=i[0].s,r=1;r<s;++r)i[r].s>f&&(f=i[r].s);var p=new ot(f+1),h=Li(n[u-1],p,0);if(h>e){var r=0,m=0,g=h-e,y=1<<g;for(i.sort(function(_,w){return p[w.s]-p[_.s]||_.f-w.f});r<s;++r){var v=i[r].s;if(p[v]>e)m+=y-(1<<h-p[v]),p[v]=e;else break}for(m>>=g;m>0;){var x=i[r].s;p[x]<e?m-=1<<e-p[x]++-1:++r}for(;r>=0&&m;--r){var b=i[r].s;p[b]==e&&(--p[b],++m)}h=e}return{t:new de(p),l:h}},Li=function(t,e,n){return t.s==-1?Math.max(Li(t.l,e,n+1),Li(t.r,e,n+1)):e[t.s]=n},Ya=function(t){for(var e=t.length;e&&!t[--e];);for(var n=new ot(++e),r=0,s=t[0],i=1,o=function(c){n[r++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:n.subarray(0,r),n:e}},$r=function(t,e){for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Hi=function(t,e,n){var r=n.length,s=Tr(e+2);t[s]=r&255,t[s+1]=r>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<r;++i)t[s+i+4]=n[i];return(s+4+r)*8},Ka=function(t,e,n,r,s,i,o,a,c,l,u){Vt(e,u++,n),++s[256];for(var d=Di(s,15),f=d.t,p=d.l,h=Di(i,15),m=h.t,g=h.l,y=Ya(f),v=y.c,x=y.n,b=Ya(m),P=b.c,_=b.n,w=new ot(19),S=0;S<v.length;++S)++w[v[S]&31];for(var S=0;S<P.length;++S)++w[P[S]&31];for(var C=Di(w,7),$=C.t,N=C.l,R=19;R>4&&!$[Ss[R-1]];--R);var W=l+5<<3,Y=$r(s,an)+$r(i,kr)+o,Q=$r(s,f)+$r(i,m)+o+14+3*R+$r(w,$)+2*w[16]+3*w[17]+7*w[18];if(c>=0&&W<=Y&&W<=Q)return Hi(e,u,t.subarray(c,c+l));var E,A,I,D;if(Vt(e,u,1+(Q<Y)),u+=2,Q<Y){E=It(f,p,0),A=f,I=It(m,g,0),D=m;var z=It($,N,0);Vt(e,u,x-257),Vt(e,u+5,_-1),Vt(e,u+10,R-4),u+=14;for(var S=0;S<R;++S)Vt(e,u+3*S,$[Ss[S]]);u+=3*R;for(var Z=[v,P],J=0;J<2;++J)for(var F=Z[J],S=0;S<F.length;++S){var j=F[S]&31;Vt(e,u,z[j]),u+=$[j],j>15&&(Vt(e,u,F[S]>>5&127),u+=F[S]>>12)}}else E=R0,A=an,I=F0,D=kr;for(var S=0;S<a;++S){var L=r[S];if(L>255){var j=L>>18&31;Er(e,u,E[j+257]),u+=A[j+257],j>7&&(Vt(e,u,L>>23&31),u+=Nr[j]);var G=L&31;Er(e,u,I[G]),u+=D[G],G>3&&(Er(e,u,L>>5&8191),u+=Ar[G])}else Er(e,u,E[L]),u+=A[L]}return Er(e,u,E[256]),u+A[256]},B0=new xs([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Gt=new de(0),z0=function(t,e,n,r,s,i){var o=i.z||t.length,a=new de(r+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(r,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=B0[e-1],f=d>>13,p=d&8191,h=(1<<n)-1,m=i.p||new ot(32768),g=i.h||new ot(h+1),y=Math.ceil(n/3),v=2*y,x=function(Fe){return(t[Fe]^t[Fe+1]<<y^t[Fe+2]<<v)&h},b=new xs(25e3),P=new ot(288),_=new ot(32),w=0,S=0,C=i.i||0,$=0,N=i.w||0,R=0;C+2<o;++C){var W=x(C),Y=C&32767,Q=g[W];if(m[Y]=Q,g[W]=Y,N<=C){var E=o-C;if((w>7e3||$>24576)&&(E>423||!l)){u=Ka(t,c,0,b,P,_,S,$,R,C-R,u),$=w=S=0,R=C;for(var A=0;A<286;++A)P[A]=0;for(var A=0;A<30;++A)_[A]=0}var I=2,D=0,z=p,Z=Y-Q&32767;if(E>2&&W==x(C-Z))for(var J=Math.min(f,E)-1,F=Math.min(32767,C),j=Math.min(258,E);Z<=F&&--z&&Y!=Q;){if(t[C+I]==t[C+I-Z]){for(var L=0;L<j&&t[C+L]==t[C+L-Z];++L);if(L>I){if(I=L,D=Z,L>J)break;for(var G=Math.min(Z,L-2),U=0,A=0;A<G;++A){var H=C-Z+A&32767,q=m[H],K=H-q&32767;K>U&&(U=K,Q=H)}}}Y=Q,Q=m[Y],Z+=Y-Q&32767}if(D){b[$++]=268435456|Fi[I]<<18|qa[D];var se=Fi[I]&31,re=qa[D]&31;S+=Nr[se]+Ar[re],++P[257+se],++_[re],N=C+I,++w}else b[$++]=t[C],++P[t[C]]}}for(C=Math.max(C,N);C<o;++C)b[$++]=t[C],++P[t[C]];u=Ka(t,c,l,b,P,_,S,$,R,C-R,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=g,i.p=m,i.i=C,i.w=N)}else{for(var C=i.w||0;C<o+l;C+=65535){var ve=C+65535;ve>=o&&(c[u/8|0]=l,ve=o),u=Hi(c,u+1,t.subarray(C,ve))}i.i=o}return Et(a,0,r+Tr(u)+s)},W0=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var n=e,r=9;--r;)n=(n&1&&-306674912)^n>>>1;t[e]=n}return t})(),Or=function(){var t=-1;return{p:function(e){for(var n=t,r=0;r<e.length;++r)n=W0[n&255^e[r]]^n>>>8;t=n},d:function(){return~t}}},qi=function(){var t=1,e=0;return{p:function(n){for(var r=t,s=e,i=n.length|0,o=0;o!=i;){for(var a=Math.min(o+2655,i);o<a;++o)s+=r+=n[o];r=(r&65535)+15*(r>>16),s=(s&65535)+15*(s>>16)}t=r,e=s},d:function(){return t%=65521,e%=65521,(t&255)<<24|(t&65280)<<8|(e&255)<<8|e>>8}}},Gn=function(t,e,n,r,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new de(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return z0(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,n,r,s)},ws=function(t,e){var n={};for(var r in t)n[r]=t[r];for(var r in e)n[r]=e[r];return n},k0=function(t,e,n){for(var r=t(),s=t.toString(),i=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<r.length;++o){var a=r[o],c=i[o];if(typeof a=="function"){e+=";"+c+"=";var l=a.toString();if(a.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;e+=l.slice(u,l.indexOf("(",u))}else{e+=l;for(var d in a.prototype)e+=";"+c+".prototype."+d+"="+a.prototype[d].toString()}else e+=l}else n[c]=a}return e},Ai=[],LC=function(t){var e=[];for(var n in t)t[n].buffer&&e.push((t[n]=new t[n].constructor(t[n])).buffer);return e},j0=function(t,e,n,r){if(!Ai[n]){for(var s="",i={},o=t.length-1,a=0;a<o;++a)s=k0(t[a],s,i);Ai[n]={c:k0(t[o],s,i),e:i}}var c=ws({},Ai[n].e);return(0,N0.default)(Ai[n].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",n,c,LC(c),r)},Rr=function(){return[de,ot,xs,Nr,Ar,Ss,ec,O0,D0,L0,bs,U0,It,Oi,_t,Ri,Tr,Et,ne,Cs,Ur,wn,tc]},Dr=function(){return[de,ot,xs,Nr,Ar,Ss,Fi,qa,R0,an,F0,kr,bs,B0,Gt,It,Vt,Er,Di,Li,Ya,$r,Hi,Ka,Tr,Et,z0,Gn,_s,wn]},V0=function(){return[nc,sc,Ie,Or,W0]},G0=function(){return[rc,Y0]},H0=function(){return[ic,Ie,qi]},q0=function(){return[oc]},wn=function(t){return postMessage(t,[t.buffer])},tc=function(t){return t&&{out:t.size&&new de(t.size),dictionary:t.dictionary}},Fr=function(t,e,n,r,s,i){var o=j0(n,r,s,function(a,c){o.terminate(),i(a,c)});return o.postMessage([t,e],e.consume?[t.buffer]:[]),function(){o.terminate()}},Pt=function(t){return t.ondata=function(e,n){return postMessage([e,n],[e.buffer])},function(e){e.data[0]?(t.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):t.flush(e.data[1])}},Lr=function(t,e,n,r,s,i,o){var a,c=j0(t,r,s,function(l,u){l?(c.terminate(),e.ondata.call(e,l)):Array.isArray(u)?u.length==1?(e.queuedSize-=u[0],e.ondrain&&e.ondrain(u[0])):(u[1]&&c.terminate(),e.ondata.call(e,l,u[0],u[1])):o(u)});c.postMessage(n),e.queuedSize=0,e.push=function(l,u){e.ondata||ne(5),a&&e.ondata(ne(4,0,1),null,!!u),e.queuedSize+=l.length,c.postMessage([l,a=u],l.buffer instanceof ArrayBuffer?[l.buffer]:[])},e.terminate=function(){c.terminate()},i&&(e.flush=function(l){c.postMessage([0,l])})},it=function(t,e){return t[e]|t[e+1]<<8},Ue=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},Ga=function(t,e){return Ue(t,e)+Ue(t,e+4)*4294967296},Ie=function(t,e,n){for(;n;++e)t[e]=n,n>>>=8},nc=function(t,e){var n=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&Ie(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),n){t[3]=8;for(var r=0;r<=n.length;++r)t[r+10]=n.charCodeAt(r)}},rc=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&ne(6,"invalid gzip data");var e=t[3],n=10;e&4&&(n+=(t[10]|t[11]<<8)+2);for(var r=(e>>3&1)+(e>>4&1);r>0;r-=!t[n++]);return n+(e&2)},Y0=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},sc=function(t){return 10+(t.filename?t.filename.length+1:0)},ic=function(t,e){var n=e.level,r=n==0?0:n<6?1:n==9?3:2;if(t[0]=120,t[1]=r<<6|(e.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,e.dictionary){var s=qi();s.p(e.dictionary),Ie(t,2,s.d())}},oc=function(t,e){return((t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31)&&ne(6,"invalid zlib data"),(t[1]>>5&1)==+!e&&ne(6,"invalid zlib data: "+(t[1]&32?"need":"unexpected")+" dictionary"),(t[1]>>3&4)+2};function Hn(t,e){return typeof t=="function"&&(e=t,t={}),this.ondata=e,t}var $t=(function(){function t(e,n){if(typeof e=="function"&&(n=e,e={}),this.ondata=n,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new de(98304),this.o.dictionary){var r=this.o.dictionary.subarray(-32768);this.b.set(r,32768-r.length),this.s.i=32768-r.length}}return t.prototype.p=function(e,n){this.ondata(Gn(e,this.o,0,0,this.s),n)},t.prototype.push=function(e,n){this.ondata||ne(5),this.s.l&&ne(4);var r=e.length+this.s.z;if(r>this.b.length){if(r>2*this.b.length-32768){var s=new de(r&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var i=this.b.length-this.s.z;this.b.set(e.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(i),32768),this.s.z=e.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=n&1,(this.s.z>this.s.w+8191||n)&&(this.p(this.b,n||!1),this.s.w=this.s.i,this.s.i-=2),n&&(this.s=this.o={},this.b=Gt)},t.prototype.flush=function(e){if(this.ondata||ne(5),this.s.l&&ne(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var n=new de(6);n[0]=this.s.r>>3;var r=Hi(n,this.s.r,Gt);this.s.r=0,this.ondata(n.subarray(0,r>>3),!1)}},t})();ie.Deflate=$t;var K0=(function(){function t(e,n){Lr([Dr,function(){return[Pt,$t]}],this,Hn.call(this,e,n),function(r){var s=new $t(r.data);onmessage=Pt(s)},6,1)}return t})();ie.AsyncDeflate=K0;function X0(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Dr],function(r){return wn(_s(r.data[0],r.data[1]))},0,n)}function _s(t,e){return Gn(t,e||{},0,0)}var at=(function(){function t(e,n){typeof e=="function"&&(n=e,e={}),this.ondata=n;var r=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:r?r.length:0},this.o=new de(32768),this.p=new de(0),r&&this.o.set(r)}return t.prototype.e=function(e){if(this.ondata||ne(5),this.d&&ne(4),!this.p.length)this.p=e;else if(e.length){var n=new de(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length),this.p=n}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var n=this.s.b,r=Cs(this.p,this.s,this.o);this.ondata(Et(r,n,this.s.b),this.d),this.o=Et(r,this.s.b-32768),this.s.b=this.o.length,this.p=Et(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,n){this.e(e),this.c(n)},t})();ie.Inflate=at;var ac=(function(){function t(e,n){Lr([Rr,function(){return[Pt,at]}],this,Hn.call(this,e,n),function(r){var s=new at(r.data);onmessage=Pt(s)},7,0)}return t})();ie.AsyncInflate=ac;function cc(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Rr],function(r){return wn(Ur(r.data[0],tc(r.data[1])))},1,n)}function Ur(t,e){return Cs(t,{i:2},e&&e.out,e&&e.dictionary)}var Ui=(function(){function t(e,n){this.c=Or(),this.l=0,this.v=1,$t.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),this.l+=e.length,$t.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=Gn(e,this.o,this.v&&sc(this.o),n&&8,this.s);this.v&&(nc(r,this.o),this.v=0),n&&(Ie(r,r.length-8,this.c.d()),Ie(r,r.length-4,this.l)),this.ondata(r,n)},t.prototype.flush=function(e){$t.prototype.flush.call(this,e)},t})();ie.Gzip=Ui;ie.Compress=Ui;var Z0=(function(){function t(e,n){Lr([Dr,V0,function(){return[Pt,$t,Ui]}],this,Hn.call(this,e,n),function(r){var s=new Ui(r.data);onmessage=Pt(s)},8,1)}return t})();ie.AsyncGzip=Z0;ie.AsyncCompress=Z0;function Yi(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Dr,V0,function(){return[Bi]}],function(r){return wn(Bi(r.data[0],r.data[1]))},2,n)}function Bi(t,e){e||(e={});var n=Or(),r=t.length;n.p(t);var s=Gn(t,e,sc(e),8),i=s.length;return nc(s,e),Ie(s,i-8,n.d()),Ie(s,i-4,r),s}var zi=(function(){function t(e,n){this.v=1,this.r=0,at.call(this,e,n)}return t.prototype.push=function(e,n){if(at.prototype.e.call(this,e),this.r+=e.length,this.v){var r=this.p.subarray(this.v-1),s=r.length>3?rc(r):4;if(s>r.length){if(!n)return}else this.v>1&&this.onmember&&this.onmember(this.r-r.length);this.p=r.subarray(s),this.v=0}at.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=Tr(this.s.p)+9,this.s={i:0},this.o=new de(0),this.push(new de(0),n)):n&&at.prototype.c.call(this,n)},t})();ie.Gunzip=zi;var J0=(function(){function t(e,n){var r=this;Lr([Rr,G0,function(){return[Pt,at,zi]}],this,Hn.call(this,e,n),function(s){var i=new zi(s.data);i.onmember=function(o){return postMessage(o)},onmessage=Pt(i)},9,0,function(s){return r.onmember&&r.onmember(s)})}return t})();ie.AsyncGunzip=J0;function Q0(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Rr,G0,function(){return[Wi]}],function(r){return wn(Wi(r.data[0],r.data[1]))},3,n)}function Wi(t,e){var n=rc(t);return n+8>t.length&&ne(6,"invalid gzip data"),Cs(t.subarray(n,-8),{i:2},e&&e.out||new de(Y0(t)),e&&e.dictionary)}var Xa=(function(){function t(e,n){this.c=qi(),this.v=1,$t.call(this,e,n)}return t.prototype.push=function(e,n){this.c.p(e),$t.prototype.push.call(this,e,n)},t.prototype.p=function(e,n){var r=Gn(e,this.o,this.v&&(this.o.dictionary?6:2),n&&4,this.s);this.v&&(ic(r,this.o),this.v=0),n&&Ie(r,r.length-4,this.c.d()),this.ondata(r,n)},t.prototype.flush=function(e){$t.prototype.flush.call(this,e)},t})();ie.Zlib=Xa;var UC=(function(){function t(e,n){Lr([Dr,H0,function(){return[Pt,$t,Xa]}],this,Hn.call(this,e,n),function(r){var s=new Xa(r.data);onmessage=Pt(s)},10,1)}return t})();ie.AsyncZlib=UC;function BC(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Dr,H0,function(){return[Za]}],function(r){return wn(Za(r.data[0],r.data[1]))},4,n)}function Za(t,e){e||(e={});var n=qi();n.p(t);var r=Gn(t,e,e.dictionary?6:2,4);return ic(r,e),Ie(r,r.length-4,n.d()),r}var ji=(function(){function t(e,n){at.call(this,e,n),this.v=e&&e.dictionary?2:1}return t.prototype.push=function(e,n){if(at.prototype.e.call(this,e),this.v){if(this.p.length<6&&!n)return;this.p=this.p.subarray(oc(this.p,this.v-1)),this.v=0}n&&(this.p.length<4&&ne(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),at.prototype.c.call(this,n)},t})();ie.Unzlib=ji;var ey=(function(){function t(e,n){Lr([Rr,q0,function(){return[Pt,at,ji]}],this,Hn.call(this,e,n),function(r){var s=new ji(r.data);onmessage=Pt(s)},11,0)}return t})();ie.AsyncUnzlib=ey;function ty(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),Fr(t,e,[Rr,q0,function(){return[Vi]}],function(r){return wn(Vi(r.data[0],tc(r.data[1])))},5,n)}function Vi(t,e){return Cs(t.subarray(oc(t,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}var Ja=(function(){function t(e,n){this.o=Hn.call(this,e,n)||{},this.G=zi,this.I=at,this.Z=ji}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r){e.ondata(n,r)}},t.prototype.push=function(e,n){if(this.ondata||ne(5),this.s)this.s.push(e,n);else{if(this.p&&this.p.length){var r=new de(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,n),this.p=null)}},t})();ie.Decompress=Ja;var zC=(function(){function t(e,n){Ja.call(this,e,n),this.queuedSize=0,this.G=J0,this.I=ac,this.Z=ey}return t.prototype.i=function(){var e=this;this.s.ondata=function(n,r,s){e.ondata(n,r,s)},this.s.ondrain=function(n){e.queuedSize-=n,e.ondrain&&e.ondrain(n)}},t.prototype.push=function(e,n){this.queuedSize+=e.length,Ja.prototype.push.call(this,e,n)},t})();ie.AsyncDecompress=zC;function WC(t,e,n){return n||(n=e,e={}),typeof n!="function"&&ne(7),t[0]==31&&t[1]==139&&t[2]==8?Q0(t,e,n):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?cc(t,e,n):ty(t,e,n)}function jC(t,e){return t[0]==31&&t[1]==139&&t[2]==8?Wi(t,e):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?Ur(t,e):Vi(t,e)}var lc=function(t,e,n,r){for(var s in t){var i=t[s],o=e+s,a=r;Array.isArray(i)&&(a=ws(r,i[1]),i=i[0]),ArrayBuffer.isView(i)?n[o]=[i,a]:(n[o+="/"]=[new de(0),a],lc(i,o,n,r))}},M0=typeof TextEncoder<"u"&&new TextEncoder,Qa=typeof TextDecoder<"u"&&new TextDecoder,ny=0;try{Qa.decode(Gt,{stream:!0}),ny=1}catch{}var ry=function(t){for(var e="",n=0;;){var r=t[n++],s=(r>127)+(r>223)+(r>239);if(n+s>t.length)return{s:e,r:Et(t,n-1)};s?s==3?(r=((r&15)<<18|(t[n++]&63)<<12|(t[n++]&63)<<6|t[n++]&63)-65536,e+=String.fromCharCode(55296|r>>10,56320|r&1023)):s&1?e+=String.fromCharCode((r&31)<<6|t[n++]&63):e+=String.fromCharCode((r&15)<<12|(t[n++]&63)<<6|t[n++]&63):e+=String.fromCharCode(r)}},VC=(function(){function t(e){this.ondata=e,ny?this.t=new TextDecoder:this.p=Gt}return t.prototype.push=function(e,n){if(this.ondata||ne(5),n=!!n,this.t){this.ondata(this.t.decode(e,{stream:!0}),n),n&&(this.t.decode().length&&ne(8),this.t=null);return}this.p||ne(4);var r=new de(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length);var s=ry(r),i=s.s,o=s.r;n?(o.length&&ne(8),this.p=null):this.p=o,this.ondata(i,n)},t})();ie.DecodeUTF8=VC;var GC=(function(){function t(e){this.ondata=e}return t.prototype.push=function(e,n){this.ondata||ne(5),this.d&&ne(4),this.ondata(Cn(e),this.d=n||!1)},t})();ie.EncodeUTF8=GC;function Cn(t,e){if(e){for(var n=new de(t.length),r=0;r<t.length;++r)n[r]=t.charCodeAt(r);return n}if(M0)return M0.encode(t);for(var s=t.length,i=new de(t.length+(t.length>>1)),o=0,a=function(u){i[o++]=u},r=0;r<s;++r){if(o+5>i.length){var c=new de(o+8+(s-r<<1));c.set(i),i=c}var l=t.charCodeAt(r);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++r)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return Et(i,0,o)}function uc(t,e){if(e){for(var n="",r=0;r<t.length;r+=16384)n+=String.fromCharCode.apply(null,t.subarray(r,r+16384));return n}else{if(Qa)return Qa.decode(t);var s=ry(t),i=s.s,n=s.r;return n.length&&ne(8),i}}var sy=function(t){return t==1?3:t<6?2:t==9?1:0},iy=function(t,e){return e+30+it(t,e+26)+it(t,e+28)},oy=function(t,e,n){var r=it(t,e+28),s=it(t,e+30),i=uc(t.subarray(e+46,e+46+r),!(it(t,e+8)&2048)),o=e+46+r,a=ay(t,o,s,n,Ue(t,e+20),Ue(t,e+24),Ue(t,e+42)),c=a[0],l=a[1],u=a[2];return[it(t,e+10),c,l,i,o+s+it(t,e+32),u]},ay=function(t,e,n,r,s,i,o){var a=s==4294967295,c=i==4294967295,l=o==4294967295,u=e+n,d=a+c+l;if(r&&d){for(;e+4<u;e+=4+it(t,e+2))if(it(t,e)==1)return[a?Ga(t,e+4+8*c):s,c?Ga(t,e+4):i,l?Ga(t,e+4+8*(c+a)):o,1];r<2&&ne(13)}return[s,i,o,0]},xn=function(t){var e=0;if(t)for(var n in t){var r=t[n].length;r>65535&&ne(9),e+=r+4}return e},Mr=function(t,e,n,r,s,i,o,a){var c=r.length,l=n.extra,u=a&&a.length,d=xn(l);Ie(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=n.os),t[e]=20,e+=2,t[e++]=n.flag<<1|(i<0&&8),t[e++]=s&&8,t[e++]=n.compression&255,t[e++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),p=f.getFullYear()-1980;if((p<0||p>119)&&ne(10),Ie(t,e,p<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),e+=4,i!=-1&&(Ie(t,e,n.crc),Ie(t,e+4,i<0?-i-2:i),Ie(t,e+8,n.size)),Ie(t,e+12,c),Ie(t,e+14,d),e+=16,o!=null&&(Ie(t,e,u),Ie(t,e+6,n.attrs),Ie(t,e+10,o),e+=14),t.set(r,e),e+=c,d)for(var h in l){var m=l[h],g=m.length;Ie(t,e,+h),Ie(t,e+2,g),t.set(m,e+4),e+=4+g}return u&&(t.set(a,e),e+=u),e},dc=function(t,e,n,r,s){Ie(t,e,101010256),Ie(t,e+8,n),Ie(t,e+10,n),Ie(t,e+12,r),Ie(t,e+16,s)},vs=(function(){function t(e){this.filename=e,this.c=Or(),this.size=0,this.compression=0}return t.prototype.process=function(e,n){this.ondata(null,e,n)},t.prototype.push=function(e,n){this.ondata||ne(5),this.c.p(e),this.size+=e.length,n&&(this.crc=this.c.d()),this.process(e,n||!1)},t})();ie.ZipPassThrough=vs;var HC=(function(){function t(e,n){var r=this;n||(n={}),vs.call(this,e),this.d=new $t(n,function(s,i){r.ondata(null,s,i)}),this.compression=8,this.flag=sy(n.level)}return t.prototype.process=function(e,n){try{this.d.push(e,n)}catch(r){this.ondata(r,null,n)}},t.prototype.push=function(e,n){vs.prototype.push.call(this,e,n)},t})();ie.ZipDeflate=HC;var qC=(function(){function t(e,n){var r=this;n||(n={}),vs.call(this,e),this.d=new K0(n,function(s,i,o){r.ondata(s,i,o)}),this.compression=8,this.flag=sy(n.level),this.terminate=this.d.terminate}return t.prototype.process=function(e,n){this.d.push(e,n)},t.prototype.push=function(e,n){vs.prototype.push.call(this,e,n)},t})();ie.AsyncZipDeflate=qC;var YC=(function(){function t(e){this.ondata=e,this.u=[],this.d=1}return t.prototype.add=function(e){var n=this;if(this.ondata||ne(5),this.d&2)this.ondata(ne(4+(this.d&1)*8,0,1),null,!1);else{var r=Cn(e.filename),s=r.length,i=e.comment,o=i&&Cn(i),a=s!=e.filename.length||o&&i.length!=o.length,c=s+xn(e.extra)+30;s>65535&&this.ondata(ne(11,0,1),null,!1);var l=new de(c);Mr(l,0,e,r,a,-1);var u=[l],d=function(){for(var g=0,y=u;g<y.length;g++){var v=y[g];n.ondata(null,v,!1)}u=[]},f=this.d;this.d=0;var p=this.u.length,h=ws(e,{f:r,u:a,o,t:function(){e.terminate&&e.terminate()},r:function(){if(d(),f){var g=n.u[p+1];g?g.r():n.d=1}f=1}}),m=0;e.ondata=function(g,y,v){if(g)n.ondata(g,y,v),n.terminate();else if(m+=y.length,u.push(y),v){var x=new de(16);Ie(x,0,134695760),Ie(x,4,e.crc),Ie(x,8,m),Ie(x,12,e.size),u.push(x),h.c=m,h.b=c+m+16,h.crc=e.crc,h.size=e.size,f&&h.r(),f=1}else f&&d()},this.u.push(h)}},t.prototype.end=function(){var e=this;if(this.d&2){this.ondata(ne(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var e=0,n=0,r=0,s=0,i=this.u;s<i.length;s++){var o=i[s];r+=46+o.f.length+xn(o.extra)+(o.o?o.o.length:0)}for(var a=new de(r+22),c=0,l=this.u;c<l.length;c++){var o=l[c];Mr(a,e,o,o.f,o.u,-o.c-2,n,o.o),e+=46+o.f.length+xn(o.extra)+(o.o?o.o.length:0),n+=o.b}dc(a,e,this.u.length,r,n),this.ondata(null,a,!0),this.d=2},t.prototype.terminate=function(){for(var e=0,n=this.u;e<n.length;e++){var r=n[e];r.t()}this.d=2},t})();ie.Zip=YC;function KC(t,e,n){n||(n=e,e={}),typeof n!="function"&&ne(7);var r={};lc(t,"",r,e);var s=Object.keys(r),i=s.length,o=0,a=0,c=i,l=new Array(i),u=[],d=function(){for(var g=0;g<u.length;++g)u[g]()},f=function(g,y){Gi(function(){n(g,y)})};Gi(function(){f=n});var p=function(){var g=new de(a+22),y=o,v=a-o;a=0;for(var x=0;x<c;++x){var b=l[x];try{var P=b.c.length;Mr(g,a,b,b.f,b.u,P);var _=30+b.f.length+xn(b.extra),w=a+_;g.set(b.c,w),Mr(g,o,b,b.f,b.u,P,a,b.m),o+=16+_+(b.m?b.m.length:0),a=w+P}catch(S){return f(S,null)}}dc(g,o,l.length,v,y),f(null,g)};i||p();for(var h=function(g){var y=s[g],v=r[y],x=v[0],b=v[1],P=Or(),_=x.length;P.p(x);var w=Cn(y),S=w.length,C=b.comment,$=C&&Cn(C),N=$&&$.length,R=xn(b.extra),W=b.level==0?0:8,Y=function(Q,E){if(Q)d(),f(Q,null);else{var A=E.length;l[g]=ws(b,{size:_,crc:P.d(),c:E,f:w,m:$,u:S!=y.length||$&&C.length!=N,compression:W}),o+=30+S+R+A,a+=76+2*(S+R)+(N||0)+A,--i||p()}};if(S>65535&&Y(ne(11,0,1),null),!W)Y(null,x);else if(_<16e4)try{Y(null,_s(x,b))}catch(Q){Y(Q,null)}else u.push(X0(x,b,Y))},m=0;m<c;++m)h(m);return d}function XC(t,e){e||(e={});var n={},r=[];lc(t,"",n,e);var s=0,i=0;for(var o in n){var a=n[o],c=a[0],l=a[1],u=l.level==0?0:8,d=Cn(o),f=d.length,p=l.comment,h=p&&Cn(p),m=h&&h.length,g=xn(l.extra);f>65535&&ne(11);var y=u?_s(c,l):c,v=y.length,x=Or();x.p(c),r.push(ws(l,{size:c.length,crc:x.d(),c:y,f:d,m:h,u:f!=o.length||h&&p.length!=m,o:s,compression:u})),s+=30+f+g+v,i+=76+2*(f+g)+(m||0)+v}for(var b=new de(i+22),P=s,_=i-s,w=0;w<r.length;++w){var d=r[w];Mr(b,d.o,d,d.f,d.u,d.c.length);var S=30+d.f.length+xn(d.extra);b.set(d.c,d.o+S),Mr(b,s,d,d.f,d.u,d.c.length,d.o,d.m),s+=16+S+(d.m?d.m.length:0)}return dc(b,s,r.length,_,P),b}var cy=(function(){function t(){}return t.prototype.push=function(e,n){this.ondata(null,e,n)},t.compression=0,t})();ie.UnzipPassThrough=cy;var ZC=(function(){function t(){var e=this;this.i=new at(function(n,r){e.ondata(null,n,r)})}return t.prototype.push=function(e,n){try{this.i.push(e,n)}catch(r){this.ondata(r,null,n)}},t.compression=8,t})();ie.UnzipInflate=ZC;var JC=(function(){function t(e,n){var r=this;n<32e4?this.i=new at(function(s,i){r.ondata(null,s,i)}):(this.i=new ac(function(s,i,o){r.ondata(s,i,o)}),this.terminate=this.i.terminate)}return t.prototype.push=function(e,n){this.i.terminate&&(e=Et(e,0)),this.i.push(e,n)},t.compression=8,t})();ie.AsyncUnzipInflate=JC;var QC=(function(){function t(e){this.onfile=e,this.k=[],this.o={0:cy},this.p=Gt}return t.prototype.push=function(e,n){var r=this;if(this.onfile||ne(5),this.p||ne(4),this.c>0){var s=Math.min(this.c,e.length),i=e.subarray(0,s);if(this.c-=s,this.d?this.d.push(i,!this.c):this.k[0].push(i),e=e.subarray(s),e.length)return this.push(e,n)}else{var o=0,a=0,c=void 0,l=void 0;this.p.length?e.length?(l=new de(this.p.length+e.length),l.set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var u=l.length,d=this.c,f=d&&this.d,p=function(){var y=Ue(l,a);if(y==67324752){o=1,c=a,h.d=null,h.c=0;var v=it(l,a+6),x=it(l,a+8),b=v&2048,P=v&8,_=it(l,a+26),w=it(l,a+28);if(u>a+30+_+w){var S=[];h.k.unshift(S),o=2;var C=Ue(l,a+18),$=Ue(l,a+22),N=uc(l.subarray(a+30,a+=30+_),!b),R=ay(l,a,w,2,C,$,0),W=R[0],Y=R[1],Q=R[3];P&&(W=-1-Q),a+=w,h.c=W;var E,A={name:N,compression:x,start:function(){if(A.ondata||ne(5),!W)A.ondata(null,Gt,!0);else{var I=r.o[x];I||A.ondata(ne(14,"unknown compression type "+x,1),null,!1),E=W<0?new I(N):new I(N,W,Y),E.ondata=function(J,F,j){A.ondata(J,F,j)};for(var D=0,z=S;D<z.length;D++){var Z=z[D];E.push(Z,!1)}r.k[0]==S&&r.c?r.d=E:E.push(Gt,!0)}},terminate:function(){E&&E.terminate&&E.terminate()}};W>=0&&(A.size=W,A.originalSize=Y),h.onfile(A)}return"break"}else if(d){if(y==134695760)return c=a+=12+(d==-2&&8),o=3,h.c=0,"break";if(y==33639248)return c=a-=4,o=3,h.c=0,"break"}},h=this;a<u-4;++a){var m=p();if(m==="break")break}if(this.p=Gt,d<0){var g=o?l.subarray(0,c-12-(d==-2&&8)-(Ue(l,c-16)==134695760&&4)):l.subarray(0,a);f?f.push(g,!!o):this.k[+(o==2)].push(g)}if(o&2)return this.push(l.subarray(a),n);this.p=l.subarray(a)}n&&(this.c&&ne(13),this.p=null)},t.prototype.register=function(e){this.o[e.compression]=e},t})();ie.Unzip=QC;var Gi=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()};function ew(t,e,n){n||(n=e,e={}),typeof n!="function"&&ne(7);var r=[],s=function(){for(var g=0;g<r.length;++g)r[g]()},i={},o=function(g,y){Gi(function(){n(g,y)})};Gi(function(){o=n});for(var a=t.length-22;Ue(t,a)!=101010256;--a)if(!a||t.length-a>65558)return o(ne(13,0,1),null),s;var c=it(t,a+8);if(c){var l=c,u=Ue(t,a+16),d=Ue(t,a-20)==117853008;if(d){var f=Ue(t,a-12);d=Ue(t,f)==101075792,d&&(l=c=Ue(t,f+32),u=Ue(t,f+48))}for(var p=e&&e.filter,h=function(g){var y=oy(t,u,d),v=y[0],x=y[1],b=y[2],P=y[3],_=y[4],w=y[5],S=iy(t,w);u=_;var C=function(N,R){N?(s(),o(N,null)):(R&&(i[P]=R),--c||o(null,i))};if(!p||p({name:P,size:x,originalSize:b,compression:v}))if(!v)C(null,Et(t,S,S+x));else if(v==8){var $=t.subarray(S,S+x);if(b<524288||x>.8*b)try{C(null,Ur($,{out:new de(b)}))}catch(N){C(N,null)}else r.push(cc($,{size:b},C))}else C(ne(14,"unknown compression type "+v,1),null);else C(null,null)},m=0;m<l;++m)h(m)}else o(null,{});return s}function tw(t,e){for(var n={},r=t.length-22;Ue(t,r)!=101010256;--r)(!r||t.length-r>65558)&&ne(13);var s=it(t,r+8);if(!s)return{};var i=Ue(t,r+16),o=Ue(t,r-20)==117853008;if(o){var a=Ue(t,r-12);o=Ue(t,a)==101075792,o&&(s=Ue(t,a+32),i=Ue(t,a+48))}for(var c=e&&e.filter,l=0;l<s;++l){var u=oy(t,i,o),d=u[0],f=u[1],p=u[2],h=u[3],m=u[4],g=u[5],y=iy(t,g);i=m,(!c||c({name:h,size:f,originalSize:p,compression:d}))&&(d?d==8?n[h]=Ur(t.subarray(y,y+f),{out:new de(p)}):ne(14,"unknown compression type "+d):n[h]=Et(t,y,y+f))}return n}});function nw(){if(!uy)throw new Error("zip/unzip: fflate module is required for ZIP compression. Install it with: npm install fflate")}function sw(t){let e=4294967295;for(let n=0;n<t.length;n++)e=(rw[(e^t[n])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function iw(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function ow(t){nw();let e=[],n=[],r=0,[s,i]=iw();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(dy(l,{level:6})),f=d.length<l.length,p=f?d:l,h=sw(l),m=f?8:0,g=Buffer.alloc(30+u.length);g.writeUInt32LE(67324752,0),g.writeUInt16LE(20,4),g.writeUInt16LE(2048,6),g.writeUInt16LE(m,8),g.writeUInt16LE(s,10),g.writeUInt16LE(i,12),g.writeUInt32LE(h,14),g.writeUInt32LE(p.length,18),g.writeUInt32LE(l.length,22),g.writeUInt16LE(u.length,26),g.writeUInt16LE(0,28),u.copy(g,30);let y=Buffer.alloc(46+u.length);y.writeUInt32LE(33639248,0),y.writeUInt16LE(20,4),y.writeUInt16LE(20,6),y.writeUInt16LE(2048,8),y.writeUInt16LE(m,10),y.writeUInt16LE(s,12),y.writeUInt16LE(i,14),y.writeUInt32LE(h,16),y.writeUInt32LE(p.length,20),y.writeUInt32LE(l.length,24),y.writeUInt16LE(u.length,28),y.writeUInt16LE(0,30),y.writeUInt16LE(0,32),y.writeUInt16LE(0,34),y.writeUInt16LE(0,36),y.writeUInt32LE(2175008768,38),y.writeUInt32LE(r,42),u.copy(y,46),e.push(g,p),n.push(y),r+=g.length+p.length}let o=Buffer.concat(n),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(r,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function aw(t){let e=[],n=0;for(;n+4<=t.length;){let r=t.readUInt32LE(n);if(r===33639248||r===101010256)break;if(r!==67324752){n++;continue}let s=t.readUInt16LE(n+8),i=t.readUInt32LE(n+18),o=t.readUInt32LE(n+22),a=t.readUInt16LE(n+26),c=t.readUInt16LE(n+28),l=t.subarray(n+30,n+30+a).toString("utf8"),u=n+30+a+c,d=t.subarray(u,u+i),f;if(s===8)try{f=Buffer.from(fy(d))}catch{f=d}else f=d;l&&!l.endsWith("/")&&(f.length===o||s!==0?e.push({name:l,content:f}):e.push({name:l,content:f})),n=u+i}return e}var uy,dy,fy,rw,py,my,hy=k(()=>{"use strict";ae();uy=!0;try{let t=ly();dy=t.deflateSync,fy=t.inflateSync}catch{uy=!1}rw=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let n=e;for(let r=0;r<8;r++)n=n&1?3988292384^n>>>1:n>>>1;t[e]=n}return t})();py={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-r")||n.includes("-R"),i=n.filter(h=>!h.startsWith("-")),o=i[0],a=i.slice(1);if(!o)return{stderr:"zip: no archive specified",exitCode:1};if(a.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let c=B(e,o.endsWith(".zip")?o:`${o}.zip`),l=[],u=[],d=t.users.getUid(r),f=t.users.getGid(r);for(let h of a){let m=B(e,h);if(!t.vfs.exists(m))return{stderr:`zip warning: name not matched: ${h}`,exitCode:12};let g=t.vfs.stat(m),y=h.startsWith("/")?h.slice(1):h;if(g.type==="file"){let v=t.vfs.readFileRaw(m);l.push({name:y,content:v}),u.push(`  adding: ${h} (deflated)`)}else if(s){let v=(x,b)=>{for(let P of t.vfs.list(x)){let _=`${x}/${P}`,w=`${b}/${P}`;if(t.vfs.stat(_).type==="directory")v(_,w);else{let C=t.vfs.readFileRaw(_);l.push({name:w.startsWith("/")?w.slice(1):w,content:C}),u.push(`  adding: ${w} (deflated)`)}}};v(m,y)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let p=ow(l);return t.vfs.writeFile(c,p,{},d,f),{stdout:u.join(`
`),exitCode:0}}},my={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:n,authUser:r})=>{let s=n.includes("-l"),i=n.indexOf("-d"),o=i===-1?void 0:n[i+1],a=n.find(m=>!m.startsWith("-")&&m!==o);if(!a)return{stderr:"unzip: missing archive operand",exitCode:1};let c=B(e,a);if(!t.vfs.exists(c))return{stderr:`unzip: cannot find or open ${a}`,exitCode:9};let l=t.vfs.readFileRaw(c),u;try{u=aw(l)}catch(m){return{stderr:`unzip: ${a}: not a valid ZIP file: ${m instanceof Error?m.message:String(m)}`,exitCode:1}}let d=o?B(e,o):e,f=t.users.getUid(r),p=t.users.getGid(r);if(s){let m=`Archive:  ${a}
  Length      Date    Time    Name
---------  ---------- -----   ----`,g=u.map(x=>`  ${String(x.content.length).padStart(8)}  2024-01-01 00:00   ${x.name}`),y=u.reduce((x,b)=>x+b.content.length,0),v=`---------                     -------
  ${String(y).padStart(8)}                     ${u.length} file${u.length===1?"":"s"}`;return{stdout:`${m}
${g.join(`
`)}
${v}`,exitCode:0}}let h=[`Archive:  ${a}`];for(let{name:m,content:g}of u){let y=m.startsWith("/")?m.slice(1):m,v=B(d,y);t.vfs.writeFile(v,g,{},f,p),h.push(`  inflating: ${v}`)}return{stdout:h.join(`
`),exitCode:0}}}});var gy,yy=k(()=>{"use strict";ee();gy={name:"arp",description:"Display or modify the ARP cache",category:"network",params:["[-n] [-d <host>] [-s <host> <mac>]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: arp [-n] [-d <host>] [-s <host> <mac>]","  -n          Show numerical addresses","  -d <host>   Delete ARP entry","  -s <host> <mac>  Add ARP entry","  -h, --help  Show this help","","Display or modify ARP cache entries."].join(`
`),exitCode:0};let n=t.network,r=e.indexOf("-d");if(r!==-1&&r+1<e.length){let a=e[r+1];return n.arpCache=n.arpCache.filter(c=>c.ip!==a),{stdout:"",exitCode:0}}let s=e.indexOf("-s");if(s!==-1&&s+2<e.length){let a=e[s+1],c=e[s+2];return n.arpCache.push({ip:a,mac:c,device:"eth0",state:"REACHABLE"}),{stdout:"",exitCode:0}}let i=n.getArpCache(),o=["Address                  HWtype  HWaddress           Flags Mask    Iface"];for(let a of i)o.push(`${a.ip.padEnd(24)} ether   ${a.mac.padEnd(19)} ${"C".padEnd(12)} ${a.device}`);return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var Sy,by=k(()=>{"use strict";ee();Sy={name:"cmp",description:"Compare two files byte by byte",category:"files",params:["<file1> <file2>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: cmp [-l] [-s] <file1> <file2>
  -l  Print byte offsets
  -s  Silent (exit code only)
  -h, --help  Show this help
`,exitCode:0};let n=e.filter(c=>!c.startsWith("-"));if(n.length<2)return{stderr:"cmp: missing file operand",exitCode:2};let r=M(e,["-l"]),s=M(e,["-s"]);if(!t.vfs.exists(n[0]))return{stderr:`cmp: ${n[0]}: No such file`,exitCode:2};if(!t.vfs.exists(n[1]))return{stderr:`cmp: ${n[1]}: No such file`,exitCode:2};let i=t.vfs.readFile(n[0]),o=t.vfs.readFile(n[1]);if(i===o)return{stdout:"",exitCode:0};if(s)return{stdout:"",exitCode:1};let a=Math.min(i.length,o.length);for(let c=0;c<a;c++)if(i[c]!==o[c]){let l=u=>u.length>0?u.charCodeAt(0):0;return r?{stdout:`${c+1} ${l(i[c]).toString(8)} ${l(o[c]).toString(8)}
`,exitCode:1}:{stdout:`cmp: ${n[0]} ${n[1]} differ: byte ${c+1}
`,exitCode:1}}return i.length!==o.length?{stdout:`cmp: EOF on ${i.length<o.length?n[0]:n[1]}
`,exitCode:1}:{stdout:"",exitCode:0}}}});function cw(t,e){try{if(t.exists("/etc/hosts")){let n=t.readFile("/etc/hosts");for(let r of n.split(`
`)){let s=r.trim();if(!s||s.startsWith("#"))continue;let i=s.split(/\s+/);if(i.length>=2){let o=i[0],a=i.slice(1);if(a.includes(e)||a.includes(e.split(".")[0]))return o}}}}catch{}return null}function lw(t,e,n){let r=[];try{if(t.exists("/etc/hosts")){let s=t.readFile("/etc/hosts");for(let i of s.split(`
`)){let o=i.trim();if(!o||o.startsWith("#"))continue;let a=o.split(/\s+/);if(a.length>=2){let c=a[0],l=a.slice(1);(l.includes(e)||l.includes(e.split(".")[0]))&&(n==="A"&&!c.includes(":")&&r.push(c),n==="AAAA"&&c.includes(":")&&r.push(c))}}}}catch{}return r.length===0&&n==="A"&&r.push("127.0.0.1"),r}var vy,xy=k(()=>{"use strict";ee();vy={name:"dig",description:"DNS lookup utility",category:"network",params:["[@server] <name> [type]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: dig [@server] <name> [type]","  -h, --help    Show this help","","Types: A, AAAA, MX, TXT, CNAME, NS, SOA","","Query DNS for name resolution."].join(`
`),exitCode:0};let n="1.1.1.1",r,s="A";for(let c of e)c.startsWith("@")?n=c.slice(1):c===e[0]&&!r?r=c:r&&!s&&(s=c.toUpperCase());if(!r)return{stderr:"dig: missing hostname",exitCode:1};let i=cw(t.vfs,r),o=new Date().toISOString().replace("T"," ").slice(0,19),a=[`; <<>> DiG 9.18.28 <<>> ${r}`,";; global options: +cmd",";; Got answer:",`;; ->>HEADER<<- opcode: QUERY, status: ${i?"NOERROR":"NXDOMAIN"}, id: ${Math.floor(Math.random()*65535)}`,`;; flags: qr rd ra; QUERY: 1, ANSWER: ${i?1:0}, AUTHORITY: 0, ADDITIONAL: 1`,"",";; OPT PSEUDOSECTION:","; EDNS: version: 0, flags:; udp: 1232",";; QUESTION SECTION:",`;${r}.			IN	${s}`,""];if(i){if(a.push(";; ANSWER SECTION:"),s==="A"||s==="AAAA"){let c=lw(t.vfs,r,s);for(let l of c)a.push(`${r}.		300	IN	${s}	${l}`)}else s==="MX"?a.push(`${r}.		300	IN	MX	10 mail.${r}.`):s==="TXT"?a.push(`${r}.		300	IN	TXT	"v=spf1 mx ~all"`):s==="CNAME"?a.push(`${r}.		300	IN	CNAME	${r}.`):a.push(`${r}.		300	IN	A	${i}`);a.push("")}return a.push(`;; Query time: ${Math.floor(Math.random()*50+10)} msec`),a.push(`;; SERVER: ${n}#53(${n}) (UDP)`),a.push(`;; WHEN: ${o}`),a.push(`;; MSG SIZE  rcvd: ${Math.floor(Math.random()*200+50)}`),a.push(""),{stdout:a.join(`
`),exitCode:0}}}});var Cy,wy=k(()=>{"use strict";ee();Cy={name:"ethtool",description:"Display or modify network interface parameters",category:"network",params:["<interface>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: ethtool <interface>","  -h, --help    Show this help","","Display network interface configuration."].join(`
`),exitCode:0};let n=e.find(i=>!i.startsWith("-"));if(!n)return{stderr:"ethtool: missing interface name",exitCode:1};let s=t.network.getInterface(n);return s?{stdout:`${[`Settings for ${n}:`,"	Supported ports: [ TP MII ]","	Supported link modes:   10baseT/Half 10baseT/Full","	                        100baseT/Half 100baseT/Full","	                        1000baseT/Full","	Supported pause frame use: Symmetric","	Supports auto-negotiation: Yes","	Advertised link modes:  1000baseT/Full","	Advertised pause frame use: Symmetric","	Advertised auto-negotiation: Yes",`	Speed: ${s.speed??1e3}Mb/s`,`	Duplex: ${s.duplex??"Full"}`,"	Port: Twisted Pair","	PHYAD: 0","	Transceiver: internal","	Auto-negotiation: on","	Supports Wake-on: pumbg","	Wake-on: d",`	Link detected: ${s.state==="UP"?"yes":"no"}`].join(`
`)}
`,exitCode:0}:{stderr:`ethtool: ${n}: No such device`,exitCode:1}}}});function ky(t){let e=t.toUpperCase().split("").map(n=>n===" "?"   ":` ${n}  `);return`${" ".repeat(t.length+2)}
${e.join("")}
${" ".repeat(t.length+2)}
`}function uw(t){if(t<2)return[t];let e=[],n=2;for(;t>1;){for(;t%n===0;)e.push(n),t/=n;if(n++,n*n>t){t>1&&e.push(t);break}}return e}var _y,Iy,Ey,$y,Py,My=k(()=>{"use strict";ee();_y={name:"figlet",description:"Display large characters in ASCII art",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: figlet [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:ky(n),exitCode:0}}},Iy={name:"banner",description:"Print large banners",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: banner [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(s=>!s.startsWith("-")).join(" ")||e||"Hello",r="#".repeat(n.length+6);return{stdout:`${r}
## ${n} ##
${r}
`,exitCode:0}}},Ey={name:"toilet",description:"Display large colored banners",category:"fun",params:["[message...]"],run:({args:t,stdin:e})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: toilet [message...]
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(r=>!r.startsWith("-")).join(" ")||e||"Hello";return{stdout:ky(n),exitCode:0}}},$y={name:"factor",description:"Factor integers into prime factors",category:"fun",params:["<number>..."],run:({args:t,stdin:e})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: factor <number>...
  -h, --help  Show this help
`,exitCode:0};let n=t.filter(s=>!s.startsWith("-")).map(Number);if(n.length===0){let s=e||"";n.push(...s.trim().split(/\s+/).map(Number))}return{stdout:`${n.map(s=>`${s}: ${uw(s).join(" ")}`).join(`
`)}
`,exitCode:0}}},Py={name:"rs",description:"Reshape data matrix",category:"fun",params:["[options]"],run:({args:t,stdin:e})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: rs [options]
  -h, --help  Show this help
`,exitCode:0};let r=(t.filter(a=>!a.startsWith("-")).join(" ")||e||"").split(/\s+/).filter(Boolean),s=3,i=Math.ceil(r.length/s),o=[];for(let a=0;a<i;a++){let c=[];for(let l=0;l<s;l++){let u=l*i+a;c.push(r[u]??"")}o.push(c.join("	"))}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});function dw(t,e){let n=`${e}/pubring.kbx`;return t.exists(n)?{stdout:`pub   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}:{stdout:`gpg: directory '/root/.gnupg' created
gpg: no public keys
`,exitCode:0}}function fw(){return{stdout:`sec   rsa3072 2024-01-01 [SC]
      ABCDEF1234567890ABCDEF1234567890ABCDEF12
uid           [ultimate] Virtual User <virtual@localhost>
`,exitCode:0}}function pw(){return{stdout:`gpg: key generation not supported in virtual environment
`,exitCode:1}}var Ny,Ay=k(()=>{"use strict";ee();Ny={name:"gpg",description:"GNU Privacy Guard \u2014 encryption and signing",category:"system",params:["[options] [file...]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: gpg [options] [file...]","  --list-keys       List public keys","  --list-secret-keys List secret keys","  --gen-key         Generate a new key pair","  -e, --encrypt     Encrypt data","  -d, --decrypt     Decrypt data","  -s, --sign        Sign data","  -k, --list-key    List keys (short)","  -h, --help        Show this help"].join(`
`),exitCode:0};let n=`${process.env.HOME??"/root"}/.gnupg`;if(M(e,["--list-keys","-k","--list-public-keys"]))return dw(t.vfs,n);if(M(e,["--list-secret-keys"]))return fw();if(M(e,["--gen-key","--full-generate-key"]))return pw();if(M(e,["-e","--encrypt"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: encrypted output written to ${r}.gpg
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}if(M(e,["-d","--decrypt"]))return e.find(s=>!s.startsWith("-"))?{stdout:`gpg: decryption not supported in virtual environment
`,exitCode:1}:{stderr:"gpg: missing file",exitCode:1};if(M(e,["-s","--sign"])){let r=e.find(s=>!s.startsWith("-"));return r?{stdout:`gpg: signed output written to ${r}.sig
`,exitCode:0}:{stderr:"gpg: missing file",exitCode:1}}return{stderr:`gpg: no command specified
Try 'gpg --help' for more information.`,exitCode:2}}}});var Ty,Oy=k(()=>{"use strict";ee();Ty={name:"hexdump",description:"Display file contents in hexadecimal",category:"files",params:["[-C] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: hexdump [-C] [file...]
  -C  Canonical hex+ASCII display
  -h, --help  Show this help
`,exitCode:0};let r=M(e,["-C"]),s=e.filter(l=>!l.startsWith("-")),i="";if(s.length>0){if(!t.vfs.exists(s[0]))return{stderr:`hexdump: ${s[0]}: No such file`,exitCode:1};i=t.vfs.readFile(s[0])}else if(n)i=n;else return{stderr:"hexdump: missing operand",exitCode:1};let o=Buffer.from(i),a=[],c=16;for(let l=0;l<o.length;l+=c){let u=o.slice(l,l+c),d=Array.from(u).map(f=>f.toString(16).padStart(2,"0")).join(" ");if(r){let f=Array.from(u).map(h=>h>=32&&h<=126?String.fromCharCode(h):".").join(""),p=l.toString(8).padStart(8,"0");a.push(`${p}  ${d.padEnd(47)}  |${f}|`)}else a.push(d)}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var fc,Ry,Dy=k(()=>{"use strict";ee();fc={"utf-8":"utf8",utf8:"utf8",ascii:"ascii",latin1:"latin1","latin-1":"latin1","iso-8859-1":"latin1",ucs2:"ucs2","ucs-2":"ucs2",utf16le:"ucs2","utf-16le":"ucs2",base64:"base64",hex:"hex"},Ry={name:"iconv",description:"Convert text from one character encoding to another",category:"files",params:["-f <from> -t <to> [file]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: iconv -f <from> -t <to> [file]
  -f <encoding>  Input encoding
  -t <encoding>  Output encoding
  -l             List known encodings
  -h, --help     Show this help
`,exitCode:0};if(M(e,["-l"]))return{stdout:`${Object.keys(fc).sort().join(`
`)}
`,exitCode:0};let r=e.indexOf("-f"),s=e.indexOf("-t"),i=r!==-1&&r+1<e.length?e[r+1]:"utf-8",o=s!==-1&&s+1<e.length?e[s+1]:"utf-8",a=e.find(d=>!d.startsWith("-")&&d!==e[r+1]&&d!==e[s+1]),c="";if(a){if(!t.vfs.exists(a))return{stderr:`iconv: ${a}: No such file`,exitCode:1};c=t.vfs.readFile(a)}else if(n)c=n;else return{stderr:"iconv: missing operand",exitCode:1};let l=fc[i.toLowerCase()]??"utf8",u=fc[o.toLowerCase()]??"utf8";try{return{stdout:Buffer.from(c,l).toString(u),exitCode:0}}catch{return{stderr:`iconv: conversion from ${i} to ${o} not supported`,exitCode:1}}}}});var Fy,Ly=k(()=>{"use strict";ee();Fy={name:"logger",description:"Send message to syslog",category:"network",params:["[-p priority] [-t tag] [message...]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: logger [options] [message...]","  -p, --priority <prio>  Priority (facility.severity)","  -t, --tag <tag>        Mark lines with tag","  -h, --help             Show this help","","Write message to system syslog."].join(`
`),exitCode:0};let n=process.env.USER??"root",r=[];for(let a=0;a<e.length;a++){let c=e[a];if(c==="-p"||c==="--priority")a++;else if(c==="-t"||c==="--tag"){let l=e[++a];l&&(n=l)}else c.startsWith("-")||r.push(c)}let s=r.join(" ")||"(none)",o=`${new Date().toISOString()} ${n}: ${s}`;try{let a="/var/log";t.vfs.exists(a)||t.vfs.mkdir(a,493);let c="";t.vfs.exists("/var/log/syslog")&&(c=t.vfs.readFile("/var/log/syslog")),t.vfs.writeFile("/var/log/syslog",`${c+o}
`)}catch{return{stderr:"logger: could not write to syslog",exitCode:1}}return{stdout:"",exitCode:0}}}});var Uy,By=k(()=>{"use strict";ee();Uy={name:"nslookup",description:"Query DNS for hostname or IP",category:"network",params:["<hostname> [dns-server]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: nslookup <hostname> [dns-server]","  -h, --help    Show this help","","Query DNS for hostname resolution."].join(`
`),exitCode:0};let n=e.filter(o=>!o.startsWith("-")),r=n[0];if(!r)return{stderr:"nslookup: missing hostname",exitCode:1};let s=n[1]??"1.1.1.1",i=null;try{if(t.vfs.exists("/etc/hosts")){let o=t.vfs.readFile("/etc/hosts");for(let a of o.split(`
`)){let c=a.trim();if(!c||c.startsWith("#"))continue;let l=c.split(/\s+/);if(l.length>=2){let u=l[0],d=l.slice(1);(d.includes(r)||d.includes(r.split(".")[0]))&&(i=u)}}}}catch{}return i||(i="127.0.0.1"),{stdout:[`Server:		${s}`,`Address:	${s}#53`,"",`Name:	${r}`,`Address:	${i}`,""].join(`
`),exitCode:0}}}});var zy,Wy=k(()=>{"use strict";ee();zy={name:"od",description:"Dump files in octal and other formats",category:"files",params:["[-t type] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: od [-t type] [file...]
  -t a    Named characters
  -t c    ASCII characters
  -t o    Octal (default)
  -t x    Hex
  -t u    Unsigned decimal
  -h, --help  Show this help
`,exitCode:0};let r=e.filter(u=>!u.startsWith("-")&&u!=="-t"),s=e.indexOf("-t"),i=s!==-1&&s+1<e.length?e[s+1]:"o",o="";if(r.length>0){if(!t.vfs.exists(r[0]))return{stderr:`od: ${r[0]}: No such file`,exitCode:1};o=t.vfs.readFile(r[0])}else if(n)o=n;else return{stderr:"od: missing operand",exitCode:1};let a=[],c=Buffer.from(o),l=16;for(let u=0;u<c.length;u+=l){let d=u.toString(7).padStart(7,"0"),f=c.slice(u,u+l),p=[];if(i==="a"){for(let h of f)p.push(h>=32&&h<=126?String.fromCharCode(h):".");a.push(`${d} ${p.join(" ")}`)}else if(i==="c"){for(let h of f){let m=h>=32&&h<=126?String.fromCharCode(h):`\\${h.toString(8)}`;p.push(m)}a.push(`${d} ${p.join(" ")}`)}else if(i==="x"){for(let h of f)p.push(h.toString(16).padStart(2,"0"));a.push(`${d} ${p.join(" ")}`)}else if(i==="u"){for(let h of f)p.push(String(h).padStart(3));a.push(`${d} ${p.join(" ")}`)}else{for(let h of f)p.push(h.toString(8).padStart(3,"0"));a.push(`${d} ${p.join(" ")}`)}}return{stdout:`${a.join(`
`)}
`,exitCode:0}}}});var jy,Vy=k(()=>{"use strict";ee();jy={name:"openssl",description:"OpenSSL cryptographic utility",category:"system",params:["<command> [options]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"])||e.length===0)return{stdout:["Usage: openssl <command> [options]","","Commands:","  version           Print OpenSSL version","  genrsa <bits>     Generate RSA private key","  rsa <infile>      Process RSA key","  x509              Generate self-signed certificate","  md5 <file>        Compute MD5 hash","  sha256 <file>     Compute SHA256 hash","  enc -e/-d         Encrypt/decrypt with cipher","  rand <n>          Generate random bytes","  -h, --help        Show this help"].join(`
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
`,exitCode:0}}return{stderr:`openssl: unknown command '${n}'`,exitCode:1}}}});function mw(t,e,n){let r=e.split(`
`),s=0,i="",o=[],a=[],c=!1,l=0;for(let u of r){let d=u.match(/^---\s+(.+)/);if(d){i=d[1].replace(/\t.*$/,"").replace(/^[ab]\//,"");continue}if(u.match(/^\+\+\+\s+(.+)/))continue;let p=u.match(/^@@ -(\d+),\d+ \+\d+,\d+ @@/);if(p){c&&o.length>0&&i&&Gy(t,i,o,a,l,n)&&s++,l=Number(p[1]),o=[],a=[],c=!0;continue}c&&(u.startsWith("-")?o.push(u.slice(1)):u.startsWith("+")?a.push(u.slice(1)):(o.push(u),a.push(u)))}return c&&o.length>0&&i&&Gy(t,i,o,a,l,n)&&s++,{count:s}}function Gy(t,e,n,r,s,i){if(!t.vfs.exists(e))return!1;let a=t.vfs.readFile(e).split(`
`),c=i?r:n,l=i?n:r;for(let u=0;u<=a.length-c.length;u++){let d=!0;for(let f=0;f<c.length;f++)if(a[u+f]!==c[f]){d=!1;break}if(d)return a.splice(u,c.length,...l),t.vfs.writeFile(e,a.join(`
`)),!0}return!1}var Hy,qy=k(()=>{"use strict";ee();Hy={name:"patch",description:"Apply a diff file to an original",category:"files",params:["[options] [file]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: patch [options] [file]
  -p<N>  Strip N leading path components
  -i <file>  Read patch from file
  -R     Reverse patch
  -h, --help  Show this help
`,exitCode:0};let n="",r=e.indexOf("-i");if(r!==-1&&r+1<e.length){let o=e[r+1];if(!t.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};n=t.vfs.readFile(o)}else{let o=e.find(a=>!a.startsWith("-")&&a!==e[r+1]);if(o){if(!t.vfs.exists(o))return{stderr:`patch: ${o}: No such file`,exitCode:1};n=t.vfs.readFile(o)}else return{stderr:"patch: missing patch file",exitCode:1}}let s=M(e,["-R"]),i=mw(t,n,s);return i.count===0?{stdout:`patch: no changes applied
`,exitCode:0}:{stdout:`patch: ${i.count} hunk(s) applied
`,exitCode:0}}}});var Yy,Ky=k(()=>{"use strict";ee();Yy={name:"pr",description:"Paginate or columnate files for printing",category:"files",params:["[options] [file...]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: pr [options] [file...]
  -l <lines>  Page length (default: 66)
  -h, --help  Show this help
`,exitCode:0};let r=e.indexOf("-l"),s=r!==-1&&r+1<e.length?Number(e[r+1]):66,i=e.filter(u=>!u.startsWith("-")&&u!==e[r+1]),o="";if(i.length>0)for(let u of i){if(!t.vfs.exists(u))return{stderr:`pr: ${u}: No such file`,exitCode:1};o+=`${t.vfs.readFile(u)}
`}else if(n)o=n;else return{stderr:"pr: missing file operand",exitCode:1};let a=o.split(`
`),c=[],l=`${new Date().toUTCString()}  Page 1`;for(let u=0;u<a.length;u+=s-3){c.push(`

${l}

`);let d=a.slice(u,u+s-3);c.push(d.join(`
`))}return{stdout:`${c.join("")}
`,exitCode:0}}}});var Xy,Zy=k(()=>{"use strict";ee();Xy={name:"recode",description:"Convert character encoding of files",category:"files",params:["<charset1>..<charset2> [file]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: recode <charset1>..<charset2> [file]
  -h, --help  Show this help
  -l          List known charsets
`,exitCode:0};if(M(e,["-l"]))return{stdout:`UTF-8 ASCII ISO-8859-1 CP1252 KOI8-R
`,exitCode:0};if(!e.find(o=>o.includes("..")))return{stderr:"recode: missing charset specification",exitCode:1};let s=e.find(o=>!(o.startsWith("-")||o.includes(".."))),i="";if(s){if(!t.vfs.exists(s))return{stderr:`recode: ${s}: No such file`,exitCode:1};i=t.vfs.readFile(s)}else if(n)i=n;else return{stderr:"recode: missing file operand",exitCode:1};return{stdout:i,exitCode:0}}}});var Jy,Qy=k(()=>{"use strict";ee();Jy={name:"route",description:"Display or modify the routing table",category:"network",params:["[-n] [add|del]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: route [-n] [add|del <target> gw <gateway>]","  -n     Show numerical addresses (no DNS resolution)","  -h, --help  Show this help","","Display or modify the IP routing table."].join(`
`),exitCode:0};let n=t.network,r=e.filter(i=>!i.startsWith("-"));if(r.length===0){let i=n.getRoutes(),o=["Kernel IP routing table","Destination     Gateway         Genmask         Flags Metric Ref    Use Iface"];for(let a of i){let c=a.destination??"0.0.0.0",l=a.gateway??"0.0.0.0",u=a.netmask??"255.255.255.0",d=c==="0.0.0.0"?"UG":"U",f=a.metric??"0",p=a.device??"eth0";o.push(`${c.padEnd(15)} ${l.padEnd(15)} ${u.padEnd(15)} ${d.padEnd(5)} ${String(f).padEnd(4)} 0       ${p}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=r[0];if(s==="add"||s==="del"){let i=r[1],o=r.indexOf("gw"),a=o!==-1&&o+1<r.length?r[o+1]:"0.0.0.0",c="0.0.0.0",l="eth0";return i?s==="add"?(n.addRoute(i,a,c,l),{stdout:"",exitCode:0}):(n.delRoute(i),{stdout:"",exitCode:0}):{stderr:"route: missing target",exitCode:1}}return{stderr:`route: unknown command '${s}'`,exitCode:1}}}});function t1(t,e,n){let r=t.stat(e);if(r.type==="directory"){t.exists(n)||t.mkdir(n,r.mode);let s=t.list(e);for(let i of s)i==="."||i===".."||t1(t,`${e}/${i}`,`${n}/${i}`)}else{let s=t.readFile(e);t.writeFile(n,s)}}var e1,n1=k(()=>{"use strict";ee();e1={name:"rsync",description:"Fast file synchronization tool",category:"system",params:["[options] <source> <dest>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: rsync [options] <source> <dest>
  -a, --archive   Archive mode
  -v, --verbose   Verbose
  -z, --compress  Compress
  -r, --recursive Recurse into directories
  -h, --help      Show this help
`,exitCode:0};let n=e.filter(o=>!o.startsWith("-"));if(n.length<2)return{stderr:"rsync: missing source or destination",exitCode:1};let r=n[0],s=n[1],i=M(e,["-v","--verbose"]);if(!t.vfs.exists(r))return{stderr:`rsync: ${r}: No such file or directory`,exitCode:23};try{return t1(t.vfs,r,s),{stdout:i?`sending incremental file list

sent ${Math.floor(Math.random()*1e3+100)} bytes  received ${Math.floor(Math.random()*100+10)} bytes  ${(Math.random()*1e4+1e3).toFixed(2)} bytes/sec
total size is ${Math.floor(Math.random()*1e4)}  speedup is ${(Math.random()*10+1).toFixed(2)}
`:"",exitCode:0}}catch(o){return{stderr:`rsync: error: ${o instanceof Error?o.message:String(o)}`,exitCode:23}}}}});var r1,s1,i1,o1,a1=k(()=>{"use strict";ee();r1={name:"screen",description:"Terminal multiplexer",category:"system",params:["[-S <name>] [command]"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: screen [-S <name>] [command]
  -S <name>  Set session name
  -ls        List sessions
  -r <name>  Reattach to session
  -h, --help Show this help
`,exitCode:0};if(M(e,["-ls","--list"])){let n="/var/run/screen";try{if(t.vfs.exists(n)){let r=t.vfs.list(n);if(r.length>0)return{stdout:`There ${r.length===1?"is":"are"} ${r.length} screen(s) on this system.
${r.map(s=>`	${s}`).join(`
`)}
`,exitCode:0}}}catch{}return{stdout:`No Sockets found in /var/run/screen.
`,exitCode:1}}return{stdout:`[screen: session created on pts/${Math.floor(Math.random()*256)}]
`,exitCode:0}}},s1={name:"tmux",description:"Terminal multiplexer",category:"system",params:["[command]"],aliases:["tmux"],run:({args:t})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: tmux [command]
  new-session, ls, attach, kill-session
  -h, --help  Show this help
`,exitCode:0};let e=t.find(n=>!n.startsWith("-"));return e==="ls"||e==="list-sessions"?{stdout:`0: 1 windows (created ...) (attached)
`,exitCode:0}:e==="new-session"||e==="new"?{stdout:"",exitCode:0}:e==="attach"||e==="attach-session"?{stdout:"",exitCode:0}:{stdout:`[tmux: virtual session started]
`,exitCode:0}}},i1={name:"watch",description:"Execute a program periodically",category:"system",params:["[-n <seconds>] <command>"],run:({args:t})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: watch [-n <seconds>] <command>
  -n <seconds>  Interval (default: 2)
  -h, --help    Show this help
`,exitCode:0};let e=t.indexOf("-n"),n=e!==-1&&e+1<t.length?t[e+1]:"2",r=t.filter(i=>!i.startsWith("-")&&i!==t[e+1]).join(" "),s=new Date().toUTCString();return{stdout:`Every ${n}s: ${r}

${s}

[watch: virtual execution]
`,exitCode:0}}},o1={name:"time",description:"Measure command execution time",category:"system",params:["<command> [args...]"],run:({args:t})=>{if(M(t,["--help","-h"]))return{stdout:`Usage: time <command> [args...]
  -h, --help  Show this help
`,exitCode:0};t.filter(s=>!s.startsWith("-")).join(" ");let e=(Math.random()*.5+.01).toFixed(3),n=(Math.random()*.3+.01).toFixed(3),r=(Math.random()*.2+.01).toFixed(3);return{stdout:`real	0m${e}s
user	0m${n}s
sys	0m${r}s
`,exitCode:0}}}});function gw(t,e){return t.vfs.exists(`/var/run/${e}.pid`)}function yw(t,e){t.vfs.writeFile(`/var/run/${e}.pid`,String(process.pid))}function Sw(t,e){try{t.vfs.remove(`/var/run/${e}.pid`)}catch{}}var hw,c1,l1=k(()=>{"use strict";ee();hw="/etc/init.d",c1={name:"service",description:"Run System V init script",category:"network",params:["<service> <command>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:["Usage: service <service> <command>","  -h, --help    Show this help","","Commands: start, stop, restart, status, reload","","Run a System V init script."].join(`
`),exitCode:0};let n=e.filter(a=>!a.startsWith("-"));if(n.length<2)return{stderr:"service: missing service name or command",exitCode:1};let r=n[0],s=n[1],i=`${hw}/${r}`;return t.vfs.exists(i)?["start","stop","restart","status","reload"].includes(s)?s==="status"?gw(t,r)?{stdout:` * ${r} is running
`,exitCode:0}:{stdout:` * ${r} is not running
`,exitCode:3}:(s==="start"?yw(t,r):s==="stop"&&Sw(t,r),{stdout:` * ${s}ing ${r}
`,exitCode:0}):{stderr:`service: unknown command '${s}'`,exitCode:1}:{stderr:`${r}: unrecognized service`,exitCode:1}}}});var u1,d1,f1,p1=k(()=>{"use strict";ee();u1={name:"useradd",description:"Create a new user (POSIX semantics)",category:"system",params:["[-m] [-s <shell>] <username>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: useradd [-m] [-s <shell>] [-g <group>] [-G <groups>] <username>
  -m           Create home directory
  -s <shell>   Login shell
  -g <group>   Primary group
  -G <groups>  Supplementary groups
  -h, --help   Show this help
`,exitCode:0};let n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:"useradd: missing username",exitCode:1};if(t.users.listUsers().includes(n))return{stderr:`useradd: user '${n}' already exists`,exitCode:9};t.users.addUser(n,"");let r=`/home/${n}`;return M(e,["-m"])&&!t.vfs.exists(r)&&t.vfs.mkdir(r,493),{stdout:"",exitCode:0}}},d1={name:"userdel",description:"Delete a user account (POSIX semantics)",category:"system",params:["[-r] <username>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: userdel [-r] <username>
  -r           Remove home directory
  -h, --help   Show this help
`,exitCode:0};let n=e.find(r=>!r.startsWith("-"));if(!n)return{stderr:"userdel: missing username",exitCode:1};if(!t.users.listUsers().includes(n))return{stderr:`userdel: user '${n}' does not exist`,exitCode:6};if(M(e,["-r"])){let r=`/home/${n}`;try{t.vfs.remove(r,{recursive:!0})}catch{}}return t.users.deleteUser(n),{stdout:"",exitCode:0}}},f1={name:"groupmod",description:"Modify a group",category:"system",params:["[-n <new-name>] [-g <gid>] <group>"],run:({shell:t,args:e})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: groupmod [-n <new-name>] [-g <gid>] <group>
  -n <name>  Change group name
  -g <gid>   Change group ID
  -h, --help Show this help
`,exitCode:0};let n=e.find(i=>!i.startsWith("-"));if(!n)return{stderr:"groupmod: missing group name",exitCode:1};let r=e.indexOf("-n"),s=r!==-1&&r+1<e.length?e[r+1]:null;return t.users.listGroups().some(i=>i.name===n)?s?{stdout:`groupmod: renamed '${n}' to '${s}'
`,exitCode:0}:{stdout:"",exitCode:0}:{stderr:`groupmod: group '${n}' does not exist`,exitCode:6}}}});function bw(t){let e=Buffer.from(t),n=[];for(let r=0;r<e.length;r+=16){let s=r.toString(16).padStart(8,"0"),i=e.slice(r,r+16),o=Array.from(i).map(c=>c.toString(16).padStart(2,"0")).join(" "),a=Array.from(i).map(c=>c>=32&&c<=126?String.fromCharCode(c):".").join("");n.push(`${s}: ${o.padEnd(47)} ${a}`)}return{stdout:`${n.join(`
`)}
`,exitCode:0}}function vw(t){let e=[];for(let n of t.split(`
`)){let r=n.replace(/^[0-9a-fA-F]+:\s*/,"").split(/\s+/);for(let s of r)s.length===2&&/^[0-9a-fA-F]{2}$/.test(s)&&e.push(Number.parseInt(s,16))}return{stdout:Buffer.from(e).toString("utf-8"),exitCode:0}}var m1,h1=k(()=>{"use strict";ee();m1={name:"xxd",description:"Make a hexdump or reverse a hexdump",category:"files",params:["[-r] [file]"],run:({shell:t,args:e,stdin:n})=>{if(M(e,["--help","-h"]))return{stdout:`Usage: xxd [-r] [file]
  -r  Reverse (hexdump back to binary)
  -h, --help  Show this help
`,exitCode:0};let r=M(e,["-r"]),s=e.find(o=>!o.startsWith("-")),i;if(s){if(!t.vfs.exists(s))return{stderr:`xxd: ${s}: No such file`,exitCode:1};i=t.vfs.readFile(s)}else if(n)i=n;else return{stderr:"xxd: missing operand",exitCode:1};return r?vw(i):bw(i)}}});function y1(){qn.clear();for(let t of S1()){qn.set(t.name,t);for(let e of t.aliases??[])qn.set(e,t)}Is=Array.from(qn.keys()).sort()}function S1(){return[...xw,...g1,Cw]}function aa(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(r=>r.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(r=>r.length===0||/\s/.test(r)))throw new Error("Command names must be non-empty and contain no spaces");g1.push(e),qn.set(e.name,e);for(let r of e.aliases??[])qn.set(r,e);Is=null}function ca(t,e,n){return{name:t,params:e,run:n}}function ss(){return Is||y1(),Is}function la(){return S1()}function Xe(t){return Is||y1(),qn.get(t.toLowerCase())}var xw,g1,qn,Is,Cw,gn=k(()=>{"use strict";tl();il();al();fl();ml();gl();bl();_l();au();lu();Su();vu();Cu();_u();$u();ku();Nu();Tu();Du();Hu();Ku();Zu();Qu();td();rd();ma();cd();ud();fd();hd();yd();bd();xd();wd();Id();$d();kd();Nd();Td();Rd();Vd();Hd();Xd();Jd();ef();nf();sf();af();lf();ff();mf();vf();Cf();kf();Nf();Of();Df();Lf();jf();Gf();qf();Jf();tp();sp();op();lp();pp();hp();yp();bp();wp();Tp();Rp();Lp();Wp();Vp();Hp();Kp();Jp();um();fm();mm();gm();vm();Cm();Im();$m();km();Nm();Tm();Rm();Lm();Bm();Wm();Hm();Ym();Zm();nh();sh();oh();lh();fh();gh();Sh();vh();Ch();_h();Ph();Mh();Ah();Oh();Dh();Lh();Bh();Gh();qh();Xh();cg();fg();mg();gg();bg();xg();_g();kg();Ng();Og();Lg();zg();Gg();qg();Xg();Qg();t0();r0();i0();a0();l0();f0();m0();g0();S0();v0();C0();_0();E0();P0();hy();yy();by();xy();wy();My();Ay();Oy();Dy();Ly();By();Wy();Vy();qy();Ky();Zy();Qy();n1();a1();l1();p1();h1();xw=[zm,yu,fp,Hg,cu,Tg,th,Fp,Bp,zp,Yu,Yp,ap,cp,wu,Eu,xu,ih,Nh,Ad,nd,Ep,Qd,rh,pl,bh,n0,h0,pf,pg,Ju,Bg,vg,I0,dd,Mp,Np,Ap,$p,Pp,kp,Ig,Eg,$g,Pg,Sy,zy,m1,Ty,Hy,Ry,Xy,Yy,hg,uf,df,py,my,iu,ou,hl,w0,x0,Mf,Ff,cf,Gd,e0,Um,ep,ld,gd,ed,yh,Am,lg,ug,dg,Dm,Fm,Mg,hm,xm,vd,Cd,Ed,Xm,tf,Pu,ch,s0,dh,Mu,_d,Zp,d0,ip,jp,p0,yl,Sl,Md,Dg,Fg,np,rp,Vf,Fd,Ld,Bd,zd,Wd,jd,_y,Iy,Ey,$y,Py,Em,Rf,Sp,qd,Xu,y0,dm,Hf,Sg,$h,jg,Au,zf,vy,Uy,Jy,gy,Cy,c1,Fy,e1,el,Pm,ad,u1,d1,f1,Fh,Kh,Rh,rf,of,Zd,c0,bu,pm,lm,ul,dl,pd,md,Kf,Xf,Zf,wl,b0,Jg,ol,Sd,Op,Cp,rl,sl,Cg,wg,xh,xf,Om,qm,od,ph,mh,hh,Yg,Kg,wm,_m,bm,Gm,Pd,kh,$0,Gp,Ny,jy,r1,s1,i1,o1,ag,Hh,Wh,Af,wh,Ru,wf,_f,If,o0,Od,mp,gp,Th,Uh,Mm,Fu,Lu,Uu,Bu,zu,Wu,ju,Vu,Gu],g1=[],qn=new Map,Is=null,Cw=bf()});var no,ks,ro,Hw,$c,Kn,Xn,qw,so,Pc,kc,Yw,Kw,Xw,Zw,Ms=k(()=>{no="rXDT",ks=Buffer.from("ROX1"),ro=Buffer.from("PXL1"),Hw=Buffer.from("BLK2"),$c=0,Kn=1,Xn=2,qw=Buffer.from([0]),so=Buffer.from([137,80,78,71,13,10,26,10]),Pc=so.toString("hex"),kc=[{r:255,g:0,b:0},{r:0,g:255,b:0},{r:0,g:0,b:255}],Yw=kc,Kw=[...kc].reverse(),Xw={zstd:[{r:0,g:255,b:0}],"bwt-ans":[{r:0,g:128,b:255}]},Zw={png:{r:0,g:255,b:255},webp:{r:255,g:0,b:255},jxl:{r:255,g:255,b:0}}});var V1={};Us(V1,{adler32:()=>j1,crc32:()=>W1});function W1(t,e=0){let n=e^4294967295;for(let r=0;r<t.length;r++)n=z1[(n^t[r])&255]^n>>>8;return(n^4294967295)>>>0}function j1(t,e=1){let n=e&65535,r=e>>>16&65535;for(let s=0;s<t.length;s++)n=(n+t[s])%65521,r=(r+n)%65521;return(r<<16|n)>>>0}var z1,Mc=k(()=>{z1=[];for(let t=0;t<256;t++){let e=t;for(let n=0;n<8;n++)e&1?e=3988292384^e>>>1:e=e>>>1;z1[t]=e}});import{copyFileSync as Jw,existsSync as io}from"fs";import{createRequire as Qw}from"module";import{arch as H1,platform as q1}from"os";import{dirname as e_,resolve as Je}from"path";import{fileURLToPath as t_}from"url";function n_(){let t=q1(),e=H1(),r={linux:{x64:["x86_64-unknown-linux-gnu"],ia32:["i686-unknown-linux-gnu"],arm64:["aarch64-unknown-linux-gnu"],arm:["armv7-unknown-linux-gnueabihf"]},win32:{x64:["x86_64-pc-windows-msvc","x86_64-pc-windows-gnu"],ia32:["i686-pc-windows-msvc","i686-pc-windows-gnu"],arm64:["aarch64-pc-windows-msvc"]},darwin:{x64:["x86_64-apple-darwin"],arm64:["aarch64-apple-darwin"]}}[t];if(!r)throw new Error(`Unsupported OS: ${t}`);let s=r[e];if(!s)throw new Error(`Unsupported architecture: ${t}-${e}`);return s}function r_(){let t,e,n=t_(import.meta.url),r=e_(n);if(typeof __dirname<"u")t=__dirname,e=ft;else{t=r;try{e=ft}catch{e=Qw(n)}}function s(){let i=n_(),o=t&&t!=="."?t:process.cwd();for(;o.length>1&&!io(Je(o,"package.json"))&&!io(Je(o,"Cargo.toml"));){let u=Je(o,"..");if(u===o)break;o=u}let a=[];for(let u of i){let d=`roxify_native-${u}.node`,f=`libroxify_native-${u}.node`;a.push(Je(t,"..",d),Je(t,"..",f),Je(o,d),Je(o,f),Je(o,"node_modules","roxify",d),Je(o,"node_modules","roxify",f),Je(t,"..","..",d),Je(t,"..","..",f))}for(let u of i){for(let d of["release","fastdev"])a.push(Je(o,"target",u,d,"libroxify_native.so")),a.push(Je(o,"target",u,d,"libroxify_native.dylib")),a.push(Je(o,"target",u,d,"roxify_native.dll"));for(let d of["release","fastdev"])a.push(Je(o,"target",d,"libroxify_native.so")),a.push(Je(o,"target",d,"libroxify_native.dylib")),a.push(Je(o,"target",d,"roxify_native.dll")),a.push(Je(o,"target",d,"roxify_native.node"))}let c=new Set,l=[];for(let u of a)c.has(u)||(c.add(u),l.push(u));for(let u of l)try{if(!io(u))continue;if(u.endsWith(".so")||u.endsWith(".dylib")||u.endsWith(".dll")){let d=u.replace(/\.(so|dylib|dll)$/,".node");try{return io(d)||Jw(u,d),d}catch{return u}}return u}catch{}throw new Error(`Native module not found for ${q1()}-${H1()} (triples: ${i.join(", ")}). Searched ${l.length} paths:
${l.join(`
`)}`)}return e(s())}function G1(){if(oo===null)try{oo=r_()}catch{oo=void 0}return oo}var oo,fe,ln=k(()=>{oo=null;fe=new Proxy({},{get(t,e){let n=G1();if(n)return n[e]},has(t,e){let n=G1();return n?e in n:!1}})});import{readFileSync as s_,readdirSync as i_,statSync as Y1}from"fs";import{extname as ER,join as o_,relative as a_,resolve as K1,sep as c_}from"path";function*X1(t){for(let e of t){let n=K1(e),r=Y1(n);if(r.isFile())yield n;else if(r.isDirectory()){let i=i_(n).map(o=>o_(n,o));yield*X1(i)}}}function Nc(t,e,n){let r=[];for(let d of X1(t))r.push(d);let s=e?K1(e):process.cwd(),i=[],o=[],a=0,c=r.map(d=>{let f=Y1(d);return a+=f.size,f.size}),l=0;for(let d=0;d<r.length;d++){let f=r[d],p=a_(s,f).split(c_).join("/"),h=s_(f),m=Buffer.from(p,"utf8"),g=Buffer.alloc(2);g.writeUInt16BE(m.length,0);let y=Buffer.alloc(8);y.writeBigUInt64BE(BigInt(h.length),0),i.push(g,m,y,h),o.push(p),l+=c[d],n&&n(l,a,p)}let u=Buffer.alloc(8);return u.writeUInt32BE(1380931664,0),u.writeUInt32BE(r.length,4),i.unshift(u),{parts:i,list:o}}function Z1(t,e,n){let{parts:r,list:s}=Nc(t,e,n);return{buf:Buffer.concat(r),list:s}}function ao(t,e){if(t.length<8)return null;if(l_(t))return u_(t,e);let n=t.readUInt32BE(0);if(n===1380931657){let a=t.readUInt32BE(4),c=t.slice(8,8+a),l=JSON.parse(c.toString("utf8")),u=8+a,d=[],f=e?l.filter(p=>e.includes(p.path)):l;for(let p of f){let m=u+p.offset;if(m+2>t.length)continue;let g=t.readUInt16BE(m);if(m+=2,m+=g,m+=8,m+p.size>t.length)continue;let y=t.slice(m,m+p.size);d.push({path:p.path,buf:y})}return{files:d}}if(n!==1380931664)return null;let s=t.slice(0,8).readUInt32BE(4),i=8,o=[];for(let a=0;a<s;a++){if(i+2>t.length)return null;let c=t.readUInt16BE(i);if(i+=2,i+c>t.length)return null;let l=t.slice(i,i+c).toString("utf8");if(i+=c,i+8>t.length)return null;let u=t.readBigUInt64BE(i);if(i+=8,i+Number(u)>t.length)return null;let d=t.slice(i,i+Number(u));i+=Number(u),o.push({path:l,buf:d})}return e?{files:o.filter(c=>e.includes(c.path))}:{files:o}}function l_(t){return t.length<263?!1:t.slice(257,262).toString("ascii")==="ustar"}function u_(t,e){let n=[],r=0;for(;r+512<=t.length;){let s=t.slice(r,r+512),i=!0;for(let m=0;m<512;m++)if(s[m]!==0){i=!1;break}if(i)break;let a=s.slice(0,100).toString("ascii").replace(/\0+$/,""),c=s.slice(124,136).toString("ascii").replace(/\0+$/,"").trim(),l=parseInt(c,8)||0,u=s[156],d=s.slice(345,500).toString("ascii").replace(/\0+$/,""),p=(d?`${d}/${a}`:a).split("/").filter(m=>m&&m!=="."&&m!=="..").join("/");if(r+=512,u===0||u===48){if(r+l>t.length)break;let m=t.slice(r,r+l);(!e||e.includes(p))&&n.push({path:p,buf:Buffer.from(m)})}let h=Math.ceil(l/512);r+=h*512}return n.length>0?{files:n}:null}var Ac=k(()=>{});var Hr,qr,Tc,Oc=k(()=>{Hr=class extends Error{constructor(e="Passphrase required"){super(e),this.name="PassphraseRequiredError"}},qr=class extends Error{constructor(e="Incorrect passphrase"){super(e),this.name="IncorrectPassphraseError"}},Tc=class extends Error{constructor(e="Data format error"){super(e),this.name="DataFormatError"}}});import{createDecipheriv as d_,pbkdf2Sync as f_}from"crypto";function p_(t){let e=Buffer.alloc(t.length*3);for(let n=0;n<t.length;n++)e[n*3]=t[n].r,e[n*3+1]=t[n].g,e[n*3+2]=t[n].b;return e}function m_(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let n=1;n<t.length;n++)e[n]=t[n]-t[n-1]+256&255;return e}function h_(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let n=1;n<t.length;n++)e[n]=e[n-1]+t[n]&255;return e}function g_(t){if(Fc&&Rc)try{return Buffer.from(Rc(t))}catch(e){console.warn("Native deltaEncode failed, falling back to TS:",e)}return m_(t)}function y_(t){if(Fc&&Dc)try{return Buffer.from(Dc(t))}catch(e){console.warn("Native deltaDecode failed, falling back to TS:",e)}return h_(t)}function J1(t,e){let n=Buffer.from(e,"utf8"),r=Buffer.alloc(t.length);for(let s=0;s<t.length;s++)r[s]=t[s]^n[s%n.length];return r}function Lc(t,e){if(!t||t.length===0)return t;let n=t[0];if(n===Kn){if(t.length<46)throw new qr;if(!e)throw new Hr;let s=t.slice(1,17),i=t.slice(17,29),o=t.slice(29,45),a=t.slice(45),l=f_(e,s,6e5,32,"sha256"),u=d_("aes-256-gcm",l,i);u.setAuthTag(o);try{return Buffer.concat([u.update(a),u.final()])}catch{throw new qr}}if(n===Xn){if(!e)throw new Hr;return J1(t.slice(1),e)}return n===$c?t.slice(1):t}function S_(){let t=Buffer.alloc(768);for(let e=0;e<256;e++)t[e*3]=e,t[e*3+1]=e*127&255,t[e*3+2]=255-e;return t}function b_(t){let e=t.length,n=e,r=Math.ceil(Math.sqrt(n)),s=Math.ceil(n/r),i=r*2,o=s*2,a=Buffer.alloc(i*o);for(let c=0;c<e;c++){let l=c%r*2,u=Math.floor(c/r)*2,d=t[c];a[u*i+l]=d,a[u*i+l+1]=d,a[(u+1)*i+l]=d,a[(u+1)*i+l+1]=d}return{buffer:a,width:i,height:o}}function v_(t,e,n){let r=e/2,s=n/2,i=r*s,o=Buffer.alloc(i);for(let a=0;a<i;a++){let c=a%r*2,l=Math.floor(a/r)*2;o[a]=t[l*e+c]}return o}var Rc,Dc,Fc,Uc=k(()=>{Ms();Oc();ln();Rc=null,Dc=null,Fc=!1;try{fe?.nativeDeltaEncode&&fe?.nativeDeltaDecode&&(Rc=fe.nativeDeltaEncode,Dc=fe.nativeDeltaDecode,Fc=!0)}catch{}});import{readFileSync as x_}from"fs";function C_(t){for(let e=0;e<=t.length-4;e++)if(t[e]===80&&t[e+1]===88&&t[e+2]===76&&t[e+3]===49)return e;return-1}function w_(t){let e=C_(t);if(e<0)throw new Error("PXL1 magic not found in pixels");let n=e+4;if(n>=t.length)throw new Error("Truncated header: missing version");let r=t[n];if(n+=1,n>=t.length)throw new Error("Truncated header: missing name length");let s=t[n];n+=1;let i;if(s>0){if(n+s>t.length)throw new Error("Truncated header: name exceeds buffer");i=t.subarray(n,n+s).toString("utf8"),n+=s}if(r===1){if(n+4>t.length)throw new Error("Truncated header: missing payload length (V1)");let o=t.readUInt32BE(n);if(n+=4,n+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(n,n+o),name:i}}else if(r===2){if(n+8>t.length)throw new Error("Truncated header: missing payload length (V2)");let o=Number(t.readBigUInt64BE(n));if(n+=8,n+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(n,n+o),name:i}}else throw new Error(`Unsupported header version: ${r}`)}async function __(t,e={}){let n;Buffer.isBuffer(t)?n=t:n=x_(t);let r=Buffer.from(fe.extractPayloadFromPng(n)),s;try{let c=fe.extractNameFromPng?.(n);typeof c=="string"&&c.length>0&&(s=c)}catch{}if(!s)try{let c=fe.pngToRgb(n),l=Buffer.from(c.pixels);({name:s}=w_(l))}catch{}if(r.length===0)throw new Error("Empty payload extracted");let i;if(r[0]===3)throw new Error("AES-CTR streaming payload requires the native decoder");i=Lc(r,e.passphrase);let a;try{a=Buffer.from(fe.nativeZstdDecompress(i))}catch{a=i}a.length>=4&&a.subarray(0,4).toString()==="ROX1"&&(a=a.subarray(4));try{let c=ao(a);if(c&&c.files&&c.files.length>0)return{files:c.files,meta:{name:s}}}catch{}return{buf:a,meta:{name:s}}}function I_(t,e,n){if(!Buffer.isBuffer(t)||t.length!==e*n*3)return null;try{let r=!0;for(let v=0;v<t.length;v+=3)if(!(t[v]===255&&t[v+1]===255&&t[v+2]===255)){r=!1;break}if(r)return null;let s=e,i=n,o=-1,a=-1;for(let v=0;v<n;v++)for(let x=0;x<e;x++){let b=(v*e+x)*3;t[b]===255&&t[b+1]===255&&t[b+2]===255||(x<s&&(s=x),v<i&&(i=v),x>o&&(o=x),v>a&&(a=v))}if(o<0)return null;let c=o-s+1,l=a-i+1,u=[];for(let v=0;v<c;v++){let x=[];for(let b=0;b<l;b++){let P=((i+b)*e+(s+v))*3;x.push(t[P],t[P+1],t[P+2])}u.push(x.join(","))}let d=[];for(let v=0;v<u.length;v++)v===0||u[v]!==u[v-1]?d.push({start:v,len:1}):d[d.length-1].len++;let f=[];for(let v=0;v<l;v++){let x=[];for(let b=0;b<c;b++){let P=((i+v)*e+(s+b))*3;x.push(t[P],t[P+1],t[P+2])}f.push(x.join(","))}let p=[];for(let v=0;v<f.length;v++)v===0||f[v]!==f[v-1]?p.push({start:v,len:1}):p[p.length-1].len++;let h=d.length,m=p.length;if(!(d.some(v=>v.len>1)||p.some(v=>v.len>1)))return null;let y=Buffer.alloc(h*m*3);for(let v=0;v<m;v++)for(let x=0;x<h;x++){let b=s+d[x].start,P=i+p[v].start,_=(P*e+b)*3,w=t[_],S=t[_+1],C=t[_+2];for(let N=0;N<p[v].len;N++)for(let R=0;R<d[x].len;R++){let W=((P+N)*e+(b+R))*3;if(t[W]!==w||t[W+1]!==S||t[W+2]!==C)return null}let $=(v*h+x)*3;y[$]=w,y[$+1]=S,y[$+2]=C}return{width:h,height:m,data:y}}catch{return null}}var Q1=k(()=>{ln();Ac();Uc()});function qt(t,e){return t===0||e===0?0:Tt[Zn[t]+Zn[e]]}function co(t,e){if(e===0)throw new Error("GF(256): division by zero");return t===0?0:Tt[(Zn[t]+255-Zn[e])%255]}function eS(t,e){return t===0?e===0?1:0:Tt[Zn[t]*e%255]}function tS(t,e){let n=t[0];for(let r=1;r<t.length;r++)n=qt(n,e)^t[r];return n}function E_(t,e){let n=new Array(t.length+e.length-1).fill(0);for(let r=0;r<e.length;r++)for(let s=0;s<t.length;s++)n[s+r]^=qt(t[s],e[r]);return n}function $_(t){if(Bc.has(t))return Bc.get(t);let e=[1];for(let n=0;n<t;n++)e=E_(e,[1,Tt[n]]);return Bc.set(t,e),e}function nS(t,e){let n=t.length;if(n+e>255)throw new Error(`RS block too large: ${n}+${e} > 255`);let r=$_(e),s=new Array(n+e).fill(0);for(let o=0;o<n;o++)s[o]=t[o];for(let o=0;o<n;o++){let a=s[o];if(a!==0)for(let c=1;c<r.length;c++)s[o+c]^=qt(r[c],a)}let i=new Uint8Array(n+e);i.set(t);for(let o=0;o<e;o++)i[n+o]=s[n+o];return i}function zc(t,e){let n=new Array(e),r=Array.from(t);for(let s=0;s<e;s++)n[s]=tS(r,Tt[s]);return n}function P_(t,e){let n=[1],r=[1],s=0,i=1,o=1;for(let a=0;a<e;a++){let c=t[a];for(let l=1;l<=s;l++)l<n.length&&(c^=qt(n[l],t[a-l]));if(c===0)i++;else if(2*s<=a){let l=[...n],u=co(c,o),d=new Array(i).fill(0);for(let f=0;f<r.length;f++)d.push(qt(r[f],u));for(;n.length<d.length;)n.push(0);for(let f=0;f<d.length;f++)n[f]^=d[f];s=a+1-s,r=l,o=c,i=1}else{let l=co(c,o),u=new Array(i).fill(0);for(let d=0;d<r.length;d++)u.push(qt(r[d],l));for(;n.length<u.length;)n.push(0);for(let d=0;d<u.length;d++)n[d]^=u[d];i++}}return n}function k_(t,e){if(t.length===0)return 0;let n=t[t.length-1];for(let r=t.length-2;r>=0;r--)n=qt(n,e)^t[r];return n}function M_(t,e){let n=[],r=t.length-1;for(let s=0;s<255;s++)if(k_(t,Tt[s])===0){let o=(e+s-1)%255;o>=0&&o<e&&n.push(o)}if(n.length!==r)throw new Error(`RS Chien search: found ${n.length} roots but expected ${r}. Data may be too corrupted.`);return n}function N_(t,e){let n=t.length;if(n===0)return[];let r=[];for(let s=0;s<n;s++){let i=new Array(n+1);for(let o=0;o<n;o++)i[o]=eS(t[o],s);i[n]=e[s],r.push(i)}for(let s=0;s<n;s++){let i=-1;for(let a=s;a<n;a++)if(r[a][s]!==0){i=a;break}if(i===-1)throw new Error("RS: singular Vandermonde matrix");i!==s&&([r[s],r[i]]=[r[i],r[s]]);let o=co(1,r[s][s]);for(let a=s;a<=n;a++)r[s][a]=qt(r[s][a],o);for(let a=0;a<n;a++)if(a!==s&&r[a][s]!==0){let c=r[a][s];for(let l=s;l<=n;l++)r[a][l]^=qt(c,r[s][l])}}return r.map(s=>s[n])}function rS(t,e){let n=t.length;if(n>255)throw new Error(`RS block too large: ${n} > 255`);let r=zc(t,e);if(r.every(d=>d===0))return{data:new Uint8Array(t.subarray(0,n-e)),corrected:0};let s=P_(r,e),i=s.length-1;if(i===0)throw new Error("RS: non-zero syndromes but BM found zero errors");let o=M_(s,n),a=o.map(d=>Tt[(n-1-d)%255]),c=N_(a,r),l=new Uint8Array(t);for(let d=0;d<o.length;d++)l[o[d]]^=c[d];if(!zc(l,e).every(d=>d===0))throw new Error("RS: correction failed, residual syndromes non-zero");return{data:new Uint8Array(l.subarray(0,n-e)),corrected:i}}function T_(t){return 255-t}function O_(t){if(t.length===0)return new Uint8Array(0);let e=Math.max(...t.map(r=>r.length)),n=[];for(let r=0;r<e;r++)for(let s=0;s<t.length;s++)n.push(r<t[s].length?t[s][r]:0);return new Uint8Array(n)}function R_(t,e,n){let r=[];for(let i=0;i<e;i++)r.push(new Uint8Array(n));let s=0;for(let i=0;i<n;i++)for(let o=0;o<e;o++)s<t.length&&(r[o][i]=t[s++]);return r}function Ns(t,e="medium"){let n=A_[e],r=T_(n),s=Math.ceil(t.length/r),i=[];for(let c=0;c<s;c++){let l=c*r,u=Math.min(l+r,t.length),d=new Uint8Array(r);d.set(t.subarray(l,u)),i.push(nS(d,n))}let o=O_(i),a=Buffer.alloc(12);return sS.copy(a,0),a[4]=iS,a[5]=n,a.writeUInt32BE(t.length,6),a.writeUInt16BE(s,10),Buffer.concat([a,Buffer.from(o)])}function As(t){if(t.length<12)throw new Error("ECC data too short for header");if(!t.subarray(0,4).equals(sS))throw new Error('Invalid ECC magic (expected "ECC1")');let e=t[4];if(e!==iS)throw new Error(`Unsupported ECC version: ${e}`);let n=t[5],r=t.readUInt32BE(6),s=t.readUInt16BE(10),i=255,o=t.subarray(12),a=R_(o,s,i),c=0,l=[];for(let d=0;d<s;d++){let{data:f,corrected:p}=rS(a[d],n);c+=p,l.push(Buffer.from(f))}return{data:Buffer.concat(l).subarray(0,r),totalCorrected:c}}var Tt,Zn,Bc,A_,sS,iS,lo=k(()=>{Tt=new Uint8Array(512),Zn=new Uint8Array(256);{let t=1;for(let e=0;e<255;e++)Tt[e]=t,Zn[t]=e,t=(t<<1^(t&128?29:0))&255;for(let e=255;e<512;e++)Tt[e]=Tt[e-255]}Bc=new Map;A_={low:20,medium:40,quartile:64,high:128},sS=Buffer.from("ECC1"),iS=1});async function D_(t,e={}){let n=Array.isArray(t)?Buffer.concat(t):t,r=e.compressionLevel??3,s=e.name||void 0,i=e.includeFileList&&e.fileList?F_(e.fileList):void 0;if(e.passphrase){let o=e.encrypt&&e.encrypt!=="auto"?e.encrypt:"aes",a=fe.nativeEncodePngWithEncryptionNameAndFilelist(n,r,e.passphrase,o,s,i);return Buffer.from(a)}else{let o=fe.nativeEncodePngWithNameAndFilelist(n,r,s,i);return Buffer.from(o)}}function F_(t){return JSON.stringify(t)}var oS=k(()=>{ln()});import*as Wc from"zlib";function uo(t){return t.length>0&&typeof t[0]=="object"&&(t[0].name||t[0].path)?t.map(e=>({name:e.name??e.path,size:typeof e.size=="number"?e.size:0})).sort((e,n)=>e.name.localeCompare(n.name)):t.sort()}function L_(t){let e=t.find(r=>r.name==="rXFL");if(e)return uo(JSON.parse(Buffer.from(e.data).toString("utf8")));let n=t.find(r=>r.name===no);if(n){let r=Buffer.from(n.data),s=r.indexOf(Buffer.from("rXFL"));if(s!==-1&&s+8<=r.length){let i=r.readUInt32BE(s+4),o=s+8+i;if(o<=r.length)return uo(JSON.parse(r.slice(s+8,o).toString("utf8")))}}return null}async function U_(t,e={}){try{let n=fe.extractPngChunks(t),r=L_(n);if(r)return r;let s=n.find(o=>o.name==="IHDR"),i=n.filter(o=>o.name==="IDAT");if(s&&i.length>0){let c=1+Buffer.from(s.data).readUInt32BE(0)*3,l=await new Promise(u=>{let d=Wc.createInflate(),f=Buffer.alloc(0),p=!1;d.on("data",h=>{if(p)return;f=Buffer.concat([f,h]);let m=Buffer.alloc(f.length),g=0,y=0;for(;y<f.length;){let P=y%c;if(P===0)y++;else{let _=c-P,w=f.length-y,S=Math.min(_,w);f.copy(m,g,y,y+S),g+=S,y+=S}}let v=m.slice(0,g);if(v.length<12)return;if(!v.slice(8,12).equals(ro)){p=!0,d.destroy(),u(null);return}let x=12;if(v.length<x+2)return;x++;let b=v[x++];if(!(v.length<x+b+4)&&(x+=b,x+=4,!(v.length<x+4)))if(v.slice(x,x+4).toString("utf8")==="rXFL"){if(x+=4,v.length<x+4)return;let P=v.readUInt32BE(x);if(x+=4,v.length<x+P)return;try{p=!0,d.destroy(),u(uo(JSON.parse(v.slice(x,x+P).toString("utf8"))))}catch{u(null)}}else p=!0,d.destroy(),u(null)}),d.on("error",()=>{p||u(null)}),d.on("end",()=>{p||u(null)});for(let h of i){if(p)break;d.write(Buffer.from(h.data))}d.end()});if(l)return l}}catch{}try{let n=fe.extractFileListFromPixels(t);if(n)return uo(JSON.parse(n))}catch{}return null}async function B_(t){try{if(t.slice(0,ks.length).equals(ks)){let i=ks.length;if(i>=t.length)return!1;let o=t.readUInt8(i);if(i+=1+o,i>=t.length)return!1;let a=t[i];return a===Kn||a===Xn}let e=fe.extractPngChunks(t),n=e.find(i=>i.name===no);if(n){let i=Buffer.isBuffer(n.data)?n.data:Buffer.from(n.data);if(i.length>=1){let a=1+i.readUInt8(0);if(a<i.length)return i[a]===Kn||i[a]===Xn}}let r=e.find(i=>i.name==="IHDR"),s=e.filter(i=>i.name==="IDAT");if(r&&s.length>0){let a=1+Buffer.from(r.data).readUInt32BE(0)*3;return await new Promise(c=>{let l=Wc.createInflate(),u=Buffer.alloc(0),d=!1;l.on("data",f=>{if(d)return;u=Buffer.concat([u,f]);let p=Buffer.alloc(u.length),h=0,m=0;for(;m<u.length;){let b=m%a;if(b===0)m++;else{let P=a-b,_=u.length-m,w=Math.min(P,_);u.copy(p,h,m,m+w),h+=w,m+=w}}let g=p.slice(0,h);if(g.length<12)return;if(!g.slice(8,12).equals(ro)){d=!0,l.destroy(),c(!1);return}let y=12;if(g.length<y+2)return;y++;let v=g[y++];if(g.length<y+v+4||(y+=v,g.length<y+4+1)||(g.readUInt32BE(y),y+=4,g.length<y+1))return;let x=g[y];d=!0,l.destroy(),c(x===Kn||x===Xn)}),l.on("error",()=>{d||c(!1)}),l.on("end",()=>{d||c(!1)});for(let f of s){if(d)break;l.write(Buffer.from(f.data))}l.end()})}}catch{}return!1}var aS=k(()=>{Ms();ln()});import{spawn as z_,spawnSync as cS}from"child_process";import{existsSync as fo,readFileSync as po,unlinkSync as kn,writeFileSync as mo}from"fs";import{tmpdir as ho}from"os";import{join as go}from"path";import*as et from"zlib";async function W_(t,e=!1){if(t.length>52428800||e)return t;let r=(s,i,o=12e4)=>new Promise(a=>{try{let c=z_(s,i,{windowsHide:!0,stdio:"ignore"}),l=!1,u=setTimeout(()=>{l=!0;try{c.kill("SIGTERM")}catch{}},o);c.on("close",d=>{clearTimeout(u),a(l?{error:new Error("timeout")}:{code:d??0})}),c.on("error",d=>{clearTimeout(u),a({error:d})})}catch(c){a({error:c})}});try{let s=go(ho(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),i=s+".out.png";if(mo(s,t),!(await r("zopflipng",["-y",`--iterations=${e?15:40}`,"--filters=01234mepb",s,i],12e4)).error&&fo(i)){let l=po(i);try{kn(s),kn(i)}catch{}return l.length<t.length?l:t}if(e)return t}catch{}try{let v=function(I,D,z){let Z=I+D-z,J=Math.abs(Z-I),F=Math.abs(Z-D),j=Math.abs(Z-z);return J<=F&&J<=j?I:F<=j?D:z},$=function(I){return I.slice(0,8).toString("hex")===Pc?I:Buffer.concat([so,I])},i=ft("../../libroxify_native.node").extractPngChunks(t),o=i.find(I=>I.name==="IHDR");if(!o)return t;let a=Buffer.from(o.data),c=a.readUInt32BE(0),l=a.readUInt32BE(4),u=a[8],d=a[9];if(u!==8||d!==2)return t;let f=i.filter(I=>I.name==="IDAT"),p=Buffer.concat(f.map(I=>Buffer.from(I.data))),h;try{h=et.inflateSync(p)}catch{return t}let m=3,g=c*m,y=g+1;if(h.length!==y*l)return t;let x=[],b=null;for(let I=0;I<l;I++){let D=I*y+1,z=h.slice(D,D+g),Z=1/0,J=null,F=0;for(let L=0;L<=4;L++){let G=Buffer.alloc(g),U=0;for(let H=0;H<g;H++){let q=z[H],K=0,se=H-m>=0?z[H-m]:0,re=b?b[H]:0,ve=b&&H-m>=0?b[H-m]:0;if(L===0)K=q;else if(L===1)K=q-se+256&255;else if(L===2)K=q-re+256&255;else if(L===3){let Ae=Math.floor((se+re)/2);K=q-Ae+256&255}else{let Ae=v(se,re,ve);K=q-Ae+256&255}G[H]=K;let Fe=K>127?K-256:K;U+=Math.abs(Fe)}U<Z&&(Z=U,J=G,F=L)}let j=Buffer.alloc(1+g);j[0]=F,J.copy(j,1),x.push(j),b=z}let P=Buffer.concat(x),_=et.deflateSync(P,{level:9,memLevel:9,strategy:et.constants.Z_DEFAULT_STRATEGY}),w=[];for(let I of i)I.name!=="IDAT"&&w.push({name:I.name,data:Buffer.isBuffer(I.data)?I.data:Buffer.from(I.data)});let S=w.findIndex(I=>I.name==="IEND"),C=S>=0?S:w.length;w.splice(C,0,{name:"IDAT",data:_});let N=ft("../../libroxify_native.node"),R=$(Buffer.from(N.encodePngChunks(w))),W=R.length<t.length?R:t,Y=[et.constants.Z_DEFAULT_STRATEGY,et.constants.Z_FILTERED,et.constants.Z_RLE,...et.constants.Z_HUFFMAN_ONLY?[et.constants.Z_HUFFMAN_ONLY]:[],...et.constants.Z_FIXED?[et.constants.Z_FIXED]:[]];for(let I of Y)try{let D=et.deflateSync(h,{level:9,memLevel:9,strategy:I}),z=w.map(j=>({name:j.name,data:j.data})),Z=z.findIndex(j=>j.name==="IDAT");Z!==-1&&(z[Z]={name:"IDAT",data:D});let J=ft("../../libroxify_native.node"),F=$(Buffer.from(J.encodePngChunks(z)));F.length<W.length&&(W=F)}catch{}try{let D=(await Promise.resolve().then(()=>(Sr(),ru))).deflateSync;try{let z=D(P),Z=w.map(L=>({name:L.name,data:L.data})),J=Z.findIndex(L=>L.name==="IDAT");J!==-1&&(Z[J]={name:"IDAT",data:Buffer.from(z)});let F=ft("../../libroxify_native.node"),j=$(Buffer.from(F.encodePngChunks(Z)));j.length<W.length&&(W=j)}catch{}}catch{}let Q=[15,12,9],E=[9,8];for(let I=0;I<=4;I++)try{let D=[],z=null;for(let J=0;J<l;J++){let F=h.slice(J*y+1,J*y+1+g),j=Buffer.alloc(g);for(let G=0;G<g;G++){let U=F[G],H=G-m>=0?F[G-m]:0,q=z?z[G]:0,K=z&&G-m>=0?z[G-m]:0;I===0?j[G]=U:I===1?j[G]=U-H+256&255:I===2?j[G]=U-q+256&255:I===3?j[G]=U-Math.floor((H+q)/2)+256&255:j[G]=U-v(H,q,K)+256&255}let L=Buffer.alloc(1+g);L[0]=I,j.copy(L,1),D.push(L),z=F}let Z=Buffer.concat(D);for(let J of Y)for(let F of Q)for(let j of E)try{let L=et.deflateSync(Z,{level:9,memLevel:j,strategy:J,windowBits:F}),G=w.map(K=>({name:K.name,data:K.data})),U=G.findIndex(K=>K.name==="IDAT");U!==-1&&(G[U]={name:"IDAT",data:L});let H=ft("../../libroxify_native.node"),q=$(Buffer.from(H.encodePngChunks(G)));q.length<W.length&&(W=q)}catch{}}catch{}try{let I=[1e3,2e3];I.push(5e3,1e4,2e4);for(let D of I)try{let z=go(ho(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),Z=z+".out.png";mo(z,W);let J=["-y",`--iterations=${D}`,"--filters=01234mepb",z,Z];try{if(!(await r("zopflipng",J,24e4)).error&&fo(Z)){let j=po(Z);try{kn(z),kn(Z)}catch{}j.length<W.length&&(W=j)}}catch{}}catch{}}catch{}try{let I=go(ho(),`rox_adv_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`);if(mo(I,W),!cS("advdef",["-z4","-i10",I],{windowsHide:!0,stdio:"ignore",timeout:12e4}).error&&fo(I)){let z=po(I);try{kn(I)}catch{}z.length<W.length&&(W=z)}}catch{}for(let I of Y)try{let D=et.deflateSync(P,{level:9,memLevel:9,strategy:I}),z=w.map(j=>({name:j.name,data:j.data})),Z=z.findIndex(j=>j.name==="IDAT");Z!==-1&&(z[Z]={name:"IDAT",data:D});let J=ft("../../libroxify_native.node"),F=$(Buffer.from(J.encodePngChunks(z)));F.length<W.length&&(W=F)}catch{}try{let I=Buffer.alloc(c*l*3),D=null;for(let J=0;J<l;J++){let F=h[J*y],j=h.slice(J*y+1,J*y+1+g),L=Buffer.alloc(g);for(let G=0;G<g;G++){let U=G-3>=0?L[G-3]:0,H=D?D[G]:0,q=D&&G-3>=0?D[G-3]:0,K=j[G];F===0||(F===1?K=K+U&255:F===2?K=K+H&255:F===3?K=K+Math.floor((U+H)/2)&255:K=K+v(U,H,q)&255),L[G]=K}L.copy(I,J*g),D=L}let z=new Map,Z=[];for(let J=0;J<I.length;J+=3){let F=`${I[J]},${I[J+1]},${I[J+2]}`;if(!z.has(F)&&(z.set(F,z.size),Z.push(I[J],I[J+1],I[J+2]),z.size>256))break}if(z.size<=256){let J=1+c*1,F=[];for(let U=0;U<l;U++){let H=Buffer.alloc(c);for(let ve=0;ve<c;ve++){let Fe=(U*c+ve)*3,Ae=`${I[Fe]},${I[Fe+1]},${I[Fe+2]}`;H[ve]=z.get(Ae)}let q=0,K=1/0,se=null;for(let ve=0;ve<=4;ve++){let Fe=Buffer.alloc(c),Ae=0;for(let je=0;je<c;je++){let Rt=H[je],ct=0,Ve=je-1>=0?H[je-1]:0,he=U>0?F[U-1][je]:0,Oe=U>0&&je-1>=0?F[U-1][je-1]:0;ve===0?ct=Rt:ve===1?ct=Rt-Ve+256&255:ve===2?ct=Rt-he+256&255:ve===3?ct=Rt-Math.floor((Ve+he)/2)+256&255:ct=Rt-v(Ve,he,Oe)+256&255,Fe[je]=ct;let lt=ct>127?ct-256:ct;Ae+=Math.abs(lt)}Ae<K&&(K=Ae,q=ve,se=Fe)}let re=Buffer.alloc(J);re[0]=q,se.copy(re,1),F.push(re)}let j=new Map;for(let U=0;U<I.length;U+=3){let H=`${I[U]},${I[U+1]},${I[U+2]}`;j.set(H,(j.get(H)||0)+1)}let L=[];L.push({paletteArr:Z.slice(),map:new Map(z)});let G=Array.from(j.entries()).sort((U,H)=>H[1]-U[1]);if(G.length>0){let U=[],H=new Map,q=0;for(let[K]of G){let se=K.split(",").map(re=>Number(re));if(U.push(se[0],se[1],se[2]),H.set(K,q++),q>=256)break}H.size<=256&&L.push({paletteArr:U,map:H})}for(let U of L){let se=function(Ve,he){if(he===8)return Ve;let Oe=c*he,lt=Math.ceil(Oe/8),gt=Buffer.alloc(lt),Xt=0;for(let dt=0;dt<c;dt++){let nr=Ve[dt]&(1<<he)-1;for(let Zt=0;Zt<he;Zt++){let ke=nr>>he-1-Zt&1,yt=Math.floor(Xt/8),An=7-Xt%8;gt[yt]|=ke<<An,Xt++}}return gt},H=U.map.size,q=H<=2?1:H<=4?2:H<=16?4:8,K=[];for(let Ve=0;Ve<l;Ve++){let he=Buffer.alloc(c);for(let Oe=0;Oe<c;Oe++){let lt=(Ve*c+Oe)*3,gt=`${I[lt]},${I[lt+1]},${I[lt+2]}`;he[Oe]=U.map.get(gt)}K.push(he)}let re=[];for(let Ve=0;Ve<l;Ve++){let he=se(K[Ve],q),Oe=0,lt=1/0,gt=null;for(let dt=0;dt<=4;dt++){let nr=Buffer.alloc(he.length),Zt=0;for(let ke=0;ke<he.length;ke++){let yt=he[ke],An=ke-1>=0?he[ke-1]:0,Yr=Ve>0?re[Ve-1][ke]:0,No=Ve>0&&ke-1>=0?re[Ve-1][ke-1]:0,kt=0;dt===0?kt=yt:dt===1?kt=yt-An+256&255:dt===2?kt=yt-Yr+256&255:dt===3?kt=yt-Math.floor((An+Yr)/2)+256&255:kt=yt-v(An,Yr,No)+256&255,nr[ke]=kt;let sb=kt>127?kt-256:kt;Zt+=Math.abs(sb)}Zt<lt&&(lt=Zt,Oe=dt,gt=nr)}let Xt=Buffer.alloc(1+he.length);Xt[0]=Oe,gt.copy(Xt,1),re.push(Xt)}let ve=Buffer.concat(re),Fe=Buffer.from(U.paletteArr),Ae=[],je=Buffer.alloc(13);je.writeUInt32BE(c,0),je.writeUInt32BE(l,4),je[8]=q,je[9]=3,je[10]=0,je[11]=0,je[12]=0,Ae.push({name:"IHDR",data:je}),Ae.push({name:"PLTE",data:Fe}),Ae.push({name:"IDAT",data:et.deflateSync(ve,{level:9})}),Ae.push({name:"IEND",data:Buffer.alloc(0)});let Rt=ft("../../libroxify_native.node"),ct=$(Buffer.from(Rt.encodePngChunks(Ae)));ct.length<W.length&&(W=ct)}}}catch{}let A=[{cmd:"oxipng",args:["-o","6","--strip","all"]},{cmd:"optipng",args:["-o7"]},{cmd:"pngcrush",args:["-brute","-reduce"]},{cmd:"pngout",args:[]}];for(let I of A)try{let D=go(ho(),`rox_ext_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),z=D+".out.png";mo(D,W);let Z=I.args.concat([D,z]);if(!cS(I.cmd,Z,{windowsHide:!0,stdio:"ignore",timeout:24e4}).error&&fo(z)){let F=po(z);try{kn(D),kn(z)}catch{}F.length<W.length&&(W=F)}else try{kn(D)}catch{}}catch{}return W}catch{return t}}var lS=k(()=>{Ms()});import{writeFileSync as jc}from"fs";import{join as Vc}from"path";async function j_(t,e){let n=Buffer.from(fe.cropAndReconstitute(t));if(e){try{let r=fe.sharpMetadata(t),s=fe.sharpResizeImage(t,r.width*2,r.height*2,"nearest");console.log("DEBUG: writing doubled.png to",e),jc(Vc(e,"doubled.png"),Buffer.from(s))}catch(r){console.log("DEBUG: failed to write doubled.png",r?.message??r)}try{console.log("DEBUG: writing reconstructed.png and reconstructed-pixels.bin to",e),jc(Vc(e,"reconstructed.png"),n);let r=fe.sharpToRaw(n);jc(Vc(e,"reconstructed-pixels.bin"),Buffer.from(r.pixels))}catch(r){console.log("DEBUG: failed to write reconstructed artifacts",r?.message??r)}}return n}var uS=k(()=>{ln()});function q_(t,e){let n=Mn*Hc*(Gc/8),r=Hc*(Gc/8),s=0;t.write("RIFF",s,"ascii"),s+=4,t.writeUInt32LE(Os-8+e,s),s+=4,t.write("WAVE",s,"ascii"),s+=4,t.write("fmt ",s,"ascii"),s+=4,t.writeUInt32LE(16,s),s+=4,t.writeUInt16LE(1,s),s+=2,t.writeUInt16LE(Hc,s),s+=2,t.writeUInt32LE(Mn,s),s+=4,t.writeUInt32LE(n,s),s+=4,t.writeUInt16LE(r,s),s+=2,t.writeUInt16LE(Gc,s),s+=2,t.write("data",s,"ascii"),s+=4,t.writeUInt32LE(e,s)}function Z_(t,e,n){let r=t.length,s=Math.round(e*r/n),i=2*Math.PI*s/r,o=2*Math.cos(i),a=0,c=0;for(let u=0;u<r;u++){let d=t[u]+o*a-c;c=a,a=d}return(a*a+c*c-o*a*c)/(r*r)}function J_(t){let e=new Float64Array(un);for(let n=0;n<8;n++)if(t&1<<n){let r=Y_[n];for(let s=0;s<Ot;s++)e[s]+=r[s]}return e}function dS(t){let e=t.subarray(0,Ot),n=Ot,r=n*n,s=0;for(let i=0;i<8;i++){let{coeff:o}=X_[i],a=0,c=0;for(let u=0;u<n;u++){let d=e[u]+o*a-c;c=a,a=d}(a*a+c*c-o*a*c)/r>pS&&(s|=1<<i)}return s}function Q_(){let t=new Float64Array(Jn);for(let e=0;e<Ts.length;e++){let n=K_[e],r=e*dn;t.set(n,r)}return t}function eI(t){let e=Math.floor(dn/4),n=Math.min(t.length-Jn,Mn*2);for(let r=0;r<n;r+=e){let s=!0;for(let i=0;i<Ts.length;i++){let o=r+i*dn,a=t.subarray(o,o+dn);if(a.length<dn){s=!1;break}if(Z_(a,Ts[i],Mn)<pS*.5){s=!1;break}}if(s)return r+Jn}return-1}function tI(t,e={}){let n=e.eccLevel??"medium",r=Ns(t,n),s=r.length,i=Buffer.alloc(4);i.writeUInt32BE(s,0);let o=Buffer.concat([i,r]),a=Q_(),c=o.length,l=Math.floor(Mn*H_/1e3),d=(Jn+c*un+l)*2,f=Buffer.alloc(Os+d);q_(f,d);let p=Os;for(let h=0;h<Jn;h++){let m=Math.max(-1,Math.min(1,a[h]));f.writeInt16LE(Math.round(m*32767),p),p+=2}for(let h=0;h<c;h++){let m=J_(o[h]);for(let g=0;g<un;g++){let y=Math.max(-1,Math.min(1,m[g]));f.writeInt16LE(Math.round(y*32767),p),p+=2}}return f}function nI(t){if(t.length<Os)throw new Error("WAV too short");if(t.toString("ascii",0,4)!=="RIFF")throw new Error("Not a RIFF file");if(t.toString("ascii",8,12)!=="WAVE")throw new Error("Not a WAVE file");let e=12,n=0,r=0,s=16;for(;e+8<=t.length;){let g=t.toString("ascii",e,e+4),y=t.readUInt32LE(e+4);if(g==="fmt ")s=t.readUInt16LE(e+22);else if(g==="data"){n=e+8,r=y;break}e+=8+y,y%2!==0&&e++}if(n===0)throw new Error("No data chunk in WAV");let i=s/8,o=Math.floor(r/i),a=new Float64Array(o);for(let g=0;g<o;g++){let y=n+g*i;if(s===16)a[g]=t.readInt16LE(y)/32768;else if(s===8)a[g]=(t[y]-128)/128;else throw new Error(`Unsupported bits per sample: ${s}`)}let c=eI(a);c<0&&(c=Jn);let l=c,u=[];for(let g=0;g<4;g++){if(l+un>a.length)throw new Error("Audio too short: cannot read length prefix");let y=a.subarray(l,l+un);u.push(dS(y)),l+=un}let d=u[0]<<24|u[1]<<16|u[2]<<8|u[3];if(d<=0||d>1e7)throw new Error(`Invalid payload length: ${d}`);let f=[];for(let g=0;g<d&&!(l+un>a.length);g++){let y=a.subarray(l,l+un);f.push(dS(y)),l+=un}if(f.length===0)throw new Error("No data symbols detected in audio");let p=Buffer.from(f),{data:h,totalCorrected:m}=As(p);return{data:h,correctedErrors:m}}function rI(t){if(t.length<Os+Jn*2||t.toString("ascii",0,4)!=="RIFF"||t.toString("ascii",8,12)!=="WAVE")return!1;let e=12;for(;e+8<=t.length;){let n=t.toString("ascii",e,e+4),r=t.readUInt32LE(e+4);if(n==="fmt ")return t.readUInt16LE(e+22)===16;e+=8+r,r%2!==0&&e++}return!1}var Mn,Gc,Hc,fS,Ot,V_,un,G_,Ts,dn,Jn,pS,H_,Os,mS,Y_,K_,X_,hS=k(()=>{lo();Mn=44100,Gc=16,Hc=1,fS=[600,900,1200,1500,1800,2100,2400,2700],Ot=2048,V_=512,un=Ot+V_,G_=.35,Ts=[3200,2400,1600,800],dn=1024,Jn=Ts.length*dn,pS=5e-4,H_=200,Os=44;mS=new Float64Array(Ot);{let t=2*Math.PI/(Ot-1);for(let e=0;e<Ot;e++)mS[e]=.5*(1-Math.cos(t*e))}Y_=fS.map(t=>{let e=new Float64Array(Ot),n=2*Math.PI*t/Mn;for(let r=0;r<Ot;r++)e[r]=G_*mS[r]*Math.sin(n*r);return e}),K_=Ts.map(t=>{let e=new Float64Array(dn),n=2*Math.PI*t/Mn,r=2*Math.PI/(dn-1);for(let s=0;s<dn;s++){let i=.5*(1-Math.cos(r*s));e[s]=.3*i*Math.sin(n*s)}return e}),X_=fS.map(t=>{let e=Math.round(t*Ot/Mn),n=2*Math.PI*e/Ot;return{k:e,coeff:2*Math.cos(n)}})});function CS(){let t=[];for(let e=0;e<ut;e++){let n=[];for(let r=0;r<ut;r++){let s=e===0||e===6||r===0||r===6,i=e>=2&&e<=4&&r>=2&&r<=4;n.push(s||i)}t.push(n)}return t}function gS(t){let e=ut+vS,n=Math.ceil(Math.sqrt(t+4*e*e));n=Math.max(n,e*2+4);let r=n,s=n,i=new Uint8Array(r*s);for(let a=0;a<e;a++)for(let c=0;c<e;c++)i[a*r+c]=1;for(let a=0;a<e;a++)for(let c=r-e;c<r;c++)i[a*r+c]=1;for(let a=s-e;a<s;a++)for(let c=0;c<e;c++)i[a*r+c]=1;for(let a=s-e;a<s;a++)for(let c=r-e;c<r;c++)i[a*r+c]=1;let o=[];for(let a=0;a<s;a++){let c=a*r;for(let l=0;l<r;l++)i[c+l]||o.push([l,a])}return{gridW:r,gridH:s,dataPositions:o}}function sI(t,e,n,r){let s=e*r,i=n*r,o=Buffer.alloc(s*i*3),a=s*3;for(let c=0;c<n;c++){let l=t[c],u=c*r*a;for(let f=0;f<e;f++){let p=l[f],h=u+f*r*3;for(let m=0;m<r;m++){let g=h+m*3;o[g]=p,o[g+1]=p,o[g+2]=p}}let d=u;for(let f=1;f<r;f++)o.copy(o,u+f*a,d,d+a)}return{rgb:o,width:s,height:i}}function yo(t,e,n){let r=CS();for(let s=0;s<ut;s++)for(let i=0;i<ut;i++)t[n+s][e+i]=r[s][i]?0:255}function iI(t,e,n,r,s,i){let o=[];for(let a=0;a<i;a++){let c=new Uint8Array(s);for(let l=0;l<s;l++){let u=0,d=0;for(let f=0;f<r;f++)for(let p=0;p<r;p++){let h=a*r+f,m=l*r+p;if(h<n&&m<e){let g=(h*e+m)*3;u+=(t[g]+t[g+1]+t[g+2])/3,d++}}c[l]=d>0&&u/d>128?255:0}o.push(c)}return o}function wS(t,e,n){for(let r=2;r<=8;r++){let s=Math.floor(e/r),i=Math.floor(n/r);if(s<ut*2+4||i<ut*2+4)continue;let o=CS(),a=0,c=0;for(let l=0;l<ut;l++)for(let u=0;u<ut;u++){let d=o[l][u]?0:255,f=l*r+Math.floor(r/2),p=u*r+Math.floor(r/2);if(f>=n||p>=e)continue;let h=(f*e+p)*3,g=(t[h]+t[h+1]+t[h+2])/3>128?255:0;c++,g===d&&a++}if(c>0&&a/c>=.8)return{blockSize:r,gridW:s,gridH:i}}return null}function yS(t,e,n,r,s){let i=Buffer.alloc(14);return xS.copy(i,0),i[4]=t,i[5]=e,i.writeUInt32BE(n,6),i.writeUInt16BE(r,10),i.writeUInt16BE(s,12),new Uint8Array(i)}function oI(t){if(t.length<14)return null;let e=Buffer.from(t);return e.subarray(0,4).equals(xS)?{blockSize:e[4],eccLevel:e[5],dataLen:e.readUInt32BE(6),gridW:e.readUInt16BE(10),gridH:e.readUInt16BE(12)}:null}function SS(t){let e=new Uint8Array(t.length*8);for(let n=0;n<t.length;n++)for(let r=7;r>=0;r--)e[n*8+(7-r)]=t[n]>>r&1;return e}function aI(t){let e=Math.ceil(t.length/8),n=new Uint8Array(e);for(let r=0;r<e;r++){let s=0;for(let i=0;i<8;i++){let o=r*8+i;o<t.length&&t[o]&&(s|=1<<7-i)}n[r]=s}return n}function cI(t,e={}){let n=e.blockSize??4,r=e.eccLevel??"medium";if(n<2||n>8)throw new Error(`Block size must be 2\u20138, got ${n}`);let s=Ns(t,r),i=yS(n,bS[r],t.length,0,0),o=Buffer.concat([Buffer.from(i),s]),a=SS(new Uint8Array(o)),c=gS(a.length),l=yS(n,bS[r],t.length,c.gridW,c.gridH),u=Buffer.concat([Buffer.from(l),s]),d=SS(new Uint8Array(u)),f=gS(d.length);if(f.dataPositions.length<d.length)throw new Error(`Data too large for image: need ${d.length} blocks, have ${f.dataPositions.length}`);let{gridW:p,gridH:h,dataPositions:m}=f,g=[];for(let b=0;b<h;b++)g.push(new Uint8Array(p).fill(255));yo(g,0,0),yo(g,p-ut,0),yo(g,0,h-ut),yo(g,p-ut,h-ut);for(let b=0;b<d.length&&b<m.length;b++){let[P,_]=m[b];g[_][P]=d[b]?0:255}let{rgb:y,width:v,height:x}=sI(g,p,h,n);return fe?.rgbToPng?Buffer.from(fe.rgbToPng(y,v,x)):dI(y,v,x)}function lI(t){let e,n,r;if(fe?.sharpMetadata&&fe?.sharpToRaw){let v=fe.sharpMetadata(t);e=v.width,n=v.height;let x=fe.sharpToRaw(t);r=Buffer.from(x.pixels)}else throw new Error("Robust image decoding requires the native module (sharpMetadata + sharpToRaw)");let s=wS(r,e,n);if(!s)throw new Error("Could not detect finder patterns \u2014 image may be too corrupted");let{blockSize:i,gridW:o,gridH:a}=s,c=iI(r,e,n,i,o,a),l=ut+vS,u=new Uint8Array(o*a);for(let v=0;v<l;v++)for(let x=0;x<l;x++)u[v*o+x]=1;for(let v=0;v<l;v++)for(let x=o-l;x<o;x++)u[v*o+x]=1;for(let v=a-l;v<a;v++)for(let x=0;x<l;x++)u[v*o+x]=1;for(let v=a-l;v<a;v++)for(let x=o-l;x<o;x++)u[v*o+x]=1;let d=[];for(let v=0;v<a;v++){let x=v*o;for(let b=0;b<o;b++)u[x+b]||d.push([b,v])}let f=new Uint8Array(d.length);for(let v=0;v<d.length;v++){let[x,b]=d[v];b<c.length&&x<c[b].length&&(f[v]=c[b][x]===0?1:0)}let p=aI(f),h=oI(p);if(!h)throw new Error("Invalid robust image header \u2014 data may be corrupted");let m=Buffer.from(p.subarray(14)),{data:g,totalCorrected:y}=As(m);return{data:g.subarray(0,h.dataLen),correctedErrors:y}}function uI(t){try{if(!fe?.sharpMetadata||!fe?.sharpToRaw)return!1;let e=fe.sharpMetadata(t),n=fe.sharpToRaw(t),r=Buffer.from(n.pixels);return wS(r,e.width,e.height)!==null}catch{return!1}}function dI(t,e,n){let r=ft("zlib"),s=e*3,i=Buffer.alloc(n*(1+s));for(let u=0;u<n;u++)i[u*(1+s)]=0,t.copy(i,u*(1+s)+1,u*s,(u+1)*s);let o=r.deflateSync(i,{level:0}),a=Buffer.from([137,80,78,71,13,10,26,10]),c=Buffer.alloc(13);c.writeUInt32BE(e,0),c.writeUInt32BE(n,4),c[8]=8,c[9]=2,c[10]=0,c[11]=0,c[12]=0;function l(u,d){let f=Buffer.from(u,"ascii"),p=Buffer.alloc(4);p.writeUInt32BE(d.length,0);let h=Buffer.concat([f,d]),{crc32:m}=(Mc(),ub(V1)),g=m(d,m(f)),y=Buffer.alloc(4);return y.writeUInt32BE(g>>>0,0),Buffer.concat([p,h,y])}return Buffer.concat([a,l("IHDR",c),l("IDAT",o),l("IEND",Buffer.alloc(0))])}var ut,vS,xS,bS,_S=k(()=>{lo();ln();ut=7,vS=1,xS=Buffer.from("RBI1");bS={low:0,medium:1,quartile:2,high:3}});import{execSync as IS,spawn as fI}from"child_process";import{accessSync as pI,constants as mI,existsSync as hI}from"fs";import{dirname as $S,join as We}from"path";import{fileURLToPath as gI}from"url";import{chmodSync as yI,mkdtempSync as SI,readFileSync as bI,unlinkSync as vI,writeFileSync as xI}from"fs";import{tmpdir as CI}from"os";function fn(t){if(!hI(t))return!1;if(process.platform==="win32")return!0;try{return pI(t,mI.X_OK),!0}catch{return!1}}function qc(){let t={win32:["roxify_native.exe","roxify-cli.exe","roxify_cli.exe"],darwin:["rox-macos-universal","roxify_native-macos-arm64","roxify_native-macos-x64","roxify_native","roxify-cli","roxify_cli"],linux:["roxify_native","roxify-cli","roxify_cli"]},e=t[process.platform]||t.linux,n=So;for(let s of e){let i=We(n,s);if(fn(i))return i;let o=We(n,"..",s);if(fn(o))return o;let a=We(n,"..","dist",s);if(fn(a))return a}if(process.pkg){let s=[We(n,"..","..","target","release"),We(n,"..","target","release"),We(n,"target","release")];for(let i of s)for(let o of e){let a=We(i,o);if(fn(a))return a}try{let i=ft("path").dirname(process.execPath||"");if(i){let o=[We(i,"tools","roxify","dist"),We(i,"tools","roxify"),We(i,"..","tools","roxify","dist"),We(i,"..","tools","roxify")];for(let a of o)for(let c of e){let l=We(a,c);if(fn(l))return l}}}catch{}}try{let s=[];if(process.platform==="win32")try{let i=IS("where rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=i.split(/\r?\n/).map(o=>o.trim()).filter(Boolean))}catch{}else try{let i=IS("which rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=[i.trim()])}catch{}for(let i of s)try{let o=$S(i),a=[o,We(o,"dist"),We(o,"..","dist"),We(o,".."),We(o,"node_modules","roxify","dist")];for(let c of a)for(let l of e){let u=We(c,l);if(fn(u))return u}}catch{}}catch{}for(let s of e){let i=We(n,"..","..",s);if(fn(i))return i;let o=We(n,"..","..","..","..",s);if(fn(o))return o}let r=We(n,"..","..","target","release");for(let s of e){let i=We(r,s);if(fn(i))return i}return null}function PS(){return qc()!==null}function ES(t){let e=bI(t),n=SI(We(CI(),"roxify-")),r=We(n,t.replace(/.*[\\/]/,""));xI(r,e);try{yI(r,493)}catch{}return r}function bo(t,e){let n=qc();if(!n)throw new Error("Rust CLI binary not found");return new Promise((r,s)=>{let i=!1,o,a="",c=32,l=[],u=f=>{l.push(f),l.length>c&&l.shift()},d=f=>{let p,h=e?.collectStdout?["pipe","pipe","pipe"]:["pipe","inherit","pipe"];try{p=fI(f,t,{stdio:h})}catch(m){if(!i){i=!0;try{o=ES(n)}catch(g){return s(g)}return d(o)}return s(m)}if(e?.collectStdout&&p.stdout&&p.stdout.on("data",m=>{a+=m.toString()}),p.stderr){let m=!!e?.onProgress,g="";p.stderr.on("data",y=>{g+=y.toString();let v=g.split(`
`);g=v.pop()||"";for(let x of v){let b=m?x.match(/^PROGRESS:(\d+):(\d+):(.+)$/):null;b?e.onProgress(Number(b[1]),Number(b[2]),b[3]):x.trim()&&(u(x),process.stderr.write(x+`
`))}})}p.on("error",m=>{if(!i){i=!0;try{o=ES(n)}catch(g){return s(g)}return d(o)}s(m)}),p.on("close",(m,g)=>{if(o)try{vI(o)}catch{}if(m===0||m===null&&g===null)r(a);else{let y=l.length>0?`
  stderr tail:
    ${l.join(`
    `)}`:"";s(new Error(`Rust CLI exited with status ${m??g}${y}`))}})};d(n)})}async function kS(t,e,n=3,r,s="aes",i,o,a){if(!qc())throw new Error("Rust CLI binary not found");let l=["encode","--level",String(n)];i&&l.push("--name",i),r&&(l.push("--passphrase",r),l.push("--encrypt",s)),typeof o=="number"&&Number.isFinite(o)&&l.push("--ram-budget-mb",String(Math.max(1,Math.floor(o)))),l.push(t,e),await bo(l,{onProgress:a})}async function MS(t,e,n,r,s,i,o){let a=["decompress",t,e];n&&a.push("--passphrase",n),r&&r.length>0&&a.push("--files",JSON.stringify(r)),s&&a.push("--dict",s),typeof i=="number"&&Number.isFinite(i)&&a.push("--ram-budget-mb",String(Math.max(1,Math.floor(i)))),await bo(a,{onProgress:o})}async function NS(t){return bo(["list",t],{collectStdout:!0})}async function AS(t){return bo(["havepassphrase",t],{collectStdout:!0})}var So,TS=k(()=>{if(typeof __dirname<"u")So=__dirname;else try{So=$S(gI(import.meta.url))}catch{So=process.cwd()}});var OS=k(()=>{});async function wI(t,e=19,n,r){let s=[],i=0;for await(let l of t){if(!er&&!Yt)throw new Error("Native zstd compression not available");let u=Buffer.from(Yt&&r?Yt(l,e,r):er(l,e));s.push(u),i++,n&&n(i,0)}let o=Buffer.alloc(s.length*4),a=8+o.length;for(let l=0;l<s.length;l++)o.writeUInt32BE(s[l].length,l*4),a+=s[l].length;let c=Buffer.alloc(8);return c.writeUInt32BE(1515410500,0),c.writeUInt32BE(s.length,4),{chunks:[c,o,...s],totalLength:a}}async function _I(t,e=19,n,r){let i=null;if(Array.isArray(t)?t.reduce((f,p)=>f+p.length,0)<=33554432&&(i=Buffer.concat(t)):i=t,i&&i.length<=33554432){if(n&&n(0,1),!er&&!Yt)throw new Error("Native zstd compression not available");let d=Buffer.from(Yt&&r?Yt(i,e,r):er(i,e));return n&&n(1,1),[d]}let o=[];if(Array.isArray(t))for(let d of t)if(d.length<=33554432)o.push(d);else for(let f=0;f<d.length;f+=33554432)o.push(d.subarray(f,Math.min(f+33554432,d.length)));else for(let d=0;d<t.length;d+=33554432)o.push(t.subarray(d,Math.min(d+33554432,t.length)));let a=o.length,c=[];if(!er&&!Yt)throw new Error("Native zstd compression not available");for(let d=0;d<a;d++){let f=Buffer.from(Yt&&r?Yt(o[d],e,r):er(o[d],e));c.push(f),n&&n(d+1,a)}let l=Buffer.alloc(c.length*4);for(let d=0;d<c.length;d++)l.writeUInt32BE(c[d].length,d*4);let u=Buffer.alloc(8);return u.writeUInt32BE(1515410500,0),u.writeUInt32BE(c.length,4),[u,l,...c]}async function RS(t,e){if(t.length<8){if(e?.({phase:"decompress_start",total:1}),!Qn)throw new Error("Native zstd decompression not available");let a=Buffer.from(Qn(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}if(t.readUInt32BE(0)!==1515410500){if(process.env.ROX_DEBUG&&console.log("tryZstdDecompress: invalid magic"),e?.({phase:"decompress_start",total:1}),!Qn)throw new Error("Native zstd decompression not available");let a=Buffer.from(Qn(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}let r=t.readUInt32BE(4),s=[],i=8;for(let a=0;a<r;a++)s.push(t.readUInt32BE(i)),i+=4;e?.({phase:"decompress_start",total:r});let o=[];for(let a=0;a<r;a++){let c=s[a],l=t.subarray(i,i+c);if(i+=c,!Qn)throw new Error("Native zstd decompression not available");let u=Buffer.from(Qn(l));o.push(u),e?.({phase:"decompress_progress",loaded:a+1,total:r})}return e?.({phase:"decompress_done",loaded:r,total:r}),Buffer.concat(o)}async function II(t,e){return await RS(t,e)}var er,Yt,Qn,DS=k(()=>{ln();er=null,Yt=null,Qn=null;try{fe?.nativeZstdCompress&&(er=fe.nativeZstdCompress),fe?.nativeZstdCompressWithDict&&(Yt=fe.nativeZstdCompressWithDict),fe?.nativeZstdDecompress&&(Qn=fe.nativeZstdDecompress)}catch{}});var Yc={};Us(Yc,{CHUNK_TYPE:()=>no,COMPRESSION_MARKERS:()=>Xw,DataFormatError:()=>Tc,ENC_AES:()=>Kn,ENC_NONE:()=>$c,ENC_XOR:()=>Xn,FILTER_ZERO:()=>qw,FORMAT_MARKERS:()=>Zw,GF_EXP:()=>Tt,GF_LOG:()=>Zn,IncorrectPassphraseError:()=>qr,MAGIC:()=>ks,MARKER_COLORS:()=>kc,MARKER_END:()=>Kw,MARKER_START:()=>Yw,PIXEL_MAGIC:()=>ro,PIXEL_MAGIC_BLOCK:()=>Hw,PNG_HEADER:()=>so,PNG_HEADER_HEX:()=>Pc,PassphraseRequiredError:()=>Hr,adler32:()=>j1,applyXor:()=>J1,calcSyndromes:()=>zc,colorsToBytes:()=>p_,compressStream:()=>wI,crc32:()=>W1,cropAndReconstitute:()=>j_,decodeBlocksToData:()=>v_,decodePngToBinary:()=>__,decodeRobustAudio:()=>nI,decodeRobustImage:()=>lI,decodeWithRustCLI:()=>MS,deltaDecode:()=>y_,deltaEncode:()=>g_,eccDecode:()=>As,eccEncode:()=>Ns,encodeBinaryToPng:()=>D_,encodeDataToBlocks2x2:()=>b_,encodeRobustAudio:()=>tI,encodeRobustImage:()=>cI,encodeWithRustCLI:()=>kS,generatePalette256:()=>S_,gfDiv:()=>co,gfMul:()=>qt,gfPow:()=>eS,hasPassphraseInPng:()=>B_,havepassphraseWithRustCLI:()=>AS,isRobustAudioWav:()=>rI,isRobustImage:()=>uI,isRustBinaryAvailable:()=>PS,listFilesInPng:()=>U_,listWithRustCLI:()=>NS,native:()=>fe,optimizePngBuffer:()=>W_,packPaths:()=>Z1,packPathsToParts:()=>Nc,parallelZstdCompress:()=>_I,parallelZstdDecompress:()=>RS,polyEval:()=>tS,rsDecode:()=>rS,rsEncode:()=>nS,tryDecryptIfNeeded:()=>Lc,tryZstdDecompress:()=>II,unpackBuffer:()=>ao,unstretchImage:()=>I_});var Kc=k(()=>{Ms();Mc();Q1();lo();oS();Oc();Uc();aS();ln();lS();uS();hS();_S();TS();OS();DS();Ac()});gn();tt();import*as rb from"node:path";import{basename as tE}from"node:path";import{stdin as Pe,stdout as $e}from"node:process";import{createInterface as nE}from"node:readline";function ww(t){let e="",n=0;for(;n<t.length;)if(t[n]==="\x1B"&&t[n+1]==="["){for(n+=2;n<t.length&&(t.charAt(n)<"@"||t.charAt(n)>"~");)n++;n++}else e+=t[n],n++;return e}var pe={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},Br=class t{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let n=e.toString("utf8");for(let r=0;r<n.length;){let s=this._consumeSequence(n,r);r+=s}}_consumeSequence(e,n){let r=e.charAt(n);if(r==="\x1B"){if(e[n+1]==="["){let s=n+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(n,s+1);return this._handleEscape(i),s-n+1}if(e[n+1]==="O"){let s=e.slice(n,n+3);return this._handleEscape(s),3}return n+1<e.length?(this._handleAlt(e.charAt(n+1)),2):1}return this._handleChar(r),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break;default:break}}_handleAlt(e){let n=e.toLowerCase();if(n==="u"){this._doUndo();return}if(n==="e"){this._doRedo();return}if(n==="g"){this._enterGotoLine();return}if(n==="r"){this._doSearchReplace();return}if(n==="a"){this._toggleMark();return}n==="^"&&this._doUndo()}_handleChar(e){let n=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(n<32||n===127){this._handleControl(n);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break;default:break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break;default:break}}_handlePromptChar(e){let n=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let r=e.toLowerCase();if(r==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(r==="n"){this._onExit("aborted",this._getCurrentContent());return}if(n===3||n===7||r==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(n===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e);let r=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${r}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(n===13){let r=this._inputBuffer.trim();r&&(this._searchState={query:r,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):n>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(n===13){let r=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(r)&&r>0&&(this._cursorRow=Math.min(r-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(n===7||n===3){this._mode="normal",this.fullRedraw();return}n===127||n===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let n=this._scrollTop;this._clampScroll(),this._scrollTop===n?this._renderCursor():this._renderEditArea()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop===e?this._renderCursor():this._renderEditArea()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let n=this._scrollTop;this._clampScroll(),this._scrollTop===n?this._renderCursor():this._renderEditArea()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let n=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*n)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),n=this._cursorCol;for(;n<e.length&&/\w/.test(e.charAt(n));)n++;for(;n<e.length&&!/\w/.test(e.charAt(n));)n++;this._cursorCol=n,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),n=this._cursorCol;for(n>0&&n--;n>0&&!/\w/.test(e.charAt(n));)n--;for(;n>0&&/\w/.test(e.charAt(n-1));)n--;this._cursorCol=n,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let n=this._currentLine();this._lines[this._cursorRow]=n.slice(0,this._cursorCol)+e+n.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),n=e.slice(0,this._cursorCol),r=e.slice(this._cursorCol);this._lines[this._cursorRow]=n,this._lines.splice(this._cursorRow+1,0,r),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],n=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+n,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let n=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+n,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let n=this._undoStack.pop();n!==void 0&&(this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let n=this._redoStack.pop();n!==void 0&&(this._lines=n.lines,this._cursorRow=n.cursorRow,this._cursorCol=n.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:n}=this._searchState,r=n?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(n?this._lines[a]:this._lines[a].toLowerCase()).indexOf(r,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,n=this._cursorCol+1,r=this._lines.length,s=Math.round(e/r*100);this._renderStatusLine(`line ${e}/${r} (${s}%), col ${n}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}static _pad(e,n){return e.length>=n?e.slice(0,n):e+" ".repeat(n-e.length)}fullRedraw(){let e=[];e.push(pe.cursorHide()),e.push(pe.ed()),e.push(pe.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(pe.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(pe.cursorHide()),e.push(pe.cup(1,1)),this._buildTitleBar(e),e.push(pe.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(pe.cursorHide()),this._buildEditArea(e),e.push(pe.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let n=e-this._scrollTop+this._editAreaStart();if(n<this._editAreaStart()||n>=this._editAreaStart()+this._editAreaRows())return;let r=[];r.push(pe.cursorHide()),r.push(pe.cup(n,1)),r.push(pe.el());let s=this._lines[e]??"";r.push(this._renderLineText(s)),r.push(pe.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let n=[];n.push(pe.cursorHide()),n.push(pe.cup(this.rows-1,1)),n.push(pe.el()),n.push(pe.reverse(t._pad(e,this.cols))),n.push(pe.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderStatusBar(e){let n=[];n.push(pe.cursorHide()),n.push(pe.cup(this.rows,1)),n.push(pe.el()),n.push(e.slice(0,this.cols)),n.push(pe.cursorShow()),n.push(pe.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(n.join(""))}_buildTitleBar(e){let n=this._modified?"Modified":"",r=` GNU nano  ${this._filename||"New Buffer"}`,s=n,i=t._pad(r+" ".repeat(Math.max(0,Math.floor((this.cols-r.length-s.length)/2))),this.cols-s.length),o=t._pad(i+s,this.cols);e.push(pe.cup(1,1)),e.push(pe.reverse(o))}_buildEditArea(e){let n=this._editAreaRows();for(let r=0;r<n;r++){let s=this._scrollTop+r,i=this._editAreaStart()+r;e.push(pe.cup(i,1)),e.push(pe.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let n="",r=0;for(let s=0;s<e.length&&r<this.cols;s++)if(e[s]==="	"){let i=8-r%8,o=Math.min(i,this.cols-r);n+=" ".repeat(o),r+=o}else n+=e[s],r++;return n}_buildHelpBar(e){let n=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],r=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(pe.cup(this.rows-1,1)),e.push(pe.el()),e.push(this._buildShortcutRow(n)),e.push(pe.cup(this.rows,1)),e.push(pe.el()),e.push(this._buildShortcutRow(r))}_buildShortcutRow(e){let n=Math.floor(this.cols/(e.length/2)),r="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${pe.reverse(i)} ${o.padEnd(n-5)}${pe.reverse(a)} ${c.padEnd(n-5)}`;if(r+=l,ww(r).length>=this.cols)break}return r}_buildCursorPosition(){let e=this._currentLine(),n=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?n+=8-n%8:n++;let r=this._cursorRow-this._scrollTop+this._editAreaStart();return pe.cup(r,n+1)}_renderHelp(){let e=[];e.push(pe.cursorHide()),e.push(pe.ed()),e.push(pe.cup(1,1)),e.push(pe.reverse(t._pad(" GNU nano \u2014 Help",this.cols)));let n=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let r=0;r<n.length&&r+2<=this.rows-2;r++)e.push(pe.cup(r+2,1)),e.push(n[r].slice(0,this.cols));e.push(pe.cursorShow()),this._stream.write(e.join(""))}};var pc=(t,e)=>`\x1B[${t};${e}H`,b1="\x1B[?25l",_w="\x1B[?25h",mc="\x1B[2J\x1B[H";var ye={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},gc=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],Es=gc.length,Be=36,yc=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function Iw(t){let e=[];for(let n=0;n<t.length;n++){let r=[],s=t[n];for(let i=0;i<Be;i++){let o=s[i]??" ";yc.has(o)?r.push("wall"):o==="."?r.push("dot"):o==="o"?r.push("pellet"):r.push("empty")}e.push(r)}for(let n=15;n<=17;n++){let r=e[n];if(r)for(let s=15;s<=20;s++)r[s]==="empty"&&(r[s]="ghost-house")}return e}var _n=[0,1,0,-1],Yn=[1,0,-1,0],v1=[2,3,0,1],Ew=[0,1,2,3],$w=[3,2,1,0];function hc(t){return v1[t]}var zr=class{_stream;_onExit;_grid;_visualGrid;_gridRow(e){let n=this._grid[e];if(n===void 0)throw new Error(`PacmanGame: row ${e} out of range`);return n}_ghost(e){let n=this._ghosts[e];if(n===void 0)throw new Error(`PacmanGame: ghost ${e} not found`);return n}_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=Iw(gc),this._visualGrid=gc.map(n=>Array.from(n)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let n of e)(n==="dot"||n==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:ye.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:ye.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:ye.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:ye.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(b1+mc),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(_w+mc+ye.r)}handleInput(e){let n=this._escBuf+e.toString("utf8");this._escBuf="";let r=0;for(;r<n.length;){let s=n[r];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(r+2>=n.length){this._escBuf=n.slice(r);break}if(n[r+1]==="["){let i=n[r+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),r+=3;continue}r++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),r++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=hc(s.dir))}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),n=this._pacR,r=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,n,r),this._renderDiff()}_isWalkable(e,n,r=!1){if(e<0||e>=Es)return!1;let s=(n%Be+Be)%Be,i=this._grid[e]?.[s];return i==="wall"||!r&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+_n[this._pacNextDir],n=((this._pacC+Yn[this._pacNextDir])%Be+Be)%Be;this._isWalkable(e,n)&&(this._pacDir=this._pacNextDir);let r=this._pacR+_n[this._pacDir],s=((this._pacC+Yn[this._pacDir])%Be+Be)%Be;this._isWalkable(r,s)&&(this._pacR=r,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=hc(e.dir)))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let n=this._pacR+_n[this._pacDir]*4,r=this._pacC+Yn[this._pacDir]*4;return this._pacDir===3&&(r=this._pacC-4),[n,r]}case"Inky":{let n=this._ghost(0),r=this._pacR+_n[this._pacDir]*2,s=this._pacC+Yn[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[r*2-n.r,s*2-n.c]}case"Clyde":{let n=e.r-this._pacR,r=e.c-this._pacC;return n*n+r*r>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+_n[e.dir];l<15||l>17?e.dir=hc(e.dir):e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let r=[...Ew].filter(a=>a!==v1[e.dir]).filter(a=>{let c=e.r+_n[a],l=((e.c+Yn[a])%Be+Be)%Be;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")r.length>0&&(s=r[Math.floor(Math.random()*r.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of $w){if(!r.includes(u))continue;let d=e.r+_n[u],f=((e.c+Yn[u])%Be+Be)%Be,p=d-a,h=f-c,m=p*p+h*h;m<l&&(l=m,s=u)}}e.dir=s;let i=e.r+_n[e.dir],o=((e.c+Yn[e.dir])%Be+Be)%Be;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,n,r){for(let s=0;s<this._ghosts.length;s++){let i=this._ghost(s);if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s];if(a===void 0)continue;let c=a.r===this._pacR&&a.c===this._pacC&&i.r===n&&i.c===r;if(o||c)if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],n=String(this._score).padStart(6," "),r=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${ye.white}  1UP   HIGH SCORE${ye.r}`),e.push(`  ${ye.yellow}${n}${ye.r}   ${ye.white}${r}${ye.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<Es;o++){let a=s[o];for(let c=0;c<Be;c++){let l=this._grid[o]?.[c],u=a[c]??" ";yc.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=Es||o.c<0||o.c>=Be)continue;let a;if(o.mode==="eaten")a=`${ye.white}\xF6${ye.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${ye.white}\u15E3${ye.r}`:`${ye.blue}\u15E3${ye.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${ye.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${ye.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${ye.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${ye.yellow}${this._pacMouthOpen?a:"\u25EF"}${ye.r}`}this._pacR>=0&&this._pacR<Es&&this._pacC>=0&&this._pacC<Be&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<Es;o++){let a="";for(let c=0;c<Be;c++){let l=s[o][c];l.includes("\x1B")?a+=l:yc.has(l)?a+=`${ye.blue}${l}${ye.r}`:l==="\xB7"?a+=`${ye.dim}\xB7${ye.r}`:l==="\u25A0"?a+=`${ye.white}\u25A0${ye.r}`:a+=l}e.push(a)}let i=`${ye.yellow}\u15E7${ye.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${ye.yellow}${this._level}${ye.r}`),e.push(`  ${ye.dim}WASD/arrows  Q=quit${ye.r}`),this._msg&&(e[18]=`        ${ye.yellow}${ye.blink}${this._msg}${ye.r}`),e}_renderFull(){let e=this._buildLines(),n=b1+mc;for(let r=0;r<e.length;r++)n+=pc(r+1,1)+(e[r]??"")+"\x1B[K";this._stream.write(n),this._prevLines=e}_renderDiff(){let e=this._buildLines(),n="";for(let r=0;r<e.length;r++){let s=e[r]??"";s!==this._prevLines[r]&&(n+=pc(r+1,1)+s+"\x1B[K")}for(let r=e.length;r<this._prevLines.length;r++)n+=pc(r+1,1)+"\x1B[K";n&&this._stream.write(n),this._prevLines=e}};Va();function Ki(t,e,n){let r=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(n){let s=new Date(n.at),i=Number.isNaN(s.getTime())?n.at:Ni(s);r.push(`Last login: ${i} from ${n.from||"unknown"}`)}return r.push(""),`${r.map(s=>`${s}\r
`).join("")}`}function Pw(t,e,n,r,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=r===i?"~":r.startsWith(`${i}/`)?`~${r.slice(i.length)}`:r,a=r.split("/").at(-1)||"/",c=t.replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,n.split(".")[0]??n).replace(/\\H/g,n).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\");return s?c=c.replace(/\\\[/g,"").replace(/\\\]/g,""):c=c.replace(/\\\[/g,"").replace(/\\\]/g,""),c}function Wr(t,e,n,r,s,i=!1){if(r)return Pw(r,t,e,s??n,i);let o=t==="root",a=p=>i?`${p}`:p,c=a("\x1B[37m"),l=a(o?"\x1B[1;31m":"\x1B[1;35m"),u=a("\x1B[1;34m"),d=o?a("\x1B[1;31m"):"";return`${c}[${l}${t}${c}@${u}${e}${c} ${n}]${d}${o?"#":"$"}\x1B[0m `}ii();import{EventEmitter as ZI}from"node:events";function x1(t){return t==="1"||t==="true"}function C1(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function kw(){return x1(process.env.DEV_MODE)||x1(process.env.RENDER_PERF)}function Xi(t){let e=kw();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let n=C1(),r=i=>{let o=C1()-n;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:r,done:(i="done")=>{r(i)}}}import*as Kt from"node:os";import*as LS from"node:crypto";import{EventEmitter as EI}from"node:events";import*as me from"node:fs";import*as Ge from"node:path";import{gunzipSync as vo,gzipSync as FS}from"node:zlib";var xc=Buffer.from([86,70,83,33]),Mw=3,Sc=1,_1=2,I1=3,E1={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},$1={};for(let[t,e]of Object.entries(E1))$1[e]=t;var bc=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let n=Buffer.allocUnsafe(1);n.writeUInt8(e,0),this._chunks.push(n)}writeUint16(e){let n=Buffer.allocUnsafe(2);n.writeUInt16LE(e,0),this._chunks.push(n)}writeUint32(e){let n=Buffer.allocUnsafe(4);n.writeUInt32LE(e,0),this._chunks.push(n)}writeFloat64(e){let n=Buffer.allocUnsafe(8);n.writeDoubleBE(e,0),this._chunks.push(n)}writeString(e){let n=Buffer.from(e,"utf8");this.writeUint16(n.length),this._chunks.push(n)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function P1(t,e){if(e.type==="file"){let n=e;t.writeUint8(Sc),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(n.compressed?1:0),t.writeBytes(n.content)}else if(e.type==="stub"){let n=e;t.writeUint8(Sc),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(n.stubContent,"utf8"))}else if(e.type==="device"){let n=e;t.writeUint8(I1),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt),t.writeUint8(E1[n.deviceKind]??0),t.writeUint8(n.major),t.writeUint8(n.minor)}else{let n=e;t.writeUint8(_1),t.writeString(n.name),t.writeUint32(n.mode),t.writeUint32(n.uid),t.writeUint32(n.gid),t.writeFloat64(n.createdAt),t.writeFloat64(n.updatedAt);let r=Object.values(n.children);t.writeUint32(r.length);for(let s of r)P1(t,s)}}function Cc(t){let e=new bc;return e.write(xc),e.writeUint8(Mw),P1(e,t),e.toBuffer()}var vc=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),n=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,n}readBytes(){let e=this.readUint32(),n=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,n}remaining(){return this.buf.length-this._pos}};function k1(t,e){let n=t.readUint8(),r=Nw(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(n===Sc){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(n===I1){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),f=$1[l]??"null";return{type:"device",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:f,major:u,minor:d}}if(n===_1){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let f=k1(t,e);u[f.name]=f}return{type:"directory",name:r,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${n.toString(16)}`)}var $s=new Map,w1=500;function Nw(t){let e=$s.get(t);if(e!==void 0)return e;if($s.size>=w1){let n=Math.floor(w1/4),r=[...$s.keys()];for(let s=0;s<n;s++)$s.delete(r[s])}return $s.set(t,t),t}function In(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(xc))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let n=new vc(t);n.readUint8(),n.readUint8(),n.readUint8(),n.readUint8();let s=n.readUint8()>=2,i=k1(n,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function M1(t){return t.length>=4&&t.slice(0,4).equals(xc)}var Zi={readLatencyMs:5,writeLatencyMs:10,sequentialReadThroughput:500,sequentialWriteThroughput:300};var Ji=class{_cache=new Map;_maxEntries;_maxMemoryBytes;_policy;_diskIo;_simulateDiskIo;_hits=0;_misses=0;_evictions=0;_totalMemoryUsage=0;constructor(e={}){this._maxEntries=e.maxEntries??1e3,this._maxMemoryBytes=e.maxMemoryBytes??64*1024*1024,this._policy=e.policy??"lru",this._simulateDiskIo=e.simulateDiskIo??!0;let n=e.diskIo??{};this._diskIo={readLatencyMs:n.readLatencyMs??Zi.readLatencyMs,writeLatencyMs:n.writeLatencyMs??Zi.writeLatencyMs,sequentialReadThroughput:n.sequentialReadThroughput??Zi.sequentialReadThroughput,sequentialWriteThroughput:n.sequentialWriteThroughput??Zi.sequentialWriteThroughput}}async get(e,n){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);if(this._misses++,this._simulateDiskIo){let i=await n(),o=i.length/this._diskIo.sequentialReadThroughput,a=this._diskIo.readLatencyMs+o;return await this._delay(a),this._set(e,i),i}let s=await n();return this._set(e,s),s}getSync(e,n){let r=this._cache.get(e);if(r)return this._hits++,r.lastAccessedAt=Date.now(),r.accessCount++,Buffer.from(r.content);this._misses++;let s=n();if(this._simulateDiskIo){let i=s.length/this._diskIo.sequentialReadThroughput,o=this._diskIo.readLatencyMs+i;this._syncDelay(o)}return this._set(e,s),s}async set(e,n,r){if(this._simulateDiskIo&&r){let s=n.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;await r(n),await this._delay(i)}else r&&await r(n);this._set(e,n)}setSync(e,n,r){if(this._simulateDiskIo&&r){r(n);let s=n.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;this._syncDelay(i)}else r&&r(n);this._set(e,n)}has(e){return this._cache.has(e)}delete(e){let n=this._cache.get(e);return n?(this._totalMemoryUsage-=n.size,this._cache.delete(e),!0):!1}clear(){this._cache.clear(),this._totalMemoryUsage=0}getStats(){let e=this._hits+this._misses;return{hits:this._hits,misses:this._misses,evictions:this._evictions,entries:this._cache.size,memoryUsage:this._totalMemoryUsage,hitRate:e>0?this._hits/e*100:0}}resetStats(){this._hits=0,this._misses=0,this._evictions=0}getPolicy(){return this._policy}getDiskIoParams(){return{...this._diskIo}}updateDiskIoParams(e){e.readLatencyMs!==void 0&&(this._diskIo.readLatencyMs=e.readLatencyMs),e.writeLatencyMs!==void 0&&(this._diskIo.writeLatencyMs=e.writeLatencyMs),e.sequentialReadThroughput!==void 0&&(this._diskIo.sequentialReadThroughput=e.sequentialReadThroughput),e.sequentialWriteThroughput!==void 0&&(this._diskIo.sequentialWriteThroughput=e.sequentialWriteThroughput)}_set(e,n){let r=this._cache.get(e);r&&(this._totalMemoryUsage-=r.size);let s=n.length;for(;(this._cache.size>=this._maxEntries||this._totalMemoryUsage+s>this._maxMemoryBytes)&&this._evictOne(););let i={content:Buffer.from(n),insertedAt:Date.now(),lastAccessedAt:Date.now(),accessCount:1,size:s};this._cache.set(e,i),this._totalMemoryUsage+=s}_evictOne(){if(this._cache.size===0)return!1;let e=null;switch(this._policy){case"lru":e=this._findLru();break;case"lfu":e=this._findLfu();break;case"fifo":e=this._findFifo();break;default:throw new Error(`Unknown eviction policy: ${this._policy}`)}if(e){let n=this._cache.get(e);return this._totalMemoryUsage-=n.size,this._cache.delete(e),this._evictions++,!0}return!1}_findLru(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.lastAccessedAt<e&&(e=s.lastAccessedAt,n=r);return n}_findLfu(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.accessCount<e&&(e=s.accessCount,n=r);return n}_findFifo(){let e=Number.POSITIVE_INFINITY,n=null;for(let[r,s]of this._cache)s.insertedAt<e&&(e=s.insertedAt,n=r);return n}_delay(e){return new Promise(n=>setTimeout(n,e))}_syncDelay(e){if(e<=0)return;let n=Date.now();for(;Date.now()-n<e;);}};import*as ze from"node:fs";import{dirname as Aw}from"node:path";var Ce={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},Ps="utf8";function Tw(t,e,n){let r=Buffer.from(n,Ps);return t.writeUInt16LE(r.length,e),r.copy(t,e+2),2+r.length}function Ow(t){let e=Buffer.from(t.path,Ps),n=0;t.op===Ce.WRITE?n=4+(t.content?.length??0)+4:t.op===Ce.MKDIR?n=4:t.op===Ce.REMOVE?n=0:t.op===Ce.CHMOD?n=4:(t.op===Ce.MOVE||t.op===Ce.SYMLINK)&&(n=2+Buffer.byteLength(t.dest??"",Ps));let r=3+e.length+n,s=Buffer.allocUnsafe(r),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===Ce.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===Ce.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===Ce.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===Ce.MOVE||t.op===Ce.SYMLINK)&&(i+=Tw(s,i,t.dest??""));return s}function Rw(t){let e=[],n=0;try{for(;n<t.length&&!(n+3>t.length);){let r=t.readUInt8(n++),s=t.readUInt16LE(n);if(n+=2,n+s>t.length)break;let i=t.subarray(n,n+s).toString(Ps);if(n+=s,r===Ce.WRITE){if(n+4>t.length)break;let o=t.readUInt32LE(n);if(n+=4,n+o+4>t.length)break;let a=Buffer.from(t.subarray(n,n+o));n+=o;let c=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,content:a,mode:c})}else if(r===Ce.MKDIR){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===Ce.REMOVE)e.push({op:r,path:i});else if(r===Ce.CHMOD){if(n+4>t.length)break;let o=t.readUInt32LE(n);n+=4,e.push({op:r,path:i,mode:o})}else if(r===Ce.MOVE||r===Ce.SYMLINK){if(n+2>t.length)break;let o=t.readUInt16LE(n);if(n+=2,n+o>t.length)break;let a=t.subarray(n,n+o).toString(Ps);n+=o,e.push({op:r,path:i,dest:a})}else break}}catch{}return e}function N1(t,e){let n=Ow(e);if(ze.existsSync(t)){let r=ze.openSync(t,ze.constants.O_WRONLY|ze.constants.O_CREAT|ze.constants.O_APPEND);try{ze.writeSync(r,n)}finally{ze.closeSync(r)}}else{let r=Aw(t);ze.existsSync(r)||ze.mkdirSync(r,{recursive:!0}),ze.writeFileSync(t,n)}}function wc(t){if(!ze.existsSync(t))return[];let e=ze.readFileSync(t);return e.length===0?[]:Rw(e)}function A1(t){ze.existsSync(t)&&ze.unlinkSync(t)}import*as Qi from"node:path";function ce(t){if(!t||t.trim()==="")return"/";let e=Qi.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function Dw(t,e){let n=ce(e);return Ne(t,n)}function Ne(t,e){if(e==="/")return t;let n=t,r=1;for(;r<=e.length;){let s=e.indexOf("/",r),i=s===-1?e.length:s,o=e.slice(r,i);if(o){if(n.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=n.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);n=a}if(s===-1)break;r=s+1}return n}function En(t,e,n,r){let s=ce(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=Qi.posix.dirname(s),o=Qi.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);n&&r(i);let a=Dw(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var _c=4,$n=2,cn=1;function At(t,e,n,r,s){let i=ce(e),o=Ne(t,i);if(n===0){if(s&cn&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(n===o.uid?a=o.mode>>6&7:r===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function jr(t,e,n,r){let s=ce(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{At(t,o,n,r,cn)}catch(c){if(c instanceof Error&&c.message.includes("does not exist"))return;throw new Error(`EACCES: permission denied: '${o}'`)}}}function T1(t,e,n,r,s){let i=ce(e),o=Ne(t,i);if(At(t,i,r,s,$n|cn),o.mode&512&&r!==0&&r!==o.uid){let a=o.children[n];if(a&&a.uid!==r)throw new Error(`EACCES: permission denied: cannot delete '${n}' (sticky bit)`)}}function O1(t){if(t!==0)throw new Error("EPERM: operation not permitted: chown")}function R1(t,e,n){let r=ce(e),s=Ne(t,r);if(n!==0&&n!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${r}'`)}Ba();import*as Ke from"node:fs";import*as Vr from"node:path";import{createHash as Fw}from"node:crypto";var eo=class t{_swapDir;_entries=new Map;_swapIns=0;_swapOuts=0;constructor(e){this._swapDir=e}initialize(){Ke.existsSync(this._swapDir)||Ke.mkdirSync(this._swapDir,{recursive:!0}),this._loadExistingEntries()}swapOut(e,n,r){let s=t._hashPath(e),i=Vr.join(this._swapDir,`${s}.swap`),o=Buffer.alloc(5);o.writeUInt32LE(n.length,0),o.writeUInt8(r?1:0,4);let a=`${i}.tmp`;Ke.writeFileSync(a,Buffer.concat([o,n])),Ke.renameSync(a,i),this._entries.set(e,{vfsPath:e,size:n.length,compressed:r,lastAccess:Date.now()}),this._swapOuts++}swapIn(e){let n=this._entries.get(e);if(!n)return null;let r=t._hashPath(e),s=Vr.join(this._swapDir,`${r}.swap`);try{if(!Ke.existsSync(s))return this._entries.delete(e),null;let i=Ke.readFileSync(s);if(i.length<5)return this._entries.delete(e),null;let o=i.readUInt32LE(0),a=i.subarray(5);if(a.length!==o)return this._entries.delete(e),null;n.lastAccess=Date.now(),this._swapIns++;try{Ke.unlinkSync(s)}catch{}return this._entries.delete(e),a}catch{return this._entries.delete(e),null}}hasSwapped(e){if(!this._entries.get(e))return!1;let r=t._hashPath(e),s=Vr.join(this._swapDir,`${r}.swap`);return Ke.existsSync(s)}deleteSwap(e){let n=t._hashPath(e),r=Vr.join(this._swapDir,`${n}.swap`);try{Ke.unlinkSync(r)}catch{}this._entries.delete(e)}getEntry(e){return this._entries.get(e)}getLruEntries(){return Array.from(this._entries.values()).filter(e=>this.hasSwapped(e.vfsPath)).sort((e,n)=>e.lastAccess-n.lastAccess)}getStats(){let e=0,n=0,r=0;for(let s of this._entries.values())this.hasSwapped(s.vfsPath)&&(r++,n+=s.size,e+=s.size+5);return{filesSwapped:r,diskUsage:e,originalSize:n,swapIns:this._swapIns,swapOuts:this._swapOuts}}clear(){for(let e of this._entries.values())this.deleteSwap(e.vfsPath);this._entries.clear(),this._swapIns=0,this._swapOuts=0}getSwapCount(){return this._entries.size}static _hashPath(e){return Fw("sha256").update(e).digest("hex").slice(0,16)}_loadExistingEntries(){try{let e=Ke.readdirSync(this._swapDir);for(let n of e){if(!n.endsWith(".swap"))continue;let r=Vr.join(this._swapDir,n);try{let s=Ke.statSync(r);if(s.size<5)continue;let i=Ke.readFileSync(r),o=i.readUInt32LE(0),a=i.readUInt8(4)===1,c=n.replace(".swap","");this._entries.set(`__hash:${c}`,{vfsPath:`__hash:${c}`,size:o,compressed:a,lastAccess:s.mtimeMs})}catch{}}}catch{}}};Sr();var Ht=512,Lw=Buffer.alloc(1024),to=257,F1="ustar\0";function L1(t){return t.slice(to,to+6).toString("ascii")===F1}function Pn(t,e){return`${t.toString(8).padStart(e-1,"0")}\0`}function Uw(t,e,n,r){let s=Buffer.alloc(Ht),i=(l,u,d)=>{let f=Buffer.from(l,"ascii");f.copy(s,u,0,Math.min(f.length,d))},o=n&&!t.endsWith("/")?`${t}/`:t,a=r.typeflag??(n?53:48);Bw(o,s),i(Pn(r.mode,8),100,8),i(Pn(r.uid,8),108,8),i(Pn(r.gid,8),116,8),i(Pn(e,12),124,12),i(Pn(Math.floor(r.mtime/1e3),12),136,12),s[156]=a,r.linkname&&i(r.linkname,157,100),i(F1,257,6),i("00",263,2),i("root\0",265,32),i("root\0",297,32),r.devmajor!==void 0&&i(Pn(r.devmajor,8),329,8),r.devminor!==void 0&&i(Pn(r.devminor,8),337,8);for(let l=148;l<156;l++)s[l]=32;let c=0;for(let l=0;l<Ht;l++)c+=s[l];return Buffer.from(`${Pn(c,7)} `).copy(s,148),s}function Bw(t,e){let n=(r,s,i)=>{let o=Buffer.from(r,"ascii");o.copy(e,s,0,Math.min(o.length,i))};if(Buffer.byteLength(t,"ascii")<=100)n(t,0,100);else{let r=t.lastIndexOf("/",t.length-101);if(r>0&&r<=155){let s=t.slice(0,r),i=t.slice(r+1);n(s,345,155),n(i,0,100)}else n(t,0,100)}}function zw(t){let e=t%Ht;return e===0?Buffer.alloc(0):Buffer.alloc(Ht-e)}function Ww(t){let e=[];for(let n of t){let r=Uw(n.name,n.isDir?0:n.content.length,n.isDir,n);e.push(r),!n.isDir&&n.content.length>0&&(e.push(n.content),e.push(zw(n.content.length)))}return e.push(Lw),Buffer.concat(e)}function U1(t,e,n){for(let r of Object.values(t.children)){let s=e?`${e}/${r.name}`:`/${r.name}`;if(r.type==="directory")n.push({name:s,content:Buffer.alloc(0),isDir:!0,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt}),U1(r,s,n);else if(r.type==="file"){let i=r.mode===41471;n.push({name:s,content:i?Buffer.alloc(0):r.content,isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt,linkname:i?r.content.toString("utf8"):void 0,typeflag:i?50:48})}else r.type==="stub"?n.push({name:s,content:Buffer.from(r.stubContent,"utf8"),isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt}):r.type==="device"&&n.push({name:s,content:Buffer.alloc(0),isDir:!1,mode:r.mode,uid:r.uid,gid:r.gid,mtime:r.updatedAt,typeflag:51,devmajor:r.major,devminor:r.minor})}}function B1(t){if(t.name!=="")throw new Error("encodeTar: root must be unnamed (name === '')");let e=[{name:"/",content:Buffer.alloc(0),isDir:!0,mode:t.mode,uid:t.uid,gid:t.gid,mtime:t.updatedAt}];return U1(t,"",e),Ww(e)}function Gr(t){let e=t.replace(/\0/g,"").trim();return e&&Number.parseInt(e,8)||0}function jw(t){let e=[],n=0;for(;n+Ht<=t.length;){let r=t.slice(n,n+Ht);if(r.every(x=>x===0))break;let s=r.slice(to,to+6).toString("ascii");if(s!=="ustar\0"&&s!=="ustar "){n+=Ht;continue}let i=r.slice(345,500).toString("ascii").replace(/\0.*/,"").trim(),o=r.slice(0,100).toString("ascii").replace(/\0.*/,"").trim(),a=i?`${i}/${o}`:o,c=Gr(r.slice(124,135).toString("ascii")),l=r[156]??0,u=Gr(r.slice(100,107).toString("ascii")),d=Gr(r.slice(108,115).toString("ascii")),f=Gr(r.slice(116,123).toString("ascii")),p=r.slice(136,147).toString("ascii").replace(/\0.*/,"").trim(),h=p?Number.parseInt(p,8)*1e3:Date.now(),m=r.slice(157,257).toString("ascii").replace(/\0.*/,"").trim(),g=Gr(r.slice(329,336).toString("ascii")),y=Gr(r.slice(337,344).toString("ascii"));n+=Ht;let v=t.slice(n,n+c);n+=Math.ceil(c/Ht)*Ht,!(l===103||l===120)&&e.push({name:a,content:v,mode:u,uid:d,gid:f,mtime:h,typeflag:l,linkname:m,devmajor:g,devminor:y})}return e}function Ic(t,e,n,r,s){return{type:"directory",name:t,mode:e,uid:n,gid:r,createdAt:s,updatedAt:s,children:Object.create(null),_childCount:0,_sortedKeys:null}}function D1(t,e,n,r,s,i){return{type:"file",name:t,content:e,mode:n,uid:r,gid:s,compressed:!1,createdAt:i,updatedAt:i}}function Vw(t,e,n,r,s,i,o,a){return{type:"device",name:t,deviceKind:e,mode:n,uid:r,gid:s,major:i,minor:o,createdAt:a,updatedAt:a}}function Gw(t){return t!==51&&t!==52?null:"null"}function Ec(t){let e=t;if(e.length>2&&e[0]===31&&e[1]===139)try{e=Buffer.from(Lt(e))}catch{throw new Error("decodeTar: gzip decompression failed")}let n=jw(e),r=Ic("",493,0,0,Date.now());for(let s of n){let o=s.name.replace(/\/$/,"").split("/").filter(Boolean);if(o.length===0)continue;let a=r;for(let l=0;l<o.length-1;l++){let u=o[l],d=a.children[u];if(d||(d=Ic(u,493,s.uid,s.gid,s.mtime),a.children[u]=d,a._childCount++,a._sortedKeys=null),d.type!=="directory")break;a=d}let c=o[o.length-1];if(s.typeflag===53){a.children[c]||(a.children[c]=Ic(c,s.mode||493,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null);continue}if(s.typeflag===50&&s.linkname){a.children[c]||(a.children[c]=D1(c,Buffer.from(s.linkname,"utf8"),41471,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null);continue}if(s.typeflag===51){let l=Gw(s.typeflag)??"null";a.children[c]||(a.children[c]=Vw(c,l,s.mode||438,s.uid,s.gid,s.devmajor,s.devminor,s.mtime),a._childCount++,a._sortedKeys=null);continue}(s.typeflag===48||s.typeflag===0||s.typeflag===0)&&!a.children[c]&&(a.children[c]=D1(c,s.content,s.mode||420,s.uid,s.gid,s.mtime),a._childCount++,a._sortedKeys=null)}return r}var Xc=class t extends EI{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;_swapStore=null;_swapEnabled;_fileCache=null;_cacheEnabled;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_roxifyCompression;_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');if(this._snapshotFile=Ge.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Ge.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500,this._swapEnabled=e.swapEnabled??!1,this._roxifyCompression=e.roxifyCompression??!1,this._swapEnabled){let r=e.swapDir??Ge.resolve(e.snapshotPath,"swap");this._swapStore=new eo(r),this._swapStore.initialize()}let n=e.flushIntervalMs??1e3;n>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},n),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0,this._swapEnabled=!1,this._roxifyCompression=!1;if(this._cacheEnabled=e.cache?.enabled??!1,this._cacheEnabled){let n={maxEntries:e.cache?.maxEntries,maxMemoryBytes:e.cache?.maxMemoryBytes,policy:e.cache?.policy,diskIo:e.cache?.diskIo,simulateDiskIo:e.cache?.simulateDiskIo};this._fileCache=new Ji(n)}this._root=t._makeDir("",493)}static _makeDir(e,n,r=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:n,uid:r,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}static _makeFile(e,n,r,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:n,mode:r,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}static _makeStub(e,n,r,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:n,mode:r,uid:s,gid:i,createdAt:o,updatedAt:o}}static _makeDeviceNode(e,n,r,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:n,mode:r,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,n,r=420){let s=ce(e),{parent:i,name:o}=En(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=t._makeStub(o,n,r))}mknod(e,n,r=438,s=1,i=0){let o=ce(e),{parent:a,name:c}=En(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=t._makeDeviceNode(c,n,r,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:n}),this._journal({op:Ce.MKDIR,path:o,mode:r})}fdOpen(e,n=0){let r=ce(e),s=this.exists(r);if(!(s||n&64))throw new Error(`ENOENT: no such file or directory, open '${r}'`);!s&&n&64&&this.writeFile(r,"",{mode:420}),n&512&&this.writeFile(r,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:r,flags:n,refCount:1}),i}fdClose(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);n.refCount--,n.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let r=this._nextFd++;return this._fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdDup2(e,n){if(e===n)return n;let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(n);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(n)),this._fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdPath(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.path}fdFlags(e){let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);return n.flags}getOpenFds(){let e=new Map;for(let[n,r]of this._fdTable)e.set(n,r.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,n,r,s){let i=ce(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=t._makeDir(l,n),r!==void 0&&(u.uid=r),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:n}),this._journal({op:Ce.MKDIR,path:c,mode:n});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(this._mode!=="fs"||!this._snapshotFile)return;let e=this._roxifyCompression?this._snapshotFile.replaceAll(".vfsb",".rvfsb"):this._snapshotFile;if(!me.existsSync(e)){if(this._journalFile){let n=wc(this._journalFile);n.length>0&&this._replayJournal(n)}return}try{let n=Buffer.alloc(0);if(this._roxifyCompression){let r=null;try{r=await Promise.resolve().then(()=>(Kc(),Yc))}catch{console.warn(`
						[VirtualFileSystem] Roxify decompression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`)}let s=this._snapshotFile.replaceAll(".vfsb",".rvfsb");if(me.existsSync(s)){let i=me.readFileSync(s);n=(await r?.decodePngToBinary(i)).buf}else n=me.readFileSync(this._snapshotFile)}else n=me.readFileSync(this._snapshotFile);if(M1(n))this._root=In(n);else if(Ua(n))this._root=ki(n),console.info("[VirtualFileSystem] Loaded snapshot from squashfs format; will migrate to VFSB on next flush.");else if(L1(n)||n.length>2&&n[0]===31&&n[1]===139)this._root=Ec(n),console.info("[VirtualFileSystem] Loaded snapshot from tar format; will migrate to VFSB on next flush.");else{let r=JSON.parse(n.toString("utf8"));this._root=this._deserializeDir(r.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let r=wc(this._journalFile);r.length>0&&this._replayJournal(r)}}catch(n){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,n instanceof Error?n.message:String(n))}}flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Ge.dirname(this._snapshotFile);me.mkdirSync(e,{recursive:!0});let n=this._root,r=Cc(n);this._roxifyCompression?new Promise(async(s,i)=>{let o=null;try{o=await Promise.resolve().then(()=>(Kc(),Yc))}catch{i()}try{let a=await o.encodeBinaryToPng(r);me.writeFileSync(this._snapshotFile.replaceAll(".vfsb",".rvfsb"),a),s(void 0)}catch{console.warn(`
						[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`),i()}}).catch(s=>{console.warn("[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot:",s instanceof Error?s.message:String(s)),me.writeFileSync(this._snapshotFile,r)}):me.writeFileSync(this._snapshotFile,r),this._journalFile&&A1(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}_autoFlush(){this._dirty&&this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&this.flushMirror()}importRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=n}}mergeRootTree(e){let n=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=n}}_mergeDir(e,n){for(let[r,s]of Object.entries(n.children)){let i=e.children[r];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[r]=s,e._childCount++,e._sortedKeys=null):i||(e.children[r]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Cc(this._root)}exportTar(){return B1(this._root)}importTar(e){this._root=Ec(e),this.emit("snapshot:import")}releaseTree(){this._root=t._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(N1(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let n of e)try{n.op===Ce.WRITE?this.writeFile(n.path,n.content??Buffer.alloc(0),{mode:n.mode}):n.op===Ce.MKDIR?this.mkdir(n.path,n.mode):n.op===Ce.REMOVE?this.exists(n.path)&&this.remove(n.path,{recursive:!0}):n.op===Ce.CHMOD?this.exists(n.path)&&this.chmod(n.path,n.mode??420):n.op===Ce.MOVE?this.exists(n.path)&&n.dest&&this.move(n.path,n.dest):n.op===Ce.SYMLINK&&n.dest&&this.symlink(n.dest,n.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||me.existsSync(this._snapshotFile)&&(this._evictDir(this._root),this._cachedUsageBytes=null)}_evictDir(e){for(let n of Object.values(e.children))if(n.type==="directory")this._evictDir(n);else if(n.type==="file"&&!n.evicted){let r=n.compressed?n.size??n.content.length*2:n.content.length;if(r>this._evictionThreshold){if(this._swapEnabled&&this._swapStore&&n.content.length>0){let s=this._getNodePath(this._root,n);s&&this._swapStore.swapOut(s,n.content,n.compressed)}n.size=r,n.content=Buffer.alloc(0),n.evicted=!0}}}getOpenPaths(){let e=new Set;for(let n of this._fdTable.values())e.add(n.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,n,r){let s=0;for(let[i,o]of Object.entries(e.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,n,a);else if(o.type==="file"&&!o.evicted&&!n.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(this._swapEnabled&&this._swapStore&&o.content.length>0&&this._swapStore.swapOut(a,o.content,o.compressed),o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}swapOutFile(e){if(!(this._swapEnabled&&this._swapStore))return!1;let n;try{n=Ne(this._root,e)}catch{return!1}if(n.type!=="file"||n.evicted||n.content.length===0)return!1;let r=n.content,s=n.compressed;return this._swapStore.swapOut(e,r,s),n.size=r.length,n.content=Buffer.alloc(0),n.evicted=!0,!0}swapOutLru(e){if(!(this._swapEnabled&&this._swapStore))return 0;let n=this.getOpenPaths(),r=0,s=0,i=[];this._collectEvictableFiles(this._root,"",n,i),i.sort((o,a)=>a.size-o.size);for(let o of i){if(r>=e)break;this.swapOutFile(o.path)&&(r+=o.size,s++)}return s}getSwapStats(){return this._swapStore?.getStats()??null}isSwapEnabled(){return this._swapEnabled}clearSwap(){this._swapStore?.clear()}getCacheStats(){return this._fileCache?.getStats()??null}isCacheEnabled(){return this._cacheEnabled}clearCache(){this._fileCache?.clear(),this._fileCache?.resetStats()}invalidateCache(e){let n=ce(e);this._fileCache?.delete(n)}preloadCache(e){if(!(this._cacheEnabled&&this._fileCache))return 0;let n=0;for(let r of e)try{let s=ce(r),i=Ne(this._root,s);if(i.type==="file"){i.evicted&&this._reloadEvicted(i,s);let o=i.compressed?vo(i.content):i.content;this._fileCache.setSync(s,o),n++}}catch{}return n}_getNodePath(e,n){return this._findNodePath(e,n,"")}_findNodePath(e,n,r){for(let[s,i]of Object.entries(e.children)){if(i===n)return r?`${r}/${s}`:`/${s}`;if(i.type==="directory"){let o=r?`${r}/${s}`:`/${s}`,a=this._findNodePath(i,n,o);if(a)return a}}return null}_collectEvictableFiles(e,n,r,s){for(let[i,o]of Object.entries(e.children)){let a=n?`${n}/${i}`:`/${i}`;if(o.type==="directory")this._collectEvictableFiles(o,a,r,s);else if(o.type==="file"&&!o.evicted&&!r.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>0&&s.push({path:a,size:c})}}}onBeforeWrite(e,n){let r=ce(e);this._writeHooks.set(r,n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let n=ce(e);this._writeHooks.delete(n),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerWriteHook(e,n){if(this._sortedWriteHooks){for(let r of this._sortedWriteHooks)if(e===r||e.startsWith(r==="/"?"/":`${r}/`)){let s=this._writeHooks.get(r);if(s){s(e,n);return}}}}registerContentResolver(e,n){let r=ce(e);this._contentResolvers.set(r,n),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let n of this._sortedContentResolvers)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let r=this._contentResolvers.get(n);if(r)return r(e)}return null}_reloadEvicted(e,n){if(e.evicted){if(this._swapStore){let r=this._swapStore.swapIn(n);if(r){e.content=r,e.evicted=void 0;return}}if(this._snapshotFile&&me.existsSync(this._snapshotFile))try{let r=me.readFileSync(this._snapshotFile),s=In(r),i=n.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}}mount(e,n,{readOnly:r=!0}={}){if(t._isBrowser)return;let s=ce(e),i=Ge.resolve(n);if(!me.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!me.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:r}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:r})}unmount(e){let n=ce(e);this._mounts.delete(n)&&(this._sortedMounts=null,this.emit("unmount",{vPath:n}))}getMounts(){return[...this._mounts.entries()].map(([e,n])=>({vPath:e,...n}))}onBeforeRead(e,n){let r=ce(e);this._readHooks.set(r,n),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let n=ce(e);this._readHooks.delete(n),this._sortedReadHooks=[...this._readHooks.keys()].sort((r,s)=>s.length-r.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let n of this._sortedReadHooks)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let r=this._readHooks.get(n);if(r){this._inReadHook=!0;try{r()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let n=ce(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([r],[s])=>s.length-r.length));for(let[r,s]of this._sortedMounts)if(n===r||n.startsWith(`${r}/`)){let i=n.slice(r.length).replace(/^\//,""),o=i?Ge.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,n=493,r,s){let i=ce(e),o=(()=>{try{return Ne(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);if(r!==void 0&&s!==void 0&&!o){let a=Ge.posix.dirname(i);if(a!==i)try{At(this._root,a,r,s,$n|cn)}catch(c){if(!(c instanceof Error&&c.message.includes("does not exist")))throw c}}this._mkdirRecursive(i,n,r,s)}writeFile(e,n,r={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let m=Ge.dirname(o.fullHostPath);me.existsSync(m)||me.mkdirSync(m,{recursive:!0}),me.writeFileSync(o.fullHostPath,Buffer.isBuffer(n)?n:Buffer.from(n,"utf8"));return}let a=ce(e),c=Buffer.isBuffer(n)?n:Buffer.from(n,"utf8");if(this._triggerWriteHook(a,c),s!==void 0&&i!==void 0){jr(this._root,a,s,i);let m=Ge.posix.dirname(a);if(m!==a)try{At(this._root,m,s,i,$n|cn)}catch(g){if(!(g instanceof Error&&g.message.includes("does not exist")))throw g}}let{parent:l,name:u}=En(this._root,a,!0,m=>this._mkdirRecursive(m,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){t._writeDeviceNode(d,a),d.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&At(this._root,a,s,i,$n);let f=r.compress??!1,p=f?FS(c):c,h=r.mode??420;if(this._ramCapBytes!==null){let m=this._getCachedUsage(),g=d?.type==="file"?d.content.length:0,y=m-g+p.length;if(y>this._ramCapBytes){let v=y-this._ramCapBytes,x=this.swapOutLru(v),P=this._getCachedUsage()-g+p.length;if(P>this._ramCapBytes&&x===0)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${P}/${this._ramCapBytes} bytes)`)}}d&&d.type==="file"?(d.content=p,d.compressed=f,d.mode=h,s!==void 0&&(d.uid=s),i!==void 0&&(d.gid=i),d.updatedAt=Date.now()):(d||(l._childCount++,l._sortedKeys=null),l.children[u]=t._makeFile(u,p,h,f,s,i)),this.emit("file:write",{path:a,size:p.length}),this._journal({op:Ce.WRITE,path:a,content:c,mode:h}),this._cachedUsageBytes=null,this._cacheEnabled&&this._fileCache&&this._fileCache.delete(a)}readFile(e,n,r){let s=this._resolveMount(e);if(s){if(!me.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return me.readFileSync(s.fullHostPath,"utf8")}let i=ce(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;if(this._cacheEnabled&&this._fileCache?.has(i)){let l=this._fileCache.getSync(i,()=>Buffer.alloc(0));return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}n!==void 0&&r!==void 0&&jr(this._root,i,n,r);let a=Ne(this._root,i);if(a.type==="stub")return n!==void 0&&r!==void 0&&At(this._root,i,n,r,_c),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let l=t._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:l.length}),l}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);n!==void 0&&r!==void 0&&At(this._root,i,n,r,_c),a.evicted&&this._reloadEvicted(a,i);let c=a.compressed?vo(a.content):a.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(i,c),this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(e){let n=this._resolveMount(e);if(n){if(!me.existsSync(n.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${n.fullHostPath}'`);return me.readFileSync(n.fullHostPath)}let r=ce(e);if(this._triggerReadHook(r),this._cacheEnabled&&this._fileCache?.has(r)){let o=this._fileCache.getSync(r,()=>Buffer.alloc(0));return this.emit("file:read",{path:r,size:o.length}),o}let s=Ne(this._root,r);if(s.type==="stub"){let o=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:r,size:o.length}),o}if(s.type==="device"){let o=t._readDeviceNode(s,r),a=Buffer.from(o,"binary");return this.emit("file:read",{path:r,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);s.evicted&&this._reloadEvicted(s,r);let i=s.compressed?vo(s.content):s.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(r,i),this.emit("file:read",{path:r,size:i.length}),i}exists(e){let n=this._resolveMount(e);if(n)return me.existsSync(n.fullHostPath);let r=ce(e);try{return Ne(this._root,r),!0}catch{return!1}}chmod(e,n,r){let s=ce(e);r!==void 0&&R1(this._root,s,r),Ne(this._root,s).mode=n,this._journal({op:Ce.CHMOD,path:s,mode:n})}chown(e,n,r,s){let i=ce(e);s!==void 0&&O1(s);let o=Ne(this._root,i);o.uid=n,o.gid=r,this._journal({op:Ce.CHMOD,path:i,mode:o.mode})}getOwner(e){let n=Ne(this._root,ce(e));return{uid:n.uid,gid:n.gid}}checkAccess(e,n,r,s){try{let i=Ne(this._root,ce(e)),o=i.mode;if(n===0)return s&1?(o&73)!==0:!0;let a=0;return n===i.uid?a=o>>6&7:r===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let n=this._resolveMount(e);if(n){if(!me.existsSync(n.fullHostPath))throw new Error(`ENOENT: stat '${n.fullHostPath}'`);let a=me.statSync(n.fullHostPath),c=n.relPath.split("/").pop()??n.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:ce(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:me.readdirSync(n.fullHostPath).length}:{type:"file",name:c,path:ce(e),mode:n.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let r=ce(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=this._resolveContent(r);if(s!==null)return{type:"file",name:r==="/"?"":Ge.posix.basename(r),path:r,mode:292,uid:0,gid:0,createdAt:new Date,updatedAt:new Date,compressed:!1,size:s.length};let i=Ne(this._root,r),o=r==="/"?"":Ge.posix.basename(r);return i.type==="stub"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:!1,size:i.stubContent.length}:i.type==="file"?{type:"file",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:i.compressed,size:i.evicted?i.size??0:i.content.length}:i.type==="device"?{type:"device",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}:{type:"directory",name:o,path:r,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),childrenCount:i._childCount}}static _readDeviceNode(e,n){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${n}'`);case"random":case"urandom":return LS.randomBytes(64).toString("binary");default:return""}}static _writeDeviceNode(e,n){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${n}'`)}statType(e){try{let n=this._resolveMount(e);if(n){let s=me.statSync(n.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let r=Ne(this._root,ce(e));return r.type==="directory"?"directory":r.type==="device"?"device":"file"}catch{return null}}list(e="/"){let n=this._resolveMount(e);if(n){if(!me.existsSync(n.fullHostPath))return[];try{return me.readdirSync(n.fullHostPath).sort()}catch{return[]}}let r=ce(e);r.startsWith("/proc")&&this._triggerReadHook(r);let s=Ne(this._root,r);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let n=ce(e),r=Ne(this._root,n);if(r.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Ge.posix.basename(n);return this._renderTreeLines(r,s)}_renderTreeLines(e,n){let r=[n];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i];if(o===void 0)continue;let a=e.children[o];if(a===void 0)continue;let c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(r.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(f=>`${u}${f}`);r.push(...d)}}return r.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(Ne(this._root,ce(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let n=0;for(let r of Object.values(e.children))n+=this._computeUsage(r);return n}setRamCap(e){this._ramCapBytes=e!==null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let n=Ne(this._root,ce(e));if(n.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);n.compressed||(n.content=FS(n.content),n.compressed=!0,n.updatedAt=Date.now())}decompressFile(e){let n=Ne(this._root,ce(e));if(n.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);n.compressed&&(n.content=vo(n.content),n.compressed=!1,n.updatedAt=Date.now())}symlink(e,n,r,s){let i=ce(n),o=e.startsWith("/")?ce(e):e;if(r!==void 0&&s!==void 0){let u=Ge.posix.dirname(i);if(u!==i)try{At(this._root,u,r,s,$n|cn)}catch(d){if(!(d instanceof Error&&d.message.includes("does not exist")))throw d}}let{parent:a,name:c}=En(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:r??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:Ce.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let n=Ne(this._root,ce(e));return n.type==="file"&&n.mode===41471}catch{return!1}}resolveSymlink(e,n=8){let r=ce(e);for(let s=0;s<n;s++){try{let i=Ne(this._root,r);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");r=o.startsWith("/")?o:ce(Ge.posix.join(Ge.posix.dirname(r),o));continue}}catch{break}return r}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,n={},r,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!me.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);me.statSync(i.fullHostPath).isDirectory()?me.rmSync(i.fullHostPath,{recursive:n.recursive??!1}):me.unlinkSync(i.fullHostPath);return}let o=ce(e);if(o==="/")throw new Error("Cannot remove root directory.");if(r!==void 0&&s!==void 0){jr(this._root,o,r,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";T1(this._root,u,d,r,s)}let a=Ne(this._root,o);if(a.type==="directory"&&!n.recursive&&a._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`);let{parent:c,name:l}=En(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:Ce.REMOVE,path:o})}move(e,n,r,s){let i=ce(e),o=ce(n);if(i==="/"||o==="/")throw new Error("Cannot move root directory.");if(r!==void 0&&s!==void 0){jr(this._root,i,r,s),jr(this._root,o,r,s);let f=Ge.posix.dirname(i),p=Ge.posix.dirname(o);if(f!==i&&At(this._root,f,r,s,$n|cn),p!==o)try{At(this._root,p,r,s,$n|cn)}catch(h){if(!(h instanceof Error&&h.message.includes("does not exist")))throw h}}let a=Ne(this._root,i);if(this.exists(o))throw new Error(`Destination '${o}' already exists.`);this._mkdirRecursive(Ge.posix.dirname(o),493);let{parent:c,name:l}=En(this._root,o,!1,()=>{}),{parent:u,name:d}=En(this._root,i,!1,()=>{});delete u.children[d],u._childCount--,u._sortedKeys=null,a.name=l,c.children[l]=a,c._childCount++,c._sortedKeys=null,this._journal({op:Ce.MOVE,path:i,dest:o})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let n=[];for(let r of Object.values(e.children))r.type==="stub"?n.push({type:"file",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(r.stubContent,"utf8").toString("base64")}):r.type==="file"?n.push(t._serializeFile(r)):r.type==="device"?n.push({type:"device",name:r.name,mode:r.mode,uid:r.uid,gid:r.gid,createdAt:new Date(r.createdAt).toISOString(),updatedAt:new Date(r.updatedAt).toISOString(),deviceKind:r.deviceKind,major:r.major,minor:r.minor}):n.push(this._serializeDir(r));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:n}}static _serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let n=new t;return n._root=n._deserializeDir(e.root,""),n}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,n){let r={type:"directory",name:n,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file")r.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")};else if(s.type==="device")r.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor};else{let i=this._deserializeDir(s,s.name);r.children[s.name]=i}r._childCount++}return r}},xo=Xc;function T(t,e,n=493){t.exists(e)||t.mkdir(e,n)}function O(t,e,n,r=420){t.writeStub(e,n,r)}function X(t,e,n){t.writeFile(e,n)}function $I(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619);return e>>>0}function PI(t,e,n){T(t,"/etc"),O(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${n.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),O(t,"/etc/fortune_version",`nyx/stable
`),O(t,"/etc/hostname",`${e}
`),O(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),O(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),O(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),O(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),O(t,"/etc/motd",["",`Welcome to ${n.os}`,`Kernel: ${n.kernel}`,""].join(`
`)),O(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${n.os}"`].join(`
`)}
`),T(t,"/etc/apt"),T(t,"/etc/apt/sources.list.d"),T(t,"/etc/apt/trusted.gpg.d"),T(t,"/etc/apt/keyrings"),O(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),O(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),T(t,"/etc/network"),O(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),T(t,"/etc/netplan"),O(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),O(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),O(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),O(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),T(t,"/etc/cron.d"),T(t,"/etc/cron.daily"),T(t,"/etc/cron.hourly"),T(t,"/etc/cron.weekly"),T(t,"/etc/cron.monthly"),T(t,"/etc/init.d"),T(t,"/etc/systemd"),T(t,"/etc/systemd/system"),T(t,"/etc/systemd/system/multi-user.target.wants"),T(t,"/etc/systemd/network"),O(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),O(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),O(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),T(t,"/etc/security"),O(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),O(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),T(t,"/etc/pam.d"),O(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),O(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),O(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),O(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),O(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),O(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),O(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),T(t,"/etc/sudoers.d"),O(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),O(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),O(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),T(t,"/etc/ld.so.conf.d"),O(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),O(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),O(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),O(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),O(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),O(t,"/etc/timezone",`UTC
`),O(t,"/etc/localtime",`UTC
`),O(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),O(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),T(t,"/etc/skel"),O(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),O(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),O(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),T(t,"/etc/alternatives");let r=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of r)O(t,`/etc/alternatives/${s}`,i);T(t,"/etc/java-21-openjdk"),T(t,"/etc/java-21-openjdk/security"),O(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),O(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),O(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),O(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),O(t,"/etc/magic",`# magic
`),O(t,"/etc/magic.mime",`# magic.mime
`),O(t,"/etc/papersize",`a4
`),O(t,"/etc/ucf.conf",`# ucf.conf
`),O(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),O(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),O(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),T(t,"/etc/profile.d"),O(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),O(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Zc(t,e){let n=e.listUsers(),r=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let a of n){if(a==="root")continue;let c=e.getUid(a),l=e.getGid(a),u=c>0?c:s,d=l>0?l:s;r.push(`${a}:x:${u}:${d}::/home/${a}:/bin/bash`),c===0&&s++}t.writeFile("/etc/passwd",`${r.join(`
`)}
`);let i=e.generateGroupFile();i.length>0?t.writeFile("/etc/group",`${i}
`):t.writeFile("/etc/group",`root:x:0:
nobody:x:65534:
`);let o=e.generateShadowFile();t.writeFile("/etc/shadow",`${o}
`,{mode:416})}function US(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?Number.parseInt(e[1],10):0)}function BS(t,e,n,r,s,i){let o=`/proc/${e}`;T(t,o),T(t,`${o}/fd`),T(t,`${o}/fdinfo`),T(t,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=r.split(/\s+/)[0]??"bash";X(t,`${o}/cmdline`,`${r.replace(/\s+/g,"\0")}\0`),X(t,`${o}/comm`,c),X(t,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),X(t,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),X(t,`${o}/statm`,`4096 1024 768 231 0 512 0
`),X(t,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),X(t,`${o}/cwd`,`/home/${n}\0`),X(t,`${o}/exe`,"/bin/bash\0"),X(t,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),X(t,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),X(t,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),X(t,`${o}/oom_score`,`0
`),X(t,`${o}/oom_score_adj`,`0
`),X(t,`${o}/loginuid`,`0
`),X(t,`${o}/wchan`,`poll_schedule_timeout
`),X(t,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])O(t,`${o}/fd/${l}`,""),O(t,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function kI(t,e){T(t,"/proc/boot"),O(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),O(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function Rs(t,e,n,r,s=[],i,o){T(t,"/proc");let a=Math.floor((Date.now()-r)/1e3),c=Math.floor(a*.9);X(t,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Kt.totalmem()/1024),u=Math.floor(Kt.freemem()/1024),d=o?.ramCapBytes===void 0?null:Math.floor(o.ramCapBytes/1024),f=d===null?l:Math.min(l,d),p=d===null?u:Math.floor(f*(u/l)),h=Math.floor(p*.95),m=Math.floor(f*.03),g=Math.floor(f*.08),y=Math.floor(f*.005),v=Math.floor(f*.02),x=Math.floor(f*.001);X(t,"/proc/meminfo",`${[`MemTotal:       ${String(f).padStart(10)} kB`,`MemFree:        ${String(p).padStart(10)} kB`,`MemAvailable:   ${String(h).padStart(10)} kB`,`Buffers:        ${String(m).padStart(10)} kB`,`Cached:         ${String(g).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((m+g)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(g*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(f*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(f*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(g*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(g*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(f*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(g*.4)).padStart(10)} kB`,`Shmem:          ${String(y).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(v*.6)).padStart(10)} kB`,`Slab:           ${String(v).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(v*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(v*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(f*5e-4)).padStart(10)} kB`,`PageTables:     ${String(x).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(f*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(f*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(f*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(f*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(f*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(f*.98)).padStart(10)} kB`].join(`
`)}
`);let b=Kt.cpus(),P=o?.cpuCapCores===void 0?b.length:Math.min(o.cpuCapCores,b.length),_=b.slice(0,P),w=[];for(let he=0;he<_.length;he++){let Oe=_[he];Oe&&w.push(`processor	: ${he}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${Oe.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${Oe.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${_.length}`,`core id		: ${he}`,`cpu cores	: ${_.length}`,`apicid		: ${he}`,`initial apicid	: ${he}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${(Oe.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}X(t,"/proc/cpuinfo",`${w.join(`
`)}
`),X(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),X(t,"/proc/hostname",`${n}
`);let S=(Math.random()*.3).toFixed(2),C=1+s.length;X(t,"/proc/loadavg",`${S} ${S} ${S} ${C}/${C} 1
`);let $=_.length,N=Math.floor(a*100),R=Math.floor(a*2),W=Math.floor(a*30),Y=Math.floor(a*800),Q=Math.floor(a*5),E=Math.floor(Number(a)),A=Math.floor(a*2),I=Math.floor(a*0),D=N+R+W+Y+Q+E+A+I,z=`cpu  ${N} ${R} ${W} ${Y} ${Q} ${E} ${A} ${I} 0 0
`,Z=Array.from({length:$},(he,Oe)=>`cpu${Oe} ${Math.floor(N/$)} ${Math.floor(R/$)} ${Math.floor(W/$)} ${Math.floor(Y/$)} ${Math.floor(Q/$)} ${Math.floor(E/$)} ${Math.floor(A/$)} ${Math.floor(I/$)} 0 0`).join(`
`);X(t,"/proc/stat",`${z}${Z}
intr ${Math.floor(D*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(D*50)}
btime ${Math.floor(r/1e3)}
processes ${C+10}
procs_running 1
procs_blocked 0
`);let J=Math.floor(D*.5),F=Math.floor(D*.3),j=0,L=0,G=Math.floor(D*2),U=G+Math.floor(D*.5),H=Math.floor(D*.01);X(t,"/proc/vmstat",`nr_free_pages ${Math.floor(p/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(g/4)}
nr_zone_active_file ${Math.floor(m/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${x}
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
nr_active_file ${Math.floor(m/4)}
nr_unevictable 0
nr_slab_reclaimable ${Math.floor(v*.6)}
nr_slab_unreclaimable ${Math.floor(v*.4)}
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
nr_zone_active_file ${Math.floor(m/4)}
pgpgin ${J}
pgpgout ${F}
pswpin ${j}
pswpout ${L}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(G*.3)}
pgalloc_normal ${Math.floor(G*.7)}
pgalloc_movable 0
pgfree ${G}
pgactivate ${Math.floor(D*.5)}
pgdeactivate 0
pgfault ${U}
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

`),T(t,"/proc/pressure");let q=(Math.random()*.3).toFixed(2),K=(Math.random()*.2+.1).toFixed(2),se=(Math.random()*.1+.05).toFixed(2),re=Math.floor(D*10);X(t,"/proc/pressure/cpu",`some avg10=${q} avg60=${K} avg300=${se} total=${re}
`),X(t,"/proc/pressure/memory",`some avg10=${(Number(q)*.5).toFixed(2)} avg60=${(Number(K)*.3).toFixed(2)} avg300=${(Number(se)*.2).toFixed(2)} total=${Math.floor(re*.3)}
`),X(t,"/proc/pressure/io",`some avg10=${(Number(q)*.7).toFixed(2)} avg60=${(Number(K)*.5).toFixed(2)} avg300=${(Number(se)*.3).toFixed(2)} total=${Math.floor(re*.5)}
`),X(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),X(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),X(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let ve=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(X(t,"/proc/mounts",ve),T(t,"/proc/self"),X(t,"/proc/self/mounts",ve),T(t,"/proc/net"),i){let he=i.getInterfaces(),Oe=i.getRoutes(),lt=i.getArpCache(),gt=ke=>ke.split(".").reverse().map(yt=>Number.parseInt(yt,10).toString(16).padStart(2,"0")).join("").toUpperCase(),Xt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,dt=he.map(ke=>{let yt=ke.name.padStart(4);if(ke.name==="lo")return`${yt}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let An=Math.floor(Math.random()*2e5),Yr=Math.floor(Math.random()*2e3),No=Math.floor(Math.random()*5e7),kt=Math.floor(Math.random()*3e3);return`${yt}: ${String(An).padStart(8)} ${String(Yr).padStart(7)}    0    0    0     0          0         0 ${String(No).padStart(9)} ${String(kt).padStart(7)}    0    0    0     0       0          0`});X(t,"/proc/net/dev",`${Xt}
${dt.join(`
`)}
`);let nr=Oe.map(ke=>[ke.device,gt(ke.destination==="default"?"0.0.0.0":ke.destination),gt(ke.gateway),ke.flags==="UG"?"0003":ke.flags==="U"?"0001":"0000","0","0","100",gt(ke.netmask),"0","0","0"].join("	"));X(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${nr.join(`
`)}
`);let Zt=lt.map(ke=>`${ke.ip.padEnd(15)} 0x1         0x2         ${ke.mac.padEnd(17)}     *        ${ke.device}`);X(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Zt.join(`
`)}
`)}else X(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),X(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),X(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);X(t,"/proc/net/if_inet6","");let Fe=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);X(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${Fe}
`),X(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),X(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),X(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),X(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),X(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),X(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),X(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),X(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),X(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),T(t,"/proc/sys"),T(t,"/proc/sys/kernel"),T(t,"/proc/sys/net"),T(t,"/proc/sys/net/ipv4"),T(t,"/proc/sys/net/ipv6"),T(t,"/proc/sys/net/core"),T(t,"/proc/sys/vm"),T(t,"/proc/sys/fs"),T(t,"/proc/sys/fs/inotify"),X(t,"/proc/sys/kernel/hostname",`${n}
`),X(t,"/proc/sys/kernel/ostype",`Linux
`),X(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),X(t,"/proc/sys/kernel/pid_max",`32768
`),X(t,"/proc/sys/kernel/threads-max",`31968
`),X(t,"/proc/sys/kernel/randomize_va_space",`2
`),X(t,"/proc/sys/kernel/dmesg_restrict",`0
`),X(t,"/proc/sys/kernel/kptr_restrict",`0
`),X(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),X(t,"/proc/sys/kernel/printk",`4	4	1	7
`),X(t,"/proc/sys/kernel/sysrq",`176
`),X(t,"/proc/sys/kernel/panic",`1
`),X(t,"/proc/sys/kernel/panic_on_oops",`1
`),X(t,"/proc/sys/kernel/core_pattern",`core
`),X(t,"/proc/sys/kernel/core_uses_pid",`0
`),X(t,"/proc/sys/kernel/ngroups_max",`65536
`),X(t,"/proc/sys/kernel/cap_last_cap",`40
`),X(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),X(t,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),X(t,"/proc/sys/net/ipv4/ip_forward",`0
`),X(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),X(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),X(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),X(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),X(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),X(t,"/proc/sys/net/core/somaxconn",`4096
`),X(t,"/proc/sys/net/core/rmem_max",`212992
`),X(t,"/proc/sys/net/core/wmem_max",`212992
`),X(t,"/proc/sys/vm/swappiness",`60
`),X(t,"/proc/sys/vm/overcommit_memory",`0
`),X(t,"/proc/sys/vm/overcommit_ratio",`50
`),X(t,"/proc/sys/vm/dirty_ratio",`20
`),X(t,"/proc/sys/vm/dirty_background_ratio",`10
`),X(t,"/proc/sys/vm/min_free_kbytes",`65536
`),X(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),X(t,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),X(t,"/proc/sys/fs/file-max",`1048576
`),X(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),X(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),X(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let Ae=o?.ramCapBytes??Kt.totalmem(),je=o?.cpuCapCores===void 0?-1:o.cpuCapCores*1e5;T(t,"/sys/fs/cgroup/memory"),X(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Ae}
`),X(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Ae-Kt.freemem()}
`),X(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Ae}
`),T(t,"/sys/fs/cgroup/cpu"),X(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),X(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${je}
`),X(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),X(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),BS(t,1,"root","/sbin/init",new Date(r).toISOString(),{});for(let he of s){let Oe=US(he.tty);BS(t,Oe,he.username,"bash",he.startedAt,{USER:he.username,HOME:`/home/${he.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:he.username})}let Rt=s[s.length-1],ct=Rt===void 0?1:US(Rt.tty);try{t.remove("/proc/self")}catch{}let Ve=`/proc/${ct}`;if(T(t,"/proc/self"),T(t,"/proc/self/fd"),T(t,"/proc/self/fdinfo"),T(t,"/proc/self/net"),t.exists(Ve))for(let he of t.list(Ve)){let Oe=`${Ve}/${he}`,lt=`/proc/self/${he}`;try{t.stat(Oe).type==="file"&&X(t,lt,t.readFile(Oe))}catch{}}else X(t,"/proc/self/cmdline","bash\0"),X(t,"/proc/self/comm","bash"),X(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),X(t,"/proc/self/environ",""),X(t,"/proc/self/cwd","/root\0"),X(t,"/proc/self/exe","/bin/bash\0")}function MI(t,e,n,r){T(t,"/sys"),T(t,"/sys/devices"),T(t,"/sys/devices/virtual"),T(t,"/sys/devices/system"),T(t,"/sys/devices/system/cpu"),T(t,"/sys/devices/system/cpu/cpu0"),O(t,"/sys/devices/system/cpu/cpu0/online",`1
`),O(t,"/sys/devices/system/cpu/online",`0
`),O(t,"/sys/devices/system/cpu/possible",`0
`),O(t,"/sys/devices/system/cpu/present",`0
`),T(t,"/sys/devices/system/node"),T(t,"/sys/devices/system/node/node0"),O(t,"/sys/devices/system/node/node0/cpumap",`1
`),T(t,"/sys/class"),T(t,"/sys/class/net"),T(t,"/sys/class/net/eth0"),O(t,"/sys/class/net/eth0/operstate",`up
`),O(t,"/sys/class/net/eth0/carrier",`1
`),O(t,"/sys/class/net/eth0/mtu",`1500
`),O(t,"/sys/class/net/eth0/speed",`10000
`),O(t,"/sys/class/net/eth0/duplex",`full
`),O(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),O(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=$I(e),i=s.toString(16).padStart(8,"0");O(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),T(t,"/sys/class/net/lo"),O(t,"/sys/class/net/lo/operstate",`unknown
`),O(t,"/sys/class/net/lo/carrier",`1
`),O(t,"/sys/class/net/lo/mtu",`65536
`),O(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),T(t,"/sys/class/block"),T(t,"/sys/class/block/vda"),O(t,"/sys/class/block/vda/size",`536870912
`),O(t,"/sys/class/block/vda/ro",`0
`),O(t,"/sys/class/block/vda/removable",`0
`),T(t,"/sys/fs"),T(t,"/sys/fs/cgroup");for(let u of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])T(t,`/sys/fs/cgroup/${u}`),u!=="unified"&&(O(t,`/sys/fs/cgroup/${u}/tasks`,`1
`),O(t,`/sys/fs/cgroup/${u}/notify_on_release`,`0
`),O(t,`/sys/fs/cgroup/${u}/release_agent`,""));let o=r?.ramCapBytes??Kt.totalmem();O(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),O(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-Kt.freemem()}
`),O(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),O(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),O(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",r?.cpuCapCores===void 0?`-1
`:`${r.cpuCapCores*1e5}
`),O(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),O(t,"/sys/fs/cgroup/unified/cgroup.procs",`1
`),O(t,"/sys/fs/cgroup/unified/cgroup.controllers",`cpu memory io pids
`);let a=r?.cpuCapCores===void 0?"max":`${r.cpuCapCores*1e5} 100000`;O(t,"/sys/fs/cgroup/unified/cpu.max",`${a}
`),O(t,"/sys/fs/cgroup/unified/cpu.weight",`100
`),O(t,"/sys/fs/cgroup/unified/memory.max",`${o}
`),O(t,"/sys/fs/cgroup/unified/memory.current",`0
`),O(t,"/sys/fs/cgroup/unified/pids.max",`max
`),O(t,"/sys/fs/cgroup/unified/pids.current",`1
`),T(t,"/sys/kernel"),O(t,"/sys/kernel/hostname",`${e}
`),O(t,"/sys/kernel/osrelease",`${n.kernel}
`),O(t,"/sys/kernel/ostype",`Linux
`),T(t,"/sys/kernel/security"),T(t,"/sys/devices/virtual"),T(t,"/sys/devices/virtual/dmi"),T(t,"/sys/devices/virtual/dmi/id");let c=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,l={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:c,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${c}`};for(let[u,d]of Object.entries(l))O(t,`/sys/devices/virtual/dmi/id/${u}`,`${d}
`);T(t,"/sys/class"),T(t,"/sys/class/net"),T(t,"/sys/kernel"),O(t,"/sys/kernel/hostname",`${e}
`),O(t,"/sys/kernel/osrelease",`${n.kernel}
`),O(t,"/sys/kernel/ostype",`Linux
`)}function NI(t){T(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),O(t,"/dev/mem","",416),O(t,"/dev/port","",416),O(t,"/dev/kmsg","",432),O(t,"/dev/hwrng","",432),O(t,"/dev/fuse","",432),O(t,"/dev/autofs","",432),O(t,"/dev/userfaultfd","",432),O(t,"/dev/cpu_dma_latency","",432),O(t,"/dev/ptp0","",432),O(t,"/dev/snapshot","",432),O(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)O(t,`/dev/tty${e}`,"",400);O(t,"/dev/vcs","",400),O(t,"/dev/vcs1","",400),O(t,"/dev/vcsa","",400),O(t,"/dev/vcsa1","",400),O(t,"/dev/vcsu","",400),O(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)O(t,`/dev/loop${e}`,"",432);T(t,"/dev/loop-control"),O(t,"/dev/vda","",432),O(t,"/dev/vdb","",432),O(t,"/dev/vdc","",432),O(t,"/dev/vdd","",432),T(t,"/dev/net"),O(t,"/dev/net/tun","",432),T(t,"/dev/pts"),T(t,"/dev/shm"),T(t,"/dev/cpu"),T(t,"/dev/fd"),O(t,"/dev/vga_arbiter","",432),O(t,"/dev/vsock","",432)}function AI(t){T(t,"/usr"),T(t,"/usr/bin"),T(t,"/usr/sbin"),T(t,"/usr/local"),T(t,"/usr/local/bin"),T(t,"/usr/local/lib"),T(t,"/usr/local/share"),T(t,"/usr/local/include"),T(t,"/usr/local/sbin"),T(t,"/usr/share"),T(t,"/usr/share/doc"),T(t,"/usr/share/man"),T(t,"/usr/share/man/man1"),T(t,"/usr/share/man/man5"),T(t,"/usr/share/man/man8"),T(t,"/usr/share/common-licenses"),T(t,"/usr/share/ca-certificates"),T(t,"/usr/share/zoneinfo"),T(t,"/usr/lib"),T(t,"/usr/lib/x86_64-linux-gnu"),T(t,"/usr/lib/python3"),T(t,"/usr/lib/python3/dist-packages"),T(t,"/usr/lib/python3.12"),T(t,"/usr/lib/jvm"),T(t,"/usr/lib/jvm/java-21-openjdk-amd64"),T(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),T(t,"/usr/lib/node_modules"),T(t,"/usr/lib/node_modules/npm"),T(t,"/usr/include"),T(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let r of e)O(t,`/usr/bin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);let n=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let r of n)O(t,`/usr/sbin/${r}`,`#!/bin/sh
exec builtin ${r} "$@"
`,493);O(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),O(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),O(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),O(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),O(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),O(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),O(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),O(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),O(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),O(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),O(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),O(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var TI=`Package: bash
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

`;function OI(t){T(t,"/var"),T(t,"/var/log"),T(t,"/var/log/apt"),T(t,"/var/log/journal"),T(t,"/var/log/private"),T(t,"/var/tmp"),T(t,"/var/cache"),T(t,"/var/cache/apt"),T(t,"/var/cache/apt/archives"),T(t,"/var/cache/apt/archives/partial"),T(t,"/var/cache/debconf"),T(t,"/var/cache/ldconfig"),T(t,"/var/cache/fontconfig"),T(t,"/var/cache/PackageKit"),T(t,"/var/lib"),T(t,"/var/lib/apt"),T(t,"/var/lib/apt/lists"),T(t,"/var/lib/apt/lists/partial"),T(t,"/var/lib/dpkg"),T(t,"/var/lib/dpkg/info"),T(t,"/var/lib/dpkg/updates"),T(t,"/var/lib/dpkg/alternatives"),T(t,"/var/lib/misc"),T(t,"/var/lib/systemd"),T(t,"/var/lib/systemd/coredump"),T(t,"/var/lib/pam"),T(t,"/var/lib/git"),T(t,"/var/lib/PackageKit"),T(t,"/var/lib/python"),T(t,"/var/spool"),T(t,"/var/spool/cron"),T(t,"/var/spool/mail"),T(t,"/var/mail"),T(t,"/var/backups"),T(t,"/var/www"),O(t,"/var/lib/dpkg/status",TI),O(t,"/var/lib/dpkg/available",""),O(t,"/var/lib/dpkg/lock",""),O(t,"/var/lib/dpkg/lock-frontend",""),O(t,"/var/lib/apt/lists/lock",""),O(t,"/var/cache/apt/pkgcache.bin",""),O(t,"/var/cache/apt/srcpkgcache.bin",""),O(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),O(t,"/var/log/auth.log",""),O(t,"/var/log/kern.log",""),O(t,"/var/log/dpkg.log",""),O(t,"/var/log/apt/history.log",""),O(t,"/var/log/apt/term.log",""),O(t,"/var/log/faillog",""),O(t,"/var/log/lastlog",""),O(t,"/var/log/wtmp",""),O(t,"/var/log/btmp",""),O(t,"/var/log/alternatives.log",""),T(t,"/run"),T(t,"/run/lock"),T(t,"/run/lock/subsys"),T(t,"/run/systemd"),T(t,"/run/systemd/ask-password"),T(t,"/run/systemd/sessions"),T(t,"/run/systemd/users"),T(t,"/run/user"),T(t,"/run/dbus"),T(t,"/run/adduser"),O(t,"/run/utmp",""),O(t,"/run/dbus/system_bus_socket","")}function RI(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),T(t,"/lib"),T(t,"/lib64"),T(t,"/lib/x86_64-linux-gnu"),T(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||O(t,"/lib64/ld-linux-x86-64.so.2","",493)}function DI(t){T(t,"/tmp",1023),T(t,"/tmp/node-compile-cache",1023)}function FI(t){T(t,"/root",448),T(t,"/root/.ssh",448),T(t,"/root/.config",493),T(t,"/root/.config/pip",493),T(t,"/root/.local",493),T(t,"/root/.local/share",493),O(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\W\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),O(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),O(t,"/root/.bash_logout",`# ~/.bash_logout
`),O(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function LI(t,e){T(t,"/opt"),T(t,"/opt/rclone"),T(t,"/srv"),T(t,"/mnt"),T(t,"/media"),T(t,"/boot"),T(t,"/boot/grub"),O(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let n=e.kernel,r=`# Fortune GNU/Linux kernel ${n}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");O(t,`/boot/vmlinuz-${n}`,r,420),O(t,`/boot/initrd.img-${n}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${n}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),O(t,`/boot/System.map-${n}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),O(t,`/boot/config-${n}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${n}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${n}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),T(t,"/lost+found",448),T(t,"/home")}var zS=new Map;function UI(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function BI(t,e){let n=UI(t,e),r=zS.get(n);if(r)return r;let s=new xo({mode:"memory"});PI(s,t,e),MI(s,t,e),NI(s),AI(s),OI(s),RI(s),DI(s),LI(s,e),kI(s,e);let i=s.encodeBinary();return zS.set(n,i),i}function WS(t,e,n,r,s,i=[],o,a){let c=BI(n,r);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(In(c)):t.importRootTree(In(c)),FI(t),Rs(t,r,n,s,i,o,a),Zc(t,e)}Ra();xa();Oo();import{createHash as VS,randomBytes as zI,randomUUID as WI,scryptSync as jI,timingSafeEqual as VI}from"node:crypto";import{EventEmitter as GI}from"node:events";import*as HS from"node:path";var Co=class t{constructor(e){this._vfs=e}_vfs;_groupsPath="/etc/group";_groups=new Map;_nextGid=2e3;initialize(){this._loadFromVfs(),this._ensureSystemGroups()}createGroup(e,n){if(t._validateGroupName(e),this._groups.has(e))throw new Error(`groupadd: group '${e}' already exists`);let r=n??this._nextGid++;n!==void 0&&n>=this._nextGid&&(this._nextGid=n+1);let s={name:e,gid:r,members:[]};return this._groups.set(e,s),this._persist(),s}deleteGroup(e){if(!this._groups.has(e))throw new Error(`groupdel: group '${e}' does not exist`);this._groups.delete(e),this._persist()}addMember(e,n){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members.includes(n)||(r.members.push(n),this._persist())}removeMember(e,n){let r=this._groups.get(e);if(!r)throw new Error(`gpasswd: group '${e}' does not exist`);r.members=r.members.filter(s=>s!==n),this._persist()}getGroup(e){return this._groups.get(e)}getGroupByGid(e){for(let n of this._groups.values())if(n.gid===e)return n}getGidByName(e){return this._groups.get(e)?.gid??null}getNameByGid(e){for(let n of this._groups.values())if(n.gid===e)return n.name;return null}getMembers(e){return this._groups.get(e)?.members??[]}getUserSupplementaryGroups(e){let n=[];for(let r of this._groups.values())r.members.includes(e)&&n.push(r.name);return n}getUserAllGroups(e,n){let r=new Set,s=this.getGroupByGid(n);s&&r.add(s.name);for(let i of this._groups.values())i.members.includes(e)&&r.add(i.name);return Array.from(r).sort()}isMemberOf(e,n,r){let s=this._groups.get(n);return s?s.gid===r?!0:s.members.includes(e):!1}listGroups(){return Array.from(this._groups.values()).sort((e,n)=>e.name.localeCompare(n.name))}generateGroupFile(){return this.listGroups().map(e=>`${e.name}:x:${e.gid}:${e.members.join(",")}`).join(`
`)}_persist(){let e=this.generateGroupFile();this._vfs.writeFile(this._groupsPath,e.length>0?`${e}
`:"",{mode:420})}_loadFromVfs(){if(this._groups.clear(),!this._vfs.exists(this._groupsPath))return;let e=this._vfs.readFile(this._groupsPath);for(let n of e.split(`
`)){let r=n.trim();if(r.length===0||r.startsWith("#"))continue;let s=r.split(":");if(s.length<4)continue;let[i,o,a,c]=s;if(!(i&&a))continue;let l=Number.parseInt(a,10);if(!Number.isFinite(l)||l<0)continue;let u=c?c.split(",").filter(d=>d.length>0):[];this._groups.set(i,{name:i,gid:l,members:u}),l>=this._nextGid&&(this._nextGid=l+1)}}_ensureSystemGroups(){let e=[{name:"root",gid:0},{name:"daemon",gid:1},{name:"bin",gid:2},{name:"sys",gid:3},{name:"adm",gid:4},{name:"tty",gid:5},{name:"disk",gid:6},{name:"lp",gid:7},{name:"mail",gid:8},{name:"news",gid:9},{name:"uucp",gid:10},{name:"man",gid:12},{name:"proxy",gid:13},{name:"kmem",gid:15},{name:"dialout",gid:20},{name:"fax",gid:21},{name:"voice",gid:22},{name:"cdrom",gid:24},{name:"floppy",gid:25},{name:"tape",gid:26},{name:"sudo",gid:27},{name:"audio",gid:29},{name:"dip",gid:30},{name:"www-data",gid:33},{name:"backup",gid:34},{name:"operator",gid:37},{name:"list",gid:38},{name:"irc",gid:39},{name:"src",gid:40},{name:"shadow",gid:42},{name:"utmp",gid:43},{name:"video",gid:44},{name:"sasl",gid:45},{name:"plugdev",gid:46},{name:"staff",gid:50},{name:"games",gid:60},{name:"users",gid:100},{name:"nogroup",gid:65534}];for(let{name:n,gid:r}of e)this._groups.has(n)||(this._groups.set(n,{name:n,gid:r,members:[]}),r>=this._nextGid&&(this._nextGid=r+1))}static _validateGroupName(e){if(!e||e.trim()==="")throw new Error("invalid group name");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error(`invalid group name '${e}'`)}};var jS={"-20":88761,"-19":71755,"-18":56483,"-17":46273,"-16":36291,"-15":29154,"-14":23254,"-13":18705,"-12":14949,"-11":11916,"-10":9548,"-9":7620,"-8":6100,"-7":4904,"-6":3906,"-5":3121,"-4":2501,"-3":1991,"-2":1586,"-1":1277,0:1024,1:820,2:655,3:526,4:423,5:335,6:272,7:215,8:172,9:137,10:110,11:87,12:70,13:56,14:45,15:36,16:29,17:23,18:18,19:15},Jc={idle:19,very_low:15,low:10,normal:0,high:-10,very_high:-15,realtime:-20},pn=class t{_baseTimesliceMs;_maxTimesliceMs;_minTimesliceMs;_enforceFairShare;_accountingWindowMs;_scheduleCount=0;_totalCpuTimeMs=0;_throttleCount=0;_preemptCount=0;_windowStart=Date.now();_processCpuTime=new Map;constructor(e={}){this._baseTimesliceMs=e.baseTimesliceMs??100,this._maxTimesliceMs=e.maxTimesliceMs??500,this._minTimesliceMs=e.minTimesliceMs??10,this._enforceFairShare=e.enforceFairShare??!0,this._accountingWindowMs=e.accountingWindowMs??1e3}calculateTimeslice(e){let s=(jS[e]??1024)/1024,i=this._baseTimesliceMs*s;return Math.max(this._minTimesliceMs,Math.min(this._maxTimesliceMs,i))}static getNiceWeight(e){return jS[e]??1024}static priorityToNice(e){return Jc[e]}static niceToPriority(e){for(let[s,i]of Object.entries(Jc))if(i===e)return s;let n="normal",r=Math.abs(e);for(let[s,i]of Object.entries(Jc)){let o=Math.abs(e-i);o<r&&(r=o,n=s)}return n}static isValidNice(e){return e>=-20&&e<=19&&Number.isInteger(e)}recordCpuTime(e,n){let r=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,r+n),this._totalCpuTimeMs+=n}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}shouldThrottle(e,n,r){if(!this._enforceFairShare||r<=1)return!1;let s=Date.now(),i=s-this._windowStart;if(i>=this._accountingWindowMs)return this._windowStart=s,this._processCpuTime.clear(),!1;let o=this._processCpuTime.get(e)??0,a=t.getNiceWeight(n),l=r*1024,u=a/l*i;return o>u*2}schedule(e,n){let r=e.nice??0,s=this.calculateTimeslice(r);return this.shouldThrottle(e.pid,r,n)?(this._throttleCount++,{action:"throttle",reason:"exceeded fair share"}):(this._scheduleCount++,{action:"run",timesliceMs:s,reason:`timeslice ${s}ms (nice ${r})`})}recordPreemption(){this._preemptCount++}getStats(){return{scheduleCount:this._scheduleCount,totalCpuTimeMs:this._totalCpuTimeMs,runQueueLength:this._processCpuTime.size,throttleCount:this._throttleCount,preemptCount:this._preemptCount,avgTimesliceMs:this._scheduleCount>0?this._totalCpuTimeMs/this._scheduleCount:0,windowStart:this._windowStart,processCpuTime:new Map(this._processCpuTime)}}resetStats(){this._scheduleCount=0,this._totalCpuTimeMs=0,this._throttleCount=0,this._preemptCount=0}resetWindow(){this._windowStart=Date.now(),this._processCpuTime.clear()}removeProcess(e){this._processCpuTime.delete(e)}};function HI(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var Ye=Xi("VirtualUserManager"),wo=class t extends GI{constructor(n,r=!1){super();this._vfs=n;this._autoSudoForNewUsers=r;Ye.mark("constructor"),this._groups=new Co(n),this._scheduler=new pn}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _maxRecordCacheSize=100;static _fastPasswordHash=HI();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_sessionCpuTime=new Map;_cpuWatcher=null;_groups;_sudoTimestamps=new Map;_loginFailures=new Map;_maxLoginFailures=5;_sudoTimestampWindowMs=300*1e3;_loginFailureTtlMs=3600*1e3;_scheduler;_schedulerEnabled=!1;initialize(){Ye.mark("initialize"),this._groups.initialize(),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let n=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),n=!0),this._sudoers.add("root");let r="/root";this._vfs.exists(r)||(this._vfs.mkdir(r,493),this._vfs.writeFile(`${r}/README.txt`,"Welcome to the virtual environment, root")),n&&this.persist(),this.emit("initialized")}setQuotaBytes(n,r){if(Ye.mark("setQuotaBytes"),t._validateUsername(n),!this._users.has(n))throw new Error(`quota: user '${n}' does not exist`);if(!Number.isFinite(r)||r<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(n,Math.floor(r)),this.persist()}clearQuota(n){Ye.mark("clearQuota"),t._validateUsername(n),this._quotas.delete(n),this.persist()}getQuotaBytes(n){return Ye.mark("getQuotaBytes"),this._quotas.get(n)??null}getUsageBytes(n){Ye.mark("getUsageBytes");let r=n==="root"?"/root":`/home/${n}`;return this._vfs.exists(r)?this._vfs.getUsageBytes(r):0}assertWriteWithinQuota(n,r,s){Ye.mark("assertWriteWithinQuota");let i=this._quotas.get(n);if(i===void 0)return;let o=GS(r),a=GS(n==="root"?"/root":`/home/${n}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(n),u=0;if(this._vfs.exists(o)){let p=this._vfs.stat(o);p.type==="file"&&(u=p.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),f=l-u+d;if(f>i)throw new Error(`quota exceeded for '${n}': ${f}/${i} bytes`)}verifyPassword(n,r){Ye.mark("verifyPassword");let s=this._users.get(n);if(!s)return t.hashPassword(r,""),!1;let i=t.hashPassword(r,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:VI(a,c)}catch{return i===o}}addUser(n,r){if(Ye.mark("addUser"),t._validateUsername(n),t._validatePassword(r),this._users.has(n))return;let s=this._createRecord(n,r);this._users.set(n,s),this._autoSudoForNewUsers&&this._sudoers.add(n);let i=n;if(!this._groups.getGroup(i))try{this._groups.createGroup(i,s.gid),this._groups.addMember(i,n)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",n)}catch{}let o=s.uid,a=s.gid,c=n==="root"?"/root":`/home/${n}`;this._vfs.exists(c)||(n!=="root"&&!this._vfs.exists("/home")&&this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(c,448,0,0),this._vfs.chown(c,o,a,0),this._vfs.writeFile(`${c}/README.txt`,`Welcome to the virtual environment, ${n}`,{},o,a)),this.persist(),this.emit("user:add",{username:n})}ensureUser(n){if(this._users.has(n))return;if(n==="root"){this._users.set("root",this._createRecord("root",""));return}let r=this._createRecord(n,"");this._users.set(n,r),this._autoSudoForNewUsers&&this._sudoers.add(n);let s=n;if(!this._groups.getGroup(s))try{this._groups.createGroup(s,r.gid),this._groups.addMember(s,n)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",n)}catch{}let i=r.uid,o=r.gid,a=`/home/${n}`;if(this._vfs.exists(a))try{this._vfs.chown(a,i,o,0)}catch{}else this._vfs.exists("/home")||this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(a,448,0,0),this._vfs.chown(a,i,o,0);this._vfs.exists(`${a}/README.txt`)||this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${n}`,{},i,o),this.persist(),this.emit("user:add",{username:n})}getPasswordHash(n){Ye.mark("getPasswordHash");let r=this._users.get(n);return r?r.passwordHash:null}setPassword(n,r){if(Ye.mark("setPassword"),t._validateUsername(n),t._validatePassword(r),!this._users.has(n))throw new Error(`passwd: user '${n}' does not exist`);this._users.set(n,this._createRecord(n,r)),this.persist()}deleteUser(n){if(Ye.mark("deleteUser"),t._validateUsername(n),n==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(n))throw new Error(`deluser: user '${n}' does not exist`);this._sudoers.delete(n);try{this._groups.removeMember("sudo",n)}catch{}let r=this._groups.getGroup(n);if(r&&r.members.length<=1)try{this._groups.deleteGroup(n)}catch{}else if(r)try{this._groups.removeMember(n,n)}catch{}this.emit("user:delete",{username:n}),this.persist()}isSudoer(n){return Ye.mark("isSudoer"),this._sudoers.has(n)}addSudoer(n){if(Ye.mark("addSudoer"),t._validateUsername(n),!this._users.has(n))throw new Error(`sudoers: user '${n}' does not exist`);this._sudoers.add(n);try{this._groups.addMember("sudo",n)}catch{}this.persist()}removeSudoer(n){if(Ye.mark("removeSudoer"),t._validateUsername(n),n==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(n);try{this._groups.removeMember("sudo",n)}catch{}this.persist()}registerSession(n,r){Ye.mark("registerSession");let s={id:WI(),username:n,tty:`pts/${this._nextTty++}`,remoteAddress:r,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:n,remoteAddress:r}),s}unregisterSession(n){if(Ye.mark("unregisterSession"),!n)return;let r=this._activeSessions.get(n);this._activeSessions.delete(n),r&&this.emit("session:unregister",{sessionId:n,username:r.username,tty:r.tty})}updateSession(n,r,s){if(Ye.mark("updateSession"),!n)return;let i=this._activeSessions.get(n);i&&this._activeSessions.set(n,{...i,username:r,remoteAddress:s})}listActiveSessions(){return Ye.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((n,r)=>n.startedAt.localeCompare(r.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(n){return this._users.get(n)?.uid??0}getGid(n){return this._users.get(n)?.gid??0}getUsername(n){for(let[r,s]of this._users)if(s.uid===n)return r;return null}getGroupName(n){for(let[r,s]of this._users)if(s.gid===n)return r;return null}registerProcess(n,r,s,i,o,a=1,c=0){let l=this._nextPid++,u=pn.niceToPriority(c);return this._activeProcesses.set(l,{pid:l,ppid:a,username:n,command:r,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0,nice:c,priority:u}),l}unregisterProcess(n){this._processCpuTime.delete(n),this._scheduler.removeProcess(n);let r=this._activeProcesses.get(n);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,n)),this._activeProcesses.delete(n)}markProcessDone(n){let r=this._activeProcesses.get(n);r&&(r.status="done",r.signalHandlers.clear(),r.abortController=void 0,this.emit("SIGCHLD",r.ppid,n),setTimeout(()=>this.unregisterProcess(n),5e3).unref?.())}listProcesses(){return Array.from(this._activeProcesses.values()).sort((n,r)=>n.pid-r.pid)}killProcess(n,r=15){let s=this._activeProcesses.get(n);if(!s)return!1;if(r===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,n),!0;if(r===19)return s.status="stopped",!0;if(r===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(r);return i?(i(r,n),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=r,s.exitCode=128+r,this.emit("SIGCHLD",s.ppid,n),!0)}killAllUserProcesses(n,r=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===n&&this.killProcess(i,r)&&s++;return s}killProcessesByTty(n,r=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===n&&this.killProcess(i,r)&&s++;return s}getProcess(n){return this._activeProcesses.get(n)}setCpuCapCores(n){this._cpuCapCores=n,this._cpuBudgetMs=n>0?n*this._cpuWindowMs:0,n>0&&!this._cpuWatcher?this._startCpuWatcher():n===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(n){return this._processCpuTime.get(n)??0}addProcessCpuTime(n,r){let s=this._processCpuTime.get(n)??0;this._processCpuTime.set(n,s+r);let i=this._activeProcesses.get(n);if(i){let o=i.tty||"?",a=this._sessionCpuTime.get(o)??0;this._sessionCpuTime.set(o,a+r)}}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let n=Date.now(),r=n-this._cpuWindowStart;if(r>=this._cpuWindowMs){this._cpuWindowStart=n,this._processCpuTime.clear(),this._sessionCpuTime.clear();return}let s=new Set;for(let[,c]of this._activeProcesses)c.status==="running"&&c.tty&&s.add(c.tty);let i=Math.max(s.size,1),o=Math.ceil(this._cpuBudgetMs/i),a=new Map;for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=this._processCpuTime.get(c)??0,d=new Date(l.startedAt).getTime(),f=Math.min(n-d,r),p=Math.max(u,f),h=l.tty||"?";a.set(h,(a.get(h)??0)+p)}for(let[c,l]of this._activeProcesses){if(l.status!=="running")continue;let u=l.tty||"?",d=a.get(u)??0;d>o&&(this.killProcess(c,9),this.emit("process:killed:cpu",{pid:c,command:l.command,cpuTime:d}))}}enableScheduler(n={}){this._scheduler=new pn(n),this._schedulerEnabled=!0}disableScheduler(){this._schedulerEnabled=!1}isSchedulerEnabled(){return this._schedulerEnabled}getSchedulerStats(){return this._schedulerEnabled?this._scheduler.getStats():null}resetSchedulerStats(){this._scheduler.resetStats()}setProcessNice(n,r){if(!pn.isValidNice(r))return!1;let s=this._activeProcesses.get(n);return s?(s.nice=r,s.priority=pn.niceToPriority(r),this.emit("process:nice",{pid:n,nice:r,priority:s.priority}),!0):!1}getProcessNice(n){return this._activeProcesses.get(n)?.nice??0}getProcessPriority(n){return this._activeProcesses.get(n)?.priority??"normal"}getProcessTimeslice(n){let r=this._activeProcesses.get(n)?.nice??0;return this._scheduler.calculateTimeslice(r)}recordAndCheckThrottle(n,r){if(!this._schedulerEnabled)return!1;this._scheduler.recordCpuTime(n,r);let s=this._activeProcesses.get(n);if(s?.status!=="running")return!1;let i=this.listProcesses().filter(o=>o.status==="running").length;return this._scheduler.shouldThrottle(n,s.nice,i)}getSchedulerCpuTime(n){return this._scheduler.getProcessCpuTime(n)}removeProcessFromScheduler(n){this._scheduler.removeProcess(n)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let n=this._vfs.readFile(this._usersPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=11){let[o,a,c,l,u,d,f,p,h,m,g]=i;if(!(o&&l&&u))continue;let y=Number.parseInt(a??"1001",10),v=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:y,gid:v,salt:l,passwordHash:u,lastPasswordChange:Number.parseInt(d??"0",10),minPasswordAge:Number.parseInt(f??"0",10),maxPasswordAge:Number.parseInt(p??"99999",10),passwordWarnDays:Number.parseInt(h??"7",10),passwordInactiveDays:Number.parseInt(m??"0",10),accountExpiryDate:Number.parseInt(g??"0",10)})}else if(i.length>=5){let[o,a,c,l,u]=i;if(!(o&&l&&u))continue;let d=Number.parseInt(a??"1001",10),f=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:f,salt:l,passwordHash:u,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}else{let[o,a,c]=i;if(!(o&&a&&c))continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let n=this._vfs.readFile(this._sudoersPath);for(let r of n.split(`
`)){let s=r.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let n=this._vfs.readFile(this._quotasPath);for(let r of n.split(`
`)){let s=r.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!(i&&Number.isFinite(a))||a<0||this._quotas.set(i,a)}}persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let n=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash,o.lastPasswordChange,o.minPasswordAge,o.maxPasswordAge,o.passwordWarnDays,o.passwordInactiveDays,o.accountExpiryDate].join(":")).join(`
`),r=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&this._vfs.flushMirror()}_writeIfChanged(n,r,s){return this._vfs.exists(n)&&this._vfs.readFile(n)===r?(this._vfs.chmod(n,s),!1):(this._vfs.writeFile(n,r,{mode:s}),!0)}_createRecord(n,r,s,i){let o=s??(n==="root"?0:this._nextUid++),a=i??(n==="root"?0:this._nextGid++),c=VS("sha256").update(n).update(":").update(r).digest("hex"),l=t._recordCache.get(c);if(l)return{...l,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};let u=zI(16).toString("hex"),d={username:n,uid:o,gid:a,salt:u,passwordHash:t.hashPassword(r,u),lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};if(t._recordCache.set(c,d),t._recordCache.size>t._maxRecordCacheSize){let f=t._recordCache.keys().next().value;f&&t._recordCache.delete(f)}return d}hasPassword(n){Ye.mark("hasPassword");let r=this._users.get(n);if(!r)return!1;let s=t.hashPassword("",r.salt);return r.passwordHash===s?!1:!!r.passwordHash}static hashPassword(n,r=""){return t._fastPasswordHash?VS("sha256").update(r).update(n).digest("hex"):jI(n,r||"",32).toString("hex")}static _validateUsername(n){if(!n||n.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(n))throw new Error("invalid username")}static _validatePassword(n){if(!n||n.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(n,r,s){Ye.mark("addAuthorizedKey");let i=this._authorizedKeys.get(n)??[];i.push({algo:r,data:s}),this._authorizedKeys.set(n,i),this.emit("key:add",{username:n,algo:r})}removeAuthorizedKeys(n){this._authorizedKeys.delete(n),this.emit("key:remove",{username:n})}getAuthorizedKeys(n){return this._authorizedKeys.get(n)??[]}createGroup(n,r){return this._groups.createGroup(n,r)}deleteGroup(n){this._groups.deleteGroup(n)}addGroupMember(n,r){this._groups.addMember(n,r)}removeGroupMember(n,r){this._groups.removeMember(n,r)}getGroup(n){return this._groups.getGroup(n)}getGroupByGid(n){return this._groups.getGroupByGid(n)}getGidByName(n){return this._groups.getGidByName(n)}getNameByGid(n){return this._groups.getNameByGid(n)}getUserSupplementaryGroups(n){return this._groups.getUserSupplementaryGroups(n)}getUserAllGroups(n){let r=this.getGid(n);return this._groups.getUserAllGroups(n,r)}isMemberOf(n,r){let s=this.getGid(n);return this._groups.isMemberOf(n,r,s)}listGroups(){return this._groups.listGroups()}generateGroupFile(){return this._groups.generateGroupFile()}setPasswordAging(n,r,s,i,o){let a=this._users.get(n);if(!a)throw new Error(`chage: user '${n}' does not exist`);r!==void 0&&(a.minPasswordAge=r),s!==void 0&&(a.maxPasswordAge=s),i!==void 0&&(a.passwordWarnDays=i),o!==void 0&&(a.passwordInactiveDays=o),this.persist()}getPasswordAging(n){let r=this._users.get(n);return r?{lastChange:r.lastPasswordChange,minAge:r.minPasswordAge,maxAge:r.maxPasswordAge,warnDays:r.passwordWarnDays,inactiveDays:r.passwordInactiveDays,expiryDate:r.accountExpiryDate}:null}setAccountExpiry(n,r){let s=this._users.get(n);if(!s)throw new Error(`chage: user '${n}' does not exist`);s.accountExpiryDate=r,this.persist()}forcePasswordChange(n){let r=this._users.get(n);if(!r)throw new Error(`chage: user '${n}' does not exist`);r.lastPasswordChange=0,this.persist()}isPasswordExpired(n){let r=this._users.get(n);return!r||r.maxPasswordAge===99999?!1:Math.floor(Date.now()/864e5)-r.lastPasswordChange>r.maxPasswordAge}lockAccount(n){let r=this._users.get(n);if(!r)throw new Error(`usermod: user '${n}' does not exist`);r.passwordHash.startsWith("!")||(r.passwordHash=`!${r.passwordHash}`,this.persist())}unlockAccount(n){let r=this._users.get(n);if(!r)throw new Error(`usermod: user '${n}' does not exist`);r.passwordHash.startsWith("!")&&(r.passwordHash=r.passwordHash.slice(1),this.persist())}isAccountLocked(n){return this._users.get(n)?.passwordHash.startsWith("!")??!1}generateShadowFile(){let r=[{name:"root",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"daemon",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"nobody",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"messagebus",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"_apt",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-network",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-resolve",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"polkitd",hash:"!",lastChange:19e3,min:0,max:99999,warn:7}].map(s=>`${s.name}:${s.hash}:${s.lastChange}:${s.min}:${s.max}:${s.warn}:::`);for(let s of this._users.values()){if(s.username==="root")continue;let i=s.passwordHash.startsWith("!")?"!":s.passwordHash;r.push(`${s.username}:${i}:${s.lastPasswordChange}:${s.minPasswordAge}:${s.maxPasswordAge}:${s.passwordWarnDays}:${s.passwordInactiveDays}:${s.accountExpiryDate}:`)}return r.join(`
`)}grantSudoTimestamp(n){this._sudoTimestamps.set(n,Date.now())}hasValidSudoTimestamp(n){if(n==="root")return!0;let r=this._sudoTimestamps.get(n);return r?Date.now()-r>=this._sudoTimestampWindowMs?(this._sudoTimestamps.delete(n),!1):!0:!1}clearSudoTimestamp(n){this._sudoTimestamps.delete(n)}recordLoginFailure(n,r){let s=Date.now();for(let[o,a]of this._loginFailures)s-a.lastTime>this._loginFailureTtlMs&&this._loginFailures.delete(o);let i=this._loginFailures.get(n);i?(i.count++,i.lastTime=s,i.sourceIp=r):this._loginFailures.set(n,{count:1,lastTime:s,sourceIp:r})}recordLoginSuccess(n){this._loginFailures.delete(n)}getLoginFailures(n){return this._loginFailures.get(n)?.count??0}resetLoginFailures(n){this._loginFailures.delete(n)}isAccountLockedByFailures(n){let r=this._loginFailures.get(n);return r?r.count>=this._maxLoginFailures:!1}getLastFailureTime(n){return this._loginFailures.get(n)?.lastTime??0}};function GS(t){let e=HS.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as qI}from"node:events";var _o=class t extends qI{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,n={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=n.idleThresholdMs??6e4,this._checkIntervalMs=n.checkIntervalMs??15e3,this._gcIntervalMs=n.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}_freeze(){this._state!=="frozen"&&(this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=In(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=t._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=0;for(let s of n)s.status==="done"&&(e.unregisterProcess(s.pid),r++);return r}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let n=e.listProcesses(),r=new Set(n.map(o=>o.pid)),s=0,i=t._getAllTrackedPids(e);for(let o of i)!r.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}static _getAllTrackedPids(e){return e.listProcesses().map(r=>r.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}static _forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};ii();import QS from"node:path";ae();tt();import*as qS from"node:path";function Io(t,e){let n=`${ge(e)}/.bash_history`;return t.exists(n)?t.readFile(n).split(`
`).map(r=>r.trim()).filter(r=>r.length>0):(t.writeFile(n,""),[])}function Eo(t,e,n){let r=n.length>0?`${n.join(`
`)}
`:"";t.writeFile(`${ge(e)}/.bash_history`,r)}function $o(t,e){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(n))return null;try{let r=JSON.parse(t.readFile(n));if(typeof r!="object"||r===null)return null;let s=r;return typeof s.from!="string"||typeof s.timestamp!="number"?null:{from:s.from,at:new Date(s.timestamp).toISOString()}}catch{return null}}function Po(t,e,n){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(r,JSON.stringify({at:new Date().toISOString(),from:n}))}function ko(t,e,n){let r=n.lastIndexOf("/"),s=r>=0?n.slice(0,r+1):"",i=r>=0?n.slice(r+1):n,o=B(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=qS.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as KI}from"node:child_process";import{readFile as YI}from"node:fs/promises";function YS(t){return`'${t.replace(/'/g,"'\\''")}'`}function tr(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function KS(t,e){let n=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,r=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${n} rows ${r} 2>/dev/null; ${t}`}async function XS(t){try{let n=(await YI(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),r=await Promise.all(n.map(s=>XS(s)));return[...n,...r.flat()]}catch{return[]}}async function ZS(t=process.pid){let e=await XS(t),n=Array.from(new Set(e)).sort((r,s)=>r-s);return n.length===0?null:n.join(",")}function XI(t,e,n){let r=KS(t,e),s=KI("script",["-qfec",r,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{n.write(i.toString("utf8"))}),s.stderr.on("data",i=>{n.write(i.toString("utf8"))}),s}function JS(t,e,n){return XI(`htop -p ${YS(t)}`,e,n)}function eb(t,e,n,r,s,i,o,a){let c="",l=0,u=Io(a.vfs,n),d=null,f="",p=ge(n),h=null,m=wt(n,r);if(s){let F=a.users.listActiveSessions().find(j=>j.id===s);F&&(m.vars.__TTY=F.tty)}let g=[],y=null,v=null,x=()=>{if(m.vars.PS1)return Wr(n,r,"",m.vars.PS1,p);let F=ge(n),j=p===F?"~":QS.posix.basename(p)||"/";return Wr(n,r,j)},b=Array.from(new Set(ss())).sort();console.log(`[${s}] Shell started for user '${n}' at ${i}`);let P=!1,_=async(F,j=!1)=>{if(a.vfs.exists(F))try{let L=a.vfs.readFile(F);for(let G of L.split(`
`)){let U=G.trim();if(!(!U||U.startsWith("#")))if(j){let H=U.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);H&&(m.vars[H[1]]=H[2])}else{let H=await xe(U,n,r,"shell",p,a,void 0,m);H.stdout&&e.write(H.stdout.replace(/\n/g,`\r
`))}}}catch{}},w=(async()=>{await _("/etc/environment",!0),await _(`${ge(n)}/.profile`),await _(`${ge(n)}/.bashrc`),P=!0})();function S(){let F=x();e.write(`\r\x1B[0m${F}${c}\x1B[K`);let j=c.length-l;j>0&&e.write(`\x1B[${j}D`)}function C(){e.write("\r\x1B[K")}function $(F){v={...F,buffer:""},C(),e.write(F.prompt)}async function N(F){if(!v)return;let j=v;if(v=null,!F){e.write(`\r
Sorry, try again.\r
`),S();return}if(!j.commandLine){n=j.targetUser,j.loginShell&&(p=ge(n)),a.users.updateSession(s,n,i),await nn(n,r,p,m,a),e.write(`\r
`),S();return}let L=j.loginShell?ge(j.targetUser):p,G=await xe(j.commandLine,j.targetUser,r,"shell",L,a);if(e.write(`\r
`),G.openEditor){Y(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await Q();return}if(G.openPacman){E();return}G.clearScreen&&e.write("\x1B[2J\x1B[H"),G.stdout&&e.write(`${tr(G.stdout)}\r
`),G.stderr&&e.write(`${tr(G.stderr)}\r
`),G.switchUser?(g.push({authUser:n,cwd:p}),n=G.switchUser,p=G.nextCwd??ge(n),a.users.updateSession(s,n,i),await nn(n,r,p,m,a)):G.nextCwd&&(p=G.nextCwd),S()}let R=-1;function W(F,j){if(F!==void 0&&j){let L=a.users.getUid(n),G=a.users.getGid(n);a.vfs.writeFile(j,F,{},L,G)}R!==-1&&(a.users.unregisterProcess(R),R=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}function Y(F,j){R=a.users.registerProcess(n,"nano",["nano",F],m.vars.__TTY??"?");let L=new Br({stream:e,terminalSize:o,content:j,filename:QS.posix.basename(F),onExit:(G,U)=>{G==="saved"?W(U,F):W()}});y={kind:"nano",targetPath:F,editor:L},L.start()}async function Q(){let F=await ZS();if(!F){e.write(`htop: no child_process processes to display\r
`);return}R=a.users.registerProcess(n,"htop",["htop"],m.vars.__TTY??"?");let j=JS(F,o,e);j.on("error",L=>{e.write(`htop: ${L.message}\r
`),W()}),j.on("close",()=>{W()}),y={kind:"htop",process:j}}function E(){R=a.users.registerProcess(n,"pacman",["pacman"],m.vars.__TTY??"?");let F=new zr({stream:e,terminalSize:o,onExit:()=>{R!==-1&&(a.users.unregisterProcess(R),R=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),S()}});y={kind:"pacman",game:F},F.start()}function A(F){c=F,l=c.length,S()}function I(F){c=`${c.slice(0,l)}${F}${c.slice(l)}`,l+=F.length,S()}function D(F,j){let L=j;for(;L>0&&!/\s/.test(F.charAt(L-1));)L-=1;let G=j;for(;G<F.length&&!/\s/.test(F.charAt(G));)G+=1;return{start:L,end:G}}function z(){let{start:F,end:j}=D(c,l),L=c.slice(F,l);if(L.length===0)return;let U=c.slice(0,F).trim().length===0?b.filter(K=>K.startsWith(L)):[],H=ko(a.vfs,p,L),q=Array.from(new Set([...U,...H])).sort();if(q.length!==0){if(q.length===1){let K=q[0],se=K.endsWith("/")?"":" ";c=`${c.slice(0,F)}${K}${se}${c.slice(j)}`,l=F+K.length+se.length,S();return}e.write(`\r
`),e.write(`${q.join("  ")}\r
`),S()}}function Z(F){F.length!==0&&(u.push(F),u.length>500&&(u=u.slice(u.length-500)),Eo(a.vfs,n,u))}function J(){let F=$o(a.vfs,n);e.write(Ki(r,t,F)),Po(a.vfs,n,i)}J(),w.then(()=>S()),e.on("data",F=>{(async()=>{if(!P)return;if(y){y.kind==="nano"?y.editor.handleInput(F):y.kind==="pacman"?y.game.handleInput(F):y.process.stdin.write(F);return}if(h){let L=h,G=F.toString("utf8");for(let U=0;U<G.length;U++){let H=G.charAt(U);if(H===""){h=null,e.write(`^C\r
`),S();return}if(H==="\x7F"||H==="\b"){c=c.slice(0,-1),S();continue}if(H==="\r"||H===`
`){let q=c;if(c="",l=0,e.write(`\r
`),q===L.delimiter){let K=L.lines.join(`
`),se=L.cmdBefore;h=null,Z(`${se} << ${L.delimiter}`);let re=await xe(se,n,r,"shell",p,a,K,m);re.stdout&&e.write(`${tr(re.stdout)}\r
`),re.stderr&&e.write(`${tr(re.stderr)}\r
`),re.nextCwd&&(p=re.nextCwd),S();return}L.lines.push(q),e.write("> ");continue}(H>=" "||H==="	")&&(c+=H,e.write(H))}return}if(v){let L=F.toString("utf8");for(let G=0;G<L.length;G+=1){let U=L.charAt(G);if(U===""){v=null,e.write(`^C\r
`),S();return}if(U==="\x7F"||U==="\b"){v.buffer=v.buffer.slice(0,-1);continue}if(U==="\r"||U===`
`){let H=v.buffer;if(v.buffer="",v.onPassword){let{result:K,nextPrompt:se}=await v.onPassword(H,a);e.write(`\r
`),K===null?(se&&(v.prompt=se),e.write(v.prompt)):(v=null,K.stdout&&e.write(K.stdout.replace(/\n/g,`\r
`)),K.stderr&&e.write(K.stderr.replace(/\n/g,`\r
`)),S());return}let q=a.users.verifyPassword(v.username,H);await N(q);return}U>=" "&&(v.buffer+=U)}return}let j=F.toString("utf8");for(let L=0;L<j.length;L+=1){let G=j.charAt(L);if(G===""){if(c="",l=0,d=null,f="",e.write(`logout\r
`),g.length>0){let U=g.pop();n=U.authUser,p=U.cwd,a.users.updateSession(s,n,i),m.vars.PS1=wt(n,r).vars.PS1??"",S()}else{e.exit(0),e.end();return}continue}if(G==="	"){z();continue}if(G==="\x1B"){let U=j[L+1],H=j[L+2],q=j[L+3];if(U==="["&&H){if(H==="A"){L+=2,u.length>0&&(d===null?(f=c,d=u.length-1):d>0&&(d-=1),A(u[d]??""));continue}if(H==="B"){L+=2,d!==null&&(d<u.length-1?(d+=1,A(u[d]??"")):(d=null,A(f)));continue}if(H==="C"){L+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(H==="D"){L+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(H==="3"&&q==="~"){L+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,S());continue}if(H==="1"&&q==="~"){L+=3,l=0,S();continue}if(H==="H"){L+=2,l=0,S();continue}if(H==="4"&&q==="~"){L+=3,l=c.length,S();continue}if(H==="F"){L+=2,l=c.length,S();continue}}if(U==="O"&&H){if(H==="H"){L+=2,l=0,S();continue}if(H==="F"){L+=2,l=c.length,S();continue}}}if(G===""){c="",l=0,d=null,f="",e.write(`^C\r
`),S();continue}if(G===""){l=0,S();continue}if(G===""){l=c.length,S();continue}if(G==="\v"){c=c.slice(0,l),S();continue}if(G===""){c=c.slice(l),l=0,S();continue}if(G===""){let U=l;for(;U>0&&c[U-1]===" ";)U--;for(;U>0&&c[U-1]!==" ";)U--;c=c.slice(0,U)+c.slice(l),l=U,S();continue}if(G==="\r"||G===`
`){let U=c.trim();if(c="",l=0,d=null,f="",e.write(`\r
`),U==="!!"||U.startsWith("!! ")||/\s!!$/.test(U)||/ !! /.test(U)){let q=u.length>0?u[u.length-1]:"";U=U==="!!"?q:U.replace(/!!/g,q)}else if(/(?:^|\s)!!/.test(U)){let q=u.length>0?u[u.length-1]:"";U=U.replace(/!!/g,q)}let H=U.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(H&&U.length>0){h={delimiter:H[2],lines:[],cmdBefore:H[1].trim()||"cat"},e.write("> ");continue}if(U.length>0){let q=await xe(U,n,r,"shell",p,a,void 0,m);if(Z(U),q.openEditor){Y(q.openEditor.targetPath,q.openEditor.initialContent);return}if(q.openHtop){await Q();return}if(q.openPacman){E();return}if(q.sudoChallenge){$(q.sudoChallenge);return}if(q.clearScreen&&e.write("\x1B[2J\x1B[H"),q.stdout&&e.write(`${tr(q.stdout)}\r
`),q.stderr&&e.write(`${tr(q.stderr)}\r
`),q.closeSession)if(e.write(`logout\r
`),g.length>0){let K=g.pop();n=K.authUser,p=K.cwd,a.users.updateSession(s,n,i),m.vars.PS1=wt(n,r).vars.PS1??""}else{e.exit(q.exitCode??0),e.end();return}q.nextCwd&&!q.closeSession&&(p=q.nextCwd),q.switchUser&&(g.push({authUser:n,cwd:p}),n=q.switchUser,p=q.nextCwd??ge(n),m.vars.PWD=p,a.users.updateSession(s,n,i),await nn(n,r,p,m,a),c="",l=0)}S();continue}if(G==="\x7F"||G==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,S());continue}I(G)}})().catch(j=>{console.error("shell data handler error:",j)})}),e.on("close",()=>{y&&(y.kind==="htop"?y.process.kill("SIGTERM"):y.kind==="pacman"&&y.game.stop(),y=null)})}function JI(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&tb(t.vfsInstance)}function tb(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var QI={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Ds=Xi("VirtualShell");function eE(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var Mo=class extends ZI{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,n,r,s){super(),Ds.mark("constructor"),this.hostname=e,this.properties=n||QI,this.startTime=Date.now(),this.sysctl=Yh(e,this.properties.kernel),this.resourceCaps=s??{},tb(r)?this.vfs=r:JI(r)?this.vfs=r.vfsInstance:this.vfs=new xo(r??{}),this.users=new wo(this.vfs,eE()),this.packageManager=new Jt(this.vfs,this.users),this.network=new pi;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,f=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),o.initialize(),WS(i,o,c,a,l,[],u,f),i.onBeforeRead("/proc",()=>{Rs(i,a,c,l,o.listActiveSessions(),u,f)}),i.registerContentResolver("/proc/sys",p=>{let h=wr(d,p);if(h){let m=h.value;return typeof m=="number"?`${m}
`:m.endsWith(`
`)?m:`${m}
`}return null}),i.onBeforeWrite("/proc/sys",(p,h)=>{let m=wr(d,p);if(m&&m.set(typeof h=="string"?h.trim():String(h)),p.includes("vm/ram_cap_bytes")){let g=Number(h);f.ramCapBytes=g>0?g:void 0,i.setRamCap(f.ramCapBytes??null)}if(p.includes("kernel/cpu_cap_cores")){let g=Number(h);f.cpuCapCores=g>0?g:void 0,o.setCpuCapCores(f.cpuCapCores??0)}}),f.ramCapBytes&&i.setRamCap(f.ramCapBytes),f.cpuCapCores&&o.setCpuCapCores(f.cpuCapCores),this.emit("initialized")})()}ensureInitialized(){return Ds.mark("ensureInitialized"),this._initialized}addCommand(e,n,r){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");aa(ca(s,n,r))}executeCommand(e,n,r){Ds.mark("executeCommand"),this._idle?.ping();let s=xe(e,n,this.hostname,"shell",r,this);return this.emit("command",{command:e,user:n,cwd:r}),s}startInteractiveSession(e,n,r,s,i){Ds.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:n,sessionId:r,remoteAddress:s}),eb(this.properties,e,n,this.hostname,r,s,i,this),this.refreshProcSessions()}refreshProcFs(){Rs(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,n,r={}){this.vfs.mount(e,n,r)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){Rs(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){Zc(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,n,r){Ds.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,n,r),this.vfs.writeFile(n,r)}enableIdleManagement(e){this._idle||(this._idle=new _o(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",n=>this.emit("gc:run",n)),this._idle.start())}disableIdleManagement(){this._idle&&(this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function Fs(t,e){return t.includes(e)}function Qc(t,e,n){let r=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(r))return i.slice(r.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:n}}return n}var mn=process.argv.slice(2);(Fs(mn,"--version")||Fs(mn,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(Fs(mn,"--help")||Fs(mn,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function rE(){for(let t=0;t<mn.length;t+=1){let e=mn[t];if(e==="--user"){let n=mn[t+1];if(!n||n.startsWith("--"))throw new Error("self-standalone: --user requires a value");return n}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var ht=Qc(mn,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),sE=Qc(mn,"--snapshot",".vfs"),iE=rE();console.clear();var Se=new Mo(ht,void 0,{mode:"fs",snapshotPath:sE});function Nn(){Se.vfs.stopAutoFlush()}function oE(t){let e=Array.from(new Set(ss())).sort();return(n,r)=>{let{cwd:s}=t(),i=n.split(/\s+/).at(-1)??"",a=n.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=ko(Se.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();r(null,[l,i])}}function Ls(t,e){return new Promise(n=>{if(!(Pe.isTTY&&$e.isTTY)){t.question(e,n);return}let r=!!Pe.isRaw,s="",i=()=>{Pe.off("data",a),r||Pe.setRawMode(!1)},o=c=>{i(),$e.write(`
`),n(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),$e.write(e),r||Pe.setRawMode(!0),Pe.resume(),Pe.on("data",a)})}function aE(t,e,n,r){let s=t,i=e;return n.switchUser?(s=n.switchUser,i=n.nextCwd??ge(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ge(s),r.vars.PWD=i):n.nextCwd&&(i=n.nextCwd,r.vars.PWD=i),{authUser:s,cwd:i}}Se.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function cE(){await Se.ensureInitialized();let t=iE.trim()||"root";Se.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":ge(t);Se.vfs.exists(e)||Se.vfs.mkdir(e,t==="root"?448:493);let n=`${e}/README.txt`;Se.vfs.exists(n)||(Se.vfs.writeFile(n,`Welcome to ${ht}
`),Se.vfs.stopAutoFlush());let r=wt(t,ht),s=t,i=ge(s);r.vars.PWD=i;let o=[],a="localhost",c={cols:$e.columns??80,rows:$e.rows??24};process.on("SIGWINCH",()=>{c.cols=$e.columns??c.cols,c.rows=$e.rows??c.rows});let l=Io(Se.vfs,s),u=nE({input:Pe,output:$e,terminal:!0,completer:oE(()=>({cwd:i}))}),d=u;"history"in d&&(d.history=[...l].reverse());{let b=u,P=b._ttyWrite;if(P===void 0)return;let _=P.bind(u);b._ttyWrite=(w,S)=>{let C=b.line;if(S?.ctrl&&S?.name==="d"&&C===""&&o.length>0){$e.write(`^D
`);let $=o.pop();if($===void 0)return;s=$.authUser,i=$.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ge(s),r.vars.PWD=i,r.vars.PS1=wt(s,ht).vars.PS1??"",$e.write(`logout
`),Nn(),v();return}_(w,S)}}function f(b,P){return new Promise(_=>{let w={write:E=>{$e.write(E)},exit:()=>{},end:()=>{},on:()=>{}},S={cols:$e.columns??80,rows:$e.rows??24},C=Pe.listeners("data");for(let E of C)Pe.off("data",E);let $=Pe.listeners("keypress");for(let E of $)Pe.off("keypress",E);function N(){process.off("SIGWINCH",Y),process.off("SIGINT",R),Pe.off("data",Q);for(let E of C)Pe.on("data",E);for(let E of $)Pe.on("keypress",E);$e.write("\x1B[?25h\x1B[0m"),u.resume()}let R=()=>{},W=new Br({stream:w,terminalSize:S,content:P,filename:rb.posix.basename(b),onSave:E=>{let A=Se.users.getUid(s),I=Se.users.getGid(s);Se.vfs.writeFile(b,E,{},A,I),Nn()},onExit:(E,A)=>{if(N(),E==="saved"){let I=Se.users.getUid(s),D=Se.users.getGid(s);Se.vfs.writeFile(b,A,{},I,D),Nn()}_()}}),Y=()=>{W.resize({cols:$e.columns??S.cols,rows:$e.rows??S.rows})},Q=E=>{W.handleInput(E)};Pe.setRawMode(!0),Pe.resume(),Pe.on("data",Q),process.on("SIGWINCH",Y),process.on("SIGINT",R),W.start()})}function p(){return new Promise(b=>{let P={write:Y=>{$e.write(Y)},exit:()=>{},end:()=>{},on:()=>{}},_={cols:$e.columns??80,rows:$e.rows??24},w=Pe.listeners("data");for(let Y of w)Pe.off("data",Y);let S=Pe.listeners("keypress");for(let Y of S)Pe.off("keypress",Y);function C(){process.off("SIGWINCH",R),process.off("SIGINT",W),Pe.off("data",N);for(let Y of w)Pe.on("data",Y);for(let Y of S)Pe.on("keypress",Y);$e.write("\x1B[?25h\x1B[0m"),u.resume(),b()}Pe.isTTY&&Pe.setRawMode(!0),Pe.resume();let $=new zr({stream:P,terminalSize:_,onExit:C});function N(Y){$.handleInput(Y)}function R(){}function W(){$.stop(),C()}Pe.on("data",N),process.on("SIGWINCH",R),process.on("SIGINT",W),$.start()})}async function h(b){if(b.onPassword){let S=b.prompt;for(;;){let C=await Ls(u,S),$=await b.onPassword(C,Se);if($.result===null){S=$.nextPrompt??S;continue}await g($.result);return}}let P=await Ls(u,b.prompt);if(!Se.users.verifyPassword(b.username,P)){process.stderr.write(`Sorry, try again.
`);return}if(!b.commandLine){o.push({authUser:s,cwd:i}),s=b.targetUser,i=ge(s),r.vars.PWD=i,await nn(s,ht,i,r,Se);return}let _=b.loginShell?ge(b.targetUser):i,w=await xe(b.commandLine,b.targetUser,ht,"shell",_,Se,void 0,r);await g(w)}async function m(b){let P=await Ls(u,b.prompt);if(b.confirmPrompt&&await Ls(u,b.confirmPrompt)!==P){process.stderr.write(`passwords do not match
`);return}switch(b.action){case"passwd":Se.users.setPassword(b.targetUsername,P),$e.write(`passwd: password updated successfully
`);break;case"adduser":if(!b.newUsername){process.stderr.write(`adduser: missing username
`);return}Se.users.addUser(b.newUsername,P),$e.write(`adduser: user '${b.newUsername}' created
`);break;case"deluser":Se.users.deleteUser(b.targetUsername),$e.write(`Removing user '${b.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=b.targetUsername,i=ge(s),r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ge(s),r.vars.PWD=i;break;default:break}}async function g(b){if(b.openEditor){await f(b.openEditor.targetPath,b.openEditor.initialContent),v();return}if(b.openPacman){await p(),v();return}if(b.sudoChallenge){await h(b.sudoChallenge);return}if(b.passwordChallenge){await m(b.passwordChallenge);return}b.clearScreen&&($e.write("\x1B[2J\x1B[H"),console.clear()),b.stdout&&$e.write(b.stdout.endsWith(`
`)?b.stdout:`${b.stdout}
`),b.stderr&&process.stderr.write(b.stderr.endsWith(`
`)?b.stderr:`${b.stderr}
`),b.switchUser&&o.push({authUser:s,cwd:i});let P=aE(s,i,b,r);if(s=P.authUser,i=P.cwd,b.switchUser&&await nn(s,ht,i,r,Se),b.closeSession){Nn();let _=o.pop();_===void 0?(u.close(),process.exit(b.exitCode??0)):(s=_.authUser,i=_.cwd,r.vars.USER=s,r.vars.LOGNAME=s,r.vars.HOME=ge(s),r.vars.PWD=i,r.vars.PS1=wt(s,ht).vars.PS1??"",$e.write(`logout
`))}}let y=()=>{if(r.vars.PS1)return Wr(s,ht,"",r.vars.PS1,i,!0);let b=i===ge(s)?"~":tE(i)||"/";return Wr(s,ht,b,void 0,void 0,!0)},v=()=>{u.setPrompt(y()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&Se.users.hasPassword(s)){let b=await Ls(u,`Password for ${s}: `);Se.users.verifyPassword(s,b)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}$e.write(Ki(ht,Se.properties,$o(Se.vfs,s))),Po(Se.vfs,s,a);for(let b of["/etc/environment",`${ge(s)}/.profile`,`${ge(s)}/.bashrc`])if(Se.vfs.exists(b))for(let P of Se.vfs.readFile(b).split(`
`)){let _=P.trim();if(!(!_||_.startsWith("#")))try{let w=await xe(_,s,ht,"shell",i,Se,void 0,r);w.stdout&&$e.write(w.stdout)}catch{}}Nn();let x=!1;u.on("line",async b=>{if(x)return;x=!0,u.pause(),b.trim().length>0&&(l.at(-1)!==b&&(l.push(b),l.length>500&&(l=l.slice(l.length-500)),Eo(Se.vfs,s,l)),d.history=[...l].reverse());let _=await xe(b,s,ht,"shell",i,Se,void 0,r);await g(_),Nn(),x=!1,u.resume(),v()}),u.on("SIGINT",()=>{$e.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),v()}),u.on("close",()=>{let b=o.pop();b===void 0?(Nn(),console.log(""),process.exit(0)):(s=b.authUser,Nn(),$e.write(`logout
`),process.exit(0))}),v()}cE().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var nb=!1;function lE(t){if(!nb){nb=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{Se.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{lE("SIGTERM")});process.on("beforeExit",()=>{Se.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
