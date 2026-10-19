import React, { useState, useEffect } from 'react';
import { ConnectSocialItem, ConnectSocialsConfig } from '../cms/types/schema';
import { contentService } from '../cms/services/ContentServiceFactory';

interface ConnectSocialBarProps {
  config?: ConnectSocialsConfig;
}

export const DEFAULT_CONNECT_ITEMS: ConnectSocialItem[] = [
  {
    id: 'c_gmail',
    letter: 'C',
    platform: 'gmail',
    label: 'Gmail',
    url: 'mailto:tagaan01@gmail.com',
    color: '#EA4335',
    bgColor: '#FEF2F2',
    enabled: true,
  },
  {
    id: 'o_fb',
    letter: 'O',
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://facebook.com/russell.tagaan',
    color: '#1877F2',
    bgColor: '#EFF6FF',
    enabled: true,
  },
  {
    id: 'n_insta',
    letter: 'N',
    platform: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com/russ_tag',
    color: '#E4405F',
    bgColor: '#FDF2F8',
    enabled: true,
  },
  {
    id: 'n_linkedin',
    letter: 'N',
    platform: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/russell-tagaan',
    color: '#0A66C2',
    bgColor: '#F0F9FF',
    enabled: true,
  },
  {
    id: 'e_whatsapp',
    letter: 'E',
    platform: 'whatsapp',
    label: 'WhatsApp',
    url: 'https://wa.me/639296937829',
    color: '#25D366',
    bgColor: '#F0FDF4',
    enabled: true,
  },
  {
    id: 'c_threads',
    letter: 'C',
    platform: 'threads',
    label: 'Threads',
    url: 'https://threads.net/@russell.tagaan',
    color: '#000000',
    bgColor: '#F8FAFC',
    enabled: true,
  },
  {
    id: 't_github',
    letter: 'T',
    platform: 'github',
    label: 'GitHub',
    url: 'https://github.com/R-TAG22',
    color: '#24292F',
    bgColor: '#F1F5F9',
    enabled: true,
  },
];

export const AVAILABLE_PLATFORMS = [
  { value: 'upwork', label: 'Upwork', defaultBg: '#F0FDF4', defaultColor: '#14A800' },
  { value: 'gmail', label: 'Gmail', defaultBg: '#FEF2F2', defaultColor: '#EA4335' },
  { value: 'facebook', label: 'Facebook', defaultBg: '#EFF6FF', defaultColor: '#1877F2' },
  { value: 'instagram', label: 'Instagram', defaultBg: '#FDF2F8', defaultColor: '#E4405F' },
  { value: 'linkedin', label: 'LinkedIn', defaultBg: '#F0F9FF', defaultColor: '#0A66C2' },
  { value: 'whatsapp', label: 'WhatsApp', defaultBg: '#F0FDF4', defaultColor: '#25D366' },
  { value: 'threads', label: 'Threads', defaultBg: '#F8FAFC', defaultColor: '#111827' },
  { value: 'github', label: 'GitHub', defaultBg: '#F1F5F9', defaultColor: '#24292F' },
  { value: 'twitter', label: 'X (Twitter)', defaultBg: '#F8FAFC', defaultColor: '#000000' },
  { value: 'youtube', label: 'YouTube', defaultBg: '#FEF2F2', defaultColor: '#FF0000' },
  { value: 'website', label: 'Website', defaultBg: '#F0F9FF', defaultColor: '#0EA5E9' },
];

