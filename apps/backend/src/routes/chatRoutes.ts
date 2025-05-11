import express from "express";
import { fallbackChatHandler } from "../controllers/chatController.js";

const router = express.Router();
router.get("/", fallbackChatHandler);
export default router; 