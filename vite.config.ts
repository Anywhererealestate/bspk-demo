import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: './assets',
    plugins: [react()],
    esbuild: {
        minifyIdentifiers: false,
    },
    server: {
        port: 8675,
    },
    preview: {
        port: 8080,
    },
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
});

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
