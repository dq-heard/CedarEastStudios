import { defineField, defineType } from "sanity";
import { HIGHLIGHT_HINT } from "./objects";

export const hero = defineType({
  name: "hero",
  title: "Home Hero",
  type: "document",
  fields: [
    defineField({ name: "tag", title: "Eyebrow Tag", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
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
    defineField({ name: "ctaText", title: "Button Text", type: "string" }),
    defineField({ name: "ctaLink", title: "Button Link", type: "link" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "seo", title: "Search & Social (SEO)", type: "seo" }),
  ],
});

// The four cards come from the first four Services.
export const servicesIntro = defineType({
  name: "servicesIntro",
  title: "Services Intro (Home)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({ name: "ctaText", title: "Button Text", type: "string" }),
    defineField({ name: "ctaLink", title: "Button Link", type: "link" }),
  ],
});

export const process = defineType({
  name: "process",
  title: "Process Section",
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

// Header only. Projects are caseStudy documents.
export const portfolio = defineType({
  name: "portfolio",
  title: "Work Section (Home)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "ctaText",
      title: "View All Button Text",
      type: "string",
    }),
  ],
});

export const testimonials = defineType({
  name: "testimonials",
  title: "Testimonials Section",
  type: "document",
  description:
    "Only add real testimonials from clients who agreed to be quoted. The section stays hidden until there is at least one.",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "backgroundImage",
      title: "Background Image (optional)",
      type: "image",
      options: { hotspot: true },
      description: "Shown very faintly behind the testimonials.",
    }),
    defineField({
      name: "items",
      title: "Testimonials",
      type: "array",
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
  ],
});

// Header for the Home page's blog preview. Posts are separate documents (see blog.ts).
export const news = defineType({
  name: "news",
  title: "News Section (Home)",
  type: "document",
  fields: [
    defineField({ name: "header", title: "Header", type: "sectionHeader" }),
    defineField({
      name: "ctaText",
      title: "View All Button Text",
      type: "string",
    }),
  ],
});
