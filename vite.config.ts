import { execSync } from 'child_process';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

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
        run([
            {
                name: 'UI Updates',
                condition: (file) => {
                    return file.includes('bspk-ui');
                },
                onFileChanged: ({ file }) => {
                    console.log(`File changed: ${file}`);
                    execSync(`npm run create-meta -- ${file.split('bspk-ui')[1]}`, { stdio: 'inherit' });
                },
            },
        ]),
    ],
    esbuild: {
        minifyIdentifiers: false,
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
