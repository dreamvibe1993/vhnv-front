import { deleteSong } from "../../../api/songs";

export const useDeleteSong = () => {
  return (id) => deleteSong(id);
};
