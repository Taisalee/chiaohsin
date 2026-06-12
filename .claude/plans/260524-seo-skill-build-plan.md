# 喬新 SEO Skill 建置計劃書

## 目標
為喬新針織網站建立兩個客製化 skill：
1. **SEO 健診 skill** — 掃描網站現況，產出優先修復清單
2. **SEO 產品描述 skill** — 為 products.json 產品寫 SEO 優化描述與 meta

## 研究摘要（2026-05-24）

### 找到的參考 skill

**產品 SEO 類：**
- `product-page-seo`（nexscope-ai, ⭐169）— 產品頁面 SEO 稽核框架、structured data、圖片 alt
- `product-description-seo`（flitzrrr, ⭐2）— JSON 型錄四段式描述生成、QA 流程、禁止空洞用語

**網站健診類：**
- `audit`（calm-north, ⭐7）— 五層框架（技術/頁面/內容/外連/競品）、90天行動計畫
- `site-health-audit`（coldtatooine, ⭐0）— 七階段技術掃描、Core Web Vitals 閾值、自訂框架專項

### 客製 skill 設計方向

**SEO 健診 skill** 合併：
- `site-health-audit` 的技術掃描七階段流程（不需要外部工具）
- `audit` 的評分框架與優先矩陣
- **喬新專項**：Astro frontmatter 檢查、sitemap 外掛、OG 標籤、hreflang `zh-TW`
- 直接指向專案路徑（`src/data/products.json`、`src/content/news/`、`public/`）

**SEO 產品描述 skill** 合併：
- `product-description-seo` 四段式描述結構
- `product-page-seo` structured data（Product schema）策略
- **喬新專項**：手套產業關鍵字（工業手套、棉紗手套、防靜電手套、食品級手套）、繁體中文語氣

## TODO

- [ ] 用 `/skill-creator` 建「SEO 健診」skill（參考 site-health-audit + audit）
- [ ] 用 `/skill-creator` 建「SEO 產品描述」skill（參考 product-description-seo + product-page-seo）
- [ ] 用健診 skill 對喬新網站跑一次健診，產出修復清單
- [ ] 根據健診清單逐項修復（meta、schema、alt、sitemap 等）

## 重要位置
- `src/data/products.json` - 產品資料，需加 SEO 描述
- `src/content/news/` - 最新消息文章，需檢查 frontmatter
- `public/` - 圖片存放，需檢查 alt 與 WebP 轉換
- `src/pages/` - 頁面檔案，需檢查 meta 標籤

## 備註
- 網站框架：Astro（靜態生成）
- 語言：繁體中文（zh-TW）
- 不需要考慮百度、只針對 Google
- 建 skill 前可先問用戶要合併成一個 skill 還是兩個分開的
