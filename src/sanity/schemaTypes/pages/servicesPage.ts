import { defineField, defineType } from "sanity";

export const servicesPage = defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "services", title: "Services" },
    { name: "pricing", title: "Packages" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    // ---- Hero ----
    defineField({
      name: "heroBadge",
      title: "Eyebrow",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroHeadline",
      title: "Headline (h1)",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "seo",
      title: "Search & Social (SEO)",
      type: "seo",
      group: "hero",
    }),

    // ---- Services (the cards come from the separate service documents) ----
    defineField({
      name: "servicesHeader",
      title: "Header",
      type: "sectionHeader",
      group: "services",
    }),

    // ---- Packages ----
    defineField({
      name: "pricingHeader",
      title: "Header",
      type: "sectionHeader",
      group: "pricing",
    }),
    defineField({
      name: "tiers",
      title: "Pricing Packages",
      type: "array",
      group: "pricing",
      of: [
        {
          type: "object",
          name: "tier",
          title: "Package",
          fields: [
            defineField({
              name: "tierName",
              title: "Package Name",
              type: "string",
            }),
            defineField({
              name: "key",
              title: "Key",
              type: "slug",
              options: {
                source: (_doc, ctx) =>
                  (ctx.parent as { tierName?: string })?.tierName ?? "",
              },
              description:
                "Click Generate. Used by FAQ tokens, e.g. {{shop.price}}. Don't change it after the FAQ uses it.",
            }),
            defineField({
              name: "isPopular",
              title: "Featured?",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "popularBadgeText",
              title: "Featured Badge Text",
              type: "string",
              hidden: ({ parent }) => !parent?.isPopular,
            }),
            defineField({
              name: "pricePrefix",
              title: "Price Prefix (optional)",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Price (whole dollars)",
              type: "number",
              description: "Type 1995, not $1,995.",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "features",
              title: "What's Included",
              type: "array",
              of: [{ type: "string" }],
            }),
            defineField({
              name: "ctaText",
              title: "Button Text",
              type: "string",
            }),
            defineField({
              name: "ctaLink",
              title: "Button Link",
              type: "link",
            }),
          ],
          preview: { select: { title: "tierName", subtitle: "price" } },
        },
      ],
    }),
    defineField({
      name: "retainer",
      title: "Care Plan Banner",
      type: "object",
      group: "pricing",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "price",
          title: "Price (whole dollars)",
          type: "number",
          description: "Type 149, not $149.",
        }),
        defineField({
          name: "interval",
          title: "Billing Interval",
          type: "string",
          options: {
            list: [
              { title: "Per month", value: "month" },
              { title: "Per year", value: "year" },
            ],
            layout: "radio",
          },
          initialValue: "month",
        }),
        defineField({ name: "ctaText", title: "Button Text", type: "string" }),
        defineField({ name: "ctaLink", title: "Button Link", type: "link" }),
      ],
    }),

    // ---- FAQ ----
    defineField({
      name: "faqHeader",
      title: "Header",
      type: "sectionHeader",
      group: "faq",
    }),
    defineField({
      name: "faqCtaText",
      title: "Booking Link Text",
      type: "string",
      group: "faq",
      description: "Links to the Booking Link in Site Settings.",
    }),
    defineField({
      name: "faqItems",
      title: "Questions",
      type: "array",
      group: "faq",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Question",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              description:
                "Live prices: {{key.price}} for any package key, plus {{retainer.price}}, {{retainer.period}} and {{retainer.interval}}.",
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Services Page" }) },
});
