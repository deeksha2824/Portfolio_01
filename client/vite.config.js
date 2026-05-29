import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  cacheDir: '../node_modules/.vite-client',
  resolve: {
    preserveSymlinks: true
  },
  server: {
    fs: {
      strict: true,
      allow: ['..']
    }
  }
});
