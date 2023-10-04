import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path, { resolve } from 'path';

import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@chakra-ui/react',
        'fabric',
        '@emotion/react',
        '@emotion/style',
      ],
    },
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  plugins: [react(), libInjectCss(), dts()],
});
