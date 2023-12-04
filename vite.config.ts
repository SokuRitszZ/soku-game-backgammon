import { defineConfig, PluginOption, UserConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    solid(),
    uno(),
    cssInjectedByJsPlugin(),
  ];
  function makeConfig(name: string): UserConfig {
    return {
      plugins,
      build: {
        outDir: `./dist-${name}`,
        rollupOptions: {
          input: `./src/${name}.ts`,
          output: {
            name: 'index',
            entryFileNames: 'index.js',
            format: 'iife',
          },
          external: ['@soku-games/core'],
        },
      },
    };
  }
  if (!['production', 'development'].includes(mode))
    return makeConfig(mode);
  else
    return {
      plugins,
      build: {
        outDir: './dist',
        rollupOptions: {
          input: {
            'core/index': './src/core.ts',
            'screen/index': './src/screen.ts',
          },
          output: [
            {
              entryFileNames: '[name].cjs',
              format: 'cjs',
            },
            {
              entryFileNames: '[name].mjs',
              format: 'esm',
            },
          ],
          external: ['@soku-games/core'],
        },
      },
    };
});
