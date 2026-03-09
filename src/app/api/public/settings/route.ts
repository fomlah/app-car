import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const keys = [
      'site.name',
      'site.description',
      'site.logoUrl',
      'site.faviconUrl',
      'site.appName',
    ];

    const settings = await prisma.settings.findMany({
      where: { key: { in: keys } },
      orderBy: { key: 'asc' },
    });

    const map: Record<string, string> = {};
    for (const s of settings) map[s.key] = s.value;

    return NextResponse.json({ settings: map });
  } catch (error) {
    console.error('Public settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
