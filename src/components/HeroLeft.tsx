import React, { useState, useEffect } from 'react';
import { ChevronRight, Mail } from 'lucide-react';
import { PERSONAL_INFO, METRICS } from '../data/portfolioData';

interface HeroLeftProps {
  onOpenHire: () => void;
}

const FULL_TEXT = 'Scale Your E-Commerce Store.';
const HIGHLIGHT_START_INDEX = 11; // "Scale Your " | "E-Commerce Store."

export const HeroLeft: React.FC<HeroLeftProps> = ({ onOpenHire }) => {
  const [typedLength, setTypedLength] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(true);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIdx = 0;
      const interval = setInterval(() => {
        currentIdx += 1;
        setTypedLength(currentIdx);
        if (currentIdx >= FULL_TEXT.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30);

      return () => clearInterval(interval);
    }, 300);

    return () => clearTimeout(startTimeout);
  }, []);

  const typedMainText = FULL_TEXT.slice(0, Math.min(typedLength, HIGHLIGHT_START_INDEX));
  const typedHighlightText =
    typedLength > HIGHLIGHT_START_INDEX ? FULL_TEXT.slice(HIGHLIGHT_START_INDEX, typedLength) : '';

  return (
    <div
      id="hero-left-section"
      className="flex-none lg:flex-[0_1_640px] w-full max-w-[660px] pt-2 sm:pt-4 lg:pt-6 flex flex-col items-start z-20 animate-fade-up font-inter"
      style={{
        animationDuration: '0.8s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Remote Availability Status Badge */}
      <div
        id="hero-availability-badge"
        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border-2 border-[#C9DAB0] shadow-xs text-[11px] sm:text-[12px] font-bold text-[#2F5D3A] mb-2 sm:mb-3 select-none"
      >
        <span className="w-2 h-2 rounded-full bg-[#2F5D3A] animate-pulse" />
        <span>Available for Remote Work</span>
      </div>

      {/* Client Magnet Typewriter Heading */}
      <h1
        id="hero-main-heading"
        className="font-urbanist font-extrabold text-[32px] sm:text-[42px] md:text-[48px] lg:text-[52px] xl:text-[56px] leading-[1.08] tracking-[-1.5px] min-h-[70px] sm:min-h-[90px] lg:min-h-[105px]"
      >
        <span className="text-[#2F5D3A]">{typedMainText}</span>
        <span className="text-[#3A6B4A]">{typedHighlightText}</span>
        {/* Blinking cursor */}
        <span
          id="typing-cursor"
          className={`inline-block w-[3.5px] h-[0.85em] ml-1 bg-[#2F5D3A] align-middle ${
            isTyping ? 'animate-blink' : 'opacity-80 animate-blink'
          }`}
          aria-hidden="true"
        />
      </h1>

      {/* Intro Description */}
      <p
        id="hero-intro-text"
        className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-[#2F5D3A]/90 font-medium leading-relaxed max-w-xl"
      >
        {PERSONAL_INFO.intro}
      </p>

      {/* Action CTA Button: Hire Me */}
      <div
        id="start-project-container"
        className="mt-4 sm:mt-5 flex items-center gap-4 animate-fade-up"
        style={{
          animationDelay: '0.2s',
          animationFillMode: 'forwards',
          animationDuration: '0.6s',
          animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div id="start-project-border-wrap" className="btn-border-wrap">
          <button
            id="start-project-btn"
            type="button"
            onClick={onOpenHire}
            className="btn-start cursor-pointer group px-7 py-3 select-none"
          >
            <span className="relative z-10 font-bold text-sm sm:text-base flex items-center gap-2 text-white">
              <Mail className="w-4 h-4 text-[#C9DAB0]" />
              <span>Hire Me</span>
            </span>
            <ChevronRight className="w-5 h-5 text-white relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Bottom Live Metrics */}
      <div
        id="hero-metrics-grid"
        className="mt-5 sm:mt-7 pt-3 border-t-2 border-[#C9DAB0]/70 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-lg animate-fade-up"
        style={{
          animationDelay: '0.4s',
          animationFillMode: 'forwards',
          animationDuration: '0.6s',
          animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {METRICS.map((m) => (
          <div key={m.id} id={`metric-${m.id}`} className="space-y-0.5">
            <div className="font-urbanist font-extrabold text-2xl sm:text-3xl text-[#2F5D3A] tracking-tight flex items-baseline gap-1">
              <span>{m.value}</span>
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#3A6B4A] leading-tight">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
