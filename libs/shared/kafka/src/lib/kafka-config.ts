import { KafkaConfig, logLevel } from 'kafkajs';

export const kafkaConfig: KafkaConfig & { groupId: string } = {
  clientId: process.env.KAFKA_CLIENT_ID || 'backend-client',
  brokers: (process.env.KAFKA_BROKERS || 'kafka-broker.railway.internal:9092').split(','),
  logLevel: logLevel.INFO,
  groupId: process.env.KAFKA_GROUP_ID || 'backend-consumer-group',
  // SSL/SASL options if needed...
};
