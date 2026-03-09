import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'driver_app',
  port: parseInt(process.env.DB_PORT || '3306'),
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  // Find user
  const user = await prisma.user.findUnique({ where: { email: 'moa3tazmagdi7@gmail.com' } });
  if (!user) {
    console.error('User moa3tazmagdi7@gmail.com not found!');
    process.exit(1);
  }
  const userId = user.id;
  console.log(`Found user: ${user.name} (ID: ${userId})`);

  // ===== INCOME DATA =====
  const incomes = [
    // نوفمبر 2025
    { date: '2025-11-08', company: 'Didi', amount: 493.84 },
    { date: '2025-11-08', company: 'Uber', amount: 713 },
    { date: '2025-11-09', company: 'Didi', amount: 764.27 },
    { date: '2025-11-09', company: 'Uber', amount: 720 },
    { date: '2025-11-10', company: 'Didi', amount: 290.6 },
    { date: '2025-11-10', company: 'Uber', amount: 113 },
    { date: '2025-11-11', company: 'Didi', amount: 537.27 },
    { date: '2025-11-11', company: 'Uber', amount: 180 },
    { date: '2025-11-15', company: 'Didi', amount: 983.19 },
    { date: '2025-11-15', company: 'Uber', amount: 22 },
    { date: '2025-11-16', company: 'Didi', amount: 1031.18 },
    { date: '2025-11-16', company: 'Uber', amount: 125 },
    { date: '2025-11-17', company: 'Didi', amount: 643.36 },
    { date: '2025-11-18', company: 'Didi', amount: 527.29 },
    { date: '2025-11-18', company: 'Uber', amount: 48 },
    { date: '2025-11-19', company: 'Didi', amount: 1045.01 },
    { date: '2025-11-22', company: 'Didi', amount: 870.83 },
    { date: '2025-11-22', company: 'Uber', amount: 186 },
    { date: '2025-11-23', company: 'Didi', amount: 975.22 },
    { date: '2025-11-24', company: 'Didi', amount: 497.59 },
    { date: '2025-11-24', company: 'Uber', amount: 353 },
    { date: '2025-11-25', company: 'Didi', amount: 449.83 },
    { date: '2025-11-25', company: 'Uber', amount: 52 },
    { date: '2025-11-26', company: 'Didi', amount: 481.12 },
    { date: '2025-11-27', company: 'Didi', amount: 843.28 },
    { date: '2025-11-29', company: 'Didi', amount: 687 },
    // ديسمبر 2025
    { date: '2025-12-03', company: 'Didi', amount: 1046.55 },
    { date: '2025-12-04', company: 'Didi', amount: 1021.88 },
    { date: '2025-12-06', company: 'Didi', amount: 365.33 },
    { date: '2025-12-07', company: 'Didi', amount: 966.5 },
    { date: '2025-12-08', company: 'Didi', amount: 824.82 },
    { date: '2025-12-09', company: 'Didi', amount: 1331.86 },
    { date: '2025-12-10', company: 'Didi', amount: 776.27 },
    { date: '2025-12-11', company: 'Didi', amount: 859.33 },
    { date: '2025-12-13', company: 'Didi', amount: 307 },
    { date: '2025-12-15', company: 'Didi', amount: 840, notes: 'تم اضافة 350 مشوار خاص' },
    { date: '2025-12-17', company: 'Didi', amount: 686 },
    { date: '2025-12-20', company: 'Didi', amount: 162 },
    { date: '2025-12-21', company: 'Didi', amount: 1080 },
    { date: '2025-12-22', company: 'Didi', amount: 887 },
    { date: '2025-12-24', company: 'Didi', amount: 745 },
    { date: '2025-12-25', company: 'Didi', amount: 809 },
    { date: '2025-12-29', company: 'Didi', amount: 619 },
    { date: '2025-12-30', company: 'Didi', amount: 665 },
    // يناير 2026
    { date: '2026-01-06', company: 'Didi', amount: 761 },
    { date: '2026-01-08', company: 'Didi', amount: 867 },
    { date: '2026-01-10', company: 'Didi', amount: 1110 },
    { date: '2026-01-11', company: 'Didi', amount: 686 },
    { date: '2026-01-13', company: 'Didi', amount: 465 },
    { date: '2026-01-25', company: 'Didi', amount: 839 },
    { date: '2026-01-26', company: 'Didi', amount: 651 },
    { date: '2026-01-27', company: 'Didi', amount: 1086 },
    { date: '2026-01-28', company: 'Didi', amount: 713 },
    { date: '2026-01-29', company: 'Didi', amount: 367 },
    { date: '2026-01-30', company: 'Didi', amount: 10000, notes: '10 الف اعلانات تم ارسالها لمصطفى' },
  ];

  // ===== EXPENSE DATA =====
  const expenses = [
    // نوفمبر 2025
    { date: '2025-11-09', category: 'fuel', amount: 674, notes: 'بنزين' },
    { date: '2025-11-09', category: 'other', amount: 150, customCategory: '' },
    { date: '2025-11-10', category: 'other', amount: 50, customCategory: 'معطر سيارة', notes: 'معطر سيارة' },
    { date: '2025-11-11', category: 'fuel', amount: 600, notes: 'بنزين' },
    { date: '2025-11-17', category: 'fuel', amount: 627, notes: 'بنزين' },
    { date: '2025-11-19', category: 'fuel', amount: 680, notes: 'بنزين' },
    { date: '2025-11-24', category: 'other', amount: 705 },
    { date: '2025-11-25', category: 'other', amount: 150 },
    { date: '2025-11-27', category: 'fuel', amount: 400, notes: 'بنزين' },
    { date: '2025-11-29', category: 'fuel', amount: 685, notes: 'بنزين' },
    // ديسمبر 2025
    { date: '2025-12-04', category: 'other', amount: 735, customCategory: 'مخالفات مرور', notes: 'دفع مخالفات المرور' },
    { date: '2025-12-06', category: 'fuel', amount: 645, notes: 'بنزين' },
    { date: '2025-12-07', category: 'other', amount: 2983, customCategory: 'قسط غبور', notes: 'قسط غبور' },
    { date: '2025-12-09', category: 'fuel', amount: 704, notes: 'بنزين' },
    { date: '2025-12-11', category: 'fuel', amount: 700, notes: 'بنزين' },
    { date: '2025-12-20', category: 'fuel', amount: 658, notes: 'بنزين' },
    { date: '2025-12-21', category: 'other', amount: 100 },
    { date: '2025-12-22', category: 'other', amount: 675 },
    { date: '2025-12-24', category: 'fuel', amount: 695, notes: 'بنزين' },
    { date: '2025-12-29', category: 'fuel', amount: 600, notes: 'بنزين' },
    { date: '2025-12-30', category: 'other', amount: 3000, customCategory: 'خروج اطعام وفانوس دكاه', notes: 'خروج اطعام وفانوس دكاه' },
    { date: '2025-12-30', category: 'other', amount: 30, customCategory: 'عرض خصم', notes: 'عرض خصم' },
    // يناير 2026
    { date: '2026-01-05', category: 'other', amount: 30, customCategory: 'عرض خصم', notes: 'عرض خصم' },
    { date: '2026-01-06', category: 'fuel', amount: 700, notes: 'بنزين' },
    { date: '2026-01-09', category: 'other', amount: 30, customCategory: 'عرض خصم', notes: 'عرض خصم' },
    { date: '2026-01-13', category: 'other', amount: 100 },
    { date: '2026-01-25', category: 'other', amount: 675 },
    { date: '2026-01-28', category: 'other', amount: 700 },
    { date: '2026-01-30', category: 'other', amount: 30, customCategory: 'عرض خصم', notes: 'عرض خصم' },
  ];

  // Insert incomes
  const incomeResult = await prisma.income.createMany({
    data: incomes.map((i) => ({
      date: i.date,
      company: i.company,
      amount: i.amount,
      notes: i.notes || '',
      userId,
    })),
  });
  console.log(`✅ Inserted ${incomeResult.count} income records`);

  // Insert expenses one by one (because of customCategory)
  let expenseCount = 0;
  for (const e of expenses) {
    await prisma.expense.create({
      data: {
        date: e.date,
        category: e.category,
        customCategory: e.customCategory || null,
        amount: e.amount,
        notes: e.notes || '',
        userId,
      },
    });
    expenseCount++;
  }
  console.log(`✅ Inserted ${expenseCount} expense records`);

  console.log('\n🎉 All data inserted successfully!');
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  });
