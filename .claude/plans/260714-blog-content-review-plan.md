# Blog 文章內容審閱與優化計劃書

## 目標
逐篇審閱 9 篇 blog 文章，確保內容正確、設計一致、SEO/AEO/GEO 完整。

## 背景
- 文章位於 `src/content/blog/<slug>/data.json` + `index.md`
- 設計系統已統一：`GloveSpecCard`、`GloveInsight`、`SelectionFlow` 全改為 `primary`（teal `#4A90A4`）
- `featured: true` 規則、`percentage` 可省略規則已記錄於 `SKILL.md`
- 手套規格知識（針數/兩數/沾膠手套）已記錄於 `CLAUDE.md`

## TODO

### 設計系統
- [x] GloveSpecCard → teal（方案 E 改 primary）
- [x] GloveInsight → teal（insight/info 類型）
- [x] SelectionFlow → teal
- [x] GloveSpecCard `percentage` 改為 optional
- [x] 全站 spec card `featured: true` → `false`（比較不同場景時不顯示「推薦首選」）
- [x] CLAUDE.md 加入手套規格知識
- [x] SKILL.md 加入 GloveSpecCard 設計規則

### 文章內容

- [x] Article 1：how-to-choose-gloves（內容升級、data.json 新增、HowTo Schema）
- [x] Article 2：cotton-glove-specs-guide
  - 針數邏輯修正（7針=工地/最厚、10針=透氣、13針=精密工具）
  - 兩數邏輯修正（僅適用 7針、16兩/24兩 對調、移除「10針×20兩」組合）
  - 沾膠手套加入 insight
- [x] Article 3：food-gloves-comparison
  - 「白龍手套」誤描述為棉布混紡（與 Article 8 白龍=尼龍矛盾）→ 全文改為「棉布手套」
- [x] Article 4：logistics-gloves-dot-vs-full-coating（審閱：無知識錯誤，內容正確）
- [x] Article 5：cotton-glove-weight-selection-guide
  - 16兩 tags 改為夏季作業/輕工業廠房/輕量搬運（移除精密電子、食品包裝）
  - insight 加入「7針棉紗」前提
  - FAQ 加入 7針棉紗前提，移除「電子廠→16兩」錯誤建議
- [x] Article 6：cotton-yarn-gloves-sweat-breathable-guide
  - 針數關係全文倒置（7-9針誤稱超薄、13針誤稱厚款）→ 系統性修正
  - 5大場景推薦針數全部修正（機械→7針、電子→13針、物流→10針）
  - comparison_table 修正
  - FAQ 厚度選擇答案完整改寫
- [x] Article 7：glove-guide-construction-logistics-warehousing
  - 倉儲 spec card 重量「16-20兩」→「依尺碼（無兩數規格）」（10-13針無兩數）
  - 物流 spec card 重量改為「7針款：16-20兩」
  - comparison_table 倉儲重量修正
- [x] Article 8：lint-free-gloves-nylon-vs-cotton
  - ESD 段落修正：一般電子組裝→棉/TC 防靜電或白龍 ESD；晶圓廠/高規格無塵室→NBR/PVC 一次性手套
- [x] Article 9：nbr-nitrile-gloves-oil-acid-alkali-analysis
  - 比較表「初期成本」倒置修正（NBR 略高、乳膠相對低）
  - 乳膠「耐溶劑」評級 ★★→★（不耐有機溶劑）

### 其他
- [ ] `public/design-preview.html` 刪除（設計方案已定）
- [ ] blog.astro「使用維護」分類顯示 0 篇（待確認是否有文章屬於此分類、或分類標籤需調整）

## 重要位置
- `src/components/GloveSpecCard.astro` — spec card 元件
- `src/components/GloveInsight.astro` — insight 區塊元件
- `src/components/SelectionFlow.astro` — 選購流程元件
- `src/pages/blog.astro:filter` — 分類篩選 filter pills
- `src/content/blog/cotton-glove-weight-selection-guide/data.json` — Article 5，仍有待修

## 備註
- 文章編號對應（slug）：
  1. how-to-choose-gloves
  2. cotton-glove-specs-guide
  3. food-gloves-comparison
  4. logistics-gloves-dot-vs-full-coating
  5. cotton-glove-weight-selection-guide
  6. cotton-yarn-gloves-sweat-breathable-guide
  7. glove-guide-construction-logistics-warehousing
  8. lint-free-gloves-nylon-vs-cotton
  9. nbr-nitrile-gloves-oil-acid-alkali-analysis
