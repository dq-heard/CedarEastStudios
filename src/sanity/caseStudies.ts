// Shared by the home work section and /work so the card projection can't drift.
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "./client";

export const CASE_CARD_PROJECTION = `{
  _id,
  title,
  "slug": slug.current,
  category,
  layout,
  coverImage,
  "imageAlt": coverImage.alt
}`;

// The Studio dropdown values -> your existing bento grid classes
const LAYOUT_CLASS: Record<string, string> = {
  wide: "item-featured",
  half: "item-half",
};

export interface RawCaseCard {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  layout?: string;
  coverImage?: SanityImageSource | null;
  imageAlt?: string;
}

export interface CaseCardData {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  layoutClass: string;
  imageUrl: string | null;
  imageAlt: string;
}

export function mapCaseCard(project: RawCaseCard): CaseCardData {
  return {
    _id: project._id,
    title: project.title,
    slug: project.slug,
    category: project.category,
    layoutClass: LAYOUT_CLASS[project.layout ?? ""] ?? "",
    // width + height + crop makes the builder honor the Studio hotspot
    imageUrl: project.coverImage
      ? urlFor(project.coverImage)
          .width(1200)
          .height(900)
          .fit("crop")
          .auto("format")
          .url()
      : null,
    imageAlt: project.imageAlt ?? "",
  };
}
