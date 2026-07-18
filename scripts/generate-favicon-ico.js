// 從 favicon-512.png 產生標準的 public/favicon.ico
// （sharp 不支援輸出 .ico，這裡手動組出單張 PNG-in-ICO 容器，現代瀏覽器與 Google 都支援這個格式）
//
// 用法：node scripts/generate-favicon-ico.js

import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ICON_SIZE = 48; // Google 建議 favicon 大於 48x48
const rootDir = path.resolve(import.meta.dirname, "..");
const srcPath = path.join(rootDir, "public/favicon-512.png");
const outPath = path.join(rootDir, "public/favicon.ico");

async function main() {
  const pngBuffer = await sharp(srcPath)
    .resize(ICON_SIZE, ICON_SIZE)
    .png()
    .toBuffer();

  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = icon
  header.writeUInt16LE(1, 4); // image count

  const entry = Buffer.alloc(16);
  entry.writeUInt8(ICON_SIZE, 0); // width
  entry.writeUInt8(ICON_SIZE, 1); // height
  entry.writeUInt8(0, 2); // color count
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuffer.length, 8); // image data size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset to image data

  const ico = Buffer.concat([header, entry, pngBuffer]);
  await writeFile(outPath, ico);
  console.log(`✅ 已產生 public/favicon.ico（${ICON_SIZE}x${ICON_SIZE}, ${ico.length} bytes）`);
}

main();
