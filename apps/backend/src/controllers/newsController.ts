import { Request, Response, NextFunction } from 'express';
import { fetchAnimeNews } from '../utils/fetchFromAnn.js';

export const getNews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newsItems = await fetchAnimeNews();
    res.json({ success: true, data: newsItems });
  } catch (error) {
    next(error);
  }
}; 