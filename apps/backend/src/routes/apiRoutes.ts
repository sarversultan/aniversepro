import express from "express";
import { getEpisodes } from "../utils/consumetApi.js";
import { getAnimeMetadata } from "../utils/aniListApi.js";
import { getGogoAnimeEpisodes } from "../utils/gogoanimeApi.js";
import { getMangaDexChapters } from "../utils/mangaDexApi.js";
import { getJikanMetadata } from "../utils/jikanApi.js";

const router = express.Router();

// Consumet API: Fetch episodes for anime by ID
router.get("/episodes/:id", async (req, res) => {
  const animeId = req.params.id;
  try {
    const episodes = await getEpisodes(animeId);
    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching episodes from Consumet", error });
  }
});

// AniList: Fetch anime metadata
router.get("/metadata/:id", async (req, res) => {
  const animeId = parseInt(req.params.id);
  try {
    const metadata = await getAnimeMetadata(animeId);
    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metadata from AniList", error });
  }
});

// Gogoanime fallback: Fetch episodes
router.get("/episodes/fallback/:id", async (req, res) => {
  const animeId = req.params.id;
  try {
    const episodes = await getGogoAnimeEpisodes(animeId);
    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching episodes from Gogoanime", error });
  }
});

// MangaDex fallback: Fetch manga chapters
router.get("/manga/chapters/fallback/:id", async (req, res) => {
  const mangaId = req.params.id;
  try {
    const chapters = await getMangaDexChapters(mangaId);
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chapters from MangaDex", error });
  }
});

// Jikan fallback: Fetch anime metadata
router.get("/metadata/fallback/:id", async (req, res) => {
  const animeId = parseInt(req.params.id);
  try {
    const metadata = await getJikanMetadata(animeId);
    res.status(200).json(metadata);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metadata from Jikan", error });
  }
});

export default router; 