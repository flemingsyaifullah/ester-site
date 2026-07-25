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
  integrations: [
    sitemap({
      // Fix #1: Exclude admin panel from sitemap (security + SEO)
      filter: (page) => !page.includes('/admin-tz-7360/'),
      // Fix #2: Strip trailing slashes to match canonical URLs (no trailing slash)
      serialize(item) {
        const url = new URL(item.url);
        if (url.pathname !== '/') {
          item.url = item.url.replace(/\/$/, '');
        }
        return item;
      }
    })
  ]
});