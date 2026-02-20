import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            ignored: ['!**/node_modules/gui4vega-react/**']
        }
    },
    optimizeDeps: {
        exclude: ['gui4vega-react']
    }
})
