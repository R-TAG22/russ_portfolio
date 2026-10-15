import React from 'react';
import { ExternalLink, Plus } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { RussellPortrait } from './RussellPortrait';

interface StoreOrbitItem {
  id: string;
  name: string;
  sublabel: string;
  url?: string;
  isBlank: boolean;
  angle: number;
  radius: number;
  size: number;
  orbitIndex: number;
  flyInDelay: number;
  fallbackInitials?: string;
  faviconDomain?: string;
  profilePicUrl?: string;
  badgeType?: 'shopify' | 'fabrics' | 'restaurant' | 'facebook' | 'camera';
}

export const CirclesVisualization: React.FC = () => {
  // 6 Active Planetarium Orbit Slots across 2 concentric layers (3 E-Commerce Stores + 3 Facebook Client Pages)
  const orbitItems: StoreOrbitItem[] = [
    // --- Layer 1 (Inner Orbit - Radius 295px) ---
    // 1st site: Willow Bath and Vanity
    {
      id: 'store-willow-bath',
      name: 'Willow Bath & Vanity',
      sublabel: 'Shopify & Home Depot • Visit ↗',
      url: 'https://willowbathandvanity.com/',
      isBlank: false,
      angle: 270,
      radius: 295,
      size: 70,
      orbitIndex: 1,
      flyInDelay: 0.3,
      fallbackInitials: 'WB',
      faviconDomain: 'willowbathandvanity.com',
      badgeType: 'shopify',
    },
    // 2nd site: Sultan's Fine Fabrics
    {
      id: 'store-sultans-fabrics',
      name: "Sultan's Fine Fabrics",
      sublabel: 'Luxury Textiles • Visit ↗',
      url: 'https://www.sultansfinefabrics.com/',
      isBlank: false,
      angle: 30,
      radius: 295,
      size: 68,
      orbitIndex: 1,
      flyInDelay: 0.5,
      fallbackInitials: 'SF',
      faviconDomain: 'sultansfinefabrics.com',
      badgeType: 'fabrics',
    },
    // 3rd site: Candid Click (Facebook Page)
    {
      id: 'fb-candid-click',
      name: 'Candid Click',
      sublabel: 'Wedding Stories & Media • Facebook ↗',
      url: 'https://www.facebook.com/CandidclickbyMbs',
      isBlank: false,
      angle: 150,
      radius: 295,
      size: 72,
      orbitIndex: 1,
      flyInDelay: 0.7,
      fallbackInitials: 'CC',
      profilePicUrl: 'https://graph.facebook.com/CandidclickbyMbs/picture?type=large',
      badgeType: 'camera',
    },

    // --- Layer 2 (Outer Orbit - Radius 390px) ---
    // 4th site: Canton Roast
    {
      id: 'store-canton-roast',
      name: 'Canton Roast',
      sublabel: 'Online Ordering • Visit ↗',
      url: 'https://cantonroast.com/',
      isBlank: false,
      angle: 90,
      radius: 390,
      size: 70,
      orbitIndex: 2,
      flyInDelay: 0.9,
      fallbackInitials: 'CR',
      faviconDomain: 'cantonroast.com',
      badgeType: 'restaurant',
    },
    // 5th site: Facebook Client Page 1 (ID: 100076379971186)
    {
      id: 'fb-client-page-1',
      name: 'Ivan Lee / Media Page',
      sublabel: 'Creative & Media • Facebook ↗',
      url: 'https://www.facebook.com/profile.php?id=100076379971186',
      isBlank: false,
      angle: 210,
      radius: 390,
      size: 68,
      orbitIndex: 2,
      flyInDelay: 1.1,
      fallbackInitials: 'IL',
      profilePicUrl: 'https://graph.facebook.com/100076379971186/picture?type=large',
      badgeType: 'facebook',
    },
    // 6th site: Facebook Client Page 2 (ID: 100089849743160)
    {
      id: 'fb-client-page-2',
      name: 'Facebook Client Page',
      sublabel: 'Social Media & Brand • Facebook ↗',
      url: 'https://www.facebook.com/profile.php?id=100089849743160',
      isBlank: false,
      angle: 330,
      radius: 390,
      size: 68,
      orbitIndex: 2,
      flyInDelay: 1.3,
      fallbackInitials: 'FB',
      profilePicUrl: 'https://graph.facebook.com/100089849743160/picture?type=large',
      badgeType: 'facebook',
    },
  ];

  const handlePlanetClick = (item: StoreOrbitItem) => {
    if (!item.isBlank && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderOrbitLayer = (orbitNumber: number, spinDir: 'cw' | 'ccw', durationSec: number) => {
    const itemsInOrbit = orbitItems.filter((it) => it.orbitIndex === orbitNumber);
    const counterSpinClass = spinDir === 'ccw' ? 'spin-cw-inline' : 'spin-ccw-inline';

    return itemsInOrbit.map((item) => {
      const rad = (item.angle * Math.PI) / 180;
      const x = Math.round(item.radius * Math.cos(rad));
      const y = Math.round(item.radius * Math.sin(rad));

      return (
        <div
          key={item.id}
          id={item.id}
          className="absolute top-1/2 left-1/2 pointer-events-auto group z-20"
          style={{
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          }}
        >
          <div
            style={{
              animation: `avatar-fly-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${item.flyInDelay}s both`,
            }}
          >
            <div
              className={`${counterSpinClass} relative flex items-center justify-center`}
              style={{
                animationDuration: `${durationSec}s`,
              }}
            >
              {item.isBlank ? (
                // Blank planet placeholder slot
                <div
                  className="rounded-full bg-white/70 border-2 border-dashed border-[#C9DAB0] flex items-center justify-center transition-all duration-300 group-hover:border-[#2F5D3A] group-hover:scale-110 shadow-xs cursor-pointer group-hover:bg-[#C9DAB0]/30"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                  }}
                >
                  <Plus className="w-4 h-4 text-[#3A6B4A]/60 group-hover:text-[#2F5D3A]" />
                </div>
              ) : (
                // Active Planet (Client Store or Facebook Page)
                <button
                  type="button"
                  onClick={() => handlePlanetClick(item)}
                  className="relative rounded-full bg-white border-2 border-[#2F5D3A] flex items-center justify-center transition-all duration-300 group-hover:scale-115 shadow-[0_6px_20px_rgba(47,93,58,0.25)] group-hover:shadow-[0_8px_25px_rgba(47,93,58,0.4)] cursor-pointer overflow-hidden p-1 bg-white/95"
                  style={{
                    width: `${item.size}px`,
                    height: `${item.size}px`,
                  }}
                  title={`Open ${item.name} (${item.sublabel})`}
                >
                  {/* Photo or Favicon */}
                  {item.profilePicUrl ? (
                    <img
                      src={item.profilePicUrl}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full select-none"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : item.faviconDomain ? (
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${item.faviconDomain}&sz=128`}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-full select-none p-1"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}

                  {/* Fallback Badge / Monogram with branding styling */}
                  <div className="font-urbanist font-extrabold text-xs text-[#2F5D3A] select-none absolute inset-0 -z-10 flex flex-col items-center justify-center bg-gradient-to-br from-[#F2F2EE] to-[#E5E5DE]">
                    {item.badgeType === 'camera' ? (
                      <span className="text-[11px] font-black text-[#2F5D3A]">📷 {item.fallbackInitials}</span>
                    ) : item.badgeType === 'facebook' ? (
                      <span className="text-[11px] font-black text-[#1877F2]">f • {item.fallbackInitials}</span>
                    ) : (
                      <span className="text-xs font-bold text-[#2F5D3A]">{item.fallbackInitials}</span>
                    )}
                  </div>

                  {/* Corner Brand / Platform Indicator Badge */}
                  {item.badgeType === 'camera' ? (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-black shadow-xs border border-white">
                      f
                    </div>
                  ) : item.badgeType === 'facebook' ? (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[9px] font-black shadow-xs border border-white">
                      f
                    </div>
                  ) : (
                    <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#2F5D3A] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-xs">
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              )}

              {/* Hover Tooltip Card */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-[#2F5D3A] text-[#F2F2EE] border-2 border-[#C9DAB0] px-3 py-1.5 rounded-xl text-center z-40 shadow-2xl whitespace-nowrap min-w-[120px]">
                <div className="font-bold text-xs text-[#C9DAB0] flex items-center justify-center gap-1">
                  {(item.badgeType === 'facebook' || item.badgeType === 'camera') && (
                    <span className="text-[#1877F2] font-black bg-white rounded-full w-3.5 h-3.5 inline-flex items-center justify-center text-[9px]">
                      f
                    </span>
                  )}
                  <span>{item.name}</span>
                </div>
                <div className="text-[10px] text-[#F2F2EE]/90 font-medium">{item.sublabel}</div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div
      id="circles-visualization-container"
      className="relative flex-none w-[800px] h-[800px] max-w-full flex items-center justify-center animate-scale-in select-none origin-center transform scale-[0.44] sm:scale-[0.56] md:scale-[0.66] lg:scale-[0.72] xl:scale-[0.80] 2xl:scale-[0.88] transition-transform duration-300 pointer-events-auto"
      style={{
        animationDuration: '1.0s',
        animationDelay: '0.2s',
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Orbit 2 (Outer Layer) - 780px, spins CW 48s */}
      <div
        id="orbit-2"
        className="orbit-circle w-[780px] h-[780px]"
        style={{ animation: 'spin-cw 48s linear infinite' }}
      >
        <div className="orbit-circle-border" />
        {renderOrbitLayer(2, 'cw', 48)}
      </div>

      {/* Orbit 1 (Inner Layer) - 590px, spins CCW 36s */}
      <div
        id="orbit-1"
        className="orbit-circle w-[590px] h-[590px]"
        style={{ animation: 'spin-ccw 36s linear infinite' }}
      >
        <div className="orbit-circle-border" />
        {renderOrbitLayer(1, 'ccw', 36)}
      </div>

      {/* Center Hub: Russell's Photo with Organic Blob Shape (Big, Clear & Prominent) */}
      <div
        id="center-curve-hub"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] flex items-center justify-center z-10 select-none group"
      >
        {/* Layer 1: Ambient Sage Glow */}
        <div
          className="absolute w-[500px] h-[500px] organic-blob-shape-delayed bg-[#C9DAB0]/70 -z-20 blur-[6px] transition-transform duration-700 group-hover:scale-105"
        />

        {/* Layer 2: Main Russell Portrait Component */}
        <RussellPortrait
          className="w-[500px] h-[500px]"
          blobVariant="white"
          showUploadControl={true}
        />

        {/* Floating Name Badge */}
        <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 bg-[#2F5D3A] text-[#F2F2EE] border-2 border-[#C9DAB0] text-[12px] font-bold px-4 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-2 pointer-events-none z-30 transition-transform duration-300 group-hover:scale-105">
          <span className="w-2 h-2 rounded-full bg-[#C9DAB0] animate-pulse" />
          <span>Russell Taga-an</span>
        </div>
      </div>
    </div>
  );
};
