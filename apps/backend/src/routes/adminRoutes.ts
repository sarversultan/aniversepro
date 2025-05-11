import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { getAnalytics } from '../services/analyticsService.js';
import User from '../models/User.js';
import { clearCache } from '../utils/cache.js';

const router = express.Router();

// All admin routes require both authentication and admin privileges
router.use(authMiddleware, isAdmin);

// Get all users
router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
});

// Get system analytics
router.get('/analytics', async (req, res, next) => {
  try {
    const analytics = await getAnalytics();
    res.json({ success: true, data: analytics });
  } catch (error) {
    next(error);
  }
});

// Clear cache
router.post('/clear-cache', async (req, res, next) => {
  try {
    await clearCache();
    res.json({ success: true, message: 'Cache cleared successfully' });
  } catch (error) {
    next(error);
  }
});

export default router; 