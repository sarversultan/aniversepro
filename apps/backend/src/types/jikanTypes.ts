export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: { image_url: string };
    webp: { image_url: string };
  };
  synopsis: string;
  score: number;
  genres: { name: string }[];
} 