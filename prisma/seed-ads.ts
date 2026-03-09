import { PrismaClient } from '../src/generated/prisma/client';
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
  // Delete existing ads
  await prisma.ad.deleteMany();

  // Insert 3 real ads
  const ads = await Promise.all([
    prisma.ad.create({
      data: {
        title: 'وفّر أكثر مع محطات وقود أدنوك',
        type: 'BANNER_TEXT',
        imageUrl: 'https://images.unsplash.com/photo-1545262810-a5c4ef7b1b8a?w=800&q=80',
        text: 'احصل على خصم 10% على كل تعبئة وقود عند استخدام بطاقة أدنوك للسائقين. العرض ساري حتى نهاية الشهر. سجّل الآن واستفد من التوفير!',
        active: true,
        order: 0,
      },
    }),
    prisma.ad.create({
      data: {
        title: 'صيانة سيارتك بأفضل الأسعار',
        type: 'BANNER_LINK',
        imageUrl: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=800&q=80',
        linkUrl: 'https://www.autodoc.co.uk',
        active: true,
        order: 1,
      },
    }),
    prisma.ad.create({
      data: {
        title: 'تأمين شامل للسيارات بأقل قسط',
        type: 'BANNER_TEXT',
        imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80',
        text: 'تأمين شامل لسيارتك يبدأ من 150 جنيه شهرياً. تغطية كاملة ضد الحوادث والسرقة والكوارث الطبيعية. تواصل معنا الآن!',
        active: true,
        order: 2,
      },
    }),
  ]);

  console.log(`✅ Created ${ads.length} ads:`);
  ads.forEach((ad) => console.log(`  - [${ad.id}] ${ad.title} (${ad.type})`));
}

main()
  .catch((e) => { console.error('❌ Error:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());
