import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const incomes = await prisma.income.findMany({
      where: { userId: session.userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(incomes);
  } catch (error) {
    console.error('Get incomes error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const body = await req.json();
    const entries = Array.isArray(body) ? body : [body];

    const created = await prisma.income.createMany({
      data: entries.map((e: { date: string; company: string; amount: number; notes?: string }) => ({
        date: e.date,
        company: e.company,
        amount: e.amount,
        notes: e.notes || '',
        userId: session.userId,
      })),
    });

    await logActivity(session.userId, 'INCOME_ADD', `إضافة ${created.count} دخل`);
    return NextResponse.json({ success: true, count: created.count });
  } catch (error) {
    console.error('Create income error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { id, ...data } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'معرّف الدخل مطلوب' }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.income.findFirst({
      where: { id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'الدخل غير موجود' }, { status: 404 });
    }

    const updateData: any = {};
    if (data.date !== undefined) updateData.date = data.date;
    if (data.company !== undefined) updateData.company = data.company;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await prisma.income.update({
      where: { id },
      data: updateData,
    });

    await logActivity(session.userId, 'INCOME_UPDATE', `تعديل دخل #${id}`);
    return NextResponse.json({ success: true, income: updated });
  } catch (error) {
    console.error('Update income error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { id } = await req.json();

    await prisma.income.deleteMany({
      where: { id, userId: session.userId },
    });

    await logActivity(session.userId, 'INCOME_DELETE', `حذف دخل #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete income error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
