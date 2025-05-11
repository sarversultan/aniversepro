import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const getStatistics = async () => {
  try {
    const [
      totalUsers,
      activeUsers,
      totalComments,
      totalFavorites,
      totalWatchHistory
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ updatedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
      Comment.countDocuments(),
      User.aggregate([{ $project: { count: { $size: "$favorites" } } }, { $group: { _id: null, total: { $sum: "$count" } } }]),
      User.aggregate([{ $project: { count: { $size: "$watchHistory" } } }, { $group: { _id: null, total: { $sum: "$count" } } }])
    ]);

    return {
      users: {
        total: totalUsers,
        active: activeUsers
      },
      content: {
        comments: totalComments,
        favorites: totalFavorites[0]?.total || 0,
        watchHistory: totalWatchHistory[0]?.total || 0
      },
      lastUpdated: new Date()
    };
  } catch (error) {
    throw new Error('Failed to fetch statistics');
  }
}; 