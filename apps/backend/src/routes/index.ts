import express from "express";
import animeRoutes from "./animeRoutes.js";
import mangaRoutes from "./mangaRoutes.js";
import newsRoutes from "./newsRoutes.js";
import progressRoutes from "./progressRoutes.js";
import chatRoutes from "./chatRoutes.js";
import homepageRoutes from "./homepageRoutes.js";
import apiRoutes from "./apiRoutes.js";

const router = express.Router();

router.use("/anime", animeRoutes);
router.use("/manga", mangaRoutes);
router.use("/news", newsRoutes);
router.use("/progress", progressRoutes);
router.use("/chat", chatRoutes);
router.use('/homepage', homepageRoutes);
router.use("/api", apiRoutes);

export default router; 