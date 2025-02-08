import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: ['gsap', '@gsap/react, react-icons'], // Force Vite to pre-bundle GSAP
  },
  server: {
    hmr: {
      overlay: false, // Disable overlay errors (optional)
    }
  }
});
