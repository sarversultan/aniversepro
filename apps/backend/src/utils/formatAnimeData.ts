// Format a single AniList media object for the frontend
export function formatAnime(media: any) {
  return {
    id: media.id,
    title: media.title?.english || media.title?.romaji || 'Unknown Title',
    coverImage: media.coverImage?.extraLarge || media.coverImage?.large,
    bannerImage: media.bannerImage || null,
    description: media.description ? media.description.replace(/<[^>]+>/g, '') : 'No description available.',
    episodes: media.episodes,
    rating: media.averageScore,
    season: media.season,
    year: media.seasonYear,
    genres: media.genres,
    format: media.format,
    status: media.status,
  };
}

// Format a list of AniList media objects
export function formatAnimeList(mediaList: any[]) {
  return mediaList.map(formatAnime);
} 