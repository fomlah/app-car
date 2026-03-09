import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

// GET /api/admin/settings - Get all settings
export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const settings = await prisma.settings.findMany({
      orderBy: { key: 'asc' }
    });
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Get settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب الإعدادات' }, { status: 500 });
  }
}

// PUT /api/admin/settings - Update multiple settings
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { settings } = await req.json();

    const results = await Promise.all(
      settings.map(async (s: { key: string; value: string }) => {
        return prisma.settings.upsert({
          where: { key: s.key },
          update: { value: s.value, updatedBy: session.userId },
          create: { key: s.key, value: s.value, updatedBy: session.userId }
        });
      })
    );

    return NextResponse.json({ success: true, settings: results });
  } catch (error) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ في تحديث الإعدادات' }, { status: 500 });
  }
}
