# Blog 文章 JSON Schema 與設計規範

## data.json 完整結構

```json
{
  "metadata": {
    "title": "文章標題",
    "slug": "url-slug（英文 kebab-case）",
    "description": "150字以內的摘要",
    "category": "選購指南 或 教學 或 案例",
    "tags": ["標籤1", "標籤2", "標籤3"],
    "publishDate": "YYYY-MM-DD",
    "readingTime": 15,
    "featured": true
  },
  "sections": {
    "specs": [
      {
        "id": "spec-1",
        "title": "規格名稱",
        "subtitle": "簡短描述",
        "badge": {
          "label": "標籤文字",
          "type": "coral 或 green 或 best"
        },
        "metrics": [
          {
            "label": "指標名稱",
            "value": "數值或文字",
            "percentage": 0
          }
        ],
        "tags": ["應用場景1", "應用場景2"],
        "featured": false
      }
    ],
    "comparison": {
      "headers": ["欄位1", "欄位2", "欄位3", "欄位4"],
      "rows": [
        ["值1", "值2", "值3", "值4"]
      ]
    },
    "causes": [
      {
        "number": 1,
        "title": "原因標題",
        "description": "詳細說明"
      }
    ],
    "flowSteps": [
      {
        "number": 1,
        "question": "提問內容",
        "options": [
          {
            "text": "選項 → 結論",
            "highlight": "重點詞"
          }
        ]
      }
    ],
    "faq": [
      {
        "question": "問題？",
        "answer": "答案內容"
      }
    ]
  }
}
```

---

## 設計風格規範

### 色彩（嚴格遵循）

| 色彩 | Hex | Tailwind |
|-----|-----|---------|
| Primary（藍） | `#0066CC` | `bg-blue-100 text-blue-700` |
| Secondary（橙） | `#FF6B35` | `bg-orange-100 text-orange-700` |
| Success（綠） | `#10B981` | `bg-green-100 text-green-700` |
| Warning（琥珀） | `#F59E0B` | `bg-amber-100 text-amber-700` |
| 灰底 | — | `bg-gray-50 bg-gray-100` |
| 灰文 | — | `text-gray-600 text-gray-500` |

### Badge 類型定義

| type | 使用場景 |
|------|---------|
| `best` | 推薦選項、主流選擇 |
| `coral` | 高強度、危險提示、警告 |
| `green` | 特殊應用、替代選項 |

### 進度條規則

- 所有百分比必須是 **5 的倍數**（0, 5, 10 … 95, 100）
- 最高 **95%**，最低 **20%**
- 避免 50-50 平衡，要有明確高低對比

### 表格規則

- 第一欄為主欄（粗體、左對齊）
- 最多 **4 欄**，超過則拆分多個表
- 行數 **4–5 行**最佳，不超過 8 行

---

## index.md 格式

純 Markdown，結構範例：

```markdown
## 第一大章節

段落內容...

### 小章節

更多內容...

> **重點提示**：放在這裡

## 第二大章節

...
```

規則：
- 只用 `##` 和 `###`（不用 `#` 或 `####`）
- **粗體** 強調重點
- `>` 引言
- 無任何 HTML 標籤、CSS、Astro/React 組件

---

## ✅ 輸出前驗證清單

- [ ] 所有 badge 類型在 `best / coral / green` 之內
- [ ] 每個 spec 至少有 2 個 metrics
- [ ] FAQ 5–7 題
- [ ] 流程圖不超過 5 步
- [ ] 所有百分比是 5 的倍數
- [ ] 沒有任何 HTML、CSS、程式碼
- [ ] Markdown 標題只用 `##` 和 `###`
- [ ] slug 為英文 kebab-case

---

## ❌ 禁止輸出

- HTML 代碼
- CSS 代碼
- Astro 或 React 組件
- 任何程式語言代碼
- 嵌入式圖片或圖表

---

## 參考：已完成文章的結構模式

典型結構（供參考，不必完全照搬）：
- 2 組規格卡片群組（如：針數 / 兩數各 3 款）
- 1 個 4 行對比表
- 1 個 4 項原因列表
- 1 個 3 步流程圖
- 1 個 6 題 FAQ
