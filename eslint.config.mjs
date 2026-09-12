import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "fracta-flow-vector/**",
    // Standalone AI Blueprint app (promotes to DaddysCoder/blue-print-ai-app):
    // it carries its own eslint config and is linted from its own directory.
    "blue-print-ai-app/**",
  ]),
]);

export default eslintConfig;
