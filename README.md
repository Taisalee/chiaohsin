# 喬新針織有限公司 / 永立新國際有限公司 官方網站

本專案是 **喬新針織有限公司 (Chiaohsin Knitting Co., Ltd.)** 與 **永立新國際有限公司** 的官方網站。網站旨在展示公司的各類針織工作手套（如棉紗、尼龍、白龍、花龍、沾膠手套等）以及五金耗材產品，並提供專業的挑選指南與聯絡資訊。

## 🚀 專案特點

- **響應式設計**：針對桌面端與行動端進行優化，讓用戶在任何裝置都能流暢瀏覽產品資訊。
- **產品目錄**：分類清晰的產品展示，包含詳細的規格與描述。
- **專業部落格**：提供手套挑選指南，增加專業度與 SEO 表現。
- **現代化介面**：使用與品牌形象相符的設計風格，提升企業專業感。

## �️ 技術棧

- **框架**: [Astro](https://astro.build/) (v5.0+)
- **樣式**: [Tailwind CSS](https://tailwindcss.com/)
- **UI 元件組**: [daisyUI](https://daisyui.com/)
- **內容管理**: Astro Content Collections (Markdown)
- **開發語言**: TypeScript

## 📂 專案結構

```text
/
├── public/             # 靜態資源 (圖片、Favicon 等)
├── src/
│   ├── assets/         # 圖片、Logo 等素材
│   ├── components/     # 可重用 Astro 元件 (Footer, Header, Carousel 等)
│   ├── content/        # Markdown 內容 (部落格文章、挑選指南)
│   ├── data/           # JSON 資料 (公司資訊、產品分類、產品清單)
│   ├── layouts/        # 頁面佈局 (Layout.astro)
│   └── pages/          # 路由頁面 (首頁、產品頁、部落格、聯絡我們)
├── astro.config.mjs    # Astro 設定檔
├── package.json        # 專案依賴與腳本
└── tailwind.config.mjs # Tailwind CSS 設定
```

## 🧞 指令指南

所有指令皆在專案根目錄下執行：

| 指令 | 動作 |
| :--- | :--- |
| `npm install` | 安裝專案依賴 |
| `npm run dev` | 啟動本地開發伺服器 (預設為 `localhost:4321`) |
| `npm run build` | 建置正式發佈版本至 `./dist/` 目錄 |
| `npm run preview` | 在本地預覽建置後的正式版本 |
| `npm run astro -- --help` | 獲取 Astro CLI 協助 |

## � 聯絡我們

- **名稱**: 喬新針織有限公司 / 永立新國際有限公司
- **電話**: 06-690-0359
- **地址**: 台南市官田區渡拔里010鄰渡仔頭184號
- **網站**: [www.chiaohsin.com.tw](http://www.chiaohsin.com.tw)

