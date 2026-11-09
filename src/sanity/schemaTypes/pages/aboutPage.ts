import { defineField, defineType } from "sanity";
import { SOCIAL_PLATFORM_OPTIONS } from "../../socials";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "studio", title: "Studio" },
    { name: "philosophy", title: "Philosophy" },
    { name: "founder", title: "Founder" },
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
      name: "heroImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "seo",
      title: "Search & Social (SEO)",
      type: "seo",
      group: "hero",
    }),

    // ---- Studio ----
    defineField({
      name: "studioHeader",
      title: "Header",
      type: "sectionHeader",
      group: "studio",
    }),
    defineField({
      name: "desc1",
      title: "Primary Paragraph",
      type: "text",
      rows: 3,
      group: "studio",
    }),
    defineField({
      name: "desc2",
      title: "Secondary Paragraph",
      type: "text",
      rows: 2,
      group: "studio",
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      group: "studio",
    }),
    defineField({
      name: "ctaLink",
      title: "Button Link",
      type: "link",
      group: "studio",
    }),
    defineField({
      name: "studioImage",
      title: "About Image",
      type: "imageWithAlt",
      group: "studio",
    }),

    // ---- Philosophy ----
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 2,
      group: "philosophy",
      description:
        "Put the highlighted word in [brackets], e.g. Good design is how it [works].",
    }),
    defineField({
      name: "authorName",
      title: "Author",
      type: "string",
      group: "philosophy",
    }),
    defineField({
      name: "authorRole",
      title: "Author Role",
      type: "string",
      group: "philosophy",
    }),
    defineField({
      name: "philosophyImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      group: "philosophy",
      description: "Shown very faintly behind the quote.",
    }),

    // ---- Founder ----
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "imageWithAlt",
      group: "founder",
    }),
    defineField({
      name: "isAvailable",
      title: "Currently Available?",
      type: "boolean",
      initialValue: true,
      group: "founder",
      description:
        "On: Available phrase with a green dot. Off: Unavailable phrase with an orange dot.",
    }),
    defineField({
      name: "availableText",
      title: "Available Phrase",
      type: "string",
      group: "founder",
    }),
    defineField({
      name: "unavailableText",
      title: "Unavailable Phrase",
      type: "string",
      group: "founder",
    }),
    defineField({
      name: "founderHeader",
      title: "Header",
      type: "sectionHeader",
      group: "founder",
    }),
    defineField({
      name: "leadText",
      title: "Lead Bio (Paragraph 1)",
      type: "text",
      group: "founder",
    }),
    defineField({
      name: "bioText",
      title: "Secondary Bio (Paragraph 2)",
      type: "text",
      group: "founder",
    }),
    defineField({
      name: "stats",
      title: "Quick Stats",
      type: "array",
      group: "founder",
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
      group: "founder",
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
  preview: { prepare: () => ({ title: "About Page" }) },
});
