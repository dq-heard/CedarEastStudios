// Portable Text -> HTML for post bodies. Rendered with set:html, so every value
// that lands in an attribute is escaped here.
import {
  toHTML,
  escapeHTML,
  type PortableTextComponents,
} from "@portabletext/to-html";
import { urlFor } from "../sanity/client";

// Only these link targets are rendered as links; anything else (javascript:, data:) is dropped
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:|\/|#)/i;

function figure({ value }: { value: any }) {
  if (!value?.asset) return "";
  const width = 1200;
  const dims = value.dimensions as
    { width?: number; height?: number } | undefined;
  const height =
    dims?.width && dims?.height
      ? Math.round((width * dims.height) / dims.width)
      : 675;
  const src = urlFor(value).width(width).auto("format").url();
  return `<figure><img src="${escapeHTML(src)}" alt="${escapeHTML(value.alt ?? "")}" width="${width}" height="${height}" loading="lazy" decoding="async"></figure>`;
}

const components: PortableTextComponents = {
  types: {
    // Studio's body uses the imageWithAlt object; plain "image" is covered too
    imageWithAlt: figure,
    image: figure,
  },
  marks: {
    link: ({ children, value }) => {
      const href = String(value?.href ?? "");
      if (!SAFE_HREF.test(href)) return children;
      const external = /^https?:\/\//i.test(href);
      return `<a href="${escapeHTML(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${children}</a>`;
    },
  },
};

export const renderBody = (body: unknown[] | null | undefined) =>
  body?.length ? toHTML(body as any, { components }) : "";
