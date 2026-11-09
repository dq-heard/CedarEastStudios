import { defineField, defineType } from "sanity";

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
      description: "Lowest first.",
    }),
    defineField({
      name: "iconName",
      title: "FontAwesome Icon (e.g. fas fa-clock)",
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
