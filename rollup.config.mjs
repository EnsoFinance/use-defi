import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import includePaths from 'rollup-plugin-includepaths';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/index.cjs.js`,
      format: 'cjs',
    },
    {
      file: `dist/index.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [resolve(), typescript(), dts(), includePaths({ paths: './src' })],
  external: ['react'],
};
