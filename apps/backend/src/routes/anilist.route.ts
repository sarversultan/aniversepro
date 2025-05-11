import { Router, Request, Response } from 'express';
import { fetchWithCache, transformMedia } from '../utils/anilistHelpers';

const router = Router();

router.get('/api/anilist', async (req: Request, res: Response) => {
  const { id, search } = req.query;

  if (!id && !search) {
    return res.status(400).json({ error: 'Missing id or search query parameter.' });
  }

  let query = '';
  let variables: Record<string, any> = {};

  if (id) {
    query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title { romaji english }
          coverImage { large }
          description
          averageScore
          episodes
        }
      }
    `;
    variables = { id: Number(id) };
  } else if (search) {
    query = `
      query ($search: String) {
        Media(search: $search, type: ANIME) {
          id
          title { romaji english }
          coverImage { large }
          description
          averageScore
          episodes
        }
      }
    `;
    variables = { search };
  }

  try {
    const data = await fetchWithCache(query, variables);
    const media = data?.data?.Media;
    if (!media) {
      return res.status(404).json({ error: 'Anime not found.' });
    }
    const transformed = transformMedia(media);
    res.json(transformed);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

export default router; 