// Everything the Layout needs, fetched in one query. Cached for the length of a build,
// but not in dev, so Studio edits show up on refresh.
import { client } from "./client";
import { mapSocials, type Social } from "./socials";

// Typed on purpose: client.fetch returns `any`, and spreading `any` turns everything
// downstream (including socials in Topbar and Footer) into implicit `any`.
export interface Settings {
  agencyName?: string;
  brandName?: string;
  supportEmail?: string;
  phoneNumber?: string;
  address?: string;
  responseTimeText?: string;
  bookingUrl?: string;
  pageHeroImage?: any;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: any;
  socials: Social[];
}

const href = (field: string) =>
  `"href": coalesce(${field}.external, ${field}.internal)`;

const QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    agencyName, brandName, supportEmail, phoneNumber, address, responseTimeText, bookingUrl, pageHeroImage,
    socials[]{ _key, platform, url },
    seoTitle, seoDescription, ogImage
  },
  "layout": *[_type == "siteLayout"][0]{
    "navItems": navItems[]{ _key, label, "href": coalesce(target.external, target.internal) },
    "navCta": { "label": navCtaLabel, ${href("navCtaTarget")} },
    "footer": { "brandDescription": footerDescription, bookingButtonText, copyrightText },
    "prefooter": {
      "header": prefooterHeader,
      primaryLabel, "primaryHref": coalesce(primaryLink.external, primaryLink.internal),
      secondaryLabel, "secondaryHref": coalesce(secondaryLink.external, secondaryLink.internal)
    }
  },
  "services": *[_type == "service"] | order(coalesce(order, 9999) asc, _createdAt asc)[0...6]{ _id, title },
  "legal": *[_type == "legalPage" && defined(slug.current)] | order(title asc){ _id, title, "slug": slug.current },
  "hasPosts": count(*[_type == "post" && defined(slug.current)]) > 0,
  "hasWork": count(*[_type == "caseStudy" && defined(slug.current)]) > 0
}`;

async function load() {
  // No try/catch on purpose: a failed fetch should fail the build, not ship an empty site.
  const raw = await client.fetch(QUERY);
  return {
    settings: {
      ...(raw.settings ?? {}),
      socials: mapSocials(raw.settings?.socials),
    } as Settings,
    nav: {
      items: (raw.layout?.navItems ?? []) as {
        _key: string;
        label: string;
        href: string;
      }[],
      cta: raw.layout?.navCta as { label?: string; href?: string } | undefined,
    },
    footer: raw.layout?.footer ?? {},
    prefooter: raw.layout?.prefooter ?? null,
    services: (raw.services ?? []) as { _id: string; title: string }[],
    legal: (raw.legal ?? []) as { _id: string; title: string; slug: string }[],
    hasPosts: Boolean(raw.hasPosts),
    hasWork: Boolean(raw.hasWork),
  };
}

export type Site = Awaited<ReturnType<typeof load>>;

let cached: Promise<Site> | undefined;
export function getSite(): Promise<Site> {
  if (!import.meta.env.PROD) return load();
  return (cached ??= load());
}
