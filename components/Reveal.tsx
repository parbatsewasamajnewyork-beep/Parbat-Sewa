'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  /** Extra class names (e.g. a CSS-module class) merged onto the reveal element. */
  className?: string;
  /** Element/tag to render as. Default 'div'. */
  as?: ElementType;
  /** Extra stagger delay (seconds) applied once the element enters the viewport. */
  delay?: number;
  style?: CSSProperties;
}

/**
 * Fades its content up into view when scrolled into the viewport, once.
 * Relies on the global `.reveal` / `.reveal.is-visible` rules in globals.css.
 * Respects prefers-reduced-motion (handled in CSS).
 */
export default function Reveal({
  children,
  className = '',
  as: Tag = 'div',
  delay = 0,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: visible ? `${delay}s` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}
