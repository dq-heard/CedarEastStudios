// src/sanity/schemaTypes/global.ts
import { defineField, defineType } from "sanity";
import { SOCIAL_PLATFORM_OPTIONS } from "../socials";
import { HIGHLIGHT_HINT } from "./objects";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings & SEO",
  type: "document",
  fields: [
    defineField({
      name: "agencyName",
      title: "Agency Name (plain text)",
      type: "string",
      description: "Used in page titles and metadata, e.g. Cedar East Studios.",
    }),
    defineField({
      name: "brandName",
      title: "Brand Name (styled)",
      type: "string",
      initialValue: "Cedar[East] Studios",
      description: "Shown in the navbar and footer. " + HIGHLIGHT_HINT,
    }),
    defineField({
      name: "pageHeroImage",
      title: "Page Hero Background (optional)",
      type: "image",
      options: { hotspot: true },
      description:
        "Shared by the About, Services, Work, Blog and Contact heroes. The Home hero has its own.",
    }),
    defineField({
      name: "supportEmail",
      title: "Support E-mail",
      type: "string",
    }),
    defineField({
      name: "responseTimeText",
      title: "Response Time",
      type: "string",
      description:
        "Shown under your email in the footer and on the contact page, e.g. Replies within one business day.",
    }),
    defineField({
      name: "bookingUrl",
      title: "Booking Link (Cal.com)",
      type: "url",
      description:
        "Your Cal.com link, e.g. https://cal.com/yourname/intro. It's embedded on the Contact page, and the footer and FAQ buttons jump to that calendar. Without it, those buttons and the calendar are hidden.",
      validation: (Rule) => Rule.uri({ scheme: ["https"] }),
    }),
    defineField({ name: "address", title: "Physical Address", type: "string" }),
    defineField({
      name: "socials",
      title: "Social Media Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialItem",
          title: "Social Link",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: { list: SOCIAL_PLATFORM_OPTIONS },
            }),
            defineField({ name: "url", title: "Profile URL", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "tradesServed",
      title: "Trades Served",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the scrolling ticker on the Home page.",
    }),
    defineField({
      name: "seoTitle",
      title: "Default Meta Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});

export const navigation = defineType({
  name: "navigation",
  title: "Main Navigation",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Nav Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Nav Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "target",
              title: "Link",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "target.internal" } },
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "Navbar Button",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          initialValue: "Get Started",
        }),
        defineField({ name: "target", title: "Link", type: "link" }),
      ],
    }),
  ],
});

export const prefooter = defineType({
  name: "prefooter",
  title: "Prefooter (Call to Action)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "primaryLabel",
      title: "Primary Button Text",
      type: "string",
    }),
    defineField({
      name: "primaryLink",
      title: "Primary Button Link",
      type: "link",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary Button Text",
      type: "string",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary Button Link",
      type: "link",
    }),
  ],
});

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  description: "Brand name, e-mail and socials come from Site Settings.",
  fields: [
    defineField({
      name: "brandDescription",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "bookingButtonText",
      title: "Booking Button Text",
      type: "string",
      initialValue: "Book a Free Call",
      description: "The link comes from Site Settings.",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
    }),
  ],
});

/* One hero per inner page (About, Services, Work, Blog, Contact). */
export const pageHero = defineType({
  name: "pageHero",
  title: "Page Hero",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      options: {
        list: [
          { title: "About", value: "about" },
          { title: "Services", value: "services" },
          { title: "Work", value: "work" },
          { title: "Blog", value: "blog" },
          { title: "Contact", value: "contact" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "badge", title: "Eyebrow", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline (h1)",
      type: "text",
      rows: 2,
      description: HIGHLIGHT_HINT,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "Search & Social (SEO)", type: "seo" }),
  ],
  preview: { select: { title: "page", subtitle: "headline" } },
});
