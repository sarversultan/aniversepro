// Trending Anime Query
export const TRENDING_ANIME_QUERY = `
  query {
    Page(perPage: 10) {
      media(type: ANIME, sort: TRENDING_DESC) {
        id
        title { romaji english }
        coverImage { large }
        season
        seasonYear
        format
        episodes
        averageScore
        description
      }
    }
  }
`;

// Popular Anime Query
export const POPULAR_ANIME_QUERY = `
  query {
    Page(perPage: 10) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title { romaji english }
        coverImage { large }
        season
        seasonYear
        format
        episodes
        averageScore
        description
      }
    }
  }
`;

// Seasonal Anime Query (dynamic)
export const SEASONAL_ANIME_QUERY = (season: string, year: number) => `
  query ($season: MediaSeason, $seasonYear: Int) {
    Page(perPage: 10) {
      media(type: ANIME, season: $season, seasonYear: $seasonYear, sort: POPULARITY_DESC) {
        id
        title { romaji english }
        coverImage { large }
        season
        seasonYear
        format
        episodes
        averageScore
        description
      }
    }
  }
`;

// Helper to get current season and year
export const getCurrentSeason = (): { season: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL'; year: number } => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  let season: 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';
  if (month <= 3) season = 'WINTER';
  else if (month <= 6) season = 'SPRING';
  else if (month <= 9) season = 'SUMMER';
  else season = 'FALL';
  return { season, year };
}; 