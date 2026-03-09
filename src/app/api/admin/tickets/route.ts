import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

// GET /api/admin/tickets - Get all tickets
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;

    const tickets = await prisma.supportTicket.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        _count: { select: { responses: true } }
      },
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Get tickets error:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب التذاكر' }, { status: 500 });
  }
}

// PUT /api/admin/tickets - Update ticket status/resolution
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id, status, priority, resolvedAt, response } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'معرف التذكرة مطلوب' }, { status: 400 });
    }

    const data: any = { status, priority };
    if (status === 'RESOLVED') {
      data.resolvedAt = resolvedAt || new Date();
      data.resolvedBy = session.userId;
    }

    const ticket = await prisma.supportTicket.update({
      where: { id },
      data
    });

    // Add response if provided
    if (response) {
      await prisma.ticketResponse.create({
        data: {
          message: response,
          isAdmin: true,
          ticketId: id,
          userId: session.userId
        }
      });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Update ticket error:', error);
    return NextResponse.json({ error: 'حدث خطأ في تحديث التذكرة' }, { status: 500 });
  }
}

// DELETE /api/admin/tickets - Delete ticket
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'معرف التذكرة مطلوب' }, { status: 400 });
    }

    await prisma.supportTicket.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete ticket error:', error);
    return NextResponse.json({ error: 'حدث خطأ في حذف التذكرة' }, { status: 500 });
  }
}
