import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            include: ['src/components/**/*.ts'],
            exclude: ['src/components/**/*.test.ts', 'tests/**'],
        },
    },
})
