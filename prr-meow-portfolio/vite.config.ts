import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
  // Ensure Vite treats uppercase PNG files as assets for import
  assetsInclude: ['**/*.PNG', '**/*.png'],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});