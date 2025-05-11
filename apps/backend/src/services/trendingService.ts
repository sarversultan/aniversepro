import axios from 'axios';
import redis from '../config/redis.js';
import logger from '../utils/logger.js';
import { logApiCall } from '../utils/apiLogger.js';

export const fetchTrendingAnime = async () => {
  try {
    const startTime = Date.now();
    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    const trending = response.data.data;

    // Cache the trending anime for 6 hours
    await redis.set('trending:anime', JSON.stringify(trending), 'EX', 21600);

    // Log the successful API call
    logApiCall({
      endpoint: 'jikan/top/anime',
      method: 'GET',
      statusCode: response.status,
      responseTime: Date.now() - startTime
    });

    logger.info('Trending anime cache updated successfully');
    return trending;
  } catch (error) {
    logger.error('Failed to fetch trending anime:', error);
    throw error;
  }
};

export const getTrendingAnime = async () => {
  try {
    // Try to get from cache first
    const cached = await redis.get('trending:anime');
    if (cached) {
      return JSON.parse(cached);
    }

    // If not in cache, fetch and cache
    return await fetchTrendingAnime();
  } catch (error) {
    logger.error('Failed to get trending anime:', error);
    throw error;
  }
}; 