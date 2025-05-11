import { Request, Response, NextFunction } from 'express';
import { getMangaInfo, getChapter } from '../services/readService.js';
import logger from '../utils/logger.js';

export const getMangaChapters = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mangaId } = req.params;
    
    const mangaInfo = await getMangaInfo(mangaId);
    if (!mangaInfo) {
      return res.status(404).json({
        success: false,
        message: 'Manga not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: mangaInfo.id,
        title: mangaInfo.title,
        totalChapters: mangaInfo.totalChapters,
        chapters: mangaInfo.chapters.map(ch => ({
          id: ch.id,
          number: ch.number,
          title: ch.title
        }))
      }
    });
  } catch (error) {
    logger.error('Error in getMangaChapters:', error);
    next(error);
  }
};

export const getMangaChapter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mangaId, chapterNumber } = req.params;
    const chapterNum = parseInt(chapterNumber);

    if (isNaN(chapterNum)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid chapter number'
      });
    }

    const chapter = await getChapter(mangaId, chapterNum);
    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: 'Chapter not found'
      });
    }

    res.json({
      success: true,
      data: chapter
    });
  } catch (error) {
    logger.error('Error in getMangaChapter:', error);
    next(error);
  }
}; 