export const SocialPlatformIcon: React.FC<{
  platform: string;
  customIconUrl?: string;
  className?: string;
}> = ({ platform, customIconUrl, className = 'w-5 h-5' }) => {
  if (customIconUrl) {
    return (
      <img
        src={customIconUrl}
        alt={platform}
        className={`${className} object-contain rounded-xs transition-transform`}
        onError={(e) => {
          (e.currentTarget as HTMLElement).style.display = 'none';
        }}
      />
    );
  }

  const norm = (platform || '').toLowerCase();

  switch (norm) {
    case 'upwork':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#14A800" aria-hidden="true">
          <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.229l.228-1.076l.008-.042c.202-1.104.757-2.617 1.996-2.617c1.092 0 1.979.889 1.979 1.982c0 1.1-.887 1.982-1.979 1.982h-.158zm.158-6.906c-2.739 0-4.887 2.062-5.467 4.791c-1.205-1.745-2.072-3.816-2.529-5.918H7.319v6.78c0 1.696-1.378 3.074-3.074 3.074c-1.697 0-3.075-1.378-3.075-3.074V5.125H0v6.78c0 2.348 1.909 4.257 4.244 4.257c2.348 0 4.258-1.909 4.258-4.257V8.583c.432 1.488 1.107 2.946 1.984 4.248l-1.687 7.914h3.454l1.246-5.854c1.198.777 2.585 1.258 4.062 1.258c3.279 0 5.947-2.668 5.947-5.947c0-3.279-2.668-5.948-5.947-5.948z" />
        </svg>
      );

    case 'gmail':
    case 'mail':
    case 'email':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path fill="#4285F4" d="M22 6c0-.85-.38-1.62-.97-2.13L15.3 8.35 22 13.5V6z" />
          <path fill="#34A853" d="M2 6v7.5l6.7-5.15L2.97 3.87C2.38 4.38 2 5.15 2 6z" />
          <path
            fill="#EA4335"
            d="M2.97 3.87L12 11l9.03-7.13C20.47 3.33 19.78 3 19 3H5c-.78 0-1.47.33-2.03.87z"
          />
          <path fill="#FBBC05" d="M2 18c0 1.1.9 2 2 2h2v-7.5l-4 3.08V18z" />
          <path fill="#4285F4" d="M18 20h2c1.1 0 2-.9 2-2v-2.42l-4-3.08V20z" />
          <path fill="#34A853" d="M6 20h12v-7.5L12 17l-6-4.5V20z" />
        </svg>
      );

    case 'fb':
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#1877F2" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );

    case 'insta':
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
          <defs>
            <linearGradient id="connect-ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#connect-ig-grad)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#0A66C2" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );

    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#25D366" aria-hidden="true">
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15-.201.3-.778.979-.954 1.18-.176.2-.352.225-.653.075-.3-.15-1.269-.467-2.417-1.492-.894-.798-1.498-1.784-1.674-2.085-.176-.3-.019-.463.132-.613.136-.135.301-.35.452-.526.15-.175.201-.3.301-.5.1-.2.05-.375-.025-.526-.075-.15-.678-1.636-.929-2.242-.244-.59-.493-.51-.678-.52-.175-.008-.376-.01-.577-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.512 1.079 2.913 1.23 3.114c.15.2 2.124 3.243 5.145 4.549.718.311 1.28.497 1.718.636.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.517 2 2.03 6.486 2.03 12.01c0 1.983.582 3.842 1.611 5.421L2 22l4.73-1.579c1.52.88 3.27 1.389 5.31 1.389 5.523 0 10.01-4.486 10.01-10.01S17.563 2 12.04 2z" />
        </svg>
      );

    case 'threads':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#111827" aria-hidden="true">
          <path d="M12.186 24C5.46 24 0 18.54 0 11.814 0 5.088 5.46 0 12.186 0c6.643 0 11.96 5.253 12.18 11.884h-2.673C21.474 6.72 17.3 2.667 12.186 2.667c-5.053 0-9.147 4.094-9.147 9.147s4.094 9.147 9.147 9.147c3.96 0 7.373-2.453 8.64-5.947H12.186v-2.666h11.2c.4 1.733.614 3.546.614 5.4C24 18.54 18.54 24 12.186 24zM12.186 9.333c-1.467 0-2.667 1.2-2.667 2.667s1.2 2.667 2.667 2.667 2.667-1.2 2.667-2.667-1.2-2.667-2.667z" />
        </svg>
      );

    case 'twitter':
    case 'x':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#000000" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#FF0000" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );

    case 'website':
    case 'globe':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );

    case 'github':
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#24292F" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
  }
};

