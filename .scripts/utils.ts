import { execSync } from 'child_process';
import path from 'path';

import packageJson from '../package.json';

export type Command = string | (() => Command[]);

export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>;
      }
    : T;

export function runCommands(commands: Command[]) {
    commands.forEach((command) => {
        if (typeof command === 'string') {
            execSync(command, { stdio: 'inherit' });
        }

        if (typeof command === 'function') {
            runCommands(command());
        }
    });
}
export function getUiPaths() {
    const dependency = packageJson?.dependencies?.['@bspk/ui'];

    const paths = { componentsDir: '', hooksDir: '', packagePath: '', rootPath: '', stylesDir: '' };

    if (dependency?.startsWith('file:')) {
        const sourcePath = path.resolve(dependency.slice(5));
        paths.rootPath = path.resolve(sourcePath, '..');
        paths.componentsDir = sourcePath;
        paths.hooksDir = path.resolve(sourcePath, 'hooks');
        paths.packagePath = path.resolve(sourcePath, '../package.json');
        paths.stylesDir = path.resolve(sourcePath, 'styles');
    } else {
        const sourcePath = path.resolve('./node_modules/@bspk/ui');
        paths.rootPath = path.resolve(sourcePath);
        paths.componentsDir = path.resolve(sourcePath, 'src');
        paths.hooksDir = path.resolve(sourcePath, 'src/hooks');
        paths.packagePath = path.resolve(sourcePath, 'package.json');
        paths.stylesDir = path.resolve(sourcePath, 'src/styles');
    }

    return paths;
}

/** Copyright 2025 Anywhere Real Estate - CC BY 4.0 */