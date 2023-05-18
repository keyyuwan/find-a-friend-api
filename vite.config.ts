import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['src/lib/setup-vitest.ts'],
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})
