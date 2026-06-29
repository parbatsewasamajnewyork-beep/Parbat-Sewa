import { defineField, defineType } from 'sanity';

export const lifeMember = defineType({
  name: 'lifeMember',
  title: 'Life Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'memberSince',
      title: 'Member Since (Year)',
      type: 'number',
      description: 'The year this person became a life member, e.g. 2022.',
    }),
    defineField({
      name: 'description',
      title: 'Short Bio (optional)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'memberSince', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? `Since ${subtitle}` : undefined, media };
    },
  },
});
