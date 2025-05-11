import axios from "axios";

export const fetchFromJikan = async (endpoint: string) => {
  const baseURL = process.env.JIKAN_API;
  const url = `${baseURL}/${endpoint}`;
  const response = await axios.get(url);
  return response.data.data;
}; 