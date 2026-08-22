import { defineField, defineType } from "sanity";

export const place = defineType({
  name: "place",
  title: "Place",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({ name: "region", type: "string", validation: (r) => r.required() }),
    defineField({ name: "continent", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "coordinates",
      type: "geopoint",
      description: "Used for maps and structured data.",
    }),
    defineField({
      name: "hook",
      type: "string",
      description: "One line, 12 words or fewer.",
      validation: (r) =>
        r.required().custom((v) =>
          typeof v === "string" && v.trim().split(/\s+/).length > 12
            ? "Keep the hook to 12 words or fewer."
            : true,
        ),
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 4,
      description: "40–60 words.",
      validation: (r) => r.required(),
    }),
    defineField({ name: "bestSeason", type: "string" }),
    defineField({
      name: "duration",
      type: "string",
      description: 'Format: "05 Nights / 06 Days".',
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", type: "string", title: "Alt text", validation: (r) => r.required() }),
      ],
    }),
    defineField({
      name: "imageSource",
      type: "string",
      title: "Image source",
      description: "Where the image came from — legal requirement.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "imageLicence",
      type: "string",
      title: "Image licence",
      description: "Licence covering our use — legal requirement.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "metaTitle",
      type: "string",
      validation: (r) => r.required().max(60),
    }),
    defineField({
      name: "metaDescription",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(155),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
  ],
});
