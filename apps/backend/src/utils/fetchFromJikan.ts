import axios from 'axios';
import { getCache, setCache } from '../services/cache.js';

export const fetchFromJikan = async (endpoint: string) => {
  const cachedData = getCache(endpoint);
  if (cachedData) return cachedData;

  try {
    const { data } = await axios.get(`https://api.jikan.moe/v4/${endpoint}`);
    setCache(endpoint, data);
    return data;
  } catch (error) {
    throw new Error('Failed to fetch from Jikan API');
  }
}; 