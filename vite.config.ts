import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import uno from 'unocss/vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import sokuGames from '@soku-games/vite-plugin';

export default defineConfig({
  plugins: [
    solid(),
    uno(),
    cssInjectedByJsPlugin(),
    sokuGames(),
  ],
});
