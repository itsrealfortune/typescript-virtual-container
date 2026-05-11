/** biome-ignore-all lint/style/useNamingConvention: env vars */
import { parseScript } from "./VirtualShell/shellParser";
import type { CommandResult, ShellEnv } from "./types/commands";
import type { PipelineCommand, Statement } from "./types/pipeline";
import { expandAsync, expandSync } from "./utils/expand";

type WebCommandContext = {
	args: string[];
	stdin?: string;
	cwd: string;
	env: ShellEnv;
	rawInput: string;
	shell: WebShell;
};

type WebCommandHandler = (
	context: WebCommandContext,
) => CommandResult | Promise<CommandResult>;

interface WebCommand {
	name: string;
	description: string;
	params: string[];
	run: WebCommandHandler;
	aliases?: string[];
}

type WebFileNode = {
	type: "file";
	name: string;
	mode: number;
	createdAt: string;
	updatedAt: string;
	contentBase64: string;
};

type WebDirectoryNode = {
	type: "directory";
	name: string;
	mode: number;
	createdAt: string;
	updatedAt: string;
	children: WebNode[];
};

type WebNode = WebFileNode | WebDirectoryNode;

interface WebVfsSnapshot {
	root: WebDirectoryNode;
}

interface WebVfsOptions {
	databaseName?: string;
	storeName?: string;
	key?: string;
}

interface WebShellOptions {
	cwd?: string;
	vfs?: WebVfsOptions;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function encodeBase64(bytes: Uint8Array): string {
	let binary = "";
	for (const byte of bytes) binary += String.fromCharCode(byte);
	return btoa(binary);
}

function decodeBase64(base64: string): Uint8Array {
	const binary = atob(base64);
	const bytes = new Uint8Array(binary.length);
	for (let index = 0; index < binary.length; index += 1) {
		bytes[index] = binary.charCodeAt(index);
	}
	return bytes;
}

function normalizePath(inputPath: string, cwd = "/"): string {
	const raw = inputPath.startsWith("/") ? inputPath : `${cwd}/${inputPath}`;
	const parts = raw.split("/");
	const stack: string[] = [];

	for (const part of parts) {
		if (!part || part === ".") continue;
		if (part === "..") {
			stack.pop();
			continue;
		}
		stack.push(part);
	}

	return `/${stack.join("/")}` || "/";
}

function dirname(inputPath: string): string {
	const normalized = normalizePath(inputPath);
	if (normalized === "/") return "/";
	const parts = normalized.split("/").filter(Boolean);
	parts.pop();
	return parts.length > 0 ? `/${parts.join("/")}` : "/";
}

function basename(inputPath: string): string {
	const normalized = normalizePath(inputPath);
	if (normalized === "/") return "/";
	const parts = normalized.split("/").filter(Boolean);
	return parts.at(-1) ?? "/";
}

function cloneNode(node: WebNode): WebNode {
	if (node.type === "file") {
		return {
			...node,
			contentBase64: node.contentBase64,
		};
	}

	return {
		...node,
		children: node.children.map((child) => cloneNode(child)),
	};
}

function makeDirectory(name: string, mode: number): WebDirectoryNode {
	const now = new Date().toISOString();
	return {
		type: "directory",
		name,
		mode,
		createdAt: now,
		updatedAt: now,
		children: [],
	};
}

function makeFile(name: string, content: Uint8Array, mode: number): WebFileNode {
	const now = new Date().toISOString();
	return {
		type: "file",
		name,
		mode,
		createdAt: now,
		updatedAt: now,
		contentBase64: encodeBase64(content),
	};
}

function findChild(directory: WebDirectoryNode, name: string): WebNode | undefined {
	return directory.children.find((child) => child.name === name);
}

function setChild(directory: WebDirectoryNode, node: WebNode): void {
	const index = directory.children.findIndex((child) => child.name === node.name);
	if (index === -1) {
		directory.children.push(node);
		return;
	}
	directory.children[index] = node;
}

function removeChild(directory: WebDirectoryNode, name: string): void {
	directory.children = directory.children.filter((child) => child.name !== name);
}

function splitPath(pathValue: string): string[] {
	return normalizePath(pathValue).split("/").filter(Boolean);
}

type WebIndexedDbRequest<T> = {
	result: T;
	error: unknown;
	addEventListener(type: "success" | "error", listener: () => void): void;
};

type WebIndexedDbObjectStore = {
	get(key: string): WebIndexedDbRequest<unknown>;
	put(value: string, key: string): WebIndexedDbRequest<unknown>;
};

type WebIndexedDbTransaction = {
	objectStore(name: string): WebIndexedDbObjectStore;
	error: unknown;
	addEventListener(type: "complete" | "error" | "abort", listener: () => void): void;
};

type WebIndexedDbDatabase = {
	objectStoreNames: {
		contains(name: string): boolean;
	};
	createObjectStore(name: string): unknown;
	transaction(name: string, mode: "readonly" | "readwrite"): WebIndexedDbTransaction;
	close(): void;
};

type WebIndexedDbOpenRequest = {
	result: WebIndexedDbDatabase;
	error: unknown;
	addEventListener(type: "upgradeneeded" | "success" | "error", listener: () => void): void;
};

type WebIndexedDbFactory = {
	open(name: string, version?: number): WebIndexedDbOpenRequest;
};

const webGlobal = globalThis as typeof globalThis & { indexedDB?: WebIndexedDbFactory };

function promisifyRequest<T>(request: WebIndexedDbRequest<T>): Promise<T> {
	return new Promise((resolve, reject) => {
		request.addEventListener("success", () => resolve(request.result));
		request.addEventListener("error", () => reject(request.error));
	});
}

class IndexedDbMirrorVfs {
	private readonly databaseName: string;
	private readonly storeName: string;
	private readonly key: string;
	private root: WebDirectoryNode;

