import { prisma } from '@/lib/prisma';

export async function logActivity(userId: number, action: string, details?: string) {
  try {
    await prisma.activityLog.create({
      data: { action, details: details || null, userId },
    });
  } catch (e) {
    console.error('Failed to log activity:', e);
  }
}
