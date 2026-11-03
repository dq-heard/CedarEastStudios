import { defineField, defineType } from "sanity";

// /privacy and /terms. The contact form collects personal data, so at least a privacy policy is needed.
export const legalPage = defineType({
  name: "legalPage",
  title: "Legal Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description: "e.g. privacy or terms. Becomes /privacy.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "updatedAt", title: "Last Updated", type: "date" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
          ],
        },
      ],
    }),
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});
