// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: "https://www.ester-globalindo.com",
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: "id",
    locales: ["id", "zh-cn"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [sitemap()]
});