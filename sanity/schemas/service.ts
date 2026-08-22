import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text" }),
      ],
    }),
    defineField({
      name: "imageSource",
      type: "string",
      description: "Where the image came from — legal requirement.",
    }),
    defineField({
      name: "imageLicence",
      type: "string",
      description: "Licence covering our use — legal requirement.",
    }),
    defineField({ name: "order", type: "number", validation: (r) => r.required() }),
  ],
});
