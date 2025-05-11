import { useEffect, useMemo, useState } from 'react';

export interface ContinueAnime {
  id: string;
  title: string;
  episode: number;
  thumbnailUrl: string;
  progress?: number; // 0-100
}

export interface ContinueManga {
  id: string;
  title: string;
  chapter: number;
  thumbnailUrl: string;
  progress?: number; // 0-100
}

type ContinueType = 'anime' | 'manga';

type ContinueContent = ContinueAnime[] | ContinueManga[];

export function useContinueContent(type: ContinueType) {
  const [data, setData] = useState<ContinueContent>([]);

  useEffect(() => {
    let key = type === 'anime' ? 'watchedAnime' : 'readManga';
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setData(Array.isArray(parsed) ? parsed : []);
      } catch {
        setData([]);
      }
    } else {
      setData([]);
    }
    return () => {
      // Clean up if needed (not strictly necessary for localStorage)
      setData([]);
    };
  }, [type]);

  return useMemo(() => data, [data]);
} 