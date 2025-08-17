import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { createTopicsIfNotExists } from '@shared/kafka';

import { PrismaClient } from '@prisma/client';
import { connectRedis, redisClient } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';
import cors from 'cors';
// 🔧 Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const allowedOrigins = [
  'http://localhost:3000',
  'https://tentalents-ecommerce45.vercel.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // if you're using cookies or authorization headers
}));
const PORT = parseInt(process.env.PORT || '3018', 10);
const prisma = new PrismaClient();

// 🧭 Kafka Consumer Configuration
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'user-service',
  topics: ['user.updated'], // 🔄 Replace or expand based on user events
};

// 📨 Kafka Message Handler
const onMessage = async (topic: string, payload: any): Promise<void> => {
  logger.info(`[Kafka] 🔔 Received event on topic: ${topic}`, payload);
  // TODO: Implement user update handling logic
};

const kafkaMessageHandler = async (message: string): Promise<void> => {
  try {
    const { topic, payload } = JSON.parse(message);
    await onMessage(topic, payload);
  } catch (err) {
    logger.error('❌ Kafka message parsing failed:', err);
  }
};

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start User Service
async function start() {
  try {
    logger.info('🔧 Initializing User Service...');
logger.info(`Starting server on port ${PORT} and binding to 0.0.0.0`);
    server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server is listening on http://0.0.0.0:${PORT}`);
    });
    // Redis
    await connectRedis();
    logger.info('✅ Redis connected');

    // <<< Add topic creation here before producer/consumer connects
    await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    await connectKafkaProducer();
    logger.info('✅ Kafka producer connected');

    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka consumer connected');

    // PostgreSQL
    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    // Express server
    
  } catch (err) {
    logger.error('❌ Failed to start User Service:', err);
    await shutdown();
    process.exit(1);
  }
}

// 🛑 Graceful Shutdown
async function shutdown() {
  logger.info('🛑 Shutting down User Service...');
  try {
    await prisma.$disconnect();
    logger.info('✅ PostgreSQL disconnected');

    if (redisClient.isOpen) {
      await redisClient.quit();
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

// 🧼 Handle termination signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// 🚀 Start the service
start();
