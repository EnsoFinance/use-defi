import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      reporter: ['text', 'json'],
    },
    environment: 'jsdom',
    include: ['test/*.test.ts', '../src'],
    testTimeout: 600000,
    hookTimeout: 600000,
    threads: false,
  },
});
