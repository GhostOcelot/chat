import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join } from 'path';

export default defineConfig({
  plugins: [react()],
  root: join(__dirname, '.'),

  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: join(__dirname, '../../dist/apps/frontend'),
    emptyOutDir: true,
    rollupOptions: {
      input: join(__dirname, 'index.html'),
    },
  },
});
