import React, { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { RussellPortrait } from './RussellPortrait';
import { StoreOrbitItem } from '../cms/types/schema';
import { contentService } from '../cms/services/ContentServiceFactory';

export const DEFAULT_ORBIT_ITEMS: StoreOrbitItem[] = [
  // --- Layer 1 (Inner Orbit - Radius 295px, spins CCW 36s) ---
  {
    id: 'store-diyative',
    name: 'DIYATIVE',
    sublabel: '3D Wooden Models & Kits • Visit ↗',
    url: 'https://diyative.com/',
    angle: 45,
    radius: 295,
    size: 72,
    orbitIndex: 1,
    flyInDelay: 0.4,
    fallbackInitials: 'DIY',
    faviconDomain: 'diyative.com',
  },
  {
    id: 'store-skin-by-brownlee',
    name: 'Skin by Brownlee & Co.',
    sublabel: 'Clinical Skincare DTC • Visit ↗',
    url: 'https://skinbybrownleeandco.com/',
    angle: 225,
    radius: 295,
    size: 72,
    orbitIndex: 1,
    flyInDelay: 0.6,
    fallbackInitials: 'SB',
    faviconDomain: 'skinbybrownleeandco.com',
  },

  // --- Layer 2 (Outer Orbit - Radius 390px, spins CW 48s) ---
  {
    id: 'store-willow-bath',
    name: 'Willow Bath & Vanity',
    sublabel: 'Shopify & Home Depot • Visit ↗',
    url: 'https://willowbathandvanity.com/',
    angle: 30,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 0.8,
    fallbackInitials: 'WB',
    faviconDomain: 'willowbathandvanity.com',
  },
  {
    id: 'store-sultans-fabrics',
    name: "Sultan's Fine Fabrics",
    sublabel: 'Luxury Textiles • Visit ↗',
    url: 'https://www.sultansfinefabrics.com/',
    angle: 150,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 1.0,
    fallbackInitials: 'SF',
    faviconDomain: 'sultansfinefabrics.com',
  },
  {
    id: 'store-canton-roast',
    name: 'Canton Roast',
    sublabel: 'Online Ordering • Visit ↗',
    url: 'https://cantonroast.com/',
    angle: 270,
    radius: 390,
    size: 70,
    orbitIndex: 2,
    flyInDelay: 1.2,
    fallbackInitials: 'CR',
    faviconDomain: 'cantonroast.com',
  },
];

interface CirclesVisualizationProps {
  customItems?: StoreOrbitItem[];
  customCenterPhoto?: string;
  onManageRotatingSites?: () => void;
  isEditableInCanvas?: boolean;
}

export const CirclesVisualization: React.FC<CirclesVisualizationProps> = ({
  customItems,
  customCenterPhoto,
  onManageRotatingSites,
  isEditableInCanvas = false,
}) => {
  const [loadedSites, setLoadedSites] = useState<StoreOrbitItem[]>(DEFAULT_ORBIT_ITEMS);
  const [loadedCenterPhoto, setLoadedCenterPhoto] = useState<string>('');

  useEffect(() => {
    // If custom items are directly passed as props, prioritize them
    if (customItems && customItems.length > 0) {
      setLoadedSites(customItems);
      return;
    }

    const loadData = async () => {
      try {
        const page = await contentService.getPageBySlug('homepage');
        const orbitEl = page?.sections
          ?.flatMap((s) => s.columns)
          ?.flatMap((c) => c.elements)
          ?.find((e) => e.type === 'profileOrbit');

        const orbitContent = (orbitEl?.content as any)?.data;
        if (orbitContent?.rotatingSites && orbitContent.rotatingSites.length > 0) {
          setLoadedSites(orbitContent.rotatingSites);
        } else {
          const globals = await contentService.getGlobals();
          if (globals?.rotatingSites && globals.rotatingSites.length > 0) {
            setLoadedSites(globals.rotatingSites);
          } else {
            setLoadedSites(DEFAULT_ORBIT_ITEMS);
          }
        }

        if (orbitContent?.imageUrl) {
          setLoadedCenterPhoto(orbitContent.imageUrl);
        }
      } catch {
        setLoadedSites(DEFAULT_ORBIT_ITEMS);
      }
    };

    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('content_service_rotating_sites_updated', handleUpdate);
    window.addEventListener('content_service_pages_updated', handleUpdate);
    window.addEventListener('content_service_page_updated', handleUpdate);
    window.addEventListener('content_service_globals_updated', handleUpdate);

    return () => {
      window.removeEventListener('content_service_rotating_sites_updated', handleUpdate);
      window.removeEventListener('content_service_pages_updated', handleUpdate);
      window.removeEventListener('content_service_page_updated', handleUpdate);
      window.removeEventListener('content_service_globals_updated', handleUpdate);
    };
  }, [customItems]);

  const activeSites = customItems && customItems.length > 0 ? customItems : loadedSites;
  const activeCenterPhoto = customCenterPhoto || loadedCenterPhoto;

  const handlePlanetClick = (item: StoreOrbitItem) => {
    if (isEditableInCanvas && onManageRotatingSites) {
      onManageRotatingSites();
      return;
    }
    if (item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    }
  };

  const renderOrbitLayer = (orbitNumber: number, spinDir: 'cw' | 'ccw', durationSec: number) => {
    const itemsInOrbit = activeSites.filter((it) => it.orbitIndex === orbitNumber);
    const counterSpinClass = spinDir === 'ccw' ? 'spin-cw-inline' : 'spin-ccw-inline';
    const count = Math.max(1, itemsInOrbit.length);

    return itemsInOrbit.map((item, idx) => {
      const angle = item.angle !== undefined ? item.angle : Math.round(idx * (360 / count));
      const rad = (angle * Math.PI) / 180;
      const defaultRadius = orbitNumber === 1 ? 295 : 390;
      const radius = item.radius || defaultRadius;
      const x = Math.round(radius * Math.cos(rad));
      const y = Math.round(radius * Math.sin(rad));
      const size = item.size || (orbitNumber === 1 ? 72 : 70);

      return (
        <div
          key={item.id || `orbit-${orbitNumber}-${idx}`}
          id={item.id}
          className="absolute top-1/2 left-1/2 pointer-events-auto group z-20"
          style={{
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
          }}
        >
          <div
            style={{
              animation: `avatar-fly-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${
                item.flyInDelay || 0.4 + idx * 0.2
              }s both`,
            }}
          >
            <div
              className={`${counterSpinClass} relative flex items-center justify-center`}
              style={{
                animationDuration: `${durationSec}s`,
              }}
            >
              {/* Active Planet: Click directly navigates to client e-commerce store */}
              <button
                type="button"
                onClick={() => handlePlanetClick(item)}
                className="relative rounded-full bg-white border-2 border-[#1E3A5F] flex items-center justify-center transition-all duration-300 group-hover:scale-115 shadow-[0_6px_20px_rgba(30,58,95,0.22)] group-hover:shadow-[0_8px_25px_rgba(56,189,248,0.45)] group-hover:border-[#0EA5E9] cursor-pointer overflow-hidden p-1.5 bg-white/95"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                }}
                title={
                  isEditableInCanvas
                    ? `Click to edit rotating sites: ${item.name}`
                    : `Open ${item.name} (${item.sublabel})`
                }
              >
                {/* 1. Custom Uploaded Logo Image */}
                {item.logoUrl ? (
                  <img
                    src={item.logoUrl}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-full select-none p-1 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : item.faviconDomain ? (
                  /* 2. Official Store Favicon */
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${item.faviconDomain}&sz=128`}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-full select-none p-1 transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  /* 3. Fallback Monogram */
                  <div className="font-urbanist font-extrabold text-xs text-[#1E3A5F] select-none absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#EFF6FB] to-[#DBEAFE]">
                    <span className="text-xs font-bold text-[#1E3A5F]">
                      {item.fallbackInitials || 'ST'}
                    </span>
                  </div>
                )}

                {/* Corner Store External Link Indicator Badge */}
                <div className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1E3A5F] group-hover:bg-[#0EA5E9] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xs">
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </button>

              {/* Hover Tooltip Card */}
              <div className="absolute -bottom-11 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none bg-[#1E3A5F] text-white border border-[#38BDF8]/50 px-3 py-1.5 rounded-xl text-center z-40 shadow-2xl whitespace-nowrap min-w-[130px]">
                <div className="font-bold text-xs text-[#7DD3FC] flex items-center justify-center gap-1.5">
                  <span>{item.name}</span>
                  <ExternalLink className="w-3 h-3 text-[#38BDF8]" />
                </div>
                <div className="text-[10px] text-white/85 font-medium">{item.sublabel}</div>
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

      {/* Center Hub: Russell's Portrait with Random Shape Changing Animation & Translucent Cyan Glow */}
      <div
        id="center-curve-hub"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] flex items-center justify-center z-10 select-none group"
      >
        <RussellPortrait
          className="w-[480px] h-[480px]"
          blobVariant="white"
          enableRandomShapeInteraction={true}
          customPhotoUrl={activeCenterPhoto}
        />
      </div>
    </div>
  );
};
