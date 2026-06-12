---
name: product-upload
description: 上架產品、新增產品、加產品、產品上架、新增手套商品、新增到 products.json
user_invocable: true
---

# 產品上架快速指南

## 流程

1. 取得圖片 → 複製到 `public/images/`，命名 `product_l_{id}.webp`
2. 在 `src/data/products.json` 陣列末尾新增一筆記錄
3. `category` 必須使用下方分類 ID 速查表中的現有 ID

## products.json 必填欄位

```json
{
  "id": "1468540",
  "name": "7針20兩灰棉",
  "category": "cotton-gloves",
  "size": "F",
  "description": "產品描述（段落間用 \\n\\n 分隔）",
  "image": "images/product_l_1468540.webp",
  "features": ["高含棉量", "透氣舒適"],
  "targetAudiences": ["工地作業員", "搬運工人"],
  "targetIndustries": ["建築營造", "製造業"],
  "specifications": {
    "針數": "7針",
    "重量": "20兩/打",
    "材質": "棉70% / 聚酯纖維30%",
    "包裝": "12雙/打"
  }
}
```

> `size` 選項：`F`（free size）、`S`、`M`、`L`
> `specifications` 為新格式，新增產品一律使用此格式

## 分類 ID 速查

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

## 圖片命名規則

```
圖片 ID = products.json 的 "id" 欄位
圖片路徑 = public/images/product_l_{id}.webp
JSON 欄位 = "image": "images/product_l_{id}.webp"（不含 public/）
```

## 完整欄位說明

→ 讀 `schema.md`
