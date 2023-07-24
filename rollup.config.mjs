import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import esbuild from 'rollup-plugin-esbuild';
import includePaths from 'rollup-plugin-includepaths';

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
      resolve(),
      commonjs(),
      includePaths({ paths: './src' }),
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
    plugins: [resolve(), commonjs(), includePaths({ paths: './src' }), dts()],
  },
];
