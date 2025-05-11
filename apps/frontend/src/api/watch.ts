import axios from 'axios';
import { handleApiError } from '../utils/apiErrorHandler';

export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail?: string;
  sources: {
    url: string;
    quality: string;
    isM3U8: boolean;
  }[];
}

export interface AnimeInfo {
  id: string;
  title: string;
  episodes: Episode[];
  totalEpisodes: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/watch` : 'http://localhost:5000/api/watch',
  timeout: 10000,
});

export const getAnimeEpisodes = async (animeId: string): Promise<AnimeInfo> => {
  try {
    const response = await api.get(`/${animeId}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getEpisode = async (animeId: string, episodeNumber: number): Promise<Episode> => {
  try {
    const response = await api.get(`/${animeId}/episode/${episodeNumber}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 