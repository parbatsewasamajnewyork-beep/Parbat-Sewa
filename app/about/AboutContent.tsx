'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import TeamMember from '@/components/TeamMember';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

// Current/Newest Committee
const team = [
  { name: 'Purna Shrestha', role: 'President', photo: '/committee/president-purna-shrestha.jpeg' },
  { name: 'Arjun Lamichhane', role: 'Senior Vice President', photo: '/committee/senior-vp-arjun-lamichhane.jpeg' },
  { name: 'Kishor Lamichhane', role: 'Vice President' },
  { name: 'Puspa Regmi', role: 'Women Vice President', photo: '/committee/women-vp-puspa-regmi.jpeg' },
  { name: 'Prakash Sharma', role: 'General Secretary', photo: '/committee/general-secretary-prakash-sharma.jpeg' },
  { name: 'Sabin Chhetri', role: 'Secretary' },
  { name: 'Rajan Gurung', role: 'Treasurer', photo: '/committee/treasurer-rajan-gurung.jpeg' },
  { name: 'Anu Gurung', role: 'Co-Treasurer', photo: '/committee/co-treasurer-anu-gurung.jpeg' },
  { name: 'Maya Giri', role: 'Women Co-ordinator', photo: '/committee/women-coordinator-maya-giri.jpeg' },
  { name: 'Ramu Lamichhane', role: 'Youth Co-ordinator', photo: '/committee/youth-coordinator-ramu-lamichhane.jpeg' },
];

const board = [
  { name: 'Daya Rijal', role: 'Board of Director', photo: '/committee/director-daya-rijal.jpeg' },
  { name: 'Kishor Shrestha', role: 'Board of Director' },
  { name: 'Sudin Kumar Pariyar', role: 'Board of Director', photo: '/committee/director-sudin-pariyar.jpeg' },
  { name: 'Youbak Shrestha', role: 'Board of Director', photo: '/committee/director-youbak-shrestha.jpeg' },
  { name: 'Yam Prasad Rijal', role: 'Board of Director', photo: '/committee/director-yam-prasad-rijal.jpeg' },
  { name: 'Prakash Chhetri', role: 'Board of Director', photo: '/committee/director-prakash-chhetri.jpeg' },
  { name: 'Bisnu KC', role: 'Board of Director', photo: '/committee/director-bisnu-kc.jpeg' },
  { name: 'Nishan Paudel Chhetri', role: 'Board of Director' },
  { name: 'Keshav Subedi', role: 'Board of Director', photo: '/committee/director-keshav-subedi.jpeg' },
];

// Previous 2024-2026 Committee (Photos matched where applicable)
const team2024 = [
  { name: 'Surya Paudel', role: 'President', photo: '/surya.jpg'  },
  { name: 'Nar Bahadur GC Raju', role: 'Senior Vice President' },
  { name: 'Pravin Giri', role: 'Vice President' },
  { name: 'Indu Thapa', role: 'Women Vice President' },
  { name: 'Prakash Sharma', role: 'General Secretary', photo: '/committee/general-secretary-prakash-sharma.jpeg' },
  { name: 'Bishal Regmi', role: 'Secretary' },
  { name: 'Binod Sharma', role: 'Treasurer' },
  { name: 'Kishor Regmi', role: 'Co-Treasurer' },
  { name: 'Ashok Lamichhane', role: 'Youth Co-ordinator' },
];

