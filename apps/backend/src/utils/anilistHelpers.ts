import axios from 'axios';

// 1. Transform AniList Media to frontend-friendly shape
export function transformMedia(media: any) {
  return {
    id: media.id,
    title: media.title?.english || media.title?.romaji || '',
    coverImage: media.coverImage?.large || '',
    description: media.description ? media.description.replace(/<[^>]+>/g, '') : '',
    averageScore: media.averageScore ?? null,
    episodes: media.episodes ?? null,
  };
}

// 2. Simple in-memory cache
const cache = new Map<string, any>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const cacheExpiry = new Map<string, number>();

// 3. fetchWithCache
export async function fetchWithCache(query: string, variables?: Record<string, any>): Promise<any> {
  const cacheKey = JSON.stringify({ query, variables });
  const now = Date.now();
  if (cache.has(cacheKey) && cacheExpiry.get(cacheKey)! > now) {
    return cache.get(cacheKey);
  }

  const response = await axios.post('https://graphql.anilist.co', { query, variables }, {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = response.data;
  cache.set(cacheKey, data);
  cacheExpiry.set(cacheKey, now + CACHE_TTL);
  return data;
} 