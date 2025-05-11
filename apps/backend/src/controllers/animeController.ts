import { Request, Response, NextFunction } from 'express';
import { fetchFromJikan } from '../utils/fetchFromJikan.js';

export const getTrendingAnime = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchFromJikan('top/anime?filter=bypopularity');
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const searchAnime = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string;
  if (!query) return res.status(400).json({ success: false, message: 'Missing search query' });

  try {
    const data = await fetchFromJikan(`anime?q=${query}&limit=10`);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getAnimeDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const data = await fetchFromJikan(`anime/${id}/full`);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}; 