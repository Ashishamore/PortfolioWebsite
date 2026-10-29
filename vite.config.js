import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Link-preview tags in index.html need the site's full address for their image. Netlify provides it as URL
// at build time; set SITE_URL to use another one. With neither (e.g. the dev server), the path stays relative.
const siteUrl = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    { name: 'site-url', transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl) },
  ],
})