export const ConnectSocialBar: React.FC<ConnectSocialBarProps> = ({ config }) => {
  const [socialsConfig, setSocialsConfig] = useState<ConnectSocialsConfig>(() => {
    return (
      config || {
        enabled: true,
        flipIntervalSec: 1.0,
        items: DEFAULT_CONNECT_ITEMS,
      }
    );
  });

  // Global flip state toggles every ~1 second
  const [isFlipped, setIsFlipped] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Sync with global storage if not passed via props or when globals change
  useEffect(() => {
    if (config) {
      setSocialsConfig(config);
      return;
    }

    const loadGlobals = async () => {
      try {
        const globals = await contentService.getGlobals();
        if (globals?.footer?.connectSocials) {
          setSocialsConfig(globals.footer.connectSocials);
        }
      } catch (err) {
        // Fallback to default
      }
    };

    loadGlobals();

    const handleUpdate = () => {
      loadGlobals();
    };

    window.addEventListener('content_service_globals_updated', handleUpdate);
    return () => {
      window.removeEventListener('content_service_globals_updated', handleUpdate);
    };
  }, [config]);

  // Flip interval timer: toggles every ~1.0 second (configurable), pauses on hover
  useEffect(() => {
    if (!socialsConfig.enabled || isPaused) return;

    // Use configured interval (default 1.0s = 1000ms)
    const intervalMs = Math.max(500, Math.round((socialsConfig.flipIntervalSec || 1.0) * 1000));

    const timer = setInterval(() => {
      setIsFlipped((prev) => !prev);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [socialsConfig.enabled, socialsConfig.flipIntervalSec, isPaused]);

  if (!socialsConfig.enabled) {
    return null;
  }

  const items =
    socialsConfig.items && socialsConfig.items.length > 0
      ? socialsConfig.items.filter((i) => i.enabled !== false)
      : DEFAULT_CONNECT_ITEMS;

  return (
    <div
      id="connect-socials-wrapper"
      className="flex flex-col items-center justify-center py-2 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setHoveredIdx(null);
      }}
    >
      {/* Small subtle label */}
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5A7A98] mb-1.5 opacity-80 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] animate-pulse" />
        <span>CONNECT WITH RUSSELL</span>
      </span>

      {/* Row of Square Rounded Corner Flip Tiles */}
      <div
        className="flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap"
        role="navigation"
        aria-label="Social connections: CONNECT"
      >
        {items.map((item, idx) => {
          // A tile is flipped if the global cycle is flipped OR if specifically hovered
          const tileFlipped = hoveredIdx === idx ? true : isFlipped;

          // Cascade wave delay when flipping automatically
          const waveDelay = `${idx * 80}ms`;

          return (
            <a
              key={item.id || `${item.letter}-${idx}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${item.letter} - ${item.label}`}
              title={`${item.label} (${item.url})`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="group relative block w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 focus:outline-hidden focus:ring-2 focus:ring-[#0EA5E9] rounded-xl sm:rounded-2xl transition-transform duration-200 hover:scale-108 active:scale-95"
              style={{
                perspective: '1000px',
              }}
            >
              {/* Inner 3D Flipping Card */}
              <div
                className="w-full h-full relative transition-transform duration-600 rounded-xl sm:rounded-2xl shadow-xs group-hover:shadow-lg"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: tileFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transitionDelay: hoveredIdx === idx ? '0ms' : waveDelay,
                }}
              >
                {/* ---------------- FRONT FACE: The Letter (C, O, N, N, E, C, T) ---------------- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl bg-gradient-to-br from-white via-[#F4F8FB] to-[#E0F2FE] border border-[#BCD5E6] flex items-center justify-center font-urbanist font-black text-lg sm:text-xl text-[#1E3A5F] group-hover:text-[#0EA5E9] group-hover:border-[#0EA5E9]/50 transition-colors"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  <span className="drop-shadow-xs">{item.letter}</span>

                  {/* Corner Accent Glow */}
                  <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#38BDF8] opacity-60 group-hover:opacity-100" />
                </div>

                {/* ---------------- BACK FACE: The Social Icon (Gmail, FB, Insta, LinkedIn, WhatsApp, Threads, GitHub) ---------------- */}
                <div
                  className="absolute inset-0 w-full h-full rounded-xl sm:rounded-2xl bg-white border border-[#BCD5E6] flex items-center justify-center transition-all"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: item.bgColor || '#FFFFFF',
                  }}
                >
                  <SocialPlatformIcon
                    platform={item.platform}
                    customIconUrl={item.customIconUrl}
                    className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Hover Floating Tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30 whitespace-nowrap px-2 py-0.5 rounded-lg bg-slate-900/90 backdrop-blur-xs text-white text-[10px] font-bold shadow-md">
                <span>{item.label}</span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
