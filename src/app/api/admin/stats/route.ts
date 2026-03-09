import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userIdParam = searchParams.get('userId');
    const userIdQuery = userIdParam && userIdParam !== 'all' ? parseInt(userIdParam) : undefined;

    const session = await getSession();
    if (!session || session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
    }

    const [totalUsers, totalIncomes, totalExpenses, incomeSum, expenseSum] = await Promise.all([
      prisma.user.count({ where: userIdQuery ? { id: userIdQuery } : undefined }),
      prisma.income.count({ where: userIdQuery ? { userId: userIdQuery } : undefined }),
      prisma.expense.count({ where: userIdQuery ? { userId: userIdQuery } : undefined }),
      prisma.income.aggregate({ where: userIdQuery ? { userId: userIdQuery } : undefined, _sum: { amount: true } }),
      prisma.expense.aggregate({ where: userIdQuery ? { userId: userIdQuery } : undefined, _sum: { amount: true } }),
    ]);

    return NextResponse.json({
      totalUsers,
      totalIncomes,
      totalExpenses,
      totalIncomeAmount: incomeSum._sum.amount || 0,
      totalExpenseAmount: expenseSum._sum.amount || 0,
      netProfit: (incomeSum._sum.amount || 0) - (expenseSum._sum.amount || 0),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
