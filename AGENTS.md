# 喬新針織有限公司 - 網站開發專案

## 📋 專案目標與 Vibe

使用 **Astro + daisyUI** 建立一個現代化、專業且值得信賴的企業形象網站。

### 設計風格 (Vibe)
- **專業可靠**: 使用專業藍 (`#2563eb`) 作為主要色調，傳達製造業的穩重與專業度。
- **現代簡潔**: 版面配置俐落，資訊階層清晰，方便客戶快速找到產品與教學資訊。
- **現代工業風**: 結合高品質的工廠與產品攝影，展現公司優良的生產與品質管理。
- **互動體驗**: 透過微動效 (Hover effects) 與流暢的響應式設計，提升使用者感受。

### 核心標語
> 「手套封口部分為車頭，不會脫落，更加緊實的包覆著您的雙手」

---

## 🎨 設計系統 (Project Settings)

### 色彩系統 (daisyUI Context)
- **Primary**: `#2563eb` (專業藍)
- **Secondary**: `#059669` (安全綠)
- **Accent**: `#f59e0b` (活力橙)
- **背景**: `#ffffff` (Base-100) / `#f3f4f6` (淺背景)

### 字體規範
- 全域使用 `Noto Sans TC` (Google Fonts)。
- 標題加粗 (700)，內文標準 (400)。

---

## 🚀 開發流程 (Workflow)

### Phase 1: 基礎架構
1. 初始化 Astro 專案並整合 Tailwind + daisyUI。
2. 設定 `BaseLayout.astro`、Header、Footer 等全域組件。

### Phase 2: 核心功能開發
1. **主要頁面**: 首頁、關於我們、聯絡我們（含 Google 地圖整合）。
2. **產品系統**: 由 JSON 資料驅動，支援分類篩選與動態路由 `[id].astro`。
3. **部落格專欄**: 使用 Content Collections 渲染 Markdown 文章，含閱讀時間與 SEO 設定。

### Phase 3: 優化與交付
1. **SEO & 效能**: Sitemap 生成、圖片優化 (<Image> 組件)、SSG 靜態生成。
2. **測試驗收**: 由 Agent 提供測試重點，由 USER 自行執行測試。

---

## 📂 專案必要資訊
- **技術棧**: Astro 5.x, daisyUI 4.x, Tailwind CSS 3.x
- **資料驅動**: 所有動態內容與分類資訊均存放於 `src/data/*.json`
- **內容管理**: 部落格文章存放在 `src/content/blog/`
