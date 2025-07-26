import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js"
import { defineConfig, fixupConfigRules } from "eslint/config"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      ...fixupConfigRules(pluginReactConfig),
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off",
      // Add a rule for import path case sensitivity if needed, though it's harder to enforce directly in ESLint
      // You might need a separate tool or a pre-commit hook for this.
    },
  },
])
