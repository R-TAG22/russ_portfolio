import React from 'react';
import { X, Download, ExternalLink, Briefcase, Award, Monitor, Globe, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, CORE_SKILLS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHire: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onOpenHire }) => {
  if (!isOpen) return null;

  return (
    <div
      id="resume-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-down"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        id="resume-modal-dialog"
        className="relative w-full max-w-4xl bg-[#F2F2EE] border-2 border-[#C9DAB0] rounded-2xl shadow-[0_25px_70px_rgba(47,93,58,0.35)] text-[#2F5D3A] overflow-hidden max-h-[90vh] flex flex-col font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#C9DAB0] bg-[#2F5D3A] text-[#F2F2EE]">
          <div className="flex items-center gap-3">
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="w-10 h-10 rounded-full border-2 border-[#C9DAB0] object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-urbanist font-bold text-[#F2F2EE] flex items-center gap-2">
                {PERSONAL_INFO.name}
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C9DAB0] text-[#2F5D3A]">
                  CV / Resume
                </span>
              </h2>
              <p className="text-xs text-[#D4E2B0] font-medium">{PERSONAL_INFO.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="download-resume-pdf-btn"
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#3A6B4A] hover:bg-[#2F5D3A] border border-[#C9DAB0] text-xs font-semibold text-[#F2F2EE] flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF Resume ↗</span>
            </a>

            <button
              id="close-resume-modal-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#F2F2EE]/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm">
          {/* Summary Banner */}
          <div className="p-5 rounded-xl bg-[#C9DAB0]/30 border-2 border-[#3A6B4A]/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#2F5D3A] block">
                Professional Profile
              </span>
              <p className="text-xs text-[#2F5D3A] leading-relaxed max-w-2xl font-medium">
                {PERSONAL_INFO.summary}
              </p>
            </div>
            <button
              id="resume-hire-now-btn"
              type="button"
              onClick={() => {
                onClose();
                onOpenHire();
              }}
              className="btn-join flex-none text-xs px-5 py-2.5 self-start md:self-center font-bold"
            >
              <span className="relative z-10">Hire Russell →</span>
            </button>
          </div>

          {/* Timeline & Sidebar Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Experience */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
                <Briefcase className="w-5 h-5 text-[#2F5D3A]" />
                <span>Professional Experience</span>
              </div>

              <div className="space-y-6">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border-2 transition-all bg-white ${
                      exp.featured
                        ? 'border-[#2F5D3A] shadow-md'
                        : 'border-[#C9DAB0] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-[#2F5D3A] text-base">
                        {exp.title}
                      </h4>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#C9DAB0] text-[#2F5D3A] self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs text-[#3A6B4A] font-bold mb-3">
                      {exp.company}
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs text-[#2F5D3A]/90 font-medium flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#2F5D3A] mt-1 flex-none" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Skills & Remote Hardware */}
            <div className="space-y-6">
              {/* Core Strengths */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
                  <Award className="w-4 h-4 text-[#2F5D3A]" />
                  <span>Tech Stack & Tools</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CORE_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white border-2 border-[#C9DAB0] text-[#2F5D3A] hover:border-[#2F5D3A] transition-colors shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remote Readiness */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
                  <Monitor className="w-4 h-4 text-[#2F5D3A]" />
                  <span>Remote Hardware Setup</span>
                </div>
                <div className="space-y-2.5 text-xs text-[#2F5D3A]">
                  <div className="p-3 rounded-lg bg-white border-2 border-[#C9DAB0] shadow-xs">
                    <strong className="text-[#3A6B4A] block mb-0.5 font-bold">High-Speed Internet:</strong>
                    {PERSONAL_INFO.internet}
                  </div>
                  <div className="p-3 rounded-lg bg-white border-2 border-[#C9DAB0] shadow-xs">
                    <strong className="text-[#3A6B4A] block mb-0.5 font-bold">Workstation:</strong>
                    {PERSONAL_INFO.equipment}
                  </div>
                  <div className="p-3 rounded-lg bg-white border-2 border-[#C9DAB0] shadow-xs">
                    <strong className="text-[#3A6B4A] block mb-0.5 font-bold">Timezones Supported:</strong>
                    {PERSONAL_INFO.availabilityDetails}
                  </div>
                </div>
              </div>

              {/* Languages & Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#2F5D3A] border-b-2 border-[#C9DAB0] pb-2">
                  <Globe className="w-4 h-4 text-[#2F5D3A]" />
                  <span>Languages</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {PERSONAL_INFO.languages.map((l) => (
                    <div key={l.lang} className="p-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-center shadow-xs">
                      <div className="font-bold text-[#2F5D3A]">{l.lang}</div>
                      <div className="text-[11px] font-semibold text-[#3A6B4A]">{l.level}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
