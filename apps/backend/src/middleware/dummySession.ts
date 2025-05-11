import { Request, Response, NextFunction } from "express";

export const fakeSession = (req: Request, res: Response, next: NextFunction) => {
  (req as any).user = { id: "test-user", name: "Guest" }; // Replace with real auth later
  next();
}; 