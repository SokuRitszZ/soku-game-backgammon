import { defineConfig, presetIcons, presetMini } from 'unocss';

export default defineConfig({
  presets: [
    presetMini(),
    presetIcons(),
  ],
  shortcuts: {
    black_shadow: 'after:duration-200 after:content-empty after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-#0001',
  },
});