import React, { useState, useEffect } from 'react';
import { ALL_TOOL_LOGOS } from '../data/toolsData';
import { ConnectSocialBar } from './ConnectSocialBar';
import { contentService } from '../cms/services/ContentServiceFactory';
import { FooterConfig } from '../cms/types/schema';

// Duplicate array twice for seamless marquee loop
const ALL_LOGOS = [...ALL_TOOL_LOGOS, ...ALL_TOOL_LOGOS];

export const LogoTicker: React.FC = () => {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);

  useEffect(() => {
    const loadFooter = async () => {
      try {
        const globals = await contentService.getGlobals();
        if (globals?.footer) {
          setFooterConfig(globals.footer);
        }
      } catch (err) {
        // Fallback to default
      }
    };

    loadFooter();

    const handleUpdate = () => {
      loadFooter();
    };

    window.addEventListener('content_service_globals_updated', handleUpdate);
    return () => {
      window.removeEventListener('content_service_globals_updated', handleUpdate);
    };
  }, []);

  const copyright =
    footerConfig?.copyrightText ||
    '© 2026 Russell Taga-an • E-commerce Operations Manager & Catalog Systems Specialist';

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
      {/* Unified Steel Blue Tint Marquee Container */}
      <div
        id="ticker-wrapper"
        className="w-full bg-white/95 border-2 border-[#BCD5E6] rounded-2xl shadow-xs overflow-hidden ticker-mask select-none py-2 px-3 backdrop-blur-xs"
      >
        <div
          id="ticker-track"
          className="animate-ticker flex items-center gap-4 sm:gap-6 w-max hover:[animation-play-state:paused]"
        >
          {ALL_LOGOS.map((item, idx) => (
            <div
              key={`tool-logo-${item.id}-${idx}`}
              id={`ticker-tool-logo-${item.id}-${idx}`}
              className="flex-none flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EFF6FB]/90 hover:bg-white border border-[#BCD5E6] hover:border-[#1E3A5F] shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
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

      {/* CONNECT Socials 1-Second Flipping Bar (Square rounded corners, above copyright) */}
      <div className="mt-3">
        <ConnectSocialBar config={footerConfig?.connectSocials} />
      </div>

      {/* Copyright text directly below footer */}
      <div
        id="footer-copyright"
        className="mt-1 text-center text-[11px] font-semibold text-[#1E3A5F]/70 tracking-wide select-none"
      >
        {copyright}
      </div>
    </footer>
  );
};

