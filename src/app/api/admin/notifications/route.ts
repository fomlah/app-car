import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
  }

  const { title, message, userId } = await req.json();
  if (!title || !message) {
    return NextResponse.json({ error: 'العنوان والرسالة مطلوبين' }, { status: 400 });
  }

  if (userId === 'all') {
    const users = await prisma.user.findMany({ select: { id: true } });
    await prisma.notification.createMany({
      data: users.map((u) => ({ title, message, userId: u.id })),
    });
    return NextResponse.json({ success: true, count: users.length });
  } else {
    const notif = await prisma.notification.create({
      data: { title, message, userId: parseInt(userId) },
    });
    return NextResponse.json(notif);
  }
}
