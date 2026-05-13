import esbuild from 'esbuild';

await esbuild.build({
    entryPoints: ['src/web-index.ts'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/web-index.js',
    platform: 'browser',
    alias: {
        'node:events': './polyfills/node_events/index.js',
        'node:path': './polyfills/node_path/index.js',
        'node:os': './polyfills/node_os/index.js',
        'node:fs': './polyfills/node_fs/index.js',
        'node:fs/promises': './polyfills/node_fs/promises.js',
        'node:crypto': './polyfills/node_crypto/index.js',
        'node:child_process': './polyfills/node_child_process/index.js',
        'node:zlib': './polyfills/node_zlib/index.js',
        'node:vm': './polyfills/node_vm/index.js',
    }, inject: ['./polyfills/process.js', './polyfills/buffer.js'],
});