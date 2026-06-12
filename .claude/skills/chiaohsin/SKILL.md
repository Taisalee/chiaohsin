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
- 卡片：`rounded-2xl border border-gray-200 bg-white hover:shadow-lg transition-shadow p-6`
- 區塊寬度：`max-w-4xl`（文章）/ `max-w-6xl`（列表）
- 圓角：小元素 `rounded-lg`、卡片 `rounded-2xl`、大區塊 `rounded-3xl`

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
