import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: "./", // ✅ Ensures assets load correctly on Netlify
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
