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
  const email = 'moa3tazmagdi7@gmail.com';
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`User ${email} not found`);
    process.exit(1);
  }

  const expenses = await prisma.expense.findMany({
    where: { userId: user.id },
    orderBy: [{ date: 'asc' }],
    select: { id: true, date: true, category: true, customCategory: true, amount: true, notes: true },
  });

  const total = expenses.reduce((s, e) => s + e.amount, 0);

  // Group by category
  const byCategory = new Map<string, number>();
  for (const e of expenses) {
    const cat = e.customCategory || e.category;
    byCategory.set(cat, (byCategory.get(cat) || 0) + e.amount);
  }

  console.log(`User: ${user.email} (id=${user.id})`);
  console.log(`Records: ${expenses.length}`);
  console.log(`Total Expenses: ${total.toFixed(2)}`);

  const minDate = expenses[0]?.date;
  const maxDate = expenses[expenses.length - 1]?.date;
  console.log(`Date range: ${minDate} -> ${maxDate}`);

  console.log('\n== Totals by category ==');
  for (const [c, a] of [...byCategory.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`${c}: ${a.toFixed(2)}`);
  }

  console.log('\n== All expenses (date | category | customCategory | amount | notes) ==');
  for (const e of expenses) {
    const custom = e.customCategory ? ` (${e.customCategory})` : '';
    const notes = e.notes?.trim() ? ` | ${e.notes.trim()}` : '';
    console.log(`${e.date} | ${e.category}${custom} | ${e.amount}${notes}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
