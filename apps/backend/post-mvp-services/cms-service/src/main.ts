import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '../generated/cms-service';
import { connectRedis, disconnectRedis, redisClient } from '@shared/middlewares/redis/src/index';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/middlewares/kafka/src/index';
import { logger } from '@shared/middlewares/logger/src/index';
import { createTopicsIfNotExists } from '@shared/middlewares/kafka/src/lib/kafka-admin';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../../../../.env') });

const PORT = process.env.PORT || 3011;
const prisma = new PrismaClient();

const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'cms-service',
  topics: ['cms.post.created', 'cms.post.updated', 'cms.page.deleted'], // Example topics
};

const onMessage = async (topic: string, payload: any) => {
  logger.info(`[Kafka] CMS Service received topic: ${topic}`, payload);
  // TODO: CMS business logic
};

const kafkaMessageHandler = async (message: string) => {
  try {
    const { topic, payload } = JSON.parse(message);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Failed to process Kafka message', err);
  }
};

let server: ReturnType<typeof app.listen> | null = null;

async function start() {
  try {
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    await connectRedis();
    logger.info('✅ Redis connected');
     await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    await connectKafkaProducer();
    logger.info('✅ Kafka Producer connected');

    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka Consumer connected');

    server = app.listen(PORT, () => {
      logger.info(`🚀 CMS Service running at http://localhost:${PORT}`);
      logger.info(
        `📚 Swagger docs available at http://localhost:${PORT}/api/docs/cms`
      );
    });
  } catch (err) {
    logger.error('❌ Failed to start CMS Service', err);
    await shutdown();
    process.exit(1);
  }
}

async function shutdown() {
  logger.info('🛑 Shutting down CMS Service...');
  try {
    await prisma.$disconnect();

    if (redisClient.isOpen) {
      await disconnectRedis();
      logger.info('✅ Redis disconnected');
    }

    await disconnectKafkaProducer();
    await disconnectKafkaConsumer();

    if (server) {
      server.close(() => {
        logger.info('✅ Server closed gracefully');
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

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

start();
