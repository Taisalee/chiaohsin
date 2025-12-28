// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind()],
    build: {
        format: 'file'  // 輸出為 /products/1464759.html 而非 /products/1464759/index.html
    }
});
