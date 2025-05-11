import { GraphQLClient } from "graphql-request";

const ANILIST_API_URL = "https://graphql.anilist.co";
const client = new GraphQLClient(ANILIST_API_URL);

export const getAnimeMetadata = async (animeId: number) => {
    const query = `
        query {
            Media(id: ${animeId}) {
                id
                title {
                    romaji
                    english
                    native
                }
                description
                episodes
                genres
                averageScore
                coverImage {
                    large
                }
            }
        }
    `;
    try {
        const data = await client.request(query);
        return data.Media;
    } catch (error) {
        throw new Error("Error fetching data from AniList");
    }
}; 