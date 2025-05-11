import express from 'express';
import { getMangaChapters, getMangaChapter } from '../controllers/readController.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get all chapters for a manga
router.get('/:mangaId', rateLimiter, getMangaChapters);

// Get specific chapter
router.get('/:mangaId/chapter/:chapterNumber', rateLimiter, getMangaChapter);

export default router; 