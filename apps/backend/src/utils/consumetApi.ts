import axios from "axios";

const CONSUMET_API_URL = "https://api.consumet.org";

export const getEpisodes = async (animeId: string) => {
    try {
        const response = await axios.get(`${CONSUMET_API_URL}/episodes/${animeId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch episodes from Consumet");
    }
}; 