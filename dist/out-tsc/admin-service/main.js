"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app_1 = __importDefault(require("./app"));
const client_1 = require("@prisma/client");
const redis_1 = require("@shared/redis");
const kafka_1 = require("@shared/kafka");
const logger_1 = require("@shared/logger");
// 🧪 Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const PORT = parseInt(process.env.PORT || '3008', 10);
const prisma = new client_1.PrismaClient();
// 🔄 Extract all topic strings from nested KAFKA_TOPICS
const extractAllTopics = (topicsObj) => {
    const flat = [];
    for (const category of Object.values(topicsObj)) {
        if (typeof category === 'object') {
            flat.push(...Object.values(category));
        }
    }
    return flat;
};
const kafkaConfig = {
    groupId: 'admin-service',
    topics: extractAllTopics(kafka_1.KAFKA_TOPICS),
};
// 🎯 Kafka Topic Event Dispatcher
const onMessage = async (topic, payload) => {
    try {
        switch (topic) {
            case kafka_1.KAFKA_TOPICS.USER.CREATED:
                logger_1.logger.info(`[Kafka] 🧑 User created`);
                break;
            case kafka_1.KAFKA_TOPICS.ORDER.CREATED:
                logger_1.logger.info(`[Kafka] 📦 Order created`);
                break;
            case kafka_1.KAFKA_TOPICS.EMAIL.USER_CREATED:
                logger_1.logger.info(`[Kafka] 📧 Send welcome email`);
                break;
            default:
                logger_1.logger.warn(`[Kafka] ❓ No handler for topic: ${topic}`);
                logger_1.logger.debug(`[Kafka] Payload: ${JSON.stringify(payload, null, 2)}`);
        }
    }
    catch (err) {
        logger_1.logger.error(`[Kafka] ❌ Handler error for topic "${topic}"`, err);
    }
};
// 📨 Kafka Raw Message Parser
const kafkaMessageHandler = async (message) => {
    try {
        if (typeof message !== 'string') {
            logger_1.logger.warn('[Kafka] ⚠️ Received non-string message');
            return;
        }
        const parsed = JSON.parse(message);
        if (typeof parsed !== 'object' ||
            parsed === null ||
            !('topic' in parsed) ||
            !('payload' in parsed)) {
            logger_1.logger.warn('[Kafka] ⚠️ Invalid message format');
            return;
        }
        const { topic, payload } = parsed;
        await onMessage(topic, payload);
    }
    catch (err) {
        logger_1.logger.error('[Kafka] ❌ Failed to handle message', err);
    }
};
let server = null;
let isShuttingDown = false;
// 🚀 Boot Function
async function start() {
    try {
        logger_1.logger.info('🔧 Initializing Admin Service dependencies...');
        if (kafkaConfig.topics.length === 0) {
            logger_1.logger.warn('[Kafka] ⚠️ No topics configured for consumer');
        }
        await (0, redis_1.connectRedis)();
        logger_1.logger.info('✅ Redis connected');
        await (0, kafka_1.connectKafkaProducer)();
        logger_1.logger.info('✅ Kafka producer connected');
        await (0, kafka_1.connectKafkaConsumer)(kafkaConfig, kafkaMessageHandler);
        logger_1.logger.info('✅ Kafka consumer connected');
        server = app_1.default.listen(PORT, () => {
            logger_1.logger.info(`🚀 Admin Service running at http://localhost:${PORT}`);
        });
    }
    catch (err) {
        logger_1.logger.error('❌ Startup failed:', err);
        await shutdown();
        process.exit(1);
    }
}
// 🧹 Graceful Shutdown
async function shutdown() {
    if (isShuttingDown)
        return;
    isShuttingDown = true;
    logger_1.logger.info('🛑 Gracefully shutting down Admin Service...');
    const shutdownTimeout = setTimeout(() => {
        logger_1.logger.error('⏳ Forced shutdown after timeout');
        process.exit(1);
    }, 10000); // 10s timeout
    try {
        await prisma.$disconnect();
        logger_1.logger.info('✅ Prisma disconnected');
        if (redis_1.redisClient?.status !== 'end') {
            await redis_1.redisClient.quit();
            logger_1.logger.info('✅ Redis disconnected');
        }
        await (0, kafka_1.disconnectKafkaProducer)();
        await (0, kafka_1.disconnectKafkaConsumer)();
        logger_1.logger.info('✅ Kafka disconnected');
        if (server) {
            server.close(() => {
                logger_1.logger.info('✅ HTTP server closed');
                clearTimeout(shutdownTimeout);
                process.exit(0);
            });
        }
        else {
            clearTimeout(shutdownTimeout);
            process.exit(0);
        }
    }
    catch (err) {
        logger_1.logger.error('❌ Shutdown error:', err);
        clearTimeout(shutdownTimeout);
        process.exit(1);
    }
}
// 🛡 Global Exception & Signal Handling
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('❌ Unhandled Rejection:', reason);
    shutdown();
});
process.on('uncaughtException', (error) => {
    logger_1.logger.error('❌ Uncaught Exception:', error);
    shutdown();
});
// 🟢 Start the service
start();
//# sourceMappingURL=main.js.map