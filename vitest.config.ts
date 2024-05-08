import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./__tests__/setupTests.tsx"],
    deps: {
      inline: ["vitest-canvas-mock"],
    },
    globals: true,
    reporters: ["json", "verbose", "vitest-sonar-reporter"],
    outputFile: {
      "vitest-sonar-reporter": "testResults/sonar-report.xml",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./") }],
  },
});
