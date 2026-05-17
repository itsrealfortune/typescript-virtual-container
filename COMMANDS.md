---
title: Commands Reference
group: Guides
---

# Commands Reference — typescript-virtual-container

~112 built-in commands across 13 categories. Each command implements the `ShellModule` interface.

<details>
<summary>Architecture — registry, runtime, execution pipeline</summary>

| File | Purpose |
|---|---|
| `registry.ts` | Central registry — defines all `ShellModule` entries, provides `resolveModule()`, `registerCommand()` |
| `runtime.ts` | Execution engine — `runCommand()` (full pipeline: history, alias, sh-syntax, pipes, redirects, brace, glob) and `runCommandDirect()` |
| `command-helpers.ts` | `parseArgs()`, `ifFlag()`, `getFlag()`, `getArg()` — argument parsing utilities |
| `command-executor.ts` | `executeStatements()` — executes parsed AST with pipes, redirects, logical operators |
| `help.ts` | Dynamic `help` command — groups commands by category |
| `man.ts` | Manual page viewer — checks VFS then bundled `MANUALS` map |

### ShellModule interface

```typescript
interface ShellModule {
  name: string;
  params: string[];
  run: (ctx: CommandContext) => CommandResult | Promise<CommandResult>;
  aliases?: string[];
  description?: string;
  category?: string;
}
```

### Execution pipeline

1. **History expansion** — `!!`, `!n`, `!-n` from `~/.bash_history`
2. **Alias expansion** — `__alias_<name>` env var check
3. **Sh-syntax detection** — `for`, `while`, `if`, functions, arithmetic — routes to `sh` interpreter
4. **Pipe/redirect/operator parsing** — `|`, `>`, `<`, `;`, `||`, `&&`
5. **Variable expansion** — `$VAR`, `${VAR}`, `$?`, `$((expr))`, `$(cmd)`
6. **Brace expansion** — `{a,b,c}` → `a b c`
7. **Glob expansion** — `*.txt` → matching VFS files
8. **Command resolution** — variable assignments → shell function → alias → registered module → VFS binary stub → error 127

</details>

---

## Navigation

| Command | Syntax | Description |
|---|---|---|
| `pwd` | `pwd` | Print working directory |
| `cd` | `cd [directory]` | Change directory (default: `$HOME`) |
| `ls` | `ls [-la] [path]` | List directory contents |
| `tree` | `tree [-a] [-d] [-L N] [dir]` | Display directory tree |

## Files & Filesystem

| Command | Syntax | Description |
|---|---|---|
| `cat` | `cat [-n] [-b] <file...>` | Concatenate and print files |
| `touch` | `touch <file...>` | Create empty file or update timestamps |
| `rm` | `rm [-r] [-f] <file...>` | Remove files/directories |
| `mkdir` | `mkdir [-p] <directory...>` | Create directories |
| `cp` | `cp [-r] <source> <dest>` | Copy files/directories |
| `mv` | `mv <source> <dest>` | Move or rename files |
| `ln` | `ln [-s] [-f] <target> <link_name>` | Create links |
| `readlink` | `readlink [-f] <file>` | Print resolved symlink target |
| `chmod` | `chmod <mode> <file...>` | Change file mode bits |
| `chown` | `chown <owner> <file...>` | Change file owner |
| `chgrp` | `chgrp <group> <file...>` | Change file group |
| `stat` | `stat [-c fmt] <file...>` | Display file status |
| `find` | `find [path] [-name p] [-type t]` | Search for files |
| `dd` | `dd if=<f> of=<f> [bs=N] [count=N]` | Convert and copy a file |
| `seq` | `seq [-s sep] [first [inc]] last` | Print numeric sequences |
| `realpath` | `realpath <path>` | Resolve symlinks, print absolute path |

## Text Processing

