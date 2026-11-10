import { defineField, defineType } from "sanity";

const variant = (name: string, title: string, group: string) =>
  defineField({
    name,
    title,
    type: "object",
    group,
    fields: [
      defineField({ name: "title", title: "Headline", type: "string" }),
      defineField({
        name: "intro",
        title: "Confirmation",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "next",
        title: "What Happens Next",
        type: "text",
        rows: 3,
      }),
      defineField({
        name: "ready",
        title: "What To Have Ready",
        type: "text",
        rows: 3,
      }),
    ],
  });

export const thankYouPage = defineType({
  name: "thankYouPage",
  title: "Thank You Page",
  type: "document",
  groups: [
    { name: "booked", title: "After a booking", default: true },
    { name: "form", title: "After the form" },
    { name: "link", title: "Link" },
  ],
  fields: [
    variant("booked", "After a booking", "booked"),
    variant("form", "After the contact form", "form"),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      group: "link",
      description:
        "One link to read while they wait, such as your best case study. Leave empty to hide it.",
    }),
    defineField({ name: "link", title: "Link", type: "link", group: "link" }),
  ],
  preview: { prepare: () => ({ title: "Thank You Page" }) },
});