	constructor(options: WebVfsOptions = {}) {
		this.databaseName = options.databaseName ?? "typescript-virtual-container-web";
		this.storeName = options.storeName ?? "snapshots";
		this.key = options.key ?? "current";
		this.root = makeDirectory("", 0o755);
	}

	private async openDatabase(): Promise<WebIndexedDbDatabase> {
		return new Promise((resolve, reject) => {
			const indexedDbFactory = webGlobal.indexedDB;
			if (!indexedDbFactory) {
				reject(new Error("IndexedDB is not available in this environment"));
				return;
			}

			const request = indexedDbFactory.open(this.databaseName, 1);
			request.addEventListener("upgradeneeded", () => {
				const database = request.result;
				if (!database.objectStoreNames.contains(this.storeName)) {
					database.createObjectStore(this.storeName);
				}
			});
			request.addEventListener("success", () => resolve(request.result));
			request.addEventListener("error", () => reject(request.error));
		});
	}

	private async readSnapshot(): Promise<WebVfsSnapshot | null> {
		const database = await this.openDatabase();
		try {
			const transaction = database.transaction(this.storeName, "readonly");
			const store = transaction.objectStore(this.storeName);
			const request = store.get(this.key);
			const result = (await promisifyRequest(request)) as string | undefined;
			if (!result) return null;
			return JSON.parse(result) as WebVfsSnapshot;
		} finally {
			database.close();
		}
	}

	private async writeSnapshot(snapshot: WebVfsSnapshot): Promise<void> {
		const database = await this.openDatabase();
		try {
			const transaction = database.transaction(this.storeName, "readwrite");
			const store = transaction.objectStore(this.storeName);
			await promisifyRequest(store.put(JSON.stringify(snapshot), this.key));
			await new Promise<void>((resolve, reject) => {
				transaction.addEventListener("complete", () => resolve());
				transaction.addEventListener("error", () => reject(transaction.error));
				transaction.addEventListener("abort", () => reject(transaction.error));
			});
		} finally {
			database.close();
		}
	}

	private serializeNode(node: WebNode): WebNode {
		if (node.type === "file") return { ...node };
		return {
			...node,
			children: node.children.map((child) => this.serializeNode(child)),
		};
	}

