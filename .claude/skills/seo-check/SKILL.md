---
name: seo-check
description: 喬新針織網站的 SEO / AEO / GEO 健診檢查清單與範本。每次頁面排版、內容、或結構化資料改完之後，主動呼叫這個 skill 取用檢查項目與範本，不需要等使用者提到「SEO」才觸發——只要完成了頁面設計、新增了產品/文章、或修改了 meta/schema 相關程式碼，就該想到這個 skill。同時處理「這個 schema 欄位能不能填」這類判斷（例如 price、包裝數量），因為專案有已經驗證過的紅線規則。也適用於使用者貼 Google Search Console、PageSpeed、Gemini/AI 給的 SEO 建議，需要判斷是否採信時。
user_invocable: true
---

# 喬新針織 SEO / AEO / GEO 健診

## 這個 skill 存在的原因

喬新是型錄類 B2B 網站（工業手套/耗材，洽詢報價制），已經走過好幾輪 SEO/AEO/GEO 優化，過程中犯過一次錯（結構化資料填了假的 price/offers 導致 Google 判定 96 個商品頁全部無效），也已經明確決定了好幾件事「不做」。這個 skill 的目的是讓每次健診都基於這些已經驗證過的結論往前走，不要重新討論已經定案的事、也不要重蹈已經修正過的錯誤。

## 使用方式

被觸發時（通常是頁面/內容/schema 改完之後，或使用者貼了外部 SEO 報告要討論），依序做：

1. **先確認要檢查的頁面/檔案真的存在**：使用者講的路徑不一定跟實際檔名一致（例如講 `/about/info` 但實際檔案是 `src/pages/about/index.astro`），也可能講的內容根本還沒建立（例如提到一篇新聞，但 `src/content/news/` 底下還沒有對應資料夾）。用 Glob/Grep/Read 實際確認後再往下走。**如果內容不存在，直接明講「這個檔案還沒建立」，不要用「如果...」的假設語氣包裝成看似具體的檢查結果**——健診的價值在於讀了真實內容才給出的具體發現，不是套公式產生的通用建議，兩者不能混著呈現讓使用者誤判。內容不存在時，可以先給一份「這類頁面通常要注意什麼」的清單讓使用者對照著寫，但要清楚標示這是「還沒實際核對」的預備清單，**且仍然要照第5步規定的 SEO / AEO / GEO 分類呈現**，不要因為是預備清單就換成別種自由格式——保持輸出結構一致，使用者才不用每次適應不同的排版。
2. 對照下方「紅線規則」，檢查有沒有踩到
3. 對照下方「已定案不重複討論」清單，過濾掉不需要再提的項目
4. 用下方「檢查清單」逐項掃描目前這個頁面/改動
5. 輸出「問題 → 建議修改方式」條列清單，分 SEO / AEO / GEO 三類
6. 等使用者確認後才動手改——健診本身不直接改檔案

## 紅線規則（絕對不可違反）

- **結構化資料的數字類欄位（`price`、`offers` 等）只能填使用者會真的收到的真實金額**。沒有真實成交價，就把該 schema 段落整段拿掉，不要為了「補齊 SEO 欄位」編一個數字（虛報高價、參考市價、抓大概值都算編造）。這條紅線的由來：這個站曾經因為 `offers.priceSpecification` 只填 `priceCurrency` 沒填 `price`，被 Google Search Console 判定全部 96 個商品頁 Product 結構化資料無效；修法是移除 offers，不是補一個假 price。
- **這條紅線不是只管 price，而是「不宣稱無法驗證的事」這個原則的其中一個例子**：文案裡「全台最值得信賴」「絕對第一」「保證 XX 天到貨」這類最高級/保證性用詞，如果沒有獎項、認證、第三方數據或明確承諾可以佐證，一樣算違反這條原則——沒有數字造假的問題，但有「宣稱無法驗證的事實」的問題，健診時要一併檢查文案裡有沒有這類用詞，抓到就跟使用者確認能不能拿出佐證，不能佐證就建議換成具體、可驗證的資訊（成立年份、地點、產品線關鍵字這類）。
- **包裝箱/捆換算、最低出貨量：不建議補這類資料到頁面或 schema 裡**。這是公司刻意決定不對外公開（出貨常混裝，沒有固定換算比例），不是資料缺口，跟「不能造假」是同一種邏輯——找不到就不要編，也不要建議去問一個「大概數字」湊版面。
- **使用者貼出 Google/Gemini/AI 工具給的 SEO 建議時，先查證再採信**，尤其是「填了 XX 會提升排名」「絕對會排第一」這類無法驗證的斷言。這個站已經抓到至少一次 AI 建議事實錯誤（把「喬新」認成「巧新」），也曾經誤信「有 price 會被優先權重」的說法，後來查證 Google 官方文件才發現不成立。查證方式：對照 Google 官方文件（Search Central）、或直接檢查專案現況（例如「這個 schema 類型真的在跑嗎」），不要因為建議聽起來有道理就直接照做。

