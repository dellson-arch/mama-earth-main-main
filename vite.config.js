import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"
// Removed: import tailwindConfig from "./tailwind.config"

export default defineConfig({
  plugins: [react()], // Corrected: Only react() plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
