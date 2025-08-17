import dotenv from 'dotenv';
import path from 'path';
import app from './app';
import { PrismaClient } from '@prisma/client';
import { createTopicsIfNotExists } from '@shared/kafka';
import { redisClient, connectRedis } from '@shared/redis';
import {
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
  KafkaConsumerConfig,
} from '@shared/kafka';
import { logger } from '@shared/logger';
import cors from 'cors';
// 🧪 Load environment variables
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
const PORT = parseInt(process.env.PORT || '3005', 10);
const prisma = new PrismaClient();

// 🧵 Kafka consumer config
const kafkaConfig: KafkaConsumerConfig = {
  groupId: 'payment-service',
  topics: ['order.placed', 'payment.requested'], // Add actual topics used in your platform
};

// 📨 Kafka message handler
async function kafkaMessageHandler(message: string): Promise<void> {
  logger.info(`[Kafka] 🎯 Received message: ${message}`);

  try {
    const event = JSON.parse(message);

    switch (event.type) {
      case 'payment.requested':
        logger.info('💰 Processing payment request...');
        // TODO: implement payment request handling
        break;

      case 'order.placed':
        logger.info('🧾 Order placed event received...');
        // TODO: maybe prepare for payment, send confirmation, etc.
        break;

      default:
        logger.warn(`⚠️ Unknown event type: ${event.type}`);
    }
  } catch (err) {
    logger.error('❌ Failed to parse Kafka message:', err);
  }
}

let server: ReturnType<typeof app.listen> | null = null;

// 🚀 Start the service
async function start() {
  try {
    logger.info('🚀 Starting Payment Service...');
     logger.info(`Starting server on port ${PORT} and binding to 0.0.0.0`);
    server = app.listen(PORT, '0.0.0.0', () => {
      logger.info(`Server is listening on http://0.0.0.0:${PORT}`);
    });

    await connectRedis();
    logger.info('✅ Redis connected');

    await prisma.$connect();
    logger.info('✅ PostgreSQL connected');

    // 👇 Add this BEFORE Kafka producer/consumer connect
    await createTopicsIfNotExists(kafkaConfig.topics);
    logger.info('✅ Kafka topics created or verified');

    await connectKafkaProducer();
    logger.info('✅ Kafka producer ready');

    await connectKafkaConsumer(kafkaConfig, kafkaMessageHandler);
    logger.info('✅ Kafka consumer subscribed');

   
  } catch (err) {
    logger.error('❌ Error during startup:', err);
    await shutdown(1);
  }
}

// 🛑 Graceful shutdown
async function shutdown(code = 0) {
  logger.info('🛑 Shutting down Payment Service...');

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
        process.exit(code);
      });
    } else {
      process.exit(code);
    }
  } catch (err) {
    logger.error('❌ Error during shutdown:', err);
    process.exit(1);
  }
}

// 🧯 OS signal listeners
process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

// 🔥 Boot the service
start();
