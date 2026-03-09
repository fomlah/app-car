import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function syncCompanies() {
    console.log('🔄 Syncing companies from Incomes/WorkSessions to Company table...');

    // Get distinct companies from Incomes
    const incomes = await prisma.income.findMany({
        select: { company: true },
        distinct: ['company']
    });

    // Get distinct companies from WorkSessions
    const workSessions = await prisma.workSession.findMany({
        select: { company: true },
        distinct: ['company']
    });

    const uniqueCompanyNames = new Set([
        ...incomes.map((i: any) => i.company),
        ...workSessions.map((w: any) => w.company),
        'Uber', 'Didi', 'InDrive' // Default ones just in case
    ]);

    console.log(`Found ${uniqueCompanyNames.size} unique companies:`, Array.from(uniqueCompanyNames));

    const colors: Record<string, string> = {
        'Uber': '#000000',
        'Didi': '#f97316',
        'InDrive': '#a3e635'
    };

    let order = 0;
    for (const name of uniqueCompanyNames) {
        if (!name) continue;

        const existing = await prisma.company.findUnique({
            where: { name }
        });

        if (!existing) {
            await prisma.company.create({
                data: {
                    name,
                    nameAr: name, // We can use the same name initially
                    color: colors[name] || '#6366f1',
                    commission: name === 'Uber' ? 20 : name === 'Didi' ? 15 : name === 'InDrive' ? 10 : 0,
                    active: true,
                    order: order++
                }
            });
            console.log(`✅ Added company: ${name}`);
        } else {
            console.log(`ℹ️ Company already exists: ${name}`);
        }
    }

    console.log('✅ Sync complete!');
}

syncCompanies()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
