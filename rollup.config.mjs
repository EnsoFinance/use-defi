import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default {
  input: 'hooks/index.ts',
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
  plugins: [resolve(), typescript(), dts()],
  external: ['react'],
};
