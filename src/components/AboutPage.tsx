import React from 'react';
import {
  Sparkles,
  Award,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { AboutPortrait } from './AboutPortrait';

interface AboutPageProps {
  onOpenHire: () => void;
  onGoToWork: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenHire, onGoToWork }) => {
  return (
    <div
      id="about-page"
      className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-4 sm:py-6 flex-1 flex flex-col justify-center animate-fade-up font-inter text-[#1E3A5F]"
      style={{
        animationDuration: '0.5s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* 2-Column Balanced Viewport */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        
        {/* Left Column: Portrait Showcase with Random Shape Animation (5 Cols on Large Screen) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center lg:sticky lg:top-24">
          <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[490px] xl:h-[490px] max-w-full flex items-center justify-center">
            <AboutPortrait
              className="w-full h-full"
              enableRandomShapeInteraction={true}
            />
          </div>
        </div>

        {/* Right Column: Bio, Unified Background, Skills & Experience (7 Cols on Large Screen) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          
          {/* Header Title & Status */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-[#BCD5E6] shadow-xs text-xs font-bold text-[#1E3A5F] mb-1.5 backdrop-blur-xs select-none">
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shadow-[0_0_8px_#38BDF8] animate-pulse" />
              <span>Available for High-Growth DTC Brands & Multi-Channel Ops</span>
            </div>
            <h1 className="font-urbanist font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1E3A5F] tracking-tight leading-tight">
              Hi, I'm Russell Taga-an.
            </h1>
            <p className="text-xs sm:text-sm md:text-[14px] text-[#1E3A5F]/90 font-medium leading-relaxed mt-1">
              E-Commerce & TikTok Shop Operations Specialist architecting enterprise catalog systems, high-compliance product launches, and end-to-end backend fulfillment across Shopify, TikTok Shop, and Home Depot.
            </p>
          </div>

          {/* Unified Container: Background, Skills & Experience Joined Together (No Scroll, Full Height) */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-sm space-y-5">
            
            {/* 1. Executive Background Narrative */}
            <div className="space-y-2 text-xs sm:text-[13px] text-[#1E3A5F]/90 font-medium leading-relaxed">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F] pb-1 border-b border-[#BCD5E6]/60">
                <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span className="uppercase tracking-wider text-[11px] text-[#2D5D86]">Executive Background & Architecture</span>
              </div>
              <p>
                I engineer high-efficiency backend operations and catalog architectures for 7-figure e-commerce brands. From configuring massive <strong>25,000+ variant matrices</strong> with multi-attribute logic (finishes, materials, custom specifications) for luxury brands like <strong>Willow Bath and Vanity</strong>, to maintaining rigorous compliance and a <strong>4.8/5.0 seller health score on TikTok Shop</strong>, I eliminate the catalog errors, listing rejections, and inventory bottlenecks that stall scale.
              </p>
            </div>
            {/* 2. Verified Experience Timeline Cards - All visible with zero inner scroll */}
            <div className="pt-2 border-t border-[#BCD5E6]/60 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E3A5F]">
                <Award className="w-3.5 h-3.5 text-[#0EA5E9]" />
                <span className="uppercase tracking-wider text-[11px] text-[#2D5D86]">Career History & Verified Impact</span>
              </div>

              {EXPERIENCES.map((exp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#EFF6FB]/60 border border-[#BCD5E6] space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-bold text-xs sm:text-sm text-[#1E3A5F] flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9]" />
                      <span>{exp.title}</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1]">
                      {exp.period}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#2D5D86]">{exp.company}</div>
                  <ul className="space-y-1 pt-1 text-xs text-[#1E3A5F]/85">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0EA5E9] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onOpenHire}
              className="px-6 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Deploy Operations Engine</span>
              <ArrowRight className="w-4 h-4 text-[#7DD3FC]" />
            </button>
            <button
              type="button"
              onClick={onGoToWork}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#EFF6FB] border-2 border-[#BCD5E6] text-[#1E3A5F] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>View Managed Storefronts</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#2D5D86]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
