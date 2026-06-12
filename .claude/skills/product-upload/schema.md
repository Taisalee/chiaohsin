# products.json 完整欄位說明

## 基本欄位

| 欄位 | 型別 | 必填 | 說明 |
|-----|------|------|------|
| `id` | string | ✅ | 產品 ID（數字字串），對應圖片檔名 |
| `name` | string | ✅ | 產品名稱，顯示於列表與詳情頁 |
| `category` | string | ✅ | 分類 ID，必須存在於 categories.json |
| `size` | string | ✅ | 尺寸：`F`（free size）、`S`、`M`、`L` |
| `description` | string | ✅ | 產品描述，段落間用 `\n\n` 分隔 |
| `image` | string | ✅ | 圖片路徑，格式 `images/product_l_{id}.webp` |
| `features` | string[] | ✅ | 特色標籤，建議 3–5 項 |
| `targetAudiences` | string[] | ✅ | 目標使用者，顯示於產品頁 |
| `targetIndustries` | string[] | ✅ | 目標產業，顯示於產品頁 |
| `specifications` | object | ✅（新格式） | 規格欄位，key-value 形式 |

## 規格欄位格式

新格式（新增產品一律使用）：
```json
"specifications": {
  "針數": "7針",
  "重量": "20兩/打",
  "材質": "棉70% / 聚酯纖維30%",
  "包裝": "12雙/打"
}
```

舊格式（部分舊產品仍在使用，不需修改）：
```json
"materials": "棉70% / 聚酯纖維30%",
"packaging": "12雙/打",
"weight": "每打約20兩（750g）"
```

## 圖片對應規則

- 圖片存放：`public/images/product_l_{id}.webp`
- JSON 填寫：`"image": "images/product_l_{id}.webp"`（路徑不含 `public/`）
- 格式：WebP

## 完整範例

```json
{
  "id": "1468540",
  "name": "7針20兩灰棉",
  "category": "cotton-gloves",
  "size": "F",
  "description": "採用高品質棉紗製成，適合一般搬運及作業使用。\n\n透氣舒適，長時間佩戴不悶熱。",
  "image": "images/product_l_1468540.webp",
  "features": [
    "高含棉量",
    "透氣舒適",
    "耐磨耐用"
  ],
  "targetAudiences": [
    "工地作業員",
    "搬運工人",
    "倉儲人員"
  ],
  "targetIndustries": [
    "建築營造",
    "製造業",
    "物流倉儲"
  ],
  "specifications": {
    "針數": "7針",
    "重量": "20兩/打",
    "材質": "棉70% / 聚酯纖維30%",
    "包裝": "12雙/打"
  }
}
```
