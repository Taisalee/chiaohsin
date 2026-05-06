# 喬新針織 — 文章生成提示詞（給 Claude Chat）

> 複製此文件全文貼給 Claude Chat，並在最後說明文章主題即可。

---

## 📋 系統背景

你正在為一個台灣手套製造商（喬新針織）的 Astro 靜態網站撰寫教育文章。

**網站資訊：**
- 框架：Astro.js + Tailwind CSS + daisyUI
- 目標受眾：工廠採購人員、職安人員、生產管理者
- 設計風格：專業、簡潔、高度結構化

**你的任務：**
根據給定的主題，選擇合適的文章類型，然後生成 3 個文件（見「輸出要求」）。

---

## 📁 文章文件結構（供參考）

```
src/content/blog/文章名稱/
├── index.md       ← Frontmatter 元數據（你要生成）
├── data.json      ← 結構化內容 blocks（你要生成）
├── checklist.md   ← 上架檢查清單（你要生成）
└── cover.WebP     ← 封面圖片（人工準備，非你負責）
```

---

## 📦 文章類型選擇指南

根據主題自動選擇最合適的類型，不確定時選最接近的。

### 類型 A：規格對比類（如：手套規格、尺寸選擇、材質比較）
**必用 Block：** `spec_cards`、`comparison_table`、`faq`
**可選 Block：** `selection_flow`、`insight`、`prose`

### 類型 B：步驟流程類（如：維護保養、安全操作、清潔方法）
**必用 Block：** `prose`（含步驟說明）、`insight`（注意事項）、`faq`
**可選 Block：** `spec_cards`、`selection_flow`

### 類型 C：案例研究類（如：客戶案例、實際應用、成本優化）
**必用 Block：** `prose`（含時間線/成果）、`comparison_table`、`faq`
**可選 Block：** `insight`、`spec_cards`

### 類型 D：安全指南類（如：危險預防、應急處理、高溫環境）
**必用 Block：** `prose`（含風險與措施）、`insight`（warning 類型）、`faq`
**可選 Block：** `comparison_table`、`selection_flow`

### 類型 E：產品介紹類（如：PU塗層特性、新手套型號介紹）
**必用 Block：** `spec_cards`、`comparison_table`、`faq`
**可選 Block：** `insight`、`selection_flow`、`prose`

---

## 🎯 輸出要求：3 個文件

---

### 文件 1：`index.md`

**格式（純 frontmatter，無正文）：**
```markdown
---
title: "文章標題（40-60 字元最佳）"
description: "SEO 描述，150-200 字元，會顯示在列表頁與搜尋結果"
publishDate: 2026-04-29
image: "./cover.WebP"
category: "選購指南"
tags: ["標籤1", "標籤2", "標籤3", "標籤4"]
featured: true
draft: false
---
```

**欄位說明：**
- `category`：只能填 `"選購指南"` 或 `"教學"`
- `tags`：3-5 個，包含產品名、應用場景、目標族群
- `draft`：上架時必須是 `false`
- `image`：固定填 `"./cover.WebP"`

---

### 文件 2：`data.json`

**頂層結構（⚠️ 必須用 `blocks` 陣列，不是 `sections` 物件）：**
```json
{
  "metadata": {
    "title": "文章標題",
    "slug": "article-slug-in-kebab-case",
    "description": "簡短描述",
    "category": "選購指南",
    "tags": ["標籤1", "標籤2"],
    "publishDate": "2026-04-29",
    "readingTime": 12,
    "featured": true
  },
  "blocks": [
    // 依序放入各類型 block
  ]
}
```

---

#### ✅ 支援的 Block 類型

##### 1. `prose` — 一般段落文字
```json
{
  "type": "prose",
  "html": "<h2>標題</h2><p>段落文字...</p><ul><li>列表項目</li></ul>"
}
```
- 使用 `<h2>`、`<h3>`、`<h4>`、`<p>`、`<ul>`、`<li>`、`<strong>`、`<blockquote>`
- **禁止使用 `<h1>`**
- 用於文章開頭介紹、各段說明、結語

##### 2. `spec_cards` — 規格卡片
```json
{
  "type": "spec_cards",
  "cols": 2,
  "items": [
    {
      "title": "卡片標題",
      "subtitle": "副標題",
      "badge": {
        "label": "標籤文字",
        "type": "best"
      },
      "metrics": [
        {
          "label": "指標名稱",
          "value": "指標值",
          "percentage": 75
        }
      ],
      "tags": ["應用場景1", "應用場景2"],
      "featured": true
    }
  ]
}
```
- `cols`：2 或 3
- `badge.type`：只能用 `best`（推薦/主流）、`coral`（高強度/警告）、`warning`（特殊/輔助）
- `percentage`：必須是 5 的倍數，範圍 20-95

