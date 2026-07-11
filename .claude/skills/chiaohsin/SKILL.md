---
name: chiaohsin
description: 喬新網站、網站頁面、改設計、UI 修改、資料夾結構、哪個檔案、分類 ID、色碼、公司資訊、導航選單、哪裡改、找不到檔案、Astro 頁面、怎麼運作、頁面結構、設計規範、資料格式
user_invocable: true
---

# 喬新針織網站導航地圖

## 頁面 → 程式碼速查

| URL | 對應檔案 | 說明 |
|-----|---------|------|
| `/` | `src/pages/index.astro` | 首頁（Hero、About、分類預覽、CTA） |
| `/about` | `src/pages/about/index.astro` | 特色簡介 |
| `/about/info` | `src/pages/about/info.astro` | 公司基本資料 |
| `/contact` | `src/pages/contact.astro` | 聯絡資訊 |
| `/news` | `src/pages/news.astro` | 最新消息列表 |
| `/products` | `src/pages/products/index.astro` | 商品列表（含分類篩選） |
| `/products/[id]` | `src/pages/products/[id].astro` | 產品詳情（動態路由） |
| `/blog/[slug]` | `src/pages/blog/[...slug].astro` | 教育文章（動態路由） |

## 資料檔位置速查

| 想改什麼 | 改這個檔案 |
|---------|-----------|
| 產品資料 | `src/data/products.json` |
| 分類定義 | `src/data/categories.json` |
| 公司名稱、電話、地址 | `src/data/company.json` |
| 導航選單 | `src/data/navigation.json` |
| 新增最新消息文章 | `src/content/news/<資料夾>/index.md` |
| 新增教育文章 | `src/content/blog/<slug>/data.json` + `index.md` |
| 圖片 | `public/images/` |
| 可重用元件 | `src/components/` |

## 元件速查

| 元件 | 檔案 | 用途 |
|------|------|------|
| ProductCard | `src/components/ProductCard.astro` | 產品卡片，列表頁與相關產品共用 |

## 設計 Token 速查

```
Primary（藍）：#0066CC → bg-blue-100 / text-blue-700
Secondary（橙）：#FF6B35 → bg-orange-100 / text-orange-700
Success（綠）：#10B981 → bg-green-100 / text-green-700
Warning（琥珀）：#F59E0B → bg-amber-100 / text-amber-700
Gray 文字：text-gray-600（正文）/ text-gray-500（輔助）
字體：Noto Sans TC
```

常用 class 模式：
- 區塊寬度：`max-w-4xl`（文章）/ `max-w-7xl`（列表/詳情頁）
- 圓角：小元素 `rounded-lg`、卡片 `rounded-xl`、大區塊 `rounded-2xl`

## UI 設計規範

### Badge／標籤
- **分類標籤**：`inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold`
- **功能標籤（feature badge）**：`.feature-badge` class（`bg-blue-50 border border-blue-200 text-blue-700 rounded-full`）
- 不使用 DaisyUI `badge-primary`

### H1 Typography
- `font-black leading-snug`（不用 `font-bold` / `leading-tight`）

### ProductCard 原則
- 圖片區**白底**、卡身 `#F3F4F6` 灰底
- 用陰影取代邊框（常駐 `0 1px 4px rgba(0,0,0,.07)`，hover 加深）
- **無 CTA 按鈕**（整張卡片為連結，使用者習慣點擊）
- Size badge 背景同卡身色（`#F3F4F6`），文字 `#9CA3AF`（退場不搶眼）

### 規格表
- 自訂 clean 表格，`rounded-xl border border-gray-200 overflow-hidden`
- 交替行底色（`spec-table-wrap` CSS class）
- `section-label` 小標，不用 emoji 表頭
- 不使用 DaisyUI `table-zebra`

### FAQ
- `<details>/<summary>` accordion（原生 HTML，不需 JS）
- 卡片灰底 `#F3F4F6` 突出於白色頁面
- 展開內容白底

### 整體原則
- 傾向自訂 CSS，避免 DaisyUI 元件（badge、table、card）
- 減少冗餘視覺元素（emoji 標題、多餘 CTA）
- 相關產品區需加 `max-w-7xl mx-auto px-4 md:px-10` 與上方內容對齊

## 分類 ID 速查（categories.json）

| id | 名稱 |
|----|------|
| `cotton-gloves` | 棉紗手套 |
| `rubber-gloves` | 膠手套 |
| `nylon-gloves` | 尼龍手套 |
| `white-dragon-gloves` | 白龍手套 |
| `flower-dragon-gloves` | 花龍手套 |
| `masks` | 各式口罩 |
| `packaging` | 包裝材料、膠帶 |
| `hardware` | 建築五金 |
| `bulk-bags` | 太空包 |
| `cleaning` | 清潔用品 |
| `special-gloves` | 特殊手套 |
| `traffic-safety` | 交通安全 |
| `cleanroom` | 無塵室耗材 |
| `others` | 其他商品 |

## 深入查閱索引

需要更多細節時，直接讀對應文件：

| 問題類型 | 參考文件 |
|---------|---------|
| 完整 UI 組件範例（Badge、表格、進度條、FAQ） | `docs/DESIGN_GUIDE.md` |
| products.json 欄位完整說明 | `docs/data-schema.md` |
| 頁面導航架構圖（Mermaid） | `docs/codemap.md` |
| 人工操作步驟（SEO、圖片更換、發布） | `docs/網站操作說明書.md` |
| 教育文章 JSON schema 完整規格 | `.claude/skills/blog-article/template.md` |
