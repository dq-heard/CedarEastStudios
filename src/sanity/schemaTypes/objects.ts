// src/sanity/schemaTypes/objects.ts
// Shared building blocks. Register all four in your schema index.
import { defineField, defineType } from "sanity";

/* ---------- link: one dropdown for every CTA, nav item and button ---------- */

// Add a page or deep link here once and every link field gets it.
export const INTERNAL_LINKS = [
  { title: "Home", value: "/" },
  { title: "Services", value: "/services" },
  { title: "Services: Pricing", value: "/services#pricing" },
  { title: "Services: FAQ", value: "/services#faq" },
  { title: "About", value: "/about" },
  { title: "Work", value: "/work" },
  { title: "Blog", value: "/blog" },
  { title: "Contact", value: "/contact" },
  { title: "Contact: Book a Call", value: "/contact#book" },
];

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "kind",
      title: "Link To",
      type: "string",
      options: {
        list: [
          { title: "A page on this site", value: "internal" },
          { title: "An outside website", value: "external" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "internal",
      title: "Page",
      type: "string",
      options: { list: INTERNAL_LINKS },
      hidden: ({ parent }) => parent?.kind === "external",
    }),
    defineField({
      name: "external",
      title: "Web Address",
      type: "url",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
  ],
  preview: {
    select: { kind: "kind", internal: "internal", external: "external" },
    prepare: ({ kind, internal, external }) => ({
      title: kind === "external" ? external : internal,
    }),
  },
});

// GROQ: `ctaLink{ "href": coalesce(external, internal) }`
export const HREF = `"href": coalesce(external, internal)`;

/* ---------- highlightText: bracket syntax in one field ---------- */

export const HIGHLIGHT_HINT =
  "Put highlighted words in [square brackets], e.g. We [transform] ideas. A new line becomes a line break.";

/* ---------- imageWithAlt: image + alt text together ---------- */

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description:
        "Describe the image for screen readers. Leave empty only if purely decorative.",
    }),
  ],
});

/* ---------- sectionHeader: badge + title + description ---------- */

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge", type: "string" }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      description: HIGHLIGHT_HINT,
    }),
    defineField({
      name: "description",
      title: "Description (optional)",
      type: "text",
      rows: 2,
    }),
  ],
});