| Command | Syntax | Description |
|---|---|---|
| `grep` | `grep [-ivncrlq] <p> [file...]` | Search text with regex |
| `sed` | `sed <script> [file...]` | Stream editor |
| `awk` | `awk [-F fs] 'program' [file...]` | Pattern scanning |
| `sort` | `sort [-rnu] [file...]` | Sort lines |
| `uniq` | `uniq [-cdu] [in [out]]` | Report repeated lines |
| `wc` | `wc [-lwc] [file...]` | Line/word/byte counts |
| `head` | `head [-n N] [file...]` | First N lines |
| `tail` | `tail [-n N] [file...]` | Last N lines |
| `cut` | `cut [-bcdf] <list> [file...]` | Remove sections from lines |
| `tr` | `tr [-d] <set1> [set2]` | Translate/delete characters |
| `tee` | `tee [-a] [file...]` | Read stdin, write to stdout + files |
| `xargs` | `xargs [cmd [args]]` | Build command lines from stdin |
| `diff` | `diff [-uiwrq] <f1> <f2>` | Compare files |
| `basename` | `basename <path> [suffix]` | Strip directory from path |
| `dirname` | `dirname <path>` | Strip last component |
| `fold` | `fold [-w W] [file]` | Wrap lines to width |
| `expand` | `expand [-t N] [file]` | Convert tabs to spaces |
| `fmt` | `fmt [-w W] [file]` | Simple text formatter |
| `md5sum` | `md5sum <file>` | MD5 checksum |
| `sha256sum` | `sha256sum <file>` | SHA-256 checksum |
| `strings` | `strings <file>` | Extract printable strings |
| `join` | `join [-t sep] <f1> <f2>` | Join lines on common field |
| `comm` | `comm <f1> <f2>` | Compare sorted files |
| `split` | `split [-l N] [-b N] <f> [prefix]` | Split file into pieces |
| `csplit` | `csplit <f> <pattern...>` | Split by context patterns |
| `shuf` | `shuf [-n N] [-i lo-hi] [file]` | Random permutation |
| `paste` | `paste [-d delim] [file...]` | Merge lines side-by-side |
| `tac` | `tac [file...]` | Reverse cat |
| `nl` | `nl [-ba] [-nrz] [file]` | Number lines |
| `column` | `column [-t] [-s sep] [file]` | Columnate lists |

## Archive & Compression

| Command | Syntax | Description |
|---|---|---|
| `tar` | `tar [-c\|-x\|-t] [-z] [-f a] [files]` | Archive utility |
| `gzip` | `gzip <file...>` | Compress files |
| `gunzip` | `gunzip <file...>` | Decompress gzip |
| `zip` | `zip <archive> <file...>` | Create zip archives |
| `unzip` | `unzip <archive>` | Extract zip |
| `bzip2` | `bzip2 <file...>` | Compress with bzip2 |
| `bunzip2` | `bunzip2 <file...>` | Decompress bzip2 |
| `base64` | `base64 [-d] [-w cols] [file]` | Base64 encode/decode |

## System Information

| Command | Syntax | Description |
|---|---|---|
| `whoami` | `whoami` | Print effective user name |
| `who` | `who [-abHq] [am i]` | Show logged-in users |
| `w` | `w [user]` | Show who is logged on and activity |
| `hostname` | `hostname` | Print hostname |
| `id` | `id [user]` | Print user/group IDs |
| `groups` | `groups [user]` | Print group memberships |
| `uname` | `uname [-a] [-r] [-m]` | Print system info |
| `ps` | `ps [-aux]` | Process snapshot |
| `kill` | `kill [-signal] <pid...>` | Send signals |
| `df` | `df [-h] [file...]` | Disk space usage |
| `du` | `du [-hs] [file...]` | File space usage |
| `date` | `date [+format]` | Print date/time |
| `uptime` | `uptime [-p] [-s]` | System uptime |
| `free` | `free [-hmg]` | Memory usage |
| `lscpu` | `lscpu` | CPU architecture info |
| `lspci` | `lspci` | List PCI devices |
| `lsusb` | `lsusb` | List USB devices |
| `lsb_release` | `lsb_release [-aidrcs]` | Distribution info |
| `lsof` | `lsof` | List open files |
| `strace` | `strace <cmd> [args]` | Trace syscalls |
| `dmesg` | `dmesg [-nTcH]` | Kernel ring buffer |
| `last` | `last [-n N] [-F] [user]` | Login history |
| `ip` | `ip [addr\|link\|route\|neigh]` | Network device/routing |
| `nproc` | `nproc [--all]` | Number of CPUs |
| `pgrep` | `pgrep <pattern>` | Lookup processes by name |
| `pkill` | `pkill [-sig] <pattern>` | Kill processes by name |
| `top` | `top` | Interactive process viewer |
| `nice` | `nice [-n N] <cmd> [args]` | Run with adjusted priority |
| `nohup` | `nohup <cmd> [args]` | Run immune to hangups |
| `bc` | `bc [expr]` | Arbitrary precision calculator |

## Network

| Command | Syntax | Description |
|---|---|---|
| `curl` | `curl [-o f] [-X m] [-d d] [-H h] [-sILv] <url>` | HTTP/S transfer (real `fetch()`) |
| `wget` | `wget [-O f] [-P d] [-q] <url>` | Non-interactive downloader |
| `nc` | `nc <host> <port>` | TCP/UDP connections |
| `ping` | `ping [-c N] <host>` | Mock ICMP echo |
| `ssh` | `ssh <user>@<host>` | Mock SSH client |
| `sftp` | `sftp <user>@<host>` | Mock SFTP client |
| `ifconfig` | `ifconfig [-a] [interface]` | Network interface config |

## Users & Permissions

| Command | Syntax | Description |
|---|---|---|
| `adduser` | `adduser <username>` | Create user (interactive, root-only) |
| `deluser` | `deluser [-f] <username>` | Remove user |
| `passwd` | `passwd [user]` | Change password |
| `sudo` | `sudo [-i] [-u u] <cmd>` | Execute as another user |
| `su` | `su [-] [user]` | Substitute user identity |
| `chmod` | `chmod <mode> <file...>` | Change file mode bits |

