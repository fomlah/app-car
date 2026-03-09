'use client';

import { useAuth } from '@/lib/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const publicPaths = ['/login', '/register', '/forgot-password', '/onboarding'];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const isPublic = publicPaths.includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (loading) return;

    // Not logged in → redirect to login
    if (!user && !isPublic) {
      router.replace('/login');
      return;
    }

    // Logged in on public page → redirect based on role
    if (user && isPublic) {
      router.replace(isAdmin ? '/admin' : '/');
      return;
    }

    // Non-admin trying to access admin routes → redirect to home
    if (user && isAdminRoute && !isAdmin) {
      router.replace('/');
      return;
    }
  }, [user, loading, pathname, router, isPublic, isAdminRoute, isAdmin]);

  if (!isClient || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background" suppressHydrationWarning>
        <div className="flex flex-col items-center gap-3" suppressHydrationWarning>
          <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" suppressHydrationWarning />
          <p className="text-muted text-sm font-medium">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!user && !isPublic) return null;
  if (user && isPublic) return null;
  if (user && isAdminRoute && !isAdmin) return null;

  return <>{children}</>;
}
