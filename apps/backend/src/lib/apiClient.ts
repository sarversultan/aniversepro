import axios from "axios";

export const apiClient = axios.create({
  timeout: 5000,
}); 