import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function initializeDatabaseUrl() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDb = '/tmp/dev.db';
    if (!fs.existsSync(tmpDb)) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.resolve('./prisma/dev.db'),
        path.resolve('./dev.db'),
      ];
      for (const candidate of candidates) {
        if (fs.existsSync(candidate)) {
          try {
            fs.copyFileSync(candidate, tmpDb);
            break;
          } catch (e) {
            console.error('Failed copying database to /tmp:', e);
          }
        }
      }
    }
    if (fs.existsSync(tmpDb)) {
      process.env.DATABASE_URL = `file:${tmpDb}`;
    }
  }
}

initializeDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
