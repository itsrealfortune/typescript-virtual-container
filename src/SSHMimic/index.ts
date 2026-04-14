import { Server as SSHServer } from 'ssh2';
import VirtualFileSystem from '../VirtualFileSystem';
import { runExec } from './exec';
import { loadOrCreateHostKey } from './hostKey';
import { startShell } from './shell';

class SSHMimic {
    private port: number;
    private server: SSHServer | null;

    constructor(port: number) {
        this.port = port;
        this.server = null;
    }

    public start(): Promise<number> {
        const privateKey = loadOrCreateHostKey();
        const vfs = new VirtualFileSystem();

        this.server = new SSHServer(
            {
                hostKeys: [privateKey],
                ident: 'SSH-2.0-typescript-vm'
            },
            (client) => {
                let authUser = 'user';

                client.on('authentication', (ctx) => {
                    if (ctx.method === 'none' || ctx.method === 'password' || ctx.method === 'publickey') {
                        authUser = ctx.username || 'user';

                        vfs.mkdir('/home' + authUser, 0o755);
                        vfs.writeFile('/home' + authUser + '/README.txt', 'Welcome to typescript-vm');

                        ctx.accept();
                        return;
                    }
                    ctx.reject();
                });

                client.on('ready', () => {
                    client.on('session', (accept) => {
                        const session = accept();

                        session.on('pty', (acceptPty) => {
                            acceptPty();
                        });

                        session.on('shell', (acceptShell) => {
                            const stream = acceptShell();
                            startShell(stream, authUser, vfs);
                        });

                        session.on('exec', (acceptExec, _rejectExec, info) => {
                            const stream = acceptExec();
                            const cmd = info.command.trim();
                            runExec(stream, cmd, authUser, vfs);
                        });
                    });
                });
            }
        );

        return new Promise((resolve, reject) => {
            this.server?.once('error', (err: unknown) => reject(err));
            this.server?.listen(this.port, '127.0.0.1', () => {
                console.log(`SSH Mimic listening on port ${this.port}`);
                resolve(this.port);
            });
        });
    }

    public stop(): void {
        if (this.server) {
            this.server.close(() => {
                console.log('SSH Mimic stopped');
            });
        }
    }
}

export default SSHMimic;
