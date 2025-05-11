import axios from 'axios';
import logger from '../utils/logger.js';
import { logApiCall } from '../utils/apiLogger.js';
import { getCache, setCache } from '../utils/cache.js';

interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: {
    url: string;
    width: number;
    height: number;
  }[];
}

interface MangaInfo {
  id: string;
  title: string;
  chapters: Chapter[];
  totalChapters: number;
}

// Primary API (MangaDex)
const fetchFromMangaDex = async (mangaId: string): Promise<MangaInfo | null> => {
  try {
    const startTime = Date.now();
    const response = await axios.get(`https://api.mangadex.org/manga/${mangaId}/feed`);
    
    logApiCall({
      endpoint: `mangadex/manga/${mangaId}/feed`,
      method: 'GET',
      statusCode: response.status,
      responseTime: Date.now() - startTime
    });

    return {
      id: mangaId,
      title: response.data.data.attributes.title.en,
      chapters: response.data.data.map((chapter: any) => ({
        id: chapter.id,
        number: chapter.attributes.chapter,
        title: chapter.attributes.title,
        pages: chapter.attributes.data
      })),
      totalChapters: response.data.data.length
    };
  } catch (error) {
    logger.error('MangaDex API error:', error);
    return null;
  }
};

// Fallback API (MangaPlus)
const fetchFromMangaPlus = async (mangaId: string): Promise<MangaInfo | null> => {
  try {
    const startTime = Date.now();
    const response = await axios.get(`https://api.mangaplus.shueisha.co.jp/titles/${mangaId}/chapters`);
    
    logApiCall({
      endpoint: `mangaplus/titles/${mangaId}/chapters`,
      method: 'GET',
      statusCode: response.status,
      responseTime: Date.now() - startTime
    });

    return {
      id: mangaId,
      title: response.data.title.name,
      chapters: response.data.chapters.map((chapter: any) => ({
        id: chapter.id,
        number: chapter.chapter_number,
        title: chapter.name,
        pages: chapter.pages
      })),
      totalChapters: response.data.chapters.length
    };
  } catch (error) {
    logger.error('MangaPlus API error:', error);
    return null;
  }
};

// Main function to get manga info with fallback
export const getMangaInfo = async (mangaId: string): Promise<MangaInfo | null> => {
  try {
    // Try cache first
    const cached = await getCache(`manga:${mangaId}`);
    if (cached) {
      return cached;
    }

    // Try primary API
    let mangaInfo = await fetchFromMangaDex(mangaId);
    
    // If primary fails, try fallback
    if (!mangaInfo) {
      mangaInfo = await fetchFromMangaPlus(mangaId);
    }

    if (mangaInfo) {
      // Cache for 1 hour
      await setCache(`manga:${mangaId}`, mangaInfo, 3600);
    }

    return mangaInfo;
  } catch (error) {
    logger.error('Failed to fetch manga info:', error);
    return null;
  }
};

// Get specific chapter
export const getChapter = async (mangaId: string, chapterNumber: number): Promise<Chapter | null> => {
  try {
    const mangaInfo = await getMangaInfo(mangaId);
    if (!mangaInfo) return null;

    return mangaInfo.chapters.find(ch => ch.number === chapterNumber) || null;
  } catch (error) {
    logger.error('Failed to fetch chapter:', error);
    return null;
  }
}; 