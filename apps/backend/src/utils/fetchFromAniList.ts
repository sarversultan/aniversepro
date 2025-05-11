import axios from 'axios';

const ANILIST_URL = 'https://graphql.anilist.co';

export const fetchFromAniList = async (query: string, variables: any = {}) => {
  try {
    const response = await axios.post(ANILIST_URL, { query, variables });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch from AniList API');
  }
}; 