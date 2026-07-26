# SEO/AEO/GEO 優化後續 計劃書

## 目標
本 session 完成了大規模 SEO/AEO/GEO 優化與型別安全清理，已 commit（`d43c4e7`）並經 `develop → main` 合併 push 上線，GitHub Actions 部署確認成功（Run #7，2026-07-26）。商品詳細頁 title 品牌詞的補丁、Product schema 移除 offers 的修正、PageSpeed 效能檢查與修正也已於交接 session 完成上線。原本擱置的包裝箱/捆換算已定案為「不對外公開」。**整個主題已無待辦事項，本計劃書可歸檔。**

## TODO
（全部完成，無待辦）

## 已完成並上線（交接 session 第二階段：PageSpeed 效能檢查，2026-07-26）
- **起因**：使用者貼 PageSpeed Insights 手機版報告，效能分數 56（桌面版 89），FCP 9.5秒／LCP 11.7秒，但 TBT 0毫秒／CLS 0（之前 session 的效能優化成果還在）。用瀏覽器自動化重新測試兩次數字一致，確認不是雜訊；用 curl 實測真實 TTFB 僅 0.3-0.7 秒，證實伺服器本身不慢，落差來自 PageSpeed 模擬慢速 4G 網路的放大效果
- **商品縮圖從 400×400 降到 320×320**（commit `b7aed60` → merge `798c68f`）：查證全站最大實際顯示尺寸只有 300px（`ProductCard.astro`），400px 縮圖長期多傳輸近 2 倍不必要資料。改 `scripts/generate-product-thumbnails.js` 的 `THUMB_SIZE` 常數，重新產生全部 107 張縮圖，總體積從約 2MB 降到約 1.1MB。已用瀏覽器實測 160px/300px 兩種顯示情境畫質無肉眼可見差異
- **Cloudflare Cache Rule 新增「Astro 靜態資源長效快取」**：比對條件 `https://chiaohsin.com.tw/_astro/*`（Astro 建置輸出、檔名帶 hash 的 CSS/JS/圖片），Edge TTL 覆寫強制 1 年、快取資格「適用快取」。已用 curl 驗證 `cf-cache-status: HIT` 生效。**瀏覽器 TTL 維持全域預設 4 小時，刻意不改成 1 年**——因為那是全站通用設定，可能連 HTML 頁面都被拉長快取、影響內容更新即時性，使用者選擇維持安全值
- **未使用的 CSS（DaisyUI，116 KiB）：討論後決定不處理**。查證實際用到 9 種 DaisyUI 元件（btn/card/badge/breadcrumbs/dropdown/hero/mask/menu/divider），分佈 15+ 檔案；DaisyUI 的架構特性是「用到 `.btn` 就打包所有顏色/尺寸/狀態變體」，非按需產生。要瘦身需整個換成純 Tailwind 手刻樣式，重構風險與投入不成比例，且 CSS 大小不影響 TBT/CLS（互動流暢度已滿分），非首要問題
- **CSS 未壓縮（10 KiB）：確認不需處理**。檢查 dist 輸出 5 個 CSS 檔皆已單行壓縮，10 KiB 來自外部 Google Fonts CSS（`fonts.googleapis.com`），非我方程式碼問題，無法修改
- **回應式圖片（手機版顯示 155px vs 縮圖 320px）：討論 SEO 影響後決定不做**。查證 Google 官方文件：結構化資料/效能分數只影響 rich results 呈現與次要排名訊號，不是主要排名因素；且此站 Chrome UX Report 沒有足夠真實使用者資料，Google 目前根本沒有把 Core Web Vitals 當排名訊號套用在這個網站上。使用者決定「不管它」，320px 縮圖維持現狀不退回 400px
- **顏色對比度不足（無障礙問題）：使用者確認不處理**，未查明具體元素
- **`product-upload` skill 補上缺漏步驟**：原本的上架 SOP 完全沒有「產生縮圖」這一步，只有複製圖片＋填 `products.json`，導致照 SOP 走新商品會沒有縮圖。已在 `.claude/skills/product-upload/SKILL.md` 加入第 4 步：執行 `node scripts/generate-product-thumbnails.js`（縮圖尺寸已寫死在 script 的 `THUMB_SIZE` 常數，不需要另外記規則，跑 script 就會自動保持一致）

