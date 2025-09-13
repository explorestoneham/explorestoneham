import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Exclude API directory from Vite processing (Vercel serverless functions)
  server: {
    fs: {
      deny: ['**/api/**']
    }
  },
  optimizeDeps: {
    exclude: ['api']
  }
});
