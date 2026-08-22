import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortLabel", type: "string" }),
    defineField({ name: "descriptor", type: "string" }),
    defineField({
      name: "intro",
      type: "text",
      rows: 3,
      description: "25–35 words.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "specialist", type: "string" }),
    defineField({ name: "credential", type: "string" }),
    defineField({
      name: "bannerImage",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "imageSource",
      type: "string",
      description: "Where the banner image came from — legal requirement.",
    }),
    defineField({
      name: "imageLicence",
      type: "string",
      description: "Licence covering our use — legal requirement.",
    }),
    defineField({ name: "order", type: "number", validation: (r) => r.required() }),
  ],
});
