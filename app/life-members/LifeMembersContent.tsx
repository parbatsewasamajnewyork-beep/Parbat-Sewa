'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import CTABand from '@/components/CTABand';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';
import type { SanityLifeMember } from '@/sanity/lib/api';

interface Props {
  members: SanityLifeMember[];
}

function MemberCard({ member }: { member: SanityLifeMember }) {
  const initials = member.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <Reveal className="flex flex-col items-center rounded-[10px] border border-white/5 bg-card p-[30px] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.42)]">
      <div className="relative mb-5 h-[110px] w-[110px] overflow-hidden rounded-full ring-2 ring-red-soft/20">
        {member.photoUrl ? (
          <Image
            src={member.photoUrl}
            alt={member.name}
            fill
            className="object-cover object-top"
            sizes="110px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(100%_100%_at_30%_20%,#5a3520,#2a1810)]">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(255,200,110,0.07)_0_2px,transparent_2px_8px)]" />
            <span className="font-serif text-[32px] font-bold text-white/50">{initials}</span>
          </div>
        )}
      </div>

      <h3 className="mb-1.5 font-serif text-[18px] font-bold leading-snug">{member.name}</h3>

      {member.memberSince && (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[1px] text-red-soft">
          Since {member.memberSince}
        </p>
      )}

      {member.description && (
        <p className="text-[13px] leading-[1.7] text-muted-2">{member.description}</p>
      )}

      {/* lifetime badge */}
      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-red-soft/25 bg-red-soft/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[1.5px] text-red-soft">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Lifetime Member
      </span>
    </Reveal>
  );
}

export default function LifeMembersContent({ members }: Props) {
  const { lang } = useLanguage();
  const t = translations[lang].lifeMembers;
  const tCta = translations[lang].about.cta;

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

        <section className="px-[6%] pb-[100px] pt-10">
          <Reveal className="mb-10">
            <p className="block text-xs font-semibold tracking-[3px] text-red-soft">
              {t.heading} — {members.length}
            </p>
          </Reveal>

          {members.length === 0 ? (
            <Reveal>
              <p className="text-[15px] text-muted">{t.noMembers}</p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-4 gap-[22px] max-[980px]:grid-cols-2 max-[560px]:grid-cols-1">
              {members.map((m) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </div>
          )}
        </section>

        <CTABand
          kicker={tCta.kicker}
          text={tCta.text}
          primaryLabel={tCta.primary}
          primaryHref="/contact"
          secondaryLabel={tCta.secondary}
          secondaryHref="/events"
        />
      </main>
      <Footer />
    </>
  );
}
