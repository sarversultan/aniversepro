import { Request, Response, NextFunction } from 'express';
import { fetchFromJikan } from '../utils/fetchFromJikan.js';

export const getTrendingManga = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchFromJikan('top/manga?filter=bypopularity');
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const searchManga = async (req: Request, res: Response, next: NextFunction) => {
  const query = req.query.q as string;
  if (!query) return res.status(400).json({ success: false, message: 'Missing search query' });

  try {
    const data = await fetchFromJikan(`manga?q=${query}&limit=10`);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getMangaDetails = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const data = await fetchFromJikan(`manga/${id}/full`);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}; 