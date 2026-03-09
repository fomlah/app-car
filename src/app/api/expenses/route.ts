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

    const expenses = await prisma.expense.findMany({
      where: { userId: session.userId },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(expenses);
  } catch (error) {
    console.error('Get expenses error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { date, category, customCategory, amount, notes } = await req.json();

    const expense = await prisma.expense.create({
      data: {
        date,
        category,
        customCategory: customCategory || null,
        amount,
        notes: notes || '',
        userId: session.userId,
      },
    });

    await logActivity(session.userId, 'EXPENSE_ADD', `إضافة مصروف: ${amount} ج.م`);
    return NextResponse.json({ success: true, expense });
  } catch (error) {
    console.error('Create expense error:', error);
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
      return NextResponse.json({ error: 'معرّف المصروف مطلوب' }, { status: 400 });
    }

    // Verify ownership
    const existing = await prisma.expense.findFirst({
      where: { id, userId: session.userId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'المصروف غير موجود' }, { status: 404 });
    }

    const updateData: any = {};
    if (data.date !== undefined) updateData.date = data.date;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.customCategory !== undefined) updateData.customCategory = data.customCategory;
    if (data.amount !== undefined) updateData.amount = data.amount;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const updated = await prisma.expense.update({
      where: { id },
      data: updateData,
    });

    await logActivity(session.userId, 'EXPENSE_UPDATE', `تعديل مصروف #${id}`);
    return NextResponse.json({ success: true, expense: updated });
  } catch (error) {
    console.error('Update expense error:', error);
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

    await prisma.expense.deleteMany({
      where: { id, userId: session.userId },
    });

    await logActivity(session.userId, 'EXPENSE_DELETE', `حذف مصروف #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete expense error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
