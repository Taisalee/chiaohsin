# 網頁修改意見（公司提出）執行計劃書

## 目標
依公司提供的 `網頁修改.xlsx`（14 項異動）更新 `src/data/products.json` 與首頁 LOGO。

## TODO

### products.json 異動（已全部完成，JSON 已驗證）
- [x] 10針棉紗+彈性紗 (1464764)：整筆刪除 → **後續已恢復**（見下方「其他討論」）
- [x] 13針花紋手套 (1468606)：包裝「12雙/打」→「一包10雙」
- [x] 斑馬膠帶 (1468572)：顏色「黃黑/紅白」→「黃黑」（含 description、features 同步修正）
- [x] PVC短截膜 (1473349)：寬度移除 12"，剩「2"/4"/6"/8"」
- [x] 六角網布 (1467517)：寬度改為「10/12.5/16.6/20/25/33.3/50/100cm」
- [x] A級防水不織布 (1467525)：寬度改為「10/12.5/16.6/20/25/33.3/50/101cm」（已與用戶確認 101 非筆誤）
- [x] 玻纖網 (1467539)：寬度改為「10/12.5/16.6/20/25/33.3/50/102cm」（已與用戶確認 102 非筆誤）
- [x] 擦拭紙架 (1468614)：名稱移除「(清潔馬)」，specifications 一併移除「品牌：清潔馬」
- [x] 自黏塑膠網帶 (1473345)：規格改為「3.5cm/5cm/10cm/20cm」（原 50mm×90m 單一規格）
- [x] PE交通錐 (1473322)：高度「70cm」→「72cm」
- [x] 腳踏黏墊 (1473343)：規格只留「60×90cm」（移除 45×90cm）
- [x] 塑鋼手推車200kg (1473328)：新增規格「輪胎：4吋」
- [x] 塑鋼手推車300kg (1473329)：新增規格「輪胎：5吋」
- [x] 麻布袋 (1473350)：每捆數量「25只」→「20只」

### 待用戶提供素材才能繼續
- [x] 擦拭紙架 (1468614) 新圖片：用戶提供檔案 `C:\Users\USER\Desktop\要放網站的商品模板\擦拭紙架.webp`（800×800，Canva 匯出的 PNG 偽裝 .webp），已轉為真正 webp（quality 88）覆蓋 `public/images/product_l_1468614.webp`，並跑 `npm run thumbnails` 補產生 `product_l_1468614_thumb.webp`
- [x] 擦拭紙架 (1468614) specifications 補上新圖上的規格：「適用卷紙寬度：≤36cm」「展開尺寸：46×46×84(H)cm」
- [ ] 首頁 LOGO 改「紅螞蟻圖」：用戶已提供圖檔（`Red Ant 商標+R.svg` 全身線稿 + Gemini 生成全彩版），目前在另開的對話中反覆調整「圓形 icon」構圖（頭部+觸角置中、圓框樣式），尚未定案。定案後才會套用，牽動 Header/Footer/favicon 多處（含 `npm run favicon` 重跑）

## 其他討論

### 10針棉紗+彈性紗 (1464764) 頁面恢復
- 用戶詢問：舊網址 `https://chiaohsin.com.tw/products/1464764` 刪除後能否恢復，但不顯示就好
- 討論後確認：全站目前無任何地方（分類頁/搜尋/首頁貨架/相關商品）會連到 `available: false` 的商品，但 `[id].astro` 的 `getStaticPaths` 現行邏輯是 `available: false` 的商品連頁面都不會產生（直接造訪會 404），並非「頁面存在但不列出」
- 用戶最終選擇：**404 也沒關係**，只要資料保留在 `products.json`，不需改程式
- 已從 git diff 取回原始欄位內容，重新插入 `products.json`（`cotton-gloves` 分類，1468521 之前），並加上 `"available": false`
- 對應圖片 `public/images/product_l_1464764.webp` 與縮圖仍存在（尚未被清理），故資料與圖片皆已恢復一致
- 直接造訪 `/products/1464764` 目前仍會 404（因 `[id].astro` getStaticPaths 排除 available:false 商品）——此為用戶已確認接受的結果，非待辦

## 重要位置
- `src/data/products.json` — 本次所有商品欄位異動處
- `src/components/Header.astro` / `src/components/Footer.astro` / `src/layouts/Layout.astro` / `src/data/company.json` — LOGO 出現位置
- `src/pages/products/[id].astro:10` — getStaticPaths 排除 `available: false` 商品（1464764 頁面不會產生的原因）

## 備註
- 原始異動單：`C:\Users\USER\Downloads\網頁修改.xlsx`
- 麻布袋 20只 vs 原「每捆重量約1.1kg」未同步調整（用戶只要求改數量，未要求改重量，故保留原重量）
