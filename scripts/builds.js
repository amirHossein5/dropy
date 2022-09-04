const esbuild = require('esbuild');
const fs = require('fs');
console.time('\x1b[36m built in');

[
    'cdn.js',
    'dropy.js',
    'dropyListeners.js',
].forEach(file => {
    build(file);

    // minified
    let minifiedFile = file.replace('.js', '.min.js');

    build(minifiedFile, {
        minify: true,
        entryPoints: [`builds/${file}`],
    }).then(() => {
        outputSize(minifiedFile, `dist/${minifiedFile}`)
    });
})

function build (file, options) {
    return esbuild.build({
        watch: process.argv.includes('--watch'),
        entryPoints: [`builds/${file}`],
        outfile: `dist/${file}`,
        bundle: true,
        platform: 'browser',
        define: { CDN: true },
        ... options
    });
}

function outputSize(file, path) {
    console.log("\x1b[33m", `${file}: ${bytesToSize(fs.statSync(path).size)}`)
}

function bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return 'n/a'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    if (i === 0) return `${bytes} ${sizes[i]}`
    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

console.timeEnd('\x1b[36m built in');
