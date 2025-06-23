import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': {},
    global: 'window',
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  server: {
    host: true,
  }
  // server: {
  //   host: true,
  //   proxy: {
  //     '/api/maquinaria': {
  //       target: 'http://sipan.inta.gob.ar',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api\/maquinaria/, '/ws/indicadores_maquinaria.php'),
  //     },
  //     '/api/productos': {
  //       target: 'http://sipan.inta.gob.ar',
  //       changeOrigin: true,
  //       rewrite: path => path.replace(/^\/api\/productos/, '/ws/indicadores_productos.php'),
  //     },
  //   },
  // },
})
