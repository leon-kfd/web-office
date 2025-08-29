import path, { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa'

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/office',
  publicDir: 'public',
  server: {
    allowedHosts: ['test.kongfandong.cn']
  },
  resolve: {
    alias: {
      '@/lib': resolve(__dirname, 'lib'),
      '@/store': resolve(__dirname, 'store'),
      '@/assets': resolve(__dirname, 'assets'),
      '@/types': resolve(__dirname, 'types'),
      '@/styles': resolve(__dirname, 'styles'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      strategies: "generateSW",
      workbox: {
        maximumFileSizeToCacheInBytes: 4000000,
        globPatterns: ['**/*.{css,ico,png,svg,wasm,js}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.kongfandong\.cn\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-cache',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7 // <== 7 days
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      },
      manifest: {
        name: "Web Office",
        short_name: "Web Office",
        description: "在线Web版Office, 基于Only office",
        theme_color: "#ffffff",
        icons: [
          {
            src: "64.png",
            sizes: "192x192",
            type: "image/png",
          }
        ],
      },
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/base.css";`,
      },
    },
  },
});
