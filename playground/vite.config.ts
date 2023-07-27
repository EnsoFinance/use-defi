import replace from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    replace({
      'process.env.ENSO_API': JSON.stringify(process.env.ENSO_API ?? ''),
      preventAssignment: true,
    }),
  ],
});
