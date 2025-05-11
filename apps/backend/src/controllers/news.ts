import { Request, Response } from "express";

// TEMP: Static mock data (until ANN or other API is ready)
const mockNews = [
  {
    id: 1,
    title: "Attack on Titan Final Season Ending Explained",
    description: "The epic finale wraps up Eren's journey — here's a breakdown.",
    coverImage: "https://cdn.aniversepro.com/news/attack-on-titan.jpg",
    date: "2025-05-01",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen Season 3 Confirmed!",
    description: "MAPPA teases fans with new visual and release window.",
    coverImage: "https://cdn.aniversepro.com/news/jujutsu-kaisen.jpg",
    date: "2025-04-27",
  },
  {
    id: 3,
    title: "MyAnimeList Confirms Partnership with Netflix",
    description: "MAL and Netflix are teaming up to enhance anime discovery.",
    coverImage: "https://cdn.aniversepro.com/news/mal-netflix.jpg",
    date: "2025-04-20",
  }
];

// Controller to serve latest news
export const getLatestNews = async (req: Request, res: Response) => {
  try {
    // TEMP: Serve static news
    res.status(200).json(mockNews);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error });
  }
}; 