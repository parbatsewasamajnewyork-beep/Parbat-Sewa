import type { Metadata } from 'next';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import EventCard from '@/components/EventCard';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import { getEvents, getFeaturedEvent } from '@/sanity/lib/api';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Events & Initiatives — Parbat-NY' };

// Sample events used until Sanity is connected (or if a fetch fails).
const fallbackEvents = [
  { title: 'Annual Blood Donation Drive', slug: '/events', badge: 'HEALTH', theme: 'red' as const,
    meta: ['Broadway Commons, Long Island', '115+ units · 2024–25'],
    desc: 'Our flagship health initiative — chief guests, dozens of donors, and life-saving units collected each year.' },
  { title: 'Haritalika Teej & Summer BBQ', slug: '/events', badge: 'CULTURE', theme: 'amber' as const,
    meta: ['Sunken Meadow Park', 'Aug 2025 · 250+ guests'],
    desc: "A vibrant celebration of women's traditions with dar khane, music, and food drawing our largest crowd yet." },
  { title: 'Nepal Day Parade', slug: '/events', badge: 'HERITAGE', theme: 'red' as const,
    meta: ['Manhattan', '2024 · 2025 · 2026'],
    desc: 'Representing Parbat with a bhajan kirtan team, rally, and folk stage performance year after year.' },
  { title: 'Deusi Bhailo — Tihar Night', slug: '/events', badge: 'CULTURE', theme: 'amber' as const,
    meta: ['New York', 'Oct 2024'],
    desc: 'A Deepawali evening of cultural performances that brought together leaders from across the community.' },
  { title: 'Humanitarian Relief Fund', slug: '/events', badge: 'AID', theme: 'red' as const,
    meta: ['NY & Nepal', 'Ongoing'],
    desc: 'From the Laxman Malla family fund to young Sangam Chhetri, we mobilize support when families need it most.' },
  { title: 'Parbat Volleyball — 1st Place', slug: '/events', badge: 'SPORTS', theme: 'green' as const,
    meta: ['Baglung Volleyball Club Cup', 'May 2026'],
    desc: 'Fielding Parbat A & B teams in the inaugural cup, with Parbat A taking home the championship.' },
];



// Default banner content when no featured event is set in Sanity.
const fallbackFeatured = {
  title: '2nd Annual Convention & General Assembly',
  description: 'Our membership gathers to elect new leadership and chart the road ahead.',
  dateLabel: 'Sun, June 14, 2026 · 12 PM',
  location: 'Himalayan Meet & Spices, Long Island',
  slug : "",
  imageUrl: undefined as string | undefined,
};

function formatDate(iso?: string) {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default async function EventsPage() {
  // Fetch from Sanity (returns null when not configured -> use fallbacks).
  const [sanityEvents, sanityFeatured] = await Promise.all([
    getEvents(),
    getFeaturedEvent(),
  ]);

  const events =
    sanityEvents && sanityEvents.length > 0
      ? sanityEvents.map((e) => ({
          key: e._id,
          title: e.title,
          slug: e.slug ?? '/events',
          badge: e.badge,
          theme: (e.theme ?? 'red') as 'red' | 'amber' | 'green',
          
          meta: [e.location, e.timeframe].filter(Boolean) as string[],
          desc: e.description ?? '',
          imageUrl: e.imageUrl,
        }))
      : fallbackEvents.map((e, i) => ({ key: String(i), imageUrl: undefined, ...e }));

const featuredImageUrl = sanityFeatured?.imageUrl;

const featured = sanityFeatured
  ? {
      title: sanityFeatured.title,
      slug: sanityFeatured.slug,
      description: sanityFeatured.description ?? '',
      dateLabel: formatDate(sanityFeatured.date),
      location: sanityFeatured.location,
      imageUrl: featuredImageUrl,
    }
  : fallbackFeatured;


  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="IMPACT & ENGAGEMENT"
          title="Events &"
          accent="Initiatives"
          lead="Cultural celebrations, blood drives, humanitarian campaigns, and sporting milestones — a year of showing up for our community at home and abroad."
        />

        {/* FEATURED / UPCOMING */}
<Link href={`/events/${featured.slug}`}>


        <section className="px-[6%] pb-[70px] pt-5">
          <Reveal className="relative flex min-h-[300px] items-end overflow-hidden rounded-[14px]">
            {featured.imageUrl ? (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featured.imageUrl})` }}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(100%_120%_at_75%_20%,#7a3a44_0%,#3a1820_50%,#16080c_100%)]" />
            )}
            <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(255,160,170,0.06)_0_2px,transparent_2px_8px)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,8,0.92)_0%,rgba(8,6,8,0.5)_55%,transparent_100%)]" />
            {!featured.imageUrl && (
              <span className="absolute right-[18px] top-4 font-mono text-[10px] text-white/[0.32]">
                {featured.imageUrl ? (
                  <Image src={featured.imageUrl} alt="Featured" fill className="object-cover" />
                ) : (
                  "No image"
                )}
              </span>
            )}
            <div className="relative z-[2] max-w-[560px] p-11">
              <span className="mb-[18px] inline-block rounded-[4px] bg-red px-[13px] py-1.5 text-[10px] font-semibold tracking-[1.5px] text-white">
                NEXT UP
              </span>
              <h2 className="mb-[14px] font-serif text-[32px] font-bold leading-[1.15] max-[560px]:text-[26px]">
                {featured.title}
              </h2>
              {featured.description && (
                <p className="mb-[22px] text-[15px] leading-[1.7] text-[#d2d3d9]">
                  {featured.description}
                </p>
              )}
              <div className="flex flex-wrap gap-6 text-[13px] text-[#e7e8ee]">
                {featured.dateLabel && (
                  <span className="inline-flex items-center gap-[7px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M3 10h18M8 2v4M16 2v4" />
                    </svg>
                    {featured.dateLabel}
                  </span>
                )}
                {featured.location && (
                  <span className="inline-flex items-center gap-[7px]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {featured.location}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        </section>
        </Link>

        {/* HIGHLIGHTS GRID */}
        <section className="px-[6%] pb-10">
          <Reveal className="mb-9">
            <p className="mb-[14px] block text-xs font-semibold tracking-[3px] text-red-soft">HIGHLIGHTS</p>
            <h2 className="font-serif text-[30px] font-bold">Our major work this year</h2>
          </Reveal>
          <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
            {events.map((e) => (
              <Link key={e.key} href={`/events/${e.slug}`}>
                <EventCard
                  title={e.title}
                  badge={e.badge}
                  theme={e.theme}
                  meta={e.meta}
                  desc={e.desc}
                  imageUrl={e.imageUrl}
                />
              </Link>
            ))}
          </div>
        </section>


        <CTABand
          kicker="Want to get involved?"
          text="Volunteer at our next blood drive, perform with the bhajan team, or support a relief campaign. Every hand helps."
          primaryLabel="Volunteer"
          primaryHref='/contact'
          secondaryLabel="ABOUT US"
          secondaryHref="/about"
        />
      </main>
      <Footer />
    </>
  );
}
