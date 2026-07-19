import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import company from "../../data/company.json";

export async function GET(context: APIContext) {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );

  return rss({
    title: `${company.shortName}選購指南`,
    description: "工作手套選購教學文章：材質比較、規格挑選、保養維護。",
    site: context.site!,
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.updatedDate ?? post.data.publishDate,
      link: `/blog/${post.id.replace(/\/index$/, "")}`,
    })),
  });
}
