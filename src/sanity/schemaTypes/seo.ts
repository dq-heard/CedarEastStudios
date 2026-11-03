// One SEO block for every page. Attach it with: { name: "seo", title: "Search & Social (SEO)", type: "seo" }
// Anything left empty falls back to the page's own content, then to Site Settings.
import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "Search & Social (SEO)",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description:
        "Shown in search results and browser tabs. The agency name is added automatically. Aim for 60 characters or fewer.",
      validation: (Rule) =>
        Rule.max(60).warning(
          "Over 60 characters may be cut off in search results."
        ),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description:
        "Shown under the title in search results. Aim for 160 characters or fewer.",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Over 160 characters may be cut off in search results."
        ),
    }),
    defineField({
      name: "image",
      title: "Share Image",
      type: "image",
      options: { hotspot: true },
      description: "Shown when the page is shared. 1200 x 630 works best.",
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
