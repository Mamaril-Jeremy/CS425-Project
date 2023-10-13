import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: './', // Set the base path for your application (adjust this according to your deployment environment)
  build: {
    outDir: 'dist', // Specify the output directory for the build
    assetsDir: '.', // Assets directory relative to outDir (root directory in this case)
    sourcemap: true, // Enable sourcemaps for debugging
  },
});