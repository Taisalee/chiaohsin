# 喬新網站 - 設計風格指南

> 目前網站有兩層設計系統並存：
> 1. **首頁 / Header / Footer**（`design-explore` 分支重新設計）— 自訂 CSS 變數 + clamp 流體排版的「紅螞蟻手套」品牌語言
> 2. **內頁**（about、blog、contact 等）— Tailwind + daisyUI utility class 為主的舊系統
>
> 兩者色彩已對齊（primary/secondary 同值），但排版手法不同，詳見下方分區說明。

## 🎨 色彩系統（現況真實值）

```
Primary   #4A90A4  藍綠（tailwind.config.mjs primary，= 首頁 --td）
Secondary #D4A574  暖駝色（tailwind.config.mjs secondary，= 首頁 --teal）
Accent    #FF69B4  粉（tailwind.config.mjs accent，花龍手套代表色，內頁少量使用）
品牌紅     #c0392b  紅螞蟻手套 Logo 紅（只用在 Header/Footer 品牌識別、強調重點，不做主色使用）

首頁專用：
--orange  #E0A458  強調色（eyebrow 文字、主按鈕）
--cream   #F7F6F3  全站底色（daisyUI --color-base-100 已覆寫為此值，見 Layout.astro）
--ink     #1F2937  主文字
--sub     #6B7280  輔助文字
--line    #E6E4DE  卡片邊框／分隔線（偏暖灰，不是純灰 #E5E7EB）

daisyUI 語意色（沿用預設，內頁提示框/警告用）：
Success   #10B981
Warning   #F59E0B
Error     #EF4444
```

⚠️ 舊版寫的 Primary `#0066CC`／Secondary `#FF6B35` 已過時，`bg-primary`/`bg-secondary` 實際渲染為上表數值，撰寫新內容一律以此表為準。

## 📝 排版

### 內頁（Tailwind 慣例，about/blog/contact 適用）
- **大標題 (H1)**：text-4xl md:text-5xl font-extrabold
- **標題 (H2)**：text-3xl font-bold mt-16 mb-6 pb-4 border-b border-gray-100
- **小標題 (H3)**：text-2xl font-bold mt-10 mb-4
- **正文**：text-gray-600 leading-8 text-base
- **輔助文字**：text-gray-500 text-sm

### 首頁自訂系統
- 字級/間距一律用 `clamp(min, vw, max)` 做流體縮放，不用固定斷點字級表
  例：`font-size: clamp(18px, 2.5vw, 26px);`
- 標題字重偏重：`font-weight: 800–900`；內文 `600–700`，對比明顯
- 容器寬度 `max-width: 1280px`，左右留白 `padding-inline: clamp(20px, 5vw, 64px)`
- 字體：`"Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif`

## 🎯 常用 Tailwind 組件（內頁適用）

### 卡片 (Card)
```html
<div class="rounded-2xl border border-gray-200 bg-white hover:shadow-lg 
            transition-shadow p-6">
  <!-- 內容 -->
</div>
```

### Badge / 標籤
```html
<!-- 主色 -->
<span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
  標籤
</span>

<!-- 灰色 -->
<span class="px-3 py-1 rounded-lg bg-gray-100 text-gray-600 text-sm">
  #標籤
</span>
```

### 按鈕
```html
<!-- 主色按鈕 -->
<a class="px-8 py-3 rounded-xl bg-primary text-white font-bold 
         hover:opacity-90 transition-all shadow-lg">
  按鈕文字
</a>

<!-- 次色按鈕 -->
<a class="px-8 py-3 rounded-xl bg-white text-primary border border-primary/20 
         font-bold hover:bg-primary/5 transition-all">
  按鈕文字
</a>
```

### 提示框 (Insight Box)
```html
<!-- 主色提示 -->
<div class="bg-primary/5 border-l-4 border-primary rounded-r-lg p-4">
  <p class="text-primary text-sm leading-relaxed">提示內容</p>
</div>

<!-- 琥珀色警告 -->
<div class="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-4">
  <p class="text-amber-700 text-sm leading-relaxed">警告內容</p>
</div>
```

### 表格
```html
<div class="overflow-x-auto bg-white border border-gray-200 rounded-2xl">
  <table class="w-full text-sm">
    <thead class="bg-gray-50 border-b">
      <tr>
        <th class="px-6 py-3 text-left font-semibold text-gray-900">欄位</th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 text-gray-600">內容</td>
      </tr>
    </tbody>
  </table>
</div>
```

### 進度條
```html
<div class="space-y-3">
  <div>
    <div class="flex justify-between text-xs mb-1">
      <span class="text-gray-600">耐磨度</span>
      <span class="text-gray-500">高</span>
    </div>
    <div class="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div class="h-full bg-primary rounded-full" style="width: 95%"></div>
    </div>
  </div>
</div>
```

