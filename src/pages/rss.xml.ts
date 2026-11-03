// src/pages/rss.xml.ts  (needs: npm i @astrojs/rss)
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { client } from "../sanity/client";

export async function GET(context: APIContext) {
  const { settings, posts } = await client.fetch<{
    settings?: { agencyName?: string; seoDescription?: string } | null;
    posts: {
      title: string;
      slug: string;
      excerpt?: string;
      publishedAt: string;
    }[];
  }>(`{
    "settings": *[_type == "siteSettings"][0]{ agencyName, seoDescription },
    "posts": *[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc){
      title, "slug": slug.current, excerpt, publishedAt
    }
  }`);

  return rss({
    title: settings?.agencyName ? `${settings.agencyName} Blog` : "Blog",
    description: settings?.seoDescription ?? "",
    site: context.site!,
    items: posts.map((post) => ({
      title: post.title,
      description: post.excerpt,
      pubDate: new Date(post.publishedAt),
      link: `/blog/${post.slug}`,
    })),
  });
}
