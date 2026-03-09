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

    const [users, totalVehicles, totalMaintenanceItems, totalAlertSettings, totalNotifSettings] = await Promise.all([
      prisma.user.findMany({
        where: userIdQuery ? { id: userIdQuery } : undefined,
        include: {
          incomes: true,
          expenses: true,
        },
      }),
      prisma.vehicle.count(),
      prisma.maintenanceItem.count(),
      prisma.alertSetting.count(),
      prisma.notificationSetting.count(),
    ]);

    let mostActive = { name: '-', count: 0, email: '' };
    let highestIncome = { name: '-', amount: 0, email: '' };
    let highestExpense = { name: '-', amount: 0, email: '' };
    const monthlyData: Record<string, { income: number; expense: number }> = {};
    const companyData: Record<string, number> = {};
    const categoryData: Record<string, number> = {};
    const weekdayIncome: Record<number, { total: number; count: number }> = {};
    const dailyData: Record<string, { income: number; expense: number }> = {};

    // Per-user stats
    const userStats = users.map((u) => {
      const incomeCount = u.incomes.length;
      const expenseCount = u.expenses.length;
      const totalOps = incomeCount + expenseCount;
      const userIncome = u.incomes.reduce((s, i) => s + i.amount, 0);
      const userExpense = u.expenses.reduce((s, e) => s + e.amount, 0);

      if (totalOps > mostActive.count) {
        mostActive = { name: u.name, count: totalOps, email: u.email };
      }
      if (userIncome > highestIncome.amount) {
        highestIncome = { name: u.name, amount: userIncome, email: u.email };
      }
      if (userExpense > highestExpense.amount) {
        highestExpense = { name: u.name, amount: userExpense, email: u.email };
      }

      u.incomes.forEach((i) => {
        const month = i.date.substring(0, 7);
        if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };
        monthlyData[month].income += i.amount;

        companyData[i.company] = (companyData[i.company] || 0) + i.amount;

        const day = new Date(i.date).getDay();
        if (!weekdayIncome[day]) weekdayIncome[day] = { total: 0, count: 0 };
        weekdayIncome[day].total += i.amount;
        weekdayIncome[day].count += 1;

        if (!dailyData[i.date]) dailyData[i.date] = { income: 0, expense: 0 };
        dailyData[i.date].income += i.amount;
      });

      u.expenses.forEach((e) => {
        const month = e.date.substring(0, 7);
        if (!monthlyData[month]) monthlyData[month] = { income: 0, expense: 0 };
        monthlyData[month].expense += e.amount;

        const catLabel = e.category === 'other' && e.customCategory ? e.customCategory : e.category;
        categoryData[catLabel] = (categoryData[catLabel] || 0) + e.amount;

        if (!dailyData[e.date]) dailyData[e.date] = { income: 0, expense: 0 };
        dailyData[e.date].expense += e.amount;
      });

      return {
        id: u.id, name: u.name, email: u.email, role: u.role, suspended: u.suspended,
        income: userIncome, expense: userExpense, profit: userIncome - userExpense,
        incomeCount, expenseCount,
      };
    });

    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.incomes.length > 0 || u.expenses.length > 0).length;
    const suspendedUsers = users.filter((u) => u.suspended).length;
    const totalIncome = userStats.reduce((s, u) => s + u.income, 0);
    const totalExpense = userStats.reduce((s, u) => s + u.expense, 0);
    const avgIncomePerUser = activeUsers > 0 ? totalIncome / activeUsers : 0;

    // Monthly chart (last 6)
    const sortedMonths = Object.keys(monthlyData).sort();
    const last6Months = sortedMonths.slice(-6);
    const chartData = last6Months.map((m) => ({
      month: m,
      income: monthlyData[m].income,
      expense: monthlyData[m].expense,
      profit: monthlyData[m].income - monthlyData[m].expense,
    }));

    // Best weekday
    const weekdayNames = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const weekdayStats = Object.entries(weekdayIncome).map(([day, data]) => ({
      day: weekdayNames[parseInt(day)],
      dayNum: parseInt(day),
      avgIncome: data.count > 0 ? data.total / data.count : 0,
      totalIncome: data.total,
      count: data.count,
    })).sort((a, b) => b.avgIncome - a.avgIncome);

    // Today's data
    const todayStr = new Date().toISOString().split('T')[0];
    const todayData = dailyData[todayStr] || { income: 0, expense: 0 };

    // Recent 7 days
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split('T')[0];
      last7Days.push({
        date: ds,
        dayName: weekdayNames[d.getDay()],
        income: dailyData[ds]?.income || 0,
        expense: dailyData[ds]?.expense || 0,
      });
    }

    return NextResponse.json({
      mostActive, highestIncome, highestExpense,
      totalUsers, activeUsers, suspendedUsers, avgIncomePerUser,
      chartData, companyData, categoryData,
      weekdayStats, todayData, last7Days,
      userStats: userStats.sort((a, b) => b.income - a.income),
      totalVehicles, totalMaintenanceItems, totalAlertSettings, totalNotifSettings,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : '';
    console.error('Advanced stats error:', msg, stack);
    return NextResponse.json({ error: 'حدث خطأ في الإحصائيات', details: msg }, { status: 500 });
  }
}
