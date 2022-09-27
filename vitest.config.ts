import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["test/**/*.test.ts"],
    environment: "node",
    threads: false,
    logHeapUsage: true,
    reporters: "verbose",
    globalSetup: "./test/setup.ts",
    coverage: {
      reporter: ["lcov", "text", "html"],
      reportsDirectory: "./coverage",
    },
  },
});
