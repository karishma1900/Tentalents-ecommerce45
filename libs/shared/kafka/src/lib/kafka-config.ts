// libs/shared/kafka/src/lib/kafka-config.ts
import { KafkaConfig, logLevel } from 'kafkajs';

export const kafkaConfig: KafkaConfig & { groupId: string } = {
  clientId: 'backend',
  brokers: (process.env.KAFKA_BROKERS || 'localhost:9092').split(','),
  logLevel: logLevel.INFO,
  
  groupId: process.env.KAFKA_GROUP_ID || 'backend-consumer-group',

  // Uncomment if you need SSL/SASL...
};
