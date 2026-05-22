# 資料結構說明

`src/data/` 下的 JSON 檔案是網站的內容來源，修改這些檔案會直接影響頁面顯示。

---

## categories.json

定義所有產品分類，用於產品列表篩選與分類頁面路由。

```json
{
  "id": "cotton-gloves",        // 分類 ID（英文 kebab-case），對應 products.json 的 category 欄位
  "oldId": "368192",            // 舊系統 ID（選填，部分分類沒有）
  "name": "棉紗手套",            // 分類中文名稱，顯示於頁面
  "description": "...",         // 分類說明，顯示於分類頁面
  "icon": "•",                  // 圖示（目前統一為 •）
  "color": "#D4A574"            // 十六進位色碼，用於 UI 配色
}
```

**現有 14 個分類：**

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

---

## products.json

每筆記錄對應一個產品頁面，路由為 `/products/{id}`。

```json
{
  "id": "1468540",              // 產品 ID（數字字串），對應圖片檔名
  "name": "7針20兩灰棉",         // 產品名稱
  "category": "cotton-gloves", // 分類 ID，必須存在於 categories.json
  "size": "F",                  // 尺寸：F（free size）、S、M、L
  "description": "...",         // 產品描述（段落間用 \n\n 分隔）
  "image": "images/product_l_1468540.webp",  // 圖片路徑，相對於 public/
  "features": [                 // 特色標籤，建議 3–5 項
    "高含棉量",
    "透氣舒適"
  ],
  "targetAudiences": [          // 目標使用者，顯示於產品頁
    "工地作業員",
    "搬運工人"
  ],
  "targetIndustries": [         // 目標產業，顯示於產品頁
    "建築營造",
    "製造業"
  ]
}
```

### 規格欄位（兩種格式並存）

新格式（建議使用）：
```json
"specifications": {
  "針數": "7針",
  "重量": "20兩/打",
  "材質": "棉70% / 聚酯纖維30%",
  "包裝": "12雙/打"
}
```

舊格式（部分舊產品仍在使用）：
```json
"materials": "棉70% / 聚酯纖維30%",
"packaging": "12雙/打",
"weight": "每打約20兩（750g）"
```

> 新增產品一律使用 `specifications` 格式。

---

## 圖片對應規則

圖片放在 `public/images/`，檔名格式為 `product_l_{id}.webp`，與產品的 `id` 欄位對應。

例如：`id: "1468540"` → 圖片：`public/images/product_l_1468540.webp`

---

## 新增產品流程

1. 將圖片（WebP 格式）複製到 `public/images/`
2. 在 `products.json` 陣列末尾新增一筆記錄
3. `category` 必須填入 categories.json 已有的 id
4. `id` 建議沿用圖片的數字編號以保持一致
