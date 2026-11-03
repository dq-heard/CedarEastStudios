import { createClient } from "@sanity/client";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

export const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID as string;
export const dataset =
  (import.meta.env.PUBLIC_SANITY_DATASET as string) || "production";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-10-30",
  useCdn: false,
});

const builder = createImageUrlBuilder({ projectId, dataset });
export const urlFor = (source: SanityImageSource) => builder.image(source);
