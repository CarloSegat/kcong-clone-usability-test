import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    // supportFile: "src/cefrielForm.ts",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
