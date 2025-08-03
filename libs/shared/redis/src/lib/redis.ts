import { createClient } from 'redis';
import { logger } from '@shared/middlewares/logger/src/index';

export const redisClient: ReturnType<typeof createClient> = createClient({
  socket: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

redisClient.on('error', (err) => logger.error('❌ Redis Error:', err));

export async function connectRedis(): Promise<void> {
  if (redisClient.isOpen) {
    logger.info('⚠️ Redis connection already open, skipping connect.');
    return;
  }

  await redisClient.connect();
  logger.info('✅ Redis connected');
}

export async function disconnectRedis(): Promise<void> {
  if (!redisClient.isOpen) {
    logger.info('⚠️ Redis connection already closed, skipping disconnect.');
    return;
  }
  await redisClient.quit();
  logger.info('🔌 Redis disconnected');
}