### Accordion / 手風琴 (FAQ)
```html
<details class="group border border-gray-200 rounded-xl overflow-hidden 
                hover:shadow-md transition-shadow">
  <summary class="cursor-pointer px-5 py-4 bg-white hover:bg-gray-50 
                  font-semibold text-gray-900 flex justify-between select-none">
    <span>問題文字</span>
    <span class="text-xl text-gray-400 group-open:rotate-45 transition-transform">+</span>
  </summary>
  <div class="border-t border-gray-100 bg-gray-50 px-5 py-4 text-sm text-gray-600">
    答案文字
  </div>
</details>
```

## 🏠 首頁設計語言（`src/pages/index.astro` 為範本）

之後改版其他頁面（about、contact、news、products）若要跟首頁風格統一，可參考以下模式：

### 卡片
- 白底 + `1px solid var(--line)`（`#E6E4DE`）+ `border-radius: 10–12px`
- Hover 用微互動而非重陰影：`transform: scale(.97)` 或極淡陰影 `box-shadow: 0 2px 10px rgba(0,0,0,.1)`
- 不用 Tailwind 的 `shadow-lg`/`shadow-xl` 這類重陰影

### 標籤 / Chip
- 一律藥丸形：`border-radius: 999px`
- 淺色底用 `color-mix(in srgb, var(--td) 12%, white)` 動態算色，而非寫死 `bg-blue-100`

### 按鈕三型
1. **Primary**：實色橙底 `var(--orange)` + 白字，用於主要 CTA
2. **Ghost**：透明底 + 半透明白邊框，只用在深色背景（hero、CTA 區）上
3. **Outline**：色框 + 色字，hover 反轉為實色底

### 漸層
- Hero／CTA 用 `linear-gradient(150deg/135deg, var(--td) → var(--teal))`
- 分類錨點卡各自用對比色漸層區分類別（如手套=藍綠→駝色、五金=橙→深棕、包材=灰藍→深藍灰），方便使用者掃視辨識分類

### 特色互動：橫向捲動貨架
- 手機：原生 `scroll-snap-type: x mandatory` + 右側漸層遮罩暗示可滑動
- 桌面：額外疊加左右箭頭按鈕（滾動到底自動淡出 `.gone` class）
- 這是目前站上最具識別度的互動模式，其他列表型內容（如未來的產業應用列表）可考慮沿用

### 分隔線邏輯
- 不用色塊切割區塊，而是 `border-top: 1px solid var(--line)` + `padding-block` 控制垂直節奏

## 📐 間距 (Spacing)

- 內頁頁面外邊距：px-4；區塊寬度 max-w-4xl (文章) / max-w-6xl (列表)
- 首頁外邊距：`clamp(20px, 5vw, 64px)`（流體，見上）
- 區塊間距：my-8 / my-16 (大區塊)
- 內部間距：p-4 / p-6 / p-8

## 🔲 圓角

- 小元素：rounded-lg (0.5rem)
- 卡片：rounded-2xl (1rem)（首頁卡片用 10–12px，略小）
- 大區塊：rounded-3xl (1.5rem)
- 標籤/按鈕（首頁風格）：999px 全圓角藥丸形

## ⚡ 動畫 / Transition

- 內頁：懸停陰影 `hover:shadow-lg transition-shadow`、懸停上移 `hover:-translate-y-2 transition-all`
- 首頁：懸停縮放 `transform: scale(.97)`，配 `cubic-bezier(.34,1.56,.64,1)` 做輕微回彈感
- 文字/背景顏色統一 `transition: all .18s`

## 🖼️ 圖片處理

- 圖片圓角：rounded-2xl（首頁商品圖用 10px）
- 縱橫比：文章封面 16:9、商品卡 1:1

## 📱 Responsive 斷點

- 內頁沿用 Tailwind 預設：sm 640px / md 768px / lg 1024px
- 首頁只在兩個關鍵點切版：640px（手機→平板，pill 篩選器出現）、1024px（平板→桌面，快速導覽從橫滑變 14 欄 grid）

## 🔗 SEO / Meta

- 文章發布日期格式：YYYY-MM-DD
- 標籤格式：[tags] 逗號分隔，保持簡短
- 描述長度：150-160 字

## 📦 Astro 組件結構

所有可重用組件放在：`src/components/`

組件檔案命名：PascalCase (如 GloveSpecCard.astro)

組件應該接受的 Props 示例：
```typescript
interface Props {
  title: string;
  description?: string;
  variant?: 'default' | 'featured' | 'warning';
  className?: string;
}
```

---

**內頁沿用 Tailwind 組件庫章節即可與現有頁面風格一致；若要往首頁的品牌化設計語言靠攏，改用「首頁設計語言」章節的模式。**
