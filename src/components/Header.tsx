import React, { useState } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { RussellPortrait } from './RussellPortrait';

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
      {/* Left: Russell logo with profile pic + brand title */}
      <div id="header-left" className="flex items-center">
        <button
          id="brand-logo-btn"
          type="button"
          onClick={() => onSelectTab('home')}
          className="group select-none cursor-pointer bg-transparent border-0 p-0 text-left flex items-center gap-3"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden flex-none shadow-xs group-hover:scale-105 transition-transform">
            <RussellPortrait
              className="w-full h-full"
              blobVariant="green"
              showUploadControl={false}
            />
          </div>
          <span className="font-urbanist font-extrabold text-2xl sm:text-3xl tracking-tight text-[#2F5D3A] transition-colors">
            Russell<span className="text-[#3A6B4A] group-hover:text-[#2F5D3A]">.</span>
          </span>
        </button>
      </div>

      {/* Center: Desktop Navigation Menus (About, Work) */}
      <nav
        id="desktop-nav-center"
        className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-white/80 backdrop-blur-md border-2 border-[#C9DAB0] shadow-sm"
      >
        <button
          id="nav-link-home"
          type="button"
          onClick={() => onSelectTab('home')}
          className={`px-5 py-2 rounded-full text-sm font-bold tracking-tight transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'bg-[#2F5D3A] text-[#F2F2EE] shadow-sm'
              : 'text-[#2F5D3A] hover:bg-[#C9DAB0]/40'
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
              ? 'bg-[#2F5D3A] text-[#F2F2EE] shadow-sm'
              : 'text-[#2F5D3A] hover:bg-[#C9DAB0]/40'
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
              ? 'bg-[#2F5D3A] text-[#F2F2EE] shadow-sm'
              : 'text-[#2F5D3A] hover:bg-[#C9DAB0]/40'
          }`}
        >
          Work
        </button>
      </nav>

      {/* Right Top Corner: Hire Me button */}
      <div id="header-right" className="flex items-center gap-3 sm:gap-4">
        <div id="join-now-wrap" className="btn-border-wrap">
          <button
            id="hire-me-top-btn"
            type="button"
            onClick={onOpenHire}
            className="btn-join cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#C9DAB0]" />
              <span>Hire me</span>
            </span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#2F5D3A] p-2 hover:opacity-80 transition-opacity"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#2F5D3A]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="absolute top-full left-0 right-0 bg-[#2F5D3A] text-[#F2F2EE] border-b-2 border-[#C9DAB0] px-8 py-6 flex flex-col gap-3 md:hidden shadow-2xl z-50 rounded-b-2xl animate-fade-down"
        >
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onSelectTab('home');
            }}
            className={`text-left text-base font-bold transition-colors py-2.5 border-b border-white/10 ${
              activeTab === 'home' ? 'text-[#C9DAB0]' : 'text-[#F2F2EE]'
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
              activeTab === 'about' ? 'text-[#C9DAB0]' : 'text-[#F2F2EE]'
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
              activeTab === 'work' ? 'text-[#C9DAB0]' : 'text-[#F2F2EE]'
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
            className="text-left text-base font-bold text-[#C9DAB0] transition-colors py-2.5 flex items-center justify-between"
          >
            <span>Hire me</span>
            <span>→</span>
          </button>
        </div>
      )}
    </header>
  );
};
