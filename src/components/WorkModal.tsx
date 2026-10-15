import React from 'react';
import { X, ShoppingBag, FileText, Headphones, Video, CheckCircle2, ArrowRight } from 'lucide-react';
import { PROJECTS, SERVICES, PERSONAL_INFO } from '../data/portfolioData';

interface WorkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHire: () => void;
}

export const WorkModal: React.FC<WorkModalProps> = ({ isOpen, onClose, onOpenHire }) => {
  if (!isOpen) return null;

  const iconMap: Record<string, React.ReactNode> = {
    ShoppingBag: <ShoppingBag className="w-5 h-5 text-[#2F5D3A]" />,
    FileText: <FileText className="w-5 h-5 text-[#2F5D3A]" />,
    Headphones: <Headphones className="w-5 h-5 text-[#2F5D3A]" />,
    Video: <Video className="w-5 h-5 text-[#2F5D3A]" />,
  };

  return (
    <div
      id="work-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-down"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        id="work-modal-dialog"
        className="relative w-full max-w-4xl bg-[#F2F2EE] border-2 border-[#C9DAB0] rounded-2xl shadow-[0_25px_70px_rgba(47,93,58,0.35)] text-[#2F5D3A] overflow-hidden max-h-[90vh] flex flex-col font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9DAB0] bg-[#2F5D3A] text-[#F2F2EE]">
          <div>
            <h2 className="text-lg font-urbanist font-bold text-[#F2F2EE] flex items-center gap-2">
              Services & Selected Work
            </h2>
            <p className="text-xs text-[#D4E2B0] font-medium">
              E-commerce Catalog Management, Operations & Multimedia Production
            </p>
          </div>

          <button
            id="close-work-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F2F2EE]/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Services Section */}
          <div className="space-y-4">
            <h3 className="text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
              What Russell Does
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICES.map((s, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border-2 border-[#C9DAB0] hover:border-[#2F5D3A] transition-all space-y-2.5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#C9DAB0]/40 border border-[#2F5D3A]/30">
                      {iconMap[s.iconName] || <ShoppingBag className="w-5 h-5 text-[#2F5D3A]" />}
                    </div>
                    <h4 className="font-bold text-[#2F5D3A] text-sm">{s.title}</h4>
                  </div>
                  <p className="text-xs text-[#2F5D3A]/90 leading-relaxed font-medium">{s.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] bg-[#C9DAB0] text-[#2F5D3A] font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Work Showcase */}
          <div className="space-y-4">
            <h3 className="text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
              Selected Work & Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PROJECTS.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white border-2 border-[#C9DAB0] hover:border-[#2F5D3A] flex flex-col justify-between space-y-3 shadow-sm transition-all"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#3A6B4A] block mb-1">
                      {proj.tag}
                    </span>
                    <h4 className="font-bold text-[#2F5D3A] text-sm mb-2">{proj.title}</h4>
                    <p className="text-xs text-[#2F5D3A]/90 leading-relaxed mb-3 font-medium">{proj.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t-2 border-[#C9DAB0]/50">
                    <div className="text-[11px] font-bold text-[#2F5D3A] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F5D3A]" />
                      <span>{proj.metrics}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {proj.skills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded text-[10px] bg-[#C9DAB0]/50 text-[#2F5D3A] font-semibold"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hire CTA Box */}
          <div className="p-5 rounded-xl bg-[#C9DAB0]/30 border-2 border-[#3A6B4A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-urbanist font-bold text-base text-[#2F5D3A]">
                Have a store catalog or operations need?
              </h4>
              <p className="text-xs text-[#3A6B4A] font-semibold">
                Russell is available for full-time or part-time remote contract work.
              </p>
            </div>
            <button
              id="work-hire-btn"
              type="button"
              onClick={() => {
                onClose();
                onOpenHire();
              }}
              className="btn-join flex-none text-xs px-5 py-2.5 font-bold"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <span>Start Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
