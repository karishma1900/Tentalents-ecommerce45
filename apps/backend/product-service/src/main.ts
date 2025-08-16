import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { redisClient, connectRedis } from '@shared/redis';

import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';
import { createTopicsIfNotExists } from '@shared/kafka';
// 🛠️ Load .env config
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = parseInt(process.env.PORT || '3003', 10);
const prisma = new PrismaClient();

// 🎯 Kafka Consumer Configuration
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'product-service',
  topics: ['product.updated', 'product.deleted'],
};

// 📨 Kafka Message Handler
async function kafkaMessageHandler(message: string): Promise<void> {
  logger.info(`[Kafka] 📨 Received message: ${message}`);

  try {
    const event = JSON.parse(message);
    // TODO: Route to proper handlers if needed
    logger.info(`🔄 Processed event for product ID: ${event.id}`);
  } catch (err) {
    logger.error('❌ Failed to parse/process Kafka message:', err);
  }
}

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start the Product Service
async function start() {
  try {
    logger.info('🚀 Starting Product Service...');
 logger.info(`Starting server on port ${PORT} and binding to 0.0.0.0`);
    server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server is listening on http://0.0.0.0:${PORT}`);
    });
    // Connect Redis
    await connectRedis();
    logger.info('✅ Redis connected');

    // Connect Prisma (PostgreSQL)
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    // Create Kafka topics BEFORE connecting Kafka clients
    await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    // Connect Kafka Producer
    await connectKafkaProducer();
    logger.info('✅ Kafka producer connected');

    // Connect Kafka Consumer
    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka consumer connected');

   

  } catch (err) {
    logger.error('❌ Startup error in Product Service:', err);
    await shutdown(1);
  }
}


// 🛑 Graceful Shutdown
async function shutdown(exitCode = 0) {
  logger.info('🛑 Shutting down Product Service...');

  try {
    await prisma.$disconnect();

    if (redisClient.isOpen) {
      await redisClient.quit();
      logger.info('✅ Redis client disconnected');
    }

    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();

    if (server) {
      server.close(() => {
        logger.info('✅ HTTP server closed');
        process.exit(exitCode);
      });
    } else {
      process.exit(exitCode);
    }
  } catch (err) {
    logger.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// 🧯 OS Signal Handlers
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// 🚦 Start the app
start();