	private deserializeNode(node: WebNode): WebNode {
		if (node.type === "file") return { ...node };
		return {
			...node,
			children: node.children.map((child) => this.deserializeNode(child)),
		};
	}

	private getNode(targetPath: string): WebNode {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") return this.root;

		const parts = splitPath(normalized);
		let current: WebNode = this.root;
		for (const part of parts) {
			if (current.type !== "directory") {
				throw new Error(`Not a directory: ${normalized}`);
			}
			const child = findChild(current, part);
			if (!child) throw new Error(`No such file or directory: ${normalized}`);
			current = child;
		}
		return current;
	}

	private ensureDirectory(targetPath: string, mode: number): WebDirectoryNode {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") return this.root;

		const parts = splitPath(normalized);
		let current = this.root;
		for (const part of parts) {
			const existing = findChild(current, part);
			if (!existing) {
				const created = makeDirectory(part, mode);
				setChild(current, created);
				current = created;
				continue;
			}
			if (existing.type !== "directory") {
				throw new Error(`Cannot create directory '${normalized}': path is a file.`);
			}
			current = existing;
		}
		return current;
	}

	private removeNode(targetPath: string, recursive: boolean): void {
		const normalized = normalizePath(targetPath);
		if (normalized === "/") throw new Error("Cannot remove root directory");
		const parent = this.getNode(dirname(normalized));
		if (parent.type !== "directory") throw new Error(`Not a directory: ${dirname(normalized)}`);
		const name = basename(normalized);
		const node = findChild(parent, name);
		if (!node) throw new Error(`No such file or directory: ${normalized}`);
		if (node.type === "directory" && node.children.length > 0 && !recursive) {
			throw new Error(`Cannot remove '${normalized}': directory not empty.`);
		}
		removeChild(parent, name);
	}

	private copyNode(node: WebNode): WebNode {
		if (node.type === "file") {
			return {
				...node,
				contentBase64: node.contentBase64,
			};
		}
		return {
			...node,
			children: node.children.map((child) => this.copyNode(child)),
		};
	}

	public async restoreMirror(): Promise<void> {
		const snapshot = await this.readSnapshot();
		if (!snapshot) return;
		this.root = this.deserializeNode(snapshot.root) as WebDirectoryNode;
	}

	public async flushMirror(): Promise<void> {
		await this.writeSnapshot({ root: this.serializeNode(this.root) as WebDirectoryNode });
	}

	public exists(targetPath: string): boolean {
		try {
			this.getNode(targetPath);
			return true;
		} catch {
			return false;
		}
	}

	public list(targetPath: string): string[] {
		const node = this.getNode(targetPath);
		if (node.type !== "directory") throw new Error(`Not a directory: ${targetPath}`);
		return node.children.map((child) => child.name).sort((a, b) => a.localeCompare(b));
	}

	public stat(targetPath: string): {
		type: "file" | "directory";
		mode: number;
		size: number;
		name: string;
	} {
		const node = this.getNode(targetPath);
		if (node.type === "file") {
			return {
				type: "file",
				mode: node.mode,
				size: decodeBase64(node.contentBase64).byteLength,
				name: node.name,
			};
		}
		return { type: "directory", mode: node.mode, size: 0, name: node.name };
	}

	public readFile(targetPath: string): string {
		const node = this.getNode(targetPath);
		if (node.type !== "file") throw new Error(`Is a directory: ${targetPath}`);
		return textDecoder.decode(decodeBase64(node.contentBase64));
	}

	public writeFile(
		targetPath: string,
		content: string | Uint8Array,
		mode = 0o644,
	): void {
		const normalized = normalizePath(targetPath);
		const parent = this.ensureDirectory(dirname(normalized), 0o755);
		const bytes = typeof content === "string" ? textEncoder.encode(content) : content;
		const file = makeFile(basename(normalized), bytes, mode);
		setChild(parent, file);
	}

	public mkdir(targetPath: string, mode = 0o755): void {
		this.ensureDirectory(targetPath, mode);
	}

	public touch(targetPath: string): void {
		if (this.exists(targetPath)) return;
		this.writeFile(targetPath, "");
	}

