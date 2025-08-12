import { redisClient } from './redis';

export const setCache = async (
  key: string,
  value: unknown,
  ttlInSeconds = 3600
): Promise<void> => {
  const data = JSON.stringify(value);
  await redisClient.set(key, data, { EX: ttlInSeconds });
};

export const getCache = async <T>(key: string): Promise<T | null> => {
  const data = await redisClient.get(key);
  if (!data) return null;
  return JSON.parse(data) as T;
};

export const deleteCache = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
