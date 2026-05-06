# 喬新網站 - 設計風格指南

## 🎨 色彩系統

```
Primary (主色)：#0066CC (藍色)
Secondary (副色)：#FF6B35 (橙色)
Success：#10B981 (綠色)
Warning：#F59E0B (琥珀色)
Error：#EF4444 (紅色)
Gray 50：#F9FAFB
Gray 100：#F3F4F6
Gray 200：#E5E7EB
Gray 500：#6B7280
Gray 600：#4B5563
Gray 900：#111827
```

## 📝 排版

- **大標題 (H1)**：text-4xl md:text-5xl font-extrabold
- **標題 (H2)**：text-3xl font-bold mt-16 mb-6 pb-4 border-b border-gray-100
- **小標題 (H3)**：text-2xl font-bold mt-10 mb-4
- **正文**：text-gray-600 leading-8 text-base
- **輔助文字**：text-gray-500 text-sm

## 🎯 常用 Tailwind 組件

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
<span class="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">
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
         hover:bg-blue-700 transition-all shadow-lg">
  按鈕文字
</a>

<!-- 次色按鈕 -->
<a class="px-8 py-3 rounded-xl bg-white text-primary border border-primary/20 
         font-bold hover:bg-blue-50 transition-all">
  按鈕文字
</a>
```

### 提示框 (Insight Box)
```html
<!-- 藍色提示 -->
<div class="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-4">
  <p class="text-blue-700 text-sm leading-relaxed">提示內容</p>
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
      <div class="h-full bg-blue-600 rounded-full" style="width: 95%"></div>
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

## 📐 間距 (Spacing)

- 頁面外邊距：px-4
- 區塊寬度：max-w-4xl (文章) / max-w-6xl (列表)
- 區塊間距：my-8 / my-16 (大區塊)
- 內部間距：p-4 / p-6 / p-8

## 🔲 圓角

- 小元素：rounded-lg (0.5rem)
- 卡片：rounded-2xl (1rem) 
- 大區塊：rounded-3xl (1.5rem)

## ⚡ 動畫 / Transition

- 懸停陰影：hover:shadow-lg transition-shadow
- 懸停移動：hover:-translate-y-2 transition-all
- 文字顏色：text-gray-500 hover:text-primary transition-colors
- 背景顏色：bg-white hover:bg-gray-50 transition-colors

## 🖼️ 圖片處理

- 圖片圓角：rounded-2xl
- 圖片陰影：shadow-xl
- 縱橫比 (文章封面)：aspect-[21/9]
- 縱橫比 (列表卡片)：aspect-video

## 📱 Responsive 斷點

- 小螢幕：sm: (640px)
- 平板：md: (768px)
- 桌機：lg: (1024px)

範例：
```html
<!-- 手機版單列、平板版雙列、桌機版三列 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

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

**使用此指南，新文章設計應該與網站風格 100% 匹配，無需調整。**
