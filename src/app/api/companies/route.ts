import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET() {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
        }

        const companies = await prisma.company.findMany({
            where: { active: true },
            orderBy: { order: 'asc' },
        });

        return NextResponse.json(companies);
    } catch (error) {
        console.error('Fetch companies error:', error);
        return NextResponse.json({ error: 'حدث خطأ في جلب الشركات' }, { status: 500 });
    }
}