## 已完成並上線（交接 session，2026-07-26）
- **商品詳細頁 title 加上品牌詞「紅螞蟻手套」**（commit `e92853a` → merge `c70bfb2`）：`src/pages/products/[id].astro` 的 `productTitle` 改成 `` `${product.name} - ${category.name}｜紅螞蟻手套` ``（原本只有 `{name} - {分類}`）。107 個商品詳細頁補齊此前 session 已發現的缺口（首頁／產品列表頁 title 原本就有此品牌詞）。已跑 `npm run build` 驗證輸出（`7針20兩棉紗 - 棉紗手套｜紅螞蟻手套 | 喬新針織`）。流程：commit 到 develop → push → checkout main → merge develop → push（`.github/workflows/astro.yml` 只存在於 main、develop 從未有過，屬既有結構、非本次改動範圍，merge 未受影響）
- **移除商品 Product 結構化資料的 offers 區塊**（commit `6aa4620` → merge `2cd9524`）：起因是使用者貼 GSC「產品摘要」報告，顯示 96 個商品頁全部無效（0 有效），原因是 `offers.priceSpecification` 只填了 `priceCurrency` 跟一句「批發價格依數量而定，請洽詢業務」，**始終沒有 `price` 欄位**（Google 規定寫了 offers 就必須有 price，否則整個 Product 判定無效）。確認過網頁本身本來就沒顯示任何實際價格（洽詢報價制）。
  - 過程中使用者提出好幾種「填一個價格」的方案（虛報高價當心理錨點、參考市價但實際批發價不同、友善下游廠商的墊高價格），**都因為「這個 price 必須是使用者真的會付的錢，不能編造」被否決**——不只是 Google 政策風險（結構化資料造假可能導致全站被停權），也查證了台灣公平交易法對不實原價的規範。也查證了 Gemini 聲稱「有價格會被爬蟲優先權重」的說法：Google 官方文件明講結構化資料只影響 rich results 呈現、不影響一般排名權重，這段 Gemini 敘述部分是真的（Google 購物/比價版位確實需要 price 資格）但混雜了查無實據的內容，且該版位本來就不適合洽詢報價制的 B2B 網站。
  - 最後使用者決定「不放價格」，確認方向後：`src/pages/products/[id].astro`（商品詳細頁）與 `src/pages/products/index.astro`（分類清單，同樣的 offers 缺 price 問題）都移除 offers 區塊，只留 Product 基本資訊。已跑 `astro check`（0 錯誤）與 `build`（120 頁）驗證，並直接檢查 dist 輸出確認 JSON-LD 不再含 offers/price。
  - 同時發現使用者貼的另一張 GSC「商家資訊」（Merchant listing）報告也是同樣根源（price 缺失），移除 offers 後這批商品應該會整批退出該功能的驗證範圍，不需要額外處理 category 代碼/退貨政策/brand 型別等 Merchant listing 專屬需求（那些是要真的做 Google 購物才需要，跟現在的方向不符）
  - **後續**：GSC「產品摘要」「商家資訊」兩份報告的無效數字需要等 Google 重新爬取（通常幾天到兩週），屆時應該會歸零，不用主動再檢查，等使用者自己回報或有新的截圖再確認

## 已完成並上線（本 session，commit `d43c4e7`，2026-07-26 部署成功）
- **結構化資料**：Organization schema 補上統一編號 `taxID`（`company.json` + `Layout.astro`）
- **FAQ 補齊**（首頁 `index.astro` + 產品列表頁 `products/index.astro`，含 JSON-LD 同步）：付款方式/月結/發票、客製印刷 LOGO（僅代工，印刷客戶自理）、樣品（僅大量/長期客戶提供）、急單（視排程協調插單）。刻意不寫的兩題：乳膠過敏（公司是中間商不清楚，不編造）、產地是否全台灣製造（不主動揭露不利資訊，但也不能講「100% MIT」這種假話，之後真被問到才如實回答）
- **產品詳細頁**大宗採購提示文案（規格表下方、CTA 上方）：「歡迎工廠、營造業、五金行大宗採購，整打／整箱起訂享工廠直營價，可另議價。」
- **圖片 alt 文字**改用描述性格式 `{名稱}{尺寸} {分類}批發 - 喬新針織`：修正 `products/[id].astro` 主圖、首頁三處縮圖（熱銷/建築五金/包裝材料）。`Header.astro` 搜尋下拉縮圖刻意不改（純前端 JS 動態渲染，爬蟲看不到，優先度低）
- **新增 `public/llms.txt`**（llmstxt.org 格式）
- **型別安全**：新增 `@astrojs/check` + `typescript`，`package.json` 加 `"check": "astro check"` script。首次執行抓到 63 個型別錯誤，全部修正：
  - `products/[id].astro`：`getStaticPaths()` 的 `category` 找不到時直接 `throw Error`，一次解決 17 處 `category possibly undefined`（順帶讓分類 ID 打錯字這種資料錯誤能在 build 時被抓到）
  - `Header.astro`：43 處 DOM API 型別問題（`getElementById` 非空斷言、事件參數型別、新增 `SearchIndexItem` interface）
  - `index.astro` 輪播按鈕、`blog/[slug].astro` `summary` 選填欄位：各 1-2 處非空斷言
  - 全站 JSON-LD `<script>` 補上明確 `is:inline`（30 處），清除死 import/宣告（`seo` 未使用 import x3、`products/[id].astro` 沒生效的 `interface Props`、`blog/[slug].astro` 重複的頂層 glob）
  - `astro.config.mjs` 移除已棄用的 Rollup `assetInfo.name` fallback
