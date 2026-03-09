import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id } = await params;
    const ad = await prisma.ad.findUnique({ where: { id: parseInt(id) } });
    if (!ad) return NextResponse.json({ error: 'الإعلان غير موجود' }, { status: 404 });

    return NextResponse.json(ad);
  } catch (error) {
    console.error('Admin ad get error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, type, imageUrl, text, linkUrl, videoUrl, active, order } = body;

    const existing = await prisma.ad.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return NextResponse.json({ error: 'الإعلان غير موجود' }, { status: 404 });

    const validTypes = ['BANNER_TEXT', 'BANNER_LINK', 'BANNER_VIDEO'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json({ error: 'نوع الإعلان غير صالح' }, { status: 400 });
    }

    const ad = await prisma.ad.update({
      where: { id: parseInt(id) },
      data: {
        ...(title !== undefined && { title }),
        ...(type !== undefined && { type }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(text !== undefined && { text: text || null }),
        ...(linkUrl !== undefined && { linkUrl: linkUrl || null }),
        ...(videoUrl !== undefined && { videoUrl: videoUrl || null }),
        ...(active !== undefined && { active }),
        ...(order !== undefined && { order }),
      },
    });

    return NextResponse.json(ad);
  } catch (error) {
    console.error('Admin ad update error:', error);
    return NextResponse.json({ error: 'حدث خطأ في تحديث الإعلان' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const { id } = await params;
    const existing = await prisma.ad.findUnique({ where: { id: parseInt(id) } });
    if (!existing) return NextResponse.json({ error: 'الإعلان غير موجود' }, { status: 404 });

    await prisma.ad.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admin ad delete error:', error);
    return NextResponse.json({ error: 'حدث خطأ في حذف الإعلان' }, { status: 500 });
  }
}
