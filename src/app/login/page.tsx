'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { LABELS } from '@/constants/labels';
import Link from 'next/link';
import { Car, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const seen = localStorage.getItem('onboarding_done');
      if (!seen) {
        router.replace('/onboarding');
        return;
      }
    } catch {}
    setReady(true);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError(LABELS.common.fillAllFields || 'يرجى ملء جميع الحقول');
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (result.success) {
      router.replace(result.role === 'ADMIN' ? '/admin' : '/');
    } else {
      setError(result.error || LABELS.common.error);
    }
    setLoading(false);
  };

  if (!ready) {
    return <div className="min-h-screen bg-[#112117]" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#112117] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#20df6c]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#20df6c]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 py-8 flex flex-col items-center">
        {/* Logo & Welcome */}
        <div className="flex flex-col items-center gap-5 mb-10">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#20df6c]/20 to-[#20df6c]/5 flex items-center justify-center border border-[#20df6c]/20 shadow-[0_0_30px_-10px_rgba(32,223,108,0.3)]">
            <Car className="text-[#20df6c]" size={36} />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">{LABELS.common.welcomeBack || 'مرحباً بك مجدداً'}</h1>
            <p className="text-slate-400 text-sm font-medium">{LABELS.common.loginSubtitle || 'سجل الدخول لمتابعة أرباحك ومصروفاتك'}</p>
          </div>
        </div>

        {error && (
          <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-5">
            <p className="text-sm text-red-400 font-medium text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20df6c] mr-1">{LABELS.common.email}</label>
            <div className="group flex items-center bg-[#203328] rounded-xl border border-white/5 focus-within:border-[#20df6c]/50 focus-within:ring-1 focus-within:ring-[#20df6c]/30 transition-all overflow-hidden">
              <div className="px-4 text-slate-400 group-focus-within:text-[#20df6c] transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="example@driver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-base font-normal"
                dir="ltr"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#20df6c] mr-1">كلمة المرور</label>
            <div className="group flex items-center bg-[#203328] rounded-xl border border-white/5 focus-within:border-[#20df6c]/50 focus-within:ring-1 focus-within:ring-[#20df6c]/30 transition-all overflow-hidden">
              <div className="px-4 text-slate-400 group-focus-within:text-[#20df6c] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-transparent border-none text-white placeholder-slate-500 focus:ring-0 text-base font-normal"
                dir="ltr"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-4 text-slate-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-slate-400 hover:text-[#20df6c] transition-colors">
              هل نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#20df6c] hover:bg-[#1bc65f] text-[#112117] font-bold h-14 rounded-xl text-lg mt-2 transition-all active:scale-[0.98] shadow-[0_4px_20px_-5px_rgba(32,223,108,0.4)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#112117] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>تسجيل الدخول</span>
                <ArrowLeft size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            ليس لديك حساب؟{' '}
            <Link href="/register" className="text-[#20df6c] font-bold hover:underline mr-1">
              سجل الآن
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
