import express from 'express';
import { getAnimeEpisodes, getAnimeEpisode } from '../controllers/watchController.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Get all episodes for an anime
router.get('/:animeId', rateLimiter, getAnimeEpisodes);

// Get specific episode
router.get('/:animeId/episode/:episodeNumber', rateLimiter, getAnimeEpisode);

export default router; 