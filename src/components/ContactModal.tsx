import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Check, Send, Clock, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: 'Shopify / E-commerce Management',
    worktype: 'Full-time',
    timezone: 'EST (9 AM - 5 PM)',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Work Inquiry from ${formData.name}${formData.company ? ' - ' + formData.company : ''}`;
    const body = `Hi Russell,\n\nMy name is ${formData.name}.\nEmail: ${formData.email}\nCompany / Brand: ${formData.company || 'Not provided'}\nService Needed: ${formData.service}\nWork Type: ${formData.worktype}\nTime Zone / Schedule: ${formData.timezone || 'Not provided'}\n\nProject Details:\n${formData.message}\n\nThank you!`;

    setSentSuccess(true);

    // Open user's mail client
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-down"
      style={{ animationDuration: '0.3s' }}
      onClick={onClose}
    >
      <div
        id="contact-modal-dialog"
        className="relative w-full max-w-2xl bg-[#F2F2EE] border-2 border-[#C9DAB0] rounded-2xl shadow-[0_20px_60px_rgba(47,93,58,0.3)] text-[#2F5D3A] overflow-hidden max-h-[90vh] flex flex-col font-inter"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#C9DAB0] bg-[#2F5D3A] text-[#F2F2EE]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C9DAB0] flex items-center justify-center text-[#2F5D3A]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-urbanist font-bold tracking-tight text-[#F2F2EE]">
                Hire Russell Taga-an
              </h2>
              <p className="text-xs text-[#C9DAB0]">
                Direct Inquiry & Project Consultation
              </p>
            </div>
          </div>
          <button
            id="close-contact-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#F2F2EE]/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Contact Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div
              onClick={handleCopyEmail}
              className="cursor-pointer p-3 rounded-xl bg-white border-2 border-[#C9DAB0] hover:border-[#3A6B4A] transition-all flex items-center gap-3 group shadow-sm"
            >
              <Mail className="w-4 h-4 text-[#2F5D3A] group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#3A6B4A] block">Email</span>
                <span className="text-xs font-bold text-[#2F5D3A] truncate block">
                  {copiedEmail ? 'Copied to Clipboard!' : PERSONAL_INFO.email}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border-2 border-[#C9DAB0] flex items-center gap-3 shadow-sm">
              <Phone className="w-4 h-4 text-[#2F5D3A]" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#3A6B4A] block">Phone</span>
                <span className="text-xs font-bold text-[#2F5D3A] truncate block">
                  {PERSONAL_INFO.phone}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border-2 border-[#C9DAB0] flex items-center gap-3 shadow-sm">
              <MapPin className="w-4 h-4 text-[#2F5D3A]" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#3A6B4A] block">Location</span>
                <span className="text-xs font-bold text-[#2F5D3A] truncate block">
                  {PERSONAL_INFO.location}
                </span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form id="hire-contact-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] focus:ring-1 focus:ring-[#2F5D3A] transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] focus:ring-1 focus:ring-[#2F5D3A] transition-all font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Company / Store
                </label>
                <input
                  id="contact-company"
                  type="text"
                  placeholder="e.g. Willow Bath / Brand"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] focus:ring-1 focus:ring-[#2F5D3A] transition-all font-medium"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Service Needed
                </label>
                <select
                  id="contact-service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] transition-all font-medium"
                >
                  <option value="Shopify / E-commerce Management">Shopify / E-commerce Management</option>
                  <option value="Product Listing & Catalog Cleanup">Product Listing & Catalog Cleanup</option>
                  <option value="Home Depot / Multi-Channel Operations">Home Depot / Multi-Channel Operations</option>
                  <option value="Inventory & Order Support">Inventory & Order Support</option>
                  <option value="Video Editing & Creative Content">Video Editing & Creative Content</option>
                  <option value="Virtual Assistant & Data Entry">Virtual Assistant & Data Entry</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Work Type
                </label>
                <select
                  id="contact-worktype"
                  value={formData.worktype}
                  onChange={(e) => setFormData({ ...formData, worktype: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] transition-all font-medium"
                >
                  <option value="Full-time">Full-time Remote</option>
                  <option value="Part-time">Part-time Remote</option>
                  <option value="Project-based">Project-based / One-time</option>
                  <option value="Contract">Hourly Contract</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                  Timezone / Schedule
                </label>
                <input
                  id="contact-timezone"
                  type="text"
                  placeholder="e.g. EST 9am-5pm, PST, AEST"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#2F5D3A] block mb-1.5">
                Project & Role Details *
              </label>
              <textarea
                id="contact-message"
                required
                rows={3}
                placeholder="Tell Russell about the store, catalog size, tasks, tools, or schedule you need support with..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border-2 border-[#C9DAB0] text-sm text-[#2F5D3A] focus:outline-none focus:border-[#2F5D3A] focus:ring-1 focus:ring-[#2F5D3A] transition-all resize-none font-medium"
              />
            </div>

            {sentSuccess && (
              <div className="p-3 rounded-lg bg-[#C9DAB0]/40 border-2 border-[#3A6B4A] text-[#2F5D3A] text-xs flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-[#2F5D3A] flex-none" />
                <span>Your email application has been launched with your prepared inquiry!</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between gap-4">
              <div className="flex items-center gap-1.5 text-[11px] text-[#3A6B4A] font-semibold">
                <Clock className="w-3.5 h-3.5 text-[#2F5D3A]" />
                <span>Fast response within 12-24 hours</span>
              </div>

              <button
                id="submit-hire-inquiry-btn"
                type="submit"
                className="btn-join cursor-pointer px-6 py-2.5 flex items-center gap-2 text-sm font-semibold"
              >
                <Send className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Send Inquiry →</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
