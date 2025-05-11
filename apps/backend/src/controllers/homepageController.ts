import { Request, Response, NextFunction } from 'express';
import { fetchFromJikan } from '../utils/fetchFromJikan.js';
import { fetchAnimeNews } from '../utils/fetchFromAnn.js';

export const getHomepageData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [trendingAnime, trendingManga, news] = await Promise.all([
      fetchFromJikan('top/anime?filter=bypopularity'),
      fetchFromJikan('top/manga?filter=bypopularity'),
      fetchAnimeNews(),
    ]);
    res.json({ success: true, data: { trendingAnime, trendingManga, news } });
  } catch (error) {
    next(error);
  }
}; 