const board2024 = [
  { name: 'Manish Rijal', role: 'Board of Director' },
  { name: 'Krishna KC', role: 'Board of Director' },
  { name: 'Dhanendra Bahadur Regmi Suresh', role: 'Board of Director' },
  { name: 'Jivan Regmi', role: 'Board of Director' },
  { name: 'Dipak Subedi', role: 'Board of Director' },
  { name: 'Purna Shrestha', role: 'Board of Director', photo: '/committee/president-purna-shrestha.jpeg' },
  { name: 'Prakash Chhetri', role: 'Board of Director', photo: '/committee/director-prakash-chhetri.jpeg' },
  { name: 'Sunil Regmi', role: 'Board of Director' },
  { name: 'Arjun Lamichhane', role: 'Board of Director', photo: '/committee/senior-vp-arjun-lamichhane.jpeg' },
  { name: 'Santosh Lamichhane', role: 'Board of Director' },
  { name: 'Raju Pun', role: 'Board of Director' },
  { name: 'Sudip Paudel', role: 'Board of Director' },
  { name: 'Krishna Paudel', role: 'Board of Director' },
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

export default function AboutContent() {
  const { lang } = useLanguage();
  const t = translations[lang].about;

  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow={t.pageHero.eyebrow}
          title={t.pageHero.title}
          accent={t.pageHero.accent}
          lead={t.pageHero.lead}
        />

        {/* STORY */}
        <section className="grid grid-cols-[1.1fr_1fr] items-center gap-16 px-[6%] pb-[90px] pt-10 max-[980px]:grid-cols-1 max-[980px]:gap-10">
          <Reveal>
            <p className={`${eyebrow} mb-5`}>{t.story.eyebrow}</p>
            <h2 className={`${sectionTitle} mb-5 leading-[1.2]`}>{t.story.heading}</h2>
            <p className={muted}>{t.story.p1}</p>
            <p className={`${muted} mt-4`}>{t.story.p2}</p>
          </Reveal>
          <Reveal className="relative min-h-[340px] overflow-hidden rounded-xl bg-[radial-gradient(100%_100%_at_30%_20%,#5a3520_0%,#2a1810_55%,#150c08_100%)]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(255,200,110,0.06)_0_2px,transparent_2px_8px)]" />
            <Image
              src="/community.jpeg"
              alt={'Community photo'}
              fill
              className="object-cover"
            />
          </Reveal>
        </section>

        {/* STATS */}
        <section className="px-[6%] pb-[90px]">
          <Reveal className="grid grid-cols-4 gap-6 max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {t.stats.map((s) => (
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
            <p className={`${eyebrow} mb-[14px]`}>{t.pillars.eyebrow}</p>
            <h2 className={sectionTitle}>{t.pillars.heading}</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {t.pillars.items.map((p) => (
              <Reveal
                key={p.title}
                as="article"
                className={`min-h-[230px] rounded-[10px] border border-white/5 p-[30px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.42)] ${p.icon === 'music' || p.icon === 'drop' ? 'bg-card' : 'bg-card-2'}`}
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

        {/* LEADERSHIP (NEWEST) */}
        <section className="px-[6%] pb-24">
          <Reveal className="mb-10">
            <p className={`${eyebrow} mb-[14px]`}>{t.leadership.termEyebrow}</p>
            <h2 className={sectionTitle}>{t.leadership.execHeading}</h2>
            <p className={`${muted} mt-[14px] max-w-[600px] leading-[1.7]`}>
              {t.leadership.execDesc}
            </p>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1 mb-16">
            {team.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} />
            ))}
          </div>

          <Reveal className="mb-10">
            <h2 className={sectionTitle}>{t.leadership.boardHeading}</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {board.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} />
            ))}
          </div>
        </section>

        {/* LEADERSHIP 2024-2026 (OLDER) */}
        <section className="px-[6%] pb-24">
          <Reveal className="mb-10">
            <p className={`${eyebrow} mb-[14px]`}>Previous Term</p>
            <h2 className={sectionTitle}>Executive Committee 2024-2026</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1 mb-16">
            {team2024.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} />
            ))}
          </div>

          <Reveal className="mb-10">
            <h2 className={sectionTitle}>Board of Directors 2024-2026</h2>
          </Reveal>
          <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
            {board2024.map((m) => (
              <TeamMember key={m.name} name={m.name} role={m.role} photo={m.photo} />
            ))}
          </div>
        </section>

        <CTABand
          kicker={t.cta.kicker}
          text={t.cta.text}
          primaryLabel={t.cta.primary}
          primaryHref="/contact"
          secondaryLabel={t.cta.secondary}
          secondaryHref="/events"
        />
      </main>
      <Footer />
    </>
  );
}