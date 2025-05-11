import { Request, Response } from "express";
import axios from "axios";

// Trending Manga
export const fetchTrendingManga = async (req: Request, res: Response) => {
  try {
    const query = `
      query {
        Page(perPage: 12) {
          media(sort: TRENDING_DESC, type: MANGA) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description
            chapters
            averageScore
            genres
          }
        }
      }
    `;

    const { data } = await axios.post("https://graphql.anilist.co", { query });
    res.status(200).json(data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending manga", error });
  }
};

// Popular Manga
export const fetchPopularManga = async (req: Request, res: Response) => {
  try {
    const query = `
      query {
        Page(perPage: 12) {
          media(type: MANGA, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description
            chapters
            averageScore
            genres
          }
        }
      }
    `;

    const { data } = await axios.post("https://graphql.anilist.co", { query });
    res.status(200).json(data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular manga", error });
  }
};

// Manga by ID
export const fetchMangaById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const query = `
      query ($id: Int) {
        Media(id: $id, type: MANGA) {
          id
          title {
            romaji
            english
          }
          description
          chapters
          averageScore
          genres
          coverImage {
            large
          }
          bannerImage
        }
      }
    `;

    const variables = { id: Number(id) };

    const { data } = await axios.post("https://graphql.anilist.co", {
      query,
      variables
    });

    res.status(200).json(data.data.Media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch manga by ID", error });
  }
};

export const getTopManga = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/manga");
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch manga", error });
  }
}; 