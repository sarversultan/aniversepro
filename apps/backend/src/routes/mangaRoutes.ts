import express from "express";
import { getTrendingManga, searchManga, getMangaDetails } from "../controllers/mangaController.js";

const router = express.Router();
router.get("/trending", getTrendingManga);
router.get("/search", searchManga);
router.get("/details/:id", getMangaDetails);

export default router; 