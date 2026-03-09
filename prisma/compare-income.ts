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

function key(date: string, company: string) {
  return `${date}__${company}`;
}

async function main() {
  const email = 'moa3tazmagdi7@gmail.com';
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`User ${email} not found`);
    process.exit(1);
  }

  const incomes = await prisma.income.findMany({
    where: { userId: user.id },
    orderBy: [{ date: 'asc' }, { id: 'asc' }],
    select: { id: true, date: true, company: true, amount: true, notes: true },
  });

  const total = incomes.reduce((s, i) => s + i.amount, 0);
  const byCompany = new Map<string, number>();
  const byDate = new Map<string, number>();
  for (const i of incomes) {
    byCompany.set(i.company, (byCompany.get(i.company) || 0) + i.amount);
    byDate.set(i.date, (byDate.get(i.date) || 0) + i.amount);
  }

  console.log(`User: ${user.email} (id=${user.id})`);
  console.log(`Records: ${incomes.length}`);
  console.log(`Total: ${total.toFixed(2)}`);

  const minDate = incomes[0]?.date;
  const maxDate = incomes[incomes.length - 1]?.date;
  console.log(`Date range: ${minDate} -> ${maxDate}`);

  console.log('\n== Totals by company ==');
  for (const [c, a] of [...byCompany.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`${c}: ${a.toFixed(2)}`);
  }

  console.log('\n== Incomes (date | company | amount | notes) ==');
  for (const i of incomes) {
    const notes = i.notes?.trim() ? ` | ${i.notes.trim()}` : '';
    console.log(`${i.date} | ${i.company} | ${i.amount}${notes}`);
  }

  // Also output a set for quick matching
  console.log('\n== Keys for matching (date__company__amount) ==');
  for (const i of incomes) {
    console.log(`${i.date}__${i.company}__${i.amount}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
