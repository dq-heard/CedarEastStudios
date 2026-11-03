import { defineField, defineType } from "sanity";

/* Header for the /services page. The services themselves are separate documents,
   so each one can become its own page later without a migration. */
export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services Page (header)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
  ],
});

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        "Not used yet. Reserved for /services/your-slug when each service gets its own page.",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "order",
      title: "Sort Order",
      type: "number",
      description: "Lowest first. The first four appear on the home page.",
    }),
    defineField({
      name: "iconName",
      title: "FontAwesome Icon (e.g. fas fa-chart-pie)",
      type: "string",
    }),
    defineField({
      name: "tags",
      title: "Card Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description (card)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Full Description",
      type: "text",
      rows: 5,
    }),
    defineField({
      name: "subServices",
      title: "Sub-Services",
      type: "array",
      of: [
        {
          type: "object",
          name: "subService",
          title: "Sub-Service",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Sort order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "order" } },
});

// Currency is a code constant (USD, see price.ts). Prices are numbers.
export const pricing = defineType({
  name: "pricing",
  title: "Pricing Section",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "tiers",
      title: "Pricing Packages",
      type: "array",
      of: [
        {
          type: "object",
          name: "tier",
          title: "Package",
          fields: [
            defineField({
              name: "tierName",
              title: "Tier Name (e.g. Growth)",
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
                "Click Generate. Used by FAQ tokens, e.g. {{growth.price}}. Don't change it after the FAQ uses it.",
            }),
            defineField({
              name: "isPopular",
              title: "Featured Tier?",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "popularBadgeText",
              title: "Featured Badge Text",
              type: "string",
              initialValue: "Most Popular",
              hidden: ({ parent }) => !parent?.isPopular,
            }),
            defineField({
              name: "pricePrefix",
              title: "Price Prefix (e.g. Starting at)",
              type: "string",
            }),
            defineField({
              name: "price",
              title: "Price (whole dollars)",
              type: "number",
              description: "Type 4495, not $4,495.",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
            }),
            defineField({
              name: "features",
              title: "Deliverables",
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
      title: "Retainer Banner",
      type: "object",
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
          description: "Type 249, not $249.",
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
  ],
});

// Shown at the bottom of /services. Answers can use price tokens (see pricingRefs.ts).
export const faq = defineType({
  name: "faq",
  title: "FAQ Section",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "ctaText",
      title: "Booking Link Text",
      type: "string",
      initialValue: "Still have questions? Book a free call",
      description: "Links to the Booking Link in Site Settings.",
    }),
    defineField({
      name: "items",
      title: "Questions",
      type: "array",
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
                "Live prices: {{key.price}} for any tier key (e.g. {{growth.price}}), plus {{retainer.price}}, {{retainer.period}} and {{retainer.interval}}.",
            }),
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),
  ],
});
