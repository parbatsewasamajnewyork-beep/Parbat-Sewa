'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';

const eyebrow = 'block text-xs font-semibold tracking-[3px] text-red-soft';
const sectionTitle = 'font-serif text-[30px] font-bold';
const muted = 'text-[15px] leading-[1.8] text-muted';
const inputClass = 'w-full rounded-[8px] border border-white/10 bg-card p-4 text-[15px] text-white placeholder:text-muted focus:border-red-soft focus:outline-none focus:ring-1 focus:ring-red-soft transition-colors';

const requirements = [
  'Have family roots or heritage tied to the Parbat district of Nepal.',
  'Reside in the New York metropolitan area or surrounding regions.',
  'Commit to supporting our core pillars: Heritage, Humanitarian Aid, and Solidarity.',
  'Agree to the organizational code of conduct and annual membership dues.',
];
const formOptions = [
    'General Inquiry',
    'Lifetime Membership ($150)',
    'General Membership ($50)',
    'Membership Renewal ($20)'
  ];
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [inquiryType, setInquiryType] = useState('General Inquiry');

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
        setInquiryType('General Inquiry'); // Reset to default
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
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
          eyebrow="GET IN TOUCH"
          title="Reach out &"
          accent="connect with us"
          lead="Whether you have a question about our upcoming events, need community support, or want to officially join Parbat Sewa Samaj New York, we are here for you."
        />


            
<section className="mx-auto grid max-w-[1200px] grid-cols-[1fr_1fr] items-start gap-16 px-[6%] pb-[120px] pt-10 max-[980px]:grid-cols-1 max-[980px]:gap-12">
        
        {/* LEFT COLUMN: FORM */}
        <Reveal className="rounded-[10px] border border-white/5 bg-card-2 p-[40px] max-[560px]:p-[24px]">
          <p className={`${eyebrow} mb-4`}>SEND A MESSAGE</p>
          <h2 className={`${sectionTitle} mb-6 leading-[1.2]`}>
            {inquiryType === 'General Inquiry' ? 'General Inquiries' : 'Membership Application'}
          </h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Hidden inputs for Web3Forms */}
            <input type="hidden" name="subject" value={`New Submission: ${inquiryType} - Parbat NY`} />
            <input type="hidden" name="inquiry_type" value={inquiryType} /> 
            <input type="checkbox" name="botcheck" className="hidden" />

            {/* NEW VISUAL SELECTOR */}
            <div>
              <label className="mb-3 block text-[14px] font-medium text-white">How can we help you?</label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {formOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setInquiryType(option)}
                    className={`rounded-[8px] border p-3 text-left text-[14px] transition-all ${
                      inquiryType === option 
                        ? 'border-red-soft bg-red-soft/10 text-white font-semibold' 
                        : 'border-white/10 bg-card text-muted hover:border-white/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Conditional Payment Section */}
            {inquiryType !== 'General Inquiry' && (
              <div className="rounded-[8px] border border-red-soft/30 bg-red-soft/5 p-5 my-2">
                <h3 className="mb-2 font-serif text-[18px] font-semibold text-white">Payment Details</h3>
                <p className="text-[14px] text-muted mb-4">
                  Please scan the QR code below to pay for your <strong>{inquiryType}</strong>. Once paid, upload a screenshot of your receipt.
                </p>
                
                <div className="mx-auto mb-4 flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-[8px] bg-white">
                  <img 
                    src="/path-to-your-qr-code.png" 
                    alt="Payment QR Code" 
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <label htmlFor="screenshot" className="mb-2 block text-[14px] font-medium text-white">Attach Payment Screenshot *</label>
                  <input 
                    type="file" 
                    id="screenshot" 
                    name="payment_screenshot" 
                    accept="image/png, image/jpeg, image/webp" 
                    required 
                    className={`${inputClass} file:mr-4 file:rounded-[4px] file:border-0 file:bg-red-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-red-soft/90 cursor-pointer p-2`} 
                  />
                </div>
              </div>
            )}

<div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input type="text" id="name" name="name" placeholder="Your Full Name" required className={inputClass} />
              </div>
              
              <div>
                <label htmlFor="email" className="sr-only">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Your Email Address" required className={inputClass} />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  placeholder={inquiryType === 'General Inquiry' ? 'How can we help you?' : 'Any additional notes for your membership application?'} 
                  required={inquiryType === 'General Inquiry'} 
                  className={`${inputClass} resize-none`} 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="mt-2 w-full rounded-[8px] bg-red-soft py-4 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : (inquiryType === 'General Inquiry' ? 'Send Message' : 'Submit Application')}
              </button>

              {submitStatus === 'success' && (
                <p className="mt-2 text-center text-[14px] text-green-500">Submission sent successfully! We will review and get back to you soon.</p>
              )}
              {submitStatus === 'error' && (
                <p className="mt-2 text-center text-[14px] text-red-500">Something went wrong. Please try again later.</p>
              )}
          </form>
        </Reveal>

          {/* RIGHT COLUMN: JOIN US & WHATSAPP */}
          <Reveal>
            <p className={`${eyebrow} mb-4`}>MEMBERSHIP</p>
            <h2 className={`${sectionTitle} mb-5 leading-[1.2]`}>Join the Committee</h2>
            <p className={`${muted} mb-8`}>
              Ready to take an active role in preserving our heritage and serving the Parbat community in New York? Review our requirements, fee structure, and submit your proposal.
            </p>

            {/* Membership Fees Section */}
            <div className="mb-6 rounded-[10px] border border-white/5 bg-card p-[30px]">
              <h3 className="mb-4 font-serif text-[20px] font-bold text-white">Membership Fees</h3>
              <ul className="flex flex-col gap-3">
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[15px] text-muted-2">Lifetime Membership</span>
                  <span className="font-bold text-white">$150</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-[15px] text-muted-2">General Membership</span>
                  <span className="font-bold text-white">$50</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-[15px] text-muted-2">Renewal Fee</span>
                  <span className="font-bold text-white">$20</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 rounded-[10px] border border-white/5 bg-card p-[30px]">
              <h3 className="mb-4 font-serif text-[20px] font-bold text-white">Membership Requirements</h3>
              <ul className="flex flex-col gap-3">
                {requirements.map((req, index) => (
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
              <a 
                href="https://wa.me/14437209575?text=Hello%20Parbat%20Sewa%20Samaj%20New%20York!%20I%20am%20interested%20in%20joining%20the%20organization%20and%20would%20like%20to%20submit%20my%20proposal."              
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#25D366] px-6 py-4 font-semibold text-white transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Contact Prakash Sharma via WhatsApp
              </a>
              
              <a 
                href="https://wa.me/17039947933?text=Hello%20Parbat%20Sewa%20Samaj%20New%20York!%20I%20am%20interested%20in%20joining%20the%20organization%20and%20would%20like%20to%20submit%20my%20proposal."              
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-[8px] bg-[#25D366] px-6 py-4 font-semibold text-white transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Contact Purna Shrestha via WhatsApp
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}