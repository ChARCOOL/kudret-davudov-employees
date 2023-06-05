/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	base: '/kudret-davudov-employees/',
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/setupTests.ts']
	}
})
