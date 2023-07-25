import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: `dist/index.js`,
        format: 'cjs',
      },
      {
        file: `dist/index.esm.js`,
        format: 'esm',
      },
    ],
    plugins: [
      replace({
        'process.env.ENSO_API': JSON.stringify(process.env.ENSO_API ?? ''),
        preventAssignment: true,
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      esbuild({
        jsx: 'transform', // default, or 'preserve'
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
      }),
    ],
    external: ['react'],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
      },
    ],
    plugins: [
      replace({
        'process.env.ENSO_API': JSON.stringify(process.env.ENSO_API ?? ''),
        preventAssignment: true,
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      dts(),
    ],
  },
];
