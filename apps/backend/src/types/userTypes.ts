export interface WatchHistoryItem {
  animeId: string;
  watchedAt: Date;
}

export interface FavoriteItem {
  animeId: string;
  addedAt: Date;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  favorites: string[];
  watchHistory: WatchHistoryItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  _id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  favorites: string[];
  watchHistory: WatchHistoryItem[];
  createdAt: Date;
  updatedAt: Date;
} 