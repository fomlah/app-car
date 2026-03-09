import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
  }

  const { id } = await params;
  const { suspended } = await req.json();
  const userId = parseInt(id);

  if (userId === session.userId) {
    return NextResponse.json({ error: 'لا يمكنك إيقاف حسابك' }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { suspended: !!suspended },
    select: { id: true, name: true, suspended: true },
  });

  await prisma.activityLog.create({
    data: {
      action: suspended ? 'USER_SUSPENDED' : 'USER_UNSUSPENDED',
      details: `تم ${suspended ? 'إيقاف' : 'تفعيل'} حساب ${user.name}`,
      userId: session.userId,
    },
  });

  return NextResponse.json(user);
}
