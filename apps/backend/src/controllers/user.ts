import { Request, Response } from "express";

export const getUserProfile = async (req: Request, res: Response) => {
  // Replace with actual auth logic later
  res.status(200).json({ id: 1, username: "DemoUser", favorites: [] });
}; 