import axios from "axios";
import { BACKEND_API_URL } from "../configs/api-urls/api-urls";

export const updatePhotos = async (photos, url) => {
  const formData = new FormData();
  photos.forEach((file) => {
    formData.append("multi-files", file.file, file.file.name);
  });
  photos = formData;
  return await axios.post(`${BACKEND_API_URL}/photos`, formData, {
    withCredentials: true,
    headers: { "Content-type": "multipart/form-data" },
  });
};
