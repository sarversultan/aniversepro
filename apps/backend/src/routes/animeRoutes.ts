import express from "express";
import { getTrendingAnime, searchAnime, getAnimeDetails } from "../controllers/animeController.js";

const router = express.Router();
router.get("/trending", getTrendingAnime);
router.get("/search", searchAnime);
router.get("/details/:id", getAnimeDetails);

export default router; 