import { Router, Request, Response } from 'express';
import { fetchWithCache, transformMedia } from '../utils/anilistHelpers';
import { TRENDING_ANIME_QUERY, POPULAR_ANIME_QUERY, SEASONAL_ANIME_QUERY, getCurrentSeason } from '../utils/anilistQueries';

const router = Router();

// 1. Trending Anime
router.get('/api/anime/trending', async (_req: Request, res: Response) => {
  try {
    const data = await fetchWithCache(TRENDING_ANIME_QUERY);
    const mediaList = data?.data?.Page?.media || [];
    const transformed = mediaList.map(transformMedia);
    res.json(transformed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending anime.' });
  }
});

// 2. Popular Anime
router.get('/api/anime/popular', async (_req: Request, res: Response) => {
  try {
    const data = await fetchWithCache(POPULAR_ANIME_QUERY);
    const mediaList = data?.data?.Page?.media || [];
    const transformed = mediaList.map(transformMedia);
    res.json(transformed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular anime.' });
  }
});

// 3. Seasonal Anime
router.get('/api/anime/seasonal', async (_req: Request, res: Response) => {
  const { season, year } = getCurrentSeason();
  const seasonalQuery = SEASONAL_ANIME_QUERY(season, year);
  try {
    const data = await fetchWithCache(seasonalQuery, { season, seasonYear: year });
    const mediaList = data?.data?.Page?.media || [];
    const transformed = mediaList.map(transformMedia);
    res.json(transformed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch seasonal anime.' });
  }
});

export default router; 