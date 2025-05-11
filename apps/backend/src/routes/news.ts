import express from "express";
import { getLatestNews } from "../controllers/news";

const router = express.Router();

router.get("/latest", getLatestNews);

export default router; 