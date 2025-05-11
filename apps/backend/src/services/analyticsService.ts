import User from '../models/User.js';
import Comment from '../models/Comment.js';
import redis from '../config/redis.js';
import logger from '../utils/logger.js';

export const getAnalytics = async () => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalComments,
      totalFavorites,
      totalWatchHistory,
      activeSessions
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ updatedAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } }),
      Comment.countDocuments(),
      User.aggregate([{ $project: { count: { $size: "$favorites" } } }, { $group: { _id: null, total: { $sum: "$count" } } }]),
      User.aggregate([{ $project: { count: { $size: "$watchHistory" } } }, { $group: { _id: null, total: { $sum: "$count" } } }]),
      redis.get('active:sessions') || 0
    ]);

    // Get top commented anime
    const topCommentedAnime = await Comment.aggregate([
      { $group: { _id: '$animeId', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    // Get top favorited anime
    const topFavoritedAnime = await User.aggregate([
      { $unwind: '$favorites' },
      { $group: { _id: '$favorites', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers,
        activeSessions: parseInt(activeSessions as string)
      },
      content: {
        comments: totalComments,
        favorites: totalFavorites[0]?.total || 0,
        watchHistory: totalWatchHistory[0]?.total || 0
      },
      topContent: {
        commentedAnime: topCommentedAnime,
        favoritedAnime: topFavoritedAnime
      },
      lastUpdated: new Date()
    };
  } catch (error) {
    logger.error('Failed to fetch analytics:', error);
    throw new Error('Failed to fetch analytics');
  }
}; 