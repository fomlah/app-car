import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

// GET /api/admin/error-logs - Get error logs
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const userId = searchParams.get('userId');

    const where: any = {};
    if (userId) where.userId = parseInt(userId);

    const logs = await prisma.errorLog.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Get error logs error:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب سجلات الأخطاء' }, { status: 500 });
  }
}

// DELETE /api/admin/error-logs - Clear old error logs
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const days = parseInt(searchParams.get('days') || '7');

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const result = await prisma.errorLog.deleteMany({
      where: { createdAt: { lt: cutoffDate } }
    });

    return NextResponse.json({ success: true, deleted: result.count });
  } catch (error) {
    console.error('Delete error logs error:', error);
    return NextResponse.json({ error: 'حدث خطأ في حذف سجلات الأخطاء' }, { status: 500 });
  }
}
