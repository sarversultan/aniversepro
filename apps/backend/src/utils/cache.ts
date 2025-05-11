import redis from '../config/redis.js';
import logger from './logger.js';

export const clearCache = async () => {
  try {
    const keys = await redis.keys('*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    logger.info('Cache cleared successfully');
  } catch (error) {
    logger.error('Failed to clear cache:', error);
    throw error;
  }
};

export const getCache = async (key: string) => {
  try {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Failed to get cache for key ${key}:`, error);
    return null;
  }
};

export const setCache = async (key: string, data: any, expireSeconds?: number) => {
  try {
    const stringData = JSON.stringify(data);
    if (expireSeconds) {
      await redis.set(key, stringData, 'EX', expireSeconds);
    } else {
      await redis.set(key, stringData);
    }
  } catch (error) {
    logger.error(`Failed to set cache for key ${key}:`, error);
  }
};

export const deleteCache = async (key: string) => {
  try {
    await redis.del(key);
  } catch (error) {
    logger.error(`Failed to delete cache for key ${key}:`, error);
  }
}; 