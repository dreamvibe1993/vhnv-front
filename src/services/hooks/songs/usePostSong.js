import { postSong } from "../../../api/songs";

export const usePostSong = () => {
  return (json) => postSong(json);
};
