import { defineField, defineType } from "sanity";
import { SOCIAL_PLATFORM_OPTIONS } from "../socials";

export const about = defineType({
  name: "about",
  title: "About Section",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "desc1",
      title: "Primary Paragraph",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "desc2",
      title: "Secondary Paragraph",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "ctaText", title: "Button Text", type: "string" }),
    defineField({ name: "ctaLink", title: "Button Link", type: "link" }),
    defineField({ name: "image", title: "About Image", type: "imageWithAlt" }),
  ],
});

export const philosophy = defineType({
  name: "philosophy",
  title: "Philosophy Section",
  type: "document",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 2,
      description:
        "Put the highlighted word in [brackets], e.g. Good design is how it [works].",
    }),
    defineField({ name: "authorName", title: "Author", type: "string" }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
  ],
});

export const founder = defineType({
  name: "founder",
  title: "Founder Section",
  type: "document",
  fields: [
    defineField({ name: "portrait", title: "Portrait", type: "imageWithAlt" }),
    defineField({
      name: "isAvailable",
      title: "Currently Available?",
      type: "boolean",
      initialValue: true,
      description:
        "On: Available phrase with a green dot. Off: Unavailable phrase with an orange dot.",
    }),
    defineField({
      name: "availableText",
      title: "Available Phrase",
      type: "string",
      initialValue: "Available for Select Projects",
    }),
    defineField({
      name: "unavailableText",
      title: "Unavailable Phrase",
      type: "string",
      initialValue: "Currently Booked",
    }),
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "leadText",
      title: "Lead Bio (Paragraph 1)",
      type: "text",
    }),
    defineField({
      name: "bioText",
      title: "Secondary Bio (Paragraph 2)",
      type: "text",
    }),
    defineField({
      name: "stats",
      title: "Quick Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "statItem",
          title: "Stat",
          fields: [
            defineField({
              name: "label",
              title: "Label (e.g. Experience)",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value (e.g. 10+ Years)",
              type: "string",
            }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
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
  ],
});

export const techStack = defineType({
  name: "techStack",
  title: "Tech Stack Section",
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
