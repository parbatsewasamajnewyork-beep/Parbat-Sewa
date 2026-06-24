import Link from 'next/link';
import Image from 'next/image';
export default function Hero() {
  return (
    <section className="relative flex min-h-[560px] items-end overflow-hidden px-[6%] pb-16">
      {/* BACKGROUND: swap the gradient below for bg-[url('/img/hero.jpg')] (put files in public/img) */}
      <div className="absolute inset-0 animate-kenburns bg-cover bg-center bg-[radial-gradient(120%_90%_at_78%_38%,#5a3520_0%,#2a1810_45%,#150c08_100%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(115deg,rgba(255,170,90,0.05)_0_3px,transparent_3px_9px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,13,15,0.92)_0%,rgba(13,13,15,0.62)_38%,rgba(13,13,15,0.25)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#0d0d0f_2%,transparent_30%)]" />
      <span className="absolute right-[22px] top-[18px] font-mono text-[10px] tracking-[0.5px] text-white/30">
        <Image alt="hemant the founder" height={200} width={200} src={"heman.jpg"}/>
      </span>

      <div className="relative z-[2] max-w-[620px]">
        <p className="mb-5 block animate-float-up text-xs font-semibold tracking-[4px] text-red-soft opacity-0 [animation-delay:0.15s]">
          EST. 2024 &nbsp;•&nbsp; NEW YORK CITY
        </p>
        <h1 className="mb-6 animate-float-up font-serif text-[62px] font-extrabold leading-[1.04] tracking-[-1px] opacity-0 [animation-delay:0.28s] max-[640px]:text-[42px]">
          Uniting the Parbat Diaspora
          <br />
          <span className="text-red-soft">in New York</span>
        </h1>
        <p className="mb-9 max-w-[430px] animate-float-up text-base leading-[1.7] text-[#c3c4ca] opacity-0 [animation-delay:0.41s]">
          A community dedicated to preserving our rich heritage while fostering
          professional growth and collective success in the heart of the world.
        </p>
        <div className="flex flex-wrap gap-4 animate-float-up opacity-0 [animation-delay:0.54s]">
          <Link
            href="#join"
            className="inline-flex items-center gap-2.5 rounded-md bg-red px-[30px] py-[15px] text-[13px] font-semibold tracking-[1px] text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-red-dark"
          >
            GET INVOLVED
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2.5 rounded-md border border-white/[0.18] bg-white/[0.07] px-[26px] py-[15px] text-[13px] font-semibold tracking-[1px] text-white no-underline transition-all hover:border-white/40 hover:bg-white/[0.14]"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M3 10h18M8 2v4M16 2v4" />
            </svg>
            VIEW EVENTS
          </Link>
        </div>
      </div>
    </section>
  );
}
