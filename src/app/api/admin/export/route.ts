import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/jwt';

export async function GET() {
  const session = await getSession();
  if (!session || session.role !== 'ADMIN') {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    include: {
      incomes: true,
      expenses: true,
      _count: { select: { incomes: true, expenses: true } },
    },
    orderBy: { createdAt: 'desc' },
  });

  const rows: string[] = [];
  rows.push('ID,Name,Email,Role,Suspended,Created,Total Incomes,Total Expenses,Income Amount,Expense Amount,Net Profit');

  users.forEach((u) => {
    const incomeTotal = u.incomes.reduce((s, i) => s + i.amount, 0);
    const expenseTotal = u.expenses.reduce((s, e) => s + e.amount, 0);
    rows.push(
      `${u.id},"${u.name}","${u.email}",${u.role},${u.suspended},${u.createdAt.toISOString()},${u._count.incomes},${u._count.expenses},${incomeTotal.toFixed(2)},${expenseTotal.toFixed(2)},${(incomeTotal - expenseTotal).toFixed(2)}`
    );
  });

  const csv = rows.join('\n');
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="users-export-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
