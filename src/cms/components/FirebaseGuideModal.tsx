import React, { useState } from 'react';
import { X, Flame, CheckCircle2, Copy, Check, Database, ShieldCheck, HardDrive } from 'lucide-react';

interface FirebaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FirebaseGuideModal: React.FC<FirebaseGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const firestoreRulesSample = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Pages collection: public read, authenticated author/admin write
    match /pages/{pageId} {
      allow read: if true; // Public visitors can view pages
      allow write: if request.auth != null; // Authenticated CMS admins
    }

    // Media library metadata collection
    match /media_library/{mediaId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`;

  const firebaseConfigSample = `// src/cms/services/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);`;

  return (
    <div className="fixed inset-0 z-50 bg-[#1E3A5F]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl border-2 border-[#BCD5E6] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-fade-up font-inter">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#1E3A5F] to-[#2D5D86] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400 text-slate-900 shadow-md">
              <Flame className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <h2 className="font-urbanist font-extrabold text-base sm:text-lg">
                Firebase Firestore & Storage Integration Guide
              </h2>
              <p className="text-xs text-sky-200">
                Seamless drop-in cloud backend transition checklist
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-[#1E3A5F]">
          {/* Quick Summary Pill */}
          <div className="p-3.5 rounded-xl bg-[#EFF6FB] border border-[#BCD5E6] flex items-start gap-3">
            <Database className="w-5 h-5 text-[#0EA5E9] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-[#1E3A5F]">
                100% Normalized NoSQL Architecture
              </h4>
              <p className="text-[11px] text-[#2D5D86] mt-0.5 leading-relaxed">
                The current system runs via <code>LocalStorageContentService</code> implementing the <code>ContentRepository</code> contract. All document schemas, section hierarchies, and media structures strictly conform to Firestore limits and serverTimestamp conventions.
              </p>
            </div>
          </div>

          {/* 4-Step Checklist */}
          <div>
            <h3 className="font-urbanist font-extrabold text-sm text-[#1E3A5F] mb-3">
              Activation Checklist (4 Easy Steps)
            </h3>
            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Install the Firebase SDK',
                  cmd: 'npm install firebase',
                  detail: 'Add the official Firebase Web SDK to your package.json dependencies.',
                },
                {
                  step: '2',
                  title: 'Configure Environment Variables',
                  cmd: 'VITE_FIREBASE_API_KEY=AIzaSy...\nVITE_FIREBASE_PROJECT_ID=your-project',
                  detail: 'Populate your .env or .env.local file with your Firebase credentials.',
                },
                {
                  step: '3',
                  title: 'Switch Service Provider Flag',
                  cmd: "export const USE_FIREBASE_BACKEND = true; // in src/cms/services/ContentServiceFactory.ts",
                  detail: 'Toggle the single boolean flag in ContentServiceFactory to swap LocalStorage for Firestore.',
                },
                {
                  step: '4',
                  title: 'Deploy Firestore Security Rules',
                  cmd: 'firebase deploy --only firestore:rules',
                  detail: 'Secure public read access for storefront visitors while restricting edits to authorized users.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="p-3.5 rounded-xl border border-[#BCD5E6] bg-white flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-[#1E3A5F] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    {item.step}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-[#1E3A5F]">{item.title}</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 mb-1.5">{item.detail}</p>
                    <pre className="p-2 rounded-lg bg-slate-900 text-sky-300 font-mono text-[10px] overflow-x-auto">
                      {item.cmd}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Firestore Security Rules Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#1E3A5F] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>firestore.rules (Production Security Rules)</span>
              </span>
              <button
                type="button"
                onClick={() => handleCopy(firestoreRulesSample, 'rules')}
                className="px-2 py-1 rounded bg-[#EFF6FB] hover:bg-[#E0F2FE] border border-[#BCD5E6] text-[10px] font-bold text-[#1E3A5F] flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'rules' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Rules</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto leading-relaxed border border-slate-800">
              {firestoreRulesSample}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#F4F8FB] border-t border-[#BCD5E6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