	public move(fromPath: string, toPath: string): void {
		const source = this.getNode(fromPath);
		const sourceParent = this.getNode(dirname(fromPath));
		const destinationParent = this.ensureDirectory(dirname(toPath), 0o755);
		if (sourceParent.type !== "directory") throw new Error(`Not a directory: ${dirname(fromPath)}`);
		removeChild(sourceParent, basename(fromPath));
		const clone = cloneNode(source);
		clone.name = basename(toPath);
		setChild(destinationParent, clone);
	}

	public copy(fromPath: string, toPath: string): void {
		const source = this.getNode(fromPath);
		const destinationParent = this.ensureDirectory(dirname(toPath), 0o755);
		const clone = this.copyNode(source);
		clone.name = basename(toPath);
		setChild(destinationParent, clone);
	}

	public remove(targetPath: string, options: { recursive?: boolean } = {}): void {
		this.removeNode(targetPath, options.recursive ?? false);
	}

	public exportSnapshot(): WebVfsSnapshot {
		return { root: this.serializeNode(this.root) as WebDirectoryNode };
	}

	public importSnapshot(snapshot: WebVfsSnapshot): void {
		this.root = this.deserializeNode(snapshot.root) as WebDirectoryNode;
	}
}

class WebShell {
	readonly hostname: string;
	readonly vfs: IndexedDbMirrorVfs;
	readonly env: ShellEnv;
	private cwd: string;
	private readonly commands = new Map<string, WebCommand>();
	private initialized = false;

	constructor(hostname: string, options: WebShellOptions = {}) {
		this.hostname = hostname;
		this.cwd = options.cwd ?? "/home/root";
		this.env = {
			vars: {
				PATH: "/usr/bin:/bin",
				HOME: "/home/root",
				USER: "root",
				LOGNAME: "root",
				SHELL: "/bin/sh",
				HOSTNAME: hostname,
				PWD: this.cwd,
			},
			lastExitCode: 0,
		};
		this.vfs = new IndexedDbMirrorVfs(options.vfs);
		this.registerBuiltins();
	}

	private register(command: WebCommand): void {
		this.commands.set(command.name, command);
		for (const alias of command.aliases ?? []) {
			this.commands.set(alias, command);
		}
	}

