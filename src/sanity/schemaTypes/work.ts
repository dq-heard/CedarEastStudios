import { defineField, defineType } from "sanity";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Project (Case Study)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description:
        'Becomes /work/your-slug. Click "Generate" after writing the title.',
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          "Website Design",
          "Website Refresh",
          "Copy & Messaging",
          "Care Plan",
        ],
      },
    }),
    defineField({ name: "client", title: "Client Name", type: "string" }),
    defineField({
      name: "year",
      title: "Project Year",
      type: "number",
      description: "e.g. 2026",
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "date",
      description: "Used to sort newest first.",
    }),
    defineField({
      name: "duration",
      title: "Project Duration",
      type: "string",
      description: "e.g. 3 months",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "featured",
      title: "Show on Home Page?",
      type: "boolean",
      initialValue: false,
      description:
        "The home page shows up to five featured projects, newest first.",
    }),
    defineField({
      name: "layout",
      title: "Home Grid Size",
      type: "string",
      options: {
        list: [
          { title: "Standard (one third width)", value: "standard" },
          { title: "Wide (two thirds width)", value: "wide" },
          { title: "Half width", value: "half" },
        ],
        layout: "radio",
      },
      initialValue: "standard",
    }),
    defineField({
      name: "overview",
      title: "Project Overview",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "challenge",
      title: "The Challenge",
      type: "text",
      rows: 4,
      description: "What wasn't working before, and what it was costing them.",
    }),
    defineField({
      name: "approach",
      title: "The Approach",
      type: "array",
      of: [{ type: "string" }],
      description: "Three or four short points on what you did.",
    }),
    defineField({
      name: "result",
      title: "Result Callout",
      type: "text",
      rows: 3,
      description: "Only real, verifiable outcomes.",
    }),
    defineField({
      name: "performance",
      title: "Performance (before and after)",
      type: "object",
      description:
        "Real Lighthouse numbers only. Leave empty if you don't have both.",
      fields: [
        defineField({
          name: "beforeScore",
          title: "Mobile score before",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "afterScore",
          title: "Mobile score after",
          type: "number",
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: "note",
          title: "Note (optional)",
          type: "string",
          description: "e.g. Measured with Lighthouse, mobile, Oct 2026",
        }),
      ],
    }),
    defineField({
      name: "testimonial",
      title: "Client Testimonial (optional)",
      type: "object",
      description: "Only with the client's permission.",
      fields: [
        defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
        defineField({ name: "name", title: "Name", type: "string" }),
        defineField({ name: "role", title: "Role & Company", type: "string" }),
      ],
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      description: "Extra screenshots, like mobile views and details.",
    }),
    defineField({
      name: "liveUrl",
      title: "Live Site URL (optional)",
      type: "url",
    }),
    defineField({ name: "seo", title: "Search & Social (SEO)", type: "seo" }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "client", media: "coverImage" },
  },
});
