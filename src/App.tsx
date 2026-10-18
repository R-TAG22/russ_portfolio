import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroLeft } from './components/HeroLeft';
import { CirclesVisualization } from './components/CirclesVisualization';
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { BlogPage } from './components/BlogPage';
import { LogoTicker } from './components/LogoTicker';
import { ContactModal } from './components/ContactModal';
import { AuthProvider } from './cms/auth/AuthContext';
import { ProtectedAdminRoute } from './cms/auth/ProtectedAdminRoute';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'work' | 'blog' | 'cms'>('home');
  const [isHireOpen, setIsHireOpen] = useState(false);

  // Sync tab with URL hash / search params (#admin, #about, #work, #blog) and secret keyboard shortcut
  useEffect(() => {
    const checkHashAndRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();

      const isAdminTarget =
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#cms' ||
        hash === '#/cms' ||
        path.includes('/admin') ||
        path.includes('/cms') ||
        search.includes('admin') ||
        search.includes('cms');

      if (isAdminTarget) {
        setActiveTab('cms');
      } else if (hash === '#about') {
        setActiveTab('about');
      } else if (hash === '#work') {
        setActiveTab('work');
      } else if (
        hash === '#blog' ||
        hash === '#/blog' ||
        hash.startsWith('#blog-') ||
        path.includes('/blog') ||
        search.includes('blog')
      ) {
        setActiveTab('blog');
      } else if (hash === '#home' || hash === '') {
        setActiveTab('home');
      }
    };

    checkHashAndRoute();
    window.addEventListener('hashchange', checkHashAndRoute);
    window.addEventListener('popstate', checkHashAndRoute);

    // Secret Administrative Keyboard Shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setActiveTab('cms');
        window.location.hash = 'admin';
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkHashAndRoute);
      window.removeEventListener('popstate', checkHashAndRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectTab = (tab: 'home' | 'about' | 'work' | 'blog' | 'cms') => {
    setActiveTab(tab);
    if (tab === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else if (tab === 'cms') {
      window.location.hash = 'admin';
    } else {
      window.location.hash = tab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <div
        id="app-root"
        className={`app relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-[#1E3A5F] font-inter selection:bg-[#38BDF8]/30 selection:text-[#1E3A5F] ${
          activeTab === 'home'
            ? 'lg:h-screen lg:max-h-screen lg:overflow-hidden'
            : activeTab === 'cms'
            ? 'h-screen max-h-screen overflow-hidden'
            : 'lg:min-h-screen'
        }`}
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
        {/* Top Header with R Monogram Logo (Only Home, About, Work, Blog visible to public) */}
        {activeTab !== 'cms' && (
          <Header
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onOpenHire={() => setIsHireOpen(true)}
          />
        )}

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
                handleSelectTab('work');
              }}
            />
          )}

          {activeTab === 'work' && (
            <WorkPage onOpenHire={() => setIsHireOpen(true)} />
          )}

          {activeTab === 'blog' && (
            <BlogPage
              onOpenHire={() => setIsHireOpen(true)}
              onNavigateToWork={() => handleSelectTab('work')}
            />
          )}

          {/* Gated Protected Admin CMS Route */}
          {activeTab === 'cms' && (
            <ProtectedAdminRoute onNavigateHome={() => handleSelectTab('home')} />
          )}
        </main>

        {/* Public Footer with Tool Icons and Copyright (Hidden in CMS builder mode) */}
        {activeTab !== 'cms' && <LogoTicker />}

        {/* Hire Me / Contact Modal */}
        <ContactModal
          isOpen={isHireOpen}
          onClose={() => setIsHireOpen(false)}
        />
      </div>
    </AuthProvider>
  );
}
