import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

function getDatabaseUrl(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const tmpDb = '/tmp/dev.db';
    let needsCopy = true;
    if (fs.existsSync(tmpDb)) {
      try {
        const stat = fs.statSync(tmpDb);
        if (stat.size > 10000) {
          needsCopy = false;
        }
      } catch {}
    }
    if (needsCopy) {
      const candidates = [
        path.join(process.cwd(), 'prisma', 'dev.db'),
        path.join(process.cwd(), 'dev.db'),
        path.resolve('./prisma/dev.db'),
        path.resolve('./dev.db'),
        path.resolve('prisma/dev.db'),
        path.resolve('dev.db'),
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
      const url = `file:${tmpDb}`;
      process.env.DATABASE_URL = url;
      return url;
    }
  }
  return process.env.DATABASE_URL || 'file:./prisma/dev.db';
}

const dbUrl = getDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: dbUrl,
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
