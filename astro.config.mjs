// @ts-check
import { readFileSync, readdirSync } from 'node:fs';
import { parse as parseYaml } from 'yaml';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 讀 blog/news 文章的 frontmatter，取得 publishDate/updatedDate 給 sitemap 當 lastmod。
// 其他頁面沒有可靠的更新日期來源，不硬填假日期。
function buildLastmodMap() {
    const map = new Map();
    for (const type of ['blog', 'news']) {
        const dir = `src/content/${type}`;
        for (const slug of readdirSync(dir)) {
            try {
                const raw = readFileSync(`${dir}/${slug}/index.md`, 'utf-8');
                const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
                if (!match) continue;
                const fm = parseYaml(match[1]);
                const date = fm.updatedDate ?? fm.publishDate;
                if (date) map.set(`/${type}/${slug}`, new Date(date).toISOString());
            } catch {
                // 沒有 index.md 或格式不符就跳過，不影響其他文章
            }
        }
    }
    return map;
}
const lastmodMap = buildLastmodMap();

// https://astro.build/config
export default defineConfig({
    site: 'https://chiaohsin.com.tw',
    integrations: [
        tailwind(),
        sitemap({
            serialize(item) {
                const pathname = new URL(item.url).pathname.replace(/\/$/, '');
                const lastmod = lastmodMap.get(pathname);
                if (lastmod) item.lastmod = lastmod;
                return item;
            },
        }),
    ],
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
