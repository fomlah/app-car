import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';

const DEFAULT_SETTINGS = [
  { settingType: 'morning', enabled: true, timeValue: '07:30' },
  { settingType: 'progress', enabled: true, timeValue: '50%' },
  { settingType: 'inactivity', enabled: true, timeValue: '4' },
  { settingType: 'evening', enabled: true, timeValue: '22:00' },
];

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    let settings = await prisma.notificationSetting.findMany({
      where: { userId: session.userId },
      orderBy: { createdAt: 'asc' },
    });

    // Seed defaults if empty
    if (settings.length === 0) {
      await prisma.notificationSetting.createMany({
        data: DEFAULT_SETTINGS.map((s) => ({ ...s, userId: session.userId })),
      });
      settings = await prisma.notificationSetting.findMany({
        where: { userId: session.userId },
        orderBy: { createdAt: 'asc' },
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Get notification settings error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { settingType, enabled, timeValue } = await req.json();
    if (!settingType) return NextResponse.json({ error: 'نوع الإعداد مطلوب' }, { status: 400 });

    const setting = await prisma.notificationSetting.upsert({
      where: { userId_settingType: { userId: session.userId, settingType } },
      update: {
        ...(enabled !== undefined && { enabled }),
        ...(timeValue !== undefined && { timeValue }),
      },
      create: {
        settingType,
        enabled: enabled !== false,
        timeValue: timeValue || DEFAULT_SETTINGS.find((s) => s.settingType === settingType)?.timeValue || null,
        userId: session.userId,
      },
    });

    await logActivity(session.userId, 'NOTIFICATION_SETTING_UPDATE', `تحديث إعداد إشعار: ${settingType}`);
    return NextResponse.json(setting);
  } catch (error) {
    console.error('Update notification setting error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
