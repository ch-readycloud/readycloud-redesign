import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Resolve figma:asset/* to a local placeholder when running outside Figma (e.g. npm run dev)
function figmaAssetPlugin() {
  return {
    name: 'figma-asset-alias',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) return '\0figma-asset:' + id
      return null
    },
    load(id: string) {
      if (id.startsWith('\0figma-asset:')) {
        return `export default '/placeholder.svg'`
      }
      return null
    },
  }
}

export default defineConfig({
  base: '/readycloud-website/',
  plugins: [
    figmaAssetPlugin(),
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
