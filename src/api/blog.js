import axios from "axios";
import { BACKEND_API_URL } from "../configs/api-urls/api-urls";

export const getAllBlogs = () => axios.get(`${BACKEND_API_URL}/blog`);
export const postBlog = (data) => axios.post(`${BACKEND_API_URL}/blog`, data, { withCredentials: true });
export const deleteBlog = (id) => axios.delete(`${BACKEND_API_URL}/blog/${id}`, { withCredentials: true });
