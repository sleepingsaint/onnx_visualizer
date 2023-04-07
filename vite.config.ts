import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  base: "/static/", // https://github.com/vitejs/vite/discussions/5081
  build: {
    outDir: "../backend/onnx_vis/static", // https://stackoverflow.com/a/66867648
    emptyOutDir: true,
  }
})