	private registerBuiltins(): void {
		this.register({
			name: "help",
			description: "List available web commands",
			params: [],
			run: () => ({ stdout: `${this.listCommands().join("\n")}\n`, exitCode: 0 }),
		});

		this.register({
			name: "pwd",
			description: "Print current directory",
			params: [],
			run: () => ({ stdout: `${this.cwd}\n`, exitCode: 0 }),
		});

		this.register({
			name: "cd",
			description: "Change current directory",
			params: ["[dir]"],
			run: ({ args }) => {
				const target = args[0] ? normalizePath(args[0], this.cwd) : "/home/root";
				if (!this.vfs.exists(target) || this.vfs.stat(target).type !== "directory") {
					return { stderr: `cd: no such file or directory: ${target}`, exitCode: 1 };
				}
				this.cwd = target;
				this.env.vars.PWD = target;
				return { exitCode: 0, nextCwd: target };
			},
		});

		this.register({
			name: "echo",
			description: "Display text",
			params: ["[-n] [-e] [text...]"],
			run: ({ args, stdin }) => {
				const noNewline = args.includes("-n");
				const raw = args.filter((arg) => arg !== "-n" && arg !== "-e" && arg !== "-E");
				const text = raw.length > 0 ? raw.join(" ") : (stdin ?? "");
				const expanded = expandSync(text, this.env.vars, this.env.lastExitCode, this.env.vars.HOME);
				return { stdout: noNewline ? expanded : `${expanded}\n`, exitCode: 0 };
			},
		});

		this.register({
			name: "env",
			description: "Print environment variables",
			params: [],
			run: () => ({ stdout: `${Object.entries(this.env.vars).map(([key, value]) => `${key}=${value}`).join("\n")}\n`, exitCode: 0 }),
		});

		this.register({
			name: "export",
			description: "Set environment variables",
			params: ["KEY=VALUE..."],
			run: ({ args }) => {
				for (const arg of args) {
					const eq = arg.indexOf("=");
					if (eq === -1) continue;
					const key = arg.slice(0, eq).trim();
					const value = arg.slice(eq + 1);
					if (key) this.env.vars[key] = value;
				}
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "unset",
			description: "Unset environment variables",
			params: ["NAME..."],
			run: ({ args }) => {
				for (const name of args) delete this.env.vars[name];
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "mkdir",
			description: "Create directories",
			params: ["[-p] dir..."],
			run: async ({ args }) => {
				const paths = args.filter((arg) => arg !== "-p");
				for (const target of paths) {
					this.vfs.mkdir(normalizePath(target, this.cwd));
				}
				await this.vfs.flushMirror();
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "touch",
			description: "Create files",
			params: ["file..."],
			run: async ({ args }) => {
				for (const target of args) {
					this.vfs.touch(normalizePath(target, this.cwd));
				}
				await this.vfs.flushMirror();
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "rm",
			description: "Remove files or directories",
			params: ["[-r] [-f] path..."],
			run: async ({ args }) => {
				const recursive = args.includes("-r");
				const targets = args.filter((arg) => arg !== "-r" && arg !== "-f");
				for (const target of targets) {
					this.vfs.remove(normalizePath(target, this.cwd), { recursive });
				}
				await this.vfs.flushMirror();
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "cp",
			description: "Copy files or directories",
			params: ["[-r] source destination"],
			run: async ({ args }) => {
				const recursive = args.includes("-r");
				const items = args.filter((arg) => arg !== "-r");
				if (items.length < 2) return { stderr: "cp: missing destination file operand", exitCode: 1 };
				const dest = normalizePath(items.at(-1)!, this.cwd);
				for (const source of items.slice(0, -1)) {
					const sourcePath = normalizePath(source, this.cwd);
					if (!recursive && this.vfs.stat(sourcePath).type === "directory") {
						return { stderr: `cp: -r not specified; omitting directory '${sourcePath}'`, exitCode: 1 };
					}
					this.vfs.copy(sourcePath, dest);
				}
				await this.vfs.flushMirror();
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "mv",
			description: "Move or rename files",
			params: ["source destination"],
			run: async ({ args }) => {
				if (args.length < 2) return { stderr: "mv: missing destination file operand", exitCode: 1 };
				const source = normalizePath(args[0]!, this.cwd);
				const destination = normalizePath(args[1]!, this.cwd);
				this.vfs.move(source, destination);
				await this.vfs.flushMirror();
				return { exitCode: 0 };
			},
		});

		this.register({
			name: "cat",
			description: "Concatenate files",
			params: ["[file...]"],
			run: ({ args, stdin }) => {
				if (args.length === 0) return { stdout: stdin ?? "", exitCode: 0 };
				let output = "";
				for (const source of args) {
					output += this.vfs.readFile(normalizePath(source, this.cwd));
				}
				return { stdout: output, exitCode: 0 };
			},
		});

		this.register({
			name: "ls",
			description: "List files",
			params: ["[path]"],
			run: ({ args }) => {
				const target = normalizePath(args[0] ?? ".", this.cwd);
				const entries = this.vfs.list(target);
				return { stdout: `${entries.join("  ")}\n`, exitCode: 0 };
			},
		});

		this.register({
			name: "tee",
			description: "Read from stdin and write to files",
			params: ["[-a] file..."],
			run: async ({ args, stdin }) => {
				const append = args.includes("-a");
				const targets = args.filter((arg) => arg !== "-a");
				const content = stdin ?? "";
				for (const target of targets) {
					const normalized = normalizePath(target, this.cwd);
					if (append && this.vfs.exists(normalized)) {
						const current = this.vfs.readFile(normalized);
						this.vfs.writeFile(normalized, `${current}${content}`);
					} else {
						this.vfs.writeFile(normalized, content);
					}
				}
				await this.vfs.flushMirror();
				return { stdout: content, exitCode: 0 };
			},
		});

		this.register({
			name: "curl",
			description: "Fetch a URL and optionally write to a file",
			params: ["[-o file] URL"],
			run: async ({ args }) => {
				const outputIndex = args.indexOf("-o");
				const outputTarget = outputIndex !== -1 ? args[outputIndex + 1] : undefined;
				const filtered = args.filter((arg, index) => arg !== "-o" && index !== outputIndex + 1);
				const url = filtered.at(-1);
				if (!url) return { stderr: "curl: missing URL", exitCode: 2 };
				const response = await fetch(url);
				const body = await response.text();
				if (outputTarget) {
					this.vfs.writeFile(normalizePath(outputTarget, this.cwd), body);
					await this.vfs.flushMirror();
					return { exitCode: response.ok ? 0 : 1 };
				}
				return { stdout: body, exitCode: response.ok ? 0 : 1 };
			},
		});

		this.register({
			name: "wget",
			description: "Fetch a URL and optionally write to a file",
			params: ["[-O file] URL"],
			run: async ({ args }) => {
				const outputIndex = args.indexOf("-O");
				const outputTarget = outputIndex !== -1 ? args[outputIndex + 1] : undefined;
				const filtered = args.filter((arg, index) => arg !== "-O" && index !== outputIndex + 1);
				const url = filtered.at(-1);
				if (!url) return { stderr: "wget: missing URL", exitCode: 2 };
				const response = await fetch(url);
				const body = await response.text();
				const filename = outputTarget ?? basename(new URL(url).pathname || "index.html");
				this.vfs.writeFile(normalizePath(filename, this.cwd), body);
				await this.vfs.flushMirror();
				return { exitCode: response.ok ? 0 : 1 };
			},
		});

		this.register({
			name: "true",
			description: "Return success",
			params: [],
			run: () => ({ exitCode: 0 }),
		});

		this.register({
			name: "false",
			description: "Return failure",
			params: [],
			run: () => ({ exitCode: 1 }),
		});
	}

	private listCommands(): string[] {
		const unique = new Map<string, WebCommand>();
		for (const command of this.commands.values()) unique.set(command.name, command);
		return Array.from(unique.values())
			.sort((a, b) => a.name.localeCompare(b.name))
			.map((command) => `${command.name}${command.params.length > 0 ? ` ${command.params.join(" ")}` : ""}`);
	}

	private resolveCommand(name: string): WebCommand | undefined {
		return this.commands.get(name.toLowerCase());
	}

	public async ensureInitialized(): Promise<void> {
		if (this.initialized) return;
		await this.vfs.restoreMirror();
		if (!this.vfs.exists("/home")) this.vfs.mkdir("/home");
		if (!this.vfs.exists("/home/root")) {
			this.vfs.mkdir("/home/root");
			this.vfs.writeFile("/home/root/README.txt", `Welcome to ${this.hostname}\n`);
		}
		if (!this.vfs.exists("/tmp")) this.vfs.mkdir("/tmp");
		if (!this.vfs.exists("/etc")) this.vfs.mkdir("/etc");
		if (!this.vfs.exists("/etc/hostname")) this.vfs.writeFile("/etc/hostname", `${this.hostname}\n`);
		if (!this.vfs.exists("/etc/hosts")) {
			this.vfs.writeFile("/etc/hosts", "127.0.0.1 localhost\n::1 localhost\n");
		}
		this.initialized = true;
	}

	public getCurrentWorkingDirectory(): string {
		return this.cwd;
	}

	public async executeCommandLine(rawInput: string, persist = true): Promise<CommandResult> {
		await this.ensureInitialized();
		const trimmed = rawInput.trim();
		if (!trimmed) return { exitCode: 0 };

		const expanded = await expandAsync(
			trimmed,
			this.env.vars,
			this.env.lastExitCode,
			(subcommand) => this.executeCommandLine(subcommand, false).then((r) => r.stdout ?? ""),
		);

		const script = parseScript(expanded);
		const result = await this.executeStatements(script.statements);
		this.env.lastExitCode = result.exitCode ?? 0;
		if (persist) await this.vfs.flushMirror();
		return result;
	}

	private async executeStatements(statements: Statement[]): Promise<CommandResult> {
		let last: CommandResult = { exitCode: 0 };
		let index = 0;

		while (index < statements.length) {
			const stmt = statements[index]!;
			last = await this.executePipeline(stmt.pipeline.commands as PipelineCommand[]);
			this.env.lastExitCode = last.exitCode ?? 0;
			if (last.closeSession || last.switchUser) return last;

			const op = stmt.op;
			if (!op || op === ";") {
				// continue
			} else if (op === "&&") {
				if ((last.exitCode ?? 0) !== 0) {
					while (index < statements.length && statements[index]?.op === "&&") index += 1;
				}
			} else if (op === "||") {
				if ((last.exitCode ?? 0) === 0) {
					while (index < statements.length && statements[index]?.op === "||") index += 1;
				}
			}
			index += 1;
		}

		return last;
	}

	private async executePipeline(commands: PipelineCommand[]): Promise<CommandResult> {
		if (commands.length === 0) return { exitCode: 0 };
		if (commands.length === 1) {
			return this.executeSingleCommandWithRedirections(commands[0]!);
		}
		return this.executePipelineChain(commands);
	}

	private async executeSingleCommandWithRedirections(command: PipelineCommand): Promise<CommandResult> {
		let stdin: string | undefined;
		if (command.inputFile) {
			const inputPath = normalizePath(command.inputFile, this.cwd);
			try {
				stdin = this.vfs.readFile(inputPath);
			} catch {
				return { stderr: `${command.inputFile}: No such file or directory`, exitCode: 1 };
			}
		}

		const result = await this.executeCommand(command.name, command.args, stdin);

		if (command.outputFile) {
			const outputPath = normalizePath(command.outputFile, this.cwd);
			const output = result.stdout ?? "";
			if (command.appendOutput && this.vfs.exists(outputPath)) {
				const existing = this.vfs.readFile(outputPath);
				this.vfs.writeFile(outputPath, `${existing}${output}`);
			} else {
				this.vfs.writeFile(outputPath, output);
			}
			return { ...result, stdout: "" };
		}

		return result;
	}

	private async executePipelineChain(commands: PipelineCommand[]): Promise<CommandResult> {
		let currentOutput = "";
		let exitCode = 0;

		for (let index = 0; index < commands.length; index += 1) {
			const command = commands[index]!;
			if (index === 0 && command.inputFile) {
				const inputPath = normalizePath(command.inputFile, this.cwd);
				try {
					currentOutput = this.vfs.readFile(inputPath);
				} catch {
					return { stderr: `${command.inputFile}: No such file or directory`, exitCode: 1 };
				}
			}

			const result = await this.executeCommand(command.name, command.args, currentOutput);
			currentOutput = result.stdout ?? "";
			exitCode = result.exitCode ?? 0;
		}

		return { stdout: currentOutput, exitCode };
	}

	private async executeCommand(
		name: string,
		args: string[],
		stdin?: string,
	): Promise<CommandResult> {
		const command = this.resolveCommand(name);
		if (!command) {
			return { stderr: `${name}: command not found`, exitCode: 127 };
		}

		const expandedArgs = args.map((arg) => expandSync(arg, this.env.vars, this.env.lastExitCode, this.env.vars.HOME));
		const context: WebCommandContext = {
			args: expandedArgs,
			stdin,
			cwd: this.cwd,
			env: this.env,
			rawInput: `${name} ${args.join(" ")}`.trim(),
			shell: this,
		};

		try {
			const result = await command.run(context);
			if (result.nextCwd) {
				this.cwd = result.nextCwd;
				this.env.vars.PWD = result.nextCwd;
			}
			return result;
		} catch (error) {
			const message = error instanceof Error ? error.message : String(error);
			return { stderr: message, exitCode: 1 };
		}
	}
}

export { IndexedDbMirrorVfs, WebShell };
export function createWebShell(hostname = "typescript-vm", options: WebShellOptions = {}): WebShell {
	return new WebShell(hostname, options);
}
export type { WebCommand, WebCommandContext, WebShellOptions, WebVfsOptions };
