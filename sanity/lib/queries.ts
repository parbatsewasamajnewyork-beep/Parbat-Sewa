import { groq } from 'next-sanity';

/** All non-featured, non-upcoming events, newest first — shown in the Events page grid. */
export const eventsQuery = groq`
  *[_type == "event" && featured != true && upcoming != true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    badge,
    theme,
    location,
    timeframe,
    description,
    "imageUrl": images[0].asset->url
  }
`;

/** Coming-soon teasers — events with upcoming == true. */
export const upcomingEventsQuery = groq`
  *[_type == "event" && upcoming == true] | order(date asc) {
    _id,
    title,
    timeframe,
    location,
    badge
  }
`;

/** The single featured event for the "NEXT UP" banner. */
export const featuredEventQuery = groq`
  *[_type == "event" && featured == true] | order(date desc)[0] {
    _id,
    title,
    "slug": slug.current,
    location,
    timeframe,
    description,
    date,
    "imageUrl": images[0].asset->url
  }
`;

/** Fetch a single event by slug. */
export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    badge,
    theme,
    location,
    timeframe,
    description,
    date,
    featured,
    "images": images[].asset->url
  }
`;

/** All event slugs — used for generateStaticParams. */
export const allSlugsQuery = groq`
  *[_type == "event" && defined(slug.current)] {
    "slug": slug.current
  }
`;

/** All life members ordered by display order, then name. */
export const lifeMembersQuery = groq`
  *[_type == "lifeMember"] | order(order asc, name asc) {
    _id,
    name,
    "photoUrl": photo.asset->url,
    memberSince,
    description
  }
`;
