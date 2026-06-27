'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { useLanguage } from '@/contexts/LanguageContext';
import translations from '@/lib/translations';

// Replace this with your actual Google Form URL once created
const MEMBERSHIP_FORM_URL = 'https://forms.gle/MEBeWYXc9q6p45xW6';

const eyebrow = 'block text-xs font-semibold tracking-[3px] text-red-soft';
const sectionTitle = 'font-serif text-[30px] font-bold';
const muted = 'text-[15px] leading-[1.8] text-muted';
const inputClass = 'w-full rounded-[8px] border border-white/10 bg-card p-4 text-[15px] text-white placeholder:text-muted focus:border-red-soft focus:outline-none focus:ring-1 focus:ring-red-soft transition-colors';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [inquiryIndex, setInquiryIndex] = useState(0);

  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const inquiryType = t.form.options[inquiryIndex];
  const isMembership = inquiryIndex !== 0;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus('success');
        e.currentTarget.reset();
        setInquiryIndex(0);
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }

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

        <section className="mx-auto grid max-w-[1200px] grid-cols-[1fr_1fr] items-start gap-16 px-[6%] pb-[120px] pt-10 max-[980px]:grid-cols-1 max-[980px]:gap-12">

          {/* LEFT COLUMN: FORM */}
          <Reveal className="rounded-[10px] border border-white/5 bg-card-2 p-[40px] max-[560px]:p-[24px]">
            <p className={`${eyebrow} mb-4`}>{t.form.eyebrow}</p>
            <h2 className={`${sectionTitle} mb-6 leading-[1.2]`}>
              {isMembership ? t.form.headingMembership : t.form.headingInquiry}
            </h2>

            {/* Option selector — always visible */}
            <div className="mb-5">
              <label className="mb-3 block text-[14px] font-medium text-white">{t.form.helpLabel}</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {t.form.options.map((option, idx) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setInquiryIndex(idx)}
                    className={`rounded-[8px] border p-3 text-left text-[14px] transition-all ${
                      inquiryIndex === idx
                        ? 'border-red-soft bg-red-soft/10 text-white font-semibold'
                        : 'border-white/10 bg-card text-muted hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {isMembership ? (
              /* Membership → Google Form redirect */
              <div className="flex flex-col gap-5">
                <div className="rounded-[8px] border border-white/10 bg-card p-5 space-y-3">
                  <p className="text-[14px] leading-[1.7] text-muted-2">
                    {lang === 'en'
                      ? 'Your membership application is handled through Google Forms. You\'ll be able to upload your documents and payment screenshot there securely.'
                      : 'तपाईंको सदस्यता आवेदन Google Forms मार्फत प्रक्रिया गरिन्छ। त्यहाँ तपाईंका कागजातहरू र भुक्तानी स्क्रिनसट सुरक्षित रूपमा अपलोड गर्न सक्नुहुनेछ।'}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {(lang === 'en'
                      ? ['Full name, email & phone number', 'State ID photo', 'Citizenship photo (Nepal or US)', 'Payment screenshot']
                      : ['पूरा नाम, इमेल र फोन नम्बर', 'राज्य परिचयपत्र फोटो', 'नागरिकता फोटो (नेपाल वा अमेरिका)', 'भुक्तानी स्क्रिनसट']
                    ).map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[13px] text-muted-2">
                        <svg className="shrink-0 text-red-soft" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={MEMBERSHIP_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-[8px] bg-red-soft py-4 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                  {lang === 'en' ? 'Open Membership Application' : 'सदस्यता आवेदन खोल्नुस्'}
                </a>

                <p className="text-center text-[12px] text-muted">
                  {lang === 'en' ? 'Opens in a new tab · Google Forms' : 'नयाँ ट्याबमा खुल्नेछ · Google Forms'}
                </p>
              </div>
            ) : (
              /* General Inquiry → web3forms */
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input type="hidden" name="subject" value={`New Inquiry — Parbat NY`} />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div>
                  <label htmlFor="name" className="sr-only">{t.form.namePlaceholder}</label>
                  <input type="text" id="name" name="name" placeholder={t.form.namePlaceholder} required className={inputClass} />
                </div>

                <div>
                  <label htmlFor="email" className="sr-only">{t.form.emailPlaceholder}</label>
                  <input type="email" id="email" name="email" placeholder={t.form.emailPlaceholder} required className={inputClass} />
                </div>

                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder={t.form.messagePlaceholderInquiry}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 w-full rounded-[8px] bg-red-soft py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? t.form.sending : t.form.submitInquiry}
                </button>

                {submitStatus === 'success' && (
                  <p className="mt-2 text-center text-[14px] text-green-500">{t.form.successMsg}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-2 text-center text-[14px] text-red-500">{t.form.errorMsg}</p>
                )}
              </form>
            )}
          </Reveal>

          {/* RIGHT COLUMN */}
          <Reveal>
            <p className={`${eyebrow} mb-4`}>{t.membership.eyebrow}</p>
            <h2 className={`${sectionTitle} mb-5 leading-[1.2]`}>{t.membership.heading}</h2>
            <p className={`${muted} mb-8`}>{t.membership.lead}</p>

            <div className="mb-6 rounded-[10px] border border-white/5 bg-card p-[30px]">
              <h3 className="mb-4 font-serif text-[20px] font-bold text-white">{t.membership.feesHeading}</h3>
              <ul className="flex flex-col gap-3">
                {t.membership.fees.map((fee, i) => (
                  <li key={i} className={`flex items-center justify-between ${i < t.membership.fees.length - 1 ? 'border-b border-white/5 pb-2' : ''}`}>
                    <span className="text-[15px] text-muted-2">{fee.label}</span>
                    <span className="font-bold text-white">{fee.price}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-8 rounded-[10px] border border-white/5 bg-card p-[30px]">
              <h3 className="mb-4 font-serif text-[20px] font-bold text-white">{t.membership.reqHeading}</h3>
              <ul className="flex flex-col gap-3">
                {t.membership.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="mt-1 min-w-[16px] text-red-soft" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[14px] leading-[1.6] text-muted-2">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { name: 'Prakash Sharma', phone: '14437209575' },
                { name: 'Purna Shrestha', phone: '17039947933' },
                { name: 'Arjun Lamichhane', phone: '13479300528' },
                { name: 'Sabin Chhetri', phone: '13479692624' },
                { name: 'Rajan Gurung', phone: '19178325244' },
              ].map(({ name, phone }) => (
                <a
                  key={phone}
                  href={`https://wa.me/${phone}?text=Hello%20Parbat%20Sewa%20Samaj%20New%20York!%20I%20am%20interested%20in%20joining%20the%20organization%20and%20would%20like%20to%20submit%20my%20proposal.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#25D366] px-6 py-4 font-semibold text-white transition-transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  {lang === 'ne' ? `${name} — व्हाट्सएप` : `Contact ${name} via WhatsApp`}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
