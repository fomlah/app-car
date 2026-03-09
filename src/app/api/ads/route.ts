import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const ads = await prisma.ad.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Ads fetch error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