## 已定案、不要重複提出的項目

這幾件事已經跟使用者討論過、有明確理由決定不處理，健診時看到也不要重新列為問題：

| 項目 | 決定 | 理由 |
|------|------|------|
| 響應式圖片（手機顯示尺寸 vs 縮圖實際尺寸） | 不做 | Core Web Vitals 已查證不是 Google 的主要排名因素，這個站也沒有足夠真實使用者資料被套用 CWV 排名訊號 |
| 顏色對比度不足（無障礙） | 不處理 | 對比度來自既有視覺配色系統，擔心調整會連動改變整體風格 |
| DaisyUI 未使用到的 CSS | 不處理 | 要瘦身需整個換成純 Tailwind 手刻樣式，重構風險與投入不成比例 |
| sitemap.xml 檔名（`@astrojs/sitemap` 只產生 `-index.xml`，非 `/sitemap.xml`） | 維持現狀 | robots.txt 已正確指向，GSC 已驗證讀取成功，是文字檔名差異不是真的爬取問題 |
| 在 `<head>` 加 `<link rel="sitemap">` 標籤 | 不加 | 查證過這是 IE 時代遺留慣例，Google 官方文件從未把它列為 sitemap 發現機制，只依賴 robots.txt 的 `Sitemap:` 指令或 GSC 手動提交（兩者都已到位）。純粹是為了迎合第三方檢測工具的路徑啟發式檢查，對 Google/AI 沒有實質幫助 |

如果使用者主動重提其中一項（例如又貼了新的報告），可以重新討論，但不要主動再提。

**第三方 AI 能見度檢測工具（Whoops 等）的建議，處理原則同「Google/Gemini 建議」紅線**：這類工具給的是自訂啟發式分數，不是 Google/AI 的真實行為，遇到「建議調整 XX 提升分數」先查證機制是否真實存在，不要為了衝分數做動作。已驗證過的案例：meta description 建議拉長到 120-160 字元（英文語境經驗值，套用中文會偏長，見下方檢查清單）、`<link rel="sitemap">` 標籤（見上表）。

## 已完成的基礎建設（健診時確認「還在」，不是要求重做）

- `public/llms.txt`（llmstxt.org 格式，給 AI 爬蟲的網站摘要）
- `public/robots.txt`（`Allow: /`，指向 `sitemap-index.xml`）
- 全站 schema：`Organization`（含統一編號 `taxID`）、`BreadcrumbList`、`FAQPage`、`Product`（不含 offers）
- 圖片 alt 文字格式：`{產品名稱}{尺寸} {分類名稱}批發 - 喬新針織`
- 商品詳細頁 title 格式：`{name} - {分類名稱}｜紅螞蟻手套`
- canonical / OG / sitemap 全站統一使用 `https://chiaohsin.com.tw`（非 www）
- Header/Footer 品牌 logo 的 `<img alt="">` 是刻意留空——外層有 `aria-hidden="true"`，品牌名稱文字緊接在旁邊呈現，是正確的無障礙寫法，不是漏加 alt
- blog（`src/content.config.ts` schema）與 news 都有 `updatedDate`（optional）欄位，`[slug].astro` 的 `dateModified`/`modifiedTime` 都是 `updatedDate ?? publishDate`。**文章知識內容有實質修正時記得補 `updatedDate`**（不是排版/格式微調就要補，2026-07-14 就發生過 9 篇 blog + 1 篇 news 改了實質內容但漏補的情況，已補上）

