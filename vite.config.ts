import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [
    solid(),
    uno(),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'index',
      formats: ['cjs', 'es', 'iife', 'umd'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@soku-games/core'],
    },
  },
});