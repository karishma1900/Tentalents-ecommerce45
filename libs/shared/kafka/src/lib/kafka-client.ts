import { Kafka, KafkaConfig } from 'kafkajs';

let kafka: Kafka | null = null;

export const initKafka = (config: KafkaConfig): void => {
  kafka = new Kafka(config);
};

export const getKafkaInstance = (): Kafka => {
  if (!kafka) {
    throw new Error('Kafka is not initialized. Call initKafka() first.');
  }
  return kafka;
};
