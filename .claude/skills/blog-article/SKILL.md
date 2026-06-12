---
name: blog-article
description: 幫我寫文章、寫教育文章、生成手套介紹、新增 blog 文章、棉紗文章、手套知識文章、生成 JSON、生成 data.json、blog 文章內容
user_invocable: true
---

# Blog 教育文章生成

## 輸出格式（固定雙檔）

每篇文章放在 `src/content/blog/<slug>/`，包含：

```
src/content/blog/<slug>/
├── data.json     ← 結構化資料（規格卡、表格、FAQ 等）
└── index.md      ← 純 Markdown 文章內容
```

## 流程

1. **取得主題**：確認文章主題與目標讀者
2. **查 schema**：詳細欄位規格見 `template.md`（含 JSON 結構、badge 類型、進度條規則、驗證清單）
3. **生成 data.json**：按 template 的 JSON schema 輸出
4. **生成 index.md**：純 Markdown，只用 `##` 和 `###`，無 HTML
5. **驗證**：對照 `template.md` 的 ✅ 驗證清單逐項確認

## 快速規則

- badge 類型只有三種：`best` / `coral` / `green`
- 進度條百分比必須是 5 的倍數，最高 95%，最低 20%
- FAQ：最少 5 題，最多 7 題
- 流程圖：不超過 5 步
- 表格：最多 4 欄，4–5 行最佳

## 完整 schema 與設計規範

→ 讀 `template.md`（包含完整 JSON 範例、色彩規範、禁止項目）
