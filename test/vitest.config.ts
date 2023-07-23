import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      reporter: ['text', 'json'],
    },
    include: ['test/*.test.ts'],
    testTimeout: 600000,
    hookTimeout: 600000,
    threads: false,
  },
});
