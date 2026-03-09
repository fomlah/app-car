'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/lib/theme';
import { AuthProvider } from '@/lib/auth';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
