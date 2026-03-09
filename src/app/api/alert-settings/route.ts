import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';

const DEFAULT_ALERTS = [
  { alertType: 'fuel', nameAr: 'تجاوز حد الوقود', enabled: true, limitAmount: 500 },
  { alertType: 'maintenance', nameAr: 'صيانة مستحقة', enabled: true, limitAmount: null },
  { alertType: 'daily', nameAr: 'المصروفات اليومية', enabled: false, limitAmount: 40 },
  { alertType: 'insurance', nameAr: 'تجديد التأمين', enabled: false, limitAmount: null },
];

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    let settings = await prisma.alertSetting.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'asc' },
    });

    // Seed defaults if empty
    if (settings.length === 0) {
      await prisma.alertSetting.createMany({
        data: DEFAULT_ALERTS.map((a) => ({ ...a, userId: session.userId })),
      });
      settings = await prisma.alertSetting.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: 'asc' },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Get alert settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { alertType, enabled, limitAmount } = await req.json();
    if (!alertType) return NextResponse.json({ error: 'نوع التنبيه مطلوب' }, { status: 400 });

    const setting = await prisma.alertSetting.upsert({
      where: { userId_alertType: { userId: session.userId, alertType } },
      update: {
        ...(enabled !== undefined && { enabled }),
        ...(limitAmount !== undefined && { limitAmount: limitAmount ? parseFloat(limitAmount) : null }),
      },
      create: {
        alertType,
        nameAr: DEFAULT_ALERTS.find((a) => a.alertType === alertType)?.nameAr || alertType,
        enabled: enabled !== false,
        limitAmount: limitAmount ? parseFloat(limitAmount) : null,
        userId: session.userId,
      },
    });

    await logActivity(session.userId, 'ALERT_SETTING_UPDATE', `تحديث تنبيه: ${alertType}`);
    return NextResponse.json(setting);
  } catch (error) {
    console.error('Update alert setting error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
