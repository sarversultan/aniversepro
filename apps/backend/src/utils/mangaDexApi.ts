import axios from "axios";

const MANGADex_API_URL = "https://api.mangadex.org";

export const getMangaDexChapters = async (mangaId: string) => {
    try {
        const response = await axios.get(`${MANGADex_API_URL}/manga/${mangaId}/chapters`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch chapters from MangaDex");
    }
}; 