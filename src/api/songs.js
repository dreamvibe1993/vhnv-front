import axios from "axios";
import { BACKEND_API_URL } from "../configs/api-urls/api-urls";

export const getAllSongs = () => axios.get(`${BACKEND_API_URL}/songs`);
export const getSong = (letter) => axios.get(`${BACKEND_API_URL}/songs/${letter}`);
export const postSong = (data) => axios.post(`${BACKEND_API_URL}/songs`, data, { withCredentials: true });
export const deleteSong = (id) => axios.delete(`${BACKEND_API_URL}/songs/${id}`, { withCredentials: true });
