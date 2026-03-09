import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import AppShell from "@/components/AppShell";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const defaultTitle = "إدارة دخل السائق";
  const defaultDescription = "تطبيق لإدارة دخل السائق من شركات النقل وتتبع المصاريف والأرباح";

  try {
    const keys = ['site.name', 'site.description', 'site.faviconUrl'];
    const rows = await prisma.settings.findMany({ where: { key: { in: keys } } });
    const map: Record<string, string> = {};
    for (const r of rows) map[r.key] = r.value;

    const title = map['site.name'] || defaultTitle;
    const description = map['site.description'] || defaultDescription;
    const faviconUrl = map['site.faviconUrl'];

    return {
      title,
      description,
      ...(faviconUrl
        ? {
          icons: {
            icon: faviconUrl,
          },
        }
        : {}),
    };
  } catch {
    // Database unavailable (e.g. during build) — use defaults
    return {
      title: defaultTitle,
      description: defaultDescription,
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const removeBisAttrs = () => {
                  document.querySelectorAll('[bis_skin_checked]').forEach(el => {
                    el.removeAttribute('bis_skin_checked');
                  });
                };
                const init = () => {
                  if (document.body) {
                    removeBisAttrs();
                    new MutationObserver(removeBisAttrs).observe(document.body, { subtree: true, attributes: true });
                  }
                };
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', init);
                } else {
                  init();
                }
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-background" suppressHydrationWarning>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
