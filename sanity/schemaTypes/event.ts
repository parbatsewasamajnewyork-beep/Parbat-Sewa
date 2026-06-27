import { defineField, defineType } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge label',
      type: 'string',
      description: 'Short tag shown on the card, e.g. HEALTH, CULTURE, HERITAGE, AID, SPORTS.',
    }),
    defineField({
      name: 'theme',
      title: 'Card colour theme',
      type: 'string',
      options: {
        list: [
          { title: 'Red', value: 'red' },
          { title: 'Amber', value: 'amber' },
          { title: 'Green', value: 'green' },
        ],
        layout: 'radio',
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g. "Sunken Meadow Park" or "Manhattan".',
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe / detail line',
      type: 'string',
      description: 'Second meta line, e.g. "Aug 2025 · 250+ guests" or "Ongoing".',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'Used for ordering and for the featured banner.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature on Events page banner',
      type: 'boolean',
      description: 'When on, this event appears in the large "NEXT UP" banner instead of the grid.',
      initialValue: false,
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: { layout: 'grid' },
      description: 'Upload images for this event. Use the file picker to select multiple at once.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'badge', media: 'images.0' },
  },
});
