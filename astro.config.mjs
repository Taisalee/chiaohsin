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
    },
    // 優化：靜態資源快取策略
    vite: {
        build: {
            // 啟用 CSS 代碼分割
            cssCodeSplit: true,
            // 圖片壓縮設置
            assetsInlineLimit: 4096,  // 小於 4KB 的圖片內聯
            rollupOptions: {
                output: {
                    // 資源輸出優化
                    assetFileNames: (assetInfo) => {
                        const name = assetInfo.names?.[0] ?? assetInfo.name ?? '';
                        if (/\.woff2?$/i.test(name)) {
                            return '_astro/fonts/[name][extname]';
                        } else if (/\.(png|jpe?g|gif|webp|svg)$/i.test(name)) {
                            return '_astro/images/[name]-[hash][extname]';
                        }
                        return '_astro/[name]-[hash][extname]';
                    }
                }
            }
        }
    }
});
