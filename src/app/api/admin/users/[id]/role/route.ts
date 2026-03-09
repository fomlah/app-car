import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
  }

  const { id } = await params;
  const { role } = await req.json();
  if (!['ADMIN', 'SUBSCRIBER'].includes(role)) {
    return NextResponse.json({ error: 'دور غير صالح' }, { status: 400 });
  }

  const userId = parseInt(id);
  if (userId === session.userId) {
    return NextResponse.json({ error: 'لا يمكنك تغيير دورك' }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });

  await prisma.activityLog.create({
    data: {
      action: 'ROLE_CHANGE',
      details: `تم تغيير دور ${user.name} إلى ${role === 'ADMIN' ? 'أدمن' : 'مشترك'}`,
      userId: session.userId,
    },
  });

  return NextResponse.json(user);
}
