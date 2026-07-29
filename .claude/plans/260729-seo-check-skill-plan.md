# seo-check Skill 建置與 /about 頁 SEO 修復 計劃書

## 目標
建立喬新針織專案專屬的 `seo-check` skill（SEO/AEO/GEO 健診），用 skill-creator 跑完整測試迭代驗證品質，並順手修掉測試過程中發現的 `/about` 頁真實 SEO bug。

## TODO
- [ ] **push 本地的 2 個 commit 到 origin/develop**（使用者連續兩個 session 都決定先不 push，留到下次；origin/develop 目前無新變動，push 時應無 conflict）

## 已完成並驗證

- **建立 `.claude/skills/seo-check/SKILL.md`**：參考 skillsmp 市集的 `affaan-m/seo`（title/description 公式）與 `nap-consistency`（NAP 一致性檢查邏輯）取概念，不照抄；紅線規則、已定案清單、專案關鍵檔案皆自建
- **用 skill-creator 跑兩輪迭代測試**（with-skill vs baseline 對照，3 個 eval case）：
  - 第一輪抓到問題：字元數公式照搬英文標準（120-160）不適用繁體中文、target 檔案不存在時用假設語氣包裝檢查結果、紅線只涵蓋 price 未涵蓋誇大行銷用詞
  - 三個問題都已修進 SKILL.md：字元數改中文適用（title 30 字內、description 70-100 字）、加「先確認檔案存在」步驟、紅線擴大涵蓋「不宣稱無法驗證的事」
  - 第二輪測試驗證：兩個修正生效，但意外發現「檔案不存在給預備清單」分支跳脫了 SEO/AEO/GEO 分類格式，已直接補一句規則修正（**這個修正沒有再跑第三輪測試驗證**，是使用者決定「先修專案」優先於「繼續完善 skill」後的快速補丁，未來如果又發現這個分支格式跑掉，要回來看這裡）
  - 測試用的 evals/grading/benchmark 中間產出在 `.claude/skills/seo-check-workspace/`，已加進 `.gitignore`（`.claude/skills/*-workspace/`），不進 git
- **修復 `/about` 頁三個真實 SEO bug**（用 seo-check skill 健診時發現，非假設情境）：
  1. `<title>` 品牌名重複兩次（`about/index.astro` 自帶品牌 + `Layout.astro:29` 又自動補一次）→ title 改成不帶品牌的版本
  2. meta description 只有 47 字元且含「全台最值得信賴」無法驗證用詞 → 改寫成 78 字元、內容全部可驗證
  3. 麵包屑畫面文字「關於喬新」跟 `BreadcrumbList` schema 的「關於我們」不一致 → 統一成「關於我們」
  - 已跑 `astro check`（0 錯誤）與 `npm run build`（120 頁）驗證，並直接 grep dist 輸出確認三處修正都正確生效
- **`docs/website-project-playbook.md` 補充**：SEO 章節加了「誇大用詞紅線」「中文字元數修正」「共用 Layout 自動組字疊加 bug 類型」三條；新增 8.4（建 skill 前先查舊計劃、判斷該不該開新 skill）、8.5（skill 測試對照組常見誤判：baseline 不等於沒有 CLAUDE.md 背景、修 bug 要重跑全部測試案例）
- **同步 3 篇知識筆記到 Notion「開發網站筆記」DB**：seo-check skill 建置心得、/about 頁三個 bug、website-project-playbook.md 全文。三篇的 frontmatter「標籤」（multi_select）跟「建立日期」（date）欄位工具沒自動填上，**使用者說要自己手動補**，不是我們的待辦
- **`.gitignore` 補兩條**：`docs/website-project-playbook.md`（個人筆記不進 git，跟 `docs/notion-project-guide.md` 同模式）、`.claude/skills/*-workspace/`（skill 測試 scratch 產出）
- **commit `0b2271a`**：新增 seo-check skill + `/about` 頁三個 bug 修復 + 上述 gitignore/plan 檔更新，尚未 push

## 重要位置
- `.claude/skills/seo-check/SKILL.md` - skill 本體，「使用方式」第1步是檔案存在性檢查、「紅線規則」第二條是誇大用詞、「檢查清單」SEO 段落是中文字元數公式
- `src/pages/about/index.astro` - `aboutDescription`（第9-10行）、`title` prop（第159行附近）、麵包屑 `<span class="ab-breadcrumb-cur">`（約181行）
- `src/layouts/Layout.astro:29` - `pageTitle` 自動補品牌後綴的邏輯，這類共用邏輯要注意跟頁面自帶內容疊加重複
- `docs/website-project-playbook.md` - 已加進 `.gitignore`，本地保留，未來心得直接回來補這份不用另開新檔
- `.claude/plans/done/260719-seo-aeo-geo-followup-plan.md` - 補了顏色對比度不處理的原因說明

## 備註
- 首頁與 `products/index.astro` 疑似也有跟 `/about` 一樣的 title 品牌重複問題（iteration-2 without_skill 測試時意外發現，範圍外，沒有查證也沒有修），下次做 SEO 健診時可以順便確認一下
- `seo-check` skill 目前只針對這個 chiaohsin 專案，範圍是 `.claude/skills/seo-check/`（專案內非全域），跟 `chiaohsin`、`product-upload`、`blog-article` 三個既有專案級 skill 同一層級