##### 3. `comparison_table` — 比較表格
```json
{
  "type": "comparison_table",
  "headers": ["比較項目", "選項A", "選項B", "建議"],
  "rows": [
    ["項目1", "A的說明", "B的說明", "建議文字"],
    ["項目2", "A的說明", "B的說明", "建議文字"]
  ]
}
```
- 最多 4 欄，4-6 行最佳

##### 4. `selection_flow` — 決策流程
```json
{
  "type": "selection_flow",
  "steps": [
    {
      "number": 1,
      "question": "第一個問題？",
      "options": [
        {
          "text": "選項 A → 建議結論",
          "highlight": "選項標籤"
        },
        {
          "text": "選項 B → 建議結論",
          "highlight": "選項標籤"
        }
      ]
    }
  ]
}
```

##### 5. `insight` — 提示框
```json
{
  "type": "insight",
  "variant": "warning",
  "title": "提示標題（可選）",
  "content": "提示或警告內容文字"
}
```
- `variant`：`"warning"`（警告紅）、`"info"`（資訊藍）、`"success"`（成功綠）

##### 6. `faq` — 常見問題
```json
{
  "type": "faq",
  "items": [
    {
      "question": "常見問題 1？",
      "answer": "詳細答案..."
    },
    {
      "question": "常見問題 2？",
      "answer": "詳細答案..."
    }
  ]
}
```
- 建議 4-6 個問題

---

### 文件 3：`checklist.md`

```markdown
# 文章上架檢查清單 - [文章標題]

## ✅ 文件檢查
- [ ] 文件夾名稱使用 kebab-case（例：my-article-name）
- [ ] index.md 存在且格式正確
- [ ] data.json 存在且格式正確
- [ ] cover.WebP 已準備（最小 1200x630px）

## ✅ index.md Frontmatter 檢查
- [ ] title：已填寫（建議 40-60 字）
- [ ] description：已填寫（150-200 字元）
- [ ] publishDate：格式正確（YYYY-MM-DD）
- [ ] category：填 "選購指南" 或 "教學"
- [ ] tags：3-5 個標籤
- [ ] draft：false

## ✅ data.json 檢查
- [ ] metadata 所有欄位完整
- [ ] 使用 blocks 陣列格式（不是 sections 物件）
- [ ] 所有 block 都有正確的 type 字段
- [ ] prose 的 HTML 沒有 <h1> 標籤
- [ ] spec_cards 的 percentage 是 5 的倍數（20-95）
- [ ] badge.type 只用 best / coral / warning
- [ ] 沒有未閉合的 HTML 標籤
- [ ] JSON 格式有效（可用 jsonlint.com 驗證）

## ✅ 內容品質檢查
- [ ] 文章長度合理（建議 1500+ 字）
- [ ] 至少有 3 種不同類型的 block
- [ ] SEO 關鍵字在標題、描述和 prose 中出現
- [ ] 所有中文文案已檢查，無錯字
- [ ] faq 包含 4-6 個問題

## ✅ 上架步驟
- [ ] 建立資料夾：src/content/blog/文章名稱/
- [ ] 放入 index.md
- [ ] 放入 data.json
- [ ] 放入 cover.WebP
- [ ] 本機預覽確認正常
- [ ] git commit & push
```

---

## ❌ 常見錯誤（請務必避免）

| 錯誤 | 正確 |
|------|------|
| `"sections": { "specs": [...] }` | `"blocks": [ { "type": "spec_cards", ... } ]` |
| prose 裡用 `<h1>` | 只用 `<h2>`、`<h3>`、`<h4>` |
| `percentage: 73` | `percentage: 75`（必須是 5 的倍數） |
| badge type 用 `"green"` | 只能用 `"best"` / `"coral"` / `"warning"` |
| `publishDate: "2026年4月29日"` | `publishDate: "2026-04-29"` |
| tags 只有 1-2 個 | 至少 3-5 個 |

---

## 📝 生成順序

請依序輸出：
1. `index.md`
2. `data.json`
3. `checklist.md`

---

## 🚀 開始生成

**文章主題：[在這裡填寫你的主題]**
