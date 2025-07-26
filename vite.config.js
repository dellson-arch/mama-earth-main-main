import path from "path"
import tailwindcss from "@tailwindcss/vite" // Import tailwindcss plugin
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Include tailwindcss plugin here
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
