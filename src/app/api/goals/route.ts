import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const goals = await prisma.goal.findMany({
    where: { userId: session.userId },
    orderBy: { month: 'desc' },
  });
  return NextResponse.json(goals);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { month, targetAmount } = await req.json();
  if (!month || !targetAmount) {
    return NextResponse.json({ error: 'البيانات مطلوبة' }, { status: 400 });
  }

  const goal = await prisma.goal.upsert({
    where: { userId_month: { userId: session.userId, month } },
    update: { targetAmount },
    create: { month, targetAmount, userId: session.userId },
  });

  return NextResponse.json(goal);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await req.json();
  await prisma.goal.deleteMany({ where: { id, userId: session.userId } });
  return NextResponse.json({ success: true });
}
