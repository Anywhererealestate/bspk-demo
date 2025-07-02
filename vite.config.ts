//import { execSync } from 'child_process';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
//import { run } from 'vite-plugin-run';

// // This plugin will watch node_modules for changes and trigger a reload.
// // Works only for build --watch mode.
// // https://github.com/vitejs/vite/issues/8619
// export function pluginWatchNodeModules(modules: string[]) {
//     // Merge module into pipe separated string for RegExp() below.
//     const pattern = `/node_modules\\/(?!${modules.join('|')}).*/`;
//     return {
//         name: 'watch-node-modules',
//         configureServer: (server: ViteDevServer): void => {
//             server.watcher.options = {
//                 ...server.watcher.options,
//                 ignored: [new RegExp(pattern), '**/.git/**'],
//             };
//         },
//     };
// }

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
            },
        },
    },
    publicDir: './assets',
    plugins: [
        react(),
        //
        // pluginWatchNodeModules(['@bspk/ui']),
        // run([
        //     {
        //         name: 'UI Updates',
        //         condition: (file) => {
        //             return file.includes('bspk-ui');                },
        //         onFileChanged: ({ file }) => {
        //             console.log(`File changed: ${file}`);
        //             execSync(`npm run create-meta -- ${file.split('bspk-ui')[1]}`, { stdio: 'inherit' });
        //         },
        //     },
        // ]),
    ],
    optimizeDeps: {
        exclude: ['@bspk/ui'],
    },
    esbuild: {
        minifyIdentifiers: false,
        drop: ['console', 'debugger'],
    },
    server: {
        hmr: {
            host: 'localhost',
        },
        port: 8675,
        watch: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            paths: ['../bspk-ui/src/**/*'],
        },
    },
    preview: {
        port: 8080,
    },
    build: {
        outDir: './dist',
        emptyOutDir: true,
    },
    resolve: {
        alias: {
            src: '/src',
            components: '/src/components',
            utils: '/src/utils',
            tests: '/tests',
        },
    },
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
