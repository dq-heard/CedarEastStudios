// Planned sections from the page roadmap: Tech Stack (About), Process (About + Services),
// and legal pages (privacy / terms, linked from the footer and the contact form).
import { defineField, defineType } from "sanity";

export const techStack = defineType({
  name: "techStack",
  title: "Tech Stack (About)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "items",
      title: "Tools",
      type: "array",
      of: [
        {
          type: "object",
          name: "tool",
          title: "Tool",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "iconName",
              title: "FontAwesome Icon (e.g. fab fa-wordpress)",
              type: "string",
            }),
            defineField({
              name: "note",
              title: "One-line Note (optional)",
              type: "string",
              description: "e.g. Why you use it.",
            }),
          ],
          preview: { select: { title: "name", subtitle: "note" } },
        },
      ],
    }),
  ],
});

// One document, shown on both About and Services.
export const processTimeline = defineType({
  name: "process",
  title: "Process Timeline (About + Services)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [
        {
          type: "object",
          name: "step",
          title: "Step",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Typical Duration (optional)",
              type: "string",
              description: "e.g. Week 1",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: { select: { title: "title", subtitle: "duration" } },
        },
      ],
    }),
  ],
});

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
