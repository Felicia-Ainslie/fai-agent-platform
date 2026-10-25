import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // Build output contains CommonJS copies of the source tests, not new tests.
        exclude: [...configDefaults.exclude, "dist/**"],
    },
});
