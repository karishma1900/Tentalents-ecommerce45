import dotenv from 'dotenv';
import path from 'path';
import { Server } from 'http';
import app from './app';

import { logger } from '@shared/logger';
import { config } from '@shared/config';
import { connectRedis, disconnectRedis } from '@shared/redis';
import {
      // ✅ Import this
  connectKafkaProducer,
  disconnectKafkaProducer
} from '@shared/kafka';
import { getKafkaInstance } from '@shared/kafka';
import { kafkaConfig } from '@shared/kafka'; // ✅ Import your Kafka config
import { connectMinio, disconnectMinio } from '@shared/minio';

// 🌍 Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const PORT = process.env.PORT || 3010;

async function start() {
  let server: Server | undefined;

  try {
    // ✅ Initialize Kafka before using it
   
getKafkaInstance();
    // 🔌 Connect External Dependencies (Kafka, Redis, MinIO)
    await Promise.all([
      connectKafkaProducer(),
      connectRedis(),
      connectMinio(),
    ]);

    // 🟢 Start HTTP Server
    server = app.listen(PORT, () => {
      logger.info(`🚀 Vendor Service is running at http://localhost:${PORT}`);
      logger.info(`📚 Swagger docs available at http://localhost:${PORT}/api/docs/vendor`);
    });

    // 🧼 Graceful Shutdown Handling
    const shutdown = async () => {
      logger.info('🛑 Gracefully shutting down Vendor Service...');

      try {
        await Promise.all([
          disconnectKafkaProducer(),
          disconnectRedis(),
          disconnectMinio(),
        ]);

        server?.close(() => {
          logger.info('✅ Vendor Service shut down cleanly');
          process.exit(0);
        });
      } catch (err) {
        logger.error('❌ Error during shutdown:', err);
        process.exit(1);
      }
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  } catch (err) {
    logger.error('❌ Failed to start Vendor Service:', err);
    process.exit(1);
  }
}

start();
