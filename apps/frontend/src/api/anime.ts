import axios from 'axios';

// Types
export interface Anime {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  bannerImage?: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  genres: string[];
  episodes: number;
  rating?: number;
  year?: number;
  season?: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  sources: {
    name: string;
    url: string;
  }[];
}

export interface AnimeResponse {
  data: Anime;
  episodes: Episode[];
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const animeApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
export const getAnimeById = async (id: string): Promise<AnimeResponse> => {
  try {
    const response = await animeApi.get(`/anime/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching anime:', error);
    throw error;
  }
};

export const getEpisodeSources = async (animeId: string, episodeId: string): Promise<Episode> => {
  try {
    const response = await animeApi.get(`/anime/${animeId}/episodes/${episodeId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching episode sources:', error);
    throw error;
  }
};

export const searchAnime = async (query: string): Promise<Anime[]> => {
  try {
    const response = await animeApi.get('/anime/search', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    throw error;
  }
};

export const getTrendingAnime = async (): Promise<Anime[]> => {
  try {
    const response = await animeApi.get('/anime/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending anime:', error);
    throw error;
  }
};

export const getRecentEpisodes = async (): Promise<Episode[]> => {
  try {
    const response = await animeApi.get('/anime/recent-episodes');
    return response.data;
  } catch (error) {
    console.error('Error fetching recent episodes:', error);
    throw error;
  }
}; 