- **清理暫存檔**：刪除上個 session 遺留的 `scratch_home.html`（96KB）、`lighthouse-verify-eager-reduced-run2.json`（876KB），皆非原始碼
- **驗證**：`npm run build`（120 頁）與 `npx astro check`（0 錯誤/0 警告）多次跑過皆過；107 筆商品資料完整性檢查（重複 ID、無效分類、缺欄位、圖片路徑）全過
- **Git 流程**：commit `d43c4e7` → 合併 `design-explore → develop → main` → push origin → GitHub Actions Run #7 確認 `completed/success`（對應 merge commit `d7e065d`）→ `design-explore` 分支已刪除（確認與 `develop` 完全同 commit，無遺漏）。之後開發請直接用 `develop` 分支

## 已完成（更早之前 session，皆已 commit + 部署上線並驗證，記錄留存）
- 效能優化：商品縮圖系統、Header 搜尋改用獨立 `/search-index.json` 端點延遲載入、部落格封面圖 srcset
- SEO/AEO/GEO：首頁 FAQ 區塊＋schema、meta description/H1 改寫、BreadcrumbList 補齊、RSS feed（/blog/rss.xml、/news/rss.xml）、隱私權政策/服務條款頁、部落格作者署名「喬新針織編輯團隊」
- 網域一致性：canonical/OG/sitemap 全站改用實際生效的 `https://chiaohsin.com.tw`（非 www）
- 內容頁日期標記：`Layout.astro` 的 `publishedTime`/`modifiedTime` props、`article:published_time`/`article:modified_time` OG meta、`BlogPosting` JSON-LD `dateModified`
- **重大修復**：GitHub Pages 自訂網域的「Enforce HTTPS」因 Cloudflare DNS 代理擋住 Let's Encrypt 驗證而卡住。已透過暫時關閉 Cloudflare 代理→GitHub 核發憑證→勾選 Enforce HTTPS→重新部署→恢復代理 的流程修復
- 清除重複的舊版 `src/pages/sitemap.xml.ts`，統一用 `@astrojs/sitemap` 產生的 `sitemap-index.xml`；Google Search Console 已提交確認讀取成功
- AHHA SEO 報告「找不到 /sitemap.xml」（`@astrojs/sitemap` 檔名規則寫死 `-index.xml`）：**使用者選擇保持現狀不處理**，robots.txt 已正確指向、GSC 也驗證讀取成功

## 重要位置
- 商品詳細頁 title/大宗採購文案：`src/pages/products/[id].astro`（`productTitle` 約在檔案前段、大宗採購提示在規格表與 CTA 按鈕之間）
- 首頁／產品列表頁 FAQ：`src/pages/index.astro`（`homeFaqs` 陣列）、`src/pages/products/index.astro`（`faqSchema.mainEntity` + 對應 `<details>` 區塊，兩處要同步改，不是自動生成）
- 商品資料來源：`src/data/products.json`（`packaging` 欄位維持現有的「12雙/打」寫法即可，箱/捆層級已定案不填，見下方備註）
- 型別檢查：`npm run check`（= `astro check`）隨時可重跑

## 備註
- **包裝箱/捆單位換算、最低出貨量：確定不對外公開**。原本卡在「等使用者提供實際數字」，公司方說明：出貨常有混搭情況（不同商品/規格混裝一箱/一捆），沒有固定的「一箱=幾打」單一數字，直接電話說明對客戶最方便。與價格的「洽詢報價制」是同一種決定邏輯——不是資料還沒補齊，是刻意不公開這類會依訂單而異的物流細節，網站維持現有的「大宗採購歡迎洽詢」文案即可，不需要也不應該試圖填出固定數字
- PWA 安裝提示（`public/manifest.json`）：使用者問過「安裝喬新針織有限公司」是什麼，已說明是正常 PWA 功能，非 bug，使用者未要求移除，維持現狀
- Google AI／Gemini 給的建議這個 session 出現多次，使用者習慣直接貼給我討論。**已驗證過 Gemini 至少犯過一次事實錯誤**（把「喬新」認成「巧新」），之後看到類似建議要先查證網站現況/資料，不要照單全收，尤其是「絕對會排名第一」這類無法驗證的斷言
