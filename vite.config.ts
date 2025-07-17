import { execSync } from 'child_process';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { run } from 'vite-plugin-run';

const debouncedMetaBuild = debounceMetaOnChange();

export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
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
                        if (process.env.UPDATE_META === 'true') debouncedMetaBuild();
                    },
                },
            ]),
        ],
        optimizeDeps: {
            exclude: ['@bspk/ui'],
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
                '-/components': resolve(__dirname, '../bspk-ui/src/components'),
                '-/hooks': resolve(__dirname, '../bspk-ui/src/hooks'),
                '-/utils': resolve(__dirname, '../bspk-ui/src/utils'),
                '-/constants': resolve(__dirname, '../bspk-ui/src/constants'),
                '-/styles': resolve(__dirname, '../bspk-ui/src/styles'),
                '-/types': resolve(__dirname, '../bspk-ui/src/types'),
            },
        },
    });
};

/**
 * This function debounces the meta file rebuild process.
 *
 * @returns A debounced function that rebuilds the meta files.
 */
function debounceMetaOnChange() {
    let debouncedMetaTimeout: NodeJS.Timeout | null = null;
    return () => {
        if (debouncedMetaTimeout) clearTimeout(debouncedMetaTimeout);
        debouncedMetaTimeout = setTimeout(() => {
            try {
                execSync(`npm run meta`, { stdio: 'inherit' });
            } catch (error) {
                console.error('Error occurred while running meta:', error);
            }
        }, 3000);
    };
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */
