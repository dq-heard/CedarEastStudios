import { defineField, defineType } from "sanity";
import { HIGHLIGHT_HINT } from "../objects";

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "intro", title: "Services Intro" },
    { name: "process", title: "Process" },
    { name: "work", title: "Work" },
    { name: "testimonials", title: "Testimonials" },
    { name: "news", title: "News" },
  ],
  fields: [
    // ---- Hero ----
    defineField({
      name: "tag",
      title: "Eyebrow Tag",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "text",
      rows: 2,
      description: HIGHLIGHT_HINT,
      group: "hero",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      group: "hero",
    }),
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "ctaLink",
      title: "Button Link",
      type: "link",
      group: "hero",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      group: "hero",
    }),
    defineField({
      name: "videoMp4",
      title: "Background Video (MP4)",
      type: "file",
      options: { accept: "video/mp4" },
      group: "hero",
      description:
        "Muted loop, about 10 seconds, under 2 MB. The Background Image above is used as the poster.",
    }),
    defineField({
      name: "videoWebm",
      title: "Background Video (WebM, optional)",
      type: "file",
      options: { accept: "video/webm" },
      group: "hero",
    }),
    defineField({
      name: "videoOnMobile",
      title: "Play video on phones?",
      type: "boolean",
      initialValue: false,
      group: "hero",
      description: "Off: phones show the poster image only, which saves data.",
    }),
    defineField({
      name: "videoCredit",
      title: "Video Credit (optional)",
      type: "string",
      group: "hero",
      description:
        "Only if the license asks for attribution, e.g. Footage by Name (CC BY).",
    }),
    defineField({
      name: "seo",
      title: "Search & Social (SEO)",
      type: "seo",
      group: "hero",
    }),

    // ---- Services Intro ----
    defineField({
      name: "introHeader",
      title: "Header",
      type: "sectionHeader",
      group: "intro",
    }),
    defineField({
      name: "introCards",
      title: "Cards",
      type: "array",
      group: "intro",
      validation: (Rule) => Rule.max(4),
      of: [
        {
          type: "object",
          name: "introCard",
          title: "Card",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "iconName",
              title: "FontAwesome Icon (e.g. fas fa-clock)",
              type: "string",
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
    defineField({
      name: "introCtaText",
      title: "Button Text",
      type: "string",
      group: "intro",
    }),
    defineField({
      name: "introCtaLink",
      title: "Button Link",
      type: "link",
      group: "intro",
    }),

    // ---- Process ----
    defineField({
      name: "processHeader",
      title: "Header",
      type: "sectionHeader",
      group: "process",
    }),
    defineField({
      name: "processSteps",
      title: "Steps",
      type: "array",
      group: "process",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Typical Duration (optional)",
              type: "string",
            }),
            defineField({ name: "description", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "duration" } },
        },
      ],
    }),

    // ---- Work ----
    defineField({
      name: "workHeader",
      title: "Header",
      type: "sectionHeader",
      group: "work",
    }),
    defineField({
      name: "workCtaText",
      title: "View All Button Text",
      type: "string",
      group: "work",
    }),

    // ---- Testimonials ----
    defineField({
      name: "testimonialsHeader",
      title: "Header",
      type: "sectionHeader",
      group: "testimonials",
      description:
        "Only add real testimonials from clients who agreed to be quoted. The section stays hidden until there is at least one.",
    }),
    defineField({
      name: "testimonialsImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      group: "testimonials",
      description: "Shown very faintly behind the testimonials.",
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      group: "testimonials",
      of: [
        {
          type: "object",
          name: "testimonialItem",
          title: "Testimonial",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text" }),
            defineField({
              name: "rating",
              title: "Star Rating (optional)",
              type: "number",
              validation: (Rule) => Rule.min(1).max(5),
            }),
            defineField({
              name: "authorName",
              title: "Author Name",
              type: "string",
            }),
            defineField({
              name: "authorRole",
              title: "Role & Company",
              type: "string",
            }),
            defineField({
              name: "avatar",
              title: "Photo (optional)",
              type: "imageWithAlt",
            }),
          ],
          preview: { select: { title: "authorName", subtitle: "authorRole" } },
        },
      ],
    }),

    // ---- News ----
    defineField({
      name: "newsHeader",
      title: "Header",
      type: "sectionHeader",
      group: "news",
    }),
    defineField({
      name: "newsCtaText",
      title: "View All Button Text",
      type: "string",
      group: "news",
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
