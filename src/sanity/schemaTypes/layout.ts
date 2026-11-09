import { defineField, defineType } from "sanity";

export const siteLayout = defineType({
  name: "siteLayout",
  title: "Site Layout",
  type: "document",
  description:
    "Nav, prefooter and footer wording. Names, e-mail, socials and the booking link come from Site Settings.",
  groups: [
    { name: "nav", title: "Navigation", default: true },
    { name: "prefooter", title: "Prefooter" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // ---- Navigation ----
    defineField({
      name: "navItems",
      title: "Nav Items",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          name: "navItem",
          title: "Nav Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "target",
              title: "Link",
              type: "link",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: { select: { title: "label", subtitle: "target.internal" } },
        },
      ],
    }),
    defineField({
      name: "navCtaLabel",
      title: "Navbar Button Text",
      type: "string",
      group: "nav",
      initialValue: "Book a Free Call",
    }),
    defineField({
      name: "navCtaTarget",
      title: "Navbar Button Link",
      type: "link",
      group: "nav",
    }),

    // ---- Prefooter ----
    defineField({
      name: "prefooterHeader",
      title: "Header",
      type: "sectionHeader",
      group: "prefooter",
    }),
    defineField({
      name: "primaryLabel",
      title: "Primary Button Text",
      type: "string",
      group: "prefooter",
    }),
    defineField({
      name: "primaryLink",
      title: "Primary Button Link",
      type: "link",
      group: "prefooter",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary Button Text",
      type: "string",
      group: "prefooter",
    }),
    defineField({
      name: "secondaryLink",
      title: "Secondary Button Link",
      type: "link",
      group: "prefooter",
    }),

    // ---- Footer ----
    defineField({
      name: "footerDescription",
      title: "Description",
      type: "text",
      group: "footer",
    }),
    defineField({
      name: "bookingButtonText",
      title: "Booking Button Text",
      type: "string",
      group: "footer",
      initialValue: "Book a Free Call",
      description: "The link comes from Site Settings.",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      group: "footer",
      description:
        "Shown after the year and Agency Name, e.g. All rights reserved.",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Layout" }) },
});
