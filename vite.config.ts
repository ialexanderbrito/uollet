import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import loadVersion from 'vite-plugin-package-version';
import { VitePWA } from 'vite-plugin-pwa';
import ViteRadar from 'vite-plugin-radar';
import tsconfigPaths from 'vite-tsconfig-paths';

import manifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    loadVersion(),
    VitePWA({
      manifest,
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html}', '**/*.{svg,png,jpg,gif}'],
      },
    }),
    ViteRadar({
      analytics: {
        id: 'G-1JV6ZL1PXF',
      },
    }),
  ],
});
