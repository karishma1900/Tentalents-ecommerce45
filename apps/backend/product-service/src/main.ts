import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '../../../../generated/prisma';
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

const PORT = process.env.PORT || 3003;
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

    await connectRedis();
    logger.info('✅ Redis connected');

    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

 // <<< Add topic creation here before producer/consumer connects
    await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    await connectKafkaProducer();
    logger.info('✅ Kafka producer connected');

    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka consumer connected');

    server = app.listen(PORT, () => {
      logger.info(`📦 Product Service running at http://localhost:${PORT}`);
    });
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
