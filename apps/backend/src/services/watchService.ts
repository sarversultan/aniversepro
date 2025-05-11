import axios from 'axios';
import redis from '../config/redis.js';
import logger from '../utils/logger.js';
import { logApiCall } from '../utils/apiLogger.js';
import { getCache, setCache } from '../utils/cache.js';

interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail?: string;
  sources: {
    url: string;
    quality: string;
    isM3U8: boolean;
  }[];
}

interface AnimeInfo {
  id: string;
  title: string;
  episodes: Episode[];
  totalEpisodes: number;
}

// Primary API (GogoAnime)
const fetchFromGogoAnime = async (animeId: string): Promise<AnimeInfo | null> => {
  try {
    const startTime = Date.now();
    const response = await axios.get(`https://api.gogoanime.com/anime/${animeId}`);
    
    logApiCall({
      endpoint: `gogoanime/anime/${animeId}`,
      method: 'GET',
      statusCode: response.status,
      responseTime: Date.now() - startTime
    });

    return {
      id: animeId,
      title: response.data.title,
      episodes: response.data.episodes.map((ep: any) => ({
        id: ep.id,
        number: ep.number,
        title: ep.title,
        thumbnail: ep.thumbnail,
        sources: ep.sources
      })),
      totalEpisodes: response.data.totalEpisodes
    };
  } catch (error) {
    logger.error('GogoAnime API error:', error);
    return null;
  }
};

// Fallback API (Zoro)
const fetchFromZoro = async (animeId: string): Promise<AnimeInfo | null> => {
  try {
    const startTime = Date.now();
    const response = await axios.get(`https://api.zoro.to/anime/${animeId}`);
    
    logApiCall({
      endpoint: `zoro/anime/${animeId}`,
      method: 'GET',
      statusCode: response.status,
      responseTime: Date.now() - startTime
    });

    return {
      id: animeId,
      title: response.data.title,
      episodes: response.data.episodes.map((ep: any) => ({
        id: ep.id,
        number: ep.number,
        title: ep.title,
        thumbnail: ep.thumbnail,
        sources: ep.sources
      })),
      totalEpisodes: response.data.totalEpisodes
    };
  } catch (error) {
    logger.error('Zoro API error:', error);
    return null;
  }
};

// Main function to get anime info with fallback
export const getAnimeInfo = async (animeId: string): Promise<AnimeInfo | null> => {
  try {
    // Try cache first
    const cached = await getCache(`anime:${animeId}`);
    if (cached) {
      return cached;
    }

    // Try primary API
    let animeInfo = await fetchFromGogoAnime(animeId);
    
    // If primary fails, try fallback
    if (!animeInfo) {
      animeInfo = await fetchFromZoro(animeId);
    }

    if (animeInfo) {
      // Cache for 1 hour
      await setCache(`anime:${animeId}`, animeInfo, 3600);
    }

    return animeInfo;
  } catch (error) {
    logger.error('Failed to fetch anime info:', error);
    return null;
  }
};

// Get specific episode
export const getEpisode = async (animeId: string, episodeNumber: number): Promise<Episode | null> => {
  try {
    const animeInfo = await getAnimeInfo(animeId);
    if (!animeInfo) return null;

    return animeInfo.episodes.find(ep => ep.number === episodeNumber) || null;
  } catch (error) {
    logger.error('Failed to fetch episode:', error);
    return null;
  }
}; 