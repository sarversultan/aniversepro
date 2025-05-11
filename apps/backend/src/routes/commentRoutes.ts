import express from "express";
import { postComment, getCommentsByAnimeId } from "../controllers/commentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:animeId", authMiddleware, postComment);
router.get("/:animeId", getCommentsByAnimeId);

export default router; 