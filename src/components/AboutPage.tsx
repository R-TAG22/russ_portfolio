import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Cpu,
  Zap,
  Wifi,
  Clock,
  Globe,
  MapPin,
  Briefcase,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, CORE_SKILLS } from '../data/portfolioData';
import { AboutPortrait } from './AboutPortrait';

interface AboutPageProps {
  onOpenHire: () => void;
  onGoToWork: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenHire, onGoToWork }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'setup'>('overview');

  return (
    <div
      id="about-page"
      className="w-full max-w-[1700px] mx-auto px-4 sm:px-8 lg:px-12 py-2 sm:py-4 flex-1 flex flex-col justify-center animate-fade-up font-inter text-[#1E3A5F]"
      style={{
        animationDuration: '0.5s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* 2-Column Balanced Single-Screen Hero Viewport */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        
        {/* Left Column: Portrait Showcase with Translucent Blue Glow (5 Cols on Large Screen) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[460px] lg:h-[460px] xl:w-[500px] xl:h-[500px] max-w-full flex items-center justify-center">
            <AboutPortrait
              className="w-full h-full"
              showUploadControl={true}
            />
          </div>
          <div className="mt-3 px-4 py-1.5 rounded-full bg-white/90 border border-[#BCD5E6] shadow-xs flex items-center gap-2 text-xs font-bold text-[#1E3A5F] backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shadow-[0_0_8px_#38BDF8]" />
            <span>Russell Taga-an • E-commerce Specialist</span>
          </div>
        </div>

        {/* Right Column: Bio, Navigation Tabs & Interactive Tabbed Panels (7 Cols on Large Screen) */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4">
          
          {/* Header Title & Status */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#BCD5E6] shadow-xs text-xs font-bold text-[#1E3A5F] mb-2 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9] shadow-[0_0_8px_#38BDF8] animate-pulse" />
              <span>Available for Remote Roles</span>
            </div>
            <h1 className="font-urbanist font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1E3A5F] tracking-tight leading-tight">
              Hi, I'm Russell Taga-an.
            </h1>
            <p className="text-sm sm:text-base text-[#1E3A5F]/85 font-medium leading-snug mt-1">
              E-commerce Virtual Assistant with over 4 years of experience scaling catalogs on Shopify, WooCommerce, and Home Depot.
            </p>
          </div>

          {/* Quick Credibility Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F] shadow-xs">
              <Briefcase className="w-3.5 h-3.5 text-[#2D5D86]" />
              <span>4+ Years Operations</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#2D5D86]" />
              <span>{PERSONAL_INFO.location}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#BCD5E6] text-xs font-bold text-[#1E3A5F] shadow-xs">
              <Wifi className="w-3.5 h-3.5 text-[#2D5D86]" />
              <span>200 Mbps Fiber + 5G Backup</span>
            </div>
          </div>

          {/* Segmented Controls (No-Scroll Tab Switcher) */}
          <div className="p-1 rounded-2xl bg-[#E3EDF6] border border-[#BCD5E6] flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                  : 'text-[#1E3A5F]/70 hover:text-[#1E3A5F] hover:bg-white/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Background & Skills</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'experience'
                  ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                  : 'text-[#1E3A5F]/70 hover:text-[#1E3A5F] hover:bg-white/50'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Experience</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('setup')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'setup'
                  ? 'bg-white text-[#1E3A5F] shadow-xs border border-[#BCD5E6]'
                  : 'text-[#1E3A5F]/70 hover:text-[#1E3A5F] hover:bg-white/50'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-[#0EA5E9]" />
              <span>Workstation & Ready</span>
            </button>
          </div>

          {/* Tab Content Box - Fixed Height to Prevent Any Layout Shift/Scroll */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#BCD5E6] shadow-sm min-h-[220px] max-h-[260px] overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-3 animate-fade-in">
                <p className="text-xs sm:text-sm text-[#1E3A5F]/90 font-medium leading-relaxed">
                  I partner with e-commerce brands like <strong>Willow Bath and Vanity</strong> to manage thousands of SKU listings with pixel-perfect images, accurate metafields, SEO copy, and reliable inventory synchronization.
                </p>
                <div className="pt-2 border-t border-[#BCD5E6]/60">
                  <div className="text-xs font-bold text-[#2D5D86] mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Core Tools & Technologies:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {CORE_SKILLS.slice(0, 10).map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-0.5 rounded-lg text-[11px] font-bold bg-[#EFF6FB] border border-[#BCD5E6] text-[#1E3A5F]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-3 animate-fade-in">
                {EXPERIENCES.slice(0, 2).map((exp, idx) => (
                  <div key={idx} className="pb-2.5 last:pb-0 border-b last:border-b-0 border-[#BCD5E6]/60">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs sm:text-sm text-[#1E3A5F]">{exp.title}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1]">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#2D5D86]">{exp.company}</div>
                    <p className="text-xs text-[#1E3A5F]/85 mt-1 line-clamp-2">
                      {exp.bullets[0]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'setup' && (
              <div className="grid grid-cols-2 gap-2.5 animate-fade-in text-xs">
                <div className="p-2.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6]">
                  <div className="font-bold text-[#2D5D86] flex items-center gap-1 mb-0.5">
                    <Wifi className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Internet</span>
                  </div>
                  <p className="font-medium text-[11px] text-[#1E3A5F]">{PERSONAL_INFO.internet}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6]">
                  <div className="font-bold text-[#2D5D86] flex items-center gap-1 mb-0.5">
                    <Cpu className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Hardware</span>
                  </div>
                  <p className="font-medium text-[11px] text-[#1E3A5F]">MacBook Air M1 + PC dual monitor</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6]">
                  <div className="font-bold text-[#2D5D86] flex items-center gap-1 mb-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Hours</span>
                  </div>
                  <p className="font-medium text-[11px] text-[#1E3A5F]">EST, PST, GMT & AEST ready</p>
                </div>

                <div className="p-2.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6]">
                  <div className="font-bold text-[#2D5D86] flex items-center gap-1 mb-0.5">
                    <Globe className="w-3.5 h-3.5 text-[#0EA5E9]" />
                    <span>Languages</span>
                  </div>
                  <p className="font-medium text-[11px] text-[#1E3A5F]">English (Fluent) • Filipino (Native)</p>
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="button"
              onClick={onOpenHire}
              className="px-6 py-2.5 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 text-[#7DD3FC]" />
            </button>
            <button
              type="button"
              onClick={onGoToWork}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-[#EFF6FB] border-2 border-[#BCD5E6] text-[#1E3A5F] font-bold text-xs sm:text-sm transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>View Managed Stores</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#2D5D86]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
