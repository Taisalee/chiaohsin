# Website Codemap - Chiaohsin

這份文檔描述了 [Chiaohsin](https://taisalee.github.io/chiaohsin/) 網站的頁面結構與其對應的程式碼檔案，並使用 Mermaid 圖表展示頁面間的導航關係。

## 頁面清單 (Code Map)

以下列出 `src/pages` 目錄下的主要頁面與其功能說明：

| URL 路徑 | 對應檔案 | 說明 |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | **首頁 (Home)**。<br>包含 Hero 區塊、關於我們摘要、產品分類預覽、品質保證以及呼籲行動 (CTA) 區塊。 |
| `/about` | `src/pages/about/index.astro` | **特色簡介 (About)**。<br>介紹公司的特色與核心價值。 |
| `/about/info` | `src/pages/about/info.astro` | **基本資料 (Company Info)**。<br>詳細的公司歷史、認證與規模等資訊。 |
| `/contact` | `src/pages/contact.astro` | **聯絡資訊 (Contact)**。<br>包含聯絡表單、地圖、電話與地址資訊。 |
| `/news` | `src/pages/news.astro` | **最新消息 (News)**。<br>列出公司的最新公告與新聞。 |
| `/products` | `src/pages/products/index.astro` | **商品介紹 (Products List)**。<br>展示所有產品分類與產品列表，支援分類篩選。 |
| `/products/[id]` | `src/pages/products/[id].astro` | **產品詳情 (Product Detail)**。<br>動態路由頁面，根據產品 ID 顯示特定產品的詳細規格與圖片。 |

## 網站架構圖 (Site Map Diagram)

下圖展示網站的導航結構與頁面間的連結關係。

```mermaid
graph TD
    %% 定義樣式 - Dark Mode Optimized
    classDef main fill:#4a148c,stroke:#e1bee7,stroke-width:2px,color:#fff;
    classDef sub fill:#0d47a1,stroke:#bbdefb,stroke-width:1px,color:#fff;
    classDef dynamic fill:#1b5e20,stroke:#c8e6c9,stroke-width:1px,stroke-dasharray: 5 5,color:#fff;

    %% 主要節點
    Home["首頁 /<br>src/pages/index.astro"]:::main
    About["公司介紹 /about<br>src/pages/about/index.astro"]:::sub
    AboutInfo["基本資料 /about/info<br>src/pages/about/info.astro"]:::sub
    Contact["聯絡資訊 /contact<br>src/pages/contact.astro"]:::sub
    News["最新消息 /news<br>src/pages/news.astro"]:::sub
    Products["商品介紹 /products<br>src/pages/products/index.astro"]:::sub
    ProductDetail["產品詳情 /products/:id<br>src/pages/products/[id].astro"]:::dynamic

    %% 導航關係 (基於 navigation.json 與 index.astro)
    Home --> About
    Home --> News
    Home --> Products
    Home --> Contact

    %% About 子選單
    About --> AboutInfo
    About --> Contact

    %% Products 關聯
    Products --> ProductDetail



    %% 備註
    subgraph "About Group"
        About
        AboutInfo
    end

    subgraph "Product Group"
        Products
        ProductDetail
    end
```

## 資料來源 (Data Sources)
網站內容主要由以下 JSON 檔案驅動：
- `src/data/navigation.json`: 定義主選單與頁尾連結。
- `src/data/products.json`: 定義產品清單與詳細資訊。
- `src/data/categories.json`: 定義產品分類。
- `src/data/company.json`: 定義公司基本資訊 (名稱、電話、地址等)。
