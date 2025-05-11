import express from "express";
import { protect } from "../middleware/auth.js";
import { authMiddleware } from '../middleware/authMiddleware.js';
import {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  addToWatchHistory,
  getWatchHistory
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.get("/me", protect, (req, res) => {
  res.json({ user: (req as any).user });
});

// Favorites routes
router.post('/favorites/:animeId', addToFavorites);
router.delete('/favorites/:animeId', removeFromFavorites);
router.get('/favorites', getFavorites);

// Watch history routes
router.post('/watch/:animeId', addToWatchHistory);
router.get('/history', getWatchHistory);

export default router; 