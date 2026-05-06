import { getCollection } from 'astro:content';
import products from '../data/products.json';

const siteUrl = 'https://www.chiaohsin.com.tw';
const currentDate = new Date().toISOString().split('T')[0];

// 靜態頁面
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly', lastmod: currentDate },
    { url: '/products', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
    { url: '/blog', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
    { url: '/about', priority: '0.8', changefreq: 'monthly', lastmod: currentDate },
    { url: '/news', priority: '0.7', changefreq: 'weekly', lastmod: currentDate },
    { url: '/contact', priority: '0.6', changefreq: 'monthly', lastmod: currentDate },
];

// 產品頁面
const productPages = products.map((product) => ({
    url: `/products/${product.id}`,
    priority: '0.8',
    changefreq: 'monthly',
    lastmod: currentDate,
}));

export async function GET() {
    const blogPosts = await getCollection('blog', ({ data }) => !data.draft);
    const blogPages = blogPosts.map((post) => ({
        url: `/blog/${post.id.replace(/\/index$/, '')}`,
        priority: '0.7',
        changefreq: 'monthly',
        lastmod: (post.data.updatedDate ?? post.data.publishDate).toISOString().split('T')[0],
    }));

    const allPages = [...staticPages, ...productPages, ...blogPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
