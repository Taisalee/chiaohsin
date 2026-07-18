// 對應 scripts/generate-product-thumbnails.js 的命名規則：
// images/product_l_XXX.webp -> images/product_l_XXX_thumb.webp
export function productThumb(imagePath: string): string {
  const dot = imagePath.lastIndexOf(".");
  if (dot === -1) return imagePath;
  return `${imagePath.slice(0, dot)}_thumb${imagePath.slice(dot)}`;
}
