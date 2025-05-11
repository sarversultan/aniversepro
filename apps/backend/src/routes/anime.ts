import express from "express";
import { getTrendingAnime } from "../controllers/anime";

const router = express.Router();

router.get("/trending", getTrendingAnime);

export default router; 