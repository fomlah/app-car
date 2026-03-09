'use client';

import { usePathname } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import BottomNav from '@/components/BottomNav';

const publicPaths = ['/login', '/register', '/forgot-password', '/onboarding'];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublic = publicPaths.includes(pathname);
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <AuthGuard>
      {isPublic || isAdminRoute ? (
        <>{children}</>
      ) : (
        <>
          <main className="max-w-[480px] mx-auto min-h-screen">
            {children}
          </main>
          <BottomNav />
        </>
      )}
    </AuthGuard>
  );
}
