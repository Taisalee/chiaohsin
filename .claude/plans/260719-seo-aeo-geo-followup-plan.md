# SEO/AEO/GEO 優化後續 計劃書

## 目標
本 session 完成了大規模 SEO/AEO/GEO 優化（效能、首頁 FAQ、sitemap、網域 HTTPS 一致性等），已全部驗證並部署上線。僅剩一項內容類待辦。

## TODO
- [x] 圖片 alt 文字品質改善：套用 `ProductCard.astro` 既有公式 `{名稱}{尺寸} {分類}批發 - 喬新針織`，修正三處還在用通用 alt 的地方：`products/[id].astro:312` 主圖、`index.astro` 三處熱銷/建築五金/包裝材料縮圖（原本都是 `{p.name}` 或 `{product.name} 產品圖片`）。`ProductCard.astro` 本身、`about/index.astro`、`Footer.astro` QR code、blog 封面圖 alt 原本就已經是描述性文字，未變動。`Header.astro:179` 搜尋下拉選單縮圖 alt 維持原狀未改，因為是純前端 JS 動態渲染、爬蟲/掃描工具看不到初始 HTML，優先度低。已跑 `npm run build` 並檢查產出的 HTML 確認 alt 文字正確渲染。
- [ ] 包裝箱/捆單位換算：`products.json` 中 26 款手套產品的 `packaging` 欄位都只寫到「12雙/打」，沒有箱/捆層級的換算。**卡點**：實際整箱/整捆是幾打，屬於公司出貨慣例的事實資訊，不能用其他手套廠的常見慣例（如 10打/捆）代替猜測，需要使用者提供實際數字。曾嘗試詢問（各分類是否統一、還是依品項不同），使用者回覆「先暫緩」，故本項暫停，尚未動手。

## 已完成（新 session，AHHA GEO 掃描報告後續，尚未 commit/部署）
- 新增 `public/llms.txt`（llmstxt.org 格式）：品牌摘要 + 公司資訊/產品分類/知識專欄/最新消息/隱私權政策/服務條款的連結清單
- 內容頁日期標記補齊：
  - `src/layouts/Layout.astro` 新增 `publishedTime` / `modifiedTime` props，當 `ogType="article"` 時輸出 `article:published_time` / `article:modified_time` OG meta
  - `src/pages/blog/[slug].astro`：JSON-LD `BlogPosting` 補上 `dateModified`（`updatedDate ?? publishDate`），並把 publishedTime/modifiedTime 接到 Layout
  - `src/pages/news/[slug].astro`：JSON-LD 原本就有 datePublished/dateModified，這次補上 Layout 的 publishedTime/modifiedTime props（news 沒有 updatedDate 欄位，兩者皆用 publishDate）
- 已跑 `npm run build` 驗證：120 頁建置成功，blog/news 文章頁確認有輸出 `article:published_time`/`article:modified_time` meta 與 JSON-LD `dateModified`
- 觸發原因：使用者貼上 AHHA GEO 檢測報告，指出「llms.txt 存在」0/6 分、「日期標記」3/5 分（結構化資料/LocalBusiness/FAQPage/Author 標記皆滿分，不用動）
- AHHA SEO 報告另指出「找不到 /sitemap.xml」（2/3分）。已與用戶討論：`@astrojs/sitemap` 檔名規則寫死 `${filenameBase}-index.xml`，無法直接輸出 `/sitemap.xml`；且上個 session 才剛移除過期的手寫 `sitemap.xml.ts`。**用戶選擇「保持現狀，不處理這項」**，因為 robots.txt 已正確指向 sitemap-index.xml，GSC 也已驗證讀取成功
- 2026-07-19 用戶回報 GSC 顯示 `sitemap-index.xml` 狀態「成功」但已探索網頁數為 0，提交日期/上次讀取日期皆為當天——判斷為剛提交、Google 尚未回填爬取結果，屬正常現象，建議 1-2 天後複查，若持續為 0 才需要排查

## 已完成（先前 session，皆已 commit + 部署上線並驗證）
- 效能優化：商品縮圖系統、Header 搜尋改用獨立 `/search-index.json` 端點延遲載入、部落格封面圖 srcset
- SEO/AEO/GEO：首頁 FAQ 區塊＋schema、meta description/H1 改寫、BreadcrumbList 補齊、RSS feed（/blog/rss.xml、/news/rss.xml）、隱私權政策/服務條款頁、部落格作者署名「喬新針織編輯團隊」
- 網域一致性：canonical/OG/sitemap 全站改用實際生效的 `https://chiaohsin.com.tw`（非 www）
- **重大修復**：GitHub Pages 自訂網域的「Enforce HTTPS」因 Cloudflare DNS 代理擋住 Let's Encrypt 驗證而卡住，導致建置時 `Astro.site` 誤判為 http。已透過暫時關閉 Cloudflare 代理→GitHub 核發憑證→勾選 Enforce HTTPS→重新部署→恢復代理 的流程修復
- 清除重複的舊版 `src/pages/sitemap.xml.ts`（每頁 lastmod 寫死成當天日期），統一用 `@astrojs/sitemap` 產生的 `sitemap-index.xml`
- Google Search Console 已提交新 sitemap（`https://chiaohsin.com.tw/sitemap-index.xml`），確認讀取成功、120 個網址；舊的錯誤 sitemap 紀錄已移除

## 重要位置
- 商品圖 alt 文字目前寫法：`src/components/ProductCard.astro`、`src/pages/index.astro`（hp-item 圖片）、`src/pages/products/[id].astro` 主圖 —— alt 大多是 `{p.name}` 或類似樣板，是這次要改善的對象
- 縮圖產生腳本：`scripts/generate-product-thumbnails.js`（跟 alt 文字無關，不用動）
- 商品資料來源：`src/data/products.json`（可考慮加一個 `altText` 或更豐富的欄位，或直接在模板組合出更描述性的字串，例如「{name} - {category} - 喬新針織」之類，需與用戶討論實際格式）

## 備註
- 這項屬於「內容/文案」類，動手前建議先跟用戶討論改善方向與範例（比照本 session 先前的模式：先給草稿、用戶確認後再套用全站）
- 不確定 34 張是哪些圖片，可能需要重新跑一次 SEO 掃描工具，或從舊報告 CSV 找出 `geo_img_alt_quality` 那條的詳細清單（若還留著檔案的話），否則從商品圖 + 部落格圖 + logo 圖全面盤點
