import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

interface AniListRequestBody {
  query: string;
  variables?: Record<string, any>;
}

router.post('/api/anilist', async (req: Request, res: Response) => {
  const { query, variables }: AniListRequestBody = req.body;

  // Basic input validation
  if (typeof query !== 'string' || query.trim().length === 0) {
    return res.status(400).json({ error: 'Invalid or missing GraphQL query.' });
  }
  if (variables && typeof variables !== 'object') {
    return res.status(400).json({ error: 'Variables must be an object.' });
  }

  try {
    const response = await axios.post('https://graphql.anilist.co', {
      query,
      variables,
    }, {
      headers: { 'Content-Type': 'application/json' },
    });
    res.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || error.message || 'AniList API error';
    res.status(status).json({ error: message });
  }
});

export default router; 