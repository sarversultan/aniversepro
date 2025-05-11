import mongoose from 'mongoose';
import redis from '../config/redis.js';
import axios from 'axios';
import logger from './logger.js';

export const checkDatabase = async (): Promise<boolean> => {
  try {
    await mongoose.connection.db.admin().ping();
    return true;
  } catch (error) {
    logger.error('Database health check failed:', error);
    return false;
  }
};

export const checkRedis = async (): Promise<boolean> => {
  try {
    await redis.ping();
    return true;
  } catch (error) {
    logger.error('Redis health check failed:', error);
    return false;
  }
};

export const checkExternalApis = async (): Promise<Record<string, boolean>> => {
  const apis = {
    jikan: 'https://api.jikan.moe/v4',
    anilist: 'https://graphql.anilist.co',
    ann: 'https://www.animenewsnetwork.com/encyclopedia/api.xml'
  };

  const results: Record<string, boolean> = {};

  for (const [name, url] of Object.entries(apis)) {
    try {
      await axios.get(url, { timeout: 5000 });
      results[name] = true;
    } catch (error) {
      logger.error(`${name} API health check failed:`, error);
      results[name] = false;
    }
  }

  return results;
};

export const getSystemHealth = async () => {
  const [db, redis, apis] = await Promise.all([
    checkDatabase(),
    checkRedis(),
    checkExternalApis()
  ]);

  return {
    status: db && redis && Object.values(apis).every(Boolean) ? 'healthy' : 'unhealthy',
    components: {
      database: db,
      redis,
      externalApis: apis
    },
    timestamp: new Date().toISOString()
  };
}; 