發現這些東西「消失了」或跟目前程式碼對不上，才是真正的問題（可能是新頁面沒套用到既有規則），要列出來；已經存在且正確就不用提。

## 檢查清單

### SEO

- **Title**：公式「主題 - 具體修飾詞｜品牌」，繁體中文控制在 30 字元內（含品牌後綴）。每個頁面對應一個明確搜尋意圖，不要一個頁面塞多個不相關主題。
- **Meta description**：公式「動作 + 主題 + 價值主張 + 補充細節」，繁體中文 70-100 字元。
  - 注意：Google 的顯示上限是「像素寬度」不是字元數，中文全形字比英文字母寬，50-60/120-160 字元是英文語境的經驗值，直接套用到繁體中文會偏高，改用上面這組中文適用的區間判斷「太短/太長」。
- H1 只能有一個，H2/H3 層級不跳階。
- canonical URL 存在且指向正確（非 www、無多餘查詢字串除非該頁確實需要）。
- 圖片 alt 是描述性文字，不是檔名或空白（套用上面已定案的格式）。
- 新增的頁面/路由有沒有進到 `@astrojs/sitemap` 的產出（通常自動，但動態路由要確認 `getStaticPaths` 有涵蓋）。

### AEO（Answer Engine Optimization）

- 有沒有適合寫成問答形式的內容，卻寫成一般敘述段落（常見於產品規格、服務說明）。
- 新增的 FAQ 內容有沒有同步更新對應的 `FAQPage` JSON-LD。首頁（`homeFaqs` 陣列）和 blog（`blockData.blocks` 的 faq 區塊）畫面顯示跟 schema 是同一個資料來源，架構上保證一致，不用手動核對。**news 是例外**：`[slug].astro` 的 FAQPage schema 讀 frontmatter 的 `faq:` 陣列，但畫面上的 Q&A 是寫在 Markdown 內文裡的手寫文字，兩處分開維護、不會自動同步——改 news 文章的 FAQ 要記得兩邊都改，並人工核對文字是否一致。
- 回答內容要基於使用者確認過的事實，不確定的資訊（例如「是否 100% 台灣製造」）寧可不寫，不要為了讓答案看起來完整就編。

### GEO（Generative Engine Optimization）

- **NAP 一致性**：企業名稱、地址、電話號碼在頁尾、`/contact`、`/about`、`Organization`/`LocalBusiness` schema 這幾處是否完全一致（縮寫寫法、電話格式、地址順序）。以 `src/data/company.json` 的值為基準，逐一比對其他地方有沒有手動打的、跟它不一致的版本。
- `Organization` schema 的 `taxID`、地址、聯絡方式跟 Google Business Profile（如果有）是否一致。
- 品牌名稱在頁面上的呈現是否一致（例如「喬新針織」「紅螞蟻手套」兩個名稱各自在什麼情境下使用，有沒有混用造成 AI 生成引擎混淆品牌）。

## 專案關鍵檔案

| 檔案 | 用途 |
|------|------|
| `src/data/company.json` | 公司資訊來源，NAP 一致性比對的基準值 |
| `src/data/products.json`、`src/data/categories.json` | 產品與分類資料 |
| `src/layouts/Layout.astro` | 全站共用的 meta 標籤與 schema 邏輯 |
| `src/pages/products/[id].astro`、`src/pages/products/index.astro` | Product schema、商品頁 title 所在處 |
| `src/content/news/`、`src/content/blog/` | 新聞與部落格內容（Markdown + frontmatter） |

## 輸出格式

```
## SEO
- 問題：{具體描述} → 建議：{具體修改方式}

## AEO
- 問題：... → 建議：...

## GEO
- 問題：... → 建議：...
```

沒有發現問題的類別可以省略，不用硬湊。列完清單後停下來等使用者確認，確認後才動手改檔案。
