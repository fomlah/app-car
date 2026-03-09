import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const vehicles = await prisma.vehicle.findMany({
      where: { userId: session.userId },
      include: { maintenanceItems: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(vehicles);
  } catch (error) {
    console.error('Get vehicles error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { name, model, year, licensePlate, odometer, avgConsumption, isActive } = await req.json();
    if (!name || !model || !year) {
      return NextResponse.json({ error: 'البيانات مطلوبة' }, { status: 400 });
    }

    // If setting as active, deactivate others
    if (isActive !== false) {
      await prisma.vehicle.updateMany({
        where: { userId: session.userId, isActive: true },
        data: { isActive: false },
      });
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name,
        model,
        year: parseInt(year),
        licensePlate: licensePlate || null,
        odometer: parseFloat(odometer) || 0,
        avgConsumption: parseFloat(avgConsumption) || 0,
        isActive: isActive !== false,
        userId: session.userId,
      },
      include: { maintenanceItems: true },
    });

    await logActivity(session.userId, 'VEHICLE_ADD', `إضافة سيارة: ${name} ${model}`);
    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Create vehicle error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { id, name, model, year, licensePlate, odometer, avgConsumption, isActive } = await req.json();
    if (!id) return NextResponse.json({ error: 'معرف السيارة مطلوب' }, { status: 400 });

    // If setting as active, deactivate others
    if (isActive === true) {
      await prisma.vehicle.updateMany({
        where: { userId: session.userId, isActive: true, id: { not: id } },
        data: { isActive: false },
      });
    }

    const vehicle = await prisma.vehicle.updateMany({
      where: { id, userId: session.userId },
      data: {
        ...(name !== undefined && { name }),
        ...(model !== undefined && { model }),
        ...(year !== undefined && { year: parseInt(year) }),
        ...(licensePlate !== undefined && { licensePlate }),
        ...(odometer !== undefined && { odometer: parseFloat(odometer) }),
        ...(avgConsumption !== undefined && { avgConsumption: parseFloat(avgConsumption) }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    await logActivity(session.userId, 'VEHICLE_UPDATE', `تحديث سيارة #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update vehicle error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { id } = await req.json();
    await prisma.vehicle.deleteMany({ where: { id, userId: session.userId } });

    await logActivity(session.userId, 'VEHICLE_DELETE', `حذف سيارة #${id}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
