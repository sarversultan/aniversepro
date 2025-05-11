import { Request, Response, NextFunction } from "express";

export const paginate = (req: Request, res: Response, next: NextFunction) => {
  req.query.page = req.query.page || "1";
  req.query.limit = req.query.limit || "10";
  next();
}; 