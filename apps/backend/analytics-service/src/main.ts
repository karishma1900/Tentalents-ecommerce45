// ✅ Load environment variables from shared env loader
import '@shared/middlewares/config/src/lib/env';
import net from 'net';

import app from './app';
import { PrismaClient } from '@prisma/client';
import { redisClient, connectRedis } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
  getKafkaConsumer
} from '@shared/kafka';

import { env } from '@shared/config';
import { logger } from '@shared/logger';

const prisma = new PrismaClient();
const SERVICE_NAME = env.SERVICE_NAME;

// Helper function to check if a port is free
async function isPortAvailable(port: number): Promise<boolean> {
  return new Promise((resolve) => {
    const server = net.createServer()
      .once('error', (err: any) => {
        if (err.code === 'EADDRINUSE') resolve(false);
        else resolve(false);
      })
      .once('listening', () => {
        server.close(() => resolve(true));
      })
      .listen(port);
  });
}

let server: ReturnType<typeof app.listen> | null = null;

async function start() {
  try {
    if (!env.JWT_SECRET) {
      throw new Error('Missing env: JWT_SECRET');
    }

    logger.info(`🔧 Bootstrapping ${SERVICE_NAME}...`);

    await connectRedis();
    logger.info('✅ Redis connected');

    await getKafkaConsumer();
    logger.info('✅ Kafka connected');

    // Start trying ports at env.PORT or fallback to 3010
const servicePortEnvVar = `${SERVICE_NAME.toUpperCase().replace(/-/g, '_')}_PORT`;

// Get the port number from env dynamically
let port = Number((env as any)[servicePortEnvVar]) || 3010;
    const maxAttempts = 10;
    let attempts = 0;

    while (!(await isPortAvailable(port))) {
      logger.warn(`⚠️ Port ${port} is busy, trying next port...`);
      port++;
      attempts++;
      if (attempts >= maxAttempts) {
        throw new Error(`No free ports found after ${maxAttempts} attempts`);
      }
    }

    server = app.listen(port, () => {
      logger.info(`🚀 ${SERVICE_NAME} running at http://localhost:${port}`);
    });
  } catch (err) {
    logger.error('❌ Service startup failed:', err);
    await shutdown();
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('🛑 Initiating graceful shutdown...');

  try {
    await disconnectKafkaConsumer();
    await disconnectKafkaProducer();
    logger.info('✅ Kafka disconnected');

    if ((redisClient as any)?.isOpen) {
      await redisClient.quit();
      logger.info('✅ Redis disconnected');
    }

    await prisma.$disconnect();
    logger.info('✅ Prisma disconnected');

    if (server) {
      server.close(() => {
        logger.info('✅ HTTP server closed');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  } catch (err) {
    logger.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// OS Signal Listeners
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the app
start();
