import type { APIRoute } from "astro";
import products from "../data/products.json";

// Header 搜尋用的精簡索引：只留搜尋與結果顯示需要的欄位，
// 排除規格/包裝等詳情頁專用資料，並濾掉下架商品。
export const GET: APIRoute = () => {
  const index = products
    .filter((p) => p.available !== false)
    .map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      category: p.category,
      tags: p.tags ?? [],
      image: p.image,
    }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
};
