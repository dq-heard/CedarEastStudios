// (shared by Home and /blog)
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "./client";

// ~200 words per minute, ~5 characters per word
export const POST_CARD_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt,
  mainImage,
  "imageAlt": mainImage.alt,
  "readMinutes": round(length(pt::text(body)) / 5 / 200)
}`;

export interface RawPostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  mainImage?: SanityImageSource | null;
  imageAlt?: string;
  readMinutes?: number | null;
}

export interface PostCardData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  publishedAt?: string;
  imageUrl: string | null;
  imageAlt: string;
  readTime: string;
}

// "4 min read" (empty when there is no body yet)
export const readTimeLabel = (minutes?: number | null) =>
  minutes ? `${Math.max(1, minutes)} min read` : "";

export function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "America/Chicago",
  }).format(new Date(iso));
}

export function mapPostCard(post: RawPostCard): PostCardData {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    category: post.category,
    publishedAt: post.publishedAt,
    imageUrl: post.mainImage
      ? urlFor(post.mainImage)
          .width(1200)
          .height(800)
          .fit("crop")
          .auto("format")
          .url()
      : null,
    imageAlt: post.imageAlt ?? "",
    readTime: readTimeLabel(post.readMinutes),
  };
}
