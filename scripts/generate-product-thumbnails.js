// 為 products.json 裡的每張商品圖產生一份縮圖（400x400），
// 給首頁貨架、商品列表卡、Header 搜尋下拉等縮圖情境使用，
// 詳情頁主圖繼續使用原始 800x800 圖檔。
//
// 用法：node scripts/generate-product-thumbnails.js
// 已存在且比原圖新的縮圖會跳過，可重複執行（新增產品後再跑一次即可）。

import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const THUMB_SIZE = 400;
const THUMB_QUALITY = 80;

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "public");
const productsJsonPath = path.join(rootDir, "src/data/products.json");

function toThumbPath(imagePath) {
  const ext = path.extname(imagePath);
  if (!ext) return imagePath + "_thumb";
  return imagePath.slice(0, -ext.length) + "_thumb" + ext;
}

async function main() {
  const products = JSON.parse(await readFile(productsJsonPath, "utf-8"));

  let generated = 0;
  let skipped = 0;
  let missing = 0;

  for (const product of products) {
    const imagePath = product.image;
    if (!imagePath) continue;

    const srcPath = path.join(publicDir, imagePath);
    const thumbRelPath = toThumbPath(imagePath);
    const thumbPath = path.join(publicDir, thumbRelPath);

    if (!existsSync(srcPath)) {
      console.warn(`⚠️  找不到原圖，跳過：${imagePath}`);
      missing++;
      continue;
    }

    if (existsSync(thumbPath) && statSync(thumbPath).mtimeMs >= statSync(srcPath).mtimeMs) {
      skipped++;
      continue;
    }

    await sharp(srcPath)
      .resize(THUMB_SIZE, THUMB_SIZE, { fit: "cover" })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbPath);

    generated++;
    console.log(`✅ ${thumbRelPath}`);
  }

  console.log(`\n完成：新增 ${generated}、略過 ${skipped}（已是最新）、缺檔 ${missing}`);
}

main();
