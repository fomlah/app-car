import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const sessions = await prisma.workSession.findMany({
    where: { userId: session.userId },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { date, startTime, endTime, company, notes } = await req.json();
  if (!date || !startTime || !company) {
    return NextResponse.json({ error: 'البيانات مطلوبة' }, { status: 400 });
  }

  const ws = await prisma.workSession.create({
    data: { date, startTime, endTime: endTime || null, company, notes: notes || null, userId: session.userId },
  });

  return NextResponse.json(ws);
}

export async function PUT(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id, endTime } = await req.json();
  if (!id || !endTime) {
    return NextResponse.json({ error: 'البيانات مطلوبة' }, { status: 400 });
  }

  const ws = await prisma.workSession.updateMany({
    where: { id, userId: session.userId },
    data: { endTime },
  });

  return NextResponse.json(ws);
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { id } = await req.json();
  await prisma.workSession.deleteMany({ where: { id, userId: session.userId } });
  return NextResponse.json({ success: true });
}
