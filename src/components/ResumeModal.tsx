import React from 'react';
import { X, Download, Briefcase, Award, Monitor, Globe } from 'lucide-react';
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
        className="relative w-full max-w-4xl bg-[#EFF6FB] border-2 border-[#BCD5E6] rounded-2xl shadow-[0_25px_70px_rgba(30,58,95,0.35)] text-[#1E3A5F] overflow-hidden max-h-[90vh] flex flex-col font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#BCD5E6] bg-[#1E3A5F] text-white">
          <div className="flex items-center gap-3">
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="w-10 h-10 rounded-full border-2 border-[#38BDF8] object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <h2 className="text-lg font-urbanist font-bold text-white flex items-center gap-2">
                {PERSONAL_INFO.name}
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                  CV / Resume
                </span>
              </h2>
              <p className="text-xs text-[#BAE6FD] font-medium">{PERSONAL_INFO.role}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="download-resume-pdf-btn"
              href={PERSONAL_INFO.resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-[#2D5D86] hover:bg-[#1E3A5F] border border-[#38BDF8]/50 text-xs font-semibold text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>PDF Resume ↗</span>
            </a>

            <button
              id="close-resume-modal-btn"
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8 text-sm">
          {/* Summary Banner */}
          <div className="p-5 rounded-xl bg-[#E0F2FE]/40 border-2 border-[#38BDF8]/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#1E3A5F] block">
                Professional Profile
              </span>
              <p className="text-xs text-[#1E3A5F] leading-relaxed max-w-2xl font-medium">
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
              <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#1E3A5F] border-b-2 border-[#BCD5E6] pb-2">
                <Briefcase className="w-5 h-5 text-[#0EA5E9]" />
                <span>Professional Experience</span>
              </div>

              <div className="space-y-6">
                {EXPERIENCES.map((exp, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border-2 transition-all bg-white ${
                      exp.featured
                        ? 'border-[#1E3A5F] shadow-md'
                        : 'border-[#BCD5E6] shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <h4 className="font-bold text-[#1E3A5F] text-base">
                        {exp.title}
                      </h4>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD] self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs text-[#2D5D86] font-bold mb-3">
                      {exp.company}
                    </div>

                    <ul className="space-y-2">
                      {exp.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs text-[#1E3A5F]/90 font-medium flex items-start gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#0EA5E9] mt-1 flex-none" />
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
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#1E3A5F] border-b-2 border-[#BCD5E6] pb-2">
                  <Award className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Tech Stack & Tools</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CORE_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-white border-2 border-[#BCD5E6] text-[#1E3A5F] hover:border-[#1E3A5F] transition-colors shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Remote Readiness */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#1E3A5F] border-b-2 border-[#BCD5E6] pb-2">
                  <Monitor className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Remote Hardware Setup</span>
                </div>
                <div className="space-y-2.5 text-xs text-[#1E3A5F]">
                  <div className="p-3 rounded-lg bg-white border-2 border-[#BCD5E6] shadow-xs">
                    <strong className="text-[#2D5D86] block mb-0.5 font-bold">High-Speed Internet:</strong>
                    {PERSONAL_INFO.internet}
                  </div>
                  <div className="p-3 rounded-lg bg-white border-2 border-[#BCD5E6] shadow-xs">
                    <strong className="text-[#2D5D86] block mb-0.5 font-bold">Workstation:</strong>
                    {PERSONAL_INFO.equipment}
                  </div>
                  <div className="p-3 rounded-lg bg-white border-2 border-[#BCD5E6] shadow-xs">
                    <strong className="text-[#2D5D86] block mb-0.5 font-bold">Timezones Supported:</strong>
                    {PERSONAL_INFO.availabilityDetails}
                  </div>
                </div>
              </div>

              {/* Languages & Location */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-base font-urbanist font-bold text-[#1E3A5F] border-b-2 border-[#BCD5E6] pb-2">
                  <Globe className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Languages</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {PERSONAL_INFO.languages.map((l) => (
                    <div key={l.lang} className="p-2.5 rounded-lg bg-white border-2 border-[#BCD5E6] text-center shadow-xs">
                      <div className="font-bold text-[#1E3A5F]">{l.lang}</div>
                      <div className="text-[11px] font-semibold text-[#2D5D86]">{l.level}</div>
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
