// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
    site: 'https://www.chiaohsin.com.tw',
    integrations: [tailwind(), sitemap()],
    build: {
        format: 'file'  // 輸出為 /products/1464759.html 而非 /products/1464759/index.html
    }
});
