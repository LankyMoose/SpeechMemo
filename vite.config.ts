import path from "node:path"
import { defineConfig } from "vite"
import kaioken from "vite-plugin-kaioken"

export default defineConfig({
  // esbuild: {
  //   sourcemap: false,
  // },
  resolve: {
    alias: {
      $: path.join(__dirname, "src"),
    },
  },
  plugins: [kaioken()],
})
