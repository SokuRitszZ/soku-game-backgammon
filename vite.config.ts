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
          output: [{
            name: 'index',
            entryFileNames: 'index.iife.js',
            format: 'iife',
          }, {
            entryFileNames: 'index.cjs.js',
            format: 'cjs',
          }, {
            entryFileNames: 'index.esm.js',
            format: 'esm',
          }],
          external: ['@soku-games/core'],
        },
      },
    };
  }
  return makeConfig(mode);
});
