import axios from "axios";

const GOGOANIME_API_URL = "https://api.gogoanime.ai";

export const getGogoAnimeEpisodes = async (animeId: string) => {
    try {
        const response = await axios.get(`${GOGOANIME_API_URL}/episodes/${animeId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch episodes from Gogoanime");
    }
}; 