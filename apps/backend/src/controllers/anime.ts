import { Request, Response } from "express";
import axios from "axios";

// Example: Fetch trending anime from AniList GraphQL API
export const fetchTrendingAnime = async (req: Request, res: Response) => {
  try {
    const query = `
      query {
        Page(perPage: 12) {
          media(sort: TRENDING_DESC, type: ANIME) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description
            episodes
            averageScore
            genres
          }
        }
      }
    `;
    
    const { data } = await axios.post("https://graphql.anilist.co", { query });

    res.status(200).json(data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending anime", error });
  }
};

export const fetchSeasonalAnime = async (req: Request, res: Response) => {
  try {
    const query = `
      query {
        Page(perPage: 12) {
          media(season: SPRING, seasonYear: 2025, type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description
            episodes
            averageScore
            genres
          }
        }
      }
    `;
    
    const { data } = await axios.post("https://graphql.anilist.co", { query });

    res.status(200).json(data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch seasonal anime", error });
  }
};

export const fetchPopularAnime = async (req: Request, res: Response) => {
  try {
    const query = `
      query {
        Page(perPage: 12) {
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            title {
              romaji
              english
            }
            coverImage {
              large
            }
            description
            episodes
            averageScore
            genres
          }
        }
      }
    `;
    
    const { data } = await axios.post("https://graphql.anilist.co", { query });

    res.status(200).json(data.data.Page.media);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular anime", error });
  }
};

export const fetchAnimeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
          }
          description
          episodes
          duration
          averageScore
          genres
          coverImage {
            large
          }
          bannerImage
          trailer {
            id
            site
            thumbnail
          }
          characters {
            edges {
              node {
                name {
                  full
                }
                image {
                  large
                }
              }
            }
          }
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
    res.status(500).json({ message: "Failed to fetch anime by ID", error });
  }
};

export const getTrendingAnime = async (req: Request, res: Response) => {
  try {
    const response = await axios.get("https://api.jikan.moe/v4/top/anime");
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trending anime", error });
  }
}; 