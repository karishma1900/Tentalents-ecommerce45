import { Kafka, KafkaConfig } from 'kafkajs';
export declare const initKafka: (config: KafkaConfig) => void;
export declare const getKafkaInstance: () => Kafka;
