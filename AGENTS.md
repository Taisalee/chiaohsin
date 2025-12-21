# 喬新針織有限公司 - 新網站開發專案

## 📋 專案概述

使用 **Astro + daisyUI** 重新設計喬新針織有限公司的企業形象網站，展示公司商品和企業形象。

### 技術棧
- **框架**: Astro 5.x (靜態網站生成器)
- **UI 框架**: daisyUI 4.x (基於 Tailwind CSS)
- **CSS 框架**: Tailwind CSS 3.x
- **圖示庫**: Heroicons / Lucide Icons
- **字體**: Noto Sans TC (Google Fonts)

---

## 🏢 公司資訊

| 項目 | 內容 |
|------|------|
| **公司名稱** | 喬新針織有限公司 |
| **英文名稱** | Chiaohsin Knitting Co., Ltd. |
| **聯絡電話** | 06-690-0359 |
| **傳真號碼** | 06-690-3233 |
| **電子信箱** | gloves@chiaohsin.com.tw |
| **聯絡人** | 王小姐 |
| **公司地址** | 台南市官田區渡拔里010鄰渡仔頭184號 |
| **舊網站** | www.chiaohsin.com.tw |

### 主要業務
- 各式工作用手套 (棉紗手套、尼龍手套、白龍手套、花龍手套、膠手套等)
- 個人防護用品 (口罩、手套)
- 包裝材料 (膠帶、PE膜、打包帶)
- 建築五金 (砂輪片、帆布、不織布等)
- 太空包
- 清潔用品

---

## 📂 網站架構

```
/                      # 首頁 - Hero + 產品分類 + 公司特色
├── /about             # 關於我們 - 公司介紹
│   └── /info          # 基本資料
├── /products          # 產品列表
│   ├── /[category]    # 產品分類頁
│   └── /[id]          # 產品詳情頁
├── /news              # 最新消息
└── /contact           # 聯絡我們 - 表單 + 地圖
```

---

## 🎨 設計規範

### 色彩系統 (daisyUI Theme)

```javascript
// tailwind.config.mjs
daisyui: {
  themes: [
    {
      chiaohsin: {
        "primary": "#2563eb",      // 專業藍 - 主色調
        "primary-content": "#ffffff",
        "secondary": "#059669",     // 安全綠 - 次要色
        "secondary-content": "#ffffff", 
        "accent": "#f59e0b",        // 活力橙 - 強調色
        "accent-content": "#000000",
        "neutral": "#374151",       // 中性灰
        "neutral-content": "#ffffff",
        "base-100": "#ffffff",      // 背景白
        "base-200": "#f3f4f6",      // 淺灰背景
        "base-300": "#e5e7eb",      // 邊框灰
        "info": "#3b82f6",
        "success": "#22c55e",
        "warning": "#f59e0b",
        "error": "#ef4444",
      },
    },
  ],
}
```

### 字體設定

```css
/* 標題字體 */
font-family: 'Noto Sans TC', sans-serif;
font-weight: 700;

/* 內文字體 */
font-family: 'Noto Sans TC', sans-serif;
font-weight: 400;
```

### 設計風格
- **現代工業風**: 體現製造業專業形象
- **簡潔俐落**: 易於瀏覽產品資訊
- **信任感**: 使用藍色系傳達專業可靠
- **響應式設計**: 支援手機、平板、桌面

---

## 📄 頁面規劃

### 1. 首頁 (index.astro)

#### Hero 區塊
- 大型背景圖 (工廠/產品)
- 公司標語：「手套封口部分為車頭，不會脫落，更加緊實的包覆著您的雙手」
- CTA 按鈕：「瀏覽產品」、「聯絡我們」

#### 產品分類區塊
- 使用 daisyUI Card 組件
- 11 個主要分類，每個顯示圖示 + 名稱
- Hover 效果增加互動性

#### 公司特色區塊
- **品質保證**: 重量足，品質好
- **多樣選擇**: 種類眾多，產品優良
- **價格合宜**: 深受客戶信任
- **全國配送**: 宅配、親取服務

#### 聯絡資訊區塊
- 快速聯絡資訊
- Google 地圖嵌入

