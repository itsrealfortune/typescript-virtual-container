#!/usr/bin/env node
var Ks=Object.defineProperty;var Dh=Object.getOwnPropertyDescriptor;var Fh=Object.getOwnPropertyNames;var Lh=Object.prototype.hasOwnProperty;var ot=(t=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(t,{get:(e,r)=>(typeof require<"u"?require:e)[r]}):t)(function(t){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+t+'" is not supported')});var M=(t,e)=>()=>(t&&(e=t(t=0)),e);var On=(t,e)=>{for(var r in e)Ks(t,r,{get:e[r],enumerable:!0})},Uh=(t,e,r,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Fh(e))!Lh.call(t,s)&&s!==r&&Ks(t,s,{get:()=>e[s],enumerable:!(n=Dh(e,s))||n.enumerable});return t};var Bh=t=>Uh(Ks({},"__esModule",{value:!0}),t);var $o,Mo=M(()=>{"use strict";$o={name:"adduser",description:"Add a new user",category:"users",params:["<username>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`adduser: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: adduser <username>
`,exitCode:1};if(e.users.listUsers().includes(n))return{stderr:`adduser: user '${n}' already exists
`,exitCode:1};let s="",i="new";return{sudoChallenge:{username:n,targetUser:n,commandLine:null,loginShell:!1,prompt:"New password: ",mode:"passwd",onPassword:(a,c)=>{if(i==="new")return a.length<1?Promise.resolve({result:{stderr:`adduser: password cannot be empty
`,exitCode:1}}):(s=a,i="retype",Promise.resolve({result:null,nextPrompt:"Retype new password: "}));if(a!==s)return Promise.resolve({result:{stderr:`adduser: passwords do not match \u2014 user not created
`,exitCode:1}});c.users.addUser(n,s);let l=c.users.getGid(n);return Promise.resolve({result:{stdout:`${[`Adding user '${n}' ...`,`Adding new group '${n}' (${l}) ...`,`Adding new user '${n}' (${l}) with group '${n}' ...`,`Creating home directory '/home/${n}' ...`,`passwd: password set for '${n}'`,"adduser: done."].join(`
`)}
`,exitCode:0}})}},exitCode:0}}}});function ko(t){return Array.isArray(t)?t:[t]}function Rn(t,e){if(t===e)return{matched:!0,inlineValue:null};let r=`${e}=`;return t.startsWith(r)?{matched:!0,inlineValue:t.slice(r.length)}:e.length===2&&e.startsWith("-")&&!e.startsWith("--")&&t.startsWith(e)&&t.length>e.length?{matched:!0,inlineValue:t.slice(e.length)}:{matched:!1,inlineValue:null}}function zh(t,e={}){let r=new Set(e.flags??[]),n=new Set(e.flagsWithValue??[]),s=[],i=!1;for(let o=0;o<t.length;o+=1){let a=t[o];if(i){s.push(a);continue}if(a==="--"){i=!0;continue}let c=!1;for(let l of r){let{matched:u}=Rn(a,l);if(u){c=!0;break}}if(!c){for(let l of n){let u=Rn(a,l);if(u.matched){c=!0,u.inlineValue===null&&o+1<t.length&&(o+=1);break}}c||s.push(a)}}return s}function K(t,e){let r=ko(e);for(let n of t)for(let s of r)if(Rn(n,s).matched)return!0;return!1}function ir(t,e){let r=ko(e);for(let n=0;n<t.length;n+=1){let s=t[n];for(let i of r){let o=Rn(s,i);if(!o.matched)continue;if(o.inlineValue!==null)return o.inlineValue;let a=t[n+1];return a!==void 0&&a!=="--"?a:!0}}}function jt(t,e,r={}){return zh(t,r)[e]}function Ne(t,e={}){let r=new Set,n=new Map,s=[],i=new Set(e.flags??[]),o=new Set(e.flagsWithValue??[]),a=!1;for(let c=0;c<t.length;c+=1){let l=t[c];if(a){s.push(l);continue}if(l==="--"){a=!0;continue}if(i.has(l)){r.add(l);continue}if(o.has(l)){let d=t[c+1];d&&!d.startsWith("-")?(n.set(l,d),c+=1):n.set(l,"");continue}let u=Array.from(o).find(d=>l.startsWith(`${d}=`));if(u){n.set(u,l.slice(u.length+1));continue}s.push(l)}return{flags:r,flagsWithValues:n,positionals:s}}var ae=M(()=>{"use strict"});var No,Ao,To=M(()=>{"use strict";ae();No={name:"alias",description:"Define or display aliases",category:"shell",params:["[name[=value] ...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(t.length===0)return{stdout:Object.entries(e.vars).filter(([s])=>s.startsWith("__alias_")).map(([s,i])=>`alias ${s.slice(8)}='${i}'`).join(`
`)||"",exitCode:0};let r=[];for(let n of t){let s=n.indexOf("=");if(s===-1){let i=e.vars[`__alias_${n}`];if(i)r.push(`alias ${n}='${i}'`);else return{stderr:`alias: ${n}: not found`,exitCode:1}}else{let i=n.slice(0,s),o=n.slice(s+1).replace(/^['"]|['"]$/g,"");e.vars[`__alias_${i}`]=o}}return{stdout:r.join(`
`)||void 0,exitCode:0}}},Ao={name:"unalias",description:"Remove alias definitions",category:"shell",params:["<name...> | -a"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};if(K(t,["-a"])){for(let r of Object.keys(e.vars))r.startsWith("__alias_")&&delete e.vars[r];return{exitCode:0}}for(let r of t)delete e.vars[`__alias_${r}`];return{exitCode:0}}}});var Xs,Vh,Gh,At,Zs=M(()=>{"use strict";Xs=[{name:"vim",version:"2:9.0.1378-2",section:"editors",description:"Vi IMproved - enhanced vi editor",shortDesc:"Vi IMproved",installedSizeKb:3812,files:[{path:"/usr/bin/vim",content:`#!/bin/sh
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
`,mode:493}]}],Vh=new Map(Xs.map(t=>[t.name.toLowerCase(),t])),Gh=Xs.slice().sort((t,e)=>t.name.localeCompare(e.name)),At=class t{constructor(e,r){this._vfs=e;this._users=r}_vfs;_users;_installed=new Map;_registryPath="/var/lib/dpkg/status";_logPath="/var/log/dpkg.log";_aptLogPath="/var/log/apt/history.log";_loaded=!1;_ensureLoaded(){this._loaded||(this._loaded=!0,this._parseStatus())}load(){this._loaded=!1,this._ensureLoaded()}_parseStatus(){if(!this._vfs.exists(this._registryPath))return;let e=this._vfs.readFile(this._registryPath);if(!e.trim())return;let r=e.split(/\n\n+/);for(let n of r){if(!n.trim())continue;let s=t._parseFields(n),i=s.Package;i&&this._installed.set(i,{name:i,version:s.Version??"unknown",architecture:s.Architecture??"amd64",maintainer:s.Maintainer??"Fortune Maintainers",description:s.Description??"",section:s.Section??"misc",installedSizeKb:Number(s["Installed-Size"]??0),installedAt:s["X-Installed-At"]??new Date().toISOString(),files:(s["X-Files"]??"").split("|").filter(Boolean)})}}_persist(){let e=[];for(let r of this._installed.values())e.push([`Package: ${r.name}`,"Status: install ok installed","Priority: optional",`Section: ${r.section}`,`Installed-Size: ${r.installedSizeKb}`,`Maintainer: ${r.maintainer}`,`Architecture: ${r.architecture}`,`Version: ${r.version}`,`Description: ${r.description}`,`X-Installed-At: ${r.installedAt}`,`X-Files: ${r.files.join("|")}`].join(`
`));this._vfs.writeFile(this._registryPath,`${e.join(`

`)}
`)}static _parseFields(e){let r={};for(let n of e.split(`
`)){let s=n.indexOf(": ");s!==-1&&(r[n.slice(0,s)]=n.slice(s+2))}return r}_log(e){let n=`${new Date().toISOString().replace("T"," ").slice(0,19)} ${e}
`,s=this._vfs.exists(this._logPath)?this._vfs.readFile(this._logPath):"";this._vfs.writeFile(this._logPath,s+n)}_aptLog(e,r){let n=new Date().toISOString(),s=this._vfs.exists(this._aptLogPath)?this._vfs.readFile(this._aptLogPath):"",i=[`Start-Date: ${n}`,`Commandline: apt-get ${e} ${r.join(" ")}`,`${e==="install"?"Install":"Remove"}: ${r.join(", ")}`,`End-Date: ${n}`,""].join(`
`);this._vfs.writeFile(this._aptLogPath,s+i)}static findInRegistry(e){return Vh.get(e.toLowerCase())}static listAvailable(){return Gh}listInstalled(){return this._ensureLoaded(),[...this._installed.values()].sort((e,r)=>e.name.localeCompare(r.name))}isInstalled(e){return this._ensureLoaded(),this._installed.has(e.toLowerCase())}installedCount(){return this._ensureLoaded(),this._installed.size}install(e,r={}){this._ensureLoaded();let n=[],s=[],i=[],o=(c,l=new Set)=>{if(l.has(c)||(l.add(c),this.isInstalled(c)))return;let u=t.findInRegistry(c);if(!u){i.push(c);return}for(let d of u.depends??[])o(d,l);s.find(d=>d.name===u.name)||s.push(u)};for(let c of e)o(c);if(i.length>0)return{output:`E: Unable to locate package ${i.join(", ")}`,exitCode:100};if(s.length===0)return{output:e.map(c=>`${c} is already the newest version.`).join(`
`),exitCode:0};let a=s.reduce((c,l)=>c+(l.installedSizeKb??0),0);r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","The following NEW packages will be installed:",`  ${s.map(c=>c.name).join(" ")}`,`0 upgraded, ${s.length} newly installed, 0 to remove and 0 not upgraded.`,`Need to get 0 B/${a} kB of archives.`,`After this operation, ${a} kB of additional disk space will be used.`,"");for(let c of s){r.quiet||(n.push(`Selecting previously unselected package ${c.name}.`),n.push("(Reading database ... 12345 files and directories currently installed.)"),n.push(`Preparing to unpack .../archives/${c.name}_${c.version}_amd64.deb ...`),n.push(`Unpacking ${c.name} (${c.version}) ...`));for(let u of c.files??[]){let d=u.path.slice(0,u.path.lastIndexOf("/"));d&&!this._vfs.exists(d)&&this._vfs.mkdir(d,493),this._vfs.writeFile(u.path,u.content,{mode:u.mode??420})}c.onInstall?.(this._vfs,this._users),r.quiet||n.push(`Setting up ${c.name} (${c.version}) ...`);let l=new Date().toISOString();this._installed.set(c.name,{name:c.name,version:c.version,architecture:c.architecture??"amd64",maintainer:c.maintainer??"Fortune Maintainers <pkg@fortune.local>",description:c.description,section:c.section??"misc",installedSizeKb:c.installedSizeKb??0,installedAt:l,files:(c.files??[]).map(u=>u.path)}),this._log(`install ${c.name} ${c.version}`)}return this._aptLog("install",s.map(c=>c.name)),this._persist(),r.quiet||n.push("Processing triggers for man-db (2.11.2-2) ..."),{output:n.join(`
`),exitCode:0}}remove(e,r={}){this._ensureLoaded();let n=[],s=[];for(let i of e){let o=this._installed.get(i.toLowerCase());o?s.push(o):n.push(`Package '${i}' is not installed, so not removed`)}if(s.length===0)return{output:n.join(`
`)||"Nothing to remove.",exitCode:0};r.quiet||n.push("Reading package lists... Done","Building dependency tree... Done","The following packages will be REMOVED:",`  ${s.map(i=>i.name).join(" ")}`,`0 upgraded, 0 newly installed, ${s.length} to remove and 0 not upgraded.`);for(let i of s){r.quiet||n.push(`Removing ${i.name} (${i.version}) ...`);for(let a of i.files)if(!(!r.purge&&(a.startsWith("/etc/")||a.endsWith(".conf"))))try{this._vfs.exists(a)&&this._vfs.remove(a)}catch{}t.findInRegistry(i.name)?.onRemove?.(this._vfs),this._installed.delete(i.name),this._log(`remove ${i.name} ${i.version}`)}return this._aptLog("remove",s.map(i=>i.name)),this._persist(),{output:n.join(`
`),exitCode:0}}static search(e){let r=e.toLowerCase();return Xs.filter(n=>n.name.includes(r)||n.description.toLowerCase().includes(r)||(n.shortDesc??"").toLowerCase().includes(r)).sort((n,s)=>n.name.localeCompare(s.name))}show(e){this._ensureLoaded();let r=t.findInRegistry(e);if(!r)return null;let n=this._installed.get(e);return[`Package: ${r.name}`,`Version: ${r.version}`,`Architecture: ${r.architecture??"amd64"}`,`Maintainer: ${r.maintainer??"Fortune Maintainers <pkg@fortune.local>"}`,`Installed-Size: ${r.installedSizeKb??0}`,`Depends: ${(r.depends??[]).join(", ")||"(none)"}`,`Section: ${r.section??"misc"}`,"Priority: optional",`Description: ${r.description}`,`Status: ${n?"install ok installed":"install ok not-installed"}`].join(`
`)}}});import*as mt from"node:path";function B(t,e,r){if(!e||e.trim()==="")return t;if(e.startsWith("~")){let n=r??"/root";return mt.posix.normalize(`${n}${e.slice(1)}`)}return e.startsWith("/")?mt.posix.normalize(e):mt.posix.normalize(mt.posix.join(t,e))}function jh(t){let e=t.startsWith("/")?mt.posix.normalize(t):mt.posix.normalize(`/${t}`);return Wh.some(r=>e===r||e.startsWith(`${r}/`))}function ye(t,e,r){if(t!=="root"&&jh(e))throw new Error(`${r}: permission denied: ${e}`)}function Oo(t){let r=(t.split("?")[0]?.split("#")[0]??t).split("/").filter(Boolean).pop();return r&&r.length>0?r:"index.html"}function Hh(t,e){let r=t.length,n=e.length,s=Array.from({length:r+1},()=>new Array(n+1).fill(0));for(let o=0;o<=r;o++){let a=s[o];a[0]=o}for(let o=0;o<=n;o++){let a=s[0];a[o]=o}for(let o=1;o<=r;o++){let a=s[o],c=s[o-1];for(let l=1;l<=n;l++){let u=t[o-1]===e[l-1]?0:1;a[l]=Math.min(c[l]+1,a[l-1]+1,c[l-1]+u)}}return s[r][n]}function Ro(t,e,r){let n=B(e,r);if(t.exists(n))return n;let s=mt.posix.dirname(n),i=mt.posix.basename(n),o=t.list(s),a=o.filter(l=>l.toLowerCase()===i.toLowerCase());if(a.length===1)return mt.posix.join(s,a[0]);let c=o.filter(l=>Hh(l.toLowerCase(),i.toLowerCase())<=1);return c.length===1?mt.posix.join(s,c[0]):n}function xr(t){return t.packageManager}function He(t,e,r,n,s){if(r==="root"||s===0)return;ye(r,n,"access");let i=e.getUid(r),o=e.getGid(r);if(!t.checkAccess(n,i,o,s)){let a=t.stat(n).mode,c=(a&256?"r":"-")+(a&128?"w":"-")+(a&64?"x":"-")+(a&32?"r":"-")+(a&16?"w":"-")+(a&8?"x":"-")+(a&4?"r":"-")+(a&2?"w":"-")+(a&1?"x":"-");throw new Error(`access: permission denied (mode=${c})`)}}var Wh,se=M(()=>{"use strict";Wh=["/.virtual-env-js/.auth","/etc/htpasswd"]});var Do,Fo,Lo=M(()=>{"use strict";Zs();ae();se();Do={name:"apt",aliases:["apt-get"],description:"Package manager",category:"package",params:["<install|remove|update|upgrade|search|show|list> [pkg...]"],run:({args:t,shell:e,authUser:r})=>{let n=xr(e);if(!n)return{stderr:"apt: package manager not initialised",exitCode:1};let s=t[0]?.toLowerCase(),i=t.slice(1),o=K(i,["-q","--quiet","-qq"]),a=K(i,["--purge"]),c=i.filter(u=>!u.startsWith("-"));if(["install","remove","purge","upgrade","update"].includes(s??"")&&r!=="root")return{stderr:`E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock, are you root?`,exitCode:100};switch(s){case"install":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.install(c,{quiet:o});return{stdout:u||void 0,exitCode:d}}case"remove":case"purge":{if(c.length===0)return{stderr:"apt: no packages specified",exitCode:1};let{output:u,exitCode:d}=n.remove(c,{purge:s==="purge"||a,quiet:o});return{stdout:u||void 0,exitCode:d}}case"update":return{stdout:["Hit:1 fortune://packages.fortune.local nyx InRelease","Hit:2 fortune://security.fortune.local nyx-security InRelease","Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","All packages are up to date."].join(`
`),exitCode:0};case"upgrade":return{stdout:["Reading package lists... Done","Building dependency tree... Done","Reading state information... Done","Calculating upgrade... Done","0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded."].join(`
`),exitCode:0};case"search":{let u=c[0];if(!u)return{stderr:"apt: search requires a term",exitCode:1};let d=At.search(u);return d.length===0?{stdout:`Sorting... Done
Full Text Search... Done
(no results)`,exitCode:0}:{stdout:`Sorting... Done
Full Text Search... Done
${d.map(f=>`${f.name}/${f.section??"misc"} ${f.version} amd64
  ${f.shortDesc??f.description}`).join(`
`)}`,exitCode:0}}case"show":{let u=c[0];if(!u)return{stderr:"apt: show requires a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`N: Unable to locate package ${u}`,exitCode:100}}case"list":{if(K(i,["--installed"])){let f=n.listInstalled();return f.length===0?{stdout:`Listing... Done
(no packages installed)`,exitCode:0}:{stdout:`Listing... Done
${f.map(h=>`${h.name}/${h.section} ${h.version} ${h.architecture} [installed]`).join(`
`)}`,exitCode:0}}return{stdout:`Listing... Done
${At.listAvailable().map(f=>`${f.name}/${f.section??"misc"} ${f.version} amd64`).join(`
`)}`,exitCode:0}}default:return{stdout:["Usage: apt [options] command","","Commands:","  install <pkg...>   Install packages","  remove <pkg...>    Remove packages","  purge <pkg...>     Remove packages and config files","  update             Refresh package index","  upgrade            Upgrade all packages","  search <term>      Search in package descriptions","  show <pkg>         Show package details","  list [--installed] List packages"].join(`
`),exitCode:0}}}},Fo={name:"apt-cache",description:"Query the package cache",category:"package",params:["<search|show|policy> [pkg]"],run:({args:t,shell:e})=>{let r=xr(e);if(!r)return{stderr:"apt-cache: package manager not initialised",exitCode:1};let n=t[0]?.toLowerCase(),s=t[1];switch(n){case"search":return s?{stdout:At.search(s).map(o=>`${o.name} - ${o.shortDesc??o.description}`).join(`
`)||"(no results)",exitCode:0}:{stderr:"Need a search term",exitCode:1};case"show":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=r.show(s);return i?{stdout:i,exitCode:0}:{stderr:`N: Unable to locate package ${s}`,exitCode:100}}case"policy":{if(!s)return{stderr:"Need a package name",exitCode:1};let i=At.findInRegistry(s);if(!i)return{stderr:`N: Unable to locate package ${s}`,exitCode:100};let o=r.isInstalled(s);return{stdout:[`${s}:`,`  Installed: ${o?i.version:"(none)"}`,`  Candidate: ${i.version}`,"  Version table:",`     ${i.version} 500`,"        500 fortune://packages.fortune.local nyx/main amd64 Packages"].join(`
`),exitCode:0}}default:return{stderr:`apt-cache: unknown command '${n??""}'`,exitCode:1}}}}});var Uo,Bo=M(()=>{"use strict";se();Uo={name:"awk",description:"Pattern scanning and processing language",category:"text",params:["[-F sep] [-v var=val] '<program>' [file]"],run:({authUser:t,args:e,stdin:r,cwd:n,shell:s})=>{let i=" ",o={},a=[],c=0;for(;c<e.length;){let P=e[c];if(P==="-F")i=e[++c]??" ",c++;else if(P.startsWith("-F"))i=P.slice(2),c++;else if(P==="-v"){let A=e[++c]??"",C=A.indexOf("=");C!==-1&&(o[A.slice(0,C)]=A.slice(C+1)),c++}else if(P.startsWith("-v")){let A=P.slice(2),C=A.indexOf("=");C!==-1&&(o[A.slice(0,C)]=A.slice(C+1)),c++}else a.push(P),c++}let l=a[0],u=a[1];if(!l)return{stderr:"awk: no program",exitCode:1};let d=r??"";if(u){let P=B(n,u);try{ye(t,P,"awk"),d=s.vfs.readFile(P)}catch{return{stderr:`awk: ${u}: No such file or directory`,exitCode:1}}}function p(P){if(P===void 0||P==="")return 0;let A=Number(P);return Number.isNaN(A)?0:A}function f(P){return P===void 0?"":String(P)}function m(P,A){return A===" "?P.trim().split(/\s+/).filter(Boolean):A.length===1?P.split(A):P.split(new RegExp(A))}function h(P,A,C,O,U){if(P=P.trim(),P==="")return"";if(P.startsWith('"')&&P.endsWith('"'))return P.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	");if(/^-?\d+(\.\d+)?$/.test(P))return Number.parseFloat(P);if(P==="$0")return C.join(i===" "?" ":i)||"";if(P==="$NF")return C[U-1]??"";if(/^\$\d+$/.test(P))return C[Number.parseInt(P.slice(1),10)-1]??"";if(/^\$/.test(P)){let H=P.slice(1),q=p(h(H,A,C,O,U));return q===0?C.join(i===" "?" ":i)||"":C[q-1]??""}if(P==="NR")return O;if(P==="NF")return U;if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(P))return A[P]??"";let Z=P.match(/^length\s*\(([^)]*)\)$/);if(Z)return f(h(Z[1].trim(),A,C,O,U)).length;let J=P.match(/^substr\s*\((.+)\)$/);if(J){let H=g(J[1]),q=f(h(H[0]?.trim()??"",A,C,O,U)),ie=p(h(H[1]?.trim()??"1",A,C,O,U))-1,ne=H[2]===void 0?void 0:p(h(H[2].trim(),A,C,O,U));return ne===void 0?q.slice(Math.max(0,ie)):q.slice(Math.max(0,ie),ie+ne)}let R=P.match(/^index\s*\((.+)\)$/);if(R){let H=g(R[1]),q=f(h(H[0]?.trim()??"",A,C,O,U)),ie=f(h(H[1]?.trim()??"",A,C,O,U));return q.indexOf(ie)+1}let V=P.match(/^tolower\s*\((.+)\)$/);if(V)return f(h(V[1].trim(),A,C,O,U)).toLowerCase();let z=P.match(/^toupper\s*\((.+)\)$/);if(z)return f(h(z[1].trim(),A,C,O,U)).toUpperCase();let G=P.match(/^match\s*\((.+),\s*\/(.+)\/\)$/);if(G){let H=f(h(G[1].trim(),A,C,O,U));try{let q=H.match(new RegExp(G[2]));if(q)return A.RSTART=(q.index??0)+1,A.RLENGTH=q[0].length,(q.index??0)+1}catch{}return A.RSTART=0,A.RLENGTH=-1,0}let F=P.match(/^(.+?)\s*\?\s*(.+?)\s*:\s*(.+)$/);if(F){let H=h(F[1].trim(),A,C,O,U);return p(H)!==0||typeof H=="string"&&H!==""?h(F[2].trim(),A,C,O,U):h(F[3].trim(),A,C,O,U)}let j=P.match(/^((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))\s+((?:"[^"]*"|[A-Za-z_$][A-Za-z0-9_$]*|\d+))$/);if(j)return f(h(j[1],A,C,O,U))+f(h(j[2],A,C,O,U));try{let H=P.replace(/\bNR\b/g,String(O)).replace(/\bNF\b/g,String(U)).replace(/\$NF\b/g,String(U>0?p(C[U-1]):0)).replace(/\$(\d+)/g,(ie,ne)=>String(p(C[Number.parseInt(ne,10)-1]))).replace(/\b([A-Za-z_][A-Za-z0-9_]*)\b/g,(ie,ne)=>String(p(A[ne]))),q=Function(`"use strict"; return (${H});`)();if(typeof q=="number"||typeof q=="boolean")return Number(q)}catch{}return f(A[P]??P)}function g(P){let A=[],C="",O=0;for(let U=0;U<P.length;U++){let Z=P.charAt(U);if(Z==="(")O++;else if(Z===")")O--;else if(Z===","&&O===0){A.push(C),C="";continue}C+=Z}return A.push(C),A}function y(P,A,C,O,U,Z){if(P=P.trim(),!P||P.startsWith("#"))return"ok";if(P==="next")return"next";if(P==="exit"||P.startsWith("exit "))return"exit";if(P==="print"||P==="print $0")return Z.push(C.join(i===" "?" ":i)),"ok";if(P.startsWith("printf ")){let F=P.slice(7).trim();return Z.push(S(F,A,C,O,U)),"ok"}if(P.startsWith("print ")){let F=P.slice(6),j=g(F);return Z.push(j.map(H=>f(h(H.trim(),A,C,O,U))).join("	")),"ok"}if(P.startsWith("delete ")){let F=P.slice(7).trim();return delete A[F],"ok"}let J=P.match(/^(g?sub)\s*\(\s*\/([^/]*)\//);if(J){let F=J[1]==="gsub",j=J[2],H=P.slice(J[0].length).replace(/^\s*,\s*/,""),q=g(H.replace(/\)\s*$/,"")),ie=f(h(q[0]?.trim()??'""',A,C,O,U)),ne=q[1]?.trim(),xe=C.join(i===" "?" ":i);try{let Ge=new RegExp(j,F?"g":"");if(ne&&/^\$\d+$/.test(ne)){let Pe=Number.parseInt(ne.slice(1),10)-1;Pe>=0&&Pe<C.length&&(C[Pe]=(C[Pe]??"").replace(Ge,ie))}else{let Pe=xe.replace(Ge,ie),De=m(Pe,i);C.splice(0,C.length,...De)}}catch{}return"ok"}let R=P.match(/^split\s*\((.+)\)$/);if(R){let F=g(R[1]),j=f(h(F[0]?.trim()??"",A,C,O,U)),H=F[1]?.trim()??"arr",q=F[2]?f(h(F[2].trim(),A,C,O,U)):i,ie=m(j,q);for(let ne=0;ne<ie.length;ne++)A[`${H}[${ne+1}]`]=ie[ne]??"";return A[H]=String(ie.length),"ok"}let V=P.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+\+|--)$/);if(V)return A[V[1]]=p(A[V[1]])+(V[2]==="++"?1:-1),"ok";let z=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);if(z){let F=p(A[z[1]]),j=p(h(z[3],A,C,O,U)),H=z[2],q=F;return H==="+="?q=F+j:H==="-="?q=F-j:H==="*="?q=F*j:H==="/="?q=j===0?0:F/j:H==="%="&&(q=F%j),A[z[1]]=q,"ok"}let G=P.match(/^([A-Za-z_][A-Za-z0-9_[\]]*)\s*=\s*(.+)$/);return G?(A[G[1]]=h(G[2],A,C,O,U),"ok"):(h(P,A,C,O,U),"ok")}function S(P,A,C,O,U){let Z=g(P),J=f(h(Z[0]?.trim()??'""',A,C,O,U)),R=Z.slice(1).map(z=>h(z.trim(),A,C,O,U)),V=0;return J.replace(/%(-?\d*\.?\d*)?([diouxXeEfgGsq%])/g,(z,G,F)=>{if(F==="%")return"%";let j=R[V++],H=G?Number.parseInt(G,10):0,q="";return F==="d"||F==="i"?q=String(Math.trunc(p(j))):F==="f"?q=p(j).toFixed(G?.includes(".")?Number.parseInt(G.split(".")[1]??"6",10):6):F==="s"||F==="q"?q=f(j):F==="x"?q=Math.trunc(p(j)).toString(16):F==="X"?q=Math.trunc(p(j)).toString(16).toUpperCase():F==="o"?q=Math.trunc(p(j)).toString(8):q=f(j),H>0&&q.length<H?q=q.padStart(H):H<0&&q.length<-H&&(q=q.padEnd(-H)),q})}let w=[],b=l.trim();{let P=0;for(;P<b.length;){for(;P<b.length&&/\s/.test(b.charAt(P));)P++;if(P>=b.length)break;let A="";for(;P<b.length&&b[P]!=="{";)A+=b[P++];if(A=A.trim(),b[P]!=="{"){A&&w.push({pattern:A,action:"print $0"});break}P++;let C="",O=1;for(;P<b.length&&O>0;){let U=b.charAt(P);if(U==="{")O++;else if(U==="}"&&(O--,O===0)){P++;break}C+=U,P++}w.push({pattern:A,action:C.trim()})}}w.length===0&&w.push({pattern:"",action:b.replace(/[{}]/g,"").trim()});let N=[],I={FS:i,OFS:i===" "?" ":i,ORS:`
`,...o},v=w.filter(P=>P.pattern==="BEGIN"),_=w.filter(P=>P.pattern==="END"),x=w.filter(P=>P.pattern!=="BEGIN"&&P.pattern!=="END");function E(P,A,C,O){let U=D(P);for(let Z of U){let J=y(Z,I,A,C,O,N);if(J!=="ok")return J}return"ok"}function D(P){let A=[],C="",O=0,U=!1,Z="";for(let J=0;J<P.length;J++){let R=P.charAt(J);if(!U&&(R==='"'||R==="'")){U=!0,Z=R,C+=R;continue}if(U&&R===Z){U=!1,C+=R;continue}if(U){C+=R;continue}R==="("||R==="["?O++:(R===")"||R==="]")&&O--,(R===";"||R===`
`)&&O===0?(C.trim()&&A.push(C.trim()),C=""):C+=R}return C.trim()&&A.push(C.trim()),A}function T(P,A,C,O,U){if(!P||P==="1")return!0;if(/^-?\d+$/.test(P))return p(P)!==0;if(P.startsWith("/")&&P.endsWith("/"))try{return new RegExp(P.slice(1,-1)).test(A)}catch{return!1}let Z=P.match(/^(.+?)\s*([=!<>]=?|==)\s*(.+)$/);if(Z){let V=p(h(Z[1].trim(),I,C,O,U)),z=p(h(Z[3].trim(),I,C,O,U));switch(Z[2]){case"==":return V===z;case"!=":return V!==z;case">":return V>z;case">=":return V>=z;case"<":return V<z;case"<=":return V<=z;default:return!1}}let J=P.match(/^\$(\w+)\s*~\s*\/(.*)\/$/);if(J){let V=f(h(`$${J[1]}`,I,C,O,U));try{return new RegExp(J[2]).test(V)}catch{return!1}}let R=h(P,I,C,O,U);return p(R)!==0||typeof R=="string"&&R!==""}for(let P of v)E(P.action,[],0,0);let W=d.split(`
`);W[W.length-1]===""&&W.pop();let X=!1;for(let P=0;P<W.length&&!X;P++){let A=W[P];I.NR=P+1;let C=m(A,i);I.NF=C.length;let O=P+1,U=C.length;for(let Z of x){if(!T(Z.pattern,A,C,O,U))continue;let J=E(Z.action,C,O,U);if(J==="next")break;if(J==="exit"){X=!0;break}}}for(let P of _)E(P.action,[],p(I.NR),0);let ee=N.join(`
`);return{stdout:ee+(ee&&!ee.endsWith(`
`)?`
`:""),exitCode:0}}}});var zo,Vo=M(()=>{"use strict";ae();zo={name:"base64",description:"Encode/decode base64",category:"text",params:["[-d] [file]"],run:({args:t,stdin:e})=>{let r=K(t,["-d","--decode"]),n=e??"";if(r)try{return{stdout:Buffer.from(n.trim(),"base64").toString("utf8"),exitCode:0}}catch{return{stderr:"base64: invalid input",exitCode:1}}return{stdout:Buffer.from(n).toString("base64"),exitCode:0}}}});var Go,Wo,jo=M(()=>{"use strict";Go={name:"basename",description:"Strip directory and suffix from filenames",category:"text",params:["<path> [suffix]"],run:({args:t})=>{if(!t[0])return{stderr:"basename: missing operand",exitCode:1};let e=[],r=t[0]==="-a"?t.slice(1):[t[0]],n=t[0]==="-a"?void 0:t[1];for(let s of r){let i=s.replace(/\/+$/,"").split("/").at(-1)??s;n&&i.endsWith(n)&&(i=i.slice(0,-n.length)),e.push(i)}return{stdout:e.join(`
`),exitCode:0}}},Wo={name:"dirname",description:"Strip last component from file name",category:"text",params:["<path>"],run:({args:t})=>{if(!t[0])return{stderr:"dirname: missing operand",exitCode:1};let e=t[0].replace(/\/+$/,""),r=e.lastIndexOf("/");return{stdout:r<=0?r===0?"/":".":e.slice(0,r),exitCode:0}}}});function Dn(t,e=""){let r=`${e}:${t}`,n=Ho.get(r);if(n)return n;let s="^";for(let o=0;o<t.length;o++){let a=t.charAt(o);if(a==="*")s+=".*";else if(a==="?")s+=".";else if(a==="["){let c=t.indexOf("]",o+1);c===-1?s+="\\[":(s+=`[${t.slice(o+1,c)}]`,o=c)}else s+=a.replace(/[.+^${}()|[\]\\]/g,"\\$&")}let i=new RegExp(`${s}$`,e);return Ho.set(r,i),i}var Ho,Js=M(()=>{"use strict";Ho=new Map});function Cr(t,e,r,n=!1){let s=`${e}:${r?"g":"s"}:${n?"G":""}:${t}`,i=qo.get(s);if(i)return i;let o=t.replace(/[.+^${}()|[\]\\]/g,"\\$&"),a=r?o.replace(/\*/g,".*").replace(/\?/g,"."):o.replace(/\*/g,"[^/]*").replace(/\?/g,"."),c=e==="prefix"?`^${a}`:e==="suffix"?`${a}$`:a;return i=new RegExp(c,n?"g":""),qo.set(s,i),i}function qh(t,e){let r=[],n=0;for(;n<t.length;){let s=t.charAt(n);if(/\s/.test(s)){n++;continue}if(s==="+"){r.push({type:"plus"}),n++;continue}if(s==="-"){r.push({type:"minus"}),n++;continue}if(s==="*"){if(t[n+1]==="*"){r.push({type:"pow"}),n+=2;continue}r.push({type:"mul"}),n++;continue}if(s==="/"){r.push({type:"div"}),n++;continue}if(s==="%"){r.push({type:"mod"}),n++;continue}if(s==="("){r.push({type:"lparen"}),n++;continue}if(s===")"){r.push({type:"rparen"}),n++;continue}if(/\d/.test(s)){let i=n+1;for(;i<t.length&&/\d/.test(t.charAt(i));)i++;r.push({type:"number",value:Number(t.slice(n,i))}),n=i;continue}if(/[A-Za-z_]/.test(s)){let i=n+1;for(;i<t.length&&/[A-Za-z0-9_]/.test(t.charAt(i));)i++;let o=t.slice(n,i),a=e[o],c=a===void 0||a===""?0:Number(a);r.push({type:"number",value:Number.isFinite(c)?c:0}),n=i;continue}return[]}return r}function tn(t,e){let r=t.trim();if(r.length===0||r.length>1024)return Number.NaN;let n=qh(r,e);if(n.length===0)return Number.NaN;let s=0,i=()=>n[s],o=()=>n[s++],a=()=>{let f=o();if(!f)return Number.NaN;if(f.type==="number")return f.value;if(f.type==="lparen"){let m=d();return n[s]?.type!=="rparen"?Number.NaN:(s++,m)}return Number.NaN},c=()=>{let f=i();return f?.type==="plus"?(o(),c()):f?.type==="minus"?(o(),-c()):a()},l=()=>{let f=c();for(;i()?.type==="pow";){o();let m=c();f**=m}return f},u=()=>{let f=l();for(;;){let m=i();if(m?.type==="mul"){o(),f*=l();continue}if(m?.type==="div"){o();let h=l();f=h===0?Number.NaN:f/h;continue}if(m?.type==="mod"){o();let h=l();f=h===0?Number.NaN:f%h;continue}return f}},d=()=>{let f=u();for(;;){let m=i();if(m?.type==="plus"){o(),f+=u();continue}if(m?.type==="minus"){o(),f-=u();continue}return f}},p=d();return!Number.isFinite(p)||s!==n.length?Number.NaN:Math.trunc(p)}function Yh(t,e){if(!t.includes("'"))return e(t);let r=[],n=0;for(;n<t.length;){let s=t.indexOf("'",n);if(s===-1){r.push(e(t.slice(n)));break}r.push(e(t.slice(n,s)));let i=t.indexOf("'",s+1);if(i===-1){r.push(t.slice(s));break}r.push(t.slice(s,i+1)),n=i+1}return r.join("")}function Ln(t){function n(s,i){if(i>8)return[s];let o=0,a=-1;for(let c=0;c<s.length;c++){let l=s.charAt(c);if(l==="{"&&s[c-1]!=="$")o===0&&(a=c),o++;else if(l==="}"&&(o--,o===0&&a!==-1)){let u=s.slice(0,a),d=s.slice(a+1,c),p=s.slice(c+1),f=d.match(/^(-?\d+)\.\.(-?\d+)(?:\.\.-?(\d+))?$/)||d.match(/^([a-z])\.\.([a-z])$/);if(f){let y=[];if(/\d/.test(f[1])){let b=Number.parseInt(f[1],10),N=Number.parseInt(f[2],10),I=f[3]?Number.parseInt(f[3],10):1,v=b<=N?I:-I;for(let _=b;b<=N?_<=N:_>=N;_+=v)y.push(String(_))}else{let b=f[1].charCodeAt(0),N=f[2].charCodeAt(0),I=b<=N?1:-1;for(let v=b;b<=N?v<=N:v>=N;v+=I)y.push(String.fromCharCode(v))}let S=y.map(b=>`${u}${b}${p}`),w=[];for(let b of S)if(w.push(...n(b,i+1)),w.length>256)return[s];return w}let m=[],h="",g=0;for(let y of d)y==="{"?(g++,h+=y):y==="}"?(g--,h+=y):y===","&&g===0?(m.push(h),h=""):h+=y;if(m.push(h),m.length>1){let y=[];for(let S of m)if(y.push(...n(`${u}${S}${p}`,i+1)),y.length>256)return[s];return y}break}}return[s]}return n(t,0)}function Kh(t,e){if(!t.includes("$(("))return t;let r="",n=0,s=0;for(;n<t.length;){if(t[n]==="$"&&t[n+1]==="("&&t[n+2]==="("){r+=t.slice(s,n);let i=n+3,o=0;for(;i<t.length;){let a=t.charAt(i);if(a==="(")o++;else if(a===")"){if(o>0)o--;else if(t[i+1]===")"){let c=t.slice(n+3,i),l=tn(c,e);r+=Number.isNaN(l)?"0":String(l),n=i+2,s=n;break}}i++}if(i>=t.length)return r+=t.slice(n),r;continue}n++}return r+t.slice(s)}function Fn(t,e,r=0,n){if(!(t.includes("$")||t.includes("~")||t.includes("'")))return t;let s=n??e.HOME??"/home/user";return Yh(t,i=>{let o=i;return o=o.replace(/(^|[\s:])~(\/|$)/g,(a,c,l)=>`${c}${s}${l}`),o=o.replace(/\$\?/g,String(r)),o=o.replace(/\$\$/g,"1"),o=o.replace(/\$#/g,"0"),o=o.replace(/\$RANDOM\b/g,()=>String(Math.floor(Math.random()*32768))),o=o.replace(/\$LINENO\b/g,"1"),o=Kh(o,e),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>e[c]??""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\[(\d+)\]\}/g,(a,c,l)=>e[`${c}[${l}]`]??""),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)[@*]\}/g,(a,c)=>{let l=0;for(let u of Object.keys(e))u.startsWith(`${c}[`)&&l++;return String(l)}),o=o.replace(/\$\{#([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>String((e[c]??"").length)),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):-([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?e[c]:l),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):=([^}]*)\}/g,(a,c,l)=>((e[c]===void 0||e[c]==="")&&(e[c]=l),e[c])),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):\+([^}]*)\}/g,(a,c,l)=>e[c]!==void 0&&e[c]!==""?l:""),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*):(-?\d+)(?::(\d+))?\}/g,(a,c,l,u)=>{let d=e[c]??"",p=Number.parseInt(l,10),f=p<0?Math.max(0,d.length+p):Math.min(p,d.length);return u===void 0?d.slice(f):d.slice(f,f+Number.parseInt(u,10))}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(Cr(l,"none",!0,!0),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\/([^/}]*)\/([^}]*)\}/g,(a,c,l,u)=>{let d=e[c]??"";try{return d.replace(Cr(l,"none",!0,!1),u)}catch{return d}}),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)##([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Cr(l,"prefix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)#([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Cr(l,"prefix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Cr(l,"suffix",!0),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)%([^}]+)\}/g,(a,c,l)=>(e[c]??"").replace(Cr(l,"suffix",!1),"")),o=o.replace(/\$\{([A-Za-z_][A-Za-z0-9_]*)\}/g,(a,c)=>e[c]??""),o=o.replace(/\$([A-Za-z_][A-Za-z0-9_]*|\d+)/g,(a,c)=>e[c]??""),o})}async function Un(t,e,r,n){let s="__shellExpandDepth",o=Number(e[s]??"0");if(o>=8)return Fn(t,e,r);e[s]=String(o+1);try{if(t.includes("$(")){let a="",c=!1,l=0;for(;l<t.length;){let u=t.charAt(l);if(u==="'"&&!c){c=!0,a+=u,l++;continue}if(u==="'"&&c){c=!1,a+=u,l++;continue}if(!c&&u==="$"&&t[l+1]==="("){if(t[l+2]==="("){a+=u,l++;continue}let d=0,p=l+1;for(;p<t.length;){if(t[p]==="(")d++;else if(t[p]===")"&&(d--,d===0))break;p++}let f=t.slice(l+2,p).trim(),m=(await n(f)).replace(/\n$/,"");a+=m,l=p+1;continue}a+=u,l++}t=a}return Fn(t,e,r)}finally{o<=0?delete e[s]:e[s]=String(o)}}function Qs(t,e){if(t.statType)return t.statType(e);try{return t.stat(e).type}catch{return null}}function Yo(t,e,r){if(!(t.includes("*")||t.includes("?")))return[t];let n=t.startsWith("/"),s=n?"/":e,i=n?t.slice(1):t,o=ei(s,i.split("/"),r);return o.length===0?[t]:o.sort()}function ei(t,e,r){if(e.length===0)return[t];let[n,...s]=e;if(!n)return[t];if(n==="**"){let l=Ko(t,r);if(s.length===0)return l;let u=[];for(let d of l)Qs(r,d)==="directory"&&u.push(...ei(d,s,r));return u}let i=[];try{i=r.list(t)}catch{return[]}let o=Dn(n),a=n.startsWith("."),c=[];for(let l of i){if(!a&&l.startsWith(".")||!o.test(l))continue;let u=t==="/"?`/${l}`:`${t}/${l}`;if(s.length===0){c.push(u);continue}Qs(r,u)==="directory"&&c.push(...ei(u,s,r))}return c}function Ko(t,e){let r=[t],n=[];try{n=e.list(t)}catch{return r}for(let s of n){let i=t==="/"?`/${s}`:`${t}/${s}`;Qs(e,i)==="directory"&&r.push(...Ko(i,e))}return r}var qo,rn=M(()=>{"use strict";Js();qo=new Map});var Xo,Zo=M(()=>{"use strict";rn();Xo={name:"bc",description:"Arbitrary precision calculator language",category:"system",params:["[expression]"],run:({args:t,stdin:e})=>{let r=(e??t.join(" ")).trim();if(!r)return{stdout:"",exitCode:0};let n=[];for(let s of r.split(`
`)){let i=s.trim();if(!i||i.startsWith("#"))continue;let o=i.replace(/;+$/,"").trim(),a=tn(o,{});if(Number.isNaN(a))return{stderr:`bc: syntax error on line: ${i}`,exitCode:1};n.push(String(a))}return{stdout:n.join(`
`),exitCode:0}}}});var ka={};On(ka,{AsyncCompress:()=>r0,AsyncDecompress:()=>o0,AsyncDeflate:()=>ya,AsyncGunzip:()=>ba,AsyncGzip:()=>r0,AsyncInflate:()=>Si,AsyncUnzipInflate:()=>y0,AsyncUnzlib:()=>va,AsyncZipDeflate:()=>p0,AsyncZlib:()=>s0,Compress:()=>oi,DecodeUTF8:()=>l0,Decompress:()=>li,Deflate:()=>ut,EncodeUTF8:()=>u0,FlateErrorCode:()=>e0,Gunzip:()=>qn,Gzip:()=>oi,Inflate:()=>Ze,Unzip:()=>S0,UnzipInflate:()=>g0,UnzipPassThrough:()=>Ma,Unzlib:()=>Yn,Zip:()=>f0,ZipDeflate:()=>d0,ZipPassThrough:()=>on,Zlib:()=>ai,compress:()=>n0,compressSync:()=>or,decompress:()=>a0,decompressSync:()=>c0,deflate:()=>Sa,deflateSync:()=>lr,gunzip:()=>_a,gunzipSync:()=>qt,gzip:()=>n0,gzipSync:()=>or,inflate:()=>bi,inflateSync:()=>Xt,strFromU8:()=>vi,strToU8:()=>Yt,unzip:()=>b0,unzipSync:()=>_0,unzlib:()=>wa,unzlibSync:()=>Kn,zip:()=>m0,zipSync:()=>h0,zlib:()=>i0,zlibSync:()=>ci});import{createRequire as Xh}from"module";function cr(t,e){return typeof t=="function"&&(e=t,t={}),this.ondata=e,t}function Sa(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Rr],function(n){return Kt(lr(n.data[0],n.data[1]))},0,r)}function lr(t,e){return ar(t,e||{},0,0)}function bi(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Or],function(n){return Kt(Xt(n.data[0],pi(n.data[1])))},1,r)}function Xt(t,e){return cn(t,{i:2},e&&e.out,e&&e.dictionary)}function n0(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Rr,pa,function(){return[or]}],function(n){return Kt(or(n.data[0],n.data[1]))},2,r)}function or(t,e){e||(e={});var r=Tr(),n=t.length;r.p(t);var s=ar(t,e,hi(e),8),i=s.length;return fi(s,e),be(s,i-8,r.d()),be(s,i-4,n),s}function _a(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Or,fa,function(){return[qt]}],function(n){return Kt(qt(n.data[0],n.data[1]))},3,r)}function qt(t,e){var r=mi(t);return r+8>t.length&&Q(6,"invalid gzip data"),cn(t.subarray(r,-8),{i:2},e&&e.out||new ce(ga(t)),e&&e.dictionary)}function i0(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Rr,ma,function(){return[ci]}],function(n){return Kt(ci(n.data[0],n.data[1]))},4,r)}function ci(t,e){e||(e={});var r=Jn();r.p(t);var n=ar(t,e,e.dictionary?6:2,4);return gi(n,e),be(n,n.length-4,r.d()),n}function wa(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),Dr(t,e,[Or,ha,function(){return[Kn]}],function(n){return Kt(Kn(n.data[0],pi(n.data[1])))},5,r)}function Kn(t,e){return cn(t.subarray(yi(t,e&&e.dictionary),-4),{i:2},e&&e.out,e&&e.dictionary)}function a0(t,e,r){return r||(r=e,e={}),typeof r!="function"&&Q(7),t[0]==31&&t[1]==139&&t[2]==8?_a(t,e,r):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?bi(t,e,r):wa(t,e,r)}function c0(t,e){return t[0]==31&&t[1]==139&&t[2]==8?qt(t,e):(t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31?Xt(t,e):Kn(t,e)}function Yt(t,e){if(e){for(var r=new ce(t.length),n=0;n<t.length;++n)r[n]=t.charCodeAt(n);return r}if(Qo)return Qo.encode(t);for(var s=t.length,i=new ce(t.length+(t.length>>1)),o=0,a=function(u){i[o++]=u},n=0;n<s;++n){if(o+5>i.length){var c=new ce(o+8+(s-n<<1));c.set(i),i=c}var l=t.charCodeAt(n);l<128||e?a(l):l<2048?(a(192|l>>6),a(128|l&63)):l>55295&&l<57344?(l=65536+(l&1047552)|t.charCodeAt(++n)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63)):(a(224|l>>12),a(128|l>>6&63),a(128|l&63))}return lt(i,0,o)}function vi(t,e){if(e){for(var r="",n=0;n<t.length;n+=16384)r+=String.fromCharCode.apply(null,t.subarray(n,n+16384));return r}else{if(ui)return ui.decode(t);var s=Ca(t),i=s.s,r=s.r;return r.length&&Q(8),i}}function m0(t,e,r){r||(r=e,e={}),typeof r!="function"&&Q(7);var n={};_i(t,"",n,e);var s=Object.keys(n),i=s.length,o=0,a=0,c=i,l=new Array(i),u=[],d=function(){for(var g=0;g<u.length;++g)u[g]()},p=function(g,y){Xn(function(){r(g,y)})};Xn(function(){p=r});var f=function(){var g=new ce(a+22),y=o,S=a-o;a=0;for(var w=0;w<c;++w){var b=l[w];try{var N=b.c.length;Mr(g,a,b,b.f,b.u,N);var I=30+b.f.length+Ht(b.extra),v=a+I;g.set(b.c,v),Mr(g,o,b,b.f,b.u,N,a,b.m),o+=16+I+(b.m?b.m.length:0),a=v+N}catch(_){return p(_,null)}}wi(g,o,l.length,S,y),p(null,g)};i||f();for(var m=function(g){var y=s[g],S=n[y],w=S[0],b=S[1],N=Tr(),I=w.length;N.p(w);var v=Yt(y),_=v.length,x=b.comment,E=x&&Yt(x),D=E&&E.length,T=Ht(b.extra),W=b.level==0?0:8,X=function(ee,P){if(ee)d(),p(ee,null);else{var A=P.length;l[g]=ln(b,{size:I,crc:N.d(),c:P,f:v,m:E,u:_!=y.length||E&&x.length!=D,compression:W}),o+=30+_+T+A,a+=76+2*(_+T)+(D||0)+A,--i||f()}};if(_>65535&&X(Q(11,0,1),null),!W)X(null,w);else if(I<16e4)try{X(null,lr(w,b))}catch(ee){X(ee,null)}else u.push(Sa(w,b,X))},h=0;h<c;++h)m(h);return d}function h0(t,e){e||(e={});var r={},n=[];_i(t,"",r,e);var s=0,i=0;for(var o in r){var a=r[o],c=a[0],l=a[1],u=l.level==0?0:8,d=Yt(o),p=d.length,f=l.comment,m=f&&Yt(f),h=m&&m.length,g=Ht(l.extra);p>65535&&Q(11);var y=u?lr(c,l):c,S=y.length,w=Tr();w.p(c),n.push(ln(l,{size:c.length,crc:w.d(),c:y,f:d,m,u:p!=o.length||m&&f.length!=h,o:s,compression:u})),s+=30+p+g+S,i+=76+2*(p+g)+(h||0)+S}for(var b=new ce(i+22),N=s,I=i-s,v=0;v<n.length;++v){var d=n[v];Mr(b,d.o,d,d.f,d.u,d.c.length);var _=30+d.f.length+Ht(d.extra);b.set(d.c,d.o+_),Mr(b,s,d,d.f,d.u,d.c.length,d.o,d.m),s+=16+_+(d.m?d.m.length:0)}return wi(b,s,n.length,I,N),b}function b0(t,e,r){r||(r=e,e={}),typeof r!="function"&&Q(7);var n=[],s=function(){for(var g=0;g<n.length;++g)n[g]()},i={},o=function(g,y){Xn(function(){r(g,y)})};Xn(function(){o=r});for(var a=t.length-22;Ae(t,a)!=101010256;--a)if(!a||t.length-a>65558)return o(Q(13,0,1),null),s;var c=Ke(t,a+8);if(c){var l=c,u=Ae(t,a+16),d=Ae(t,a-20)==117853008;if(d){var p=Ae(t,a-12);d=Ae(t,p)==101075792,d&&(l=c=Ae(t,p+32),u=Ae(t,p+48))}for(var f=e&&e.filter,m=function(g){var y=Ea(t,u,d),S=y[0],w=y[1],b=y[2],N=y[3],I=y[4],v=y[5],_=Pa(t,v);u=I;var x=function(D,T){D?(s(),o(D,null)):(T&&(i[N]=T),--c||o(null,i))};if(!f||f({name:N,size:w,originalSize:b,compression:S}))if(!S)x(null,lt(t,_,_+w));else if(S==8){var E=t.subarray(_,_+w);if(b<524288||w>.8*b)try{x(null,Xt(E,{out:new ce(b)}))}catch(D){x(D,null)}else n.push(bi(E,{size:b},x))}else x(Q(14,"unknown compression type "+S,1),null);else x(null,null)},h=0;h<l;++h)m(h)}else o(null,{});return s}function _0(t,e){for(var r={},n=t.length-22;Ae(t,n)!=101010256;--n)(!n||t.length-n>65558)&&Q(13);var s=Ke(t,n+8);if(!s)return{};var i=Ae(t,n+16),o=Ae(t,n-20)==117853008;if(o){var a=Ae(t,n-12);o=Ae(t,a)==101075792,o&&(s=Ae(t,a+32),i=Ae(t,a+48))}for(var c=e&&e.filter,l=0;l<s;++l){var u=Ea(t,i,o),d=u[0],p=u[1],f=u[2],m=u[3],h=u[4],g=u[5],y=Pa(t,g);i=h,(!c||c({name:m,size:p,originalSize:f,compression:d}))&&(d?d==8?r[m]=Xt(t.subarray(y,y+p),{out:new ce(f)}):Q(14,"unknown compression type "+d):r[m]=lt(t,y,y+p))}return r}var Zh,Er,zn,ri,Jh,Qh,ce,Xe,an,kr,Nr,nn,ea,Er,di,jn,ta,ra,ni,sn,Tt,_e,ct,Ot,_e,_e,_e,_e,$r,_e,na,sa,ia,oa,Vn,at,Gn,Ar,lt,e0,aa,Q,cn,bt,Ir,Wn,Hn,si,Pr,Zn,ii,ca,_t,la,ua,Tr,Jn,ar,ln,Jo,Bn,t0,da,Or,Rr,pa,fa,ma,ha,Kt,pi,Dr,dt,Fr,Ke,Ae,ti,be,fi,mi,ga,hi,gi,yi,ut,ya,Ze,Si,oi,r0,qn,ba,ai,s0,Yn,va,li,o0,_i,Qo,ui,xa,Ca,l0,u0,Ia,Pa,Ea,$a,Ht,Mr,wi,on,d0,p0,f0,Ma,g0,y0,S0,Xn,un=M(()=>{Zh=Xh("/"),Jh=";var __w=require('worker_threads');__w.parentPort.on('message',function(m){onmessage({data:m})}),postMessage=function(m,t){__w.parentPort.postMessage(m,t)},close=process.exit;self=global";try{Er=Zh("worker_threads"),zn=Er.Worker,ri=Er.isMarkedAsUntransferable}catch{}Qh=zn?function(t,e,r,n,s){var i=!1,o=new zn(t+Jh,{eval:!0}).on("error",function(a){return s(a,null)}).on("message",function(a){return s(null,a)}).on("exit",function(a){a&&!i&&s(new Error("exited with code "+a),null)});return ri&&(n=n.filter(function(a){return!ri(a)})),o.postMessage(r,n),o.terminate=function(){return i=!0,zn.prototype.terminate.call(o)},o}:function(t,e,r,n,s){setImmediate(function(){return s(new Error("async operations unsupported - update to Node 12+ (or Node 10-11 with the --experimental-worker CLI flag)"),null)});var i=function(){};return{terminate:i,postMessage:i}},ce=Uint8Array,Xe=Uint16Array,an=Int32Array,kr=new ce([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Nr=new ce([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),nn=new ce([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ea=function(t,e){for(var r=new Xe(31),n=0;n<31;++n)r[n]=e+=1<<t[n-1];for(var s=new an(r[30]),n=1;n<30;++n)for(var i=r[n];i<r[n+1];++i)s[i]=i-r[n]<<5|n;return{b:r,r:s}},Er=ea(kr,2),di=Er.b,jn=Er.r;di[28]=258,jn[258]=28;ta=ea(Nr,0),ra=ta.b,ni=ta.r,sn=new Xe(32768);for(_e=0;_e<32768;++_e)Tt=(_e&43690)>>1|(_e&21845)<<1,Tt=(Tt&52428)>>2|(Tt&13107)<<2,Tt=(Tt&61680)>>4|(Tt&3855)<<4,sn[_e]=((Tt&65280)>>8|(Tt&255)<<8)>>1;ct=(function(t,e,r){for(var n=t.length,s=0,i=new Xe(e);s<n;++s)t[s]&&++i[t[s]-1];var o=new Xe(e);for(s=1;s<e;++s)o[s]=o[s-1]+i[s-1]<<1;var a;if(r){a=new Xe(1<<e);var c=15-e;for(s=0;s<n;++s)if(t[s])for(var l=s<<4|t[s],u=e-t[s],d=o[t[s]-1]++<<u,p=d|(1<<u)-1;d<=p;++d)a[sn[d]>>c]=l}else for(a=new Xe(n),s=0;s<n;++s)t[s]&&(a[s]=sn[o[t[s]-1]++]>>15-t[s]);return a}),Ot=new ce(288);for(_e=0;_e<144;++_e)Ot[_e]=8;for(_e=144;_e<256;++_e)Ot[_e]=9;for(_e=256;_e<280;++_e)Ot[_e]=7;for(_e=280;_e<288;++_e)Ot[_e]=8;$r=new ce(32);for(_e=0;_e<32;++_e)$r[_e]=5;na=ct(Ot,9,0),sa=ct(Ot,9,1),ia=ct($r,5,0),oa=ct($r,5,1),Vn=function(t){for(var e=t[0],r=1;r<t.length;++r)t[r]>e&&(e=t[r]);return e},at=function(t,e,r){var n=e/8|0;return(t[n]|t[n+1]<<8)>>(e&7)&r},Gn=function(t,e){var r=e/8|0;return(t[r]|t[r+1]<<8|t[r+2]<<16)>>(e&7)},Ar=function(t){return(t+7)/8|0},lt=function(t,e,r){return(e==null||e<0)&&(e=0),(r==null||r>t.length)&&(r=t.length),new ce(t.subarray(e,r))},e0={UnexpectedEOF:0,InvalidBlockType:1,InvalidLengthLiteral:2,InvalidDistance:3,StreamFinished:4,NoStreamHandler:5,InvalidHeader:6,NoCallback:7,InvalidUTF8:8,ExtraFieldTooLong:9,InvalidDate:10,FilenameTooLong:11,StreamFinishing:12,InvalidZipData:13,UnknownCompressionMethod:14},aa=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Q=function(t,e,r){var n=new Error(e||aa[t]);if(n.code=t,Error.captureStackTrace&&Error.captureStackTrace(n,Q),!r)throw n;return n},cn=function(t,e,r,n){var s=t.length,i=n?n.length:0;if(!s||e.f&&!e.l)return r||new ce(0);var o=!r,a=o||e.i!=2,c=e.i;o&&(r=new ce(s*3));var l=function(ie){var ne=r.length;if(ie>ne){var xe=new ce(Math.max(ne*2,ie));xe.set(r),r=xe}},u=e.f||0,d=e.p||0,p=e.b||0,f=e.l,m=e.d,h=e.m,g=e.n,y=s*8;do{if(!f){u=at(t,d,1);var S=at(t,d+1,3);if(d+=3,S)if(S==1)f=sa,m=oa,h=9,g=5;else if(S==2){var I=at(t,d,31)+257,v=at(t,d+10,15)+4,_=I+at(t,d+5,31)+1;d+=14;for(var x=new ce(_),E=new ce(19),D=0;D<v;++D)E[nn[D]]=at(t,d+D*3,7);d+=v*3;for(var T=Vn(E),W=(1<<T)-1,X=ct(E,T,1),D=0;D<_;){var ee=X[at(t,d,W)];d+=ee&15;var w=ee>>4;if(w<16)x[D++]=w;else{var P=0,A=0;for(w==16?(A=3+at(t,d,3),d+=2,P=x[D-1]):w==17?(A=3+at(t,d,7),d+=3):w==18&&(A=11+at(t,d,127),d+=7);A--;)x[D++]=P}}var C=x.subarray(0,I),O=x.subarray(I);h=Vn(C),g=Vn(O),f=ct(C,h,1),m=ct(O,g,1)}else Q(1);else{var w=Ar(d)+4,b=t[w-4]|t[w-3]<<8,N=w+b;if(N>s){c&&Q(0);break}a&&l(p+b),r.set(t.subarray(w,N),p),e.b=p+=b,e.p=d=N*8,e.f=u;continue}if(d>y){c&&Q(0);break}}a&&l(p+131072);for(var U=(1<<h)-1,Z=(1<<g)-1,J=d;;J=d){var P=f[Gn(t,d)&U],R=P>>4;if(d+=P&15,d>y){c&&Q(0);break}if(P||Q(2),R<256)r[p++]=R;else if(R==256){J=d,f=null;break}else{var V=R-254;if(R>264){var D=R-257,z=kr[D];V=at(t,d,(1<<z)-1)+di[D],d+=z}var G=m[Gn(t,d)&Z],F=G>>4;G||Q(3),d+=G&15;var O=ra[F];if(F>3){var z=Nr[F];O+=Gn(t,d)&(1<<z)-1,d+=z}if(d>y){c&&Q(0);break}a&&l(p+131072);var j=p+V;if(p<O){var H=i-O,q=Math.min(O,j);for(H+p<0&&Q(3);p<q;++p)r[p]=n[H+p]}for(;p<j;++p)r[p]=r[p-O]}}e.l=f,e.p=J,e.b=p,e.f=u,f&&(u=1,e.m=h,e.d=m,e.n=g)}while(!u);return p!=r.length&&o?lt(r,0,p):r.subarray(0,p)},bt=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8},Ir=function(t,e,r){r<<=e&7;var n=e/8|0;t[n]|=r,t[n+1]|=r>>8,t[n+2]|=r>>16},Wn=function(t,e){for(var r=[],n=0;n<t.length;++n)t[n]&&r.push({s:n,f:t[n]});var s=r.length,i=r.slice();if(!s)return{t:_t,l:0};if(s==1){var o=new ce(r[0].s+1);return o[r[0].s]=1,{t:o,l:1}}r.sort(function(N,I){return N.f-I.f}),r.push({s:-1,f:25001});var a=r[0],c=r[1],l=0,u=1,d=2;for(r[0]={s:-1,f:a.f+c.f,l:a,r:c};u!=s-1;)a=r[r[l].f<r[d].f?l++:d++],c=r[l!=u&&r[l].f<r[d].f?l++:d++],r[u++]={s:-1,f:a.f+c.f,l:a,r:c};for(var p=i[0].s,n=1;n<s;++n)i[n].s>p&&(p=i[n].s);var f=new Xe(p+1),m=Hn(r[u-1],f,0);if(m>e){var n=0,h=0,g=m-e,y=1<<g;for(i.sort(function(I,v){return f[v.s]-f[I.s]||I.f-v.f});n<s;++n){var S=i[n].s;if(f[S]>e)h+=y-(1<<m-f[S]),f[S]=e;else break}for(h>>=g;h>0;){var w=i[n].s;f[w]<e?h-=1<<e-f[w]++-1:++n}for(;n>=0&&h;--n){var b=i[n].s;f[b]==e&&(--f[b],++h)}m=e}return{t:new ce(f),l:m}},Hn=function(t,e,r){return t.s==-1?Math.max(Hn(t.l,e,r+1),Hn(t.r,e,r+1)):e[t.s]=r},si=function(t){for(var e=t.length;e&&!t[--e];);for(var r=new Xe(++e),n=0,s=t[0],i=1,o=function(c){r[n++]=c},a=1;a<=e;++a)if(t[a]==s&&a!=e)++i;else{if(!s&&i>2){for(;i>138;i-=138)o(32754);i>2&&(o(i>10?i-11<<5|28690:i-3<<5|12305),i=0)}else if(i>3){for(o(s),--i;i>6;i-=6)o(8304);i>2&&(o(i-3<<5|8208),i=0)}for(;i--;)o(s);i=1,s=t[a]}return{c:r.subarray(0,n),n:e}},Pr=function(t,e){for(var r=0,n=0;n<e.length;++n)r+=t[n]*e[n];return r},Zn=function(t,e,r){var n=r.length,s=Ar(e+2);t[s]=n&255,t[s+1]=n>>8,t[s+2]=t[s]^255,t[s+3]=t[s+1]^255;for(var i=0;i<n;++i)t[s+i+4]=r[i];return(s+4+n)*8},ii=function(t,e,r,n,s,i,o,a,c,l,u){bt(e,u++,r),++s[256];for(var d=Wn(s,15),p=d.t,f=d.l,m=Wn(i,15),h=m.t,g=m.l,y=si(p),S=y.c,w=y.n,b=si(h),N=b.c,I=b.n,v=new Xe(19),_=0;_<S.length;++_)++v[S[_]&31];for(var _=0;_<N.length;++_)++v[N[_]&31];for(var x=Wn(v,7),E=x.t,D=x.l,T=19;T>4&&!E[nn[T-1]];--T);var W=l+5<<3,X=Pr(s,Ot)+Pr(i,$r)+o,ee=Pr(s,p)+Pr(i,h)+o+14+3*T+Pr(v,E)+2*v[16]+3*v[17]+7*v[18];if(c>=0&&W<=X&&W<=ee)return Zn(e,u,t.subarray(c,c+l));var P,A,C,O;if(bt(e,u,1+(ee<X)),u+=2,ee<X){P=ct(p,f,0),A=p,C=ct(h,g,0),O=h;var U=ct(E,D,0);bt(e,u,w-257),bt(e,u+5,I-1),bt(e,u+10,T-4),u+=14;for(var _=0;_<T;++_)bt(e,u+3*_,E[nn[_]]);u+=3*T;for(var Z=[S,N],J=0;J<2;++J)for(var R=Z[J],_=0;_<R.length;++_){var V=R[_]&31;bt(e,u,U[V]),u+=E[V],V>15&&(bt(e,u,R[_]>>5&127),u+=R[_]>>12)}}else P=na,A=Ot,C=ia,O=$r;for(var _=0;_<a;++_){var z=n[_];if(z>255){var V=z>>18&31;Ir(e,u,P[V+257]),u+=A[V+257],V>7&&(bt(e,u,z>>23&31),u+=kr[V]);var G=z&31;Ir(e,u,C[G]),u+=O[G],G>3&&(Ir(e,u,z>>5&8191),u+=Nr[G])}else Ir(e,u,P[z]),u+=A[z]}return Ir(e,u,P[256]),u+A[256]},ca=new an([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),_t=new ce(0),la=function(t,e,r,n,s,i){var o=i.z||t.length,a=new ce(n+o+5*(1+Math.ceil(o/7e3))+s),c=a.subarray(n,a.length-s),l=i.l,u=(i.r||0)&7;if(e){u&&(c[0]=i.r>>3);for(var d=ca[e-1],p=d>>13,f=d&8191,m=(1<<r)-1,h=i.p||new Xe(32768),g=i.h||new Xe(m+1),y=Math.ceil(r/3),S=2*y,w=function(Ge){return(t[Ge]^t[Ge+1]<<y^t[Ge+2]<<S)&m},b=new an(25e3),N=new Xe(288),I=new Xe(32),v=0,_=0,x=i.i||0,E=0,D=i.w||0,T=0;x+2<o;++x){var W=w(x),X=x&32767,ee=g[W];if(h[X]=ee,g[W]=X,D<=x){var P=o-x;if((v>7e3||E>24576)&&(P>423||!l)){u=ii(t,c,0,b,N,I,_,E,T,x-T,u),E=v=_=0,T=x;for(var A=0;A<286;++A)N[A]=0;for(var A=0;A<30;++A)I[A]=0}var C=2,O=0,U=f,Z=X-ee&32767;if(P>2&&W==w(x-Z))for(var J=Math.min(p,P)-1,R=Math.min(32767,x),V=Math.min(258,P);Z<=R&&--U&&X!=ee;){if(t[x+C]==t[x+C-Z]){for(var z=0;z<V&&t[x+z]==t[x+z-Z];++z);if(z>C){if(C=z,O=Z,z>J)break;for(var G=Math.min(Z,z-2),F=0,A=0;A<G;++A){var j=x-Z+A&32767,H=h[j],q=j-H&32767;q>F&&(F=q,ee=j)}}}X=ee,ee=h[X],Z+=X-ee&32767}if(O){b[E++]=268435456|jn[C]<<18|ni[O];var ie=jn[C]&31,ne=ni[O]&31;_+=kr[ie]+Nr[ne],++N[257+ie],++I[ne],D=x+C,++v}else b[E++]=t[x],++N[t[x]]}}for(x=Math.max(x,D);x<o;++x)b[E++]=t[x],++N[t[x]];u=ii(t,c,l,b,N,I,_,E,T,x-T,u),l||(i.r=u&7|c[u/8|0]<<3,u-=7,i.h=g,i.p=h,i.i=x,i.w=D)}else{for(var x=i.w||0;x<o+l;x+=65535){var xe=x+65535;xe>=o&&(c[u/8|0]=l,xe=o),u=Zn(c,u+1,t.subarray(x,xe))}i.i=o}return lt(a,0,n+Ar(u)+s)},ua=(function(){for(var t=new Int32Array(256),e=0;e<256;++e){for(var r=e,n=9;--n;)r=(r&1&&-306674912)^r>>>1;t[e]=r}return t})(),Tr=function(){var t=-1;return{p:function(e){for(var r=t,n=0;n<e.length;++n)r=ua[r&255^e[n]]^r>>>8;t=r},d:function(){return~t}}},Jn=function(){var t=1,e=0;return{p:function(r){for(var n=t,s=e,i=r.length|0,o=0;o!=i;){for(var a=Math.min(o+2655,i);o<a;++o)s+=n+=r[o];n=(n&65535)+15*(n>>16),s=(s&65535)+15*(s>>16)}t=n,e=s},d:function(){return t%=65521,e%=65521,(t&255)<<24|(t&65280)<<8|(e&255)<<8|e>>8}}},ar=function(t,e,r,n,s){if(!s&&(s={l:1},e.dictionary)){var i=e.dictionary.subarray(-32768),o=new ce(i.length+t.length);o.set(i),o.set(t,i.length),t=o,s.w=i.length}return la(t,e.level==null?6:e.level,e.mem==null?s.l?Math.ceil(Math.max(8,Math.min(13,Math.log(t.length)))*1.5):20:12+e.mem,r,n,s)},ln=function(t,e){var r={};for(var n in t)r[n]=t[n];for(var n in e)r[n]=e[n];return r},Jo=function(t,e,r){for(var n=t(),s=t.toString(),i=s.slice(s.indexOf("[")+1,s.lastIndexOf("]")).replace(/\s+/g,"").split(","),o=0;o<n.length;++o){var a=n[o],c=i[o];if(typeof a=="function"){e+=";"+c+"=";var l=a.toString();if(a.prototype)if(l.indexOf("[native code]")!=-1){var u=l.indexOf(" ",8)+1;e+=l.slice(u,l.indexOf("(",u))}else{e+=l;for(var d in a.prototype)e+=";"+c+".prototype."+d+"="+a.prototype[d].toString()}else e+=l}else r[c]=a}return e},Bn=[],t0=function(t){var e=[];for(var r in t)t[r].buffer&&e.push((t[r]=new t[r].constructor(t[r])).buffer);return e},da=function(t,e,r,n){if(!Bn[r]){for(var s="",i={},o=t.length-1,a=0;a<o;++a)s=Jo(t[a],s,i);Bn[r]={c:Jo(t[o],s,i),e:i}}var c=ln({},Bn[r].e);return Qh(Bn[r].c+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+e.toString()+"}",r,c,t0(c),n)},Or=function(){return[ce,Xe,an,kr,Nr,nn,di,ra,sa,oa,sn,aa,ct,Vn,at,Gn,Ar,lt,Q,cn,Xt,Kt,pi]},Rr=function(){return[ce,Xe,an,kr,Nr,nn,jn,ni,na,Ot,ia,$r,sn,ca,_t,ct,bt,Ir,Wn,Hn,si,Pr,Zn,ii,Ar,lt,la,ar,lr,Kt]},pa=function(){return[fi,hi,be,Tr,ua]},fa=function(){return[mi,ga]},ma=function(){return[gi,be,Jn]},ha=function(){return[yi]},Kt=function(t){return postMessage(t,[t.buffer])},pi=function(t){return t&&{out:t.size&&new ce(t.size),dictionary:t.dictionary}},Dr=function(t,e,r,n,s,i){var o=da(r,n,s,function(a,c){o.terminate(),i(a,c)});return o.postMessage([t,e],e.consume?[t.buffer]:[]),function(){o.terminate()}},dt=function(t){return t.ondata=function(e,r){return postMessage([e,r],[e.buffer])},function(e){e.data[0]?(t.push(e.data[0],e.data[1]),postMessage([e.data[0].length])):t.flush(e.data[1])}},Fr=function(t,e,r,n,s,i,o){var a,c=da(t,n,s,function(l,u){l?(c.terminate(),e.ondata.call(e,l)):Array.isArray(u)?u.length==1?(e.queuedSize-=u[0],e.ondrain&&e.ondrain(u[0])):(u[1]&&c.terminate(),e.ondata.call(e,l,u[0],u[1])):o(u)});c.postMessage(r),e.queuedSize=0,e.push=function(l,u){e.ondata||Q(5),a&&e.ondata(Q(4,0,1),null,!!u),e.queuedSize+=l.length,c.postMessage([l,a=u],l.buffer instanceof ArrayBuffer?[l.buffer]:[])},e.terminate=function(){c.terminate()},i&&(e.flush=function(l){c.postMessage([0,l])})},Ke=function(t,e){return t[e]|t[e+1]<<8},Ae=function(t,e){return(t[e]|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24)>>>0},ti=function(t,e){return Ae(t,e)+Ae(t,e+4)*4294967296},be=function(t,e,r){for(;r;++e)t[e]=r,r>>>=8},fi=function(t,e){var r=e.filename;if(t[0]=31,t[1]=139,t[2]=8,t[8]=e.level<2?4:e.level==9?2:0,t[9]=3,e.mtime!=0&&be(t,4,Math.floor(new Date(e.mtime||Date.now())/1e3)),r){t[3]=8;for(var n=0;n<=r.length;++n)t[n+10]=r.charCodeAt(n)}},mi=function(t){(t[0]!=31||t[1]!=139||t[2]!=8)&&Q(6,"invalid gzip data");var e=t[3],r=10;e&4&&(r+=(t[10]|t[11]<<8)+2);for(var n=(e>>3&1)+(e>>4&1);n>0;n-=!t[r++]);return r+(e&2)},ga=function(t){var e=t.length;return(t[e-4]|t[e-3]<<8|t[e-2]<<16|t[e-1]<<24)>>>0},hi=function(t){return 10+(t.filename?t.filename.length+1:0)},gi=function(t,e){var r=e.level,n=r==0?0:r<6?1:r==9?3:2;if(t[0]=120,t[1]=n<<6|(e.dictionary&&32),t[1]|=31-(t[0]<<8|t[1])%31,e.dictionary){var s=Jn();s.p(e.dictionary),be(t,2,s.d())}},yi=function(t,e){return((t[0]&15)!=8||t[0]>>4>7||(t[0]<<8|t[1])%31)&&Q(6,"invalid zlib data"),(t[1]>>5&1)==+!e&&Q(6,"invalid zlib data: "+(t[1]&32?"need":"unexpected")+" dictionary"),(t[1]>>3&4)+2};ut=(function(){function t(e,r){if(typeof e=="function"&&(r=e,e={}),this.ondata=r,this.o=e||{},this.s={l:0,i:32768,w:32768,z:32768},this.b=new ce(98304),this.o.dictionary){var n=this.o.dictionary.subarray(-32768);this.b.set(n,32768-n.length),this.s.i=32768-n.length}}return t.prototype.p=function(e,r){this.ondata(ar(e,this.o,0,0,this.s),r)},t.prototype.push=function(e,r){this.ondata||Q(5),this.s.l&&Q(4);var n=e.length+this.s.z;if(n>this.b.length){if(n>2*this.b.length-32768){var s=new ce(n&-32768);s.set(this.b.subarray(0,this.s.z)),this.b=s}var i=this.b.length-this.s.z;this.b.set(e.subarray(0,i),this.s.z),this.s.z=this.b.length,this.p(this.b,!1),this.b.set(this.b.subarray(-32768)),this.b.set(e.subarray(i),32768),this.s.z=e.length-i+32768,this.s.i=32766,this.s.w=32768}else this.b.set(e,this.s.z),this.s.z+=e.length;this.s.l=r&1,(this.s.z>this.s.w+8191||r)&&(this.p(this.b,r||!1),this.s.w=this.s.i,this.s.i-=2),r&&(this.s=this.o={},this.b=_t)},t.prototype.flush=function(e){if(this.ondata||Q(5),this.s.l&&Q(4),this.p(this.b,!1),this.s.w=this.s.i,this.s.i-=2,e){var r=new ce(6);r[0]=this.s.r>>3;var n=Zn(r,this.s.r,_t);this.s.r=0,this.ondata(r.subarray(0,n>>3),!1)}},t})(),ya=(function(){function t(e,r){Fr([Rr,function(){return[dt,ut]}],this,cr.call(this,e,r),function(n){var s=new ut(n.data);onmessage=dt(s)},6,1)}return t})();Ze=(function(){function t(e,r){typeof e=="function"&&(r=e,e={}),this.ondata=r;var n=e&&e.dictionary&&e.dictionary.subarray(-32768);this.s={i:0,b:n?n.length:0},this.o=new ce(32768),this.p=new ce(0),n&&this.o.set(n)}return t.prototype.e=function(e){if(this.ondata||Q(5),this.d&&Q(4),!this.p.length)this.p=e;else if(e.length){var r=new ce(this.p.length+e.length);r.set(this.p),r.set(e,this.p.length),this.p=r}},t.prototype.c=function(e){this.s.i=+(this.d=e||!1);var r=this.s.b,n=cn(this.p,this.s,this.o);this.ondata(lt(n,r,this.s.b),this.d),this.o=lt(n,this.s.b-32768),this.s.b=this.o.length,this.p=lt(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(e,r){this.e(e),this.c(r)},t})(),Si=(function(){function t(e,r){Fr([Or,function(){return[dt,Ze]}],this,cr.call(this,e,r),function(n){var s=new Ze(n.data);onmessage=dt(s)},7,0)}return t})();oi=(function(){function t(e,r){this.c=Tr(),this.l=0,this.v=1,ut.call(this,e,r)}return t.prototype.push=function(e,r){this.c.p(e),this.l+=e.length,ut.prototype.push.call(this,e,r)},t.prototype.p=function(e,r){var n=ar(e,this.o,this.v&&hi(this.o),r&&8,this.s);this.v&&(fi(n,this.o),this.v=0),r&&(be(n,n.length-8,this.c.d()),be(n,n.length-4,this.l)),this.ondata(n,r)},t.prototype.flush=function(e){ut.prototype.flush.call(this,e)},t})(),r0=(function(){function t(e,r){Fr([Rr,pa,function(){return[dt,ut,oi]}],this,cr.call(this,e,r),function(n){var s=new oi(n.data);onmessage=dt(s)},8,1)}return t})();qn=(function(){function t(e,r){this.v=1,this.r=0,Ze.call(this,e,r)}return t.prototype.push=function(e,r){if(Ze.prototype.e.call(this,e),this.r+=e.length,this.v){var n=this.p.subarray(this.v-1),s=n.length>3?mi(n):4;if(s>n.length){if(!r)return}else this.v>1&&this.onmember&&this.onmember(this.r-n.length);this.p=n.subarray(s),this.v=0}Ze.prototype.c.call(this,0),this.s.f&&!this.s.l?(this.v=Ar(this.s.p)+9,this.s={i:0},this.o=new ce(0),this.push(new ce(0),r)):r&&Ze.prototype.c.call(this,r)},t})(),ba=(function(){function t(e,r){var n=this;Fr([Or,fa,function(){return[dt,Ze,qn]}],this,cr.call(this,e,r),function(s){var i=new qn(s.data);i.onmember=function(o){return postMessage(o)},onmessage=dt(i)},9,0,function(s){return n.onmember&&n.onmember(s)})}return t})();ai=(function(){function t(e,r){this.c=Jn(),this.v=1,ut.call(this,e,r)}return t.prototype.push=function(e,r){this.c.p(e),ut.prototype.push.call(this,e,r)},t.prototype.p=function(e,r){var n=ar(e,this.o,this.v&&(this.o.dictionary?6:2),r&&4,this.s);this.v&&(gi(n,this.o),this.v=0),r&&be(n,n.length-4,this.c.d()),this.ondata(n,r)},t.prototype.flush=function(e){ut.prototype.flush.call(this,e)},t})(),s0=(function(){function t(e,r){Fr([Rr,ma,function(){return[dt,ut,ai]}],this,cr.call(this,e,r),function(n){var s=new ai(n.data);onmessage=dt(s)},10,1)}return t})();Yn=(function(){function t(e,r){Ze.call(this,e,r),this.v=e&&e.dictionary?2:1}return t.prototype.push=function(e,r){if(Ze.prototype.e.call(this,e),this.v){if(this.p.length<6&&!r)return;this.p=this.p.subarray(yi(this.p,this.v-1)),this.v=0}r&&(this.p.length<4&&Q(6,"invalid zlib data"),this.p=this.p.subarray(0,-4)),Ze.prototype.c.call(this,r)},t})(),va=(function(){function t(e,r){Fr([Or,ha,function(){return[dt,Ze,Yn]}],this,cr.call(this,e,r),function(n){var s=new Yn(n.data);onmessage=dt(s)},11,0)}return t})();li=(function(){function t(e,r){this.o=cr.call(this,e,r)||{},this.G=qn,this.I=Ze,this.Z=Yn}return t.prototype.i=function(){var e=this;this.s.ondata=function(r,n){e.ondata(r,n)}},t.prototype.push=function(e,r){if(this.ondata||Q(5),this.s)this.s.push(e,r);else{if(this.p&&this.p.length){var n=new ce(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length)}else this.p=e;this.p.length>2&&(this.s=this.p[0]==31&&this.p[1]==139&&this.p[2]==8?new this.G(this.o):(this.p[0]&15)!=8||this.p[0]>>4>7||(this.p[0]<<8|this.p[1])%31?new this.I(this.o):new this.Z(this.o),this.i(),this.s.push(this.p,r),this.p=null)}},t})(),o0=(function(){function t(e,r){li.call(this,e,r),this.queuedSize=0,this.G=ba,this.I=Si,this.Z=va}return t.prototype.i=function(){var e=this;this.s.ondata=function(r,n,s){e.ondata(r,n,s)},this.s.ondrain=function(r){e.queuedSize-=r,e.ondrain&&e.ondrain(r)}},t.prototype.push=function(e,r){this.queuedSize+=e.length,li.prototype.push.call(this,e,r)},t})();_i=function(t,e,r,n){for(var s in t){var i=t[s],o=e+s,a=n;Array.isArray(i)&&(a=ln(n,i[1]),i=i[0]),ArrayBuffer.isView(i)?r[o]=[i,a]:(r[o+="/"]=[new ce(0),a],_i(i,o,r,n))}},Qo=typeof TextEncoder<"u"&&new TextEncoder,ui=typeof TextDecoder<"u"&&new TextDecoder,xa=0;try{ui.decode(_t,{stream:!0}),xa=1}catch{}Ca=function(t){for(var e="",r=0;;){var n=t[r++],s=(n>127)+(n>223)+(n>239);if(r+s>t.length)return{s:e,r:lt(t,r-1)};s?s==3?(n=((n&15)<<18|(t[r++]&63)<<12|(t[r++]&63)<<6|t[r++]&63)-65536,e+=String.fromCharCode(55296|n>>10,56320|n&1023)):s&1?e+=String.fromCharCode((n&31)<<6|t[r++]&63):e+=String.fromCharCode((n&15)<<12|(t[r++]&63)<<6|t[r++]&63):e+=String.fromCharCode(n)}},l0=(function(){function t(e){this.ondata=e,xa?this.t=new TextDecoder:this.p=_t}return t.prototype.push=function(e,r){if(this.ondata||Q(5),r=!!r,this.t){this.ondata(this.t.decode(e,{stream:!0}),r),r&&(this.t.decode().length&&Q(8),this.t=null);return}this.p||Q(4);var n=new ce(this.p.length+e.length);n.set(this.p),n.set(e,this.p.length);var s=Ca(n),i=s.s,o=s.r;r?(o.length&&Q(8),this.p=null):this.p=o,this.ondata(i,r)},t})(),u0=(function(){function t(e){this.ondata=e}return t.prototype.push=function(e,r){this.ondata||Q(5),this.d&&Q(4),this.ondata(Yt(e),this.d=r||!1)},t})();Ia=function(t){return t==1?3:t<6?2:t==9?1:0},Pa=function(t,e){return e+30+Ke(t,e+26)+Ke(t,e+28)},Ea=function(t,e,r){var n=Ke(t,e+28),s=Ke(t,e+30),i=vi(t.subarray(e+46,e+46+n),!(Ke(t,e+8)&2048)),o=e+46+n,a=$a(t,o,s,r,Ae(t,e+20),Ae(t,e+24),Ae(t,e+42)),c=a[0],l=a[1],u=a[2];return[Ke(t,e+10),c,l,i,o+s+Ke(t,e+32),u]},$a=function(t,e,r,n,s,i,o){var a=s==4294967295,c=i==4294967295,l=o==4294967295,u=e+r,d=a+c+l;if(n&&d){for(;e+4<u;e+=4+Ke(t,e+2))if(Ke(t,e)==1)return[a?ti(t,e+4+8*c):s,c?ti(t,e+4):i,l?ti(t,e+4+8*(c+a)):o,1];n<2&&Q(13)}return[s,i,o,0]},Ht=function(t){var e=0;if(t)for(var r in t){var n=t[r].length;n>65535&&Q(9),e+=n+4}return e},Mr=function(t,e,r,n,s,i,o,a){var c=n.length,l=r.extra,u=a&&a.length,d=Ht(l);be(t,e,o!=null?33639248:67324752),e+=4,o!=null&&(t[e++]=20,t[e++]=r.os),t[e]=20,e+=2,t[e++]=r.flag<<1|(i<0&&8),t[e++]=s&&8,t[e++]=r.compression&255,t[e++]=r.compression>>8;var p=new Date(r.mtime==null?Date.now():r.mtime),f=p.getFullYear()-1980;if((f<0||f>119)&&Q(10),be(t,e,f<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),e+=4,i!=-1&&(be(t,e,r.crc),be(t,e+4,i<0?-i-2:i),be(t,e+8,r.size)),be(t,e+12,c),be(t,e+14,d),e+=16,o!=null&&(be(t,e,u),be(t,e+6,r.attrs),be(t,e+10,o),e+=14),t.set(n,e),e+=c,d)for(var m in l){var h=l[m],g=h.length;be(t,e,+m),be(t,e+2,g),t.set(h,e+4),e+=4+g}return u&&(t.set(a,e),e+=u),e},wi=function(t,e,r,n,s){be(t,e,101010256),be(t,e+8,r),be(t,e+10,r),be(t,e+12,n),be(t,e+16,s)},on=(function(){function t(e){this.filename=e,this.c=Tr(),this.size=0,this.compression=0}return t.prototype.process=function(e,r){this.ondata(null,e,r)},t.prototype.push=function(e,r){this.ondata||Q(5),this.c.p(e),this.size+=e.length,r&&(this.crc=this.c.d()),this.process(e,r||!1)},t})(),d0=(function(){function t(e,r){var n=this;r||(r={}),on.call(this,e),this.d=new ut(r,function(s,i){n.ondata(null,s,i)}),this.compression=8,this.flag=Ia(r.level)}return t.prototype.process=function(e,r){try{this.d.push(e,r)}catch(n){this.ondata(n,null,r)}},t.prototype.push=function(e,r){on.prototype.push.call(this,e,r)},t})(),p0=(function(){function t(e,r){var n=this;r||(r={}),on.call(this,e),this.d=new ya(r,function(s,i,o){n.ondata(s,i,o)}),this.compression=8,this.flag=Ia(r.level),this.terminate=this.d.terminate}return t.prototype.process=function(e,r){this.d.push(e,r)},t.prototype.push=function(e,r){on.prototype.push.call(this,e,r)},t})(),f0=(function(){function t(e){this.ondata=e,this.u=[],this.d=1}return t.prototype.add=function(e){var r=this;if(this.ondata||Q(5),this.d&2)this.ondata(Q(4+(this.d&1)*8,0,1),null,!1);else{var n=Yt(e.filename),s=n.length,i=e.comment,o=i&&Yt(i),a=s!=e.filename.length||o&&i.length!=o.length,c=s+Ht(e.extra)+30;s>65535&&this.ondata(Q(11,0,1),null,!1);var l=new ce(c);Mr(l,0,e,n,a,-1);var u=[l],d=function(){for(var g=0,y=u;g<y.length;g++){var S=y[g];r.ondata(null,S,!1)}u=[]},p=this.d;this.d=0;var f=this.u.length,m=ln(e,{f:n,u:a,o,t:function(){e.terminate&&e.terminate()},r:function(){if(d(),p){var g=r.u[f+1];g?g.r():r.d=1}p=1}}),h=0;e.ondata=function(g,y,S){if(g)r.ondata(g,y,S),r.terminate();else if(h+=y.length,u.push(y),S){var w=new ce(16);be(w,0,134695760),be(w,4,e.crc),be(w,8,h),be(w,12,e.size),u.push(w),m.c=h,m.b=c+h+16,m.crc=e.crc,m.size=e.size,p&&m.r(),p=1}else p&&d()},this.u.push(m)}},t.prototype.end=function(){var e=this;if(this.d&2){this.ondata(Q(4+(this.d&1)*8,0,1),null,!0);return}this.d?this.e():this.u.push({r:function(){e.d&1&&(e.u.splice(-1,1),e.e())},t:function(){}}),this.d=3},t.prototype.e=function(){for(var e=0,r=0,n=0,s=0,i=this.u;s<i.length;s++){var o=i[s];n+=46+o.f.length+Ht(o.extra)+(o.o?o.o.length:0)}for(var a=new ce(n+22),c=0,l=this.u;c<l.length;c++){var o=l[c];Mr(a,e,o,o.f,o.u,-o.c-2,r,o.o),e+=46+o.f.length+Ht(o.extra)+(o.o?o.o.length:0),r+=o.b}wi(a,e,this.u.length,n,r),this.ondata(null,a,!0),this.d=2},t.prototype.terminate=function(){for(var e=0,r=this.u;e<r.length;e++){var n=r[e];n.t()}this.d=2},t})();Ma=(function(){function t(){}return t.prototype.push=function(e,r){this.ondata(null,e,r)},t.compression=0,t})(),g0=(function(){function t(){var e=this;this.i=new Ze(function(r,n){e.ondata(null,r,n)})}return t.prototype.push=function(e,r){try{this.i.push(e,r)}catch(n){this.ondata(n,null,r)}},t.compression=8,t})(),y0=(function(){function t(e,r){var n=this;r<32e4?this.i=new Ze(function(s,i){n.ondata(null,s,i)}):(this.i=new Si(function(s,i,o){n.ondata(s,i,o)}),this.terminate=this.i.terminate)}return t.prototype.push=function(e,r){this.i.terminate&&(e=lt(e,0)),this.i.push(e,r)},t.compression=8,t})(),S0=(function(){function t(e){this.onfile=e,this.k=[],this.o={0:Ma},this.p=_t}return t.prototype.push=function(e,r){var n=this;if(this.onfile||Q(5),this.p||Q(4),this.c>0){var s=Math.min(this.c,e.length),i=e.subarray(0,s);if(this.c-=s,this.d?this.d.push(i,!this.c):this.k[0].push(i),e=e.subarray(s),e.length)return this.push(e,r)}else{var o=0,a=0,c=void 0,l=void 0;this.p.length?e.length?(l=new ce(this.p.length+e.length),l.set(this.p),l.set(e,this.p.length)):l=this.p:l=e;for(var u=l.length,d=this.c,p=d&&this.d,f=function(){var y=Ae(l,a);if(y==67324752){o=1,c=a,m.d=null,m.c=0;var S=Ke(l,a+6),w=Ke(l,a+8),b=S&2048,N=S&8,I=Ke(l,a+26),v=Ke(l,a+28);if(u>a+30+I+v){var _=[];m.k.unshift(_),o=2;var x=Ae(l,a+18),E=Ae(l,a+22),D=vi(l.subarray(a+30,a+=30+I),!b),T=$a(l,a,v,2,x,E,0),W=T[0],X=T[1],ee=T[3];N&&(W=-1-ee),a+=v,m.c=W;var P,A={name:D,compression:w,start:function(){if(A.ondata||Q(5),!W)A.ondata(null,_t,!0);else{var C=n.o[w];C||A.ondata(Q(14,"unknown compression type "+w,1),null,!1),P=W<0?new C(D):new C(D,W,X),P.ondata=function(J,R,V){A.ondata(J,R,V)};for(var O=0,U=_;O<U.length;O++){var Z=U[O];P.push(Z,!1)}n.k[0]==_&&n.c?n.d=P:P.push(_t,!0)}},terminate:function(){P&&P.terminate&&P.terminate()}};W>=0&&(A.size=W,A.originalSize=X),m.onfile(A)}return"break"}else if(d){if(y==134695760)return c=a+=12+(d==-2&&8),o=3,m.c=0,"break";if(y==33639248)return c=a-=4,o=3,m.c=0,"break"}},m=this;a<u-4;++a){var h=f();if(h==="break")break}if(this.p=_t,d<0){var g=o?l.subarray(0,c-12-(d==-2&&8)-(Ae(l,c-16)==134695760&&4)):l.subarray(0,a);p?p.push(g,!!o):this.k[+(o==2)].push(g)}if(o&2)return this.push(l.subarray(a),r);this.p=l.subarray(a)}r&&(this.c&&Q(13),this.p=null)},t.prototype.register=function(e){this.o[e.compression]=e},t})(),Xn=typeof queueMicrotask=="function"?queueMicrotask:typeof setTimeout=="function"?setTimeout:function(t){t()}});function v0(t){let e=Buffer.from(or(t));return Buffer.concat([Qn,e])}function Na(t){if(!t.subarray(0,Qn.length).equals(Qn))return null;try{return Buffer.from(qt(t.subarray(Qn.length)))}catch{return null}}var Qn,Aa,Ta,Oa=M(()=>{"use strict";un();se();Qn=Buffer.from("BZhVFS\0");Aa={name:"bzip2",description:"Compress files using Burrows-Wheeler algorithm",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=r.includes("-k")||r.includes("--keep"),o=r.includes("-d")||r.includes("--decompress"),a=r.find(u=>!u.startsWith("-"));if(!a)return{stderr:"bzip2: no file specified",exitCode:1};let c=B(e,a);if(!t.vfs.exists(c))return{stderr:`bzip2: ${a}: No such file or directory`,exitCode:1};if(o){if(!a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: unknown suffix -- ignored`,exitCode:1};let u=t.vfs.readFileRaw(c),d=Na(u);if(!d)return{stderr:`bzip2: ${a}: data integrity error`,exitCode:2};let p=c.slice(0,-4);return t.vfs.writeFile(p,d,{},n,s),i||t.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}if(a.endsWith(".bz2"))return{stderr:`bzip2: ${a}: already has .bz2 suffix -- unchanged`,exitCode:1};let l=t.vfs.readFileRaw(c);return t.vfs.writeFile(`${c}.bz2`,v0(l),{},n,s),i||t.vfs.remove(c,{recursive:!1},n,s),{exitCode:0}}},Ta={name:"bunzip2",description:"Decompress bzip2 files",category:"archive",aliases:["bzcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=r.includes("-k")||r.includes("--keep"),o=r.find(d=>!d.startsWith("-"));if(!o)return{stderr:"bunzip2: no file specified",exitCode:1};let a=B(e,o);if(!t.vfs.exists(a))return{stderr:`bunzip2: ${o}: No such file or directory`,exitCode:1};if(!o.endsWith(".bz2"))return{stderr:`bunzip2: ${o}: unknown suffix -- ignored`,exitCode:1};let c=t.vfs.readFileRaw(a),l=Na(c);if(!l)return{stderr:`bunzip2: ${o}: data integrity error`,exitCode:2};let u=a.slice(0,-4);return t.vfs.writeFile(u,l,{},n,s),i||t.vfs.remove(a,{recursive:!1},n,s),{exitCode:0}}}});var Ra,Da=M(()=>{"use strict";ae();se();Ra={name:"cat",description:"Concatenate and print files",category:"files",params:["[-n] [-b] <file...>"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s,uid:i,gid:o})=>{let a=K(n,["-n","--number"]),c=K(n,["-b","--number-nonblank"]),l=n.filter(m=>!m.startsWith("-"));if(l.length===0&&s!==void 0)return{stdout:s,exitCode:0};if(l.length===0)return{stderr:"cat: missing file operand",exitCode:1};let u=[];for(let m of l){let h=Ro(e.vfs,r,m);He(e.vfs,e.users,t,h,4),u.push(e.vfs.readFile(h,i,o))}let d=u.join("");if(!(a||c))return{stdout:d,exitCode:0};let p=1;return{stdout:d.split(`
`).map(m=>c&&m.trim()===""?m:`${String(p++).padStart(6)}	${m}`).join(`
`),exitCode:0}}}});var es=M(()=>{"use strict";Lr();Ye()});async function ts(t,e,r,n,s,i,o){let a={exitCode:0},c=[],l=s,u=0;for(;u<t.length;){let p=t[u];if(p.subshell){let m={vars:{...o.vars},lastExitCode:o.lastExitCode};if(a=await ts(p.subshell.statements,e,r,n,l,i,m),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.group){if(a=await ts(p.group.statements,e,r,n,l,i,o),a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),o.lastExitCode=a.exitCode??0,a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};u++;continue}if(p.background&&p.pipeline){let m=new AbortController;Fa(p.pipeline,e,r,"background",l,i,o,m),a={exitCode:0},o.lastExitCode=0,u++;continue}if(!p.pipeline){u++;continue}if(a=await Fa(p.pipeline,e,r,n,l,i,o),o.lastExitCode=a.exitCode??0,a.nextCwd&&(a.exitCode??0)===0&&(l=a.nextCwd),a.stdout&&c.push(a.stdout),a.closeSession||a.switchUser)return{...a,stdout:c.join("")||a.stdout};let f=p.op;if(!(!f||f===";")){if(f==="&&"){if((a.exitCode??0)!==0)for(;u<t.length&&t[u]?.op==="&&";)u++}else if(f==="||"&&(a.exitCode??0)===0)for(;u<t.length&&t[u]?.op==="||";)u++}u++}let d=c.join("");return{...a,stdout:d||a.stdout,nextCwd:l===s?void 0:l}}function Fa(t,e,r,n,s,i,o,a){if(!t.isValid)return{stderr:t.error||"Syntax error",exitCode:1};if(t.commands.length===0)return{exitCode:0};let c=o??{vars:{},lastExitCode:0};return t.commands.length===1?w0(t.commands[0],e,r,n,s,i,c,a):x0(t.commands,e,r,n,s,i,c)}async function w0(t,e,r,n,s,i,o,a){let c;if(t.inputFile){let d=B(s,t.inputFile);try{c=i.vfs.readFile(d)}catch{return{stderr:`${t.inputFile}: No such file or directory`,exitCode:1}}}let l=n==="background",u=await ur(t.name,t.args,e,r,n,s,i,c,o,l,a);if(t.outputFile){let d=B(s,t.outputFile),p=u.stdout||"",f=i.users.getUid(e),m=i.users.getGid(e);try{if(t.appendOutput){let h=(()=>{try{return i.vfs.readFile(d,f,m)}catch{return""}})();i.vfs.writeFile(d,h+p,{},f,m)}else i.vfs.writeFile(d,p,{},f,m);return{...u,stdout:""}}catch{return{...u,stderr:`Failed to write to ${t.outputFile}`,exitCode:1}}}return u}async function x0(t,e,r,n,s,i,o){let a="",c=0;for(let l=0;l<t.length;l++){let u=t[l];if(l===0&&u.inputFile){let f=B(s,u.inputFile);try{a=i.vfs.readFile(f)}catch{return{stderr:`${u.inputFile}: No such file or directory`,exitCode:1}}}let d=await ur(u.name,u.args,e,r,n,s,i,a,o);c=d.exitCode??0;let p=u.stderrToStdout?{...d,stdout:(d.stdout??"")+(d.stderr??""),stderr:void 0}:d;if(u.stderrFile&&p.stderr){let f=B(s,u.stderrFile),m=i.users.getUid(e),h=i.users.getGid(e);try{let g=(()=>{try{return i.vfs.readFile(f,m,h)}catch{return""}})();i.vfs.writeFile(f,u.stderrAppend?g+p.stderr:p.stderr,{},m,h)}catch{}}if(l===t.length-1&&u.outputFile){let f=B(s,u.outputFile),m=d.stdout||"",h=i.users.getUid(e),g=i.users.getGid(e);try{if(u.appendOutput){let y=(()=>{try{return i.vfs.readFile(f,h,g)}catch{return""}})();i.vfs.writeFile(f,y+m,{},h,g)}else i.vfs.writeFile(f,m,{},h,g);a=""}catch{return{stderr:`Failed to write to ${u.outputFile}`,exitCode:1}}}else a=p.stdout||"";if(p.stderr&&c!==0)return{stderr:p.stderr,exitCode:c};if(p.closeSession||p.switchUser)return p}return{stdout:a,exitCode:c}}var La=M(()=>{"use strict";es();se()});function pn(t){let e=[],r="",n=!1,s="",i=0;for(;i<t.length;){let o=t.charAt(i),a=t[i+1];if((o==='"'||o==="'")&&!n){n=!0,s=o,i++;continue}if(n&&o===s){n=!1,s="",i++;continue}if(n){r+=o,i++;continue}if(o===" "){r&&(e.push(r),r=""),i++;continue}if(!n&&o==="2"&&a===">"){let c=t[i+2],l=t[i+3],u=t[i+4];if(c===">"&&l==="&"&&u==="1"){r&&(e.push(r),r=""),e.push("2>>&1"),i+=5;continue}if(c==="&"&&l==="1"){r&&(e.push(r),r=""),e.push("2>&1"),i+=4;continue}if(c===">"){r&&(e.push(r),r=""),e.push("2>>"),i+=3;continue}r&&(e.push(r),r=""),e.push("2>"),i+=2;continue}if((o===">"||o==="<")&&!n){r&&(e.push(r),r=""),o===">"&&a===">"?(e.push(">>"),i+=2):(e.push(o),i++);continue}r+=o,i++}return r&&e.push(r),e}var Pi=M(()=>{"use strict"});function Ua(t){let e=t.trim();if(!e)return{statements:[],isValid:!0};try{return{statements:Ei(e),isValid:!0}}catch(r){return{statements:[],isValid:!1,error:r.message}}}function Ei(t){let e=C0(t),r=[];for(let n of e){let s=n.text.trim(),i={};if(n.op&&(i.op=n.op),n.background&&(i.background=!0),s.startsWith("(")&&s.endsWith(")")){let o=s.slice(1,-1).trim();i.subshell={statements:Ei(o)}}else if(s.startsWith("{")&&s.endsWith("}")){let o=s.slice(1,-1).trim();i.group={statements:Ei(o)}}else{let o=I0(s);i.pipeline={commands:o,isValid:!0}}r.push(i)}return r}function C0(t){let e=[],r="",n=0,s=!1,i="",o=0,a=(c,l)=>{r.trim()&&e.push({text:r,op:c,background:l}),r=""};for(;o<t.length;){let c=t.charAt(o),l=t.slice(o,o+2);if((c==='"'||c==="'")&&!s){s=!0,i=c,r+=c,o++;continue}if(s&&c===i){s=!1,r+=c,o++;continue}if(s){r+=c,o++;continue}if(c==="("){n++,r+=c,o++;continue}if(c===")"){n--,r+=c,o++;continue}if(n>0){r+=c,o++;continue}if(l==="&&"){a("&&"),o+=2;continue}if(l==="||"){a("||"),o+=2;continue}if(c==="&"&&t[o+1]!=="&"){if(t[o+1]===">"){r+=c,o++;continue}let u=r.trimEnd();if(u.endsWith(">")||u.endsWith("2>")||u.endsWith(">>")){r+=c,o++;continue}a(";",!0),o++;continue}if(c===";"){a(";"),o++;continue}r+=c,o++}return a(),e}function I0(t){return P0(t).map(E0)}function P0(t){let e=[],r="",n=!1,s="";for(let o=0;o<t.length;o++){let a=t.charAt(o);if((a==='"'||a==="'")&&!n){n=!0,s=a,r+=a;continue}if(n&&a===s){n=!1,r+=a;continue}if(n){r+=a;continue}if(a==="|"&&t[o+1]!=="|"){if(!r.trim())throw new Error("Syntax error near unexpected token '|'");e.push(r.trim()),r=""}else r+=a}let i=r.trim();if(!i&&e.length>0)throw new Error("Syntax error near unexpected token '|'");return i&&e.push(i),e}function E0(t){let e=pn(t);if(e.length===0)return{name:"",args:[]};let r=[],n,s,i=!1,o=0,a,c=!1,l=!1;for(;o<e.length;){let p=e[o];if(p==="<"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after <");n=e[o],o++}else if(p===">>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >>");s=e[o],i=!0,o++}else if(p===">"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after >");s=e[o],i=!1,o++}else if(p==="&>"||p==="&>>"){let f=p==="&>>";if(o++,o>=e.length)throw new Error(`Syntax error: expected filename after ${p}`);s=e[o],i=f,l=!0,o++}else if(p==="2>&1")l=!0,o++;else if(p==="2>>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>>");a=e[o],c=!0,o++}else if(p==="2>"){if(o++,o>=e.length)throw new Error("Syntax error: expected filename after 2>");a=e[o],c=!1,o++}else r.push(p),o++}let u=r[0]??"";return{name:/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.test(u)?u:u.toLowerCase(),args:r.slice(1),inputFile:n,outputFile:s,appendOutput:i,stderrFile:a,stderrAppend:c,stderrToStdout:l}}var Ba=M(()=>{"use strict";Pi()});var Wa={};On(Wa,{applyUserSwitch:()=>Rt,makeDefaultEnv:()=>pt,runCommand:()=>ge,runCommandDirect:()=>ur,userHome:()=>fe});function fe(t){return t==="root"?"/root":`/home/${t}`}async function Rt(t,e,r,n,s){n.vars.USER=t,n.vars.LOGNAME=t,n.vars.HOME=fe(t),n.vars.PS1=pt(t,e).vars.PS1??"";let i=`${fe(t)}/.bashrc`;if(s.vfs.exists(i))for(let o of s.vfs.readFile(i).split(`
`)){let a=o.trim();if(!(!a||a.startsWith("#")))try{await ge(a,t,e,"shell",r,s,void 0,n)}catch{}}}function pt(t,e){return{vars:{PATH:"/usr/local/bin:/usr/bin:/bin",HOME:fe(t),USER:t,LOGNAME:t,SHELL:"/bin/bash",TERM:"xterm-256color",HOSTNAME:e,PS1:t==="root"?"\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] ":"\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w\\[\\e[37m\\]]\\[\\e[0m\\]\\$ ",0:"/bin/bash"},lastExitCode:0}}function Va(t,e,r,n){if(t.startsWith("/")){if(!r.vfs.exists(t))return null;try{let o=r.vfs.stat(t);return o.type!=="file"||!(o.mode&73)||(t.startsWith("/sbin/")||t.startsWith("/usr/sbin/"))&&n!=="root"?null:t}catch{return null}}let s=e.vars.PATH??"/usr/local/bin:/usr/bin:/bin";(!e._pathDirs||e._pathRaw!==s)&&(e._pathRaw=s,e._pathDirs=s.split(":"));let i=e._pathDirs;for(let o of i){if((o==="/sbin"||o==="/usr/sbin")&&n!=="root")continue;let a=`${o}/${t}`;if(r.vfs.exists(a))try{let c=r.vfs.stat(a);if(c.type!=="file"||!(c.mode&73))continue;return a}catch{}}return null}function Ga(t,e,r,n,s,i,o,a,c,l,u){let d=c.vfs.readFile(t),p=d.match(/exec\s+builtin\s+(\S+)/);if(p){let m=vt(p[1]);if(m){let h=c.users.getUid(s),g=c.users.getGid(s);return m.run({authUser:s,uid:h,gid:g,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:n,mode:o,args:r,stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: exec builtin '${p[1]}' not found`,exitCode:127}}let f=vt("sh");if(f){let m=c.users.getUid(s),h=c.users.getGid(s);return f.run({authUser:s,uid:m,gid:h,hostname:i,activeSessions:c.users.listActiveSessions(),rawInput:`sh -c ${JSON.stringify(d)}`,mode:o,args:["-c",d,"--",...r],stdin:u,cwd:a,shell:c,env:l})}return{stderr:`${e}: command not found`,exitCode:127}}function ur(t,e,r,n,s,i,o,a,c,l=!1,u){if(Dt++,Dt>rs)return Dt--,{stderr:`${t}: maximum call depth (${rs}) exceeded`,exitCode:126};let d=Dt===1,p=1,f=c.vars.NICE_PRIORITY?Number.parseInt(c.vars.NICE_PRIORITY,10):0,m=d?o.users.registerProcess(r,t,[t,...e],c.vars.__TTY??"?",u,p,Number.isNaN(f)?0:f):-1,h=Date.now();try{if(l&&u?.signal.aborted)return{stderr:"",exitCode:130};let g=D0(t,e,r,n,s,i,o,a,c);if(u){let y=new Promise(S=>{u.signal.addEventListener("abort",()=>{S({stderr:"",exitCode:130})},{once:!0})});return Promise.race([g,y])}return g}finally{Dt--,d&&m!==-1&&(o.users.addProcessCpuTime(m,Date.now()-h),l?o.users.markProcessDone(m):o.users.unregisterProcess(m))}}async function D0(t,e,r,n,s,i,o,a,c){let l=za,u=[t,...e],d=0;for(;d<u.length&&l.test(u[d]);)d+=1;if(d>0){let h=u.slice(0,d).map(S=>S.match(l)).filter(S=>S!==null),g=u.slice(d),y=[];for(let[,S,w]of h)S!==void 0&&w!==void 0&&(y.push([S,c.vars[S]]),c.vars[S]=w);if(g.length===0)return{exitCode:0};try{return await ur(g[0],g.slice(1),r,n,s,i,o,a,c)}finally{for(let[S,w]of y)w===void 0?delete c.vars[S]:c.vars[S]=w}}let p=c.vars[`__func_${t}`];if(p){let h=vt("sh");if(!h)return{stderr:`${t}: sh not available`,exitCode:127};let g={};e.forEach((y,S)=>{g[String(S+1)]=c.vars[String(S+1)],c.vars[String(S+1)]=y}),g[0]=c.vars[0],c.vars[0]=t;try{let y=o.users.getUid(r),S=o.users.getGid(r);return await h.run({authUser:r,uid:y,gid:S,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:p,mode:s,args:["-c",p],stdin:a,cwd:i,shell:o,env:c})}finally{for(let[y,S]of Object.entries(g))S===void 0?delete c.vars[y]:c.vars[y]=S}}let f=c.vars[`__alias_${t}`];if(f)return ge(`${f} ${e.join(" ")}`,r,n,s,i,o,a,c);let m=vt(t);if(!m){let h=Va(t,c,o,r);return h?Ga(h,t,e,[t,...e].join(" "),r,n,s,i,o,c,a):{stderr:`${t}: command not found`,exitCode:127}}try{let h=o.users.getUid(r),g=o.users.getGid(r);return await m.run({authUser:r,uid:h,gid:g,hostname:n,activeSessions:o.users.listActiveSessions(),rawInput:[t,...e].join(" "),mode:s,args:e,stdin:a,cwd:i,shell:o,env:c})}catch(h){return{stderr:h instanceof Error?h.message:"Command failed",exitCode:1}}}async function ge(t,e,r,n,s,i,o,a){let c=t.trim();if(c.length===0)return{exitCode:0};let l=a??pt(e,r);if(Dt++,Dt>rs)return Dt--,{stderr:`${c.split(" ")[0]}: maximum call depth (${rs}) exceeded`,exitCode:126};try{if(c==="!!"||/^!-?\d+$/.test(c)||c.startsWith("!! ")){let v=`${l.vars.HOME??`/home/${e}`}/.bash_history`;if(i.vfs.exists(v)){let _=i.vfs.readFile(v).split(`
`).filter(Boolean),x;if(c==="!!"||c.startsWith("!! "))x=_[_.length-1];else{let E=Number.parseInt(c.slice(1),10);x=E>0?_[E-1]:_[_.length+E]}if(x){let E=c.startsWith("!! ")?c.slice(3):"";return ge(`${x}${E?` ${E}`:""}`,e,r,n,s,i,o,l)}}return{stderr:`${c}: event not found`,exitCode:1}}let d=pn(c)[0]?.toLowerCase()??"",p=l.vars[`__alias_${d}`],f=p?c.replace(d,p):c,m=$0.test(f)||M0.test(f)||k0.test(f)||N0.test(f)||A0.test(f)||T0.test(f),h=O0.test(f)||R0.test(f);if(m&&d!=="sh"&&d!=="bash"||h){if(m&&d!=="sh"&&d!=="bash"){let _=vt("sh");if(_){let x=i.users.getUid(e),E=i.users.getGid(e);return await _.run({authUser:e,uid:x,gid:E,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:f,mode:n,args:["-c",f],stdin:void 0,cwd:s,shell:i,env:l})}}let v=Ua(f);if(!v.isValid)return{stderr:v.error||"Syntax error",exitCode:1};try{return await ts(v.statements,e,r,n,s,i,l)}catch(_){return{stderr:_ instanceof Error?_.message:"Execution failed",exitCode:1}}}let g=await Un(f,l.vars,l.lastExitCode,v=>ge(v,e,r,n,s,i,void 0,l).then(_=>_.stdout??"")),y=pn(g.trim());if(y.length===0)return{exitCode:0};if(za.test(y[0]))return ur(y[0],y.slice(1),e,r,n,s,i,o,l);let w=y[0]?.toLowerCase()??"",b=y.slice(1),N=[];for(let v of b)for(let _ of Ln(v))for(let x of Yo(_,s,i.vfs))N.push(x);let I=vt(w);if(!I){let v=Va(w,l,i,e);return v?Ga(v,w,N,g,e,r,n,s,i,l,o):{stderr:`${w}: command not found`,exitCode:127}}try{let v=i.users.getUid(e),_=i.users.getGid(e);return await I.run({authUser:e,uid:v,gid:_,hostname:r,activeSessions:i.users.listActiveSessions(),rawInput:g,mode:n,args:N,stdin:o,cwd:s,shell:i,env:l})}catch(v){return{stderr:v instanceof Error?v.message:"Command failed",exitCode:1}}}finally{Dt--}}var za,$0,M0,k0,N0,A0,T0,O0,R0,rs,Dt,Ye=M(()=>{"use strict";La();Ba();rn();Pi();Lr();za=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/,$0=/\bfor\s+\w+\s+in\b/,M0=/\bwhile\s+/,k0=/\bif\s+/,N0=/\w+\s*\(\s*\)\s*\{/,A0=/\bfunction\s+\w+/,T0=/\(\(\s*.+\s*\)\)/,O0=/(?<![|&])[|](?![|])/,R0=/[><;&]|\|\|/;rs=8;Dt=0});var ja,Ha=M(()=>{"use strict";se();Ye();ja={name:"cd",description:"Change directory",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(r,n[0]??"~",fe(t));return ye(t,s,"cd"),e.vfs.stat(s).type!=="directory"?{stderr:`cd: not a directory: ${s}`,exitCode:1}:{nextCwd:s,exitCode:0}}}});var qa,Ya=M(()=>{"use strict";qa={name:"chage",description:"Change user password expiry information",category:"users",params:["[-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>"],run:async({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`chage: permission denied
`,exitCode:1};let n,s,i,o,a,c=!1,l;for(let p=0;p<r.length;p++){let f=r[p];if(f)if(f==="-m"){let m=r[p+1];if(!m)break;if(n=Number.parseInt(m,10),Number.isNaN(n))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};p++}else if(f==="-M"){let m=r[p+1];if(!m)break;if(s=Number.parseInt(m,10),Number.isNaN(s))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};p++}else if(f==="-W"){let m=r[p+1];if(!m)break;if(i=Number.parseInt(m,10),Number.isNaN(i))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};p++}else if(f==="-I"){let m=r[p+1];if(!m)break;if(o=Number.parseInt(m,10),Number.isNaN(o))return{stderr:`chage: invalid number '${m}'
`,exitCode:1};p++}else if(f==="-E"){let m=r[p+1];if(!m)break;if(m==="-1"||m==="99999")a=0;else if(a=Math.floor(new Date(m).getTime()/864e5),Number.isNaN(a))return{stderr:`chage: invalid date '${m}'
`,exitCode:1};p++}else f==="-l"?c=!0:l||(l=f)}if(!l)return{stderr:`Usage: chage [-m min_days|-M max_days|-W warn_days|-I inactive_days|-E expire_date|-l] <user>
`,exitCode:1};if(!e.users.listUsers().includes(l))return{stderr:`chage: user '${l}' does not exist
`,exitCode:1};if(c){let p=e.users.getPasswordAging(l);if(!p)return{stderr:`chage: user '${l}' not found
`,exitCode:1};let f=S=>S===0?"never":new Date(S*864e5).toISOString().split("T")[0],m=f(p.lastChange),h=p.maxAge===99999?"never":f(p.lastChange+p.maxAge),g=p.inactiveDays>0?f(p.lastChange+p.maxAge+p.inactiveDays):"never",y=f(p.expiryDate);return{stdout:`${[`Last password change                                    : ${m}`,`Password expires                                        : ${h}`,`Password inactive                                       : ${g}`,`Account expires                                         : ${y}`,`Minimum number of days between password change          : ${p.minAge}`,`Maximum number of days between password change          : ${p.maxAge}`,`Number of days of warning before password expires       : ${p.warnDays}`].join(`
`)}
`,exitCode:0}}let d=l;try{return await e.users.setPasswordAging(d,n,s,i,o),a!==void 0&&await e.users.setAccountExpiry(d,a),{stdout:`chage: password aging updated for '${d}'
`,exitCode:0}}catch(p){return{stderr:`${p instanceof Error?p.message:String(p)}
`,exitCode:1}}}}});function F0(t,e){let r=t.users.getGidByName(e);if(r!==null)return r;let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}var Ka,Xa=M(()=>{"use strict";se();Ka={name:"chgrp",description:"Change group ownership",category:"files",params:["<group> <file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let[s,i]=n;if(!(s&&i))return{stderr:"chgrp: missing operand",exitCode:1};if(t!=="root")return{stderr:"chgrp: changing group: Operation not permitted",exitCode:1};let o=B(r,i);try{if(ye(t,o,"chgrp"),!e.vfs.exists(o))return{stderr:`chgrp: ${i}: No such file or directory`,exitCode:1};let a=F0(e,s);if(a===null)return{stderr:`chgrp: invalid group: ${s}`,exitCode:1};let c=e.vfs.getOwner(o);return e.vfs.chown(o,c.uid,a),{exitCode:0}}catch(a){return{stderr:`chgrp: ${a instanceof Error?a.message:String(a)}`,exitCode:1}}}}});function L0(t,e){let r=/^([ugoa]*)([+\-=])([rwx]*)$/,n=e.split(","),s=t;for(let i of n){let o=i.trim().match(r);if(!o)return null;let[,a="a",c,l=""]=o,u=a===""||a==="a"?["u","g","o"]:a.split(""),d={u:{r:256,w:128,x:64},g:{r:32,w:16,x:8},o:{r:4,w:2,x:1}};for(let p of u)for(let f of l.split("")){let m=d[p]?.[f];if(m!==void 0){if(c==="+")s|=m;else if(c==="-")s&=~m;else if(c==="="){let h=Object.values(d[p]??{}).reduce((g,y)=>g|y,0);s=s&~h|m}}}}return s}var Za,Ja=M(()=>{"use strict";se();Za={name:"chmod",description:"Change file permissions",category:"files",params:["<mode> <file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s})=>{let[i,o]=n;if(!(i&&o))return{stderr:"chmod: missing operand",exitCode:1};let a=B(r,o);try{if(ye(t,a,"chmod"),!e.vfs.exists(a))return{stderr:`chmod: ${o}: No such file or directory`,exitCode:1};let c,l=Number.parseInt(i,8);if(!Number.isNaN(l)&&/^[0-7]+$/.test(i))c=l;else{let u=e.vfs.stat(a).mode,d=L0(u,i);if(d===null)return{stderr:`chmod: invalid mode: ${i}`,exitCode:1};c=d}return e.vfs.chmod(a,c,s),{exitCode:0}}catch(c){return{stderr:`chmod: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});function Qa(t,e){if(t.users.listUsers().includes(e))return t.users.getUid(e);let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}function U0(t,e){let r=t.users.getGidByName(e);if(r!==null)return r;let n=Number.parseInt(e,10);return Number.isNaN(n)?null:n}var ec,tc=M(()=>{"use strict";se();ec={name:"chown",description:"Change file owner and group",category:"files",params:["<owner>[:<group>] <file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s})=>{let[i,o]=n;if(!(i&&o))return{stderr:"chown: missing operand",exitCode:1};if(t!=="root")return{stderr:"chown: changing ownership: Operation not permitted",exitCode:1};let a=B(r,o);try{if(ye(t,a,"chown"),!e.vfs.exists(a))return{stderr:`chown: ${o}: No such file or directory`,exitCode:1};let c=null,l=null,u=i.indexOf(":");if(u===-1){if(c=Qa(e,i),c===null)return{stderr:`chown: invalid user: ${i}`,exitCode:1}}else{let p=i.slice(0,u),f=i.slice(u+1);if(p&&(c=Qa(e,p),c===null))return{stderr:`chown: invalid user: ${p}`,exitCode:1};if(f&&(l=U0(e,f),l===null))return{stderr:`chown: invalid group: ${f}`,exitCode:1}}let d=e.vfs.getOwner(a);return e.vfs.chown(a,c??d.uid,l??d.gid,s),{exitCode:0}}catch(c){return{stderr:`chown: ${c instanceof Error?c.message:String(c)}`,exitCode:1}}}}});var rc,nc=M(()=>{"use strict";rc={name:"clear",description:"Clear the terminal screen",category:"shell",params:[],run:()=>({clearScreen:!0,stdout:"",exitCode:0})}});var sc,ic=M(()=>{"use strict";sc={name:"conntrack",description:"Show/manipulate connection tracking entries",category:"network",params:["[options]"],run:({args:t,shell:e})=>{let r=e.network;if(t.includes("-L")||t.includes("--list")||t.length===0){let n=r.getConntrack();return n.length===0?{stdout:`conntrack v1.4.6 (conntrack-tools): 0 flow entries have been shown.
`,exitCode:0}:{stdout:`${r.formatConntrack()}

conntrack v1.4.6 (conntrack-tools): ${n.length} flow entries have been shown.
`,exitCode:0}}if(t.includes("-F")||t.includes("--flush"))return r.flushConntrack(),{stdout:`0 flow entries have been deleted.
`,exitCode:0};if(t.includes("-C")||t.includes("--count"))return{stdout:`${r.getConntrackCount()}
`,exitCode:0};if(t.includes("-S")||t.includes("--stats")){let n=r.getConntrackMax(),s=r.getConntrackCount();return{stdout:`cpu=0           found=${s} invalid=0 insert=0 insert_failed=0 drop=0 early_drop=0 error=0 search_restart=0
conntrack table: ${s}/${n} entries
`,exitCode:0}}if(t.includes("-E")||t.includes("--event"))return{stdout:`Listening for events...
`,exitCode:0};if(t.includes("-D")||t.includes("--delete")){let n=r.getConntrack();return n.length===0?{stderr:`conntrack: no entries to delete
`,exitCode:1}:(r.flushConntrack(),{stdout:`${n.length} flow entries have been deleted.
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
  -G, --get       Get entry`,exitCode:1}}}});var oc,ac,cc,lc,uc,dc,pc,fc,mc,hc=M(()=>{"use strict";se();oc={name:"timeout",description:"Run command with time limit",category:"shell",params:["<duration>","<command>","[args...]"],run:async({args:t,authUser:e,hostname:r,mode:n,cwd:s,shell:i,env:o,stdin:a})=>{if(t.length<2)return{stderr:"timeout: missing operand",exitCode:1};let{runCommand:c}=await Promise.resolve().then(()=>(Ye(),Wa)),l=t.slice(1).join(" ");return c(l,e,r,n,s,i,a,o)}},ac={name:"mktemp",description:"Create a temporary file or directory",category:"shell",params:["[-d]","[TEMPLATE]"],run:({args:t,shell:e,authUser:r})=>{let n=t.includes("-d"),s=t.find(d=>!d.startsWith("-"))??"tmp.XXXXXXXXXX",i=s.replace(/X+$/,"")||"tmp.",o=Math.random().toString(36).slice(2,10),a=`${i}${o}`,c=a.startsWith("/")?a:`/tmp/${a}`,l=e.users.getUid(r),u=e.users.getGid(r);try{e.vfs.exists("/tmp")||e.vfs.mkdir("/tmp",1023,0,0),n?e.vfs.mkdir(c,448,l,u):e.vfs.writeFile(c,"",{},l,u)}catch{return{stderr:`mktemp: failed to create ${n?"directory":"file"} via template '${s}'`,exitCode:1}}return{stdout:c,exitCode:0}}},cc={name:"nproc",description:"Print number of processing units",category:"system",params:["[--all]"],run:({shell:t})=>{let e=t.resourceCaps?.cpuCapCores;return{stdout:`${e!==void 0&&e>0?e:4}`,exitCode:0}}},lc={name:"wait",description:"Wait for background jobs to finish",category:"shell",params:["[job_id...]"],run:()=>({exitCode:0})},uc={name:"shuf",description:"Shuffle lines of input randomly",category:"text",params:["[-n count]","[-i lo-hi]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.indexOf("-i");if(s!==-1){let d=(t[s+1]??"").match(/^(-?\d+)-(-?\d+)$/);if(!d)return{stderr:"shuf: invalid range",exitCode:1};let p=Number.parseInt(d[1],10),f=Number.parseInt(d[2],10),m=[];for(let y=p;y<=f;y++)m.push(y);for(let y=m.length-1;y>0;y--){let S=Math.floor(Math.random()*(y+1));[m[y],m[S]]=[m[S],m[y]]}let h=t.indexOf("-n"),g=h===-1?m.length:Number.parseInt(t[h+1]??"0",10);return{stdout:m.slice(0,g).join(`
`),exitCode:0}}let i=e??"",o=t.find(u=>!u.startsWith("-"));if(o){let u=B(n??"/",o);if(!r.vfs.exists(u))return{stderr:`shuf: ${o}: No such file or directory`,exitCode:1};i=r.vfs.readFile(u)}let a=i.split(`
`).filter(u=>u!=="");for(let u=a.length-1;u>0;u--){let d=Math.floor(Math.random()*(u+1));[a[u],a[d]]=[a[d],a[u]]}let c=t.indexOf("-n"),l=c===-1?a.length:Number.parseInt(t[c+1]??"0",10);return{stdout:a.slice(0,l).join(`
`),exitCode:0}}},dc={name:"paste",description:"Merge lines of files",category:"text",params:["[-d delimiter]","file..."],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="	",i=[],o=0;for(;o<t.length;)t[o]==="-d"&&t[o+1]?(s=t[o+1],o+=2):(i.push(t[o]),o++);let a;i.length===0||i[0]==="-"?a=[(e??"").split(`
`)]:a=i.map(u=>{let d=B(n??"/",u);return r.vfs.exists(d)?r.vfs.readFile(d).split(`
`):[]});let c=Math.max(...a.map(u=>u.length)),l=[];for(let u=0;u<c;u++)l.push(a.map(d=>d[u]??"").join(s));return{stdout:l.join(`
`),exitCode:0}}},pc={name:"tac",description:"Concatenate files in reverse line order",category:"text",params:["[file...]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s="";if(t.length===0||t.length===1&&t[0]==="-")s=e??"";else for(let o of t){let a=B(n??"/",o);if(!r.vfs.exists(a))return{stderr:`tac: ${o}: No such file or directory`,exitCode:1};s+=r.vfs.readFile(a)}let i=s.split(`
`);return i[i.length-1]===""&&i.pop(),{stdout:i.reverse().join(`
`),exitCode:0}}},fc={name:"nl",description:"Number lines of files",category:"text",params:["[-ba] [-nrz] [file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.find(l=>!l.startsWith("-")),i=e??"";if(s){let l=B(n??"/",s);if(!r.vfs.exists(l))return{stderr:`nl: ${s}: No such file or directory`,exitCode:1};i=r.vfs.readFile(l)}let o=i.split(`
`);o[o.length-1]===""&&o.pop();let a=1;return{stdout:o.map(l=>l.trim()===""?`	${l}`:`${String(a++).padStart(6)}	${l}`).join(`
`),exitCode:0}}},mc={name:"column",description:"Columnate lists",category:"text",params:["[-t]","[-s sep]","[file]"],run:({args:t,stdin:e,shell:r,cwd:n})=>{let s=t.includes("-t"),i=t.indexOf("-s"),o=i===-1?/\s+/:t[i+1]??"	",a=t.find(u=>!u.startsWith("-")&&u!==t[i+1]),c=e??"";if(a){let u=B(n??"/",a);if(!r.vfs.exists(u))return{stderr:`column: ${a}: No such file or directory`,exitCode:1};c=r.vfs.readFile(u)}let l=c.split(`
`).filter(u=>u!=="");if(s){let u=l.map(f=>f.split(o)),d=[];for(let f of u)f.forEach((m,h)=>{d[h]=Math.max(d[h]??0,m.length)});return{stdout:u.map(f=>f.map((m,h)=>m.padEnd(d[h]??0)).join("  ").trimEnd()).join(`
`),exitCode:0}}return{stdout:l.join(`
`),exitCode:0}}}});import*as gc from"node:path";var yc,Sc=M(()=>{"use strict";ae();se();yc={name:"cp",description:"Copy files or directories",category:"files",params:["[-r] <source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{let o=K(n,["-r","-R","--recursive"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"cp: missing operand",exitCode:1};let u=B(r,c),d=B(r,l);try{if(He(e.vfs,e.users,t,u,4),He(e.vfs,e.users,t,gc.posix.dirname(d),2),!e.vfs.exists(u))return{stderr:`cp: ${c}: No such file or directory`,exitCode:1};if(e.vfs.stat(u).type==="directory"){if(!o)return{stderr:`cp: ${c}: is a directory (use -r)`,exitCode:1};let f=(h,g)=>{e.vfs.mkdir(g,493,s,i);for(let y of e.vfs.list(h)){let S=`${h}/${y}`,w=`${g}/${y}`;if(e.vfs.stat(S).type==="directory")f(S,w);else{let N=e.vfs.readFileRaw(S);e.vfs.writeFile(w,N,{},s,i)}}},m=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d;f(u,m)}else{let f=e.vfs.exists(d)&&e.vfs.stat(d).type==="directory"?`${d}/${c.split("/").pop()}`:d,m=e.vfs.readFileRaw(u);e.vfs.writeFile(f,m,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`cp: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}}});var bc,_c=M(()=>{"use strict";ae();se();bc={name:"curl",description:"Transfer data from or to a server (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ne(r,{flagsWithValue:["-o","--output","-X","--request","-d","--data","-H","--header","-u","--user"]});if(K(r,["--help","-h"]))return{stdout:["Usage: curl [options] <url>","  -o, --output <file>    Write to file","  -X, --request <method> HTTP method","  -d, --data <data>      POST data","  -H, --header <hdr>     Extra header","  -s, --silent           Silent mode","  -I, --head             Fetch headers only","  -L, --location         Follow redirects","  -v, --verbose          Verbose"].join(`
`),exitCode:0};let c=a.find(v=>!v.startsWith("-"));if(!c)return{stderr:"curl: no URL specified",exitCode:1};let l=o.get("-o")??o.get("--output")??null,u=(o.get("-X")??o.get("--request")??"GET").toUpperCase(),d=o.get("-d")??o.get("--data")??null,p=o.get("-H")??o.get("--header")??null,f=K(r,["-s","--silent"]),m=K(r,["-I","--head"]),h=K(r,["-L","--location"]),g=K(r,["-v","--verbose"]),y={"User-Agent":"curl/7.88.1"};if(p){let v=p.indexOf(":");v!==-1&&(y[p.slice(0,v).trim()]=p.slice(v+1).trim())}let S=d&&u==="GET"?"POST":u,w={method:S,headers:y,redirect:h?"follow":"manual"};d&&(y["Content-Type"]??="application/x-www-form-urlencoded",w.body=d);let b=[];g&&(b.push(`* Trying ${c}...`,"* Connected"),b.push(`> ${S} / HTTP/1.1`,`> Host: ${new URL(c).host}`));let N;try{let v=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`,_=new URL(v),x=_.port?Number.parseInt(_.port,10):_.protocol==="https:"?443:80,E=n.network.checkFirewall("OUTPUT","tcp",void 0,_.hostname,x);if(E==="DROP"||E==="REJECT")return{stderr:`curl: (7) Failed to connect to ${_.hostname} port ${x}: Connection refused`,exitCode:7};N=await fetch(v,w)}catch(v){return{stderr:`curl: (6) Could not resolve host: ${v instanceof Error?v.message:String(v)}`,exitCode:6}}if(g&&b.push(`< HTTP/1.1 ${N.status} ${N.statusText}`),m){let v=[`HTTP/1.1 ${N.status} ${N.statusText}`];for(let[_,x]of N.headers.entries())v.push(`${_}: ${x}`);return{stdout:`${v.join(`\r
`)}\r
`,exitCode:0}}let I;try{I=await N.text()}catch{return{stderr:"curl: failed to read response body",exitCode:1}}if(l){let v=B(e,l);return ye(t,v,"curl"),n.vfs.writeFile(v,I,{},s,i),f||b.push(`  % Total    % Received
100 ${I.length}  100 ${I.length}`),{stderr:b.join(`
`)||void 0,exitCode:N.ok?0:22}}return{stdout:I,stderr:b.length>0?b.join(`
`):void 0,exitCode:N.ok?0:22}}}});var vc,wc=M(()=>{"use strict";ae();vc={name:"cut",description:"Remove sections from lines",category:"text",params:["-d <delim> -f <fields> [file]"],run:({args:t,stdin:e})=>{let r=ir(t,["-d"])??"	",s=(ir(t,["-f"])??"1").split(",").map(a=>{let[c,l]=a.split("-").map(Number);return l===void 0?{from:(c??1)-1,to:(c??1)-1}:{from:(c??1)-1,to:l-1}});return{stdout:(e??"").split(`
`).map(a=>{let c=a.split(r),l=[];for(let u of s)for(let d=u.from;d<=Math.min(u.to,c.length-1);d++)l.push(c[d]??"");return l.join(r)}).join(`
`),exitCode:0}}}});var xc,Cc=M(()=>{"use strict";xc={name:"date",description:"Print current date and time",category:"system",params:["[+format]"],run:({args:t})=>{let e=new Date,r=t[0];return r?.startsWith("+")?{stdout:r.slice(1).replace("%Y",String(e.getFullYear())).replace("%m",String(e.getMonth()+1).padStart(2,"0")).replace("%d",String(e.getDate()).padStart(2,"0")).replace("%H",String(e.getHours()).padStart(2,"0")).replace("%M",String(e.getMinutes()).padStart(2,"0")).replace("%S",String(e.getSeconds()).padStart(2,"0")).replace("%s",String(Math.floor(e.getTime()/1e3))),exitCode:0}:{stdout:e.toString(),exitCode:0}}}});var Ic,Pc=M(()=>{"use strict";se();Ic={name:"dd",description:"Convert and copy a file",category:"files",params:["if=<file> of=<file> [bs=1024] [count=N]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i={};for(let b of r){let N=b.indexOf("=");N!==-1&&(i[b.slice(0,N)]=b.slice(N+1))}let o=i.if?B(e,i.if):void 0,a=i.of?B(e,i.of):void 0;if(!(o&&a))return{stderr:`dd: missing 'if' or 'of' operand
`,exitCode:1};if(!t.vfs.exists(o))return{stderr:`dd: ${i.if}: No such file or directory
`,exitCode:1};let c=Number.parseInt(i.bs||"512",10),l=t.vfs.readFile(o,n,s),u=Number.parseInt(i.skip||"0",10),d=Number.parseInt(i.seek||"0",10),p=i.count===void 0?void 0:Number.parseInt(i.count,10),f=u*c,m=l.slice(f),h=p===void 0?m.length:Math.min(m.length,p*c),g=m.slice(0,h),y;try{y=t.vfs.readFile(a,n,s)}catch{y=""}let S=d*c;S>0?(y.length<S&&(y=y.padEnd(S,"\0")),y=y.slice(0,S)+g+y.slice(S+g.length)):y=g,t.vfs.writeFile(a,y,{},n,s);let w=Math.ceil(g.length/c);return{stdout:`${w}+0 records in
${w}+0 records out
`,exitCode:0}}}});var Ec,$c=M(()=>{"use strict";ae();Ec={name:"declare",aliases:["local","typeset"],description:"Declare variables and give them attributes",category:"shell",params:["[-i] [-r] [-x] [-a] [name[=value]...]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=K(t,["-i"]);if(t.filter(i=>!i.startsWith("-")).length===0)return{stdout:Object.entries(e.vars).map(([o,a])=>`declare -- ${o}="${a}"`).join(`
`),exitCode:0};let s=t.filter(i=>!i.startsWith("-"));for(let i of s){let o=i.indexOf("=");if(o===-1)i in e.vars||(e.vars[i]="");else{let a=i.slice(0,o),c=i.slice(o+1);if(r){let l=Number.parseInt(c,10);c=Number.isNaN(l)?"0":String(l)}e.vars[a]=c}}return{exitCode:0}}}});var Mc,kc=M(()=>{"use strict";Mc={name:"deluser",description:"Delete a user",category:"users",params:["[-f] <username>"],run:({authUser:t,args:e,shell:r})=>{if(t!=="root")return{stderr:`deluser: permission denied
`,exitCode:1};let n=e.includes("-f")||e.includes("--force")||e.includes("-y"),s=e.find(o=>!o.startsWith("-"));if(!s)return{stderr:`Usage: deluser [-f] <username>
`,exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`deluser: user '${s}' does not exist
`,exitCode:1};if(s==="root")return{stderr:`deluser: cannot remove the root account
`,exitCode:1};if(n)return r.users.deleteUser(s),{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0};let i=(o,a)=>o.trim()!==s?Promise.resolve({result:{stderr:`deluser: confirmation did not match \u2014 user not deleted
`,exitCode:1}}):(a.users.deleteUser(s),Promise.resolve({result:{stdout:`Removing user '${s}' ...
deluser: done.
`,exitCode:0}}));return{sudoChallenge:{username:s,targetUser:s,commandLine:null,loginShell:!1,prompt:`Warning: deleting user '${s}'.
Type the username to confirm: `,mode:"confirm",onPassword:i},exitCode:0}}}});var Nc,Ac=M(()=>{"use strict";Nc={name:"df",description:"Report filesystem disk space usage",category:"system",params:["[-h]"],run:({shell:t})=>{let r=(t.vfs.getUsageBytes()/1024).toFixed(0),n="1048576",s=String(Number(n)-Number(r)),i=Math.round(Number(r)/Number(n)*100),o="Filesystem     1K-blocks    Used Available Use% Mounted on",a=`virtual-fs     ${n.padStart(9)} ${r.padStart(7)} ${s.padStart(9)} ${i}% /`;return{stdout:`${o}
${a}`,exitCode:0}}}});var Tc,Oc=M(()=>{"use strict";se();Tc={name:"diff",description:"Compare files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let[n,s]=r;if(!(n&&s))return{stderr:"diff: missing operand",exitCode:1};let i=B(e,n),o=B(e,s),a,c;try{a=t.vfs.readFile(i).split(`
`)}catch{return{stderr:`diff: ${n}: No such file or directory`,exitCode:2}}try{c=t.vfs.readFile(o).split(`
`)}catch{return{stderr:`diff: ${s}: No such file or directory`,exitCode:2}}let l=[],u=Math.max(a.length,c.length);for(let d=0;d<u;d++){let p=a[d],f=c[d];p!==f&&(p!==void 0&&l.push(`< ${p}`),f!==void 0&&l.push(`> ${f}`))}return{stdout:l.join(`
`),exitCode:l.length>0?1:0}}}});var Rc,Dc,Fc=M(()=>{"use strict";ae();se();Rc={name:"dpkg",description:"Fortune GNU/Linux package manager low-level tool",category:"package",params:["[-l] [-s pkg] [-L pkg] [-i pkg] [--remove pkg]"],run:({args:t,authUser:e,shell:r})=>{let n=xr(r);if(!n)return{stderr:"dpkg: package manager not initialised",exitCode:1};let s=K(t,["-l","--list"]),i=K(t,["-s","--status"]),o=K(t,["-L","--listfiles"]),a=K(t,["-r","--remove"]),c=K(t,["-P","--purge"]),{positionals:l}=Ne(t,{flags:["-l","--list","-s","--status","-L","--listfiles","-r","--remove","-P","--purge"]});if(s){let u=n.listInstalled();if(u.length===0)return{stdout:["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================","(no packages installed)"].join(`
`),exitCode:0};let d=["Desired=Unknown/Install/Remove/Purge/Hold","|Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend","|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)","||/ Name           Version         Architecture Description","+++-==============-===============-============-========================================"],p=u.map(f=>{let m=f.name.padEnd(14).slice(0,14),h=f.version.padEnd(15).slice(0,15),g=f.architecture.padEnd(12).slice(0,12),y=(f.description||"").slice(0,40);return`ii  ${m} ${h} ${g} ${y}`});return{stdout:[...d,...p].join(`
`),exitCode:0}}if(i){let u=l[0];if(!u)return{stderr:"dpkg: -s needs a package name",exitCode:1};let d=n.show(u);return d?{stdout:d,exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed and no information is available`,exitCode:1}}if(o){let u=l[0];if(!u)return{stderr:"dpkg: -L needs a package name",exitCode:1};let d=n.listInstalled().find(p=>p.name===u);return d?d.files.length===0?{stdout:"/.keep",exitCode:0}:{stdout:d.files.join(`
`),exitCode:0}:{stderr:`dpkg-query: package '${u}' is not installed`,exitCode:1}}if(a||c){if(e!=="root")return{stderr:"dpkg: error: requested operation requires superuser privilege",exitCode:2};if(l.length===0)return{stderr:"dpkg: error: need an action option",exitCode:2};let{output:u,exitCode:d}=n.remove(l,{purge:c});return{stdout:u||void 0,exitCode:d}}return{stdout:["Usage: dpkg [<option>...] <command>","","Commands:","  -l, --list                  List packages matching given pattern","  -s, --status <pkg>...       Report status of specified package","  -L, --listfiles <pkg>...    List files owned by package","  -r, --remove <pkg>...       Remove <pkg> but leave its configuration","  -P, --purge <pkg>...        Remove <pkg> and its configuration"].join(`
`),exitCode:0}}},Dc={name:"dpkg-query",description:"Show information about installed packages",category:"package",params:["-W [pkg] | -l [pattern]"],run:({args:t,shell:e})=>{let r=xr(e);if(!r)return{stderr:"dpkg-query: package manager not initialised",exitCode:1};let n=K(t,["-l"]),s=K(t,["-W","--show"]),{positionals:i}=Ne(t,{flags:["-l","-W","--show"]});if(n||s){let o=r.listInstalled(),a=i[0],c=a?o.filter(u=>u.name.includes(a)):o;return s?{stdout:c.map(u=>`${u.name}	${u.version}`).join(`
`),exitCode:0}:{stdout:c.map(u=>{let d=u.name.padEnd(14).slice(0,14),p=u.version.padEnd(15).slice(0,15);return`ii  ${d} ${p} amd64 ${(u.description||"").slice(0,40)}`}).join(`
`)||"(no packages match)",exitCode:0}}return{stderr:"dpkg-query: need a flag (-l, -W)",exitCode:1}}}});var Lc,Uc=M(()=>{"use strict";ae();se();Lc={name:"du",description:"Estimate file space usage",category:"system",params:["[-h] [-s] [path]"],run:({shell:t,cwd:e,args:r})=>{let n=K(r,["-h"]),s=K(r,["-s"]),i=r.find(u=>!u.startsWith("-"))??".",o=B(e,i),a=u=>n?`${(u/1024).toFixed(1)}K`:String(Math.ceil(u/1024));if(!t.vfs.exists(o))return{stderr:`du: ${i}: No such file or directory`,exitCode:1};if(s||t.vfs.stat(o).type==="file")return{stdout:`${a(t.vfs.getUsageBytes(o))}	${i}`,exitCode:0};let c=[],l=(u,d)=>{let p=0;for(let f of t.vfs.list(u)){let m=`${u}/${f}`,h=`${d}/${f}`,g=t.vfs.stat(m);g.type==="directory"?p+=l(m,h):g.type==="device"?(p+=0,s||c.push(`0	${h}`)):(p+=g.size,s||c.push(`${a(g.size)}	${h}`))}return c.push(`${a(p)}	${d}`),p};return l(o,i),{stdout:c.join(`
`),exitCode:0}}}});function B0(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\a/g,"\x07").replace(/\\b/g,"\b").replace(/\\f/g,"\f").replace(/\\v/g,"\v").replace(/\\0(\d{1,3})/g,(e,r)=>String.fromCharCode(Number.parseInt(r,8)))}var Bc,zc=M(()=>{"use strict";ae();rn();Bc={name:"echo",description:"Display text",category:"shell",params:["[-n] [-e] [text...]"],run:({args:t,stdin:e,env:r})=>{let{flags:n,positionals:s}=Ne(t,{flags:["-n","-e","-E"]}),i=n.has("-n"),o=n.has("-e"),a=s.length>0?s.join(" "):e??"",c=Fn(a,r?.vars??{},r?.lastExitCode??0),l=o?B0(c):c;return{stdout:i?l:`${l}
`,exitCode:0}}}});var Vc,Gc=M(()=>{"use strict";Vc={name:"env",description:"Print environment variables",category:"shell",params:[],run:({env:t,authUser:e})=>{let r={...t.vars,USER:e,HOME:`/home/${e}`};return{stdout:Object.entries(r).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0}}}});var Wc,jc=M(()=>{"use strict";Wc={name:"exit",aliases:["bye","logout"],description:"Exit the shell session",category:"shell",params:["[code]"],run:({args:t})=>({closeSession:!0,exitCode:Number.parseInt(t[0]??"0",10)||0})}});var Hc,qc=M(()=>{"use strict";Hc={name:"export",description:"Set shell environment variable",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0||t.length===1&&t[0]==="-p"){let r=Object.entries(e.vars).filter(([n])=>n&&/^[A-Za-z_][A-Za-z0-9_]*$/.test(n)).map(([n,s])=>`declare -x ${n}="${s}"`).join(`
`);return{stdout:r?`${r}
`:"",exitCode:0}}for(let r of t.filter(n=>n!=="-p"))if(r.includes("=")){let n=r.indexOf("="),s=r.slice(0,n),i=r.slice(n+1);e.vars[s]=i}return{exitCode:0}}}});var Yc,Kc=M(()=>{"use strict";Yc={name:"expr",description:"Evaluate expressions",category:"shell",params:["<expression>"],run:({args:t})=>{let e=t.indexOf(":");if(e>0&&e<=t.length-2){let r=t[e-1],n=t[e+1];try{let s=new RegExp(n),i=r.match(s);return i&&i.index!==void 0?{stdout:`${i[0].length}
`,exitCode:0}:{stdout:`0
`,exitCode:1}}catch{return{stderr:`expr: invalid regex
`,exitCode:2}}}if(t.length>=3){let r=Number.parseInt(t[0],10),n=t[1],s=Number.parseInt(t[2],10);if(Number.isNaN(r)||Number.isNaN(s))return{stderr:`expr: non-integer argument
`,exitCode:1};let i;switch(n){case"+":i=r+s;break;case"-":i=r-s;break;case"*":i=r*s;break;case"/":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=Math.trunc(r/s);break;case"%":if(s===0)return{stderr:`expr: division by zero
`,exitCode:2};i=r%s;break;default:return{stderr:`expr: syntax error
`,exitCode:2}}return{stdout:`${i}
`,exitCode:0}}return{stderr:`expr: syntax error
`,exitCode:2}}}});var z0,Xc,Zc=M(()=>{"use strict";se();z0=[[t=>t.startsWith("\x7FELF"),"ELF 64-bit LSB executable, x86-64"],[/^#!\/bin\/sh/,"POSIX shell script, ASCII text executable"],[/^#!\/bin\/bash/,"Bourne-Again shell script, ASCII text executable"],[/^#!\/usr\/bin\/env (node|bun)/,"Node.js script, ASCII text executable"],[/^#!\/usr\/bin\/env python/,"Python script, ASCII text executable"],[/^\x89PNG/,"PNG image data"],[/^GIF8/,"GIF image data"],[/^\xff\xd8\xff/,"JPEG image data"],[/^PK\x03\x04/,"Zip archive data"],[/^\x1f\x8b/,"gzip compressed data"],[t=>t.trimStart().startsWith("{")||t.trimStart().startsWith("["),"JSON data"],[/^<\?xml/,"XML document, ASCII text"],[/^<!DOCTYPE html/i,"HTML document, ASCII text"],[/^[^\x00-\x08\x0e-\x1f\x7f-\x9f]*$/,"ASCII text"]],Xc={name:"file",description:"Determine file type",category:"files",params:["<file>..."],run:({args:t,cwd:e,shell:r})=>{if(!t.length)return{stderr:"file: missing operand",exitCode:1};let n=[],s=0;for(let i of t){let o=B(e,i);if(!r.vfs.exists(o)){n.push(`${i}: ERROR: No such file or directory`),s=1;continue}if(r.vfs.stat(o).type==="directory"){n.push(`${i}: directory`);continue}let c=r.vfs.readFile(o),l="data";for(let[u,d]of z0)if(typeof u=="function"?u(c):u.test(c)){l=d;break}n.push(`${i}: ${l}`)}return{stdout:n.join(`
`),exitCode:s}}}});var Jc,Qc=M(()=>{"use strict";Js();se();Ye();Jc={name:"find",description:"Search for files",category:"files",params:["[path] [expression...]"],run:async({authUser:t,shell:e,cwd:r,args:n,env:s,hostname:i,mode:o})=>{let a=[],c=0;for(;c<n.length&&!n[c].startsWith("-")&&n[c]!=="!"&&n[c]!=="(";)a.push(n[c]),c++;a.length===0&&a.push(".");let l=n.slice(c),u=Number.POSITIVE_INFINITY,d=0,p=[];function f(I,v){return m(I,v)}function m(I,v){let[_,x]=h(I,v);for(;I[x]==="-o"||I[x]==="-or";){x++;let[E,D]=h(I,x);_={type:"or",left:_,right:E},x=D}return[_,x]}function h(I,v){let[_,x]=g(I,v);for(;x<I.length&&I[x]!=="-o"&&I[x]!=="-or"&&I[x]!==")"&&((I[x]==="-a"||I[x]==="-and")&&x++,!(x>=I.length||I[x]==="-o"||I[x]===")"));){let[E,D]=g(I,x);_={type:"and",left:_,right:E},x=D}return[_,x]}function g(I,v){if(I[v]==="!"||I[v]==="-not"){let[_,x]=y(I,v+1);return[{type:"not",pred:_},x]}return y(I,v)}function y(I,v){let _=I[v];if(!_)return[{type:"true"},v];if(_==="("){let[x,E]=f(I,v+1),D=I[E]===")"?E+1:E;return[x,D]}if(_==="-name")return[{type:"name",pat:I[v+1]??"*",ignoreCase:!1},v+2];if(_==="-iname")return[{type:"name",pat:I[v+1]??"*",ignoreCase:!0},v+2];if(_==="-type")return[{type:"type",t:I[v+1]??"f"},v+2];if(_==="-maxdepth")return u=Number.parseInt(I[v+1]??"0",10),[{type:"true"},v+2];if(_==="-mindepth")return d=Number.parseInt(I[v+1]??"0",10),[{type:"true"},v+2];if(_==="-empty")return[{type:"empty"},v+1];if(_==="-print"||_==="-print0")return[{type:"print"},v+1];if(_==="-true")return[{type:"true"},v+1];if(_==="-false")return[{type:"false"},v+1];if(_==="-size"){let x=I[v+1]??"0",E=x.slice(-1);return[{type:"size",n:Number.parseInt(x,10),unit:E},v+2]}if(_==="-exec"||_==="-execdir"){let x=_==="-execdir",E=[],D=v+1;for(;D<I.length&&I[D]!==";";)E.push(I[D]),D++;return p.push({cmd:E,useDir:x}),[{type:"exec",cmd:E,useDir:x},D+1]}return[{type:"true"},v+1]}let S=l.length>0?f(l,0)[0]:{type:"true"};function w(I,v,_){switch(I.type){case"true":return!0;case"false":return!1;case"not":return!w(I.pred,v,_);case"and":return w(I.left,v,_)&&w(I.right,v,_);case"or":return w(I.left,v,_)||w(I.right,v,_);case"name":{let x=v.split("/").pop()??"";return Dn(I.pat,I.ignoreCase?"i":"").test(x)}case"type":{try{let x=e.vfs.stat(v);if(I.t==="f")return x.type==="file";if(I.t==="d")return x.type==="directory";if(I.t==="l")return!1}catch{return!1}return!1}case"empty":try{return e.vfs.stat(v).type==="directory"?e.vfs.list(v).length===0:e.vfs.readFile(v).length===0}catch{return!1}case"size":try{let E=e.vfs.readFile(v).length,D=I.unit,T=E;return D==="k"||D==="K"?T=Math.ceil(E/1024):D==="M"?T=Math.ceil(E/(1024*1024)):D==="c"&&(T=E),T===I.n}catch{return!1}case"print":return!0;case"exec":return!0;default:return!0}}let b=[];function N(I,v,_){if(_>u)return;try{ye(t,I,"find")}catch{return}_>=d&&w(S,I,_)&&b.push(v);let x;try{x=e.vfs.stat(I)}catch{return}if(x.type==="directory"&&_<u)for(let E of e.vfs.list(I))N(`${I}/${E}`,`${v}/${E}`,_+1)}for(let I of a){let v=B(r,I);if(!e.vfs.exists(v))return{stderr:`find: '${I}': No such file or directory`,exitCode:1};N(v,I==="."?".":I,0)}if(p.length>0&&b.length>0){let I=[];for(let{cmd:v}of p)for(let _ of b){let E=v.map(T=>T==="{}"?_:T).map(T=>T.includes(" ")?`"${T}"`:T).join(" "),D=await ge(E,t,i,o,r,e,void 0,s);D.stdout&&I.push(D.stdout.replace(/\n$/,"")),D.stderr&&I.push(D.stderr.replace(/\n$/,""))}return I.length>0?{stdout:`${I.join(`
`)}
`,exitCode:0}:{exitCode:0}}return{stdout:b.join(`
`)+(b.length>0?`
`:""),exitCode:0}}}});import*as ns from"node:os";var el,tl=M(()=>{"use strict";ae();el={name:"free",description:"Display amount of free and used memory",category:"system",params:["[-h] [-m] [-g]"],run:({args:t,shell:e})=>{let r=K(t,["-h","--human"]),n=K(t,["-m"]),s=K(t,["-g"]),i=ns.totalmem(),o=ns.freemem(),a=e.resourceCaps?.ramCapBytes,c=a===void 0?i:Math.min(i,a),l=a===void 0?o:Math.floor(c*(o/i)),u=c-l,d=Math.floor(c*.02),p=Math.floor(c*.05),f=Math.floor(l*.95),m=Math.floor(c*.5),h=w=>r?w>=1024*1024*1024?`${(w/(1024*1024*1024)).toFixed(1)}G`:w>=1024*1024?`${(w/(1024*1024)).toFixed(1)}M`:`${(w/1024).toFixed(1)}K`:String(Math.floor(s?w/(1024*1024*1024):n?w/(1024*1024):w/1024)),g="               total        used        free      shared  buff/cache   available",y=`Mem:  ${h(c).padStart(12)} ${h(u).padStart(11)} ${h(l).padStart(11)} ${h(d).padStart(11)} ${h(p).padStart(11)} ${h(f).padStart(11)}`,S=`Swap: ${h(m).padStart(12)} ${h(0).padStart(11)} ${h(m).padStart(11)}`;return{stdout:[g,y,S].join(`
`),exitCode:0}}}});function il(t,e=!1){let r=t.split(`
`),n=Math.max(...r.map(o=>o.length)),s=r.length===1?`< ${r[0]} >`:r.map((o,a)=>{let c=" ".repeat(n-o.length);return a===0?`/ ${o}${c} \\`:a===r.length-1?`\\ ${o}${c} /`:`| ${o}${c} |`}).join(`
`),i=e?"xx":"oo";return[` ${"_".repeat(n+2)}`,`( ${s} )`,` ${"\u203E".repeat(n+2)}`,"        \\   ^__^",`         \\  (${i})\\_______`,"            (__)\\       )\\/\\","                ||----w |","                ||     ||"].join(`
`)}var nl,rl,sl,ol,al,cl,V0,ll,ul=M(()=>{"use strict";nl={name:"yes",description:"Output a string repeatedly until killed",category:"misc",params:["[string]"],run:({args:t})=>{let e=t.length?t.join(" "):"y";return{stdout:new Array(200).fill(e).join(`
`),exitCode:0}}},rl=["The best way to predict the future is to invent it. \u2014 Alan Kay","Any sufficiently advanced technology is indistinguishable from magic. \u2014 Arthur C. Clarke","Talk is cheap. Show me the code. \u2014 Linus Torvalds","Programs must be written for people to read, and only incidentally for machines to execute. \u2014 Harold Abelson","Debugging is twice as hard as writing the code in the first place. \u2014 Brian W. Kernighan","The most powerful tool we have as developers is automation. \u2014 Scott Hanselman","First, solve the problem. Then, write the code. \u2014 John Johnson","Make it work, make it right, make it fast. \u2014 Kent Beck","The function of good software is to make the complex appear simple. \u2014 Grady Booch","Premature optimization is the root of all evil. \u2014 Donald Knuth","There are only two hard things in Computer Science: cache invalidation and naming things. \u2014 Phil Karlton","The best code is no code at all. \u2014 Jeff Atwood","Linux is only free if your time has no value. \u2014 Jamie Zawinski","Software is like sex: it's better when it's free. \u2014 Linus Torvalds","Real programmers don't comment their code. If it was hard to write, it should be hard to understand.","It's not a bug \u2014 it's an undocumented feature.","The cloud is just someone else's computer.","There's no place like 127.0.0.1","sudo make me a sandwich.","To understand recursion, you must first understand recursion."],sl={name:"fortune",description:"Print a random adage",category:"misc",params:[],run:()=>{let t=Math.floor(Math.random()*rl.length);return{stdout:rl[t]??"No fortunes today.",exitCode:0}}};ol={name:"cowsay",description:"Generate ASCII cow with message",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Moo.";return{stdout:il(r),exitCode:0}}},al={name:"cowthink",description:"Generate ASCII cow thinking",category:"misc",params:["[message]"],run:({args:t,stdin:e})=>{let r=t.length?t.join(" "):e?.trim()??"Hmm...";return{stdout:il(r).replace(/\\\s*\^__\^/,"o   ^__^").replace(/\\\s*\(oo\)/,"o  (oo)"),exitCode:0}}},cl={name:"cmatrix",description:"Show falling characters like the Matrix",category:"misc",params:[],run:()=>{let r="\uFF8A\uFF90\uFF8B\uFF70\uFF73\uFF7C\uFF85\uFF93\uFF86\uFF7B\uFF9C\uFF82\uFF75\uFF98\uFF71\uFF8E\uFF83\uFF8F\uFF79\uFF92\uFF74\uFF76\uFF77\uFF91\uFF95\uFF97\uFF7E\uFF88\uFF7D\uFF80\uFF87\uFF8D01234567890ABCDEF",n="\x1B[32m",s="\x1B[1;32m",i="\x1B[0m",o=[];for(let a=0;a<24;a++){let c="";for(let l=0;l<80;l++){let u=r[Math.floor(Math.random()*r.length)];Math.random()<.05?c+=s+u+i:Math.random()<.7?c+=n+u+i:c+=" "}o.push(c)}return{stdout:`\x1B[2J\x1B[H${o.join(`
`)}
${i}[cmatrix: press Ctrl+C to exit]`,exitCode:0}}},V0=["      ====        ________                ___________      ","  _D _|  |_______/        \\__I_I_____===__|_________|      ","   |(_)---  |   H\\________/ |   |        =|___ ___|      ___","   /     |  |   H  |  |     |   |         ||_| |_||     _|  |_","  |      |  |   H  |__--------------------| [___] |   =|        |","  | ________|___H__/__|_____/[][]~\\_______|       |   -|   __   |","  |/ |   |-----------I_____I [][] []  D   |=======|____|__|  |_|_|","__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|   |___|o  |"," |/-=|___|=    ||    ||    ||    |_____/~\\___/          |___|   |_|","  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/                       |"],ll={name:"sl",description:"Steam Locomotive \u2014 you have sl",category:"misc",params:[],run:()=>({stdout:`

${V0.join(`
`)}

        choo choo! \u{1F682}
`,exitCode:0})}});var dl,pl=M(()=>{"use strict";dl={name:"getent",description:"Query user/group database",category:"system",params:["passwd|group [key]"],run:({shell:t,args:e})=>{let r=e[0],n=e[1];if(!r)return{stderr:`Usage: getent passwd|group [key]
`,exitCode:1};if(r==="passwd"){let i=t.users.listUsers().filter(o=>!n||o===n).map(o=>{let a=t.users.getUid(o),c=t.users.getGid(o),l=o==="root"?"/root":`/home/${o}`;return`${o}:x:${a}:${c}::${l}:/bin/bash`});return n&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}if(r==="group"){let i=t.users.listGroups().filter(o=>!n||o.name===n).map(o=>`${o.name}:x:${o.gid}:${o.members.join(",")}`);return n&&i.length===0?{exitCode:2}:{stdout:`${i.join(`
`)}
`,exitCode:0}}return{stderr:`getent: unknown database '${r}'
`,exitCode:1}}}});var fl,ml=M(()=>{"use strict";fl={name:"gpasswd",description:"Administer /etc/group",category:"users",params:["[-a|-d] -G group user"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`gpasswd: permission denied
`,exitCode:1};let n,s,i;for(let a=0;a<r.length;a++)r[a]==="-a"?n="add":r[a]==="-d"?n="delete":r[a]==="-G"&&r[a+1]?(s=r[a+1],a++):i||(i=r[a]);if(!(n&&s&&i))return{stderr:`Usage: gpasswd -a|-d -G group user
`,exitCode:1};if(!e.users.listUsers().includes(i))return{stderr:`gpasswd: user '${i}' does not exist
`,exitCode:1};if(!e.users.getGroup(s))return{stderr:`gpasswd: group '${s}' does not exist
`,exitCode:1};try{return n==="add"?(e.users.addGroupMember(s,i),{stdout:`gpasswd: added '${i}' to group '${s}'
`,exitCode:0}):(e.users.removeGroupMember(s,i),{stdout:`gpasswd: removed '${i}' from group '${s}'
`,exitCode:0})}catch(a){return{stderr:`${a instanceof Error?a.message:String(a)}
`,exitCode:1}}}}});var hl,gl=M(()=>{"use strict";ae();se();hl={name:"grep",description:"Search text patterns",category:"text",params:["[-i] [-v] [-n] [-r] <pattern> [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let{flags:i,positionals:o}=Ne(n,{flags:["-i","-v","-n","-r","-c","-l","-L","-q","--quiet","--silent"]}),a=i.has("-i"),c=i.has("-v"),l=i.has("-n"),u=i.has("-r"),d=i.has("-c"),p=i.has("-l"),f=i.has("-q")||i.has("--quiet")||i.has("--silent"),m=o[0],h=o.slice(1);if(!m)return{stderr:"grep: no pattern specified",exitCode:1};let g;try{let b=a?"mi":"m";g=new RegExp(m,b)}catch{return{stderr:`grep: invalid regex: ${m}`,exitCode:1}}let y=(b,N="")=>{let I=b.split(`
`),v=[];for(let _=0;_<I.length;_++){let x=I[_]??"",E=g.test(x);if(c?!E:E){let T=l?`${_+1}:`:"";v.push(`${N}${T}${x}`)}}return v},S=b=>{if(!e.vfs.exists(b))return[];if(e.vfs.stat(b).type==="file")return[b];if(!u)return[];let I=[],v=_=>{for(let x of e.vfs.list(_)){let E=`${_}/${x}`;e.vfs.stat(E).type==="file"?I.push(E):v(E)}};return v(b),I},w=[];if(h.length===0){if(!s)return{stdout:"",exitCode:1};let b=y(s);if(d)return{stdout:`${b.length}
`,exitCode:b.length>0?0:1};if(f)return{exitCode:b.length>0?0:1};w.push(...b)}else{let b=h.flatMap(N=>{let I=B(r,N);return S(I).map(v=>({file:N,path:v}))});for(let{file:N,path:I}of b)try{ye(t,I,"grep");let v=e.vfs.readFile(I),_=b.length>1?`${N}:`:"",x=y(v,_);d?w.push(b.length>1?`${N}:${x.length}`:String(x.length)):p?x.length>0&&w.push(N):w.push(...x)}catch{return{stderr:`grep: ${N}: No such file or directory`,exitCode:1}}}return{stdout:w.length>0?`${w.join(`
`)}
`:"",exitCode:w.length>0?0:1}}}});var yl,Sl=M(()=>{"use strict";yl={name:"groupadd",description:"Create a new group",category:"users",params:["[-g GID] <group>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`groupadd: permission denied
`,exitCode:1};let n,s;for(let i=0;i<r.length;i++)if(r[i]==="-g"){let o=r[i+1];if(!o)break;if(n=Number.parseInt(o,10),Number.isNaN(n)||n<0)return{stderr:`groupadd: invalid GID '${o}'
`,exitCode:1};i++}else s||(s=r[i]);if(!s)return{stderr:`Usage: groupadd [-g GID] <group>
`,exitCode:1};try{return e.users.createGroup(s,n),{stdout:`groupadd: group '${s}' created
`,exitCode:0}}catch(i){return{stderr:`${i instanceof Error?i.message:String(i)}
`,exitCode:1}}}}});var bl,_l=M(()=>{"use strict";bl={name:"groupdel",description:"Delete a group",category:"users",params:["<group>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`groupdel: permission denied
`,exitCode:1};let n=r[0];if(!n)return{stderr:`Usage: groupdel <group>
`,exitCode:1};try{return e.users.deleteGroup(n),{stdout:`groupdel: group '${n}' deleted
`,exitCode:0}}catch(s){return{stderr:`${s instanceof Error?s.message:String(s)}
`,exitCode:1}}}}});var vl,wl=M(()=>{"use strict";vl={name:"groups",description:"Print group memberships",category:"system",params:["[user]"],run:({authUser:t,shell:e,args:r})=>{let n=r[0]??t,s=e.users.getUserAllGroups(n);return s.length===0?{stdout:`${n}:`,exitCode:0}:{stdout:`${n} : ${s.join(" ")}`,exitCode:0}}}});var xl,Cl,Il=M(()=>{"use strict";se();xl={name:"gzip",description:"Compress files",category:"archive",params:["[-k] [-d] <file>"],run:({shell:t,cwd:e,args:r,authUser:n})=>{if(!t.packageManager.isInstalled("gzip"))return{stderr:`bash: gzip: command not found
Hint: install it with: apt install gzip
`,exitCode:127};let s=r.includes("-k")||r.includes("--keep"),i=r.includes("-d"),o=r.find(p=>!p.startsWith("-"));if(!o)return{stderr:`gzip: no file specified
`,exitCode:1};let a=B(e,o),c=t.users.getUid(n),l=t.users.getGid(n);if(i){if(!o.endsWith(".gz"))return{stderr:`gzip: ${o}: unknown suffix -- ignored
`,exitCode:1};if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};let p=t.vfs.readFile(a),f=a.slice(0,-3);return t.vfs.writeFile(f,p,{},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}if(!t.vfs.exists(a))return{stderr:`gzip: ${o}: No such file or directory
`,exitCode:1};if(o.endsWith(".gz"))return{stderr:`gzip: ${o}: already has .gz suffix -- unchanged
`,exitCode:1};let u=t.vfs.readFileRaw(a),d=`${a}.gz`;return t.vfs.writeFile(d,u,{compress:!0},c,l),s||t.vfs.remove(a,{recursive:!1},c,l),{exitCode:0}}},Cl={name:"gunzip",description:"Decompress files",category:"archive",aliases:["zcat"],params:["[-k] <file>"],run:({shell:t,cwd:e,args:r,authUser:n})=>{let s=r.includes("-k")||r.includes("--keep"),i=r.find(d=>!d.startsWith("-"));if(!i)return{stderr:`gunzip: no file specified
`,exitCode:1};let o=B(e,i),a=t.users.getUid(n),c=t.users.getGid(n);if(!t.vfs.exists(o))return{stderr:`gunzip: ${i}: No such file or directory
`,exitCode:1};if(!i.endsWith(".gz"))return{stderr:`gunzip: ${i}: unknown suffix -- ignored
`,exitCode:1};let l=t.vfs.readFile(o),u=o.slice(0,-3);return t.vfs.writeFile(u,l,{},a,c),s||t.vfs.remove(o,{recursive:!1},a,c),{exitCode:0}}}});var Pl,El=M(()=>{"use strict";ae();se();Pl={name:"head",description:"Output first lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=ir(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),f=p.slice(0,a);return f.join(`
`)+(d.endsWith(`
`)&&f.length===p.slice(0,a).length?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=B(r,d);try{ye(t,p,"head"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`head: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Ml(t,e){return t.length>=e?t:t+" ".repeat(e-t.length)}function H0(t){let e=t.aliases?.length?` ${fn}(${t.aliases.join(", ")})${wt}`:"";return`  ${G0}${Ml(t.name,16)}${wt}${e}${Ml("",(t.aliases?.length,0))} ${t.description??""}`}function q0(t){let e={};for(let i of t){let o=i.category??"misc";e[o]||(e[o]=[]),e[o]?.push(i)}let r=[`${Nl}Available commands${wt}`,`${fn}Type 'help <command>' for detailed usage.${wt}`,""],n=[...$l.filter(i=>e[i]),...Object.keys(e).filter(i=>!$l.includes(i)).sort()];for(let i of n){let o=e[i];if(!o?.length)continue;r.push(`${W0}${kl[i]??i}${wt}`);let a=[...o].sort((c,l)=>c.name.localeCompare(l.name));for(let c of a)r.push(H0(c));r.push("")}let s=t.length;return r.push(`${fn}${s} commands available.${wt}`),r.join(`
`)}function Y0(t){let e=[];if(e.push(`${Nl}${t.name}${wt} \u2014 ${t.description??"no description"}`),t.aliases?.length&&e.push(`${fn}Aliases: ${t.aliases.join(", ")}${wt}`),e.push(""),e.push(`${j0}Usage:${wt}`),t.params.length)for(let n of t.params)e.push(`  ${t.name} ${n}`);else e.push(`  ${t.name}`);let r=kl[t.category??"misc"]??t.category??"misc";return e.push(""),e.push(`${fn}Category: ${r}${wt}`),e.join(`
`)}function Al(){return{name:"help",description:"List all commands, or show usage for a specific command",category:"shell",params:["[command]"],run:({args:t})=>{let e=Ii();if(t[0]){let r=t[0].toLowerCase(),n=e.find(s=>s.name===r||s.aliases?.includes(r));return n?{stdout:Y0(n),exitCode:0}:{stderr:`help: no help entry for '${t[0]}'`,exitCode:1}}return{stdout:q0(e),exitCode:0}}}}var $l,kl,Nl,wt,G0,W0,fn,j0,Tl=M(()=>{"use strict";Lr();$l=["navigation","files","text","archive","system","package","network","shell","users","misc"],kl={navigation:"Navigation",files:"Files & Filesystem",text:"Text Processing",archive:"Archive & Compression",system:"System",package:"Package Management",network:"Network",shell:"Shell & Scripting",users:"Users & Permissions",misc:"Miscellaneous"},Nl="\x1B[1m",wt="\x1B[0m",G0="\x1B[36m",W0="\x1B[33m",fn="\x1B[2m",j0="\x1B[32m"});var Ol,Rl=M(()=>{"use strict";Ol={name:"history",description:"Display command history",category:"shell",params:["[n]"],run:({args:t,shell:e,authUser:r})=>{let n=`/home/${r}/.bash_history`;if(!e.vfs.exists(n))return{stdout:"",exitCode:0};let i=e.vfs.readFile(n).split(`
`).filter(Boolean),o=t[0],a=o?Number.parseInt(o,10):null,c=a&&!Number.isNaN(a)?i.slice(-a):i,l=i.length-c.length+1;return{stdout:c.map((d,p)=>`${String(l+p).padStart(5)}  ${d}`).join(`
`),exitCode:0}}}});var Dl,Fl=M(()=>{"use strict";Dl={name:"hostname",description:"Print hostname",category:"system",params:[],run:({hostname:t})=>({stdout:t,exitCode:0})}});import*as Ur from"node:os";function $i(t,e){let r=Math.round(t*e),n=e-r;return`${t>.8?oe.red:t>.5?oe.yellow:oe.green}${"\u2588".repeat(r)}${oe.dim}${"\u2591".repeat(n)}${oe.reset}`}function dr(t){return t>=1024**3?`${(t/1024**3).toFixed(1)}G`:t>=1024**2?`${(t/1024**2).toFixed(1)}M`:t>=1024?`${(t/1024).toFixed(1)}K`:`${t}B`}function K0(t){let e=Math.floor(t/1e3),r=Math.floor(e/86400),n=Math.floor(e%86400/3600),s=Math.floor(e%3600/60),i=e%60;return r>0?`${r}d ${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`:`${String(n).padStart(2,"0")}:${String(s).padStart(2,"0")}:${String(i).padStart(2,"0")}`}var oe,Ll,Ul=M(()=>{"use strict";oe={reset:"\x1B[0m",bold:"\x1B[1m",rev:"\x1B[7m",green:"\x1B[32m",cyan:"\x1B[36m",yellow:"\x1B[33m",red:"\x1B[31m",blue:"\x1B[34m",magenta:"\x1B[35m",white:"\x1B[97m",bgBlue:"\x1B[44m",bgGreen:"\x1B[42m",bgRed:"\x1B[41m",dim:"\x1B[2m"};Ll={name:"htop",description:"Interactive system monitor",category:"system",params:["[-d delay]","[-p pid]"],run:({shell:t,authUser:e})=>{let r=Ur.totalmem(),n=Ur.freemem(),s=t.resourceCaps?.ramCapBytes,i=s===void 0?r:Math.min(r,s),o=s===null?n:Math.floor(i*(n/r)),a=i-o,c=Math.floor(i*.5),l=Math.floor(c*.02),u=Ur.cpus(),p=(t.resourceCaps?.cpuCapCores===void 0?u.length:Math.min(t.resourceCaps.cpuCapCores,u.length))||4,f=Date.now()-t.startTime,m=t.users.listActiveSessions(),h=m.length+t.users.listProcesses().length+3,g=new Date().toTimeString().slice(0,8),y=a/i,S=l/c,w=20,b=[],N=[];for(let C=0;C<p;C++)N.push(Math.random()*.3+.02);let I=Math.min(p,4);for(let C=0;C<I;C++){let O=N[C],U=(O*100).toFixed(1).padStart(5);b.push(`${oe.bold}${oe.cyan}${String(C+1).padStart(3)}${oe.reset}[${$i(O,w)}${oe.reset}] ${U}%`)}p>4&&b.push(`${oe.dim}    ... ${p-4} more CPU(s) not shown${oe.reset}`),b.push(`${oe.bold}${oe.cyan}Mem${oe.reset}[${$i(y,w)}${oe.reset}] ${dr(a)}/${dr(i)}`),b.push(`${oe.bold}${oe.cyan}Swp${oe.reset}[${$i(S,w)}${oe.reset}] ${dr(l)}/${dr(c)}`),b.push("");let v=N.slice(0,p).reduce((C,O)=>C+O,0)/p,_=(v*p).toFixed(2),x=(v*p*.9).toFixed(2),E=(v*p*.8).toFixed(2);b.push(`${oe.bold}Tasks:${oe.reset} ${oe.green}${h}${oe.reset} total  ${oe.bold}Load average:${oe.reset} ${_} ${x} ${E}  ${oe.bold}Uptime:${oe.reset} ${K0(f)}`),b.push("");let D=`${oe.bgBlue}${oe.bold}${oe.white}  PID USER       PRI  NI  VIRT   RES  SHR S  CPU%  MEM% TIME+     COMMAND${oe.reset}`;b.push(D);let T=[{pid:1,user:"root",cmd:"systemd",cpu:0,mem:.1},{pid:2,user:"root",cmd:"kthreadd",cpu:0,mem:0},{pid:9,user:"root",cmd:"rcu_sched",cpu:Math.random()*.2,mem:0},{pid:127,user:"root",cmd:"sshd",cpu:0,mem:.2}],W=1e3,X=m.map(C=>({pid:W++,user:C.username,cmd:"bash",cpu:Math.random()*.5,mem:a/i*100/Math.max(m.length,1)*.3})),ee=t.users.listProcesses().map(C=>({pid:C.pid,user:C.username,cmd:C.argv.join(" ").slice(0,40),cpu:Math.random()*2+.1,mem:a/i*100*.5})),P={pid:W++,user:e,cmd:"htop",cpu:.1,mem:.1},A=[...T,...X,...ee,P];for(let C of A){let O=dr(Math.floor(Math.random()*200*1024*1024+10485760)),U=dr(Math.floor(Math.random()*20*1024*1024+1024*1024)),Z=dr(Math.floor(Math.random()*5*1024*1024+512*1024)),J=C.cpu.toFixed(1).padStart(5),R=C.mem.toFixed(1).padStart(5),V=`${String(Math.floor(Math.random()*10)).padStart(2)}:${String(Math.floor(Math.random()*60)).padStart(2,"0")}.${String(Math.floor(Math.random()*100)).padStart(2,"0")}`,z=C.user==="root"?oe.red:C.user===e?oe.green:oe.cyan,G=C.cmd==="htop"?oe.green:C.cmd==="bash"?oe.cyan:oe.reset;b.push(`${String(C.pid).padStart(5)} ${z}${C.user.padEnd(10).slice(0,10)}${oe.reset}  20   0 ${O.padStart(6)} ${U.padStart(6)} ${Z.padStart(5)} S ${J} ${R} ${V.padStart(9)}  ${G}${C.cmd}${oe.reset}`)}return b.push(""),b.push(`${oe.dim}${g} \u2014 htop snapshot (non-interactive mode)  press ${oe.reset}${oe.bold}q${oe.reset}${oe.dim} to quit in interactive mode${oe.reset}`),{stdout:b.join(`
`),exitCode:0}}}});var Bl,zl=M(()=>{"use strict";Bl={name:"id",description:"Print user identity",category:"system",params:["[-u] [-g] [-G] [-n] [user]"],run:({authUser:t,shell:e,args:r})=>{let n=r.includes("-u"),s=r.includes("-g"),i=r.includes("-G"),o=r.includes("-n"),a=r.find(m=>!m.startsWith("-"))??t,c=e.users.getUid(a),l=e.users.getGid(a),u=e.users.getUserAllGroups(a),d=u.map(m=>{let h=e.users.getGroup(m);return h?h.gid:0});if(n)return{stdout:String(c),exitCode:0};if(s)return o?{stdout:u.join(" "),exitCode:0}:{stdout:String(l),exitCode:0};if(i)return{stdout:d.join(" "),exitCode:0};let p=e.users.getNameByGid(l)??a,f=u.map(m=>{let h=e.users.getGroup(m);return h?`${h.gid}(${m})`:m}).join(",");return{stdout:`uid=${c}(${a}) gid=${l}(${p}) groups=${f}`,exitCode:0}}}});function Vl(t){let e=t.getInterfaces(),r=[];for(let n of e)r.push(jl(n)),r.push("");return{stdout:r.join(`
`),exitCode:0}}function X0(t){return{stdout:`${jl(t)}
`,exitCode:0}}function jl(t){let e=Z0(t),r=[];r.push(`${t.name}: flags=${e}  mtu ${t.mtu}`),t.type==="loopback"?r.push("        loop  txqueuelen 1000  (Local Loopback)"):r.push(`        ether ${t.mac}  txqueuelen 1000  (Ethernet)`),r.push(`        inet ${t.ipv4}  netmask ${J0(t.ipv4Mask)}  broadcast ${eg(t.ipv4,t.ipv4Mask)}`),r.push(`        inet6 ${t.ipv6}  prefixlen 64  scopeid 0x0 <link>`);let n=Math.floor(Math.random()*1e6),s=Math.floor(Math.random()*5e5),i=Math.floor(n/64),o=Math.floor(s/64);return r.push(`        RX packets ${i}  bytes ${n} (${Gl(n)})`),r.push("        RX errors 0  dropped 0  overruns 0  frame 0"),r.push(`        TX packets ${o}  bytes ${s} (${Gl(s)})`),r.push("        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0"),t.speed&&r.push(`        Speed: ${t.speed}Mb/s  Duplex: ${t.duplex??"full"}`),r.join(`
`)}function Z0(t){let e=4096;return t.state==="UP"&&(e|=1),t.type!=="loopback"&&(e|=4098),t.type==="loopback"&&(e|=8),e}function J0(t){let e=t===0?0:-1<<32-t>>>0;return[e>>>24&255,e>>>16&255,e>>>8&255,e&255].join(".")}function Q0(t){return t.split(".").reduce((e,r)=>e+(Number.parseInt(r,10)?Number.parseInt(r,10).toString(2).split("1").length-1:0),0)}function eg(t,e){let r=t.split(".").reduce((i,o)=>(i<<8)+Number.parseInt(o,10),0)>>>0,n=e===0?0:-1<<32-e>>>0,s=r&n|~n>>>0;return[s>>>24&255,s>>>16&255,s>>>8&255,s&255].join(".")}function Gl(t){return t<1024?`${t} B`:t<1024*1024?`${(t/1024).toFixed(1)} KiB`:t<1024*1024*1024?`${(t/(1024*1024)).toFixed(1)} MiB`:`${(t/(1024*1024*1024)).toFixed(1)} GiB`}var Wl,Hl=M(()=>{"use strict";Wl={name:"ifconfig",description:"Configure network interface parameters",category:"network",aliases:["ipconfig"],params:["[interface] [up|down] [inet <address>] [netmask <mask>] [mtu <size>]"],run:({args:t,shell:e})=>{let r=e.network,n=t.find(s=>!(s.startsWith("-")||["up","down","inet","netmask","mtu","add","del"].includes(s)));if(t.includes("-a")||!n&&t.length===0)return Vl(r);if(n){let s=r.getInterface(n);if(!s)return{stderr:`ifconfig: ${n}: error fetching interface information: Device not found
`,exitCode:1};if(t.includes("up"))return r.setInterfaceState(n,"UP"),{exitCode:0};if(t.includes("down"))return r.setInterfaceState(n,"DOWN"),{exitCode:0};let i=t.indexOf("inet");if(i!==-1){let a=t[i+1],c=t.indexOf("netmask"),l=c===-1?24:Q0(t[c+1]??"255.255.255.0");return a&&r.setInterfaceIp(n,a,l),{exitCode:0}}let o=t.indexOf("mtu");if(o!==-1){let a=Number.parseInt(t[o+1]??"1500",10);return Number.isNaN(a)||r.setInterfaceMtu(n,a),{exitCode:0}}return X0(s)}return Vl(r)}}});function mn(){let t=()=>Math.floor(Math.random()*256).toString(16).padStart(2,"0");return`02:42:${t()}:${t()}:${t()}:${t()}`}var Mi=M(()=>{"use strict"});var ss,ki=M(()=>{"use strict";Mi();Mi();ss=class t{_interfaces=[{name:"lo",type:"loopback",mac:"00:00:00:00:00:00",mtu:65536,state:"UP",ipv4:"127.0.0.1",ipv4Mask:8,ipv6:"::1"},{name:"eth0",type:"ether",mac:mn(),mtu:1500,state:"UP",ipv4:"10.0.0.2",ipv4Mask:24,ipv6:"fe80::42:aff:fe00:2",speed:1e3,duplex:"full"}];_routes=[{destination:"default",gateway:"10.0.0.1",netmask:"0.0.0.0",device:"eth0",flags:"UG",metric:100},{destination:"10.0.0.0",gateway:"0.0.0.0",netmask:"255.255.255.0",device:"eth0",flags:"U",scope:"link",proto:"kernel"},{destination:"127.0.0.0",gateway:"0.0.0.0",netmask:"255.0.0.0",device:"lo",flags:"U",scope:"link",proto:"kernel"}];arpCache=[{ip:"10.0.0.1",mac:"02:42:0a:00:00:01",device:"eth0",state:"REACHABLE"}];_firewallRules=[];_policies={INPUT:"ACCEPT",OUTPUT:"ACCEPT",FORWARD:"ACCEPT"};_conntrack=[];_conntrackMax=65536;_routingTables=[{id:254,name:"main",routes:[]},{id:253,name:"default",routes:[]},{id:252,name:"local",routes:[]}];_policyRules=[];_nextTableId=100;getInterfaces(){return[...this._interfaces]}getRoutes(){return[...this._routes]}getArpCache(){return[...this.arpCache]}addInterface(e){return this._interfaces.some(r=>r.name===e.name)?!1:(this._interfaces.push({...e,state:"DOWN"}),!0)}removeInterface(e){if(e==="lo")return!1;let r=this._interfaces.findIndex(n=>n.name===e);return r===-1?!1:(this._interfaces.splice(r,1),this._routes=this._routes.filter(n=>n.device!==e),this.arpCache=this.arpCache.filter(n=>n.device!==e),!0)}setInterfaceType(e,r){let n=this._interfaces.find(s=>s.name===e);return n?(n.type=r,!0):!1}setInterfaceMtu(e,r){let n=this._interfaces.find(s=>s.name===e);return n?(n.mtu=r,!0):!1}setInterfaceSpeed(e,r){let n=this._interfaces.find(s=>s.name===e);return n?(n.speed=r,!0):!1}addRoute(e,r,n,s,i){this._routes.push({destination:e,gateway:r,netmask:n,device:s,flags:r==="0.0.0.0"?"U":"UG",metric:i??0,scope:r==="0.0.0.0"?"link":"global"})}delRoute(e){let r=this._routes.findIndex(n=>n.destination===e);return r===-1?!1:(this._routes.splice(r,1),!0)}addRoutingTable(e){let r=this._nextTableId++;return this._routingTables.push({id:r,name:e,routes:[]}),r}getRoutingTable(e){return this._routingTables.find(r=>r.id===e)}listRoutingTables(){return[...this._routingTables]}addRouteToTable(e,r,n,s,i){let o=this._routingTables.find(a=>a.id===i);return o?(o.routes.push({destination:e,gateway:r,netmask:n,device:s,flags:"UG"}),!0):!1}addPolicyRule(e){let r=this._policyRules.length>0?Math.max(...this._policyRules.map(n=>n.priority))+1e3:1e3;return this._policyRules.push({...e,priority:r}),r}listPolicyRules(){return[...this._policyRules].sort((e,r)=>e.priority-r.priority)}delPolicyRule(e){let r=this._policyRules.findIndex(n=>n.priority===e);return r===-1?!1:(this._policyRules.splice(r,1),!0)}setInterfaceState(e,r){let n=this._interfaces.find(s=>s.name===e);return n?(n.state=r,!0):!1}setInterfaceIp(e,r,n){let s=this._interfaces.find(i=>i.name===e);return s?(s.ipv4=r,s.ipv4Mask=n,!0):!1}getInterface(e){return this._interfaces.find(r=>r.name===e)}ping(e){if(e==="127.0.0.1"||e==="localhost"||e==="::1")return .05+Math.random()*.1;let r=this.arpCache.find(n=>n.ip===e);return r&&r.state==="REACHABLE"?.5+Math.random()*2:Math.random()<.05?-1:.8+Math.random()*5}formatIpAddr(){let e=[],r=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN";e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} group default qlen 1000`),e.push(`    link/${t._linkType(n.type)} ${n.mac} brd ff:ff:ff:ff:ff:ff`),e.push(`    inet ${n.ipv4}/${n.ipv4Mask} scope global ${n.name}`),e.push("       valid_lft forever preferred_lft forever"),e.push(`    inet6 ${n.ipv6}/64 scope link`),e.push("       valid_lft forever preferred_lft forever"),r++}return e.join(`
`)}formatIpRoute(){let e=[],r=[...this._routes].sort((n,s)=>(n.metric??0)-(s.metric??0));for(let n of r)n.destination==="default"?e.push(`default via ${n.gateway} dev ${n.device}${n.metric?` metric ${n.metric}`:""}`):e.push(`${n.destination}/${t._maskToCidr(n.netmask)} dev ${n.device}${n.metric?` metric ${n.metric}`:""}${n.scope?` scope ${n.scope}`:""}${n.proto?` proto ${n.proto}`:""}`);return e.join(`
`)}formatIpRouteTable(e){if(e===void 0||e===254)return this.formatIpRoute();let r=this._routingTables.find(n=>n.id===e);return!r||r.routes.length===0?"":r.routes.map(n=>n.destination==="default"?`default via ${n.gateway} dev ${n.device}`:`${n.destination}/${t._maskToCidr(n.netmask)} dev ${n.device} proto kernel scope link src ${this._ipForDevice(n.device)}`).join(`
`)}formatIpRule(){let e=this.listPolicyRules();if(e.length===0)return`0:	from all lookup local
32766:	from all lookup main
32767:	from all lookup default`;let r=[];for(let n of e){let s=`${n.priority}:	`;if(n.from&&(s+=`from ${n.from} `),n.to&&(s+=`to ${n.to} `),n.iif&&(s+=`iif ${n.iif} `),n.oif&&(s+=`oif ${n.oif} `),n.action==="lookup"){let i=this._routingTables.find(o=>o.id===n.table);s+=`lookup ${i?.name??n.table}`}else s+=n.action;r.push(s)}return r.push("32766:	from all lookup main"),r.push("32767:	from all lookup default"),r.join(`
`)}formatIpLink(){let e=[],r=1;for(let n of this._interfaces){let s=n.state==="UP"?n.type==="loopback"?"LOOPBACK,UP,LOWER_UP":"BROADCAST,MULTICAST,UP,LOWER_UP":"DOWN",i="";n.speed&&(i+=`    ${n.speed}Mb/s`),n.duplex&&(i+=` ${n.duplex}-duplex`),e.push(`${r}: ${n.name}: <${s}> mtu ${n.mtu} qdisc mq state ${n.state==="UP"?"UNKNOWN":"DOWN"} mode DEFAULT group default qlen 1000`),e.push(`    link/${t._linkType(n.type)} ${n.mac} brd ff:ff:ff:ff:ff:ff${i}`),r++}return e.join(`
`)}formatIpNeigh(){return this.arpCache.map(e=>`${e.ip} dev ${e.device} lladdr ${e.mac} ${e.state}`).join(`
`)}static _linkType(e){switch(e){case"loopback":return"loopback";case"wifi":return"ieee802.11";case"tunnel":return"tunnel";case"bridge":return"bridge";case"vlan":return"vlan";default:return"ether"}}static _maskToCidr(e){return e.split(".").reduce((r,n)=>r+(Number.parseInt(n,10)?Number.parseInt(n,10).toString(2).split("1").length-1:0),0)}_ipForDevice(e){return this._interfaces.find(r=>r.name===e)?.ipv4??"0.0.0.0"}addFirewallRule(e){return this._firewallRules.push(e),this._firewallRules.length-1}removeFirewallRule(e){return e<0||e>=this._firewallRules.length?!1:(this._firewallRules.splice(e,1),!0)}getFirewallRules(){return[...this._firewallRules]}setPolicy(e,r){return e in this._policies?(this._policies[e]=r,!0):!1}getPolicy(e){return this._policies[e]??"ACCEPT"}checkFirewall(e,r,n,s,i){for(let o of this._firewallRules)if(o.chain===e&&!(o.protocol!=="all"&&o.protocol!==r)&&!(o.source&&n&&o.source!==n)&&!(o.destination&&s&&o.destination!==s)&&!(o.destPort&&i&&o.destPort!==i))return o.action==="MASQUERADE"||o.action==="SNAT"||o.action==="DNAT"?"ACCEPT":o.action;return this._policies[e]??"ACCEPT"}flushFirewall(){this._firewallRules=[]}formatFirewall(){let e=[];for(let r of["INPUT","FORWARD","OUTPUT","PREROUTING","POSTROUTING"]){e.push(`Chain ${r} (policy ${this._policies[r]??"ACCEPT"})`),e.push("target     prot opt source               destination");for(let n of this._firewallRules){if(n.chain!==r)continue;let s=n.action.padEnd(10),i=n.protocol.padEnd(6),o=(n.source??"0.0.0.0/0").padEnd(20),a=(n.destination??"0.0.0.0/0").padEnd(20),c=n.destPort?`dpt:${n.destPort}`:"";e.push(`${s} ${i}      ${o} ${a} ${c}`)}e.push("")}return e.join(`
`)}getConntrack(){return[...this._conntrack]}getConntrackCount(){return this._conntrack.length}getConntrackMax(){return this._conntrackMax}setConntrackMax(e){this._conntrackMax=e}addConntrackEntry(e){this._conntrack.length>=this._conntrackMax&&this._evictOldestConntrack();let r={...e,timestamp:Date.now(),timeout:e.protocol==="tcp"?432e3:e.protocol==="udp"?180:30,packetsSent:0,packetsReceived:0,bytesSent:0,bytesReceived:0};return this._conntrack.push(r),r}updateConntrack(e,r,n,s,i,o){let a=this._findConntrack(e,r,n,s,i);if(a)a.packetsSent++,a.bytesSent+=o??0,a.timestamp=Date.now(),a.state==="NEW"&&(a.state="ESTABLISHED");else{let c=this._findConntrack(r,e,n,i,s);c?(c.packetsReceived++,c.bytesReceived+=o??0,c.timestamp=Date.now()):this.addConntrackEntry({protocol:n,srcIp:e,dstIp:r,srcPort:s,dstPort:i,state:"NEW"})}}flushConntrack(){this._conntrack=[]}formatConntrack(){return this._conntrack.map(e=>{let r=e.protocol.padEnd(5),n=String(e.timeout).padStart(6),s=`${e.srcIp}:${e.srcPort??"*"}`.padEnd(22),i=`${e.dstIp}:${e.dstPort??"*"}`.padEnd(22);return`ipv4     ${r} ${n} ${e.state.padEnd(12)} src=${s} dst=${i} packets=${e.packetsSent+e.packetsReceived} bytes=${e.bytesSent+e.bytesReceived}`}).join(`
`)}_findConntrack(e,r,n,s,i){return this._conntrack.find(o=>o.srcIp===e&&o.dstIp===r&&o.protocol===n&&(o.srcPort===s||o.srcPort===void 0)&&(o.dstPort===i||o.dstPort===void 0))}_evictOldestConntrack(){let e=0,r=this._conntrack[0]?.timestamp??0;for(let n=1;n<this._conntrack.length;n++)(this._conntrack[n]?.timestamp??0)<r&&(r=this._conntrack[n]?.timestamp??0,e=n);this._conntrack.splice(e,1)}resolveRoute(e){for(let n of this.listPolicyRules())if(!(n.from&&!t._ipMatchesRule(e,n.from))&&!(n.to&&!t._ipMatchesRule(e,n.to))){if(n.action==="blackhole")return{route:null,table:-1};if(n.action==="unreachable")return{route:null,table:-2};if(n.action==="prohibit")return{route:null,table:-3};if(n.action==="lookup"){let s=this._routingTables.find(i=>i.id===n.table);if(s){let i=s.routes.find(o=>this._ipMatchesDestination(e,o));if(i)return{route:i,table:n.table}}}}return{route:this._routes.find(n=>this._ipMatchesDestination(e,n))??null,table:254}}static _ipMatchesRule(e,r){if(r==="all")return!0;if(r.includes("/")){let[n,s]=r.split("/"),i=Number.parseInt(s??"32",10),o=t._ipToInt(e),a=t._ipToInt(n??"0.0.0.0"),c=i===0?0:-1<<32-i>>>0;return(o&c)===(a&c)}return e===r}_ipMatchesDestination(e,r){if(r.destination==="default"||r.destination===e)return!0;if(r.destination.includes("/"))return t._ipMatchesRule(e,r.destination);let n=t._ipToInt(e),s=t._ipToInt(r.destination),i=t._ipToInt(r.netmask);return(n&i)===(s&i)}static _ipToInt(e){return e.split(".").reduce((r,n)=>(r<<8)+Number.parseInt(n,10),0)>>>0}}});var ql,Yl=M(()=>{"use strict";ki();ql={name:"ip",description:"Show/manipulate routing, network devices, interfaces",category:"network",params:["<object> <command>"],run:({args:t,shell:e})=>{let r=e.network,n=t[0]?.toLowerCase(),s=t[1]?.toLowerCase()??"show";if(!n)return{stderr:`Usage: ip [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { link | addr | route | neigh | rule | route table }`,exitCode:1};if(n==="addr"||n==="address"||n==="a"){if(s==="add"){let i=t.find(c=>c.includes("/")),o=t.indexOf("dev"),a=o!==-1&&o+1<t.length?t[o+1]:void 0;if(i&&a){let[c,l]=i.split("/"),u=Number.parseInt(l??"24",10);r.setInterfaceIp(a,c??"0.0.0.0",u)}return{exitCode:0}}if(s==="del"){let i=t.indexOf("dev"),o=i!==-1&&i+1<t.length?t[i+1]:void 0;return o&&r.setInterfaceIp(o,"0.0.0.0",0),{exitCode:0}}return{stdout:`${r.formatIpAddr()}
`,exitCode:0}}if(n==="route"||n==="r"||n==="ro"){let i=t.indexOf("table"),o=i===-1?void 0:Number.parseInt(t[i+1]??"254",10);if(s==="add"){let a=t.indexOf("via"),c=t.indexOf("dev"),l=t.indexOf("metric"),u=t[1]==="add"?t[2]:t[1],d=a===-1?"0.0.0.0":t[a+1],p=c===-1?"eth0":t[c+1],f=l===-1?void 0:Number.parseInt(t[l+1]??"0",10);return u&&u!=="add"&&(o?r.addRouteToTable(u,d??"0.0.0.0","255.255.255.0",p??"eth0",o):r.addRoute(u,d??"0.0.0.0","255.255.255.0",p??"eth0",f)),{exitCode:0}}if(s==="del"){let a=t[1]==="del"?t[2]:t[1];return a&&a!=="del"&&r.delRoute(a),{exitCode:0}}return s==="show"||s==="list"?o?{stdout:`${r.formatIpRouteTable(o)}
`,exitCode:0}:{stdout:`${r.formatIpRoute()}
`,exitCode:0}:{stdout:`${r.formatIpRoute()}
`,exitCode:0}}if(n==="link"||n==="l"){if(s==="set"){let i=t[2];t.includes("up")&&i&&r.setInterfaceState(i,"UP"),t.includes("down")&&i&&r.setInterfaceState(i,"DOWN");let o=t.indexOf("mtu");if(o!==-1&&i){let a=Number.parseInt(t[o+1]??"1500",10);Number.isNaN(a)||r.setInterfaceMtu(i,a)}return{exitCode:0}}if(s==="add"){let i=t.indexOf("type"),o="eth1";for(let c=2;c<t.length;c++){let l=t[c-1];if(l!=="type"&&l!=="add"&&l!=="link"){o=t[c]??"eth1";break}}let a=i===-1?"ether":t[i+1]??"ether";return r.addInterface({name:o,type:a,mac:mn(),mtu:1500,ipv4:"0.0.0.0",ipv4Mask:24,ipv6:"fe80::1"}),{exitCode:0}}if(s==="del"){let i=t[2];return i&&r.removeInterface(i),{exitCode:0}}return{stdout:`${r.formatIpLink()}
`,exitCode:0}}if(n==="neigh"||n==="n")return{stdout:`${r.formatIpNeigh()}
`,exitCode:0};if(n==="rule"||n==="ru"){if(s==="show"||s==="list")return{stdout:`${r.formatIpRule()}
`,exitCode:0};if(s==="add"){let i=t.indexOf("from"),o=t.indexOf("to"),a=t.indexOf("table"),c=t.indexOf("iif"),l=t.indexOf("oif");return r.addPolicyRule({from:i===-1?void 0:t[i+1],to:o===-1?void 0:t[o+1],table:Number.parseInt(t[a+1]??"254",10),iif:c===-1?void 0:t[c+1],oif:l===-1?void 0:t[l+1],action:"lookup"}),{exitCode:0}}if(s==="del"){let i=Number.parseInt(t[2]??"0",10);return i&&r.delPolicyRule(i),{exitCode:0}}return{stdout:`${r.formatIpRule()}
`,exitCode:0}}if(n==="route"&&t.includes("table")){let i=t.indexOf("table"),o=Number.parseInt(t[i+1]??"254",10);return{stdout:`${r.formatIpRouteTable(o)}
`,exitCode:0}}return["set","add","del","flush","change","replace"].includes(s)?{exitCode:0}:{stderr:`ip: Object "${n}" is unknown, try "ip help".`,exitCode:1}}}});var Kl,Xl=M(()=>{"use strict";Kl={name:"iptables",description:"Configure firewall rules",category:"network",params:["-L | -A <chain> [-p proto] [-s src] [-d dst] [--dport port] -j ACTION | -F | -P <chain> <policy>"],run:({args:t,shell:e})=>{let r=e.network,n="list",s="",i={};for(let o=0;o<t.length;o++){let a=t[o];if(a)switch(a){case"-L":case"--list":n="list";break;case"-A":case"--append":n="append",s=t[++o]??"";break;case"-F":case"--flush":n="flush";break;case"-P":case"--policy":n="policy",s=t[++o]??"";break;case"-p":case"--protocol":i.protocol=t[++o]??"all";break;case"-s":case"--source":i.source=t[++o];break;case"-d":case"--destination":i.destination=t[++o];break;case"--dport":i.destPort=Number.parseInt(t[++o]??"0",10);break;case"-j":case"--jump":i.action=t[++o]??"ACCEPT";break;default:break}}switch(n){case"list":return{stdout:`${r.formatFirewall()}
`,exitCode:0};case"flush":return r.flushFirewall(),{stdout:"",exitCode:0};case"policy":{if(!(s&&(t.includes("-j")||["ACCEPT","DROP"].includes(t[t.length-1]??"")))){let a=t.find(c=>c==="ACCEPT"||c==="DROP");return a?r.setPolicy(s,a)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires chain and policy (ACCEPT|DROP)",exitCode:1}}let o=t.find(a=>a==="ACCEPT"||a==="DROP");return o?r.setPolicy(s,o)?{stdout:"",exitCode:0}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -P requires policy (ACCEPT|DROP)",exitCode:1}}case"append":return s&&i.action?["INPUT","OUTPUT","FORWARD"].includes(s)?["ACCEPT","DROP","REJECT"].includes(i.action)?{stdout:`Rule added at index ${r.addFirewallRule({chain:s,protocol:i.protocol??"all",source:i.source,destination:i.destination,destPort:i.destPort,action:i.action})}
`,exitCode:0}:{stderr:`iptables: unknown action '${i.action}'`,exitCode:1}:{stderr:`iptables: unknown chain '${s}'`,exitCode:1}:{stderr:"iptables: -A requires chain and -j action",exitCode:1};default:return{stderr:"iptables: no action specified (-L, -A, -F, -P)",exitCode:1}}}}});function Zl(t,e){if(!t)return e.filter(n=>n.status!=="stopped").pop();let r=Number.parseInt(t.replace(/^%/,""),10);return e.find(n=>n.pid===r)}var Jl,Ql,eu,tu=M(()=>{"use strict";Jl={name:"jobs",description:"List active jobs",category:"shell",params:[],run:({shell:t})=>{let e=t.users.listProcesses();return e.length===0?{stdout:"",exitCode:0}:{stdout:`${e.map((n,s)=>{let i=`[${s+1}]`,o=n.status==="running"?"running":n.status==="done"?"done":"stopped";return`${i}  ${String(n.pid).padStart(5)} ${o.padEnd(8)} ${n.argv.join(" ")}`}).join(`
`)}
`,exitCode:0}}},Ql={name:"bg",description:"Resume a suspended job in the background",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Zl(t[0],r);return n?n.status==="done"?{stderr:`bg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`[${r.indexOf(n)+1}]  ${n.pid}  ${n.argv.join(" ")} &
`,exitCode:0}):{stderr:`bg: ${t[0]??"%1"}: no such job`,exitCode:1}}},eu={name:"fg",description:"Resume a suspended job in the foreground",category:"shell",params:["[%jobspec]"],run:({args:t,shell:e})=>{let r=e.users.listProcesses(),n=Zl(t[0],r);return n?n.status==="done"?{stderr:`fg: ${t[0]}: job has finished`,exitCode:1}:(n.status="running",{stdout:`${n.argv.join(" ")}
`,exitCode:0}):{stderr:`fg: ${t[0]??"%1"}: no such job`,exitCode:1}}}});function Ni(t){let e=Number(t);if(!Number.isNaN(e)&&e>0&&e in hn)return e;let r=t.toUpperCase().replace(/^SIG/,"");for(let[n,s]of Object.entries(hn))if(s.name===`SIG${r}`||s.name===r)return Number(n);return null}var hn,ru=M(()=>{"use strict";hn={1:{name:"SIGHUP",description:"Hangup",defaultAction:"terminate"},2:{name:"SIGINT",description:"Interrupt",defaultAction:"terminate"},3:{name:"SIGQUIT",description:"Quit",defaultAction:"core"},9:{name:"SIGKILL",description:"Kill",defaultAction:"terminate"},15:{name:"SIGTERM",description:"Termination",defaultAction:"terminate"},17:{name:"SIGCHLD",description:"Child status changed",defaultAction:"ignore"},18:{name:"SIGCONT",description:"Continue",defaultAction:"continue"},19:{name:"SIGSTOP",description:"Stop",defaultAction:"stop"},28:{name:"SIGWINCH",description:"Window size changed",defaultAction:"ignore"},10:{name:"SIGUSR1",description:"User signal 1",defaultAction:"terminate"},12:{name:"SIGUSR2",description:"User signal 2",defaultAction:"terminate"}}});var nu,su=M(()=>{"use strict";ru();nu={name:"kill",description:"Send signal to process",category:"system",params:["[-s SIGNAL | -SIGNAL] <pid>"],run:({args:t,shell:e})=>{let r=15,n;for(let a=0;a<t.length;a++){let c=t[a];if(c){if(c==="-l")return{stdout:`${Object.entries(hn).sort((u,d)=>Number(u[0])-Number(d[0])).map(([u,d])=>`${u} ${d.name}`).join(`
`)}
`,exitCode:0};if(c==="-s"&&a+1<t.length){let l=Ni(t[++a]??"");if(l===null)return{stderr:`kill: unknown signal name '${t[a]}'`,exitCode:1};r=l}else if(c.startsWith("-")&&c!=="-"){let l=c.startsWith("-s")?c.slice(2):c.slice(1);if(l){let u=Ni(l);if(u===null)return{stderr:`kill: unknown signal '${c}'`,exitCode:1};r=u}}else c.startsWith("-")||(n=c)}}if(!n)return{stderr:"kill: no pid specified",exitCode:1};let s=Number.parseInt(n,10);return Number.isNaN(s)?{stderr:`kill: invalid pid: ${n}`,exitCode:1}:e.users.killProcess(s,r)?{stdout:`Sent ${hn[r]?.name??`signal ${r}`} to ${s}
`,exitCode:0}:{stderr:`kill: (${s}) - No such process`,exitCode:1}}}});var iu,ou,au=M(()=>{"use strict";Ye();iu={name:"last",description:"Show listing of last logged in users",category:"system",params:["[username]"],run:({args:t,shell:e,authUser:r})=>{let n=t[0]??r,s=`${fe(n)}/.lastlog`,i=[];if(e.vfs.exists(s))try{let o=JSON.parse(e.vfs.readFile(s)),a=new Date(o.at),c=`${a.toDateString().slice(0,3)} ${a.toLocaleString("en-US",{month:"short",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}).replace(",","")}`;i.push(`${n.padEnd(10)} pts/0        ${(o.from??"browser").padEnd(16)} ${c}   still logged in`)}catch{}return i.push(""),i.push(`wtmp begins ${new Date().toDateString()}`),{stdout:i.join(`
`),exitCode:0}}},ou={name:"dmesg",description:"Print or control the kernel ring buffer",category:"system",params:["[-n n]"],run:({args:t})=>{let e=t.includes("-n")?Number.parseInt(t[t.indexOf("-n")+1]??"20",10):20;return{stdout:["[    0.000000] Booting Linux on physical CPU 0x0","[    0.000000] Linux version 6.1.0-fortune (gcc (Fortune 13.3.0-nyx1) 13.3.0)","[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-6.1.0 root=/dev/sda1 ro quiet","[    0.000000] BIOS-provided physical RAM map:","[    0.000000] ACPI: IRQ0 used by override.","[    0.125000] PCI: Using configuration type 1 for base access","[    0.250000] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.375000] CPU: Intel(R) Xeon(R) Platinum 8375C CPU @ 2.90GHz","[    0.500000] Calibrating delay loop... 5800.00 BogoMIPS","[    1.000000] NET: Registered PF_INET protocol family","[    1.125000] virtio_net virtio0 eth0: renamed from eth0","[    1.250000] EXT4-fs (sda1): mounted filesystem with ordered data mode","[    1.375000] systemd[1]: systemd 252 running in system mode","[    1.500000] systemd[1]: Reached target basic.system","[    2.000000] audit: type=1403 audit(0.0:2): policy loaded","[    2.125000] NET: Registered PF_PACKET protocol family","[    2.250000] 8021q: 802.1Q VLAN Support v1.8","[    2.375000] bridge: filtering via arp/ip/ip6tables is no longer available","[    2.500000] Bluetooth: Core ver 2.22","[    3.000000] input: Power Button as /devices/LNXSYSTM:00/LNXPWRBN:00/input/input0"].slice(0,e).join(`
`),exitCode:0}}}});var cu,lu,uu=M(()=>{"use strict";ae();se();cu={name:"ln",description:"Create links",category:"files",params:["[-s] <target> <link_name>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{let o=K(n,["-s","--symbolic"]),a=n.filter(p=>!p.startsWith("-")),[c,l]=a;if(!(c&&l))return{stderr:"ln: missing operand",exitCode:1};let u=B(r,l),d=o?c:B(r,c);try{if(ye(t,u,"ln"),o)e.vfs.symlink(d,u,s,i);else{let p=B(r,c);if(ye(t,p,"ln"),!e.vfs.exists(p))return{stderr:`ln: ${c}: No such file or directory`,exitCode:1};let f=e.vfs.readFile(p,s,i);e.vfs.writeFile(u,f,{},s,i)}return{exitCode:0}}catch(p){return{stderr:`ln: ${p instanceof Error?p.message:String(p)}`,exitCode:1}}}},lu={name:"readlink",description:"Print resolved path of symbolic link",category:"files",params:["[-f] <path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.includes("-f")||r.includes("-e"),s=r.find(a=>!a.startsWith("-"));if(!s)return{stderr:`readlink: missing operand
`,exitCode:1};let i=B(e,s);return t.vfs.exists(i)?t.vfs.isSymlink(i)?{stdout:`${t.vfs.resolveSymlink(i)}
`,exitCode:0}:{stderr:`readlink: ${s}: not a symbolic link
`,exitCode:1}:{stderr:`readlink: ${s}: No such file or directory
`,exitCode:1}}}});function Br(t,e){return e?`${e}${t}${tg}`:t}function Ti(t,e,r){if(r)return ng;if(e==="directory"){let n=!!(t&512),s=!!(t&2);return n&&s?ig:n?og:s?ag:rg}return e==="device"?du:t&73?sg:du}function pu(t,e,r){let n;r?n="l":e==="directory"?n="d":e==="device"?n="c":n="-";let s=l=>t&l?"r":"-",i=l=>t&l?"w":"-",o=(()=>{let l=!!(t&64);return t&2048?l?"s":"S":l?"x":"-"})(),a=(()=>{let l=!!(t&8);return t&1024?l?"s":"S":l?"x":"-"})(),c=(()=>{let l=!!(t&1);return e==="directory"&&t&512?l?"t":"T":l?"x":"-"})();return`${n}${s(256)}${i(128)}${o}${s(32)}${i(16)}${a}${s(4)}${i(2)}${c}`}function Ai(t){let e=new Date,r=4320*3600*1e3,n=Math.abs(e.getTime()-t.getTime())<r,s=String(t.getDate()).padStart(2," "),i=cg[t.getMonth()]??"";if(n){let o=String(t.getHours()).padStart(2,"0"),a=String(t.getMinutes()).padStart(2,"0");return`${s} ${i.padEnd(3)} ${o}:${a}`}return`${s} ${i.padEnd(3)} ${t.getFullYear()}`}function is(t,e){try{return t.readFile(e)}catch{return"?"}}function lg(t,e,r){let n=e==="/"?"":e;return r.map(s=>{let i=`${n}/${s}`,o=t.isSymlink(i),a;try{a=t.stat(i)}catch{return s}let c=Ti(a.mode,a.type,o);return Br(s,c)}).join("  ")}function ug(t,e,r,n){let s=r==="/"?"":r,i=n.map(u=>{let d=`${s}/${u}`,p=t.isSymlink(d),f;try{f=t.stat(d)}catch{return{perms:"----------",nlink:"1",size:"0",date:Ai(new Date),label:u}}let m=p?41471:f.mode,h=pu(m,f.type,p),g=f.type==="directory"?String((f.childrenCount??0)+2):"1",y=p?is(t,d).length:f.type==="file"?f.size??0:f.type==="device"?0:(f.childrenCount??0)*4096,S=String(y),w=Ai(f.updatedAt),b=Ti(m,f.type,p),N=p?`${Br(u,b)} -> ${is(t,d)}`:Br(u,b);return{perms:h,nlink:g,size:S,date:w,label:N}}),o=Math.max(...i.map(u=>u.nlink.length)),a=Math.max(...i.map(u=>u.size.length)),c=n.length*8,l=i.map((u,d)=>{let p=(()=>{try{return t.stat(`${s}/${n[d]}`)}catch{return null}})(),f=p&&"uid"in p?p.uid:0,m=p&&"gid"in p?p.gid:0,h=e.getUsername(f)??String(f),g=e.getGroupName(m)??String(m);return`${u.perms} ${u.nlink.padStart(o)} ${h} ${g} ${u.size.padStart(a)} ${u.date} ${u.label}`});return`total ${c}
${l.join(`
`)}`}var tg,rg,ng,sg,du,ig,og,ag,cg,fu,mu=M(()=>{"use strict";ae();se();tg="\x1B[0m",rg="\x1B[1;34m",ng="\x1B[1;36m",sg="\x1B[1;32m",du="",ig="\x1B[30;42m",og="\x1B[37;44m",ag="\x1B[34;42m";cg=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];fu={name:"ls",description:"List directory contents",category:"navigation",params:["[-la] [path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=K(n,["-l","--long","-la","-al"]),i=K(n,["-a","--all","-la","-al"]),o=jt(n,0,{flags:["-l","--long","-a","--all","-la","-al"]}),a=B(r,o??r);if(He(e.vfs,e.users,t,a,4),e.vfs.exists(a)){let u=e.vfs.stat(a),d=e.vfs.isSymlink(a);if(u.type==="file"||d){let p=a.split("/").pop()??a,f=Ti(d?41471:u.mode,u.type,d);if(s){let m=d?41471:u.mode,h=d?is(e.vfs,a).length:u.size??0,g=pu(m,u.type,d),y=d?`${Br(p,f)} -> ${is(e.vfs,a)}`:Br(p,f),S="uid"in u?u.uid:0,w="gid"in u?u.gid:0,b=e.users.getUsername(S)??String(S),N=e.users.getGroupName(w)??String(w);return{stdout:`${g} 1 ${b} ${N} ${h} ${Ai(u.updatedAt)} ${y}
`,exitCode:0}}return{stdout:`${Br(p,f)}
`,exitCode:0}}}let c=e.vfs.list(a).filter(u=>i||!u.startsWith("."));return{stdout:`${s?ug(e.vfs,e.users,a,c):lg(e.vfs,a,c)}
`,exitCode:0}}}});var hu,gu=M(()=>{"use strict";ae();hu={name:"lsb_release",description:"Print distribution-specific information",category:"system",params:["[-a] [-i] [-d] [-r] [-c]"],run:({args:t,shell:e})=>{let r=e.properties?.os??"Fortune GNU/Linux x64",n="nyx",s="1.0";try{let d=e.vfs.readFile("/etc/os-release");for(let p of d.split(`
`))p.startsWith("PRETTY_NAME=")&&(r=p.slice(12).replace(/^"|"$/g,"").trim()),p.startsWith("VERSION_CODENAME=")&&(n=p.slice(17).trim()),p.startsWith("VERSION_ID=")&&(s=p.slice(11).replace(/^"|"$/g,"").trim())}catch{}let i=K(t,["-a","--all"]),o=K(t,["-i","--id"]),a=K(t,["-d","--description"]),c=K(t,["-r","--release"]),l=K(t,["-c","--codename"]);if(i||t.length===0)return{stdout:["Distributor ID:	Fortune",`Description:	${r}`,`Release:	${s}`,`Codename:	${n}`].join(`
`),exitCode:0};let u=[];return o&&u.push("Distributor ID:	Fortune"),a&&u.push(`Description:	${r}`),c&&u.push(`Release:	${s}`),l&&u.push(`Codename:	${n}`),{stdout:u.join(`
`),exitCode:0}}}});var yu,Su=M(()=>{"use strict";yu={name:"lsof",description:"List open files",category:"system",params:["[-p <pid>] [-u <user>] [-i [addr]]"],run:({authUser:t,args:e})=>{if(e.includes("-i"))return{stdout:`COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
${["sshd       1234     root    3u  IPv4  12345      0t0  TCP *:22 (LISTEN)","nginx       567     root    6u  IPv4  23456      0t0  TCP *:80 (LISTEN)"].join(`
`)}`,exitCode:0};let n="COMMAND    PID     USER   FD   TYPE DEVICE SIZE/OFF NODE NAME",s=[`bash      1001 ${t}  cwd    DIR    8,1     4096    2 /home/${t}`,`bash      1001 ${t}  txt    REG    8,1  1183448   23 /bin/bash`,`bash      1001 ${t}    0u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    1u   CHR  136,0      0t0    3 /dev/pts/0`,`bash      1001 ${t}    2u   CHR  136,0      0t0    3 /dev/pts/0`];return{stdout:`${n}
${s.join(`
`)}`,exitCode:0}}}});var bu,_u=M(()=>{"use strict";bu={adduser:`ADDUSER(8)                User Commands                ADDUSER(8)

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
       zip -d archive.zip file.txt   # remove from archive`}});var dg,vu,wu=M(()=>{"use strict";_u();dg={gunzip:"gzip"},vu={name:"man",description:"Interface to the system reference manuals",category:"shell",params:["<command>"],run:({args:t,shell:e})=>{let r=t[0];if(!r)return{stderr:"What manual page do you want?",exitCode:1};let n=`/usr/share/man/man1/${r}.1`;if(e.vfs.exists(n))return{stdout:e.vfs.readFile(n),exitCode:0};let s=r.toLowerCase(),i=dg[s]??s,o=bu[i]??null;return o?{stdout:o,exitCode:0}:{stderr:`No manual entry for ${r}`,exitCode:16}}}});import{createHash as xu}from"node:crypto";import*as Cu from"node:path";var Iu,Pu,Eu,$u,Mu,ku,Nu,Au=M(()=>{"use strict";ae();se();Iu={name:"realpath",description:"Resolve symlinks and print absolute path",category:"files",params:["<path>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(o=>!o.startsWith("-"));if(!n)return{stderr:`realpath: missing operand
`,exitCode:1};let s=B(e,n);if(!t.vfs.exists(s))return{stderr:`realpath: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.isSymlink(s)?t.vfs.resolveSymlink(s):s;return{stdout:`${Cu.posix.normalize(i)}
`,exitCode:0}}},Pu={name:"md5sum",description:"Compute MD5 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`md5sum: missing file operand
`,exitCode:1};let s=B(e,n);if(!t.vfs.exists(s))return{stderr:`md5sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${xu("md5").update(i).digest("hex")}  ${n}
`,exitCode:0}}},Eu={name:"sha256sum",description:"Compute SHA256 hash of a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(a=>!a.startsWith("-"));if(!n)return{stderr:`sha256sum: missing file operand
`,exitCode:1};let s=B(e,n);if(!t.vfs.exists(s))return{stderr:`sha256sum: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFile(s);return{stdout:`${xu("sha256").update(i).digest("hex")}  ${n}
`,exitCode:0}}},$u={name:"strings",description:"Find printable strings in a file",category:"text",params:["<file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.find(c=>!c.startsWith("-"));if(!n)return{stderr:`strings: missing file operand
`,exitCode:1};let s=B(e,n);if(!t.vfs.exists(s))return{stderr:`strings: ${n}: No such file or directory
`,exitCode:1};let i=t.vfs.readFileRaw(s),o="",a=[];for(let c=0;c<i.length;c++){let l=i[c];l>=32&&l<=126?o+=String.fromCharCode(l):(o.length>=4&&a.push(o),o="")}return o.length>=4&&a.push(o),{stdout:`${a.join(`
`)}
`,exitCode:0}}},Mu={name:"fold",description:"Wrap lines to a specified width",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ne(r,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"80",10),a=i[0],c;if(a){let d=B(e,a);if(!t.vfs.exists(d))return{stderr:`fold: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(d)}else c=n;return c?{stdout:c.split(`
`).map(d=>{if(d.length<=o)return d;let p=[];for(let f=0;f<d.length;f+=o)p.push(d.slice(f,f+o));return p.join(`
`)}).join(`
`),exitCode:0}:{exitCode:0}}},ku={name:"expand",description:"Convert tabs to spaces",category:"text",params:["[-t tabs] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ne(r,{flagsWithValue:["-t","--tabs"]}),o=Number.parseInt(s.get("-t")||s.get("--tabs")||"8",10),a=i[0],c;if(a){let u=B(e,a);if(!t.vfs.exists(u))return{stderr:`expand: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(u)}else c=n;return c?{stdout:c.replace(/\t/g," ".repeat(o)),exitCode:0}:{exitCode:0}}},Nu={name:"fmt",description:"Simple text formatter",category:"text",params:["[-w width] <file>"],run:({shell:t,cwd:e,args:r,stdin:n})=>{let{flagsWithValues:s,positionals:i}=Ne(r,{flagsWithValue:["-w"]}),o=Number.parseInt(s.get("-w")||"75",10),a=i[0],c;if(a){let p=B(e,a);if(!t.vfs.exists(p))return{stderr:`fmt: ${a}: No such file or directory
`,exitCode:1};c=t.vfs.readFile(p)}else c=n;if(!c)return{exitCode:0};let l=c.replace(/\n/g," ").split(/\s+/).filter(Boolean),u=[],d="";for(let p of l)d.length+p.length+(d?1:0)>o?(d&&u.push(d),d=p):d=d?`${d} ${p}`:p;return d&&u.push(d),{stdout:`${u.join(`
`)}
`,exitCode:0}}}});import*as Tu from"node:path";var Ou,Ru=M(()=>{"use strict";ae();se();Ou={name:"mkdir",description:"Make directories",category:"files",params:["<dir>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"mkdir: missing operand",exitCode:1};for(let o=0;o<n.length;o++){let a=jt(n,o);if(!a)return{stderr:"mkdir: missing operand",exitCode:1};let c=B(r,a);He(e.vfs,e.users,t,Tu.posix.dirname(c),2),e.vfs.mkdir(c,493,s,i)}return{exitCode:0}}}});var Du,Fu,Lu,Uu=M(()=>{"use strict";Du=["null","zero","full","random","urandom","tty","console","ptmx","stdin","stdout","stderr"],Fu={name:"mknod",description:"Create a special file (device node)",category:"system",params:["[-t type] <path>"],run:({shell:t,args:e})=>{let r="null",n="";for(let s=0;s<e.length;s++){let i=e[s];if(i==="-t"&&s+1<e.length){let o=e[++s];if(!Du.includes(o))return{stderr:`mknod: invalid device type '${o}'. Valid: ${Du.join(", ")}`,exitCode:1};r=o}else i&&!i.startsWith("-")&&(n=i)}if(!n)return{stderr:`mknod: missing file operand
Usage: mknod [-t type] <path>`,exitCode:1};try{return t.vfs.mknod(n,r),{exitCode:0}}catch(s){return{stderr:`mknod: ${s instanceof Error?s.message:String(s)}`,exitCode:1}}}},Lu={name:"mkfifo",description:"Create a named pipe (FIFO)",category:"system",params:["<path>"],run:({shell:t,args:e,authUser:r})=>{let n=e.find(o=>!o.startsWith("-"));if(!n)return{stderr:`mkfifo: missing operand
Usage: mkfifo <path>`,exitCode:1};let s=t.users.getUid(r),i=t.users.getGid(r);try{return t.vfs.writeFile(n,"",{mode:420},s,i),{exitCode:0}}catch(o){return{stderr:`mkfifo: ${o instanceof Error?o.message:String(o)}`,exitCode:1}}}}});var Bu,zu=M(()=>{"use strict";Bu={name:"mousepad",aliases:["gedit","xed"],params:["[file]"],description:"Open a text file in the desktop text editor",category:"desktop",run(t){let e=t.shell.desktopManager;if(!e)return{stderr:"mousepad: desktop is only available in the browser",exitCode:1};if(!e.isActive())return{stderr:"mousepad: no desktop session running (start with startxfce4)",exitCode:1};let r=t.args[0]?t.args[0].startsWith("/")?t.args[0]:`${t.cwd}/${t.args[0]}`:"/root/untitled.txt";return e.createEditorWindow(r),{exitCode:0}}}});import*as Vu from"node:path";var Gu,Wu=M(()=>{"use strict";se();Gu={name:"mv",description:"Move or rename files",category:"files",params:["<source> <dest>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n.filter(d=>!d.startsWith("-")),[i,o]=s;if(!(i&&o))return{stderr:"mv: missing operand",exitCode:1};let a=B(r,i),c=B(r,o),l=e.users.getUid(t),u=e.users.getGid(t);try{if(He(e.vfs,e.users,t,a,2),He(e.vfs,e.users,t,Vu.posix.dirname(c),2),!e.vfs.exists(a))return{stderr:`mv: ${i}: No such file or directory`,exitCode:1};let d=e.vfs.exists(c)&&e.vfs.stat(c).type==="directory"?`${c}/${i.split("/").pop()}`:c;return e.vfs.move(a,d,l,u),{exitCode:0}}catch(d){return{stderr:`mv: ${d instanceof Error?d.message:String(d)}`,exitCode:1}}}}});import*as ju from"node:path";var Hu,qu=M(()=>{"use strict";se();Hu={name:"nano",description:"Text editor",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=n[0];if(!s)return{stderr:"nano: missing file operand",exitCode:1};let i=B(r,s);ye(t,i,"nano");let o=e.vfs.exists(i)?e.vfs.readFile(i):"",a=ju.posix.basename(i)||"buffer",c=`/tmp/sshmimic-nano-${Date.now()}-${a}.tmp`;return{openEditor:{targetPath:i,tempPath:c,initialContent:o},exitCode:0}}}});import{existsSync as ed,readdirSync as pg,readFileSync as Oi}from"node:fs";import*as We from"node:os";import*as td from"node:path";function fg(t){let e=Math.max(1,Math.floor(t/60)),r=Math.floor(e/1440),n=Math.floor(e%1440/60),s=e%60,i=[];return r>0&&i.push(`${r} day${r>1?"s":""}`),n>0&&i.push(`${n} hour${n>1?"s":""}`),(s>0||i.length===0)&&i.push(`${s} min${s>1?"s":""}`),i.join(", ")}function Yu(t){return`\x1B[${t}m   \x1B[0m`}function mg(){let t=[40,41,42,43,44,45,46,47].map(Yu).join(""),e=[100,101,102,103,104,105,106,107].map(Yu).join("");return[t,e]}function Ku(t,e,r){if(t.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i=r<=1?0:e/(r-1),o=Math.round(n.r+(s.r-n.r)*i),a=Math.round(n.g+(s.g-n.g)*i),c=Math.round(n.b+(s.b-n.b)*i);return`\x1B[38;2;${o};${a};${c}m${t}\x1B[0m`}function hg(t){if(t.trim().length===0)return t;let e=t.indexOf(":");if(e===-1)return t.includes("@")?Xu(t):t;let r=t.substring(0,e+1),n=t.substring(e+1);return Xu(r)+n}function Xu(t){let e=new RegExp("\x1B\\[[\\d;]*m","g"),r=t.replace(e,"");if(r.trim().length===0)return t;let n={r:255,g:255,b:255},s={r:168,g:85,b:247},i="";for(let o=0;o<r.length;o+=1){let a=r.length<=1?0:o/(r.length-1),c=Math.round(n.r+(s.r-n.r)*a),l=Math.round(n.g+(s.g-n.g)*a),u=Math.round(n.b+(s.b-n.b)*a);i+=`\x1B[38;2;${c};${l};${u}m${r[o]}\x1B[0m`}return i}function Zu(t){return Math.max(0,Math.round(t/(1024*1024)))}function Ju(){try{let t=Oi("/etc/os-release","utf8");for(let e of t.split(`
`)){if(!e.startsWith("PRETTY_NAME="))continue;return e.slice(12).trim().replace(/^"|"$/g,"")}}catch{}}function Qu(t){try{let e=Oi(t,"utf8").split(`
`)[0]?.trim();return!e||e.length===0?void 0:e}catch{}}function gg(t){let e=Qu("/sys/devices/virtual/dmi/id/sys_vendor"),r=Qu("/sys/devices/virtual/dmi/id/product_name");return e&&r?`${e} ${r}`:r||t}function yg(){let t=["/var/lib/dpkg/status","/usr/local/var/lib/dpkg/status"];for(let e of t)if(ed(e))try{return Oi(e,"utf8").match(/^Package:\s+/gm)?.length??0}catch{}}function Sg(){let t=["/snap","/var/lib/snapd/snaps"];for(let e of t)if(ed(e))try{return pg(e,{withFileTypes:!0}).filter(s=>s.isDirectory()).length}catch{}}function bg(){let t=yg(),e=Sg();return t!==void 0&&e!==void 0?`${t} (dpkg), ${e} (snap)`:t!==void 0?`${t} (dpkg)`:e!==void 0?`${e} (snap)`:"n/a"}function _g(t){let e=We.cpus(),r=t.cpuCapCores,n=r!==void 0&&r>0?e.slice(0,r):e;if(n.length===0)return"unknown";let s=n[0];if(!s)return"unknown";let i=(s.speed/1e3).toFixed(2);return`${s.model} (${n.length}) @ ${i}GHz`}function vg(t){return!t||t.trim().length===0?"unknown":td.posix.basename(t.trim())}function wg(t){let e=We.totalmem(),r=We.freemem(),n=t.ramCapBytes,s=n!==void 0&&n>0?Math.min(e,n):e,i=n!==void 0&&n>0?Math.floor(s*(r/e)):r,o=Math.max(0,s-i),a=t.shellProps,c=process.uptime();return t.uptimeSeconds===void 0&&(t.uptimeSeconds=Math.round(c)),{user:t.user,host:t.host,osName:a?.os??t.osName??`${Ju()??We.type()} ${We.arch()}`,kernel:a?.kernel??t.kernel??We.release(),uptimeSeconds:t.uptimeSeconds??We.uptime(),packages:t.packages??bg(),shell:vg(t.shell),shellProps:t.shellProps??{kernel:t.kernel??We.release(),os:t.osName??`${Ju()??We.type()} ${We.arch()}`,arch:We.arch()},resolution:t.resolution??a?.resolution??"n/a (ssh)",terminal:t.terminal??"unknown",cpu:t.cpu??_g(t),gpu:t.gpu??a?.gpu??"n/a",memoryUsedMiB:t.memoryUsedMiB??Zu(o),memoryTotalMiB:t.memoryTotalMiB??Zu(s),cpuCapCores:t.cpuCapCores??0,ramCapBytes:t.ramCapBytes??0}}function rd(t){let e=wg(t),r=fg(e.uptimeSeconds),n=mg(),s=["                               .. .:.    "," .::..                       ..     ..   ",".    ....                  ...       ..  ",":       ....             .:.          .. ",":           .:.:........:.            .. ",":                                     .. ",".                                      : ",".                                      : ","..                                     : "," :.                                   .. "," ..                                   .. "," :-.                                  :: ","  .:.                                 :. ","   ..:                               ... ","   ..:                               :.. ","  :...                              :....","   ..                                ....","   .                                  .. ","  .:.                                 .: ","  :.                                  .. "," ::.                                 ..  ",".....                          ..:...    ","...:.                         ..         ",".:...:.       ::.           ..           ","  ... ..:::::..  ..:::::::..             "],i=[`${e.user}@${e.host}`,"-------------------------",`OS: ${e.osName}`,`Host: ${gg(e.host)}`,`Kernel: ${e.kernel}`,`Uptime: ${r}`,`Packages: ${e.packages}`,`Shell: ${e.shell}`,`Resolution: ${e.resolution}`,`Terminal: ${e.terminal}`,`CPU: ${e.cpu}`,`GPU: ${e.gpu}`,`Memory: ${e.memoryUsedMiB}MiB / ${e.memoryTotalMiB}MiB`,"",n[0],n[1]],o=Math.max(s.length,i.length),a=[];for(let c=0;c<o;c+=1){let l=s[c]??"",u=i[c]??"";if(u.length>0){let d=Ku(l.padEnd(31," "),c,s.length),p=hg(u);a.push(`${d}  ${p}`);continue}a.push(Ku(l,c,s.length))}return a.join(`
`)}var nd=M(()=>{"use strict"});var sd,id=M(()=>{"use strict";nd();ae();sd={name:"neofetch",description:"System info display",category:"system",params:["[--off]"],run:({args:t,authUser:e,hostname:r,shell:n,env:s})=>n.packageManager.isInstalled("neofetch")?K(t,"--help")?{stdout:"Usage: neofetch [--off]",exitCode:0}:K(t,"--off")?{stdout:`${e}@${r}`,exitCode:0}:{stdout:rd({user:e,host:r,shell:s.vars.SHELL,shellProps:n.properties,terminal:s.vars.TERM,uptimeSeconds:Math.floor((Date.now()-n.startTime)/1e3),packages:`${n.packageManager?.installedCount()??0} (dpkg)`,cpuCapCores:n.resourceCaps?.cpuCapCores,ramCapBytes:n.resourceCaps?.ramCapBytes}),exitCode:0}:{stderr:`bash: neofetch: command not found
Hint: install it with: apt install neofetch
`,exitCode:127}}});var od,ad=M(()=>{"use strict";od={name:"nc",aliases:["netcat"],description:"Netcat network utility",category:"net",params:["[-l] [-p port] [-v]"],run:async({args:t})=>{let e;try{e=await import("node:net")}catch{return{stderr:`nc: not available in this environment
`,exitCode:1}}let r=e,n=t.includes("-l"),s=t.indexOf("-p"),i=s!==-1&&t[s+1]?Number.parseInt(t[s+1],10):void 0,o=t.includes("-v");if(n&&i)return new Promise(u=>{let d=r.createServer(p=>{let f="";p.on("data",m=>{f+=m.toString()}),p.on("end",()=>{d.close(),u({stdout:f,exitCode:0})})});d.listen(i,()=>{o&&u({stdout:`Listening on port ${i}...
`,exitCode:0})}),setTimeout(()=>{d.close(),u({exitCode:0})},5e3)});let a=t.filter(u=>!u.startsWith("-")),c=a[0],l=a[1]?Number.parseInt(a[1],10):Number.NaN;return c&&!Number.isNaN(l)?new Promise(u=>{let d=r.createConnection({host:c,port:l},()=>{o&&u({stdout:`Connected to ${c}:${l}
`,exitCode:0}),setTimeout(()=>{d.end(),u({exitCode:0})},3e3)});d.on("error",()=>{u({stderr:`nc: connection to ${c}:${l} failed
`,exitCode:1})}),setTimeout(()=>{d.destroy(),u({exitCode:1})},5e3)}):{stderr:`nc: missing arguments. Usage: nc [-l] [-p port] [-v] [host] [port]
`,exitCode:1}}}});var cd,ld=M(()=>{"use strict";cd={name:"newgrp",description:"Switch primary group for current session",category:"users",params:["[group]"],run:({authUser:t,shell:e,args:r})=>{let n=r[0];if(!n){let i=e.users.getGid(t);return{stdout:`newgrp: switched to default group '${e.users.getNameByGid(i)??t}' (${i})
`,exitCode:0}}let s=e.users.getGroup(n);return s?e.users.isMemberOf(t,n)?{stdout:`newgrp: switched to group '${n}' (${s.gid})
`,exitCode:0}:{stderr:`newgrp: user '${t}' is not a member of '${n}'
`,exitCode:1}:{stderr:`newgrp: group '${n}' does not exist
`,exitCode:1}}}});var ud,dd=M(()=>{"use strict";ae();Ye();ud={name:"nice",description:"Run command with adjusted scheduling priority",category:"system",params:["[-n priority] [-p pid] [command [args...]]"],run:({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let{flagsWithValues:c,positionals:l}=Ne(a,{flagsWithValue:["-n","-p"]}),u=c.get("-n"),d=c.get("-p");if(d){let h=Number.parseInt(d,10);if(Number.isNaN(h))return{stderr:`nice: invalid PID: ${d}
`,exitCode:1};let g=u===void 0?0:Number.parseInt(u,10);if(Number.isNaN(g)||g<-20||g>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let y=s.users.getProcess(h);if(!y)return{stderr:`nice: no such process: ${h}
`,exitCode:1};if(y.username!==t&&t!=="root")return{stderr:`nice: permission denied
`,exitCode:1};let S=y.nice;return s.users.setProcessNice(h,g)?{stdout:`pid ${h}: nice ${S} \u2192 ${g} (${y.priority})
`,exitCode:0}:{stderr:`nice: failed to set priority
`,exitCode:1}}let p=u===void 0?10:Number.parseInt(u,10);if(Number.isNaN(p)||p<-20||p>19)return{stderr:`nice: invalid priority: ${u} (must be -20 to 19)
`,exitCode:1};let f=l.join(" ");if(!f)return{stdout:`0
`,exitCode:0};let m={...o,NICE_PRIORITY:String(p)};return ge(f,t,e,r,n,s,i,m)}}});import pd from"node:vm";function xg(t,e){let r={version:os,versions:fd,platform:"linux",arch:"x64",env:{NODE_ENV:"production",HOME:"/root",PATH:"/usr/local/bin:/usr/bin:/bin"},argv:["node"],stdout:{write:i=>(t.push(i),!0)},stderr:{write:i=>(e.push(i),!0)},exit:(i=0)=>{throw new as(i)},cwd:()=>"/root",hrtime:()=>[0,0]},n={log:(...i)=>t.push(i.map(xt).join(" ")),error:(...i)=>e.push(i.map(xt).join(" ")),warn:(...i)=>e.push(i.map(xt).join(" ")),info:(...i)=>t.push(i.map(xt).join(" ")),dir:i=>t.push(xt(i))},s=i=>{switch(i){case"path":return{join:(...o)=>o.join("/").replace(/\/+/g,"/"),resolve:(...o)=>`/${o.join("/").replace(/^\/+/,"")}`,dirname:o=>o.split("/").slice(0,-1).join("/")||"/",basename:o=>o.split("/").pop()??"",extname:o=>{let a=o.split("/").pop()??"",c=a.lastIndexOf(".");return c>0?a.slice(c):""},sep:"/",delimiter:":"};case"os":return{platform:()=>"linux",arch:()=>"x64",type:()=>"Linux",hostname:()=>"fortune-vm",homedir:()=>"/root",tmpdir:()=>"/tmp",EOL:`
`};case"util":return{format:(...o)=>o.map(xt).join(" "),inspect:o=>xt(o)};case"fs":case"fs/promises":throw new Error(`Cannot require '${i}': filesystem access not available in virtual runtime`);case"child_process":case"net":case"http":case"https":throw new Error(`Cannot require '${i}': not available in virtual runtime`);default:throw new Error(`Cannot find module '${i}'`)}};return s.resolve=i=>{throw new Error(`Cannot resolve '${i}'`)},s.cache={},s.extensions={},pd.createContext({console:n,process:r,require:s,Math,JSON,Object,Array,String,Number,Boolean,Symbol,Date,RegExp,Error,TypeError,RangeError,SyntaxError,Promise,Map,Set,WeakMap,WeakSet,parseInt,parseFloat,isNaN,isFinite,encodeURIComponent,decodeURIComponent,encodeURI,decodeURI,setTimeout:()=>{},clearTimeout:()=>{},setInterval:()=>{},clearInterval:()=>{},queueMicrotask:()=>{},globalThis:void 0,undefined:void 0,Infinity:1/0,NaN:NaN})}function xt(t){if(t===null)return"null";if(t===void 0)return"undefined";if(typeof t=="string")return t;if(typeof t=="function")return`[Function: ${t.name||"(anonymous)"}]`;if(Array.isArray(t))return`[ ${t.map(xt).join(", ")} ]`;if(t instanceof Error)return`${t.name}: ${t.message}`;if(typeof t=="object")try{return`{ ${Object.entries(t).map(([r,n])=>`${r}: ${xt(n)}`).join(", ")} }`}catch{return"[Object]"}return String(t)}function cs(t){let e=[],r=[],n=xg(e,r),s=0;try{let i=pd.runInContext(t,n,{timeout:5e3});i!==void 0&&e.length===0&&e.push(xt(i))}catch(i){i instanceof as?s=i.code:i instanceof Error?(r.push(`${i.name}: ${i.message}`),s=1):(r.push(String(i)),s=1)}return{stdout:e.length?`${e.join(`
`)}
`:"",stderr:r.length?`${r.join(`
`)}
`:"",exitCode:s}}function Cg(t){let e=t.trim();return e.includes(`
`)||e.startsWith("const ")||e.startsWith("let ")||e.startsWith("var ")||e.startsWith("function ")||e.startsWith("class ")||e.startsWith("if ")||e.startsWith("for ")||e.startsWith("while ")||e.startsWith("import ")||e.startsWith("//")?cs(`(async () => { ${t} })()`):cs(e)}var os,fd,as,md,hd=M(()=>{"use strict";ae();se();os="v18.19.0",fd={node:os,npm:"9.2.0",v8:"10.2.154.26-node.22"};as=class{constructor(e){this.code=e}code};md={name:"node",description:"JavaScript runtime (virtual)",category:"system",params:["[--version] [-e <expr>] [-p <expr>] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("nodejs"))return{stderr:`bash: node: command not found
Hint: install it with: apt install nodejs
`,exitCode:127};if(K(t,["--version","-v"]))return{stdout:`${os}
`,exitCode:0};if(K(t,["--versions"]))return{stdout:`${JSON.stringify(fd,null,2)}
`,exitCode:0};let n=t.findIndex(o=>o==="-e"||o==="--eval");if(n!==-1){let o=t[n+1];if(!o)return{stderr:`node: -e requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=cs(o);return{stdout:a||void 0,stderr:c||void 0,exitCode:l}}let s=t.findIndex(o=>o==="-p"||o==="--print");if(s!==-1){let o=t[s+1];if(!o)return{stderr:`node: -p requires an argument
`,exitCode:1};let{stdout:a,stderr:c,exitCode:l}=cs(o);return{stdout:a||(l===0?`
`:void 0),stderr:c||void 0,exitCode:l}}let i=t.find(o=>!o.startsWith("-"));if(i){let o=B(r,i);if(!e.vfs.exists(o))return{stderr:`node: cannot open file '${i}': No such file or directory
`,exitCode:1};let a=e.vfs.readFile(o),{stdout:c,stderr:l,exitCode:u}=Cg(a);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:[`Welcome to Node.js ${os}.`,'Type ".exit" to exit the REPL.',"> "].join(`
`),exitCode:0}}}});var gd,yd=M(()=>{"use strict";Ye();gd={name:"nohup",description:"Run command immune to hup signals",category:"system",params:["<command> [args...]"],run:({authUser:t,hostname:e,mode:r,cwd:n,shell:s,stdin:i,env:o,args:a})=>{let c=a.join(" ");return c?ge(c,t,e,r,n,s,i,o):{stderr:`nohup: missing command
`,exitCode:1}}}});var ls,Ig,Sd,bd,_d=M(()=>{"use strict";ae();ls="9.2.0",Ig="18.19.0",Sd={name:"npm",description:"Node.js package manager (virtual)",category:"system",params:["<command> [args]"],run:({args:t,shell:e})=>{if(!e.packageManager.isInstalled("npm"))return{stderr:`bash: npm: command not found
Hint: install it with: apt install npm
`,exitCode:127};if(K(t,["--version","-v"]))return{stdout:`${ls}
`,exitCode:0};let r=t[0]?.toLowerCase();switch(r){case"version":case"-version":return{stdout:`{ npm: '${ls}', node: '${Ig}', v8: '10.2.154.26' }
`,exitCode:0};case"install":case"i":case"add":return{stderr:`npm warn: package installation is not available in the virtual runtime.
npm warn: This environment simulates npm CLI behaviour only.
`,exitCode:1};case"run":case"exec":case"x":return{stderr:`npm error: script execution is not available in the virtual runtime.
`,exitCode:1};case"init":return{stdout:`Wrote to /home/user/package.json
`,exitCode:0};case"list":case"ls":return{stdout:`${r==="ls"||r==="list"?"virtual-env@1.0.0":""}
\u2514\u2500\u2500 (empty)
`,exitCode:0};case"help":case void 0:return{stdout:`${[`npm ${ls}`,"","Usage: npm <command>","","Commands:","  install       (not available in virtual runtime)","  run           (not available in virtual runtime)","  exec          (not available in virtual runtime)","  list          List installed packages","  version       Print versions","  --version     Print npm version"].join(`
`)}
`,exitCode:0};default:return{stderr:`npm error: unknown command: ${r}
`,exitCode:1}}}},bd={name:"npx",description:"Node.js package runner (virtual)",category:"system",params:["<package> [args]"],run:({args:t,shell:e})=>e.packageManager.isInstalled("npm")?K(t,["--version"])?{stdout:`${ls}
`,exitCode:0}:{stderr:`npx: package execution is not available in the virtual runtime.
`,exitCode:1}:{stderr:`bash: npx: command not found
Hint: install it with: apt install npm
`,exitCode:127}}});var vd,wd=M(()=>{"use strict";vd={name:"pacman",description:"Play ASCII Pac-Man (myman graphics, WASD/arrows)",category:"misc",params:[],run:()=>({openPacman:!0,exitCode:0})}});var xd,Cd=M(()=>{"use strict";xd={name:"passwd",description:"Change user password",category:"users",params:["[username]"],run:async({authUser:t,args:e,shell:r,stdin:n})=>{let s=e[0]??t;if(t!=="root"&&t!==s)return{stderr:"passwd: permission denied",exitCode:1};if(!r.users.listUsers().includes(s))return{stderr:`passwd: user '${s}' does not exist`,exitCode:1};if(n!==void 0&&n.trim().length>0){let i=n.trim().split(`
`)[0];return await r.users.setPassword(s,i),{stdout:`passwd: password updated successfully
`,exitCode:0}}return{passwordChallenge:{prompt:"New password: ",confirmPrompt:"Retype new password: ",action:"passwd",targetUsername:s},exitCode:0}}}});var Id,Pd=M(()=>{"use strict";Id={name:"perl",description:"Practical Extraction and Report Language",category:"scripting",params:["[-e <expr>] [-p] [-n] [-i] [file]"],run:({args:t,stdin:e})=>{let r=t.indexOf("-e"),n=r===-1?void 0:t[r+1],s=t.includes("-p"),i=t.includes("-n"),o=s||i;if(!n)return{stderr:"perl: no code specified (only -e one-liners supported)",exitCode:1};let c=(e??"").split(`
`);c[c.length-1]===""&&c.pop();let l=[];if(o)for(let d=0;d<c.length;d++){let p=c[d],f=n.replace(/\$_/g,JSON.stringify(p)).replace(/\$\./g,String(d+1)),m=f.match(/^s([^a-zA-Z0-9])(.*?)\1(.*?)\1([gi]*)$/);if(m){let g=m[4]??"";try{let y=new RegExp(m[2],g.includes("i")?g.includes("g")?"gi":"i":g.includes("g")?"g":"");p=p.replace(y,m[3])}catch{}s&&l.push(p);continue}let h=f.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.+))(?:\s*;)?$/);if(h){let g=(h[1]??h[2]??h[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(n.startsWith("say")?g:g.replace(/\n$/,"")),s&&l.push(p);continue}s&&l.push(p)}else{let d=n.match(/^(?:print|say)\s+(?:STDOUT\s+)?(?:"([^"]*)"|'([^']*)'|(.*))(?:\s*;)?$/);if(d){let p=(d[1]??d[2]??d[3]??"").replace(/\\n/g,`
`).replace(/\\t/g,"	");l.push(p)}else(n.trim()==="print $]"||n.includes("version"))&&l.push("5.036001")}let u=l.join(`
`);return{stdout:u+(u&&!u.endsWith(`
`)?`
`:""),exitCode:0}}}});async function Eg(t,e){try{let{execSync:r}=await import("node:child_process");return{stdout:r(`ping -c ${t} ${e}`,{timeout:3e4,encoding:"utf8",stdio:["ignore","pipe","pipe"]})}}catch(r){let n=r instanceof Error?r.stderr:"";return n?{stderr:n}:null}}var Pg,Ed,$d=M(()=>{"use strict";ae();Pg=typeof process>"u"||typeof process.versions?.node>"u";Ed={name:"ping",description:"Send ICMP ECHO_REQUEST to network hosts",category:"network",params:["[-c <count>] <host>"],run:async({args:t,shell:e})=>{let{flagsWithValues:r,positionals:n}=Ne(t,{flagsWithValue:["-c","-i","-W"]}),s=n[0]??"localhost",i=r.get("-c"),o=i?Math.max(1,Number.parseInt(i,10)||4):4;if(!Pg){let p=await Eg(o,s);if(p)return{...p,exitCode:"stdout"in p?0:1}}let a=[`PING ${s} (${s==="localhost"?"127.0.0.1":s}): 56 data bytes`],c=0,l=0;for(let p=0;p<o;p++){c++;let f=e.network.ping(s);f<0?a.push(`From ${s} icmp_seq=${p} Destination Host Unreachable`):(l++,a.push(`64 bytes from ${s}: icmp_seq=${p} ttl=64 time=${f.toFixed(3)} ms`))}let d=((c-l)/c*100).toFixed(0);return a.push(`--- ${s} ping statistics ---`),a.push(`${c} packets transmitted, ${l} received, ${d}% packet loss`),{stdout:`${a.join(`
`)}
`,exitCode:0}}}});function $g(t,e){let r=0,n="",s=0;for(;s<t.length;){if(t[s]==="\\"&&s+1<t.length)switch(t[s+1]){case"n":n+=`
`,s+=2;continue;case"t":n+="	",s+=2;continue;case"r":n+="\r",s+=2;continue;case"\\":n+="\\",s+=2;continue;case"a":n+="\x07",s+=2;continue;case"b":n+="\b",s+=2;continue;case"f":n+="\f",s+=2;continue;case"v":n+="\v",s+=2;continue;default:n+=t[s],s++;continue}if(t[s]==="%"&&s+1<t.length){let i=s+1,o=!1;t[i]==="-"&&(o=!0,i++);let a=!1;t[i]==="0"&&(a=!0,i++);let c=0;for(;i<t.length&&/\d/.test(t[i]);)c=c*10+Number.parseInt(t[i],10),i++;let l=-1;if(t[i]===".")for(i++,l=0;i<t.length&&/\d/.test(t[i]);)l=l*10+Number.parseInt(t[i],10),i++;let u=t[i],d=e[r++]??"",p=(f,m=" ")=>{if(c<=0||f.length>=c)return f;let h=m.repeat(c-f.length);return o?f+h:h+f};switch(u){case"s":{let f=String(d);l>=0&&(f=f.slice(0,l)),n+=p(f);break}case"d":case"i":n+=p(String(Number.parseInt(d,10)||0),a?"0":" ");break;case"f":{let f=l>=0?l:6;n+=p((Number.parseFloat(d)||0).toFixed(f));break}case"o":n+=p((Number.parseInt(d,10)||0).toString(8),a?"0":" ");break;case"x":n+=p((Number.parseInt(d,10)||0).toString(16),a?"0":" ");break;case"X":n+=p((Number.parseInt(d,10)||0).toString(16).toUpperCase(),a?"0":" ");break;case"%":n+="%",r--;break;default:n+=t[s],s++;continue}s=i+1;continue}n+=t[s],s++}return n}var Md,kd=M(()=>{"use strict";Md={name:"printf",description:"Format and print data",category:"shell",params:["<format> [args...]"],run:({args:t})=>{let e=t[0];return e?{stdout:$g(e,t.slice(1)),exitCode:0}:{stderr:"printf: missing format string",exitCode:1}}}});var Nd,Ad,Td=M(()=>{"use strict";Nd={name:"pgrep",description:"List process IDs matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,args:e})=>{let r=e.includes("-f"),n=e.find(s=>!s.startsWith("-"));if(!n)return{stderr:`pgrep: missing pattern
`,exitCode:1};try{let s=new RegExp(n),i=[];for(let o=0;o<t.length;o++){let a=t[o];if(a===void 0)continue;let c=r?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;s.test(c)&&i.push(String(1e3+o))}return i.length===0?{exitCode:1}:{stdout:`${i.join(`
`)}
`,exitCode:0}}catch{return{stderr:`pgrep: invalid pattern
`,exitCode:2}}}},Ad={name:"pkill",description:"Kill processes matching a pattern",category:"system",params:["[-f] <pattern>"],run:({activeSessions:t,shell:e,args:r})=>{let n=r.includes("-f"),s=r.find(i=>!i.startsWith("-"));if(!s)return{stderr:`pkill: missing pattern
`,exitCode:1};try{let i=new RegExp(s),o=0;for(let a of t){let c=n?`${a.username} ${a.tty} ${a.remoteAddress} ${a.id}`:a.username;i.test(c)&&(e.users.unregisterSession(a.id),o++)}return o===0?{exitCode:1}:{stdout:`killed ${o} process(es)
`,exitCode:0}}catch{return{stderr:`pkill: invalid pattern
`,exitCode:2}}}}});var Od,Rd=M(()=>{"use strict";ae();Od={name:"ps",description:"Report process status",category:"system",params:["[-a] [-u] [-x] [aux]"],run:({authUser:t,shell:e,args:r})=>{let n=e.users.listActiveSessions(),s=e.users.listProcesses(),i=K(r,["-u"])||r.includes("u")||r.includes("aux")||r.includes("au"),o=K(r,["-a","-x"])||r.includes("a")||r.includes("aux"),a=new Map(n.map((d,p)=>[d.id,1e3+p])),c=1e3+n.length;if(i){let p=["USER       PID  NI PRI %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND"];for(let f of n){let m=f.username.padEnd(10).slice(0,10),h=(Math.random()*.5).toFixed(1),g=Math.floor(Math.random()*2e4+5e3),y=Math.floor(Math.random()*5e3+1e3);p.push(`${m} ${String(a.get(f.id)).padStart(6)}   0  20  0.0  ${h.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${f.tty.padEnd(8)} Ss   00:00   0:00 bash`)}for(let f of s){if(!o&&f.username!==t)continue;let m=f.username.padEnd(10).slice(0,10),h=(Math.random()*1.5).toFixed(1),g=Math.floor(Math.random()*5e4+1e4),y=Math.floor(Math.random()*1e4+2e3),S=f.nice??0,w=20-S;p.push(`${m} ${String(f.pid).padStart(6)} ${String(S).padStart(3)} ${String(w).padStart(3)}  0.1  ${h.padStart(4)} ${String(g).padStart(6)} ${String(y).padStart(5)} ${f.tty.padEnd(8)} S    00:00   0:00 ${f.command}`)}return p.push(`root       ${String(c).padStart(6)}   0  20  0.0   0.0      0      0 ?        S    00:00   0:00 ps`),{stdout:p.join(`
`),exitCode:0}}let u=["  PID TTY          TIME CMD"];for(let d of n)!o&&d.username!==t||u.push(`${String(a.get(d.id)).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.username===t?"bash":`bash (${d.username})`}`);for(let d of s)!o&&d.username!==t||u.push(`${String(d.pid).padStart(5)} ${d.tty.padEnd(12)} 00:00:00 ${d.command}`);return u.push(`${String(c).padStart(5)} pts/0        00:00:00 ps`),{stdout:u.join(`
`),exitCode:0}}}});var Dd,Fd=M(()=>{"use strict";Dd={name:"pwd",description:"Print working directory",category:"navigation",params:[],run:({cwd:t})=>({stdout:t,exitCode:0})}});function ke(t=[]){return{__pytype__:"dict",data:new Map(t)}}function Ri(t,e,r=1){return{__pytype__:"range",start:t,stop:e,step:r}}function Ee(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="dict"}function Vr(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="range"}function Ct(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="func"}function Di(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="class"}function gn(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="instance"}function Ft(t){return!!t&&typeof t=="object"&&!Array.isArray(t)&&t.__pytype__==="none"}function Be(t){return t===null||Ft(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?`'${t.replace(/'/g,"\\'")}'`:Array.isArray(t)?`[${t.map(Be).join(", ")}]`:Ee(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Be(r)}`).join(", ")}}`:Vr(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:Ct(t)?`<function ${t.name} at 0x...>`:Di(t)?`<class '${t.name}'>`:gn(t)?`<${t.cls.name} object at 0x...>`:String(t)}function te(t){return t===null||Ft(t)?"None":t===!0?"True":t===!1?"False":typeof t=="number"?Number.isInteger(t)?String(t):t.toPrecision(12).replace(/\.?0+$/,""):typeof t=="string"?t:Array.isArray(t)?`[${t.map(Be).join(", ")}]`:Ee(t)?`{${[...t.data.entries()].map(([e,r])=>`'${e}': ${Be(r)}`).join(", ")}}`:Vr(t)?`range(${t.start}, ${t.stop}${t.step===1?"":`, ${t.step}`})`:Be(t)}function rt(t){return t===null||Ft(t)?!1:typeof t=="boolean"?t:typeof t=="number"?t!==0:typeof t=="string"||Array.isArray(t)?t.length>0:Ee(t)?t.data.size>0:Vr(t)?Ud(t)>0:!0}function Ud(t){if(t.step===0)return 0;let e=Math.ceil((t.stop-t.start)/t.step);return Math.max(0,e)}function kg(t){let e=[];for(let r=t.start;(t.step>0?r<t.stop:r>t.stop)&&(e.push(r),!(e.length>1e4));r+=t.step);return e}function Ue(t){if(Array.isArray(t))return t;if(typeof t=="string")return[...t];if(Vr(t))return kg(t);if(Ee(t))return[...t.data.keys()];throw new Me("TypeError",`'${pr(t)}' object is not iterable`)}function pr(t){return t===null||Ft(t)?"NoneType":typeof t=="boolean"?"bool":typeof t=="number"?Number.isInteger(t)?"int":"float":typeof t=="string"?"str":Array.isArray(t)?"list":Ee(t)?"dict":Vr(t)?"range":Ct(t)?"function":Di(t)?"type":gn(t)?t.cls.name:"object"}function Ng(t){let e=new Map,r=ke([["sep","/"],["linesep",`
`],["curdir","."],["pardir",".."]]);return r.__methods__={getcwd:()=>t,getenv:n=>typeof n=="string"?process.env[n]??L:L,path:ke([["join",L],["exists",L],["dirname",L],["basename",L]]),listdir:()=>[]},e.set("__builtins__",L),e.set("__name__","__main__"),e.set("__cwd__",t),e}function Ag(t){let e=ke([["sep","/"],["curdir","."]]),r=ke([["sep","/"],["linesep",`
`],["name","posix"]]);return r._cwd=t,e._cwd=t,r.path=e,r}function Tg(){return ke([["version",us],["version_info",ke([["major",3],["minor",11],["micro",2]].map(([t,e])=>[t,e]))],["platform","linux"],["executable","/usr/bin/python3"],["prefix","/usr"],["path",["/usr/lib/python3.11","/usr/lib/python3.11/lib-dynload"]],["argv",[""]],["maxsize",9007199254740991]])}function Og(){return ke([["pi",Math.PI],["e",Math.E],["tau",Math.PI*2],["inf",Number.POSITIVE_INFINITY],["nan",Number.NaN],["sqrt",L],["floor",L],["ceil",L],["log",L],["pow",L],["sin",L],["cos",L],["tan",L],["fabs",L],["factorial",L]])}function Rg(){return ke([["dumps",L],["loads",L]])}function Dg(){return ke([["match",L],["search",L],["findall",L],["sub",L],["split",L],["compile",L]])}var Mg,us,L,Me,zr,yn,Sn,bn,Ld,ds,Bd,zd=M(()=>{"use strict";ae();se();Mg="Python 3.11.2",us="3.11.2 (default, Mar 13 2023, 12:18:29) [GCC 12.2.0]",L={__pytype__:"none"};Me=class{constructor(e,r){this.type=e;this.message=r}type;message;toString(){return`${this.type}: ${this.message}`}},zr=class{constructor(e){this.value=e}value},yn=class{},Sn=class{},bn=class{constructor(e){this.code=e}code};Ld={os:Ag,sys:()=>Tg(),math:()=>Og(),json:()=>Rg(),re:()=>Dg(),random:()=>ke([["random",L],["randint",L],["choice",L],["shuffle",L]]),time:()=>ke([["time",L],["sleep",L],["ctime",L]]),datetime:()=>ke([["datetime",L],["date",L],["timedelta",L]]),collections:()=>ke([["Counter",L],["defaultdict",L],["OrderedDict",L]]),itertools:()=>ke([["chain",L],["product",L],["combinations",L],["permutations",L]]),functools:()=>ke([["reduce",L],["partial",L],["lru_cache",L]]),string:()=>ke([["ascii_letters","abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"],["digits","0123456789"],["punctuation","!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"]])},ds=class t{constructor(e){this.cwd=e}cwd;_output=[];_stderr=[];_modules=new Map;getOutput(){return this._output.join(`
`)+(this._output.length?`
`:"")}getStderr(){return this._stderr.join(`
`)+(this._stderr.length?`
`:"")}static _splitArgs(e){let r=[],n=0,s="",i=!1,o="";for(let a=0;a<e.length;a++){let c=e[a];i?(s+=c,c===o&&e[a-1]!=="\\"&&(i=!1)):c==='"'||c==="'"?(i=!0,o=c,s+=c):"([{".includes(c)?(n++,s+=c):")]}".includes(c)?(n--,s+=c):c===","&&n===0?(r.push(s.trim()),s=""):s+=c}return s.trim()&&r.push(s.trim()),r}pyEval(e,r){if(e=e.trim(),!e||e==="None")return L;if(e==="True")return!0;if(e==="False")return!1;if(e==="...")return L;if(/^-?\d+$/.test(e))return Number.parseInt(e,10);if(/^-?\d+\.\d*$/.test(e))return Number.parseFloat(e);if(/^0x[0-9a-fA-F]+$/.test(e))return Number.parseInt(e,16);if(/^0o[0-7]+$/.test(e))return Number.parseInt(e.slice(2),8);if(/^('''[\s\S]*'''|"""[\s\S]*""")$/.test(e))return e.slice(3,-3);if(/^(['"])(.*)\1$/s.test(e))return e.slice(1,-1).replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\").replace(/\\'/g,"'").replace(/\\"/g,'"');let n=e.match(/^f(['"])([\s\S]*)\1$/);if(n){let l=n[2];return l=l.replace(/\{([^{}]+)\}/g,(u,d)=>{try{return te(this.pyEval(d.trim(),r))}catch{return`{${d}}`}}),l}let s=e.match(/^b(['"])(.*)\1$/s);if(s)return s[2];if(e.startsWith("[")&&e.endsWith("]")){let l=e.slice(1,-1).trim();if(!l)return[];let u=l.match(/^(.+?)\s+for\s+(\w+)\s+in\s+(.+?)(?:\s+if\s+(.+))?$/);if(u){let[,d,p,f,m]=u,h=Ue(this.pyEval(f.trim(),r)),g=[];for(let y of h){let S=new Map(r);S.set(p,y),!(m&&!rt(this.pyEval(m,S)))&&g.push(this.pyEval(d.trim(),S))}return g}return t._splitArgs(l).map(d=>this.pyEval(d,r))}if(e.startsWith("(")&&e.endsWith(")")){let l=e.slice(1,-1).trim();if(!l)return[];let u=t._splitArgs(l);return u.length===1&&!l.endsWith(",")?this.pyEval(u[0],r):u.map(d=>this.pyEval(d,r))}if(e.startsWith("{")&&e.endsWith("}")){let l=e.slice(1,-1).trim();if(!l)return ke();let u=ke();for(let d of t._splitArgs(l)){let p=d.indexOf(":");if(p===-1)continue;let f=te(this.pyEval(d.slice(0,p).trim(),r)),m=this.pyEval(d.slice(p+1).trim(),r);u.data.set(f,m)}return u}let i=e.match(/^not\s+(.+)$/);if(i)return!rt(this.pyEval(i[1],r));let o=[["or"],["and"],["in","not in","is not","is","==","!=","<=",">=","<",">"],["+","-"],["**"],["*","//","/","%"]];for(let l of o){let u=this._tryBinaryOp(e,l,r);if(u!==void 0)return u}if(e.startsWith("-")){let l=this.pyEval(e.slice(1),r);if(typeof l=="number")return-l}if(process.env.PY_DEBUG&&console.error("eval:",JSON.stringify(e)),e.endsWith("]")&&!e.startsWith("[")){let l=t._findMatchingBracket(e,"[");if(l!==-1){let u=this.pyEval(e.slice(0,l),r),d=e.slice(l+1,-1);return this._subscript(u,d,r)}}let a=e.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*\(([\s\S]*)\)$/);if(a){let[,l,u]=a,d=(u?.trim()?t._splitArgs(u):[]).map(p=>this.pyEval(p,r));return this._callBuiltin(l,d,r)}let c=this._findDotAccess(e);if(c){let{objExpr:l,attr:u,callPart:d}=c,p=this.pyEval(l,r);if(d!==void 0){let f=d.slice(1,-1),m=f.trim()?t._splitArgs(f).map(h=>this.pyEval(h,r)):[];return this._callMethod(p,u,m)}return t._getAttr(p,u,r)}if(/^[A-Za-z_][A-Za-z0-9_]*$/.test(e)){if(r.has(e))return r.get(e);throw new Me("NameError",`name '${e}' is not defined`)}if(/^[A-Za-z_][A-Za-z0-9_.]+$/.test(e)){let l=e.split("."),u=r.get(l[0])??(()=>{throw new Me("NameError",`name '${l[0]}' is not defined`)})();for(let d of l.slice(1))u=t._getAttr(u,d,r);return u}return L}static _findMatchingBracket(e,r){let n=r==="["?"]":r==="("?")":"}",s=0;for(let i=e.length-1;i>=0;i--)if(e[i]===n&&s++,e[i]===r&&(s--,s===0))return i;return-1}_findDotAccess(e){let r=0,n=!1,s="";for(let i=e.length-1;i>0;i--){let o=e[i];if(n){o===s&&e[i-1]!=="\\"&&(n=!1);continue}if(o==='"'||o==="'"){n=!0,s=o;continue}if(")]}".includes(o)){r++;continue}if("([{".includes(o)){r--;continue}if(r!==0||o!==".")continue;let a=e.slice(0,i).trim(),l=e.slice(i+1).match(/^(\w+)(\([\s\S]*\))?$/);if(l&&!/^-?\d+$/.test(a))return{objExpr:a,attr:l[1],callPart:l[2]}}return null}_tryBinaryOp(e,r,n){let s=0,i=!1,o="";for(let a=e.length-1;a>=0;a--){let c=e[a];if(i){c===o&&e[a-1]!=="\\"&&(i=!1);continue}if(c==='"'||c==="'"){i=!0,o=c;continue}if(")]}".includes(c)){s++;continue}if("([{".includes(c)){s--;continue}if(s===0){for(let l of r)if(e.slice(a,a+l.length)===l){if(l==="*"&&(e[a+1]==="*"||e[a-1]==="*"))continue;let u=e[a-1],d=e[a+l.length];if(/^[a-z]/.test(l)&&(u&&/\w/.test(u)||d&&/\w/.test(d)))continue;let f=e.slice(0,a).trim(),m=e.slice(a+l.length).trim();if(!(f&&m))continue;return this._applyBinaryOp(l,f,m,n)}}}}_applyBinaryOp(e,r,n,s){if(e==="and"){let a=this.pyEval(r,s);return rt(a)?this.pyEval(n,s):a}if(e==="or"){let a=this.pyEval(r,s);return rt(a)?a:this.pyEval(n,s)}let i=this.pyEval(r,s),o=this.pyEval(n,s);switch(e){case"+":return typeof i=="string"&&typeof o=="string"?i+o:Array.isArray(i)&&Array.isArray(o)?[...i,...o]:i+o;case"-":return i-o;case"*":if(typeof i=="string"&&typeof o=="number")return i.repeat(o);if(Array.isArray(i)&&typeof o=="number"){let a=[],c=o|0;for(let l=0;l<c;l++)for(let u=0;u<i.length;u++)a.push(i[u]);return a}return i*o;case"/":{if(o===0)throw new Me("ZeroDivisionError","division by zero");return i/o}case"//":{if(o===0)throw new Me("ZeroDivisionError","integer division or modulo by zero");return Math.floor(i/o)}case"%":{if(typeof i=="string")return t._pyStringFormat(i,Array.isArray(o)?o:[o]);if(o===0)throw new Me("ZeroDivisionError","integer division or modulo by zero");return i%o}case"**":return i**o;case"==":return Be(i)===Be(o)||i===o;case"!=":return Be(i)!==Be(o)&&i!==o;case"<":return i<o;case"<=":return i<=o;case">":return i>o;case">=":return i>=o;case"in":return t._pyIn(o,i);case"not in":return!t._pyIn(o,i);case"is":return i===o||Ft(i)&&Ft(o);case"is not":return!(i===o||Ft(i)&&Ft(o));default:return L}}static _pyIn(e,r){return typeof e=="string"?typeof r=="string"&&e.includes(r):Array.isArray(e)?e.some(n=>Be(n)===Be(r)):Ee(e)?e.data.has(te(r)):!1}_subscript(e,r,n){if(r.includes(":")){let i=r.split(":").map(c=>c.trim()),o=i[0]?this.pyEval(i[0],n):void 0,a=i[1]?this.pyEval(i[1],n):void 0;return typeof e=="string"||Array.isArray(e)?e.slice(o,a):L}let s=this.pyEval(r,n);if(Array.isArray(e)){let i=s;return i<0&&(i=e.length+i),e[i]??L}if(typeof e=="string"){let i=s;return i<0&&(i=e.length+i),e[i]??L}if(Ee(e))return e.data.get(te(s))??L;throw new Me("TypeError",`'${pr(e)}' is not subscriptable`)}static _getAttr(e,r,n){return Ee(e)?e.data.has(r)?e.data.get(r):r==="path"&&e.path?e.path:L:gn(e)?e.attrs.get(r)??L:typeof e=="string"?{__class__:{__pytype__:"class",name:"str"}}[r]??L:L}_callMethod(e,r,n){if(typeof e=="string")switch(r){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"strip":return(n[0]?e.replace(new RegExp(`[${n[0]}]+`,"g"),""):e).trim();case"lstrip":return e.trimStart();case"rstrip":return e.trimEnd();case"split":return e.split(typeof n[0]=="string"?n[0]:/\s+/).filter((s,i)=>i>0||s!=="");case"splitlines":return e.split(`
`);case"join":return Ue(n[0]??[]).map(te).join(e);case"replace":return e.replaceAll(te(n[0]??""),te(n[1]??""));case"startswith":return e.startsWith(te(n[0]??""));case"endswith":return e.endsWith(te(n[0]??""));case"find":return e.indexOf(te(n[0]??""));case"index":{let s=e.indexOf(te(n[0]??""));if(s===-1)throw new Me("ValueError","substring not found");return s}case"count":return e.split(te(n[0]??"")).length-1;case"format":return t._pyStringFormat(e,n);case"encode":return e;case"decode":return e;case"isdigit":return/^\d+$/.test(e);case"isalpha":return/^[a-zA-Z]+$/.test(e);case"isalnum":return/^[a-zA-Z0-9]+$/.test(e);case"isspace":return/^\s+$/.test(e);case"isupper":return e===e.toUpperCase()&&e!==e.toLowerCase();case"islower":return e===e.toLowerCase()&&e!==e.toUpperCase();case"center":{let s=n[0]??0,i=te(n[1]??" ");return e.padStart(Math.floor((s+e.length)/2),i).padEnd(s,i)}case"ljust":return e.padEnd(n[0]??0,te(n[1]??" "));case"rjust":return e.padStart(n[0]??0,te(n[1]??" "));case"zfill":return e.padStart(n[0]??0,"0");case"title":return e.replace(/\b\w/g,s=>s.toUpperCase());case"capitalize":return e[0]?.toUpperCase()+e.slice(1).toLowerCase();case"swapcase":return[...e].map(s=>s===s.toUpperCase()?s.toLowerCase():s.toUpperCase()).join("");default:break}if(Array.isArray(e))switch(r){case"append":return e.push(n[0]??L),L;case"extend":for(let s of Ue(n[0]??[]))e.push(s);return L;case"insert":return e.splice(n[0]??0,0,n[1]??L),L;case"pop":{let s=n[0]===void 0?-1:n[0],i=s<0?e.length+s:s;return e.splice(i,1)[0]??L}case"remove":{let s=e.findIndex(i=>Be(i)===Be(n[0]??L));return s!==-1&&e.splice(s,1),L}case"index":{let s=e.findIndex(i=>Be(i)===Be(n[0]??L));if(s===-1)throw new Me("ValueError","is not in list");return s}case"count":return e.filter(s=>Be(s)===Be(n[0]??L)).length;case"sort":return e.sort((s,i)=>typeof s=="number"&&typeof i=="number"?s-i:te(s).localeCompare(te(i))),L;case"reverse":return e.reverse(),L;case"copy":return[...e];case"clear":return e.splice(0),L;default:break}if(Ee(e))switch(r){case"keys":return[...e.data.keys()];case"values":return[...e.data.values()];case"items":return[...e.data.entries()].map(([s,i])=>[s,i]);case"get":return e.data.get(te(n[0]??""))??n[1]??L;case"update":{if(Ee(n[0]??L))for(let[s,i]of n[0].data)e.data.set(s,i);return L}case"pop":{let s=te(n[0]??""),i=e.data.get(s)??n[1]??L;return e.data.delete(s),i}case"clear":return e.data.clear(),L;case"copy":return ke([...e.data.entries()]);case"setdefault":{let s=te(n[0]??"");return e.data.has(s)||e.data.set(s,n[1]??L),e.data.get(s)??L}default:break}if(Ee(e)&&e.data.has("name")&&e.data.get("name")==="posix")switch(r){case"getcwd":return this.cwd;case"getenv":return typeof n[0]=="string"?process.env[n[0]]??n[1]??L:L;case"listdir":return[];case"path":return e;default:break}if(Ee(e))switch(r){case"join":return n.map(te).join("/").replace(/\/+/g,"/");case"exists":return!1;case"dirname":return te(n[0]??"").split("/").slice(0,-1).join("/")||"/";case"basename":return te(n[0]??"").split("/").pop()??"";case"abspath":return te(n[0]??"");case"splitext":{let s=te(n[0]??""),i=s.lastIndexOf(".");return i>0?[s.slice(0,i),s.slice(i)]:[s,""]}case"isfile":return!1;case"isdir":return!1;default:break}if(Ee(e)&&e.data.has("version")&&e.data.get("version")===us&&r==="exit")throw new bn(n[0]??0);if(Ee(e)){let s={sqrt:Math.sqrt,floor:Math.floor,ceil:Math.ceil,fabs:Math.abs,log:Math.log,log2:Math.log2,log10:Math.log10,sin:Math.sin,cos:Math.cos,tan:Math.tan,asin:Math.asin,acos:Math.acos,atan:Math.atan,atan2:Math.atan2,pow:Math.pow,exp:Math.exp,hypot:Math.hypot};if(r in s){let i=s[r];return i(...n.map(o=>o))}if(r==="factorial"){let i=n[0]??0,o=1;for(;i>1;)o*=i--;return o}if(r==="gcd"){let i=Math.abs(n[0]??0),o=Math.abs(n[1]??0);for(;o;)[i,o]=[o,i%o];return i}}if(Ee(e)){if(r==="dumps"){let s=Ee(n[1]??L)?n[1]:void 0,i=s?s.data.get("indent"):void 0;return JSON.stringify(this._pyToJs(n[0]??L),null,i)}if(r==="loads")return this._jsToPy(JSON.parse(te(n[0]??"")))}if(gn(e)){let s=e.attrs.get(r)??e.cls.methods.get(r)??L;if(Ct(s)){let i=new Map(s.closure);return i.set("self",e),s.params.slice(1).forEach((o,a)=>i.set(o,n[a]??L)),this._execBlock(s.body,i)}}throw new Me("AttributeError",`'${pr(e)}' object has no attribute '${r}'`)}static _pyStringFormat(e,r){let n=0;return e.replace(/%([diouxXeEfFgGcrs%])/g,(s,i)=>{if(i==="%")return"%";let o=r[n++];switch(i){case"d":case"i":return String(Math.trunc(o));case"f":return o.toFixed(6);case"s":return te(o??L);case"r":return Be(o??L);default:return String(o)}})}_pyToJs(e){return Ft(e)?null:Ee(e)?Object.fromEntries([...e.data.entries()].map(([r,n])=>[r,this._pyToJs(n)])):Array.isArray(e)?e.map(r=>this._pyToJs(r)):e}_jsToPy(e){return e==null?L:typeof e=="boolean"||typeof e=="number"||typeof e=="string"?e:Array.isArray(e)?e.map(r=>this._jsToPy(r)):typeof e=="object"?ke(Object.entries(e).map(([r,n])=>[r,this._jsToPy(n)])):L}_callBuiltin(e,r,n){if(n.has(e)){let s=n.get(e)??L;return Ct(s)?this._callFunc(s,r,n):Di(s)?this._instantiate(s,r):s}switch(e){case"print":return this._output.push(r.map(te).join(" ")+`
`.replace(/\\n/g,"")),L;case"input":return this._output.push(te(r[0]??"")),"";case"int":{if(r.length===0)return 0;let s=r[1]??10,i=Number.parseInt(te(r[0]??0),s);return Number.isNaN(i)?(()=>{throw new Me("ValueError","invalid literal for int()")})():i}case"float":{if(r.length===0)return 0;let s=Number.parseFloat(te(r[0]??0));return Number.isNaN(s)?(()=>{throw new Me("ValueError","could not convert to float")})():s}case"str":return r.length===0?"":te(r[0]??L);case"bool":return r.length===0?!1:rt(r[0]??L);case"list":return r.length===0?[]:Ue(r[0]??[]);case"tuple":return r.length===0?[]:Ue(r[0]??[]);case"set":return r.length===0?[]:[...new Set(Ue(r[0]??[]).map(Be))].map(s=>Ue(r[0]??[]).find(o=>Be(o)===s)??L);case"dict":return r.length===0?ke():Ee(r[0]??L)?r[0]:ke();case"bytes":return typeof r[0]=="string"?r[0]:te(r[0]??"");case"bytearray":return r.length===0?"":te(r[0]??"");case"type":return r.length===1?`<class '${pr(r[0]??L)}'>`:L;case"isinstance":return pr(r[0]??L)===te(r[1]??"");case"issubclass":return!1;case"callable":return Ct(r[0]??L);case"hasattr":return Ee(r[0]??L)?r[0].data.has(te(r[1]??"")):!1;case"getattr":return Ee(r[0]??L)?r[0].data.get(te(r[1]??""))??r[2]??L:r[2]??L;case"setattr":return Ee(r[0]??L)&&r[0].data.set(te(r[1]??""),r[2]??L),L;case"len":{let s=r[0]??L;if(typeof s=="string"||Array.isArray(s))return s.length;if(Ee(s))return s.data.size;if(Vr(s))return Ud(s);throw new Me("TypeError",`object of type '${pr(s)}' has no len()`)}case"range":return r.length===1?Ri(0,r[0]):r.length===2?Ri(r[0],r[1]):Ri(r[0],r[1],r[2]);case"enumerate":{let s=r[1]??0;return Ue(r[0]??[]).map((i,o)=>[o+s,i])}case"zip":{let s=r.map(Ue),i=Math.min(...s.map(o=>o.length));return Array.from({length:i},(o,a)=>s.map(c=>c[a]??L))}case"map":{let s=r[0]??L;return Ue(r[1]??[]).map(i=>Ct(s)?this._callFunc(s,[i],n):L)}case"filter":{let s=r[0]??L;return Ue(r[1]??[]).filter(i=>Ct(s)?rt(this._callFunc(s,[i],n)):rt(i))}case"reduce":{let s=r[0]??L,i=Ue(r[1]??[]);if(i.length===0)return r[2]??L;let o=r[2]===void 0?i[0]:r[2];for(let a of r[2]===void 0?i.slice(1):i)o=Ct(s)?this._callFunc(s,[o,a],n):L;return o}case"sorted":{let s=[...Ue(r[0]??[])],i=r[1]??L,o=Ee(i)?i.data.get("key")??L:i;return s.sort((a,c)=>{let l=Ct(o)?this._callFunc(o,[a],n):a,u=Ct(o)?this._callFunc(o,[c],n):c;return typeof l=="number"&&typeof u=="number"?l-u:te(l).localeCompare(te(u))}),s}case"reversed":return[...Ue(r[0]??[])].reverse();case"any":return Ue(r[0]??[]).some(rt);case"all":return Ue(r[0]??[]).every(rt);case"sum":return Ue(r[0]??[]).reduce((s,i)=>s+i,r[1]??0);case"max":return(r.length===1?Ue(r[0]??[]):r).reduce((i,o)=>i>=o?i:o);case"min":return(r.length===1?Ue(r[0]??[]):r).reduce((i,o)=>i<=o?i:o);case"abs":return Math.abs(r[0]??0);case"round":return r[1]===void 0?Math.round(r[0]??0):Number.parseFloat(r[0].toFixed(r[1]));case"divmod":{let s=r[0],i=r[1];return[Math.floor(s/i),s%i]}case"pow":return r[0]**r[1];case"hex":return`0x${r[0].toString(16)}`;case"oct":return`0o${r[0].toString(8)}`;case"bin":return`0b${r[0].toString(2)}`;case"ord":return te(r[0]??"").charCodeAt(0);case"chr":return String.fromCharCode(r[0]??0);case"id":return Math.floor(Math.random()*4294967295);case"hash":return typeof r[0]=="number"?r[0]:te(r[0]??"").split("").reduce((s,i)=>s*31+i.charCodeAt(0)|0,0);case"open":throw new Me("PermissionError","open() not available in virtual runtime");case"repr":return Be(r[0]??L);case"iter":return r[0]??L;case"next":return Array.isArray(r[0])&&r[0].length>0?r[0].shift():r[1]??(()=>{throw new Me("StopIteration","")})();case"vars":return ke([...n.entries()].map(([s,i])=>[s,i]));case"globals":return ke([...n.entries()].map(([s,i])=>[s,i]));case"locals":return ke([...n.entries()].map(([s,i])=>[s,i]));case"dir":{if(r.length===0)return[...n.keys()];let s=r[0]??L;return typeof s=="string"?["upper","lower","strip","split","join","replace","find","format","encode","startswith","endswith","count","isdigit","isalpha","title","capitalize"]:Array.isArray(s)?["append","extend","insert","pop","remove","index","count","sort","reverse","copy","clear"]:Ee(s)?["keys","values","items","get","update","pop","clear","copy","setdefault"]:[]}case"Exception":case"ValueError":case"TypeError":case"KeyError":case"IndexError":case"AttributeError":case"NameError":case"RuntimeError":case"StopIteration":case"NotImplementedError":case"OSError":case"IOError":throw new Me(e,te(r[0]??""));case"exec":return this.execScript(te(r[0]??""),n),L;case"eval":return this.pyEval(te(r[0]??""),n);default:throw new Me("NameError",`name '${e}' is not defined`)}}_callFunc(e,r,n){let s=new Map(e.closure);e.params.forEach((i,o)=>{if(i.startsWith("*")){s.set(i.slice(1),r.slice(o));return}s.set(i,r[o]??L)});try{return this._execBlock(e.body,s)}catch(i){if(i instanceof zr)return i.value;throw i}}_instantiate(e,r){let n={__pytype__:"instance",cls:e,attrs:new Map};return e.methods.get("__init__")&&this._callMethod(n,"__init__",r),n}execScript(e,r){let n=e.split(`
`);this._execLines(n,0,r)}_execLines(e,r,n){let s=r;for(;s<e.length;){let i=e[s];if(i===void 0||!i.trim()||i.trim().startsWith("#")){s++;continue}s=this._execStatement(e,s,n)}return s}_execBlock(e,r){try{this._execLines(e,0,r)}catch(n){if(n instanceof zr)return n.value;throw n}return L}static _getIndent(e){let r=0;for(let n of e)if(n===" ")r++;else if(n==="	")r+=4;else break;return r}_collectBlock(e,r,n){let s=[];for(let i=r;i<e.length;i++){let o=e[i];if(!o.trim()){s.push("");continue}if(t._getIndent(o)<=n)break;s.push(o.slice(n+4))}return s}_execStatement(e,r,n){let s=e[r];if(s===void 0)return r+1;let i=s.trim(),o=t._getIndent(s);if(i==="pass")return r+1;if(i==="break")throw new yn;if(i==="continue")throw new Sn;let a=i.match(/^return(?:\s+(.+))?$/);if(a)throw new zr(a[1]?this.pyEval(a[1],n):L);let c=i.match(/^raise(?:\s+(.+))?$/);if(c){if(c[1]){let v=this.pyEval(c[1],n);throw new Me(typeof v=="string"?v:pr(v),te(v))}throw new Me("RuntimeError","")}let l=i.match(/^assert\s+(.+?)(?:,\s*(.+))?$/);if(l){if(!rt(this.pyEval(l[1],n)))throw new Me("AssertionError",l[2]?te(this.pyEval(l[2],n)):"");return r+1}let u=i.match(/^del\s+(.+)$/);if(u)return n.delete(u[1].trim()),r+1;let d=i.match(/^import\s+(\w+)(?:\s+as\s+(\w+))?$/);if(d){let[,v,_]=d,x=Ld[v];if(x){let E=x(this.cwd);this._modules.set(v,E),n.set(_??v,E)}return r+1}let p=i.match(/^from\s+(\w+)\s+import\s+(.+)$/);if(p){let[,v,_]=p,x=Ld[v];if(x){let E=x(this.cwd);if(_?.trim()==="*")for(let[D,T]of E.data)n.set(D,T);else for(let D of _.split(",").map(T=>T.trim()))n.set(D,E.data.get(D)??L)}return r+1}let f=i.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(f){let[,v,_]=f,x=_.split(",").map(T=>T.trim()).filter(Boolean),E=this._collectBlock(e,r+1,o),D={__pytype__:"func",name:v,params:x,body:E,closure:new Map(n)};return n.set(v,D),r+1+E.length}let m=i.match(/^class\s+(\w+)(?:\(([^)]*)\))?\s*:$/);if(m){let[,v,_]=m,x=_?_.split(",").map(W=>W.trim()):[],E=this._collectBlock(e,r+1,o),D={__pytype__:"class",name:v,methods:new Map,bases:x},T=0;for(;T<E.length;){let X=E[T].trim().match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:$/);if(X){let[,ee,P]=X,A=P.split(",").map(O=>O.trim()).filter(Boolean),C=this._collectBlock(E,T+1,0);D.methods.set(ee,{__pytype__:"func",name:ee,params:A,body:C,closure:new Map(n)}),T+=1+C.length}else T++}return n.set(v,D),r+1+E.length}if(i.startsWith("if ")&&i.endsWith(":")){let v=i.slice(3,-1).trim(),_=this._collectBlock(e,r+1,o);if(rt(this.pyEval(v,n))){this._execBlock(_,new Map(n).also?.(D=>{for(let[T,W]of n)D.set(T,W)})??n),this._runBlockInScope(_,n);let E=r+1+_.length;for(;E<e.length;){let D=e[E].trim();if(t._getIndent(e[E])<o||!(D.startsWith("elif")||D.startsWith("else")))break;let T=this._collectBlock(e,E+1,o);E+=1+T.length}return E}let x=r+1+_.length;for(;x<e.length;){let E=e[x],D=E.trim();if(t._getIndent(E)!==o)break;let T=D.match(/^elif\s+(.+):$/);if(T){let W=this._collectBlock(e,x+1,o);if(rt(this.pyEval(T[1],n))){for(this._runBlockInScope(W,n),x+=1+W.length;x<e.length;){let X=e[x].trim();if(t._getIndent(e[x])!==o||!(X.startsWith("elif")||X.startsWith("else")))break;let ee=this._collectBlock(e,x+1,o);x+=1+ee.length}return x}x+=1+W.length;continue}if(D==="else:"){let W=this._collectBlock(e,x+1,o);return this._runBlockInScope(W,n),x+1+W.length}break}return x}let h=i.match(/^for\s+(.+?)\s+in\s+(.+?)\s*:$/);if(h){let[,v,_]=h,x=Ue(this.pyEval(_.trim(),n)),E=this._collectBlock(e,r+1,o),D=[],T=r+1+E.length;T<e.length&&e[T]?.trim()==="else:"&&(D=this._collectBlock(e,T+1,o),T+=1+D.length);let W=!1;for(let X of x){if(v.includes(",")){let ee=v.split(",").map(A=>A.trim()),P=Array.isArray(X)?X:[X];ee.forEach((A,C)=>n.set(A,P[C]??L))}else n.set(v.trim(),X);try{this._runBlockInScope(E,n)}catch(ee){if(ee instanceof yn){W=!0;break}if(ee instanceof Sn)continue;throw ee}}return!W&&D.length&&this._runBlockInScope(D,n),T}let g=i.match(/^while\s+(.+?)\s*:$/);if(g){let v=g[1],_=this._collectBlock(e,r+1,o),x=0;for(;rt(this.pyEval(v,n))&&x++<1e5;)try{this._runBlockInScope(_,n)}catch(E){if(E instanceof yn)break;if(E instanceof Sn)continue;throw E}return r+1+_.length}if(i==="try:"){let v=this._collectBlock(e,r+1,o),_=r+1+v.length,x=[],E=[],D=[];for(;_<e.length;){let T=e[_],W=T.trim();if(t._getIndent(T)!==o)break;if(W.startsWith("except")){let X=W.match(/^except(?:\s+(\w+)(?:\s+as\s+(\w+))?)?\s*:$/),ee=X?.[1]??null,P=X?.[2],A=this._collectBlock(e,_+1,o);x.push({exc:ee,body:A}),P&&n.set(P,""),_+=1+A.length}else if(W==="else:")D=this._collectBlock(e,_+1,o),_+=1+D.length;else if(W==="finally:")E=this._collectBlock(e,_+1,o),_+=1+E.length;else break}try{this._runBlockInScope(v,n),D.length&&this._runBlockInScope(D,n)}catch(T){if(T instanceof Me){let W=!1;for(let X of x)if(X.exc===null||X.exc===T.type||X.exc==="Exception"){this._runBlockInScope(X.body,n),W=!0;break}if(!W)throw T}else throw T}finally{E.length&&this._runBlockInScope(E,n)}return _}let y=i.match(/^with\s+(.+?)\s+as\s+(\w+)\s*:$/);if(y){let v=this._collectBlock(e,r+1,o);return n.set(y[2],L),this._runBlockInScope(v,n),r+1+v.length}let S=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(\+=|-=|\*=|\/\/=|\/=|%=|\*\*=|&=|\|=)\s*(.+)$/);if(S){let[,v,_,x]=S,E=n.get(v)??0,D=this.pyEval(x,n),T;switch(_){case"+=":T=typeof E=="string"?E+te(D):E+D;break;case"-=":T=E-D;break;case"*=":T=E*D;break;case"/=":T=E/D;break;case"//=":T=Math.floor(E/D);break;case"%=":T=E%D;break;case"**=":T=E**D;break;default:T=D}return n.set(v,T),r+1}let w=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\[(.+)\]\s*=\s*(.+)$/);if(w){let[,v,_,x]=w,E=n.get(v)??L,D=this.pyEval(x,n)??L,T=this.pyEval(_,n)??L;return Array.isArray(E)?E[T]=D:Ee(E)&&E.data.set(te(T),D),r+1}let b=i.match(/^([A-Za-z_][A-Za-z0-9_.]+)\s*=\s*(.+)$/);if(b){let v=b[1].lastIndexOf(".");if(v!==-1){let _=b[1].slice(0,v),x=b[1].slice(v+1),E=this.pyEval(b[2],n),D=this.pyEval(_,n);return Ee(D)?D.data.set(x,E):gn(D)&&D.attrs.set(x,E),r+1}}let N=i.match(/^([A-Za-z_][A-Za-z0-9_,\s]*),\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.+)$/);if(N){let v=this.pyEval(N[3],n),_=i.split("=")[0].split(",").map(E=>E.trim()),x=Ue(v);return _.forEach((E,D)=>n.set(E,x[D]??L)),r+1}let I=i.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*(?::[^=]+)?\s*=\s*(.+)$/);if(I){let[,v,_]=I;return n.set(v,this.pyEval(_,n)),r+1}try{this.pyEval(i,n)}catch(v){if(v instanceof Me||v instanceof bn)throw v}return r+1}_runBlockInScope(e,r){this._execLines(e,0,r)}run(e){let r=Ng(this.cwd);try{this.execScript(e,r)}catch(n){return n instanceof bn?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:n.code}:n instanceof Me?(this._stderr.push(n.toString()),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1}):n instanceof zr?{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}:(this._stderr.push(`RuntimeError: ${n}`),{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:1})}return{stdout:this.getOutput(),stderr:this.getStderr(),exitCode:0}}},Bd={name:"python3",aliases:["python"],description:"Python 3 interpreter (virtual)",category:"system",params:["[--version] [-c <code>] [-V] [file]"],run:({args:t,shell:e,cwd:r})=>{if(!e.packageManager.isInstalled("python3"))return{stderr:`bash: python3: command not found
Hint: install it with: apt install python3
`,exitCode:127};if(K(t,["--version","-V"]))return{stdout:`${Mg}
`,exitCode:0};if(K(t,["--version-full"]))return{stdout:`${us}
`,exitCode:0};let n=t.indexOf("-c");if(n!==-1){let i=t[n+1];if(!i)return{stderr:`python3: -c requires a code argument
`,exitCode:1};let o=i.replace(/\\n/g,`
`).replace(/\\t/g,"	"),a=new ds(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}let s=t.find(i=>!i.startsWith("-"));if(s){let i=B(r,s);if(!e.vfs.exists(i))return{stderr:`python3: can't open file '${s}': [Errno 2] No such file or directory
`,exitCode:2};let o=e.vfs.readFile(i),a=new ds(r),{stdout:c,stderr:l,exitCode:u}=a.run(o);return{stdout:c||void 0,stderr:l||void 0,exitCode:u}}return{stdout:`${us}
Type "help", "copyright", "credits" or "license" for more information.
>>> `,exitCode:0}}}});var Vd,Gd=M(()=>{"use strict";ae();Vd={name:"read",description:"Read a line from stdin into variables",category:"shell",params:["[-r] [-p prompt] <var...>"],run:({args:t,stdin:e,env:r})=>{let n=t.filter((o,a)=>o!=="-r"&&o!=="-p"&&t[a-1]!=="-p"),s=(e??"").split(`
`)[0]??"",i=K(t,["-r"])?s:s.replace(/\\(?:\r?\n|.)/g,o=>o[1]===`
`||o[1]==="\r"?"":o[1]);if(!r)return{exitCode:0};if(n.length===0)r.vars.REPLY=i;else if(n.length===1)r.vars[n[0]]=i;else{let o=i.split(/\s+/);for(let a=0;a<n.length;a++)r.vars[n[a]]=a<n.length-1?o[a]??"":o.slice(a).join(" ")}return{exitCode:0}}}});import*as Hd from"node:path";var Wd,jd,qd,Yd=M(()=>{"use strict";ae();se();Wd=["-r","-R","-rf","-fr","-rF","-Fr"],jd=["-f","-rf","-fr","-rF","-Fr","--force"],qd={name:"rm",description:"Remove files or directories",category:"files",params:["[-r|-rf|-f] <path>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"rm: missing operand",exitCode:1};let o=K(n,Wd),a=K(n,jd),c=[...Wd,...jd,"--force"],l=[];for(let m=0;;m+=1){let h=jt(n,m,{flags:c});if(!h)break;l.push(h)}if(l.length===0)return{stderr:"rm: missing operand",exitCode:1};let u=l.map(m=>B(r,m));for(let m of u)He(e.vfs,e.users,t,Hd.posix.dirname(m),2);for(let m of u)if(!e.vfs.exists(m)){if(a)continue;return{stderr:`rm: cannot remove '${m}': No such file or directory`,exitCode:1}}let d=m=>{for(let h of u)m.vfs.exists(h)&&m.vfs.remove(h,{recursive:o},s,i);return{exitCode:0}};if(a)return d(e);let p=l.length===1?`'${l[0]}'`:`${l.length} items`,f=o?`rm: remove ${p} recursively? [y/N] `:`rm: remove ${p}? [y/N] `;return{sudoChallenge:{username:t,targetUser:t,commandLine:null,loginShell:!1,prompt:f,mode:"confirm",onPassword:(m,h)=>{let g=m.trim().toLowerCase();return g!=="y"&&g!=="yes"?Promise.resolve({result:{stdout:`rm: cancelled
`,exitCode:1}}):Promise.resolve({result:d(h)})}},exitCode:0}}}});var Kd,Xd=M(()=>{"use strict";ae();se();Kd={name:"sed",description:"Stream editor for filtering and transforming text",category:"text",params:["[-n] [-e <expr>] [file]"],run:({shell:t,cwd:e,args:r,stdin:n,uid:s,gid:i})=>{let o=K(r,["-i"]),a=K(r,["-n"]),c=[],l,u=0;for(;u<r.length;){let _=r[u];_==="-e"||_==="--expression"?(u++,r[u]&&c.push(r[u]),u++):_==="-n"||_==="-i"?u++:_.startsWith("-e")?(c.push(_.slice(2)),u++):(_.startsWith("-")||(c.length===0?c.push(_):l=_),u++)}if(c.length===0)return{stderr:"sed: no expression",exitCode:1};{let _=!1,x=0;for(;x<r.length;){let E=r[x];E==="-e"||E==="--expression"?(_=!0,x+=2):(E.startsWith("-e")&&(_=!0),x++)}_||(l=r.filter(E=>!E.startsWith("-")).slice(1)[0])}let d=n??"";if(l){let _=B(e,l);try{d=t.vfs.readFile(_)}catch{return{stderr:`sed: ${l}: No such file or directory`,exitCode:1}}}function p(_){if(!_)return[void 0,_];if(_[0]==="$")return[{type:"last"},_.slice(1)];if(/^\d/.test(_)){let x=_.match(/^(\d+)(.*)/s);if(x)return[{type:"line",n:Number.parseInt(x[1],10)},x[2]]}if(_[0]==="/"){let x=_.indexOf("/",1);if(x!==-1)try{return[{type:"regex",re:new RegExp(_.slice(1,x))},_.slice(x+1)]}catch{}}return[void 0,_]}function f(_){let x=[],E=_.split(/\n|(?<=^|[^\\]);/);for(let D of E){let T=D.trim();if(!T||T.startsWith("#"))continue;let W=T,[X,ee]=p(W);W=ee.trim();let P;if(W[0]===","){W=W.slice(1).trim();let[C,O]=p(W);P=C,W=O.trim()}let A=W[0];if(A)if(A==="s"){let C=W[1]??"/",O=new RegExp(`^s${m(C)}((?:[^${m(C)}\\\\]|\\\\.)*)${m(C)}((?:[^${m(C)}\\\\]|\\\\.)*)${m(C)}([gGiIp]*)$`),U=W.match(O);if(!U){x.push({op:"d",addr1:X,addr2:P});continue}let Z=U[3]??"",J;try{J=new RegExp(U[1],Z.includes("i")||Z.includes("I")?"i":"")}catch{continue}x.push({op:"s",addr1:X,addr2:P,from:J,to:U[2],global:Z.includes("g")||Z.includes("G"),print:Z.includes("p")})}else A==="d"?x.push({op:"d",addr1:X,addr2:P}):A==="p"?x.push({op:"p",addr1:X,addr2:P}):A==="q"?x.push({op:"q",addr1:X}):A==="="&&x.push({op:"=",addr1:X,addr2:P})}return x}function m(_){return _.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let h=c.flatMap(f),g=d.split(`
`);g[g.length-1]===""&&g.pop();let y=g.length;function S(_,x,E){return _?_.type==="line"?x===_.n:_.type==="last"?x===y:_.re.test(E):!0}function w(_,x,E,D){let{addr1:T,addr2:W}=_;if(!T)return!0;if(!W)return S(T,x,E);let X=D.get(_)??!1;return!X&&S(T,x,E)&&(X=!0,D.set(_,!0)),X&&S(W,x,E)?(D.set(_,!1),!0):!!X}let b=[],N=new Map,I=!1;for(let _=0;_<g.length&&!I;_++){let x=g[_],E=_+1,D=!1;for(let T of h)if(w(T,E,x,N)){if(T.op==="d"){D=!0;break}if(T.op==="p"&&b.push(x),T.op==="="&&b.push(String(E)),T.op==="q"&&(I=!0),T.op==="s"){let W=T.global?x.replace(new RegExp(T.from.source,T.from.flags.includes("i")?"gi":"g"),T.to):x.replace(T.from,T.to);W!==x&&(x=W,T.print&&a&&b.push(x))}}D||a||b.push(x)}let v=b.join(`
`)+(b.length>0?`
`:"");if(o&&l){let _=B(e,l);return t.vfs.writeFile(_,v,{},s,i),{exitCode:0}}return{stdout:v,exitCode:0}}}});var Zd,Jd=M(()=>{"use strict";Zd={name:"seq",description:"Print a sequence of numbers",category:"text",params:["[FIRST [INCREMENT]] LAST"],run:({args:t})=>{let e=t.filter(d=>!d.startsWith("-")||/^-[\d.]/.test(d)).map(Number),r=(()=>{let d=t.indexOf("-s");return d===-1?`
`:t[d+1]??`
`})(),n=(()=>{let d=t.indexOf("-f");return d===-1?null:t[d+1]??"%g"})(),s=t.includes("-w"),i=1,o=1,a;if(e.length===1?a=e[0]:e.length===2?(i=e[0],a=e[1]):(i=e[0],o=e[1],a=e[2]),o===0)return{stderr:`seq: zero increment
`,exitCode:1};if(o>0&&i>a||o<0&&i<a)return{stdout:"",exitCode:0};let c=[],l=1e5,u=0;for(let d=i;(o>0?d<=a:d>=a)&&!(++u>l);d=Math.round((d+o)*1e10)/1e10){let p;if(n?p=n.replace("%g",String(d)).replace("%f",d.toFixed(6)).replace("%d",String(Math.trunc(d))):p=Number.isInteger(d)?String(d):d.toPrecision(12).replace(/\.?0+$/,""),s){let f=String(Math.trunc(a)).length;p=p.padStart(f,"0")}c.push(p)}return{stdout:`${c.join(r)}
`,exitCode:0}}}});var Qd,ep=M(()=>{"use strict";Qd={name:"set",description:"Display or set shell variables",category:"shell",params:["[VAR=value]"],run:({args:t,env:e})=>{if(t.length===0)return{stdout:Object.entries(e.vars).filter(([n])=>!n.startsWith("__")).map(([n,s])=>`${n}=${s}`).join(`
`),exitCode:0};for(let r of t){let n=r.match(/^([+-])([a-zA-Z]+)$/);if(n){let s=n[1]==="-";for(let i of n[2])i==="e"&&(s?e.vars.__errexit="1":delete e.vars.__errexit),i==="x"&&(s?e.vars.__xtrace="1":delete e.vars.__xtrace);continue}if(r.includes("=")){let s=r.indexOf("=");e.vars[r.slice(0,s)]=r.slice(s+1)}}return{exitCode:0}}}});function fs(t,e,r,n){return Un(t,e,r,s=>ge(s,n.authUser,n.hostname,n.mode,n.cwd,n.shell,void 0,n.env).then(i=>i.stdout??""))}function It(t){let e=[],r=0;for(;r<t.length;){let n=t[r].trim();if(!n||n.startsWith("#")){r++;continue}let s=n.match(Fg),i=s??(n.match(Lg)||n.match(Ug));if(i){let a=i[1],c=[];if(s){c.push(...s[2].split(";").map(l=>l.trim()).filter(Boolean)),e.push({type:"func",name:a,body:c}),r++;continue}for(r++;r<t.length&&t[r]?.trim()!=="}"&&r<t.length+1;){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="{"&&c.push(l),r++}r++,e.push({type:"func",name:a,body:c});continue}let o=n.match(/^\(\(\s*(.+?)\s*\)\)$/);if(o){e.push({type:"arith",expr:o[1]}),r++;continue}if(n.startsWith("if ")||n==="if"){let a=n.replace(/^if\s+/,"").replace(/;\s*then\s*$/,"").trim(),c=[],l=[],u=[],d="then",p="";for(r++;r<t.length&&t[r]?.trim()!=="fi";){let f=t[r].trim();f.startsWith("elif ")?(d="elif",p=f.replace(/^elif\s+/,"").replace(/;\s*then\s*$/,"").trim(),l.push({cond:p,body:[]})):f==="else"?d="else":f!=="then"&&(d==="then"?c.push(f):d==="elif"&&l.length>0?l[l.length-1]?.body.push(f):u.push(f)),r++}e.push({type:"if",cond:a,then_:c,elif:l,else_:u})}else if(n.startsWith("for ")){let a=n.match(/^for\s+(\w+)\s+in\s+(.+?)(?:\s*;\s*do)?$/);if(a){let c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"for",var:a[1],list:a[2],body:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("while ")){let a=n.replace(/^while\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"while",cond:a,body:c})}else if(n.startsWith("until ")){let a=n.replace(/^until\s+/,"").replace(/;\s*do\s*$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="done";){let l=t[r].trim().replace(/^do\s+/,"");l&&l!=="do"&&c.push(l),r++}e.push({type:"until",cond:a,body:c})}else if(/^[A-Za-z_][A-Za-z0-9_]*=\s*\(/.test(n)){let a=n.match(/^([A-Za-z_][A-Za-z0-9_]*)=\s*\(([^)]*)\)$/);if(a){let c=a[2].trim().split(/\s+/).filter(Boolean);e.push({type:"array",name:a[1],elements:c})}else e.push({type:"cmd",line:n})}else if(n.startsWith("case ")&&n.endsWith(" in")||n.match(/^case\s+.+\s+in$/)){let a=n.replace(/^case\s+/,"").replace(/\s+in$/,"").trim(),c=[];for(r++;r<t.length&&t[r]?.trim()!=="esac";){let l=t[r].trim();if(!l||l==="esac"){r++;continue}let u=l.match(/^(.+?)\)\s*(.*)$/);if(u){let d=u[1].trim(),p=[];for(u[2]?.trim()&&u[2].trim()!==";;"&&p.push(u[2].trim()),r++;r<t.length;){let f=t[r].trim();if(f===";;"||f==="esac")break;f&&p.push(f),r++}t[r]?.trim()===";;"&&r++,c.push({pattern:d,body:p})}else r++}e.push({type:"case",expr:a,patterns:c})}else e.push({type:"cmd",line:n});r++}return e}async function ps(t,e){let r=await fs(t,e.env.vars,e.env.lastExitCode,e),n=r.match(/^\[?\s*(.+?)\s*\]?$/);if(n){let i=n[1],o=i.match(/^-([fdeznr])\s+(.+)$/);if(o){let[,l,u]=o,d=B(e.cwd,u);if(l==="f")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="file";if(l==="d")return e.shell.vfs.exists(d)&&e.shell.vfs.stat(d).type==="directory";if(l==="e")return e.shell.vfs.exists(d);if(l==="z")return(u??"").length===0;if(l==="n")return(u??"").length>0}let a=i.match(/^"?([^"]*)"?\s*(==|!=|=|<|>)\s*"?([^"]*)"?$/);if(a){let[,l,u,d]=a;if(u==="=="||u==="=")return l===d;if(u==="!=")return l!==d}let c=i.match(/^(\S+)\s+(-eq|-ne|-lt|-le|-gt|-ge)\s+(\S+)$/);if(c){let[,l,u,d]=c,p=Number(l),f=Number(d);if(u==="-eq")return p===f;if(u==="-ne")return p!==f;if(u==="-lt")return p<f;if(u==="-le")return p<=f;if(u==="-gt")return p>f;if(u==="-ge")return p>=f}}return((await ge(r,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)).exitCode??0)===0}async function Pt(t,e){let r={exitCode:0},n="",s="";for(let o of t)if(o.type==="cmd"){let a=await fs(o.line,e.env.vars,e.env.lastExitCode,e);e.env.vars.__xtrace&&(s+=`+ ${a}
`);let c=/^([A-Za-z_][A-Za-z0-9_]*)=(.*)/,l=a.trim().split(/\s+/);if(l.length>0&&c.test(l[0])&&l.every(p=>c.test(p))){for(let p of l){let[,f,m]=p.match(c)??[];f!==void 0&&m!==void 0&&(e.env.vars[f]=m)}e.env.lastExitCode=0;continue}let u=await(async()=>{let d=a.trim().split(/\s+/)[0]??"",p=e.env.vars[`__func_${d}`];if(p){let f=a.trim().split(/\s+/).slice(1),m={...e.env.vars};f.forEach((y,S)=>{e.env.vars[String(S+1)]=y}),e.env.vars[0]=d;let h=p.split(`
`),g=await Pt(It(h),e);for(let y=1;y<=f.length;y++)delete e.env.vars[String(y)];return Object.assign(e.env.vars,{...m,...e.env.vars}),g}return ge(a,e.authUser,e.hostname,e.mode,e.cwd,e.shell,void 0,e.env)})();if(e.env.lastExitCode=u.exitCode??0,u.stdout&&(n+=`${u.stdout}
`),u.stderr)return{...u,stdout:n.trim()};if(e.env.vars.__errexit&&(u.exitCode??0)!==0)return{...u,stdout:n.trim()};r=u}else if(o.type==="if"){let a=!1;if(await ps(o.cond,e)){let c=await Pt(It(o.then_),e);c.stdout&&(n+=`${c.stdout}
`),a=!0}else{for(let c of o.elif)if(await ps(c.cond,e)){let l=await Pt(It(c.body),e);l.stdout&&(n+=`${l.stdout}
`),a=!0;break}if(!a&&o.else_.length>0){let c=await Pt(It(o.else_),e);c.stdout&&(n+=`${c.stdout}
`)}}}else if(o.type==="func")e.env.vars[`__func_${o.name}`]=o.body.join(`
`);else if(o.type==="arith"){let a=o.expr.trim(),c=a.match(/^(\w+)\s*(\+\+|--)$/);if(c){let l=Number.parseInt(e.env.vars[c[1]]??"0",10);e.env.vars[c[1]]=String(c[2]==="++"?l+1:l-1)}else{let l=a.match(/^(\w+)\s*([+\-*/])=\s*(.+)$/);if(l){let u=Number.parseInt(e.env.vars[l[1]]??"0",10),d=Number.parseInt(l[3],10),p={"+":u+d,"-":u-d,"*":u*d,"/":Math.floor(u/d)};e.env.vars[l[1]]=String(p[l[2]]??u)}else{let u=tn(a,e.env.vars);Number.isNaN(u)||(e.env.lastExitCode=u===0?1:0)}}}else if(o.type==="for"){let c=(await fs(o.list,e.env.vars,e.env.lastExitCode,e)).trim().split(/\s+/).flatMap(Ln);for(let l of c){e.env.vars[o.var]=l;let u=await Pt(It(o.body),e);if(u.stdout&&(n+=`${u.stdout}
`),u.closeSession)return u}}else if(o.type==="while"){let a=0;for(;a<1e3&&await ps(o.cond,e);){let c=await Pt(It(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="until"){let a=0;for(;a<1e3&&!await ps(o.cond,e);){let c=await Pt(It(o.body),e);if(c.stdout&&(n+=`${c.stdout}
`),c.closeSession)return c;a++}}else if(o.type==="array")o.elements.forEach((a,c)=>{e.env.vars[`${o.name}[${c}]`]=a}),e.env.vars[o.name]=o.elements.join(" ");else if(o.type==="case"){let a=await fs(o.expr,e.env.vars,e.env.lastExitCode,e);for(let c of o.patterns)if(c.pattern.split("|").map(d=>d.trim()).some(d=>d==="*"?!0:d.includes("*")||d.includes("?")?new RegExp(`^${d.replace(/\./g,"\\.").replace(/\*/g,".*").replace(/\?/g,".")}$`).test(a):d===a)){let d=await Pt(It(c.body),e);d.stdout&&(n+=`${d.stdout}
`);break}}let i=n.trim()||r.stdout;if(s){let o=(r.stderr?`${r.stderr}
`:"")+s.trim();return{...r,stdout:i,stderr:o||r.stderr}}return{...r,stdout:i}}function tp(t){let e=[],r="",n=0,s=!1,i=!1,o=0;for(;o<t.length;){let c=t[o];if(s||i)s&&c==="'"?s=!1:i&&c==='"'&&(i=!1);else{if(c==="'"){s=!0,r+=c,o++;continue}if(c==='"'){i=!0,r+=c,o++;continue}if(c==="{"){n++,r+=c,o++;continue}if(c==="}"){if(n--,r+=c,o++,n===0){let l=r.trim();for(l&&e.push(l),r="";o<t.length&&(t[o]===";"||t[o]===" ");)o++}continue}if(!s&&c==="\\"&&o+1<t.length&&t[o+1]===`
`){o+=2;continue}if(n===0&&(c===";"||c===`
`)){let l=r.trim();l&&!l.startsWith("#")&&e.push(l),r="",o++;continue}}r+=c,o++}let a=r.trim();return a&&!a.startsWith("#")&&e.push(a),e}var Fi,Fg,Lg,Ug,rp,np=M(()=>{"use strict";rn();ae();se();Ye();Fi="[^\\s(){}]+",Fg=new RegExp(`^(?:function\\s+)?(${Fi})\\s*\\(\\s*\\)\\s*\\{(.+)\\}\\s*$`),Lg=new RegExp(`^(?:function\\s+)?(${Fi})\\s*\\(\\s*\\)\\s*\\{?\\s*$`),Ug=new RegExp(`^function\\s+(${Fi})\\s*\\{?\\s*$`);rp={name:"sh",aliases:["bash"],description:"Execute shell script or command",category:"shell",params:["-c <script>","[<file>]"],run:t=>{let{args:e,shell:r,cwd:n}=t;if(K(e,"-c")){let i=e[e.indexOf("-c")+1]??"";if(!i)return{stderr:"sh: -c requires a script",exitCode:1};let o=tp(i),a=It(o);return Pt(a,t)}let s=e[0];if(s){let i=B(n,s);if(!r.vfs.exists(i))return{stderr:`sh: ${s}: No such file or directory`,exitCode:1};let o=r.vfs.readFile(i),a=tp(o),c=It(a);return Pt(c,t)}return{stderr:"sh: invalid usage. Use: sh -c 'cmd' or sh <file>",exitCode:1}}}});var sp,ip,op,ap=M(()=>{"use strict";sp={name:"shift",description:"Shift positional parameters",category:"shell",params:["[n]"],run:({args:t,env:e})=>{if(!e)return{exitCode:0};let r=Number.parseInt(t[0]??"1",10)||1,n=e.vars.__argv?.split("\0").filter(Boolean)??[];e.vars.__argv=n.slice(r).join("\0");let s=n.slice(r);for(let i=1;i<=9;i++)e.vars[String(i)]=s[i-1]??"";return{exitCode:0}}},ip={name:"trap",description:"Trap signals and events",category:"shell",params:["[action] [signal...]"],run:({args:t,env:e})=>{if(!e||t.length===0)return{exitCode:0};let r=t[0]??"",n=t.slice(1);for(let s of n)e.vars[`__trap_${s.toUpperCase()}`]=r;return{exitCode:0}}},op={name:"return",description:"Return from a shell function",category:"shell",params:["[n]"],run:({args:t,env:e})=>{let r=Number.parseInt(t[0]??"0",10);return e&&(e.lastExitCode=r),{exitCode:r}}}});var cp,lp=M(()=>{"use strict";cp={name:"sleep",description:"Delay execution",category:"system",params:["<seconds>"],run:async({args:t})=>{let e=Number.parseFloat(t[0]??"1");return Number.isNaN(e)||e<0?{stderr:"sleep: invalid time",exitCode:1}:(await new Promise(r=>setTimeout(r,e*1e3)),{exitCode:0})}}});var up,dp=M(()=>{"use strict";ae();se();up={name:"sort",description:"Sort lines of text",category:"text",params:["[-r] [-n] [-u] [-k <col>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=K(n,["-r"]),o=K(n,["-n"]),a=K(n,["-u"]),c=n.filter(m=>!m.startsWith("-")),d=[...(c.length>0?c.map(m=>{try{return ye(t,B(r,m),"sort"),e.vfs.readFile(B(r,m))}catch{return""}}).join(`
`):s??"").split(`
`).filter(Boolean)].sort((m,h)=>o?Number(m)-Number(h):m.localeCompare(h)),p=i?d.reverse():d;return{stdout:(a?[...new Set(p)]:p).join(`
`),exitCode:0}}}});var pp,fp=M(()=>{"use strict";se();Ye();pp={name:"source",aliases:["."],description:"Execute commands from a file in the current shell environment",category:"shell",params:["<file> [args...]"],run:async({args:t,authUser:e,hostname:r,cwd:n,shell:s,env:i})=>{let o=t[0];if(!o)return{stderr:"source: missing filename",exitCode:1};let a=B(n,o);if(!s.vfs.exists(a))return{stderr:`source: ${o}: No such file or directory`,exitCode:1};let c=s.vfs.readFile(a),l=0;for(let u of c.split(`
`)){let d=u.trim();if(!d||d.startsWith("#"))continue;let p=await ge(d,e,r,"shell",n,s,void 0,i);if(l=p.exitCode??0,p.closeSession||p.switchUser)return p}return{exitCode:l}}}});function mp(t,e){let r=[{state:"LISTEN",localIp:"0.0.0.0",localPort:22,peerIp:"*:*",peerPort:0,pid:1,fd:3},{state:"ESTAB",localIp:"10.0.0.2",localPort:22,peerIp:"192.168.1.100",peerPort:54321,pid:1,fd:4},{state:"LISTEN",localIp:"0.0.0.0",localPort:80,peerIp:"*:*",peerPort:0,pid:2,fd:5},{state:"LISTEN",localIp:"0.0.0.0",localPort:443,peerIp:"*:*",peerPort:0,pid:2,fd:6},{state:"TIME-WAIT",localIp:"10.0.0.2",localPort:45678,peerIp:"93.184.216.34",peerPort:80,pid:3,fd:7}];return t==="udp"?[{state:"UNCONN",localIp:"0.0.0.0",localPort:68,peerIp:"*:*",peerPort:0,pid:4,fd:8},{state:"UNCONN",localIp:"0.0.0.0",localPort:53,peerIp:"*:*",peerPort:0,pid:5,fd:9}]:r}function Bg(t){let e=t.getConntrackCount(),r=t.getConntrackMax(),n=t.getInterfaces(),s=t.getRoutes();return{stdout:`${[`Total: ${Li()}`,`TCP:   ${Li("tcp")} (estab ${hp("ESTAB")}, closed ${hp("TIME-WAIT")}, orphaned 0, timewait 0)`,`UDP:   ${Li("udp")}`,"",`Interfaces: ${n.length}`,`Routes: ${s.length}`,`Conntrack entries: ${e}/${r}`].join(`
`)}
`,exitCode:0}}function zg(t){let e=t.getConntrack();return e.length===0?{stdout:`ipv4     conntrack v0.1.0 (0 entries)
`,exitCode:0}:{stdout:`${[`ipv4     conntrack v0.1.0 (${e.length} entries)`,t.formatConntrack(),"",`entries: ${e.length}  max: ${t.getConntrackMax()}`].join(`
`)}
`,exitCode:0}}function Li(t){return t==="udp"?2:t==="tcp"?5:7}function hp(t){return{ESTAB:1,"TIME-WAIT":1,LISTEN:3}[t]??0}var gp,yp=M(()=>{"use strict";gp={name:"ss",description:"Show socket statistics",category:"network",aliases:["netstat"],params:["[options] [FILTER]"],run:({args:t,shell:e})=>{let r=e.network,n=t.includes("-t")||t.includes("--tcp")||t.length===0,s=t.includes("-u")||t.includes("--udp")||t.length===0,i=t.includes("-l")||t.includes("--listening"),o=t.includes("-a")||t.includes("--all"),a=t.includes("-n")||t.includes("--numeric"),c=t.includes("-p")||t.includes("--processes"),l=t.includes("-s")||t.includes("--summary"),u=t.includes("-c")||t.includes("--conntrack"),d=t.includes("-e")||t.includes("--extended");if(l)return Bg(r);if(u)return zg(r);let p=[];if(n||o){p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let f=mp("tcp",a);for(let m of f){if(i&&m.state!=="LISTEN")continue;let h=d?m.state.padEnd(12):m.state.padEnd(11),g=`${m.localIp}:${m.localPort}`.padEnd(35),y=`${m.peerIp}:${m.peerPort}`,S=`${h} 0      0      ${g} ${y}`;c&&(S+=` users:(("simulated",pid=${m.pid},fd=${m.fd}))`),p.push(S)}}if(s||o){p.length>0&&p.push(""),p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port");let f=mp("udp",a);for(let m of f){let h="UNCONN".padEnd(11),g=`${m.localIp}:${m.localPort}`.padEnd(35),y=`${m.peerIp}:${m.peerPort}`;p.push(`${h} 0      0      ${g} ${y}`)}}return p.length===0&&p.push("State      Recv-Q Send-Q Local Address:Port               Peer Address:Port"),{stdout:`${p.join(`
`)}
`,exitCode:0}}}});var Sp,bp=M(()=>{"use strict";Sp={name:"startxfce4",aliases:["xfce4-session"],params:[],async run(t){let e=t.shell.desktopManager;return e?(await e.start(),{exitCode:0}):{stderr:"startxfce4: desktop is only available in the browser",exitCode:1}}}});var _p,vp=M(()=>{"use strict";se();_p={name:"stat",description:"Display file status",category:"files",params:["[-c <format>] <file>"],run:({shell:t,cwd:e,args:r})=>{let n=r.findIndex(S=>S==="-c"||S==="--format"),s=n===-1?void 0:r[n+1],i=r.find(S=>!S.startsWith("-")&&S!==s);if(!i)return{stderr:`stat: missing operand
`,exitCode:1};let o=B(e,i);if(!t.vfs.exists(o))return{stderr:`stat: cannot stat '${i}': No such file or directory
`,exitCode:1};let a=t.vfs.stat(o),c=a.type==="directory",l=t.vfs.isSymlink(o),u=S=>{let w=[256,128,64,32,16,8,4,2,1],b=["r","w","x","r","w","x","r","w","x"];return(c?"d":l?"l":"-")+w.map((N,I)=>S&N?b[I]:"-").join("")},d=a.mode.toString(8).padStart(4,"0"),p=u(a.mode),f="size"in a?a.size:0,m=S=>S.toISOString().replace("T"," ").replace(/\.\d+Z$/," +0000");if(s)return{stdout:`${s.replace("%n",i).replace("%s",String(f)).replace("%a",d.slice(1)).replace("%A",p).replace("%F",l?"symbolic link":c?"directory":"regular file").replace("%y",m(a.updatedAt)).replace("%z",m(a.updatedAt))}
`,exitCode:0};let h="uid"in a?a.uid:0,g="gid"in a?a.gid:0;return{stdout:`${[`  File: ${i}${l?` -> ${t.vfs.resolveSymlink(o)}`:""}`,`  Size: ${f}${"	".repeat(3)}${l?"symbolic link":c?"directory":"regular file"}`,`Access: (${d}/${p})  Uid: (${String(h).padStart(5)}/    root)   Gid: (${String(g).padStart(5)}/    root)`,`Modify: ${m(a.updatedAt)}`,`Change: ${m(a.updatedAt)}`].join(`
`)}
`,exitCode:0}}}});var wp,xp=M(()=>{"use strict";wp={name:"strace",description:"Trace system calls and signals",category:"system",params:["[-e <expr>] [-o <file>] <command> [args]"],run:({args:t})=>{let e=t.find(n=>!n.startsWith("-"));return e?{stderr:[`execve("/usr/bin/${e}", ["${e}"${t.slice(1).map(n=>`, "${n}"`).join("")}], 0x... /* ... vars */) = 0`,`brk(NULL)                               = 0x${(Math.random()*1048575|0).toString(16)}000`,'access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)','openat(AT_FDCWD, "/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3',"fstat(3, {st_mode=S_IFREG|0644, st_size=...}) = 0","close(3)                                = 0","+++ exited with 0 +++"].join(`
`),exitCode:0}:{stderr:"strace: must have PROG [ARGS] or -p PID",exitCode:1}}}});var Cp,Ip=M(()=>{"use strict";Ye();Cp={name:"su",description:"Switch user",category:"users",params:["[-] [-c <cmd>] [username]"],run:({authUser:t,shell:e,args:r,hostname:n,mode:s,cwd:i})=>{let o=r.includes("-")||r.includes("-l")||r.includes("--login"),a=r.indexOf("-c"),c=a===-1?void 0:r[a+1],u=r.filter((d,p)=>p!==a&&p!==a+1).filter(d=>d!=="-"&&d!=="-l"&&d!=="--login").find(d=>!d.startsWith("-"))??"root";if(!e.users.listUsers().includes(u))if(t==="root")e.users.ensureUser(u);else return{stderr:`su: user '${u}' does not exist
`,exitCode:1};return t==="root"?c?ge(c,u,n,s,o?`/home/${u}`:i,e):{switchUser:u,nextCwd:o?`/home/${u}`:void 0,exitCode:0}:e.users.isSudoer(t)?{sudoChallenge:{username:u,targetUser:u,commandLine:c??null,loginShell:o,prompt:"Password: "},exitCode:0}:{stderr:`su: permission denied
`,exitCode:1}}}});function Vg(t){let{flags:e,flagsWithValues:r,positionals:n}=Ne(t,{flags:["-i","-S"],flagsWithValue:["-u","--user"]}),s=e.has("-i"),i=r.get("-u")||r.get("--user")||"root",o=n.length>0?n.join(" "):null;return{targetUser:i,loginShell:s,commandLine:o}}var Pp,Ep=M(()=>{"use strict";ae();Ye();Pp={name:"sudo",description:"Execute as superuser",category:"users",params:["<command...>"],run:({authUser:t,hostname:e,mode:r,cwd:n,shell:s,args:i})=>{let{targetUser:o,loginShell:a,commandLine:c}=Vg(i);if(t!=="root"&&!s.users.isSudoer(t))return{stderr:"sudo: permission denied",exitCode:1};let l=o||"root",u=`[sudo] password for ${t}: `;return t==="root"?!c&&a?{switchUser:l,nextCwd:`/home/${l}`,exitCode:0}:c?ge(c,l,e,r,a?`/home/${l}`:n,s):{stderr:"sudo: missing command",exitCode:1}:{sudoChallenge:{username:t,targetUser:l,commandLine:c,loginShell:a,prompt:u},exitCode:0}}}});var $p,Mp=M(()=>{"use strict";$p={name:"swap",description:"View and manage swap file usage",category:"system",params:["[-s|--stats] [-c|--clear]"],run:({shell:t,args:e})=>{let r=e.includes("-c")||e.includes("--clear");if(!t.vfs.isSwapEnabled())return{stderr:`swap: swap is not enabled
`,exitCode:1};if(r)return t.vfs.clearSwap(),{stdout:`swap: swap files cleared
`,exitCode:0};let n=t.vfs.getSwapStats();if(!n)return{stderr:`swap: unable to retrieve swap stats
`,exitCode:1};let s=o=>{if(o===0)return"0 B";let a=["B","KB","MB","GB"],c=Math.floor(Math.log(o)/Math.log(1024));return`${(o/1024**c).toFixed(1)} ${a[c]}`};return{stdout:`${["Swap usage:",`  Files swapped out : ${n.filesSwapped}`,`  Swap disk usage   : ${s(n.diskUsage)}`,`  Original size     : ${s(n.originalSize)}`,`  Swap-in ops       : ${n.swapIns}`,`  Swap-out ops      : ${n.swapOuts}`].join(`
`)}
`,exitCode:0}}}});function kp(t,e){return{kernel:{hostname:t,domainname:"(none)",osrelease:e,ostype:"Linux",pid_max:32768,threads_max:31968,randomize_va_space:2,dmesg_restrict:0,kptr_restrict:0,perf_event_paranoid:2,printk:"4	4	1	7",sysrq:176,panic:1,panic_on_oops:1,core_pattern:"core",core_uses_pid:0,ngroups_max:65536,cap_last_cap:40,unprivileged_userns_clone:1,cpu_cap_cores:0},net:{ipv4:{ip_forward:0,tcp_syncookies:1,tcp_fin_timeout:60,tcp_keepalive_time:7200,rp_filter:2},ipv6:{disable_ipv6:1},core:{somaxconn:4096,rmem_max:212992,wmem_max:212992}},vm:{swappiness:60,overcommit_memory:0,overcommit_ratio:50,dirty_ratio:20,dirty_background_ratio:10,min_free_kbytes:65536,vfs_cache_pressure:100,ram_cap_bytes:0},fs:{file_max:1048576,inotify:{max_user_watches:524288,max_user_instances:512,max_queued_events:16384}}}}function Gr(t,e){let r=e.replace("/proc/sys/","").split("/"),n=(s,i)=>{if(!(i in s))return null;let o=s,a=o[i];return{value:typeof a=="number"?a:String(a),set:l=>{let u=Number(l);o[i]=Number.isNaN(u)?l:u}}};switch(r[0]){case"kernel":{let s=r[1];if(!s)break;return n(t.kernel,s)}case"net":{let s=r[1];if(s==="ipv4"){let i=r[2];if(!i)break;return n(t.net.ipv4,i)}if(s==="ipv6"){let i=r[2];if(i==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}};if(i==="conf"&&r[4]==="disable_ipv6")return{value:t.net.ipv6.disable_ipv6,set:o=>{t.net.ipv6.disable_ipv6=Number(o)}}}else if(s==="core"){let i=r[2];if(!i)break;return n(t.net.core,i)}break}case"vm":{let s=r[1];if(!s)break;return n(t.vm,s)}case"fs":{if(r[1]==="inotify"){let o=r[2];if(!o)break;return n(t.fs.inotify,o)}let s=t.fs,i=r[1];if(!i)break;if(i==="file-max")return{value:s.file_max,set:o=>{s.file_max=Number(o)}};break}default:break}return null}var Ui=M(()=>{"use strict"});var Np,Ap=M(()=>{"use strict";Ui();Np={name:"sysctl",description:"Get or set kernel parameters",category:"system",params:["[-w] [name=value | name]"],run:({shell:t,args:e})=>{let r=e.filter(o=>o!=="-w"&&o.includes("=")),n=e.filter(o=>o!=="-w"&&!o.includes("="));if(r.length>0){let o=[];for(let a of r){let[c,...l]=a.split("="),u=l.join("=");if(!c)continue;let d=`/proc/sys/${c.replace(/\./g,"/")}`,p=Gr(t.sysctl,d);if(!p)return{stderr:`sysctl: cannot stat '${c}': No such file or directory`,exitCode:1};p.set(u.trim());let f=p.value;if(o.push(`${c} = ${f}`),c==="vm.ram_cap_bytes"){let m=Number(u);t.resourceCaps.ramCapBytes=m>0?m:void 0,t.vfs.setRamCap(t.resourceCaps.ramCapBytes??null)}if(c==="kernel.cpu_cap_cores"){let m=Number(u);t.resourceCaps.cpuCapCores=m>0?m:void 0,t.users.setCpuCapCores(t.resourceCaps.cpuCapCores??0)}}return{stdout:`${o.join(`
`)}
`,exitCode:0}}if(n.length>0){let o=[];for(let a of n){let c=`/proc/sys/${a.replace(/\./g,"/")}`,l=Gr(t.sysctl,c);if(!l)return{stderr:`sysctl: cannot stat '${a}': No such file or directory`,exitCode:1};let u=l.value;o.push(`${a} = ${u}`)}return{stdout:`${o.join(`
`)}
`,exitCode:0}}let s=[],i=(o,a)=>{for(let[c,l]of Object.entries(o)){let u=a?`${a}.${c}`:c;typeof l=="object"&&l!==null&&!Array.isArray(l)?i(l,u):s.push(`${u} = ${l}`)}};return i(t.sysctl,""),{stdout:`${s.sort().join(`
`)}
`,exitCode:0}}}});import*as Wr from"node:os";var Tp,Op,Rp,Dp=M(()=>{"use strict";Tp={name:"lscpu",description:"Display CPU architecture information",category:"system",params:[],run:({shell:t})=>{let e=Wr.cpus(),r=t.resourceCaps?.cpuCapCores,n=r!==void 0&&r>0?e.slice(0,r):e,s=Wr.arch(),i=Wr.endianness(),o=n.length,a=n.length>0?n[0].model:"Unknown";return{stdout:`${[`Architecture:        ${s}`,"CPU op-mode(s):      32-bit, 64-bit",`Byte Order:          ${i}`,`CPU(s):              ${o}`,`On-line CPU(s) list: 0-${o-1}`,`Model name:          ${a}`,"Thread(s) per core:  1",`Core(s) per socket:  ${o}`,"Socket(s):           1","Vendor ID:           GenuineIntel"].join(`
`)}
`,exitCode:0}}},Op={name:"lsusb",description:"List USB devices",category:"system",params:[],run:()=>({stdout:`${["Bus 001 Device 001: ID 1d6b:0001 Linux Foundation 1.1 root hub","Bus 001 Device 002: ID 80ee:0021 VirtualBox USB Tablet","Bus 002 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub"].join(`
`)}
`,exitCode:0})},Rp={name:"lspci",description:"List PCI devices",category:"system",params:[],run:()=>({stdout:`${["00:00.0 Host bridge: Intel Corporation 440FX - 82441FX PMC [Natoma]","00:01.0 ISA bridge: Intel Corporation 82371SB PIIX3 ISA [Natoma/Triton II]","00:01.1 IDE interface: Intel Corporation 82371SB PIIX3 IDE [Natoma/Triton II]","00:02.0 VGA compatible controller: VMware SVGA II Adapter","00:03.0 Ethernet controller: Intel Corporation 82540EM Gigabit Ethernet Controller","00:04.0 SATA controller: Intel Corporation 82801IR/IO (ICH9R) SATA Controller"].join(`
`)}
`,exitCode:0})}});var Fp,Lp=M(()=>{"use strict";ae();se();Fp={name:"tail",description:"Output last lines",category:"text",params:["[-n <lines>] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=ir(n,["-n"]),o=n.find(d=>/^-\d+$/.test(d)),a=typeof i=="string"?Number.parseInt(i,10):o?Number.parseInt(o.slice(1),10):10,c=n.filter(d=>!d.startsWith("-")&&d!==i&&d!==String(a)),l=d=>{let p=d.split(`
`),f=d.endsWith(`
`),m=f?p.slice(0,-1):p;return m.slice(Math.max(0,m.length-a)).join(`
`)+(f?`
`:"")};if(c.length===0)return{stdout:l(s??""),exitCode:0};let u=[];for(let d of c){let p=B(r,d);try{ye(t,p,"tail"),u.push(l(e.vfs.readFile(p)))}catch{return{stderr:`tail: ${d}: No such file or directory`,exitCode:1}}}return{stdout:u.join(`
`),exitCode:0}}}});function Gg(t,e,r){let n=Buffer.alloc(512),s=(o,a,c)=>{let l=Buffer.from(o,"ascii");l.copy(n,a,0,Math.min(l.length,c))};s(r?`${t}/`:t,0,100),s(r?"0000755\0":"0000644\0",100,8),s("0000000\0",108,8),s("0000000\0",116,8),s(`${e.toString(8).padStart(11,"0")}\0`,124,12),s(`${Math.floor(Date.now()/1e3).toString(8).padStart(11,"0")}\0`,136,12),n[156]=r?53:48,s("ustar\0",257,6),s("00",263,2),s("root\0",265,32),s("root\0",297,32);for(let o=148;o<156;o++)n[o]=32;let i=0;for(let o=0;o<512;o++)i+=n[o];return Buffer.from(`${i.toString(8).padStart(6,"0")}\0 `).copy(n,148),n}function Wg(t){let e=t%512;return e===0?Buffer.alloc(0):Buffer.alloc(512-e)}function jg(t){let e=[];for(let{name:r,content:n,isDir:s}of t)e.push(Gg(r,s?0:n.length,s)),s||(e.push(n),e.push(Wg(n.length)));return e.push(Buffer.alloc(1024)),Buffer.concat(e)}function Hg(t){let e=[],r=0;for(;r+512<=t.length;){let n=t.slice(r,r+512);if(n.every(c=>c===0))break;let s=n.slice(0,100).toString("ascii").replace(/\0.*/,""),i=n.slice(124,135).toString("ascii").replace(/\0.*/,"").trim(),o=Number.parseInt(i,8)||0,a=n[156];if(r+=512,s&&a!==53&&a!==53){let c=t.slice(r,r+o);e.push({name:s,content:c})}r+=Math.ceil(o/512)*512}return e}var Up,Bp=M(()=>{"use strict";un();se();Up={name:"tar",description:"Archive utility",category:"archive",params:["[-czf|-xzf|-tf] <archive> [files...]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let i=[],o=!1;for(let g of r)if(/^-[a-zA-Z]{2,}$/.test(g))for(let y of g.slice(1))i.push(`-${y}`);else if(!o&&/^[cxtdru][a-zA-Z]*$/.test(g)&&!g.includes("/")&&!g.startsWith("-")){o=!0;for(let y of g)i.push(`-${y}`)}else i.push(g);let a=i.includes("-c"),c=i.includes("-x"),l=i.includes("-t"),u=i.includes("-z"),d=i.includes("-v"),p=i.indexOf("-f"),f=p===-1?i.find(g=>g.endsWith(".tar")||g.endsWith(".tar.gz")||g.endsWith(".tgz")||g.endsWith(".tar.bz2")):i[p+1];if(!(a||c||l))return{stderr:"tar: must specify -c, -x, or -t",exitCode:1};if(!f)return{stderr:"tar: no archive specified",exitCode:1};let m=B(e,f),h=u||f.endsWith(".gz")||f.endsWith(".tgz");if(a){let g=new Set;p!==-1&&i[p+1]&&g.add(i[p+1]);let y=i.filter(I=>!(I.startsWith("-")||g.has(I))),S=[],w=[];for(let I of y){let v=B(e,I);if(!t.vfs.exists(v))return{stderr:`tar: ${I}: No such file or directory`,exitCode:1};if(t.vfs.stat(v).type==="file"){let x=t.vfs.readFileRaw(v);S.push({name:I,content:x,isDir:!1}),d&&w.push(I)}else{S.push({name:I,content:Buffer.alloc(0),isDir:!0}),d&&w.push(`${I}/`);let x=(E,D)=>{for(let T of t.vfs.list(E)){let W=`${E}/${T}`,X=`${D}/${T}`;if(t.vfs.stat(W).type==="directory")S.push({name:X,content:Buffer.alloc(0),isDir:!0}),d&&w.push(`${X}/`),x(W,X);else{let P=t.vfs.readFileRaw(W);S.push({name:X,content:P,isDir:!1}),d&&w.push(X)}}};x(v,I)}}let b=jg(S),N=h?Buffer.from(or(b)):b;return t.vfs.writeFile(m,N,{},n,s),{stdout:d?w.join(`
`):void 0,exitCode:0}}if(l||c){let g=t.vfs.readFileRaw(m),y;if(h)try{y=Buffer.from(qt(g))}catch{return{stderr:`tar: ${f}: not a gzip file`,exitCode:1}}else y=g;let S=Hg(y);if(l)return{stdout:S.map(N=>d?`-rw-r--r-- 0/0 ${N.content.length.toString().padStart(8)} 1970-01-01 00:00 ${N.name}`:N.name).join(`
`),exitCode:0};let w=[];for(let{name:b,content:N}of S){let I=B(e,b);t.vfs.writeFile(I,N,{},n,s),d&&w.push(b)}return{stdout:d?w.join(`
`):void 0,exitCode:0}}return{stderr:"tar: must specify -c, -x, or -t",exitCode:1}}}});function qg(t,e){for(let r=1;r<t.length;r++){let n=t[r];if(n==="delay"||n==="latency"){let s=t[r+1];return Bi(s??"0")}if(/^\d+(\.\d+)?(ms|us|s)$/.test(n))return Bi(n)}return 0}function Yg(t,e){let r=t.indexOf("jitter");if(r===-1)return 0;let n=t[r+1];return Bi(n??"0")}function Kg(t,e){let r=t.indexOf("loss");if(r===-1)return 0;for(let n=r+1;n<t.length;n++){let s=t[n];if(/^\d+(\.\d+)?%$/.test(s))return Number.parseFloat(s)}return 0}function Xg(t,e){let r=t.indexOf("reorder");if(r===-1)return 0;let n=t[r+1];return n?Number.parseFloat(n):0}function Zg(t,e){let r=t.indexOf("duplicate");if(r===-1)return 0;let n=t[r+1];return n?Number.parseFloat(n):0}function Jg(t,e){let r=t.indexOf("corrupt");if(r===-1)return 0;let n=t[r+1];return n?Number.parseFloat(n):0}function zp(t,e){let r=t.indexOf("rate");return r===-1?"0":t[r+1]??"0"}function Qg(t,e){let r=t.indexOf("burst");return r===-1?"0":t[r+1]??"0"}function ey(t,e){let r=t.indexOf("limit");return r===-1?"0":t[r+1]??"0"}function Bi(t){return t.endsWith("ms")?Number.parseFloat(t):t.endsWith("us")?Number.parseFloat(t)/1e3:t.endsWith("s")?Number.parseFloat(t)*1e3:Number.parseFloat(t)}var Vp,Gp=M(()=>{"use strict";Vp={name:"tc",description:"Show / manipulate traffic control settings",category:"network",params:["<object> <command> [dev <device>] [qdisc <type>] [options]"],run:({args:t,shell:e})=>{let r=e.network,n=t[0]?.toLowerCase(),s=t[1]?.toLowerCase();if(!n)return{stderr:`Usage: tc [ OPTIONS ] OBJECT { COMMAND | help }
OBJECT := { qdisc | class | filter | action }`,exitCode:1};if(n==="qdisc"){if(s==="show"||s==="list"||s==="ls"){let i=t.indexOf("dev"),o=i===-1?void 0:t[i+1],a=r.getInterfaces(),c=[];for(let l of a)o&&l.name!==o||(c.push(`qdisc noqueue 0: dev ${l.name} root refcnt 2`),c.push(` qdisc netem 1: dev ${l.name} parent 1:1 limit 1000`));return{stdout:`${c.join(`
`)}
`,exitCode:0}}if(s==="add"){let i=t.indexOf("dev"),o=i===-1?"eth0":t[i+1],a=t.indexOf("netem"),c=t.indexOf("tbf"),l=t.indexOf("htb");if(a!==-1){let u=qg(t,a),d=Yg(t,a),p=Kg(t,a),f=Xg(t,a),m=Zg(t,a),h=Jg(t,a),g=r.getInterface(o);return r.setInterfaceMtu(o,g?.mtu??1500),{stdout:`Added netem qdisc to ${o}: latency=${u}ms jitter=${d}ms loss=${p}% reorder=${f}% duplicate=${m}% corrupt=${h}%
`,exitCode:0}}if(c!==-1){let u=zp(t,c),d=Qg(t,c),p=ey(t,c);return{stdout:`Added tbf qdisc to ${o}: rate=${u} burst=${d} limit=${p}
`,exitCode:0}}if(l!==-1){let u=zp(t,l);return{stdout:`Added htb qdisc to ${o}: rate=${u}
`,exitCode:0}}return{stderr:"tc: unsupported qdisc type. Use netem, tbf, or htb.",exitCode:1}}if(s==="del"||s==="delete"){let i=t.indexOf("dev");return{stdout:`Deleted qdisc from ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}if(s==="change"||s==="replace"){let i=t.indexOf("dev");return{stdout:`Changed qdisc on ${i===-1?"eth0":t[i+1]}
`,exitCode:0}}}return n==="class"||n==="filter"||n==="action"?{exitCode:0}:{stderr:`tc: Object "${n}" is unknown, try "tc help".`,exitCode:1}}}});var Wp,jp=M(()=>{"use strict";ae();se();Wp={name:"tee",description:"Read stdin, write to stdout and files",category:"text",params:["[-a] <file...>"],run:({shell:t,cwd:e,args:r,stdin:n,uid:s,gid:i})=>{let o=K(r,["-a"]),a=r.filter(l=>!l.startsWith("-")),c=n??"";for(let l of a){let u=B(e,l);if(o){let d=(()=>{try{return t.vfs.readFile(u,s,i)}catch{return""}})();t.vfs.writeFile(u,d+c,{},s,i)}else t.vfs.writeFile(u,c,{},s,i)}return{stdout:c,exitCode:0}}}});function jr(t,e,r){if(t[t.length-1]==="]"&&(t=t.slice(0,-1)),t[0]==="["&&(t=t.slice(1)),t.length===0)return!1;if(t[0]==="!")return!jr(t.slice(1),e,r);let n=t.indexOf("-a");if(n!==-1)return jr(t.slice(0,n),e,r)&&jr(t.slice(n+1),e,r);let s=t.indexOf("-o");if(s!==-1)return jr(t.slice(0,s),e,r)||jr(t.slice(s+1),e,r);if(t.length===2){let[i,o=""]=t,a=B(r,o);switch(i){case"-e":return e.vfs.exists(a);case"-f":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file";case"-d":return e.vfs.exists(a)&&e.vfs.stat(a).type==="directory";case"-r":return e.vfs.exists(a);case"-w":return e.vfs.exists(a);case"-x":return e.vfs.exists(a)&&!!(e.vfs.stat(a).mode&73);case"-s":return e.vfs.exists(a)&&e.vfs.stat(a).type==="file"&&e.vfs.stat(a).size>0;case"-z":return o.length===0;case"-n":return o.length>0;case"-L":return e.vfs.isSymlink(a);default:break}}if(t.length===3){let[i="",o,a=""]=t,c=Number(i),l=Number(a);switch(o){case"=":case"==":return i===a;case"!=":return i!==a;case"<":return i<a;case">":return i>a;case"-eq":return c===l;case"-ne":return c!==l;case"-lt":return c<l;case"-le":return c<=l;case"-gt":return c>l;case"-ge":return c>=l;default:break}}return t.length===1?(t[0]??"").length>0:!1}var Hp,qp=M(()=>{"use strict";se();Hp={name:"test",aliases:["["],description:"Evaluate conditional expression",category:"shell",params:["<expression>"],run:({args:t,shell:e,cwd:r})=>{try{return{exitCode:jr([...t],e,r)?0:1}}catch{return{stderr:"test: malformed expression",exitCode:2}}}}});function Yp(t){let e="",r=t;do e=String.fromCharCode(97+r%26)+e,r=Math.floor(r/26)-1;while(r>=0);return e}var Kp,Xp,Zp,Jp,Qp=M(()=>{"use strict";ae();se();Kp={name:"join",description:"Join lines of two files on a common field",category:"text",params:["[-t sep] <file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let{flagsWithValues:n,positionals:s}=Ne(r,{flagsWithValue:["-t"]}),i=n.get("-t")||" 	",[o,a]=s;if(!(o&&a))return{stderr:`join: missing operand
`,exitCode:1};let c=B(e,o),l=B(e,a);if(!(t.vfs.exists(c)&&t.vfs.exists(l)))return{stderr:`join: No such file
`,exitCode:1};let u=t.vfs.readFile(c).split(`
`).filter(Boolean),d=t.vfs.readFile(l).split(`
`).filter(Boolean),p=i===" 	"?/\s+/:new RegExp(i),f=new Map;for(let h of u){let g=h.split(p)[0]||h;f.set(g,h)}let m=[];for(let h of d){let g=h.split(p)[0]||h,y=f.get(g);y&&m.push(`${y} ${h}`)}return{stdout:`${m.join(`
`)}
`,exitCode:0}}},Xp={name:"comm",description:"Compare two sorted files line by line",category:"text",params:["<file1> <file2>"],run:({shell:t,cwd:e,args:r})=>{let n=r.filter(y=>!y.startsWith("-")),[s,i]=n;if(!(s&&i))return{stderr:`comm: missing operand
`,exitCode:1};let o=B(e,s),a=B(e,i);if(!(t.vfs.exists(o)&&t.vfs.exists(a)))return{stderr:`comm: No such file
`,exitCode:1};let c=t.vfs.readFile(o).split(`
`),l=t.vfs.readFile(a).split(`
`);c[c.length-1]===""&&c.pop(),l[l.length-1]===""&&l.pop();let u=new Set(c),d=new Set(l),p=[],f=[],m=[];for(let y of c)d.has(y)?m.push(y):p.push(y);for(let y of l)u.has(y)||f.push(y);let h=Math.max(p.length,f.length,m.length),g=[];for(let y=0;y<h;y++){let S=y<p.length?p[y]:"",w=y<f.length?f[y]:"",b=y<m.length?m[y]:"";g.push(`${S}	${w}	${b}`)}return{stdout:`${g.join(`
`)}
`,exitCode:0}}},Zp={name:"split",description:"Split a file into pieces",category:"text",params:["[-l lines] [-b bytes] <file> [prefix]"],run:({shell:t,cwd:e,args:r,uid:n,gid:s})=>{let{flagsWithValues:i,positionals:o}=Ne(r,{flagsWithValue:["-l","-b"]}),a=Number.parseInt(i.get("-l")||"1000",10),c=i.has("-b")?Number.parseInt(i.get("-b"),10):void 0,l=o[0],u=o[1]||"x";if(!l)return{stderr:`split: missing file operand
`,exitCode:1};let d=B(e,l);if(!t.vfs.exists(d))return{stderr:`split: ${l}: No such file or directory
`,exitCode:1};let p=t.vfs.readFile(d,n,s);if(c!==void 0){let h=0;for(let g=0;g<p.length;g+=c){let y=p.slice(g,g+c),S=B(e,`${u}${Yp(h)}`);t.vfs.writeFile(S,y,{},n,s),h++}return{exitCode:0}}let f=p.split(`
`),m=0;for(let h=0;h<f.length;h+=a){let g=f.slice(h,h+a).join(`
`),y=B(e,`${u}${Yp(m)}`);t.vfs.writeFile(y,g,{},n,s),m++}return{exitCode:0}}},Jp={name:"csplit",description:"Split a file based on context patterns",category:"text",params:["<file> <pattern>..."],run:()=>({stderr:`csplit: not implemented
`,exitCode:1})}});import*as Hr from"node:os";var ef,tf=M(()=>{"use strict";ef={name:"top",description:"Display processes",category:"system",params:[],run:({shell:t})=>{let e=Math.floor((Date.now()-t.startTime)/1e3),r=t.users.listActiveSessions(),n=t.users.listProcesses(),s=Hr.totalmem(),i=Hr.freemem(),o=t.resourceCaps?.ramCapBytes,a=o===void 0?s:Math.min(s,o),c=o===null?i:Math.floor(a*(i/s)),l=a-c,u=Hr.loadavg(),d=[],p=`${Math.floor(e/3600)}:${String(Math.floor(e%3600/60)).padStart(2,"0")}`;d.push(`top - ${new Date().toLocaleTimeString()} up ${p},  ${r.length} user(s), load average: ${u.map(w=>w.toFixed(2)).join(", ")}`),d.push(`Tasks: ${r.length+n.length} total,   ${n.filter(w=>w.status==="running").length||1} running`);let f=(a/1024/1024).toFixed(0),m=(l/1024/1024).toFixed(0),h=(c/1024/1024).toFixed(0);d.push(`MiB Mem : ${f.padStart(8)} total, ${h.padStart(8)} free, ${m.padStart(8)} used`);let g=Math.floor(a*.5),y=Math.floor(g*.05),S=g-y;return d.push(`MiB Swap: ${String(g).padStart(8)} total, ${String(S).padStart(8)} free, ${String(y).padStart(8)} used`),d.push(""),d.push("  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND"),r.forEach((w,b)=>{let N=1e3+b,I=Math.floor(Math.random()*2e5+5e4),v=Math.floor(Math.random()*1e4+2e3),_=Math.floor(v*.6),x=(Math.random()*5).toFixed(1),E=(v/(a/1024)*100).toFixed(1);d.push(`${String(N).padStart(5)} ${w.username.padEnd(8).slice(0,8)}  20   0 ${String(I).padStart(7)} ${String(v).padStart(6)} ${String(_).padStart(6)} S  ${x.padStart(4)} ${E.padStart(5)}   0:00.00 bash`)}),n.forEach(w=>{let b=Math.floor(Math.random()*5e4+1e4),N=Math.floor(Math.random()*5e3+500),I=Math.floor(N*.5),v=(Math.random()*10).toFixed(1),_=(N/(a/1024)*100).toFixed(1),x=w.status==="running"?"R":"S";d.push(`${String(w.pid).padStart(5)} ${w.username.padEnd(8).slice(0,8)}  20   0 ${String(b).padStart(7)} ${String(N).padStart(6)} ${String(I).padStart(6)} ${x} ${v.padStart(4)} ${_.padStart(5)}   0:00.00 ${w.command}`)}),{stdout:`${d.join(`
`)}
`,exitCode:0}}}});import*as rf from"node:path";var nf,sf=M(()=>{"use strict";se();nf={name:"touch",description:"Create or update files",category:"files",params:["<file>"],run:({authUser:t,shell:e,cwd:r,args:n,uid:s,gid:i})=>{if(n.length===0)return{stderr:"touch: missing file operand",exitCode:1};for(let o of n){let a=B(r,o);e.vfs.exists(a)?He(e.vfs,e.users,t,a,2):(He(e.vfs,e.users,t,rf.posix.dirname(a),2),e.vfs.writeFile(a,"",{},s,i))}return{exitCode:0}}}});var ty,of,af,cf,lf=M(()=>{"use strict";ty={cols:220,lines:50,colors:256,bold:"\x1B[1m",dim:"\x1B[2m",smul:"\x1B[4m",rmul:"\x1B[24m",rev:"\x1B[7m",smso:"\x1B[7m",rmso:"\x1B[27m",sgr0:"\x1B[0m",el:"\x1B[K",ed:"\x1B[J",clear:"\x1B[2J\x1B[H",cup:"",setaf:"",setab:""},of=["30","31","32","33","34","35","36","37","90","91","92","93","94","95","96","97"],af={name:"tput",description:"Query terminfo database",category:"shell",params:["<cap> [args...]"],run:({args:t})=>{let e=t[0];if(!e)return{stderr:"tput: missing capability",exitCode:1};if(e==="setaf"&&t[1]!==void 0){let n=Number.parseInt(t[1],10);return{stdout:`\x1B[${of[n]??"39"}m`,exitCode:0}}if(e==="setab"&&t[1]!==void 0){let n=Number.parseInt(t[1],10);return{stdout:`\x1B[${of[n]?.replace(/3/,"4").replace(/9/,"10")??"49"}m`,exitCode:0}}if(e==="cup"&&t[1]!==void 0&&t[2]!==void 0)return{stdout:`\x1B[${Number.parseInt(t[1],10)+1};${Number.parseInt(t[2],10)+1}H`,exitCode:0};let r=ty[e];return r===void 0?{stderr:`tput: unknown terminal capability '${e}'`,exitCode:1}:{stdout:String(r),exitCode:0}}},cf={name:"stty",description:"Change and print terminal line settings",category:"shell",params:["[args...]"],run:({args:t})=>t.includes("-a")||t.includes("--all")?{stdout:["speed 38400 baud; rows 50; columns 220; line = 0;","intr = ^C; quit = ^\\; erase = ^?; kill = ^U; eof = ^D;","eol = M-^?; eol2 = M-^?; swtch = <undef>; start = ^Q; stop = ^S;","-parenb -parodd -cmspar cs8 -hupcl -cstopb cread -clocal -crtscts","brkint -icrnl ixon -ixoff -iuclc ixany imaxbel -iutf8","opost -olcuc -ocrnl onlcr -onocr -onlret -ofill -ofdel nl0 cr0 tab0 bs0 vt0 ff0","isig icanon iexten echo echoe echok -echonl -noflsh -xcase -tostop -echoprt echoctl echoke"].join(`
`),exitCode:0}:t.includes("size")?{stdout:"50 220",exitCode:0}:{exitCode:0}}});function ry(t){return t.replace(/\\n/g,`
`).replace(/\\t/g,"	").replace(/\\r/g,"\r").replace(/\\\\/g,"\\")}function uf(t){let e=[],r=ry(t),n=0;for(;n<r.length;){if(n+2<r.length&&r[n+1]==="-"){let s=r.charCodeAt(n),i=r.charCodeAt(n+2);if(s<=i){for(let o=s;o<=i;o++)e.push(String.fromCharCode(o));n+=3;continue}}e.push(r[n]),n++}return e}var df,pf=M(()=>{"use strict";ae();df={name:"tr",description:"Translate or delete characters",category:"text",params:["[-d] [-s] <set1> [set2]"],run:({args:t,stdin:e})=>{let r=K(t,["-d"]),n=K(t,["-s"]),s=t.filter(c=>!c.startsWith("-")),i=uf(s[0]??""),o=uf(s[1]??""),a=e??"";if(r){let c=new Set(i);a=[...a].filter(l=>!c.has(l)).join("")}else if(o.length>0){let c=new Map;for(let l=0;l<i.length;l++)c.set(i[l],o[l]??o[o.length-1]??"");a=[...a].map(l=>c.get(l)??l).join("")}if(n&&o.length>0){let c=new Set(o);a=a.replace(/(.)\1+/g,(l,u)=>c.has(u)?u:l)}return{stdout:a,exitCode:0}}}});function ny(t,e){let r=hf(t),n=[],i=[{ip:e.getRoutes().find(o=>o.destination==="default")?.gateway??"10.0.0.1",hostname:"gateway.local",baseLatency:1,jitter:.5},{ip:"192.168.1.1",hostname:"isp-router-1.isp.net",baseLatency:5,jitter:2},{ip:"10.10.0.1",hostname:"core-1.isp.net",baseLatency:10,jitter:3},{ip:"172.16.0.1",hostname:"peer-exchange.net",baseLatency:20,jitter:5},{ip:"203.0.113.1",hostname:"edge-router.dst.net",baseLatency:35,jitter:8}];for(let o of i){let a=Math.random()<.1;n.push({...o,timeout:a,reached:!1,jitter:a?0:o.jitter})}return n.push({ip:r,hostname:t,baseLatency:40+Math.random()*20,jitter:5,timeout:!1,reached:!0}),n}function sy(t,e){return t==="localhost"||t==="127.0.0.1"?"127.0.0.1":/^\d+\.\d+\.\d+\.\d+$/.test(t)?t:hf(t)}function hf(t){let e=iy(t);return[(10+(e&255))%254+1,e>>8&255,e>>16&255,(e>>24&255)%254+1].join(".")}function iy(t){let e=0;for(let r=0;r<t.length;r++)e=(e<<5)-e+t.charCodeAt(r),e|=0;return Math.abs(e)}function ff(t,e,r){let n=t.indexOf(e);if(n===-1)return r;let s=t[n+1],i=Number.parseInt(s??"0",10);return Number.isNaN(i)?r:i}var mf,gf=M(()=>{"use strict";mf={name:"traceroute",description:"Print the route packets trace to network host",category:"network",aliases:["tracepath","tracert"],params:["[options] <host>"],run:({args:t,shell:e})=>{let r=e.network,n=t.find(c=>!c.startsWith("-"));if(!n)return{stderr:`Usage: traceroute [options] <host>
Options:
  -m max_ttl   Set max time-to-live (default 30)
  -q nqueries   Set number of probes per hop (default 3)
  -w waittime   Set seconds to wait for response (default 5)
  -p port       Set destination port (default 33434)
  -I            Use ICMP echo instead of UDP
  -T            Use TCP SYN instead of UDP`,exitCode:1};let s=ff(t,"-m",30),i=ff(t,"-q",3),o=[];o.push(`traceroute to ${n} (${sy(n,e)}), ${s} hops max, 60 byte packets`);let a=ny(n,r);for(let c=1;c<=Math.min(s,a.length);c++){let l=a[c-1],u=[];for(let d=0;d<i;d++)if(l.timeout)u.push("*");else{let p=l.baseLatency+Math.random()*l.jitter;u.push(`${p.toFixed(3)} ms`)}if(l.timeout)o.push(` ${c}  * * *`);else{let d=l.hostname??l.ip;o.push(` ${c}  ${d} (${l.ip})  ${u.join("  ")}`)}if(l.reached)break}return{stdout:`${o.join(`
`)}
`,exitCode:0}}}});var yf,Sf=M(()=>{"use strict";ae();se();yf={name:"tree",description:"Display directory tree",category:"navigation",params:["[path]"],run:({authUser:t,shell:e,cwd:r,args:n})=>{let s=B(r,jt(n,0)??r);return ye(t,s,"tree"),{stdout:e.vfs.tree(s),exitCode:0}}}});var bf,_f,vf=M(()=>{"use strict";bf={name:"true",description:"Return success exit code",category:"shell",params:[],run:()=>({exitCode:0})},_f={name:"false",description:"Return failure exit code",category:"shell",params:[],run:()=>({exitCode:1})}});var wf,xf=M(()=>{"use strict";Lr();wf={name:"type",description:"Describe how a command would be interpreted",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"type: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=0;for(let o of t){if(vt(o)){s.push(`${o} is a shell builtin`);continue}let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)){s.push(`${o} is ${l}`),a=!0;break}}a||(s.push(`${o}: not found`),i=1)}return{stdout:s.join(`
`),exitCode:i}}}});var Cf,If=M(()=>{"use strict";ae();Cf={name:"uname",description:"Print system information",category:"system",params:["[-a] [-s] [-r] [-m]"],run:({shell:t,args:e})=>{let r=K(e,["-a"]),n="Linux",s=t.properties?.kernel??"1.0.0+itsrealfortune+1-amd64",i=t.properties?.arch??"x86_64",o=t.hostname;return r?{stdout:`${n} ${o} ${s} #1 SMP ${i} GNU/Linux`,exitCode:0}:K(e,["-r"])?{stdout:s,exitCode:0}:K(e,["-m"])?{stdout:i,exitCode:0}:{stdout:n,exitCode:0}}}});var Pf,Ef=M(()=>{"use strict";ae();Pf={name:"uniq",description:"Report or filter out repeated lines",category:"text",params:["[-c] [-d] [-u] [file]"],run:({args:t,stdin:e})=>{let r=K(t,["-c"]),n=K(t,["-d"]),s=K(t,["-u"]),i=(e??"").split(`
`),o=[],a=0;for(;a<i.length;){let c=a;for(;c<i.length&&i[c]===i[a];)c++;let l=c-a,u=i[a];if(n&&l===1){a=c;continue}if(s&&l>1){a=c;continue}o.push(r?`${String(l).padStart(4)} ${u}`:u),a=c}return{stdout:o.join(`
`),exitCode:0}}}});var $f,Mf=M(()=>{"use strict";$f={name:"unset",description:"Remove shell variable",category:"shell",params:["<VAR>"],run:({args:t,env:e})=>{for(let r of t)delete e.vars[r];return{exitCode:0}}}});var kf,Nf=M(()=>{"use strict";ae();kf={name:"uptime",description:"Tell how long the system has been running",category:"system",params:["[-p] [-s]"],run:({args:t,shell:e})=>{let r=K(t,["-p"]),n=K(t,["-s"]),s=Math.floor((Date.now()-e.startTime)/1e3),i=Math.floor(s/86400),o=Math.floor(s%86400/3600),a=Math.floor(s%3600/60);if(n)return{stdout:new Date(e.startTime).toISOString().slice(0,19).replace("T"," "),exitCode:0};if(r){let p=[];return i>0&&p.push(`${i} day${i>1?"s":""}`),o>0&&p.push(`${o} hour${o>1?"s":""}`),p.push(`${a} minute${a===1?"":"s"}`),{stdout:`up ${p.join(", ")}`,exitCode:0}}let c=new Date().toTimeString().slice(0,8),l=i>0?`${i} day${i>1?"s":""}, ${String(o).padStart(2)}:${String(a).padStart(2,"0")}`:`${String(o).padStart(2)}:${String(a).padStart(2,"0")}`,u=e.users.listActiveSessions().length,d=(Math.random()*.5).toFixed(2);return{stdout:` ${c} up ${l},  ${u} user${u===1?"":"s"},  load average: ${d}, ${d}, ${d}`,exitCode:0}}}});var Af,Tf=M(()=>{"use strict";Af={name:"usermod",description:"Modify a user account",category:"users",params:["[-g group|-G groups|-aG group|-L|-U] <user>"],run:({authUser:t,shell:e,args:r})=>{if(t!=="root")return{stderr:`usermod: permission denied
`,exitCode:1};let n,s,i=!1,o=!1,a=!1,c;for(let u=0;u<r.length;u++){let d=r[u];if(d)if(d==="-g"){let p=r[u+1];if(!p)break;n=p,u++}else if(d==="-G"){let p=r[u+1];if(!p)break;s=p.split(","),u++}else if(d==="-aG"){let p=r[u+1];if(!p)break;i=!0,s=p.split(","),u++}else d==="-L"?o=!0:d==="-U"?a=!0:c||(c=d)}if(!c)return{stderr:`Usage: usermod [-g group|-G groups|-aG group|-L|-U] <user>
`,exitCode:1};if(!e.users.listUsers().includes(c))return{stderr:`usermod: user '${c}' does not exist
`,exitCode:1};if(n){if(e.users.getGidByName(n)===null)return{stderr:`usermod: group '${n}' does not exist
`,exitCode:1};e.users.addGroupMember(n,c)}if(s){if(!i){let u=e.users.getUserSupplementaryGroups(c);for(let d of u)e.users.removeGroupMember(d,c)}for(let u of s){let d=u.trim();if(d){if(!e.users.getGroup(d))return{stderr:`usermod: group '${d}' does not exist
`,exitCode:1};e.users.addGroupMember(d,c)}}}if(o){let u=e.users.getPasswordHash(c);if(u&&!u.startsWith("!"))return{stdout:`usermod: lock requested for '${c}' (password lock not yet implemented)
`,exitCode:0}}return a?{stdout:`usermod: unlock requested for '${c}'
`,exitCode:0}:{stdout:`usermod: user '${c}' modified
`,exitCode:0}}}});var Of,Rf=M(()=>{"use strict";Ye();Of={name:"w",description:"Show who is logged on and what they are doing",category:"system",params:["[user]"],run:({shell:t,authUser:e})=>{let r=new Date,n=Math.floor(performance.now()/1e3),s=Math.floor(n/60),i=Math.floor(s/60),o=i>0?`${i}:${String(s%60).padStart(2,"0")}`:`${s} min`,a=r.toTimeString().slice(0,5);t.users.listActiveSessions?.();let c=`${fe(e)}/.lastlog`,l=a;if(t.vfs.exists(c))try{let m=JSON.parse(t.vfs.readFile(c));l=new Date(m.at).toTimeString().slice(0,5)}catch{}let u=` ${a} up ${o},  1 user,  load average: 0.${Math.floor(Math.random()*30).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*15).toString().padStart(2,"0")}, 0.${Math.floor(Math.random()*10).toString().padStart(2,"0")}`,d="USER     TTY      FROM             LOGIN@   IDLE JCPU   PCPU WHAT",f=`${e.padEnd(8)} pts/0    browser          ${l}   0.00s  0.01s  0.00s -bash`;return{stdout:[u,d,f].join(`
`),exitCode:0}}}});var Df,Ff=M(()=>{"use strict";ae();se();Df={name:"wc",description:"Count words/lines/bytes",category:"text",params:["[-l] [-w] [-c] [file...]"],run:({authUser:t,shell:e,cwd:r,args:n,stdin:s})=>{let i=K(n,["-l"]),o=K(n,["-w"]),a=K(n,["-c"]),c=!(i||o||a),l=n.filter(p=>!p.startsWith("-")),u=(p,f)=>{let m=p.length===0?0:p.trim().split(`
`).length,h=p.trim().split(/\s+/).filter(Boolean).length,g=Buffer.byteLength(p,"utf8"),y=[];return(c||i)&&y.push(String(m).padStart(7)),(c||o)&&y.push(String(h).padStart(7)),(c||a)&&y.push(String(g).padStart(7)),f&&y.push(` ${f}`),y.join("")};if(l.length===0)return{stdout:u(s??"",""),exitCode:0};let d=[];for(let p of l){let f=B(r,p);try{ye(t,f,"wc");let m=e.vfs.readFile(f);d.push(u(m,p))}catch{return{stderr:`wc: ${p}: No such file or directory`,exitCode:1}}}return{stdout:d.join(`
`),exitCode:0}}}});var Lf,Uf=M(()=>{"use strict";ae();se();Lf={name:"wget",description:"File downloader (pure fetch)",category:"network",params:["[options] <url>"],run:async({authUser:t,cwd:e,args:r,shell:n,uid:s,gid:i})=>{let{flagsWithValues:o,positionals:a}=Ne(r,{flagsWithValue:["-O","--output-document","-o","--output-file","-P","--directory-prefix","--tries","--timeout"]});if(K(r,["-h","--help"]))return{stdout:["Usage: wget [option]... [URL]...","  -O, --output-document=FILE  Write to FILE ('-' for stdout)","  -P, --directory-prefix=DIR  Save files in DIR","  -q, --quiet                 Quiet mode","  -v, --verbose               Verbose output (default)","  -c, --continue              Continue partial download","  --tries=N                   Retry N times","  --timeout=N                 Timeout in seconds"].join(`
`),exitCode:0};if(K(r,["-V","--version"]))return{stdout:"GNU Wget 1.21.3 (virtual) built on Fortune GNU/Linux.",exitCode:0};let c=a[0];if(!c)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let l=c.startsWith("http://")||c.startsWith("https://")?c:`http://${c}`;if(!l)return{stderr:`wget: missing URL
Usage: wget [OPTION]... [URL]...`,exitCode:1};let u=o.get("-O")??o.get("--output-document")??null,d=o.get("-P")??o.get("--directory-prefix")??null,p=K(r,["-q","--quiet"]),f=u==="-"?null:u??Oo(l),m=f?B(e,d?`${d}/${f}`:f):null;m&&ye(t,m,"wget");let h=[];p||(h.push(`--${new Date().toISOString()}--  ${l}`),h.push(`Resolving ${new URL(l).host}...`),h.push(`Connecting to ${new URL(l).host}...`));let g;try{let S=new URL(l),w=S.port?Number.parseInt(S.port,10):S.protocol==="https:"?443:80,b=n.network.checkFirewall("OUTPUT","tcp",void 0,S.hostname,w);if(b==="DROP"||b==="REJECT")return{stderr:`wget: unable to connect to ${S.hostname}:${w}: Connection refused
`,exitCode:4};g=await fetch(l,{headers:{"User-Agent":"Wget/1.21.3 (Fortune GNU/Linux)"}})}catch(S){let w=S instanceof Error?S.message:String(S);return h.push(`wget: unable to resolve host: ${w}`),{stderr:h.join(`
`),exitCode:4}}if(!g.ok)return h.push(`ERROR ${g.status}: ${g.statusText}`),{stderr:h.join(`
`),exitCode:8};let y;try{y=await g.text()}catch{return{stderr:"wget: failed to read response",exitCode:1}}if(!p){let S=g.headers.get("content-type")??"application/octet-stream";h.push(`HTTP request sent, awaiting response... ${g.status} ${g.statusText}`),h.push(`Length: ${y.length} [${S}]`)}return u==="-"?{stdout:y,stderr:h.join(`
`)||void 0,exitCode:0}:m?(n.vfs.writeFile(m,y,{},s,i),p||h.push(`Saving to: '${m}'
${m}            100%[==================>]  ${y.length} B`),{stderr:h.join(`
`)||void 0,exitCode:0}):{stdout:y,exitCode:0}}}});var Bf,zf=M(()=>{"use strict";Bf={name:"which",description:"Locate a command in PATH",category:"shell",params:["<command...>"],run:({args:t,shell:e,env:r})=>{if(t.length===0)return{stderr:"which: missing argument",exitCode:1};let n=(r?.vars?.PATH??"/usr/local/bin:/usr/bin:/bin").split(":"),s=[],i=!1;for(let o of t){let a=!1;for(let c of n){let l=`${c}/${o}`;if(e.vfs.exists(l)&&e.vfs.stat(l).type==="file"){s.push(l),a=!0;break}}a||(i=!0)}return s.length===0?{exitCode:1}:{stdout:s.join(`
`),exitCode:i?1:0}}}});function ms(t){let e=t.toLocaleString("en-US",{weekday:"short"}),r=t.toLocaleString("en-US",{month:"short"}),n=t.getDate().toString().padStart(2,"0"),s=t.getHours().toString().padStart(2,"0"),i=t.getMinutes().toString().padStart(2,"0"),o=t.getSeconds().toString().padStart(2,"0"),a=t.getFullYear();return`${e} ${r} ${n} ${s}:${i}:${o} ${a}`}var zi=M(()=>{"use strict"});var Vf,Gf=M(()=>{"use strict";zi();Vf={name:"who",description:"Show active sessions",category:"system",params:[],run:({shell:t})=>({stdout:t.users.listActiveSessions().map(r=>{let n=new Date(r.startedAt),s=Number.isNaN(n.getTime())?r.startedAt:ms(n);return`${r.username} ${r.tty} ${s} (${r.remoteAddress||"unknown"})`}).join(`
`),exitCode:0})}});var Wf,jf=M(()=>{"use strict";Wf={name:"whoami",description:"Print current user",category:"system",params:[],run:({authUser:t})=>({stdout:t,exitCode:0})}});var Hf,qf=M(()=>{"use strict";Ye();Hf={name:"xargs",description:"Build and execute command lines from stdin",category:"text",params:["[command] [args...]"],run:({authUser:t,hostname:e,mode:r,cwd:n,args:s,stdin:i,shell:o,env:a})=>{let c=s[0]??"echo",l=s.slice(1),u=(i??"").trim().split(/\s+/).filter(Boolean);if(u.length===0)return{exitCode:0};let d=[c,...l,...u].join(" ");return ge(d,t,e,r,n,o,void 0,a)}}});var Yf,Kf=M(()=>{"use strict";Yf={name:"thunar",params:[],run(t){let e=t.shell.desktopManager;if(!e?.isActive())return{stderr:"thunar: desktop is not running (start it with startxfce4)",exitCode:1};let r=t.args[0]||t.env.vars.HOME||"/root";return e.createThunarWindow(r),{exitCode:0}}}});function ay(t){let e=4294967295;for(let r=0;r<t.length;r++)e=(oy[(e^t[r])&255]^e>>>8)>>>0;return(e^4294967295)>>>0}function cy(){let t=new Date,e=t.getFullYear()-1980<<9|t.getMonth()+1<<5|t.getDate();return[t.getHours()<<11|t.getMinutes()<<5|Math.floor(t.getSeconds()/2),e]}function ly(t){let e=[],r=[],n=0,[s,i]=cy();for(let{name:c,content:l}of t){let u=Buffer.from(c,"utf8"),d=Buffer.from(lr(l,{level:6})),p=d.length<l.length,f=p?d:l,m=ay(l),h=p?8:0,g=Buffer.alloc(30+u.length);g.writeUInt32LE(67324752,0),g.writeUInt16LE(20,4),g.writeUInt16LE(2048,6),g.writeUInt16LE(h,8),g.writeUInt16LE(s,10),g.writeUInt16LE(i,12),g.writeUInt32LE(m,14),g.writeUInt32LE(f.length,18),g.writeUInt32LE(l.length,22),g.writeUInt16LE(u.length,26),g.writeUInt16LE(0,28),u.copy(g,30);let y=Buffer.alloc(46+u.length);y.writeUInt32LE(33639248,0),y.writeUInt16LE(20,4),y.writeUInt16LE(20,6),y.writeUInt16LE(2048,8),y.writeUInt16LE(h,10),y.writeUInt16LE(s,12),y.writeUInt16LE(i,14),y.writeUInt32LE(m,16),y.writeUInt32LE(f.length,20),y.writeUInt32LE(l.length,24),y.writeUInt16LE(u.length,28),y.writeUInt16LE(0,30),y.writeUInt16LE(0,32),y.writeUInt16LE(0,34),y.writeUInt16LE(0,36),y.writeUInt32LE(2175008768,38),y.writeUInt32LE(n,42),u.copy(y,46),e.push(g,f),r.push(y),n+=g.length+f.length}let o=Buffer.concat(r),a=Buffer.alloc(22);return a.writeUInt32LE(101010256,0),a.writeUInt16LE(0,4),a.writeUInt16LE(0,6),a.writeUInt16LE(t.length,8),a.writeUInt16LE(t.length,10),a.writeUInt32LE(o.length,12),a.writeUInt32LE(n,16),a.writeUInt16LE(0,20),Buffer.concat([...e,o,a])}function uy(t){let e=[],r=0;for(;r+4<=t.length;){let n=t.readUInt32LE(r);if(n===33639248||n===101010256)break;if(n!==67324752){r++;continue}let s=t.readUInt16LE(r+8),i=t.readUInt32LE(r+18),o=t.readUInt32LE(r+22),a=t.readUInt16LE(r+26),c=t.readUInt16LE(r+28),l=t.subarray(r+30,r+30+a).toString("utf8"),u=r+30+a+c,d=t.subarray(u,u+i),p;if(s===8)try{p=Buffer.from(Xt(d))}catch{p=d}else p=d;l&&!l.endsWith("/")&&(p.length===o||s!==0?e.push({name:l,content:p}):e.push({name:l,content:p})),r=u+i}return e}var oy,Xf,Zf,Jf=M(()=>{"use strict";un();se();oy=(()=>{let t=new Uint32Array(256);for(let e=0;e<256;e++){let r=e;for(let n=0;n<8;n++)r=r&1?3988292384^r>>>1:r>>>1;t[e]=r}return t})();Xf={name:"zip",description:"Package and compress files",category:"archive",params:["[-r] <archive.zip> <file...>"],run:({shell:t,cwd:e,args:r,authUser:n})=>{let s=r.includes("-r")||r.includes("-R"),i=r.filter(m=>!m.startsWith("-")),o=i[0],a=i.slice(1);if(!o)return{stderr:"zip: no archive specified",exitCode:1};if(a.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let c=B(e,o.endsWith(".zip")?o:`${o}.zip`),l=[],u=[],d=t.users.getUid(n),p=t.users.getGid(n);for(let m of a){let h=B(e,m);if(!t.vfs.exists(h))return{stderr:`zip warning: name not matched: ${m}`,exitCode:12};let g=t.vfs.stat(h),y=m.startsWith("/")?m.slice(1):m;if(g.type==="file"){let S=t.vfs.readFileRaw(h);l.push({name:y,content:S}),u.push(`  adding: ${m} (deflated)`)}else if(s){let S=(w,b)=>{for(let N of t.vfs.list(w)){let I=`${w}/${N}`,v=`${b}/${N}`;if(t.vfs.stat(I).type==="directory")S(I,v);else{let x=t.vfs.readFileRaw(I);l.push({name:v.startsWith("/")?v.slice(1):v,content:x}),u.push(`  adding: ${v} (deflated)`)}}};S(h,y)}}if(l.length===0)return{stderr:"zip: nothing to do!",exitCode:12};let f=ly(l);return t.vfs.writeFile(c,f,{},d,p),{stdout:u.join(`
`),exitCode:0}}},Zf={name:"unzip",description:"Extract compressed files from ZIP archives",category:"archive",params:["[-l] [-o] <archive.zip> [-d <dir>]"],run:({shell:t,cwd:e,args:r,authUser:n})=>{let s=r.includes("-l"),i=r.indexOf("-d"),o=i===-1?void 0:r[i+1],a=r.find(h=>!h.startsWith("-")&&h!==o);if(!a)return{stderr:"unzip: missing archive operand",exitCode:1};let c=B(e,a);if(!t.vfs.exists(c))return{stderr:`unzip: cannot find or open ${a}`,exitCode:9};let l=t.vfs.readFileRaw(c),u;try{u=uy(l)}catch(h){return{stderr:`unzip: ${a}: not a valid ZIP file: ${h instanceof Error?h.message:String(h)}`,exitCode:1}}let d=o?B(e,o):e,p=t.users.getUid(n),f=t.users.getGid(n);if(s){let h=`Archive:  ${a}
  Length      Date    Time    Name
---------  ---------- -----   ----`,g=u.map(w=>`  ${String(w.content.length).padStart(8)}  2024-01-01 00:00   ${w.name}`),y=u.reduce((w,b)=>w+b.content.length,0),S=`---------                     -------
  ${String(y).padStart(8)}                     ${u.length} file${u.length===1?"":"s"}`;return{stdout:`${h}
${g.join(`
`)}
${S}`,exitCode:0}}let m=[`Archive:  ${a}`];for(let{name:h,content:g}of u){let y=h.startsWith("/")?h.slice(1):h,S=B(d,y);t.vfs.writeFile(S,g,{},p,f),m.push(`  inflating: ${S}`)}return{stdout:m.join(`
`),exitCode:0}}}});function em(){fr.clear();for(let t of tm()){fr.set(t.name,t);for(let e of t.aliases??[])fr.set(e,t)}_n=Array.from(fr.keys()).sort()}function tm(){return[...dy,...Qf,py]}function xi(t){let e={...t,name:t.name.trim().toLowerCase(),aliases:t.aliases?.map(n=>n.trim().toLowerCase())};if([e.name,...e.aliases??[]].some(n=>n.length===0||/\s/.test(n)))throw new Error("Command names must be non-empty and contain no spaces");Qf.push(e),fr.set(e.name,e);for(let n of e.aliases??[])fr.set(n,e);_n=null}function Ci(t,e,r){return{name:t,params:e,run:r}}function dn(){return _n||em(),_n}function Ii(){return tm()}function vt(t){return _n||em(),fr.get(t.toLowerCase())}var dy,Qf,fr,_n,py,Lr=M(()=>{"use strict";Mo();To();Lo();Bo();Vo();jo();Zo();Oa();Da();Ha();Ya();Xa();Ja();tc();nc();ic();hc();Sc();_c();wc();Cc();Pc();$c();kc();Ac();Oc();Fc();Uc();zc();Gc();jc();qc();Kc();Zc();Qc();tl();ul();pl();ml();gl();Sl();_l();wl();Il();El();Tl();Rl();Fl();Ul();zl();Hl();Yl();Xl();tu();su();au();uu();mu();gu();Su();wu();Au();Ru();Uu();zu();Wu();qu();id();ad();ld();dd();hd();yd();_d();wd();Cd();Pd();$d();kd();Td();Rd();Fd();zd();Gd();Yd();Xd();Jd();ep();np();ap();lp();dp();fp();yp();bp();vp();xp();Ip();Ep();Mp();Ap();Dp();Lp();Bp();Gp();jp();qp();Qp();tf();sf();lf();pf();gf();Sf();vf();xf();If();Ef();Mf();Nf();Tf();Rf();Ff();Uf();zf();Gf();jf();qf();Kf();Jf();dy=[Dd,ja,fu,yf,Ra,nf,qd,Ou,Fu,Lu,yc,Gu,cu,lu,Za,ec,Ka,Zd,_p,Jc,Ic,Iu,hl,Kd,Uo,up,Pf,Df,Pl,Fp,vc,df,Wp,Hf,Tc,Mu,ku,Nu,Pu,Eu,$u,Kp,Xp,Zp,Jp,Up,xl,Cl,Xf,Zf,Aa,Ta,zo,Wf,Vf,Dl,Bl,vl,dl,Cf,Od,nu,Nc,Lc,xc,cp,Ed,Tp,Op,Rp,Nd,Ad,ef,ud,gd,Bc,Vc,Hc,Qd,$f,rp,rc,Wc,Hu,Of,Go,Wo,Xc,af,cf,iu,ou,ql,nl,sl,ol,al,cl,ll,vd,Ll,bc,Lf,od,Kl,Vp,gp,mf,sc,Wl,$o,xd,Mc,Pp,Np,Cp,yl,bl,fl,Af,qa,cd,sd,Do,Fo,Rc,Dc,Jl,Ql,eu,Xo,Bf,wf,vu,No,Ao,Hp,pp,Ol,Md,Vd,Ec,sp,ip,op,bf,_f,Sd,bd,md,Bd,Yc,Sp,Yf,Bu,kf,el,hu,yu,wp,$p,Id,oc,ac,cc,lc,uc,dc,pc,fc,mc],Qf=[],fr=new Map,_n=null,py=Al()});var vs,Cn,ws,$y,eo,hr,gr,My,xs,to,ro,ky,Ny,Ay,Ty,In=M(()=>{vs="rXDT",Cn=Buffer.from("ROX1"),ws=Buffer.from("PXL1"),$y=Buffer.from("BLK2"),eo=0,hr=1,gr=2,My=Buffer.from([0]),xs=Buffer.from([137,80,78,71,13,10,26,10]),to=xs.toString("hex"),ro=[{r:255,g:0,b:0},{r:0,g:255,b:0},{r:0,g:0,b:255}],ky=ro,Ny=[...ro].reverse(),Ay={zstd:[{r:0,g:255,b:0}],"bwt-ans":[{r:0,g:128,b:255}]},Ty={png:{r:0,g:255,b:255},webp:{r:255,g:0,b:255},jxl:{r:255,g:255,b:0}}});var wm={};On(wm,{adler32:()=>vm,crc32:()=>_m});function _m(t,e=0){let r=e^4294967295;for(let n=0;n<t.length;n++)r=bm[(r^t[n])&255]^r>>>8;return(r^4294967295)>>>0}function vm(t,e=1){let r=e&65535,n=e>>>16&65535;for(let s=0;s<t.length;s++)r=(r+t[s])%65521,n=(n+r)%65521;return(n<<16|r)>>>0}var bm,no=M(()=>{bm=[];for(let t=0;t<256;t++){let e=t;for(let r=0;r<8;r++)e&1?e=3988292384^e>>>1:e=e>>>1;bm[t]=e}});import{copyFileSync as Oy,existsSync as Cs}from"fs";import{createRequire as Ry}from"module";import{arch as xm,platform as Cm}from"os";import{dirname as Dy,resolve as je}from"path";import{fileURLToPath as Fy}from"url";function Ly(){let t=Cm(),e=xm(),n={linux:{x64:["x86_64-unknown-linux-gnu"],ia32:["i686-unknown-linux-gnu"],arm64:["aarch64-unknown-linux-gnu"],arm:["armv7-unknown-linux-gnueabihf"]},win32:{x64:["x86_64-pc-windows-msvc","x86_64-pc-windows-gnu"],ia32:["i686-pc-windows-msvc","i686-pc-windows-gnu"],arm64:["aarch64-pc-windows-msvc"]},darwin:{x64:["x86_64-apple-darwin"],arm64:["aarch64-apple-darwin"]}}[t];if(!n)throw new Error(`Unsupported OS: ${t}`);let s=n[e];if(!s)throw new Error(`Unsupported architecture: ${t}-${e}`);return s}function Uy(){let t,e,r=Fy(import.meta.url),n=Dy(r);if(typeof __dirname<"u")t=__dirname,e=ot;else{t=n;try{e=ot}catch{e=Ry(r)}}function s(){let i=Ly(),o=t&&t!=="."?t:process.cwd();for(;o.length>1&&!Cs(je(o,"package.json"))&&!Cs(je(o,"Cargo.toml"));){let u=je(o,"..");if(u===o)break;o=u}let a=[];for(let u of i){let d=`roxify_native-${u}.node`,p=`libroxify_native-${u}.node`;a.push(je(t,"..",d),je(t,"..",p),je(o,d),je(o,p),je(o,"node_modules","roxify",d),je(o,"node_modules","roxify",p),je(t,"..","..",d),je(t,"..","..",p))}for(let u of i){for(let d of["release","fastdev"])a.push(je(o,"target",u,d,"libroxify_native.so")),a.push(je(o,"target",u,d,"libroxify_native.dylib")),a.push(je(o,"target",u,d,"roxify_native.dll"));for(let d of["release","fastdev"])a.push(je(o,"target",d,"libroxify_native.so")),a.push(je(o,"target",d,"libroxify_native.dylib")),a.push(je(o,"target",d,"roxify_native.dll")),a.push(je(o,"target",d,"roxify_native.node"))}let c=new Set,l=[];for(let u of a)c.has(u)||(c.add(u),l.push(u));for(let u of l)try{if(!Cs(u))continue;if(u.endsWith(".so")||u.endsWith(".dylib")||u.endsWith(".dll")){let d=u.replace(/\.(so|dylib|dll)$/,".node");try{return Cs(d)||Oy(u,d),d}catch{return u}}return u}catch{}throw new Error(`Native module not found for ${Cm()}-${xm()} (triples: ${i.join(", ")}). Searched ${l.length} paths:
${l.join(`
`)}`)}return e(s())}var le,Ut=M(()=>{le=Uy()});import{readFileSync as By,readdirSync as zy,statSync as Im}from"fs";import{extname as qP,join as Vy,relative as Gy,resolve as Pm,sep as Wy}from"path";function*Em(t){for(let e of t){let r=Pm(e),n=Im(r);if(n.isFile())yield r;else if(n.isDirectory()){let i=zy(r).map(o=>Vy(r,o));yield*Em(i)}}}function so(t,e,r){let n=[];for(let d of Em(t))n.push(d);let s=e?Pm(e):process.cwd(),i=[],o=[],a=0,c=n.map(d=>{let p=Im(d);return a+=p.size,p.size}),l=0;for(let d=0;d<n.length;d++){let p=n[d],f=Gy(s,p).split(Wy).join("/"),m=By(p),h=Buffer.from(f,"utf8"),g=Buffer.alloc(2);g.writeUInt16BE(h.length,0);let y=Buffer.alloc(8);y.writeBigUInt64BE(BigInt(m.length),0),i.push(g,h,y,m),o.push(f),l+=c[d],r&&r(l,a,f)}let u=Buffer.alloc(8);return u.writeUInt32BE(1380931664,0),u.writeUInt32BE(n.length,4),i.unshift(u),{parts:i,list:o}}function $m(t,e,r){let{parts:n,list:s}=so(t,e,r);return{buf:Buffer.concat(n),list:s}}function Is(t,e){if(t.length<8)return null;if(jy(t))return Hy(t,e);let r=t.readUInt32BE(0);if(r===1380931657){let a=t.readUInt32BE(4),c=t.slice(8,8+a),l=JSON.parse(c.toString("utf8")),u=8+a,d=[],p=e?l.filter(f=>e.includes(f.path)):l;for(let f of p){let h=u+f.offset;if(h+2>t.length)continue;let g=t.readUInt16BE(h);if(h+=2,h+=g,h+=8,h+f.size>t.length)continue;let y=t.slice(h,h+f.size);d.push({path:f.path,buf:y})}return{files:d}}if(r!==1380931664)return null;let s=t.slice(0,8).readUInt32BE(4),i=8,o=[];for(let a=0;a<s;a++){if(i+2>t.length)return null;let c=t.readUInt16BE(i);if(i+=2,i+c>t.length)return null;let l=t.slice(i,i+c).toString("utf8");if(i+=c,i+8>t.length)return null;let u=t.readBigUInt64BE(i);if(i+=8,i+Number(u)>t.length)return null;let d=t.slice(i,i+Number(u));i+=Number(u),o.push({path:l,buf:d})}return e?{files:o.filter(c=>e.includes(c.path))}:{files:o}}function jy(t){return t.length<263?!1:t.slice(257,262).toString("ascii")==="ustar"}function Hy(t,e){let r=[],n=0;for(;n+512<=t.length;){let s=t.slice(n,n+512),i=!0;for(let h=0;h<512;h++)if(s[h]!==0){i=!1;break}if(i)break;let a=s.slice(0,100).toString("ascii").replace(/\0+$/,""),c=s.slice(124,136).toString("ascii").replace(/\0+$/,"").trim(),l=parseInt(c,8)||0,u=s[156],d=s.slice(345,500).toString("ascii").replace(/\0+$/,""),f=(d?`${d}/${a}`:a).split("/").filter(h=>h&&h!=="."&&h!=="..").join("/");if(n+=512,u===0||u===48){if(n+l>t.length)break;let h=t.slice(n,n+l);(!e||e.includes(f))&&r.push({path:f,buf:Buffer.from(h)})}let m=Math.ceil(l/512);n+=m*512}return r.length>0?{files:r}:null}var io=M(()=>{});var Jr,Qr,oo,ao=M(()=>{Jr=class extends Error{constructor(e="Passphrase required"){super(e),this.name="PassphraseRequiredError"}},Qr=class extends Error{constructor(e="Incorrect passphrase"){super(e),this.name="IncorrectPassphraseError"}},oo=class extends Error{constructor(e="Data format error"){super(e),this.name="DataFormatError"}}});import{createDecipheriv as qy,pbkdf2Sync as Yy}from"crypto";function Ky(t){let e=Buffer.alloc(t.length*3);for(let r=0;r<t.length;r++)e[r*3]=t[r].r,e[r*3+1]=t[r].g,e[r*3+2]=t[r].b;return e}function Xy(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let r=1;r<t.length;r++)e[r]=t[r]-t[r-1]+256&255;return e}function Zy(t){if(t.length===0)return t;let e=Buffer.alloc(t.length);e[0]=t[0];for(let r=1;r<t.length;r++)e[r]=e[r-1]+t[r]&255;return e}function Jy(t){if(uo&&co)try{return Buffer.from(co(t))}catch(e){console.warn("Native deltaEncode failed, falling back to TS:",e)}return Xy(t)}function Qy(t){if(uo&&lo)try{return Buffer.from(lo(t))}catch(e){console.warn("Native deltaDecode failed, falling back to TS:",e)}return Zy(t)}function Mm(t,e){let r=Buffer.from(e,"utf8"),n=Buffer.alloc(t.length);for(let s=0;s<t.length;s++)n[s]=t[s]^r[s%r.length];return n}function po(t,e){if(!t||t.length===0)return t;let r=t[0];if(r===hr){if(t.length<46)throw new Qr;if(!e)throw new Jr;let s=t.slice(1,17),i=t.slice(17,29),o=t.slice(29,45),a=t.slice(45),l=Yy(e,s,6e5,32,"sha256"),u=qy("aes-256-gcm",l,i);u.setAuthTag(o);try{return Buffer.concat([u.update(a),u.final()])}catch{throw new Qr}}if(r===gr){if(!e)throw new Jr;return Mm(t.slice(1),e)}return r===eo?t.slice(1):t}function eS(){let t=Buffer.alloc(768);for(let e=0;e<256;e++)t[e*3]=e,t[e*3+1]=e*127&255,t[e*3+2]=255-e;return t}function tS(t){let e=t.length,r=e,n=Math.ceil(Math.sqrt(r)),s=Math.ceil(r/n),i=n*2,o=s*2,a=Buffer.alloc(i*o);for(let c=0;c<e;c++){let l=c%n*2,u=Math.floor(c/n)*2,d=t[c];a[u*i+l]=d,a[u*i+l+1]=d,a[(u+1)*i+l]=d,a[(u+1)*i+l+1]=d}return{buffer:a,width:i,height:o}}function rS(t,e,r){let n=e/2,s=r/2,i=n*s,o=Buffer.alloc(i);for(let a=0;a<i;a++){let c=a%n*2,l=Math.floor(a/n)*2;o[a]=t[l*e+c]}return o}var co,lo,uo,fo=M(()=>{In();ao();Ut();co=null,lo=null,uo=!1;try{le?.nativeDeltaEncode&&le?.nativeDeltaDecode&&(co=le.nativeDeltaEncode,lo=le.nativeDeltaDecode,uo=!0)}catch{}});import{readFileSync as nS}from"fs";function sS(t){for(let e=0;e<=t.length-4;e++)if(t[e]===80&&t[e+1]===88&&t[e+2]===76&&t[e+3]===49)return e;return-1}function iS(t){let e=sS(t);if(e<0)throw new Error("PXL1 magic not found in pixels");let r=e+4;if(r>=t.length)throw new Error("Truncated header: missing version");let n=t[r];if(r+=1,r>=t.length)throw new Error("Truncated header: missing name length");let s=t[r];r+=1;let i;if(s>0){if(r+s>t.length)throw new Error("Truncated header: name exceeds buffer");i=t.subarray(r,r+s).toString("utf8"),r+=s}if(n===1){if(r+4>t.length)throw new Error("Truncated header: missing payload length (V1)");let o=t.readUInt32BE(r);if(r+=4,r+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(r,r+o),name:i}}else if(n===2){if(r+8>t.length)throw new Error("Truncated header: missing payload length (V2)");let o=Number(t.readBigUInt64BE(r));if(r+=8,r+o>t.length)throw new Error("Truncated payload data");return{payload:t.subarray(r,r+o),name:i}}else throw new Error(`Unsupported header version: ${n}`)}async function oS(t,e={}){let r;Buffer.isBuffer(t)?r=t:r=nS(t);let n=Buffer.from(le.extractPayloadFromPng(r)),s;try{let c=le.extractNameFromPng?.(r);typeof c=="string"&&c.length>0&&(s=c)}catch{}if(!s)try{let c=le.pngToRgb(r),l=Buffer.from(c.pixels);({name:s}=iS(l))}catch{}if(n.length===0)throw new Error("Empty payload extracted");let i;if(n[0]===3)throw new Error("AES-CTR streaming payload requires the native decoder");i=po(n,e.passphrase);let a;try{a=Buffer.from(le.nativeZstdDecompress(i))}catch{a=i}a.length>=4&&a.subarray(0,4).toString()==="ROX1"&&(a=a.subarray(4));try{let c=Is(a);if(c&&c.files&&c.files.length>0)return{files:c.files,meta:{name:s}}}catch{}return{buf:a,meta:{name:s}}}function aS(t,e,r){if(!Buffer.isBuffer(t)||t.length!==e*r*3)return null;try{let n=!0;for(let S=0;S<t.length;S+=3)if(!(t[S]===255&&t[S+1]===255&&t[S+2]===255)){n=!1;break}if(n)return null;let s=e,i=r,o=-1,a=-1;for(let S=0;S<r;S++)for(let w=0;w<e;w++){let b=(S*e+w)*3;t[b]===255&&t[b+1]===255&&t[b+2]===255||(w<s&&(s=w),S<i&&(i=S),w>o&&(o=w),S>a&&(a=S))}if(o<0)return null;let c=o-s+1,l=a-i+1,u=[];for(let S=0;S<c;S++){let w=[];for(let b=0;b<l;b++){let N=((i+b)*e+(s+S))*3;w.push(t[N],t[N+1],t[N+2])}u.push(w.join(","))}let d=[];for(let S=0;S<u.length;S++)S===0||u[S]!==u[S-1]?d.push({start:S,len:1}):d[d.length-1].len++;let p=[];for(let S=0;S<l;S++){let w=[];for(let b=0;b<c;b++){let N=((i+S)*e+(s+b))*3;w.push(t[N],t[N+1],t[N+2])}p.push(w.join(","))}let f=[];for(let S=0;S<p.length;S++)S===0||p[S]!==p[S-1]?f.push({start:S,len:1}):f[f.length-1].len++;let m=d.length,h=f.length;if(!(d.some(S=>S.len>1)||f.some(S=>S.len>1)))return null;let y=Buffer.alloc(m*h*3);for(let S=0;S<h;S++)for(let w=0;w<m;w++){let b=s+d[w].start,N=i+f[S].start,I=(N*e+b)*3,v=t[I],_=t[I+1],x=t[I+2];for(let D=0;D<f[S].len;D++)for(let T=0;T<d[w].len;T++){let W=((N+D)*e+(b+T))*3;if(t[W]!==v||t[W+1]!==_||t[W+2]!==x)return null}let E=(S*m+w)*3;y[E]=v,y[E+1]=_,y[E+2]=x}return{width:m,height:h,data:y}}catch{return null}}var km=M(()=>{Ut();io();fo()});function Et(t,e){return t===0||e===0?0:gt[yr[t]+yr[e]]}function Ps(t,e){if(e===0)throw new Error("GF(256): division by zero");return t===0?0:gt[(yr[t]+255-yr[e])%255]}function Nm(t,e){return t===0?e===0?1:0:gt[yr[t]*e%255]}function Am(t,e){let r=t[0];for(let n=1;n<t.length;n++)r=Et(r,e)^t[n];return r}function cS(t,e){let r=new Array(t.length+e.length-1).fill(0);for(let n=0;n<e.length;n++)for(let s=0;s<t.length;s++)r[s+n]^=Et(t[s],e[n]);return r}function lS(t){if(mo.has(t))return mo.get(t);let e=[1];for(let r=0;r<t;r++)e=cS(e,[1,gt[r]]);return mo.set(t,e),e}function Tm(t,e){let r=t.length;if(r+e>255)throw new Error(`RS block too large: ${r}+${e} > 255`);let n=lS(e),s=new Array(r+e).fill(0);for(let o=0;o<r;o++)s[o]=t[o];for(let o=0;o<r;o++){let a=s[o];if(a!==0)for(let c=1;c<n.length;c++)s[o+c]^=Et(n[c],a)}let i=new Uint8Array(r+e);i.set(t);for(let o=0;o<e;o++)i[r+o]=s[r+o];return i}function ho(t,e){let r=new Array(e),n=Array.from(t);for(let s=0;s<e;s++)r[s]=Am(n,gt[s]);return r}function uS(t,e){let r=[1],n=[1],s=0,i=1,o=1;for(let a=0;a<e;a++){let c=t[a];for(let l=1;l<=s;l++)l<r.length&&(c^=Et(r[l],t[a-l]));if(c===0)i++;else if(2*s<=a){let l=[...r],u=Ps(c,o),d=new Array(i).fill(0);for(let p=0;p<n.length;p++)d.push(Et(n[p],u));for(;r.length<d.length;)r.push(0);for(let p=0;p<d.length;p++)r[p]^=d[p];s=a+1-s,n=l,o=c,i=1}else{let l=Ps(c,o),u=new Array(i).fill(0);for(let d=0;d<n.length;d++)u.push(Et(n[d],l));for(;r.length<u.length;)r.push(0);for(let d=0;d<u.length;d++)r[d]^=u[d];i++}}return r}function dS(t,e){if(t.length===0)return 0;let r=t[t.length-1];for(let n=t.length-2;n>=0;n--)r=Et(r,e)^t[n];return r}function pS(t,e){let r=[],n=t.length-1;for(let s=0;s<255;s++)if(dS(t,gt[s])===0){let o=(e+s-1)%255;o>=0&&o<e&&r.push(o)}if(r.length!==n)throw new Error(`RS Chien search: found ${r.length} roots but expected ${n}. Data may be too corrupted.`);return r}function fS(t,e){let r=t.length;if(r===0)return[];let n=[];for(let s=0;s<r;s++){let i=new Array(r+1);for(let o=0;o<r;o++)i[o]=Nm(t[o],s);i[r]=e[s],n.push(i)}for(let s=0;s<r;s++){let i=-1;for(let a=s;a<r;a++)if(n[a][s]!==0){i=a;break}if(i===-1)throw new Error("RS: singular Vandermonde matrix");i!==s&&([n[s],n[i]]=[n[i],n[s]]);let o=Ps(1,n[s][s]);for(let a=s;a<=r;a++)n[s][a]=Et(n[s][a],o);for(let a=0;a<r;a++)if(a!==s&&n[a][s]!==0){let c=n[a][s];for(let l=s;l<=r;l++)n[a][l]^=Et(c,n[s][l])}}return n.map(s=>s[r])}function Om(t,e){let r=t.length;if(r>255)throw new Error(`RS block too large: ${r} > 255`);let n=ho(t,e);if(n.every(d=>d===0))return{data:new Uint8Array(t.subarray(0,r-e)),corrected:0};let s=uS(n,e),i=s.length-1;if(i===0)throw new Error("RS: non-zero syndromes but BM found zero errors");let o=pS(s,r),a=o.map(d=>gt[(r-1-d)%255]),c=fS(a,n),l=new Uint8Array(t);for(let d=0;d<o.length;d++)l[o[d]]^=c[d];if(!ho(l,e).every(d=>d===0))throw new Error("RS: correction failed, residual syndromes non-zero");return{data:new Uint8Array(l.subarray(0,r-e)),corrected:i}}function hS(t){return 255-t}function gS(t){if(t.length===0)return new Uint8Array(0);let e=Math.max(...t.map(n=>n.length)),r=[];for(let n=0;n<e;n++)for(let s=0;s<t.length;s++)r.push(n<t[s].length?t[s][n]:0);return new Uint8Array(r)}function yS(t,e,r){let n=[];for(let i=0;i<e;i++)n.push(new Uint8Array(r));let s=0;for(let i=0;i<r;i++)for(let o=0;o<e;o++)s<t.length&&(n[o][i]=t[s++]);return n}function Pn(t,e="medium"){let r=mS[e],n=hS(r),s=Math.ceil(t.length/n),i=[];for(let c=0;c<s;c++){let l=c*n,u=Math.min(l+n,t.length),d=new Uint8Array(n);d.set(t.subarray(l,u)),i.push(Tm(d,r))}let o=gS(i),a=Buffer.alloc(12);return Rm.copy(a,0),a[4]=Dm,a[5]=r,a.writeUInt32BE(t.length,6),a.writeUInt16BE(s,10),Buffer.concat([a,Buffer.from(o)])}function En(t){if(t.length<12)throw new Error("ECC data too short for header");if(!t.subarray(0,4).equals(Rm))throw new Error('Invalid ECC magic (expected "ECC1")');let e=t[4];if(e!==Dm)throw new Error(`Unsupported ECC version: ${e}`);let r=t[5],n=t.readUInt32BE(6),s=t.readUInt16BE(10),i=255,o=t.subarray(12),a=yS(o,s,i),c=0,l=[];for(let d=0;d<s;d++){let{data:p,corrected:f}=Om(a[d],r);c+=f,l.push(Buffer.from(p))}return{data:Buffer.concat(l).subarray(0,n),totalCorrected:c}}var gt,yr,mo,mS,Rm,Dm,Es=M(()=>{gt=new Uint8Array(512),yr=new Uint8Array(256);{let t=1;for(let e=0;e<255;e++)gt[e]=t,yr[t]=e,t=(t<<1^(t&128?29:0))&255;for(let e=255;e<512;e++)gt[e]=gt[e-255]}mo=new Map;mS={low:20,medium:40,quartile:64,high:128},Rm=Buffer.from("ECC1"),Dm=1});async function SS(t,e={}){let r=Array.isArray(t)?Buffer.concat(t):t,n=e.compressionLevel??3,s=e.name||void 0,i=e.includeFileList&&e.fileList?bS(e.fileList):void 0;if(e.passphrase){let o=e.encrypt&&e.encrypt!=="auto"?e.encrypt:"aes",a=le.nativeEncodePngWithEncryptionNameAndFilelist(r,n,e.passphrase,o,s,i);return Buffer.from(a)}else{let o=le.nativeEncodePngWithNameAndFilelist(r,n,s,i);return Buffer.from(o)}}function bS(t){return JSON.stringify(t)}var Fm=M(()=>{Ut()});import*as go from"zlib";function $s(t){return t.length>0&&typeof t[0]=="object"&&(t[0].name||t[0].path)?t.map(e=>({name:e.name??e.path,size:typeof e.size=="number"?e.size:0})).sort((e,r)=>e.name.localeCompare(r.name)):t.sort()}function _S(t){let e=t.find(n=>n.name==="rXFL");if(e)return $s(JSON.parse(Buffer.from(e.data).toString("utf8")));let r=t.find(n=>n.name===vs);if(r){let n=Buffer.from(r.data),s=n.indexOf(Buffer.from("rXFL"));if(s!==-1&&s+8<=n.length){let i=n.readUInt32BE(s+4),o=s+8+i;if(o<=n.length)return $s(JSON.parse(n.slice(s+8,o).toString("utf8")))}}return null}async function vS(t,e={}){try{let r=le.extractPngChunks(t),n=_S(r);if(n)return n;let s=r.find(o=>o.name==="IHDR"),i=r.filter(o=>o.name==="IDAT");if(s&&i.length>0){let c=1+Buffer.from(s.data).readUInt32BE(0)*3,l=await new Promise(u=>{let d=go.createInflate(),p=Buffer.alloc(0),f=!1;d.on("data",m=>{if(f)return;p=Buffer.concat([p,m]);let h=Buffer.alloc(p.length),g=0,y=0;for(;y<p.length;){let N=y%c;if(N===0)y++;else{let I=c-N,v=p.length-y,_=Math.min(I,v);p.copy(h,g,y,y+_),g+=_,y+=_}}let S=h.slice(0,g);if(S.length<12)return;if(!S.slice(8,12).equals(ws)){f=!0,d.destroy(),u(null);return}let w=12;if(S.length<w+2)return;w++;let b=S[w++];if(!(S.length<w+b+4)&&(w+=b,w+=4,!(S.length<w+4)))if(S.slice(w,w+4).toString("utf8")==="rXFL"){if(w+=4,S.length<w+4)return;let N=S.readUInt32BE(w);if(w+=4,S.length<w+N)return;try{f=!0,d.destroy(),u($s(JSON.parse(S.slice(w,w+N).toString("utf8"))))}catch{u(null)}}else f=!0,d.destroy(),u(null)}),d.on("error",()=>{f||u(null)}),d.on("end",()=>{f||u(null)});for(let m of i){if(f)break;d.write(Buffer.from(m.data))}d.end()});if(l)return l}}catch{}try{let r=le.extractFileListFromPixels(t);if(r)return $s(JSON.parse(r))}catch{}return null}async function wS(t){try{if(t.slice(0,Cn.length).equals(Cn)){let i=Cn.length;if(i>=t.length)return!1;let o=t.readUInt8(i);if(i+=1+o,i>=t.length)return!1;let a=t[i];return a===hr||a===gr}let e=le.extractPngChunks(t),r=e.find(i=>i.name===vs);if(r){let i=Buffer.isBuffer(r.data)?r.data:Buffer.from(r.data);if(i.length>=1){let a=1+i.readUInt8(0);if(a<i.length)return i[a]===hr||i[a]===gr}}let n=e.find(i=>i.name==="IHDR"),s=e.filter(i=>i.name==="IDAT");if(n&&s.length>0){let a=1+Buffer.from(n.data).readUInt32BE(0)*3;return await new Promise(c=>{let l=go.createInflate(),u=Buffer.alloc(0),d=!1;l.on("data",p=>{if(d)return;u=Buffer.concat([u,p]);let f=Buffer.alloc(u.length),m=0,h=0;for(;h<u.length;){let b=h%a;if(b===0)h++;else{let N=a-b,I=u.length-h,v=Math.min(N,I);u.copy(f,m,h,h+v),m+=v,h+=v}}let g=f.slice(0,m);if(g.length<12)return;if(!g.slice(8,12).equals(ws)){d=!0,l.destroy(),c(!1);return}let y=12;if(g.length<y+2)return;y++;let S=g[y++];if(g.length<y+S+4||(y+=S,g.length<y+4+1)||(g.readUInt32BE(y),y+=4,g.length<y+1))return;let w=g[y];d=!0,l.destroy(),c(w===hr||w===gr)}),l.on("error",()=>{d||c(!1)}),l.on("end",()=>{d||c(!1)});for(let p of s){if(d)break;l.write(Buffer.from(p.data))}l.end()})}}catch{}return!1}var Lm=M(()=>{In();Ut()});import{spawn as xS,spawnSync as Um}from"child_process";import{existsSync as Ms,readFileSync as ks,unlinkSync as tr,writeFileSync as Ns}from"fs";import{tmpdir as As}from"os";import{join as Ts}from"path";import*as qe from"zlib";async function CS(t,e=!1){if(t.length>52428800||e)return t;let n=(s,i,o=12e4)=>new Promise(a=>{try{let c=xS(s,i,{windowsHide:!0,stdio:"ignore"}),l=!1,u=setTimeout(()=>{l=!0;try{c.kill("SIGTERM")}catch{}},o);c.on("close",d=>{clearTimeout(u),a(l?{error:new Error("timeout")}:{code:d??0})}),c.on("error",d=>{clearTimeout(u),a({error:d})})}catch(c){a({error:c})}});try{let s=Ts(As(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),i=s+".out.png";if(Ns(s,t),!(await n("zopflipng",["-y",`--iterations=${e?15:40}`,"--filters=01234mepb",s,i],12e4)).error&&Ms(i)){let l=ks(i);try{tr(s),tr(i)}catch{}return l.length<t.length?l:t}if(e)return t}catch{}try{let S=function(C,O,U){let Z=C+O-U,J=Math.abs(Z-C),R=Math.abs(Z-O),V=Math.abs(Z-U);return J<=R&&J<=V?C:R<=V?O:U},E=function(C){return C.slice(0,8).toString("hex")===to?C:Buffer.concat([xs,C])},i=ot("../../libroxify_native.node").extractPngChunks(t),o=i.find(C=>C.name==="IHDR");if(!o)return t;let a=Buffer.from(o.data),c=a.readUInt32BE(0),l=a.readUInt32BE(4),u=a[8],d=a[9];if(u!==8||d!==2)return t;let p=i.filter(C=>C.name==="IDAT"),f=Buffer.concat(p.map(C=>Buffer.from(C.data))),m;try{m=qe.inflateSync(f)}catch{return t}let h=3,g=c*h,y=g+1;if(m.length!==y*l)return t;let w=[],b=null;for(let C=0;C<l;C++){let O=C*y+1,U=m.slice(O,O+g),Z=1/0,J=null,R=0;for(let z=0;z<=4;z++){let G=Buffer.alloc(g),F=0;for(let j=0;j<g;j++){let H=U[j],q=0,ie=j-h>=0?U[j-h]:0,ne=b?b[j]:0,xe=b&&j-h>=0?b[j-h]:0;if(z===0)q=H;else if(z===1)q=H-ie+256&255;else if(z===2)q=H-ne+256&255;else if(z===3){let Pe=Math.floor((ie+ne)/2);q=H-Pe+256&255}else{let Pe=S(ie,ne,xe);q=H-Pe+256&255}G[j]=q;let Ge=q>127?q-256:q;F+=Math.abs(Ge)}F<Z&&(Z=F,J=G,R=z)}let V=Buffer.alloc(1+g);V[0]=R,J.copy(V,1),w.push(V),b=U}let N=Buffer.concat(w),I=qe.deflateSync(N,{level:9,memLevel:9,strategy:qe.constants.Z_DEFAULT_STRATEGY}),v=[];for(let C of i)C.name!=="IDAT"&&v.push({name:C.name,data:Buffer.isBuffer(C.data)?C.data:Buffer.from(C.data)});let _=v.findIndex(C=>C.name==="IEND"),x=_>=0?_:v.length;v.splice(x,0,{name:"IDAT",data:I});let D=ot("../../libroxify_native.node"),T=E(Buffer.from(D.encodePngChunks(v))),W=T.length<t.length?T:t,X=[qe.constants.Z_DEFAULT_STRATEGY,qe.constants.Z_FILTERED,qe.constants.Z_RLE,...qe.constants.Z_HUFFMAN_ONLY?[qe.constants.Z_HUFFMAN_ONLY]:[],...qe.constants.Z_FIXED?[qe.constants.Z_FIXED]:[]];for(let C of X)try{let O=qe.deflateSync(m,{level:9,memLevel:9,strategy:C}),U=v.map(V=>({name:V.name,data:V.data})),Z=U.findIndex(V=>V.name==="IDAT");Z!==-1&&(U[Z]={name:"IDAT",data:O});let J=ot("../../libroxify_native.node"),R=E(Buffer.from(J.encodePngChunks(U)));R.length<W.length&&(W=R)}catch{}try{let O=(await Promise.resolve().then(()=>(un(),ka))).deflateSync;try{let U=O(N),Z=v.map(z=>({name:z.name,data:z.data})),J=Z.findIndex(z=>z.name==="IDAT");J!==-1&&(Z[J]={name:"IDAT",data:Buffer.from(U)});let R=ot("../../libroxify_native.node"),V=E(Buffer.from(R.encodePngChunks(Z)));V.length<W.length&&(W=V)}catch{}}catch{}let ee=[15,12,9],P=[9,8];for(let C=0;C<=4;C++)try{let O=[],U=null;for(let J=0;J<l;J++){let R=m.slice(J*y+1,J*y+1+g),V=Buffer.alloc(g);for(let G=0;G<g;G++){let F=R[G],j=G-h>=0?R[G-h]:0,H=U?U[G]:0,q=U&&G-h>=0?U[G-h]:0;C===0?V[G]=F:C===1?V[G]=F-j+256&255:C===2?V[G]=F-H+256&255:C===3?V[G]=F-Math.floor((j+H)/2)+256&255:V[G]=F-S(j,H,q)+256&255}let z=Buffer.alloc(1+g);z[0]=C,V.copy(z,1),O.push(z),U=R}let Z=Buffer.concat(O);for(let J of X)for(let R of ee)for(let V of P)try{let z=qe.deflateSync(Z,{level:9,memLevel:V,strategy:J,windowBits:R}),G=v.map(q=>({name:q.name,data:q.data})),F=G.findIndex(q=>q.name==="IDAT");F!==-1&&(G[F]={name:"IDAT",data:z});let j=ot("../../libroxify_native.node"),H=E(Buffer.from(j.encodePngChunks(G)));H.length<W.length&&(W=H)}catch{}}catch{}try{let C=[1e3,2e3];C.push(5e3,1e4,2e4);for(let O of C)try{let U=Ts(As(),`rox_zop_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),Z=U+".out.png";Ns(U,W);let J=["-y",`--iterations=${O}`,"--filters=01234mepb",U,Z];try{if(!(await n("zopflipng",J,24e4)).error&&Ms(Z)){let V=ks(Z);try{tr(U),tr(Z)}catch{}V.length<W.length&&(W=V)}}catch{}}catch{}}catch{}try{let C=Ts(As(),`rox_adv_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`);if(Ns(C,W),!Um("advdef",["-z4","-i10",C],{windowsHide:!0,stdio:"ignore",timeout:12e4}).error&&Ms(C)){let U=ks(C);try{tr(C)}catch{}U.length<W.length&&(W=U)}}catch{}for(let C of X)try{let O=qe.deflateSync(N,{level:9,memLevel:9,strategy:C}),U=v.map(V=>({name:V.name,data:V.data})),Z=U.findIndex(V=>V.name==="IDAT");Z!==-1&&(U[Z]={name:"IDAT",data:O});let J=ot("../../libroxify_native.node"),R=E(Buffer.from(J.encodePngChunks(U)));R.length<W.length&&(W=R)}catch{}try{let C=Buffer.alloc(c*l*3),O=null;for(let J=0;J<l;J++){let R=m[J*y],V=m.slice(J*y+1,J*y+1+g),z=Buffer.alloc(g);for(let G=0;G<g;G++){let F=G-3>=0?z[G-3]:0,j=O?O[G]:0,H=O&&G-3>=0?O[G-3]:0,q=V[G];R===0||(R===1?q=q+F&255:R===2?q=q+j&255:R===3?q=q+Math.floor((F+j)/2)&255:q=q+S(F,j,H)&255),z[G]=q}z.copy(C,J*g),O=z}let U=new Map,Z=[];for(let J=0;J<C.length;J+=3){let R=`${C[J]},${C[J+1]},${C[J+2]}`;if(!U.has(R)&&(U.set(R,U.size),Z.push(C[J],C[J+1],C[J+2]),U.size>256))break}if(U.size<=256){let J=1+c*1,R=[];for(let F=0;F<l;F++){let j=Buffer.alloc(c);for(let xe=0;xe<c;xe++){let Ge=(F*c+xe)*3,Pe=`${C[Ge]},${C[Ge+1]},${C[Ge+2]}`;j[xe]=U.get(Pe)}let H=0,q=1/0,ie=null;for(let xe=0;xe<=4;xe++){let Ge=Buffer.alloc(c),Pe=0;for(let De=0;De<c;De++){let St=j[De],Je=0,Fe=De-1>=0?j[De-1]:0,pe=F>0?R[F-1][De]:0,$e=F>0&&De-1>=0?R[F-1][De-1]:0;xe===0?Je=St:xe===1?Je=St-Fe+256&255:xe===2?Je=St-pe+256&255:xe===3?Je=St-Math.floor((Fe+pe)/2)+256&255:Je=St-S(Fe,pe,$e)+256&255,Ge[De]=Je;let Qe=Je>127?Je-256:Je;Pe+=Math.abs(Qe)}Pe<q&&(q=Pe,H=xe,ie=Ge)}let ne=Buffer.alloc(J);ne[0]=H,ie.copy(ne,1),R.push(ne)}let V=new Map;for(let F=0;F<C.length;F+=3){let j=`${C[F]},${C[F+1]},${C[F+2]}`;V.set(j,(V.get(j)||0)+1)}let z=[];z.push({paletteArr:Z.slice(),map:new Map(U)});let G=Array.from(V.entries()).sort((F,j)=>j[1]-F[1]);if(G.length>0){let F=[],j=new Map,H=0;for(let[q]of G){let ie=q.split(",").map(ne=>Number(ne));if(F.push(ie[0],ie[1],ie[2]),j.set(q,H++),H>=256)break}j.size<=256&&z.push({paletteArr:F,map:j})}for(let F of z){let ie=function(Fe,pe){if(pe===8)return Fe;let $e=c*pe,Qe=Math.ceil($e/8),st=Buffer.alloc(Qe),kt=0;for(let tt=0;tt<c;tt++){let wr=Fe[tt]&(1<<pe)-1;for(let Nt=0;Nt<pe;Nt++){let Ce=wr>>pe-1-Nt&1,it=Math.floor(kt/8),sr=7-kt%8;st[it]|=Ce<<sr,kt++}}return st},j=F.map.size,H=j<=2?1:j<=4?2:j<=16?4:8,q=[];for(let Fe=0;Fe<l;Fe++){let pe=Buffer.alloc(c);for(let $e=0;$e<c;$e++){let Qe=(Fe*c+$e)*3,st=`${C[Qe]},${C[Qe+1]},${C[Qe+2]}`;pe[$e]=F.map.get(st)}q.push(pe)}let ne=[];for(let Fe=0;Fe<l;Fe++){let pe=ie(q[Fe],H),$e=0,Qe=1/0,st=null;for(let tt=0;tt<=4;tt++){let wr=Buffer.alloc(pe.length),Nt=0;for(let Ce=0;Ce<pe.length;Ce++){let it=pe[Ce],sr=Ce-1>=0?pe[Ce-1]:0,en=Fe>0?ne[Fe-1][Ce]:0,Ys=Fe>0&&Ce-1>=0?ne[Fe-1][Ce-1]:0,ft=0;tt===0?ft=it:tt===1?ft=it-sr+256&255:tt===2?ft=it-en+256&255:tt===3?ft=it-Math.floor((sr+en)/2)+256&255:ft=it-S(sr,en,Ys)+256&255,wr[Ce]=ft;let Rh=ft>127?ft-256:ft;Nt+=Math.abs(Rh)}Nt<Qe&&(Qe=Nt,$e=tt,st=wr)}let kt=Buffer.alloc(1+pe.length);kt[0]=$e,st.copy(kt,1),ne.push(kt)}let xe=Buffer.concat(ne),Ge=Buffer.from(F.paletteArr),Pe=[],De=Buffer.alloc(13);De.writeUInt32BE(c,0),De.writeUInt32BE(l,4),De[8]=H,De[9]=3,De[10]=0,De[11]=0,De[12]=0,Pe.push({name:"IHDR",data:De}),Pe.push({name:"PLTE",data:Ge}),Pe.push({name:"IDAT",data:qe.deflateSync(xe,{level:9})}),Pe.push({name:"IEND",data:Buffer.alloc(0)});let St=ot("../../libroxify_native.node"),Je=E(Buffer.from(St.encodePngChunks(Pe)));Je.length<W.length&&(W=Je)}}}catch{}let A=[{cmd:"oxipng",args:["-o","6","--strip","all"]},{cmd:"optipng",args:["-o7"]},{cmd:"pngcrush",args:["-brute","-reduce"]},{cmd:"pngout",args:[]}];for(let C of A)try{let O=Ts(As(),`rox_ext_in_${Date.now()}_${Math.random().toString(36).slice(2)}.png`),U=O+".out.png";Ns(O,W);let Z=C.args.concat([O,U]);if(!Um(C.cmd,Z,{windowsHide:!0,stdio:"ignore",timeout:24e4}).error&&Ms(U)){let R=ks(U);try{tr(O),tr(U)}catch{}R.length<W.length&&(W=R)}else try{tr(O)}catch{}}catch{}return W}catch{return t}}var Bm=M(()=>{In()});import{writeFileSync as yo}from"fs";import{join as So}from"path";async function IS(t,e){let r=Buffer.from(le.cropAndReconstitute(t));if(e){try{let n=le.sharpMetadata(t),s=le.sharpResizeImage(t,n.width*2,n.height*2,"nearest");console.log("DEBUG: writing doubled.png to",e),yo(So(e,"doubled.png"),Buffer.from(s))}catch(n){console.log("DEBUG: failed to write doubled.png",n?.message??n)}try{console.log("DEBUG: writing reconstructed.png and reconstructed-pixels.bin to",e),yo(So(e,"reconstructed.png"),r);let n=le.sharpToRaw(r);yo(So(e,"reconstructed-pixels.bin"),Buffer.from(n.pixels))}catch(n){console.log("DEBUG: failed to write reconstructed artifacts",n?.message??n)}}return r}var zm=M(()=>{Ut()});function MS(t,e){let r=rr*_o*(bo/8),n=_o*(bo/8),s=0;t.write("RIFF",s,"ascii"),s+=4,t.writeUInt32LE(Mn-8+e,s),s+=4,t.write("WAVE",s,"ascii"),s+=4,t.write("fmt ",s,"ascii"),s+=4,t.writeUInt32LE(16,s),s+=4,t.writeUInt16LE(1,s),s+=2,t.writeUInt16LE(_o,s),s+=2,t.writeUInt32LE(rr,s),s+=4,t.writeUInt32LE(r,s),s+=4,t.writeUInt16LE(n,s),s+=2,t.writeUInt16LE(bo,s),s+=2,t.write("data",s,"ascii"),s+=4,t.writeUInt32LE(e,s)}function TS(t,e,r){let n=t.length,s=Math.round(e*n/r),i=2*Math.PI*s/n,o=2*Math.cos(i),a=0,c=0;for(let u=0;u<n;u++){let d=t[u]+o*a-c;c=a,a=d}return(a*a+c*c-o*a*c)/(n*n)}function OS(t){let e=new Float64Array(Bt);for(let r=0;r<8;r++)if(t&1<<r){let n=kS[r];for(let s=0;s<yt;s++)e[s]+=n[s]}return e}function Vm(t){let e=t.subarray(0,yt),r=yt,n=r*r,s=0;for(let i=0;i<8;i++){let{coeff:o}=AS[i],a=0,c=0;for(let u=0;u<r;u++){let d=e[u]+o*a-c;c=a,a=d}(a*a+c*c-o*a*c)/n>Wm&&(s|=1<<i)}return s}function RS(){let t=new Float64Array(Sr);for(let e=0;e<$n.length;e++){let r=NS[e],n=e*zt;t.set(r,n)}return t}function DS(t){let e=Math.floor(zt/4),r=Math.min(t.length-Sr,rr*2);for(let n=0;n<r;n+=e){let s=!0;for(let i=0;i<$n.length;i++){let o=n+i*zt,a=t.subarray(o,o+zt);if(a.length<zt){s=!1;break}if(TS(a,$n[i],rr)<Wm*.5){s=!1;break}}if(s)return n+Sr}return-1}function FS(t,e={}){let r=e.eccLevel??"medium",n=Pn(t,r),s=n.length,i=Buffer.alloc(4);i.writeUInt32BE(s,0);let o=Buffer.concat([i,n]),a=RS(),c=o.length,l=Math.floor(rr*$S/1e3),d=(Sr+c*Bt+l)*2,p=Buffer.alloc(Mn+d);MS(p,d);let f=Mn;for(let m=0;m<Sr;m++){let h=Math.max(-1,Math.min(1,a[m]));p.writeInt16LE(Math.round(h*32767),f),f+=2}for(let m=0;m<c;m++){let h=OS(o[m]);for(let g=0;g<Bt;g++){let y=Math.max(-1,Math.min(1,h[g]));p.writeInt16LE(Math.round(y*32767),f),f+=2}}return p}function LS(t){if(t.length<Mn)throw new Error("WAV too short");if(t.toString("ascii",0,4)!=="RIFF")throw new Error("Not a RIFF file");if(t.toString("ascii",8,12)!=="WAVE")throw new Error("Not a WAVE file");let e=12,r=0,n=0,s=16;for(;e+8<=t.length;){let g=t.toString("ascii",e,e+4),y=t.readUInt32LE(e+4);if(g==="fmt ")s=t.readUInt16LE(e+22);else if(g==="data"){r=e+8,n=y;break}e+=8+y,y%2!==0&&e++}if(r===0)throw new Error("No data chunk in WAV");let i=s/8,o=Math.floor(n/i),a=new Float64Array(o);for(let g=0;g<o;g++){let y=r+g*i;if(s===16)a[g]=t.readInt16LE(y)/32768;else if(s===8)a[g]=(t[y]-128)/128;else throw new Error(`Unsupported bits per sample: ${s}`)}let c=DS(a);c<0&&(c=Sr);let l=c,u=[];for(let g=0;g<4;g++){if(l+Bt>a.length)throw new Error("Audio too short: cannot read length prefix");let y=a.subarray(l,l+Bt);u.push(Vm(y)),l+=Bt}let d=u[0]<<24|u[1]<<16|u[2]<<8|u[3];if(d<=0||d>1e7)throw new Error(`Invalid payload length: ${d}`);let p=[];for(let g=0;g<d&&!(l+Bt>a.length);g++){let y=a.subarray(l,l+Bt);p.push(Vm(y)),l+=Bt}if(p.length===0)throw new Error("No data symbols detected in audio");let f=Buffer.from(p),{data:m,totalCorrected:h}=En(f);return{data:m,correctedErrors:h}}function US(t){if(t.length<Mn+Sr*2||t.toString("ascii",0,4)!=="RIFF"||t.toString("ascii",8,12)!=="WAVE")return!1;let e=12;for(;e+8<=t.length;){let r=t.toString("ascii",e,e+4),n=t.readUInt32LE(e+4);if(r==="fmt ")return t.readUInt16LE(e+22)===16;e+=8+n,n%2!==0&&e++}return!1}var rr,bo,_o,Gm,yt,PS,Bt,ES,$n,zt,Sr,Wm,$S,Mn,jm,kS,NS,AS,Hm=M(()=>{Es();rr=44100,bo=16,_o=1,Gm=[600,900,1200,1500,1800,2100,2400,2700],yt=2048,PS=512,Bt=yt+PS,ES=.35,$n=[3200,2400,1600,800],zt=1024,Sr=$n.length*zt,Wm=5e-4,$S=200,Mn=44;jm=new Float64Array(yt);{let t=2*Math.PI/(yt-1);for(let e=0;e<yt;e++)jm[e]=.5*(1-Math.cos(t*e))}kS=Gm.map(t=>{let e=new Float64Array(yt),r=2*Math.PI*t/rr;for(let n=0;n<yt;n++)e[n]=ES*jm[n]*Math.sin(r*n);return e}),NS=$n.map(t=>{let e=new Float64Array(zt),r=2*Math.PI*t/rr,n=2*Math.PI/(zt-1);for(let s=0;s<zt;s++){let i=.5*(1-Math.cos(n*s));e[s]=.3*i*Math.sin(r*s)}return e}),AS=Gm.map(t=>{let e=Math.round(t*yt/rr),r=2*Math.PI*e/yt;return{k:e,coeff:2*Math.cos(r)}})});function Qm(){let t=[];for(let e=0;e<et;e++){let r=[];for(let n=0;n<et;n++){let s=e===0||e===6||n===0||n===6,i=e>=2&&e<=4&&n>=2&&n<=4;r.push(s||i)}t.push(r)}return t}function qm(t){let e=et+Zm,r=Math.ceil(Math.sqrt(t+4*e*e));r=Math.max(r,e*2+4);let n=r,s=r,i=new Uint8Array(n*s);for(let a=0;a<e;a++)for(let c=0;c<e;c++)i[a*n+c]=1;for(let a=0;a<e;a++)for(let c=n-e;c<n;c++)i[a*n+c]=1;for(let a=s-e;a<s;a++)for(let c=0;c<e;c++)i[a*n+c]=1;for(let a=s-e;a<s;a++)for(let c=n-e;c<n;c++)i[a*n+c]=1;let o=[];for(let a=0;a<s;a++){let c=a*n;for(let l=0;l<n;l++)i[c+l]||o.push([l,a])}return{gridW:n,gridH:s,dataPositions:o}}function BS(t,e,r,n){let s=e*n,i=r*n,o=Buffer.alloc(s*i*3),a=s*3;for(let c=0;c<r;c++){let l=t[c],u=c*n*a;for(let p=0;p<e;p++){let f=l[p],m=u+p*n*3;for(let h=0;h<n;h++){let g=m+h*3;o[g]=f,o[g+1]=f,o[g+2]=f}}let d=u;for(let p=1;p<n;p++)o.copy(o,u+p*a,d,d+a)}return{rgb:o,width:s,height:i}}function Os(t,e,r){let n=Qm();for(let s=0;s<et;s++)for(let i=0;i<et;i++)t[r+s][e+i]=n[s][i]?0:255}function zS(t,e,r,n,s,i){let o=[];for(let a=0;a<i;a++){let c=new Uint8Array(s);for(let l=0;l<s;l++){let u=0,d=0;for(let p=0;p<n;p++)for(let f=0;f<n;f++){let m=a*n+p,h=l*n+f;if(m<r&&h<e){let g=(m*e+h)*3;u+=(t[g]+t[g+1]+t[g+2])/3,d++}}c[l]=d>0&&u/d>128?255:0}o.push(c)}return o}function eh(t,e,r){for(let n=2;n<=8;n++){let s=Math.floor(e/n),i=Math.floor(r/n);if(s<et*2+4||i<et*2+4)continue;let o=Qm(),a=0,c=0;for(let l=0;l<et;l++)for(let u=0;u<et;u++){let d=o[l][u]?0:255,p=l*n+Math.floor(n/2),f=u*n+Math.floor(n/2);if(p>=r||f>=e)continue;let m=(p*e+f)*3,g=(t[m]+t[m+1]+t[m+2])/3>128?255:0;c++,g===d&&a++}if(c>0&&a/c>=.8)return{blockSize:n,gridW:s,gridH:i}}return null}function Ym(t,e,r,n,s){let i=Buffer.alloc(14);return Jm.copy(i,0),i[4]=t,i[5]=e,i.writeUInt32BE(r,6),i.writeUInt16BE(n,10),i.writeUInt16BE(s,12),new Uint8Array(i)}function VS(t){if(t.length<14)return null;let e=Buffer.from(t);return e.subarray(0,4).equals(Jm)?{blockSize:e[4],eccLevel:e[5],dataLen:e.readUInt32BE(6),gridW:e.readUInt16BE(10),gridH:e.readUInt16BE(12)}:null}function Km(t){let e=new Uint8Array(t.length*8);for(let r=0;r<t.length;r++)for(let n=7;n>=0;n--)e[r*8+(7-n)]=t[r]>>n&1;return e}function GS(t){let e=Math.ceil(t.length/8),r=new Uint8Array(e);for(let n=0;n<e;n++){let s=0;for(let i=0;i<8;i++){let o=n*8+i;o<t.length&&t[o]&&(s|=1<<7-i)}r[n]=s}return r}function WS(t,e={}){let r=e.blockSize??4,n=e.eccLevel??"medium";if(r<2||r>8)throw new Error(`Block size must be 2\u20138, got ${r}`);let s=Pn(t,n),i=Ym(r,Xm[n],t.length,0,0),o=Buffer.concat([Buffer.from(i),s]),a=Km(new Uint8Array(o)),c=qm(a.length),l=Ym(r,Xm[n],t.length,c.gridW,c.gridH),u=Buffer.concat([Buffer.from(l),s]),d=Km(new Uint8Array(u)),p=qm(d.length);if(p.dataPositions.length<d.length)throw new Error(`Data too large for image: need ${d.length} blocks, have ${p.dataPositions.length}`);let{gridW:f,gridH:m,dataPositions:h}=p,g=[];for(let b=0;b<m;b++)g.push(new Uint8Array(f).fill(255));Os(g,0,0),Os(g,f-et,0),Os(g,0,m-et),Os(g,f-et,m-et);for(let b=0;b<d.length&&b<h.length;b++){let[N,I]=h[b];g[I][N]=d[b]?0:255}let{rgb:y,width:S,height:w}=BS(g,f,m,r);return le?.rgbToPng?Buffer.from(le.rgbToPng(y,S,w)):qS(y,S,w)}function jS(t){let e,r,n;if(le?.sharpMetadata&&le?.sharpToRaw){let S=le.sharpMetadata(t);e=S.width,r=S.height;let w=le.sharpToRaw(t);n=Buffer.from(w.pixels)}else throw new Error("Robust image decoding requires the native module (sharpMetadata + sharpToRaw)");let s=eh(n,e,r);if(!s)throw new Error("Could not detect finder patterns \u2014 image may be too corrupted");let{blockSize:i,gridW:o,gridH:a}=s,c=zS(n,e,r,i,o,a),l=et+Zm,u=new Uint8Array(o*a);for(let S=0;S<l;S++)for(let w=0;w<l;w++)u[S*o+w]=1;for(let S=0;S<l;S++)for(let w=o-l;w<o;w++)u[S*o+w]=1;for(let S=a-l;S<a;S++)for(let w=0;w<l;w++)u[S*o+w]=1;for(let S=a-l;S<a;S++)for(let w=o-l;w<o;w++)u[S*o+w]=1;let d=[];for(let S=0;S<a;S++){let w=S*o;for(let b=0;b<o;b++)u[w+b]||d.push([b,S])}let p=new Uint8Array(d.length);for(let S=0;S<d.length;S++){let[w,b]=d[S];b<c.length&&w<c[b].length&&(p[S]=c[b][w]===0?1:0)}let f=GS(p),m=VS(f);if(!m)throw new Error("Invalid robust image header \u2014 data may be corrupted");let h=Buffer.from(f.subarray(14)),{data:g,totalCorrected:y}=En(h);return{data:g.subarray(0,m.dataLen),correctedErrors:y}}function HS(t){try{if(!le?.sharpMetadata||!le?.sharpToRaw)return!1;let e=le.sharpMetadata(t),r=le.sharpToRaw(t),n=Buffer.from(r.pixels);return eh(n,e.width,e.height)!==null}catch{return!1}}function qS(t,e,r){let n=ot("zlib"),s=e*3,i=Buffer.alloc(r*(1+s));for(let u=0;u<r;u++)i[u*(1+s)]=0,t.copy(i,u*(1+s)+1,u*s,(u+1)*s);let o=n.deflateSync(i,{level:0}),a=Buffer.from([137,80,78,71,13,10,26,10]),c=Buffer.alloc(13);c.writeUInt32BE(e,0),c.writeUInt32BE(r,4),c[8]=8,c[9]=2,c[10]=0,c[11]=0,c[12]=0;function l(u,d){let p=Buffer.from(u,"ascii"),f=Buffer.alloc(4);f.writeUInt32BE(d.length,0);let m=Buffer.concat([p,d]),{crc32:h}=(no(),Bh(wm)),g=h(d,h(p)),y=Buffer.alloc(4);return y.writeUInt32BE(g>>>0,0),Buffer.concat([f,m,y])}return Buffer.concat([a,l("IHDR",c),l("IDAT",o),l("IEND",Buffer.alloc(0))])}var et,Zm,Jm,Xm,th=M(()=>{Es();Ut();et=7,Zm=1,Jm=Buffer.from("RBI1");Xm={low:0,medium:1,quartile:2,high:3}});import{execSync as rh,spawn as YS}from"child_process";import{accessSync as KS,constants as XS,existsSync as ZS}from"fs";import{dirname as sh,join as Re}from"path";import{fileURLToPath as JS}from"url";import{chmodSync as QS,mkdtempSync as e1,readFileSync as t1,unlinkSync as r1,writeFileSync as n1}from"fs";import{tmpdir as s1}from"os";function Vt(t){if(!ZS(t))return!1;if(process.platform==="win32")return!0;try{return KS(t,XS.X_OK),!0}catch{return!1}}function vo(){let t={win32:["roxify_native.exe","roxify-cli.exe","roxify_cli.exe"],darwin:["rox-macos-universal","roxify_native-macos-arm64","roxify_native-macos-x64","roxify_native","roxify-cli","roxify_cli"],linux:["roxify_native","roxify-cli","roxify_cli"]},e=t[process.platform]||t.linux,r=Rs;for(let s of e){let i=Re(r,s);if(Vt(i))return i;let o=Re(r,"..",s);if(Vt(o))return o;let a=Re(r,"..","dist",s);if(Vt(a))return a}if(process.pkg){let s=[Re(r,"..","..","target","release"),Re(r,"..","target","release"),Re(r,"target","release")];for(let i of s)for(let o of e){let a=Re(i,o);if(Vt(a))return a}try{let i=ot("path").dirname(process.execPath||"");if(i){let o=[Re(i,"tools","roxify","dist"),Re(i,"tools","roxify"),Re(i,"..","tools","roxify","dist"),Re(i,"..","tools","roxify")];for(let a of o)for(let c of e){let l=Re(a,c);if(Vt(l))return l}}}catch{}}try{let s=[];if(process.platform==="win32")try{let i=rh("where rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=i.split(/\r?\n/).map(o=>o.trim()).filter(Boolean))}catch{}else try{let i=rh("which rox",{encoding:"utf-8",timeout:5e3}).trim();i&&(s=[i.trim()])}catch{}for(let i of s)try{let o=sh(i),a=[o,Re(o,"dist"),Re(o,"..","dist"),Re(o,".."),Re(o,"node_modules","roxify","dist")];for(let c of a)for(let l of e){let u=Re(c,l);if(Vt(u))return u}}catch{}}catch{}for(let s of e){let i=Re(r,"..","..",s);if(Vt(i))return i;let o=Re(r,"..","..","..","..",s);if(Vt(o))return o}let n=Re(r,"..","..","target","release");for(let s of e){let i=Re(n,s);if(Vt(i))return i}return null}function ih(){return vo()!==null}function nh(t){let e=t1(t),r=e1(Re(s1(),"roxify-")),n=Re(r,t.replace(/.*[\\/]/,""));n1(n,e);try{QS(n,493)}catch{}return n}function Ds(t,e){let r=vo();if(!r)throw new Error("Rust CLI binary not found");return new Promise((n,s)=>{let i=!1,o,a="",c=32,l=[],u=p=>{l.push(p),l.length>c&&l.shift()},d=p=>{let f,m=e?.collectStdout?["pipe","pipe","pipe"]:["pipe","inherit","pipe"];try{f=YS(p,t,{stdio:m})}catch(h){if(!i){i=!0;try{o=nh(r)}catch(g){return s(g)}return d(o)}return s(h)}if(e?.collectStdout&&f.stdout&&f.stdout.on("data",h=>{a+=h.toString()}),f.stderr){let h=!!e?.onProgress,g="";f.stderr.on("data",y=>{g+=y.toString();let S=g.split(`
`);g=S.pop()||"";for(let w of S){let b=h?w.match(/^PROGRESS:(\d+):(\d+):(.+)$/):null;b?e.onProgress(Number(b[1]),Number(b[2]),b[3]):w.trim()&&(u(w),process.stderr.write(w+`
`))}})}f.on("error",h=>{if(!i){i=!0;try{o=nh(r)}catch(g){return s(g)}return d(o)}s(h)}),f.on("close",(h,g)=>{if(o)try{r1(o)}catch{}if(h===0||h===null&&g===null)n(a);else{let y=l.length>0?`
  stderr tail:
    ${l.join(`
    `)}`:"";s(new Error(`Rust CLI exited with status ${h??g}${y}`))}})};d(r)})}async function oh(t,e,r=3,n,s="aes",i,o,a){if(!vo())throw new Error("Rust CLI binary not found");let l=["encode","--level",String(r)];i&&l.push("--name",i),n&&(l.push("--passphrase",n),l.push("--encrypt",s)),typeof o=="number"&&Number.isFinite(o)&&l.push("--ram-budget-mb",String(Math.max(1,Math.floor(o)))),l.push(t,e),await Ds(l,{onProgress:a})}async function ah(t,e,r,n,s,i,o){let a=["decompress",t,e];r&&a.push("--passphrase",r),n&&n.length>0&&a.push("--files",JSON.stringify(n)),s&&a.push("--dict",s),typeof i=="number"&&Number.isFinite(i)&&a.push("--ram-budget-mb",String(Math.max(1,Math.floor(i)))),await Ds(a,{onProgress:o})}async function ch(t){return Ds(["list",t],{collectStdout:!0})}async function lh(t){return Ds(["havepassphrase",t],{collectStdout:!0})}var Rs,uh=M(()=>{if(typeof __dirname<"u")Rs=__dirname;else try{Rs=sh(JS(import.meta.url))}catch{Rs=process.cwd()}});var dh=M(()=>{});async function i1(t,e=19,r,n){let s=[],i=0;for await(let l of t){if(!_r&&!$t)throw new Error("Native zstd compression not available");let u=Buffer.from($t&&n?$t(l,e,n):_r(l,e));s.push(u),i++,r&&r(i,0)}let o=Buffer.alloc(s.length*4),a=8+o.length;for(let l=0;l<s.length;l++)o.writeUInt32BE(s[l].length,l*4),a+=s[l].length;let c=Buffer.alloc(8);return c.writeUInt32BE(1515410500,0),c.writeUInt32BE(s.length,4),{chunks:[c,o,...s],totalLength:a}}async function o1(t,e=19,r,n){let i=null;if(Array.isArray(t)?t.reduce((p,f)=>p+f.length,0)<=33554432&&(i=Buffer.concat(t)):i=t,i&&i.length<=33554432){if(r&&r(0,1),!_r&&!$t)throw new Error("Native zstd compression not available");let d=Buffer.from($t&&n?$t(i,e,n):_r(i,e));return r&&r(1,1),[d]}let o=[];if(Array.isArray(t))for(let d of t)if(d.length<=33554432)o.push(d);else for(let p=0;p<d.length;p+=33554432)o.push(d.subarray(p,Math.min(p+33554432,d.length)));else for(let d=0;d<t.length;d+=33554432)o.push(t.subarray(d,Math.min(d+33554432,t.length)));let a=o.length,c=[];if(!_r&&!$t)throw new Error("Native zstd compression not available");for(let d=0;d<a;d++){let p=Buffer.from($t&&n?$t(o[d],e,n):_r(o[d],e));c.push(p),r&&r(d+1,a)}let l=Buffer.alloc(c.length*4);for(let d=0;d<c.length;d++)l.writeUInt32BE(c[d].length,d*4);let u=Buffer.alloc(8);return u.writeUInt32BE(1515410500,0),u.writeUInt32BE(c.length,4),[u,l,...c]}async function ph(t,e){if(t.length<8){if(e?.({phase:"decompress_start",total:1}),!br)throw new Error("Native zstd decompression not available");let a=Buffer.from(br(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}if(t.readUInt32BE(0)!==1515410500){if(process.env.ROX_DEBUG&&console.log("tryZstdDecompress: invalid magic"),e?.({phase:"decompress_start",total:1}),!br)throw new Error("Native zstd decompression not available");let a=Buffer.from(br(t));return e?.({phase:"decompress_progress",loaded:1,total:1}),e?.({phase:"decompress_done",loaded:1,total:1}),a}let n=t.readUInt32BE(4),s=[],i=8;for(let a=0;a<n;a++)s.push(t.readUInt32BE(i)),i+=4;e?.({phase:"decompress_start",total:n});let o=[];for(let a=0;a<n;a++){let c=s[a],l=t.subarray(i,i+c);if(i+=c,!br)throw new Error("Native zstd decompression not available");let u=Buffer.from(br(l));o.push(u),e?.({phase:"decompress_progress",loaded:a+1,total:n})}return e?.({phase:"decompress_done",loaded:n,total:n}),Buffer.concat(o)}async function a1(t,e){return await ph(t,e)}var _r,$t,br,fh=M(()=>{Ut();_r=null,$t=null,br=null;try{le?.nativeZstdCompress&&(_r=le.nativeZstdCompress),le?.nativeZstdCompressWithDict&&($t=le.nativeZstdCompressWithDict),le?.nativeZstdDecompress&&(br=le.nativeZstdDecompress)}catch{}});var wo={};On(wo,{CHUNK_TYPE:()=>vs,COMPRESSION_MARKERS:()=>Ay,DataFormatError:()=>oo,ENC_AES:()=>hr,ENC_NONE:()=>eo,ENC_XOR:()=>gr,FILTER_ZERO:()=>My,FORMAT_MARKERS:()=>Ty,GF_EXP:()=>gt,GF_LOG:()=>yr,IncorrectPassphraseError:()=>Qr,MAGIC:()=>Cn,MARKER_COLORS:()=>ro,MARKER_END:()=>Ny,MARKER_START:()=>ky,PIXEL_MAGIC:()=>ws,PIXEL_MAGIC_BLOCK:()=>$y,PNG_HEADER:()=>xs,PNG_HEADER_HEX:()=>to,PassphraseRequiredError:()=>Jr,adler32:()=>vm,applyXor:()=>Mm,calcSyndromes:()=>ho,colorsToBytes:()=>Ky,compressStream:()=>i1,crc32:()=>_m,cropAndReconstitute:()=>IS,decodeBlocksToData:()=>rS,decodePngToBinary:()=>oS,decodeRobustAudio:()=>LS,decodeRobustImage:()=>jS,decodeWithRustCLI:()=>ah,deltaDecode:()=>Qy,deltaEncode:()=>Jy,eccDecode:()=>En,eccEncode:()=>Pn,encodeBinaryToPng:()=>SS,encodeDataToBlocks2x2:()=>tS,encodeRobustAudio:()=>FS,encodeRobustImage:()=>WS,encodeWithRustCLI:()=>oh,generatePalette256:()=>eS,gfDiv:()=>Ps,gfMul:()=>Et,gfPow:()=>Nm,hasPassphraseInPng:()=>wS,havepassphraseWithRustCLI:()=>lh,isRobustAudioWav:()=>US,isRobustImage:()=>HS,isRustBinaryAvailable:()=>ih,listFilesInPng:()=>vS,listWithRustCLI:()=>ch,native:()=>le,optimizePngBuffer:()=>CS,packPaths:()=>$m,packPathsToParts:()=>so,parallelZstdCompress:()=>o1,parallelZstdDecompress:()=>ph,polyEval:()=>Am,rsDecode:()=>Om,rsEncode:()=>Tm,tryDecryptIfNeeded:()=>po,tryZstdDecompress:()=>a1,unpackBuffer:()=>Is,unstretchImage:()=>aS});var xo=M(()=>{In();no();km();Es();Fm();ao();fo();Lm();Ut();Bm();zm();Hm();th();uh();dh();fh();io()});Lr();Ye();import*as Oh from"node:path";import{basename as F1}from"node:path";import{stdin as we,stdout as ve}from"node:process";import{createInterface as L1}from"node:readline";function fy(t){let e="",r=0;for(;r<t.length;)if(t[r]==="\x1B"&&t[r+1]==="["){for(r+=2;r<t.length&&(t.charAt(r)<"@"||t.charAt(r)>"~");)r++;r++}else e+=t[r],r++;return e}var ue={cup:(t,e)=>`\x1B[${t};${e}H`,el:()=>"\x1B[K",ed:()=>"\x1B[2J",home:()=>"\x1B[H",cursorHide:()=>"\x1B[?25l",cursorShow:()=>"\x1B[?25h",bold:t=>`\x1B[1m${t}\x1B[0m`,reverse:t=>`\x1B[7m${t}\x1B[0m`,color:(t,e)=>`\x1B[${t}m${e}\x1B[0m`},qr=class t{_lines;_cursorRow=0;_cursorCol=0;_scrollTop=0;_modified=!1;_filename;_mode="normal";_inputBuffer="";_searchState=null;_clipboard=[];_undoStack=[];_redoStack=[];_markActive=!1;_stream;_terminalSize;_onExit;_onSave;constructor(e){this._stream=e.stream,this._terminalSize=e.terminalSize,this._filename=e.filename,this._onExit=e.onExit,this._onSave=e.onSave,this._lines=e.content.split(`
`),this._lines.length>1&&this._lines.at(-1)===""&&this._lines.pop(),this._lines.length===0&&(this._lines=[""])}start(){this.fullRedraw()}resize(e){this._terminalSize=e,this.fullRedraw()}handleInput(e){let r=e.toString("utf8");for(let n=0;n<r.length;){let s=this._consumeSequence(r,n);n+=s}}_consumeSequence(e,r){let n=e.charAt(r);if(n==="\x1B"){if(e[r+1]==="["){let s=r+2;for(;s<e.length&&(e.charAt(s)<"@"||e.charAt(s)>"~");)s++;let i=e.slice(r,s+1);return this._handleEscape(i),s-r+1}if(e[r+1]==="O"){let s=e.slice(r,r+3);return this._handleEscape(s),3}return r+1<e.length?(this._handleAlt(e.charAt(r+1)),2):1}return this._handleChar(n),1}_handleEscape(e){switch(e){case"\x1B[A":case"\x1BOA":this._dispatch("up");break;case"\x1B[B":case"\x1BOB":this._dispatch("down");break;case"\x1B[C":case"\x1BOC":this._dispatch("right");break;case"\x1B[D":case"\x1BOD":this._dispatch("left");break;case"\x1B[H":case"\x1B[1~":this._dispatch("home");break;case"\x1B[F":case"\x1B[4~":this._dispatch("end");break;case"\x1B[5~":this._dispatch("pageup");break;case"\x1B[6~":this._dispatch("pagedown");break;case"\x1B[3~":this._dispatch("delete");break;case"\x1B[1;5C":this._dispatch("ctrl-right");break;case"\x1B[1;5D":this._dispatch("ctrl-left");break;case"\x1B[1;5A":this._dispatch("ctrl-up");break;case"\x1B[1;5B":this._dispatch("ctrl-down");break;default:break}}_handleAlt(e){let r=e.toLowerCase();if(r==="u"){this._doUndo();return}if(r==="e"){this._doRedo();return}if(r==="g"){this._enterGotoLine();return}if(r==="r"){this._doSearchReplace();return}if(r==="a"){this._toggleMark();return}r==="^"&&this._doUndo()}_handleChar(e){let r=e.charCodeAt(0);if(this._mode!=="normal"){this._handlePromptChar(e);return}if(r<32||r===127){this._handleControl(r);return}this._doInsertChar(e)}_handleControl(e){switch(e){case 1:this._dispatch("home");break;case 5:this._dispatch("end");break;case 16:this._dispatch("up");break;case 14:this._dispatch("down");break;case 2:this._dispatch("left");break;case 6:this._dispatch("right");break;case 8:case 127:this._doBackspace();break;case 13:this._doEnter();break;case 11:this._doCutLine();break;case 21:this._doUncut();break;case 9:this._doInsertChar("	");break;case 15:this._enterWriteout();break;case 19:this._doSave();break;case 24:this._doExit();break;case 18:this._doSearch();break;case 23:this._enterSearch();break;case 12:this._doSearchNext();break;case 3:this._showCursorPos();break;case 7:this._enterHelp();break;case 26:this._doUndo();break;case 31:this._enterGotoLine();break;default:break}}_dispatch(e){if(this._mode==="normal")switch(e){case"up":this._moveCursor(-1);break;case"down":this._moveCursor(1);break;case"left":this._moveCursorLeft();break;case"right":this._moveCursorRight();break;case"home":this._moveCursorHome();break;case"end":this._moveCursorEnd();break;case"pageup":this._movePage(-1);break;case"pagedown":this._movePage(1);break;case"delete":this._doDelete();break;case"ctrl-right":this._moveWordRight();break;case"ctrl-left":this._moveWordLeft();break;case"ctrl-up":this._moveCursor(-1);break;case"ctrl-down":this._moveCursor(1);break;default:break}}_handlePromptChar(e){let r=e.charCodeAt(0);if(this._mode==="help"){this._mode="normal",this.fullRedraw();return}if(this._mode==="exit-confirm"){let n=e.toLowerCase();if(n==="y"){this._mode="exit-filename",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`);return}if(n==="n"){this._onExit("aborted",this._getCurrentContent());return}if(r===3||r===7||n==="c"){this._mode="normal",this.fullRedraw();return}return}if(this._mode==="exit-filename"||this._mode==="writeout"){if(r===13){let s=this._inputBuffer.trim();s&&(this._filename=s);let i=this._getCurrentContent();this._modified=!1,this._mode==="exit-filename"?this._onExit("saved",i):(this._mode="normal",this._renderStatusLine(`Wrote ${this._lines.length} lines`),this._onExit("saved",i));return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):r>=32&&(this._inputBuffer+=e);let n=(this._mode==="writeout","File Name to Write");this._renderStatusBar(`${n}: ${this._inputBuffer}`);return}if(this._mode==="search"){if(r===13){let n=this._inputBuffer.trim();n&&(this._searchState={query:n,caseSensitive:!1,row:this._cursorRow,col:this._cursorCol+1}),this._mode="normal",this._searchState?this._doSearchNext():this.fullRedraw();return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):r>=32&&(this._inputBuffer+=e),this._renderStatusBar(`Search: ${this._inputBuffer}`);return}if(this._mode==="goto-line"){if(r===13){let n=Number.parseInt(this._inputBuffer.trim(),10);!Number.isNaN(n)&&n>0&&(this._cursorRow=Math.min(n-1,this._lines.length-1),this._cursorCol=0,this._clampScroll()),this._mode="normal",this.fullRedraw();return}if(r===7||r===3){this._mode="normal",this.fullRedraw();return}r===127||r===8?this._inputBuffer=this._inputBuffer.slice(0,-1):e>="0"&&e<="9"&&(this._inputBuffer+=e),this._renderStatusBar(`Enter line number: ${this._inputBuffer}`);return}this._mode==="search-confirm"&&(this._mode="normal",this.fullRedraw())}_moveCursor(e){this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length);let r=this._scrollTop;this._clampScroll(),this._scrollTop===r?this._renderCursor():this._renderEditArea()}_moveCursorLeft(){this._cursorCol>0?this._cursorCol--:this._cursorRow>0&&(this._cursorRow--,this._cursorCol=this._currentLine().length);let e=this._scrollTop;this._clampScroll(),this._scrollTop===e?this._renderCursor():this._renderEditArea()}_moveCursorRight(){let e=this._currentLine();this._cursorCol<e.length?this._cursorCol++:this._cursorRow<this._lines.length-1&&(this._cursorRow++,this._cursorCol=0);let r=this._scrollTop;this._clampScroll(),this._scrollTop===r?this._renderCursor():this._renderEditArea()}_moveCursorHome(){this._cursorCol=0,this._renderCursor()}_moveCursorEnd(){this._cursorCol=this._currentLine().length,this._renderCursor()}_movePage(e){let r=this._editAreaRows();this._cursorRow=Math.max(0,Math.min(this._lines.length-1,this._cursorRow+e*r)),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._clampScroll(),this._renderEditArea()}_moveWordRight(){let e=this._currentLine(),r=this._cursorCol;for(;r<e.length&&/\w/.test(e.charAt(r));)r++;for(;r<e.length&&!/\w/.test(e.charAt(r));)r++;this._cursorCol=r,this._renderCursor()}_moveWordLeft(){let e=this._currentLine(),r=this._cursorCol;for(r>0&&r--;r>0&&!/\w/.test(e.charAt(r));)r--;for(;r>0&&/\w/.test(e.charAt(r-1));)r--;this._cursorCol=r,this._renderCursor()}_pushUndo(){this._undoStack.push({lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol}),this._undoStack.length>200&&this._undoStack.shift(),this._redoStack=[]}_doInsertChar(e){this._pushUndo();let r=this._currentLine();this._lines[this._cursorRow]=r.slice(0,this._cursorCol)+e+r.slice(this._cursorCol),this._cursorCol++,this._modified=!0,this._renderLine(this._cursorRow),this._renderCursor(),this._renderTitleBar()}_doEnter(){this._pushUndo();let e=this._currentLine(),r=e.slice(0,this._cursorCol),n=e.slice(this._cursorCol);this._lines[this._cursorRow]=r,this._lines.splice(this._cursorRow+1,0,n),this._cursorRow++,this._cursorCol=0,this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}_doBackspace(){if(!(this._cursorCol===0&&this._cursorRow===0)){if(this._pushUndo(),this._cursorCol>0){let e=this._currentLine();this._lines[this._cursorRow]=e.slice(0,this._cursorCol-1)+e.slice(this._cursorCol),this._cursorCol--}else{let e=this._lines[this._cursorRow-1],r=this._currentLine();this._cursorCol=e.length,this._lines[this._cursorRow-1]=e+r,this._lines.splice(this._cursorRow,1),this._cursorRow--}this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doDelete(){let e=this._currentLine();if(!(this._cursorCol===e.length&&this._cursorRow===this._lines.length-1)){if(this._pushUndo(),this._cursorCol<e.length)this._lines[this._cursorRow]=e.slice(0,this._cursorCol)+e.slice(this._cursorCol+1);else{let r=this._lines[this._cursorRow+1]??"";this._lines[this._cursorRow]=e+r,this._lines.splice(this._cursorRow+1,1)}this._modified=!0,this._renderEditArea(),this._renderCursor(),this._renderTitleBar()}}_doCutLine(){if(this._pushUndo(),this._lines.length===1&&this._lines[0]==="")return;let e=this._lines.splice(this._cursorRow,1)[0]??"";this._clipboard.push(e),this._lines.length===0&&(this._lines=[""]),this._cursorRow=Math.min(this._cursorRow,this._lines.length-1),this._cursorCol=Math.min(this._cursorCol,this._currentLine().length),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Cut 1 line")}_doUncut(){if(this._clipboard.length===0)return;this._pushUndo();let e=[...this._clipboard];this._clipboard=[],this._lines.splice(this._cursorRow,0,...e),this._cursorRow=Math.min(this._cursorRow+e.length-1,this._lines.length-1),this._modified=!0,this._clampScroll(),this._renderEditArea(),this._renderCursor(),this._renderTitleBar(),this._renderStatusLine("Uncut 1 line")}_doUndo(){if(this._undoStack.length===0){this._renderStatusLine("Nothing to undo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._redoStack.push(e);let r=this._undoStack.pop();r!==void 0&&(this._lines=r.lines,this._cursorRow=r.cursorRow,this._cursorCol=r.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_doRedo(){if(this._redoStack.length===0){this._renderStatusLine("Nothing to redo");return}let e={lines:[...this._lines],cursorRow:this._cursorRow,cursorCol:this._cursorCol};this._undoStack.push(e);let r=this._redoStack.pop();r!==void 0&&(this._lines=r.lines,this._cursorRow=r.cursorRow,this._cursorCol=r.cursorCol,this._modified=!0,this._clampScroll(),this.fullRedraw())}_enterSearch(){this._mode="search",this._inputBuffer=this._searchState?.query??"",this._renderStatusBar(`Search: ${this._inputBuffer}`)}_doSearch(){this._doSearchNext()}_doSearchNext(){if(!this._searchState){this._enterSearch();return}let{query:e,caseSensitive:r}=this._searchState,n=r?e:e.toLowerCase(),s=this._searchState.row,i=this._searchState.col;for(let o=0;o<2;o++){for(let a=s;a<this._lines.length;a++){let l=(r?this._lines[a]:this._lines[a].toLowerCase()).indexOf(n,a===s?i:0);if(l!==-1){this._cursorRow=a,this._cursorCol=l,this._searchState.row=a,this._searchState.col=l+1,this._clampScroll(),this.fullRedraw(),this._renderStatusLine(`Searching for: ${e}`);return}}s=0,i=0}this._mode="search-confirm",this._renderStatusLine(`"${e}" not found`)}_doSearchReplace(){this._enterSearch()}_toggleMark(){this._markActive=!this._markActive,this._markActive?this._renderStatusLine("Mark Set"):this._renderStatusLine("Mark Unset")}_doExit(){if(this._modified){this._mode="exit-confirm",this._renderStatusBar('Save modified buffer? (Answering "No" will DISCARD changes.) Y N');return}this._onExit("aborted",this._getCurrentContent())}_doSave(){let e=this._getCurrentContent();this._onSave?(this._modified=!1,this._onSave(e),this._renderStatusLine(`Saved: ${this._filename}`),this._renderTitleBar()):this._enterWriteout()}_enterWriteout(){this._mode="writeout",this._inputBuffer=this._filename,this._renderStatusBar(`File Name to Write: ${this._inputBuffer}`)}_showCursorPos(){let e=this._cursorRow+1,r=this._cursorCol+1,n=this._lines.length,s=Math.round(e/n*100);this._renderStatusLine(`line ${e}/${n} (${s}%), col ${r}`)}_enterGotoLine(){this._mode="goto-line",this._inputBuffer="",this._renderStatusBar("Enter line number: ")}_enterHelp(){this._mode="help",this._renderHelp()}get cols(){return Math.max(1,this._terminalSize.cols)}get rows(){return Math.max(4,this._terminalSize.rows)}_editAreaRows(){return this.rows-3}_editAreaStart(){return 2}_currentLine(){return this._lines[this._cursorRow]??""}_clampScroll(){let e=this._editAreaRows();this._cursorRow<this._scrollTop?this._scrollTop=this._cursorRow:this._cursorRow>=this._scrollTop+e&&(this._scrollTop=this._cursorRow-e+1),this._scrollTop=Math.max(0,this._scrollTop)}_getCurrentContent(){return`${this._lines.join(`
`)}
`}static _pad(e,r){return e.length>=r?e.slice(0,r):e+" ".repeat(r-e.length)}fullRedraw(){let e=[];e.push(ue.cursorHide()),e.push(ue.ed()),e.push(ue.home()),this._buildTitleBar(e),this._buildEditArea(e),this._buildHelpBar(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderTitleBar(){let e=[];e.push(ue.cursorHide()),e.push(ue.cup(1,1)),this._buildTitleBar(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderEditArea(){let e=[];e.push(ue.cursorHide()),this._buildEditArea(e),e.push(ue.cursorShow()),e.push(this._buildCursorPosition()),this._stream.write(e.join(""))}_renderLine(e){let r=e-this._scrollTop+this._editAreaStart();if(r<this._editAreaStart()||r>=this._editAreaStart()+this._editAreaRows())return;let n=[];n.push(ue.cursorHide()),n.push(ue.cup(r,1)),n.push(ue.el());let s=this._lines[e]??"";n.push(this._renderLineText(s)),n.push(ue.cursorShow()),n.push(this._buildCursorPosition()),this._stream.write(n.join(""))}_renderCursor(){this._stream.write(this._buildCursorPosition())}_renderStatusLine(e){let r=[];r.push(ue.cursorHide()),r.push(ue.cup(this.rows-1,1)),r.push(ue.el()),r.push(ue.reverse(t._pad(e,this.cols))),r.push(ue.cursorShow()),r.push(this._buildCursorPosition()),this._stream.write(r.join(""))}_renderStatusBar(e){let r=[];r.push(ue.cursorHide()),r.push(ue.cup(this.rows,1)),r.push(ue.el()),r.push(e.slice(0,this.cols)),r.push(ue.cursorShow()),r.push(ue.cup(this.rows,Math.min(e.length+1,this.cols))),this._stream.write(r.join(""))}_buildTitleBar(e){let r=this._modified?"Modified":"",n=` GNU nano  ${this._filename||"New Buffer"}`,s=r,i=t._pad(n+" ".repeat(Math.max(0,Math.floor((this.cols-n.length-s.length)/2))),this.cols-s.length),o=t._pad(i+s,this.cols);e.push(ue.cup(1,1)),e.push(ue.reverse(o))}_buildEditArea(e){let r=this._editAreaRows();for(let n=0;n<r;n++){let s=this._scrollTop+n,i=this._editAreaStart()+n;e.push(ue.cup(i,1)),e.push(ue.el()),s<this._lines.length&&e.push(this._renderLineText(this._lines[s]))}}_renderLineText(e){let r="",n=0;for(let s=0;s<e.length&&n<this.cols;s++)if(e[s]==="	"){let i=8-n%8,o=Math.min(i,this.cols-n);r+=" ".repeat(o),n+=o}else r+=e[s],n++;return r}_buildHelpBar(e){let r=[["^G","Help"],["^X","Exit"],["^O","WriteOut"],["^R","ReadFile"],["^W","Where Is"],["^\\","Replace"]],n=[["^K","Cut"],["^U","UnCut"],["^T","Execute"],["^J","Justify"],["^C","Cur Pos"],["^/","Go To Line"]];e.push(ue.cup(this.rows-1,1)),e.push(ue.el()),e.push(this._buildShortcutRow(r)),e.push(ue.cup(this.rows,1)),e.push(ue.el()),e.push(this._buildShortcutRow(n))}_buildShortcutRow(e){let r=Math.floor(this.cols/(e.length/2)),n="";for(let s=0;s<e.length;s+=2){let i=e[s][0]?.padEnd(3)??"",o=e[s][1]??"",a=(e[s+1]?.[0]??"").padEnd(3),c=e[s+1]?.[1]??"",l=`${ue.reverse(i)} ${o.padEnd(r-5)}${ue.reverse(a)} ${c.padEnd(r-5)}`;if(n+=l,fy(n).length>=this.cols)break}return n}_buildCursorPosition(){let e=this._currentLine(),r=0;for(let s=0;s<this._cursorCol&&s<e.length;s++)e[s]==="	"?r+=8-r%8:r++;let n=this._cursorRow-this._scrollTop+this._editAreaStart();return ue.cup(n,r+1)}_renderHelp(){let e=[];e.push(ue.cursorHide()),e.push(ue.ed()),e.push(ue.cup(1,1)),e.push(ue.reverse(t._pad(" GNU nano \u2014 Help",this.cols)));let r=["","^G  This help text","^X  Exit nano (prompts if modified)","^O  Write file (WriteOut)","^W  Search forward (Where Is)","^K  Cut current line","^U  Uncut / Paste","^C  Show cursor position","^_  Go to line number","Alt+U  Undo","Alt+E  Redo","Alt+A  Toggle mark","","Arrows / PgUp / PgDn / Home / End: navigation","","Press any key to return..."];for(let n=0;n<r.length&&n+2<=this.rows-2;n++)e.push(ue.cup(n+2,1)),e.push(r[n].slice(0,this.cols));e.push(ue.cursorShow()),this._stream.write(e.join(""))}};var Vi=(t,e)=>`\x1B[${t};${e}H`,rm="\x1B[?25l",my="\x1B[?25h",Gi="\x1B[2J\x1B[H";var me={blue:"\x1B[1;34m",yellow:"\x1B[1;33m",red:"\x1B[1;31m",pink:"\x1B[1;35m",cyan:"\x1B[1;36m",orange:"\x1B[33m",white:"\x1B[1;37m",dim:"\x1B[2;37m",blink:"\x1B[5m",r:"\x1B[0m"},ji=["   \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557      \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u2551 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2551   ","\u2554\u2550\u2550\u255D \u2502\u2502 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2502\u2502 \u255A\u2550\u2550\u2557","\u2551.  o\u2502\u2502.  .\u2502\u2502.  .  .  .\u2502\u2502.  .\u2502\u2502o  .\u2551","\u2551 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2518\u2514\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2518 \u2551","\u2551.  .  .  .  .  .  .  .  .  .  .  .\u2551","\u2559\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u250C\u2510 \u250C\u2500\u2500\u255C","\u2553\u2500\u2500\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2500\u2500\u2556","\u2551   .\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502.   \u2551","\u2551 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u255A","  \u2502\u2502.  .  .\u2502\u2502          \u2502\u2502.  .  .\u2502\u2502  ","\u2550\u2550\u255B\u2556 \u250C\u2510 \u250C\u2500\u2500\u2518\u2502 \u2554\u2550\u2550  \u2550\u2550\u2557 \u2502\u2514\u2500\u2500\u2510 \u250C\u2510 \u2553\u2558\u2550\u2550","   \u2551 \u2502\u2502 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2502\u2502 \u2551   ","   \u2551.\u2502\u2502.  .   \u2551      \u2551   .  .\u2502\u2502.\u2551   ","   \u2551 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551      \u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2551   ","\u2554\u2550\u2550\u255D \u2514\u2518 \u2514\u2500\u2500\u2510\u2502 \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u255D \u2502\u250C\u2500\u2500\u2518 \u2514\u2518 \u255A\u2550\u2550\u2557","\u2551.  .  .  .\u2502\u2502          \u2502\u2502.  .  .  .\u2551","\u2551 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u250C\u2510 \u2551","\u255D \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2500\u2500\u2510\u250C\u2500\u2500\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u255A"," .\u2502\u2502.  .\u2502\u2502.  .  .\u2502\u2502.  .  .\u2502\u2502.  .\u2502\u2502. ","\u2557 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u250C\u2510 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2554","\u2551 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2551","\u2551.  .  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .\u2502\u2502.\u2502\u2502.\u2502\u2502.  .  .\u2551","\u2551 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2510 \u2502\u2502 \u2502\u2502 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2551","\u2551 \u2514\u2500\u2500\u2510\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u2502 \u2514\u2518 \u2514\u2518 \u2514\u2518 \u2502\u250C\u2500\u2500\u2518 \u2551","\u2551.  o\u2502\u2502.  .  .  .\u2502\u2502.  .  .  .\u2502\u2502o  .\u2551","\u255A\u2550\u2550\u2557 \u2502\u2502 \u250C\u2500\u2500\u2500\u2510 \u2554\u2550\u2550\u255B\u2558\u2550\u2550\u2557 \u250C\u2500\u2500\u2500\u2510 \u2502\u2502 \u2554\u2550\u2550\u255D","   \u2551 \u2514\u2518 \u2514\u2500\u2500\u2500\u2518 \u2551      \u2551 \u2514\u2500\u2500\u2500\u2518 \u2514\u2518 \u2551   ","   \u2551.  .  .  .\u2551      \u2551.  .  .  .\u2551   ","   \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D      \u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D   "],vn=ji.length,Te=36,Hi=new Set(["\u2554","\u2557","\u255A","\u255D","\u2550","\u2551","\u2559","\u255C","\u2553","\u2556","\u255B","\u2558","\u2552","\u2555","\u250C","\u2510","\u2514","\u2518","\u2500","\u2502","\u255E","\u2561","\u253C","\u2261","\u255F","\u2562"]);function hy(t){let e=[];for(let r=0;r<t.length;r++){let n=[],s=t[r];for(let i=0;i<Te;i++){let o=s[i]??" ";Hi.has(o)?n.push("wall"):o==="."?n.push("dot"):o==="o"?n.push("pellet"):n.push("empty")}e.push(n)}for(let r=15;r<=17;r++){let n=e[r];if(n)for(let s=15;s<=20;s++)n[s]==="empty"&&(n[s]="ghost-house")}return e}var Zt=[0,1,0,-1],mr=[1,0,-1,0],nm=[2,3,0,1],gy=[0,1,2,3],yy=[3,2,1,0];function Wi(t){return nm[t]}var Yr=class{_stream;_onExit;_grid;_visualGrid;_gridRow(e){let r=this._grid[e];if(r===void 0)throw new Error(`PacmanGame: row ${e} out of range`);return r}_ghost(e){let r=this._ghosts[e];if(r===void 0)throw new Error(`PacmanGame: ghost ${e} not found`);return r}_pacR=22;_pacC=16;_pacDir=2;_pacNextDir=2;_pacMouthOpen=!0;_pacAlive=!0;_ghosts=[];_score=0;_lives=3;_level=1;_dotsTotal=0;_dotsEaten=0;_frightDuration=40;_gameOver=!1;_won=!1;_msgTicks=0;_msg="";_globalMode="scatter";_globalModeTick=0;_modeSchedule=[56,160,56,160,40,Number.MAX_SAFE_INTEGER];_modeIdx=0;_tick=0;_intervalId=null;_inputKey=null;_escBuf="";_deathTick=0;_deathAnimating=!1;_prevLines=[];constructor(e){this._stream=e.stream,this._onExit=e.onExit,this._grid=hy(ji),this._visualGrid=ji.map(r=>Array.from(r)),this._countDots(),this._initGhosts()}_countDots(){this._dotsTotal=0;for(let e of this._grid)for(let r of e)(r==="dot"||r==="pellet")&&this._dotsTotal++}_initGhosts(){this._ghosts=[{name:"Blinky",color:me.red,r:14,c:17,dir:2,mode:"scatter",frightTicks:0,scatterR:0,scatterC:35,inHouse:!1,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Pinky",color:me.pink,r:16,c:17,dir:3,mode:"scatter",frightTicks:0,scatterR:0,scatterC:0,inHouse:!0,dotThreshold:0,movePeriod:1,movePhase:0},{name:"Inky",color:me.cyan,r:16,c:15,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:35,inHouse:!0,dotThreshold:30,movePeriod:1,movePhase:1},{name:"Clyde",color:me.orange,r:16,c:19,dir:3,mode:"scatter",frightTicks:0,scatterR:32,scatterC:0,inHouse:!0,dotThreshold:60,movePeriod:1,movePhase:2}]}start(){this._stream.write(rm+Gi),this._prevLines=[],this._renderFull(),this._intervalId=setInterval(()=>this._gameTick(),125)}stop(){this._intervalId&&(clearInterval(this._intervalId),this._intervalId=null),this._stream.write(my+Gi+me.r)}handleInput(e){let r=this._escBuf+e.toString("utf8");this._escBuf="";let n=0;for(;n<r.length;){let s=r[n];if(s==="q"||s==="Q"||s===""){this.stop(),this._onExit();return}if(s==="\x1B"){if(n+2>=r.length){this._escBuf=r.slice(n);break}if(r[n+1]==="["){let i=r[n+2];i==="A"?this._inputKey=3:i==="B"?this._inputKey=1:i==="C"?this._inputKey=0:i==="D"&&(this._inputKey=2),n+=3;continue}n++;continue}s==="w"||s==="W"?this._inputKey=3:s==="s"||s==="S"?this._inputKey=1:s==="a"||s==="A"?this._inputKey=2:(s==="d"||s==="D")&&(this._inputKey=0),n++}}_gameTick(){if(this._gameOver||this._won){this._msgTicks++,this._msgTicks>32?(this.stop(),this._onExit()):this._renderDiff();return}if(this._deathAnimating){this._deathTick++,this._deathTick>16&&(this._deathAnimating=!1,this._deathTick=0,this._lives<=0?(this._gameOver=!0,this._msg="GAME  OVER",this._msgTicks=0):this._respawn()),this._renderDiff();return}if(this._tick++,this._inputKey!==null&&(this._pacNextDir=this._inputKey,this._inputKey=null),this._globalMode!=="fright"&&(this._globalModeTick++,this._globalModeTick>=this._modeSchedule[this._modeIdx])){this._globalModeTick=0,this._modeIdx=Math.min(this._modeIdx+1,this._modeSchedule.length-1),this._globalMode=this._modeIdx%2===0?"scatter":"chase";for(let s of this._ghosts)!s.inHouse&&s.mode!=="fright"&&s.mode!=="eaten"&&(s.mode=this._globalMode,s.dir=Wi(s.dir))}let e=this._ghosts.map(s=>({r:s.r,c:s.c})),r=this._pacR,n=this._pacC;this._movePacman(),this._pacMouthOpen=!this._pacMouthOpen;for(let s of this._ghosts)this._moveGhost(s);this._checkCollisions(e,r,n),this._renderDiff()}_isWalkable(e,r,n=!1){if(e<0||e>=vn)return!1;let s=(r%Te+Te)%Te,i=this._grid[e]?.[s];return i==="wall"||!n&&i==="ghost-house"?!1:i!==void 0}_movePacman(){let e=this._pacR+Zt[this._pacNextDir],r=((this._pacC+mr[this._pacNextDir])%Te+Te)%Te;this._isWalkable(e,r)&&(this._pacDir=this._pacNextDir);let n=this._pacR+Zt[this._pacDir],s=((this._pacC+mr[this._pacDir])%Te+Te)%Te;this._isWalkable(n,s)&&(this._pacR=n,this._pacC=s);let i=this._grid[this._pacR]?.[this._pacC];i==="dot"?(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=10,this._dotsEaten++):i==="pellet"&&(this._gridRow(this._pacR)[this._pacC]="empty",this._score+=50,this._dotsEaten++,this._activateFright()),this._dotsEaten>=this._dotsTotal&&(this._won=!0,this._msg=" YOU  WIN!",this._msgTicks=0)}_activateFright(){for(let e of this._ghosts)e.mode!=="eaten"&&(e.mode="fright",e.frightTicks=this._frightDuration,e.movePeriod=2,e.inHouse||(e.dir=Wi(e.dir)))}_ghostTarget(e){if(e.mode==="scatter")return[e.scatterR,e.scatterC];switch(e.name){case"Blinky":return[this._pacR,this._pacC];case"Pinky":{let r=this._pacR+Zt[this._pacDir]*4,n=this._pacC+mr[this._pacDir]*4;return this._pacDir===3&&(n=this._pacC-4),[r,n]}case"Inky":{let r=this._ghost(0),n=this._pacR+Zt[this._pacDir]*2,s=this._pacC+mr[this._pacDir]*2;return this._pacDir===3&&(s=this._pacC-2),[n*2-r.r,s*2-r.c]}case"Clyde":{let r=e.r-this._pacR,n=e.c-this._pacC;return r*r+n*n>64?[this._pacR,this._pacC]:[e.scatterR,e.scatterC]}default:return[this._pacR,this._pacC]}}_moveGhost(e){if(e.movePhase=(e.movePhase+1)%e.movePeriod,e.movePhase!==0)return;if(e.inHouse){if(this._dotsEaten<e.dotThreshold){let l=e.r+Zt[e.dir];l<15||l>17?e.dir=Wi(e.dir):e.r=l;return}let a=14,c=17;if(e.r===a&&e.c===c){e.inHouse=!1,e.mode=this._globalMode,e.dir=2;return}e.c!==c?e.c+=e.c<c?1:-1:e.r>a&&e.r--;return}if(e.mode==="eaten"){if(e.r===14&&e.c===17){e.inHouse=!0,e.r=16,e.c=17,e.mode=this._globalMode,e.movePeriod=1,e.dir=3;return}e.c!==17?e.c+=e.c<17?1:-1:e.r!==14&&(e.r+=e.r<14?1:-1);return}let n=[...gy].filter(a=>a!==nm[e.dir]).filter(a=>{let c=e.r+Zt[a],l=((e.c+mr[a])%Te+Te)%Te;return this._isWalkable(c,l,!0)}),s=e.dir;if(e.mode==="fright")n.length>0&&(s=n[Math.floor(Math.random()*n.length)]??s);else{let[a,c]=this._ghostTarget(e),l=Number.MAX_SAFE_INTEGER;for(let u of yy){if(!n.includes(u))continue;let d=e.r+Zt[u],p=((e.c+mr[u])%Te+Te)%Te,f=d-a,m=p-c,h=f*f+m*m;h<l&&(l=h,s=u)}}e.dir=s;let i=e.r+Zt[e.dir],o=((e.c+mr[e.dir])%Te+Te)%Te;this._isWalkable(i,o,!0)&&(e.r=i,e.c=o)}_checkCollisions(e,r,n){for(let s=0;s<this._ghosts.length;s++){let i=this._ghost(s);if(i.inHouse||i.mode==="eaten")continue;let o=i.r===this._pacR&&i.c===this._pacC,a=e[s];if(a===void 0)continue;let c=a.r===this._pacR&&a.c===this._pacC&&i.r===r&&i.c===n;if(o||c)if(i.mode==="fright")i.mode="eaten",this._score+=200;else{this._lives--,this._deathAnimating=!0,this._deathTick=0,this._pacAlive=!1,this._tickFrightCountdowns();return}}this._tickFrightCountdowns()}_tickFrightCountdowns(){for(let e of this._ghosts)e.mode==="fright"&&(e.frightTicks--,e.frightTicks<=0&&(e.mode=this._globalMode,e.movePeriod=1))}_respawn(){this._pacR=22,this._pacC=16,this._pacDir=2,this._pacNextDir=2,this._pacAlive=!0,this._pacMouthOpen=!0,this._initGhosts()}_buildLines(){let e=[],r=String(this._score).padStart(6," "),n=String(Math.max(this._score,24780)).padStart(6," ");e.push(`${me.white}  1UP   HIGH SCORE${me.r}`),e.push(`  ${me.yellow}${r}${me.r}   ${me.white}${n}${me.r}`);let s=this._visualGrid.map(o=>[...o]);for(let o=0;o<vn;o++){let a=s[o];for(let c=0;c<Te;c++){let l=this._grid[o]?.[c],u=a[c]??" ";Hi.has(u)||(l==="dot"?a[c]="\xB7":l==="pellet"?a[c]="\u25A0":a[c]=" ")}}for(let o of this._ghosts){if(o.r<0||o.r>=vn||o.c<0||o.c>=Te)continue;let a;if(o.mode==="eaten")a=`${me.white}\xF6${me.r}`;else if(o.mode==="fright")a=o.frightTicks<12&&this._tick%2===0?`${me.white}\u15E3${me.r}`:`${me.blue}\u15E3${me.r}`;else{let c=this._tick%2===0?"\u15E3":"\u15E1";a=`${o.color}${c}${me.r}`}s[o.r][o.c]=a}if(this._pacAlive||this._deathAnimating){let o;if(this._deathAnimating){let a=["\u15E7","\u25D1","\u25D0","\u25D2","\u25D3","\u25CF","\u25CB"," "];o=`${me.yellow}${a[Math.min(this._deathTick>>1,a.length-1)]}${me.r}`}else{let a=["\u15E7","\u15E6","\u15E4","\u15E3"][this._pacDir]??"\u15E7";o=`${me.yellow}${this._pacMouthOpen?a:"\u25EF"}${me.r}`}this._pacR>=0&&this._pacR<vn&&this._pacC>=0&&this._pacC<Te&&(s[this._pacR][this._pacC]=o)}for(let o=0;o<vn;o++){let a="";for(let c=0;c<Te;c++){let l=s[o][c];l.includes("\x1B")?a+=l:Hi.has(l)?a+=`${me.blue}${l}${me.r}`:l==="\xB7"?a+=`${me.dim}\xB7${me.r}`:l==="\u25A0"?a+=`${me.white}\u25A0${me.r}`:a+=l}e.push(a)}let i=`${me.yellow}\u15E7${me.r} `.repeat(Math.max(0,this._lives));return e.push("",`  ${i}  LEVEL ${me.yellow}${this._level}${me.r}`),e.push(`  ${me.dim}WASD/arrows  Q=quit${me.r}`),this._msg&&(e[18]=`        ${me.yellow}${me.blink}${this._msg}${me.r}`),e}_renderFull(){let e=this._buildLines(),r=rm+Gi;for(let n=0;n<e.length;n++)r+=Vi(n+1,1)+(e[n]??"")+"\x1B[K";this._stream.write(r),this._prevLines=e}_renderDiff(){let e=this._buildLines(),r="";for(let n=0;n<e.length;n++){let s=e[n]??"";s!==this._prevLines[n]&&(r+=Vi(n+1,1)+s+"\x1B[K")}for(let n=e.length;n<this._prevLines.length;n++)r+=Vi(n+1,1)+"\x1B[K";r&&this._stream.write(r),this._prevLines=e}};zi();function hs(t,e,r){let n=[`Linux ${t} ${e.kernel} ${e.arch}`,"","The programs included with the Fortune GNU/Linux system are free software;","the exact distribution terms for each program are described in the","individual files in /usr/share/doc/*/copyright.","","Fortune GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent","permitted by applicable law."];if(r){let s=new Date(r.at),i=Number.isNaN(s.getTime())?r.at:ms(s);n.push(`Last login: ${i} from ${r.from||"unknown"}`)}return n.push(""),`${n.map(s=>`${s}\r
`).join("")}`}function Sy(t,e,r,n,s=!1){let i=e==="root"?"/root":`/home/${e}`,o=n===i?"~":n.startsWith(`${i}/`)?`~${n.slice(i.length)}`:n,a=n.split("/").at(-1)||"/",c=t.replace(/\\033\[/g,"\x1B[").replace(/\\e\[/g,"\x1B[").replace(/\\u/g,e).replace(/\\h/g,r.split(".")[0]??r).replace(/\\H/g,r).replace(/\\w/g,o).replace(/\\W/g,a).replace(/\\\$/g,e==="root"?"#":"$").replace(/\\n/g,`
`).replace(/\\\\/g,"\\");return s?c=c.replace(/\\\[/g,"").replace(/\\\]/g,""):c=c.replace(/\\\[/g,"").replace(/\\\]/g,""),c}function Kr(t,e,r,n,s,i=!1){if(n)return Sy(n,t,e,s??r,i);let o=t==="root",a=f=>i?`${f}`:f,c=a("\x1B[37m"),l=a(o?"\x1B[1;31m":"\x1B[1;35m"),u=a("\x1B[1;34m"),d=o?a("\x1B[1;31m"):"";return`${c}[${l}${t}${c}@${u}${e}${c} ${r}]${d}${o?"#":"$"}\x1B[0m `}es();import{EventEmitter as T1}from"node:events";function sm(t){return t==="1"||t==="true"}function im(){return typeof performance<"u"&&typeof performance.now=="function"?performance.now():Date.now()}function by(){return sm(process.env.DEV_MODE)||sm(process.env.RENDER_PERF)}function gs(t){let e=by();if(!e)return{enabled:e,mark:()=>{},done:()=>{}};let r=im(),n=i=>{let o=im()-r;console.log(`[perf][${t}] ${i}: ${o.toFixed(1)}ms`)};return{enabled:e,mark:n,done:(i="done")=>{n(i)}}}import*as Mt from"node:os";import*as hh from"node:crypto";import{EventEmitter as c1}from"node:events";import*as de from"node:fs";import*as Le from"node:path";import{gunzipSync as Fs,gzipSync as mh}from"node:zlib";var Xi=Buffer.from([86,70,83,33]),_y=3,qi=1,am=2,cm=3,lm={null:1,zero:2,full:3,random:4,urandom:5,tty:6,console:7,ptmx:8,stdin:9,stdout:10,stderr:11},um={};for(let[t,e]of Object.entries(lm))um[e]=t;var Yi=class{_chunks=[];write(e){this._chunks.push(e)}writeUint8(e){let r=Buffer.allocUnsafe(1);r.writeUInt8(e,0),this._chunks.push(r)}writeUint16(e){let r=Buffer.allocUnsafe(2);r.writeUInt16LE(e,0),this._chunks.push(r)}writeUint32(e){let r=Buffer.allocUnsafe(4);r.writeUInt32LE(e,0),this._chunks.push(r)}writeFloat64(e){let r=Buffer.allocUnsafe(8);r.writeDoubleBE(e,0),this._chunks.push(r)}writeString(e){let r=Buffer.from(e,"utf8");this.writeUint16(r.length),this._chunks.push(r)}writeBytes(e){this.writeUint32(e.length),this._chunks.push(e)}toBuffer(){return Buffer.concat(this._chunks)}};function dm(t,e){if(e.type==="file"){let r=e;t.writeUint8(qi),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(r.compressed?1:0),t.writeBytes(r.content)}else if(e.type==="stub"){let r=e;t.writeUint8(qi),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(0),t.writeBytes(Buffer.from(r.stubContent,"utf8"))}else if(e.type==="device"){let r=e;t.writeUint8(cm),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt),t.writeUint8(lm[r.deviceKind]??0),t.writeUint8(r.major),t.writeUint8(r.minor)}else{let r=e;t.writeUint8(am),t.writeString(r.name),t.writeUint32(r.mode),t.writeUint32(r.uid),t.writeUint32(r.gid),t.writeFloat64(r.createdAt),t.writeFloat64(r.updatedAt);let n=Object.values(r.children);t.writeUint32(n.length);for(let s of n)dm(t,s)}}function Zi(t){let e=new Yi;return e.write(Xi),e.writeUint8(_y),dm(e,t),e.toBuffer()}var Ki=class{constructor(e){this.buf=e}buf;_pos=0;readUint8(){return this.buf.readUInt8(this._pos++)}readUint16(){let e=this.buf.readUInt16LE(this._pos);return this._pos+=2,e}readUint32(){let e=this.buf.readUInt32LE(this._pos);return this._pos+=4,e}readFloat64(){let e=this.buf.readDoubleBE(this._pos);return this._pos+=8,e}readString(){let e=this.readUint16(),r=this.buf.toString("utf8",this._pos,this._pos+e);return this._pos+=e,r}readBytes(){let e=this.readUint32(),r=this.buf.slice(this._pos,this._pos+e);return this._pos+=e,r}remaining(){return this.buf.length-this._pos}};function pm(t,e){let r=t.readUint8(),n=vy(t.readString()),s=t.readUint32(),i=e?t.readUint32():0,o=e?t.readUint32():0,a=t.readFloat64(),c=t.readFloat64();if(r===qi){let l=t.readUint8()===1,u=t.readBytes();return{type:"file",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,compressed:l,content:u}}if(r===cm){let l=t.readUint8(),u=t.readUint8(),d=t.readUint8(),p=um[l]??"null";return{type:"device",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,deviceKind:p,major:u,minor:d}}if(r===am){let l=t.readUint32(),u=Object.create(null);for(let d=0;d<l;d++){let p=pm(t,e);u[p.name]=p}return{type:"directory",name:n,mode:s,uid:i,gid:o,createdAt:a,updatedAt:c,children:u,_childCount:l,_sortedKeys:null}}throw new Error(`[VFS binary] Unknown node type: 0x${r.toString(16)}`)}var wn=new Map,om=500;function vy(t){let e=wn.get(t);if(e!==void 0)return e;if(wn.size>=om){let r=Math.floor(om/4),n=[...wn.keys()];for(let s=0;s<r;s++)wn.delete(n[s])}return wn.set(t,t),t}function Jt(t){if(t.length<5)throw new Error("[VFS binary] Buffer too short");if(!t.slice(0,4).equals(Xi))throw new Error("[VFS binary] Invalid magic \u2014 not a VFS binary snapshot");let r=new Ki(t);r.readUint8(),r.readUint8(),r.readUint8(),r.readUint8();let s=r.readUint8()>=2,i=pm(r,s);if(i.type!=="directory")throw new Error("[VFS binary] Root node must be a directory");return i}function fm(t){return t.length>=4&&t.slice(0,4).equals(Xi)}var ys={readLatencyMs:5,writeLatencyMs:10,sequentialReadThroughput:500,sequentialWriteThroughput:300};var Ss=class{_cache=new Map;_maxEntries;_maxMemoryBytes;_policy;_diskIo;_simulateDiskIo;_hits=0;_misses=0;_evictions=0;_totalMemoryUsage=0;constructor(e={}){this._maxEntries=e.maxEntries??1e3,this._maxMemoryBytes=e.maxMemoryBytes??64*1024*1024,this._policy=e.policy??"lru",this._simulateDiskIo=e.simulateDiskIo??!0;let r=e.diskIo??{};this._diskIo={readLatencyMs:r.readLatencyMs??ys.readLatencyMs,writeLatencyMs:r.writeLatencyMs??ys.writeLatencyMs,sequentialReadThroughput:r.sequentialReadThroughput??ys.sequentialReadThroughput,sequentialWriteThroughput:r.sequentialWriteThroughput??ys.sequentialWriteThroughput}}async get(e,r){let n=this._cache.get(e);if(n)return this._hits++,n.lastAccessedAt=Date.now(),n.accessCount++,Buffer.from(n.content);if(this._misses++,this._simulateDiskIo){let i=await r(),o=i.length/this._diskIo.sequentialReadThroughput,a=this._diskIo.readLatencyMs+o;return await this._delay(a),this._set(e,i),i}let s=await r();return this._set(e,s),s}getSync(e,r){let n=this._cache.get(e);if(n)return this._hits++,n.lastAccessedAt=Date.now(),n.accessCount++,Buffer.from(n.content);this._misses++;let s=r();if(this._simulateDiskIo){let i=s.length/this._diskIo.sequentialReadThroughput,o=this._diskIo.readLatencyMs+i;this._syncDelay(o)}return this._set(e,s),s}async set(e,r,n){if(this._simulateDiskIo&&n){let s=r.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;await n(r),await this._delay(i)}else n&&await n(r);this._set(e,r)}setSync(e,r,n){if(this._simulateDiskIo&&n){n(r);let s=r.length/this._diskIo.sequentialWriteThroughput,i=this._diskIo.writeLatencyMs+s;this._syncDelay(i)}else n&&n(r);this._set(e,r)}has(e){return this._cache.has(e)}delete(e){let r=this._cache.get(e);return r?(this._totalMemoryUsage-=r.size,this._cache.delete(e),!0):!1}clear(){this._cache.clear(),this._totalMemoryUsage=0}getStats(){let e=this._hits+this._misses;return{hits:this._hits,misses:this._misses,evictions:this._evictions,entries:this._cache.size,memoryUsage:this._totalMemoryUsage,hitRate:e>0?this._hits/e*100:0}}resetStats(){this._hits=0,this._misses=0,this._evictions=0}getPolicy(){return this._policy}getDiskIoParams(){return{...this._diskIo}}updateDiskIoParams(e){e.readLatencyMs!==void 0&&(this._diskIo.readLatencyMs=e.readLatencyMs),e.writeLatencyMs!==void 0&&(this._diskIo.writeLatencyMs=e.writeLatencyMs),e.sequentialReadThroughput!==void 0&&(this._diskIo.sequentialReadThroughput=e.sequentialReadThroughput),e.sequentialWriteThroughput!==void 0&&(this._diskIo.sequentialWriteThroughput=e.sequentialWriteThroughput)}_set(e,r){let n=this._cache.get(e);n&&(this._totalMemoryUsage-=n.size);let s=r.length;for(;(this._cache.size>=this._maxEntries||this._totalMemoryUsage+s>this._maxMemoryBytes)&&this._evictOne(););let i={content:Buffer.from(r),insertedAt:Date.now(),lastAccessedAt:Date.now(),accessCount:1,size:s};this._cache.set(e,i),this._totalMemoryUsage+=s}_evictOne(){if(this._cache.size===0)return!1;let e=null;switch(this._policy){case"lru":e=this._findLru();break;case"lfu":e=this._findLfu();break;case"fifo":e=this._findFifo();break;default:throw new Error(`Unknown eviction policy: ${this._policy}`)}if(e){let r=this._cache.get(e);return this._totalMemoryUsage-=r.size,this._cache.delete(e),this._evictions++,!0}return!1}_findLru(){let e=Number.POSITIVE_INFINITY,r=null;for(let[n,s]of this._cache)s.lastAccessedAt<e&&(e=s.lastAccessedAt,r=n);return r}_findLfu(){let e=Number.POSITIVE_INFINITY,r=null;for(let[n,s]of this._cache)s.accessCount<e&&(e=s.accessCount,r=n);return r}_findFifo(){let e=Number.POSITIVE_INFINITY,r=null;for(let[n,s]of this._cache)s.insertedAt<e&&(e=s.insertedAt,r=n);return r}_delay(e){return new Promise(r=>setTimeout(r,e))}_syncDelay(e){if(e<=0)return;let r=Date.now();for(;Date.now()-r<e;);}};import*as Oe from"node:fs";import{dirname as wy}from"node:path";var Se={WRITE:1,MKDIR:2,REMOVE:3,CHMOD:4,MOVE:5,SYMLINK:6},xn="utf8";function xy(t,e,r){let n=Buffer.from(r,xn);return t.writeUInt16LE(n.length,e),n.copy(t,e+2),2+n.length}function Cy(t){let e=Buffer.from(t.path,xn),r=0;t.op===Se.WRITE?r=4+(t.content?.length??0)+4:t.op===Se.MKDIR?r=4:t.op===Se.REMOVE?r=0:t.op===Se.CHMOD?r=4:(t.op===Se.MOVE||t.op===Se.SYMLINK)&&(r=2+Buffer.byteLength(t.dest??"",xn));let n=3+e.length+r,s=Buffer.allocUnsafe(n),i=0;if(s.writeUInt8(t.op,i++),s.writeUInt16LE(e.length,i),i+=2,e.copy(s,i),i+=e.length,t.op===Se.WRITE){let o=t.content??Buffer.alloc(0);s.writeUInt32LE(o.length,i),i+=4,o.copy(s,i),i+=o.length,s.writeUInt32LE(t.mode??420,i),i+=4}else t.op===Se.MKDIR?(s.writeUInt32LE(t.mode??493,i),i+=4):t.op===Se.CHMOD?(s.writeUInt32LE(t.mode??420,i),i+=4):(t.op===Se.MOVE||t.op===Se.SYMLINK)&&(i+=xy(s,i,t.dest??""));return s}function Iy(t){let e=[],r=0;try{for(;r<t.length&&!(r+3>t.length);){let n=t.readUInt8(r++),s=t.readUInt16LE(r);if(r+=2,r+s>t.length)break;let i=t.subarray(r,r+s).toString(xn);if(r+=s,n===Se.WRITE){if(r+4>t.length)break;let o=t.readUInt32LE(r);if(r+=4,r+o+4>t.length)break;let a=Buffer.from(t.subarray(r,r+o));r+=o;let c=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,content:a,mode:c})}else if(n===Se.MKDIR){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===Se.REMOVE)e.push({op:n,path:i});else if(n===Se.CHMOD){if(r+4>t.length)break;let o=t.readUInt32LE(r);r+=4,e.push({op:n,path:i,mode:o})}else if(n===Se.MOVE||n===Se.SYMLINK){if(r+2>t.length)break;let o=t.readUInt16LE(r);if(r+=2,r+o>t.length)break;let a=t.subarray(r,r+o).toString(xn);r+=o,e.push({op:n,path:i,dest:a})}else break}}catch{}return e}function mm(t,e){let r=Cy(e);if(Oe.existsSync(t)){let n=Oe.openSync(t,Oe.constants.O_WRONLY|Oe.constants.O_CREAT|Oe.constants.O_APPEND);try{Oe.writeSync(n,r)}finally{Oe.closeSync(n)}}else{let n=wy(t);Oe.existsSync(n)||Oe.mkdirSync(n,{recursive:!0}),Oe.writeFileSync(t,r)}}function Ji(t){if(!Oe.existsSync(t))return[];let e=Oe.readFileSync(t);return e.length===0?[]:Iy(e)}function hm(t){Oe.existsSync(t)&&Oe.unlinkSync(t)}import*as bs from"node:path";function re(t){if(!t||t.trim()==="")return"/";let e=bs.posix.normalize(t.startsWith("/")?t:`/${t}`);return e===""?"/":e}function Py(t,e){let r=re(e);return Ie(t,r)}function Ie(t,e){if(e==="/")return t;let r=t,n=1;for(;n<=e.length;){let s=e.indexOf("/",n),i=s===-1?e.length:s,o=e.slice(n,i);if(o){if(r.type!=="directory")throw new Error(`Path '${e}' does not exist.`);let a=r.children[o];if(!a)throw new Error(`Path '${e}' does not exist.`);r=a}if(s===-1)break;n=s+1}return r}function Qt(t,e,r,n){let s=re(e);if(s==="/")throw new Error("Root path has no parent directory.");let i=bs.posix.dirname(s),o=bs.posix.basename(s);if(!o)throw new Error(`Invalid path '${e}'.`);r&&n(i);let a=Py(t,i);if(a.type!=="directory")throw new Error(`Parent path '${i}' is not a directory.`);return{parent:a,name:o}}var Qi=4,er=2,Lt=1;function ht(t,e,r,n,s){let i=re(e),o=Ie(t,i);if(r===0){if(s&Lt&&(o.mode&73)===0)throw new Error(`EACCES: permission denied: '${i}'`);return}let a=0;if(r===o.uid?a=o.mode>>6&7:n===o.gid?a=o.mode>>3&7:a=o.mode&7,(a&s)!==s)throw new Error(`EACCES: permission denied: '${i}'`)}function Xr(t,e,r,n){let s=re(e);if(s==="/")return;let i=s.split("/").filter(Boolean),o="";for(let a=0;a<i.length-1;a++){o+=`/${i[a]}`;try{ht(t,o,r,n,Lt)}catch(c){if(c instanceof Error&&c.message.includes("does not exist"))return;throw new Error(`EACCES: permission denied: '${o}'`)}}}function gm(t,e,r,n,s){let i=re(e),o=Ie(t,i);if(ht(t,i,n,s,er|Lt),o.mode&512&&n!==0&&n!==o.uid){let a=o.children[r];if(a&&a.uid!==n)throw new Error(`EACCES: permission denied: cannot delete '${r}' (sticky bit)`)}}function ym(t){if(t!==0)throw new Error("EPERM: operation not permitted: chown")}function Sm(t,e,r){let n=re(e),s=Ie(t,n);if(r!==0&&r!==s.uid)throw new Error(`EPERM: operation not permitted: chmod '${n}'`)}import*as Ve from"node:fs";import*as Zr from"node:path";import{createHash as Ey}from"node:crypto";var _s=class t{_swapDir;_entries=new Map;_swapIns=0;_swapOuts=0;constructor(e){this._swapDir=e}initialize(){Ve.existsSync(this._swapDir)||Ve.mkdirSync(this._swapDir,{recursive:!0}),this._loadExistingEntries()}swapOut(e,r,n){let s=t._hashPath(e),i=Zr.join(this._swapDir,`${s}.swap`),o=Buffer.alloc(5);o.writeUInt32LE(r.length,0),o.writeUInt8(n?1:0,4);let a=`${i}.tmp`;Ve.writeFileSync(a,Buffer.concat([o,r])),Ve.renameSync(a,i),this._entries.set(e,{vfsPath:e,size:r.length,compressed:n,lastAccess:Date.now()}),this._swapOuts++}swapIn(e){let r=this._entries.get(e);if(!r)return null;let n=t._hashPath(e),s=Zr.join(this._swapDir,`${n}.swap`);try{if(!Ve.existsSync(s))return this._entries.delete(e),null;let i=Ve.readFileSync(s);if(i.length<5)return this._entries.delete(e),null;let o=i.readUInt32LE(0),a=i.subarray(5);if(a.length!==o)return this._entries.delete(e),null;r.lastAccess=Date.now(),this._swapIns++;try{Ve.unlinkSync(s)}catch{}return this._entries.delete(e),a}catch{return this._entries.delete(e),null}}hasSwapped(e){if(!this._entries.get(e))return!1;let n=t._hashPath(e),s=Zr.join(this._swapDir,`${n}.swap`);return Ve.existsSync(s)}deleteSwap(e){let r=t._hashPath(e),n=Zr.join(this._swapDir,`${r}.swap`);try{Ve.unlinkSync(n)}catch{}this._entries.delete(e)}getEntry(e){return this._entries.get(e)}getLruEntries(){return Array.from(this._entries.values()).filter(e=>this.hasSwapped(e.vfsPath)).sort((e,r)=>e.lastAccess-r.lastAccess)}getStats(){let e=0,r=0,n=0;for(let s of this._entries.values())this.hasSwapped(s.vfsPath)&&(n++,r+=s.size,e+=s.size+5);return{filesSwapped:n,diskUsage:e,originalSize:r,swapIns:this._swapIns,swapOuts:this._swapOuts}}clear(){for(let e of this._entries.values())this.deleteSwap(e.vfsPath);this._entries.clear(),this._swapIns=0,this._swapOuts=0}getSwapCount(){return this._entries.size}static _hashPath(e){return Ey("sha256").update(e).digest("hex").slice(0,16)}_loadExistingEntries(){try{let e=Ve.readdirSync(this._swapDir);for(let r of e){if(!r.endsWith(".swap"))continue;let n=Zr.join(this._swapDir,r);try{let s=Ve.statSync(n);if(s.size<5)continue;let i=Ve.readFileSync(n),o=i.readUInt32LE(0),a=i.readUInt8(4)===1,c=r.replace(".swap","");this._entries.set(`__hash:${c}`,{vfsPath:`__hash:${c}`,size:o,compressed:a,lastAccess:s.mtimeMs})}catch{}}}catch{}}};var Co=class t extends c1{_root;_mode;_snapshotFile;_journalFile;_evictionThreshold;_flushAfterNWrites;_writesSinceFlush=0;_flushTimer=null;_dirty=!1;_mounts=new Map;_sortedMounts=null;_readHooks=new Map;_sortedReadHooks=null;_inReadHook=!1;_writeHooks=new Map;_sortedWriteHooks=null;_contentResolvers=new Map;_sortedContentResolvers=null;_ramCapBytes=null;_cachedUsageBytes=null;_swapStore=null;_swapEnabled;_fileCache=null;_cacheEnabled;static _isBrowser=typeof process>"u"||typeof process.versions?.node>"u";_roxifyCompression;_fdTable=new Map;_nextFd=3;constructor(e={}){if(super(),this._mode=e.mode??"memory",this._mode==="fs"){if(!e.snapshotPath)throw new Error('VirtualFileSystem: "snapshotPath" is required when mode is "fs".');if(this._snapshotFile=Le.resolve(e.snapshotPath,"vfs-snapshot.vfsb"),this._journalFile=Le.resolve(e.snapshotPath,"vfs-journal.bin"),this._evictionThreshold=e.evictionThresholdBytes??64*1024,this._flushAfterNWrites=e.flushAfterNWrites??500,this._swapEnabled=e.swapEnabled??!1,this._roxifyCompression=e.roxifyCompression??!1,this._swapEnabled){let n=e.swapDir??Le.resolve(e.snapshotPath,"swap");this._swapStore=new _s(n),this._swapStore.initialize()}let r=e.flushIntervalMs??1e3;r>0&&(this._flushTimer=setInterval(()=>{this._dirty&&this._autoFlush()},r),typeof this._flushTimer=="object"&&this._flushTimer!==null&&"unref"in this._flushTimer&&this._flushTimer.unref())}else this._snapshotFile=null,this._journalFile=null,this._evictionThreshold=0,this._flushAfterNWrites=0,this._swapEnabled=!1,this._roxifyCompression=!1;if(this._cacheEnabled=e.cache?.enabled??!1,this._cacheEnabled){let r={maxEntries:e.cache?.maxEntries,maxMemoryBytes:e.cache?.maxMemoryBytes,policy:e.cache?.policy,diskIo:e.cache?.diskIo,simulateDiskIo:e.cache?.simulateDiskIo};this._fileCache=new Ss(r)}this._root=t._makeDir("",493)}static _makeDir(e,r,n=0,s=0){let i=Date.now();return{type:"directory",name:e,mode:r,uid:n,gid:s,createdAt:i,updatedAt:i,children:Object.create(null),_childCount:0,_sortedKeys:null}}static _makeFile(e,r,n,s,i=0,o=0){let a=Date.now();return{type:"file",name:e,content:r,mode:n,uid:i,gid:o,compressed:s,createdAt:a,updatedAt:a}}static _makeStub(e,r,n,s=0,i=0){let o=Date.now();return{type:"stub",name:e,stubContent:r,mode:n,uid:s,gid:i,createdAt:o,updatedAt:o}}static _makeDeviceNode(e,r,n,s,i,o=0,a=0){let c=Date.now();return{type:"device",name:e,deviceKind:r,mode:n,uid:o,gid:a,major:s,minor:i,createdAt:c,updatedAt:c}}writeStub(e,r,n=420){let s=re(e),{parent:i,name:o}=Qt(this._root,s,!0,c=>this._mkdirRecursive(c,493)),a=i.children[o];if(a?.type==="directory")throw new Error(`Cannot write stub '${s}': path is a directory.`);a?.type!=="file"&&(a||(i._childCount++,i._sortedKeys=null),i.children[o]=t._makeStub(o,r,n))}mknod(e,r,n=438,s=1,i=0){let o=re(e),{parent:a,name:c}=Qt(this._root,o,!0,u=>this._mkdirRecursive(u,493));if(a.children[c])throw new Error(`EEXIST: file already exists, '${o}'`);a.children[c]=t._makeDeviceNode(c,r,n,s,i),a._childCount++,a._sortedKeys=null,this.emit("device:create",{path:o,deviceKind:r}),this._journal({op:Se.MKDIR,path:o,mode:n})}fdOpen(e,r=0){let n=re(e),s=this.exists(n);if(!(s||r&64))throw new Error(`ENOENT: no such file or directory, open '${n}'`);!s&&r&64&&this.writeFile(n,"",{mode:420}),r&512&&this.writeFile(n,"",{mode:420});let i=this._nextFd++;return this._fdTable.set(i,{path:n,flags:r,refCount:1}),i}fdClose(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);r.refCount--,r.refCount<=0&&this._fdTable.delete(e)}fdDup(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);let n=this._nextFd++;return this._fdTable.set(n,{path:r.path,flags:r.flags,refCount:1}),n}fdDup2(e,r){if(e===r)return r;let n=this._fdTable.get(e);if(!n)throw new Error(`EBADF: bad file descriptor: ${e}`);let s=this._fdTable.get(r);return s&&(s.refCount--,s.refCount<=0&&this._fdTable.delete(r)),this._fdTable.set(r,{path:n.path,flags:n.flags,refCount:1}),r}fdPath(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);return r.path}fdFlags(e){let r=this._fdTable.get(e);if(!r)throw new Error(`EBADF: bad file descriptor: ${e}`);return r.flags}getOpenFds(){let e=new Map;for(let[r,n]of this._fdTable)e.set(r,n.path);return e}closeAllFds(){this._fdTable.clear(),this._nextFd=3}_mkdirRecursive(e,r,n,s){let i=re(e);if(i==="/")return;let o=i.split("/").filter(Boolean),a=this._root,c="";for(let l of o){c+=`/${l}`;let u=a.children[l];if(!u)u=t._makeDir(l,r),n!==void 0&&(u.uid=n),s!==void 0&&(u.gid=s),a.children[l]=u,a._childCount++,a._sortedKeys=null,this.emit("dir:create",{path:c,mode:r}),this._journal({op:Se.MKDIR,path:c,mode:r});else if(u.type!=="directory")throw new Error(`Cannot create directory '${c}': path is a file.`);a=u}}async restoreMirror(){if(this._mode!=="fs"||!this._snapshotFile)return;let e=this._roxifyCompression?this._snapshotFile.replaceAll(".vfsb",".rvfsb"):this._snapshotFile;if(!de.existsSync(e)){if(this._journalFile){let r=Ji(this._journalFile);r.length>0&&this._replayJournal(r)}return}try{let r=Buffer.alloc(0);if(this._roxifyCompression){let n=null;try{n=await Promise.resolve().then(()=>(xo(),wo))}catch{console.warn(`
						[VirtualFileSystem] Roxify decompression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`)}let s=this._snapshotFile.replaceAll(".vfsb",".rvfsb");if(de.existsSync(s)){let i=de.readFileSync(s);r=(await n?.decodePngToBinary(i)).buf}else r=de.readFileSync(this._snapshotFile)}else r=de.readFileSync(this._snapshotFile);if(fm(r))this._root=Jt(r);else{let n=JSON.parse(r.toString("utf8"));this._root=this._deserializeDir(n.root,""),console.info("[VirtualFileSystem] Migrating legacy JSON snapshot to binary format.")}if(this.emit("snapshot:restore",{path:this._snapshotFile}),this._journalFile){let n=Ji(this._journalFile);n.length>0&&this._replayJournal(n)}}catch(r){console.warn(`[VirtualFileSystem] Could not restore snapshot from ${this._snapshotFile}:`,r instanceof Error?r.message:String(r))}}flushMirror(){if(this._mode!=="fs"||!this._snapshotFile){this.emit("mirror:flush");return}let e=Le.dirname(this._snapshotFile);de.mkdirSync(e,{recursive:!0});let r=this._root,n=Zi(r);this._roxifyCompression?new Promise(async(s,i)=>{let o=null;try{o=await Promise.resolve().then(()=>(xo(),wo))}catch{i()}try{let a=await o.encodeBinaryToPng(n);de.writeFileSync(this._snapshotFile.replaceAll(".vfsb",".rvfsb"),a),s(void 0)}catch{console.warn(`
						[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot. Did you approve the build of the 'roxify' package?
					`),i()}}).catch(s=>{console.warn("[VirtualFileSystem] Roxify compression failed, falling back to uncompressed snapshot:",s instanceof Error?s.message:String(s)),de.writeFileSync(this._snapshotFile,n)}):de.writeFileSync(this._snapshotFile,n),this._journalFile&&hm(this._journalFile),this._dirty=!1,this._writesSinceFlush=0,this.emit("mirror:flush",{path:this._snapshotFile}),this.evictLargeFiles()}getMode(){return this._mode}getSnapshotPath(){return this._snapshotFile}_autoFlush(){this._dirty&&this.flushMirror()}_markDirty(){this._dirty=!0,this._flushAfterNWrites>0&&(this._writesSinceFlush++,this._writesSinceFlush>=this._flushAfterNWrites&&(this._writesSinceFlush=0,this._autoFlush()))}stopAutoFlush(){this._flushTimer!==null&&(clearInterval(this._flushTimer),this._flushTimer=null),this._dirty&&this.flushMirror()}importRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._root=e}finally{this._replayMode=r}}mergeRootTree(e){let r=this._replayMode;this._replayMode=!0;try{this._mergeDir(this._root,e)}finally{this._replayMode=r}}_mergeDir(e,r){for(let[n,s]of Object.entries(r.children)){let i=e.children[n];s.type==="directory"?i?i.type==="directory"&&this._mergeDir(i,s):(e.children[n]=s,e._childCount++,e._sortedKeys=null):i||(e.children[n]=s,e._childCount++,e._sortedKeys=null)}}encodeBinary(){return Zi(this._root)}releaseTree(){this._root=t._makeDir("",493)}_replayMode=!1;_journal(e){this._journalFile&&!this._replayMode&&(mm(this._journalFile,e),this._markDirty())}_replayJournal(e){this._replayMode=!0;try{for(let r of e)try{r.op===Se.WRITE?this.writeFile(r.path,r.content??Buffer.alloc(0),{mode:r.mode}):r.op===Se.MKDIR?this.mkdir(r.path,r.mode):r.op===Se.REMOVE?this.exists(r.path)&&this.remove(r.path,{recursive:!0}):r.op===Se.CHMOD?this.exists(r.path)&&this.chmod(r.path,r.mode??420):r.op===Se.MOVE?this.exists(r.path)&&r.dest&&this.move(r.path,r.dest):r.op===Se.SYMLINK&&r.dest&&this.symlink(r.dest,r.path)}catch{}}finally{this._replayMode=!1}}evictLargeFiles(){!this._snapshotFile||this._evictionThreshold===0||de.existsSync(this._snapshotFile)&&(this._evictDir(this._root),this._cachedUsageBytes=null)}_evictDir(e){for(let r of Object.values(e.children))if(r.type==="directory")this._evictDir(r);else if(r.type==="file"&&!r.evicted){let n=r.compressed?r.size??r.content.length*2:r.content.length;if(n>this._evictionThreshold){if(this._swapEnabled&&this._swapStore&&r.content.length>0){let s=this._getNodePath(this._root,r);s&&this._swapStore.swapOut(s,r.content,r.compressed)}r.size=n,r.content=Buffer.alloc(0),r.evicted=!0}}}getOpenPaths(){let e=new Set;for(let r of this._fdTable.values())e.add(r.path);return e}evictUnusedLargeFiles(e){return this._evictionThreshold===0?0:this._evictUnusedDir(this._root,e,"")}_evictUnusedDir(e,r,n){let s=0;for(let[i,o]of Object.entries(e.children)){let a=n?`${n}/${i}`:`/${i}`;if(o.type==="directory")s+=this._evictUnusedDir(o,r,a);else if(o.type==="file"&&!o.evicted&&!r.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>this._evictionThreshold&&(this._swapEnabled&&this._swapStore&&o.content.length>0&&this._swapStore.swapOut(a,o.content,o.compressed),o.size=c,o.content=Buffer.alloc(0),o.evicted=!0,s++)}}return s}swapOutFile(e){if(!(this._swapEnabled&&this._swapStore))return!1;let r;try{r=Ie(this._root,e)}catch{return!1}if(r.type!=="file"||r.evicted||r.content.length===0)return!1;let n=r.content,s=r.compressed;return this._swapStore.swapOut(e,n,s),r.size=n.length,r.content=Buffer.alloc(0),r.evicted=!0,!0}swapOutLru(e){if(!(this._swapEnabled&&this._swapStore))return 0;let r=this.getOpenPaths(),n=0,s=0,i=[];this._collectEvictableFiles(this._root,"",r,i),i.sort((o,a)=>a.size-o.size);for(let o of i){if(n>=e)break;this.swapOutFile(o.path)&&(n+=o.size,s++)}return s}getSwapStats(){return this._swapStore?.getStats()??null}isSwapEnabled(){return this._swapEnabled}clearSwap(){this._swapStore?.clear()}getCacheStats(){return this._fileCache?.getStats()??null}isCacheEnabled(){return this._cacheEnabled}clearCache(){this._fileCache?.clear(),this._fileCache?.resetStats()}invalidateCache(e){let r=re(e);this._fileCache?.delete(r)}preloadCache(e){if(!(this._cacheEnabled&&this._fileCache))return 0;let r=0;for(let n of e)try{let s=re(n),i=Ie(this._root,s);if(i.type==="file"){i.evicted&&this._reloadEvicted(i,s);let o=i.compressed?Fs(i.content):i.content;this._fileCache.setSync(s,o),r++}}catch{}return r}_getNodePath(e,r){return this._findNodePath(e,r,"")}_findNodePath(e,r,n){for(let[s,i]of Object.entries(e.children)){if(i===r)return n?`${n}/${s}`:`/${s}`;if(i.type==="directory"){let o=n?`${n}/${s}`:`/${s}`,a=this._findNodePath(i,r,o);if(a)return a}}return null}_collectEvictableFiles(e,r,n,s){for(let[i,o]of Object.entries(e.children)){let a=r?`${r}/${i}`:`/${i}`;if(o.type==="directory")this._collectEvictableFiles(o,a,n,s);else if(o.type==="file"&&!o.evicted&&!n.has(a)){let c=o.compressed?o.size??o.content.length*2:o.content.length;c>0&&s.push({path:a,size:c})}}}onBeforeWrite(e,r){let n=re(e);this._writeHooks.set(n,r),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeWrite(e){let r=re(e);this._writeHooks.delete(r),this._sortedWriteHooks=[...this._writeHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerWriteHook(e,r){if(this._sortedWriteHooks){for(let n of this._sortedWriteHooks)if(e===n||e.startsWith(n==="/"?"/":`${n}/`)){let s=this._writeHooks.get(n);if(s){s(e,r);return}}}}registerContentResolver(e,r){let n=re(e);this._contentResolvers.set(n,r),this._sortedContentResolvers=[...this._contentResolvers.keys()].sort((s,i)=>i.length-s.length)}_resolveContent(e){if(!this._sortedContentResolvers)return null;for(let r of this._sortedContentResolvers)if(e===r||e.startsWith(r==="/"?"/":`${r}/`)){let n=this._contentResolvers.get(r);if(n)return n(e)}return null}_reloadEvicted(e,r){if(e.evicted){if(this._swapStore){let n=this._swapStore.swapIn(r);if(n){e.content=n,e.evicted=void 0;return}}if(this._snapshotFile&&de.existsSync(this._snapshotFile))try{let n=de.readFileSync(this._snapshotFile),s=Jt(n),i=r.split("/").filter(Boolean),o=s;for(let a of i){if(o.type!=="directory")return;let c=o.children[a];if(!c)return;o=c}o.type==="file"&&(e.content=o.content,e.compressed=o.compressed,e.evicted=void 0)}catch{}}}mount(e,r,{readOnly:n=!0}={}){if(t._isBrowser)return;let s=re(e),i=Le.resolve(r);if(!de.existsSync(i))throw new Error(`VirtualFileSystem.mount: host path does not exist: "${i}"`);if(!de.statSync(i).isDirectory())throw new Error(`VirtualFileSystem.mount: host path is not a directory: "${i}"`);this.mkdir(s),this._mounts.set(s,{hostPath:i,readOnly:n}),this._sortedMounts=null,this.emit("mount",{vPath:s,hostPath:i,readOnly:n})}unmount(e){let r=re(e);this._mounts.delete(r)&&(this._sortedMounts=null,this.emit("unmount",{vPath:r}))}getMounts(){return[...this._mounts.entries()].map(([e,r])=>({vPath:e,...r}))}onBeforeRead(e,r){let n=re(e);this._readHooks.set(n,r),this._sortedReadHooks=[...this._readHooks.keys()].sort((s,i)=>i.length-s.length)}offBeforeRead(e){let r=re(e);this._readHooks.delete(r),this._sortedReadHooks=[...this._readHooks.keys()].sort((n,s)=>s.length-n.length)}_triggerReadHook(e){if(!this._inReadHook&&this._sortedReadHooks){for(let r of this._sortedReadHooks)if(e===r||e.startsWith(r==="/"?"/":`${r}/`)){let n=this._readHooks.get(r);if(n){this._inReadHook=!0;try{n()}finally{this._inReadHook=!1}return}}}}_resolveMount(e){let r=re(e);this._sortedMounts||(this._sortedMounts=[...this._mounts.entries()].sort(([n],[s])=>s.length-n.length));for(let[n,s]of this._sortedMounts)if(r===n||r.startsWith(`${n}/`)){let i=r.slice(n.length).replace(/^\//,""),o=i?Le.join(s.hostPath,i):s.hostPath;return{hostPath:s.hostPath,readOnly:s.readOnly,relPath:i,fullHostPath:o}}return null}mkdir(e,r=493,n,s){let i=re(e),o=(()=>{try{return Ie(this._root,i)}catch{return null}})();if(o&&o.type!=="directory")throw new Error(`Cannot create directory '${i}': path is a file.`);if(n!==void 0&&s!==void 0&&!o){let a=Le.posix.dirname(i);if(a!==i)try{ht(this._root,a,n,s,er|Lt)}catch(c){if(!(c instanceof Error&&c.message.includes("does not exist")))throw c}}this._mkdirRecursive(i,r,n,s)}writeFile(e,r,n={},s,i){let o=this._resolveMount(e);if(o){if(o.readOnly)throw new Error(`EROFS: read-only file system, open '${o.fullHostPath}'`);let h=Le.dirname(o.fullHostPath);de.existsSync(h)||de.mkdirSync(h,{recursive:!0}),de.writeFileSync(o.fullHostPath,Buffer.isBuffer(r)?r:Buffer.from(r,"utf8"));return}let a=re(e),c=Buffer.isBuffer(r)?r:Buffer.from(r,"utf8");if(this._triggerWriteHook(a,c),s!==void 0&&i!==void 0){Xr(this._root,a,s,i);let h=Le.posix.dirname(a);if(h!==a)try{ht(this._root,h,s,i,er|Lt)}catch(g){if(!(g instanceof Error&&g.message.includes("does not exist")))throw g}}let{parent:l,name:u}=Qt(this._root,a,!0,h=>this._mkdirRecursive(h,493)),d=l.children[u];if(d?.type==="directory")throw new Error(`Cannot write file '${a}': path is a directory.`);if(d?.type==="device"){t._writeDeviceNode(d,a),d.updatedAt=Date.now(),this.emit("device:write",{path:a});return}d&&s!==void 0&&i!==void 0&&ht(this._root,a,s,i,er);let p=n.compress??!1,f=p?mh(c):c,m=n.mode??420;if(this._ramCapBytes!==null){let h=this._getCachedUsage(),g=d?.type==="file"?d.content.length:0,y=h-g+f.length;if(y>this._ramCapBytes){let S=y-this._ramCapBytes,w=this.swapOutLru(S),N=this._getCachedUsage()-g+f.length;if(N>this._ramCapBytes&&w===0)throw new Error(`ENOMEM: Cannot allocate memory: write to '${a}' would exceed RAM cap (${N}/${this._ramCapBytes} bytes)`)}}d&&d.type==="file"?(d.content=f,d.compressed=p,d.mode=m,s!==void 0&&(d.uid=s),i!==void 0&&(d.gid=i),d.updatedAt=Date.now()):(d||(l._childCount++,l._sortedKeys=null),l.children[u]=t._makeFile(u,f,m,p,s,i)),this.emit("file:write",{path:a,size:f.length}),this._journal({op:Se.WRITE,path:a,content:c,mode:m}),this._cachedUsageBytes=null,this._cacheEnabled&&this._fileCache&&this._fileCache.delete(a)}readFile(e,r,n){let s=this._resolveMount(e);if(s){if(!de.existsSync(s.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${s.fullHostPath}'`);return de.readFileSync(s.fullHostPath,"utf8")}let i=re(e);this._triggerReadHook(i);let o=this._resolveContent(i);if(o!==null)return this.emit("file:read",{path:i,size:o.length}),o;if(this._cacheEnabled&&this._fileCache?.has(i)){let l=this._fileCache.getSync(i,()=>Buffer.alloc(0));return this.emit("file:read",{path:i,size:l.length}),l.toString("utf8")}r!==void 0&&n!==void 0&&Xr(this._root,i,r,n);let a=Ie(this._root,i);if(a.type==="stub")return r!==void 0&&n!==void 0&&ht(this._root,i,r,n,Qi),this.emit("file:read",{path:i,size:a.stubContent.length}),a.stubContent;if(a.type==="device"){let l=t._readDeviceNode(a,i);return this.emit("file:read",{path:i,size:l.length}),l}if(a.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);r!==void 0&&n!==void 0&&ht(this._root,i,r,n,Qi),a.evicted&&this._reloadEvicted(a,i);let c=a.compressed?Fs(a.content):a.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(i,c),this.emit("file:read",{path:i,size:c.length}),c.toString("utf8")}readFileRaw(e){let r=this._resolveMount(e);if(r){if(!de.existsSync(r.fullHostPath))throw new Error(`ENOENT: no such file or directory, open '${r.fullHostPath}'`);return de.readFileSync(r.fullHostPath)}let n=re(e);if(this._triggerReadHook(n),this._cacheEnabled&&this._fileCache?.has(n)){let o=this._fileCache.getSync(n,()=>Buffer.alloc(0));return this.emit("file:read",{path:n,size:o.length}),o}let s=Ie(this._root,n);if(s.type==="stub"){let o=Buffer.from(s.stubContent,"utf8");return this.emit("file:read",{path:n,size:o.length}),o}if(s.type==="device"){let o=t._readDeviceNode(s,n),a=Buffer.from(o,"binary");return this.emit("file:read",{path:n,size:a.length}),a}if(s.type!=="file")throw new Error(`Cannot read '${e}': not a file.`);s.evicted&&this._reloadEvicted(s,n);let i=s.compressed?Fs(s.content):s.content;return this._cacheEnabled&&this._fileCache&&this._fileCache.setSync(n,i),this.emit("file:read",{path:n,size:i.length}),i}exists(e){let r=this._resolveMount(e);if(r)return de.existsSync(r.fullHostPath);let n=re(e);try{return Ie(this._root,n),!0}catch{return!1}}chmod(e,r,n){let s=re(e);n!==void 0&&Sm(this._root,s,n),Ie(this._root,s).mode=r,this._journal({op:Se.CHMOD,path:s,mode:r})}chown(e,r,n,s){let i=re(e);s!==void 0&&ym(s);let o=Ie(this._root,i);o.uid=r,o.gid=n,this._journal({op:Se.CHMOD,path:i,mode:o.mode})}getOwner(e){let r=Ie(this._root,re(e));return{uid:r.uid,gid:r.gid}}checkAccess(e,r,n,s){try{let i=Ie(this._root,re(e)),o=i.mode;if(r===0)return s&1?(o&73)!==0:!0;let a=0;return r===i.uid?a=o>>6&7:n===i.gid?a=o>>3&7:a=o&7,(a&s)===s}catch{return!1}}stat(e){let r=this._resolveMount(e);if(r){if(!de.existsSync(r.fullHostPath))throw new Error(`ENOENT: stat '${r.fullHostPath}'`);let a=de.statSync(r.fullHostPath),c=r.relPath.split("/").pop()??r.fullHostPath.split("/").pop()??"",l=a.mtime;return a.isDirectory()?{type:"directory",name:c,path:re(e),mode:493,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,childrenCount:de.readdirSync(r.fullHostPath).length}:{type:"file",name:c,path:re(e),mode:r.readOnly?292:420,uid:0,gid:0,createdAt:a.birthtime,updatedAt:l,compressed:!1,size:a.size}}let n=re(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=this._resolveContent(n);if(s!==null)return{type:"file",name:n==="/"?"":Le.posix.basename(n),path:n,mode:292,uid:0,gid:0,createdAt:new Date,updatedAt:new Date,compressed:!1,size:s.length};let i=Ie(this._root,n),o=n==="/"?"":Le.posix.basename(n);return i.type==="stub"?{type:"file",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:!1,size:i.stubContent.length}:i.type==="file"?{type:"file",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),compressed:i.compressed,size:i.evicted?i.size??0:i.content.length}:i.type==="device"?{type:"device",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),deviceKind:i.deviceKind,major:i.major,minor:i.minor}:{type:"directory",name:o,path:n,mode:i.mode,uid:i.uid,gid:i.gid,createdAt:new Date(i.createdAt),updatedAt:new Date(i.updatedAt),childrenCount:i._childCount}}static _readDeviceNode(e,r){switch(e.deviceKind){case"null":return"";case"zero":return"\0".repeat(4096);case"full":throw new Error(`ENOSPC: no space left on device, write '${r}'`);case"random":case"urandom":return hh.randomBytes(64).toString("binary");default:return""}}static _writeDeviceNode(e,r){if(e.deviceKind==="full")throw new Error(`ENOSPC: no space left on device, write '${r}'`)}statType(e){try{let r=this._resolveMount(e);if(r){let s=de.statSync(r.fullHostPath,{throwIfNoEntry:!1});return s?s.isDirectory()?"directory":"file":null}let n=Ie(this._root,re(e));return n.type==="directory"?"directory":n.type==="device"?"device":"file"}catch{return null}}list(e="/"){let r=this._resolveMount(e);if(r){if(!de.existsSync(r.fullHostPath))return[];try{return de.readdirSync(r.fullHostPath).sort()}catch{return[]}}let n=re(e);n.startsWith("/proc")&&this._triggerReadHook(n);let s=Ie(this._root,n);if(s.type!=="directory")throw new Error(`Cannot list '${e}': not a directory.`);return s._sortedKeys||(s._sortedKeys=Object.keys(s.children).sort()),s._sortedKeys}tree(e="/"){let r=re(e),n=Ie(this._root,r);if(n.type!=="directory")throw new Error(`Cannot render tree for '${e}': not a directory.`);let s=e==="/"?"/":Le.posix.basename(r);return this._renderTreeLines(n,s)}_renderTreeLines(e,r){let n=[r];e._sortedKeys||(e._sortedKeys=Object.keys(e.children).sort());let s=e._sortedKeys;for(let i=0;i<s.length;i++){let o=s[i];if(o===void 0)continue;let a=e.children[o];if(a===void 0)continue;let c=i===s.length-1,l=c?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 ",u=c?"    ":"\u2502   ";if(n.push(`${l}${o}`),a.type==="directory"){let d=this._renderTreeLines(a,"").split(`
`).slice(1).map(p=>`${u}${p}`);n.push(...d)}}return n.join(`
`)}getUsageBytes(e="/"){return this._computeUsage(Ie(this._root,re(e)))}_computeUsage(e){if(e.type==="file")return e.content.length;if(e.type==="stub")return e.stubContent.length;if(e.type==="device")return 0;let r=0;for(let n of Object.values(e.children))r+=this._computeUsage(n);return r}setRamCap(e){this._ramCapBytes=e!==null&&e>0?e:null,this._cachedUsageBytes=null}getRamCap(){return this._ramCapBytes}_getCachedUsage(){return this._cachedUsageBytes===null&&(this._cachedUsageBytes=this._computeUsage(this._root)),this._cachedUsageBytes}compressFile(e){let r=Ie(this._root,re(e));if(r.type!=="file")throw new Error(`Cannot compress '${e}': not a file.`);r.compressed||(r.content=mh(r.content),r.compressed=!0,r.updatedAt=Date.now())}decompressFile(e){let r=Ie(this._root,re(e));if(r.type!=="file")throw new Error(`Cannot decompress '${e}': not a file.`);r.compressed&&(r.content=Fs(r.content),r.compressed=!1,r.updatedAt=Date.now())}symlink(e,r,n,s){let i=re(r),o=e.startsWith("/")?re(e):e;if(n!==void 0&&s!==void 0){let u=Le.posix.dirname(i);if(u!==i)try{ht(this._root,u,n,s,er|Lt)}catch(d){if(!(d instanceof Error&&d.message.includes("does not exist")))throw d}}let{parent:a,name:c}=Qt(this._root,i,!0,u=>this._mkdirRecursive(u,493)),l={type:"file",name:c,content:Buffer.from(o,"utf8"),mode:41471,uid:n??0,gid:s??0,compressed:!1,createdAt:Date.now(),updatedAt:Date.now()};a.children[c]=l,a._childCount++,a._sortedKeys=null,this._journal({op:Se.SYMLINK,path:i,dest:o}),this.emit("symlink:create",{link:i,target:o})}isSymlink(e){try{let r=Ie(this._root,re(e));return r.type==="file"&&r.mode===41471}catch{return!1}}resolveSymlink(e,r=8){let n=re(e);for(let s=0;s<r;s++){try{let i=Ie(this._root,n);if(i.type==="file"&&i.mode===41471){let o=i.content.toString("utf8");n=o.startsWith("/")?o:re(Le.posix.join(Le.posix.dirname(n),o));continue}}catch{break}return n}throw new Error(`Too many levels of symbolic links: ${e}`)}remove(e,r={},n,s){let i=this._resolveMount(e);if(i){if(i.readOnly)throw new Error(`EROFS: read-only file system, unlink '${i.fullHostPath}'`);if(!de.existsSync(i.fullHostPath))throw new Error(`ENOENT: no such file or directory, unlink '${i.fullHostPath}'`);de.statSync(i.fullHostPath).isDirectory()?de.rmSync(i.fullHostPath,{recursive:r.recursive??!1}):de.unlinkSync(i.fullHostPath);return}let o=re(e);if(o==="/")throw new Error("Cannot remove root directory.");if(n!==void 0&&s!==void 0){Xr(this._root,o,n,s);let u=o.split("/").slice(0,-1).join("/")||"/",d=o.split("/").pop()??"";gm(this._root,u,d,n,s)}let a=Ie(this._root,o);if(a.type==="directory"&&!r.recursive&&a._childCount>0)throw new Error(`Directory '${o}' is not empty. Use recursive option.`);let{parent:c,name:l}=Qt(this._root,o,!1,()=>{});delete c.children[l],c._childCount--,c._sortedKeys=null,this.emit("node:remove",{path:o}),this._journal({op:Se.REMOVE,path:o})}move(e,r,n,s){let i=re(e),o=re(r);if(i==="/"||o==="/")throw new Error("Cannot move root directory.");if(n!==void 0&&s!==void 0){Xr(this._root,i,n,s),Xr(this._root,o,n,s);let p=Le.posix.dirname(i),f=Le.posix.dirname(o);if(p!==i&&ht(this._root,p,n,s,er|Lt),f!==o)try{ht(this._root,f,n,s,er|Lt)}catch(m){if(!(m instanceof Error&&m.message.includes("does not exist")))throw m}}let a=Ie(this._root,i);if(this.exists(o))throw new Error(`Destination '${o}' already exists.`);this._mkdirRecursive(Le.posix.dirname(o),493);let{parent:c,name:l}=Qt(this._root,o,!1,()=>{}),{parent:u,name:d}=Qt(this._root,i,!1,()=>{});delete u.children[d],u._childCount--,u._sortedKeys=null,a.name=l,c.children[l]=a,c._childCount++,c._sortedKeys=null,this._journal({op:Se.MOVE,path:i,dest:o})}toSnapshot(){return{root:this._serializeDir(this._root)}}_serializeDir(e){let r=[];for(let n of Object.values(e.children))n.type==="stub"?r.push({type:"file",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),compressed:!1,contentBase64:Buffer.from(n.stubContent,"utf8").toString("base64")}):n.type==="file"?r.push(t._serializeFile(n)):n.type==="device"?r.push({type:"device",name:n.name,mode:n.mode,uid:n.uid,gid:n.gid,createdAt:new Date(n.createdAt).toISOString(),updatedAt:new Date(n.updatedAt).toISOString(),deviceKind:n.deviceKind,major:n.major,minor:n.minor}):r.push(this._serializeDir(n));return{type:"directory",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),children:r}}static _serializeFile(e){return{type:"file",name:e.name,mode:e.mode,uid:e.uid,gid:e.gid,createdAt:new Date(e.createdAt).toISOString(),updatedAt:new Date(e.updatedAt).toISOString(),compressed:e.compressed,contentBase64:e.content.toString("base64")}}static fromSnapshot(e){let r=new t;return r._root=r._deserializeDir(e.root,""),r}importSnapshot(e){this._root=this._deserializeDir(e.root,""),this.emit("snapshot:import")}_deserializeDir(e,r){let n={type:"directory",name:r,mode:e.mode,uid:e.uid??0,gid:e.gid??0,createdAt:Date.parse(e.createdAt),updatedAt:Date.parse(e.updatedAt),children:Object.create(null),_childCount:0,_sortedKeys:null};for(let s of e.children){if(s.type==="file")n.children[s.name]={type:"file",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),compressed:s.compressed,content:Buffer.from(s.contentBase64,"base64")};else if(s.type==="device")n.children[s.name]={type:"device",name:s.name,mode:s.mode,uid:s.uid??0,gid:s.gid??0,createdAt:Date.parse(s.createdAt),updatedAt:Date.parse(s.updatedAt),deviceKind:s.deviceKind,major:s.major,minor:s.minor};else{let i=this._deserializeDir(s,s.name);n.children[s.name]=i}n._childCount++}return n}},Ls=Co;function $(t,e,r=493){t.exists(e)||t.mkdir(e,r)}function k(t,e,r,n=420){t.writeStub(e,r,n)}function Y(t,e,r){t.writeFile(e,r)}function l1(t){let e=2166136261;for(let r=0;r<t.length;r++)e^=t.charCodeAt(r),e=Math.imul(e,16777619);return e>>>0}function u1(t,e,r){$(t,"/etc"),k(t,"/etc/os-release",`${['NAME="Fortune GNU/Linux"',`PRETTY_NAME="${r.os}"`,"ID=fortune","ID_LIKE=fortune",'HOME_URL="https://github.com/itsrealfortune/typescript-virtual-container"',"VERSION_CODENAME=nyx",'VERSION_ID="1.0"',"FORTUNE_CODENAME=nyx"].join(`
`)}
`),k(t,"/etc/fortune_version",`nyx/stable
`),k(t,"/etc/hostname",`${e}
`),k(t,"/etc/shells",`/bin/sh
/bin/bash
/usr/bin/bash
/bin/dash
/usr/bin/dash
`),k(t,"/etc/profile",`${["export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",'if [ "$(id -u)" -eq 0 ]; then',"  export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","else","  export PS1='\\[\\e[37m\\][\\[\\e[35;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\w]\\[\\e[0m\\]\\$ '","fi"].join(`
`)}
`),k(t,"/etc/issue",`Fortune GNU/Linux 1.0 Nyx \\n \\l
`),k(t,"/etc/issue.net",`Fortune GNU/Linux 1.0 Nyx
`),k(t,"/etc/motd",["",`Welcome to ${r.os}`,`Kernel: ${r.kernel}`,""].join(`
`)),k(t,"/etc/lsb-release",`${["DISTRIB_ID=Fortune","DISTRIB_RELEASE=1.0","DISTRIB_CODENAME=nyx",`DISTRIB_DESCRIPTION="${r.os}"`].join(`
`)}
`),$(t,"/etc/apt"),$(t,"/etc/apt/sources.list.d"),$(t,"/etc/apt/trusted.gpg.d"),$(t,"/etc/apt/keyrings"),k(t,"/etc/apt/sources.list",`${["# Fortune GNU/Linux package sources (Fortune 1.0 Nyx)","deb [virtual] fortune://packages.fortune.local nyx main contrib non-free","deb [virtual] fortune://packages.fortune.local nyx-updates main contrib non-free","deb [virtual] fortune://security.fortune.local nyx-security main"].join(`
`)}
`),k(t,"/etc/apt/apt.conf.d/70debconf",`// debconf config
`),$(t,"/etc/network"),k(t,"/etc/network/interfaces",`${["auto lo","iface lo inet loopback","","auto eth0","iface eth0 inet dhcp"].join(`
`)}
`),$(t,"/etc/netplan"),k(t,"/etc/netplan/01-eth0.yaml",`${["network:","  version: 2","  ethernets:","    eth0:","      dhcp4: true"].join(`
`)}
`),k(t,"/etc/resolv.conf",`nameserver 1.1.1.1
nameserver 8.8.8.8
`),k(t,"/etc/hosts",`${["127.0.0.1   localhost",`127.0.1.1   ${e}`,"::1         localhost ip6-localhost ip6-loopback","fe00::0     ip6-localnet","ff00::0     ip6-mcastprefix","ff02::1     ip6-allnodes","ff02::2     ip6-allrouters"].join(`
`)}
`),k(t,"/etc/nsswitch.conf",`${["passwd:         files systemd","group:          files systemd","shadow:         files","hosts:          files dns","networks:       files","protocols:      db files","services:       db files","ethers:         db files","rpc:            db files"].join(`
`)}
`),$(t,"/etc/cron.d"),$(t,"/etc/cron.daily"),$(t,"/etc/cron.hourly"),$(t,"/etc/cron.weekly"),$(t,"/etc/cron.monthly"),$(t,"/etc/init.d"),$(t,"/etc/systemd"),$(t,"/etc/systemd/system"),$(t,"/etc/systemd/system/multi-user.target.wants"),$(t,"/etc/systemd/network"),k(t,"/etc/systemd/system.conf",`[Manager]
DefaultTimeoutStartSec=90s
DefaultTimeoutStopSec=90s
`),k(t,"/etc/fstab",`${["# <file system>  <mount point>  <type>    <options>                        <dump>  <pass>","/dev/vda         /              ext4      rw,relatime,resuid=65534,resgid=65534  0  1","/dev/vdb         /opt/rclone    squashfs  ro,relatime,errors=continue      0  0","tmpfs            /tmp           tmpfs     defaults,noatime                 0  0","tmpfs            /run           tmpfs     defaults,noatime                 0  0","tmpfs            /dev/shm       tmpfs     rw,relatime                      0  0"].join(`
`)}
`),k(t,"/etc/login.defs",`${["MAIL_DIR        /var/mail","PASS_MAX_DAYS   99999","PASS_MIN_DAYS   0","PASS_WARN_AGE   7","UID_MIN         1000","UID_MAX         60000","GID_MIN         1000","GID_MAX         60000","CREATE_HOME     yes","UMASK           022","USERGROUPS_ENAB yes","ENCRYPT_METHOD  SHA512"].join(`
`)}
`),$(t,"/etc/security"),k(t,"/etc/security/limits.conf",`# /etc/security/limits.conf
*  soft  nofile  1024
*  hard  nofile  65536
`),k(t,"/etc/security/access.conf",`# /etc/security/access.conf
`),$(t,"/etc/pam.d"),k(t,"/etc/pam.d/common-auth",`auth [success=1 default=ignore] pam_unix.so nullok
auth requisite pam_deny.so
auth required pam_permit.so
`),k(t,"/etc/pam.d/common-account",`account [success=1 new_authtok_reqd=done default=ignore] pam_unix.so
account requisite pam_deny.so
account required pam_permit.so
`),k(t,"/etc/pam.d/common-password",`password [success=1 default=ignore] pam_unix.so obscure sha512
password requisite pam_deny.so
password required pam_permit.so
`),k(t,"/etc/pam.d/common-session",`session [default=1] pam_permit.so
session requisite pam_deny.so
session required pam_permit.so
session optional pam_umask.so
session required pam_unix.so
`),k(t,"/etc/pam.d/sshd",`@include common-auth
@include common-account
@include common-session
`),k(t,"/etc/pam.d/login",`@include common-auth
@include common-account
@include common-session
`),k(t,"/etc/pam.d/sudo",`@include common-auth
@include common-account
@include common-session
`),$(t,"/etc/sudoers.d"),k(t,"/etc/sudoers",`Defaults	env_reset
Defaults	mail_badpass
Defaults	secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
root ALL=(ALL:ALL) ALL
%sudo ALL=(ALL:ALL) ALL
`,288),k(t,"/etc/sudoers.d/README",`# Files in this directory are parsed by sudo, if the file is not a backup.
`,288),k(t,"/etc/ld.so.conf",`include /etc/ld.so.conf.d/*.conf
`),$(t,"/etc/ld.so.conf.d"),k(t,"/etc/ld.so.conf.d/x86_64-linux-gnu.conf",`/lib/x86_64-linux-gnu
/usr/lib/x86_64-linux-gnu
`),k(t,"/etc/ld.so.conf.d/fakeroot.conf",`/usr/lib/x86_64-linux-gnu/libfakeroot
`),k(t,"/etc/locale.conf",`LANG=en_US.UTF-8
`),k(t,"/etc/locale.gen",`en_US.UTF-8 UTF-8
`),k(t,"/etc/default/locale",`LANG=en_US.UTF-8
`),k(t,"/etc/timezone",`UTC
`),k(t,"/etc/localtime",`UTC
`),k(t,"/etc/environment",`PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
`),k(t,"/etc/adduser.conf",`${["DSHELL=/bin/bash","DHOME=/home","GROUPHOMES=no","LETTERHOMES=no","SKEL=/etc/skel","FIRST_SYSTEM_UID=100","LAST_SYSTEM_UID=999","FIRST_SYSTEM_GID=100","LAST_SYSTEM_GID=999","FIRST_UID=1000","LAST_UID=59999","FIRST_GID=1000","LAST_GID=59999","USERGROUPS=yes",'NAME_REGEX="^[a-z][-a-z0-9_]*$"','SYS_NAME_REGEX="^[a-z_][-a-z0-9_]*$"'].join(`
`)}
`),$(t,"/etc/skel"),k(t,"/etc/skel/.bashrc",`${["# ~/.bashrc: executed by bash(1) for non-login shells.","case $- in","    *i*) ;;","      *) return;;","esac","HISTCONTROL=ignoreboth","HISTSIZE=1000","HISTFILESIZE=2000","shopt -s histappend","shopt -s checkwinsize","alias ll='ls -alF'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),k(t,"/etc/skel/.bash_logout",`# ~/.bash_logout
`),k(t,"/etc/skel/.profile",`# ~/.profile
[ -n "$BASH_VERSION" ] && [ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"
`),$(t,"/etc/alternatives");let n=[["python3","/usr/bin/python3.12"],["python","/usr/bin/python3.12"],["editor","/usr/bin/nano"],["vi","/usr/bin/nano"],["cc","/usr/bin/gcc"],["gcc","/usr/bin/gcc-13"],["g++","/usr/bin/g++-13"],["java","/usr/lib/jvm/java-21-openjdk-amd64/bin/java"],["node","/usr/bin/node"],["npm","/usr/bin/npm"],["awk","/usr/bin/mawk"],["pager","/usr/bin/less"]];for(let[s,i]of n)k(t,`/etc/alternatives/${s}`,i);$(t,"/etc/java-21-openjdk"),$(t,"/etc/java-21-openjdk/security"),k(t,"/etc/java-21-openjdk/security/java.security",`# java.security
`),k(t,"/etc/java-21-openjdk/logging.properties",`# logging.properties
`),k(t,"/etc/bash.bashrc",`# System-wide .bashrc
[ -z "$PS1" ] && return
`),k(t,"/etc/inputrc",`# /etc/inputrc
$include /etc/inputrc.d
set bell-style none
`),k(t,"/etc/magic",`# magic
`),k(t,"/etc/magic.mime",`# magic.mime
`),k(t,"/etc/papersize",`a4
`),k(t,"/etc/ucf.conf",`# ucf.conf
`),k(t,"/etc/gai.conf",`# getaddrinfo() configuration
label ::1/128 0
precedence ::1/128 50
`),k(t,"/etc/services",`# Network services
ftp   21/tcp
ssh   22/tcp
smtp  25/tcp
http  80/tcp
https 443/tcp
`),k(t,"/etc/protocols",`# protocols
ip    0   IP
icmp  1   ICMP
tcp   6   TCP
udp   17  UDP
`),$(t,"/etc/profile.d"),k(t,"/etc/profile.d/01-locale-fix.sh",`[ -z "$LANG" ] && export LANG=en_US.UTF-8
`),k(t,"/etc/profile.d/apps-bin-path.sh",`export PATH="$PATH:/snap/bin"
`)}function Io(t,e){let r=e.listUsers(),n=["root:x:0:0:root:/root:/bin/bash","daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin","bin:x:2:2:bin:/bin:/usr/sbin/nologin","sys:x:3:3:sys:/dev:/usr/sbin/nologin","sync:x:4:65534:sync:/bin:/bin/sync","games:x:5:60:games:/usr/games:/usr/sbin/nologin","man:x:6:12:man:/var/cache/man:/usr/sbin/nologin","lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin","mail:x:8:8:mail:/var/mail:/usr/sbin/nologin","news:x:9:9:news:/var/spool/news:/usr/sbin/nologin","uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin","proxy:x:13:13:proxy:/bin:/usr/sbin/nologin","www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin","backup:x:34:34:backup:/var/backups:/usr/sbin/nologin","list:x:38:38:Mailing List Manager:/var/list:/usr/sbin/nologin","irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin","_apt:x:42:65534::/nonexistent:/usr/sbin/nologin","nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin","messagebus:x:100:106::/nonexistent:/usr/sbin/nologin","systemd-network:x:998:998:systemd Network Management:/:/usr/sbin/nologin","systemd-resolve:x:999:999:systemd Resolver:/:/usr/sbin/nologin","polkitd:x:997:997:polkit:/nonexistent:/usr/sbin/nologin"],s=1e3;for(let a of r){if(a==="root")continue;let c=e.getUid(a),l=e.getGid(a),u=c>0?c:s,d=l>0?l:s;n.push(`${a}:x:${u}:${d}::/home/${a}:/bin/bash`),c===0&&s++}t.writeFile("/etc/passwd",`${n.join(`
`)}
`);let i=e.generateGroupFile();i.length>0?t.writeFile("/etc/group",`${i}
`):t.writeFile("/etc/group",`root:x:0:
nobody:x:65534:
`);let o=e.generateShadowFile();t.writeFile("/etc/shadow",`${o}
`,{mode:416})}function gh(t){let e=t.match(/(\d+)$/);return 1e3+(e?.[1]?Number.parseInt(e[1],10):0)}function yh(t,e,r,n,s,i){let o=`/proc/${e}`;$(t,o),$(t,`${o}/fd`),$(t,`${o}/fdinfo`),$(t,`${o}/net`);let a=Math.floor((Date.now()-new Date(s).getTime())/1e3),c=n.split(/\s+/)[0]??"bash";Y(t,`${o}/cmdline`,`${n.replace(/\s+/g,"\0")}\0`),Y(t,`${o}/comm`,c),Y(t,`${o}/status`,`${[`Name:   ${c}`,"Umask:  0022","State:  S (sleeping)",`Tgid:   ${e}`,`Pid:    ${e}`,"PPid:   1","TracerPid:      0","Uid:    0	0	0	0","Gid:    0	0	0	0","FDSize: 64","Groups:","VmPeak:    20480 kB","VmSize:    16384 kB","VmLck:         0 kB","VmPin:         0 kB","VmHWM:      4096 kB","VmRSS:      4096 kB","RssAnon:     512 kB","RssFile:    3584 kB","RssShmem:      0 kB","VmData:     2048 kB","VmStk:       132 kB","VmExe:       924 kB","VmLib:      2744 kB","VmPTE:        52 kB","VmSwap:        0 kB","Threads: 1","SigQ:   0/31968","SigPnd: 0000000000000000","SigBlk: 0000000000010000","SigIgn: 0000000000380004","SigCgt: 000000004b817efb","CapInh: 0000000000000000","CapPrm: 000001ffffffffff","CapEff: 000001ffffffffff","CapBnd: 000001ffffffffff","CapAmb: 0000000000000000","NoNewPrivs:     0","Seccomp:        0","voluntary_ctxt_switches:        100","nonvoluntary_ctxt_switches:     10"].join(`
`)}
`),Y(t,`${o}/stat`,`${e} (${c}) S 1 ${e} ${e} 0 -1 4194304 0 0 0 0 ${a} 0 0 0 20 0 1 0 0 16777216 4096 18446744073709551615 93824992235520 93824992290000 140737488347024 0 0 0 65536 3686404 1266761467 1 0 0 17 0 0 0 0 0 0
`),Y(t,`${o}/statm`,`4096 1024 768 231 0 512 0
`),Y(t,`${o}/environ`,`${Object.entries(i).map(([l,u])=>`${l}=${u}`).join("\0")}\0`),Y(t,`${o}/cwd`,`/home/${r}\0`),Y(t,`${o}/exe`,"/bin/bash\0"),Y(t,`${o}/maps`,`00400000-004e7000 r-xp 00000000 fd:00 131073  /bin/bash
006e7000-006e8000 r--p 000e7000 fd:00 131073  /bin/bash
006e8000-006f1000 rw-p 000e8000 fd:00 131073  /bin/bash
7fff00000000-7fff00001000 rw-p 00000000 00:00 0   [stack]
7fff00000000-7fff00001000 r-xp 00000000 00:00 0   [vdso]
`),Y(t,`${o}/limits`,`${["Limit                     Soft Limit           Hard Limit           Units","Max cpu time              unlimited            unlimited            seconds","Max file size             unlimited            unlimited            bytes","Max data size             unlimited            unlimited            bytes","Max stack size            8388608              unlimited            bytes","Max core file size        0                    unlimited            bytes","Max resident set          unlimited            unlimited            bytes","Max processes             31968                31968                processes","Max open files            1048576              1048576              files","Max locked memory         8388608              8388608              bytes","Max address space         unlimited            unlimited            bytes","Max file locks            unlimited            unlimited            locks","Max pending signals       31968                31968                signals","Max msgqueue size         819200               819200               bytes","Max nice priority         0                    0","Max realtime priority     0                    0","Max realtime timeout      unlimited            unlimited            us"].join(`
`)}
`),Y(t,`${o}/io`,`rchar: 1048576
wchar: 65536
syscr: 512
syscw: 64
read_bytes: 0
write_bytes: 0
cancelled_write_bytes: 0
`),Y(t,`${o}/oom_score`,`0
`),Y(t,`${o}/oom_score_adj`,`0
`),Y(t,`${o}/loginuid`,`0
`),Y(t,`${o}/wchan`,`poll_schedule_timeout
`),Y(t,`${o}/schedstat`,`1000000 0 1
`);for(let l of["0","1","2"])k(t,`${o}/fd/${l}`,""),k(t,`${o}/fdinfo/${l}`,`pos:	0
flags:	0${l==="0"?"2":"1"}02
mnt_id:	13
`)}function d1(t,e){$(t,"/proc/boot"),k(t,"/proc/boot/log",`${[`[    0.000000] Linux version ${e.kernel} (fortune@build) #1 SMP PREEMPT_DYNAMIC`,"[    0.000000] Command line: console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1","[    0.000060] BIOS-provided physical RAM map:","[    0.000070] ACPI: RSDP 0x00000000000F05B0 000014 (v00 BOCHS )","[    0.000120] PCI: Using configuration type 1 for base access","[    0.000240] clocksource: tsc-early: mask: 0xffffffffffffffff","[    0.000320] ACPI: IRQ0 used by override","[    0.000420] Initializing cgroup subsys cpuset","[    0.000440] Initializing cgroup subsys cpu","[    0.000450] Initializing cgroup subsys cpuacct","[    0.000460] Linux agpgart interface v0.103","[    0.000480] PCI: pci_cache_line_size set to 64 bytes","[    0.000510] virtio-pci 0000:00:01.0: runtime IRQs not yet assigned","[    0.000680] NET: Registered PF_INET6 protocol family","[    0.000720] Freeing unused kernel image (initmem) memory","[    0.000760] Write protecting the kernel read-only data","[    0.000800] Run /sbin/init as init process","[    0.001200] systemd[1]: Detected virtualization kvm","[    0.001300] systemd[1]: Detected architecture x86-64","[    0.002000] systemd[1]: Starting Fortune GNU/Linux...","[    0.003000] systemd[1]: Started Journal Service","[    0.010000] EXT4-fs (vda): mounted filesystem","[    0.020000] systemd[1]: Reached target Basic System","[    0.030000] systemd[1]: Started Login Service"].join(`
`)}
`),k(t,"/proc/boot/version",`Linux ${e.kernel} (virtual)
`)}function kn(t,e,r,n,s=[],i,o){$(t,"/proc");let a=Math.floor((Date.now()-n)/1e3),c=Math.floor(a*.9);Y(t,"/proc/uptime",`${a}.00 ${c}.00
`);let l=Math.floor(Mt.totalmem()/1024),u=Math.floor(Mt.freemem()/1024),d=o?.ramCapBytes===void 0?null:Math.floor(o.ramCapBytes/1024),p=d===null?l:Math.min(l,d),f=d===null?u:Math.floor(p*(u/l)),m=Math.floor(f*.95),h=Math.floor(p*.03),g=Math.floor(p*.08),y=Math.floor(p*.005),S=Math.floor(p*.02),w=Math.floor(p*.001);Y(t,"/proc/meminfo",`${[`MemTotal:       ${String(p).padStart(10)} kB`,`MemFree:        ${String(f).padStart(10)} kB`,`MemAvailable:   ${String(m).padStart(10)} kB`,`Buffers:        ${String(h).padStart(10)} kB`,`Cached:         ${String(g).padStart(10)} kB`,`SwapCached:     ${String(0).padStart(10)} kB`,`Active:         ${String(Math.floor((h+g)*1.2)).padStart(10)} kB`,`Inactive:       ${String(Math.floor(g*.6)).padStart(10)} kB`,`Active(anon):   ${String(Math.floor(p*.001)).padStart(10)} kB`,`Inactive(anon): ${String(Math.floor(p*.006)).padStart(10)} kB`,`Active(file):   ${String(Math.floor(g*1.2)).padStart(10)} kB`,`Inactive(file): ${String(Math.floor(g*.6)).padStart(10)} kB`,`Unevictable:    ${String(0).padStart(10)} kB`,`Mlocked:        ${String(0).padStart(10)} kB`,`SwapTotal:      ${String(0).padStart(10)} kB`,`SwapFree:       ${String(0).padStart(10)} kB`,`Zswap:          ${String(0).padStart(10)} kB`,`Zswapped:       ${String(0).padStart(10)} kB`,`Dirty:          ${String(Math.floor(Math.random()*64)).padStart(10)} kB`,`Writeback:      ${String(0).padStart(10)} kB`,`AnonPages:      ${String(Math.floor(p*.001)).padStart(10)} kB`,`Mapped:         ${String(Math.floor(g*.4)).padStart(10)} kB`,`Shmem:          ${String(y).padStart(10)} kB`,`KReclaimable:   ${String(Math.floor(S*.6)).padStart(10)} kB`,`Slab:           ${String(S).padStart(10)} kB`,`SReclaimable:   ${String(Math.floor(S*.6)).padStart(10)} kB`,`SUnreclaim:     ${String(Math.floor(S*.4)).padStart(10)} kB`,`KernelStack:    ${String(Math.floor(p*5e-4)).padStart(10)} kB`,`PageTables:     ${String(w).padStart(10)} kB`,`NFS_Unstable:   ${String(0).padStart(10)} kB`,`Bounce:         ${String(0).padStart(10)} kB`,`WritebackTmp:   ${String(0).padStart(10)} kB`,`CommitLimit:    ${String(Math.floor(p*.5)).padStart(10)} kB`,`Committed_AS:   ${String(Math.floor(p*.05)).padStart(10)} kB`,`VmallocTotal:   ${String(35184372087808/1024).padStart(10)} kB`,`VmallocUsed:    ${String(Math.floor(p*.01)).padStart(10)} kB`,`VmallocChunk:   ${String(0).padStart(10)} kB`,`Percpu:         ${String(Math.floor(p*1e-4)).padStart(10)} kB`,`HardwareCorrupted:  ${String(0).padStart(6)} kB`,`AnonHugePages:  ${String(0).padStart(10)} kB`,`ShmemHugePages: ${String(0).padStart(10)} kB`,`ShmemPmdMapped: ${String(0).padStart(10)} kB`,`FileHugePages:  ${String(0).padStart(10)} kB`,`FilePmdMapped:  ${String(0).padStart(10)} kB`,`HugePages_Total:  ${String(0).padStart(8)}`,`HugePages_Free:   ${String(0).padStart(8)}`,`HugePages_Rsvd:   ${String(0).padStart(8)}`,`HugePages_Surp:   ${String(0).padStart(8)}`,`Hugepagesize:   ${String(2048).padStart(10)} kB`,`Hugetlb:        ${String(0).padStart(10)} kB`,`DirectMap4k:    ${String(Math.floor(p*.02)).padStart(10)} kB`,`DirectMap2M:    ${String(Math.floor(p*.98)).padStart(10)} kB`].join(`
`)}
`);let b=Mt.cpus(),N=o?.cpuCapCores===void 0?b.length:Math.min(o.cpuCapCores,b.length),I=b.slice(0,N),v=[];for(let pe=0;pe<I.length;pe++){let $e=I[pe];$e&&v.push(`processor	: ${pe}`,"vendor_id	: GenuineIntel","cpu family	: 6","model		: 85",`model name	: ${$e.model}`,"stepping	: 7","microcode	: 0x1",`cpu MHz		: ${$e.speed.toFixed(3)}`,"cache size	: 33792 KB","physical id	: 0",`siblings	: ${I.length}`,`core id		: ${pe}`,`cpu cores	: ${I.length}`,`apicid		: ${pe}`,`initial apicid	: ${pe}`,"fpu		: yes","fpu_exception	: yes","cpuid level	: 13","wp		: yes","flags		: fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology nonstop_tsc cpuid tsc_known_freq pni pclmulqdq ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hypervisor lahf_lm abm 3dnowprefetch cpuid_fault ssbd ibrs ibpb stibp ibrs_enhanced fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap clflushopt clwb avx512cd avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves arat umip avx512_vnni md_clear arch_capabilities","bugs		: spectre_v1 spectre_v2 spec_store_bypass swapgs taa mmio_stale_data retbleed eibrs_pbrsb bhi ibpb_no_ret spectre_v2_user its",`bogomips	: ${($e.speed*2/1e3).toFixed(2)}`,"clflush size	: 64","cache_alignment	: 64","address sizes	: 46 bits physical, 48 bits virtual","power management:","")}Y(t,"/proc/cpuinfo",`${v.join(`
`)}
`),Y(t,"/proc/version",`Linux version ${e.kernel} (fortune@nyx-build) (gcc (Fortune 13.3.0-nyx1) 13.3.0, GNU ld (GNU Binutils for Fortune) 2.42) #2 SMP PREEMPT_DYNAMIC
`),Y(t,"/proc/hostname",`${r}
`);let _=(Math.random()*.3).toFixed(2),x=1+s.length;Y(t,"/proc/loadavg",`${_} ${_} ${_} ${x}/${x} 1
`);let E=I.length,D=Math.floor(a*100),T=Math.floor(a*2),W=Math.floor(a*30),X=Math.floor(a*800),ee=Math.floor(a*5),P=Math.floor(Number(a)),A=Math.floor(a*2),C=Math.floor(a*0),O=D+T+W+X+ee+P+A+C,U=`cpu  ${D} ${T} ${W} ${X} ${ee} ${P} ${A} ${C} 0 0
`,Z=Array.from({length:E},(pe,$e)=>`cpu${$e} ${Math.floor(D/E)} ${Math.floor(T/E)} ${Math.floor(W/E)} ${Math.floor(X/E)} ${Math.floor(ee/E)} ${Math.floor(P/E)} ${Math.floor(A/E)} ${Math.floor(C/E)} 0 0`).join(`
`);Y(t,"/proc/stat",`${U}${Z}
intr ${Math.floor(O*2)} 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
ctxt ${Math.floor(O*50)}
btime ${Math.floor(n/1e3)}
processes ${x+10}
procs_running 1
procs_blocked 0
`);let J=Math.floor(O*.5),R=Math.floor(O*.3),V=0,z=0,G=Math.floor(O*2),F=G+Math.floor(O*.5),j=Math.floor(O*.01);Y(t,"/proc/vmstat",`nr_free_pages ${Math.floor(f/4)}
nr_zone_inactive_anon 0
nr_zone_active_anon 0
nr_zone_inactive_file ${Math.floor(g/4)}
nr_zone_active_file ${Math.floor(h/4)}
nr_zone_unevictable 0
nr_zone_write_pending 0
nr_mlock 0
nr_page_table_pages ${w}
nr_kernel_stack ${Math.floor(p*5e-4)}
nr_bounce 0
nr_zspages 0
nr_free_cma 0
numa_hit ${Math.floor(O*3)}
numa_miss 0
numa_foreign 0
numa_interleave 0
numa_local ${Math.floor(O*3)}
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
nr_anon_pages ${Math.floor(p*.001)}
nr_mapped ${Math.floor(g*.4)}
nr_file_pages ${Math.floor(g*.8)}
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
nr_dirtied ${Math.floor(O*2)}
nr_written ${Math.floor(O*2)}
nr_throttled_written 0
nr_kernel_misc_reclaimable 0
nr_reclaim_pages 0
nr_zone_active_anon 0
nr_zone_active_file ${Math.floor(h/4)}
pgpgin ${J}
pgpgout ${R}
pswpin ${V}
pswpout ${z}
pgalloc_dma 0
pgalloc_dma32 ${Math.floor(G*.3)}
pgalloc_normal ${Math.floor(G*.7)}
pgalloc_movable 0
pgfree ${G}
pgactivate ${Math.floor(O*.5)}
pgdeactivate 0
pgfault ${F}
pgmajfault ${j}
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

`),$(t,"/proc/pressure");let H=(Math.random()*.3).toFixed(2),q=(Math.random()*.2+.1).toFixed(2),ie=(Math.random()*.1+.05).toFixed(2),ne=Math.floor(O*10);Y(t,"/proc/pressure/cpu",`some avg10=${H} avg60=${q} avg300=${ie} total=${ne}
`),Y(t,"/proc/pressure/memory",`some avg10=${(Number(H)*.5).toFixed(2)} avg60=${(Number(q)*.3).toFixed(2)} avg300=${(Number(ie)*.2).toFixed(2)} total=${Math.floor(ne*.3)}
`),Y(t,"/proc/pressure/io",`some avg10=${(Number(H)*.7).toFixed(2)} avg60=${(Number(q)*.5).toFixed(2)} avg300=${(Number(ie)*.3).toFixed(2)} total=${Math.floor(ne*.5)}
`),Y(t,"/proc/modules",`${["virtio 163840 10 - Live 0x0000000000000000","virtio_ring 28672 10 virtio, Live 0x0000000000000000","virtio_blk 20480 10 - Live 0x0000000000000000","virtio_net 57344 10 - Live 0x0000000000000000","virtio_console 28672 10 - Live 0x0000000000000000","virtio_pci 24576 10 - Live 0x0000000000000000","virtio_pci_legacy_dev 12288 1 virtio_pci, Live 0x0000000000000000","virtio_pci_modern_dev 16384 1 virtio_pci, Live 0x0000000000000000","ext4 847872 10 - Live 0x0000000000000000","jbd2 131072 1 ext4, Live 0x0000000000000000","mbcache 16384 1 ext4, Live 0x0000000000000000","fuse 172032 10 - Live 0x0000000000000000","overlay 131072 10 - Live 0x0000000000000000","nf_tables 188416 10 - Live 0x0000000000000000","tun 49152 10 - Live 0x0000000000000000","bridge 286720 10 - Live 0x0000000000000000","dm_mod 155648 10 - Live 0x0000000000000000","crc32c_intel 24576 10 - Live 0x0000000000000000"].join(`
`)}
`),Y(t,"/proc/cmdline",`console=ttyS0 reboot=k panic=1 nomodule random.trust_cpu=1 ipv6.disable=1 swiotlb=noforce rdinit=/process_api init_on_free=1
`),Y(t,"/proc/filesystems",`${["nodev	sysfs","nodev	tmpfs","nodev	bdev","nodev	proc","nodev	cgroup","nodev	cgroup2","nodev	cpuset","nodev	devtmpfs","nodev	binfmt_misc","nodev	debugfs","nodev	securityfs","nodev	sockfs","nodev	bpf","nodev	pipefs","nodev	ramfs","nodev	hugetlbfs","nodev	rpc_pipefs","nodev	devpts","	ext3","	ext2","	ext4","	squashfs","nodev	nfs","nodev	nfs4","nodev	autofs","	fuseblk","nodev	fuse","nodev	fusectl","nodev	overlay","	xfs","nodev	mqueue","nodev	selinuxfs","nodev	pstore"].join(`
`)}
`);let xe=`${["proc /proc proc rw,relatime 0 0","sysfs /sys sysfs rw,relatime 0 0","devtmpfs /dev devtmpfs rw,relatime,size=2045672k,nr_inodes=511418,mode=755 0 0","tmpfs /dev/shm tmpfs rw,relatime 0 0","devpts /dev/pts devpts rw,relatime,mode=600,ptmxmode=000 0 0","tmpfs /sys/fs/cgroup tmpfs rw,relatime 0 0","cgroup /sys/fs/cgroup/cpu cgroup rw,relatime,cpu 0 0","cgroup /sys/fs/cgroup/cpuacct cgroup rw,relatime,cpuacct 0 0","cgroup /sys/fs/cgroup/memory cgroup rw,relatime,memory 0 0","cgroup /sys/fs/cgroup/devices cgroup rw,relatime,devices 0 0","cgroup /sys/fs/cgroup/freezer cgroup rw,relatime,freezer 0 0","cgroup /sys/fs/cgroup/blkio cgroup rw,relatime,blkio 0 0","cgroup /sys/fs/cgroup/pids cgroup rw,relatime,pids 0 0","cgroup2 /sys/fs/cgroup/unified cgroup2 rw,relatime 0 0","/dev/vda / ext4 rw,relatime,resuid=65534,resgid=65534 0 0","/dev/vdb /opt/rclone squashfs ro,relatime,errors=continue 0 0","tmpfs /run tmpfs rw,nosuid,nodev,noexec,relatime,size=204800k,mode=755 0 0","tmpfs /tmp tmpfs rw,nosuid,nodev,noatime 0 0"].join(`
`)}
`;if(Y(t,"/proc/mounts",xe),$(t,"/proc/self"),Y(t,"/proc/self/mounts",xe),$(t,"/proc/net"),i){let pe=i.getInterfaces(),$e=i.getRoutes(),Qe=i.getArpCache(),st=Ce=>Ce.split(".").reverse().map(it=>Number.parseInt(it,10).toString(16).padStart(2,"0")).join("").toUpperCase(),kt=`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed`,tt=pe.map(Ce=>{let it=Ce.name.padStart(4);if(Ce.name==="lo")return`${it}:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0`;let sr=Math.floor(Math.random()*2e5),en=Math.floor(Math.random()*2e3),Ys=Math.floor(Math.random()*5e7),ft=Math.floor(Math.random()*3e3);return`${it}: ${String(sr).padStart(8)} ${String(en).padStart(7)}    0    0    0     0          0         0 ${String(Ys).padStart(9)} ${String(ft).padStart(7)}    0    0    0     0       0          0`});Y(t,"/proc/net/dev",`${kt}
${tt.join(`
`)}
`);let wr=$e.map(Ce=>[Ce.device,st(Ce.destination==="default"?"0.0.0.0":Ce.destination),st(Ce.gateway),Ce.flags==="UG"?"0003":Ce.flags==="U"?"0001":"0000","0","0","100",st(Ce.netmask),"0","0","0"].join("	"));Y(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
${wr.join(`
`)}
`);let Nt=Qe.map(Ce=>`${Ce.ip.padEnd(15)} 0x1         0x2         ${Ce.mac.padEnd(17)}     *        ${Ce.device}`);Y(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
${Nt.join(`
`)}
`)}else Y(t,"/proc/net/dev",`Inter-|   Receive                                                |  Transmit
 face |bytes    packets errs drop fifo frame compressed multicast|bytes    packets errs drop fifo colls carrier compressed
    lo:       0       0    0    0    0     0          0         0        0       0    0    0    0     0       0          0
  eth0:  128628    1230    0   19    0     0          0         0 52027469    2045    0    0    0     0       0          0
`),Y(t,"/proc/net/route",`Iface	Destination	Gateway	Flags	RefCnt	Use	Metric	Mask		MTU	Window	IRTT
eth0	00000000	0101A8C0	0003	0	0	100	00000000	0	0	0
eth0	0000A8C0	00000000	0001	0	0	100	00FFFFFF	0	0	0
`),Y(t,"/proc/net/arp",`IP address       HW type     Flags       HW address            Mask     Device
`);Y(t,"/proc/net/if_inet6","");let Ge=["   0: 00000000:0016 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10000 1 0000000000000000 100 0 0 10 0","   1: 00000000:022D 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10001 1 0000000000000000 100 0 0 10 0","   2: 00000000:0A8C 00000000:0000 0A 00000000:00000000 00:00000000 00000000     0        0 10002 1 0000000000000000 100 0 0 10 0"].join(`
`);Y(t,"/proc/net/tcp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
${Ge}
`),Y(t,"/proc/net/tcp6",`  sl  local_address                         remote_address                        st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),Y(t,"/proc/net/udp",`  sl  local_address rem_address   st tx_queue rx_queue tr tm->when retrnsmt   uid  timeout inode
`),Y(t,"/proc/net/fib_trie",`Local:
  +-- 0.0.0.0/0 3 0 5
`),Y(t,"/proc/net/unix",`Num       RefCount Protocol Flags    Type St Inode Path
0000000000000000: 00000002 00000000 00010000 0001 01 10000 /run/dbus/system_bus_socket
`),Y(t,"/proc/net/sockstat",`sockets: used 11
TCP: inuse 3 orphan 0 tw 0 alloc 3 mem 1024
UDP: inuse 0 mem 0
UDPLITE: inuse 0
RAW: inuse 0
FRAG: inuse 0 memory 0
`),Y(t,"/proc/partitions",`${["major minor  #blocks  name",""," 254        0 268435456 vda"," 254       16      9664 vdb"," 254       32       656 vdc"," 254       48      5464 vdd"].join(`
`)}
`),Y(t,"/proc/swaps",`Filename				Type		Size		Used		Priority
`),Y(t,"/proc/diskstats",`${[" 254       0 vda 1000 0 8000 500 200 0 1600 100 0 600 600 0 0 0 0"," 254      16 vdb 100 0 800 50 0 0 0 0 0 50 50 0 0 0 0"," 254      32 vdc 50 0 400 25 0 0 0 0 0 25 25 0 0 0 0"," 254      48 vdd 80 0 640 40 0 0 0 0 0 40 40 0 0 0 0"].join(`
`)}
`),Y(t,"/proc/interrupts",`           CPU0
  0:         ${Math.floor(a*250)}  IO-APIC   2-edge   timer
  1:             9  IO-APIC   1-edge   i8042
 NMI:             0  Non-maskable interrupts
 ERR:             0
 MIS:             0
 PIN:             0  Posted-interrupt notification event
 NPI:             0  Nested posted-interrupt event
 PIW:             0  Posted-interrupt wakeup event
`),$(t,"/proc/sys"),$(t,"/proc/sys/kernel"),$(t,"/proc/sys/net"),$(t,"/proc/sys/net/ipv4"),$(t,"/proc/sys/net/ipv6"),$(t,"/proc/sys/net/core"),$(t,"/proc/sys/vm"),$(t,"/proc/sys/fs"),$(t,"/proc/sys/fs/inotify"),Y(t,"/proc/sys/kernel/hostname",`${r}
`),Y(t,"/proc/sys/kernel/ostype",`Linux
`),Y(t,"/proc/sys/kernel/osrelease",`${e.kernel}
`),Y(t,"/proc/sys/kernel/pid_max",`32768
`),Y(t,"/proc/sys/kernel/threads-max",`31968
`),Y(t,"/proc/sys/kernel/randomize_va_space",`2
`),Y(t,"/proc/sys/kernel/dmesg_restrict",`0
`),Y(t,"/proc/sys/kernel/kptr_restrict",`0
`),Y(t,"/proc/sys/kernel/perf_event_paranoid",`2
`),Y(t,"/proc/sys/kernel/printk",`4	4	1	7
`),Y(t,"/proc/sys/kernel/sysrq",`176
`),Y(t,"/proc/sys/kernel/panic",`1
`),Y(t,"/proc/sys/kernel/panic_on_oops",`1
`),Y(t,"/proc/sys/kernel/core_pattern",`core
`),Y(t,"/proc/sys/kernel/core_uses_pid",`0
`),Y(t,"/proc/sys/kernel/ngroups_max",`65536
`),Y(t,"/proc/sys/kernel/cap_last_cap",`40
`),Y(t,"/proc/sys/kernel/unprivileged_userns_clone",`1
`),Y(t,"/proc/sys/kernel/cpu_cap_cores",`${o?.cpuCapCores??0}
`),Y(t,"/proc/sys/net/ipv4/ip_forward",`0
`),Y(t,"/proc/sys/net/ipv4/tcp_syncookies",`1
`),Y(t,"/proc/sys/net/ipv4/tcp_fin_timeout",`60
`),Y(t,"/proc/sys/net/ipv4/tcp_keepalive_time",`7200
`),Y(t,"/proc/sys/net/ipv4/conf/all/rp_filter",`2
`),Y(t,"/proc/sys/net/ipv6/conf/all/disable_ipv6",`1
`),Y(t,"/proc/sys/net/core/somaxconn",`4096
`),Y(t,"/proc/sys/net/core/rmem_max",`212992
`),Y(t,"/proc/sys/net/core/wmem_max",`212992
`),Y(t,"/proc/sys/vm/swappiness",`60
`),Y(t,"/proc/sys/vm/overcommit_memory",`0
`),Y(t,"/proc/sys/vm/overcommit_ratio",`50
`),Y(t,"/proc/sys/vm/dirty_ratio",`20
`),Y(t,"/proc/sys/vm/dirty_background_ratio",`10
`),Y(t,"/proc/sys/vm/min_free_kbytes",`65536
`),Y(t,"/proc/sys/vm/vfs_cache_pressure",`100
`),Y(t,"/proc/sys/vm/ram_cap_bytes",`${o?.ramCapBytes??0}
`),Y(t,"/proc/sys/fs/file-max",`1048576
`),Y(t,"/proc/sys/fs/inotify/max_user_watches",`524288
`),Y(t,"/proc/sys/fs/inotify/max_user_instances",`512
`),Y(t,"/proc/sys/fs/inotify/max_queued_events",`16384
`);let Pe=o?.ramCapBytes??Mt.totalmem(),De=o?.cpuCapCores===void 0?-1:o.cpuCapCores*1e5;$(t,"/sys/fs/cgroup/memory"),Y(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${Pe}
`),Y(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${Pe-Mt.freemem()}
`),Y(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${Pe}
`),$(t,"/sys/fs/cgroup/cpu"),Y(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),Y(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",`${De}
`),Y(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),Y(t,"/proc/cgroups",`${["#subsys_name	hierarchy	num_cgroups	enabled","cpuset	5	1	1","cpu	1	1	1","cpuacct	2	1	1","blkio	6	1	1","memory	3	1	1","devices	4	1	1","freezer	7	1	1","pids	8	1	1"].join(`
`)}
`),yh(t,1,"root","/sbin/init",new Date(n).toISOString(),{});for(let pe of s){let $e=gh(pe.tty);yh(t,$e,pe.username,"bash",pe.startedAt,{USER:pe.username,HOME:`/home/${pe.username}`,TERM:"xterm-256color",SHELL:"/bin/bash",LANG:"en_US.UTF-8",PATH:"/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",LOGNAME:pe.username})}let St=s[s.length-1],Je=St===void 0?1:gh(St.tty);try{t.remove("/proc/self")}catch{}let Fe=`/proc/${Je}`;if($(t,"/proc/self"),$(t,"/proc/self/fd"),$(t,"/proc/self/fdinfo"),$(t,"/proc/self/net"),t.exists(Fe))for(let pe of t.list(Fe)){let $e=`${Fe}/${pe}`,Qe=`/proc/self/${pe}`;try{t.stat($e).type==="file"&&Y(t,Qe,t.readFile($e))}catch{}}else Y(t,"/proc/self/cmdline","bash\0"),Y(t,"/proc/self/comm","bash"),Y(t,"/proc/self/status",`Name:	bash
State:	S (sleeping)
Pid:	1
PPid:	0
`),Y(t,"/proc/self/environ",""),Y(t,"/proc/self/cwd","/root\0"),Y(t,"/proc/self/exe","/bin/bash\0")}function p1(t,e,r,n){$(t,"/sys"),$(t,"/sys/devices"),$(t,"/sys/devices/virtual"),$(t,"/sys/devices/system"),$(t,"/sys/devices/system/cpu"),$(t,"/sys/devices/system/cpu/cpu0"),k(t,"/sys/devices/system/cpu/cpu0/online",`1
`),k(t,"/sys/devices/system/cpu/online",`0
`),k(t,"/sys/devices/system/cpu/possible",`0
`),k(t,"/sys/devices/system/cpu/present",`0
`),$(t,"/sys/devices/system/node"),$(t,"/sys/devices/system/node/node0"),k(t,"/sys/devices/system/node/node0/cpumap",`1
`),$(t,"/sys/class"),$(t,"/sys/class/net"),$(t,"/sys/class/net/eth0"),k(t,"/sys/class/net/eth0/operstate",`up
`),k(t,"/sys/class/net/eth0/carrier",`1
`),k(t,"/sys/class/net/eth0/mtu",`1500
`),k(t,"/sys/class/net/eth0/speed",`10000
`),k(t,"/sys/class/net/eth0/duplex",`full
`),k(t,"/sys/class/net/eth0/address",`aa:bb:cc:dd:ee:ff
`),k(t,"/sys/class/net/eth0/tx_queue_len",`1000
`);let s=l1(e),i=s.toString(16).padStart(8,"0");k(t,"/sys/class/net/eth0/address",`52:54:00:${i.slice(0,2)}:${i.slice(2,4)}:${i.slice(4,6)}
`),$(t,"/sys/class/net/lo"),k(t,"/sys/class/net/lo/operstate",`unknown
`),k(t,"/sys/class/net/lo/carrier",`1
`),k(t,"/sys/class/net/lo/mtu",`65536
`),k(t,"/sys/class/net/lo/address",`00:00:00:00:00:00
`),$(t,"/sys/class/block"),$(t,"/sys/class/block/vda"),k(t,"/sys/class/block/vda/size",`536870912
`),k(t,"/sys/class/block/vda/ro",`0
`),k(t,"/sys/class/block/vda/removable",`0
`),$(t,"/sys/fs"),$(t,"/sys/fs/cgroup");for(let l of["cpu","cpuacct","memory","devices","blkio","pids","freezer","unified"])$(t,`/sys/fs/cgroup/${l}`),l!=="unified"&&(k(t,`/sys/fs/cgroup/${l}/tasks`,`1
`),k(t,`/sys/fs/cgroup/${l}/notify_on_release`,`0
`),k(t,`/sys/fs/cgroup/${l}/release_agent`,""));let o=n?.ramCapBytes??Mt.totalmem();k(t,"/sys/fs/cgroup/memory/memory.limit_in_bytes",`${o}
`),k(t,"/sys/fs/cgroup/memory/memory.usage_in_bytes",`${o-Mt.freemem()}
`),k(t,"/sys/fs/cgroup/memory/memory.memsw.limit_in_bytes",`${o}
`),k(t,"/sys/fs/cgroup/cpu/cpu.cfs_period_us",`100000
`),k(t,"/sys/fs/cgroup/cpu/cpu.cfs_quota_us",n?.cpuCapCores===void 0?`-1
`:`${n.cpuCapCores*1e5}
`),k(t,"/sys/fs/cgroup/cpu/cpu.shares",`1024
`),$(t,"/sys/kernel"),k(t,"/sys/kernel/hostname",`${e}
`),k(t,"/sys/kernel/osrelease",`${r.kernel}
`),k(t,"/sys/kernel/ostype",`Linux
`),$(t,"/sys/kernel/security"),$(t,"/sys/devices/virtual"),$(t,"/sys/devices/virtual/dmi"),$(t,"/sys/devices/virtual/dmi/id");let a=`VirtualNode-${(s%1e4).toString().padStart(4,"0")}`,c={bios_vendor:"Virtual BIOS",bios_version:"1.0",bios_date:"01/01/2025",sys_vendor:"Fortune Systems",product_name:a,product_family:"VirtualContainer",product_version:"v1",product_uuid:`${s.toString(16).padStart(8,"0")}-0000-0000-0000-000000000000`,product_serial:`SN-${s}`,chassis_type:"3",chassis_vendor:"Virtual",chassis_version:"v1",board_name:"fortune-board",modalias:`dmi:bvnVirtual:bvr1.0:svnFortune:pn${a}`};for(let[l,u]of Object.entries(c))k(t,`/sys/devices/virtual/dmi/id/${l}`,`${u}
`);$(t,"/sys/class"),$(t,"/sys/class/net"),$(t,"/sys/kernel"),k(t,"/sys/kernel/hostname",`${e}
`),k(t,"/sys/kernel/osrelease",`${r.kernel}
`),k(t,"/sys/kernel/ostype",`Linux
`)}function f1(t){$(t,"/dev"),t.mknod("/dev/null","null",438,1,3),t.mknod("/dev/zero","zero",438,1,5),t.mknod("/dev/full","full",438,1,7),t.mknod("/dev/random","random",292,1,8),t.mknod("/dev/urandom","urandom",292,1,9),t.mknod("/dev/tty","tty",438,5,0),t.mknod("/dev/console","console",384,5,1),t.mknod("/dev/ptmx","ptmx",438,5,2),t.mknod("/dev/stdin","stdin",438,0,0),t.mknod("/dev/stdout","stdout",438,1,0),t.mknod("/dev/stderr","stderr",438,2,0),k(t,"/dev/mem","",416),k(t,"/dev/port","",416),k(t,"/dev/kmsg","",432),k(t,"/dev/hwrng","",432),k(t,"/dev/fuse","",432),k(t,"/dev/autofs","",432),k(t,"/dev/userfaultfd","",432),k(t,"/dev/cpu_dma_latency","",432),k(t,"/dev/ptp0","",432),k(t,"/dev/snapshot","",432),k(t,"/dev/ttyS0","",432);for(let e=0;e<=63;e++)k(t,`/dev/tty${e}`,"",400);k(t,"/dev/vcs","",400),k(t,"/dev/vcs1","",400),k(t,"/dev/vcsa","",400),k(t,"/dev/vcsa1","",400),k(t,"/dev/vcsu","",400),k(t,"/dev/vcsu1","",400);for(let e=0;e<8;e++)k(t,`/dev/loop${e}`,"",432);$(t,"/dev/loop-control"),k(t,"/dev/vda","",432),k(t,"/dev/vdb","",432),k(t,"/dev/vdc","",432),k(t,"/dev/vdd","",432),$(t,"/dev/net"),k(t,"/dev/net/tun","",432),$(t,"/dev/pts"),$(t,"/dev/shm"),$(t,"/dev/cpu"),$(t,"/dev/fd"),k(t,"/dev/vga_arbiter","",432),k(t,"/dev/vsock","",432)}function m1(t){$(t,"/usr"),$(t,"/usr/bin"),$(t,"/usr/sbin"),$(t,"/usr/local"),$(t,"/usr/local/bin"),$(t,"/usr/local/lib"),$(t,"/usr/local/share"),$(t,"/usr/local/include"),$(t,"/usr/local/sbin"),$(t,"/usr/share"),$(t,"/usr/share/doc"),$(t,"/usr/share/man"),$(t,"/usr/share/man/man1"),$(t,"/usr/share/man/man5"),$(t,"/usr/share/man/man8"),$(t,"/usr/share/common-licenses"),$(t,"/usr/share/ca-certificates"),$(t,"/usr/share/zoneinfo"),$(t,"/usr/lib"),$(t,"/usr/lib/x86_64-linux-gnu"),$(t,"/usr/lib/python3"),$(t,"/usr/lib/python3/dist-packages"),$(t,"/usr/lib/python3.12"),$(t,"/usr/lib/jvm"),$(t,"/usr/lib/jvm/java-21-openjdk-amd64"),$(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin"),$(t,"/usr/lib/node_modules"),$(t,"/usr/lib/node_modules/npm"),$(t,"/usr/include"),$(t,"/usr/src");let e=["sh","bash","ls","cat","echo","grep","find","sort","head","tail","cut","tr","sed","awk","wc","tee","tar","gzip","gunzip","touch","mkdir","rm","mv","cp","chmod","ln","pwd","env","date","sleep","id","whoami","hostname","uname","ps","kill","df","du","curl","wget","nano","diff","uniq","xargs","base64"];for(let n of e)k(t,`/usr/bin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);let r=["nologin","useradd","userdel","groupadd","groupdel","adduser","deluser","shutdown","reboot","halt","init","service","update-alternatives","update-rc.d","depmod","modprobe","insmod","rmmod","lsmod","ifconfig","route","iptables","ip6tables","arp","iwconfig","ethtool","fdisk","parted","mkfs.ext4","fsck","ldconfig","ldconfig.real"];for(let n of r)k(t,`/usr/sbin/${n}`,`#!/bin/sh
exec builtin ${n} "$@"
`,493);k(t,"/usr/bin/python3.12",`#!/bin/sh
exec python3 "$@"
`,493),k(t,"/usr/bin/python3",`#!/bin/sh
exec python3.12 "$@"
`,493),k(t,"/usr/bin/node",`#!/bin/sh
exec node "$@"
`,493),k(t,"/usr/bin/npm",`#!/bin/sh
exec npm "$@"
`,493),k(t,"/usr/bin/npx",`#!/bin/sh
exec npx "$@"
`,493),k(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/java",`#!/bin/sh
exec java "$@"
`,493),k(t,"/usr/lib/jvm/java-21-openjdk-amd64/bin/javac",`#!/bin/sh
exec javac "$@"
`,493),k(t,"/usr/share/common-licenses/GPL-2",`GNU General Public License v2
`),k(t,"/usr/share/common-licenses/GPL-3",`GNU General Public License v3
`),k(t,"/usr/share/common-licenses/LGPL-2.1",`GNU Lesser General Public License v2.1
`),k(t,"/usr/share/common-licenses/Apache-2.0",`Apache License 2.0
`),k(t,"/usr/share/common-licenses/MIT",`MIT License
`)}var h1=`Package: bash
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

`;function g1(t){$(t,"/var"),$(t,"/var/log"),$(t,"/var/log/apt"),$(t,"/var/log/journal"),$(t,"/var/log/private"),$(t,"/var/tmp"),$(t,"/var/cache"),$(t,"/var/cache/apt"),$(t,"/var/cache/apt/archives"),$(t,"/var/cache/apt/archives/partial"),$(t,"/var/cache/debconf"),$(t,"/var/cache/ldconfig"),$(t,"/var/cache/fontconfig"),$(t,"/var/cache/PackageKit"),$(t,"/var/lib"),$(t,"/var/lib/apt"),$(t,"/var/lib/apt/lists"),$(t,"/var/lib/apt/lists/partial"),$(t,"/var/lib/dpkg"),$(t,"/var/lib/dpkg/info"),$(t,"/var/lib/dpkg/updates"),$(t,"/var/lib/dpkg/alternatives"),$(t,"/var/lib/misc"),$(t,"/var/lib/systemd"),$(t,"/var/lib/systemd/coredump"),$(t,"/var/lib/pam"),$(t,"/var/lib/git"),$(t,"/var/lib/PackageKit"),$(t,"/var/lib/python"),$(t,"/var/spool"),$(t,"/var/spool/cron"),$(t,"/var/spool/mail"),$(t,"/var/mail"),$(t,"/var/backups"),$(t,"/var/www"),k(t,"/var/lib/dpkg/status",h1),k(t,"/var/lib/dpkg/available",""),k(t,"/var/lib/dpkg/lock",""),k(t,"/var/lib/dpkg/lock-frontend",""),k(t,"/var/lib/apt/lists/lock",""),k(t,"/var/cache/apt/pkgcache.bin",""),k(t,"/var/cache/apt/srcpkgcache.bin",""),k(t,"/var/log/syslog",`${new Date().toUTCString()}  kernel: Virtual container started
`),k(t,"/var/log/auth.log",""),k(t,"/var/log/kern.log",""),k(t,"/var/log/dpkg.log",""),k(t,"/var/log/apt/history.log",""),k(t,"/var/log/apt/term.log",""),k(t,"/var/log/faillog",""),k(t,"/var/log/lastlog",""),k(t,"/var/log/wtmp",""),k(t,"/var/log/btmp",""),k(t,"/var/log/alternatives.log",""),$(t,"/run"),$(t,"/run/lock"),$(t,"/run/lock/subsys"),$(t,"/run/systemd"),$(t,"/run/systemd/ask-password"),$(t,"/run/systemd/sessions"),$(t,"/run/systemd/users"),$(t,"/run/user"),$(t,"/run/dbus"),$(t,"/run/adduser"),k(t,"/run/utmp",""),k(t,"/run/dbus/system_bus_socket","")}function y1(t){t.exists("/bin")||t.symlink("/usr/bin","/bin"),t.exists("/sbin")||t.symlink("/usr/sbin","/sbin"),t.exists("/var/run")||t.symlink("/run","/var/run"),$(t,"/lib"),$(t,"/lib64"),$(t,"/lib/x86_64-linux-gnu"),$(t,"/lib/modules"),t.exists("/lib64/ld-linux-x86-64.so.2")||k(t,"/lib64/ld-linux-x86-64.so.2","",493)}function S1(t){$(t,"/tmp",1023),$(t,"/tmp/node-compile-cache",1023)}function b1(t){$(t,"/root",448),$(t,"/root/.ssh",448),$(t,"/root/.config",493),$(t,"/root/.config/pip",493),$(t,"/root/.local",493),$(t,"/root/.local/share",493),k(t,"/root/.bashrc",`${["# root .bashrc","export PS1='\\[\\e[37m\\][\\[\\e[31;1m\\]\\u\\[\\e[37m\\]@\\[\\e[34;1m\\]\\h\\[\\e[0m\\] \\W\\[\\e[37m\\]]\\[\\e[31;1m\\]\\$\\[\\e[0m\\] '","export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","export LANG=en_US.UTF-8","alias ll='ls -la'","alias la='ls -A'","alias l='ls -CF'"].join(`
`)}
`),k(t,"/root/.profile",`[ -f ~/.bashrc ] && . ~/.bashrc
`),k(t,"/root/.bash_logout",`# ~/.bash_logout
`),k(t,"/root/.config/pip/pip.conf",`[global]
break-system-packages = true
`)}function _1(t,e){$(t,"/opt"),$(t,"/opt/rclone"),$(t,"/srv"),$(t,"/mnt"),$(t,"/media"),$(t,"/boot"),$(t,"/boot/grub"),k(t,"/boot/grub/grub.cfg",`${["# GRUB configuration (virtual)","set default=0","set timeout=0","",'menuentry "Fortune GNU/Linux 1.0 Nyx" {',`  linux   /vmlinuz-${e.kernel} root=/dev/vda rw console=ttyS0`,`  initrd  /initrd.img-${e.kernel}`,"}"].join(`
`)}
`);let r=e.kernel,n=`# Fortune GNU/Linux kernel ${r}
# Compressed Linux/x86_64 kernel image
# Build: fortune@nyx-build, gcc (Fortune 13.3.0-nyx1)
# SMP PREEMPT_DYNAMIC, virtio, kvm_guest
`.padEnd(10240,"x");k(t,`/boot/vmlinuz-${r}`,n,420),k(t,`/boot/initrd.img-${r}`,`${["#!/bin/sh","# Fortune GNU/Linux initramfs",`# Kernel: ${r}`,"mount -t proc none /proc","mount -t sysfs none /sys","mount -t devtmpfs none /dev","echo 'Loading Fortune GNU/Linux 1.0 Nyx...'","exec /sbin/init"].join(`
`)}
`,420),k(t,`/boot/System.map-${r}`,`${["ffffffff81000000 T _stext","ffffffff81000000 T _text","ffffffff81000000 A startup_64","ffffffff81000100 T secondary_startup_64","ffffffff81000200 T __startup_64","ffffffff81001000 T x86_64_start_kernel","ffffffff81001100 T x86_64_start_reservations","ffffffff81001200 T start_kernel","ffffffff81002000 T init_task","ffffffff81003000 T rest_init","ffffffff81004000 T kernel_init","ffffffff81005000 T kernel_init_freeable","ffffffff81006000 T do_basic_setup","ffffffffa0000000 T virtio_init","ffffffffa0001000 T virtio_devices_init","ffffffffa0010000 T virtio_blk_init","ffffffffa0020000 T virtio_net_init","ffffffffa00f0000 T fortitude_init"].join(`
`)}
`,420),k(t,`/boot/config-${r}`,`${["#","# Linux/x86_64 6.1.0-fortune Kernel Configuration","# Fortune GNU/Linux 1.0 Nyx","#","CONFIG_64BIT=y","CONFIG_X86_64=y","CONFIG_SMP=y","CONFIG_PREEMPT=y","CONFIG_PREEMPT_DYNAMIC=y","","#","# Virtualization","#","CONFIG_HYPERVISOR_GUEST=y","CONFIG_KVM_GUEST=y","CONFIG_PARAVIRT=y","CONFIG_PARAVIRT_SPINLOCKS=y","","#","# Virtio","#","CONFIG_VIRTIO=y","CONFIG_VIRTIO_MENU=y","CONFIG_VIRTIO_BLK=y","CONFIG_VIRTIO_NET=y","CONFIG_VIRTIO_CONSOLE=y","CONFIG_VIRTIO_BALLOON=y","CONFIG_VIRTIO_MMIO=y","CONFIG_VIRTIO_INPUT=y","","#","# Block devices","#","CONFIG_BLK_DEV=y","CONFIG_EXT4_FS=y","CONFIG_TMPFS=y","CONFIG_TMPFS_XATTR=y","","#","# Networking","#","CONFIG_NET=y","CONFIG_INET=y","CONFIG_IPV6=n","CONFIG_BRIDGE=m","CONFIG_NETFILTER=y","CONFIG_NETFILTER_XTABLES=y","","#","# Console","#","CONFIG_SERIAL_8250=y","CONFIG_SERIAL_8250_CONSOLE=y","CONFIG_VT=y","CONFIG_VT_CONSOLE=y","CONFIG_HW_CONSOLE=y","","#","# Security","#","CONFIG_SECURITY=y","CONFIG_SECURITY_NETWORK=y",'CONFIG_LSM="lockdown,yama,loadpin,safesetid,integrity"',"","#","# Virtual file system","#","CONFIG_PROC_FS=y","CONFIG_SYSFS=y","CONFIG_DEVTMPFS=y","CONFIG_DEVTMPFS_MOUNT=y","CONFIG_CONFIGFS_FS=y","CONFIG_DEBUG_FS=y"].join(`
`)}
`,420);let s="1.0.0+itsrealfortune+0-amd64";t.exists("/vmlinuz")||t.symlink(`/boot/vmlinuz-${r}`,"/vmlinuz"),t.exists("/vmlinuz.old")||t.symlink(`/boot/vmlinuz-${s}`,"/vmlinuz.old"),t.exists("/initrd.img")||t.symlink(`/boot/initrd.img-${r}`,"/initrd.img"),t.exists("/initrd.img.old")||t.symlink(`/boot/initrd.img-${s}`,"/initrd.img.old"),$(t,"/lost+found",448),$(t,"/home")}var Sh=new Map;function v1(t,e){return`${t}|${e.kernel}|${e.os}|${e.arch}`}function w1(t,e){let r=v1(t,e),n=Sh.get(r);if(n)return n;let s=new Ls({mode:"memory"});u1(s,t,e),p1(s,t,e),f1(s),m1(s),g1(s),y1(s),S1(s),_1(s,e),d1(s,e);let i=s.encodeBinary();return Sh.set(r,i),i}function bh(t,e,r,n,s,i=[],o,a){let c=w1(r,n);t.getMode()==="fs"&&t.exists("/home")?t.mergeRootTree(Jt(c)):t.importRootTree(Jt(c)),b1(t),kn(t,n,r,s,i,o,a),Io(t,e)}Ui();ki();Zs();import{createHash as vh,randomBytes as x1,randomUUID as C1,scryptSync as I1,timingSafeEqual as P1}from"node:crypto";import{EventEmitter as E1}from"node:events";import*as xh from"node:path";var Us=class t{constructor(e){this._vfs=e}_vfs;_groupsPath="/etc/group";_groups=new Map;_nextGid=2e3;initialize(){this._loadFromVfs(),this._ensureSystemGroups()}createGroup(e,r){if(t._validateGroupName(e),this._groups.has(e))throw new Error(`groupadd: group '${e}' already exists`);let n=r??this._nextGid++;r!==void 0&&r>=this._nextGid&&(this._nextGid=r+1);let s={name:e,gid:n,members:[]};return this._groups.set(e,s),this._persist(),s}deleteGroup(e){if(!this._groups.has(e))throw new Error(`groupdel: group '${e}' does not exist`);this._groups.delete(e),this._persist()}addMember(e,r){let n=this._groups.get(e);if(!n)throw new Error(`gpasswd: group '${e}' does not exist`);n.members.includes(r)||(n.members.push(r),this._persist())}removeMember(e,r){let n=this._groups.get(e);if(!n)throw new Error(`gpasswd: group '${e}' does not exist`);n.members=n.members.filter(s=>s!==r),this._persist()}getGroup(e){return this._groups.get(e)}getGroupByGid(e){for(let r of this._groups.values())if(r.gid===e)return r}getGidByName(e){return this._groups.get(e)?.gid??null}getNameByGid(e){for(let r of this._groups.values())if(r.gid===e)return r.name;return null}getMembers(e){return this._groups.get(e)?.members??[]}getUserSupplementaryGroups(e){let r=[];for(let n of this._groups.values())n.members.includes(e)&&r.push(n.name);return r}getUserAllGroups(e,r){let n=new Set,s=this.getGroupByGid(r);s&&n.add(s.name);for(let i of this._groups.values())i.members.includes(e)&&n.add(i.name);return Array.from(n).sort()}isMemberOf(e,r,n){let s=this._groups.get(r);return s?s.gid===n?!0:s.members.includes(e):!1}listGroups(){return Array.from(this._groups.values()).sort((e,r)=>e.name.localeCompare(r.name))}generateGroupFile(){return this.listGroups().map(e=>`${e.name}:x:${e.gid}:${e.members.join(",")}`).join(`
`)}_persist(){let e=this.generateGroupFile();this._vfs.writeFile(this._groupsPath,e.length>0?`${e}
`:"",{mode:420})}_loadFromVfs(){if(this._groups.clear(),!this._vfs.exists(this._groupsPath))return;let e=this._vfs.readFile(this._groupsPath);for(let r of e.split(`
`)){let n=r.trim();if(n.length===0||n.startsWith("#"))continue;let s=n.split(":");if(s.length<4)continue;let[i,o,a,c]=s;if(!(i&&a))continue;let l=Number.parseInt(a,10);if(!Number.isFinite(l)||l<0)continue;let u=c?c.split(",").filter(d=>d.length>0):[];this._groups.set(i,{name:i,gid:l,members:u}),l>=this._nextGid&&(this._nextGid=l+1)}}_ensureSystemGroups(){let e=[{name:"root",gid:0},{name:"daemon",gid:1},{name:"bin",gid:2},{name:"sys",gid:3},{name:"adm",gid:4},{name:"tty",gid:5},{name:"disk",gid:6},{name:"lp",gid:7},{name:"mail",gid:8},{name:"news",gid:9},{name:"uucp",gid:10},{name:"man",gid:12},{name:"proxy",gid:13},{name:"kmem",gid:15},{name:"dialout",gid:20},{name:"fax",gid:21},{name:"voice",gid:22},{name:"cdrom",gid:24},{name:"floppy",gid:25},{name:"tape",gid:26},{name:"sudo",gid:27},{name:"audio",gid:29},{name:"dip",gid:30},{name:"www-data",gid:33},{name:"backup",gid:34},{name:"operator",gid:37},{name:"list",gid:38},{name:"irc",gid:39},{name:"src",gid:40},{name:"shadow",gid:42},{name:"utmp",gid:43},{name:"video",gid:44},{name:"sasl",gid:45},{name:"plugdev",gid:46},{name:"staff",gid:50},{name:"games",gid:60},{name:"users",gid:100},{name:"nogroup",gid:65534}];for(let{name:r,gid:n}of e)this._groups.has(r)||(this._groups.set(r,{name:r,gid:n,members:[]}),n>=this._nextGid&&(this._nextGid=n+1))}static _validateGroupName(e){if(!e||e.trim()==="")throw new Error("invalid group name");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(e))throw new Error(`invalid group name '${e}'`)}};var _h={"-20":88761,"-19":71755,"-18":56483,"-17":46273,"-16":36291,"-15":29154,"-14":23254,"-13":18705,"-12":14949,"-11":11916,"-10":9548,"-9":7620,"-8":6100,"-7":4904,"-6":3906,"-5":3121,"-4":2501,"-3":1991,"-2":1586,"-1":1277,0:1024,1:820,2:655,3:526,4:423,5:335,6:272,7:215,8:172,9:137,10:110,11:87,12:70,13:56,14:45,15:36,16:29,17:23,18:18,19:15},Po={idle:19,very_low:15,low:10,normal:0,high:-10,very_high:-15,realtime:-20},Gt=class t{_baseTimesliceMs;_maxTimesliceMs;_minTimesliceMs;_enforceFairShare;_accountingWindowMs;_scheduleCount=0;_totalCpuTimeMs=0;_throttleCount=0;_preemptCount=0;_windowStart=Date.now();_processCpuTime=new Map;constructor(e={}){this._baseTimesliceMs=e.baseTimesliceMs??100,this._maxTimesliceMs=e.maxTimesliceMs??500,this._minTimesliceMs=e.minTimesliceMs??10,this._enforceFairShare=e.enforceFairShare??!0,this._accountingWindowMs=e.accountingWindowMs??1e3}calculateTimeslice(e){let s=(_h[e]??1024)/1024,i=this._baseTimesliceMs*s;return Math.max(this._minTimesliceMs,Math.min(this._maxTimesliceMs,i))}static getNiceWeight(e){return _h[e]??1024}static priorityToNice(e){return Po[e]}static niceToPriority(e){for(let[s,i]of Object.entries(Po))if(i===e)return s;let r="normal",n=Math.abs(e);for(let[s,i]of Object.entries(Po)){let o=Math.abs(e-i);o<n&&(n=o,r=s)}return r}static isValidNice(e){return e>=-20&&e<=19&&Number.isInteger(e)}recordCpuTime(e,r){let n=this._processCpuTime.get(e)??0;this._processCpuTime.set(e,n+r),this._totalCpuTimeMs+=r}getProcessCpuTime(e){return this._processCpuTime.get(e)??0}shouldThrottle(e,r,n){if(!this._enforceFairShare||n<=1)return!1;let s=Date.now(),i=s-this._windowStart;if(i>=this._accountingWindowMs)return this._windowStart=s,this._processCpuTime.clear(),!1;let o=this._processCpuTime.get(e)??0,a=t.getNiceWeight(r),l=n*1024,u=a/l*i;return o>u*2}schedule(e,r){let n=e.nice??0,s=this.calculateTimeslice(n);return this.shouldThrottle(e.pid,n,r)?(this._throttleCount++,{action:"throttle",reason:"exceeded fair share"}):(this._scheduleCount++,{action:"run",timesliceMs:s,reason:`timeslice ${s}ms (nice ${n})`})}recordPreemption(){this._preemptCount++}getStats(){return{scheduleCount:this._scheduleCount,totalCpuTimeMs:this._totalCpuTimeMs,runQueueLength:this._processCpuTime.size,throttleCount:this._throttleCount,preemptCount:this._preemptCount,avgTimesliceMs:this._scheduleCount>0?this._totalCpuTimeMs/this._scheduleCount:0,windowStart:this._windowStart,processCpuTime:new Map(this._processCpuTime)}}resetStats(){this._scheduleCount=0,this._totalCpuTimeMs=0,this._throttleCount=0,this._preemptCount=0}resetWindow(){this._windowStart=Date.now(),this._processCpuTime.clear()}removeProcess(e){this._processCpuTime.delete(e)}};function $1(){let t=process.env.SSH_MIMIC_FAST_PASSWORD_HASH;return!!t&&!["0","false","no","off"].includes(t.toLowerCase())}var ze=gs("VirtualUserManager"),Bs=class t extends E1{constructor(r,n=!1){super();this._vfs=r;this._autoSudoForNewUsers=n;ze.mark("constructor"),this._groups=new Us(r),this._scheduler=new Gt}_vfs;_autoSudoForNewUsers;static _recordCache=new Map;static _maxRecordCacheSize=100;static _fastPasswordHash=$1();_usersPath="/etc/htpasswd";_sudoersPath="/etc/sudoers";_quotasPath="/etc/quotas";_authDirPath="/.virtual-env-js/.auth";_users=new Map;_sudoers=new Set;_quotas=new Map;_activeSessions=new Map;_activeProcesses=new Map;_nextTty=0;_nextPid=1e3;_nextUid=1001;_nextGid=1001;_cpuCapCores=0;_cpuBudgetMs=0;_cpuWindowMs=1e3;_cpuWindowStart=Date.now();_processCpuTime=new Map;_cpuWatcher=null;_groups;_sudoTimestamps=new Map;_loginFailures=new Map;_maxLoginFailures=5;_sudoTimestampWindowMs=300*1e3;_loginFailureTtlMs=3600*1e3;_scheduler;_schedulerEnabled=!1;initialize(){ze.mark("initialize"),this._groups.initialize(),this._loadFromVfs(),this._loadSudoersFromVfs(),this._loadQuotasFromVfs();let r=!1;this._users.has("root")||(this._users.set("root",this._createRecord("root","")),r=!0),this._sudoers.add("root");let n="/root";this._vfs.exists(n)||(this._vfs.mkdir(n,493),this._vfs.writeFile(`${n}/README.txt`,"Welcome to the virtual environment, root")),r&&this.persist(),this.emit("initialized")}setQuotaBytes(r,n){if(ze.mark("setQuotaBytes"),t._validateUsername(r),!this._users.has(r))throw new Error(`quota: user '${r}' does not exist`);if(!Number.isFinite(n)||n<0)throw new Error("quota: maxBytes must be a non-negative number");this._quotas.set(r,Math.floor(n)),this.persist()}clearQuota(r){ze.mark("clearQuota"),t._validateUsername(r),this._quotas.delete(r),this.persist()}getQuotaBytes(r){return ze.mark("getQuotaBytes"),this._quotas.get(r)??null}getUsageBytes(r){ze.mark("getUsageBytes");let n=r==="root"?"/root":`/home/${r}`;return this._vfs.exists(n)?this._vfs.getUsageBytes(n):0}assertWriteWithinQuota(r,n,s){ze.mark("assertWriteWithinQuota");let i=this._quotas.get(r);if(i===void 0)return;let o=wh(n),a=wh(r==="root"?"/root":`/home/${r}`);if(!(o===a||o.startsWith(`${a}/`)))return;let l=this.getUsageBytes(r),u=0;if(this._vfs.exists(o)){let f=this._vfs.stat(o);f.type==="file"&&(u=f.size)}let d=Buffer.isBuffer(s)?s.length:Buffer.byteLength(s,"utf8"),p=l-u+d;if(p>i)throw new Error(`quota exceeded for '${r}': ${p}/${i} bytes`)}verifyPassword(r,n){ze.mark("verifyPassword");let s=this._users.get(r);if(!s)return t.hashPassword(n,""),!1;let i=t.hashPassword(n,s.salt),o=s.passwordHash;try{let a=Buffer.from(i,"hex"),c=Buffer.from(o,"hex");return a.length!==c.length?!1:P1(a,c)}catch{return i===o}}addUser(r,n){if(ze.mark("addUser"),t._validateUsername(r),t._validatePassword(n),this._users.has(r))return;let s=this._createRecord(r,n);this._users.set(r,s),this._autoSudoForNewUsers&&this._sudoers.add(r);let i=r;if(!this._groups.getGroup(i))try{this._groups.createGroup(i,s.gid),this._groups.addMember(i,r)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",r)}catch{}let o=s.uid,a=s.gid,c=r==="root"?"/root":`/home/${r}`;this._vfs.exists(c)||(r!=="root"&&!this._vfs.exists("/home")&&this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(c,448,0,0),this._vfs.chown(c,o,a,0),this._vfs.writeFile(`${c}/README.txt`,`Welcome to the virtual environment, ${r}`,{},o,a)),this.persist(),this.emit("user:add",{username:r})}ensureUser(r){if(this._users.has(r))return;if(r==="root"){this._users.set("root",this._createRecord("root",""));return}let n=this._createRecord(r,"");this._users.set(r,n),this._autoSudoForNewUsers&&this._sudoers.add(r);let s=r;if(!this._groups.getGroup(s))try{this._groups.createGroup(s,n.gid),this._groups.addMember(s,r)}catch{}if(this._autoSudoForNewUsers)try{this._groups.addMember("sudo",r)}catch{}let i=n.uid,o=n.gid,a=`/home/${r}`;if(this._vfs.exists(a))try{this._vfs.chown(a,i,o,0)}catch{}else this._vfs.exists("/home")||this._vfs.mkdir("/home",493,0,0),this._vfs.mkdir(a,448,0,0),this._vfs.chown(a,i,o,0);this._vfs.exists(`${a}/README.txt`)||this._vfs.writeFile(`${a}/README.txt`,`Welcome to the virtual environment, ${r}`,{},i,o),this.persist(),this.emit("user:add",{username:r})}getPasswordHash(r){ze.mark("getPasswordHash");let n=this._users.get(r);return n?n.passwordHash:null}setPassword(r,n){if(ze.mark("setPassword"),t._validateUsername(r),t._validatePassword(n),!this._users.has(r))throw new Error(`passwd: user '${r}' does not exist`);this._users.set(r,this._createRecord(r,n)),this.persist()}deleteUser(r){if(ze.mark("deleteUser"),t._validateUsername(r),r==="root")throw new Error("deluser: cannot delete root");if(!this._users.delete(r))throw new Error(`deluser: user '${r}' does not exist`);this._sudoers.delete(r);try{this._groups.removeMember("sudo",r)}catch{}let n=this._groups.getGroup(r);if(n&&n.members.length<=1)try{this._groups.deleteGroup(r)}catch{}else if(n)try{this._groups.removeMember(r,r)}catch{}this.emit("user:delete",{username:r}),this.persist()}isSudoer(r){return ze.mark("isSudoer"),this._sudoers.has(r)}addSudoer(r){if(ze.mark("addSudoer"),t._validateUsername(r),!this._users.has(r))throw new Error(`sudoers: user '${r}' does not exist`);this._sudoers.add(r);try{this._groups.addMember("sudo",r)}catch{}this.persist()}removeSudoer(r){if(ze.mark("removeSudoer"),t._validateUsername(r),r==="root")throw new Error("sudoers: cannot remove root");this._sudoers.delete(r);try{this._groups.removeMember("sudo",r)}catch{}this.persist()}registerSession(r,n){ze.mark("registerSession");let s={id:C1(),username:r,tty:`pts/${this._nextTty++}`,remoteAddress:n,startedAt:new Date().toISOString()};return this._activeSessions.set(s.id,s),this.emit("session:register",{sessionId:s.id,username:r,remoteAddress:n}),s}unregisterSession(r){if(ze.mark("unregisterSession"),!r)return;let n=this._activeSessions.get(r);this._activeSessions.delete(r),n&&this.emit("session:unregister",{sessionId:r,username:n.username,tty:n.tty})}updateSession(r,n,s){if(ze.mark("updateSession"),!r)return;let i=this._activeSessions.get(r);i&&this._activeSessions.set(r,{...i,username:n,remoteAddress:s})}listActiveSessions(){return ze.mark("listActiveSessions"),Array.from(this._activeSessions.values()).sort((r,n)=>r.startedAt.localeCompare(n.startedAt))}listUsers(){return Array.from(this._users.keys()).sort()}getUid(r){return this._users.get(r)?.uid??0}getGid(r){return this._users.get(r)?.gid??0}getUsername(r){for(let[n,s]of this._users)if(s.uid===r)return n;return null}getGroupName(r){for(let[n,s]of this._users)if(s.gid===r)return n;return null}registerProcess(r,n,s,i,o,a=1,c=0){let l=this._nextPid++,u=Gt.niceToPriority(c);return this._activeProcesses.set(l,{pid:l,ppid:a,username:r,command:n,argv:s,tty:i,startedAt:new Date().toISOString(),status:"running",abortController:o,signalHandlers:new Map,cpuTimeMs:0,nice:c,priority:u}),l}unregisterProcess(r){this._processCpuTime.delete(r),this._scheduler.removeProcess(r);let n=this._activeProcesses.get(r);n&&(n.status="done",n.signalHandlers.clear(),n.abortController=void 0,this.emit("SIGCHLD",n.ppid,r)),this._activeProcesses.delete(r)}markProcessDone(r){let n=this._activeProcesses.get(r);n&&(n.status="done",n.signalHandlers.clear(),n.abortController=void 0,this.emit("SIGCHLD",n.ppid,r),setTimeout(()=>this.unregisterProcess(r),5e3).unref?.())}listProcesses(){return Array.from(this._activeProcesses.values()).sort((r,n)=>r.pid-n.pid)}killProcess(r,n=15){let s=this._activeProcesses.get(r);if(!s)return!1;if(n===9)return s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=9,s.exitCode=137,this.emit("SIGCHLD",s.ppid,r),!0;if(n===19)return s.status="stopped",!0;if(n===18)return s.status==="stopped"&&(s.status="running"),!0;let i=s.signalHandlers.get(n);return i?(i(n,r),!0):(s.abortController&&s.abortController.abort(),s.status="done",s.terminatedBySignal=n,s.exitCode=128+n,this.emit("SIGCHLD",s.ppid,r),!0)}killAllUserProcesses(r,n=15){let s=0;for(let[i,o]of this._activeProcesses)o.username===r&&this.killProcess(i,n)&&s++;return s}killProcessesByTty(r,n=9){let s=0;for(let[i,o]of this._activeProcesses)o.tty===r&&this.killProcess(i,n)&&s++;return s}getProcess(r){return this._activeProcesses.get(r)}setCpuCapCores(r){this._cpuCapCores=r,this._cpuBudgetMs=r>0?r*this._cpuWindowMs:0,r>0&&!this._cpuWatcher?this._startCpuWatcher():r===0&&this._cpuWatcher&&this._stopCpuWatcher()}getCpuCapCores(){return this._cpuCapCores}getProcessCpuTime(r){return this._processCpuTime.get(r)??0}addProcessCpuTime(r,n){let s=this._processCpuTime.get(r)??0;this._processCpuTime.set(r,s+n)}_startCpuWatcher(){this._cpuWatcher||(this._cpuWatcher=setInterval(()=>this._enforceCpuCaps(),500),typeof this._cpuWatcher.unref=="function"&&this._cpuWatcher.unref())}_stopCpuWatcher(){this._cpuWatcher&&(clearInterval(this._cpuWatcher),this._cpuWatcher=null)}_enforceCpuCaps(){if(this._cpuBudgetMs<=0)return;let r=Date.now(),n=r-this._cpuWindowStart;if(n>=this._cpuWindowMs){this._cpuWindowStart=r,this._processCpuTime.clear();return}for(let[s,i]of this._activeProcesses){if(i.status!=="running")continue;let o=this._processCpuTime.get(s)??0,a=new Date(i.startedAt).getTime(),c=Math.min(r-a,n),l=Math.max(o,c);l>this._cpuBudgetMs&&(this.killProcess(s,9),this.emit("process:killed:cpu",{pid:s,command:i.command,cpuTime:l}))}}enableScheduler(r={}){this._scheduler=new Gt(r),this._schedulerEnabled=!0}disableScheduler(){this._schedulerEnabled=!1}isSchedulerEnabled(){return this._schedulerEnabled}getSchedulerStats(){return this._schedulerEnabled?this._scheduler.getStats():null}resetSchedulerStats(){this._scheduler.resetStats()}setProcessNice(r,n){if(!Gt.isValidNice(n))return!1;let s=this._activeProcesses.get(r);return s?(s.nice=n,s.priority=Gt.niceToPriority(n),this.emit("process:nice",{pid:r,nice:n,priority:s.priority}),!0):!1}getProcessNice(r){return this._activeProcesses.get(r)?.nice??0}getProcessPriority(r){return this._activeProcesses.get(r)?.priority??"normal"}getProcessTimeslice(r){let n=this._activeProcesses.get(r)?.nice??0;return this._scheduler.calculateTimeslice(n)}recordAndCheckThrottle(r,n){if(!this._schedulerEnabled)return!1;this._scheduler.recordCpuTime(r,n);let s=this._activeProcesses.get(r);if(!s||s.status!=="running")return!1;let i=this.listProcesses().filter(o=>o.status==="running").length;return this._scheduler.shouldThrottle(r,s.nice,i)}getSchedulerCpuTime(r){return this._scheduler.getProcessCpuTime(r)}removeProcessFromScheduler(r){this._scheduler.removeProcess(r)}_loadFromVfs(){if(this._users.clear(),!this._vfs.exists(this._usersPath))return;let r=this._vfs.readFile(this._usersPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let i=s.split(":");if(!(i.length<3))if(i.length>=11){let[o,a,c,l,u,d,p,f,m,h,g]=i;if(!(o&&l&&u))continue;let y=Number.parseInt(a??"1001",10),S=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:y,gid:S,salt:l,passwordHash:u,lastPasswordChange:Number.parseInt(d??"0",10),minPasswordAge:Number.parseInt(p??"0",10),maxPasswordAge:Number.parseInt(f??"99999",10),passwordWarnDays:Number.parseInt(m??"7",10),passwordInactiveDays:Number.parseInt(h??"0",10),accountExpiryDate:Number.parseInt(g??"0",10)})}else if(i.length>=5){let[o,a,c,l,u]=i;if(!(o&&l&&u))continue;let d=Number.parseInt(a??"1001",10),p=Number.parseInt(c??"1001",10);this._users.set(o,{username:o,uid:d,gid:p,salt:l,passwordHash:u,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}else{let[o,a,c]=i;if(!(o&&a&&c))continue;let l=o==="root"?0:this._nextUid++,u=o==="root"?0:this._nextGid++;this._users.set(o,{username:o,uid:l,gid:u,salt:a,passwordHash:c,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0})}}}_loadSudoersFromVfs(){if(this._sudoers.clear(),!this._vfs.exists(this._sudoersPath))return;let r=this._vfs.readFile(this._sudoersPath);for(let n of r.split(`
`)){let s=n.trim();s.length>0&&this._sudoers.add(s)}}_loadQuotasFromVfs(){if(this._quotas.clear(),!this._vfs.exists(this._quotasPath))return;let r=this._vfs.readFile(this._quotasPath);for(let n of r.split(`
`)){let s=n.trim();if(s.length===0)continue;let[i,o]=s.split(":"),a=Number.parseInt(o??"",10);!(i&&Number.isFinite(a))||a<0||this._quotas.set(i,a)}}persist(){this._vfs.exists(this._authDirPath)||this._vfs.mkdir(this._authDirPath,448);let r=Array.from(this._users.values()).sort((o,a)=>o.username.localeCompare(a.username)).map(o=>[o.username,o.uid,o.gid,o.salt,o.passwordHash,o.lastPasswordChange,o.minPasswordAge,o.maxPasswordAge,o.passwordWarnDays,o.passwordInactiveDays,o.accountExpiryDate].join(":")).join(`
`),n=Array.from(this._sudoers.values()).sort().join(`
`),s=Array.from(this._quotas.entries()).sort(([o],[a])=>o.localeCompare(a)).map(([o,a])=>`${o}:${a}`).join(`
`),i=!1;i=this._writeIfChanged(this._usersPath,r.length>0?`${r}
`:"",384)||i,i=this._writeIfChanged(this._sudoersPath,n.length>0?`${n}
`:"",384)||i,i=this._writeIfChanged(this._quotasPath,s.length>0?`${s}
`:"",384)||i,i&&this._vfs.flushMirror()}_writeIfChanged(r,n,s){return this._vfs.exists(r)&&this._vfs.readFile(r)===n?(this._vfs.chmod(r,s),!1):(this._vfs.writeFile(r,n,{mode:s}),!0)}_createRecord(r,n,s,i){let o=s??(r==="root"?0:this._nextUid++),a=i??(r==="root"?0:this._nextGid++),c=vh("sha256").update(r).update(":").update(n).digest("hex"),l=t._recordCache.get(c);if(l)return{...l,lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};let u=x1(16).toString("hex"),d={username:r,uid:o,gid:a,salt:u,passwordHash:t.hashPassword(n,u),lastPasswordChange:Math.floor(Date.now()/864e5),minPasswordAge:0,maxPasswordAge:99999,passwordWarnDays:7,passwordInactiveDays:0,accountExpiryDate:0};if(t._recordCache.set(c,d),t._recordCache.size>t._maxRecordCacheSize){let p=t._recordCache.keys().next().value;p&&t._recordCache.delete(p)}return d}hasPassword(r){ze.mark("hasPassword");let n=this._users.get(r);if(!n)return!1;let s=t.hashPassword("",n.salt);return n.passwordHash===s?!1:!!n.passwordHash}static hashPassword(r,n=""){return t._fastPasswordHash?vh("sha256").update(n).update(r).digest("hex"):I1(r,n||"",32).toString("hex")}static _validateUsername(r){if(!r||r.trim()==="")throw new Error("invalid username");if(!/^[a-z_][a-z0-9_-]{0,31}$/i.test(r))throw new Error("invalid username")}static _validatePassword(r){if(!r||r.trim()==="")throw new Error("invalid password")}_authorizedKeys=new Map;addAuthorizedKey(r,n,s){ze.mark("addAuthorizedKey");let i=this._authorizedKeys.get(r)??[];i.push({algo:n,data:s}),this._authorizedKeys.set(r,i),this.emit("key:add",{username:r,algo:n})}removeAuthorizedKeys(r){this._authorizedKeys.delete(r),this.emit("key:remove",{username:r})}getAuthorizedKeys(r){return this._authorizedKeys.get(r)??[]}createGroup(r,n){return this._groups.createGroup(r,n)}deleteGroup(r){this._groups.deleteGroup(r)}addGroupMember(r,n){this._groups.addMember(r,n)}removeGroupMember(r,n){this._groups.removeMember(r,n)}getGroup(r){return this._groups.getGroup(r)}getGroupByGid(r){return this._groups.getGroupByGid(r)}getGidByName(r){return this._groups.getGidByName(r)}getNameByGid(r){return this._groups.getNameByGid(r)}getUserSupplementaryGroups(r){return this._groups.getUserSupplementaryGroups(r)}getUserAllGroups(r){let n=this.getGid(r);return this._groups.getUserAllGroups(r,n)}isMemberOf(r,n){let s=this.getGid(r);return this._groups.isMemberOf(r,n,s)}listGroups(){return this._groups.listGroups()}generateGroupFile(){return this._groups.generateGroupFile()}setPasswordAging(r,n,s,i,o){let a=this._users.get(r);if(!a)throw new Error(`chage: user '${r}' does not exist`);n!==void 0&&(a.minPasswordAge=n),s!==void 0&&(a.maxPasswordAge=s),i!==void 0&&(a.passwordWarnDays=i),o!==void 0&&(a.passwordInactiveDays=o),this.persist()}getPasswordAging(r){let n=this._users.get(r);return n?{lastChange:n.lastPasswordChange,minAge:n.minPasswordAge,maxAge:n.maxPasswordAge,warnDays:n.passwordWarnDays,inactiveDays:n.passwordInactiveDays,expiryDate:n.accountExpiryDate}:null}setAccountExpiry(r,n){let s=this._users.get(r);if(!s)throw new Error(`chage: user '${r}' does not exist`);s.accountExpiryDate=n,this.persist()}forcePasswordChange(r){let n=this._users.get(r);if(!n)throw new Error(`chage: user '${r}' does not exist`);n.lastPasswordChange=0,this.persist()}isPasswordExpired(r){let n=this._users.get(r);return!n||n.maxPasswordAge===99999?!1:Math.floor(Date.now()/864e5)-n.lastPasswordChange>n.maxPasswordAge}lockAccount(r){let n=this._users.get(r);if(!n)throw new Error(`usermod: user '${r}' does not exist`);n.passwordHash.startsWith("!")||(n.passwordHash=`!${n.passwordHash}`,this.persist())}unlockAccount(r){let n=this._users.get(r);if(!n)throw new Error(`usermod: user '${r}' does not exist`);n.passwordHash.startsWith("!")&&(n.passwordHash=n.passwordHash.slice(1),this.persist())}isAccountLocked(r){return this._users.get(r)?.passwordHash.startsWith("!")??!1}generateShadowFile(){let n=[{name:"root",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"daemon",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"nobody",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"messagebus",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"_apt",hash:"*",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-network",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"systemd-resolve",hash:"!",lastChange:19e3,min:0,max:99999,warn:7},{name:"polkitd",hash:"!",lastChange:19e3,min:0,max:99999,warn:7}].map(s=>`${s.name}:${s.hash}:${s.lastChange}:${s.min}:${s.max}:${s.warn}:::`);for(let s of this._users.values()){if(s.username==="root")continue;let i=s.passwordHash.startsWith("!")?"!":s.passwordHash;n.push(`${s.username}:${i}:${s.lastPasswordChange}:${s.minPasswordAge}:${s.maxPasswordAge}:${s.passwordWarnDays}:${s.passwordInactiveDays}:${s.accountExpiryDate}:`)}return n.join(`
`)}grantSudoTimestamp(r){this._sudoTimestamps.set(r,Date.now())}hasValidSudoTimestamp(r){if(r==="root")return!0;let n=this._sudoTimestamps.get(r);return n?Date.now()-n>=this._sudoTimestampWindowMs?(this._sudoTimestamps.delete(r),!1):!0:!1}clearSudoTimestamp(r){this._sudoTimestamps.delete(r)}recordLoginFailure(r,n){let s=Date.now();for(let[o,a]of this._loginFailures)s-a.lastTime>this._loginFailureTtlMs&&this._loginFailures.delete(o);let i=this._loginFailures.get(r);i?(i.count++,i.lastTime=s,i.sourceIp=n):this._loginFailures.set(r,{count:1,lastTime:s,sourceIp:n})}recordLoginSuccess(r){this._loginFailures.delete(r)}getLoginFailures(r){return this._loginFailures.get(r)?.count??0}resetLoginFailures(r){this._loginFailures.delete(r)}isAccountLockedByFailures(r){let n=this._loginFailures.get(r);return n?n.count>=this._maxLoginFailures:!1}getLastFailureTime(r){return this._loginFailures.get(r)?.lastTime??0}};function wh(t){let e=xh.posix.normalize(t);return e.startsWith("/")?e:`/${e}`}import{EventEmitter as M1}from"node:events";var zs=class t extends M1{_shell;_vfs;_idleThresholdMs;_checkIntervalMs;_gcIntervalMs;_state="active";_lastActivity=Date.now();_frozenBuffer=null;_checkTimer=null;_gcTimer=null;constructor(e,r={}){super(),this._shell=e,this._vfs=e.vfs,this._idleThresholdMs=r.idleThresholdMs??6e4,this._checkIntervalMs=r.checkIntervalMs??15e3,this._gcIntervalMs=r.gcIntervalMs??3e4}start(){this._checkTimer||(this._lastActivity=Date.now(),this._checkTimer=setInterval(()=>this._check(),this._checkIntervalMs),typeof this._checkTimer=="object"&&this._checkTimer!==null&&"unref"in this._checkTimer&&this._checkTimer.unref(),this._gcIntervalMs>0&&(this._gcTimer=setInterval(()=>this._runGc(),this._gcIntervalMs),typeof this._gcTimer=="object"&&this._gcTimer!==null&&"unref"in this._gcTimer&&this._gcTimer.unref()))}stop(){this._checkTimer&&(clearInterval(this._checkTimer),this._checkTimer=null),this._gcTimer&&(clearInterval(this._gcTimer),this._gcTimer=null),this._state==="frozen"&&this._thaw()}ping(){this._lastActivity=Date.now(),this._state==="frozen"&&this._thaw()}get state(){return this._state}get idleMs(){return Date.now()-this._lastActivity}runGc(){return this._runGc()}_check(){this._state!=="frozen"&&Date.now()-this._lastActivity>=this._idleThresholdMs&&this._freeze()}_freeze(){this._state!=="frozen"&&(this._vfs.stopAutoFlush(),this._frozenBuffer=this._vfs.encodeBinary(),this._vfs.releaseTree(),this._state="frozen",this.emit("freeze"))}_thaw(){if(this._state!=="frozen"||!this._frozenBuffer)return;let e=Jt(this._frozenBuffer);this._vfs.importRootTree(e),this._frozenBuffer=null,this._state="active",this.emit("thaw")}_runGc(){let e={terminatedProcesses:0,staleCpuEntries:0,evictedFiles:0,forcedGc:!1};return e.terminatedProcesses=this._cleanupTerminatedProcesses(),e.staleCpuEntries=this._cleanupStaleCpuEntries(),e.evictedFiles=this._evictClosedFiles(),e.forcedGc=t._forceNodeGc(),this.emit("gc:run",e),e}_cleanupTerminatedProcesses(){let e=this._shell.users;if(!e)return 0;let r=e.listProcesses(),n=0;for(let s of r)s.status==="done"&&(e.unregisterProcess(s.pid),n++);return n}_cleanupStaleCpuEntries(){let e=this._shell.users;if(!e)return 0;let r=e.listProcesses(),n=new Set(r.map(o=>o.pid)),s=0,i=t._getAllTrackedPids(e);for(let o of i)!n.has(o)&&e.getProcessCpuTime(o)>0&&s++;return s}static _getAllTrackedPids(e){return e.listProcesses().map(n=>n.pid)}_evictClosedFiles(){if(this._state==="frozen")return 0;let e=this._vfs.getOpenPaths();return this._vfs.evictUnusedLargeFiles(e)}static _forceNodeGc(){let e=globalThis.gc;return typeof e=="function"?(e(),!0):!1}};es();import kh from"node:path";se();Ye();import*as Ch from"node:path";function Vs(t,e){let r=`${fe(e)}/.bash_history`;return t.exists(r)?t.readFile(r).split(`
`).map(n=>n.trim()).filter(n=>n.length>0):(t.writeFile(r,""),[])}function Gs(t,e,r){let n=r.length>0?`${r.join(`
`)}
`:"";t.writeFile(`${fe(e)}/.bash_history`,n)}function Ws(t,e){let r=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;if(!t.exists(r))return null;try{let n=JSON.parse(t.readFile(r));if(typeof n!="object"||n===null)return null;let s=n;return typeof s.from!="string"||typeof s.timestamp!="number"?null:{from:s.from,at:new Date(s.timestamp).toISOString()}}catch{return null}}function js(t,e,r){let n=e==="root"?"/root/.lastlog.json":`/home/${e}/.lastlog`;t.writeFile(n,JSON.stringify({at:new Date().toISOString(),from:r}))}function Hs(t,e,r){let n=r.lastIndexOf("/"),s=n>=0?r.slice(0,n+1):"",i=n>=0?r.slice(n+1):r,o=B(e,s||".");try{return t.list(o).filter(a=>a.startsWith(i)).filter(a=>i.startsWith(".")||!a.startsWith(".")).map(a=>{let c=Ch.posix.join(o,a),l=t.stat(c);return`${s}${a}${l.type==="directory"?"/":""}`}).sort()}catch{return[]}}import{spawn as N1}from"node:child_process";import{readFile as k1}from"node:fs/promises";function Ih(t){return`'${t.replace(/'/g,"'\\''")}'`}function vr(t){return t.replace(/\r\n/g,`
`).replace(/\r/g,`
`).replace(/\n/g,`\r
`)}function Ph(t,e){let r=Number.isFinite(e.cols)&&e.cols>0?Math.floor(e.cols):80,n=Number.isFinite(e.rows)&&e.rows>0?Math.floor(e.rows):24;return`stty cols ${r} rows ${n} 2>/dev/null; ${t}`}async function Eh(t){try{let r=(await k1(`/proc/${t}/task/${t}/children`,"utf8")).trim().split(/\s+/).filter(Boolean).map(s=>Number.parseInt(s,10)).filter(s=>Number.isInteger(s)&&s>0),n=await Promise.all(r.map(s=>Eh(s)));return[...r,...n.flat()]}catch{return[]}}async function $h(t=process.pid){let e=await Eh(t),r=Array.from(new Set(e)).sort((n,s)=>n-s);return r.length===0?null:r.join(",")}function A1(t,e,r){let n=Ph(t,e),s=N1("script",["-qfec",n,"/dev/null"],{stdio:["pipe","pipe","pipe"],env:{...process.env,TERM:process.env.TERM??"xterm-256color"}});return s.stdout.on("data",i=>{r.write(i.toString("utf8"))}),s.stderr.on("data",i=>{r.write(i.toString("utf8"))}),s}function Mh(t,e,r){return A1(`htop -p ${Ih(t)}`,e,r)}function Nh(t,e,r,n,s,i,o,a){let c="",l=0,u=Vs(a.vfs,r),d=null,p="",f=fe(r),m=null,h=pt(r,n);if(s){let R=a.users.listActiveSessions().find(V=>V.id===s);R&&(h.vars.__TTY=R.tty)}let g=[],y=null,S=null,w=()=>{if(h.vars.PS1)return Kr(r,n,"",h.vars.PS1,f);let R=fe(r),V=f===R?"~":kh.posix.basename(f)||"/";return Kr(r,n,V)},b=Array.from(new Set(dn())).sort();console.log(`[${s}] Shell started for user '${r}' at ${i}`);let N=!1,I=async(R,V=!1)=>{if(a.vfs.exists(R))try{let z=a.vfs.readFile(R);for(let G of z.split(`
`)){let F=G.trim();if(!(!F||F.startsWith("#")))if(V){let j=F.match(/^([A-Za-z_][A-Za-z0-9_]*)=["']?(.+?)["']?\s*$/);j&&(h.vars[j[1]]=j[2])}else{let j=await ge(F,r,n,"shell",f,a,void 0,h);j.stdout&&e.write(j.stdout.replace(/\n/g,`\r
`))}}}catch{}},v=(async()=>{await I("/etc/environment",!0),await I(`${fe(r)}/.profile`),await I(`${fe(r)}/.bashrc`),N=!0})();function _(){let R=w();e.write(`\r\x1B[0m${R}${c}\x1B[K`);let V=c.length-l;V>0&&e.write(`\x1B[${V}D`)}function x(){e.write("\r\x1B[K")}function E(R){S={...R,buffer:""},x(),e.write(R.prompt)}async function D(R){if(!S)return;let V=S;if(S=null,!R){e.write(`\r
Sorry, try again.\r
`),_();return}if(!V.commandLine){r=V.targetUser,V.loginShell&&(f=fe(r)),a.users.updateSession(s,r,i),await Rt(r,n,f,h,a),e.write(`\r
`),_();return}let z=V.loginShell?fe(V.targetUser):f,G=await ge(V.commandLine,V.targetUser,n,"shell",z,a);if(e.write(`\r
`),G.openEditor){X(G.openEditor.targetPath,G.openEditor.initialContent);return}if(G.openHtop){await ee();return}if(G.openPacman){P();return}G.clearScreen&&e.write("\x1B[2J\x1B[H"),G.stdout&&e.write(`${vr(G.stdout)}\r
`),G.stderr&&e.write(`${vr(G.stderr)}\r
`),G.switchUser?(g.push({authUser:r,cwd:f}),r=G.switchUser,f=G.nextCwd??fe(r),a.users.updateSession(s,r,i),await Rt(r,n,f,h,a)):G.nextCwd&&(f=G.nextCwd),_()}let T=-1;function W(R,V){if(R!==void 0&&V){let z=a.users.getUid(r),G=a.users.getGid(r);a.vfs.writeFile(V,R,{},z,G)}T!==-1&&(a.users.unregisterProcess(T),T=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),_()}function X(R,V){T=a.users.registerProcess(r,"nano",["nano",R],h.vars.__TTY??"?");let z=new qr({stream:e,terminalSize:o,content:V,filename:kh.posix.basename(R),onExit:(G,F)=>{G==="saved"?W(F,R):W()}});y={kind:"nano",targetPath:R,editor:z},z.start()}async function ee(){let R=await $h();if(!R){e.write(`htop: no child_process processes to display\r
`);return}T=a.users.registerProcess(r,"htop",["htop"],h.vars.__TTY??"?");let V=Mh(R,o,e);V.on("error",z=>{e.write(`htop: ${z.message}\r
`),W()}),V.on("close",()=>{W()}),y={kind:"htop",process:V}}function P(){T=a.users.registerProcess(r,"pacman",["pacman"],h.vars.__TTY??"?");let R=new Yr({stream:e,terminalSize:o,onExit:()=>{T!==-1&&(a.users.unregisterProcess(T),T=-1),y=null,c="",l=0,e.write("\x1B[2J\x1B[H\x1B[0m"),_()}});y={kind:"pacman",game:R},R.start()}function A(R){c=R,l=c.length,_()}function C(R){c=`${c.slice(0,l)}${R}${c.slice(l)}`,l+=R.length,_()}function O(R,V){let z=V;for(;z>0&&!/\s/.test(R.charAt(z-1));)z-=1;let G=V;for(;G<R.length&&!/\s/.test(R.charAt(G));)G+=1;return{start:z,end:G}}function U(){let{start:R,end:V}=O(c,l),z=c.slice(R,l);if(z.length===0)return;let F=c.slice(0,R).trim().length===0?b.filter(q=>q.startsWith(z)):[],j=Hs(a.vfs,f,z),H=Array.from(new Set([...F,...j])).sort();if(H.length!==0){if(H.length===1){let q=H[0],ie=q.endsWith("/")?"":" ";c=`${c.slice(0,R)}${q}${ie}${c.slice(V)}`,l=R+q.length+ie.length,_();return}e.write(`\r
`),e.write(`${H.join("  ")}\r
`),_()}}function Z(R){R.length!==0&&(u.push(R),u.length>500&&(u=u.slice(u.length-500)),Gs(a.vfs,r,u))}function J(){let R=Ws(a.vfs,r);e.write(hs(n,t,R)),js(a.vfs,r,i)}J(),v.then(()=>_()),e.on("data",R=>{(async()=>{if(!N)return;if(y){y.kind==="nano"?y.editor.handleInput(R):y.kind==="pacman"?y.game.handleInput(R):y.process.stdin.write(R);return}if(m){let z=m,G=R.toString("utf8");for(let F=0;F<G.length;F++){let j=G.charAt(F);if(j===""){m=null,e.write(`^C\r
`),_();return}if(j==="\x7F"||j==="\b"){c=c.slice(0,-1),_();continue}if(j==="\r"||j===`
`){let H=c;if(c="",l=0,e.write(`\r
`),H===z.delimiter){let q=z.lines.join(`
`),ie=z.cmdBefore;m=null,Z(`${ie} << ${z.delimiter}`);let ne=await ge(ie,r,n,"shell",f,a,q,h);ne.stdout&&e.write(`${vr(ne.stdout)}\r
`),ne.stderr&&e.write(`${vr(ne.stderr)}\r
`),ne.nextCwd&&(f=ne.nextCwd),_();return}z.lines.push(H),e.write("> ");continue}(j>=" "||j==="	")&&(c+=j,e.write(j))}return}if(S){let z=R.toString("utf8");for(let G=0;G<z.length;G+=1){let F=z.charAt(G);if(F===""){S=null,e.write(`^C\r
`),_();return}if(F==="\x7F"||F==="\b"){S.buffer=S.buffer.slice(0,-1);continue}if(F==="\r"||F===`
`){let j=S.buffer;if(S.buffer="",S.onPassword){let{result:q,nextPrompt:ie}=await S.onPassword(j,a);e.write(`\r
`),q===null?(ie&&(S.prompt=ie),e.write(S.prompt)):(S=null,q.stdout&&e.write(q.stdout.replace(/\n/g,`\r
`)),q.stderr&&e.write(q.stderr.replace(/\n/g,`\r
`)),_());return}let H=a.users.verifyPassword(S.username,j);await D(H);return}F>=" "&&(S.buffer+=F)}return}let V=R.toString("utf8");for(let z=0;z<V.length;z+=1){let G=V.charAt(z);if(G===""){if(c="",l=0,d=null,p="",e.write(`logout\r
`),g.length>0){let F=g.pop();r=F.authUser,f=F.cwd,a.users.updateSession(s,r,i),h.vars.PS1=pt(r,n).vars.PS1??"",_()}else{e.exit(0),e.end();return}continue}if(G==="	"){U();continue}if(G==="\x1B"){let F=V[z+1],j=V[z+2],H=V[z+3];if(F==="["&&j){if(j==="A"){z+=2,u.length>0&&(d===null?(p=c,d=u.length-1):d>0&&(d-=1),A(u[d]??""));continue}if(j==="B"){z+=2,d!==null&&(d<u.length-1?(d+=1,A(u[d]??"")):(d=null,A(p)));continue}if(j==="C"){z+=2,l<c.length&&(l+=1,e.write("\x1B[C"));continue}if(j==="D"){z+=2,l>0&&(l-=1,e.write("\x1B[D"));continue}if(j==="3"&&H==="~"){z+=3,l<c.length&&(c=`${c.slice(0,l)}${c.slice(l+1)}`,_());continue}if(j==="1"&&H==="~"){z+=3,l=0,_();continue}if(j==="H"){z+=2,l=0,_();continue}if(j==="4"&&H==="~"){z+=3,l=c.length,_();continue}if(j==="F"){z+=2,l=c.length,_();continue}}if(F==="O"&&j){if(j==="H"){z+=2,l=0,_();continue}if(j==="F"){z+=2,l=c.length,_();continue}}}if(G===""){c="",l=0,d=null,p="",e.write(`^C\r
`),_();continue}if(G===""){l=0,_();continue}if(G===""){l=c.length,_();continue}if(G==="\v"){c=c.slice(0,l),_();continue}if(G===""){c=c.slice(l),l=0,_();continue}if(G===""){let F=l;for(;F>0&&c[F-1]===" ";)F--;for(;F>0&&c[F-1]!==" ";)F--;c=c.slice(0,F)+c.slice(l),l=F,_();continue}if(G==="\r"||G===`
`){let F=c.trim();if(c="",l=0,d=null,p="",e.write(`\r
`),F==="!!"||F.startsWith("!! ")||/\s!!$/.test(F)||/ !! /.test(F)){let H=u.length>0?u[u.length-1]:"";F=F==="!!"?H:F.replace(/!!/g,H)}else if(/(?:^|\s)!!/.test(F)){let H=u.length>0?u[u.length-1]:"";F=F.replace(/!!/g,H)}let j=F.match(/^(.*?)\s*<<-?\s*['"`]?([A-Za-z_][A-Za-z0-9_]*)['"`]?\s*$/);if(j&&F.length>0){m={delimiter:j[2],lines:[],cmdBefore:j[1].trim()||"cat"},e.write("> ");continue}if(F.length>0){let H=await ge(F,r,n,"shell",f,a,void 0,h);if(Z(F),H.openEditor){X(H.openEditor.targetPath,H.openEditor.initialContent);return}if(H.openHtop){await ee();return}if(H.openPacman){P();return}if(H.sudoChallenge){E(H.sudoChallenge);return}if(H.clearScreen&&e.write("\x1B[2J\x1B[H"),H.stdout&&e.write(`${vr(H.stdout)}\r
`),H.stderr&&e.write(`${vr(H.stderr)}\r
`),H.closeSession)if(e.write(`logout\r
`),g.length>0){let q=g.pop();r=q.authUser,f=q.cwd,a.users.updateSession(s,r,i),h.vars.PS1=pt(r,n).vars.PS1??""}else{e.exit(H.exitCode??0),e.end();return}H.nextCwd&&!H.closeSession&&(f=H.nextCwd),H.switchUser&&(g.push({authUser:r,cwd:f}),r=H.switchUser,f=H.nextCwd??fe(r),h.vars.PWD=f,a.users.updateSession(s,r,i),await Rt(r,n,f,h,a),c="",l=0)}_();continue}if(G==="\x7F"||G==="\b"){l>0&&(c=`${c.slice(0,l-1)}${c.slice(l)}`,l-=1,_());continue}C(G)}})().catch(V=>{console.error("shell data handler error:",V)})}),e.on("close",()=>{y&&(y.kind==="htop"?y.process.kill("SIGTERM"):y.kind==="pacman"&&y.game.stop(),y=null)})}function O1(t){return typeof t=="object"&&t!==null&&"vfsInstance"in t&&Ah(t.vfsInstance)}function Ah(t){if(typeof t!="object"||t===null)return!1;let e=t;return typeof e.restoreMirror=="function"&&typeof e.flushMirror=="function"&&typeof e.writeFile=="function"&&typeof e.readFile=="function"&&typeof e.mkdir=="function"&&typeof e.exists=="function"&&typeof e.stat=="function"&&typeof e.list=="function"&&typeof e.remove=="function"}var R1={kernel:"1.0.0+itsrealfortune+1-amd64",os:"Fortune GNU/Linux x64",arch:"x86_64"},Nn=gs("VirtualShell");function D1(){let t=process.env.SSH_MIMIC_AUTO_SUDO_NEW_USERS;return t?!["0","false","no","off"].includes(t.toLowerCase()):!1}var qs=class extends T1{vfs;users;packageManager;network;hostname;properties;startTime;desktopManager=null;_idle=null;sysctl;resourceCaps;_initialized;constructor(e,r,n,s){super(),Nn.mark("constructor"),this.hostname=e,this.properties=r||R1,this.startTime=Date.now(),this.sysctl=kp(e,this.properties.kernel),this.resourceCaps=s??{},Ah(n)?this.vfs=n:O1(n)?this.vfs=n.vfsInstance:this.vfs=new Ls(n??{}),this.users=new Bs(this.vfs,D1()),this.packageManager=new At(this.vfs,this.users),this.network=new ss;let i=this.vfs,o=this.users,a=this.properties,c=this.hostname,l=this.startTime,u=this.network,d=this.sysctl,p=this.resourceCaps;this._initialized=(async()=>{await i.restoreMirror(),o.initialize(),bh(i,o,c,a,l,[],u,p),i.onBeforeRead("/proc",()=>{kn(i,a,c,l,o.listActiveSessions(),u,p)}),i.registerContentResolver("/proc/sys",f=>{let m=Gr(d,f);if(m){let h=m.value;return typeof h=="number"?`${h}
`:h.endsWith(`
`)?h:`${h}
`}return null}),i.onBeforeWrite("/proc/sys",(f,m)=>{let h=Gr(d,f);if(h&&h.set(typeof m=="string"?m.trim():String(m)),f.includes("vm/ram_cap_bytes")){let g=Number(m);p.ramCapBytes=g>0?g:void 0,i.setRamCap(p.ramCapBytes??null)}if(f.includes("kernel/cpu_cap_cores")){let g=Number(m);p.cpuCapCores=g>0?g:void 0,o.setCpuCapCores(p.cpuCapCores??0)}}),p.ramCapBytes&&i.setRamCap(p.ramCapBytes),p.cpuCapCores&&o.setCpuCapCores(p.cpuCapCores),this.emit("initialized")})()}ensureInitialized(){return Nn.mark("ensureInitialized"),this._initialized}addCommand(e,r,n){let s=e.trim().toLowerCase();if(s.length===0||/\s/.test(s))throw new Error("Command name must be non-empty and contain no spaces");xi(Ci(s,r,n))}executeCommand(e,r,n){Nn.mark("executeCommand"),this._idle?.ping();let s=ge(e,r,this.hostname,"shell",n,this);return this.emit("command",{command:e,user:r,cwd:n}),s}startInteractiveSession(e,r,n,s,i){Nn.mark("startInteractiveSession"),this._idle?.ping(),this.emit("session:start",{user:r,sessionId:n,remoteAddress:s}),Nh(this.properties,e,r,this.hostname,n,s,i,this),this.refreshProcSessions()}refreshProcFs(){kn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}mount(e,r,n={}){this.vfs.mount(e,r,n)}unmount(e){this.vfs.unmount(e)}getMounts(){return this.vfs.getMounts()}refreshProcSessions(){kn(this.vfs,this.properties,this.hostname,this.startTime,this.users.listActiveSessions(),this.network,this.resourceCaps)}syncPasswd(){Io(this.vfs,this.users)}getVfs(){return this?.vfs??null}getUsers(){return this?.users??null}getHostname(){return this?.hostname}writeFileAsUser(e,r,n){Nn.mark("writeFileAsUser"),this.users.assertWriteWithinQuota(e,r,n),this.vfs.writeFile(r,n)}enableIdleManagement(e){this._idle||(this._idle=new zs(this,e),this._idle.on("freeze",()=>this.emit("shell:freeze")),this._idle.on("thaw",()=>this.emit("shell:thaw")),this._idle.on("gc:run",r=>this.emit("gc:run",r)),this._idle.start())}disableIdleManagement(){this._idle&&(this._idle.stop(),this._idle=null)}get idleState(){return this._idle?.state??"active"}get idleMs(){return this._idle?.idleMs??0}pingIdle(){this._idle?.ping()}runGc(){return this._idle?.runGc()??null}};function An(t,e){return t.includes(e)}function Eo(t,e,r){let n=`${e}=`;for(let s=0;s<t.length;s++){let i=t[s];if(i.startsWith(n))return i.slice(n.length);if(i===e){let o=t[s+1];return o&&!o.startsWith("--")?o:r}}return r}var Wt=process.argv.slice(2);(An(Wt,"--version")||An(Wt,"-V"))&&(process.stdout.write(`self-standalone 1.6.0
`),process.exit(0));(An(Wt,"--help")||An(Wt,"-h"))&&(process.stdout.write(`Usage: node <self-standalone.mjs> [OPTIONS]

Options:
  --user=USER, --user USER     Boot as USER (default: root)
  --hostname=NAME              Set shell hostname (default: typescript-vm)
  --snapshot=PATH              VFS snapshot directory (default: .vfs)
  --version, -V                Print version and exit
  --help, -h                   Show this help

Environment:
  SSH_MIMIC_HOSTNAME           Overridden by --hostname if both are set
`),process.exit(0));function U1(){for(let t=0;t<Wt.length;t+=1){let e=Wt[t];if(e==="--user"){let r=Wt[t+1];if(!r||r.startsWith("--"))throw new Error("self-standalone: --user requires a value");return r}if(e?.startsWith("--user="))return e.slice(7)||"root"}return"root"}var nt=Eo(Wt,"--hostname",process.env.SSH_MIMIC_HOSTNAME??"typescript-vm"),B1=Eo(Wt,"--snapshot",".vfs"),z1=U1();console.clear();var he=new qs(nt,void 0,{mode:"fs",snapshotPath:B1});function nr(){he.vfs.stopAutoFlush()}function V1(t){let e=Array.from(new Set(dn())).sort();return(r,n)=>{let{cwd:s}=t(),i=r.split(/\s+/).at(-1)??"",a=r.trimStart()===i?e.filter(u=>u.startsWith(i)):[],c=Hs(he.vfs,s,i),l=Array.from(new Set([...a,...c])).sort();n(null,[l,i])}}function Tn(t,e){return new Promise(r=>{if(!(we.isTTY&&ve.isTTY)){t.question(e,r);return}let n=!!we.isRaw,s="",i=()=>{we.off("data",a),n||we.setRawMode(!1)},o=c=>{i(),ve.write(`
`),r(c)},a=c=>{let l=c.toString("utf8");for(let u=0;u<l.length;u+=1){let d=l.charAt(u);if(d==="\r"||d===`
`){o(s);return}if(d==="\x7F"||d==="\b"){s=s.slice(0,-1);continue}d>=" "&&(s+=d)}};t.pause(),ve.write(e),n||we.setRawMode(!0),we.resume(),we.on("data",a)})}function G1(t,e,r,n){let s=t,i=e;return r.switchUser?(s=r.switchUser,i=r.nextCwd??fe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=fe(s),n.vars.PWD=i):r.nextCwd&&(i=r.nextCwd,n.vars.PWD=i),{authUser:s,cwd:i}}he.addCommand("demo",[],()=>({stdout:"This is a demo command. It does nothing useful.",exitCode:0}));async function W1(){await he.ensureInitialized();let t=z1.trim()||"root";he.users.getPasswordHash(t)===null&&(process.stderr.write(`self-standalone: user '${t}' does not exist
`),process.exit(1));let e=t==="root"?"/root":fe(t);he.vfs.exists(e)||he.vfs.mkdir(e,t==="root"?448:493);let r=`${e}/README.txt`;he.vfs.exists(r)||(he.vfs.writeFile(r,`Welcome to ${nt}
`),he.vfs.stopAutoFlush());let n=pt(t,nt),s=t,i=fe(s);n.vars.PWD=i;let o=[],a="localhost",c={cols:ve.columns??80,rows:ve.rows??24};process.on("SIGWINCH",()=>{c.cols=ve.columns??c.cols,c.rows=ve.rows??c.rows});let l=Vs(he.vfs,s),u=L1({input:we,output:ve,terminal:!0,completer:V1(()=>({cwd:i}))}),d=u;"history"in d&&(d.history=[...l].reverse());{let b=u,N=b._ttyWrite;if(N===void 0)return;let I=N.bind(u);b._ttyWrite=(v,_)=>{let x=b.line;if(_?.ctrl&&_?.name==="d"&&x===""&&o.length>0){ve.write(`^D
`);let E=o.pop();if(E===void 0)return;s=E.authUser,i=E.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=fe(s),n.vars.PWD=i,n.vars.PS1=pt(s,nt).vars.PS1??"",ve.write(`logout
`),nr(),S();return}I(v,_)}}function p(b,N){return new Promise(I=>{let v={write:P=>{ve.write(P)},exit:()=>{},end:()=>{},on:()=>{}},_={cols:ve.columns??80,rows:ve.rows??24},x=we.listeners("data");for(let P of x)we.off("data",P);let E=we.listeners("keypress");for(let P of E)we.off("keypress",P);function D(){process.off("SIGWINCH",X),process.off("SIGINT",T),we.off("data",ee);for(let P of x)we.on("data",P);for(let P of E)we.on("keypress",P);ve.write("\x1B[?25h\x1B[0m"),u.resume()}let T=()=>{},W=new qr({stream:v,terminalSize:_,content:N,filename:Oh.posix.basename(b),onSave:P=>{let A=he.users.getUid(s),C=he.users.getGid(s);he.vfs.writeFile(b,P,{},A,C),nr()},onExit:(P,A)=>{if(D(),P==="saved"){let C=he.users.getUid(s),O=he.users.getGid(s);he.vfs.writeFile(b,A,{},C,O),nr()}I()}}),X=()=>{W.resize({cols:ve.columns??_.cols,rows:ve.rows??_.rows})},ee=P=>{W.handleInput(P)};we.setRawMode(!0),we.resume(),we.on("data",ee),process.on("SIGWINCH",X),process.on("SIGINT",T),W.start()})}function f(){return new Promise(b=>{let N={write:X=>{ve.write(X)},exit:()=>{},end:()=>{},on:()=>{}},I={cols:ve.columns??80,rows:ve.rows??24},v=we.listeners("data");for(let X of v)we.off("data",X);let _=we.listeners("keypress");for(let X of _)we.off("keypress",X);function x(){process.off("SIGWINCH",T),process.off("SIGINT",W),we.off("data",D);for(let X of v)we.on("data",X);for(let X of _)we.on("keypress",X);ve.write("\x1B[?25h\x1B[0m"),u.resume(),b()}we.isTTY&&we.setRawMode(!0),we.resume();let E=new Yr({stream:N,terminalSize:I,onExit:x});function D(X){E.handleInput(X)}function T(){}function W(){E.stop(),x()}we.on("data",D),process.on("SIGWINCH",T),process.on("SIGINT",W),E.start()})}async function m(b){if(b.onPassword){let _=b.prompt;for(;;){let x=await Tn(u,_),E=await b.onPassword(x,he);if(E.result===null){_=E.nextPrompt??_;continue}await g(E.result);return}}let N=await Tn(u,b.prompt);if(!he.users.verifyPassword(b.username,N)){process.stderr.write(`Sorry, try again.
`);return}if(!b.commandLine){o.push({authUser:s,cwd:i}),s=b.targetUser,i=fe(s),n.vars.PWD=i,await Rt(s,nt,i,n,he);return}let I=b.loginShell?fe(b.targetUser):i,v=await ge(b.commandLine,b.targetUser,nt,"shell",I,he,void 0,n);await g(v)}async function h(b){let N=await Tn(u,b.prompt);if(b.confirmPrompt&&await Tn(u,b.confirmPrompt)!==N){process.stderr.write(`passwords do not match
`);return}switch(b.action){case"passwd":he.users.setPassword(b.targetUsername,N),ve.write(`passwd: password updated successfully
`);break;case"adduser":if(!b.newUsername){process.stderr.write(`adduser: missing username
`);return}he.users.addUser(b.newUsername,N),ve.write(`adduser: user '${b.newUsername}' created
`);break;case"deluser":he.users.deleteUser(b.targetUsername),ve.write(`Removing user '${b.targetUsername}' ...
deluser: done.
`);break;case"su":o.push({authUser:s,cwd:i}),s=b.targetUsername,i=fe(s),n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=fe(s),n.vars.PWD=i;break;default:break}}async function g(b){if(b.openEditor){await p(b.openEditor.targetPath,b.openEditor.initialContent),S();return}if(b.openPacman){await f(),S();return}if(b.sudoChallenge){await m(b.sudoChallenge);return}if(b.passwordChallenge){await h(b.passwordChallenge);return}b.clearScreen&&(ve.write("\x1B[2J\x1B[H"),console.clear()),b.stdout&&ve.write(b.stdout.endsWith(`
`)?b.stdout:`${b.stdout}
`),b.stderr&&process.stderr.write(b.stderr.endsWith(`
`)?b.stderr:`${b.stderr}
`),b.switchUser&&o.push({authUser:s,cwd:i});let N=G1(s,i,b,n);if(s=N.authUser,i=N.cwd,b.switchUser&&await Rt(s,nt,i,n,he),b.closeSession){nr();let I=o.pop();I===void 0?(u.close(),process.exit(b.exitCode??0)):(s=I.authUser,i=I.cwd,n.vars.USER=s,n.vars.LOGNAME=s,n.vars.HOME=fe(s),n.vars.PWD=i,n.vars.PS1=pt(s,nt).vars.PS1??"",ve.write(`logout
`))}}let y=()=>{if(n.vars.PS1)return Kr(s,nt,"",n.vars.PS1,i,!0);let b=i===fe(s)?"~":F1(i)||"/";return Kr(s,nt,b,void 0,void 0,!0)},S=()=>{u.setPrompt(y()),u.prompt()};if(s!=="root"&&process.env.USER!=="root"&&he.users.hasPassword(s)){let b=await Tn(u,`Password for ${s}: `);he.users.verifyPassword(s,b)||(process.stderr.write(`self-standalone: authentication failed
`),process.exit(1))}ve.write(hs(nt,he.properties,Ws(he.vfs,s))),js(he.vfs,s,a);for(let b of["/etc/environment",`${fe(s)}/.profile`,`${fe(s)}/.bashrc`])if(he.vfs.exists(b))for(let N of he.vfs.readFile(b).split(`
`)){let I=N.trim();if(!(!I||I.startsWith("#")))try{let v=await ge(I,s,nt,"shell",i,he,void 0,n);v.stdout&&ve.write(v.stdout)}catch{}}nr();let w=!1;u.on("line",async b=>{if(w)return;w=!0,u.pause(),b.trim().length>0&&(l.at(-1)!==b&&(l.push(b),l.length>500&&(l=l.slice(l.length-500)),Gs(he.vfs,s,l)),d.history=[...l].reverse());let I=await ge(b,s,nt,"shell",i,he,void 0,n);await g(I),nr(),w=!1,u.resume(),S()}),u.on("SIGINT",()=>{ve.write(`^C
`),u.write("",{ctrl:!0,name:"u"}),S()}),u.on("close",()=>{let b=o.pop();b===void 0?(nr(),console.log(""),process.exit(0)):(s=b.authUser,nr(),ve.write(`logout
`),process.exit(0))}),S()}W1().catch(t=>{console.error("Failed to start readline SSH emulation:",t),process.exit(1)});var Th=!1;function j1(t){if(!Th){Th=!0,process.stdout.write(`
[${t}] Saving VFS...
`);try{he.vfs.stopAutoFlush()}catch{}process.exit(0)}}process.on("SIGTERM",()=>{j1("SIGTERM")});process.on("beforeExit",()=>{he.vfs.stopAutoFlush()});process.on("uncaughtException",t=>{console.error("Uncaught exception:",t)});process.on("unhandledRejection",(t,e)=>{console.error("Unhandled rejection at:",e,"error:",t)});
