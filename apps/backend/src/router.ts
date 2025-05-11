import { Router, Request, Response } from 'express';

const router = Router();

// Example status route
router.get('/status', (req: Request, res: Response) => {
  res.json({ status: 'Backend is working!' });
});

export default router; 