### 2. 關於我們 (about/index.astro)

- 公司簡介
- 服務內容
- 配送方式
- 付款方式
- 公司圖片

### 3. 產品列表 (products/index.astro)

- 分類篩選側邊欄
- 產品網格展示 (使用 daisyUI Card)
- 搜尋功能
- 分頁或無限滾動

### 4. 產品分類頁 (products/[category].astro)

- 分類標題與描述
- 該分類下所有產品
- 麵包屑導航

### 5. 產品詳情頁 (products/[id].astro)

- 產品大圖
- 產品名稱與規格
- 產品描述
- 相關產品推薦
- 詢價按鈕

### 6. 聯絡我們 (contact.astro)

- 聯絡資訊卡片
- 聯絡表單 (姓名、電話、信箱、訊息)
- Google 地圖
- 營業時間資訊

---

## 🧩 Astro 組件清單

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.astro         # 頂部導航
│   │   ├── Footer.astro         # 底部資訊
│   │   ├── Navigation.astro     # 導航選單
│   │   └── MobileMenu.astro     # 手機選單
│   ├── ui/
│   │   ├── Button.astro         # 按鈕組件
│   │   ├── Card.astro           # 卡片組件
│   │   ├── Badge.astro          # 標籤組件
│   │   └── Breadcrumb.astro     # 麵包屑
│   ├── sections/
│   │   ├── Hero.astro           # 首頁 Hero
│   │   ├── Categories.astro     # 產品分類區塊
│   │   ├── Features.astro       # 公司特色
│   │   └── ContactInfo.astro    # 聯絡資訊
│   └── product/
│       ├── ProductCard.astro    # 產品卡片
│       ├── ProductGrid.astro    # 產品網格
│       └── ProductDetail.astro  # 產品詳情
├── layouts/
│   └── BaseLayout.astro         # 基礎版面
├── pages/
│   ├── index.astro              # 首頁
│   ├── about/
│   │   ├── index.astro          # 關於我們
│   │   └── info.astro           # 基本資料
│   ├── products/
│   │   ├── index.astro          # 產品列表
│   │   └── [category].astro     # 產品分類
│   ├── contact.astro            # 聯絡我們
│   └── news.astro               # 最新消息
├── styles/
│   └── global.css               # 全域樣式
└── data/
    └── site-data.json           # 網站資料 (已建立)
```

---

## 🚀 開發流程

### Phase 1: 專案初始化
```bash
# 建立 Astro 專案
npm create astro@latest chiaohsin-website

# 安裝 Tailwind CSS 和 daisyUI
npx astro add tailwind
npm install daisyui

# 設定 daisyUI
```

### Phase 2: 基礎架構
1. 設定 `tailwind.config.mjs` (主題色彩)
2. 建立 `BaseLayout.astro`
3. 建立 Header 和 Footer 組件
4. 設定字體和全域樣式

### Phase 3: 頁面開發
1. 首頁設計與開發
2. 產品列表頁
3. 產品詳情頁
4. 關於我們頁面
5. 聯絡我們頁面

### Phase 4: 優化與測試
1. SEO 最佳化
2. 效能優化
3. 跨瀏覽器測試
4. 響應式測試

---

## 📦 資料來源

- **網站資料**: `site-data.json` (已從舊網站分析整理)
- **產品圖片**: `www.chiaohsin.com.tw/images/`
- **公司 Logo**: `www.chiaohsin.com.tw/images/corpimg.png`

---

## 🔧 環境需求

- Node.js 18.x 或以上
- npm 或 pnpm
- Git

---

## 📝 注意事項

1. **圖片優化**: 使用 Astro 的 `<Image>` 組件自動優化圖片
2. **SEO**: 每頁設定適當的 meta tags
3. **無障礙**: 確保網站符合 WCAG 標準
4. **效能**: 使用靜態生成確保快速載入
5. **多語言**: 目前僅繁體中文，預留簡體中文支援

---

## 📞 聯絡方式

若有任何問題，請聯繫：
- 電話：06-690-0359
- Email：gloves@chiaohsin.com.tw
