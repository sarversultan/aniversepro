import { Request, Response, NextFunction } from 'express';
import Comment from '../models/Comment.js';

export const postComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId, content } = req.body;
    const comment = new Comment({ animeId, userId: req.user.id, content });
    await comment.save();
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    next(error);
  }
};

export const getCommentsByAnimeId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { animeId } = req.params;
    const comments = await Comment.find({ animeId }).populate('userId', 'username');
    res.json({ success: true, data: comments });
  } catch (error) {
    next(error);
  }
}; 