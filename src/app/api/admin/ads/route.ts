import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET() {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const ads = await prisma.ad.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(ads);
  } catch (error) {
    console.error('Admin ads fetch error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const body = await req.json();
    const { title, type, imageUrl, text, linkUrl, videoUrl, active, order } = body;

    if (!title || !imageUrl) {
      return NextResponse.json({ error: 'العنوان وصورة البنر مطلوبان' }, { status: 400 });
    }

    const validTypes = ['BANNER_TEXT', 'BANNER_LINK', 'BANNER_VIDEO'];
    if (type && !validTypes.includes(type)) {
      return NextResponse.json({ error: 'نوع الإعلان غير صالح' }, { status: 400 });
    }

    const ad = await prisma.ad.create({
      data: {
        title,
        type: type || 'BANNER_TEXT',
        imageUrl,
        text: text || null,
        linkUrl: linkUrl || null,
        videoUrl: videoUrl || null,
        active: active !== undefined ? active : true,
        order: order || 0,
      },
    });

    return NextResponse.json(ad, { status: 201 });
  } catch (error) {
    console.error('Admin ad create error:', error);
    return NextResponse.json({ error: 'حدث خطأ في إنشاء الإعلان' }, { status: 500 });
  }
}
