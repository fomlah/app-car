import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import bcrypt from 'bcryptjs';

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
  const adminEmail = 'moa3tazmagdi@gmail.com';

  await prisma.settings.upsert({
    where: { key: 'site.name' },
    update: { value: 'ribhak.online' },
    create: { key: 'site.name', value: 'ribhak.online' },
  });
  await prisma.settings.upsert({
    where: { key: 'site.description' },
    update: { value: 'ribhak.online' },
    create: { key: 'site.description', value: 'ribhak.online' },
  });
  await prisma.settings.upsert({
    where: { key: 'site.logoUrl' },
    update: { value: '' },
    create: { key: 'site.logoUrl', value: '' },
  });
  await prisma.settings.upsert({
    where: { key: 'site.faviconUrl' },
    update: { value: '' },
    create: { key: 'site.faviconUrl', value: '' },
  });

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash('10020090', 10);
    await prisma.user.create({
      data: {
        name: 'Moataz Magdi',
        email: adminEmail,
        password: hashed,
        role: 'ADMIN',
      },
    });
    console.log('Admin account created: moa3tazmagdi@gmail.com');
  } else {
    console.log('Admin account already exists');
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
