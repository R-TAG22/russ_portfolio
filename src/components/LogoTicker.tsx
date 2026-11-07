import React, { useState, useEffect, useMemo } from 'react';
import { ALL_TOOL_LOGOS, DEFAULT_FOOTER_MARQUEE_ITEMS } from '../data/toolsData';
import { ConnectSocialBar } from './ConnectSocialBar';
import { contentService } from '../cms/services/ContentServiceFactory';
import { FooterConfig, FooterLogoMarqueeItem } from '../cms/types/schema';

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

  // Build active logos list based on footerConfig.logoMarquee
  const isMarqueeEnabled = footerConfig?.logoMarquee?.enabled !== false;

  const activeMarqueeItems: FooterLogoMarqueeItem[] = useMemo(() => {
    if (footerConfig?.logoMarquee?.items && footerConfig.logoMarquee.items.length > 0) {
      return footerConfig.logoMarquee.items.filter((item) => item.enabled !== false);
    }
    return DEFAULT_FOOTER_MARQUEE_ITEMS;
  }, [footerConfig]);

  // Double array for continuous seamless marquee loop
  const displayItems = useMemo(() => {
    if (activeMarqueeItems.length === 0) return [];
    return [...activeMarqueeItems, ...activeMarqueeItems];
  }, [activeMarqueeItems]);

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
      {isMarqueeEnabled && displayItems.length > 0 && (
        <div
          id="ticker-wrapper"
          className="w-full bg-white/95 border-2 border-[#BCD5E6] rounded-2xl shadow-xs overflow-hidden ticker-mask select-none py-2 px-3 backdrop-blur-xs mb-2"
        >
          <div
            id="ticker-track"
            className="animate-ticker flex items-center gap-4 sm:gap-6 w-max hover:[animation-play-state:paused]"
          >
            {displayItems.map((item, idx) => {
              // Match built-in logo SVG if item has standard ID and no custom logoUrl
              const builtInTool = ALL_TOOL_LOGOS.find(
                (t) => t.id === item.id || t.name.toLowerCase() === item.name.toLowerCase()
              );

              const content = (
                <div
                  className="flex-none flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#EFF6FB]/90 hover:bg-white border border-[#BCD5E6] hover:border-[#1E3A5F] shadow-2xs hover:shadow-sm transition-all duration-200 cursor-pointer group"
                  title={`${item.name} • ${item.category || item.type || 'Tech'}`}
                >
                  {/* Custom uploaded image logo */}
                  {item.logoUrl ? (
                    <div className="flex items-center gap-1.5 px-1 py-0.5">
                      <img
                        src={item.logoUrl}
                        alt={item.name}
                        className="h-6 max-w-[90px] object-contain drop-shadow-2xs transition-transform duration-200 group-hover:scale-105"
                      />
                      <span className="font-urbanist font-black text-[13px] text-[#1E3A5F] tracking-tight">
                        {item.name}
                      </span>
                    </div>
                  ) : builtInTool ? (
                    /* Built-in high fidelity vector SVG */
                    <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      {builtInTool.icon}
                    </div>
                  ) : (
                    /* Clean fallback badge */
                    <div className="flex items-center gap-1.5 px-1 py-0.5">
                      <div className="w-5 h-5 rounded-md bg-[#1E3A5F] text-[#38BDF8] font-bold text-xs flex items-center justify-center font-urbanist shadow-2xs">
                        {item.name.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-urbanist font-black text-[13px] text-[#1E3A5F] tracking-tight">
                        {item.name}
                      </span>
                    </div>
                  )}
                </div>
              );

              if (item.linkUrl) {
                return (
                  <a
                    key={`marquee-${item.id}-${idx}`}
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    {content}
                  </a>
                );
              }

              return <React.Fragment key={`marquee-${item.id}-${idx}`}>{content}</React.Fragment>;
            })}
          </div>
        </div>
      )}

      {/* CONNECT Socials 1-Second Flipping Bar (Square rounded corners, above copyright) */}
      <div className="mt-2">
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
