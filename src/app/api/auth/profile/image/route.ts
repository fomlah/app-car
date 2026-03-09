import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';
import { logActivity } from '@/lib/activity';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const formData = (await req.formData()) as unknown as globalThis.FormData;
    const file = formData.get('image') as File | null;
    if (!file) return NextResponse.json({ error: 'الصورة مطلوبة' }, { status: 400 });

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'نوع الملف غير مدعوم. استخدم JPG أو PNG أو WebP' }, { status: 400 });
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `profile_${session.userId}_${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'profiles');

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, fileName), buffer);

    const imageUrl = `/uploads/profiles/${fileName}`;

    await prisma.user.update({
      where: { id: session.userId },
      data: { profileImage: imageUrl },
    });

    await logActivity(session.userId, 'PROFILE_IMAGE_UPDATE', 'تحديث صورة الملف الشخصي');
    return NextResponse.json({ profileImage: imageUrl });
  } catch (error) {
    console.error('Upload profile image error:', error);
    return NextResponse.json({ error: 'حدث خطأ في رفع الصورة' }, { status: 500 });
  }
}
