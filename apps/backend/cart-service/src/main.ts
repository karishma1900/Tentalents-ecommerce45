import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { logger } from '@shared/logger';
import { connectRedis, redisClient } from '@shared/redis';
import { createTopicsIfNotExists } from '@shared/kafka';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';

// 🔧 Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 🛠️ Setup
const PORT = parseInt(process.env.PORT || '3020', 10);
const prisma = new PrismaClient();

// 🔌 Kafka Config (Cart Service is mostly a producer but we leave config in place)
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'cart-service',
  topics: [], // No consumer topics for now (producer-only mode)
};

// 📩 Kafka Message Handler
async function kafkaMessageHandler(message: string): Promise<void> {
  if (!kafkaConfig.topics.length) return; // 🧠 Skip if no topics

  logger.info(`[Kafka] 📨 Received message: ${message}`);
  try {
    const parsed = JSON.parse(message);
    // TODO: Implement event handling when consumer topics are added
  } catch (err) {
    logger.error('❌ Failed to handle Kafka message:', err);
  }
}

// 🌐 HTTP server reference
let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start service
async function start() {
  try {
    logger.info('🚀 Starting Cart Service...');
    logger.info(`Starting server on port ${PORT} and binding to 0.0.0.0`);
    server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server is listening on http://0.0.0.0:${PORT}`);
    });

    // Redis
    await connectRedis();
    logger.info('✅ Redis connected');

    // PostgreSQL
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    // Kafka Topics
    await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    // Kafka Producer
    await connectKafkaProducer();
    logger.info('✅ Kafka producer connected');

    // Kafka Consumer (if topics exist)
    if (kafkaConfig.topics.length) {
      await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
      logger.info('✅ Kafka consumer connected');
    }
  } catch (err) {
    logger.error('❌ Failed to start Cart Service:', err);
    await shutdown(1);
  }
}

// 🧹 Graceful Shutdown
async function shutdown(exitCode = 0) {
  logger.info('🛑 Shutting down Cart Service...');

  try {
    await prisma.$disconnect();

    if (redisClient.isOpen) {
      await redisClient.quit();
      logger.info('✅ Redis disconnected');
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

// 🪦 Handle process signals
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// 🔥 Start app
start();
