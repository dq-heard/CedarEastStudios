// Every page projects its seo object the same way and resolves it the same way.
export const SEO = `seo{ title, description, image, noIndex }`;

export interface Seo {
  title?: string;
  description?: string;
  image?: any;
  noIndex?: boolean;
}

interface Fallback {
  title?: string; // usually the page name or the post/project title
  description?: string; // usually the hero description, excerpt or start of the overview
  image?: any; // usually the post main image or project cover
}

/** The page's own SEO wins, then what the page can derive. Layout adds the site defaults. */
export function resolveSeo(seo?: Seo | null, fallback: Fallback = {}) {
  return {
    title: seo?.title || fallback.title,
    description: seo?.description || fallback.description,
    image: seo?.image?.asset ? seo.image : fallback.image,
    noindex: Boolean(seo?.noIndex),
  };
}
