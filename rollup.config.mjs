import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import includePaths from 'rollup-plugin-includepaths';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.js`,
      format: 'cjs',
      exports: 'default',
    },
    {
      file: `dist/index.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [resolve(), esbuild(), dts(), includePaths({ paths: './src' })],
  external: ['react'],
};
