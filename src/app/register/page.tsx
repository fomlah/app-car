'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { LABELS } from '@/constants/labels';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from 'lucide-react';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError(LABELS.common.fillAllFields);
      return;
    }
    if (password.length < 6) {
      setError(LABELS.common.passwordMinLength);
      return;
    }
    if (password !== confirmPassword) {
      setError(LABELS.common.passwordMismatch);
      return;
    }
    setError('');
    setLoading(true);
    const result = await register(name, email, password);
    if (result.success) {
      router.replace('/');
    } else {
      setError(result.error || LABELS.common.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#112117] relative overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#20df6c]/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#20df6c]/5 blur-[100px]" />
      </div>

      <main className="relative z-10 flex-1 w-full max-w-md mx-auto px-6 py-8 flex flex-col justify-center">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{LABELS.common.register}</h1>
          <p className="text-[#9db9a8] text-sm font-medium">{LABELS.common.registerSubtitle}</p>
        </header>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-5">
            <p className="text-sm text-red-400 font-medium text-center">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div className="group flex items-center bg-[#1c2e24] rounded-xl border-2 border-transparent focus-within:border-[#20df6c] transition-all overflow-hidden">
            <div className="px-4 text-[#9db9a8] group-focus-within:text-[#20df6c] transition-colors">
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder={LABELS.common.name}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-14 bg-transparent border-none text-white placeholder-[#9db9a8] focus:ring-0 text-base"
            />
          </div>

          {/* Email */}
          <div className="group flex items-center bg-[#1c2e24] rounded-xl border-2 border-transparent focus-within:border-[#20df6c] transition-all overflow-hidden">
            <div className="px-4 text-[#9db9a8] group-focus-within:text-[#20df6c] transition-colors">
              <Mail size={20} />
            </div>
            <input
              type="email"
              placeholder={LABELS.common.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 bg-transparent border-none text-white placeholder-[#9db9a8] focus:ring-0 text-base"
              dir="ltr"
            />
          </div>

          {/* Password */}
          <div className="group flex items-center bg-[#1c2e24] rounded-xl border-2 border-transparent focus-within:border-[#20df6c] transition-all overflow-hidden">
            <div className="px-4 text-[#9db9a8] group-focus-within:text-[#20df6c] transition-colors">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={LABELS.common.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 bg-transparent border-none text-white placeholder-[#9db9a8] focus:ring-0 text-base"
              dir="ltr"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="px-4 text-[#9db9a8] hover:text-white transition-colors">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="group flex items-center bg-[#1c2e24] rounded-xl border-2 border-transparent focus-within:border-[#20df6c] transition-all overflow-hidden">
            <div className="px-4 text-[#9db9a8] group-focus-within:text-[#20df6c] transition-colors">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={LABELS.common.confirmPassword}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-14 bg-transparent border-none text-white placeholder-[#9db9a8] focus:ring-0 text-base"
              dir="ltr"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-[#20df6c] hover:bg-[#1bc65f] active:scale-[0.98] text-[#112117] font-bold text-lg rounded-xl h-14 transition-all shadow-[0_0_20px_rgba(32,223,108,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-[#112117] border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{LABELS.common.register}</span>
                <ArrowLeft size={20} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-[#9db9a8] text-sm">
            {LABELS.common.alreadyHaveAccount}{' '}
            <Link href="/login" className="text-white font-semibold hover:text-[#20df6c] transition-colors mr-1">
              {LABELS.common.login}
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
