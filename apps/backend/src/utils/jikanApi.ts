import axios from "axios";

const JIKAN_API_URL = "https://api.jikan.moe/v4";

export const getJikanMetadata = async (animeId: number) => {
    try {
        const response = await axios.get(`${JIKAN_API_URL}/anime/${animeId}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch data from Jikan");
    }
}; 