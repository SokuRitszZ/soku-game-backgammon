import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig(({ mode }) => {
  const plugins = [
    solid(),
    uno(),
    cssInjectedByJsPlugin(),
  ];

  if (mode === 'umd') {
    return {
      plugins,
      build: {
        minify: false,
        rollupOptions: {
          input: './src/all.ts',
          output: {
            format: 'umd',
            name: 'index',
            entryFileNames: 'dist.umd.js',
          },
          external: ['@soku-games/core'],
        },
      },
    };
  }
  return {
    plugins,
    build: {
      rollupOptions: {
        input: {
          'core/index': './src/index.ts',
          'screen/index': './src/screen.tsx',
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