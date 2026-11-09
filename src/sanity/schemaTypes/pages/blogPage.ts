import { defineType, defineField } from "sanity";

export const blogPage = defineType({
  name: "blogPage",
  title: "Blog Page",
  type: "document",
  fields: [
    defineField({ name: "heroBadge", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heroHeadline",
      title: "Headline (h1)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "heroDescription",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "seo", title: "Search & Social (SEO)", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "Blog Page" }) },
});
