import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entryPoints: ['src/index.ts'],
  dts: true,
  clean: true,
  format: ['esm'],
  ...options
}));
