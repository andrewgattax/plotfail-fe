import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: any) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /\/api\/.*$/i,
            handler: 'NetworkOnly',
          }
        ]

      },
      manifest: {
        theme_color: "#9ae600",
        background_color: "#110b37",
        icons: [
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png"
          },
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "screenshots/home.png",
            sizes: "380x802",
            type: "image/png"
          },
          {
            src: "screenshots/accedi.png",
            sizes: "381x803",
            type: "image/png"
          },
          {
            src: "screenshots/explore.png",
            sizes: "381x798",
            type: "image/png"
          }
        ],
        orientation: "portrait",
        display: "standalone",
        name: "Plotfail",
        short_name: "Plotfail",
        description: "Crea il caos nelle tue storie",
        id: "/"
      }
    }),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
