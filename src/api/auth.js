import axios from "axios";
import { BACKEND_API_URL } from "../configs/api-urls/api-urls";

export const login = (data) => axios.post(`${BACKEND_API_URL}/auth/login`, data, { withCredentials: true });
export const logout = () => axios.post(`${BACKEND_API_URL}/auth/logout`, {}, { withCredentials: true });
export const getStatus = () => axios.get(`${BACKEND_API_URL}/auth/status`, { withCredentials: true });
