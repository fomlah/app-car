import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

// GET /api/admin/companies - Get all companies
export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const companies = await prisma.company.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Get companies error:', error);
    return NextResponse.json({ error: 'حدث خطأ في جلب الشركات' }, { status: 500 });
  }
}

// POST /api/admin/companies - Create new company
export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { name, nameAr, logo, color, commission, order } = await req.json();

    if (!name || !nameAr) {
      return NextResponse.json({ error: 'الاسم والاسم العربي مطلوبان' }, { status: 400 });
    }

    const company = await prisma.company.create({
      data: { name, nameAr, logo, color, commission, order: order || 0 }
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error('Create company error:', error);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء الشركة' }, { status: 500 });
  }
}

// PUT /api/admin/companies - Update company (bulk or single via query)
export async function PUT(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id, name, nameAr, logo, color, commission, active, order } = await req.json();

    if (!id) {
      return NextResponse.json({ error: 'معرف الشركة مطلوب' }, { status: 400 });
    }

    const company = await prisma.company.update({
      where: { id },
      data: { name, nameAr, logo, color, commission, active, order }
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error('Update company error:', error);
    return NextResponse.json({ error: 'حدث خطأ في تحديث الشركة' }, { status: 500 });
  }
}

// DELETE /api/admin/companies - Delete company
export async function DELETE(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'معرف الشركة مطلوب' }, { status: 400 });
    }

    await prisma.company.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete company error:', error);
    return NextResponse.json({ error: 'حدث خطأ في حذف الشركة' }, { status: 500 });
  }
}
