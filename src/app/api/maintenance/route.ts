import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const items = await prisma.maintenanceItem.findMany({
      where: { userId: session.userId },
      include: { vehicle: { select: { id: true, name: true, model: true } } },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Get maintenance error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { name, nameAr, vehicleId, lastChangedAt, nextDueKm, currentKm, remainingPct, status, enabled } = await req.json();
    if (!name || !nameAr || !vehicleId) {
      return NextResponse.json({ error: 'البيانات مطلوبة' }, { status: 400 });
    }

    // Verify vehicle belongs to user
    const vehicle = await prisma.vehicle.findFirst({ where: { id: vehicleId, userId: session.userId } });
    if (!vehicle) return NextResponse.json({ error: 'السيارة غير موجودة' }, { status: 404 });

    const item = await prisma.maintenanceItem.create({
      data: {
        name,
        nameAr,
        lastChangedAt: lastChangedAt || null,
        nextDueKm: nextDueKm ? parseFloat(nextDueKm) : null,
        currentKm: currentKm ? parseFloat(currentKm) : null,
        remainingPct: remainingPct ? parseInt(remainingPct) : 100,
        status: status || 'good',
        enabled: enabled !== false,
        vehicleId,
        userId: session.userId,
      },
    });

    await logActivity(session.userId, 'MAINTENANCE_ADD', `إضافة صيانة: ${nameAr}`);
    return NextResponse.json(item);
  } catch (error) {
    console.error('Create maintenance error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { id, enabled, remainingPct, status, lastChangedAt, nextDueKm, currentKm } = await req.json();
    if (!id) return NextResponse.json({ error: 'المعرف مطلوب' }, { status: 400 });

    await prisma.maintenanceItem.updateMany({
      where: { id, userId: session.userId },
      data: {
        ...(enabled !== undefined && { enabled }),
        ...(remainingPct !== undefined && { remainingPct: parseInt(remainingPct) }),
        ...(status !== undefined && { status }),
        ...(lastChangedAt !== undefined && { lastChangedAt }),
        ...(nextDueKm !== undefined && { nextDueKm: parseFloat(nextDueKm) }),
        ...(currentKm !== undefined && { currentKm: parseFloat(currentKm) }),
      },
    });

    await logActivity(session.userId, 'MAINTENANCE_UPDATE', `تحديث صيانة #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update maintenance error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { id } = await req.json();
    await prisma.maintenanceItem.deleteMany({ where: { id, userId: session.userId } });

    await logActivity(session.userId, 'MAINTENANCE_DELETE', `حذف صيانة #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete maintenance error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
