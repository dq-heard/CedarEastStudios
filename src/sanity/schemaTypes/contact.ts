// Page order: hero, calendar, form (+ sidebar). The tabs and field order below follow it.
// Email, response time, socials and the calendar link come from Site Settings.
// Package options are built from the Pricing document.
import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  groups: [
    { name: "calendar", title: "1. Calendar", default: true },
    { name: "form", title: "2. Form" },
    { name: "sidebar", title: "3. Sidebar" },
  ],
  fields: [
    // ---- 1. Calendar (the top section) ----
    defineField({
      name: "bookingBadge",
      title: "Calendar Eyebrow",
      type: "string",
      group: "calendar",
    }),
    defineField({
      name: "bookingTitle",
      title: "Calendar Heading",
      type: "string",
      group: "calendar",
      initialValue: "Book a call",
      description:
        "The calendar itself comes from the Booking Link in Site Settings.",
    }),
    defineField({
      name: "bookingDescription",
      title: "Calendar Description",
      type: "text",
      rows: 2,
      group: "calendar",
      description:
        "e.g. Prefer to talk first? Pick a time for a free intro call.",
    }),

    // ---- 2. Form ----
    defineField({
      name: "header",
      title: "Form Section Header",
      type: "sectionHeader",
      group: "form",
    }),
    defineField({
      name: "formTitle",
      title: "Form Card Heading",
      type: "string",
      group: "form",
      initialValue: "Send a message",
    }),
    defineField({
      name: "packageOptions",
      title: "Extra Package Options",
      type: "array",
      group: "form",
      of: [{ type: "string" }],
      description:
        'Added after the tiers and retainer pulled from Pricing, e.g. "Not sure yet". Do not retype the tiers.',
    }),

    // ---- 3. Sidebar (beside the form) ----
    defineField({
      name: "nextStepsTitle",
      title: "What Happens Next: Heading",
      type: "string",
      group: "sidebar",
      initialValue: "What happens next",
    }),
    defineField({
      name: "nextSteps",
      title: "What Happens Next: Steps",
      type: "array",
      group: "sidebar",
      description:
        "Two to four short steps shown beside the form, e.g. I reply, we talk, you get a plan.",
      of: [
        {
          type: "object",
          name: "nextStep",
          title: "Step",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Short Description",
              type: "text",
              rows: 2,
            }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        },
      ],
    }),
  ],
});
