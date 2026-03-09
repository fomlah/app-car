import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BASE_URL } from '../services/api';

type SiteSettings = {
  name: string;
  description: string;
  logoUrl: string;
  faviconUrl: string;
};

type SiteSettingsContextValue = {
  settings: SiteSettings;
  loading: boolean;
  refresh: () => Promise<void>;
};

const DEFAULT_SETTINGS: SiteSettings = {
  name: '',
  description: '',
  logoUrl: '',
  faviconUrl: '',
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/public/settings`);
      const data = await res.json();
      if (res.ok && data?.settings) {
        setSettings({
          name: data.settings['site.name'] || '',
          description: data.settings['site.description'] || '',
          logoUrl: data.settings['site.logoUrl'] || '',
          faviconUrl: data.settings['site.faviconUrl'] || '',
        });
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ settings, loading, refresh }), [settings, loading, refresh]);

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) throw new Error('useSiteSettings must be used within SiteSettingsProvider');
  return ctx;
}
