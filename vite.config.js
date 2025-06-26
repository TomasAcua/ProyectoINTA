import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ['icon1.png', 'icon2.png'],
      manifest: {
        name: 'INTA - Calculadoras',
        short_name: 'INTA',
        description: 'Formulario INTA con soporte offline',
        theme_color: '#ec7028',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icon1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon2.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, 
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/sipan\.inta\.gob\.ar\/ws\/indicadores_maquinaria\.php/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 5,
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 24 * 60 * 60
              }
            }
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'document' ||
              request.destination === 'script' ||
              request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources'
            }
          }
        ]
      }
    })
  ],
  define: {
    'process.env': {},
    global: 'window'
  },
  optimizeDeps: {
    include: ['buffer']
  },
  server: {
    host: true
  }
})
