import axios from 'axios';
import { handleApiError } from '../utils/apiErrorHandler';

export interface Chapter {
  id: string;
  number: number;
  title: string;
  pages: {
    url: string;
    width: number;
    height: number;
  }[];
}

export interface MangaInfo {
  id: string;
  title: string;
  chapters: Chapter[];
  totalChapters: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/read` : 'http://localhost:5000/api/read',
  timeout: 10000,
});

export const getMangaChapters = async (mangaId: string): Promise<MangaInfo> => {
  try {
    const response = await api.get(`/${mangaId}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getChapter = async (mangaId: string, chapterNumber: number): Promise<Chapter> => {
  try {
    const response = await api.get(`/${mangaId}/chapter/${chapterNumber}`);
    return response.data.data;
  } catch (error) {
    throw handleApiError(error);
  }
}; 