## Package Management

| Command | Syntax | Description |
|---|---|---|
| `apt` | `apt <install\|remove\|purge\|update\|upgrade\|search\|show\|list> [pkg...]` | Package manager frontend |
| `apt-cache` | `apt-cache <search\|show\|policy> <pkg>` | Query package cache |
| `dpkg` | `dpkg <-l\|-s\|-L\|-r\|-P> [pkg]` | Low-level package manager |
| `dpkg-query` | `dpkg-query [-W\|-l] [pkg]` | Query dpkg database |

## Shell & Scripting

| Command | Aliases | Syntax | Description |
|---|---|---|---|
| `echo` | — | `echo [-neE] [text...]` | Display text |
| `printf` | — | `printf <fmt> [args...]` | Format and print |
| `read` | — | `read [-rps] [-p p] <var...>` | Read stdin into variables |
| `export` | — | `export [-p] [n[=v]...]` | Set environment variable |
| `unset` | — | `unset <name...>` | Remove variables |
| `set` | — | `set [var=val] [+-efhmptuvx]` | Set/display shell vars |
| `env` | — | `env [-i] [n=v] [cmd]` | Run in modified environment |
| `source` | `.` | `source <f> [args...]` | Execute file in current shell |
| `sh` | `bash` | `sh [-c s] <file>` | POSIX shell interpreter |
| `exit` | — | `exit [n]` | Exit shell |
| `return` | — | `return [n]` | Return from function |
| `shift` | — | `shift [n]` | Shift positional params |
| `trap` | — | `trap [a] [sig...]` | Trap signals |
| `test` | — | `test <expr>` or `[ <expr> ]` | Conditional expression |
| `alias` | — | `alias [n[=v]...]` | Define/display aliases |
| `unalias` | — | `unalias <n...> \| -a` | Remove aliases |
| `type` | — | `type <name...>` | Show command interpretation |
| `which` | — | `which <cmd...>` | Locate command in $PATH |
| `declare` | `local, typeset` | `declare [-irxa] [n[=v]...]` | Declare variables |
| `true` | — | `true` | Do nothing, exit 0 |
| `false` | — | `false` | Do nothing, exit 1 |
| `help` | — | `help [command]` | List commands / show usage |
| `man` | — | `man <command>` | Display manual page |
| `history` | — | `history [n]` | Command history |
| `clear` | — | `clear` | Clear terminal |
| `sleep` | — | `sleep <seconds>` | Delay execution |
| `timeout` | — | `timeout <d> <cmd> [args]` | Run with time limit |
| `mktemp` | — | `mktemp [-d] [tpl]` | Create temp file/dir |
| `wait` | — | `wait [jobspec...]` | Wait for background jobs |
| `expr` | — | `expr <expr>` | Evaluate expression |
| `nano` | — | `nano <file>` | Terminal text editor |
| `jobs` | — | `jobs` | List background jobs |
| `bg` | — | `bg [jobspec]` | Resume job in background |
| `fg` | — | `fg [jobspec]` | Bring job to foreground |
| `tput` | — | `tput [-T t] <cap> [params]` | Terminfo query |
| `stty` | — | `stty [-a] [-g] [setting]` | Terminal line settings |
| `file` | — | `file [-bi] <file...>` | Determine file type |
| `perl` | — | `perl [-e s] [file]` | Perl interpreter (`apt install perl`) |
| `node` | — | `node [--version] [-e s] [-p v]` | JS runtime (`apt install nodejs`) |
| `npm` | — | `npm [--version] [cmd]` | Node package manager (`apt install npm`) |
| `npx` | — | `npx [--version] <cmd>` | Execute npm binaries |
| `python3` | — | `python3 [--version] [-V] [-c c]` | Python 3 (`apt install python3`) |
| `neofetch` | — | `neofetch` | System info art |
| `htop` | — | `htop [-d N] [-u u] [-p p]` | Interactive process viewer |

## Fun

| Command | Syntax | Description |
|---|---|---|
| `yes` | `yes [string]` | Output string repeatedly |
| `fortune` | `fortune` | Random adage |
| `cowsay` | `cowsay [msg]` | ASCII cow speaking |
| `cowthink` | `cowthink [msg]` | ASCII cow thinking |
| `cmatrix` | `cmatrix [-b] [-C c]` | Matrix-style falling characters |
| `sl` | `sl` | Steam locomotive |
| `pacman` | `pacman` | ASCII Pac-Man game |

## Desktop (browser only)

| Command | Syntax | Description |
|---|---|---|
| `startxfce4` | `startxfce4` | Start XFCE4 desktop session |
| `thunar` | `thunar [path]` | XFCE file manager |
| `mousepad` | `mousepad [file]` | XFCE text editor (`gedit`, `xed` aliases) |
