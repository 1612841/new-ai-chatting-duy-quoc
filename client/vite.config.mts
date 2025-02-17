/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  root: __dirname,
  cacheDir: '../node_modules/.vite/client',
  server: {
    port: 4200,
    host: 'localhost',
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), tailwindcss()],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'types': path.resolve(__dirname, 'src/types'),
      'store': path.resolve(__dirname, 'src/store'),
      'constants': path.resolve(__dirname, 'src/constants'),
      'apis': path.resolve(__dirname, 'src/apis'),
      'hooks': path.resolve(__dirname, 'src/hooks')
    },
  },
  envPrefix: "DQ"
});
