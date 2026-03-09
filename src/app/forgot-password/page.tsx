'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import Link from 'next/link';
import { Mail, KeyRound, ArrowRight, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);
    const result = await resetPassword(email);
    if (result.success) {
      setSuccess(result.error || 'تم إعادة تعيين كلمة المرور بنجاح');
      setError('');
    } else {
      setError(result.error || 'حدث خطأ');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top gradient section */}
      <div className="gradient-primary pt-16 pb-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-12 right-6 w-24 h-24 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-6 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <KeyRound className="text-white" size={40} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">نسيت كلمة المرور؟</h1>
          <p className="text-white/70 text-sm">أدخل بريدك الإلكتروني لاستعادة كلمة المرور</p>
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 -mt-12 px-5">
        <div className="glass-card rounded-3xl p-6 max-w-md mx-auto">
          {error && (
            <div className="bg-danger/10 border border-danger/20 rounded-xl p-3 mb-4">
              <p className="text-sm text-danger font-medium">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-success/10 border border-success/20 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-2">
                <CheckCircle size={20} className="text-success mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-success font-bold mb-1">تم بنجاح!</p>
                  <p className="text-sm text-success/80 whitespace-pre-line">{success}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-input-bg border border-border rounded-xl pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  dir="ltr"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-primary text-white py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <KeyRound size={18} />
                  <span>استعادة كلمة المرور</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-primary font-bold hover:text-primary-dark transition-colors">
              <ArrowRight size={16} />
              <span>العودة لتسجيل الدخول</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
