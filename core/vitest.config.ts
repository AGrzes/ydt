import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
    exclude: ['node_modules', 'dist'],
    globals: true,
    passWithNoTests: true,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: './coverage',
    },
  },
})
