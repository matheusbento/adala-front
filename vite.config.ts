import react from '@vitejs/plugin-react';
import path from 'path';

import { Alias, defineConfig } from 'vite';

import * as tsconfig from './tsconfig.paths.json';

function readAliasFromTsConfig(): Alias[] {
  // eslint-disable-next-line prefer-regex-literals
  const pathReplaceRegex = new RegExp(/\/\*$/, '');
  return Object.entries(tsconfig.compilerOptions.paths).reduce((aliases, [fromPaths, toPaths]) => {
    const find = fromPaths.replace(pathReplaceRegex, '');
    const toPath = toPaths[0].replace(pathReplaceRegex, '');
    const replacement = path.resolve(__dirname, toPath);
    aliases.push({ find, replacement });
    return aliases;
  }, [] as Alias[]);
}

export default defineConfig({
  css: { modules: { localsConvention: 'camelCase' } },
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  resolve: {
    alias: readAliasFromTsConfig(),
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
});
