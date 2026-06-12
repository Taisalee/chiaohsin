---
name: project-seo-todo
description: 喬新針織網站 SEO/GEO/AEO 優化待辦清單，記錄各項目完成狀態
metadata: 
  node_type: memory
  type: project
  originSessionId: ebce6069-0988-426e-b4cd-032f0ef345fc
---

網站 SEO/GEO/AEO 優化工作項目狀態（最後更新 2026-05-22）。

**Why:** 本次對話完成了技術面的 Schema 優化，剩餘項目需要業務操作或外部聯繫。
**How to apply:** 下次對話繼續優化工作時，以此為起點確認現況。

| 項目 | 狀態 | 說明 |
|------|------|------|
| Organization Schema | ✅ 完成 | Layout.astro 已加入 @id、foundingDate、logo ImageObject、areaServed、knowsAbout、sameAs |
| Product Schema | ✅ 完成 | [id].astro 已加入 @id、url、material、size、itemCondition，修正 brand/@type 與 shortName |
| blog draft 過濾 bug | ✅ 完成 | blog.astro 已加入 draft !== true 過濾 |
| sitemap URL bug | ✅ 完成 | blog 列表連結已統一去除 /index 後綴 |
| 文章生成提示詞 | ✅ 完成 | 升級為 SEO+GEO+AEO 三軌，補 summary 欄位、直接答案原則、品牌實體要求 |
| Google Business Profile 驗證 | ⏳ 待用戶操作 | 驗證後將商家 URL 填入 company.json 的 sameAs 陣列 |
| 規劃柱狀內容架構 | 🔲 未做 | 現有 9 篇文章平行無主指南，需選一篇升級為 Pillar，其他連回它 |
| 反向連結策略 | ⏳ 待用戶對外聯繫 | 目標：手套公會、職安相關網站、台灣製造業目錄 |
| 評估英文內容需求 | ⏳ 待用戶業務判斷 | 若有東南亞/日本/全球 OEM 客戶，幾篇英文文章可大幅擴大觸及 |

## 產品上架相關待辦
| 項目 | 狀態 | 說明 |
|------|------|------|
| 拋棄式無塵鞋套 | ✅ 完成 | ID：1473347，圖片：disposable-shoe-cover.png，分類：cleanroom，2026-05-21 上架 |
| 檢視產品 feature 標籤去留 | 🔲 待產品全數上架後處理 | 目前 21 個產品有 features（含新上架的PE膜旋轉器），等所有新產品上架後一次性決定各產品標籤是否保留 |

## 下次可繼續的技術工作
- **柱狀內容架構規劃**：分析現有 9 篇文章，建議 Pillar 文章與支線連結結構
- **sameAs 填入**：Google Business Profile 驗證完成後更新 company.json

## 圖片 WebP 轉換（✅ 完成，2026-05-22）

124 張產品圖、logo、banner 全數轉為 WebP，products.json（97 筆）與 company.json 路徑已更新，原始 .jpg/.png 已刪除，build 驗證通過。
未來新產品圖片直接存成 .webp 即可。
