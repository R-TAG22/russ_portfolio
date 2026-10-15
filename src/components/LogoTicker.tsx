import React from 'react';
import { ALL_TOOL_LOGOS } from '../data/toolsData';

// Duplicate array twice for seamless marquee loop
const ALL_LOGOS = [...ALL_TOOL_LOGOS, ...ALL_TOOL_LOGOS];

export const LogoTicker: React.FC = () => {
  return (
    <footer
      id="app-footer"
      className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 pt-2 pb-3 mt-auto z-20 animate-fade-up font-inter"
      style={{
        animationDelay: '0.4s',
        animationDuration: '0.8s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        animationFillMode: 'both',
      }}
    >
      {/* Unified White Block Marquee Container */}
      <div
        id="ticker-wrapper"
        className="w-full bg-white border-2 border-[#C9DAB0] rounded-2xl shadow-xs overflow-hidden ticker-mask select-none py-2 px-3"
      >
        <div
          id="ticker-track"
          className="animate-ticker flex items-center gap-4 sm:gap-6 w-max hover:[animation-play-state:paused]"
        >
          {ALL_LOGOS.map((item, idx) => (
            <div
              key={`tool-logo-${item.id}-${idx}`}
              id={`ticker-tool-logo-${item.id}-${idx}`}
              className="flex-none flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F2F2EE]/70 hover:bg-white border border-[#C9DAB0]/80 hover:border-[#2F5D3A] shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
              title={`${item.name} • ${item.category}`}
            >
              {/* Individual Logo/Icon Component */}
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright text directly below footer */}
      <div
        id="footer-copyright"
        className="mt-1.5 pt-1 text-center text-[11px] font-semibold text-[#2F5D3A]/70 tracking-wide select-none"
      >
        © 2026 Russell Taga-an • E-commerce Virtual Assistant
      </div>
    </footer>
  );
};

