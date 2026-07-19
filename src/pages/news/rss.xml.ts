import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import company from "../../data/company.json";

export async function GET(context: APIContext) {
  const items = await getCollection("news", ({ data }) => !data.draft);
  const sorted = items.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: `${company.shortName}最新消息`,
    description: "新品上架公告、庫存備貨通知、公司動態。",
    site: context.site!,
    trailingSlash: false,
    items: sorted.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.publishDate,
      link: `/news/${item.id.replace(/\/index$/, "")}`,
    })),
  });
}
