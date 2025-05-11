import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';

export const addToFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.favorites.includes(animeId)) {
      return res.status(400).json({ success: false, message: 'Anime already in favorites' });
    }

    user.favorites.push(animeId);
    await user.save();

    res.json({ success: true, message: 'Added to favorites', data: user.favorites });
  } catch (error) {
    next(error);
  }
};

export const removeFromFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.favorites = user.favorites.filter(id => id !== animeId);
    await user.save();

    res.json({ success: true, message: 'Removed from favorites', data: user.favorites });
  } catch (error) {
    next(error);
  }
};

export const getFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user.favorites });
  } catch (error) {
    next(error);
  }
};

export const addToWatchHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId } = req.params;
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove existing entry if it exists
    user.watchHistory = user.watchHistory.filter(item => item.animeId !== animeId);
    
    // Add new entry
    user.watchHistory.push({ animeId, watchedAt: new Date() });
    await user.save();

    res.json({ success: true, message: 'Added to watch history', data: user.watchHistory });
  } catch (error) {
    next(error);
  }
};

export const getWatchHistory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Sort by most recent
    const sortedHistory = user.watchHistory.sort((a, b) => 
      b.watchedAt.getTime() - a.watchedAt.getTime()
    );

    res.json({ success: true, data: sortedHistory });
  } catch (error) {
    next(error);
  }
}; 