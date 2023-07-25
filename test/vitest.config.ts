import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      reporter: ['text', 'json'],
    },
    environment: 'jsdom',
    testTimeout: 600000,
    hookTimeout: 600000,
    threads: false,
  },
  resolve: {
    alias: {
      '@ensofinance/use-defi': path.resolve(__dirname, '../src'),
    },
  },
});
