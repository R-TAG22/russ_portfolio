import React, { useState } from 'react';
import {
  Lock,
  User,
  KeyRound,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useAuth, DEFAULT_ADMIN_CREDENTIALS } from './AuthContext';

interface AdminLoginScreenProps {
  onReturnToHome: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({ onReturnToHome }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide both username and password.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    const result = await login(username, password);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Authentication failed.');
    }
  };

  const handleFillDemo = () => {
    setUsername(DEFAULT_ADMIN_CREDENTIALS.username);
    setPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div
      id="admin-login-screen"
      className="w-full flex-1 min-h-screen flex items-center justify-center p-4 sm:p-6 font-inter text-[#1E3A5F] select-none"
      style={{
        background: `
          radial-gradient(ellipse at 80% 30%, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.08) 40%, transparent 70%),
          radial-gradient(circle at 15% 75%, rgba(30, 58, 95, 0.12) 0%, transparent 60%),
          #F4F8FB
        `,
      }}
    >
      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border-2 border-[#BCD5E6] shadow-2xl p-6 sm:p-8 animate-fade-up">
        {/* Top Return Button */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#BCD5E6]/60">
          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2D5D86] hover:text-[#0EA5E9] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
            Protected Area
          </span>
        </div>

        {/* Lock Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#1E3A5F] to-[#0EA5E9] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-sky-500/20">
            <Lock className="w-7 h-7 text-[#7DD3FC]" />
          </div>
          <h2 className="font-urbanist font-extrabold text-2xl text-[#1E3A5F] tracking-tight">
            Operations CMS
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            Authorized administrative access for catalog systems, layouts, and page architecture.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1.5">Administrator Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                className="w-full pl-9.5 pr-3 py-2.5 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all shadow-2xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#1E3A5F] mb-1.5">Secure Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-9.5 pr-10 py-2.5 rounded-xl border border-[#BCD5E6] bg-white text-[#1E3A5F] font-semibold focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-[#1E3A5F] cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 rounded-xl bg-[#1E3A5F] hover:bg-[#2D5D86] text-white font-extrabold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Login to Operations CMS'}</span>
            <ArrowRight className="w-4 h-4 text-[#7DD3FC]" />
          </button>
        </form>

        {/* Prototype Credential Helper */}
        <div className="mt-6 pt-4 border-t border-[#BCD5E6]/60 text-center">
          <div className="p-2.5 rounded-xl bg-[#F0F9FF] border border-[#BAE6FD] text-[11px] text-[#0369A1] flex items-center justify-between">
            <div className="text-left">
              <span className="font-bold block">Prototype Credentials:</span>
              <span className="font-mono text-[10px] text-slate-600">
                admin / operations2026
              </span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#BAE6FD] hover:bg-[#E0F2FE] font-bold text-[10px] text-[#0284C7] transition-all cursor-pointer shadow-2xs"
            >
              Auto-fill
            </button>
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Session persistence active in browser sessionStorage</span>
          </div>
        </div>
      </div>
    </div>
  );
};
