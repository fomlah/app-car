'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LABELS } from '@/constants/labels';
import {
  LayoutGrid,
  BarChart3,
  Plus,
  Wallet,
  User,
} from 'lucide-react';

const navItems = [
  { href: '/', label: LABELS.nav.home, icon: LayoutGrid },
  { href: '/reports', label: LABELS.nav.reports, icon: BarChart3 },
  { href: '/add', label: LABELS.nav.add, icon: Plus, isCenter: true },
  { href: '/goals', label: LABELS.nav.goals, icon: Wallet },
  { href: '/profile', label: LABELS.nav.profile, icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 w-full bg-card border-t border-border pb-6 pt-3 px-6 z-40">
      <ul className="flex justify-between items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === '/add' && (pathname === '/income' || pathname === '/expense'));
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <li key={item.href}>
                <div className="relative -top-8">
                  <Link href={item.href}>
                    <div className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-black hover:scale-105 transition-transform active:scale-95">
                      <Icon size={28} strokeWidth={2.5} />
                    </div>
                  </Link>
                </div>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-muted hover:text-foreground'
                }`}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
