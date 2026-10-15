import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroLeft } from './components/HeroLeft';
import { CirclesVisualization } from './components/CirclesVisualization';
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { LogoTicker } from './components/LogoTicker';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'work'>('home');
  const [isHireOpen, setIsHireOpen] = useState(false);

  return (
    <div
      id="app-root"
      className="app relative min-h-screen lg:h-screen lg:max-h-screen w-full flex flex-col justify-between overflow-x-hidden lg:overflow-hidden text-[#1E3A5F] font-inter selection:bg-[#38BDF8]/30 selection:text-[#1E3A5F]"
      style={{
        background: `
          radial-gradient(ellipse at 85% 42%, rgba(56, 189, 248, 0.16) 0%, rgba(14, 165, 233, 0.08) 35%, transparent 70%),
          radial-gradient(circle at 12% 18%, rgba(30, 58, 95, 0.07) 0%, transparent 50%),
          radial-gradient(circle at 50% 92%, rgba(70, 130, 180, 0.12) 0%, transparent 60%),
          #F4F8FB
        `,
        backgroundColor: '#F4F8FB',
      }}
    >
      {/* Top Header with R Monogram Logo (Zero random shape borders) */}
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenHire={() => setIsHireOpen(true)}
      />

      {/* Main Page View Switching */}
      <main id="main-content-view" className="flex-1 w-full flex flex-col justify-center min-h-0">
        {activeTab === 'home' && (
          <section
            id="main-hero"
            className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 py-1 sm:py-2 relative z-10 animate-fade-in"
          >
            <HeroLeft onOpenHire={() => setIsHireOpen(true)} />

            <div
              id="hero-right-wrapper"
              className="flex-1 flex items-center justify-center w-full min-h-[360px] sm:min-h-[440px] lg:min-h-[500px] xl:min-h-[560px] overflow-visible"
            >
              <CirclesVisualization />
            </div>
          </section>
        )}

        {activeTab === 'about' && (
          <AboutPage
            onOpenHire={() => setIsHireOpen(true)}
            onGoToWork={() => {
              setActiveTab('work');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'work' && (
          <WorkPage onOpenHire={() => setIsHireOpen(true)} />
        )}
      </main>

      {/* Footer with Tool Icons and Copyright */}
      <LogoTicker />

      {/* Hire Me / Contact Modal */}
      <ContactModal
        isOpen={isHireOpen}
        onClose={() => setIsHireOpen(false)}
      />
    </div>
  );
}
