import { Request, Response, NextFunction } from 'express';
import { getAnimeInfo, getEpisode } from '../services/watchService.js';
import logger from '../utils/logger.js';

export const getAnimeEpisodes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId } = req.params;
    
    const animeInfo = await getAnimeInfo(animeId);
    if (!animeInfo) {
      return res.status(404).json({
        success: false,
        message: 'Anime not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: animeInfo.id,
        title: animeInfo.title,
        totalEpisodes: animeInfo.totalEpisodes,
        episodes: animeInfo.episodes.map(ep => ({
          id: ep.id,
          number: ep.number,
          title: ep.title,
          thumbnail: ep.thumbnail
        }))
      }
    });
  } catch (error) {
    logger.error('Error in getAnimeEpisodes:', error);
    next(error);
  }
};

export const getAnimeEpisode = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId, episodeNumber } = req.params;
    const episodeNum = parseInt(episodeNumber);

    if (isNaN(episodeNum)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid episode number'
      });
    }

    const episode = await getEpisode(animeId, episodeNum);
    if (!episode) {
      return res.status(404).json({
        success: false,
        message: 'Episode not found'
      });
    }

    res.json({
      success: true,
      data: episode
    });
  } catch (error) {
    logger.error('Error in getAnimeEpisode:', error);
    next(error);
  }
}; 