import express from "express";
import { summarize } from "../controllers/summaryController.js";

const router = express.Router();
router.post("/", summarize);

export default router; 