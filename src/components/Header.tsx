import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { RussellLogo } from './RussellLogo';

interface HeaderProps {
  activeTab: 'home' | 'about' | 'work';
  onSelectTab: (tab: 'home' | 'about' | 'work') => void;
  onOpenHire: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenHire,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="main-header"
      className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 py-3 sm:py-4 flex items-center justify-between relative z-30 font-inter"
    >
      {/* Left: Russell Brand Monogram Logo (3x Bigger, Zero random shape borders) + Wordmark */}
      <div id="header-left" className="flex items-center">
        <button
          id="brand-logo-btn"
          type="button"
          onClick={() => onSelectTab('home')}
          className="group select-none cursor-pointer bg-transparent border-0 p-0 text-left flex items-center gap-3 sm:gap-4"
          title="Russell Taga-an Portfolio Home"
        >
          {/* Crisp 3x Bigger R monogram logo with translucent cyan & steel blue facets - NO random shape borders */}
          <div className="w-[108px] h-[108px] sm:w-[120px] sm:h-[120px] flex-none flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
            <RussellLogo className="w-full h-full drop-shadow-[0_4px_16px_rgba(56,189,248,0.45)]" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-urbanist font-extrabold text-2xl sm:text-3xl tracking-tight text-[#1E3A5F] transition-colors leading-tight">
              Russell<span className="text-[#38BDF8] transition-colors group-hover:text-[#0EA5E9]">.</span>
            </span>
            <span className="text-[11px] font-semibold text-[#5A7A98] tracking-widest uppercase">
              Portfolio
            </span>
          </div>
        </button>
      </div>

      {/* Center: Desktop Navigation Menus (Home, About, Work) */}
      <nav
        id="desktop-nav-center"
        className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#BCD5E6] shadow-xs"
      >
        <button
          id="nav-link-home"
          type="button"
          onClick={() => onSelectTab('home')}
          className={`px-5 py-2 rounded-full text-sm font-bold tracking-tight transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#1E3A5F] text-white shadow-xs'
              : 'text-[#1E3A5F]/80 hover:text-[#1E3A5F] hover:bg-[#38BDF8]/10'
          }`}
        >
          Home
        </button>
        <button
          id="nav-link-about"
          type="button"
          onClick={() => onSelectTab('about')}
          className={`px-5 py-2 rounded-full text-sm font-bold tracking-tight transition-all cursor-pointer ${
            activeTab === 'about'
              ? 'bg-[#1E3A5F] text-white shadow-xs'
              : 'text-[#1E3A5F]/80 hover:text-[#1E3A5F] hover:bg-[#38BDF8]/10'
          }`}
        >
          About
        </button>
        <button
          id="nav-link-work"
          type="button"
          onClick={() => onSelectTab('work')}
          className={`px-5 py-2 rounded-full text-sm font-bold tracking-tight transition-all cursor-pointer ${
            activeTab === 'work'
              ? 'bg-[#1E3A5F] text-white shadow-xs'
              : 'text-[#1E3A5F]/80 hover:text-[#1E3A5F] hover:bg-[#38BDF8]/10'
          }`}
        >
          Work
        </button>
      </nav>

      {/* Right Top Corner: Hire Me button with Rotating Steel Blue & Ice Cyan Border */}
      <div id="header-right" className="flex items-center gap-3 sm:gap-4">
        <div id="join-now-wrap" className="btn-border-wrap">
          <button
            id="hire-me-top-btn"
            type="button"
            onClick={onOpenHire}
            className="btn-join cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#7DD3FC]" />
              <span>Hire me</span>
            </span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#1E3A5F] p-2 hover:opacity-80 transition-opacity"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#1E3A5F]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="absolute top-full left-0 right-0 bg-[#1E3A5F] text-white border-b-2 border-[#38BDF8]/40 px-8 py-6 flex flex-col gap-3 md:hidden shadow-2xl z-50 rounded-b-2xl animate-fade-down backdrop-blur-md"
        >
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onSelectTab('home');
            }}
            className={`text-left text-base font-bold transition-colors py-2.5 border-b border-white/10 ${
              activeTab === 'home' ? 'text-[#38BDF8]' : 'text-white'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onSelectTab('about');
            }}
            className={`text-left text-base font-bold transition-colors py-2.5 border-b border-white/10 ${
              activeTab === 'about' ? 'text-[#38BDF8]' : 'text-white'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onSelectTab('work');
            }}
            className={`text-left text-base font-bold transition-colors py-2.5 border-b border-white/10 ${
              activeTab === 'work' ? 'text-[#38BDF8]' : 'text-white'
            }`}
          >
            Work
          </button>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenHire();
            }}
            className="text-left text-base font-bold text-[#38BDF8] transition-colors py-2.5 flex items-center justify-between"
          >
            <span>Hire me</span>
            <span>→</span>
          </button>
        </div>
      )}
    </header>
  );
};
