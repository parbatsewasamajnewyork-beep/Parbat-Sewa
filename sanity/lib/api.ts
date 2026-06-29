import { client } from './client';
import { sanityEnabled } from '../env';
import { eventsQuery, featuredEventQuery, eventBySlugQuery, allSlugsQuery, upcomingEventsQuery, lifeMembersQuery } from './queries';

export interface SanityUpcomingEvent {
  _id: string;
  title: string;
  timeframe?: string;
  location?: string;
  badge?: string;
}

export interface SanityEvent {
  _id: string;
  title: string;
  slug?: string;
  badge?: string;
  theme?: 'red' | 'amber' | 'green';
  location?: string;
  timeframe?: string;
  description?: string;
  date?: string;
  imageUrl?: string;
  images?: string[];
  featured?: boolean;
}

export interface SanityFeaturedEvent {
  _id: string;
  title: string;
  slug?: string;
  location?: string;
  timeframe?: string;
  description?: string;
  date?: string;
  imageUrl?: string;
}

/** Returns events from Sanity, or null if Sanity isn't configured / errored
 *  (the page then falls back to local sample data). */
export async function getEvents(): Promise<SanityEvent[] | null> {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(eventsQuery, {}, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getEvents failed:', err);
    return null;
  }
}

export async function getFeaturedEvent(): Promise<SanityFeaturedEvent | null> {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(featuredEventQuery, {}, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getFeaturedEvent failed:', err);
    return null;
  }
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(eventBySlugQuery, { slug }, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getEventBySlug failed:', err);
    return null;
  }
}

export async function getUpcomingEvents(): Promise<SanityUpcomingEvent[] | null> {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(upcomingEventsQuery, {}, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getUpcomingEvents failed:', err);
    return null;
  }
}

/** Returns all event slugs for use with generateStaticParams. */
export async function getEventSlugs(): Promise<{ slug: string }[]> {
  if (!sanityEnabled) return [];
  try {
    return await client.fetch(allSlugsQuery, {}, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getEventSlugs failed:', err);
    return [];
  }
}

export interface SanityLifeMember {
  _id: string;
  name: string;
  photoUrl?: string;
  memberSince?: number;
  description?: string;
}

export async function getLifeMembers(): Promise<SanityLifeMember[] | null> {
  if (!sanityEnabled) return null;
  try {
    return await client.fetch(lifeMembersQuery, {}, { next: { revalidate: 86400 } });
  } catch (err) {
    console.error('Sanity getLifeMembers failed:', err);
    return null;
  }
}
