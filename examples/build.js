import esbuild from 'esbuild';

const ctx = await esbuild.context({
    entryPoints: ['app.ts'],
    bundle: true,
    format: 'esm',
    outfile: `app.js`,
    platform: 'browser',
    alias: {
        'node:events': '../polyfills/node_events/index.js',
        'node:path': '../polyfills/node_path/index.js',
        'node:os': '../polyfills/node_os/index.js',
        'node:fs': '../polyfills/node_fs/index.js',
        'node:fs/promises': '../polyfills/node_fs/promises.js',
        'node:crypto': '../polyfills/node_crypto/index.js',
        'node:child_process': '../polyfills/node_child_process/index.js',
        'node:zlib': '../polyfills/node_zlib/index.js',
        'node:vm': '../polyfills/node_vm/index.js',
        'ssh2': '../polyfills/ssh2/index.js',
    },
    minify: true,
    treeShaking: true,
    inject: ['../polyfills/process.js', '../polyfills/buffer.js'],
});

const watch = process.argv.includes('--watch');
if (watch) {
    await ctx.watch();
    console.log('watching...');
} else {
    await ctx.rebuild();
    console.log('build complete');
    process.exit(0);
}