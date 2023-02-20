import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["test/vitest/**/*.test.ts"],
    environment: "node",
    threads: false,
    logHeapUsage: true,
    reporters: "verbose",
    globalSetup: "./test/vitest/setup.ts",
    coverage: {
      reporter: ["lcov", "text", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
