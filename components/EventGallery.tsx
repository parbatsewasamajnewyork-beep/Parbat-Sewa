'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface EventGalleryProps {
  images: string[];
}

export default function EventGallery({ images }: EventGalleryProps) {
  const validImages = images.filter((src): src is string => Boolean(src));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i - 1 + validImages.length) % validImages.length)),
    [validImages.length]
  );
  const next = useCallback(() =>
    setLightboxIndex((i) => (i === null ? 0 : (i + 1) % validImages.length)),
    [validImages.length]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, close, prev, next]);

  if (validImages.length === 0) {
    return (
      <div className="flex h-[420px] items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(255,110,125,0.16),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(197,111,255,0.16),transparent_40%)] rounded-[18px]">
        <span className="text-sm uppercase tracking-[2px] text-white/40">No event image available</span>
      </div>
    );
  }

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="rounded-[18px] border border-white/5 bg-[#15151a] p-6">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[3px] text-red-soft">Event gallery</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {validImages.map((src, index) => {
            const isActive = lightboxIndex === index;
            return (
              <button
                key={index}
                onClick={() => setLightboxIndex(index)}
                className={`group relative h-[130px] overflow-hidden rounded-[12px] bg-[#0d0d10] border transition-all duration-200 focus:outline-none ${
                  isActive ? 'border-white/40 ring-2 ring-white/20' : 'border-white/5 hover:border-white/20'
                }`}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
                {/* dark overlay on active thumb */}
                <div className={`absolute inset-0 transition-colors duration-200 ${
                  isActive ? 'bg-black/50' : 'bg-black/0 group-hover:bg-black/25'
                }`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {isOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Image — natural size, click on it doesn't close */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={validImages[lightboxIndex]}
            alt={`Gallery image ${lightboxIndex + 1}`}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Close — fixed so it's always reachable */}
          <button
            onClick={close}
            className="fixed top-4 right-4 z-60 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 border border-white/25 transition-colors text-white text-lg"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Counter */}
          <span className="fixed top-5 left-1/2 -translate-x-1/2 z-60 px-3 py-1 rounded-full bg-black/60 text-xs text-white/80 tracking-widest">
            {lightboxIndex + 1} / {validImages.length}
          </span>

          {/* Prev */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="fixed left-3 sm:left-6 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 border border-white/25 transition-colors text-white text-2xl"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Next */}
          {validImages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-60 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 hover:bg-black/90 border border-white/25 transition-colors text-white text-2xl"
              aria-label="Next image"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  );
}
