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
  // Check all users
  console.log('=== All Users ===');
  const users = await prisma.user.findMany();
  for (const u of users) {
    console.log(`ID: ${u.id}, Email: ${u.email}, Name: ${u.name}`);
  }

  // For each user, check their incomes
  for (const user of users) {
    console.log(`\n=== User: ${user.email} (ID: ${user.id}) ===`);
    
    const incomes = await prisma.income.findMany({
      where: { userId: user.id },
      orderBy: { date: 'asc' },
    });
    
    console.log(`Total incomes: ${incomes.length}`);
    
    // Check for 8 Nov and 15 Dec specifically
    const nov8 = incomes.filter(i => i.date === '2025-11-08');
    const dec15 = incomes.filter(i => i.date === '2025-12-15');
    
    if (nov8.length > 0) {
      console.log('\n📅 2025-11-08 records:');
      for (const i of nov8) {
        console.log(`  ID: ${i.id}, Amount: ${i.amount}, Company: ${i.company}, Notes: ${i.notes}`);
      }
    }
    
    if (dec15.length > 0) {
      console.log('\n📅 2025-12-15 records:');
      for (const i of dec15) {
        console.log(`  ID: ${i.id}, Amount: ${i.amount}, Company: ${i.company}, Notes: ${i.notes}`);
      }
    }
    
    // Show first 10 and last 10 records
    console.log('\nFirst 10 records:');
    incomes.slice(0, 10).forEach(i => {
      console.log(`  ${i.date} | ${i.company} | ${i.amount}`);
    });
    
    console.log('\nLast 10 records:');
    incomes.slice(-10).forEach(i => {
      console.log(`  ${i.date} | ${i.company} | ${i.amount}`);
    });
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
