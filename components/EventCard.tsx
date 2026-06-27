import Image from 'next/image';
import Reveal from './Reveal';

interface EventCardProps {
  title: string;
  badge?: string;
  theme?: 'red' | 'amber' | 'green';
  meta: string[];
  desc: string;
  /** Optional Sanity image URL; falls back to a themed gradient when absent. */
  imageUrl?: string;
}

const themeGradient: Record<string, string> = {
  red: 'bg-[radial-gradient(100%_90%_at_50%_25%,#6a2630_0%,#34141a_55%,#160a0c_100%)]',
  amber: 'bg-[radial-gradient(100%_90%_at_50%_25%,#7a5418_0%,#3a2810_55%,#180f06_100%)]',
  green: 'bg-[radial-gradient(100%_90%_at_50%_25%,#2f5a32_0%,#1c3a20_55%,#0c1a0e_100%)]',
};

export default function EventCard({
  title,
  badge,
  theme = 'red',
  meta,
  desc,
  imageUrl,
}: EventCardProps) {
  return (
    <Reveal
      as="article"
      className="group cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-[#1b1b21] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(0,0,0,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* MEDIA: Sanity image if present, else themed gradient */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-[600ms] group-hover:scale-[1.07]"
            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, 33vw"
          />
        ) : (
          <div className={`absolute inset-0 transition-transform duration-[600ms] group-hover:scale-[1.07] ${themeGradient[theme]}`} />
        )}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(125deg,rgba(255,255,255,0.05)_0_2px,transparent_2px_8px)]" />
        {badge && (
          <span className="absolute left-[14px] top-3 rounded-[4px] bg-red/90 px-2.5 py-1 text-[9.5px] font-semibold tracking-[1px] text-white">
            {badge}
          </span>
        )}
        {!imageUrl && (
          <span className="absolute bottom-2 right-3 font-mono text-[9px] text-white/30">[ photo ]</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-[14px] font-serif text-[19px] font-bold leading-[1.25]">{title}</h3>
        {meta.map((m, i) => (
          <div key={m} className="mb-1.5 flex items-center gap-[7px] text-xs text-[#c3c4ca]">
            {i === 0 ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            )}
            <span>{m}</span>
          </div>
        ))}
        {/* MODIFIED: Added line-clamp-5 and line-break classes below */}
        <p className="mt-3 text-[13px] leading-[1.65] text-muted line-clamp-5 break-words">
          {desc}
        </p>
      </div>
    </Reveal>
  );
}
