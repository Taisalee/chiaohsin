import products from '../data/products.json';

const siteUrl = 'https://www.chiaohsin.com.tw';
const currentDate = new Date().toISOString().split('T')[0];

// 靜態頁面
const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/products', priority: '0.9', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/about/info', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
    { url: '/news', priority: '0.7', changefreq: 'weekly' },
];

// 產品頁面
const productPages = products.map((product) => ({
    url: `/products/${product.id}`,
    priority: '0.8',
    changefreq: 'monthly',
}));

// 合併所有頁面
const allPages = [...staticPages, ...productPages];

export async function GET() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
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
