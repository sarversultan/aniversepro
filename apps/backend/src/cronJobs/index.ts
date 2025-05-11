import cron from 'node-cron';
import redis from '../config/redis.js';
import axios from 'axios';
import logger from '../utils/logger.js';

// Cache trending anime every 6 hours
export const cacheTrendingAnime = async () => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    const cacheKey = 'trending:anime';
    
    await redis.set(cacheKey, JSON.stringify(response.data), 'EX', 21600); // 6 hours
    logger.info('Trending anime cache updated successfully');
  } catch (error) {
    logger.error('Failed to update trending anime cache:', error);
  }
};

// Initialize cron jobs
export const initCronJobs = () => {
  // Run every 6 hours
  cron.schedule('0 */6 * * *', cacheTrendingAnime);
  
  // Run immediately on startup
  cacheTrendingAnime();
  
  logger.info('Cron jobs initialized');
}; 