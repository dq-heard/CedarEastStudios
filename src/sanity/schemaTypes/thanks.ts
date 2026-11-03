// /thank-you: where people land after a booking or a form. Not indexed, not in the menu.
import { defineField, defineType } from "sanity";

const variant = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    options: { collapsible: true, collapsed: false },
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

export const thankYou = defineType({
  name: "thankYou",
  title: "Thank You Page",
  type: "document",
  fields: [
    variant("booked", "After a booking"),
    variant("form", "After the contact form"),
    defineField({
      name: "linkText",
      title: "Link Text",
      type: "string",
      description:
        "One link to read while they wait, such as your best case study. Leave empty to hide it.",
    }),
    defineField({ name: "link", title: "Link", type: "link" }),
  ],
  preview: { prepare: () => ({ title: "Thank You Page" }) },
});
