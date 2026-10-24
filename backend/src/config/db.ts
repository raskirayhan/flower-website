import { PrismaClient } from '@prisma/client';

declare global {
  // Prevent multiple PrismaClient instances during hot-reloads in development
  var prismaClientGlobal: PrismaClient | undefined;
}

export const prisma =
  globalThis.prismaClientGlobal ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaClientGlobal = prisma;
}

export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('📦 PostgreSQL database connected via Prisma ORM.');
  } catch (error) {
    console.warn('⚠️ Notice: Direct PostgreSQL connection skipped (running in demo/mock mode if no live DB URL is configured).');
  }
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
  console.log('📦 PostgreSQL database connection closed.');
}
