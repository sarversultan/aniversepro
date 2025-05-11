import axios from 'axios';
import { parseString } from 'xml2js';
import { getCache, setCache } from '../services/cache.js';

export const fetchAnimeNews = async () => {
  const cacheKey = 'ann_news';
  const cachedData = await getCache(cacheKey);
  if (cachedData) return cachedData;

  try {
    const response = await axios.get('https://www.animenewsnetwork.com/all/rss.xml');
    const xmlData = response.data;
    parseString(xmlData, (err, result) => {
      if (err) throw new Error('Failed to parse RSS XML');
      const newsItems = result.rss.channel[0].item.slice(0, 10);
      setCache(cacheKey, newsItems, 600); // Cache for 10 minutes
      return newsItems;
    });
  } catch (error) {
    throw new Error('Failed to fetch from ANN API');
  }
}; 