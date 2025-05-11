import NodeCache from 'node-cache';
import Redis from 'ioredis';

const useRedis = process.env.USE_REDIS === 'true';
const nodeCache = new NodeCache({
  stdTTL: 60 * 5, // 5 minutes default TTL
  checkperiod: 120, // Clean expired cache every 2 minutes
});

let redisClient: Redis | null = null;
if (useRedis) {
  redisClient = new Redis();
}

export const getCache = async (key: string) => {
  if (useRedis && redisClient) {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } else {
    return nodeCache.get(key);
  }
};

export const setCache = async (key: string, value: any, ttl: number = 300) => {
  if (useRedis && redisClient) {
    await redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  } else {
    nodeCache.set(key, value, ttl);
  }
}; 