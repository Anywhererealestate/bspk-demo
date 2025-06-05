import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler', // or "modern"
            },
        },
    },
    publicDir: './assets',
    plugins: [react()],
    esbuild: {
        minifyIdentifiers: false,
    },
    server: {
        hmr: {
            host: 'localhost',
        },
        port: 8675,
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
