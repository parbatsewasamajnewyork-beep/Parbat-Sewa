import type { Metadata } from 'next';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import TeamMember from '@/components/TeamMember';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = { title: 'About — Parbat-NY' };

const stats = [
  { value: '2024', label: 'Founded in NYC' },
  { value: '23', label: 'Committee members' },
  { value: '115+', label: 'Blood units donated' },
  { value: '250+', label: 'At our Teej gathering' },
];

const pillars = [
  { icon: 'music', surface: 'bg-card', title: 'Heritage & Culture',
    body: 'Bhajan kirtan, Teej, Deusi Bhailo, and folk performances that keep Nepali tradition alive in New York.' },
  { icon: 'heart', surface: 'bg-card-2', title: 'Humanitarian Aid',
    body: 'Medical relief, family support, and repatriation assistance for community members in their hardest moments.' },
  { icon: 'drop', surface: 'bg-card', title: 'Blood Donation',
    body: 'Annual blood drives on Long Island that have collected over 115 units of life-saving blood since 2024.' },
  { icon: 'users', surface: 'bg-card-2', title: 'Community Solidarity',
    body: 'Representing Parbat across the NY metro and partnering with fellow Nepali organizations year-round.' },
];

// 2026–2028 executive committee
const team = [
  { name: 'Purna Shrestha', role: 'President' },
  { name: 'Arjun Lamichhane', role: 'Senior Vice President' },
  { name: 'Kishor Lamichhane', role: 'Vice President' },
  { name: 'Puspa Regmi', role: 'Women Vice President' },
  { name: 'Prakash Sharma', role: 'General Secretary' },
  { name: 'Sabin Chhetri', role: 'Secretary' },
  { name: 'Rajan Gurung', role: 'Treasurer' },
  { name: 'Anu Gurung', role: 'Co-Treasurer' },
  { name: 'Maya Giri', role: 'Women Co-ordinator' },
  { name: 'Ramu Lamichhane', role: 'Youth Co-ordinator' },
];

// 2026–2028 board of directors
const board = [
  { name: 'Daya Rijal', role: 'Board of Director' },
  { name: 'Kishor Shrestha', role: 'Board of Director' },
  { name: 'Sudin Kumar Pariyar', role: 'Board of Director' },
  { name: 'Youbak Shrestha', role: 'Board of Director' },
  { name: 'Yam Prasad Rijal', role: 'Board of Director' },
  { name: 'Prakash Chhetri', role: 'Board of Director' },
  { name: 'Bisnu KC', role: 'Board of Director' },
  { name: 'Nishan Paudel Chhetri', role: 'Board of Director' },
  { name: 'Keshav Subedi', role: 'Board of Director' },
];

function PillarIcon({ name }: { name: string }) {
  if (name === 'music')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
      </svg>
    );
  if (name === 'heart')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
      </svg>
    );
  if (name === 'drop')
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2s7 5 7 11a7 7 0 0 1-14 0c0-6 7-11 7-11z" />
      </svg>
    );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

const eyebrow = 'block text-xs font-semibold tracking-[3px] text-red-soft';
const sectionTitle = 'font-serif text-[30px] font-bold';
const muted = 'text-[15px] leading-[1.8] text-muted';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="WHO WE ARE  •  EST. 2024"
          title="Preserving heritage,"
          accent="strengthening community"
          lead="Parbat Sewa Samaj New York is a registered 501(c) nonprofit founded in April 2024, when 53 members gathered in Jackson Heights for our first convention. We unite families with roots in Nepal's Parbat district who now call the New York metropolitan area home."
        />

        {/* STORY */}
        <section className="grid grid-cols-[1.1fr_1fr] items-center gap-16 px-[6%] pb-[90px] pt-10 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <Reveal>
            <p className={`${eyebrow} mb-5`}>OUR STORY</p>
            <h2 className={`${sectionTitle} mb-5 leading-[1.2]`}>From one gathering to a movement</h2>
            <p className={muted}>
              What began as a single assembly of 53 people has grown into an active
              organization led by a 23-member executive committee. Within our first
              year we filed for nonprofit status, launched annual blood drives, and
              stood beside families in their hardest moments — both in New York and
              back home in Nepal.
            </p>
            <p className={`${muted} mt-4`}>
              From bhajan kirtan on the Nepal Day Parade stage to Teej gatherings of
              250+, we carry our culture forward while building a support system every
              Parbat family can lean on.
            </p>
          </Reveal>
          {/* IMAGE: replace with a community/group photo */}
          <Reveal className="relative min-h-[340px] overflow-hidden rounded-xl bg-[radial-gradient(100%_100%_at_30%_20%,#5a3520_0%,#2a1810_55%,#150c08_100%)]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(255,200,110,0.06)_0_2px,transparent_2px_8px)]" />
            <span className="absolute inset-0 flex items-center justify-center font-mono text-xs text-white/[0.34]">
              [ group / community photo ]
            </span>
          </Reveal>
        </section>

        {/* STATS */}
        <section className="px-[6%] pb-[90px]">
          <Reveal className="grid grid-cols-4 gap-6 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {stats.map((s) => (
              <div key={s.label} className="rounded-[10px] border border-white/5 bg-card p-[30px]">
                <div className="mb-1.5 font-serif text-[40px] font-extrabold text-red-soft">{s.value}</div>
                <div className="text-[13px] tracking-[0.5px] text-muted">{s.label}</div>
              </div>
            ))}
          </Reveal>
        </section>

        {/* WHAT WE DO */}
        <section className="px-[6%] pb-[90px]">
          <Reveal className="mb-10">
            <p className={`${eyebrow} mb-[14px]`}>WHAT WE DO</p>
            <h2 className={sectionTitle}>Four pillars of service</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {pillars.map((p) => (
              <Reveal
                key={p.title}
                as="article"
                className={`min-h-[230px] rounded-[10px] border border-white/5 p-[30px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.42)] ${p.surface}`}
              >
                <span className="mb-[38px] block text-red-soft">
                  <PillarIcon name={p.icon} />
                </span>
                <h3 className="mb-3 font-serif text-[18px] font-bold">{p.title}</h3>
                <p className="text-[13px] leading-[1.7] text-muted-2">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="px-[6%] pb-24">
          <Reveal className="mb-10">
            <p className={`${eyebrow} mb-[14px]`}>2026 – 2028 TERM</p>
            <h2 className={sectionTitle}>Executive Committee</h2>
            <p className={`${muted} mt-[14px] max-w-[600px] leading-[1.7]`}>
              Elected at the first annual convention and guided by patron Baburam
              Sharma with advisors Guman Singh Gurung and Basanta Chapagain.
            </p>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1 mb-16">
            {team.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} />
            ))}
          </div>

          <Reveal className="mb-10">
            <h2 className={sectionTitle}>Board of Directors</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {board.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} />
            ))}
          </div>
        </section>

        <CTABand
          kicker="Be part of the story"
          text="Whether you trace your roots to Parbat or simply share our values, there's a place for you in our community."
          primaryLabel="JOIN TODAY"
          secondaryLabel="SEE OUR EVENTS"
          secondaryHref="/events"
        />
      </main>
      <Footer />
    </>
  );
}