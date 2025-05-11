import { successResponse } from "../utils/apiResponse.js";

let progress: any[] = [];

export const updateProgress = (req, res) => {
  const { contentId, episodeOrChapter, type } = req.body;
  const entry = { userId: req.user.id, contentId, episodeOrChapter, type };
  progress = progress.filter(p => !(p.userId === entry.userId && p.contentId === entry.contentId && p.type === entry.type));
  progress.push(entry);
  return successResponse(res, entry, "Progress updated");
};

export const getProgress = (req, res) => {
  const { contentId, type } = req.query;
  const userProgress = progress.find(p => p.userId === req.user.id && p.contentId === contentId && p.type === type);
  res.json(userProgress || null);
}; 