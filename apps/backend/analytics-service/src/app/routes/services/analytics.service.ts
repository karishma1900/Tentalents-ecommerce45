import { PrismaClient, Metric } from '../../../../generated/analytics-service';

// Handle Prisma singleton in development
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Defines shape of returned summary object
type MetricSummary = Record<string, number>;

export const analyticsService = {
  async incrementEvent(type: string): Promise<void> {
    try {
      await prisma.metric.upsert({
        where: { name: type },
        update: {
          value: { increment: 1 },
        },
        create: {
          name: type,
          value: 1,
        },
      });
    } catch (error) {
      console.error(`❌ Failed to increment metric "${type}":`, error);
      throw new Error('Failed to increment metric');
    }
  },

  async getSummary(): Promise<MetricSummary> {
    try {
      const allMetrics: Metric[] = await prisma.metric.findMany();
      return allMetrics.reduce<MetricSummary>((acc, metric) => {
        acc[metric.name] = metric.value;
        return acc;
      }, {});
    } catch (error) {
      console.error('❌ Failed to get metric summary:', error);
      throw new Error('Failed to get metric summary');
    }
  }
};
