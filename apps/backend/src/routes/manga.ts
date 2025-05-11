import express from "express";
import { getTopManga } from "../controllers/manga";

const router = express.Router();

router.get("/top", getTopManga);

export default router; 