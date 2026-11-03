// src/sanity/structure.ts  (the Studio sidebar, grouped by site page)
import type { StructureResolver } from "sanity/structure";

// Documents that exist exactly once. They open the editor directly instead of a list.
const SINGLETON_TYPES_BY_PAGE = {
  site: [
    ["siteSettings", "Site Settings"],
    ["navigation", "Navigation"],
    ["footer", "Footer"],
    ["prefooter", "Prefooter (CTA)"],
  ],
  home: [
    ["hero", "Hero"],
    ["servicesIntro", "Services Intro"],
    ["process", "Process"],
    ["portfolio", "Work Section Header"],
    ["testimonials", "Testimonials"],
    ["news", "News Section Header"],
  ],
  about: [
    ["about", "About"],
    ["philosophy", "Philosophy"],
    ["techStack", "Tech Stack"],
    ["founder", "Founder"],
  ],
  services: [
    ["servicesSection", "Page Header"],
    ["pricing", "Pricing"],
    ["faq", "FAQ"],
  ],
  contact: [
    ["contact", "Contact Page"],
    ["thankYou", "Thank-You Page"],
  ],
} satisfies Record<string, [type: string, title: string][]>;

export const SINGLETON_TYPES: string[] = Object.values(
  SINGLETON_TYPES_BY_PAGE
).flatMap((group) => group.map(([type]) => type));

export const structure: StructureResolver = (S) => {
  const singleton = ([type, title]: readonly [string, string]) =>
    S.listItem()
      .title(title)
      .id(type)
      .child(S.document().schemaType(type).documentId(type));

  const group = (title: string, items: ReturnType<typeof singleton>[]) =>
    S.listItem().title(title).child(S.list().title(title).items(items));

  const { site, home, about, services, contact } = SINGLETON_TYPES_BY_PAGE;

  return S.list()
    .title("Content")
    .items([
      group("Site-wide", [
        ...site.map(singleton),
        S.documentTypeListItem("pageHero").title("Page Heroes"),
      ]),
      S.divider(),
      group("Home", home.map(singleton)),
      group("About", about.map(singleton)),
      group("Services", [
        ...services.slice(0, 1).map(singleton),
        S.documentTypeListItem("service").title("Services"),
        ...services.slice(1).map(singleton),
      ]),
      group("Work", [S.documentTypeListItem("caseStudy").title("Projects")]),
      group("Blog", [S.documentTypeListItem("post").title("Posts")]),
      group("Contact", contact.map(singleton)),
      S.divider(),
      S.documentTypeListItem("legalPage").title("Legal Pages"),
    ]);
};

// In sanity.config.ts, stop editors from creating or deleting the singletons:
//   schema: { types: schemaTypes, templates: (t) => t.filter(({ schemaType }) => !SINGLETON_TYPES.includes(schemaType)) },
//   document: { actions: (input, ctx) => SINGLETON_TYPES.includes(ctx.schemaType) ? input.filter(({ action }) => action && ["publish","discardChanges","restore"].includes(action)) : input },
